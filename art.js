/* Crossgate Survivors - isometric art layer
 *
 * All artwork here is drawn procedurally (original shapes/colours inspired by
 * 2:1 isometric RPGs). It does NOT contain any asset extracted from the
 * original Crossgate client. If you own the original client you can drop your
 * own exports into assets/local/ (see ART.loadLocalPack) and the game will use
 * them instead of the built-in sprites.
 */
(function (global) {
  "use strict";

  var TW = 64;   // tile width on screen
  var TH = 32;   // tile height on screen
  var TILE = 32; // world pixels per tile

  // ------------------------------------------------------------------ utils
  function makeCanvas(w, h) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w));
    c.height = Math.max(1, Math.round(h));
    return c;
  }

  function hashStr(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function lattice(seed, i, j) {
    var n = Math.imul(i, 374761393) + Math.imul(j, 668265263) + seed;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  function noise(seed, x, y) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = lattice(seed, xi, yi), b = lattice(seed, xi + 1, yi);
    var c = lattice(seed, xi, yi + 1), d = lattice(seed, xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }

  function fbm(seed, x, y, oct) {
    var s = 0, amp = 0.5, f = 1;
    for (var i = 0; i < (oct || 3); i++) {
      s += amp * noise(seed + i * 101, x * f, y * f);
      f *= 2;
      amp *= 0.5;
    }
    return s;
  }

  function shade(hex, k) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round(Math.min(255, Math.max(0, ((n >> 16) & 255) * k)));
    var g = Math.round(Math.min(255, Math.max(0, ((n >> 8) & 255) * k)));
    var b = Math.round(Math.min(255, Math.max(0, (n & 255) * k)));
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // ------------------------------------------------------------- ground tiles
  var T = {
    GRASS: 0, GRASS2: 1, DIRT: 2, WATER: 3, SAND: 4,
    STONE: 5, CAVE: 6, CAVE_WALL: 7, PLAZA: 8, DARK_GRASS: 9
  };

  var GROUND = {};
  GROUND[T.GRASS] = { base: "#59873c", hi: "#6da049", lo: "#4b7432" };
  GROUND[T.GRASS2] = { base: "#51803a", hi: "#649646", lo: "#446a2e" };
  GROUND[T.DARK_GRASS] = { base: "#41682f", hi: "#4f7d39", lo: "#365726" };
  GROUND[T.DIRT] = { base: "#a08052", hi: "#b8965f", lo: "#8a6b42" };
  GROUND[T.WATER] = { base: "#2f6c9e", hi: "#4587bd", lo: "#26587f" };
  GROUND[T.SAND] = { base: "#cfb47c", hi: "#e0c88f", lo: "#b89a63" };
  GROUND[T.STONE] = { base: "#8b8b93", hi: "#a2a2aa", lo: "#73737b" };
  GROUND[T.CAVE] = { base: "#4a4551", hi: "#5a5462", lo: "#3b3742" };
  GROUND[T.CAVE_WALL] = { base: "#2e2a35", hi: "#413c4a", lo: "#232028" };
  GROUND[T.PLAZA] = { base: "#9a9086", hi: "#b0a69a", lo: "#817870" };

  function diamondPath(g) {
    g.beginPath();
    g.moveTo(TW / 2, 0);
    g.lineTo(TW, TH / 2);
    g.lineTo(TW / 2, TH);
    g.lineTo(0, TH / 2);
    g.closePath();
  }

  var TILE_CACHE = {};

  function bakeTile(code, variant) {
    var pal = GROUND[code] || GROUND[T.GRASS];
    var c = makeCanvas(TW, TH);
    var g = c.getContext("2d");
    var r = rng(9001 + code * 37 + variant * 131);

    g.save();
    diamondPath(g);
    g.clip();

    g.fillStyle = pal.base;
    g.fillRect(0, 0, TW, TH);

    // speckle texture
    for (var i = 0; i < 46; i++) {
      var x = r() * TW, y = r() * TH;
      g.fillStyle = r() > 0.55 ? pal.hi : pal.lo;
      g.globalAlpha = 0.35 + r() * 0.4;
      g.fillRect(x, y, 1 + Math.floor(r() * 2), 1);
    }
    g.globalAlpha = 1;

    if (code === T.WATER) {
      for (var w = 0; w < 5; w++) {
        var wy = 6 + r() * (TH - 12);
        g.strokeStyle = "rgba(210,235,255," + (0.10 + r() * 0.12).toFixed(2) + ")";
        g.lineWidth = 1.4;
        g.beginPath();
        g.moveTo(r() * 20, wy);
        g.quadraticCurveTo(TW / 2, wy - 3, TW - r() * 20, wy);
        g.stroke();
      }
    }

    if (code === T.PLAZA || code === T.STONE) {
      g.strokeStyle = "rgba(0,0,0,0.16)";
      g.lineWidth = 1;
      for (var s = 1; s < 4; s++) {
        g.beginPath();
        g.moveTo(0, s * TH / 4);
        g.lineTo(TW, s * TH / 4);
        g.stroke();
      }
    }

    if (code === T.CAVE_WALL) {
      for (var k = 0; k < 9; k++) {
        g.fillStyle = k % 2 ? "#4a4453" : "#262230";
        g.beginPath();
        g.ellipse(r() * TW, r() * TH, 5 + r() * 8, 3 + r() * 5, r() * 3, 0, Math.PI * 2);
        g.fill();
      }
    }

    // top-left light / bottom-right shadow inside the diamond
    var grad = g.createLinearGradient(0, 0, TW, TH);
    grad.addColorStop(0, "rgba(255,255,255,0.10)");
    grad.addColorStop(0.5, "rgba(255,255,255,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.18)");
    g.fillStyle = grad;
    g.fillRect(0, 0, TW, TH);
    g.restore();

    // crisp rim so tiles read as a grid
    g.strokeStyle = "rgba(0,0,0,0.10)";
    g.lineWidth = 1;
    diamondPath(g);
    g.stroke();

    return c;
  }

  function tileArt(code) {
    if (!TILE_CACHE[code]) {
      TILE_CACHE[code] = [bakeTile(code, 0), bakeTile(code, 1), bakeTile(code, 2)];
    }
    return TILE_CACHE[code];
  }

  // ------------------------------------------------------------------ props
  function bakeTree(seed, kind) {
    var c = makeCanvas(72, 92), g = c.getContext("2d");
    var r = rng(seed);
    var cx = 36, baseY = 88;
    var pine = kind === "pine";

    g.fillStyle = "rgba(0,0,0,0.22)";
    g.beginPath();
    g.ellipse(cx, baseY - 2, 17, 6, 0, 0, Math.PI * 2);
    g.fill();

    // trunk
    g.fillStyle = "#6a4a2c";
    g.fillRect(cx - 4, baseY - 30, 8, 30);
    g.fillStyle = "#50361f";
    g.fillRect(cx + 1, baseY - 30, 3, 30);

    if (pine) {
      for (var i = 0; i < 3; i++) {
        var y = baseY - 26 - i * 16;
        var w = 26 - i * 6;
        g.fillStyle = i % 2 ? "#2f6b3a" : "#3a7d44";
        g.beginPath();
        g.moveTo(cx, y - 26);
        g.lineTo(cx + w, y);
        g.lineTo(cx - w, y);
        g.closePath();
        g.fill();
        g.fillStyle = "rgba(255,255,255,0.10)";
        g.beginPath();
        g.moveTo(cx, y - 26);
        g.lineTo(cx + w * 0.55, y - 4);
        g.lineTo(cx, y - 8);
        g.closePath();
        g.fill();
      }
    } else {
      var blobs = [
        { x: cx, y: baseY - 52, rx: 22, ry: 17 },
        { x: cx - 13, y: baseY - 40, rx: 15, ry: 12 },
        { x: cx + 13, y: baseY - 42, rx: 16, ry: 13 },
        { x: cx, y: baseY - 34, rx: 18, ry: 12 }
      ];
      for (var b = 0; b < blobs.length; b++) {
        var bl = blobs[b];
        g.fillStyle = b % 2 ? "#2f6b35" : "#387c3f";
        g.beginPath();
        g.ellipse(bl.x, bl.y, bl.rx, bl.ry, 0, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = "rgba(150,220,120,0.22)";
      g.beginPath();
      g.ellipse(cx - 8, baseY - 60, 13, 8, -0.4, 0, Math.PI * 2);
      g.fill();

      // a few leaf clumps
      for (var l = 0; l < 8; l++) {
        g.fillStyle = r() > 0.5 ? "rgba(110,190,90,0.45)" : "rgba(30,60,30,0.35)";
        g.beginPath();
        g.ellipse(cx + (r() - 0.5) * 40, baseY - 58 + (r() - 0.5) * 26, 4 + r() * 4, 3 + r() * 3, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    return c;
  }

  function bakeRock(seed) {
    var c = makeCanvas(48, 40), g = c.getContext("2d");
    var r = rng(seed);
    g.fillStyle = "rgba(0,0,0,0.2)";
    g.beginPath();
    g.ellipse(24, 35, 15, 5, 0, 0, Math.PI * 2);
    g.fill();

    var pts = [[10, 32], [6, 22], [14, 10], [28, 7], [40, 16], [41, 30], [30, 36], [16, 36]];
    g.beginPath();
    for (var i = 0; i < pts.length; i++) i ? g.lineTo(pts[i][0], pts[i][1]) : g.moveTo(pts[i][0], pts[i][1]);
    g.closePath();
    g.fillStyle = "#7e7f88";
    g.fill();
    g.strokeStyle = "#4d4e57";
    g.lineWidth = 1.5;
    g.stroke();

    g.fillStyle = "#9fa0a8";
    g.beginPath();
    g.moveTo(14, 12); g.lineTo(27, 9); g.lineTo(33, 16); g.lineTo(18, 20);
    g.closePath();
    g.fill();
    for (var k = 0; k < 5; k++) {
      g.strokeStyle = "rgba(0,0,0,0.18)";
      g.beginPath();
      g.moveTo(10 + r() * 26, 14 + r() * 16);
      g.lineTo(12 + r() * 26, 16 + r() * 16);
      g.stroke();
    }
    return c;
  }

  function bakeBush(seed) {
    var c = makeCanvas(44, 34), g = c.getContext("2d");
    g.fillStyle = "rgba(0,0,0,0.18)";
    g.beginPath();
    g.ellipse(22, 30, 12, 4, 0, 0, Math.PI * 2);
    g.fill();
    var r = rng(seed);
    for (var i = 0; i < 4; i++) {
      g.fillStyle = i % 2 ? "#2f6b35" : "#3c7d43";
      g.beginPath();
      g.ellipse(12 + i * 7, 22 - (i % 2) * 5, 10 - i, 8, 0, 0, Math.PI * 2);
      g.fill();
    }
    for (var k = 0; k < 4; k++) {
      g.fillStyle = "rgba(140,220,120,0.35)";
      g.beginPath();
      g.ellipse(10 + r() * 24, 14 + r() * 10, 3, 2, 0, 0, Math.PI * 2);
      g.fill();
    }
    return c;
  }

  function bakeFlower(seed) {
    var c = makeCanvas(20, 20), g = c.getContext("2d");
    var r = rng(seed);
    g.strokeStyle = "#3f7a35";
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(10, 19);
    g.lineTo(10, 9);
    g.stroke();
    var cols = ["#f2d24b", "#e86f8d", "#e9e9f2", "#b98cf0"];
    var col = cols[Math.floor(r() * cols.length)];
    for (var i = 0; i < 5; i++) {
      var a = (i / 5) * Math.PI * 2;
      g.fillStyle = col;
      g.beginPath();
      g.arc(10 + Math.cos(a) * 3, 8 + Math.sin(a) * 3, 2.1, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = "#8a5a2b";
    g.beginPath();
    g.arc(10, 8, 1.6, 0, Math.PI * 2);
    g.fill();
    return c;
  }

  function bakeMushroom(seed) {
    var c = makeCanvas(28, 26), g = c.getContext("2d");
    g.fillStyle = "rgba(0,0,0,0.2)";
    g.beginPath();
    g.ellipse(14, 24, 8, 3, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#e6dcc8";
    g.fillRect(11, 14, 6, 9);
    g.fillStyle = "#c0392b";
    g.beginPath();
    g.ellipse(14, 13, 11, 8, 0, Math.PI, Math.PI * 2);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.75)";
    g.beginPath(); g.arc(10, 8, 2, 0, 6.3); g.fill();
    g.beginPath(); g.arc(18, 10, 1.6, 0, 6.3); g.fill();
    return c;
  }

  function bakeHouse(seed, tint) {
    var c = makeCanvas(132, 132), g = c.getContext("2d");
    var r = rng(seed);
    var cx = 66, baseY = 124, w = 46, h = 34;

    g.fillStyle = "rgba(0,0,0,0.22)";
    g.beginPath();
    g.ellipse(cx, baseY - 2, 44, 12, 0, 0, Math.PI * 2);
    g.fill();

    // walls (left face lighter, right face darker)
    g.fillStyle = tint || "#d8c9a8";
    g.beginPath();
    g.moveTo(cx - w, baseY - h);
    g.lineTo(cx, baseY - h + 20);
    g.lineTo(cx, baseY + 2);
    g.lineTo(cx - w, baseY - h + 22);
    g.closePath();
    g.fill();

    g.fillStyle = shade("#d8c9a8", 0.78);
    g.beginPath();
    g.moveTo(cx + w, baseY - h);
    g.lineTo(cx, baseY - h + 20);
    g.lineTo(cx, baseY + 2);
    g.lineTo(cx + w, baseY - h + 22);
    g.closePath();
    g.fill();

    // timber frame lines
    g.strokeStyle = "rgba(90,60,35,0.45)";
    g.lineWidth = 1.5;
    for (var i = 1; i < 3; i++) {
      g.beginPath();
      g.moveTo(cx - w + i * (w / 3), baseY - h + i * (20 / 3));
      g.lineTo(cx - w + i * (w / 3), baseY - h + 22 + i * (20 / 3));
      g.stroke();
    }

    // roof
    var roof = tint ? "#7c4a3a" : "#a8433a";
    g.fillStyle = roof;
    g.beginPath();
    g.moveTo(cx, baseY - h - 26);
    g.lineTo(cx + w + 10, baseY - h);
    g.lineTo(cx, baseY - h + 22);
    g.lineTo(cx - w - 10, baseY - h);
    g.closePath();
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.14)";
    g.beginPath();
    g.moveTo(cx, baseY - h - 26);
    g.lineTo(cx - w - 10, baseY - h);
    g.lineTo(cx, baseY - h + 6);
    g.closePath();
    g.fill();

    // door + window
    g.fillStyle = "#5a3a22";
    g.fillRect(cx - 12, baseY - 16, 10, 18);
    g.fillStyle = "#6b4728";
    g.fillRect(cx + 12, baseY - 14, 9, 8);
    g.fillStyle = "#f0d98a";
    g.fillRect(cx + 2, baseY - 10, 7, 7);

    // chimney
    g.fillStyle = "#8b6b52";
    g.fillRect(cx + 16, baseY - h - 30, 8, 16);
    return c;
  }

  function bakeWell(seed) {
    var c = makeCanvas(56, 56), g = c.getContext("2d");
    g.fillStyle = "rgba(0,0,0,0.2)";
    g.beginPath(); g.ellipse(28, 50, 18, 6, 0, 0, 6.3); g.fill();
    g.fillStyle = "#8d8f96";
    g.beginPath(); g.ellipse(28, 40, 18, 8, 0, 0, 6.3); g.fill();
    g.fillStyle = "#3d4a5c";
    g.beginPath(); g.ellipse(28, 38, 13, 5, 0, 0, 6.3); g.fill();
    g.fillStyle = "#7a5b3a";
    g.fillRect(13, 20, 4, 20);
    g.fillRect(39, 20, 4, 20);
    g.fillStyle = "#a8433a";
    g.beginPath(); g.moveTo(28, 8); g.lineTo(48, 22); g.lineTo(8, 22); g.closePath(); g.fill();
    return c;
  }

  // ----------------------------------------------------------------- actors
  var ACTOR_DEFS = {
    hero_sword: { skin: "#f2c48c", hair: "#5a3620", cloth: "#3f6fb5", trim: "#e8d48a", metal: "#cfd6e0", weapon: "sword", cape: "#2c4f86" },
    hero_bow: { skin: "#f2c48c", hair: "#3d2a18", cloth: "#3f8a55", trim: "#e8d48a", metal: "#cfd6e0", weapon: "bow", cape: "#2c6a44" },
    goblin: { skin: "#7fae4c", hair: "#2f4a1e", cloth: "#7a5230", trim: "#c8a25a", weapon: "club", ears: true },
    goblin_red: { skin: "#8fbc55", hair: "#2f4a1e", cloth: "#8a5b33", trim: "#c8a25a", weapon: "club", ears: true, hat: "#b23b2e" },
    treant: { skin: "#6a8f45", hair: "#2f6b35", cloth: "#4a6b32", trim: "#8fbf6a", weapon: "none", big: true, leafy: true },
    imp: { skin: "#b06fc0", hair: "#4a2450", cloth: "#6f3b8a", trim: "#e5b04a", weapon: "none", horns: true, wings: true, small: true },
    bat: { skin: "#7a4a8a", hair: "#3d2347", cloth: "#5a2f6b", trim: "#b98cf0", weapon: "none", wings: true, small: true, bat: true },
    bat_big: { skin: "#8a3a4a", hair: "#4a1f28", cloth: "#6b2f3d", trim: "#e86f8d", weapon: "none", wings: true, bat: true, big: true },
    bee: { skin: "#f0c040", hair: "#2a2a2a", cloth: "#e8b32a", trim: "#2a2a2a", weapon: "none", wings: true, small: true, insect: true },
    rat: { skin: "#9a8a7a", hair: "#6b5a4a", cloth: "#7a6a5a", trim: "#e8b0b0", weapon: "none", small: true, beast: true },
    zombie: { skin: "#8fa07a", hair: "#3d4a32", cloth: "#5a6b4a", trim: "#8a9a7a", weapon: "none", undead: true },
    golem: { skin: "#8b8b93", hair: "#5a5a62", cloth: "#73737b", trim: "#a2a2aa", weapon: "none", big: true, rocky: true },
    spider: { skin: "#4a3a5a", hair: "#2a1f33", cloth: "#5a4568", trim: "#b06fc0", weapon: "none", small: true, spider: true },
    slime: { skin: "#5fc46a", hair: "#3f8f4a", cloth: "#5fc46a", trim: "#c8f0a0", weapon: "none", small: true, slime: true },
    slime_blue: { skin: "#4aa8d8", hair: "#2f6f9e", cloth: "#4aa8d8", trim: "#bfe8ff", weapon: "none", small: true, slime: true }
  };

  var ACTOR_CACHE = {};

  function drawWeapon(g, def, cx, shoulderY, dir) {
    var m = def.metal || "#cfd6e0";
    if (def.weapon === "sword") {
      g.save();
      g.translate(cx + 12, shoulderY + 6);
      g.rotate(-0.35);
      g.fillStyle = "#6b4a2c";
      g.fillRect(-2, -3, 5, 9);
      g.fillStyle = def.trim || "#e8d48a";
      g.fillRect(-6, -6, 13, 4);
      g.fillStyle = m;
      g.fillRect(-2.5, -30, 5, 25);
      g.fillStyle = "rgba(255,255,255,0.65)";
      g.fillRect(-1.5, -30, 1.6, 25);
      g.restore();
    } else if (def.weapon === "bow") {
      g.strokeStyle = "#8a5b33";
      g.lineWidth = 2.6;
      g.beginPath();
      g.arc(cx + 14, shoulderY + 8, 13, -1.2, 1.2);
      g.stroke();
      g.strokeStyle = "rgba(240,240,220,0.8)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(cx + 18.5, shoulderY - 4);
      g.lineTo(cx + 18.5, shoulderY + 20);
      g.stroke();
    } else if (def.weapon === "club") {
      g.save();
      g.translate(cx + 13, shoulderY + 10);
      g.rotate(-0.3);
      g.fillStyle = "#7a5230";
      g.fillRect(-2, -4, 5, 16);
      g.fillStyle = "#8f6438";
      g.beginPath();
      g.ellipse(0.5, -12, 7, 9, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(0,0,0,0.25)";
      g.fillRect(-4, -18, 2, 6);
      g.restore();
    }
  }

  function bakeActor(key) {
    if (ACTOR_CACHE[key]) return ACTOR_CACHE[key];
    var def = ACTOR_DEFS[key] || ACTOR_DEFS.goblin;
    var scale = 1;
    var w = 96, h = 112;
    var c = makeCanvas(w, h);
    var g = c.getContext("2d");
    var cx = w / 2, baseY = h - 8;

    var bodyH = (def.small ? 20 : def.big ? 32 : 26);
    var bodyW = (def.small ? 16 : def.big ? 30 : 22);
    var headR = (def.small ? 9 : def.big ? 15 : 12);
    if (def.slime) { headR = 0; }

    // shadow
    g.fillStyle = "rgba(0,0,0,0.28)";
    g.beginPath();
    g.ellipse(cx, baseY + 2, bodyW * 0.85, bodyW * 0.32, 0, 0, Math.PI * 2);
    g.fill();

    if (def.slime) {
      var sw = def.small ? 30 : 40, sh = def.small ? 24 : 34;
      g.fillStyle = def.skin;
      g.beginPath();
      g.moveTo(cx - sw / 2, baseY);
      g.bezierCurveTo(cx - sw / 2, baseY - sh * 1.5, cx + sw / 2, baseY - sh * 1.5, cx + sw / 2, baseY);
      g.closePath();
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.35)";
      g.beginPath();
      g.ellipse(cx - 6, baseY - sh * 0.75, 6, 4, -0.3, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#1d2b1d";
      g.beginPath(); g.arc(cx - 6, baseY - sh * 0.55, 2.2, 0, 6.3); g.fill();
      g.beginPath(); g.arc(cx + 6, baseY - sh * 0.55, 2.2, 0, 6.3); g.fill();
      ACTOR_CACHE[key] = { canvas: c, w: w, h: h, anchorY: baseY, def: def };
      return ACTOR_CACHE[key];
    }

    if (def.beast) {
      // four-legged critter (老鼠 etc.)
      var bl = def.small ? 26 : 36;
      g.strokeStyle = def.skin;
      g.lineWidth = 3;
      for (var q = 0; q < 2; q++) {
        g.beginPath();
        g.moveTo(cx - bl * 0.3 + q * bl * 0.55, baseY - 10);
        g.lineTo(cx - bl * 0.34 + q * bl * 0.55, baseY - 1);
        g.moveTo(cx + bl * 0.05 + q * bl * 0.3, baseY - 10);
        g.lineTo(cx + bl * 0.02 + q * bl * 0.3, baseY - 1);
        g.stroke();
      }
      g.fillStyle = def.skin;
      g.beginPath();
      g.ellipse(cx, baseY - 15, bl * 0.55, bl * 0.34, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = def.hair;
      g.beginPath();
      g.ellipse(cx + bl * 0.42, baseY - 20, bl * 0.28, bl * 0.26, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = def.skin;
      g.beginPath();
      g.ellipse(cx + bl * 0.58, baseY - 24, bl * 0.16, bl * 0.19, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#1b1b22";
      g.beginPath(); g.arc(cx + bl * 0.64, baseY - 26, 1.6, 0, 6.3); g.fill();
      g.strokeStyle = def.hair;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(cx - bl * 0.5, baseY - 16);
      g.quadraticCurveTo(cx - bl * 0.95, baseY - 22, cx - bl * 0.85, baseY - 6);
      g.stroke();
      ACTOR_CACHE[key] = { canvas: c, w: w, h: h, anchorY: baseY, def: def };
      return ACTOR_CACHE[key];
    }

    if (def.spider) {
      g.strokeStyle = def.skin;
      g.lineWidth = 2.4;
      for (var s = 0; s < 4; s++) {
        var off = -8 + s * 5;
        g.beginPath();
        g.moveTo(cx + off, baseY - 10);
        g.quadraticCurveTo(cx + off - 16, baseY - 16 - s * 2, cx + off - 22, baseY + 2);
        g.stroke();
        g.beginPath();
        g.moveTo(cx + off, baseY - 10);
        g.quadraticCurveTo(cx + off + 16, baseY - 16 - s * 2, cx + off + 22, baseY + 2);
        g.stroke();
      }
      g.fillStyle = def.cloth;
      g.beginPath(); g.ellipse(cx, baseY - 12, 12, 10, 0, 0, 6.3); g.fill();
      g.fillStyle = def.skin;
      g.beginPath(); g.ellipse(cx, baseY - 20, 7, 6, 0, 0, 6.3); g.fill();
      g.fillStyle = "#ff5a5a";
      g.beginPath(); g.arc(cx - 3, baseY - 21, 1.4, 0, 6.3); g.fill();
      g.beginPath(); g.arc(cx + 3, baseY - 21, 1.4, 0, 6.3); g.fill();
      ACTOR_CACHE[key] = { canvas: c, w: w, h: h, anchorY: baseY, def: def };
      return ACTOR_CACHE[key];
    }

    var legY = baseY - bodyH * 0.45;
    var shoulderY = baseY - bodyH - headR * 0.55;

    // wings behind body
    if (def.wings) {
      g.fillStyle = "rgba(120,90,150,0.55)";
      for (var side = -1; side <= 1; side += 2) {
        g.beginPath();
        g.moveTo(cx + side * 6, shoulderY + 8);
        g.quadraticCurveTo(cx + side * 40, shoulderY - 12, cx + side * 34, shoulderY + 16);
        g.quadraticCurveTo(cx + side * 22, shoulderY + 12, cx + side * 6, shoulderY + 8);
        g.fill();
      }
      if (def.bat) {
        // bat ears
        g.fillStyle = def.skin;
        g.beginPath(); g.moveTo(cx - 7, shoulderY - 8); g.lineTo(cx - 12, shoulderY - 20); g.lineTo(cx - 2, shoulderY - 12); g.closePath(); g.fill();
        g.beginPath(); g.moveTo(cx + 7, shoulderY - 8); g.lineTo(cx + 12, shoulderY - 20); g.lineTo(cx + 2, shoulderY - 12); g.closePath(); g.fill();
      }
    }

    if (def.insect) {
      g.strokeStyle = def.skin;
      g.lineWidth = 2;
      for (var i = 0; i < 3; i++) {
        g.beginPath();
        g.moveTo(cx - 3, legY + 2 + i * 4);
        g.lineTo(cx - 10, legY + 8 + i * 3);
        g.moveTo(cx + 3, legY + 2 + i * 4);
        g.lineTo(cx + 10, legY + 8 + i * 3);
        g.stroke();
      }
    }

    // legs
    if (!def.bat && !def.insect && !def.beast) {
      g.fillStyle = def.cloth;
      g.fillRect(cx - bodyW * 0.32, legY, bodyW * 0.24, baseY - legY - 2);
      g.fillRect(cx + bodyW * 0.08, legY, bodyW * 0.24, baseY - legY - 2);
      g.fillStyle = "#3a2a1e";
      g.fillRect(cx - bodyW * 0.34, baseY - 6, bodyW * 0.28, 6);
      g.fillRect(cx + bodyW * 0.06, baseY - 6, bodyW * 0.28, 6);
    }

    // torso
    g.fillStyle = def.cloth;
    g.beginPath();
    var tw = bodyW, th = bodyH;
    g.moveTo(cx - tw / 2, legY + 2);
    g.lineTo(cx - tw * 0.42, shoulderY + 2);
    g.quadraticCurveTo(cx, shoulderY - 3, cx + tw * 0.42, shoulderY + 2);
    g.lineTo(cx + tw / 2, legY + 2);
    g.closePath();
    g.fill();
    g.fillStyle = "rgba(0,0,0,0.18)";
    g.fillRect(cx + tw * 0.12, shoulderY, tw * 0.38, legY - shoulderY);

    // belt / trim
    g.fillStyle = def.trim || "#c8a25a";
    g.fillRect(cx - tw / 2 + 1, legY - 3, tw - 2, 3);

    // arms
    g.fillStyle = def.skin;
    g.fillRect(cx - tw / 2 - 3, shoulderY + 4, 4, bodyH * 0.62);
    g.fillRect(cx + tw / 2 - 1, shoulderY + 4, 4, bodyH * 0.62);

    // cape
    if (def.cape) {
      g.fillStyle = def.cape;
      g.beginPath();
      g.moveTo(cx - tw * 0.45, shoulderY + 1);
      g.lineTo(cx - tw * 0.75, baseY - 4);
      g.lineTo(cx + tw * 0.15, baseY - 8);
      g.lineTo(cx + tw * 0.2, shoulderY + 2);
      g.closePath();
      g.fill();
    }

    // head
    g.fillStyle = def.skin;
    g.beginPath();
    g.arc(cx, shoulderY - headR * 0.55, headR, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "rgba(0,0,0,0.12)";
    g.beginPath();
    g.arc(cx + headR * 0.25, shoulderY - headR * 0.5, headR * 0.9, -0.9, 1.2);
    g.fill();

    // hair / hat
    if (def.hat) {
      g.fillStyle = def.hat;
      g.beginPath();
      g.arc(cx, shoulderY - headR * 0.65, headR * 1.05, Math.PI, Math.PI * 2);
      g.fill();
      g.fillRect(cx - headR * 1.05, shoulderY - headR * 0.7, headR * 2.1, headR * 0.35);
    } else {
      g.fillStyle = def.hair;
      g.beginPath();
      g.arc(cx, shoulderY - headR * 0.72, headR * 1.02, Math.PI * 1.02, Math.PI * 1.98);
      g.fill();
      g.fillRect(cx - headR, shoulderY - headR * 1.0, headR * 2, headR * 0.45);
    }

    if (def.leafy) {
      for (var lv = 0; lv < 5; lv++) {
        g.fillStyle = "#3f8a3f";
        g.beginPath();
        g.ellipse(cx - 10 + lv * 5, shoulderY - headR * 1.5 - (lv % 2) * 5, 8, 5, 0, 0, Math.PI * 2);
        g.fill();
      }
    }

    // ears
    if (def.ears) {
      g.fillStyle = def.skin;
      g.beginPath(); g.moveTo(cx - headR * 0.8, shoulderY - headR * 0.7); g.lineTo(cx - headR * 1.7, shoulderY - headR * 1.2); g.lineTo(cx - headR * 0.9, shoulderY - headR * 0.2); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(cx + headR * 0.8, shoulderY - headR * 0.7); g.lineTo(cx + headR * 1.7, shoulderY - headR * 1.2); g.lineTo(cx + headR * 0.9, shoulderY - headR * 0.2); g.closePath(); g.fill();
    }

    // horns
    if (def.horns) {
      g.fillStyle = "#e8dcc0";
      g.beginPath(); g.moveTo(cx - headR * 0.6, shoulderY - headR * 1.2); g.lineTo(cx - headR * 1.1, shoulderY - headR * 1.9); g.lineTo(cx - headR * 0.2, shoulderY - headR * 1.35); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(cx + headR * 0.6, shoulderY - headR * 1.2); g.lineTo(cx + headR * 1.1, shoulderY - headR * 1.9); g.lineTo(cx + headR * 0.2, shoulderY - headR * 1.35); g.closePath(); g.fill();
    }

    // face
    var eyeY = shoulderY - headR * 0.55;
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(cx - headR * 0.38, eyeY, headR * 0.24, 0, 6.3); g.fill();
    g.beginPath(); g.arc(cx + headR * 0.38, eyeY, headR * 0.24, 0, 6.3); g.fill();
    g.fillStyle = def.undead ? "#c0392b" : "#1b1b22";
    g.beginPath(); g.arc(cx - headR * 0.34, eyeY, headR * 0.12, 0, 6.3); g.fill();
    g.beginPath(); g.arc(cx + headR * 0.42, eyeY, headR * 0.12, 0, 6.3); g.fill();

    if (def.rocky) {
      g.strokeStyle = "rgba(0,0,0,0.25)";
      g.lineWidth = 1.6;
      g.beginPath();
      g.moveTo(cx - 8, shoulderY + 4); g.lineTo(cx - 2, shoulderY + 14); g.lineTo(cx + 6, shoulderY + 8);
      g.stroke();
    }

    if (def.weapon && def.weapon !== "none") drawWeapon(g, def, cx, shoulderY, 1);

    ACTOR_CACHE[key] = { canvas: c, w: w, h: h, anchorY: baseY, def: def };
    return ACTOR_CACHE[key];
  }

  var FLASH_CACHE = {};
  function flashOf(key) {
    if (FLASH_CACHE[key]) return FLASH_CACHE[key];
    var a = bakeActor(key);
    var c = makeCanvas(a.w, a.h), g = c.getContext("2d");
    g.drawImage(a.canvas, 0, 0);
    g.globalCompositeOperation = "source-atop";
    g.fillStyle = "rgba(255,255,255,0.92)";
    g.fillRect(0, 0, a.w, a.h);
    FLASH_CACHE[key] = c;
    return c;
  }

  function drawActor(ctx, key, sx, sy, opts) {
    var a = bakeActor(key);
    var s = (opts && opts.scale) || 1;
    var img = (opts && opts.flash) ? flashOf(key) : a.canvas;
    var bob = (opts && opts.bob) || 0;
    ctx.drawImage(
      img,
      sx - (a.w * s) / 2,
      sy - a.anchorY * s - bob,
      a.w * s,
      a.h * s
    );
  }

  // ------------------------------------------------------------------ props
  var PROP_CACHE = {
    tree: [bakeTree(11, "round"), bakeTree(23, "round"), bakeTree(37, "pine")],
    bush: [bakeBush(5), bakeBush(9)],
    rock: [bakeRock(3), bakeRock(17)],
    flower: [bakeFlower(2), bakeFlower(8), bakeFlower(14)],
    mushroom: [bakeMushroom(6)],
    house: [bakeHouse(21), bakeHouse(43, "#d8c9a8"), bakeHouse(67)],
    well: [bakeWell(1)]
  };

  function drawProp(ctx, prop, sx, sy) {
    var list = PROP_CACHE[prop.type];
    if (!list) return;
    var img = list[prop.variant % list.length];
    var s = prop.scale || 1;
    ctx.drawImage(img, sx - img.width / 2 * s, sy - img.height * s + 4, img.width * s, img.height * s);
  }

  // ---------------------------------------------------------------- terrain
  function buildTerrain(level, kind) {
    var cols = Math.max(20, Math.round(level.MapWidth || 50));
    var rows = Math.max(20, Math.round(level.MapHeight || 50));
    var seed = hashStr((level.Name || "level") + ":" + kind);
    var tiles = new Uint8Array(cols * rows);
    var props = [];
    var r = rng(seed);

    function set(gx, gy, v) {
      if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) return;
      tiles[gy * cols + gx] = v;
    }
    function get(gx, gy) {
      if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) return T.WATER;
      return tiles[gy * cols + gx];
    }

    var cx = cols / 2, cy = rows / 2;

    if (kind === "cave") {
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var edge = Math.min(x, y, cols - 1 - x, rows - 1 - y);
          var n = fbm(seed, x * 0.11, y * 0.11, 3);
          var v = T.CAVE;
          if (edge < 2) v = T.CAVE_WALL;
          else if (n > 0.66) v = T.CAVE_WALL;
          set(x, y, v);
        }
      }
    } else if (kind === "island") {
      var R = Math.min(cols, rows) * 0.47;
      for (var y2 = 0; y2 < rows; y2++) {
        for (var x2 = 0; x2 < cols; x2++) {
          var dx = (x2 + 0.5 - cx) / R;
          var dy = (y2 + 0.5 - cy) / R;
          var d = Math.sqrt(dx * dx + dy * dy);
          var n2 = fbm(seed, x2 * 0.09, y2 * 0.09, 3);
          var e = d + (n2 - 0.5) * 0.5;
          var v2;
          if (e > 1.0) v2 = T.WATER;
          else if (e > 0.87) v2 = T.SAND;
          else {
            var f = fbm(seed + 71, x2 * 0.14, y2 * 0.14, 2);
            v2 = f > 0.58 ? T.DARK_GRASS : (f > 0.5 ? T.GRASS2 : T.GRASS);
          }
          set(x2, y2, v2);
        }
      }
    } else {
      // forest / plain
      for (var y3 = 0; y3 < rows; y3++) {
        for (var x3 = 0; x3 < cols; x3++) {
          var n3 = fbm(seed, x3 * 0.12, y3 * 0.12, 3);
          set(x3, y3, n3 > 0.55 ? T.DARK_GRASS : (n3 > 0.45 ? T.GRASS2 : T.GRASS));
        }
      }
    }

    // plaza + roads + town (island only)
    if (kind === "island") {
      var plazaR = 5;
      for (var py = -plazaR; py <= plazaR; py++) {
        for (var px = -plazaR; px <= plazaR; px++) {
          if (px * px + py * py <= plazaR * plazaR) set(Math.round(cx + px), Math.round(cy + py), T.PLAZA);
        }
      }
      var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (var di = 0; di < dirs.length; di++) {
        var dir = dirs[di];
        var px2 = Math.round(cx), py2 = Math.round(cy);
        for (var step = 0; step < Math.max(cols, rows); step++) {
          px2 += dir[0];
          py2 += dir[1];
          var wob = Math.round(Math.sin(step * 0.5 + di) * 1.2);
          var tx = px2 + (dir[0] === 0 ? wob : 0);
          var ty = py2 + (dir[1] === 0 ? wob : 0);
          if (get(tx, ty) === T.WATER) break;
          set(tx, ty, T.DIRT);
          if (di % 2 === 0) set(tx, ty + 1, T.DIRT);
        }
      }
    } else if (kind === "forest") {
      // small clearing where the player starts
      for (var fy = -3; fy <= 3; fy++) {
        for (var fx = -3; fx <= 3; fx++) {
          if (fx * fx + fy * fy <= 9) set(Math.round(cx + fx), Math.round(cy + fy), T.DIRT);
        }
      }
    }

    // roads / floor for cave
    if (kind === "cave") {
      for (var k = 0; k < 90; k++) {
        var ax = Math.floor(cx + (r() - 0.5) * cols * 0.7);
        var ay = Math.floor(cy + (r() - 0.5) * rows * 0.7);
        if (get(ax, ay) === T.CAVE) set(ax, ay, T.STONE);
      }
    }

    // props
    for (var gy = 1; gy < rows - 1; gy++) {
      for (var gx = 1; gx < cols - 1; gx++) {
        var t = get(gx, gy);
        var wx = gx * TILE + TILE / 2;
        var wy = gy * TILE + TILE / 2;
        var rv = r();

        if (t === T.DARK_GRASS) {
          if (rv < 0.22) props.push({ type: "tree", x: wx, y: wy, variant: (gx * 7 + gy * 3) % 3, scale: 0.9 + r() * 0.25 });
          else if (rv < 0.27) props.push({ type: "bush", x: wx, y: wy, variant: (gx + gy) % 2 });
          else if (rv < 0.30) props.push({ type: "mushroom", x: wx, y: wy, variant: 0 });
        } else if (t === T.GRASS || t === T.GRASS2) {
          if (rv < 0.045) props.push({ type: "tree", x: wx, y: wy, variant: (gx * 5 + gy) % 3, scale: 0.85 + r() * 0.3 });
          else if (rv < 0.075) props.push({ type: "flower", x: wx, y: wy, variant: (gx + gy * 2) % 3 });
          else if (rv < 0.09) props.push({ type: "bush", x: wx, y: wy, variant: (gx + gy) % 2 });
        } else if (t === T.CAVE) {
          if (rv < 0.03) props.push({ type: "mushroom", x: wx, y: wy, variant: 0 });
          else if (rv < 0.045) props.push({ type: "rock", x: wx, y: wy, variant: (gx + gy) % 2 });
        } else if (t === T.SAND) {
          if (rv < 0.02) props.push({ type: "rock", x: wx, y: wy, variant: (gx + gy) % 2 });
        }
      }
    }

    // town centre (island only)
    if (kind === "island") {
      var cxT = Math.round(cx), cyT = Math.round(cy);
      var townSpots = [[-4, -3], [3, -4], [-5, 3], [4, 3], [0, -5], [-1, 5]];
      for (var ti = 0; ti < townSpots.length; ti++) {
        var sx2 = cxT + townSpots[ti][0], sy2 = cyT + townSpots[ti][1];
        if (get(sx2, sy2) === T.PLAZA || get(sx2, sy2) === T.GRASS || get(sx2, sy2) === T.GRASS2) {
          props.push({
            type: "house",
            x: sx2 * TILE + TILE / 2,
            y: sy2 * TILE + TILE / 2,
            variant: ti % 3,
            scale: 0.75 + (ti % 2) * 0.05
          });
        }
      }
      props.push({ type: "well", x: cxT * TILE + TILE / 2, y: (cyT + 1) * TILE + TILE / 2, variant: 0, scale: 0.9 });
    }

    props.sort(function (a, b) { return (a.x + a.y) - (b.x + b.y); });

    return {
      cols: cols,
      rows: rows,
      kind: kind,
      tiles: tiles,
      props: props,
      seed: seed,
      widthPx: cols * TILE,
      heightPx: rows * TILE
    };
  }

  // --------------------------------------------------------------- drawing
  function toScreen(x, y, cam, vw, vh) {
    return {
      x: (x - y) - (cam.x - cam.y) + vw / 2,
      y: ((x + y) - (cam.x + cam.y)) * 0.5 + vh / 2
    };
  }

  function drawGround(ctx, terrain, cam, vw, vh, time) {
    var camX = cam.x - cam.y;
    var camY = (cam.x + cam.y) * 0.5;

    ctx.fillStyle = "#0d1118";
    ctx.fillRect(0, 0, vw, vh);

    var phase = Math.floor((time || 0) * 2.5);

    for (var d = 0; d <= terrain.cols + terrain.rows - 2; d++) {
      var gx0 = Math.max(0, d - terrain.rows + 1);
      var gx1 = Math.min(terrain.cols - 1, d);
      for (var gx = gx0; gx <= gx1; gx++) {
        var gy = d - gx;
        var code = terrain.tiles[gy * terrain.cols + gx];
        var wx = gx * TILE + TILE / 2;
        var wy = gy * TILE + TILE / 2;
        var sx = (wx - wy) - camX + vw / 2;
        var sy = ((wx + wy) - (cam.x + cam.y)) * 0.5 + vh / 2;
        if (sx < -TW || sx > vw + TW || sy < -TH || sy > vh + TH) continue;

        var variants = tileArt(code);
        var v = (code === T.WATER) ? (phase + gx + gy) % variants.length : (gx * 3 + gy * 5) % variants.length;
        ctx.drawImage(variants[v], Math.round(sx - TW / 2), Math.round(sy - TH / 2));
      }
    }
  }

  // --------------------------------------------------------- local asset pack
  var OVERRIDES = { actors: {}, tiles: {}, props: {} };

  function loadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  // Optional: assets/local/manifest.json
  // {
  //   "actors": { "hero_sword": "actors/hero_sword.png", "goblin": "actors/goblin.png" },
  //   "tiles":  { "grass": "tiles/grass.png" },
  //   "props":  { "tree": "props/tree.png" }
  // }
  // Images are drawn bottom-centre anchored; actor PNGs should be ~96x112.
  function loadLocalPack(base) {
    base = base || "assets/local/";
    return fetch(base + "manifest.json", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("no manifest"); return r.json(); })
      .then(function (m) {
        var jobs = [];
        function grab(group, bucket) {
          var map = m[group] || {};
          Object.keys(map).forEach(function (key) {
            jobs.push(loadImage(base + map[key]).then(function (img) {
              if (img) OVERRIDES[bucket][key] = img;
            }));
          });
        }
        grab("actors", "actors");
        grab("tiles", "tiles");
        grab("props", "props");
        return Promise.all(jobs).then(function () { return true; });
      })
      .catch(function () { return false; });
  }

  // ------------------------------------------------------------------- api
  global.ART = {
    TILE: TILE,
    TW: TW,
    TH: TH,
    T: T,
    toScreen: toScreen,
    drawGround: drawGround,
    drawActor: drawActor,
    drawProp: drawProp,
    buildTerrain: buildTerrain,
    loadLocalPack: loadLocalPack,
    overrides: OVERRIDES,
    actorKeys: Object.keys(ACTOR_DEFS),
    hasOverride: function (kind, key) { return !!(OVERRIDES[kind] && OVERRIDES[kind][key]); },
    override: function (kind, key) { return (OVERRIDES[kind] || {})[key] || null; }
  };
})(window);
