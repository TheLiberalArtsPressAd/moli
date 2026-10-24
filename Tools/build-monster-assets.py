# -*- coding: utf-8 -*-
"""把「魔力寶貝怪物素材」轉成網頁版可用的怪物圖庫。

來源：C:\\Users\\e3479\\Downloads\\魔力寶貝素材\\魔力寶貝怪物素材\\<區域>\\<怪物>\\*.gif
輸出：web-assets/monsters/<id>/<state>.webp  +  catalog.json

狀態：00 待機 -> idle、01 行走 -> walk、03 攻擊 -> attack、
      05 施法或特殊 -> special、06 受傷 -> hurt、10 死亡 -> die
（GIF 轉成無損動畫 WebP，約可省下 25% 體積並保留每一幀）
已存在的檔案會直接沿用，所以補新動作時不會重轉 1600 多个舊檔。
"""
import io
import json
import os
import re
import sys
import time

from PIL import Image

SRC_ROOT = r"C:\Users\e3479\Downloads\魔力寶貝素材\魔力寶貝怪物素材"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_ROOT = os.path.join(ROOT, "web-assets", "monsters")

STATE_MAP = {
    "00": "idle",
    "01": "walk",
    "03": "attack",
    "05": "special",
    "06": "hurt",
    "10": "die",
}
STATE_ORDER = ["idle", "walk", "attack", "special", "hurt", "die"]
# 這些動作沒有原圖時不要拿待機圖硬補，讓前端自己 fallback
OPTIONAL_STATES = {"special", "hurt"}


def read_text(path):
    try:
        with open(path, "rb") as fh:
            return fh.read().decode("utf-8", "replace").strip()
    except OSError:
        return ""


def gif_to_webp(src, dst):
    im = Image.open(src)
    frames = []
    durations = []
    for i in range(getattr(im, "n_frames", 1)):
        im.seek(i)
        frames.append(im.convert("RGBA"))
        durations.append(max(40, int(im.info.get("duration", 120))))
    buf = io.BytesIO()
    frames[0].save(
        buf, save_all=True, append_images=frames[1:], duration=durations, loop=0,
        format="WEBP", lossless=True, quality=100, method=4,
    )
    data = buf.getvalue()
    with open(dst, "wb") as fh:
        fh.write(data)
    return len(data), frames[0].size


def webp_size(path):
    try:
        with Image.open(path) as im:
            return im.size
    except Exception:
        return (0, 0)


def main():
    if not os.path.isdir(SRC_ROOT):
        print("missing source: " + SRC_ROOT)
        return 1

    regions = [
        d for d in sorted(os.listdir(SRC_ROOT))
        if os.path.isdir(os.path.join(SRC_ROOT, d)) and not d.startswith("【")
    ]

    # 先收集所有怪物（同名只留一份，合併出沒區域）
    monsters = {}
    region_map = []
    for region in regions:
        region_dir = os.path.join(SRC_ROOT, region)
        region_name = re.sub(r"^\d+_", "", region)
        entries = []
        for mon in sorted(os.listdir(region_dir)):
            mon_dir = os.path.join(region_dir, mon)
            if not os.path.isdir(mon_dir):
                continue
            entry = monsters.get(mon)
            if entry is None:
                entry = {
                    "name": mon,
                    "regions": [],
                    "dir": mon_dir,
                    "states": {},
                    "habitat": read_text(os.path.join(mon_dir, "出沒地點說明.txt")),
                }
                monsters[mon] = entry
            if region_name not in entry["regions"]:
                entry["regions"].append(region_name)
            entries.append(mon)
        region_map.append({"key": region, "name": region_name, "monsters": entries})

    names = sorted(monsters.keys())
    os.makedirs(OUT_ROOT, exist_ok=True)

    catalog = {"monsters": [], "regions": region_map}
    by_name = {}
    total_bytes = 0
    started = time.time()

    for idx, name in enumerate(names):
        entry = monsters[name]
        mid = "m%03d" % (idx + 1)
        out_dir = os.path.join(OUT_ROOT, mid)
        os.makedirs(out_dir, exist_ok=True)

        files = os.listdir(entry["dir"])
        state_files = {}
        for f in files:
            if not f.endswith(".gif"):
                continue
            m = re.search(r"_(00|01|03|05|06|10)_", f)
            if m and m.group(1) not in state_files:
                state_files[m.group(1)] = os.path.join(entry["dir"], f)

        if "00" not in state_files:
            # 沒有待機圖就找任何一張 gif
            any_gif = [f for f in files if f.endswith(".gif")]
            if not any_gif:
                continue
            state_files["00"] = os.path.join(entry["dir"], any_gif[0])

        states = {}
        size = (0, 0)
        for code, state in STATE_MAP.items():
            dst = os.path.join(out_dir, state + ".webp")
            src = state_files.get(code)
            if src is None:
                if state in OPTIONAL_STATES:
                    continue  # 這隻怪物沒有這個動作，前端會 fallback
                src = state_files.get("00")
            if os.path.exists(dst) and os.path.getsize(dst) > 0:
                sz = webp_size(dst)
                if state == "idle":
                    size = sz
            else:
                n, sz = gif_to_webp(src, dst)
                total_bytes += n
                if state == "idle":
                    size = sz
            states[state] = "web-assets/monsters/%s/%s.webp" % (mid, state)

        item = {
            "id": mid,
            "name": name,
            "regions": entry["regions"],
            "w": size[0],
            "h": size[1],
            "states": states,
        }
        if entry["habitat"]:
            item["habitat"] = entry["habitat"]
        catalog["monsters"].append(item)
        by_name[name] = mid

        if idx % 25 == 0:
            print("%d/%d  %s  (%.1f MB, %.0fs)" % (
                idx + 1, len(names), name, total_bytes / 1048576, time.time() - started), flush=True)

    for region in catalog["regions"]:
        region["monster_ids"] = [by_name[n] for n in region["monsters"] if n in by_name]
        region["count"] = len(region["monster_ids"])
        del region["monsters"]

    with open(os.path.join(OUT_ROOT, "catalog.json"), "w", encoding="utf-8") as fh:
        json.dump(catalog, fh, ensure_ascii=False, indent=1)

    print("monsters: %d, regions: %d, total: %.1f MB, %.0fs" % (
        len(catalog["monsters"]), len(catalog["regions"]), total_bytes / 1048576, time.time() - started))
    return 0


if __name__ == "__main__":
    sys.exit(main())
