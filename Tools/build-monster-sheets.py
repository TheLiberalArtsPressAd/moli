# -*- coding: utf-8 -*-
"""把既有的動畫 WebP 怪物動作拆成「橫向 sprite sheet」。

為什麼要拆？
  瀏覽器把動畫 WebP 用 drawImage() 畫到 canvas 時，只會取第一格，
  所以遊戲裡看不到走動／攻擊／施法／死亡。這裡先把每一格攤平成
  一張靜態 WebP，再由 art.js 依時間自己切格播放。

輸出：
  web-assets/monsters/<id>/<state>_sheet.webp
  web-assets/monsters/sheets.json
    { "<id>": { "<state>": { "w": 單格寬, "h": 單格高, "n": 格數,
                              "d": [每格毫秒...] } } }
  web-assets/monsters/sheets.js
    window.MONSTER_SHEETS = { ...同上... };
    （用 <script> 載入，雙擊 index.html 以 file:// 開啟時 fetch 會被瀏覽器
      阻擋，改成 script 才讀得到格數，怪物動作才不會退化成單張靜止圖）

已存在的 sheet 會跳過，可重複執行補齊。
"""
import io
import json
import os
import sys
import time

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MON_ROOT = os.path.join(ROOT, "web-assets", "monsters")
CATALOG = os.path.join(MON_ROOT, "catalog.json")
SHEETS_META = os.path.join(MON_ROOT, "sheets.json")
SHEETS_JS = os.path.join(MON_ROOT, "sheets.js")
STATES = ["idle", "walk", "attack", "special", "hurt", "die"]


def frame_durations(im):
    out = []
    for i in range(getattr(im, "n_frames", 1)):
        im.seek(i)
        d = im.info.get("duration")
        try:
            d = int(d)
        except (TypeError, ValueError):
            d = 0
        out.append(d if d > 0 else 120)
    return out


def build_sheet(src, dst):
    im = Image.open(src)
    frames = []
    durs = []
    for i in range(getattr(im, "n_frames", 1)):
        im.seek(i)
        frames.append(im.convert("RGBA"))
        d = im.info.get("duration")
        try:
            d = int(d)
        except (TypeError, ValueError):
            d = 0
        durs.append(d if d > 0 else 120)
    if not frames:
        return None
    w, h = frames[0].size
    sheet = Image.new("RGBA", (w * len(frames), h), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        if f.size != (w, h):
            f = f.resize((w, h), Image.NEAREST)
        sheet.paste(f, (i * w, 0))
    buf = io.BytesIO()
    sheet.save(buf, "WEBP", lossless=True, quality=100, method=4)
    data = buf.getvalue()
    with open(dst, "wb") as fh:
        fh.write(data)
    return {"w": w, "h": h, "n": len(frames), "d": durs}


def main():
    catalog = json.load(open(CATALOG, encoding="utf-8"))
    meta = {}
    if os.path.exists(SHEETS_META):
        try:
            meta = json.load(open(SHEETS_META, encoding="utf-8"))
        except Exception:
            meta = {}

    monsters = catalog.get("monsters", [])
    total = len(monsters)
    built = 0
    skipped = 0
    t0 = time.time()
    total_bytes = 0

    for idx, m in enumerate(monsters):
        mid = m["id"]
        out_dir = os.path.join(MON_ROOT, mid)
        if not os.path.isdir(out_dir):
            continue
        entry = meta.get(mid, {})
        changed = False
        for state in STATES:
            src = os.path.join(out_dir, state + ".webp")
            dst = os.path.join(out_dir, state + "_sheet.webp")
            if not os.path.exists(src):
                continue
            info = entry.get(state)
            if info and os.path.exists(dst) and os.path.getsize(dst) > 0:
                skipped += 1
                continue
            try:
                info = build_sheet(src, dst)
            except Exception as exc:  # noqa: BLE001
                print("  ! %s/%s: %s" % (mid, state, exc), flush=True)
                continue
            if info:
                entry[state] = info
                built += 1
                changed = True
                total_bytes += os.path.getsize(dst)
        if entry:
            meta[mid] = entry
        if changed and idx % 20 == 0:
            print("%d/%d  %s  (%d sheets, %.1f MB, %.0fs)" % (
                idx + 1, total, mid, built, total_bytes / 1048576, time.time() - t0), flush=True)

    tmp = SHEETS_META + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, SHEETS_META)
    compact = json.dumps(meta, ensure_ascii=False, separators=(",", ":"))
    tmp_js = SHEETS_JS + ".tmp"
    with open(tmp_js, "w", encoding="utf-8") as fh:
        fh.write("/* 由 Tools/build-monster-sheets.py 產生，請勿手動編輯。 */\n")
        fh.write("window.MONSTER_SHEETS=")
        fh.write(compact)
        fh.write(";\n")
    os.replace(tmp_js, SHEETS_JS)
    print("done: %d built, %d reused, %.1f MB, %.0fs" % (
        built, skipped, total_bytes / 1048576, time.time() - t0), flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
