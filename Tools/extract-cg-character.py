# -*- coding: utf-8 -*-
"""Extract original CrossGate character sprites from the client graphic archives.

The client stores indexed-color images in Graphic*.bin + GraphicInfo*.bin and
animation data in Anime*.bin + AnimeInfo*.bin.  This is a small Python port of
Assets/Scripts/CGTool (HonorLee, GPL-3.0) used only to export a handful of
player sprites for the web build.

Usage examples:
  python Tools/extract-cg-character.py --list --range 100000 106000
  python Tools/extract-cg-character.py --anime 105400 --palette 0 --out tmp/105400
"""
import argparse
import os
import struct
import sys
from collections import defaultdict

from PIL import Image

BASE = os.environ.get(
    "CG_CLIENT_DIR",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "bin"),
)
PAL_DIR = os.path.join(BASE, "pal")

HEAD_PALETTE = [
    0x000000, 0x000080, 0x008000, 0x008080, 0x800080, 0x800000, 0x808000, 0xC0C0C0,
    0xC0DCC0, 0xF0CAA6, 0x0000DE, 0x005FFF, 0xA0FFFF, 0xD25F00, 0xFFD250, 0x28E128,
]
FOOT_PALETTE = [
    0x96C3F5, 0x5FA01E, 0x467DC3, 0x1E559B, 0x374146, 0x1E2328, 0xF0FBFF, 0xA56E3A,
    0x808080, 0x0000FF, 0x00FF00, 0x00FFFF, 0xFF0000, 0xFF80FF, 0xFFFF00, 0xFFFFFF,
]


def bgr_int(value):
    return ((value >> 16) & 0xFF, (value >> 8) & 0xFF, value & 0xFF, 255)


_palette_cache = {}


def load_palette(index):
    if index in _palette_cache:
        return _palette_cache[index]
    path = os.path.join(PAL_DIR, "palet_%02d.cgp" % index)
    if not os.path.exists(path):
        return load_palette(0)
    with open(path, "rb") as fh:
        raw = fh.read()
    colors = [bgr_int(c) for c in HEAD_PALETTE]
    for i in range(224):
        b, g, r = raw[i * 3:i * 3 + 3]
        colors.append((r, g, b, 255))
    colors += [bgr_int(c) for c in FOOT_PALETTE]
    colors.append((0, 0, 0, 0))
    _palette_cache[index] = colors
    return colors


class GraphicInfo(object):
    __slots__ = ("index", "addr", "length", "ox", "oy", "w", "h", "serial")


class GraphicStore(object):
    def __init__(self, info_path, data_path):
        self.info_path = info_path
        self.data_path = data_path
        self.by_index = {}
        self.by_serial = {}
        self._load()
        self._fh = open(data_path, "rb")

    def _load(self):
        with open(self.info_path, "rb") as fh:
            raw = fh.read()
        count = len(raw) // 40
        for i in range(count):
            off = i * 40
            (index, addr, length, ox, oy, w, h, _east, _south,
             _blocked, _ground) = struct.unpack_from("<IIIIIiiBBBB", raw, off)
            if ox >= 0x80000000:
                ox -= 0x100000000
            if oy >= 0x80000000:
                oy -= 0x100000000
            serial = struct.unpack_from("<I", raw, off + 36)[0]
            gi = GraphicInfo()
            gi.index, gi.addr, gi.length = index, addr, length
            gi.ox, gi.oy, gi.w, gi.h, gi.serial = ox, oy, w, h, serial
            if index not in self.by_index:
                self.by_index[index] = gi
            if serial and serial not in self.by_serial:
                self.by_serial[serial] = gi

    def image(self, index, palette_index=0):
        gi = self.by_index.get(index)
        if gi is None or gi.length < 16:
            return None
        self._fh.seek(gi.addr)
        raw = self._fh.read(gi.length)
        if len(raw) < 16:
            return None
        _head, version, _unknown, width, height, length = struct.unpack_from(
            "<2sBBIII", raw, 0
        )
        payload = raw[16:length]
        palette = load_palette(palette_index)
        pixel_count = gi.w * gi.h
        if version == 0:
            indices = list(payload)
        else:
            indices = _decompress(payload)
        if len(indices) < pixel_count:
            indices += [256] * (pixel_count - len(indices))
        indices = indices[:pixel_count]
        img = Image.new("RGBA", (gi.w, gi.h))
        img.putdata([palette[min(i, 256)] for i in indices])
        # The client stores scanlines bottom-up (Unity SetPixels32 order).
        # Flip once so the exported PNG/GIF is top-down like a normal image.
        return img.transpose(Image.FLIP_TOP_BOTTOM)


