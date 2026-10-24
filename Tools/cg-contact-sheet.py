# -*- coding: utf-8 -*-
"""Render a labelled contact sheet of CrossGate character animations."""
import os
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util

spec = importlib.util.spec_from_file_location(
    "cgx", os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "extract-cg-character.py"))
cgx = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cgx)


def collect(lo, hi, direction=4, action=1):
    out = []
    for store, anime in ((cgx.GRAPHIC_OLD, cgx.ANIME_OLD),
                         (cgx.GRAPHIC_EX, cgx.ANIME_EX)):
        for index in sorted(anime.entries):
            if not (lo <= index <= hi):
                continue
            detail = anime.detail(index, direction, action)
            if not detail or not detail["frames"]:
                continue
            g = store.by_index.get(detail["frames"][0].graphic)
            if not g:
                continue
            if not (20 <= g.w <= 120 and 40 <= g.h <= 150):
                continue
            out.append((index, g))
    return out


def main():
    lo = int(sys.argv[1])
    hi = int(sys.argv[2])
    out_path = sys.argv[3]
    cols = int(sys.argv[4]) if len(sys.argv) > 4 else 10
    cell_w, cell_h = 140, 170
    items = collect(lo, hi)
    rows = (len(items) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), (36, 38, 44))
    draw = ImageDraw.Draw(sheet)
    for i, (index, g) in enumerate(items):
        rendered = cgx.render_frames(index, 4, 1, 0)
        if not rendered:
            continue
        img = rendered["frames"][0]
        scale = min(2.0, 120.0 / max(1, img.width), 130.0 / max(1, img.height))
        img = img.resize((max(1, int(img.width * scale)),
                          max(1, int(img.height * scale))), Image.NEAREST)
        x = (i % cols) * cell_w
        y = (i // cols) * cell_h
        sheet.paste(img, (x + (cell_w - img.width) // 2,
                          y + 22 + (130 - img.height) // 2), img)
        draw.text((x + 4, y + 4), str(index), fill=(230, 230, 230))
    sheet.save(out_path)
    print("wrote %s: %d entries" % (out_path, len(items)))


if __name__ == "__main__":
    main()
