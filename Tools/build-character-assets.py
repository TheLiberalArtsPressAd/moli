# -*- coding: utf-8 -*-
"""Build 8-direction player sprite sheets from the original CrossGate client.

The two player serials come straight from config/game_config.json:
  105053 = 劍士 (西恩)
  106126 = 弓箭手 (葛蕾絲)

Each sheet is 8 rows (N, NE, E, SE, S, SW, W, NW) by N frame columns.
Frames are composited into a fixed cell so the feet stay on the same anchor,
which keeps both characters aligned in game.
"""
import importlib.util
import json
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "web-assets", "art")

spec = importlib.util.spec_from_file_location(
    "cgx", os.path.join(HERE, "extract-cg-character.py"))
cgx = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cgx)

CHARS = {
    "sword": {"serial": 105053, "name": "劍士"},
    "bow": {"serial": 106126, "name": "弓箭手"},
}

STATES = {
    "idle": {"action": 0, "cell_w": 128, "cell_h": 128, "ax": 64, "ay": 88},
    "walk": {"action": 1, "cell_w": 128, "cell_h": 128, "ax": 64, "ay": 88},
    "attack": {"action": 5, "cell_w": 256, "cell_h": 224, "ax": 128, "ay": 140},
}


def frames_for(serial, action, direction):
    graphic, anime = cgx.stores_for(serial)
    detail = anime.detail(serial, direction, action)
    if not detail:
        return []
    out = []
    for frame in detail["frames"]:
        img = graphic.image(frame.graphic, 0)
        gi = graphic.by_index.get(frame.graphic)
        if img is None or gi is None:
            continue
        out.append((img, gi.ox, gi.oy))
    return out


def build_sheet(serial, action, cell_w, cell_h, ax, ay):
    per_dir = [frames_for(serial, action, d) for d in range(8)]
    max_frames = max([len(f) for f in per_dir] + [1])
    sheet = Image.new("RGBA", (cell_w * max_frames, cell_h * 8))
    counts = []
    for d, frames in enumerate(per_dir):
        counts.append(len(frames))
        for i, (img, ox, oy) in enumerate(frames):
            sheet.alpha_composite(img, (i * cell_w + ax + ox, d * cell_h + ay + oy))
    return sheet, counts


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    meta = {
        "dirs": 8,
        "cell": {},
        "anchor": {},
        "chars": {},
    }
    for state, cfg in STATES.items():
        meta["cell"][state] = [cfg["cell_w"], cfg["cell_h"]]
        meta["anchor"][state] = [cfg["ax"], cfg["ay"]]

    for key, info in CHARS.items():
        meta["chars"][key] = {"name": info["name"], "serial": info["serial"]}
        for state, cfg in STATES.items():
            sheet, counts = build_sheet(
                info["serial"], cfg["action"],
                cfg["cell_w"], cfg["cell_h"], cfg["ax"], cfg["ay"])
            path = os.path.join(OUT_DIR, "player_%s_%s.png" % (key, state))
            sheet.save(path, optimize=True)
            meta["chars"][key][state] = {
                "file": "player_%s_%s.png" % (key, state),
                "frames": counts,
                "maxFrames": max(counts),
            }
            print("%s %-6s %4dx%-4d %s" % (
                key, state, sheet.width, sheet.height,
                ", ".join(str(c) for c in counts)))

    meta_path = os.path.join(OUT_DIR, "player_sprites.json")
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, ensure_ascii=False, indent=2)
    print("wrote", meta_path)


if __name__ == "__main__":
    sys.exit(main())