def _decompress(data):
    out = []
    pos = 0
    n = len(data)

    def nxt():
        nonlocal pos
        if pos >= n:
            return -1
        value = data[pos]
        pos += 1
        return value

    while True:
        head = nxt()
        if head < 0:
            break
        if head < 0x10:
            for _ in range(head):
                out.append(max(nxt(), 0))
        elif head < 0x20:
            repeat = (head % 0x10) * 0x100 + nxt()
            for _ in range(repeat):
                out.append(max(nxt(), 0))
        elif head < 0x80:
            repeat = (head % 0x20) * 0x10000 + nxt() * 0x100 + nxt()
            for _ in range(repeat):
                out.append(max(nxt(), 0))
        elif head < 0x90:
            repeat = head % 0x80
            index = nxt()
            out.extend([index] * repeat)
        elif head < 0xA0:
            index = nxt()
            repeat = (head % 0x90) * 0x100 + nxt()
            out.extend([index] * repeat)
        elif head < 0xC0:
            index = nxt()
            repeat = (head % 0xA0) * 0x10000 + nxt() * 0x100 + nxt()
            out.extend([index] * repeat)
        elif head < 0xD0:
            out.extend([256] * (head % 0xC0))
        elif head < 0xE0:
            out.extend([256] * ((head % 0xD0) * 0x100 + nxt()))
        else:
            out.extend([256] * ((head % 0xE0) * 0x10000 + nxt() * 0x100 + nxt()))
    return out


class AnimeFrame(object):
    __slots__ = ("graphic", "ox", "oy", "flag")


