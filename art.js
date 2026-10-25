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

  // 圖片下載佇列：一關可能有 100 種以上的怪物 × 6 段動作，
  // 若一次全部建立 <img>，瀏覽器連線數會被吃滿，走路／攻擊／死亡圖反而更慢到位。
  // 這裡限制同時下載數，並讓「待機 → 行走 → 攻擊 → 施法 → 受傷 → 死亡」依序補齊。
  var IMG_QUEUE = [];
  var IMG_ACTIVE = 0;
  var IMG_MAX_ACTIVE = 10;

  function pumpImageQueue() {
    while (IMG_ACTIVE < IMG_MAX_ACTIVE && IMG_QUEUE.length) {
      (function (job) {
        IMG_ACTIVE++;
        var img = new Image();
        var settled = false;
        function done() {
          if (settled) return;
          settled = true;
          IMG_ACTIVE--;
          try { job.resolve(img); } catch (e) {}
          pumpImageQueue();
        }
        img.onload = done;
        img.onerror = done;
        try { img.decoding = "async"; } catch (e) {}
        img.src = job.src;
        // 已經在快取裡的圖可能同步完成，保險起見再檢查一次
        if (img.complete) setTimeout(done, 0);
      })(IMG_QUEUE.shift());
    }
  }

  function loadImage(src) {
    return new Promise(function (resolve) {
      IMG_QUEUE.push({ src: src, resolve: resolve });
      pumpImageQueue();
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
    arrow: "fx/arrow.png",
    // 原版角色：劍士（西恩 105053）與弓箭手（葛蕾絲 106126）
    // 8 方向 × 待機／行走／攻擊，由 Tools/build-character-assets.py 產生
    player_sword_idle: "player_sword_idle.png",
    player_sword_walk: "player_sword_walk.png",
    player_sword_attack: "player_sword_attack.png",
    player_bow_idle: "player_bow_idle.png",
    player_bow_walk: "player_bow_walk.png",
    player_bow_attack: "player_bow_attack.png"
  };

  // 角色 sprite sheet 設定（方向 0=N,1=NE,2=E,3=SE,4=S,5=SW,6=W,7=NW）
  var PLAYER_ART = {
    sword: {
      idle:   { img: "player_sword_idle",   n: 4,  cw: 128, ch: 128, ax: 64,  ay: 88  },
      walk:   { img: "player_sword_walk",   n: 6,  cw: 128, ch: 128, ax: 64,  ay: 88  },
      attack: { img: "player_sword_attack", n: 16, cw: 256, ch: 224, ax: 128, ay: 140 }
    },
    bow: {
      idle:   { img: "player_bow_idle",   n: 4,  cw: 128, ch: 128, ax: 64,  ay: 88  },
      walk:   { img: "player_bow_walk",   n: 6,  cw: 128, ch: 128, ax: 64,  ay: 88  },
      attack: { img: "player_bow_attack", n: 13, cw: 256, ch: 224, ax: 128, ay: 140 }
    }
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

  // --------------------------------------------------- 原版怪物素材（含動作狀態）
  // 動畫 WebP 直接 drawImage 到 canvas 時只會停在第一格，所以
  // Tools/build-monster-sheets.py 會把每一格攤成橫向 sprite sheet：
  //   web-assets/monsters/<id>/<state>_sheet.webp
  //   web-assets/monsters/sheets.json（每格尺寸、格數、每格毫秒）
  // 這裡依時間自己切格，走動／攻擊／施法／受傷／死亡才會真的動起來。
  var MON_DIR = ART_DIR.replace(/web-assets\/art\/$/, "web-assets/monsters/");
  var MON = {};        // id -> { idle, walk, attack, special, hurt, die }
  // sheets.js 會以 <script> 先載入（file:// 也能用）；sheets.json 只作為更新後的後備。
  var MON_META = (global.MONSTER_SHEETS && typeof global.MONSTER_SHEETS === "object") ? global.MONSTER_SHEETS : null;
  var monMetaPromise = null;
  var ANIM_STATES = ["idle", "walk", "attack", "special", "hurt", "die"];

  function loadMonsterMeta() {
    if (monMetaPromise) return monMetaPromise;
    if (MON_META) {
      monMetaPromise = Promise.resolve(MON_META);
      return monMetaPromise;
    }
    monMetaPromise = fetch(MON_DIR + "sheets.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; })
      .then(function (data) { MON_META = data || {}; return MON_META; });
    return monMetaPromise;
  }

  function loadMonster(id, states) {
    if (!id) return Promise.resolve(null);
    states = states || ANIM_STATES;
    var set = MON[id];
    if (!set) {
      set = {};
      MON[id] = set;
    }
    return loadMonsterMeta().then(function () {
      var jobs = [];
      states.forEach(function (state) {
        if (set[state]) return;
        var key = "_p_" + state;
        if (set[key]) { jobs.push(set[key]); return; }
        set[key] = loadImage(MON_DIR + id + "/" + state + "_sheet.webp").then(function (img) {
          if (!img) {
            // 舊資料（尚未產生 sheet）時退回單一動畫檔，至少不會空白
            return loadImage(MON_DIR + id + "/" + state + ".webp").then(function (old) {
              if (old) set[state] = old;
              delete set[key];
              return old;
            });
          }
          set[state] = img;
          delete set[key];
          return img;
        });
        jobs.push(set[key]);
      });
      return Promise.all(jobs).then(function () { return set; });
    });
  }

  function monsterMeta(id, state) {
    var m = MON_META && MON_META[id];
    return (m && m[state]) || null;
  }

  // 某段動作的總長度（秒）。死亡動畫要播完整才淡出，不能固定 1 秒。
  function monsterAnimDuration(id, state) {
    var meta = monsterMeta(id, state);
    if (!meta) return 0;
    var durs = meta.d || [];
    var total = 0;
    for (var i = 0; i < (meta.n || 0); i++) total += (durs[i] || 120) / 1000;
    return total;
  }

  function loadMonsters(ids, onProgress, states) {
    var uniq = [];
    (ids || []).forEach(function (id) {
      if (id && uniq.indexOf(id) < 0) uniq.push(id);
    });
    var done = 0;
    return Promise.all(uniq.map(function (id) {
      return loadMonster(id, states).then(function (set) {
        done++;
        if (onProgress) onProgress(done, uniq.length);
        return set;
      });
    }));
  }

  function monsterLoaded(id) {
    return !!(id && MON[id]);
  }

  function monsterStates(id) {
    var set = id && MON[id];
    if (!set) return [];
    return ["idle", "walk", "attack", "special", "hurt", "die"].filter(function (k) { return !!set[k]; });
  }

  function clampNum(v, a, b) { return Math.max(a, Math.min(b, v)); }

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
      filter: "brightness(1.42) saturate(0.34) hue-rotate(-52deg)",
      overlay: "rgba(238,205,135,0.52)",
      blend: "overlay",
      trees: 8, treeTint: "brightness(1.0) saturate(0.35) hue-rotate(-45deg)",
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

  // 每個地區的地標：讓 15 張地圖除了色調之外還有自己的輪廓
  var LANDMARKS = {
    forest:     { kind: "shrine",    count: 6, tint: "#c9b47a" },
    island:     { kind: "shrine",    count: 7, tint: "#e8d9a0" },
    deepforest: { kind: "mushroom",  count: 9, tint: "#9fe6b8" },
    cave:       { kind: "crystal",   count: 8, tint: "#b49cff" },
    cave2:      { kind: "crystal",   count: 9, tint: "#9fd8ff" },
    snow:       { kind: "crystal",   count: 7, tint: "#dff3ff" },
    desert:     { kind: "ruin",      count: 8, tint: "#e6c98a" },
    volcano:    { kind: "lavacrack", count: 7, tint: "#ff8a4a" },
    graveyard:  { kind: "grave",     count: 9, tint: "#b9c6e6" },
    underwater: { kind: "coral",     count: 10, tint: "#8fe6ff" }
  };

  // 每個生物群系的裝飾小物、地面貼花與前景植物
  var THEME_PROPS = {
    forest:     ["rock", "bush", "stump", "fern", "rock"],
    island:     ["rock", "shell", "bush", "reed", "rock"],
    deepforest: ["bush", "rock", "fern", "stump", "bush"],
    cave:       ["rock", "bones", "crystalbit", "rock"],
    cave2:      ["rock", "bones", "torch", "crystalbit", "rock"],
    snow:       ["icespike", "rock", "bones", "pine", "icespike"],
    desert:     ["cactus", "rock", "bones", "ruin", "cactus"],
    volcano:    ["rock", "lavacrack", "bones", "torch", "rock"],
    graveyard:  ["bones", "statue", "grave", "torch", "bones"],
    underwater: ["coral", "shell", "rock", "reed", "coral"]
  };

  var THEME_DECALS = {
    forest:     ["tuft", "flower", "pebble", "leaf", "moss"],
    island:     ["tuft", "flower", "pebble", "shell", "sand"],
    deepforest: ["tuft", "mushroom", "leaf", "moss", "pebble"],
    cave:       ["crack", "pebble", "moss", "crystalbit", "ash"],
    cave2:      ["crack", "pebble", "moss", "crystalbit", "ash"],
    snow:       ["snowdrift", "crack", "pebble", "icebit", "snowdrift"],
    desert:     ["sand", "pebble", "bones", "crack", "cactusbit"],
    volcano:    ["crack", "ember", "pebble", "ash", "bones"],
    graveyard:  ["crack", "moss", "bones", "leaf", "ash"],
    underwater: ["sand", "shell", "bubble", "moss", "pebble"]
  };

  var THEME_FG = {
    forest: ["grass", "fern", "leaf"],
    island: ["grass", "reed", "leaf"],
    deepforest: ["grass", "fern", "leaf"],
    cave: ["stalag", "moss", "drip"],
    cave2: ["stalag", "moss", "drip"],
    snow: ["grass", "snowbank", "icebit"],
    desert: ["grass", "reed", "sand"],
    volcano: ["grass", "ember", "ash"],
    graveyard: ["grass", "moss", "wisp"],
    underwater: ["reed", "coral", "bubble"]
  };

  var DECAL_COLORS = {
    forest:     { tuft: "#79b04a", flower: "#ffe27a", pebble: "#8d8a7a", leaf: "#c8a35a", moss: "#5c8a3c" },
    island:     { tuft: "#8fc35a", flower: "#ffd6e6", pebble: "#c9bfa0", shell: "#f2e3c8", sand: "#e6d29a" },
    deepforest: { tuft: "#4f8a46", mushroom: "#9fe6b8", leaf: "#7a5f32", moss: "#3f6b3e", pebble: "#6b6a5a" },
    cave:       { crack: "#2a2140", pebble: "#6f6886", moss: "#4f7f72", crystalbit: "#b49cff", ash: "#544a68" },
    cave2:      { crack: "#24384a", pebble: "#6b7d8f", moss: "#4f8f86", crystalbit: "#9fd8ff", ash: "#4a5c6b" },
    snow:       { snowdrift: "#f4fbff", crack: "#8fa6bb", pebble: "#b8c6d6", icebit: "#d8f4ff", ash: "#a4b6c6" },
    desert:     { sand: "#e9cf94", pebble: "#b8a073", bones: "#eee6cf", crack: "#9c7b4d", cactusbit: "#6f9a4a" },
    volcano:    { crack: "#3a1c14", ember: "#ff8a3d", pebble: "#6b4a3e", ash: "#54443c", bones: "#d8c7b0" },
    graveyard:  { crack: "#2c3244", moss: "#4f6b58", bones: "#d8d8cc", leaf: "#6b5a3d", ash: "#4a5060" },
    underwater: { sand: "#8fbfcf", shell: "#e8f6ff", bubble: "#c8f4ff", moss: "#5aa08f", pebble: "#6b8f9a" }
  };

  var LEVEL_TINT = {
    forest: ["rgba(255,235,150,0.06)", "rgba(120,200,255,0.05)", "rgba(255,160,90,0.05)"],
    island: ["rgba(255,240,180,0.08)", "rgba(140,230,255,0.06)", "rgba(255,190,120,0.06)"],
    deepforest: ["rgba(90,255,180,0.04)", "rgba(120,160,255,0.05)", "rgba(255,120,90,0.04)"],
    cave: ["rgba(150,120,255,0.06)", "rgba(90,200,255,0.05)", "rgba(255,120,200,0.04)"],
    cave2: ["rgba(90,200,255,0.06)", "rgba(140,255,200,0.05)", "rgba(200,150,255,0.05)"],
    snow: ["rgba(180,220,255,0.08)", "rgba(230,245,255,0.07)", "rgba(150,190,255,0.06)"],
    desert: ["rgba(255,210,120,0.07)", "rgba(255,170,90,0.06)", "rgba(255,240,190,0.06)"],
    volcano: ["rgba(255,110,40,0.07)", "rgba(255,170,60,0.06)", "rgba(200,60,20,0.07)"],
    graveyard: ["rgba(120,160,255,0.06)", "rgba(160,120,255,0.05)", "rgba(90,255,200,0.04)"],
    underwater: ["rgba(90,200,255,0.07)", "rgba(120,255,220,0.06)", "rgba(180,140,255,0.05)"]
  };

  // 15 張地圖各自的辨識特徵：水池／道路／天候／地標材質都不同，
  // 讓每一關除了色調之外還有自己的地景記憶點。
  var LEVEL_SCENERY = [
    { // 0 芙蕾雅島：碧綠潮池與白色砂路
      pool: { kind: "water", color: "#45c8c0", shore: "#d8e6c0", count: 3, r: [70, 132] },
      path: { kind: "sand", color: "rgba(240,232,190,0.5)", width: 46 },
      weather: { kind: "petal", color: "#fff2c8", color2: "#a8e6cf", count: 34, speed: 1.0, size: 2.2, alpha: 0.55 },
      landmark: { kind: "shrine", tint: "#e8d9a0", signature: ["coral", "waterfall"] },
      fog: "rgba(255,240,200,0.05)"
    },
    { // 1 索奇亞島：綠洲與商旅古道
      pool: { kind: "oasis", color: "#2fb8a8", shore: "#e3cc8c", count: 2, r: [90, 160] },
      path: { kind: "sand", color: "rgba(228,198,132,0.55)", width: 52 },
      weather: { kind: "sand", color: "#ffe3a8", count: 52, speed: 2.4, size: 7, alpha: 0.3 },
      landmark: { kind: "ruin", tint: "#e6c98a", signature: ["obelisk", "pillar"] },
      fog: "rgba(255,214,140,0.07)"
    },
    { // 2 莎蓮娜島：發光菇林與盤根小徑
      pool: { kind: "water", color: "#3fd0a0", shore: "#24483c", count: 3, r: [64, 118] },
      path: { kind: "root", color: "rgba(96,66,40,0.55)", width: 40 },
      weather: { kind: "firefly", color: "#a8ffd8", count: 46, speed: 0.5, size: 2.4, alpha: 0.8 },
      landmark: { kind: "mushroom", tint: "#9fe6b8", signature: ["shrine", "crystalcluster"] },
      fog: "rgba(40,120,90,0.12)"
    },
    { // 3 米內葛爾島：石祠、溪流與落葉
      pool: { kind: "water", color: "#3fa8d8", shore: "#6f7a52", count: 2, r: [70, 128] },
      path: { kind: "dirt", color: "rgba(122,96,60,0.5)", width: 40 },
      weather: { kind: "leaf", color: "#ffb454", color2: "#c8e07a", count: 30, speed: 1.1, size: 3.0, alpha: 0.6 },
      landmark: { kind: "shrine", tint: "#c9b47a", signature: ["torii", "banner"] },
      fog: "rgba(255,230,170,0.05)"
    },
    { // 4 庫魯克斯島：凍湖、冰晶與落雪
      pool: { kind: "ice", color: "#bfeaff", shore: "#e9f7ff", count: 3, r: [80, 150] },
      path: { kind: "ice", color: "rgba(226,246,255,0.55)", width: 46 },
      weather: { kind: "snow", color: "#ffffff", count: 62, speed: 1.3, size: 2.2, alpha: 0.8 },
      landmark: { kind: "crystal", tint: "#dff3ff", signature: ["obelisk", "crystalcluster"] },
      fog: "rgba(200,235,255,0.09)"
    },
    { // 5 德威特島：秋色森林與傾頹石牆
      pool: { kind: "water", color: "#3a8f9c", shore: "#5a4a30", count: 2, r: [66, 120] },
      path: { kind: "dirt", color: "rgba(132,100,58,0.5)", width: 42 },
      weather: { kind: "leaf", color: "#e88a3c", color2: "#ffd166", count: 38, speed: 1.4, size: 3.2, alpha: 0.65 },
      landmark: { kind: "ruin", tint: "#c9b47a", signature: ["torii", "arch"] },
      fog: "rgba(255,180,110,0.05)"
    },
    { // 6 傑諾姆島：地下湖與滴水
      pool: { kind: "water", color: "#3f7fd8", shore: "#1e2038", count: 3, r: [76, 140] },
      path: { kind: "stone", color: "rgba(110,104,140,0.45)", width: 38 },
      weather: { kind: "drip", color: "#9fd8ff", count: 40, speed: 2.8, size: 6, alpha: 0.5 },
      landmark: { kind: "crystal", tint: "#b49cff", signature: ["bones", "crystalcluster"] },
      fog: "rgba(30,26,60,0.16)"
    },
    { // 7 弗利德島：熔岩池與火山灰
      pool: { kind: "lava", color: "#ff7420", shore: "#3a2018", count: 4, r: [60, 116] },
      path: { kind: "ash", color: "rgba(84,64,56,0.55)", width: 48 },
      weather: { kind: "ember", color: "#ffb15c", count: 54, speed: 1.7, size: 2.4, alpha: 0.9 },
      landmark: { kind: "lavacrack", tint: "#ff8a4a", signature: ["bones", "lavapool"] },
      fog: "rgba(120,40,10,0.14)"
    },
    { // 8 樂園之卵：星光水池與虹彩
      pool: { kind: "water", color: "#5fd8ff", shore: "#f0d6ff", count: 3, r: [84, 150] },
      path: { kind: "crystal", color: "rgba(180,220,255,0.45)", width: 44 },
      weather: { kind: "star", color: "#ffe9a8", color2: "#a8e6ff", count: 40, speed: 0.8, size: 2.8, alpha: 0.9 },
      landmark: { kind: "shrine", tint: "#ffd6ff", signature: ["sundial", "arch"] },
      fog: "rgba(160,220,255,0.07)"
    },
    { // 9 辛梅爾：幽泉、墓碑與鬼火
      pool: { kind: "void", color: "#6f7fd8", shore: "#2a2e44", count: 2, r: [70, 126] },
      path: { kind: "stone", color: "rgba(120,130,160,0.42)", width: 40 },
      weather: { kind: "wisp", color: "#a9c8ff", count: 42, speed: 0.55, size: 2.6, alpha: 0.85 },
      landmark: { kind: "grave", tint: "#b9c6e6", signature: ["bones", "statue"] },
      fog: "rgba(30,36,60,0.16)"
    },
    { // 10 諾斯菲拉特：凍結藍洞與霜霧
      pool: { kind: "ice", color: "#8fdcff", shore: "#cfeaff", count: 3, r: [86, 156] },
      path: { kind: "ice", color: "rgba(180,232,255,0.5)", width: 44 },
      weather: { kind: "snow", color: "#dff3ff", count: 56, speed: 1.1, size: 2.0, alpha: 0.75 },
      landmark: { kind: "crystal", tint: "#9fd8ff", signature: ["obelisk", "crystalcluster"] },
      fog: "rgba(120,180,230,0.13)"
    },
    { // 11 哈那可半島：海岸潮池與漂流木
      pool: { kind: "water", color: "#3fc0d0", shore: "#efe2b8", count: 3, r: [78, 142] },
      path: { kind: "sand", color: "rgba(238,226,190,0.55)", width: 50 },
      weather: { kind: "wind", color: "#e8fbff", count: 44, speed: 3.4, size: 10, alpha: 0.35 },
      landmark: { kind: "ruin", tint: "#c9d8b0", signature: ["shipwreck", "banner"] },
      fog: "rgba(160,220,240,0.07)"
    },
    { // 12 逆星：虛空裂隙與隕星
      pool: { kind: "void", color: "#b25fd8", shore: "#241a36", count: 3, r: [70, 132] },
      path: { kind: "stone", color: "rgba(70,52,92,0.55)", width: 42 },
      weather: { kind: "star", color: "#ff9bd2", color2: "#b49cff", count: 48, speed: 1.6, size: 2.6, alpha: 0.9 },
      landmark: { kind: "crystal", tint: "#ff9bd2", signature: ["obelisk", "pillar"] },
      fog: "rgba(60,20,80,0.15)"
    },
    { // 13 日耀之域：灼熱沙丘與蜃景水灘
      pool: { kind: "oasis", color: "#7fd8c8", shore: "#e9cf94", count: 2, r: [70, 130] },
      path: { kind: "sand", color: "rgba(255,226,150,0.55)", width: 54 },
      weather: { kind: "mote", color: "#ffe08a", count: 46, speed: 0.9, size: 2.2, alpha: 0.7 },
      landmark: { kind: "ruin", tint: "#ffd79a", signature: ["sundial", "statue"] },
      fog: "rgba(255,190,90,0.1)"
    },
    { // 14 水曜之域：珊瑚礁、沉沒石道與氣泡
      pool: { kind: "water", color: "#2f8fd8", shore: "#1c4a68", count: 4, r: [80, 148] },
      path: { kind: "stone", color: "rgba(80,140,160,0.45)", width: 44 },
      weather: { kind: "bubble", color: "#c8f4ff", count: 52, speed: 1.2, size: 3.2, alpha: 0.6 },
      landmark: { kind: "coral", tint: "#8fe6ff", signature: ["shipwreck", "waterfall"] },
      fog: "rgba(10,50,90,0.2)"
    }
  ];

  function levelIndex(level) {
    var m = /^(\d+)/.exec(String((level && level.Region) || ""));
    if (m) return clampNum(parseInt(m[1], 10) - 1, 0, LEVEL_SCENERY.length - 1);
    var d = level && level.Difficulty;
    if (typeof d === "number") return clampNum(Math.round(d) - 1, 0, LEVEL_SCENERY.length - 1);
    return 0;
  }

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
    var lvIdx = levelIndex(level);
    var scenery = LEVEL_SCENERY[lvIdx] || LEVEL_SCENERY[0];

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

    // 地標：沿著出生點外圈擺放，讓每個地區有自己的地景記憶點
    var ldef = LANDMARKS[biomeKey] || LANDMARKS.forest;
    if (scenery.landmark) {
      ldef = { kind: scenery.landmark.kind, count: ldef.count, tint: scenery.landmark.tint };
    }
    // 每關混搭主地標 + 專屬地標，避免 15 關看起來都一樣
    var lkinds = [ldef.kind];
    if (scenery.landmark && scenery.landmark.signature) {
      var sig = scenery.landmark.signature;
      if (Object.prototype.toString.call(sig) === "[object Array]") {
        sig.forEach(function (k) { if (lkinds.indexOf(k) < 0) lkinds.push(k); });
      } else if (lkinds.indexOf(sig) < 0) {
        lkinds.push(sig);
      }
    }
    var landmarks = [];
    var arenaR = Math.min(w, h) * 0.16;
    var lcount = ldef.count + 1;
    for (var li = 0; li < lcount; li++) {
      var lr = r();
      var ang = (li / lcount) * Math.PI * 2 + lr * 0.5;
      var radius = arenaR + 180 + r() * Math.max(80, Math.min(w, h) * 0.26);
      var lx = cx + Math.cos(ang) * radius;
      var ly = cy + Math.sin(ang) * radius * 0.82;
      if (lx < 90 || lx > w - 90 || ly < 110 || ly > h - 90) continue;
      landmarks.push({
        type: "landmark",
        kind: lkinds[li % lkinds.length],
        tint: ldef.tint,
        x: lx, y: ly,
        scale: li === 0 ? 1.4 + r() * 0.3 : 0.8 + r() * 0.55,
        flip: r() > 0.5
      });
    }

    // 地面貼花：草叢、花、碎石、裂縫、雪堆、貝殼等，讓每個地區的地表不再單調
    var decals = [];
    var decalKinds = THEME_DECALS[biomeKey] || THEME_DECALS.forest;
    var decalColors = DECAL_COLORS[biomeKey] || DECAL_COLORS.forest;
    var decalCount = clampNum(Math.round(w * h / 7000), 190, 400);
    for (var di = 0; di < decalCount; di++) {
      var dkind = decalKinds[Math.floor(r() * decalKinds.length)];
      decals.push({
        kind: dkind,
        x: 30 + r() * (w - 60),
        y: 40 + r() * (h - 80),
        s: 0.55 + r() * 0.9,
        rot: r() * Math.PI * 2,
        color: decalColors[dkind] || "#9a9a88",
        phase: r() * Math.PI * 2
      });
    }

    // 主題小物：岩石、灌木、仙人掌、冰柱、白骨、貝殼、火把、雕像…
    var extraProps = [];
    var decoKinds = THEME_PROPS[biomeKey] || THEME_PROPS.forest;
    var decoCount = clampNum(Math.round(w * h / 22000), 14, 36);
    var dguard = 0;
    while (extraProps.length < decoCount && dguard < decoCount * 40) {
      dguard++;
      var dxp = 70 + r() * (w - 140);
      var dyp = 90 + r() * (h - 180);
      var dcx = dxp - cx, dcy = dyp - cy;
      if (dcx * dcx + dcy * dcy < 190 * 190) continue;
      var dkind2 = decoKinds[Math.floor(r() * decoKinds.length)];
      extraProps.push({
        type: "deco",
        kind: dkind2,
        x: dxp, y: dyp,
        scale: 0.65 + r() * 0.75,
        flip: r() > 0.5,
        tint: decalColors[dkind2] || "#9a9a88",
        phase: r() * Math.PI * 2
      });
    }

    // 前景層：高草、蘆葦、蕨葉、鐘乳石等，畫在角色之上製造景深
    var fg = [];
    var fgKinds = THEME_FG[biomeKey] || THEME_FG.forest;
    var fgCount = clampNum(Math.round(w * h / 14500), 50, 130);
    for (var fi2 = 0; fi2 < fgCount; fi2++) {
      fg.push({
        kind: fgKinds[Math.floor(r() * fgKinds.length)],
        x: 20 + r() * (w - 40),
        y: 30 + r() * (h - 60),
        scale: 0.55 + r() * 1.05,
        phase: r() * Math.PI * 2,
        alpha: 0.35 + r() * 0.45
      });
    }

    var tintOpts = LEVEL_TINT[biomeKey] || LEVEL_TINT.forest;
    var tint = tintOpts[hashStr(level.Name || "level") % tintOpts.length];

    // 每關專屬水池：水／綠洲／冰湖／熔岩／虛空
    var pools = [];
    if (scenery.pool) {
      var pdef = scenery.pool;
      for (var pi = 0; pi < pdef.count; pi++) {
        var pang = (pi / Math.max(1, pdef.count)) * Math.PI * 2 + r() * 1.2;
        var prad = arenaR + 170 + r() * Math.min(w, h) * 0.28;
        var pxp = cx + Math.cos(pang) * prad;
        var pyp = cy + Math.sin(pang) * prad * 0.78;
        var pr = pdef.r[0] + r() * (pdef.r[1] - pdef.r[0]);
        if (pxp - pr < 40 || pxp + pr > w - 40 || pyp - pr < 70 || pyp + pr > h - 40) continue;
        pools.push({
          x: pxp, y: pyp, r: pr,
          squash: 0.52 + r() * 0.16,
          kind: pdef.kind,
          color: pdef.color,
          shore: pdef.shore,
          phase: r() * Math.PI * 2
        });
      }
    }

    // 貫穿地圖的小徑：砂路、泥路、盤根、石板、冰道
    var pathPts = null;
    if (scenery.path) {
      var pdef2 = scenery.path;
      var segs = 7;
      var pphase = r() * Math.PI * 2;
      var pamp = Math.min(w, h) * (0.11 + r() * 0.09);
      pathPts = [];
      for (var pgi = 0; pgi <= segs; pgi++) {
        pathPts.push({
          x: -50 + (w + 100) * pgi / segs,
          y: clampNum(cy + Math.sin(pgi * 1.15 + pphase) * pamp, 50, h - 50)
        });
      }
      pathPts.def = pdef2;
    }

    // 天候粒子（螢火、落葉、飛雪、熔岩灰、星塵、氣泡…）
    var weather = null;
    if (scenery.weather) {
      var wdef = scenery.weather;
      var dots = [];
      for (var wi2 = 0; wi2 < wdef.count; wi2++) {
        dots.push({
          x: r(), y: r(),
          ph: r() * Math.PI * 2,
          sp: 0.6 + r() * 0.85,
          sz: 0.55 + r() * 0.9,
          sw: r() * 2 - 1
        });
      }
      weather = {
        kind: wdef.kind, color: wdef.color, color2: wdef.color2,
        speed: wdef.speed, size: wdef.size, alpha: wdef.alpha, dots: dots
      };
    }

    var props = trees.concat(landmarks).concat(extraProps);
    props.sort(function (a, b) { return a.y - b.y; });

    return {
      biome: biomeKey,
      biomeDef: biome,
      w: w, h: h,
      bg: bg,
      props: props,
      decals: decals,
      fg: fg,
      tint: tint,
      pools: pools,
      path: pathPts,
      weather: weather,
      scenery: scenery,
      arena: { x: cx, y: cy, r: arenaR, color: level.ArenaColor || "#ffcf7a" },
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

    // 每關專屬色調，即使是同一種地形也有不同氣氛
    if (scene.tint) {
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = scene.tint;
      ctx.fillRect(ox, oy, scene.w, scene.h);
      ctx.restore();
    }

    // 小徑與水池（畫在貼花之前，讓草石自然疊在上面）
    if (scene.path) drawPath(ctx, scene, ox, oy, time);
    if (scene.pools && scene.pools.length) drawPools(ctx, scene, ox, oy, vw, vh, time);

    // 地面貼花
    if (scene.decals) {
      for (var i = 0; i < scene.decals.length; i++) {
        var d = scene.decals[i];
        var sx = d.x + ox, sy = d.y + oy;
        if (sx < -40 || sx > vw + 40 || sy < -40 || sy > vh + 40) continue;
        drawDecal(ctx, d, sx, sy, time);
      }
    }
  }

  function pathStroke(ctx, pts, ox, oy) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x + ox, pts[0].y + oy);
    for (var i = 1; i < pts.length - 1; i++) {
      var mx = (pts[i].x + pts[i + 1].x) * 0.5 + ox;
      var my = (pts[i].y + pts[i + 1].y) * 0.5 + oy;
      ctx.quadraticCurveTo(pts[i].x + ox, pts[i].y + oy, mx, my);
    }
    var last = pts[pts.length - 1];
    ctx.lineTo(last.x + ox, last.y + oy);
    ctx.stroke();
  }

  // 貫穿地圖的小徑：砂路、泥路、盤根、石板、冰道
  function drawPath(ctx, scene, ox, oy, time) {
    var pts = scene.path;
    if (!pts || pts.length < 2) return;
    var def = pts.def || {};
    var wd = def.width || 42;
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = wd + 12;
    pathStroke(ctx, pts, ox, oy);
    ctx.strokeStyle = def.color || "rgba(160,140,100,0.45)";
    ctx.lineWidth = wd;
    pathStroke(ctx, pts, ox, oy);
    ctx.globalAlpha = 0.5;
    if (def.kind === "root") {
      ctx.strokeStyle = "#3f2c1c";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 12]);
      ctx.lineDashOffset = -time * 6;
      pathStroke(ctx, pts, ox, oy);
      ctx.setLineDash([]);
    } else if (def.kind === "stone") {
      ctx.strokeStyle = "rgba(210,220,240,0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 14]);
      pathStroke(ctx, pts, ox, oy);
      ctx.setLineDash([]);
    } else if (def.kind === "ice") {
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([22, 18]);
      ctx.lineDashOffset = time * 4;
      pathStroke(ctx, pts, ox, oy);
      ctx.setLineDash([]);
    } else {
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 20]);
      ctx.lineDashOffset = -time * 3;
      pathStroke(ctx, pts, ox, oy);
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  // 每關的水池／熔岩池／冰湖／虛空池
  function drawPools(ctx, scene, ox, oy, vw, vh, time) {
    if (!scene.pools) return;
    for (var i = 0; i < scene.pools.length; i++) {
      var p = scene.pools[i];
      var sx = p.x + ox, sy = p.y + oy;
      if (sx + p.r < -60 || sx - p.r > vw + 60 || sy + p.r < -60 || sy - p.r > vh + 60) continue;
      var kind = p.kind;
      var pulse = 0.5 + 0.5 * Math.sin(time * 1.4 + p.phase);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(1, p.squash || 0.6);

      // 岸邊
      ctx.globalAlpha = kind === "lava" ? 0.9 : 0.5;
      ctx.fillStyle = p.shore || "#3a4a3a";
      ctx.beginPath(); ctx.arc(0, 0, p.r + 10, 0, Math.PI * 2); ctx.fill();

      // 主體
      var g = ctx.createRadialGradient(-p.r * 0.22, -p.r * 0.28, p.r * 0.08, 0, 0, p.r);
      if (kind === "lava") {
        g.addColorStop(0, "rgba(255,236,150,0.98)");
        g.addColorStop(0.45, p.color);
        g.addColorStop(1, "rgba(120,24,8,0.95)");
      } else if (kind === "ice") {
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(0.55, p.color);
        g.addColorStop(1, "rgba(120,180,220,0.9)");
      } else if (kind === "void") {
        g.addColorStop(0, "rgba(240,210,255,0.9)");
        g.addColorStop(0.5, p.color);
        g.addColorStop(1, "rgba(24,10,40,0.95)");
      } else if (kind === "oasis") {
        g.addColorStop(0, "rgba(160,255,230,0.95)");
        g.addColorStop(0.6, p.color);
        g.addColorStop(1, "rgba(16,90,86,0.92)");
      } else {
        g.addColorStop(0, "rgba(180,250,255,0.92)");
        g.addColorStop(0.6, p.color);
        g.addColorStop(1, "rgba(16,60,90,0.92)");
      }
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();

      // 水面波紋／熔岩流動
      ctx.globalAlpha = kind === "lava" ? 0.5 + pulse * 0.3 : 0.2;
      ctx.strokeStyle = kind === "lava" ? "#ffd166" : "#eaffff";
      ctx.lineWidth = 2;
      for (var k = 0; k < 3; k++) {
        var rr = p.r * (0.34 + k * 0.21) + Math.sin(time * 0.9 + p.phase + k) * 3;
        ctx.beginPath();
        ctx.arc(0, 0, rr, p.phase + k, p.phase + k + Math.PI * 1.25);
        ctx.stroke();
      }

      if (kind === "ice") {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-p.r * 0.5, -p.r * 0.1); ctx.lineTo(-p.r * 0.1, p.r * 0.2); ctx.lineTo(p.r * 0.35, -p.r * 0.15);
        ctx.stroke();
      } else if (kind === "void") {
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = "#ffd6ff";
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 14]);
        ctx.lineDashOffset = -time * 12;
        ctx.beginPath(); ctx.arc(0, 0, p.r * 0.8, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
      } else if (kind === "lava") {
        ctx.globalAlpha = 0.4 + pulse * 0.5;
        ctx.fillStyle = "#ffe9a8";
        for (var b = 0; b < 4; b++) {
          var ba = p.phase + b * 1.7;
          var br = p.r * (0.25 + 0.16 * (b % 2));
          ctx.beginPath();
          ctx.arc(Math.cos(ba) * br, Math.sin(ba) * br, 2.6 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }

  function drawDecal(ctx, d, sx, sy, time) {
    var s = d.s || 1;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(d.rot || 0);
    ctx.scale(s, s);
    var c = d.color || "#9a9a88";
    if (d.kind === "tuft") {
      ctx.strokeStyle = c;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      for (var i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 3, 2);
        ctx.quadraticCurveTo(i * 4, -3, i * 3 + Math.sin(time * 1.8 + d.phase + i) * 2, -9 - (i === 0 ? 3 : 0));
        ctx.stroke();
      }
    } else if (d.kind === "flower" || d.kind === "mushroom") {
      ctx.strokeStyle = d.kind === "flower" ? "#6f9a4a" : "#c9bfa0";
      ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -6); ctx.stroke();
      ctx.fillStyle = c;
      if (d.kind === "flower") {
        for (var p = 0; p < 4; p++) {
          var pa = p * Math.PI / 2;
          ctx.beginPath(); ctx.arc(Math.cos(pa) * 3, -7 + Math.sin(pa) * 2.4, 2.1, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = "#fff6c8";
        ctx.beginPath(); ctx.arc(0, -7, 1.4, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.beginPath(); ctx.ellipse(0, -7, 5, 2.8, 0, Math.PI, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.beginPath(); ctx.arc(-1.5, -8, 0.9, 0, Math.PI * 2); ctx.fill();
      }
    } else if (d.kind === "pebble" || d.kind === "ash") {
      ctx.fillStyle = c;
      ctx.globalAlpha = d.kind === "ash" ? 0.55 : 0.8;
      ctx.beginPath(); ctx.ellipse(0, 0, 4.2, 2.4, 0.2, 0, Math.PI * 2); ctx.fill();
      if (d.kind === "pebble") {
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        ctx.beginPath(); ctx.ellipse(-1, -1, 1.7, 0.9, 0.2, 0, Math.PI * 2); ctx.fill();
      }
    } else if (d.kind === "leaf" || d.kind === "cactusbit") {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.75;
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 2, 0.5, 0, Math.PI * 2); ctx.fill();
      if (d.kind === "leaf") {
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(-4, 1); ctx.lineTo(4, -1); ctx.stroke();
      }
    } else if (d.kind === "moss") {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.28;
      ctx.beginPath(); ctx.ellipse(0, 0, 9, 4.5, 0.2, 0, Math.PI * 2); ctx.fill();
    } else if (d.kind === "crack") {
      ctx.strokeStyle = c;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-12, 2); ctx.lineTo(-5, -1); ctx.lineTo(0, 1); ctx.lineTo(6, -3); ctx.lineTo(12, 0);
      ctx.stroke();
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(0, 1); ctx.lineTo(-2, 6); ctx.stroke();
    } else if (d.kind === "snowdrift") {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.ellipse(0, 0, 11, 5, 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath(); ctx.ellipse(-2, -2, 5, 2, 0.1, 0, Math.PI * 2); ctx.fill();
    } else if (d.kind === "sand") {
      ctx.strokeStyle = c;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.2;
      for (var sa = 0; sa < 3; sa++) {
        ctx.beginPath();
        ctx.arc(0, sa * 3 - 3, 8 - sa, 0.15, Math.PI - 0.15);
        ctx.stroke();
      }
    } else if (d.kind === "shell") {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 4, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 0.8;
      for (var sh = 1; sh <= 3; sh++) {
        ctx.beginPath(); ctx.arc(0, 0, sh * 1.4, 0.4, Math.PI * 1.5); ctx.stroke();
      }
    } else if (d.kind === "bubble") {
      ctx.strokeStyle = c;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath(); ctx.arc(-1, -1.2, 1.1, 0, Math.PI * 2); ctx.fill();
    } else if (d.kind === "crystalbit" || d.kind === "icebit") {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(0, -6); ctx.lineTo(3.5, 0); ctx.lineTo(0, 4); ctx.lineTo(-3.5, 0);
      ctx.closePath(); ctx.fill();
    } else if (d.kind === "ember") {
      ctx.fillStyle = c;
      ctx.shadowColor = c;
      ctx.shadowBlur = 8 + 4 * Math.sin(time * 3 + d.phase);
      ctx.globalAlpha = 0.55 + 0.35 * Math.abs(Math.sin(time * 2 + d.phase));
      ctx.beginPath(); ctx.arc(0, 0, 2.4, 0, Math.PI * 2); ctx.fill();
    } else if (d.kind === "bones") {
      ctx.strokeStyle = c;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(-6, 1); ctx.lineTo(5, -2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(1, 4); ctx.stroke();
    }
    ctx.restore();
  }

  var TREE_CACHE = {};

  function drawProp(ctx, prop, sx, sy) {
    if (prop.type === "landmark") { drawLandmark(ctx, prop, sx, sy); return; }
    if (prop.type === "deco") { drawDecoProp(ctx, prop, sx, sy); return; }
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

  // 主題小物（純程式繪製，和原版地圖融合）
  function drawDecoProp(ctx, prop, sx, sy) {
    var kind = prop.kind;
    if (kind === "ruin" || kind === "grave" || kind === "lavacrack" || kind === "coral" || kind === "mushroom") {
      drawLandmark(ctx, { kind: kind, scale: prop.scale, tint: prop.tint, flip: prop.flip }, sx, sy);
      return;
    }
    var t = Date.now() / 1000;
    var s = prop.scale || 1;
    ctx.save();
    ctx.translate(sx, sy);
    if (prop.flip) ctx.scale(-1, 1);
    ctx.scale(s, s);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath(); ctx.ellipse(0, 2, 15, 5, 0, 0, Math.PI * 2); ctx.fill();

    if (kind === "rock") {
      ctx.fillStyle = "#7b7d75";
      ctx.beginPath();
      ctx.moveTo(-14, 0); ctx.lineTo(-10, -13); ctx.lineTo(-2, -18);
      ctx.lineTo(9, -15); ctx.lineTo(15, -4); ctx.lineTo(12, 0);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#9fa39a";
      ctx.beginPath();
      ctx.moveTo(-10, -13); ctx.lineTo(-2, -18); ctx.lineTo(9, -15); ctx.lineTo(2, -10); ctx.lineTo(-6, -9);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(30,32,28,0.45)";
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(-6, -9); ctx.lineTo(-4, -2); ctx.stroke();
    } else if (kind === "bush") {
      ctx.fillStyle = "#2f5a2c";
      ctx.beginPath(); ctx.arc(-7, -8, 9, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6, -9, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#467a3c";
      ctx.beginPath(); ctx.arc(0, -14, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#5f9a4c";
      ctx.beginPath(); ctx.arc(-4, -17, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffd166";
      ctx.beginPath(); ctx.arc(7, -13, 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-8, -10, 1.3, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "cactus") {
      ctx.fillStyle = "#568a42";
      ctx.beginPath(); ctx.roundRect(-5, -30, 10, 30, 5); ctx.fill();
      ctx.beginPath(); ctx.roundRect(-14, -20, 6, 13, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(8, -25, 6, 15, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(-14, -21, 10, 6, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(4, -26, 11, 6, 3); ctx.fill();
      ctx.strokeStyle = "rgba(230,255,190,0.45)";
      ctx.lineWidth = 1;
      for (var ci = 0; ci < 3; ci++) {
        ctx.beginPath(); ctx.moveTo(-2 + ci * 2, -27); ctx.lineTo(-2 + ci * 2, -4); ctx.stroke();
      }
      if (kind === "cactus") {
        ctx.fillStyle = "#ff9bd2";
        ctx.beginPath(); ctx.arc(0, -32, 3, 0, Math.PI * 2); ctx.fill();
      }
    } else if (kind === "icespike") {
      ctx.save();
      ctx.globalAlpha = 0.85;
      for (var ii = 0; ii < 3; ii++) {
        var ix = [-8, 1, 9][ii], ih = [22, 34, 18][ii];
        var ig = ctx.createLinearGradient(ix, 0, ix, -ih);
        ig.addColorStop(0, "rgba(150,220,255,0.55)");
        ig.addColorStop(0.65, "rgba(220,245,255,0.85)");
        ig.addColorStop(1, "rgba(255,255,255,0.95)");
        ctx.fillStyle = ig;
        ctx.beginPath();
        ctx.moveTo(ix - 6, 0); ctx.lineTo(ix, -ih); ctx.lineTo(ix + 6, 0);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    } else if (kind === "bones") {
      ctx.strokeStyle = "#e6e0cf";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(8, 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4, -6); ctx.lineTo(2, 5); ctx.stroke();
      ctx.fillStyle = "#f0ead8";
      ctx.beginPath(); ctx.arc(-11, -2, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#3a342c";
      ctx.beginPath(); ctx.arc(-13, -3, 1.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-9, -3, 1.3, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "shell") {
      ctx.save();
      ctx.rotate(-0.25);
      ctx.fillStyle = "#f0e2c8";
      ctx.beginPath(); ctx.ellipse(0, -5, 11, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#c9a87a";
      ctx.lineWidth = 1.5;
      for (var si = 1; si <= 3; si++) {
        ctx.beginPath(); ctx.arc(0, -5, si * 2.6, 0.4, Math.PI * 1.6); ctx.stroke();
      }
      ctx.restore();
    } else if (kind === "torch") {
      ctx.fillStyle = "#5a4028";
      ctx.fillRect(-2.5, -30, 5, 32);
      ctx.fillStyle = "#3a2a18";
      ctx.fillRect(-6, -2, 12, 4);
      var fg2 = 0.6 + 0.4 * Math.sin(t * 7 + (prop.phase || 0));
      ctx.save();
      ctx.shadowColor = "#ff9b3d";
      ctx.shadowBlur = 18 * fg2;
      ctx.fillStyle = "#ff8a3d";
      ctx.beginPath(); ctx.ellipse(0, -36, 6, 10 * fg2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffe066";
      ctx.beginPath(); ctx.ellipse(0, -34, 3, 6 * fg2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (kind === "statue") {
      ctx.fillStyle = "#7d8490";
      ctx.fillRect(-11, -4, 22, 5);
      ctx.fillStyle = "#939ba8";
      ctx.fillRect(-7, -34, 14, 30);
      ctx.beginPath(); ctx.arc(0, -42, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#6b727e";
      ctx.beginPath(); ctx.moveTo(-7, -30); ctx.lineTo(-16, -14); ctx.lineTo(-11, -12); ctx.lineTo(-5, -24); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(7, -30); ctx.lineTo(16, -14); ctx.lineTo(11, -12); ctx.lineTo(5, -24); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(160,220,255,0.45)";
      ctx.beginPath(); ctx.arc(-2, -43, 1.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(2, -43, 1.4, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "stump") {
      ctx.fillStyle = "#6b4a2c";
      ctx.beginPath(); ctx.ellipse(0, -8, 12, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(-12, -8, 24, 10);
      ctx.fillStyle = "#8a6238";
      ctx.beginPath(); ctx.ellipse(0, -9, 10, 5.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#5a3e24";
      ctx.lineWidth = 1;
      for (var ri = 1; ri <= 2; ri++) {
        ctx.beginPath(); ctx.ellipse(0, -9, ri * 3.4, ri * 1.8, 0, 0, Math.PI * 2); ctx.stroke();
      }
    } else if (kind === "fern") {
      ctx.strokeStyle = "#4f8a46";
      ctx.lineWidth = 1.8;
      for (var fr = -2; fr <= 2; fr++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(fr * 12, -20, fr * 22, -26 + Math.abs(fr) * 4);
        ctx.stroke();
        ctx.strokeStyle = "rgba(120,200,90,0.75)";
        ctx.lineWidth = 1;
      }
    } else if (kind === "reed") {
      ctx.strokeStyle = "#6f9a4a";
      ctx.lineWidth = 1.6;
      var sway = Math.sin(t * 1.4 + (prop.phase || 0)) * 3;
      for (var rd = -2; rd <= 2; rd++) {
        ctx.beginPath();
        ctx.moveTo(rd * 4, 0);
        ctx.quadraticCurveTo(rd * 6 + sway, -18, rd * 8 + sway, -34 - Math.abs(rd) * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "#8a6a3a";
      ctx.beginPath(); ctx.ellipse(sway, -35, 2.4, 5, 0, 0, Math.PI * 2); ctx.fill();
    } else if (kind === "pine") {
      ctx.fillStyle = "#5a3e24";
      ctx.fillRect(-2.5, -12, 5, 14);
      ctx.fillStyle = "#2f5a3c";
      for (var pi = 0; pi < 3; pi++) {
        var py = -12 - pi * 13;
        ctx.beginPath();
        ctx.moveTo(0, py - 22);
        ctx.lineTo(-15 + pi * 3, py);
        ctx.lineTo(15 - pi * 3, py);
        ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = "rgba(200,255,220,0.25)";
      ctx.beginPath(); ctx.moveTo(0, -47); ctx.lineTo(-7, -26); ctx.lineTo(0, -28); ctx.closePath(); ctx.fill();
    } else if (kind === "crystalbit") {
      ctx.save();
      ctx.shadowColor = "#9fd8ff";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(200,240,255,0.85)";
      for (var ci2 = 0; ci2 < 3; ci2++) {
        var cx2 = [-7, 0, 7][ci2], ch2 = [14, 22, 11][ci2];
        ctx.beginPath();
        ctx.moveTo(cx2 - 4, 0); ctx.lineTo(cx2, -ch2); ctx.lineTo(cx2 + 4, 0);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  // 各地區地標（純程式繪製，跟原版地圖色調融合）
  function drawLandmark(ctx, prop, sx, sy) {
    var t = Date.now() / 1000;
    var s = prop.scale;
    var tint = prop.tint || "#c9b47a";
    ctx.save();
    ctx.translate(sx, sy);
    if (prop.flip) ctx.scale(-1, 1);
    ctx.scale(s, s);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    var glow = 0.55 + 0.45 * Math.sin(t * 1.8 + sx * 0.01);

    if (prop.kind === "shrine") {
      ctx.fillStyle = "#6d6250";
      ctx.fillRect(-20, -8, 40, 10);
      ctx.fillStyle = "#8b7d63";
      ctx.fillRect(-15, -34, 7, 28);
      ctx.fillRect(8, -34, 7, 28);
      ctx.fillRect(-22, -40, 44, 7);
      ctx.fillStyle = tint;
      ctx.fillRect(-20, -46, 40, 6);
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 18 * glow;
      ctx.fillStyle = "rgba(255,246,200,0.92)";
      ctx.beginPath(); ctx.arc(0, -62, 6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (prop.kind === "ruin") {
      ctx.fillStyle = "#a08a62";
      ctx.fillRect(-18, -30, 9, 32);
      ctx.fillRect(4, -52, 9, 54);
      ctx.fillRect(14, -20, 8, 22);
      ctx.fillStyle = "#7d6a4a";
      ctx.fillRect(-24, -2, 46, 6);
      ctx.fillStyle = tint;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(-18, -30, 9, 4);
      ctx.fillRect(4, -52, 9, 4);
      ctx.globalAlpha = 1;
    } else if (prop.kind === "crystal") {
      for (var i = 0; i < 3; i++) {
        var ox = [-13, 2, 14][i], hh = [26, 42, 20][i];
        ctx.save();
        ctx.shadowColor = tint;
        ctx.shadowBlur = 14 * glow;
        ctx.fillStyle = i === 1 ? "rgba(220,245,255,0.92)" : tint;
        ctx.beginPath();
        ctx.moveTo(ox, 0);
        ctx.lineTo(ox - 6, -hh * 0.55);
        ctx.lineTo(ox, -hh);
        ctx.lineTo(ox + 6, -hh * 0.55);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    } else if (prop.kind === "grave") {
      ctx.fillStyle = "#7b8296";
      ctx.fillRect(-2, -34, 4, 36);
      ctx.fillRect(-12, -26, 24, 4);
      ctx.fillStyle = "#5a6072";
      ctx.fillRect(-16, -4, 32, 6);
      ctx.save();
      ctx.globalAlpha = 0.35 + 0.25 * glow;
      ctx.fillStyle = "#a9c8ff";
      ctx.beginPath(); ctx.arc(0, -18, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    } else if (prop.kind === "lavacrack") {
      ctx.save();
      ctx.shadowColor = "#ff6a20";
      ctx.shadowBlur = 20 * glow;
      ctx.strokeStyle = "#ff8a3d";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-28, 0); ctx.lineTo(-12, -10); ctx.lineTo(0, -5);
      ctx.lineTo(12, -16); ctx.lineTo(28, -8);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,225,150,0.9)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    } else if (prop.kind === "coral") {
      ctx.save();
      ctx.shadowColor = tint;
      ctx.shadowBlur = 10 * glow;
      ctx.strokeStyle = tint;
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -26); ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(-14, -30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(13, -36); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-14, -30); ctx.lineTo(-18, -40); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(13, -36); ctx.lineTo(17, -46); ctx.stroke();
      ctx.restore();
    } else if (prop.kind === "mushroom") {
      ctx.fillStyle = "#e8e0c8";
      ctx.fillRect(-4, -24, 8, 24);
      ctx.save();
      ctx.shadowColor = tint;
      ctx.shadowBlur = 16 * glow;
      ctx.fillStyle = tint;
      ctx.beginPath();
      ctx.ellipse(0, -28, 20, 12, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.beginPath(); ctx.arc(-7, -31, 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6, -34, 1.8, 0, Math.PI * 2); ctx.fill();
    } else if (prop.kind === "torii") {
      // 鳥居：硃紅社門，樑上垂著注連繩
      ctx.fillStyle = "#a8322a";
      ctx.fillRect(-18, -44, 6, 46);
      ctx.fillRect(12, -44, 6, 46);
      ctx.fillStyle = "#c94a38";
      ctx.fillRect(-25, -52, 50, 6);
      ctx.fillRect(-28, -62, 56, 5);
      ctx.fillStyle = "#8f2a24";
      ctx.fillRect(-22, -46, 44, 4);
      ctx.strokeStyle = tint;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-17, -56);
      ctx.quadraticCurveTo(0, -48, 17, -56);
      ctx.stroke();
      ctx.fillStyle = tint;
      for (var tp = -12; tp <= 12; tp += 8) {
        ctx.beginPath();
        ctx.moveTo(tp, -55); ctx.lineTo(tp + 2, -49); ctx.lineTo(tp + 4, -55);
        ctx.fill();
      }
    } else if (prop.kind === "obelisk") {
      // 方尖碑：風化的高聳石碑，符文微微發光
      ctx.fillStyle = "#5f6272";
      ctx.fillRect(-16, -8, 32, 10);
      ctx.fillStyle = "#7d8296";
      ctx.beginPath();
      ctx.moveTo(-9, 0); ctx.lineTo(-6, -62); ctx.lineTo(0, -74);
      ctx.lineTo(6, -62); ctx.lineTo(9, 0);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.moveTo(-6, 0); ctx.lineTo(-4, -62); ctx.lineTo(0, -74);
      ctx.lineTo(0, 0);
      ctx.closePath(); ctx.fill();
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 12 * glow;
      ctx.fillStyle = tint;
      for (var oi = 0; oi < 4; oi++) {
        ctx.globalAlpha = 0.45 + 0.4 * Math.sin(t * 2 + oi * 1.7);
        ctx.fillRect(-2.5, -16 - oi * 12, 5, 6);
      }
      ctx.restore();
    } else if (prop.kind === "bones") {
      // 巨獸遺骸：肋骨拱成半圓，頭骨半埋在土裡
      ctx.strokeStyle = "#ddd8c4";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      for (var bi = 0; bi < 5; bi++) {
        var bx = -24 + bi * 12;
        var bh = 26 + Math.sin(bi * 0.9) * 10;
        ctx.beginPath();
        ctx.moveTo(bx, 0);
        ctx.quadraticCurveTo(bx + 3, -bh * 0.7, bx + 6, -bh);
        ctx.stroke();
      }
      ctx.fillStyle = "#e8e3cf";
      ctx.beginPath();
      ctx.ellipse(20, -14, 13, 11, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4a4a42";
      ctx.beginPath(); ctx.arc(25, -17, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(16, -18, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#cfc9b4";
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(12, -8); ctx.lineTo(-2, -4); ctx.stroke();
    } else if (prop.kind === "shipwreck") {
      // 沉船：斷裂船身與破帆，擱淺在岸邊
      ctx.fillStyle = "#5a4230";
      ctx.beginPath();
      ctx.moveTo(-34, -6);
      ctx.quadraticCurveTo(-20, 8, 30, 2);
      ctx.lineTo(22, -16);
      ctx.quadraticCurveTo(-8, -24, -34, -6);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#8a6a48";
      ctx.lineWidth = 3;
      for (var si = -24; si <= 18; si += 10) {
        ctx.beginPath(); ctx.moveTo(si, -14); ctx.lineTo(si + 2, 0); ctx.stroke();
      }
      ctx.strokeStyle = "#6b5236";
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(-2, -58); ctx.stroke();
      ctx.fillStyle = "rgba(232,226,200,0.75)";
      ctx.beginPath();
      ctx.moveTo(0, -56);
      ctx.quadraticCurveTo(22, -44, 12, -26);
      ctx.quadraticCurveTo(4, -32, -2, -28);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 0.5 + 0.25 * glow;
      ctx.fillStyle = tint;
      ctx.beginPath(); ctx.arc(-26, 0, 3, 0, Math.PI * 2); ctx.fill();
    } else if (prop.kind === "sundial") {
      // 日晷：祭壇上的銅盤與指時針，光點隨時間移動
      ctx.fillStyle = "#7a6b52";
      ctx.fillRect(-16, -12, 32, 14);
      ctx.fillStyle = "#9b8a6a";
      ctx.fillRect(-11, -18, 22, 8);
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 14 * glow;
      ctx.fillStyle = "#c8b884";
      ctx.beginPath(); ctx.ellipse(0, -22, 21, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "#6d5c40";
      ctx.lineWidth = 1.4;
      for (var da = 0; da < 12; da++) {
        var dr = da / 12 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(dr) * 13, -22 + Math.sin(dr) * 5.4);
        ctx.lineTo(Math.cos(dr) * 18, -22 + Math.sin(dr) * 7.4);
        ctx.stroke();
      }
      ctx.strokeStyle = "#4a3f2c";
      ctx.lineWidth = 2.4;
      var shAng = -Math.PI / 2 + Math.sin(t * 0.25) * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(Math.cos(shAng) * 15, -22 + Math.sin(shAng) * 6.5);
      ctx.stroke();
      ctx.fillStyle = tint;
      ctx.beginPath(); ctx.arc(0, -22, 2.6, 0, Math.PI * 2); ctx.fill();
    } else if (prop.kind === "waterfall") {
      // 瀑布：岩壁、傾瀉的水幕與底部水霧
      ctx.fillStyle = "#656b62";
      ctx.beginPath();
      ctx.moveTo(-30, 0); ctx.lineTo(-24, -58); ctx.lineTo(-6, -70);
      ctx.lineTo(12, -64); ctx.lineTo(28, -46); ctx.lineTo(32, 0);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(120,150,132,0.55)";
      ctx.fillRect(-20, -56, 40, 56);
      ctx.save();
      ctx.shadowColor = "#bff4ff"; ctx.shadowBlur = 14 * glow;
      var wf = 0.72 + 0.28 * Math.sin(t * 5.5 + sx * 0.01);
      ctx.globalAlpha = 0.85;
      var wg = ctx.createLinearGradient(0, -54, 0, 0);
      wg.addColorStop(0, "rgba(210,248,255,0.9)");
      wg.addColorStop(1, "rgba(110,200,240,0.55)");
      ctx.fillStyle = wg;
      ctx.beginPath();
      ctx.moveTo(-13, -56); ctx.lineTo(13, -56);
      ctx.lineTo(20 + wf * 4, 0); ctx.lineTo(-20 - wf * 4, 0);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.4;
      for (var wl = -2; wl <= 2; wl++) {
        ctx.beginPath();
        ctx.moveTo(wl * 5, -54);
        ctx.lineTo(wl * 7 + Math.sin(t * 6 + wl) * 2, 0);
        ctx.stroke();
      }
      ctx.restore();
      ctx.fillStyle = "rgba(230,250,255,0.35)";
      for (var wi = 0; wi < 4; wi++) {
        var wr = 10 + ((t * 9 + wi * 13) % 24);
        ctx.beginPath();
        ctx.arc(-16 + wi * 11, -2 - ((t * 7 + wi * 9) % 12), wr * 0.16, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (prop.kind === "arch") {
      // 石拱門：風化的雙柱與拱頂，殘存符文會呼吸
      ctx.fillStyle = "#7b7059";
      ctx.fillRect(-27, -48, 11, 50);
      ctx.fillRect(16, -48, 11, 50);
      ctx.fillStyle = "#93876c";
      ctx.beginPath();
      ctx.moveTo(-27, -48);
      ctx.quadraticCurveTo(0, -80, 27, -48);
      ctx.lineTo(27, -38);
      ctx.quadraticCurveTo(0, -66, -27, -38);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#5f5745";
      ctx.fillRect(-32, -4, 64, 6);
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 12 * glow;
      ctx.fillStyle = tint;
      for (var ai2 = -1; ai2 <= 1; ai2++) {
        ctx.globalAlpha = 0.35 + 0.4 * Math.sin(t * 2.2 + ai2 * 1.4);
        ctx.fillRect(ai2 * 8 - 1.5, -60 + Math.abs(ai2) * 4, 3, 8);
      }
      ctx.restore();
    } else if (prop.kind === "pillar") {
      // 斷柱：傾倒的石柱群，切面與裂縫清楚可見
      var pillars = [[-22, 32, 0.05], [-2, 48, -0.04], [20, 22, 0.09]];
      for (var pl = 0; pl < pillars.length; pl++) {
        ctx.save();
        ctx.translate(pillars[pl][0], 0);
        ctx.rotate(pillars[pl][2]);
        ctx.fillStyle = pl === 1 ? "#9a8f74" : "#847a63";
        ctx.fillRect(-7, -pillars[pl][1], 14, pillars[pl][1]);
        ctx.fillStyle = "#6b6250";
        ctx.fillRect(-9, -pillars[pl][1] - 4, 18, 5);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fillRect(-7, -pillars[pl][1], 3, pillars[pl][1]);
        ctx.strokeStyle = "rgba(60,52,40,0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-4, -pillars[pl][1] * 0.7); ctx.lineTo(2, -pillars[pl][1] * 0.45);
        ctx.stroke();
        ctx.restore();
      }
    } else if (prop.kind === "statue") {
      // 守護石像：披著斗篷的遠古守衛，雙眼仍亮著
      ctx.fillStyle = "#6c6f7c";
      ctx.fillRect(-20, -10, 40, 12);
      ctx.fillStyle = "#84889a";
      ctx.beginPath();
      ctx.moveTo(-16, -8);
      ctx.quadraticCurveTo(-12, -54, 0, -62);
      ctx.quadraticCurveTo(12, -54, 16, -8);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#9aa0b2";
      ctx.beginPath(); ctx.arc(0, -64, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#6a6f80";
      ctx.beginPath();
      ctx.moveTo(-9, -64); ctx.quadraticCurveTo(0, -78, 9, -64);
      ctx.lineTo(6, -72); ctx.lineTo(0, -80); ctx.lineTo(-6, -72);
      ctx.closePath(); ctx.fill();
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 14 * glow;
      ctx.fillStyle = tint;
      ctx.beginPath(); ctx.arc(-3.4, -65, 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(3.4, -65, 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "#5a5e6c";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-13, -32); ctx.lineTo(-24, -12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(13, -32); ctx.lineTo(24, -12); ctx.stroke();
    } else if (prop.kind === "banner") {
      // 戰旗：破損的長幡在風中擺動
      ctx.fillStyle = "#5c4b36";
      ctx.fillRect(-3, -72, 6, 74);
      ctx.fillStyle = "#8a7148";
      ctx.beginPath(); ctx.arc(0, -76, 5, 0, Math.PI * 2); ctx.fill();
      var sway = Math.sin(t * 2.4 + sx * 0.01) * 4;
      ctx.save();
      ctx.shadowColor = tint; ctx.shadowBlur = 10 * glow;
      ctx.fillStyle = tint;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(2, -70);
      ctx.quadraticCurveTo(24 + sway, -62, 20 + sway, -40);
      ctx.lineTo(12 + sway * 0.6, -46);
      ctx.lineTo(14 + sway * 0.7, -26);
      ctx.lineTo(2, -34);
      ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(6, -64); ctx.lineTo(16 + sway, -48); ctx.stroke();
    } else if (prop.kind === "crystalcluster") {
      // 巨大晶簇：多層次的菱形晶體，中心最亮
      for (var cc = 0; cc < 5; cc++) {
        var cox = [-18, -7, 6, 17, 0][cc];
        var chh = [30, 46, 38, 26, 58][cc];
        ctx.save();
        ctx.shadowColor = tint; ctx.shadowBlur = (10 + cc * 2) * glow;
        ctx.fillStyle = cc === 4 ? "rgba(230,250,255,0.95)" : "rgba(170,220,245,0.8)";
        ctx.beginPath();
        ctx.moveTo(cox, 0);
        ctx.lineTo(cox - 7, -chh * 0.5);
        ctx.lineTo(cox, -chh);
        ctx.lineTo(cox + 7, -chh * 0.5);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.moveTo(cox, 0); ctx.lineTo(cox - 7, -chh * 0.5); ctx.lineTo(cox, -chh);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    } else if (prop.kind === "lavapool") {
      // 岩漿池：翻滾的熔岩與不時冒出的氣泡
      ctx.save();
      ctx.shadowColor = "#ff6a20"; ctx.shadowBlur = 22 * glow;
      ctx.fillStyle = "#ff6a20";
      ctx.beginPath();
      ctx.ellipse(0, -4, 34, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffb15c";
      ctx.beginPath();
      ctx.ellipse(Math.sin(t * 0.8) * 6, -5, 22, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,240,180,0.9)";
      for (var lb = 0; lb < 4; lb++) {
        var lt = (t * 0.55 + lb * 0.25) % 1;
        ctx.globalAlpha = 1 - lt;
        ctx.beginPath();
        ctx.arc(-14 + lb * 10, -6 - lt * 9, 2 + lt * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.strokeStyle = "#4a2a1e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -4, 35, 13.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 中央競技場：霸主登場時會亮起
  function drawArena(ctx, scene, cam, vw, vh, time, active) {
    if (!scene || !scene.arena) return;
    var a = scene.arena;
    var sx = a.x - cam.x + vw / 2;
    var sy = a.y - cam.y + vh / 2;
    if (sx < -a.r - vw || sx > vw + a.r || sy < -a.r - vh || sy > vh + a.r) return;
    var pulse = active ? 0.55 + 0.45 * Math.sin(time * 3) : 0.18;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.strokeStyle = a.color;
    ctx.globalAlpha = pulse * 0.7;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, a.r, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = pulse * 0.45;
    ctx.beginPath(); ctx.arc(0, 0, a.r * 0.72, 0, Math.PI * 2); ctx.stroke();
    ctx.rotate(time * 0.12);
    ctx.setLineDash([18, 16]);
    ctx.lineWidth = 4;
    ctx.globalAlpha = pulse;
    ctx.beginPath(); ctx.arc(0, 0, a.r * 0.88, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // 前景層：高草、蘆葦、落葉與漂浮粒子，增加景深
  function drawForeground(ctx, scene, cam, vw, vh, time) {
    if (!scene || !scene.fg) return;
    var ox = vw / 2 - cam.x;
    var oy = vh / 2 - cam.y;
    for (var i = 0; i < scene.fg.length; i++) {
      var f = scene.fg[i];
      var sx = f.x + ox;
      var sy = f.y + oy;
      if (sx < -40 || sx > vw + 40 || sy < -60 || sy > vh + 40) continue;
      var s = f.scale || 1;
      var sway = Math.sin(time * 1.3 + (f.phase || 0)) * 2.2;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(s, s);
      ctx.globalAlpha = f.alpha || 0.5;
      if (f.kind === "grass") {
        ctx.strokeStyle = "#4f7a36";
        ctx.lineWidth = 1.7;
        ctx.lineCap = "round";
        for (var gi = -2; gi <= 2; gi++) {
          ctx.beginPath();
          ctx.moveTo(gi * 4, 2);
          ctx.quadraticCurveTo(gi * 5 + sway, -10, gi * 6 + sway * 1.6, -22 - Math.abs(gi) * 3);
          ctx.stroke();
        }
      } else if (f.kind === "fern") {
        ctx.strokeStyle = "#3f6b3e";
        ctx.lineWidth = 1.8;
        for (var fi = -2; fi <= 2; fi++) {
          ctx.beginPath();
          ctx.moveTo(0, 2);
          ctx.quadraticCurveTo(fi * 9 + sway, -12, fi * 18 + sway * 1.5, -16 + Math.abs(fi) * 3);
          ctx.stroke();
        }
      } else if (f.kind === "leaf") {
        ctx.rotate(sway * 0.2 + time * 0.4);
        ctx.fillStyle = "#c8a35a";
        ctx.beginPath(); ctx.ellipse(0, 0, 6, 2.4, 0.5, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "reed") {
        ctx.strokeStyle = "#5f8a4a";
        ctx.lineWidth = 1.5;
        for (var ri2 = -1; ri2 <= 1; ri2++) {
          ctx.beginPath();
          ctx.moveTo(ri2 * 5, 2);
          ctx.quadraticCurveTo(ri2 * 6 + sway, -14, ri2 * 8 + sway * 1.8, -30);
          ctx.stroke();
        }
      } else if (f.kind === "stalag") {
        ctx.fillStyle = "rgba(60,50,86,0.9)";
        ctx.beginPath();
        ctx.moveTo(-10, 4); ctx.lineTo(0, -26 - sway); ctx.lineTo(10, 4);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "rgba(160,140,220,0.25)";
        ctx.beginPath();
        ctx.moveTo(-2, 2); ctx.lineTo(0, -22 - sway); ctx.lineTo(3, 2);
        ctx.closePath(); ctx.fill();
      } else if (f.kind === "moss") {
        ctx.fillStyle = "rgba(70,130,90,0.5)";
        ctx.beginPath(); ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "drip") {
        ctx.strokeStyle = "rgba(160,210,255,0.4)";
        ctx.lineWidth = 1;
        var dy2 = (time * 80 + i * 37) % 60;
        ctx.beginPath(); ctx.moveTo(0, -60 + dy2); ctx.lineTo(0, -54 + dy2); ctx.stroke();
      } else if (f.kind === "snowbank") {
        ctx.fillStyle = "rgba(245,252,255,0.55)";
        ctx.beginPath(); ctx.ellipse(0, 0, 22, 7, 0, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "sand") {
        ctx.fillStyle = "rgba(240,220,160,0.35)";
        ctx.beginPath(); ctx.ellipse(sway * 2, 0, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "ember") {
        ctx.fillStyle = "#ff9b3d";
        ctx.shadowColor = "#ff9b3d";
        ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(sway, -6 - (time * 14 + i * 9) % 24, 2, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "ash") {
        ctx.fillStyle = "rgba(200,190,180,0.5)";
        ctx.beginPath(); ctx.arc(sway, -8 - (time * 10 + i * 7) % 30, 1.6, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "wisp") {
        ctx.fillStyle = "rgba(160,220,255,0.75)";
        ctx.shadowColor = "#a9d8ff";
        ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(sway, -14 + Math.sin(time + i) * 5, 2.6, 0, Math.PI * 2); ctx.fill();
      } else if (f.kind === "coral") {
        ctx.strokeStyle = "#8fe6ff";
        ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(sway, -16); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sway, -8); ctx.lineTo(sway - 8, -18); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sway, -10); ctx.lineTo(sway + 8, -20); ctx.stroke();
      } else if (f.kind === "bubble") {
        ctx.strokeStyle = "rgba(200,244,255,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(sway, -8 - (time * 16 + i * 11) % 34, 3, 0, Math.PI * 2); ctx.stroke();
      } else if (f.kind === "icebit") {
        ctx.fillStyle = "rgba(220,245,255,0.6)";
        ctx.beginPath();
        ctx.moveTo(0, -7); ctx.lineTo(4, 0); ctx.lineTo(0, 4); ctx.lineTo(-4, 0);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
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

  function drawShadow(ctx, sx, sy, w, alpha) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0," + (0.32 * (alpha === undefined ? 1 : alpha)).toFixed(3) + ")";
    ctx.beginPath();
    ctx.ellipse(sx, sy - 2, w * 0.42, w * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPlayer(ctx, p, sx, sy, time) {
    var key = p.spriteKey === "bow" ? "bow" : "sword";
    var state = p.attackT > 0 ? "attack" : (p.moving ? "walk" : "idle");
    var set = PLAYER_ART[key];
    var art = set && set[state];
    var img = art ? IMG[art.img] : null;

    // 舊版單張 GIF 後備（例如自訂角色或素材載入失敗）
    if (!img) {
      img = IMG.player;
      var oldScale = p.artScale || 1.15;
      drawShadow(ctx, sx, sy, img ? img.width * oldScale : 40);
      if (img) {
        ctx.save();
        ctx.drawImage(img, sx - img.width * oldScale / 2,
          sy - img.height * oldScale, img.width * oldScale, img.height * oldScale);
        ctx.restore();
      }
      return;
    }

    var scale = p.artScale || 1.35;
    var dir = clampNum(p.dir === undefined ? 4 : p.dir, 0, 7) | 0;
    var frame;
    if (state === "attack") {
      var dur = p.attackDur || 0.8;
      var k = 1 - clampNum(p.attackT / dur, 0, 1);
      frame = Math.min(art.n - 1, Math.floor(k * art.n));
    } else {
      var fps = state === "walk" ? 8 : 3;
      frame = Math.floor(time * fps) % art.n;
    }

    var srcX = frame * art.cw;
    var srcY = dir * art.ch;
    var w = art.cw * scale;
    var h = art.ch * scale;
    var dx = sx - art.ax * scale;
    var dy = sy - art.ay * scale;

    drawShadow(ctx, sx, sy, 34 * scale);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (p.invT > 0 && Math.floor(time * 18) % 2 === 0) ctx.globalAlpha = 0.45;
    ctx.drawImage(img, srcX, srcY, art.cw, art.ch, dx, dy, w, h);
    if (p.hitFlash > 0) {
      ctx.globalAlpha = 0.35 * clampNum(p.hitFlash / 0.15, 0, 1);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(img, srcX, srcY, art.cw, art.ch, dx, dy, w, h);
    }
    ctx.restore();
  }

  // 依關卡狀態與時間挑選 sprite sheet 的格子。
  //
  // 這裡刻意「不」依賴 stateT 來算格數：stateT 會被 AI／狀態機在中途改寫，
  // 一旦它歸零或反向增加，舊寫法就會把整個動作鎖在同一格，看起來像怪物不會動。
  // 現在每一隻怪都有自己的動畫時鐘（e._animClock），由真實時間推進，
  // 並且每個狀態都有一個明確的播放長度（dur）；只要狀態改變或重新觸發，
  // 就從第一格重新播放，走／待機／死亡各自循環或停在最後一格。
  var ANIM_DEF = {
    walk:   { loop: true },
    idle:   { loop: true },
    die:    { loop: false, hold: true },
    attack: { loop: false, hold: true },
    special:{ loop: false, hold: true },
    hurt:   { loop: false, hold: false }
  };

  function sheetFrameIndex(e, state, meta, time) {
    var n = meta.n || 1;
    if (n <= 1) return 0;
    var durs = meta.d || [];
    var total = 0;
    for (var i = 0; i < n; i++) total += (durs[i] || 120) / 1000;
    if (total <= 0) total = n * 0.12;

    // 同一個狀態被重新觸發（又攻擊一次／又受傷一次／又施法一次）時也要重播，
    // 判斷方式是「剩餘時間突然變長」——這比看狀態名稱更可靠。
    var restarted = state !== e._animState;
    if (!restarted && (state === "attack" || state === "hurt" || state === "special")) {
      if ((e.stateT || 0) > (e._animLastStateT || 0) + 0.02) restarted = true;
    }
    if (restarted) {
      e._animState = state;
      e._animClock = 0;
    }
    e._animLastStateT = e.stateT || 0;

    // 真實經過時間（切分頁回來時最多補 0.12 秒，避免一次跳很多格）
    var prev = e._animTime;
    e._animTime = time;
    var dt = prev === undefined ? 0.016 : clampNum(time - prev, 0, 0.12);

    var def = ANIM_DEF[state] || { loop: false };
    // 各狀態的播放長度（秒）
    var dur = total;
    if (state === "walk") {
      var wk = 1 / Math.max(0.45, 0.95 + clampNum((e.spd || 100) / 260, 0, 1) * 0.55 +
        (e.animSpeed || 0) * 0.08);
      if (e.slowT > 0) wk *= 1.45;
      dur = total * wk;
    } else if (state === "idle") {
      dur = total / Math.max(0.6, 0.9 + (e.animSpeed || 0) * 0.1);
    } else if (state === "attack") {
      // 攻擊動作要在「起手 → 命中」的時間內播完，命中幀才會對上傷害
      dur = clampNum(e._animDur || total, 0.34, 1.25);
    } else if (state === "hurt") {
      dur = clampNum(total * 0.5, 0.22, 0.42);
    } else if (state === "special") {
      dur = clampNum((e.casting && e.casting.max) ? e.casting.max : (e._animDur || total), 0.3, 1.8);
    } else if (state === "die") {
      dur = Math.max(0.45, total);
    }

    e._animClock = (e._animClock || 0) + dt;
    var t = e._animClock;
    if (def.loop) {
      t = t % dur;
    } else if (t >= dur) {
      t = dur - 0.0001; // 單次動作停在最後一格
    }

    // 依「每格原始毫秒 × 整體伸縮」換算目前格數
    var scale = dur / total;
    var acc = 0;
    for (var f = 0; f < n; f++) {
      acc += (durs[f] || 120) / 1000 * scale;
      if (t < acc) return f;
    }
    return n - 1;
  }

  function drawEnemy(ctx, e, sx, sy, time, scaleMul) {
    // 原版怪物圖：依狀態挑選動作（待機／行走／攻擊／施法／受傷／死亡）
    var set = e.mon ? MON[e.mon] : null;
    if (set && (set.idle || set.walk)) {
      var state = e.dying ? "die" : (e.state || "idle");
      // 若該動作缺圖，退回其它動作時也要用「實際使用的那張圖」的格數，
      // 否則會拿 special 的格數去切 attack 的圖，畫面會出現半截身體。
      var usedState = state;
      var img = set[state];
      if (!img && state === "special") { img = set.attack; usedState = "attack"; }
      if (!img && state === "hurt") { img = set.idle; usedState = "idle"; }
      if (!img && state === "attack") { img = set.special; usedState = "special"; }
      if (!img) { img = set.walk || set.idle || set.attack || set.die; usedState = set.walk ? "walk" : (set.idle ? "idle" : (set.attack ? "attack" : "die")); }
      if (!img || !img.height) return;

      var meta = monsterMeta(e.mon, usedState);
      // 舊格式（沒有 sheets.json）時整張圖就是單格
      var fw = meta ? meta.w : img.width;
      var fh = meta ? meta.h : img.height;
      var n = meta ? meta.n : 1;
      var frame = meta ? sheetFrameIndex(e, usedState, meta, time) : 0;

      // 尺寸以「畫面上看得清楚動作」為準：小怪 58~148px、精英再大一點、霸主約 215px。
      // 先前小怪最低只有 46px，在 1280x720 下幾乎看不清揮擊與倒地。
      var baseH = clampNum(58 + (fh - 42) * 0.78, 58, 148);
      var targetH = baseH * (e.isBoss ? 1.45 : (e.elite ? 1.12 : 1)) * (scaleMul || 1);
      var scale = targetH / fh;
      var w = fw * scale;
      var h = fh * scale;

      // 死亡動畫：完整播放，最後 0.35 秒才淡出
      var alpha = e.dying ? clampNum((e.dieT || 0) / 0.35, 0, 1) : 1;
      var phase = e.animPhase || (e.x * 0.013 + e.y * 0.007);
      var bob = 0, dxOff = 0, dyOff = 0, rot = 0;
      var walkPhase = time * (5.4 + (e.animSpeed || 0) * 0.1) + phase;
      var moving = state === "walk";

      if (moving) {
        // 素材本身就有完整的步行循環，程式只補上極小幅度的重心起伏，
        // 不再用大位移／大旋轉蓋掉原版 GIF 的步伐。
        // 不同物種使用不同節奏：跳躍、重踏、蛇行、振翅、滑行、爬行、踱步…
        var stride = Math.abs(Math.sin(walkPhase));
        var ws = e.walkStyle || "stalk";
        var lean = Math.sin(walkPhase) * (e.face || 1);
        if (ws === "hop" || ws === "bounce") {
          bob = stride * (ws === "bounce" ? 2.6 : 1.8);
          rot = Math.sin(walkPhase * 0.5) * 0.02 * (e.face || 1);
        } else if (ws === "stomp" || ws === "lumber") {
          bob = stride * (ws === "lumber" ? 0.9 : 1.2);
          rot = Math.sin(walkPhase * 0.5) * (ws === "lumber" ? 0.022 : 0.014) * (e.face || 1);
          dxOff = lean * (ws === "lumber" ? 1.6 : 0.8);
        } else if (ws === "sway") {
          bob = stride * 0.8;
          rot = Math.sin(walkPhase * 0.5) * 0.03 * (e.face || 1);
        } else if (ws === "glide" || ws === "float") {
          bob = Math.sin(walkPhase * 0.5) * (ws === "float" ? 2.4 : 0.8) - 0.5;
          rot = Math.sin(walkPhase * 0.3) * 0.012 * (e.face || 1);
        } else if (ws === "flutter") {
          bob = Math.abs(Math.sin(walkPhase * 1.35)) * 2.2 - 0.6;
          rot = Math.sin(walkPhase * 0.65) * 0.035 * (e.face || 1);
          dxOff = Math.sin(walkPhase * 0.5) * 1.4;
        } else if (ws === "skitter") {
          bob = Math.abs(Math.sin(walkPhase * 1.6)) * 1.1;
          rot = Math.sin(walkPhase * 1.3) * 0.026 * (e.face || 1);
          dxOff = Math.sin(walkPhase * 1.6) * 1.2;
        } else if (ws === "slither") {
          bob = Math.sin(walkPhase * 0.7) * 0.7;
          rot = Math.sin(walkPhase * 0.7) * 0.032 * (e.face || 1);
          dxOff = Math.sin(walkPhase * 0.9) * 2.4;
        } else {
          bob = stride * 0.9;
          rot = Math.sin(walkPhase * 0.5) * 0.016 * (e.face || 1);
        }
      } else if (state === "attack") {
        // 用動畫時鐘算進度（不依賴 stateT，狀態機中途改寫也不會卡住）
        var atkDur = Math.max(0.2, e._animDur || 0.5);
        var pr = clampNum((e._animClock || 0) / atkDur, 0, 1);
        var st = (e.swing && e.swing.style) || e.atkStyle || "slash";
        // 每一種攻擊都有不同的身體演出，畫面上一眼能分辨牠是怎麼打的
        if (st === "pounce") {
          var hop = Math.sin(pr * Math.PI);
          dyOff = -hop * 16;
          dxOff = hop * 12 * (e.face || 1);
          rot = hop * 0.16 * (e.face || 1);
        } else if (st === "slam" || st === "shockwave") {
          var up = Math.sin(clampNum(pr / 0.55, 0, 1) * Math.PI * 0.5);
          var down = pr > 0.55 ? Math.sin((pr - 0.55) / 0.45 * Math.PI) : 0;
          dyOff = -up * 9 + down * 13;
          rot = down * 0.10 * (e.face || 1);
        } else if (st === "spin") {
          rot = pr * Math.PI * 1.5 * (e.face || 1);
          dxOff = Math.sin(pr * Math.PI) * 4 * (e.face || 1);
        } else if (st === "spit") {
          var kick = Math.sin(pr * Math.PI);
          dxOff = -kick * 5 * (e.face || 1);
          dyOff = -kick * 2;
          rot = -kick * 0.09 * (e.face || 1);
        } else if (st === "combo") {
          var c1 = Math.sin(clampNum(pr / 0.4, 0, 1) * Math.PI);
          var c2 = pr > 0.4 ? Math.sin(clampNum((pr - 0.4) / 0.6, 0, 1) * Math.PI) : 0;
          dxOff = (c1 * 6 + c2 * 8) * (e.face || 1);
          rot = (c1 * 0.06 - c2 * 0.05) * (e.face || 1);
        } else if (st === "sweep" || st === "claw") {
          var sw = Math.sin(pr * Math.PI);
          dxOff = sw * 7 * (e.face || 1);
          rot = -sw * 0.12 * (e.face || 1);
          dyOff = -sw * 1.5;
        } else if (st === "sting") {
          var sn = Math.sin(pr * Math.PI);
          dxOff = sn * 9 * (e.face || 1);
        } else {
          var lunge = Math.sin(clampNum(pr, 0, 1) * Math.PI);
          dxOff = lunge * 6 * (e.face || 1);
          dyOff = -lunge * 1.6;
          rot = lunge * 0.07 * (e.face || 1);
        }
      } else if (state === "special") {
        // 詠唱：後仰聚氣 → 出手瞬間前傾，配合腳下法陣與技能名稱
        var castPr = e.casting && e.casting.max > 0
          ? 1 - clampNum(e.casting.t / e.casting.max, 0, 1)
          : clampNum((e._animClock || 0) / Math.max(0.25, e._animDur || 0.35), 0, 1);
        bob = -1.8 - Math.abs(Math.sin(time * 5.2 + phase)) * 2.2 - castPr * 2.5;
        rot = (Math.sin(time * 3.4 + phase) * 0.02 - castPr * 0.05) * (e.face || 1);
        dxOff = -castPr * 2.5 * (e.face || 1);
      } else if (state === "hurt") {
        dxOff = Math.sin(time * 72 + phase) * 2.6;
        rot = Math.sin(time * 55 + phase) * 0.05;
        dyOff = -Math.abs(Math.sin(time * 34 + phase)) * 1.4;
      } else if (state === "die") {
        // 死亡：倒地、下墜、淡出；用動畫時鐘確保整段一定會播完
        var dieDur = Math.max(0.45, monsterAnimDuration(e.mon, "die"));
        var dp = clampNum((e._animClock || 0) / dieDur, 0, 1);
        dyOff = dp * 5;
        dxOff = dp * 4 * (e.face || 1);
        rot = dp * 0.16 * (e.face || 1);
      } else {
        bob = Math.sin(time * 3.2 + phase) * 0.8;
      }

      e.visW = w;
      e.visH = h;
      drawShadow(ctx, sx, sy, w * 0.78, e.dying ? alpha * 0.6 : 1);

      // 詠唱法陣：畫在怪物腳下，和施法讀條、技能名稱一起強化「正在施法」的辨識度
      if (e.casting && !e.dying) {
        var ck = 1 - clampNum(e.casting.t / (e.casting.max || 1), 0, 1);
        var cr = w * (0.34 + ck * 0.26);
        ctx.save();
        ctx.globalAlpha = 0.38 + 0.22 * Math.sin(time * 12);
        ctx.strokeStyle = (e.casting.sk && e.casting.sk.Color) || e.auraColor || "#b78bff";
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(sx, sy - 1, cr, cr * 0.42, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.rotate(0);
        for (var ci2 = 0; ci2 < 5; ci2++) {
          var ca2 = time * 1.6 + ci2 * Math.PI * 2 / 5;
          ctx.beginPath();
          ctx.arc(sx + Math.cos(ca2) * cr, sy - 1 + Math.sin(ca2) * cr * 0.42, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = alpha * (e.spawnFade !== undefined ? clampNum(e.spawnFade, 0, 1) : 1);
      ctx.imageSmoothingEnabled = false;
      ctx.translate(sx + dxOff, sy - bob + dyOff);
      if (rot) ctx.rotate(rot);
      if ((e.face || 1) < 0) ctx.scale(-1, 1);
      var sw = fw, sh = fh;
      var srcX = frame * sw;
      ctx.drawImage(img, srcX, 0, sw, sh, -w / 2, -h, w, h);
      if (e.hitFlash > 0) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.55 * alpha;
        ctx.drawImage(img, srcX, 0, sw, sh, -w / 2, -h, w, h);
      }
      // 施法時把色彩疊在怪物身上，讓「正在詠唱」一眼看得出來
      if (e.casting && !e.dying) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.2 + 0.12 * Math.sin(time * 14);
        ctx.drawImage(img, srcX, 0, sw, sh, -w / 2, -h, w, h);
      }
      ctx.restore();
      return;
    }

    var v = visualForEnemy(e);
    var img2 = v.img ? IMG[v.img] : monsterSprite(v.draw);
    if (!img2) return;
    var scale2 = (v.scale || 1) * (scaleMul || 1) * (e.isBoss ? 1.7 : 1);
    drawShadow(ctx, sx, sy, img2.width * scale2 * 0.9);
    var bob2 = Math.sin(time * 7 + e.x * 0.05) * 1.2;
    drawSpriteEntity(ctx, img2, sx, sy + bob2, scale2, {
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

  function drawWeather(ctx, scene, vw, vh, time) {
    var wd = scene.weather;
    if (!wd) return;
    var t = time;
    ctx.save();
    for (var i = 0; i < wd.dots.length; i++) {
      var d = wd.dots[i];
      var sp = wd.speed * d.sp;
      var x, y, a = wd.alpha;
      if (wd.kind === "sand" || wd.kind === "wind") {
        x = (((d.x + t * sp * 0.06) % 1) + 1) % 1 * vw;
        y = (d.y * vh + Math.sin(t * 0.6 + d.ph) * 14 + vh) % vh;
        ctx.globalAlpha = a * (0.5 + 0.5 * Math.sin(t + d.ph));
        ctx.strokeStyle = wd.color;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - wd.size * sp * 1.4, y + 1.4);
        ctx.stroke();
        continue;
      }
      var rise = wd.kind === "ember" || wd.kind === "bubble" || wd.kind === "mote" ||
        wd.kind === "firefly" || wd.kind === "wisp";
      var prog = d.y + t * sp * 0.045;
      prog = prog - Math.floor(prog);
      y = rise ? (1 - prog) * vh : prog * vh;
      x = (d.x + Math.sin(t * 0.7 * sp + d.ph) * 0.022 * d.sw) * vw;
      x = ((x % vw) + vw) % vw;
      var s = (wd.size || 2) * d.sz;
      ctx.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 1.6 + d.ph));
      if (wd.kind === "snow") {
        ctx.fillStyle = wd.color;
        ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill();
      } else if (wd.kind === "petal" || wd.kind === "leaf") {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t * 1.2 + d.ph);
        ctx.fillStyle = wd.color;
        ctx.beginPath(); ctx.ellipse(0, 0, s * 1.8, s * 0.85, 0, 0, Math.PI * 2); ctx.fill();
        if (wd.color2) {
          ctx.fillStyle = wd.color2;
          ctx.globalAlpha *= 0.55;
          ctx.beginPath(); ctx.ellipse(0, 0, s * 1.05, s * 0.36, 0.4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      } else if (wd.kind === "drip" || wd.kind === "rain") {
        ctx.strokeStyle = wd.color;
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 1, y + wd.size * 2.2); ctx.stroke();
      } else if (wd.kind === "star") {
        ctx.fillStyle = wd.color;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t * 0.6 + d.ph);
        ctx.beginPath();
        for (var k = 0; k < 4; k++) {
          var aa = k * Math.PI / 2;
          ctx.lineTo(Math.cos(aa) * s * 2.4, Math.sin(aa) * s * 2.4);
          ctx.lineTo(Math.cos(aa + Math.PI / 4) * s * 0.7, Math.sin(aa + Math.PI / 4) * s * 0.7);
        }
        ctx.closePath(); ctx.fill();
        ctx.restore();
      } else if (wd.kind === "bubble") {
        ctx.strokeStyle = wd.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.stroke();
      } else {
        // ember / mote / firefly / wisp：雙層光點
        ctx.fillStyle = wd.color;
        ctx.globalAlpha = a * 0.22 * (0.6 + 0.4 * Math.sin(t * 2 + d.ph));
        ctx.beginPath(); ctx.arc(x, y, s * 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = a * (0.55 + 0.45 * Math.sin(t * 2 + d.ph));
        ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawAmbient(ctx, scene, cam, vw, vh, time) {
    if (!scene) return;
    if (scene.weather) { drawWeather(ctx, scene, vw, vh, time); return; }
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
    if (!scene) return;
    if (scene.biomeDef && scene.biomeDef.fog) {
      ctx.fillStyle = scene.biomeDef.fog;
      ctx.fillRect(0, 0, vw, vh);
    }
    if (scene.scenery && scene.scenery.fog) {
      ctx.fillStyle = scene.scenery.fog;
      ctx.fillRect(0, 0, vw, vh);
    }
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
    drawForeground: drawForeground,
    drawArena: drawArena,
    propFoot: propFoot,
    drawPlayer: drawPlayer,
    drawEnemy: drawEnemy,
    loadMonster: loadMonster,
    loadMonsters: loadMonsters,
    loadMonsterMeta: loadMonsterMeta,
    monsterMeta: monsterMeta,
    monsterAnimDuration: monsterAnimDuration,
    monsterLoaded: monsterLoaded,
    monsterStates: monsterStates,
    monsterDir: MON_DIR,
    monsters: MON,
    drawAmbient: drawAmbient,
    drawFog: drawFog,
    skillIcon: skillIcon,
    hasSkillIcon: hasSkillIcon,
    levelCover: levelCover,
    images: IMG,
    dir: ART_DIR
  };
})(window);
