# -*- coding: utf-8 -*-
"""
把 config/game_config.json 的 15 張地圖擴充成 9 波戰鬥。

每一關的波次變成：
  1 先鋒 → 2 主力 → 3 伏擊(ambush) → 4 精銳(elite)
  → 5 獸潮(pack) → 6 增援(pack) → 7 親衛(elite) → 8 領域(hazard) → 9 霸主(boss)

Mode 由 game.js 的 updateWaves() 讀取：
  ambush  一次從玩家四周衝出一群（開場就貼身）
  elite   精英數量提高、精英詞綴更強
  pack    怪群週期大幅縮短，整場都有獸潮感
  hazard  環境機制（潮汐、沙暴、落石…）在這一波特別猛烈

使用方式：
  python Tools/augment-levels.py
  powershell -ExecutionPolicy Bypass -File Tools/build-config-js.ps1
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(ROOT, "config", "game_config.json")

# 每一關的波次名稱與節奏（依難度自動換算怪物等級）
WAVE_PLAN = [
    {"Name": "先鋒", "Mode": "normal", "Level": 0, "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7, "Duration": 50, "EliteCount": 0,
     "Event": ""},
    {"Name": "主力", "Mode": "normal", "Level": 1, "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9, "Duration": 48, "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。"},
    {"Name": "伏擊", "Mode": "ambush", "Level": 1, "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12, "Duration": 42, "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！"},
    {"Name": "精銳", "Mode": "elite", "Level": 2, "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12, "Duration": 44, "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！"},
    {"Name": "獸潮", "Mode": "pack", "Level": 2, "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16, "Duration": 45, "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。"},
    {"Name": "攻城", "Mode": "siege", "Level": 2, "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14, "Duration": 44, "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！"},
    {"Name": "增援部隊", "Mode": "pack", "Level": 3, "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18, "Duration": 42, "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！"},
    {"Name": "親衛", "Mode": "elite", "Level": 3, "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16, "Duration": 40, "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！"},
    {"Name": "風暴", "Mode": "storm", "Level": 4, "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15, "Duration": 42, "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！"},
    {"Name": "領域", "Mode": "hazard", "Level": 4, "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16, "Duration": 40, "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！"},
]

EVENT_SUFFIX = [
    "怪物死掉就會立刻遞補，撐住這段時間。",
    "清空場面也別鬆懈，下一批很快就到。",
    "記得撿取經驗球，升級能帶來新的魔法與能力。",
    "被包圍時往空曠處移動，動作才看得清楚。",
]


def clamp(v, a, b):
    return max(a, min(b, v))


def pick_band(rounds, idx, fallback):
    """從既有波次裡挑一組敵人；不足時循環使用。"""
    if not rounds:
        return fallback
    if idx < len(rounds):
        return list(rounds[idx].get("EnemyIDs") or [])
    return list(rounds[idx % len(rounds)].get("EnemyIDs") or fallback)


def enrich_pool(si, base_pool, region_pools, target=24):
    """把怪物種類偏少的關卡，用鄰近地區的怪物補到至少 target 種。"""
    out = []
    for art in base_pool:
        if art and art not in out:
            out.append(art)
    for off in range(1, len(region_pools) + 1):
        for j in (si - off, si + off):
            if j < 0 or j >= len(region_pools) or j == si:
                continue
            for art in region_pools[j]:
                if art and art not in out:
                    out.append(art)
                if len(out) >= target:
                    return out
    return out


def merge_band(a, b):
    out = []
    for x in list(a) + list(b):
        if x not in out:
            out.append(x)
    return out


def main():
    with open(CONFIG, encoding="utf-8") as f:
        cfg = json.load(f)

    levels = cfg.get("Levels", [])
    art_to_id = {}
    for e in cfg.get("Enemies", []):
        art = e.get("Art")
        if art and art not in art_to_id:
            art_to_id[art] = e.get("ID")
    region_pools = [list(l.get("MonsterIDs") or []) for l in levels]

    for si, level in enumerate(levels):
        rounds = level.get("RoundInfos") or []
        boss_round = None
        for rd in rounds:
            if rd.get("BossInfos"):
                boss_round = rd
        normal = [rd for rd in rounds if not rd.get("BossInfos")]
        difficulty = int(level.get("Difficulty") or 1)

        # 怪物種類太少的關卡（例如傑諾姆島只有 6 種）用鄰近地區補到 24 種，
        # 讓每一波的增援與獸潮都有足夠的物種變化。
        pool = enrich_pool(si, list(level.get("MonsterIDs") or []), region_pools, 24)
        level["MonsterIDs"] = pool
        level["MonsterCount"] = len(pool)
        pool_ids = [art_to_id[a] for a in pool if a in art_to_id]
        extra = pool_ids[:30]

        new_rounds = []
        for i, plan in enumerate(WAVE_PLAN):
            band = pick_band(normal, i, pool_ids)
            if plan["Mode"] == "elite" and len(normal) > 2:
                band = merge_band(band, pick_band(normal, (i + 2) % len(normal), pool_ids))
            if plan["Mode"] == "hazard" and normal:
                band = merge_band(pick_band(normal, 1, pool_ids), pick_band(normal, 3, pool_ids))
            band = band[:12]
            # 每一波至少混入 6~11 種怪物，避免整波只有一兩種怪在走路。
            species_target = min(len(pool_ids), 6 + difficulty // 2)
            for eid in pool_ids:
                if len(band) >= species_target:
                    break
                if eid not in band:
                    band.append(eid)
            lv = clamp(1 + difficulty + plan["Level"] * 2, 1, 40)
            rd = {
                "Level": lv,
                "Name": plan["Name"],
                "EnemyIDs": band,
                "SpawnCountPerEnemy": plan["SpawnCountPerEnemy"],
                "ReinforceCount": plan["ReinforceCount"],
                "Duration": plan["Duration"],
                "ExtraDisturbEnemyIDs": extra,
                "EliteCount": plan["EliteCount"] + (1 if difficulty >= 9 and plan["Mode"] == "elite" else 0),
                "Event": plan["Event"] or EVENT_SUFFIX[i % len(EVENT_SUFFIX)],
                "Mode": plan["Mode"],
            }
            new_rounds.append(rd)

        if boss_round:
            boss_round = dict(boss_round)
            boss_round["Level"] = clamp(6 + difficulty * 2, 6, 60)
            boss_round["Name"] = "霸主"
            boss_round["Mode"] = "boss"
            for b in boss_round.get("BossInfos") or []:
                b["HpMul"] = round(1 + difficulty * 0.06, 2)
                b["AtkMul"] = round(1 + difficulty * 0.03, 2)
                b["AlliesSpawnInterval"] = max(8, 24 - difficulty)
                b["AlliesSpawnTimes"] = 8 + difficulty
            new_rounds.append(boss_round)

        level["RoundInfos"] = new_rounds
        level["WaveCount"] = len(new_rounds)
        # 關卡簡介加上環境機制，讓選單與開場字卡都看得到
        gim = level.get("Gimmick") or {}
        if gim.get("Name"):
            level["Modifier"] = gim.get("Name")
            level["ModifierDesc"] = gim.get("Desc")
            level["ModifierColor"] = gim.get("Color")

    with open(CONFIG, "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=1)

    total = sum(len(l["RoundInfos"]) for l in cfg["Levels"])
    print("levels=%d rounds=%d" % (len(cfg["Levels"]), total))
    for l in cfg["Levels"]:
        print("  %-10s wave=%d first=%s boss=%s" % (
            l["Name"], len(l["RoundInfos"]),
            l["RoundInfos"][0]["Name"],
            (l["RoundInfos"][-1].get("BossInfos") or [{}])[0].get("Name", "-")))


if __name__ == "__main__":
    main()