class AnimeStore(object):
    def __init__(self, info_path, data_path):
        self.data_path = data_path
        self.entries = {}
        self._load_info(info_path)
        self._fh = open(data_path, "rb")

    def _load_info(self, info_path):
        with open(info_path, "rb") as fh:
            raw = fh.read()
        for i in range(len(raw) // 12):
            index, addr, action_count = struct.unpack_from("<IIH", raw, i * 12)
            self.entries[index] = (addr, action_count)

    def detail(self, index, direction, action):
        entry = self.entries.get(index)
        if not entry:
            return None
        addr, action_count = entry
        self._fh.seek(addr)
        for _ in range(action_count):
            head = self._fh.read(12)
            if len(head) < 12:
                return None
            d, a, cycle, frame_count = struct.unpack("<HHII", head)
            frames = []
            for _ in range(frame_count):
                raw = self._fh.read(10)
                if len(raw) < 10:
                    return None
                graphic, ox, oy, flag = struct.unpack("<Ihhh", raw)
                frame = AnimeFrame()
                frame.graphic, frame.ox, frame.oy, frame.flag = graphic, ox, oy, flag
                frames.append(frame)
            if d == direction and a == action:
                return {"cycle": cycle, "frames": frames}
        return None


GRAPHIC_OLD = GraphicStore(
    os.path.join(BASE, "GraphicInfo_66.bin"), os.path.join(BASE, "Graphic_66.bin")
)
GRAPHIC_EX = GraphicStore(
    os.path.join(BASE, "GraphicInfoEx_5.bin"), os.path.join(BASE, "GraphicEx_5.bin")
)
ANIME_OLD = AnimeStore(
    os.path.join(BASE, "AnimeInfo_4.bin"), os.path.join(BASE, "Anime_4.bin")
)
ANIME_EX = AnimeStore(
    os.path.join(BASE, "AnimeInfoEx_1.Bin"), os.path.join(BASE, "AnimeEx_1.Bin")
)

ACTION_NAMES = {0: "stand", 1: "walk", 2: "ready", 3: "run", 5: "attack",
                6: "magic", 8: "hurt", 10: "dead"}


def stores_for(index):
    if index >= 105000:
        return GRAPHIC_EX, ANIME_EX
    return GRAPHIC_OLD, ANIME_OLD


def render_frames(index, direction, action, palette_index=0):
    graphic, anime = stores_for(index)
    detail = anime.detail(index, direction, action)
    if not detail:
        return None
    frames = []
    for frame in detail["frames"]:
        img = graphic.image(frame.graphic, palette_index)
        if img is None:
            continue
        gi = graphic.by_index.get(frame.graphic)
        ox = gi.ox if gi else frame.ox
        oy = gi.oy if gi else frame.oy
        frames.append((img, ox, oy))
    if not frames:
        return None
    min_x = min(f[1] for f in frames)
    min_y = min(f[2] for f in frames)
    max_x = max(f[1] + f[0].width for f in frames)
    max_y = max(f[2] + f[0].height for f in frames)
    canvas = Image.new("RGBA", (max_x - min_x, max_y - min_y))
    composited = []
    for img, ox, oy in frames:
        frame_img = Image.new("RGBA", canvas.size)
        frame_img.alpha_composite(img, (ox - min_x, oy - min_y))
        composited.append(frame_img)
    return {"frames": composited, "cycle": detail["cycle"], "size": canvas.size}


def save_gif(rendered, path, duration=None):
    frames = rendered["frames"]
    if duration is None:
        duration = max(40, int(rendered["cycle"] / max(1, len(frames)) * 10))
    frames[0].save(
        path, save_all=True, append_images=frames[1:], duration=duration,
        loop=0, disposal=2, optimize=False,
    )


def save_sheet(rendered, path, columns=None):
    frames = rendered["frames"]
    w, h = rendered["size"]
    columns = columns or len(frames)
    rows = (len(frames) + columns - 1) // columns
    sheet = Image.new("RGBA", (w * columns, h * rows))
    for i, frame in enumerate(frames):
        sheet.alpha_composite(frame, ((i % columns) * w, (i // columns) * h))
    sheet.save(path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--anime", type=int, default=0)
    ap.add_argument("--direction", type=int, default=4)
    ap.add_argument("--action", type=int, default=1)
    ap.add_argument("--palette", type=int, default=0)
    ap.add_argument("--out", default="")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--range", nargs=2, type=int, default=[100000, 106000])
    ap.add_argument("--sheet", action="store_true")
    args = ap.parse_args()

    if args.list:
        lo, hi = args.range
        for index in sorted(ANIME_OLD.entries):
            if lo <= index <= hi:
                detail = ANIME_OLD.detail(index, 4, 1)
                if detail:
                    g = GRAPHIC_OLD.by_index.get(detail["frames"][0].graphic)
                    if g:
                        print("old %d walk-south frames=%d size=%dx%d" % (
                            index, len(detail["frames"]), g.w, g.h))
        for index in sorted(ANIME_EX.entries):
            if lo <= index <= hi:
                detail = ANIME_EX.detail(index, 4, 1)
                if detail:
                    g = GRAPHIC_EX.by_index.get(detail["frames"][0].graphic)
                    if g:
                        print("ex  %d walk-south frames=%d size=%dx%d" % (
                            index, len(detail["frames"]), g.w, g.h))
        return

    if not args.anime:
        ap.error("--anime is required unless --list is used")
    rendered = render_frames(args.anime, args.direction, args.action, args.palette)
    if not rendered:
        print("no animation %d dir=%d action=%d" % (
            args.anime, args.direction, args.action), file=sys.stderr)
        return 1
    out = args.out or os.path.join("tmp", "cg-%d" % args.anime)
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    if args.sheet:
        save_sheet(rendered, out + ".png")
        print("wrote %s.png (%d frames, %dx%d)" % (
            out, len(rendered["frames"]), rendered["size"][0], rendered["size"][1]))
    else:
        save_gif(rendered, out + ".gif")
        print("wrote %s.gif (%d frames, %dx%d, cycle=%d)" % (
            out, len(rendered["frames"]), rendered["size"][0],
            rendered["size"][1], rendered["cycle"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
