/* Crossgate Survivors - 網頁版美術層
 *
 * 這一層直接使用專案裡「原本的美術」：
 *   web-assets/art/map_forest.jpg   <- Assets/Temp/位图.png（去掉選單文字的原版地圖）
 *   web-assets/art/tree.png         <- Assets/Temp/7813.png（原版樹木）
 *   web-assets/art/player.gif       <- Assets/Temp/105400.gif（原版角色）
 *   web-assets/art/goblin.gif       <- Assets/Textures/enemy.gif（原版哥布林）
 *   web-assets/art/skills/*.png     <- Assets/Resources/SkillIcons（原版技能圖示）
 *
 * 不同關卡用同一張原版地圖加上色調分級（雪地／沙漠／洞窟／火山…）與環境粒子，
 * 讓每一關都有自己的景色。
 */
(function (global) {
  "use strict";

  // 以 art.js 所在位置推算素材路徑，這樣 Tools/ 下的預覽頁也能共用
  var scriptSrc = (document.currentScript && document.currentScript.src) || "";
  var ART_DIR = scriptSrc ? scriptSrc.replace(/[^\/]*$/, "") + "web-assets/art/" : "web-assets/art/";

  // ------------------------------------------------------------------ 載入
  var IMG = {};
  var loaded = false;

  function loadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  var ASSET_LIST = {
    map: "map_forest.jpg",
    tree: "tree.png",
    player: "player.gif",
    goblin: "goblin.gif",
    portrait: "portrait.png",
    blade: "fx/blade.png",
    circle: "fx/circle.png",
    arrow: "fx/arrow.png"
  };

  var readyPromise = null;

  function load() {
    if (readyPromise) return readyPromise;
    var jobs = Object.keys(ASSET_LIST).map(function (key) {
      return loadImage(ART_DIR + ASSET_LIST[key]).then(function (img) {
        if (img) IMG[key] = img;
      });
    });
    readyPromise = Promise.all(jobs).then(function () {
      loaded = true;
      return true;
    });
    return readyPromise;
  }

  function isReady() { return loaded; }

  // ------------------------------------------------------------- 色調／生物群系
  var BIOMES = {
    forest: {
      filter: "brightness(1.35) saturate(1.12)",
      overlay: "rgba(24,48,16,0.10)",
      blend: "multiply",
      trees: 34, treeTint: "brightness(0.92) saturate(0.95)",
      ambient: "firefly", ambientColor: "rgba(210,255,150,0.85)", ambientCount: 26,
      fog: "rgba(10,20,8,0.14)"
    },
    island: {
      filter: "brightness(1.5) saturate(1.22) contrast(1.02)",
      overlay: "rgba(255,225,150,0.14)",
      blend: "overlay",
      trees: 30, treeTint: "brightness(1.35) saturate(1.1)",
      ambient: "pollen", ambientColor: "rgba(255,246,190,0.9)", ambientCount: 24,
      fog: "rgba(30,50,20,0.06)"
    },
    deepforest: {
      filter: "brightness(1.18) saturate(1.08) hue-rotate(-6deg)",
      overlay: "rgba(10,40,30,0.26)",
      blend: "multiply",
      trees: 58, treeTint: "brightness(0.82) saturate(1.05)",
      ambient: "firefly", ambientColor: "rgba(150,255,190,0.9)", ambientCount: 34,
      fog: "rgba(6,26,18,0.24)"
    },
    cave: {
      filter: "brightness(0.98) saturate(0.62) hue-rotate(215deg)",
      overlay: "rgba(46,26,80,0.34)",
      blend: "multiply",
      trees: 4, treeTint: "brightness(0.6) saturate(0.3) hue-rotate(215deg)",
      ambient: "dust", ambientColor: "rgba(190,180,255,0.5)", ambientCount: 30,
      fog: "rgba(12,8,24,0.34)"
    },
    cave2: {
      filter: "brightness(1.02) saturate(0.75) hue-rotate(35deg)",
      overlay: "rgba(30,60,90,0.3)",
      blend: "multiply",
      trees: 16, treeTint: "brightness(0.74) saturate(0.65) hue-rotate(35deg)",
      ambient: "drip", ambientColor: "rgba(180,220,255,0.55)", ambientCount: 18,
      fog: "rgba(8,16,28,0.32)"
    },
    snow: {
      filter: "brightness(1.28) saturate(0.28) hue-rotate(165deg)",
      overlay: "rgba(205,232,255,0.42)",
      blend: "overlay",
      trees: 34, treeTint: "brightness(1.2) saturate(0.2) hue-rotate(165deg)",
      ambient: "snow", ambientColor: "rgba(255,255,255,0.95)", ambientCount: 90,
      fog: "rgba(200,225,245,0.22)"
    },
    desert: {
      filter: "brightness(1.35) saturate(0.6) hue-rotate(-28deg)",
      overlay: "rgba(232,198,120,0.42)",
      blend: "overlay",
      trees: 8, treeTint: "brightness(1.05) saturate(0.45) hue-rotate(-25deg)",
      ambient: "sand", ambientColor: "rgba(240,220,160,0.55)", ambientCount: 60,
      fog: "rgba(210,170,90,0.2)"
    },
    volcano: {
      filter: "brightness(1.05) saturate(1.35) hue-rotate(-18deg) contrast(1.06)",
      overlay: "rgba(150,30,6,0.34)",
      blend: "multiply",
      trees: 6, treeTint: "brightness(0.78) saturate(1.2) hue-rotate(-18deg)",
      ambient: "ember", ambientColor: "rgba(255,150,60,0.95)", ambientCount: 60,
      fog: "rgba(60,10,0,0.2)"
    },
    graveyard: {
      filter: "brightness(1.0) saturate(0.28) hue-rotate(200deg)",
      overlay: "rgba(30,40,70,0.34)",
      blend: "multiply",
      trees: 34, treeTint: "brightness(0.78) saturate(0.3) hue-rotate(200deg)",
      ambient: "wisp", ambientColor: "rgba(150,210,255,0.65)", ambientCount: 22,
      fog: "rgba(10,14,26,0.3)"
    },
    underwater: {
      filter: "brightness(1.25) saturate(0.95) hue-rotate(115deg)",
      overlay: "rgba(30,110,160,0.5)",
      blend: "overlay",
      trees: 12, treeTint: "brightness(0.95) saturate(1.0) hue-rotate(115deg)",
      ambient: "bubble", ambientColor: "rgba(200,240,255,0.7)", ambientCount: 40,
      fog: "rgba(10,50,90,0.22)"
    }
  };

  var TERRAIN_BIOME = {
    forest: "forest", island: "island", coast: "island", deepforest: "deepforest",
    cave: "cave", cave2: "cave2", snow: "snow", desert: "desert",
    volcano: "volcano", graveyard: "graveyard", underwater: "underwater"
  };

  function biomeFor(level) {
    var key = (level.Terrain || "").toLowerCase();
    if (BIOMES[key]) return BIOMES[key];
    var n = level.Name || "";
    if (/冰|雪|寒/.test(n)) return BIOMES.snow;
    if (/沙漠|砂|沙/.test(n)) return BIOMES.desert;
    if (/炎|火|熔/.test(n)) return BIOMES.volcano;
    if (/靈堂|墓|墳|幽/.test(n)) return BIOMES.graveyard;
    if (/海底|海/.test(n)) return BIOMES.underwater;
    if (/樹海/.test(n)) return BIOMES.deepforest;
    if (/洞窟|洞穴|迷宮|地下|坑道/.test(n)) return BIOMES.cave;
    if (/島|海岸|沙灘/.test(n)) return BIOMES.island;
    return BIOMES.forest;
  }

  // 把原版地圖套上該關卡的色調，快取最近兩張
  var bgCache = {};

  function makeCanvas(w, h) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, w);
    c.height = Math.max(1, h);
    return c;
  }

  function grayscaleCopy(src) {
    var c = makeCanvas(src.width, src.height);
    var g = c.getContext("2d");
    g.filter = "saturate(0.15) brightness(1.05)";
    g.drawImage(src, 0, 0);
    g.filter = "none";
    return c;
  }

  function buildBackdrop(biome, biomeKey) {
    if (bgCache[biomeKey]) return bgCache[biomeKey];
    if (!IMG.map) return null;

    var c = makeCanvas(IMG.map.width, IMG.map.height);
    var g = c.getContext("2d");
    g.filter = biome.filter;
    g.drawImage(IMG.map, 0, 0);
    g.filter = "none";

    g.globalCompositeOperation = biome.blend === "overlay" ? "overlay" : "multiply";
    g.fillStyle = biome.overlay;
    g.fillRect(0, 0, c.width, c.height);
    g.globalCompositeOperation = "source-over";

    // 邊緣壓暗，避免地圖接邊生硬
    var vg = g.createRadialGradient(c.width / 2, c.height / 2, Math.min(c.width, c.height) * 0.34,
      c.width / 2, c.height / 2, Math.max(c.width, c.height) * 0.62);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.3)");
    g.fillStyle = vg;
    g.fillRect(0, 0, c.width, c.height);

    // 只留兩張快取
    var keys = Object.keys(bgCache);
    if (keys.length >= 2) { delete bgCache[keys[0]]; }
    bgCache[biomeKey] = c;
    return c;
  }

  // ------------------------------------------------------------------ 場景
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function hashStr(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function buildLevel(level) {
    var biomeKey = "forest";
    if (level.Terrain) {
      var tk = String(level.Terrain).toLowerCase();
      biomeKey = TERRAIN_BIOME[tk] || (BIOMES[tk] ? tk : pickBiomeByName(level.Name));
    } else {
      biomeKey = pickBiomeByName(level.Name);
    }
    if (!BIOMES[biomeKey]) biomeKey = "forest";
    var biome = BIOMES[biomeKey];

    var w = IMG.map ? IMG.map.width : Math.max(20, level.MapWidth || 50) * 42;
    var h = IMG.map ? IMG.map.height : Math.max(20, level.MapHeight || 50) * 42;

    var bg = buildBackdrop(biome, biomeKey);

    // 樹木：用原版樹圖，依關卡決定數量；避開出生點
    var r = rng(hashStr((level.Name || "level") + biomeKey));
    var trees = [];
    var count = biome.trees || 0;
    var cx = w / 2, cy = h / 2;
    var guard = 0;
    while (trees.length < count && guard < count * 40) {
      guard++;
      var x = 60 + r() * (w - 120);
      var y = 80 + r() * (h - 160);
      var dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy < 230 * 230) continue;
      var scale = 0.5 + r() * 0.38;
      trees.push({
        type: "tree",
        x: x, y: y,
        scale: scale,
        swap: r() > 0.5,
        biomeDef: biome
      });
    }
    trees.sort(function (a, b) { return a.y - b.y; });

    return {
      biome: biomeKey,
      biomeDef: biome,
      w: w, h: h,
      bg: bg,
      props: trees,
      seed: hashStr((level.Name || "") + ":" + biomeKey)
    };
  }

  function pickBiomeByName(name) {
    var n = name || "";
    if (/冰|雪|寒/.test(n)) return "snow";
    if (/沙漠|砂/.test(n)) return "desert";
    if (/炎|火|熔/.test(n)) return "volcano";
    if (/靈堂|墓|墳|幽/.test(n)) return "graveyard";
    if (/海底/.test(n)) return "underwater";
    if (/樹海/.test(n)) return "deepforest";
    if (/洞窟|洞穴|迷宮|地下/.test(n)) return "cave";
    if (/島|海岸/.test(n)) return "island";
    return "forest";
  }

  // ------------------------------------------------------------- 畫面繪製
  function drawGround(ctx, scene, cam, vw, vh, time) {
    ctx.fillStyle = "#0b0f0a";
    ctx.fillRect(0, 0, vw, vh);
    if (!scene) return;

    var ox = Math.round(vw / 2 - cam.x);
    var oy = Math.round(vh / 2 - cam.y);

    if (scene.bg) {
      ctx.drawImage(scene.bg, ox, oy);
    } else {
      ctx.fillStyle = "#3f6b2a";
      ctx.fillRect(ox, oy, scene.w, scene.h);
    }
  }

  var TREE_CACHE = {};

  function drawProp(ctx, prop, sx, sy) {
    if (prop.type !== "tree" || !IMG.tree) return;
    var biomeDef = prop.biomeDef || null;
    var key = prop.scale.toFixed(2) + "|" + (biomeDef ? biomeDef.treeTint : "") + "|" + (prop.swap ? 1 : 0);
    var img = TREE_CACHE[key];
    if (!img) {
      var sc = prop.scale;
      var w = Math.round(IMG.tree.width * sc);
      var h = Math.round(IMG.tree.height * sc);
      var c = makeCanvas(w, h);
      var g = c.getContext("2d");
      if (biomeDef && biomeDef.treeTint) g.filter = biomeDef.treeTint;
      if (prop.swap) {
        g.save();
        g.scale(-1, 1);
        g.drawImage(IMG.tree, -w, 0, w, h);
        g.restore();
      } else {
        g.drawImage(IMG.tree, 0, 0, w, h);
      }
      g.filter = "none";
      img = c;
      TREE_CACHE[key] = c;
    }
    ctx.drawImage(img, Math.round(sx - img.width / 2), Math.round(sy - img.height + 6));
  }

  function propFoot(prop) { return { x: prop.x, y: prop.y }; }

  // ------------------------------------------------------------ 角色與怪物
  // 專案裡的原版怪物圖只有哥布林（enemy.gif），其餘用同風格的像素小怪補齊。
  var MONSTER_CACHE = {};

  function monsterSprite(type) {
    if (MONSTER_CACHE[type]) return MONSTER_CACHE[type];
    var S = 32;
    var c = makeCanvas(S, S);
    var g = c.getContext("2d");
    g.lineJoin = "round";
    g.lineCap = "round";
    g.lineWidth = 1.5;
    g.strokeStyle = "#171210";

    function fill(color) { g.fillStyle = color; g.fill(); }
    function ell(x, y, rx, ry, color) {
      g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); fill(color); g.stroke();
    }
    function poly(pts, color) {
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
      g.closePath(); fill(color); g.stroke();
    }
    function box(x, y, w, h, color) { g.fillStyle = color; g.fillRect(x, y, w, h); g.strokeRect(x, y, w, h); }
    function eyes(y, dx, color) {
      g.fillStyle = color || "#1a1410";
      g.fillRect(16 - dx - 1, y, 2, 2);
      g.fillRect(16 + dx - 1, y, 2, 2);
    }

    if (type === "slime") {
      g.beginPath();
      g.moveTo(6, 28); g.quadraticCurveTo(6, 12, 16, 12);
      g.quadraticCurveTo(26, 12, 26, 28);
      g.closePath(); fill("#5fbf5f"); g.stroke();
      ell(12, 18, 3, 2, "rgba(220,255,220,0.55)");
      eyes(20, 4);
      g.strokeStyle = "#1a1410"; g.beginPath(); g.moveTo(14, 24); g.quadraticCurveTo(16, 26, 18, 24); g.stroke();
    } else if (type === "bat") {
      poly([[14, 16], [2, 9], [5, 20], [11, 19]], "#6b4f9e");
      poly([[18, 16], [30, 9], [27, 20], [21, 19]], "#6b4f9e");
      ell(16, 18, 6, 7, "#8a6ac2");
      poly([[11, 12], [12, 6], [15, 11]], "#8a6ac2");
      poly([[21, 12], [20, 6], [17, 11]], "#8a6ac2");
      eyes(16, 3, "#ff4d4d");
      g.fillStyle = "#fff"; g.fillRect(15, 21, 1, 2); g.fillRect(17, 21, 1, 2);
    } else if (type === "bee") {
      g.globalAlpha = 0.65;
      ell(10, 12, 5, 3, "#f2fbff");
      ell(22, 12, 5, 3, "#f2fbff");
      g.globalAlpha = 1;
      ell(16, 21, 8, 7, "#f2c94c");
      g.fillStyle = "#2b2118";
      g.fillRect(11, 17, 10, 2);
      g.fillRect(11, 21, 10, 2);
      g.fillRect(12, 25, 8, 2);
      poly([[16, 28], [14, 31], [18, 31]], "#2b2118");
      eyes(16, 4, "#1a1410");
      g.strokeStyle = "#2b2118";
      g.beginPath(); g.moveTo(13, 13); g.lineTo(11, 9); g.stroke();
      g.beginPath(); g.moveTo(19, 13); g.lineTo(21, 9); g.stroke();
    } else if (type === "rat") {
      g.strokeStyle = "#171210";
      g.beginPath(); g.moveTo(6, 24); g.quadraticCurveTo(1, 20, 3, 15); g.stroke();
      ell(15, 24, 9, 6, "#9c8877");
      ell(23, 21, 5, 5, "#b09a86");
      ell(25, 16, 3, 3, "#c9b3a0");
      g.fillStyle = "#e88fa8"; g.fillRect(27, 21, 2, 2);
      eyes(19, 6, "#1a1410");
      box(8, 27, 3, 3, "#9c8877");
      box(19, 27, 3, 3, "#9c8877");
    } else if (type === "spider") {
      g.strokeStyle = "#171210";
      for (var i = 0; i < 4; i++) {
        var yy = 16 + i * 4;
        g.beginPath(); g.moveTo(12, yy); g.lineTo(4, yy - 4); g.lineTo(1, yy + 3); g.stroke();
        g.beginPath(); g.moveTo(20, yy); g.lineTo(28, yy - 4); g.lineTo(31, yy + 3); g.stroke();
      }
      ell(16, 22, 8, 7, "#4b3a5e");
      ell(16, 13, 5, 4, "#5d4a72");
      g.fillStyle = "#ff5c5c";
      g.fillRect(13, 12, 2, 2); g.fillRect(18, 12, 2, 2);
      g.fillRect(14, 15, 1, 1); g.fillRect(17, 15, 1, 1);
    } else if (type === "zombie") {
      box(11, 22, 4, 8, "#4d5a43");
      box(18, 22, 4, 8, "#4d5a43");
      box(10, 12, 12, 12, "#5b6b4a");
      box(6, 14, 5, 4, "#7d9c6a");
      box(21, 14, 5, 4, "#7d9c6a");
      ell(16, 9, 5, 5, "#8fb37a");
      eyes(8, 2, "#c43030");
      g.strokeStyle = "#3a2c22";
      g.beginPath(); g.moveTo(13, 13); g.lineTo(17, 18); g.stroke();
    } else if (type === "golem") {
      box(8, 13, 16, 15, "#8a8f9a");
      box(12, 5, 8, 8, "#9aa0ac");
      box(3, 15, 5, 10, "#7d828d");
      box(24, 15, 5, 10, "#7d828d");
      box(9, 28, 5, 3, "#6f747f");
      box(18, 28, 5, 3, "#6f747f");
      g.fillStyle = "#7cf3ff";
      g.fillRect(14, 8, 2, 2); g.fillRect(17, 8, 2, 2);
      g.strokeStyle = "#5c6068";
      g.beginPath(); g.moveTo(10, 20); g.lineTo(14, 24); g.lineTo(12, 26); g.stroke();
    } else if (type === "treant") {
      ell(16, 8, 12, 7, "#4e9a44");
      ell(10, 9, 7, 6, "#63b356");
      ell(22, 9, 7, 6, "#63b356");
      ell(16, 5, 8, 5, "#7cc96b");
      box(13, 14, 7, 16, "#6b4a2a");
      g.strokeStyle = "#3a2716";
      g.beginPath(); g.moveTo(14, 22); g.lineTo(9, 18); g.stroke();
      g.beginPath(); g.moveTo(19, 24); g.lineTo(24, 20); g.stroke();
      g.fillStyle = "#ffd166";
      g.fillRect(14, 17, 2, 2); g.fillRect(17, 17, 2, 2);
    } else { // imp
      poly([[11, 15], [3, 12], [7, 21]], "#8a3fae");
      poly([[21, 15], [29, 12], [25, 21]], "#8a3fae");
      ell(16, 21, 6, 7, "#b05ad0");
      ell(16, 11, 5, 5, "#c86ee0");
      poly([[11, 8], [10, 3], [14, 7]], "#6f2a8f");
      poly([[21, 8], [22, 3], [18, 7]], "#6f2a8f");
      g.strokeStyle = "#6f2a8f";
      g.beginPath(); g.moveTo(21, 26); g.quadraticCurveTo(27, 27, 25, 22); g.stroke();
      eyes(10, 2, "#ffe066");
    }

    MONSTER_CACHE[type] = c;
    return c;
  }

  var ENEMY_VISUAL = {
    0: { img: "goblin", scale: 1.55 },
    1: { img: "goblin", scale: 1.55, filter: "hue-rotate(-42deg) saturate(1.5) brightness(1.05)" },
    2: { draw: "treant", scale: 2.0 },
    3: { draw: "imp", scale: 1.8 },
    4: { draw: "bat", scale: 1.85, filter: "hue-rotate(-25deg) saturate(1.4)" },
    5: { draw: "bat", scale: 1.85, filter: "hue-rotate(95deg) saturate(1.2)" },
    6: { draw: "bee", scale: 1.7 },
    7: { draw: "rat", scale: 1.65 },
    8: { draw: "zombie", scale: 1.9 },
    9: { draw: "golem", scale: 2.1 },
    10: { draw: "bat", scale: 2.9, filter: "hue-rotate(-60deg) saturate(1.3) brightness(0.95)" },
    11: { draw: "spider", scale: 1.8 },
    12: { draw: "slime", scale: 1.7 },
    13: { draw: "slime", scale: 1.7, filter: "hue-rotate(190deg) saturate(1.2)" }
  };

  function visualForEnemy(e) {
    if (e.art && ENEMY_VISUAL[e.art]) return ENEMY_VISUAL[e.art];
    var byId = ENEMY_VISUAL[e.id];
    if (byId) return byId;
    var n = e.name || "";
    if (/蝙蝠|蜜蜂|使魔|鳥/.test(n)) return ENEMY_VISUAL[4];
    return ENEMY_VISUAL[0];
  }

  function filterFor(v) {
    if (v.filter) return v.filter;
    var parts = [];
    if (v.hue) parts.push("hue-rotate(" + v.hue + "deg)");
    if (v.sat && v.sat !== 1) parts.push("saturate(" + v.sat + ")");
    if (v.bright && v.bright !== 1) parts.push("brightness(" + v.bright + ")");
    return parts.length ? parts.join(" ") : "none";
  }

  function drawSpriteEntity(ctx, img, sx, sy, scale, opts) {
    if (!img) return;
    opts = opts || {};
    var w = img.width * scale;
    var h = img.height * scale;
    var dx = sx - w / 2;
    var dy = sy - h;
    ctx.save();
    if (opts.filter && opts.filter !== "none") ctx.filter = opts.filter;
    if (opts.squash && opts.squash !== 1) {
      ctx.translate(sx, sy);
      ctx.scale(1, opts.squash);
      ctx.translate(-sx, -sy);
    }
    if (opts.pixel) ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, dx, dy, w, h);
    ctx.restore();

    if (opts.flash) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(img, dx, dy, w, h);
      ctx.restore();
    }
  }

  function drawShadow(ctx, sx, sy, w) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.beginPath();
    ctx.ellipse(sx, sy - 2, w * 0.42, w * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPlayer(ctx, p, sx, sy, time) {
    var img = IMG.player;
    var scale = p.artScale || 1.15;
    drawShadow(ctx, sx, sy, img ? img.width * scale : 40);
    if (img) {
      ctx.save();
      if (p.artHue) ctx.filter = "hue-rotate(" + p.artHue + "deg) saturate(1.1)";
      ctx.drawImage(img, sx - img.width * scale / 2, sy - img.height * scale, img.width * scale, img.height * scale);
      ctx.restore();
    }
  }

  function drawEnemy(ctx, e, sx, sy, time, scaleMul) {
    var v = visualForEnemy(e);
    var img = v.img ? IMG[v.img] : monsterSprite(v.draw);
    if (!img) return;
    var scale = (v.scale || 1) * (scaleMul || 1) * (e.isBoss ? 1.7 : 1);
    drawShadow(ctx, sx, sy, img.width * scale * 0.9);
    var bob = Math.sin(time * 7 + e.x * 0.05) * 1.2;
    drawSpriteEntity(ctx, img, sx, sy + bob, scale, {
      filter: filterFor(v),
      flash: e.hitFlash > 0,
      squash: v.squash,
      pixel: !!v.draw
    });
  }

  // -------------------------------------------------------------- 環境粒子
  function ambientParticles(scene, cam, vw, vh, time) {
    var def = scene.biomeDef;
    if (!def || !def.ambientCount) return null;
    var out = [];
    var n = def.ambientCount;
    var seed = scene.seed || 1;

    for (var i = 0; i < n; i++) {
      var r1 = ((Math.imul(seed + i * 7919, 2654435761) >>> 0) % 10000) / 10000;
      var r2 = ((Math.imul(seed + i * 104729, 40503) >>> 0) % 10000) / 10000;
      var r3 = ((Math.imul(seed + i * 15485863, 99991) >>> 0) % 10000) / 10000;
      var x, y, a, s;

      if (def.ambient === "snow") {
        y = (r2 * vh + time * (18 + r3 * 26)) % (vh + 40) - 20;
        x = (r1 * vw + Math.sin(time * 0.7 + i) * 26 + vw) % vw;
        s = 1 + r3 * 2.2; a = 0.55 + r3 * 0.45;
      } else if (def.ambient === "ember") {
        y = vh - ((r2 * vh + time * (26 + r3 * 40)) % (vh + 60));
        x = (r1 * vw + Math.sin(time * 1.6 + i) * 30 + vw) % vw;
        s = 1 + r3 * 2; a = 0.35 + 0.45 * Math.abs(Math.sin(time * 2 + i));
      } else if (def.ambient === "sand") {
        x = (r1 * vw + time * (90 + r3 * 120)) % (vw + 120) - 60;
        y = (r2 * vh + time * (10 + r3 * 20)) % vh;
        s = 6 + r3 * 22; a = 0.10 + r3 * 0.16;
      } else if (def.ambient === "firefly" || def.ambient === "wisp") {
        x = (r1 * vw + Math.sin(time * 0.5 + i * 1.7) * 46 + vw) % vw;
        y = (r2 * vh + Math.cos(time * 0.4 + i * 2.3) * 40 + vh) % vh;
        s = 1.4 + r3 * 2.2;
        a = 0.25 + 0.65 * Math.abs(Math.sin(time * 1.1 + i * 0.9));
      } else if (def.ambient === "bubble") {
        y = vh - ((r2 * vh + time * (30 + r3 * 50)) % (vh + 40));
        x = (r1 * vw + Math.sin(time * 1.2 + i) * 14 + vw) % vw;
        s = 2 + r3 * 4; a = 0.2 + r3 * 0.4;
      } else if (def.ambient === "drip") {
        y = (r2 * vh + time * 120) % (vh + 20);
        x = r1 * vw;
        s = 1 + r3; a = 0.4;
      } else if (def.ambient === "dust") {
        x = (r1 * vw + Math.sin(time * 0.3 + i) * 20 + vw) % vw;
        y = (r2 * vh + time * (8 + r3 * 12)) % vh;
        s = 1 + r3 * 1.6; a = 0.15 + r3 * 0.25;
      } else {
        continue;
      }
      out.push({ x: x, y: y, s: s, a: a });
    }
    return out;
  }

  function drawAmbient(ctx, scene, cam, vw, vh, time) {
    if (!scene) return;
    var def = scene.biomeDef;
    var parts = ambientParticles(scene, cam, vw, vh, time);
    if (!parts) return;

    ctx.save();
    if (def.ambient === "sand") {
      ctx.strokeStyle = def.ambientColor;
      ctx.lineWidth = 1.5;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.s, p.y - 2);
        ctx.stroke();
      }
    } else if (def.ambient === "bubble") {
      ctx.strokeStyle = def.ambientColor;
      ctx.lineWidth = 1.2;
      for (var b = 0; b < parts.length; b++) {
        ctx.globalAlpha = parts[b].a;
        ctx.beginPath();
        ctx.arc(parts[b].x, parts[b].y, parts[b].s, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      for (var k = 0; k < parts.length; k++) {
        var q = parts[k];
        ctx.globalAlpha = q.a;
        ctx.fillStyle = def.ambientColor;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.s, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawFog(ctx, scene, vw, vh) {
    if (!scene || !scene.biomeDef || !scene.biomeDef.fog) return;
    ctx.fillStyle = scene.biomeDef.fog;
    ctx.fillRect(0, 0, vw, vh);
  }

  // 技能圖示
  function skillIcon(iconId) {
    return ART_DIR + "skills/" + iconId + ".png";
  }

  function hasSkillIcon(iconId) {
    return !!iconId;
  }

  // 關卡封面：前兩關用原本的 LevelCover，其餘用該關卡色調的地圖縮圖
  var coverCache = {};

  function levelCover(level, index) {
    if (index === 0) return ART_DIR + "cover_0.jpg";
    if (index === 1) return ART_DIR + "cover_1.jpg";
    var biomeKey = level.Terrain || "forest";
    if (!BIOMES[biomeKey]) biomeKey = pickBiomeByName(level.Name);
    if (coverCache[biomeKey]) return coverCache[biomeKey];

    var bg = buildBackdrop(BIOMES[biomeKey], biomeKey);
    if (!bg) return ART_DIR + "cover_0.jpg";

    var cw = 420, ch = 200;
    var c = makeCanvas(cw, ch);
    var g = c.getContext("2d");
    var scale = Math.max(cw / bg.width, ch / bg.height);
    var dw = bg.width * scale, dh = bg.height * scale;
    g.filter = "brightness(1.65) saturate(1.15)";
    g.drawImage(bg, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    g.filter = "none";
    g.fillStyle = "rgba(0,0,0,0.18)";
    g.fillRect(0, 0, cw, ch);
    var url = c.toDataURL("image/jpeg", 0.82);
    coverCache[biomeKey] = url;
    return url;
  }

  // ------------------------------------------------------------------- api
  global.ART = {
    load: load,
    isReady: isReady,
    buildLevel: buildLevel,
    biomeFor: biomeFor,
    drawGround: drawGround,
    drawProp: drawProp,
    propFoot: propFoot,
    drawPlayer: drawPlayer,
    drawEnemy: drawEnemy,
    drawAmbient: drawAmbient,
    drawFog: drawFog,
    skillIcon: skillIcon,
    hasSkillIcon: hasSkillIcon,
    levelCover: levelCover,
    images: IMG,
    dir: ART_DIR
  };
})(window);
