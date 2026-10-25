/* Crossgate Survivors - HTML5 web version
 * Reads config/game_config.json (same schema as Unity/Godot data).
 * No build step required: GitHub Pages serves this folder directly.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------- defaults
  var FALLBACK = {
    PlayerGrow: { HP: 0.06, MP: 0.02, ATK: 0.02, DEF: 0.03, SPD: 0.01 },
    EnemyGrow: { HP: 0.045, MP: 0.1, ATK: 0.02, DEF: 0.03, SPD: 0.01 },
    Players: [
      { Index: 0, Name: "劍士", Desc: "一把聖劍披荊斬棘", ATKSkill: 0, SpecialSkill: 15, ATK: 5, HP: 4, MP: 2.6, DEF: 4, SPD: 3 },
      { Index: 1, Name: "弓箭手", Desc: "看我亂箭齊發", ATKSkill: 1, SpecialSkill: 2, ATK: 4, HP: 3, MP: 2.6, DEF: 2.8, SPD: 5 }
    ],
    Enemies: [
      { ID: 0, Name: "哥布林", ATK: 2.5, DEF: 2.5, SPD: 2, HP: 3.5, Skills: [] },
      { ID: 1, Name: "紅帽哥布林", ATK: 2.5, DEF: 2.5, SPD: 2, HP: 4, Skills: [] },
      { ID: 3, Name: "使魔", ATK: 2.5, DEF: 2.5, SPD: 3, HP: 2.4, Skills: [] },
      { ID: 6, Name: "蜜蜂", ATK: 5, DEF: 1, SPD: 4, HP: 2.5, Skills: [] },
      { ID: 8, Name: "喪屍", ATK: 3, DEF: 3, SPD: 1.5, HP: 5, Skills: [] }
    ],
    Skills: [
      { ID: 0, Name: "揮砍", CD: 2, Params: [{ Key: "Percent", Value: "100", Type: "int" }, { Key: "Distance", Value: "10", Type: "int" }, { Key: "Count", Value: "1", Type: "int" }] },
      { ID: 1, Name: "弓術射擊", CD: 2, Params: [{ Key: "Percent", Value: "100", Type: "int" }, { Key: "Range", Value: "50", Type: "int" }] },
      { ID: 15, Name: "弧月斬", CD: 10, IsSpecial: true, Params: [{ Key: "Percent", Value: "80", Type: "int" }, { Key: "Range", Value: "50", Type: "int" }] },
      { ID: 2, Name: "亂射", CD: 10, IsSpecial: true, Params: [{ Key: "Percent", Value: "80", Type: "int" }, { Key: "Count", Value: "1", Type: "int" }] },
      { ID: 100, Name: "火球術", Kind: "fireball", Element: "fire", Icon: 10001, CD: 5, MPCost: 16, Percent: 210, Color: "#ff8a3d" },
      { ID: 101, Name: "冰霜新星", Kind: "frost", Element: "ice", Icon: 10045, CD: 7, MPCost: 20, Percent: 150, Color: "#8fd8ff" },
      { ID: 102, Name: "雷電鏈", Kind: "chain", Element: "thunder", Icon: 10051, CD: 8, MPCost: 22, Percent: 135, Color: "#ffe066" },
      { ID: 103, Name: "治癒之光", Kind: "heal", Element: "holy", Icon: 90003, CD: 12, MPCost: 24, Percent: 30, Color: "#8fffb0" },
      { ID: 104, Name: "烈焰風暴", Kind: "meteor", Element: "fire", Icon: 10015, CD: 13, MPCost: 28, Percent: 190, Color: "#ff6b3d", UnlockLevel: 4 },
      { ID: 105, Name: "神聖護盾", Kind: "shield", Element: "holy", Icon: 90036, CD: 16, MPCost: 20, Percent: 35, Color: "#ffe9a8" },
      { ID: 106, Name: "劇毒雲霧", Kind: "poison", Element: "poison", Icon: 90015, CD: 10, MPCost: 20, Percent: 110, Color: "#a8d46a", UnlockLevel: 4 },
      { ID: 107, Name: "疾風刃", Kind: "wind", Element: "wind", Icon: 10107, CD: 6, MPCost: 18, Percent: 130, Color: "#9ff3d6", UnlockLevel: 1 },
      { ID: 108, Name: "暗影箭", Kind: "fireball", Element: "dark", Icon: 90021, CD: 6, MPCost: 20, Percent: 190, Color: "#b78bff", UnlockLevel: 4 },
      { ID: 109, Name: "魔力虹吸", Kind: "drain", Element: "dark", Icon: 90035, CD: 9, MPCost: 14, Percent: 140, Color: "#c98bff", UnlockLevel: 4 },
      { ID: 110, Name: "隕石術", Kind: "star", Element: "fire", Icon: 10015, CD: 15, MPCost: 30, Percent: 170, Color: "#ffb15c", UnlockLevel: 4 },
      { ID: 111, Name: "時光緩流", Kind: "time", Element: "arcane", Icon: 10139, CD: 14, MPCost: 24, Percent: 80, Color: "#9fd8ff", UnlockLevel: 6 },
      { ID: 112, Name: "聖光審判", Kind: "holy", Element: "holy", Icon: 90012, CD: 15, MPCost: 30, Percent: 200, Color: "#ffe9a8", UnlockLevel: 6 },
      { ID: 113, Name: "冰錐術", Kind: "iceshard", Element: "ice", Icon: 10045, CD: 5, MPCost: 14, Percent: 175, Color: "#9fe8ff", UnlockLevel: 3 },
      { ID: 114, Name: "烈焰噴射", Kind: "flame", Element: "fire", Icon: 10015, CD: 9, MPCost: 22, Percent: 150, Color: "#ff8a3d", UnlockLevel: 5 },
      { ID: 115, Name: "風暴之眼", Kind: "storm", Element: "wind", Icon: 10107, CD: 12, MPCost: 26, Percent: 160, Color: "#9ff3d6", UnlockLevel: 7 },
      { ID: 116, Name: "毒爆術", Kind: "poisonburst", Element: "poison", Icon: 90015, CD: 9, MPCost: 20, Percent: 165, Color: "#a8d46a", UnlockLevel: 4 },
      { ID: 117, Name: "暗影新星", Kind: "darknova", Element: "dark", Icon: 90021, CD: 11, MPCost: 24, Percent: 185, Color: "#b78bff", UnlockLevel: 6 },
      { ID: 118, Name: "聖光十字", Kind: "cross", Element: "holy", Icon: 90012, CD: 10, MPCost: 24, Percent: 195, Color: "#ffe9a8", UnlockLevel: 5 },
      { ID: 119, Name: "雷神之怒", Kind: "thunderstorm", Element: "thunder", Icon: 10051, CD: 14, MPCost: 30, Percent: 170, Color: "#ffe066", UnlockLevel: 8 },
      { ID: 120, Name: "時空裂縫", Kind: "rift", Element: "arcane", Icon: 10139, CD: 16, MPCost: 32, Percent: 140, Color: "#b78bff", UnlockLevel: 9 },
      { ID: 121, Name: "流星雨", Kind: "meteorrain", Element: "fire", Icon: 10015, CD: 18, MPCost: 36, Percent: 180, Color: "#ffb15c", UnlockLevel: 10 },
      { ID: 122, Name: "治癒之泉", Kind: "healzone", Element: "holy", Icon: 90003, CD: 14, MPCost: 24, Percent: 12, Color: "#8fffb0", UnlockLevel: 6 },
      { ID: 123, Name: "荊棘領域", Kind: "bramble", Element: "nature", Icon: 90036, CD: 12, MPCost: 22, Percent: 120, Color: "#7bd88f", UnlockLevel: 7 },
      { ID: 124, Name: "元素稜鏡", Kind: "prism", Element: "arcane", Icon: 10049, CD: 13, MPCost: 28, Percent: 175, Color: "#ffd166", UnlockLevel: 8 }
    ],
    Levels: [
      {
        Name: "哥布林森林", Difficulty: 1, MapWidth: 50, MapHeight: 50,
        RoundInfos: [
          { Level: 1, EnemyIDs: [3], SpawnCountPerEnemy: 10, Duration: 60 },
          { Level: 2, EnemyIDs: [0], SpawnCountPerEnemy: 12, Duration: 60 },
          { Level: 3, EnemyIDs: [1, 3], SpawnCountPerEnemy: 12, Duration: 60 },
          { Level: 4, Duration: -1, BossInfos: [{ EnemyID: 0, NamePrefix: "首領·", Level: 5, Allies: [3], SpawnPerAlly: 8 }] }
        ]
      }
    ]
  };

  var CONFIG = FALLBACK;
  var TILE = 32;
  var WORLD_MIN = 0;

  // 效能與穩定上限：避免霸主無限召喚／彈幕爆量造成頁面卡死
  var MAX_ENEMIES = 88;
  var MAX_BULLETS = 280;
  var MAX_SHOTS = 220;
  var MAX_ZONES = 48;
  var MAX_FX = 240;
  var MAX_FLOATERS = 80;
  var MAX_EMITTERS = 16;

  function pushCapped(arr, item, cap) {
    if (arr.length >= cap) {
      // 先移除最舊的同類特效，保持畫面流暢
      arr.shift();
    }
    arr.push(item);
    return item;
  }


  // ---------------------------------------------------------------- helpers
  function num(v, d) { var n = Number(v); return isFinite(n) ? n : d; }
  function param(skill, key, d) {
    if (!skill || !skill.Params) return d;
    for (var i = 0; i < skill.Params.length; i++) {
      if (skill.Params[i] && skill.Params[i].Key === key) {
        return num(skill.Params[i].Value, d);
      }
    }
    return d;
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function dist2(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return dx * dx + dy * dy; }
  function skillById(id) {
    var list = CONFIG.Skills || [];
    for (var i = 0; i < list.length; i++) if (Number(list[i].ID) === Number(id)) return list[i];
    return null;
  }
  function enemyById(id) {
    var list = CONFIG.Enemies || [];
    for (var i = 0; i < list.length; i++) if (Number(list[i].ID) === Number(id)) return list[i];
    return null;
  }
  function playerByIdx(i) {
    var list = CONFIG.Players || [];
    if (!list.length) return null;
    return list[clamp(i | 0, 0, list.length - 1)];
  }
  function levelByIdx(i) {
    var list = CONFIG.Levels || [];
    if (!list.length) return null;
    return list[clamp(i | 0, 0, list.length - 1)];
  }

  // ---------------------------------------------------------------- config load
  var configLoaded = false;
  var loadNote = document.getElementById("loadNote");

  function loadConfig() {
    var paths = ["config/game_config.json", "../config/game_config.json", "game_config.json"];
    var idx = 0;
    function tryNext() {
      if (idx >= paths.length) {
        // fetch 失敗（常見於直接雙擊 file://）：改用 config/game_config.js 的內嵌設定。
        if (window.MOLI_CONFIG) {
          try {
            CONFIG = normalizeConfig(window.MOLI_CONFIG);
            finish(true, "config/game_config.js（內嵌）");
            return;
          } catch (err) {
            if (window.console) console.error(err);
          }
        }
        finish(false);
        return;
      }
      var p = paths[idx++];
      fetch(p, { cache: "no-store" }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }).then(function (data) {
        if (data && typeof data === "object") {
          try {
            CONFIG = normalizeConfig(data);
            finish(true, p);
          } catch (err) {
            if (window.console) console.error(err);
            tryNext();
          }
        } else {
          tryNext();
        }
      }).catch(function () { tryNext(); });
    }
    tryNext();
  }

  function normalizeConfig(data) {
    var out = {
      PlayerGrow: Object.assign({}, FALLBACK.PlayerGrow, data.PlayerGrow || {}),
      EnemyGrow: Object.assign({}, FALLBACK.EnemyGrow, data.EnemyGrow || {}),
      Players: Array.isArray(data.Players) && data.Players.length ? data.Players : FALLBACK.Players,
      Enemies: Array.isArray(data.Enemies) && data.Enemies.length ? data.Enemies : FALLBACK.Enemies,
      Skills: Array.isArray(data.Skills) && data.Skills.length ? data.Skills : FALLBACK.Skills,
      Levels: Array.isArray(data.Levels) && data.Levels.length ? data.Levels : FALLBACK.Levels
    };
    return out;
  }

  function finish(ok, path) {
    configLoaded = true;
    if (loadNote) {
      loadNote.textContent = ok
        ? "已載入設定：" + path + "（角色 " + CONFIG.Players.length + " · 怪物 " + CONFIG.Enemies.length +
          " · 技能 " + CONFIG.Skills.length + " · 關卡 " + CONFIG.Levels.length + "）"
        : "未找到 config/game_config.json，使用內建預設設定。";
    }
    buildMenu();

    // Deep link used for local previews / smoke tests:
    //   index.html?autostart=1&level=2&player=1
    try {
      var q = (window.location && window.location.search) || "";
      if (q.indexOf("autostart") >= 0 && !G) {
        var ml = /[?&]level=(\d+)/.exec(q);
        if (ml) selectedLevel = clamp(parseInt(ml[1], 10), 0, CONFIG.Levels.length - 1);
        var mp = /[?&]player=(\d+)/.exec(q);
        if (mp) selectedPlayer = clamp(parseInt(mp[1], 10), 0, CONFIG.Players.length - 1);
        buildMenu();
        setTimeout(function () { try { startGame(); } catch (e) { if (window.console) console.error(e); } }, 250);
      }
    } catch (e) {}
  }

  // ---------------------------------------------------------------- menu
  var selectedPlayer = 0;
  var selectedLevel = 0;
  // 破關後進入下一周目：每多一輪，怪物強度繼續往上疊
  var loopCount = 0;
  var menuEl = document.getElementById("menu");
  var playerListEl = document.getElementById("playerList");
  var levelListEl = document.getElementById("levelList");
  var startBtn = document.getElementById("startBtn");

  function statLine(p) {
    return "ATK " + num(p.ATK, 0).toFixed(1) + " · DEF " + num(p.DEF, 0).toFixed(1) +
      " · HP " + num(p.HP, 0).toFixed(1) + " · MP " + num(p.MP, 0).toFixed(1) +
      " · SPD " + num(p.SPD, 0).toFixed(1);
  }

  function magicNames(p) {
    var ids = Array.isArray(p.Magic) && p.Magic.length ? p.Magic : [];
    var names = [];
    ids.forEach(function (id) {
      var sk = skillById(id);
      if (sk) names.push(sk.Name);
    });
    return names.join(" · ");
  }

  function buildMenu() {
    if (!playerListEl || !levelListEl) return;
    playerListEl.innerHTML = "";
    levelListEl.innerHTML = "";
    if (!CONFIG.Players) CONFIG.Players = FALLBACK.Players;
    if (!CONFIG.Levels) CONFIG.Levels = FALLBACK.Levels;
    if (!CONFIG.Skills) CONFIG.Skills = FALLBACK.Skills;
    if (!CONFIG.Enemies) CONFIG.Enemies = FALLBACK.Enemies;

    CONFIG.Players.forEach(function (p, i) {
      var d = document.createElement("div");
      d.className = "card player" + (i === selectedPlayer ? " selected" : "");
      d.innerHTML = '<div class="art"></div><div class="body">' +
        '<div class="name"></div><div class="desc"></div><div class="stats"></div></div>';
      var art = d.querySelector(".art");
      var artSrc = i === 0 ? "web-assets/art/hero_sword.png" : (i === 1 ? "web-assets/art/hero_bow.png" : "web-assets/art/portrait.png");
      art.style.backgroundImage = "url(\"" + artSrc + "\")";
      d.querySelector(".name").textContent = p.Name || ("角色 " + i);
      var magicText = magicNames(p);
      d.querySelector(".desc").textContent = (p.Desc || "") + (magicText ? "　｜　魔法：" + magicText : "");
      d.querySelector(".stats").textContent = statLine(p);
      d.addEventListener("click", function () { selectedPlayer = i; buildMenu(); });
      playerListEl.appendChild(d);
    });

    CONFIG.Levels.forEach(function (lv, i) {
      var d = document.createElement("div");
      d.className = "card level" + (i === selectedLevel ? " selected" : "");
      d.innerHTML = '<div class="cover"></div><div class="body">' +
        '<div class="name"></div><div class="desc"></div><div class="stats"></div></div>';
      var cover = d.querySelector(".cover");
      var url = (window.ART && ART.levelCover) ? ART.levelCover(lv, i) : "";
      if (url) cover.style.backgroundImage = "url(\"" + url + "\")";
      d.querySelector(".name").textContent = lv.Name || ("關卡 " + (i + 1));
      var rounds = (lv.RoundInfos || []).length;
      d.querySelector(".desc").textContent = "難度 Lv." + num(lv.Difficulty, 1) +
        " · " + num(lv.MonsterCount, 0) + " 種怪物 · " + rounds + " 波";
      d.querySelector(".stats").textContent = "BOSS " + (lv.BossTitle || (lv.BossNames || []).join("、") || "—");
      d.title = (lv.BossSubtitle ? lv.BossSubtitle + "\n" : "") + (lv.BossLore || lv.Desc || "");
      d.addEventListener("click", function () { selectedLevel = i; buildMenu(); });
      levelListEl.appendChild(d);
    });

    var loopNote = document.getElementById("loopNote");
    if (loopNote) {
      loopNote.textContent = loopCount
        ? "第 " + (loopCount + 1) + " 周目 · 敵人 HP +" + Math.round(loopCount * 55) + "% / ATK +" + Math.round(loopCount * 40) + "%"
        : "";
    }

    var hero = document.getElementById("menuHero");
    if (hero) {
      hero.src = selectedPlayer === 1 ? "web-assets/art/hero_bow.png" : "web-assets/art/hero_sword.png";
    }

    startBtn.disabled = !(CONFIG.Players && CONFIG.Players.length && CONFIG.Levels && CONFIG.Levels.length);
  }

  // ---------------------------------------------------------------- game state
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, DPR = 1;

  var G = null;
  var keys = Object.create(null);
  var pointer = { x: 0, y: 0, active: false };

  var hud = document.getElementById("hud");
  var levelUpEl = document.getElementById("levelUp");
  var gameOverEl = document.getElementById("gameOver");

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);

  function levelTerrainKind(lv) {
    return lv.Terrain || "forest";
  }

  function newGame() {
    fatalShown = false;
    var pi = clamp(selectedPlayer, 0, CONFIG.Players.length - 1);
    var li = clamp(selectedLevel, 0, CONFIG.Levels.length - 1);
    var pInfo = CONFIG.Players[pi];
    var lv = CONFIG.Levels[li];
    var grow = CONFIG.PlayerGrow;

    var worldW = Math.max(20, num(lv.MapWidth, 50)) * TILE;
    var worldH = Math.max(20, num(lv.MapHeight, 50)) * TILE;

    var scene = null;
    if (window.ART) {
      scene = ART.buildLevel(lv);
      worldW = scene.w;
      worldH = scene.h;
    }

    var player = {
      x: worldW / 2,
      y: worldH / 2,
      vx: 0, vy: 0,
      artScale: 1.35,
      spriteKey: pi === 1 ? "bow" : "sword",
      dir: 4,
      moving: false,
      attackT: 0,
      attackDur: 0.8,
      r: 15,
      face: 1,
      hp: 0, maxhp: 0,
      atk: 0, def: 0, spd: 0,
      level: 1, exp: 0, nextExp: 12,
      atkSkillId: num(pInfo.ATKSkill, 0),
      specialSkillId: num(pInfo.SpecialSkill, -1),
      atkCd: 0, specialCd: 0,
      magnet: 95,
      hitFlash: 0,
      invT: 0,
      // 魔法／魔力與狀態
      maxmp: 0, mp: 0, mpRegen: 4.5,
      spells: [],
      spellPower: 1,
      shield: 0, shieldT: 0,
      slowT: 0, slowMul: 1,
      regenT: 0, regen: 0,
      crit: 0, lifesteal: 0, atkCdScale: 1,
      critDmg: 1.8, areaScale: 1, hpRegen: 0, dodge: 0, execute: 0,
      multishot: 0, slowOnHit: 0, shieldOnKill: 0, expGain: 1,
      armorPen: 0, dmgReduce: 0,
      spellCdScale: 1, spellCostScale: 1, shieldPower: 1,
      ult: 0, ultMax: 100, ultReady: false,
      // 被動能力（升級卡）
      abilities: { thorn: 0, killBoom: 0, frostAura: 0, holyNova: 0, timeField: 0, guardian: 0, manaFlow: 0, echo: 0, burn: 0, rage: 0, lifeBloom: 0, chainNova: 0, meteorMark: 0, arcaneOrbit: 0, frostbite: 0, soulHarvest: 0, thunderMark: 0, frostBite: 0, elementalist: 0, swordWave: 0, arrowRain: 0, overload: 0, shieldRecharge: 0, berserk: 0, poisonNova: 0, galeWheel: 0, earthSpikes: 0, frostDomain: 0, windStep: 0, lastStand: 0, swordMastery: 0, bowMastery: 0, bladeCyclone: 0, voidRift: 0, starBurst: 0, thunderGod: 0, lastStand2: 0 },
      abilityTimers: { frost: 0, holy: 0, time: 0, chain: 0, meteor: 0, orbit: 0, thunder: 0, arrow: 0, shield: 0, poison: 1.0, gale: 1.0, spikes: 1.6, domain: 0.4, blade: 0.6, void: 1.2, star: 0.8, god: 1.5, lastStand2: 1 },
      guardianUsed: false,
      rageStacks: 0, rageT: 0,
      echoFx: 0
    };

    player.maxhp = (100 + num(pInfo.HP, 3) * 26) * (1 + loopCount * 0.28);
    player.atk = (7 + num(pInfo.ATK, 4) * 5) * (1 + loopCount * 0.24);
    player.def = num(pInfo.DEF, 3) * 2.2 * (1 + loopCount * 0.2);
    player.spd = 105 + num(pInfo.SPD, 3) * 7;
    player.hp = player.maxhp;
    player.maxmp = (70 + num(pInfo.MP, 2.6) * 22) * (1 + loopCount * 0.18);
    player.mp = player.maxmp;
    player.mpRegen = 4.2 + num(pInfo.MP, 2.6) * 0.6;

    // 角色魔法書：config Players[].Magic 指定技能 ID，沒有設定時依職業給預設魔法
    var magicIds = Array.isArray(pInfo.Magic) && pInfo.Magic.length ? pInfo.Magic
      : (player.spriteKey === "bow" ? [101, 102, 107, 110, 106, 111] : [100, 105, 103, 104, 112, 109]);
    player.spells = magicIds.map(function (id, si) {
      var sk = skillById(id);
      if (!sk || !sk.Kind) return null;
      return {
        id: num(id, 0),
        index: si,
        cd: 1.2 + si * 0.8,
        cdMax: Math.max(1, num(sk.CD, 6)),
        unlock: Math.max(1, num(sk.UnlockLevel, si >= 3 ? 4 : 1)),
        rank: 1
      };
    }).filter(Boolean);

    G = {
      player: player,
      playerName: pInfo.Name || "玩家",
      levelName: lv.Name || "關卡",
      worldW: worldW,
      worldH: worldH,
      cam: { x: player.x, y: player.y },
      enemies: [],
      orbs: [],
      fx: [],
      floaters: [],
      bullets: [],
      shots: [],
      pendingHits: [],
      zones: [],
      lasers: [],
      shockwaves: [],
      emitters: [],
      interactables: [],
      interactSpawnT: 20,
      time: 0,
      kills: 0,
      boomLock: false,
      roundIndex: -1,
      roundTimer: 0,
      roundActive: false,
      spawnQueue: [],
      spawnTimer: 0,
      trickleT: 0,
      packT: 9,
      reinforcePending: 0,
      lastSpawnAt: 0,
      bossActive: null,
      bosses: [],
      paused: false,
      over: false,
      victory: false,
      playerInfo: pInfo,
      level: lv,
      scene: scene,
      gimmick: {
        def: lv.Gimmick || null,
        timer: 12,
        warn: 0
      },
      grow: {
        HP: num(grow.HP, 0.06),
        MP: num(grow.MP, 0.02),
        ATK: num(grow.ATK, 0.02),
        DEF: num(grow.DEF, 0.03),
        SPD: num(grow.SPD, 0.01)
      },
      upPending: 0
    };

    hud.classList.remove("hidden");
    menuEl.classList.add("hidden");
    levelUpEl.classList.add("hidden");
    gameOverEl.classList.add("hidden");
    document.getElementById("levelName").textContent =
      G.levelName + (loopCount ? " · 第 " + (loopCount + 1) + " 周目" : "");
    buildSkillBar();
    buildInteractables(lv);
    if (window.AUDIO && AUDIO.ambient) AUDIO.ambient(ambientForLevel(lv));
    showStageIntro(lv);

    // 預覽用：?showcase=1 會在角色周圍排出該關卡的怪物，並自動輪播
    // 待機／行走／攻擊／施法／受傷／死亡六種動作，方便一眼檢查素材。
    if (((window.location && window.location.search) || "").indexOf("showcase") >= 0) {
      G.enemies.length = 0;
      G.spawnQueue.length = 0;
      var showIds = (lv.MonsterIDs || []).slice(0, 30);
      var cols = Math.min(6, Math.max(1, Math.ceil(Math.sqrt(showIds.length))));
      for (var si = 0; si < showIds.length; si++) {
        var idx = -1;
        for (var k = 0; k < CONFIG.Enemies.length; k++) {
          if (CONFIG.Enemies[k].Art === showIds[si]) { idx = CONFIG.Enemies[k].ID; break; }
        }
        if (idx < 0) continue;
        var en = spawnEnemy(idx, 1, false, "");
        if (!en) continue;
        en.x = G.player.x + ((si % cols) - (cols - 1) / 2) * 150;
        en.y = G.player.y - 140 + Math.floor(si / cols) * 140;
        en.spd = 0;
        en.atk = 0;
        en.spawnFade = 1;
        en.showIdx = si % 6;
        en.showStateT = 0.9 + (si % 6) * 0.4;
      }
      G.showcase = true;
      G.showcaseT = 0;
      toast("怪物動作展示：待機／行走／攻擊／施法／受傷／死亡");
    }

    nextRound();
    // 除錯：?autostart=1&level=0&boss=1 直接跳到霸主波
    try {
      var qs = (window.location && window.location.search) || "";
      if (qs.indexOf("boss=1") >= 0) {
        G.enemies.length = 0;
        G.spawnQueue.length = 0;
        G.roundIndex = Math.max(-1, (G.level.RoundInfos || []).length - 2);
        nextRound();
      }
    } catch (e) {}
    lastTs = 0;
    // 除錯掛鉤：只有 ?debug=1 時暴露少量狀態，方便自動化測試
    try {
      if (((window.location && window.location.search) || "").indexOf("debug") >= 0) {
        window.__MOLI_DEBUG = {
          state: function () { return G; },
          castSpell: castSpell,
          levelUp: levelUp,
          spawnEnemy: spawnEnemy,
          nextRound: nextRound,
          buildUpgradeChoices: buildUpgradeChoices,
          abilityKeys: function () { return ABILITY_UPGRADES.map(function (a) { return a.key; }); },
          statCount: function () { return STAT_UPGRADES.length; },
          abilityDesc: function (key) {
            for (var i = 0; i < ABILITY_UPGRADES.length; i++) {
              if (ABILITY_UPGRADES[i].key === key) return ABILITY_UPGRADES[i].desc(2);
            }
            return null;
          }
        };
      }
    } catch (e) {}
    requestAnimationFrame(frame);
  }

  function buildSkillBar() {
    var bar = document.getElementById("skillBar");
    if (!bar) return;
    bar.innerHTML = "";

    function makeChip(sk, opts) {
      var chip = document.createElement("div");
      chip.className = "skillChip" + (opts.magic ? " magic" : "") + (opts.special ? " special" : "");
      if (opts.color) chip.style.setProperty("--skill-color", opts.color);
      chip.innerHTML = '<span class="key"></span><img class="ico" alt=""><b></b><span class="meta"></span><i class="cd"></i>';
      var ico = chip.querySelector("img.ico");
      if (sk.Icon && window.ART) {
        ico.src = ART.skillIcon(sk.Icon);
        ico.onerror = function () { ico.style.display = "none"; };
      } else ico.style.display = "none";
      chip.querySelector(".key").textContent = opts.key;
      chip.querySelector("b").textContent = sk.Name || ("技能" + opts.id);
      var meta = opts.meta || "";
      chip.querySelector(".meta").textContent = meta;
      chip.dataset.kind = opts.kind;
      chip.dataset.skillId = String(opts.id);
      if (opts.index !== undefined) chip.dataset.index = String(opts.index);
      if (opts.unlock) chip.dataset.unlock = String(opts.unlock);
      bar.appendChild(chip);
      return chip;
    }

    var atkSkill = skillById(G.player.atkSkillId) || { Name: "普攻", CD: 2 };
    makeChip(atkSkill, {
      kind: "atk", key: "AUTO", id: G.player.atkSkillId,
      meta: "CD " + num(atkSkill.CD, 2).toFixed(1) + "s"
    });

    if (G.player.specialSkillId >= 0) {
      var sp = skillById(G.player.specialSkillId) || { Name: "特技", CD: 10 };
      makeChip(sp, {
        kind: "special", special: true, key: "SP", id: G.player.specialSkillId,
        color: "#ffd166",
        meta: "CD " + num(sp.CD, 10).toFixed(0) + "s"
      });
    }

    (G.player.spells || []).forEach(function (s, i) {
      var sk = skillById(s.id);
      if (!sk) return;
      makeChip(sk, {
        kind: "magic", magic: true, key: String(i + 1), id: s.id, index: i,
        color: sk.Color || "#9fd8ff",
        unlock: s.unlock || sk.UnlockLevel || 0,
        meta: "MP " + num(sk.MPCost, 15).toFixed(0) + " · " + num(sk.CD, 6).toFixed(0) + "s"
      });
    });
  }

  // ---------------------------------------------------------------- waves
  function nextRound() {
    G.roundIndex++;
    var rounds = G.level.RoundInfos || [];
    if (G.roundIndex >= rounds.length) {
      endGame(true);
      return;
    }
    var rd = rounds[G.roundIndex];
    G.roundActive = true;
    // 先補齊這一波會出現的怪物動作（走路／攻擊／施法／受傷／死亡），
    // 避免上場時只有待機圖，看起來像「怪物不會動」。
    if (window.ART && ART.loadMonsters) {
      var preload = [];
      (rd.EnemyIDs || []).forEach(function (id) {
        var en = enemyById(num(id, 0));
        if (en && en.Art && preload.indexOf(en.Art) < 0) preload.push(en.Art);
      });
      (rd.BossInfos || []).forEach(function (b) {
        var ben = enemyById(num(b.EnemyID, 0));
        if (ben && ben.Art && preload.indexOf(ben.Art) < 0) preload.push(ben.Art);
        (b.Allies || []).forEach(function (aid) {
          var aen = enemyById(num(aid, 0));
          if (aen && aen.Art && preload.indexOf(aen.Art) < 0) preload.push(aen.Art);
        });
      });
      if (preload.length) ART.loadMonsters(preload, null, ["idle", "walk", "attack", "special", "hurt", "die"]);
    }
    if (window.AUDIO) AUDIO.sfx("wave");
    G.roundTimer = num(rd.Duration, 0);
    G.spawnQueue = [];
    G.bossActive = null;
    G.bosses = [];
    G.bullets.length = 0;
    G.shots.length = 0;
    G.zones.length = 0;
    G.lasers.length = 0;
    G.shockwaves.length = 0;
    G.emitters.length = 0;
    G.pendingHits.length = 0;
    G.trickleT = rand(0.8, 1.8);
    G.packT = rand(8, 14);
    G.reinforcePending = 0;

    // 霸主波保留場上殘留的地面效果會太混亂，一併清掉
    if (G.gimmick && G.gimmick.def) G.gimmick.timer = Math.max(6, num(G.gimmick.timer, 10));

    var ids = rd.EnemyIDs || [];
    var count = Math.max(1, num(rd.SpawnCountPerEnemy, 8));
    ids.forEach(function (id) {
      for (var i = 0; i < count; i++) G.spawnQueue.push({ enemyId: num(id, 0), level: num(rd.Level, 1), elite: false });
    });

    // 每波額外增援：從整關怪物池抽樣，增加同波怪物種類與數量
    var extraIds = rd.ExtraDisturbEnemyIDs || [];
    var reinforce = Math.max(0, num(rd.ReinforceCount, 0));
    for (var ri = 0; ri < reinforce && extraIds.length; ri++) {
      var rid = extraIds[Math.floor(Math.random() * extraIds.length)];
      G.spawnQueue.push({ enemyId: num(rid, 0), level: num(rd.Level, 1), elite: false });
    }

    // 洗牌，避免一次只出一種怪
    for (var qi = G.spawnQueue.length - 1; qi > 0; qi--) {
      var qj = Math.floor(Math.random() * (qi + 1));
      var qt = G.spawnQueue[qi];
      G.spawnQueue[qi] = G.spawnQueue[qj];
      G.spawnQueue[qj] = qt;
    }

    // 每波指定數量的精英怪（體型更大、帶技能、掉落更多經驗）
    var eliteCount = Math.max(0, num(rd.EliteCount, 0));
    for (var ek = 0; ek < eliteCount && G.spawnQueue.length; ek++) {
      var ei = Math.floor(Math.random() * G.spawnQueue.length);
      G.spawnQueue[ei].elite = true;
    }

    var bosses = rd.BossInfos || [];
    bosses.forEach(function (b) {
      spawnEnemy(num(b.EnemyID, 0), num(b.Level, 1), true, b.NamePrefix || "", b);
      var allies = b.Allies || [];
      var per = Math.max(1, num(b.SpawnPerAlly, 8));
      allies.forEach(function (aid) {
        for (var i = 0; i < per; i++) G.spawnQueue.push({ enemyId: num(aid, 0), level: num(rd.Level, 1) });
      });
    });

    G.spawnTimer = 0;
    if (window.AUDIO) AUDIO.playBgm(bosses.length ? "boss" : levelBgm(G.levelIndex));
    toast("第 " + (G.roundIndex + 1) + " 波" + (bosses.length ? " · BOSS 來襲" : "") + (rd.Name ? " · " + rd.Name : ""));
    if (rd.Event) toast(rd.Event);
    if (bosses.length) showBossIntro(bosses[0], bosses.length > 1);
  }

  // 怪物 AI 原型：讓走路與進攻方式不再全部直線衝鋒
  var OFFENSIVE_SKILLS = ["e_bolt", "e_spread", "e_chain", "e_meteor", "e_nova", "e_poison", "e_sand", "e_ice", "e_drain", "e_web", "e_breath", "e_quake", "e_laser", "e_orbit", "e_bomb", "e_storm"];
  var SUPPORT_SKILLS = ["e_heal", "e_shield", "e_enrage", "e_curse", "e_summon", "e_charge"];

  // 每隻小怪依名字／圖鑑編號取得元素流派，招式、法陣與光環都用同一個色系。
  var ELEMENT_SKILLS = {
    fire:    [222, 203, 215, 204],
    ice:     [202, 211, 216],
    thunder: [208, 227, 200],
    poison:  [201, 221, 226],
    holy:    [214, 224, 220],
    dark:    [213, 209, 218, 225],
    earth:   [204, 217, 223],
    wind:    [212, 224, 207],
    water:   [211, 202, 221],
    arcane:  [200, 225, 224]
  };
  var ELEMENT_COLORS = {
    fire: "#ff7b3d", ice: "#8fd8ff", thunder: "#ffe066", poison: "#a8d46a",
    holy: "#ffe9a8", dark: "#b78bff", earth: "#e6c98a", wind: "#9ff3d6",
    water: "#6fc3ff", arcane: "#c9b3ff"
  };
  var ELEMENT_ALIASES = [
    [/火|炎|焰|熔|爆|赤|烈/, "fire"],
    [/冰|雪|寒|霜|凍/, "ice"],
    [/雷|電|閃|轟/, "thunder"],
    [/毒|腐|蟲|蛛|孢|菌/, "poison"],
    [/聖|光|天|神|天使|祭司/, "holy"],
    [/暗|影|冥|魂|靈|死|骨|魔|妖|鬼|詛咒/, "dark"],
    [/岩|石|土|沙|龍|龜|甲|樹|木|花/, "earth"],
    [/風|翼|鳥|羽|疾|空/, "wind"],
    [/水|海|波|潮|魚|蝦|蟹|蛇/, "water"]
  ];

  function monsterElement(info) {
    var name = (info && (info.Name || "")) || "";
    for (var i = 0; i < ELEMENT_ALIASES.length; i++) {
      if (ELEMENT_ALIASES[i][0].test(name)) return ELEMENT_ALIASES[i][1];
    }
    var keys = Object.keys(ELEMENT_SKILLS);
    var h = num(info && info.ID, 0) + (name.length * 17);
    return keys[Math.abs(h) % keys.length];
  }

  function pickEnemyAi(info, isElite, castSkills, isBoss) {
    if (isBoss) return "boss";
    var kinds = (castSkills || []).map(function (s) { return s.Kind; });
    var support = kinds.some(function (k) { return SUPPORT_SKILLS.indexOf(k) >= 0; });
    var ranged = kinds.some(function (k) { return OFFENSIVE_SKILLS.indexOf(k) >= 0; });
    var tier = num(info && info.Tier, 1);
    var spd = num(info && info.SPD, 2);
    var roll = Math.random();
    if (isElite) return roll < 0.6 ? "charger" : "brute";
    if (support && !ranged) return "support";
    if (ranged) {
      // 會遠程技能的小怪也要有近身、繞行、游擊等不同走位
      if (roll < 0.30) return "skirmisher";
      if (roll < 0.55) return "circler";
      if (roll < 0.75) return "zigzag";
      if (roll < 0.90) return "chaser";
      return "charger";
    }
    if (tier >= 4) return roll < 0.5 ? "charger" : (roll < 0.8 ? "brute" : "chaser");
    if (spd >= 4.2) return roll < 0.5 ? "circler" : (roll < 0.8 ? "charger" : "zigzag");
    return roll < 0.4 ? "chaser" : (roll < 0.7 ? "zigzag" : (roll < 0.9 ? "circler" : "charger"));
  }

  function preferredRangeFor(ai) {
    if (ai === "skirmisher") return 180 + rand(0, 60);
    if (ai === "support") return 170 + rand(0, 50);
    // 環繞型以前停在 105~145 外圈，但近戰可及距離只有 44~72，
    // 結果整場都在繞圈、永遠不攻擊。改成貼身環繞，讓牠們真的會出手。
    if (ai === "circler") return 54 + rand(0, 14);
    if (ai === "charger") return 300;
    return 0;
  }

  // 近戰動作不再只有一種：依 AI、速度與體型分配不同攻擊動作
  function atkStyleFor(info, isElite, ai) {
    var spd = num(info && info.SPD, 2);
    var tier = num(info && info.Tier, 1);
    var name = (info && info.Name) || "";
    var roll = Math.random();
    if (ai === "skirmisher" && roll < 0.45) return "spit";
    if (ai === "support" && roll < 0.3) return "spit";
    if (isElite || tier >= 4) {
      if (roll < 0.16) return "slam";
      if (roll < 0.32) return "combo";
      if (roll < 0.46) return "spin";
      if (roll < 0.58) return "claw";
      if (roll < 0.70) return "pounce";
      if (roll < 0.82) return "sweep";
      if (roll < 0.92) return "shockwave";
      return "slash";
    }
    if (/蛇|蟒|蜥|龍/.test(name) && roll < 0.35) return "pounce";
    if (/蟹|蠍|蛛|螳/.test(name) && roll < 0.4) return "sweep";
    if (spd >= 4.2) {
      if (roll < 0.24) return "sting";
      if (roll < 0.42) return "combo";
      if (roll < 0.58) return "claw";
      if (roll < 0.70) return "spin";
      if (roll < 0.82) return "pounce";
      return "bite";
    }
    if (roll < 0.24) return "bite";
    if (roll < 0.42) return "slash";
    if (roll < 0.58) return "claw";
    if (roll < 0.70) return "sting";
    if (roll < 0.82) return "sweep";
    return "combo";
  }

  // 精英怪不再只是「比較大隻」：每隻精英會帶一種鮮明的強化詞綴，
  // 名稱、光環顏色、攻擊方式與掉落都會跟著改變。
  var ELITE_MODS = [
    { key: "fierce", name: "狂暴", color: "#ff7a7a", tip: "攻擊力 +35%",
      apply: function (e) { e.atk *= 1.35; e.cdSpeed = 0.94; } },
    { key: "swift", name: "迅捷", color: "#8ff3d6", tip: "移動與出手更快",
      apply: function (e) { e.spd *= 1.3; e.cdSpeed = 0.72; e.animSpeed = Math.abs(e.animSpeed) + 1; } },
    { key: "tough", name: "堅韌", color: "#ffd166", tip: "生命 +50%、防禦 +35%",
      apply: function (e) { e.maxhp *= 1.5; e.hp = e.maxhp; e.def *= 1.35; } },
    { key: "venom", name: "劇毒", color: "#a8d46a", tip: "命中留下毒沼",
      apply: function (e) { e.venomOnHit = true; } },
    { key: "arcane", name: "奧術", color: "#c9b3ff", tip: "詠唱大幅加速",
      apply: function (e) { e.castSpeed = 0.62; } },
    { key: "ward", name: "護盾", color: "#9fd8ff", tip: "開場獲得厚重護盾",
      apply: function (e) { e.shield = e.maxhp * 0.35; e.shieldT = 9; } }
  ];

  function pickEliteMod(level) {
    if (Math.random() < 0.25 && level < 4) return null;
    return ELITE_MODS[Math.floor(Math.random() * ELITE_MODS.length)];
  }

  function walkStyleFor(info, ai) {
    var spd = num(info && info.SPD, 2);
    var name = (info && info.Name) || "";
    // 依物種給不同的步行演出，讓每一種怪看起來都有自己的移動方式
    if (/蛇|蟒|蚯|蛆|蟲|蛛|蜈/.test(name)) return "slither";
    if (/蝠|蜂|蝶|蛾|鳥|翼|妖精|燕|梟|鶴/.test(name)) return "flutter";
    if (/蟹|蠍|蟻|螳|蛛/.test(name)) return "skitter";
    if (/龍|龜|甲|巨神|巨人|石像|魔像|岩怪|樹精/.test(name)) return "lumber";
    if (/史萊姆|果凍|布丁|幽靈|鬼|魂|煙|燈/.test(name)) return "float";
    if (/兔|蛙|鼠|貓|犬|狼|狐|羊|鹿/.test(name)) return Math.random() < 0.5 ? "hop" : "bounce";
    if (ai === "brute" || num(info && info.Tier, 1) >= 5) return "stomp";
    if (spd >= 4.6) return "hop";
    if (ai === "circler" || ai === "zigzag") return "sway";
    if (ai === "skirmisher" || ai === "support") return "glide";
    return Math.random() < 0.5 ? "stalk" : "sway";
  }

  function enemyIdByArt(art) {
    if (!art) return 0;
    if (!G._artMap) {
      G._artMap = {};
      (CONFIG.Enemies || []).forEach(function (en) {
        if (en.Art) G._artMap[en.Art] = en.ID;
      });
    }
    return num(G._artMap[art], 0);
  }

  function spawnEnemy(id, level, isBoss, prefix, bossInfo, elite) {
    bossInfo = bossInfo || {};
    if (!isBoss && G.enemies.length >= MAX_ENEMIES) return null;
    var info = enemyById(id);
    if (!info) info = { ID: id, Name: "怪物" + id, ATK: 2, DEF: 2, SPD: 2, HP: 3 };
    var p = G.player;
    var ang = Math.random() * Math.PI * 2;
    // 出生距離壓在畫面邊緣附近：怪物一出現就看得見，不用等好幾秒才走進戰場，
    // 攻擊／施法／死亡動作才不會全部發生在鏡頭外。
    var radius = rand(250, 410);
    var x = clamp(p.x + Math.cos(ang) * radius, 40, G.worldW - 40);
    var y = clamp(p.y + Math.sin(ang) * radius, 40, G.worldH - 40);

    var eg = CONFIG.EnemyGrow || FALLBACK.EnemyGrow;
    var lv = Math.max(1, level);
    var hpScale = 1 + (lv - 1) * num(eg.HP, 0.05) * 4;
    var atkScale = 1 + (lv - 1) * num(eg.ATK, 0.02) * 4;
    var hpMul = isBoss ? num(bossInfo.HpMul, 1) : 1;
    var atkMul = isBoss ? num(bossInfo.AtkMul, 1) : 1;

    // 精英怪：血厚、攻擊高、體型大，會多帶一招技能
    var isElite = !!elite && !isBoss;
    var eliteHp = isElite ? 2.35 : 1;
    var eliteAtk = isElite ? 1.3 : 1;
    var castSkills = isBoss ? [] : enemyCastSkills(info, isElite);
    var ai = pickEnemyAi(info, isElite, castSkills, isBoss);
    var element = isBoss ? "boss" : monsterElement(info);

    // 小怪血量以前偏高（Lv1 約 78），普攻要打三下才死，畫面上幾乎只看得到走路。
    // 降低基礎血量後，一次普攻就能打出受傷與死亡動作，戰鬥回饋立即許多。
    var maxhp = (13 + num(info.HP, 3) * 9) * hpScale * (isBoss ? 4.2 : 1) * hpMul * eliteHp * (1 + loopCount * 0.55);
    var shownName = (isBoss && bossInfo.Name) ? bossInfo.Name : (info.Name || "怪物");
    var e = {
      x: x, y: y, r: isBoss ? 26 : (isElite ? 17 : 13),
      id: num(info.ID, id),
      mon: info.Art || null,
      name: (isBoss ? "" : (isElite ? "精英·" : "")) + (prefix || "") + shownName,
      monName: info.Name || shownName,
      hp: maxhp, maxhp: maxhp,
      atk: (4 + num(info.ATK, 2) * 2.4) * atkScale * (isBoss ? 1.7 : 1) * atkMul * eliteAtk * (1 + loopCount * 0.4),
      def: num(info.DEF, 2) * 1.8 * (isBoss ? 1.5 : 1) * (isElite ? 1.25 : 1),
      // 追得上玩家才有近身戰鬥；原本 38+SPD*8 約 54~70，玩家 120 以上，
      // 怪物永遠在畫面邊緣散步，自然看不到攻擊動作。
      spd: (48 + num(info.SPD, 2) * 12) * (isElite ? 0.96 : 1),
      isBoss: !!isBoss,
      elite: isElite,
      atkCd: rand(0.4, 1.4),
      hitFlash: 0,
      state: "idle",
      stateT: 0,
      dying: false,
      dieT: 0,
      exp: (6 + lv * 2) * (isBoss ? 12 : (isElite ? 3.2 : 1)),
      bossTitle: bossInfo.Title || "",
      bossColor: bossInfo.Color || "#ff9b6a",
      abilities: (bossInfo.Mechanic || []).slice(),
      phase2At: num(bossInfo.Phase2At, 0.5),
      phase3At: num(bossInfo.Phase3At, 0),
      phase: 1,
      abilityCd: rand(2.4, 3.6),
      abilityIndex: 0,
      castT: 0,
      dash: null,
      auraT: 0,
      // 怪物技能與狀態
      castSkills: castSkills,
      castCd: rand(1.8, 4.2),
      casting: null,
      element: element,
      auraColor: isBoss ? (bossInfo.Color || "#ff9b6a") : (ELEMENT_COLORS[element] || "#b78bff"),
      slowT: 0, slowMul: 1,
      stunT: 0,
      shield: 0, shieldT: 0,
      atkBuffT: 0, atkBuff: 1,
      spdMul: 1,
      castGlow: 0,
      // 動作與 AI
      animPhase: Math.random() * Math.PI * 2,
      animSpeed: rand(-0.8, 1.6),
      face: 1,
      ai: ai,
      aiTimer: rand(0.3, 1.6),
      preferred: preferredRangeFor(ai),
      strafe: Math.random() < 0.5 ? -1 : 1,
      dashCd: rand(1.6, 3.6),
      windup: 0,
      atkStyle: atkStyleFor(info, isElite, ai),
      walkStyle: walkStyleFor(info, ai),
      spawnFade: 0,
      spawnFxT: 0.5,
      hitDelay: 0,
      burnT: 0, burnDps: 0,
      venomT: 0, venomDps: 0,
      errCount: 0,
      lastHp: maxhp,
      healLock: 0,
      stallT: 0,
      enragedStall: false
    };
    G.enemies.push(e);
    // 每一隻怪一出生就補齊六段動作。先前只在整關開場／換波時批次預載，
    // 臨時增援或召喚出來的小怪可能先用待機圖上場，第一眼就看不到走路與攻擊。
    if (window.ART && ART.loadMonster && e.mon) {
      ART.loadMonster(e.mon, ["idle", "walk", "attack", "special", "hurt", "die"]);
    }
    if (isBoss) {
      G.bossActive = e;
      G.bosses.push(e);
    } else {
      // 出生傳送門：讓「持續出怪」有清楚的視覺節奏
      var pc = e.elite ? "#ffd166" : (e.auraColor || "#b78bff");
      pushCapped(G.fx, { type: "portal", x: x, y: y, r: e.r + 8, t: 0.5, max: 0.5, color: pc }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: x, y: y, r: e.r, max: e.r * 3.2, t: 0.42, color: pc }, MAX_FX);
      if (isElite) {
        pushCapped(G.fx, { type: "spikes", x: x, y: y, r: 70, t: 0.5, max: 0.5, color: "#ffd166" }, MAX_FX);
        pushCapped(G.fx, { type: "flash", x: x, y: y, t: 0.4, max: 0.4, color: "#ffe9a8" }, MAX_FX);
        if (window.AUDIO) AUDIO.sfx("elite");
      }
    }
    return e;
  }

  // 解析怪物技能：config Enemies[].Skills 的 SkillID 對應 Skills[] 裡有 Kind 的項目。
  // 舊資料只有 SkillID 0（揮砍）時，Tier 3 以上自動獲得一招遠程魔法，
  // 讓所有舊關卡也能看到怪物施法。
  function enemyCastSkills(info, isElite) {
    var out = [];
    var raw = info && Array.isArray(info.Skills) ? info.Skills : [];
    raw.forEach(function (s) {
      var sk = skillById(num(s && s.SkillID, 0));
      if (sk && sk.Kind && sk.Kind.indexOf("e_") === 0) out.push(sk);
    });
    // 任何小怪至少帶一招有特效的攻擊技能；低階用魔彈、高階用扇形吐息
    var hasOffense = out.some(function (s) { return OFFENSIVE_SKILLS.indexOf(s.Kind) >= 0; });
    if (!hasOffense) {
      var fb = skillById(num(info && info.Tier, 0) >= 3 ? 201 : 200) || skillById(200);
      if (fb && out.indexOf(fb) < 0) out.push(fb);
    }
    // 依怪物名稱／圖鑑編號給一個元素流派，讓每隻小怪的招式與顏色有辨識度。
    // 這是原本「所有小怪都丟同一顆紫球」的主要修正。
    var element = monsterElement(info);
    var flavor = ELEMENT_SKILLS[element] || ELEMENT_SKILLS.arcane;
    function addSkill(id) {
      var sk = skillById(id);
      if (!sk || out.length >= 3 || out.indexOf(sk) >= 0) return;
      out.push(sk);
    }
    for (var fi = 0; fi < flavor.length && out.length < 2; fi++) addSkill(flavor[fi]);
    if (isElite) {
      addSkill(206);
      if (out.length < 3) addSkill(219);
    }
    return out;
  }

  // ---------------------------------------------------------------- combat
  function dealDamage(e, amount, opts) {
    if (!e || e.dying) return 0;
    opts = opts || {};
    var pl = G.player;
    var crit = !opts.noCrit && Math.random() < (pl.crit || 0);
    var dmg = Math.max(1, amount - e.def * 0.55 * (1 - Math.min(0.85, pl.armorPen || 0)));
    if (crit) dmg *= (pl.critDmg || 1.8);
    // 背水一戰：殘血時傷害提升
    if (pl.abilities && pl.abilities.lastStand > 0 && pl.hp / pl.maxhp < 0.45) {
      dmg *= 1 + 0.12 * pl.abilities.lastStand;
    }
    // 霜咬：對已被減速的敵人有額外傷害；命中時也可能附加減速
    if (pl.abilities && pl.abilities.frostBite > 0 && !e.isBoss) {
      if (e.slowT > 0) dmg *= 1 + 0.07 * pl.abilities.frostBite;
      else if (Math.random() < 0.12 * pl.abilities.frostBite) {
        e.slowT = Math.max(e.slowT || 0, 1.6);
        e.slowMul = Math.min(e.slowMul || 1, 0.72);
      }
    }
    // 斬殺：血量低於門檻的小怪直接處決
    var executed = false;
    if (!opts.noExecute && pl.execute > 0 && !e.isBoss && e.hp / e.maxhp <= pl.execute) {
      dmg = e.hp + 1;
      executed = true;
    }
    if (e.shield > 0) {
      var absorb = Math.min(e.shield, dmg);
      e.shield -= absorb;
      dmg -= absorb;
      G.floaters.push({ x: e.x, y: e.y - e.r - 18, text: "盾 -" + Math.round(absorb), t: 0.6, color: "#9fd8ff" });
      if (dmg <= 0) { e.hitFlash = 0.12; return 0; }
    }
    e.hp -= dmg;
    e.hitFlash = 0.12;
    if (window.AUDIO) AUDIO.sfx(e.isBoss || dmg > e.maxhp * 0.22 ? "hitbig" : "hit");
    // 雷鳴印記：命中時偶爾向鄰近敵人跳電
    if (pl.abilities && pl.abilities.thunderMark > 0 && !opts.noProc && !e.isBoss) {
      if (G.time - (pl._thunderAt || 0) > 0.6 && Math.random() < 0.05 * pl.abilities.thunderMark) {
        pl._thunderAt = G.time;
        var tmBest = null, tmD = 240 * 240;
        for (var tmi = 0; tmi < G.enemies.length; tmi++) {
          var tm = G.enemies[tmi];
          if (tm === e || tm.dying || tm.isBoss) continue;
          var tmd = dist2(tm, e);
          if (tmd < tmD) { tmD = tmd; tmBest = tm; }
        }
        if (tmBest) {
          dealDamage(tmBest, pl.atk * 0.4 * pl.abilities.thunderMark, { noCrit: true, noProc: true });
          pushCapped(G.fx, { type: "chain", pts: [{ x: e.x, y: e.y - 10 }, { x: tmBest.x, y: tmBest.y - 10 }], t: 0.22, max: 0.22, color: "#ffe066" }, MAX_FX);
        }
      }
    }
    if (pl.slowOnHit > 0 && !e.isBoss) {
      e.slowT = Math.max(e.slowT || 0, 1.4);
      e.slowMul = Math.min(e.slowMul || 1, 1 - pl.slowOnHit);
    }
    // 烈焰附魔：普攻與魔法命中時點燃小怪
    if (pl && pl.abilities && pl.abilities.burn > 0 && !opts.noBurn && !e.isBoss) {
      e.burnT = Math.max(e.burnT || 0, 2.6);
      e.burnDps = Math.max(e.burnDps || 0, pl.atk * 0.16 * pl.abilities.burn);
    }
    if (e.hp > 0 && !e.isBoss) {
      var kx = e.x - G.player.x, ky = e.y - G.player.y;
      var kd = Math.hypot(kx, ky) || 1;
      e.x = clamp(e.x + kx / kd * 16, e.r, G.worldW - e.r);
      e.y = clamp(e.y + ky / kd * 16, e.r, G.worldH - e.r);
      // 受傷動作只在「沒有在出手／詠唱」時播放，避免把攻擊動畫打斷成一直抽搐
      if (!e.casting && !(e.state === "attack" && (e.stateT || 0) > 0.18)) {
        e.state = "hurt";
        e.stateT = 0.26;
      }
    }
    pushCapped(G.floaters, {
      x: e.x, y: e.y - e.r - 6,
      text: (executed ? "處決 " : (crit ? "暴擊 " : "")) + Math.round(dmg),
      t: 0.7, color: executed ? "#ff6b6b" : (crit ? "#ffd166" : "#ffe082")
    }, MAX_FLOATERS);
    if (e.hp <= 0) killEnemy(e);
    return dmg;
  }

  function killEnemy(e) {
    if (e.dying) return;
    e.dying = true;
    // 依素材實際死亡動畫長度決定停留時間；播完再淡出，才看得到完整的倒地動作。
    var dieLen = window.ART && ART.monsterAnimDuration ? ART.monsterAnimDuration(e.mon, "die") : 0;
    e.dieT = Math.max(1.3, (dieLen || 0) + 0.55);
    e.dieLen = Math.max(0.8, dieLen || 1.0);
    e.hp = 0;
    e.state = "die";
    e.stateT = 0;
    e.casting = null;
    e.bossCast = null;
    e.windup = 0;
    e.dash = null;
    e.burnT = 0;
    if (window.AUDIO) {
      AUDIO.sfx(e.isBoss ? "killbig" : (e.elite ? "hitbig" : "kill"));
      AUDIO.sfx(e.isBoss ? "monster_die_big" : "monster_die");
    }
    var p = G.player;
    G.kills++;
    // 終極技能充能：擊殺累積，精英與霸主給更多
    if (p.ult < p.ultMax) {
      p.ult = Math.min(p.ultMax, p.ult + (e.isBoss ? 45 : (e.elite ? 14 : 7)));
      if (p.ult >= p.ultMax) {
        p.ultReady = true;
        toast("終極技能就緒！按 R 施放");
        if (window.AUDIO) AUDIO.sfx("ready");
      }
    }
    // 死亡後立刻補上新的怪物，維持戰鬥密度（不用等計時器）
    if (G.roundActive) {
      G.trickleT = Math.min(G.trickleT, 0.06);
      // 擊殺即刻預約增援：不直接 push，避免在傷害迴圈中改動敵人陣列。
      G.reinforcePending = Math.min(6, num(G.reinforcePending, 0) + 1);
    }
    // 每 12 擊殺來一波小怪突襲，讓清場後不會出現空窗
    G.killStreak = (G.killStreak || 0) + 1;
    if (G.killStreak % 12 === 0 && G.roundActive && !e.isBoss) {
      G.packT = Math.min(num(G.packT, 9), 0.05);
      pushCapped(G.floaters, { x: e.x, y: e.y - 46, text: "怪物增援！", t: 0.9, color: "#ffb15c", size: 13 }, MAX_FLOATERS);
    }
    if (e.isBoss) {
      G.bosses = G.bosses.filter(function (b) { return b !== e; });
      G.bossActive = null;
      for (var bi = 0; bi < G.bosses.length; bi++) {
        if (!G.bosses[bi].dying) { G.bossActive = G.bosses[bi]; break; }
      }
    }
    // 吸血成長：擊殺回復生命
    if (p.lifesteal > 0) {
      var heal = p.maxhp * p.lifesteal;
      p.hp = Math.min(p.maxhp, p.hp + heal);
    }
    // 擊殺爆裂／致命節奏
    if (p.abilities && !e.isBoss) {
      if (p.abilities.killBoom > 0 && !G.boomLock) {
        G.boomLock = true;
        damageArea(e.x, e.y, 66 + p.abilities.killBoom * 18, p.atk * 0.55 * p.abilities.killBoom, "#ff8a3d", {});
        G.boomLock = false;
      }
      if (p.abilities.rage > 0) {
        p.rageStacks = Math.min(10, (p.rageStacks || 0) + 1);
        p.rageT = 5;
      }
      // 靈魂收割：擊殺縮短所有魔法冷卻並回復少量生命
      if (p.abilities.soulHarvest > 0) {
        var sh = p.abilities.soulHarvest;
        for (var ssi = 0; ssi < p.spells.length; ssi++) {
          p.spells[ssi].cd = Math.max(0, p.spells[ssi].cd - 0.35 * sh);
        }
        p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.005 * sh);
        pushCapped(G.fx, { type: "ring", x: e.x, y: e.y - 10, r: 8, max: 46, t: 0.3, color: "#9ff3d6" }, MAX_FX);
      }
    }
    // 擊殺護盾：消滅敵人時獲得短暫護盾
    if (p.shieldOnKill > 0) {
      p.shield = Math.max(p.shield, p.maxhp * p.shieldOnKill);
      p.shieldT = Math.max(p.shieldT || 0, 4.5);
    }
    // 死亡時追加的元素爆散，讓擊殺回饋更明顯
    pushCapped(G.fx, {
      type: "death", x: e.x, y: e.y - 8, r: e.r, max: e.r * (e.isBoss ? 5 : 2.8),
      t: 0.45, color: e.isBoss ? "#ffd166" : (e.elite ? "#ffd166" : "#ffb15c")
    }, MAX_FX);
    var orbs = e.isBoss ? 10 : (e.elite ? 4 : 1);
    for (var oi = 0; oi < orbs; oi++) {
      G.orbs.push({
        x: e.x + rand(-12, 12), y: e.y + rand(-12, 12),
        v: e.exp / orbs * (e.elite ? 1.1 : 1), r: e.elite ? 7 : 5
      });
    }
    var ringCount = e.isBoss ? 10 : (e.elite ? 3 : 1);
    for (var k = 0; k < ringCount; k++) {
      pushCapped(G.fx, { type: "ring", x: e.x, y: e.y, r: e.r, max: e.r * (e.elite ? 4 : 3), t: 0.35, color: e.elite ? "#ffd166" : "#ff9b6a" }, MAX_FX);
    }
  }

  // ---------------------------------------------------------------- boss / hazard
  function damagePlayer(amount, color, source) {
    var p = G.player;
    if (p.invT > 0 || p.hp <= 0) return;
    // 閃避：完全避開一次傷害
    if (p.dodge > 0 && Math.random() < p.dodge) {
      p.invT = 0.18;
      G.floaters.push({ x: p.x, y: p.y - 34, text: "閃避", t: 0.6, color: "#9ff3d6" });
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 16, r: 12, max: 52, t: 0.28, color: "#9ff3d6" }, MAX_FX);
      return;
    }
    p.invT = 0.26;
    var raw = Math.max(1, amount - p.def * 0.35);
    // 韌性／背水一戰：減免受到的傷害
    if (p.dmgReduce > 0) raw *= 1 - Math.min(0.6, p.dmgReduce);
    if (p.abilities && p.abilities.lastStand > 0 && p.hp / p.maxhp < 0.45) {
      raw *= 1 - Math.min(0.4, 0.06 * p.abilities.lastStand);
    }
    // 荊棘之甲：反彈部分近戰傷害
    if (source && !source.dying && p.abilities && p.abilities.thorn > 0) {
      dealDamage(source, raw * 0.22 * p.abilities.thorn, { noCrit: true });
    }
    // 護盾先吸收傷害
    if (p.shield > 0) {
      var absorb = Math.min(p.shield, raw);
      p.shield -= absorb;
      raw -= absorb;
      G.floaters.push({ x: p.x, y: p.y - 42, text: "護盾 -" + Math.round(absorb), t: 0.6, color: "#ffe9a8" });
      G.fx.push({ type: "ring", x: p.x, y: p.y - 18, r: 20, max: 56, t: 0.25, color: "#ffe9a8" });
      if (raw <= 0) return;
    }
    p.hp -= raw;
    p.hitFlash = 0.15;
    // 背水一戰：殘血時發出提示音與紅光
    if (p.abilities && p.abilities.lastStand > 0 && p.hp > 0 && p.hp / p.maxhp < 0.45 &&
        (!p._lastStandAt || G.time - p._lastStandAt > 6)) {
      p._lastStandAt = G.time;
      if (window.AUDIO) AUDIO.sfx("laststand");
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 18, max: 120, t: 0.5, color: "#ff7a6a" }, MAX_FX);
      pushCapped(G.floaters, { x: p.x, y: p.y - 66, text: "背水一戰", t: 0.9, color: "#ff9b8a" }, MAX_FLOATERS);
    }
    if (window.AUDIO) AUDIO.sfx("hurt");
    // 低血量心跳提示（每 2 秒最多一次）
    if (window.AUDIO && p.hp > 0 && p.hp / p.maxhp < 0.28) {
      if (!p._lowHpAt || G.time - p._lowHpAt > 2.4) {
        p._lowHpAt = G.time;
        AUDIO.sfx("lowhp");
      }
    }
    p.ult = Math.min(p.ultMax, (p.ult || 0) + 2.5 + raw / Math.max(1, p.maxhp) * 24);
    G.floaters.push({ x: p.x, y: p.y - 30, text: "-" + Math.round(raw), t: 0.7, color: color || "#ff7b7b" });
    if (p.hp <= 0) {
      // 守護天使：每場一次，瀕死時以 50% 生命復活
      if (p.abilities && p.abilities.guardian > 0 && !p.guardianUsed) {
        p.guardianUsed = true;
        p.hp = p.maxhp * 0.5;
        p.invT = 2.2;
        p.shield = Math.max(p.shield, p.maxhp * 0.25);
        p.shieldT = 6;
        toast("守護天使發動！");
        if (window.AUDIO) AUDIO.sfx("heal");
        G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 30, max: 260, t: 0.8, color: "#ffe9a8" });
        return;
      }
      p.hp = 0;
      endGame(false);
    }
  }

  function addBullet(x, y, ang, speed, dmg, color, r, opts) {
    opts = opts || {};
    if (G.bullets.length >= MAX_BULLETS) G.bullets.shift();
    G.bullets.push({
      x: x, y: y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      r: r || 8, dmg: dmg, color: color || "#ffb15c",
      t: opts.life || 5.2,
      slow: opts.slow || 0,
      homing: opts.homing || 0,
      boss: !!opts.boss
    });
  }

  function updateBosses(dt) {
    var p = G.player;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (!e.isBoss || e.dying) continue;

      // 第二／第三階段：血量過半狂暴，殘血進入狂亂
      var ratio = e.hp / e.maxhp;
      if (e.phase === 1 && ratio <= e.phase2At) {
        e.phase = 2;
        e.auraT = 0;
        e.abilityCd = Math.min(e.abilityCd, 1.2);
        toast(e.name + " 進入狂暴！");
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 300, t: 0.7, color: e.bossColor });
        G.fx.push({ type: "flash", x: e.x, y: e.y, t: 0.5, max: 0.5, color: e.bossColor });
        pushCapped(G.fx, { type: "spikes", x: e.x, y: e.y, r: 150, t: 0.6, max: 0.6, color: e.bossColor }, MAX_FX);
        pushCapped(G.shockwaves, { x: e.x, y: e.y, r: 24, max: 320, t: 0, delay: 0, dmg: 0, color: e.bossColor, hit: true }, 20);
        if (window.AUDIO) AUDIO.sfx("boss_phase");
      }
      if (e.phase === 2 && e.phase3At > 0 && ratio <= e.phase3At) {
        e.phase = 3;
        e.auraT = 0;
        e.abilityCd = Math.min(e.abilityCd, 0.8);
        toast(e.name + " 進入狂亂！");
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 360, t: 0.8, color: "#ff5a6e" });
        G.fx.push({ type: "flash", x: e.x, y: e.y, t: 0.55, max: 0.55, color: "#ff5a6e" });
        pushCapped(G.fx, { type: "lightning", x: e.x, y: e.y, t: 0.5, max: 0.5, color: "#ff5a6e" }, MAX_FX);
        pushCapped(G.fx, { type: "spikes", x: e.x, y: e.y, r: 210, t: 0.7, max: 0.7, color: "#ff5a6e" }, MAX_FX);
        pushCapped(G.shockwaves, { x: e.x, y: e.y, r: 24, max: 420, t: 0, delay: 0, dmg: 0, color: "#ff5a6e", hit: true }, 20);
        if (window.AUDIO) AUDIO.sfx("boss_phase");
        // 狂亂時立刻清場再放招
        for (var q3 = 0; q3 < 8; q3++) {
          addBullet(e.x, e.y - 40, (q3 / 8) * Math.PI * 2, 220, e.atk * 0.35, e.bossColor, 8);
        }
      }
      e.auraT += dt;
      // 霸主施法前搖：先亮起法陣、顯示技能名稱與集氣條，時間到才真正出手。
      // 先前霸主技能是瞬間生效，玩家只會看到畫面突然爆開，看不出「牠正在放招」。
      if (e.bossCast) {
        e.bossCast.t -= dt;
        e.state = "special";
        e.stateT = Math.max(e.stateT, 0.12);
        if (Math.random() < dt * 14) {
          pushCapped(G.fx, {
            type: "spark", x: e.x + rand(-e.r, e.r), y: e.y - 20 + rand(-14, 14),
            r: 10 + Math.random() * 12, t: 0.22, max: 0.22,
            color: e.bossCast.color || e.bossColor
          }, MAX_FX);
        }
        if (e.bossCast.t <= 0) {
          var bc = e.bossCast;
          e.bossCast = null;
          e.castT = Math.max(e.castT, 0.18);
          e.stateT = 0.55;
          castBossAbility(e, bc.kind);
          if (window.AUDIO) AUDIO.sfx("boss_cast");
        }
        continue;
      }
      // 防卡死：霸主長時間血量沒有下降時，關閉治療並進入狂暴
      if (!e.dying) {
        if (e.hp < (e.lastHp || e.maxhp) - 0.5) {
          e.lastHp = e.hp;
          e.stallT = 0;
        } else {
          e.stallT = (e.stallT || 0) + dt;
        }
        if (e.stallT > 18 && !e.enragedStall) {
          e.enragedStall = true;
          e.healLock = 9999;
          e.atkBuff = 1.35;
          e.spdMul = 1.15;
          e.atkBuffT = 9999;
          toast("霸主陷入狂暴，治療失效！");
        }
      }

      // 衝撞中：先蓄力再高速位移
      if (e.dash) {
        e.dash.t -= dt;
        if (e.dash.t > 0) {
          if (e.stateT <= 0) { e.state = "attack"; e.stateT = 0.2; }
        } else {
          e.x = clamp(e.x + Math.cos(e.dash.ang) * 620 * dt, e.r, G.worldW - e.r);
          e.y = clamp(e.y + Math.sin(e.dash.ang) * 620 * dt, e.r, G.worldH - e.r);
          e.dash.dur -= dt;
          if (!e.dash.hit && dist2(e, p) < (e.r + p.r + 10) * (e.r + p.r + 10)) {
            e.dash.hit = true;
            damagePlayer(e.atk * 1.1, "#ff8a5c");
          }
          if (e.dash.dur <= 0) e.dash = null;
        }
        continue;
      }

      if (dist2(e, p) > 980 * 980) continue;
      if (e.castT > 0) { e.castT -= dt; continue; }

      e.abilityCd -= dt * (e.phase === 3 ? 1.9 : (e.phase === 2 ? 1.45 : 1));
      if (e.abilityCd > 0) continue;

      var list = e.abilities.length ? e.abilities : ["volley"];
      var kind = list[e.abilityIndex % list.length];
      e.abilityIndex++;
      e.abilityCd = Math.max(1.35, 4.8 - num(G.level.Difficulty, 1) * 0.09 - (e.phase - 1) * 0.35);
      var wind = e.phase === 3 ? 0.55 : (e.phase === 2 ? 0.72 : 0.9);
      e.bossCast = { kind: kind, name: abilityName(kind), t: wind, max: wind, color: e.bossColor };
      e.state = "special";
      e.stateT = wind + 0.15;
      e.castGlow = 1;
      e.face = p.x >= e.x ? 1 : -1;
      pushCapped(G.fx, {
        type: "cast", x: e.x, y: e.y - 10, t: wind, max: wind,
        color: e.bossColor, r: e.r + 26
      }, MAX_FX);
      pushCapped(G.fx, {
        type: "ring", x: e.x, y: e.y, r: e.r * 0.6, max: e.r * 3.1, t: wind, color: e.bossColor
      }, MAX_FX);
      pushCapped(G.floaters, {
        x: e.x, y: e.y - (e.visH || 90) - 16,
        text: "霸主詠唱 · " + abilityName(kind), t: wind + 0.3,
        color: e.bossColor, size: 13
      }, MAX_FLOATERS);
      if (window.AUDIO) AUDIO.sfx("monster_cast");
    }
  }

  function castBossAbility(e, kind) {
    var p = G.player;
    var ang = Math.atan2(p.y - e.y, p.x - e.x);
    var phase = e.phase;
    var color = e.bossColor;
    var dmg = e.atk;

    function addZone(z) {
      z.tick = 0;
      pushCapped(G.zones, z, MAX_ZONES);
    }

    if (kind === "nova") {
      var n = 10 + phase * 4;
      for (var i = 0; i < n; i++) {
        addBullet(e.x, e.y - 40, ang + (i / n) * Math.PI * 2, 170, dmg * 0.42, color, 9, { boss: true });
      }
    } else if (kind === "volley") {
      var vn = 3 + phase * 2;
      for (var j = 0; j < vn; j++) {
        var off = (j - (vn - 1) / 2) * 0.19;
        addBullet(e.x, e.y - 40, ang + off, 245, dmg * 0.46, color, 7, { boss: true });
      }
    } else if (kind === "charge") {
      e.dash = { ang: ang, t: 0.55, dur: 0.42, hit: false };
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 150, t: 0.5, color: color });
    } else if (kind === "summon") {
      // 召喚上限：避免無限增援把瀏覽器拖垮
      if (G.enemies.length < MAX_ENEMIES - 10) {
        var ids = G.level.MonsterIDs || [];
        var allies = [];
        for (var m = 0; m < ids.length; m++) {
          for (var q = 0; q < CONFIG.Enemies.length; q++) {
            if (CONFIG.Enemies[q].Art === ids[m]) { allies.push(CONFIG.Enemies[q].ID); break; }
          }
        }
        var sn = Math.min(2 + phase, MAX_ENEMIES - G.enemies.length);
        for (var s = 0; s < sn && allies.length; s++) {
          var pickId = allies[Math.floor(Math.random() * allies.length)];
          var spawned = spawnEnemy(pickId, num(G.level.Difficulty, 1) + 4, false, "");
          if (!spawned) break;
          var a2 = Math.random() * Math.PI * 2;
          spawned.x = clamp(e.x + Math.cos(a2) * 90, 40, G.worldW - 40);
          spawned.y = clamp(e.y + Math.sin(a2) * 90, 40, G.worldH - 40);
          G.fx.push({ type: "ring", x: spawned.x, y: spawned.y, r: 10, max: 60, t: 0.3, color: color });
        }
      }
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 24, max: 200, t: 0.5, color: color });
    } else if (kind === "pool") {
      var pn = 2 + phase;
      for (var pz = 0; pz < pn; pz++) {
        addZone({
          x: clamp(p.x + rand(-110, 110), 40, G.worldW - 40),
          y: clamp(p.y + rand(-110, 110), 40, G.worldH - 40),
          r: 62 + phase * 8, delay: 0, life: 5.5, max: 5.5,
          dps: dmg * 0.34, color: color
        });
      }
    } else if (kind === "meteor") {
      var mn = 4 + phase * 2;
      for (var mt = 0; mt < mn; mt++) {
        addZone({
          x: clamp(p.x + rand(-170, 170), 40, G.worldW - 40),
          y: clamp(p.y + rand(-170, 170), 40, G.worldH - 40),
          r: 58, delay: 0.85, life: 3.6, max: 3.6,
          dps: dmg * 0.55, color: color, meteor: true
        });
      }
    } else if (kind === "laser") {
      pushCapped(G.lasers, {
        x: e.x, y: e.y, ang: ang, warn: 0.8, active: 0.32, t: 0,
        len: 1100, width: 34, dmg: dmg * 0.8, color: color, hit: false
      }, 24);
    } else if (kind === "shockwave") {
      for (var swi = 0; swi < (phase >= 3 ? 2 : 1); swi++) {
        pushCapped(G.shockwaves, {
          x: e.x, y: e.y, r: 24, max: 430 + phase * 70, t: 0,
          delay: swi * 0.22, dmg: dmg * 0.5, color: color, hit: false
        }, 20);
      }
    } else if (kind === "quake") {
      for (var qi = 0; qi < 3 + phase; qi++) {
        pushCapped(G.shockwaves, {
          x: e.x, y: e.y, r: 24, max: 300 + qi * 90, t: 0,
          delay: qi * 0.28, dmg: dmg * 0.4, color: color, hit: false
        }, 20);
      }
    } else if (kind === "spiral") {
      pushCapped(G.emitters, {
        kind: "spiral", x: e.x, y: e.y, t: 0, dur: 1.2 + phase * 0.35,
        interval: 0.085, acc: 0, ang: ang, step: 0.46 + phase * 0.05,
        speed: 200, dmg: dmg * 0.28, color: color, r: 7
      }, MAX_EMITTERS);
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 30, max: 160, t: 0.4, color: color });
    } else if (kind === "rain") {
      var rn = 10 + phase * 3;
      for (var ri = 0; ri < rn; ri++) {
        var ra = Math.random() * Math.PI * 2;
        var rr = rand(260, 400);
        var sx = clamp(p.x + Math.cos(ra) * rr, 20, G.worldW - 20);
        var sy = clamp(p.y + Math.sin(ra) * rr, 20, G.worldH - 20);
        addBullet(sx, sy, Math.atan2(p.y - sy, p.x - sx), 210, dmg * 0.34, color, 7, { boss: true, life: 4 });
      }
    } else if (kind === "beam") {
      pushCapped(G.emitters, {
        kind: "beam", x: e.x, y: e.y, t: 0, dur: 1.6 + phase * 0.4,
        interval: 0.55, acc: 0, ang: ang, step: 0.55,
        dmg: dmg * 0.42, color: color
      }, MAX_EMITTERS);
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 140, t: 0.35, color: color });
    } else if (kind === "root") {
      addZone({
        x: clamp(p.x + rand(-40, 40), 40, G.worldW - 40),
        y: clamp(p.y + rand(-40, 40), 40, G.worldH - 40),
        r: 115 + phase * 10, delay: 0.35, life: 4.2, max: 4.2,
        dps: dmg * 0.16, color: color, slow: 0.32
      });
    } else if (kind === "frost") {
      var fn = 12 + phase * 3;
      for (var fi = 0; fi < fn; fi++) {
        addBullet(e.x, e.y - 40, ang + (fi / fn) * Math.PI * 2, 155, dmg * 0.3, "#a6ecff", 9,
          { boss: true, slow: 0.5 });
      }
    } else if (kind === "heal") {
      if (e.healLock <= 0) {
        var healAmt = e.maxhp * 0.05;
        e.hp = Math.min(e.maxhp, e.hp + healAmt);
        e.healLock = 9;
        G.floaters.push({ x: e.x, y: e.y - 70, text: "+" + Math.round(healAmt), t: 0.9, color: "#8fffb0" });
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 24, max: 160, t: 0.5, color: "#8fffb0" });
      }
      // 同時治療附近的霸主／精英（小怪不補霸主）
      G.enemies.forEach(function (ally) {
        if (ally === e || ally.dying || ally.isBoss) return;
        if (dist2(ally, e) < 220 * 220) {
          ally.hp = Math.min(ally.maxhp, ally.hp + ally.maxhp * 0.08);
          G.fx.push({ type: "ring", x: ally.x, y: ally.y, r: 12, max: 60, t: 0.3, color: "#8fffb0" });
        }
      });
    } else if (kind === "teleport") {
      var da = Math.random() * Math.PI * 2;
      e.x = clamp(p.x + Math.cos(da) * 260, e.r, G.worldW - e.r);
      e.y = clamp(p.y + Math.sin(da) * 260, e.r, G.worldH - e.r);
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 16, max: 120, t: 0.4, color: color });
      var tn = 8 + phase * 2;
      for (var ti = 0; ti < tn; ti++) {
        addBullet(e.x, e.y - 30, (ti / tn) * Math.PI * 2, 190, dmg * 0.4, color, 8, { boss: true });
      }
    }
  }

  function updateHazards(dt) {
    var p = G.player;
    var i;

    // 敵方彈幕（含追蹤彈與緩速彈）
    for (i = G.bullets.length - 1; i >= 0; i--) {
      var b = G.bullets[i];
      if (b.homing > 0) {
        var hx = p.x - b.x, hy = p.y - b.y;
        var hd = Math.hypot(hx, hy) || 1;
        var hs = Math.hypot(b.vx, b.vy) || 1;
        b.vx += (hx / hd * hs - b.vx) * Math.min(1, b.homing * dt * 4);
        b.vy += (hy / hd * hs - b.vy) * Math.min(1, b.homing * dt * 4);
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.t -= dt;
      if (b.t <= 0 || b.x < 0 || b.y < 0 || b.x > G.worldW || b.y > G.worldH) {
        G.bullets.splice(i, 1);
        continue;
      }
      if (dist2(b, p) < (b.r + p.r) * (b.r + p.r)) {
        damagePlayer(b.dmg, b.color);
        if (b.slow) {
          p.slowT = Math.max(p.slowT, 2.2);
          p.slowMul = Math.min(p.slowMul, 1 - b.slow);
        }
        pushCapped(G.fx, { type: "ring", x: b.x, y: b.y, r: b.r, max: b.r * 2.5, t: 0.25, color: b.color }, MAX_FX);
        G.bullets.splice(i, 1);
      }
    }

    // 玩家魔法投射物
    for (i = G.shots.length - 1; i >= 0; i--) {
      var s = G.shots[i];
      // 稜光／追蹤彈會轉向最近的敵人
      if (s.homing > 0) {
        var hsT = nearestEnemy(s, 420);
        if (hsT) {
          var hdx = hsT.x - s.x, hdy = hsT.y - s.y;
          var hdd = Math.hypot(hdx, hdy) || 1;
          var hsp = Math.hypot(s.vx, s.vy) || 1;
          s.vx += (hdx / hdd * hsp - s.vx) * Math.min(1, s.homing * dt * 3.2);
          s.vy += (hdy / hdd * hsp - s.vy) * Math.min(1, s.homing * dt * 3.2);
        }
      }
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.t -= dt;
      if (s.t <= 0 || s.x < 0 || s.y < 0 || s.x > G.worldW || s.y > G.worldH) {
        G.shots.splice(i, 1);
        continue;
      }
      var hit = false;
      for (var ei = 0; ei < G.enemies.length; ei++) {
        var en = G.enemies[ei];
        if (en.dying || (s.hitSet && s.hitSet.indexOf(en) >= 0)) continue;
        if (dist2(en, s) > (en.r + s.r) * (en.r + s.r)) continue;
        dealDamage(en, s.dmg, { noCrit: true });
        if (s.slow) {
          en.slowT = Math.max(en.slowT, 2.2);
          en.slowMul = Math.min(en.slowMul, 1 - s.slow);
        }
        if (s.burn) {
          en.burnT = Math.max(en.burnT || 0, 2.2);
          en.burnDps = Math.max(en.burnDps || 0, s.dmg * 0.14);
        }
        if (s.splash > 0) {
          for (var e2i = 0; e2i < G.enemies.length; e2i++) {
            var en2 = G.enemies[e2i];
            if (en2 !== en && !en2.dying && dist2(en2, en) < s.splash * s.splash) {
              dealDamage(en2, s.dmg * 0.55, { noCrit: true });
            }
          }
          pushCapped(G.fx, { type: "ring", x: en.x, y: en.y, r: 10, max: s.splash, t: 0.35, color: s.color }, MAX_FX);
        }
        pushCapped(G.fx, { type: "spark", x: en.x, y: en.y - 10, t: 0.25, max: 0.25, color: s.color, r: 16 }, MAX_FX);
        if (s.hitSet) s.hitSet.push(en);
        s.pierce -= 1;
        hit = true;
        if (s.pierce <= 0) break;
      }
      if (hit && s.pierce <= 0) G.shots.splice(i, 1);
    }

    // 地面效果：敵方毒沼／落石；我方魔法地帶
    for (i = G.zones.length - 1; i >= 0; i--) {
      var z = G.zones[i];
      if (z.delay > 0) { z.delay -= dt; continue; }
      z.life -= dt;
      if (z.life <= 0) { G.zones.splice(i, 1); continue; }
      z.tick -= dt;
      if (z.friendly) {
        if (z.heal) {
          p.hp = Math.min(p.maxhp, p.hp + z.heal * dt);
        }
        if (z.pull) {
          for (var zp = 0; zp < G.enemies.length; zp++) {
            var zpe = G.enemies[zp];
            if (zpe.dying || zpe.isBoss) continue;
            var zpd2 = dist2(zpe, z);
            if (zpd2 > z.r * z.r) continue;
            var zpd = Math.sqrt(zpd2) || 1;
            zpe.x += (z.x - zpe.x) / zpd * 52 * z.pull * dt;
            zpe.y += (z.y - zpe.y) / zpd * 52 * z.pull * dt;
          }
        }
        if (z.tick <= 0) {
          z.tick = 0.4;
          for (var zi = 0; zi < G.enemies.length; zi++) {
            var ze = G.enemies[zi];
            if (!ze.dying && dist2(ze, z) < z.r * z.r) {
              dealDamage(ze, z.dps * 0.4, { noCrit: true });
              if (z.slow) {
                ze.slowT = Math.max(ze.slowT, 1.2);
                ze.slowMul = Math.min(ze.slowMul, 1 - z.slow);
              }
            }
          }
        }
      } else if (dist2(z, p) < z.r * z.r) {
        if (z.slow) {
          p.slowT = Math.max(p.slowT, 0.35);
          p.slowMul = Math.min(p.slowMul, 1 - z.slow);
        }
        if (z.tick <= 0) {
          z.tick = 0.5;
          damagePlayer(z.dps * 0.5, z.color);
        }
      }
    }

    // 直線光束
    for (i = G.lasers.length - 1; i >= 0; i--) {
      var lz = G.lasers[i];
      lz.t += dt;
      if (lz.t > lz.warn + lz.active) { G.lasers.splice(i, 1); continue; }
      if (lz.t > lz.warn && !lz.hit) {
        // 玩家是否落在光束線段附近
        var dx = p.x - lz.x, dy = p.y - lz.y;
        var proj = dx * Math.cos(lz.ang) + dy * Math.sin(lz.ang);
        if (proj > 0 && proj < lz.len) {
          var perp = Math.abs(-dx * Math.sin(lz.ang) + dy * Math.cos(lz.ang));
          if (perp < lz.width * 0.5 + p.r) {
            lz.hit = true;
            damagePlayer(lz.dmg, lz.color);
            if (lz.slow) { p.slowT = Math.max(p.slowT, 2); p.slowMul = Math.min(p.slowMul, 1 - lz.slow); }
          }
        }
      }
    }

    // 衝擊波（可延遲，用於連續震地）
    for (i = G.shockwaves.length - 1; i >= 0; i--) {
      var sw = G.shockwaves[i];
      if (sw.delay > 0) { sw.delay -= dt; continue; }
      sw.t += dt;
      sw.r += 520 * dt;
      if (!sw.hit) {
        var dd = Math.sqrt(dist2(sw, p));
        if (Math.abs(dd - sw.r) < 26 + p.r) {
          sw.hit = true;
          damagePlayer(sw.dmg, sw.color);
        }
      }
      if (sw.r >= sw.max) G.shockwaves.splice(i, 1);
    }

    // 持續施法來源（螺旋彈幕／旋轉光束）
    for (i = G.emitters.length - 1; i >= 0; i--) {
      var em = G.emitters[i];
      em.t += dt;
      em.acc += dt;
      if (em.t > em.dur) { G.emitters.splice(i, 1); continue; }
      if (em.acc < em.interval) continue;
      em.acc = 0;
      if (em.kind === "spiral") {
        em.ang += em.step;
        addBullet(em.x, em.y - 30, em.ang, em.speed, em.dmg, em.color, em.r, { boss: true, life: 4 });
        addBullet(em.x, em.y - 30, em.ang + Math.PI, em.speed, em.dmg, em.color, em.r, { boss: true, life: 4 });
      } else if (em.kind === "beam") {
        em.ang += em.step;
        pushCapped(G.lasers, {
          x: em.x, y: em.y, ang: em.ang, warn: 0.5, active: 0.16, t: 0,
          len: 950, width: 26, dmg: em.dmg, color: em.color, hit: false
        }, 30);
      }
    }
  }

  function playerAttack(dt) {
    var p = G.player;
    var atkSkill = skillById(p.atkSkillId) || { CD: 2, Params: [] };
    p.atkCd -= dt;
    if (p.atkCd <= 0) {
      var target = nearestEnemy(p, 520);
      if (target) {
        var berserk = (p.abilities && p.abilities.berserk > 0 && p.hp < p.maxhp * 0.4)
          ? p.abilities.berserk : 0;
        p.atkCd = Math.max(0.14, num(atkSkill.CD, 2) * (p.atkCdScale || 1)
          * (1 - 0.03 * (p.rageStacks || 0)) * (1 - 0.06 * berserk));
        var percent = param(atkSkill, "Percent", 100);
        var count = Math.max(1, param(atkSkill, "Count", 1)) + (p.multishot || 0);
        var mastery = (p.spriteKey === "bow" ? p.abilities.bowMastery : p.abilities.swordMastery) || 0;
        var dmg = p.atk * percent / 100 * (1 + 0.1 * berserk) * (1 + 0.14 * mastery);
        p.attackT = p.attackDur;
        p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
        if (window.AUDIO) AUDIO.sfx(p.spriteKey === "bow" ? "bow" : "swing");
        for (var i = 0; i < count; i++) {
          var t = nearestEnemy(p, 520);
          if (!t) break;
          dealDamage(t, dmg);
          if (p.spriteKey === "bow") {
            G.fx.push({ type: "arrow", x: p.x, y: p.y - 24, tx: t.x, ty: t.y - 16,
              t: 0.16, max: 0.16, color: "#ffe08a" });
            // 箭矢貫穿：沿著命中方向再掃過最多 2 名敵人，讓弓手普攻也有群體回饋
            var ax = p.x, ay = p.y - 24, bx = t.x, by = t.y - 16;
            var vx = bx - ax, vy = by - ay, vl = Math.hypot(vx, vy) || 1;
            var pierced = 0;
            var bowSnap = G.enemies.slice();
            for (var bj = 0; bj < bowSnap.length && pierced < 2 + mastery; bj++) {
              var oe = bowSnap[bj];
              if (oe === t || oe.dying) continue;
              var tt = ((oe.x - ax) * vx + (oe.y - ay) * vy) / (vl * vl);
              if (tt < 0 || tt > 1.3) continue;
              var lx = ax + vx * tt, ly = ay + vy * tt;
              if (Math.hypot(oe.x - lx, oe.y - ly) > 30) continue;
              dealDamage(oe, dmg * 0.55);
              G.fx.push({ type: "arrow", x: p.x, y: p.y - 24, tx: oe.x, ty: oe.y - 16,
                t: 0.16, max: 0.16, color: "#ffd166" });
              pierced++;
            }
          } else {
            G.fx.push({ type: "slash", x: t.x, y: t.y, t: 0.18, r: 30,
              color: "#9fe8ff" });
            // 劍士揮砍會掃到目標身邊的敵人：一次普攻砍倒一整群，死亡動作才連著出現
            var cleaved = 0;
            var swordSnap = G.enemies.slice();
            for (var cj = 0; cj < swordSnap.length && cleaved < 3 + Math.floor(mastery / 2); cj++) {
              var ce = swordSnap[cj];
              if (ce === t || ce.dying) continue;
              if (dist2(ce, t) > (74 + mastery * 8) * (74 + mastery * 8)) continue;
              dealDamage(ce, dmg * 0.6);
              G.fx.push({ type: "slash", x: ce.x, y: ce.y, t: 0.18, r: 24,
                color: "#bfeaff" });
              cleaved++;
            }
          }
        }
        // 劍氣波：每次普攻朝目標方向送出一道穿透劍氣
        if (p.abilities && p.abilities.swordWave > 0) {
          var waveAng = Math.atan2(target.y - 16 - (p.y - 20), target.x - p.x);
          spawnShot(p.x, p.y - 20, waveAng, 620,
            p.atk * 0.28 * p.abilities.swordWave, "#bfeaff",
            { pierce: 4, r: 15, life: 0.55, kind: "wind" });
          pushCapped(G.fx, { type: "slash", x: p.x + Math.cos(waveAng) * 34, y: p.y - 20 + Math.sin(waveAng) * 34,
            t: 0.16, r: 30, color: "#bfeaff" }, MAX_FX);
        }
        p.face = target.x >= p.x ? 1 : -1;
      } else {
        p.atkCd = 0.1;
      }
    }

    if (p.specialSkillId >= 0) {
      var sp = skillById(p.specialSkillId);
      if (sp) {
        p.specialCd -= dt;
        if (p.specialCd <= 0) {
          var near = nearestEnemy(p, 520);
          if (near) {
            p.specialCd = Math.max(1, num(sp.CD, 10));
            p.attackT = p.attackDur;
            if (near) p.dir = dirFromVector(near.x - p.x, near.y - p.y, p.dir);
            var radius = 120 + param(sp, "Range", 50) * 1.6;
            var spPercent = param(sp, "Percent", 80);
            var hits = 0;
            var snapshot = G.enemies.slice();
            snapshot.forEach(function (e) {
              if (dist2(e, p) <= radius * radius) { dealDamage(e, p.atk * spPercent / 100); hits++; }
            });
            G.fx.push({ type: "ring", x: p.x, y: p.y, r: 20, max: radius, t: 0.45, color: "#ffd166" });
            if (window.AUDIO) AUDIO.sfx("cast2");
            if (hits > 0) toast(sp.Name + "！");
          }
        }
      }
    }
  }

  // ---------------------------------------------------------------- 角色魔法
  function spellData(slot) {
    return slot ? skillById(slot.id) : null;
  }

  function spellCost(sk) {
    var base = Math.max(0, num(sk && sk.MPCost, 15));
    return Math.max(1, Math.round(base * ((G.player && G.player.spellCostScale) || 1)));
  }

  function magicPower(p) {
    return (p.spellPower || 1) * (1 + (p.level || 1) * 0.015);
  }

  function damageArea(cx, cy, radius, dmg, color, opts) {
    opts = opts || {};
    radius = radius * ((G.player && G.player.areaScale) || 1);
    var hit = 0;
    var r2 = radius * radius;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (e.dying || dist2(e, { x: cx, y: cy }) > r2) continue;
      dealDamage(e, dmg, { noCrit: true });
      if (opts.slow) {
        e.slowT = Math.max(e.slowT, opts.slowT || 2.5);
        e.slowMul = Math.min(e.slowMul, 1 - opts.slow);
      }
      if (opts.stun) e.stunT = Math.max(e.stunT, opts.stun);
      if (opts.poison) {
        e.venomT = Math.max(e.venomT || 0, opts.poisonT || 3.2);
        e.venomDps = Math.max(e.venomDps || 0, opts.poison);
      }
      hit++;
    }
    if (radius > 0) {
      pushCapped(G.fx, { type: "ring", x: cx, y: cy, r: 16, max: radius, t: 0.4, color: color }, MAX_FX);
    }
    return hit;
  }

  function spawnShot(x, y, ang, speed, dmg, color, opts) {
    opts = opts || {};
    pushCapped(G.shots, {
      x: x, y: y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      r: opts.r || 11,
      dmg: dmg, color: color,
      t: opts.life || 1.7,
      splash: opts.splash || 0,
      pierce: opts.pierce || 1,
      slow: opts.slow || 0,
      burn: !!opts.burn,
      homing: opts.homing || 0,
      hitSet: [],
      kind: opts.kind || "bolt"
    }, MAX_SHOTS);
  }

  function chainTargets(from, first, maxCount, jumpRange) {
    var out = [first];
    var used = [first];
    var cur = first;
    for (var n = 1; n < maxCount; n++) {
      var best = null, bestD = jumpRange * jumpRange;
      for (var i = 0; i < G.enemies.length; i++) {
        var e = G.enemies[i];
        if (e.dying || used.indexOf(e) >= 0) continue;
        var d = dist2(e, cur);
        if (d < bestD) { bestD = d; best = e; }
      }
      if (!best) break;
      out.push(best);
      used.push(best);
      cur = best;
    }
    return out;
  }

  function updateMagic(dt) {
    var p = G.player;
    p.mp = Math.min(p.maxmp, p.mp + p.mpRegen * dt);
    for (var i = 0; i < p.spells.length; i++) {
      var slot = p.spells[i];
      if (slot.cd > 0) slot.cd = Math.max(0, slot.cd - dt);
    }
    // 自動詠唱：冷卻完成、魔力足夠且有目標時施放
    for (var si = 0; si < p.spells.length; si++) {
      var s = p.spells[si];
      if (s.cd > 0) continue;
      if (p.level < s.unlock) continue;
      var sk = spellData(s);
      if (!sk) continue;
      if (p.mp < spellCost(sk)) continue;
      if (!shouldAutoCast(sk)) continue;
      castSpell(si, false);
    }
  }

  // 升級取得的被動能力：定期光環、擊殺爆裂、燃燒、荊棘等
  function updateAbilities(dt) {
    var p = G.player;
    var ab = p.abilities;
    if (!ab) return;
    if (p.rageT > 0) {
      p.rageT -= dt;
      if (p.rageT <= 0) { p.rageT = 0; p.rageStacks = 0; }
    }
    if (ab.frostAura > 0) {
      p.abilityTimers.frost -= dt;
      if (p.abilityTimers.frost <= 0) {
        p.abilityTimers.frost = Math.max(2.2, 3.8 - ab.frostAura * 0.35);
        damageArea(p.x, p.y - 6, 150 + ab.frostAura * 18, p.atk * 0.55 * ab.frostAura, "#8fd8ff", { slow: 0.4, slowT: 1.9 });
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 10, r: 24, max: 180 + ab.frostAura * 18, t: 0.45, color: "#8fd8ff" }, MAX_FX);
      }
    }
    if (ab.holyNova > 0) {
      p.abilityTimers.holy -= dt;
      if (p.abilityTimers.holy <= 0) {
        p.abilityTimers.holy = Math.max(3.0, 5.4 - ab.holyNova * 0.5);
        damageArea(p.x, p.y - 8, 230 + ab.holyNova * 22, p.atk * 0.85 * ab.holyNova, "#ffe9a8", { stun: 0.35 });
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 14, r: 30, max: 260 + ab.holyNova * 20, t: 0.55, color: "#ffe9a8" }, MAX_FX);
      }
    }
    if (ab.timeField > 0) {
      p.abilityTimers.time -= dt;
      if (p.abilityTimers.time <= 0) {
        p.abilityTimers.time = Math.max(5.0, 9.5 - ab.timeField * 0.8);
        pushCapped(G.zones, {
          x: p.x, y: p.y, r: 180 + ab.timeField * 20, delay: 0, life: 3.4, max: 3.4,
          dps: p.atk * 0.25 * ab.timeField, color: "#b78bff", friendly: true, tick: 0, slow: 0.55
        }, MAX_ZONES);
      }
    }
    // 連鎖新星：定期放出連鎖閃電
    if (ab.chainNova > 0) {
      p.abilityTimers.chain -= dt;
      if (p.abilityTimers.chain <= 0) {
        var cnTarget = nearestEnemy(p, 480);
        if (cnTarget) {
          p.abilityTimers.chain = Math.max(3.2, 6.4 - ab.chainNova * 0.6);
          var cnTargets = chainTargets(p, cnTarget, 3 + ab.chainNova, 230);
          var cnPts = [{ x: p.x, y: p.y - 20 }];
          for (var cn = 0; cn < cnTargets.length; cn++) {
            dealDamage(cnTargets[cn], p.atk * 0.55 * ab.chainNova * Math.pow(0.85, cn), { noCrit: true });
            cnPts.push({ x: cnTargets[cn].x, y: cnTargets[cn].y - 12 });
          }
          pushCapped(G.fx, { type: "chain", pts: cnPts, t: 0.28, max: 0.28, color: "#ffe066" }, MAX_FX);
        }
      }
    }
    // 流星印記：定期在敵群中落下流星
    if (ab.meteorMark > 0) {
      p.abilityTimers.meteor -= dt;
      if (p.abilityTimers.meteor <= 0) {
        var mmTarget = nearestEnemy(p, 560);
        if (mmTarget) {
          p.abilityTimers.meteor = Math.max(4.0, 8.0 - ab.meteorMark * 0.8);
          for (var mm = 0; mm < 1 + ab.meteorMark; mm++) {
            pushCapped(G.zones, {
              x: clamp(mmTarget.x + rand(-80, 80), 40, G.worldW - 40),
              y: clamp(mmTarget.y + rand(-80, 80), 40, G.worldH - 40),
              r: 58, delay: 0.7 + mm * 0.12, life: 0.32, max: 0.32,
              dps: p.atk * 1.2 * ab.meteorMark, color: "#ffb15c", meteor: true, friendly: true, tick: 0
            }, MAX_ZONES);
          }
        }
      }
    }
    // 奧術環繞：貼身持續切割，並有環繞光球視覺
    if (ab.arcaneOrbit > 0) {
      p.abilityTimers.orbit -= dt;
      if (p.abilityTimers.orbit <= 0) {
        p.abilityTimers.orbit = 0.5;
        var orbR = 82 + ab.arcaneOrbit * 14;
        damageArea(p.x, p.y, orbR, p.atk * 0.22 * ab.arcaneOrbit, "#9fd8ff", {});
        pushCapped(G.fx, { type: "orbit", x: p.x, y: p.y - 10, r: orbR, t: 0.5, max: 0.5, color: "#9fd8ff" }, MAX_FX);
      }
    }
    // 追魂箭雨：朝最近的敵群從天上落下箭矢
    if (ab.arrowRain > 0) {
      p.abilityTimers.arrow -= dt;
      if (p.abilityTimers.arrow <= 0) {
        var arTarget = nearestEnemy(p, 560);
        if (arTarget) {
          p.abilityTimers.arrow = Math.max(2.6, 5.2 - ab.arrowRain * 0.5);
          var arCount = 5 + ab.arrowRain * 2;
          for (var ar = 0; ar < arCount; ar++) {
            var arx = clamp(arTarget.x + rand(-130, 130), 40, G.worldW - 40);
            var ary = clamp(arTarget.y + rand(-110, 110), 40, G.worldH - 40);
            spawnShot(arx, ary - 300 - ar * 12, Math.PI / 2 + rand(-0.08, 0.08), 760,
              p.atk * 0.3, "#ffe9a8", { pierce: 1, r: 10, life: 0.5, kind: "arrow" });
            pushCapped(G.fx, { type: "tell", x: arx, y: ary, r: 16, t: 0.32, max: 0.32, color: "#ffe9a8" }, MAX_FX);
          }
          pushCapped(G.fx, { type: "ring", x: arTarget.x, y: arTarget.y, r: 30, max: 180, t: 0.4, color: "#ffe9a8" }, MAX_FX);
          if (window.AUDIO) AUDIO.sfx("bow");
        }
      }
    }
    // 護盾回充：定期自動補上護盾
    if (ab.shieldRecharge > 0) {
      p.abilityTimers.shield -= dt;
      if (p.abilityTimers.shield <= 0) {
        p.abilityTimers.shield = Math.max(3.5, 7.5 - ab.shieldRecharge);
        var srShield = p.maxhp * 0.04 * ab.shieldRecharge * (p.shieldPower || 1);
        p.shield = Math.max(p.shield || 0, srShield);
        p.shieldT = Math.max(p.shieldT || 0, 4.5);
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 18, max: 64, t: 0.4, color: "#9fd8ff" }, MAX_FX);
        pushCapped(G.floaters, { x: p.x, y: p.y - 58, text: "護盾 +" + Math.round(srShield), t: 0.8, color: "#9fd8ff" }, MAX_FLOATERS);
      }
    }
    // 腐毒新星：在身邊噴發毒霧，留下持續中毒
    if (ab.poisonNova > 0) {
      p.abilityTimers.poison -= dt;
      if (p.abilityTimers.poison <= 0) {
        p.abilityTimers.poison = Math.max(2.6, 4.4 - ab.poisonNova * 0.4);
        var pnR = 130 + ab.poisonNova * 16;
        damageArea(p.x, p.y, pnR, p.atk * 0.35 * ab.poisonNova, "#8ee36a", {
          slow: 0.18, slowT: 1.8,
          poison: p.atk * 0.18 * ab.poisonNova, poisonT: 3.2
        });
        pushCapped(G.fx, { type: "void", x: p.x, y: p.y - 8, r: pnR * 0.9, t: 0.7, max: 0.7, color: "#7bd45c" }, MAX_FX);
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 8, r: 20, max: pnR, t: 0.5, color: "#8ee36a" }, MAX_FX);
        if (window.AUDIO) AUDIO.sfx("poison");
      }
    }
    // 旋風輪：向四周射出穿透風刃
    if (ab.galeWheel > 0) {
      p.abilityTimers.gale -= dt;
      if (p.abilityTimers.gale <= 0) {
        p.abilityTimers.gale = Math.max(2.4, 3.8 - ab.galeWheel * 0.3);
        var gwN = 8 + ab.galeWheel * 2;
        var gwOff = G.time * 1.7;
        for (var gw = 0; gw < gwN; gw++) {
          var gwA = gwOff + (gw / gwN) * Math.PI * 2;
          spawnShot(p.x, p.y - 18, gwA, 560, p.atk * 0.42 * ab.galeWheel, "#b8f0e2",
            { pierce: 4, r: 12, life: 0.95, kind: "wind" });
        }
        pushCapped(G.fx, { type: "orbit", x: p.x, y: p.y - 12, r: 46 + ab.galeWheel * 10, t: 0.45, max: 0.45, color: "#b8f0e2" }, MAX_FX);
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 24, max: 120 + ab.galeWheel * 14, t: 0.35, color: "#d8fff4" }, MAX_FX);
        if (window.AUDIO) AUDIO.sfx("gale");
      }
    }
    // 大地尖刺：在最近的數名敵人腳下爆出尖刺
    if (ab.earthSpikes > 0) {
      p.abilityTimers.spikes -= dt;
      if (p.abilityTimers.spikes <= 0) {
        var esNeed = 2 + ab.earthSpikes;
        var esList = [];
        for (var esi = 0; esi < G.enemies.length; esi++) {
          var ese = G.enemies[esi];
          if (ese.dying) continue;
          if (dist2(ese, p) > 520 * 520) continue;
          esList.push({ e: ese, d: dist2(ese, p) });
        }
        if (esList.length) {
          p.abilityTimers.spikes = Math.max(3.0, 5.6 - ab.earthSpikes * 0.5);
          esList.sort(function (a, b) { return a.d - b.d; });
          for (var esn = 0; esn < esNeed && esn < esList.length; esn++) {
            var est = esList[esn].e;
            dealDamage(est, p.atk * 1.05 * ab.earthSpikes, { noCrit: false });
            est.slowT = Math.max(est.slowT || 0, 1.6);
            est.slowMul = Math.min(est.slowMul || 1, 0.6);
            pushCapped(G.fx, { type: "spikes", x: est.x, y: est.y, r: 62, t: 0.5, max: 0.5, color: "#c8a165" }, MAX_FX);
            pushCapped(G.fx, { type: "tell", x: est.x, y: est.y, r: 58, t: 0.22, max: 0.22, color: "#e8c98c" }, MAX_FX);
          }
          if (window.AUDIO) AUDIO.sfx("spikes");
        }
      }
    }
    // 極寒領域：持續擴散寒氣，範圍緩速與傷害
    if (ab.frostDomain > 0) {
      p.abilityTimers.domain -= dt;
      if (p.abilityTimers.domain <= 0) {
        p.abilityTimers.domain = Math.max(1.4, 2.4 - ab.frostDomain * 0.25);
        var fdR = 120 + ab.frostDomain * 16;
        damageArea(p.x, p.y, fdR, p.atk * 0.2 * ab.frostDomain, "#a8e4ff", { slow: 0.42, slowT: 1.5 });
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 8, r: fdR * 0.35, max: fdR, t: 0.55, color: "#a8e4ff" }, MAX_FX);
        pushCapped(G.fx, { type: "vortex", x: p.x, y: p.y - 6, r: fdR * 0.55, t: 0.5, max: 0.5, color: "#d6f4ff" }, MAX_FX);
        if (window.AUDIO) AUDIO.sfx("frost");
      }
    }
    // 劍刃迴旋：向四周甩出穿透劍氣
    if (ab.bladeCyclone > 0) {
      p.abilityTimers.blade -= dt;
      if (p.abilityTimers.blade <= 0) {
        p.abilityTimers.blade = Math.max(2.0, 3.2 - ab.bladeCyclone * 0.3);
        var bcn = 6 + ab.bladeCyclone * 2;
        var bcoff = G.time * 2.1;
        for (var bci = 0; bci < bcn; bci++) {
          var bca = bcoff + (bci / bcn) * Math.PI * 2;
          spawnShot(p.x, p.y - 18, bca, 540, p.atk * 0.48 * ab.bladeCyclone, "#ffe9a8",
            { pierce: 4, r: 11, life: 1.05, kind: "wind" });
        }
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 24, max: 130 + ab.bladeCyclone * 16, t: 0.4, color: "#ffe9a8" }, MAX_FX);
        pushCapped(G.fx, { type: "orbit", x: p.x, y: p.y - 12, r: 60, t: 0.4, max: 0.4, color: "#fff4c8" }, MAX_FX);
        if (window.AUDIO) AUDIO.sfx("gale");
      }
    }
    // 虛空裂隙：在最近的敵群開洞，持續傷害並把敵人往中心拉
    if (ab.voidRift > 0) {
      p.abilityTimers.void -= dt;
      if (p.abilityTimers.void <= 0) {
        var vrTarget = nearestEnemy(p, 560);
        if (vrTarget) {
          p.abilityTimers.void = Math.max(3.6, 6.5 - ab.voidRift * 0.7);
          var vrR = 130 + ab.voidRift * 18;
          pushCapped(G.zones, {
            x: clamp(vrTarget.x, 60, G.worldW - 60), y: clamp(vrTarget.y, 60, G.worldH - 60),
            r: vrR, delay: 0, life: 2.6 + ab.voidRift * 0.3, max: 2.6 + ab.voidRift * 0.3,
            dps: p.atk * 0.42 * ab.voidRift, color: "#b78bff", friendly: true, tick: 0,
            slow: 0.25, kind: "rift", pull: 0.75
          }, MAX_ZONES);
          pushCapped(G.fx, { type: "void", x: vrTarget.x, y: vrTarget.y - 8, r: vrR * 1.1, t: 0.7, max: 0.7, color: "#b78bff" }, MAX_FX);
          pushCapped(G.fx, { type: "vortex", x: vrTarget.x, y: vrTarget.y - 8, r: vrR, t: 0.6, max: 0.6, color: "#d9c6ff" }, MAX_FX);
          if (window.AUDIO) AUDIO.sfx("cast_dark");
        }
      }
    }
    // 星辰爆裂：在最近的敵群落下數顆星辰
    if (ab.starBurst > 0) {
      p.abilityTimers.star -= dt;
      if (p.abilityTimers.star <= 0) {
        var sbTarget = nearestEnemy(p, 600);
        if (sbTarget) {
          p.abilityTimers.star = Math.max(2.8, 4.6 - ab.starBurst * 0.45);
          for (var sbi = 0; sbi < 2 + ab.starBurst; sbi++) {
            pushCapped(G.zones, {
              x: clamp(sbTarget.x + rand(-130, 130), 40, G.worldW - 40),
              y: clamp(sbTarget.y + rand(-130, 130), 40, G.worldH - 40),
              r: 54, delay: 0.55 + sbi * 0.1, life: 0.3, max: 0.3,
              dps: p.atk * 1.5 * ab.starBurst, color: "#ffe066", meteor: true, friendly: true, tick: 0
            }, MAX_ZONES);
          }
          pushCapped(G.fx, { type: "ring", x: sbTarget.x, y: sbTarget.y, r: 20, max: 170, t: 0.45, color: "#ffe066" }, MAX_FX);
          if (window.AUDIO) AUDIO.sfx("cast_arcane");
        }
      }
    }
    // 雷神之怒：連鎖雷擊並暈眩整串敵人
    if (ab.thunderGod > 0) {
      p.abilityTimers.god -= dt;
      if (p.abilityTimers.god <= 0) {
        var tgTarget = nearestEnemy(p, 540);
        if (tgTarget) {
          p.abilityTimers.god = Math.max(3.2, 5.6 - ab.thunderGod * 0.55);
          var tgTargets = chainTargets(p, tgTarget, 4 + ab.thunderGod, 280);
          var tgPts = [{ x: p.x, y: p.y - 20 }];
          for (var tgi = 0; tgi < tgTargets.length; tgi++) {
            var tge = tgTargets[tgi];
            dealDamage(tge, p.atk * 0.72 * ab.thunderGod * Math.pow(0.88, tgi), { noCrit: true });
            tge.stunT = Math.max(tge.stunT || 0, 0.5);
            tgPts.push({ x: tge.x, y: tge.y - 12 });
            pushCapped(G.fx, { type: "lightning", x: tge.x, y: tge.y - 10, r: 46, t: 0.3, max: 0.3, color: "#ffe066" }, MAX_FX);
          }
          pushCapped(G.fx, { type: "chain", pts: tgPts, t: 0.34, max: 0.34, color: "#ffe066" }, MAX_FX);
          if (window.AUDIO) AUDIO.sfx("cast_thunder");
        }
      }
    }
    // 不屈意志：殘血時持續回復
    if (ab.lastStand2 > 0) {
      p.abilityTimers.lastStand2 -= dt;
      if (p.abilityTimers.lastStand2 <= 0) {
        p.abilityTimers.lastStand2 = 1;
        if (p.hp / p.maxhp < 0.3 && p.hp > 0) {
          var lsHeal = p.maxhp * 0.005 * ab.lastStand2;
          p.hp = Math.min(p.maxhp, p.hp + lsHeal);
          pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 14, r: 10, max: 48, t: 0.35, color: "#8fffb0" }, MAX_FX);
        }
      }
    }
  }

  function castUltimate(manual) {
    if (!G || G.over) return false;
    var p = G.player;
    if (G.paused) return false;
    if (p.ult < p.ultMax) {
      if (manual) toast("終極技能充能中 " + Math.floor(p.ult / p.ultMax * 100) + "%");
      return false;
    }
    p.ult = 0;
    p.ultReady = false;
    var isBow = p.spriteKey === "bow";
    var color = isBow ? "#9ff3d6" : "#ffe9a8";
    pushCapped(G.fx, { type: "flash", x: p.x, y: p.y, t: 0.55, max: 0.55, color: color }, MAX_FX);
    pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 30, max: 520, t: 0.8, color: color }, MAX_FX);
    if (window.AUDIO) AUDIO.sfx(isBow ? "ultbow" : "ultsword");

    if (isBow) {
      // 萬箭齊發：全方位箭雨，並在四周留下緩速箭幕
      for (var i = 0; i < 36; i++) {
        spawnShot(p.x, p.y - 24, (i / 36) * Math.PI * 2, 520 + (i % 3) * 90, p.atk * 1.4, color,
          { pierce: 3, r: 10, kind: "wind", life: 1.8 });
      }
      for (var z = 0; z < 4; z++) {
        var za = (z / 4) * Math.PI * 2;
        pushCapped(G.zones, {
          x: clamp(p.x + Math.cos(za) * 150, 40, G.worldW - 40),
          y: clamp(p.y + Math.sin(za) * 150, 40, G.worldH - 40),
          r: 110, delay: 0, life: 3.2, max: 3.2,
          dps: p.atk * 0.5, color: color, friendly: true, tick: 0, slow: 0.55, kind: "storm"
        }, MAX_ZONES);
      }
      p.shield = Math.max(p.shield, p.maxhp * 0.15);
      p.shieldT = 6;
    } else {
      // 聖劍審判：巨型十字聖光，範圍暈眩並強化自身
      damageArea(p.x, p.y, 430, p.atk * 5.5, color, { stun: 1.5, slow: 0.35, slowT: 2.5 });
      pushCapped(G.fx, { type: "cross", x: p.x, y: p.y - 12, ang: 0, r: 300, t: 0.75, max: 0.75, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "cross", x: p.x, y: p.y - 12, ang: Math.PI / 4, r: 230, t: 0.65, max: 0.65, color: "#ffffff" }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 40, max: 460, t: 0.9, color: "#ffffff" }, MAX_FX);
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.2);
      p.shield = Math.max(p.shield, p.maxhp * 0.3);
      p.shieldT = 8;
      p.atkBuffT = 6;
      p.atkBuff = 1.25;
    }
    pushCapped(G.floaters, { x: p.x, y: p.y - 62, text: isBow ? "萬箭齊發！" : "聖劍審判！", t: 1.1, color: color }, MAX_FLOATERS);
    return true;
  }

  function shouldAutoCast(sk) {
    var p = G.player;
    if (!sk) return false;
    if (sk.Kind === "heal") return p.hp < p.maxhp * 0.9;
    if (sk.Kind === "healzone") return p.hp < p.maxhp * 0.82;
    if (sk.Kind === "shield") return p.shield <= 0;
    if (sk.Kind === "drain") return nearestEnemy(p, 470) !== null;
    if (sk.Kind === "darknova") return nearestEnemy(p, 300) !== null;
    var range = sk.Kind === "frost" ? 300 : 560;
    return nearestEnemy(p, range) !== null;
  }

  function castSpell(index, manual) {
    var p = G.player;
    var slot = p.spells[index];
    if (!slot) return false;
    var sk = spellData(slot);
    if (!sk) return false;
    if (p.level < slot.unlock) {
      if (manual) toast("Lv." + slot.unlock + " 解鎖 " + sk.Name);
      return false;
    }
    if (slot.cd > 0) {
      if (manual) toast(sk.Name + " 冷卻中");
      return false;
    }
    var cost = Math.round(spellCost(sk) * Math.pow(0.97, Math.max(0, (slot.rank || 1) - 1)));
    if (p.mp < cost) {
      if (manual) toast("魔力不足");
      return false;
    }
    var rank = Math.max(1, slot.rank || 1);
    var power = p.atk * num(sk.Percent, 150) / 100 * magicPower(p) * (1 + (rank - 1) * 0.18);
    var color = sk.Color || "#9fd8ff";
    var target = nearestEnemy(p, 620);
    var did = false;
    if (window.AUDIO) {
      AUDIO.sfx(sk.Kind === "heal" || sk.Kind === "shield" ? "cast2" : "cast");
      var castEl = String(sk.Element || "").toLowerCase();
      if (castEl) AUDIO.sfx("cast_" + castEl);
    }

    if (sk.Kind === "fireball") {
      if (!target) return false;
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      p.attackT = 0.35;
      spawnShot(p.x, p.y - 22, Math.atan2(target.y - p.y, target.x - p.x), 520, power, color,
        { splash: 78, r: 12, kind: "fire", life: 1.4 });
      G.fx.push({ type: "cast", x: p.x, y: p.y - 20, t: 0.3, max: 0.3, color: color });
      did = true;
    } else if (sk.Kind === "frost") {
      if (!target && !manual) return false;
      damageArea(p.x, p.y, 200 + num(sk.Radius, 0) * 0.4, power, color, { slow: 0.5, slowT: 2.8 });
      G.fx.push({ type: "ring", x: p.x, y: p.y - 12, r: 30, max: 260, t: 0.5, color: color });
      did = true;
    } else if (sk.Kind === "chain") {
      if (!target) return false;
      var jumps = 3 + Math.floor(p.level / 4);
      var targets = chainTargets(p, target, jumps, 220);
      var pts = [{ x: p.x, y: p.y - 20 }];
      for (var ci = 0; ci < targets.length; ci++) {
        dealDamage(targets[ci], power * Math.pow(0.86, ci), { noCrit: true });
        pts.push({ x: targets[ci].x, y: targets[ci].y - 12 });
      }
      G.fx.push({ type: "chain", pts: pts, t: 0.28, max: 0.28, color: color });
      did = true;
    } else if (sk.Kind === "heal") {
      if (p.hp >= p.maxhp && !manual) return false;
      var heal = p.maxhp * num(sk.Percent, 30) / 100 * (1 + (rank - 1) * 0.18);
      p.hp = Math.min(p.maxhp, p.hp + heal);
      p.regenT = 3;
      p.regen = p.maxhp * 0.03;
      pushCapped(G.floaters, { x: p.x, y: p.y - 44, text: "+" + Math.round(heal), t: 0.9, color: "#8fffb0" }, MAX_FLOATERS);
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 26, max: 170, t: 0.5, color: color });
      did = true;
    } else if (sk.Kind === "shield") {
      var amount = p.maxhp * num(sk.Percent, 35) / 100 * (p.shieldPower || 1) * (1 + (rank - 1) * 0.18);
      p.shield = Math.max(p.shield, amount);
      p.shieldT = 9;
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 20, max: 90, t: 0.45, color: color });
      did = true;
    } else if (sk.Kind === "meteor") {
      if (!target) return false;
      var mcount = 3 + Math.floor(p.level / 5);
      for (var mi = 0; mi < mcount; mi++) {
        pushCapped(G.zones, {
          x: clamp(target.x + rand(-90, 90), 40, G.worldW - 40),
          y: clamp(target.y + rand(-90, 90), 40, G.worldH - 40),
          r: 72, delay: 0.75 + mi * 0.12, life: 0.35, max: 0.35,
          dps: power * 2.2, color: color, meteor: true, friendly: true, tick: 0
        }, MAX_ZONES);
      }
      G.fx.push({ type: "ring", x: target.x, y: target.y, r: 20, max: 130, t: 0.4, color: color });
      did = true;
    } else if (sk.Kind === "wind") {
      if (!target) return false;
      var base = Math.atan2(target.y - p.y, target.x - p.x);
      var wcount = 5;
      for (var wi = 0; wi < wcount; wi++) {
        var wa = base + (wi - (wcount - 1) / 2) * 0.14;
        spawnShot(p.x, p.y - 20, wa, 620, power * 0.55, color, { pierce: 3, r: 9, kind: "wind", life: 1.2 });
      }
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      did = true;
    } else if (sk.Kind === "poison") {
      if (!target) return false;
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: 100, delay: 0, life: 5.5, max: 5.5,
        dps: power * 1.3, color: color, friendly: true, tick: 0, slow: 0.25
      }, MAX_ZONES);
      did = true;
    } else if (sk.Kind === "drain") {
      if (!target) return false;
      var dealt = dealDamage(target, power, { noCrit: true });
      var back = (dealt || 0) * 0.4;
      p.hp = Math.min(p.maxhp, p.hp + back);
      p.mp = Math.min(p.maxmp, p.mp + 10);
      G.fx.push({ type: "chain", pts: [{ x: target.x, y: target.y - 12 }, { x: p.x, y: p.y - 20 }], t: 0.3, max: 0.3, color: color });
      did = true;
    } else if (sk.Kind === "holy") {
      if (!target && !manual) return false;
      damageArea(p.x, p.y, 280, power, color, { stun: 1.1 });
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 30, max: 320, t: 0.6, color: color });
      did = true;
    } else if (sk.Kind === "time") {
      damageArea(p.x, p.y, 430, power * 0.5, color, { slow: 0.6, slowT: 4 });
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 30, max: 440, t: 0.8, color: color });
      did = true;
    } else if (sk.Kind === "star") {
      if (!target) return false;
      for (var st = 0; st < 7; st++) {
        pushCapped(G.zones, {
          x: clamp(target.x + rand(-170, 170), 40, G.worldW - 40),
          y: clamp(target.y + rand(-170, 170), 40, G.worldH - 40),
          r: 62, delay: 0.7 + st * 0.1, life: 0.3, max: 0.3,
          dps: power * 2, color: color, meteor: true, friendly: true, tick: 0
        }, MAX_ZONES);
      }
      did = true;
    } else if (sk.Kind === "iceshard") {
      if (!target) return false;
      var isAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      for (var isi = -1; isi <= 1; isi++) {
        spawnShot(p.x, p.y - 22, isAng + isi * 0.1, 640, power * (isi === 0 ? 1 : 0.72), color,
          { pierce: isi === 0 ? 3 : 2, r: 9, kind: "ice", life: 1.4, slow: 0.45 });
      }
      pushCapped(G.fx, { type: "cast", x: p.x, y: p.y - 20, t: 0.28, max: 0.28, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "flame") {
      if (!target) return false;
      var flAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      for (var fi = 0; fi < 9; fi++) {
        spawnShot(p.x, p.y - 20, flAng + rand(-0.3, 0.3), rand(230, 390), power * 0.3, color,
          { pierce: 4, r: 11 + Math.random() * 6, kind: "flame", life: 0.62, burn: true });
      }
      pushCapped(G.fx, { type: "flamewave", x: p.x, y: p.y - 18, ang: flAng, r: 95, t: 0.32, max: 0.32, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "storm") {
      if (!target) return false;
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: 150 * (p.areaScale || 1), delay: 0, life: 4.2, max: 4.2,
        dps: power * 0.42, color: color, friendly: true, tick: 0, slow: 0.35, kind: "storm", pull: 0.3
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 20, max: 180, t: 0.5, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "vortex", x: target.x, y: target.y, r: 150, t: 0.8, max: 0.8, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "poisonburst") {
      if (!target) return false;
      damageArea(target.x, target.y, 125, power, color, { slow: 0.3, slowT: 2.2 });
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: 118 * (p.areaScale || 1), delay: 0, life: 4.2, max: 4.2,
        dps: power * 0.42, color: color, friendly: true, tick: 0, slow: 0.2, kind: "poison"
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "spark", x: target.x, y: target.y - 8, r: 42, t: 0.34, max: 0.34, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "darknova") {
      damageArea(p.x, p.y, 310, power, color, { slow: 0.45, slowT: 2.6 });
      pushCapped(G.fx, { type: "void", x: p.x, y: p.y - 10, r: 320, t: 0.55, max: 0.55, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 10, r: 24, max: 340, t: 0.55, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "cross") {
      if (!target) return false;
      var ca = Math.atan2(target.y - p.y, target.x - p.x);
      var cux = Math.cos(ca), cuy = Math.sin(ca);
      var clen = 390 * (p.areaScale || 1), cw = 46 * (p.areaScale || 1);
      var cHits = 0;
      var cSnap = G.enemies.slice();
      for (var csi = 0; csi < cSnap.length; csi++) {
        var ce = cSnap[csi];
        if (ce.dying) continue;
        var cdx = ce.x - target.x, cdy = ce.y - target.y;
        var along = cdx * cux + cdy * cuy;
        var perp = -cdx * cuy + cdy * cux;
        if ((Math.abs(along) < clen && Math.abs(perp) < cw) ||
            (Math.abs(along) < cw && Math.abs(perp) < clen)) {
          dealDamage(ce, power, { noCrit: true });
          cHits++;
        }
      }
      pushCapped(G.fx, { type: "cross", x: target.x, y: target.y - 8, ang: ca, r: clen, t: 0.5, max: 0.5, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 16, max: cw * 2, t: 0.4, color: color }, MAX_FX);
      if (cHits > 0) did = true;
      did = true;
    } else if (sk.Kind === "thunderstorm") {
      if (!target) return false;
      for (var ti = 0; ti < 10; ti++) {
        var tAng = Math.random() * Math.PI * 2;
        var tRad = rand(0, 190) * (p.areaScale || 1);
        pushCapped(G.zones, {
          x: clamp(target.x + Math.cos(tAng) * tRad, 40, G.worldW - 40),
          y: clamp(target.y + Math.sin(tAng) * tRad, 40, G.worldH - 40),
          r: 48 * (p.areaScale || 1), delay: 0.22 + ti * 0.075, life: 0.3, max: 0.3,
          dps: power * 2.2, color: color, meteor: true, friendly: true, tick: 0, kind: "lightning"
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "lightning", x: target.x, y: target.y - 8, r: 60, t: 0.4, max: 0.4, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "rift") {
      if (!target) return false;
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: 140 * (p.areaScale || 1), delay: 0, life: 3.1, max: 3.1,
        dps: power * 0.55, color: color, friendly: true, tick: 0, slow: 0.2, kind: "rift", pull: 0.7
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "void", x: target.x, y: target.y - 6, r: 150, t: 0.7, max: 0.7, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 12, max: 220, t: 0.6, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "meteorrain") {
      if (!target) return false;
      for (var mri = 0; mri < 14; mri++) {
        pushCapped(G.zones, {
          x: clamp(target.x + rand(-300, 300) * (p.areaScale || 1), 40, G.worldW - 40),
          y: clamp(target.y + rand(-300, 300) * (p.areaScale || 1), 40, G.worldH - 40),
          r: 58, delay: 0.35 + mri * 0.09, life: 0.32, max: 0.32,
          dps: power * 1.7, color: color, meteor: true, friendly: true, tick: 0
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 30, max: 360, t: 0.7, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "healzone") {
      var hzR = 135 * (p.areaScale || 1);
      pushCapped(G.zones, {
        x: p.x, y: p.y, r: hzR, delay: 0, life: 5, max: 5,
        dps: 0, color: color, friendly: true, tick: 0, kind: "heal",
        heal: p.maxhp * num(sk.Percent, 12) / 100 / 4
      }, MAX_ZONES);
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.05);
      pushCapped(G.floaters, { x: p.x, y: p.y - 46, text: "+" + Math.round(p.maxhp * 0.05), t: 0.8, color: "#8fffb0" }, MAX_FLOATERS);
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 20, max: hzR, t: 0.55, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "bramble") {
      if (!target) return false;
      damageArea(target.x, target.y, 145, power, color, { slow: 0.55, slowT: 2.8, stun: 0.5 });
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: 140 * (p.areaScale || 1), delay: 0, life: 4.4, max: 4.4,
        dps: power * 0.36, color: color, friendly: true, tick: 0, slow: 0.35, kind: "bramble"
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "spikes", x: target.x, y: target.y, r: 150 * (p.areaScale || 1), t: 0.5, max: 0.5, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "prism") {
      if (!target) return false;
      var prAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      var prColors = ["#ff8a3d", "#9fe8ff", "#ffe066", "#b78bff", "#8fffb0", "#ff9bd2"];
      for (var pri = 0; pri < 6; pri++) {
        spawnShot(p.x, p.y - 22, prAng + (pri - 2.5) * 0.085, 560, power * 0.42, prColors[pri % prColors.length],
          { pierce: 3, r: 8, kind: "prism", life: 1.9, homing: 0.9 });
      }
      pushCapped(G.fx, { type: "cast", x: p.x, y: p.y - 22, t: 0.35, max: 0.35, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "earthslash") {
      var esAng = target ? Math.atan2(target.y - p.y, target.x - p.x) : (p.dir >= 5 ? Math.PI : (p.dir >= 3 ? 0 : (p.dir >= 1 ? -Math.PI / 2 : Math.PI / 2)));
      p.dir = dirFromVector(Math.cos(esAng), Math.sin(esAng), p.dir);
      p.attackT = 0.4;
      var esR = 260 * (p.areaScale || 1);
      var esSnap = G.enemies.slice();
      for (var esi = 0; esi < esSnap.length; esi++) {
        var ee = esSnap[esi];
        if (ee.dying) continue;
        var ed = Math.hypot(ee.x - p.x, ee.y - p.y);
        if (ed > esR) continue;
        var ea = Math.atan2(ee.y - p.y, ee.x - p.x);
        var ediff = Math.atan2(Math.sin(ea - esAng), Math.cos(ea - esAng));
        if (Math.abs(ediff) > 1.05) continue;
        dealDamage(ee, power, { noCrit: true });
        ee.stunT = Math.max(ee.stunT || 0, 0.35);
        ee.x = clamp(ee.x + Math.cos(esAng) * 18, ee.r, G.worldW - ee.r);
        ee.y = clamp(ee.y + Math.sin(esAng) * 18, ee.r, G.worldH - ee.r);
      }
      pushCapped(G.fx, { type: "beam", x: p.x, y: p.y - 16, tx: p.x + Math.cos(esAng) * esR, ty: p.y - 16 + Math.sin(esAng) * esR, r: 46, t: 0.26, max: 0.26, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "spikes", x: p.x + Math.cos(esAng) * esR * 0.55, y: p.y + Math.sin(esAng) * esR * 0.55 - 8, r: esR * 0.7, t: 0.42, max: 0.42, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "slash", x: p.x + Math.cos(esAng) * 70, y: p.y + Math.sin(esAng) * 70 - 10, r: 72, t: 0.2, color: "#ffffff" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "hunt") {
      var huntList = [];
      var huntSnap = G.enemies.slice();
      huntSnap.sort(function (a, b) { return dist2(a, p) - dist2(b, p); });
      for (var hi2 = 0; hi2 < huntSnap.length && huntList.length < 8; hi2++) {
        if (!huntSnap[hi2].dying) huntList.push(huntSnap[hi2]);
      }
      if (!huntList.length && !target) return false;
      for (var hh = 0; hh < 8; hh++) {
        var ht = huntList[hh % Math.max(1, huntList.length)] || target;
        if (!ht) break;
        spawnShot(p.x, p.y - 22, Math.atan2(ht.y - p.y, ht.x - p.x) + rand(-0.18, 0.18), 430, power * 0.5, color,
          { pierce: 1, r: 9, kind: "wind", life: 2.4, homing: 1.7 });
      }
      pushCapped(G.fx, { type: "arrow", x: p.x, y: p.y - 22, tx: p.x + 40, ty: p.y - 22, t: 0.16, max: 0.16, color: color }, MAX_FX);
      p.attackT = p.attackDur * 0.6;
      did = true;
    } else if (sk.Kind === "sanctuary") {
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * num(sk.Percent, 10) / 100);
      damageArea(p.x, p.y, 210 * (p.areaScale || 1), power, color, { slow: 0.45, slowT: 2.6 });
      pushCapped(G.zones, {
        x: p.x, y: p.y, r: 150 * (p.areaScale || 1), delay: 0, life: 5.2, max: 5.2,
        dps: power * 0.28, color: color, friendly: true, tick: 0, kind: "heal", slow: 0.2,
        heal: p.maxhp * 0.018
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 10, r: 20, max: 300, t: 0.6, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "cross", x: p.x, y: p.y - 14, ang: 0, r: 140, t: 0.55, max: 0.55, color: "#ffffff" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "thunderchain") {
      if (!target) return false;
      var tcTargets = chainTargets(p, target, 7, 300);
      var tcPts = [{ x: p.x, y: p.y - 20 }];
      for (var tci = 0; tci < tcTargets.length; tci++) {
        dealDamage(tcTargets[tci], power * Math.pow(0.88, tci), { noCrit: true });
        tcTargets[tci].stunT = Math.max(tcTargets[tci].stunT || 0, 0.45);
        tcPts.push({ x: tcTargets[tci].x, y: tcTargets[tci].y - 12 });
      }
      pushCapped(G.fx, { type: "chain", pts: tcPts, t: 0.34, max: 0.34, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "lightning", x: target.x, y: target.y - 10, r: 70, t: 0.4, max: 0.4, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 20, max: 150, t: 0.4, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "shadow") {
      if (!target) return false;
      for (var shi = 0; shi < 6; shi++) {
        var sha = (shi / 6) * Math.PI * 2 + G.time;
        var shx = p.x + Math.cos(sha) * 26, shy = p.y - 18 + Math.sin(sha) * 16;
        spawnShot(shx, shy, Math.atan2(target.y - p.y, target.x - p.x) + rand(-0.25, 0.25), 450, power * 0.45, color,
          { pierce: 2, r: 8, kind: "bolt", life: 1.8, homing: 1.3 });
        pushCapped(G.fx, { type: "spark", x: shx, y: shy, r: 12, t: 0.22, max: 0.22, color: color }, MAX_FX);
      }
      pushCapped(G.fx, { type: "void", x: p.x, y: p.y - 12, r: 90, t: 0.5, max: 0.5, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "phoenix") {
      if (!target) return false;
      var phAng = Math.atan2(target.y - p.y, target.x - p.x);
      spawnShot(p.x, p.y - 24, phAng, 330, power, color,
        { splash: 160, r: 20, kind: "flame", life: 2.6, homing: 0.9, burn: true });
      pushCapped(G.fx, { type: "flamewave", x: p.x, y: p.y - 20, ang: phAng, r: 170, t: 0.4, max: 0.4, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 18, r: 18, max: 120, t: 0.4, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "icefield") {
      var icx = target ? target.x : p.x, icy = target ? target.y : p.y;
      var icr = 230 * (p.areaScale || 1);
      damageArea(icx, icy, icr, power, color, { slow: 0.65, slowT: 3.8, stun: 0.9 });
      pushCapped(G.zones, {
        x: icx, y: icy, r: icr, delay: 0, life: 4.6, max: 4.6,
        dps: power * 0.3, color: color, friendly: true, tick: 0, slow: 0.5, kind: "rift"
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "spikes", x: icx, y: icy, r: icr, t: 0.6, max: 0.6, color: "#dff6ff" }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: icx, y: icy, r: 20, max: icr, t: 0.6, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "swordrain") {
      var swSnap = G.enemies.slice();
      if (!swSnap.length) return false;
      var swHits = 0;
      for (var swi = 0; swi < 12; swi++) {
        var swe = swSnap[Math.floor(Math.random() * swSnap.length)];
        if (!swe || swe.dying) continue;
        dealDamage(swe, power * 0.42, { noCrit: true });
        pushCapped(G.fx, { type: "slash", x: swe.x, y: swe.y - 10, r: 34, t: 0.22, color: swi % 2 ? "#ffffff" : color }, MAX_FX);
        pushCapped(G.fx, { type: "spark", x: swe.x, y: swe.y - 18, r: 16, t: 0.2, max: 0.2, color: color }, MAX_FX);
        swHits++;
      }
      if (swHits) {
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 14, r: 20, max: 260, t: 0.5, color: color }, MAX_FX);
        did = true;
      }
    } else if (sk.Kind === "beam") {
      if (!target) return false;
      var bAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      p.attackT = 0.35;
      var bLen = 760 * (p.areaScale || 1);
      var bW = 30 * (p.areaScale || 1);
      var bcx = Math.cos(bAng), bcy = Math.sin(bAng);
      var bSnap = G.enemies.slice();
      for (var bsi = 0; bsi < bSnap.length; bsi++) {
        var be = bSnap[bsi];
        if (be.dying) continue;
        var bdx = be.x - p.x, bdy = (be.y - 10) - (p.y - 22);
        var bAlong = bdx * bcx + bdy * bcy;
        var bPerp = -bdx * bcy + bdy * bcx;
        if (bAlong > 0 && bAlong < bLen && Math.abs(bPerp) < bW) {
          dealDamage(be, power, { noCrit: true });
          pushCapped(G.fx, { type: "spark", x: be.x, y: be.y - 16, r: 22, t: 0.26, max: 0.26, color: color }, MAX_FX);
        }
      }
      pushCapped(G.fx, {
        type: "beam", x: p.x, y: p.y - 22, tx: p.x + Math.cos(bAng) * bLen, ty: p.y - 22 + Math.sin(bAng) * bLen,
        r: bW, t: 0.34, max: 0.34, color: color
      }, MAX_FX);
      pushCapped(G.fx, { type: "cast", x: p.x, y: p.y - 20, t: 0.3, max: 0.3, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "frostburst") {
      if (!target && !manual) return false;
      var fbTarget = target || p;
      damageArea(fbTarget.x, fbTarget.y, 165 * (p.areaScale || 1), power, color, { slow: 0.55, slowT: 3.2 });
      for (var fbi = 0; fbi < 3; fbi++) {
        var fba = Math.random() * Math.PI * 2;
        pushCapped(G.zones, {
          x: clamp(fbTarget.x + Math.cos(fba) * rand(40, 100), 40, G.worldW - 40),
          y: clamp(fbTarget.y + Math.sin(fba) * rand(40, 100), 40, G.worldH - 40),
          r: 70 * (p.areaScale || 1), delay: 0, life: 3.4, max: 3.4,
          dps: power * 0.35, color: color, friendly: true, tick: 0, slow: 0.45, kind: "rift"
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "ring", x: fbTarget.x, y: fbTarget.y, r: 20, max: 220, t: 0.55, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "spikes", x: fbTarget.x, y: fbTarget.y, r: 120, t: 0.45, max: 0.45, color: "#d8f4ff" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "starfall") {
      if (!target) return false;
      for (var sfi = 0; sfi < 18; sfi++) {
        pushCapped(G.zones, {
          x: clamp(target.x + rand(-260, 260) * (p.areaScale || 1), 40, G.worldW - 40),
          y: clamp(target.y + rand(-260, 260) * (p.areaScale || 1), 40, G.worldH - 40),
          r: 54, delay: 0.3 + sfi * 0.07, life: 0.3, max: 0.3,
          dps: power * 1.6, color: color, meteor: true, friendly: true, tick: 0
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "void", x: target.x, y: target.y - 10, r: 150, t: 0.8, max: 0.8, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "ring", x: target.x, y: target.y, r: 24, max: 340, t: 0.7, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "nova") {
      var ncount = 14;
      for (var nvi = 0; nvi < ncount; nvi++) {
        spawnShot(p.x, p.y - 22, (nvi / ncount) * Math.PI * 2, 420, power * 0.55, color,
          { pierce: 2, r: 9, kind: "prism", life: 1.6 });
      }
      damageArea(p.x, p.y, 120, power * 0.8, color, { slow: 0.25, slowT: 2 });
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 14, r: 20, max: 220, t: 0.55, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "orbit", x: p.x, y: p.y - 14, r: 120, t: 0.6, max: 0.6, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "bladecyclone") {
      // 劍刃風暴：以自身為中心甩出大量旋轉劍氣，近身與遠程同時覆蓋
      damageArea(p.x, p.y, 150 * (p.areaScale || 1), power * 0.7, color, { stun: 0.25 });
      var bcn = 18;
      for (var bci = 0; bci < bcn; bci++) {
        var bca = (bci / bcn) * Math.PI * 2 + G.time;
        spawnShot(p.x, p.y - 20, bca, 520, power * 0.4, bci % 3 ? color : "#ffffff",
          { pierce: 3, r: 10, kind: "wind", life: 1.35 });
      }
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 14, r: 24, max: 260, t: 0.55, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "orbit", x: p.x, y: p.y - 12, r: 130, t: 0.6, max: 0.6, color: "#fff4c8" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "blackhole") {
      // 黑洞引力：把敵人拉向中心並持續撕裂
      if (!target) return false;
      var bhR = 170 * (p.areaScale || 1);
      damageArea(target.x, target.y, bhR, power, color, { slow: 0.4, slowT: 2.4 });
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: bhR, delay: 0, life: 3.6, max: 3.6,
        dps: power * 0.5, color: color, friendly: true, tick: 0, slow: 0.35, kind: "rift", pull: 1.15
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "void", x: target.x, y: target.y - 8, r: bhR * 1.2, t: 0.85, max: 0.85, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "vortex", x: target.x, y: target.y - 8, r: bhR, t: 0.9, max: 0.9, color: "#d9c6ff" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "sunburst") {
      // 烈日審判：多層擴散火環，並在周圍留下灼燒地面
      damageArea(p.x, p.y, 300 * (p.areaScale || 1), power, color, { stun: 0.35 });
      for (var sbi = 0; sbi < 3; sbi++) {
        pushCapped(G.zones, {
          x: clamp(p.x + rand(-220, 220), 40, G.worldW - 40),
          y: clamp(p.y + rand(-220, 220), 40, G.worldH - 40),
          r: (95 + sbi * 16) * (p.areaScale || 1), delay: 0.35 + sbi * 0.15, life: 0.5, max: 0.5,
          dps: power * 1.4, color: color, meteor: true, friendly: true, tick: 0
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 24, max: 360, t: 0.65, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "flamewave", x: p.x, y: p.y - 14, ang: 0, r: 300, t: 0.5, max: 0.5, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "flash", x: p.x, y: p.y, t: 0.3, max: 0.3, color: "#ffd166" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "dragonbreath") {
      // 龍焰吐息：超寬錐形火焰，附帶燃燒
      if (!target) return false;
      var dbAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      var dbLen = 520 * (p.areaScale || 1);
      var dbSnap = G.enemies.slice();
      for (var dbi = 0; dbi < dbSnap.length; dbi++) {
        var de = dbSnap[dbi];
        if (de.dying) continue;
        var ddx = de.x - p.x, ddy = de.y - p.y;
        var dd = Math.hypot(ddx, ddy);
        if (dd > dbLen) continue;
        var da = Math.atan2(ddy, ddx);
        var ddiff = Math.atan2(Math.sin(da - dbAng), Math.cos(da - dbAng));
        if (Math.abs(ddiff) > 0.62) continue;
        dealDamage(de, power, { noCrit: true });
        de.burnT = Math.max(de.burnT || 0, 3.4);
        de.burnDps = Math.max(de.burnDps || 0, power * 0.11);
      }
      pushCapped(G.fx, { type: "flamewave", x: p.x, y: p.y - 18, ang: dbAng, r: dbLen, t: 0.55, max: 0.55, color: color }, MAX_FX);
      for (var dbw = 0; dbw < 6; dbw++) {
        pushCapped(G.fx, {
          type: "spark", x: p.x + Math.cos(dbAng + rand(-0.35, 0.35)) * (90 + dbw * 58),
          y: p.y - 18 + Math.sin(dbAng + rand(-0.35, 0.35)) * (26 + dbw * 14),
          r: 24 + dbw * 5, t: 0.42, max: 0.42, color: dbw % 2 ? color : "#ffe066"
        }, MAX_FX);
      }
      did = true;
    } else if (sk.Kind === "aurora") {
      // 極光冰晶：沿著前方連續綻放三道冰環
      if (!target) return false;
      var auAng = Math.atan2(target.y - p.y, target.x - p.x);
      p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
      for (var aui = 0; aui < 3; aui++) {
        var aux = clamp(p.x + Math.cos(auAng) * (120 + aui * 130), 40, G.worldW - 40);
        var auy = clamp(p.y + Math.sin(auAng) * (120 + aui * 130), 40, G.worldH - 40);
        damageArea(aux, auy, 120 * (p.areaScale || 1), power * 0.62, color,
          { slow: 0.55, slowT: 3.4, stun: aui === 2 ? 1.1 : 0.25 });
        pushCapped(G.fx, { type: "ring", x: aux, y: auy - 8, r: 16, max: 190, t: 0.45, color: color }, MAX_FX);
        pushCapped(G.fx, { type: "spikes", x: aux, y: auy, r: 105, t: 0.42, max: 0.42, color: "#dff6ff" }, MAX_FX);
      }
      pushCapped(G.fx, { type: "beam", x: p.x, y: p.y - 20, tx: p.x + Math.cos(auAng) * 520, ty: p.y - 20 + Math.sin(auAng) * 520, r: 40, t: 0.35, max: 0.35, color: color }, MAX_FX);
      did = true;
    } else if (sk.Kind === "thor") {
      // 雷神之怒：超長連鎖雷擊，最後一擊留下雷暴區
      if (!target) return false;
      var thTargets = chainTargets(p, target, 10, 320);
      var thPts = [{ x: p.x, y: p.y - 22 }];
      for (var thi = 0; thi < thTargets.length; thi++) {
        var the = thTargets[thi];
        dealDamage(the, power * Math.pow(0.9, thi), { noCrit: true });
        the.stunT = Math.max(the.stunT || 0, 0.55);
        thPts.push({ x: the.x, y: the.y - 12 });
        pushCapped(G.fx, { type: "lightning", x: the.x, y: the.y - 10, r: 54, t: 0.32, max: 0.32, color: color }, MAX_FX);
      }
      pushCapped(G.fx, { type: "chain", pts: thPts, t: 0.45, max: 0.45, color: color }, MAX_FX);
      for (var thz = 0; thz < 4; thz++) {
        pushCapped(G.zones, {
          x: clamp(target.x + rand(-150, 150), 40, G.worldW - 40),
          y: clamp(target.y + rand(-150, 150), 40, G.worldH - 40),
          r: 64, delay: 0.3 + thz * 0.11, life: 0.3, max: 0.3,
          dps: power * 1.3, color: color, meteor: true, friendly: true, tick: 0, kind: "lightning"
        }, MAX_ZONES);
      }
      did = true;
    } else if (sk.Kind === "bloodmoon") {
      // 血月斬：360 度血刃，造成傷害並吸取生命
      var bmR = 290 * (p.areaScale || 1);
      var bmHeal = 0;
      var bmSnap = G.enemies.slice();
      for (var bmi = 0; bmi < bmSnap.length; bmi++) {
        var bme = bmSnap[bmi];
        if (bme.dying) continue;
        if (Math.hypot(bme.x - p.x, bme.y - p.y) > bmR) continue;
        var dealt = dealDamage(bme, power, { noCrit: true }) || 0;
        bmHeal += dealt * 0.08;
        pushCapped(G.fx, { type: "slash", x: bme.x, y: bme.y - 12, r: 40, t: 0.24, color: bmi % 2 ? "#ff5a6e" : "#ffd9e0" }, MAX_FX);
      }
      if (bmHeal > 0) {
        p.hp = Math.min(p.maxhp, p.hp + bmHeal);
        pushCapped(G.floaters, { x: p.x, y: p.y - 54, text: "+" + Math.round(bmHeal), t: 0.7, color: "#ff8a9a" }, MAX_FLOATERS);
      }
      pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 20, max: bmR, t: 0.55, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "cross", x: p.x, y: p.y - 12, ang: 0, r: bmR * 0.8, t: 0.45, max: 0.45, color: "#ff8a9a" }, MAX_FX);
      did = true;
    } else if (sk.Kind === "astralrift") {
      // 星界裂隙：先塌縮再引爆，兩段式傷害
      if (!target) return false;
      var asR = 160 * (p.areaScale || 1);
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: asR, delay: 0, life: 1.4, max: 1.4,
        dps: power * 0.35, color: color, friendly: true, tick: 0, kind: "rift", pull: 1.4
      }, MAX_ZONES);
      pushCapped(G.zones, {
        x: target.x, y: target.y, r: asR * 1.25, delay: 1.5, life: 0.4, max: 0.4,
        dps: power * 3.4, color: "#ffe9a8", meteor: true, friendly: true, tick: 0
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "void", x: target.x, y: target.y - 8, r: asR * 1.1, t: 1.0, max: 1.0, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "vortex", x: target.x, y: target.y - 8, r: asR, t: 0.9, max: 0.9, color: "#fff4c8" }, MAX_FX);
      did = true;
    }

    if (did) {
      p.mp = Math.max(0, p.mp - cost);
      slot.cd = Math.max(0.5, slot.cdMax * (p.spellCdScale || 1) * Math.pow(0.96, rank - 1));
      // 連鎖反應：有機率立刻縮短冷卻，形成連續詠唱
      if (p.abilities && p.abilities.echo > 0 && Math.random() < 0.1 * p.abilities.echo) {
        slot.cd *= 0.4;
        p.echoFx = 0.5;
        pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 16, r: 22, max: 120, t: 0.35, color: color }, MAX_FX);
      }
      // 元素超載：每 4 次施法引爆一圈元素衝擊
      if (p.abilities && p.abilities.overload > 0) {
        p._castCount = (p._castCount || 0) + 1;
        if (p._castCount % 4 === 0) {
          var ovDmg = power * 0.6 * p.abilities.overload;
          var ovR = 160 + p.abilities.overload * 18;
          damageArea(p.x, p.y - 10, ovR, ovDmg, color, { stun: 0.2 });
          pushCapped(G.fx, { type: "vortex", x: p.x, y: p.y - 12, r: ovR, t: 0.5, max: 0.5, color: color }, MAX_FX);
          pushCapped(G.fx, { type: "ring", x: p.x, y: p.y - 12, r: 20, max: ovR * 1.2, t: 0.5, color: "#ffffff" }, MAX_FX);
          pushCapped(G.floaters, { x: p.x, y: p.y - 66, text: "元素超載！", t: 1.0, color: color }, MAX_FLOATERS);
          if (window.AUDIO) AUDIO.sfx("cast_" + (String(sk.Element || "arcane").toLowerCase()));
        }
      }
      if (sk.Icon && p.spells.length) {
        // 施法時角色面向最近的敵人
        if (target) p.face = target.x >= p.x ? 1 : -1;
      }
    }
    return did;
  }

  // 移動向量 -> 原版 8 方向（0=N,1=NE,2=E,3=SE,4=S,5=SW,6=W,7=NW）
  function dirFromVector(mx, my, fallback) {
    if (!mx && !my) return fallback;
    var ang = Math.atan2(my, mx) * 180 / Math.PI;
    var idx = Math.round((ang + 90) / 45);
    return ((idx % 8) + 8) % 8;
  }

  function nearestEnemy(from, maxDist) {
    var best = null, bestD = maxDist * maxDist;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (e.dying) continue;
      var d = dist2(e, from);
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  }

  // 關卡水池／冰湖／熔岩／虛空：真的會影響戰鬥，而不只是背景裝飾
  function poolAt(x, y) {
    var pools = G.scene && G.scene.pools;
    if (!pools) return null;
    for (var i = 0; i < pools.length; i++) {
      var pool = pools[i];
      var dx = (x - pool.x) / Math.max(1, pool.r);
      var dy = (y - pool.y) / Math.max(1, pool.r * (pool.squash || 0.6));
      if (dx * dx + dy * dy <= 1) return pool;
    }
    return null;
  }

  var POOL_HINTS = {
    water: "水域：移動變慢", oasis: "綠洲：移動變慢",
    ice: "冰面：移動加速", lava: "熔岩：持續灼傷", void: "虛空：侵蝕生命"
  };

  function updatePlayer(dt) {
    var p = G.player;
    var mx = 0, my = 0;
    if (keys["a"] || keys["arrowleft"]) mx -= 1;
    if (keys["d"] || keys["arrowright"]) mx += 1;
    if (keys["w"] || keys["arrowup"]) my -= 1;
    if (keys["s"] || keys["arrowdown"]) my += 1;

    if (!mx && !my && pointer.active) {
      var wx = pointer.x + G.cam.x - W / 2;
      var wy = pointer.y + G.cam.y - H / 2;
      var dx = wx - p.x, dy = wy - p.y;
      var d = Math.hypot(dx, dy);
      if (d > 12) { mx = dx / d; my = dy / d; }
    }

    var poolHere = poolAt(p.x, p.y);
    p.inPool = poolHere ? poolHere.kind : null;
    if (poolHere) {
      p._poolSeen = p._poolSeen || {};
      if (!p._poolSeen[poolHere.kind]) {
        p._poolSeen[poolHere.kind] = 1;
        toast(POOL_HINTS[poolHere.kind] || "特殊地形");
      }
    }
    var terrainMul = 1;
    if (poolHere) {
      if (poolHere.kind === "ice") terrainMul = 1.28;
      else if (poolHere.kind === "water" || poolHere.kind === "oasis") terrainMul = 0.78;
      else if (poolHere.kind === "void") {
        terrainMul = 0.86;
        if (!p._voidT || G.time - p._voidT > 0.9) { p._voidT = G.time; damagePlayer(4, "#b78bff"); }
      } else if (poolHere.kind === "lava") {
        if (!p._lavaT || G.time - p._lavaT > 0.7) {
          p._lavaT = G.time;
          damagePlayer(7, "#ff8a3d");
          pushCapped(G.fx, { type: "spark", x: p.x, y: p.y - 8, r: 14, t: 0.3, max: 0.3, color: "#ff8a3d" }, MAX_FX);
        }
      }
    }

    var len = Math.hypot(mx, my);
    p.moving = len > 0;
    if (len > 0) {
      mx /= len; my /= len;
      p.dir = dirFromVector(mx, my, p.dir);
      var moveSpd = p.spd * (p.slowT > 0 ? p.slowMul : 1) * terrainMul;
      p.vx = mx * moveSpd; p.vy = my * moveSpd;
      p.x = clamp(p.x + p.vx * dt, p.r, G.worldW - p.r);
      p.y = clamp(p.y + p.vy * dt, p.r, G.worldH - p.r);
      if (Math.abs(mx) > 0.05) p.face = mx > 0 ? 1 : -1;
      // 角色腳步聲與揚塵
      p._stepT = (p._stepT || 0) - dt;
      if (p._stepT <= 0) {
        p._stepT = 0.31;
        if (window.AUDIO) AUDIO.sfx("step");
        pushCapped(G.fx, {
          type: "dust", x: p.x, y: p.y + 2, r: 9, t: 0.24, max: 0.24, color: "#d8cfb4"
        }, MAX_FX);
      }
    } else {
      p.vx = 0; p.vy = 0;
    }

    // 狀態：緩速、護盾、持續治療
    if (p.slowT > 0) {
      p.slowT -= dt;
      if (p.slowT <= 0) { p.slowT = 0; p.slowMul = 1; }
    }
    if (p.shieldT > 0) {
      p.shieldT -= dt;
      if (p.shieldT <= 0) { p.shieldT = 0; p.shield = 0; }
    }
    if (p.regenT > 0) {
      p.regenT -= dt;
      p.hp = Math.min(p.maxhp, p.hp + p.regen * dt);
    }
    if (p.hpRegen > 0) {
      p.hp = Math.min(p.maxhp, p.hp + p.hpRegen * dt);
    }
    if (p.abilities && p.abilities.lifeBloom > 0) {
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.004 * p.abilities.lifeBloom * dt);
    }

    p.attackT = Math.max(0, p.attackT - dt);
    p.hitFlash = Math.max(0, p.hitFlash - dt);
    p.invT = Math.max(0, p.invT - dt);

    // exp orbs
    for (var i = G.orbs.length - 1; i >= 0; i--) {
      var o = G.orbs[i];
      var dd = Math.hypot(o.x - p.x, o.y - p.y);
      if (dd < p.magnet) {
        var pull = 260 * dt;
        o.x += (p.x - o.x) / (dd || 1) * pull;
        o.y += (p.y - o.y) / (dd || 1) * pull;
      }
      if (dd < 22) {
        G.orbs.splice(i, 1);
        if (window.AUDIO) AUDIO.sfx("pickup");
        gainExp(o.v);
      }
    }
  }

  function gainExp(v) {
    var p = G.player;
    p.exp += v * (p.expGain || 1);
    while (p.exp >= p.nextExp) {
      p.exp -= p.nextExp;
      p.level++;
      p.nextExp = Math.round(12 + p.level * 9 + p.level * p.level * 0.6);
      levelUp();
    }
  }

  function levelUp() {
    var p = G.player;
    if (window.AUDIO) { AUDIO.sfx("levelup"); AUDIO.sfx("levelup2"); }
    p.maxhp += p.maxhp * G.grow.HP;
    p.maxmp += p.maxmp * Math.max(0.02, G.grow.MP || 0.02);
    p.mp = Math.min(p.maxmp, p.mp + p.maxmp * 0.25);
    p.atk += Math.max(0.8, p.atk * G.grow.ATK * 1.6);
    p.def += Math.max(0.3, p.def * G.grow.DEF);
    p.spd += Math.max(0.5, p.spd * G.grow.SPD);
    p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.2);
    // 等級門檻魔法解鎖提示
    (p.spells || []).forEach(function (s) {
      if (s.unlock === p.level) {
        var sk = skillById(s.id);
        if (sk) toast("解鎖魔法：" + sk.Name);
      }
    });
    G.upPending++;
    showUpgrades();
  }

  var SPELL_RANK_MAX = 5;

  var STAT_UPGRADES = [
    { name: "力量", desc: "攻擊力 +12%", icon: 10028, apply: function (p) { p.atk *= 1.12; } },
    { name: "體魄", desc: "最大生命 +15%", icon: 10007, apply: function (p) { p.maxhp *= 1.15; p.hp += p.maxhp * 0.1; } },
    { name: "守護", desc: "防禦 +20%", icon: 90036, apply: function (p) { p.def *= 1.2; } },
    { name: "疾風", desc: "移動速度 +10%", icon: 10111, apply: function (p) { p.spd *= 1.1; } },
    { name: "吸血", desc: "擊殺回復 3% 生命", icon: 90035, apply: function (p) { p.lifesteal = (p.lifesteal || 0) + 0.03; } },
    { name: "磁力", desc: "拾取範圍 +25%", icon: 30075, apply: function (p) { p.magnet *= 1.25; } },
    { name: "暴擊", desc: "暴擊率 +8%", icon: 10112, apply: function (p) { p.crit = (p.crit || 0) + 0.08; } },
    { name: "急速", desc: "技能冷卻 -8%", icon: 10139, apply: function (p) { p.atkCdScale = (p.atkCdScale || 1) * 0.92; } },
    { name: "魔力泉源", desc: "最大魔力 +22%，魔力回復 +15%", icon: 30074, apply: function (p) { p.maxmp *= 1.22; p.mp = p.maxmp; p.mpRegen *= 1.15; } },
    { name: "咒力", desc: "魔法傷害 +16%", icon: 10028, apply: function (p) { p.spellPower = (p.spellPower || 1) * 1.16; } },
    { name: "詠唱加速", desc: "魔法冷卻 -10%", icon: 10139, apply: function (p) { p.spellCdScale = (p.spellCdScale || 1) * 0.9; } },
    { name: "元素精通", desc: "魔法傷害 +10%，魔力消耗 -8%", icon: 10049, apply: function (p) { p.spellPower = (p.spellPower || 1) * 1.1; p.spellCostScale = (p.spellCostScale || 1) * 0.92; } },
    { name: "聖盾強化", desc: "護盾效果 +30%", icon: 90036, apply: function (p) { p.shieldPower = (p.shieldPower || 1) * 1.3; } },
    { name: "暴擊傷害", desc: "暴擊傷害 +30%", icon: 10112, apply: function (p) { p.critDmg = (p.critDmg || 1.8) + 0.3; } },
    { name: "術法範圍", desc: "所有技能範圍 +12%", icon: 10049, apply: function (p) { p.areaScale = (p.areaScale || 1) * 1.12; } },
    { name: "生命回復", desc: "每秒回復 0.9 生命", icon: 90003, apply: function (p) { p.hpRegen = (p.hpRegen || 0) + 0.9; } },
    { name: "閃避", desc: "閃避率 +5%（上限 50%）", icon: 10111, apply: function (p) { p.dodge = Math.min(0.5, (p.dodge || 0) + 0.05); } },
    { name: "斬殺", desc: "敵人生命低於 6% 時直接處決（上限 30%）", icon: 90021, apply: function (p) { p.execute = Math.min(0.3, (p.execute || 0) + 0.06); } },
    { name: "多重射擊", desc: "普通攻擊額外命中 1 個目標（最多 +3）", icon: 10028, apply: function (p) { p.multishot = Math.min(3, (p.multishot || 0) + 1); } },
    { name: "冰緩打擊", desc: "命中使敵人減速 8%（上限 50%）", icon: 10045, apply: function (p) { p.slowOnHit = Math.min(0.5, (p.slowOnHit || 0) + 0.08); } },
    { name: "擊殺護盾", desc: "擊殺敵人獲得 2% 最大生命護盾", icon: 90036, apply: function (p) { p.shieldOnKill = (p.shieldOnKill || 0) + 0.02; } },
    { name: "經驗加成", desc: "獲得的經驗值 +16%", icon: 30075, apply: function (p) { p.expGain = (p.expGain || 1) * 1.16; } },
    { name: "破甲", desc: "無視敵人防禦 12%（上限 60%）", icon: 10028, apply: function (p) { p.armorPen = Math.min(0.6, (p.armorPen || 0) + 0.12); } },
    { name: "韌性", desc: "受到的傷害 -5%（上限 40%）", icon: 90036, apply: function (p) { p.dmgReduce = Math.min(0.4, (p.dmgReduce || 0) + 0.05); } },
    { name: "靈巧", desc: "移動速度 +4%，閃避 +2%", icon: 10111, apply: function (p) { p.spd *= 1.04; p.dodge = Math.min(0.5, (p.dodge || 0) + 0.02); } }
  ];

  // 升級時可取得的被動能力（與純數值卡區隔）
  var ABILITY_UPGRADES = [
    { key: "burn", name: "烈焰附魔", icon: 10001, max: 3,
      desc: function (r) { return "命中附加燃燒，每秒 " + (16 * r) + "% 攻擊力，持續 2.6 秒"; } },
    { key: "frostAura", name: "霜凍光環", icon: 10107, max: 3,
      desc: function (r) { return "每 " + (3.8 - r * 0.35).toFixed(1) + " 秒釋放冰霜光環，傷害並減速"; } },
    { key: "holyNova", name: "神聖新星", icon: 90012, max: 3,
      desc: function (r) { return "每 " + (5.4 - r * 0.5).toFixed(1) + " 秒降下聖光，範圍傷害並暈眩"; } },
    { key: "timeField", name: "時光領域", icon: 10139, max: 2,
      desc: function (r) { return "每 " + (9.5 - r * 0.8).toFixed(1) + " 秒留下時光領域，持續緩速敵人"; } },
    { key: "killBoom", name: "擊殺爆裂", icon: 10015, max: 3,
      desc: function (r) { return "擊殺小怪時爆炸，對周圍造成 " + (55 * r) + "% 攻擊力"; } },
    { key: "thorn", name: "荊棘之甲", icon: 90036, max: 3,
      desc: function (r) { return "受近戰攻擊時反彈 " + (22 * r) + "% 傷害"; } },
    { key: "echo", name: "連鎖反應", icon: 10051, max: 3,
      desc: function (r) { return "施法後有 " + (10 * r) + "% 機率縮短 60% 冷卻"; } },
    { key: "rage", name: "致命節奏", icon: 10111, max: 3,
      desc: function () { return "擊殺疊加攻速，每層 -3% 攻擊間隔（最多 10 層）"; } },
    { key: "manaFlow", name: "魔力湧動", icon: 30074, max: 3,
      desc: function () { return "最大魔力 +10%，魔力回復 +15%"; },
      onApply: function (p) { p.maxmp *= 1.1; p.mpRegen *= 1.15; p.mp = Math.min(p.maxmp, p.mp + p.maxmp * 0.1); } },
    { key: "guardian", name: "守護天使", icon: 90003, max: 1,
      desc: function () { return "每場一次，瀕死時以 50% 生命復活並獲得護盾"; } },
    { key: "lifeBloom", name: "生命綻放", icon: 90003, max: 3,
      desc: function (r) { return "每秒回復 " + (0.4 * r).toFixed(1) + "% 最大生命"; } },
    { key: "chainNova", name: "連鎖新星", icon: 10051, max: 3,
      desc: function (r) { return "每 " + (6.4 - r * 0.6).toFixed(1) + " 秒釋放連鎖閃電，跳躍 " + (3 + r) + " 個目標"; } },
    { key: "meteorMark", name: "流星印記", icon: 10015, max: 3,
      desc: function (r) { return "每 " + (8.0 - r * 0.8).toFixed(1) + " 秒在敵群降下 " + (1 + r) + " 顆流星"; } },
    { key: "arcaneOrbit", name: "奧術環繞", icon: 10139, max: 3,
      desc: function (r) { return "每 0.5 秒以奧術光環切割身邊敵人，半徑 " + (82 + r * 14) + ""; } },
    { key: "soulHarvest", name: "靈魂收割", icon: 90035, max: 3,
      desc: function (r) { return "擊殺時所有魔法冷卻 -" + (0.35 * r).toFixed(2) + " 秒，並回復 " + (0.5 * r).toFixed(1) + "% 生命"; } },
    { key: "thunderMark", name: "雷鳴印記", icon: 10051, max: 3,
      desc: function (r) { return "命中時有 " + (5 * r) + "% 機率觸發連鎖雷擊（" + (40 * r) + "% 攻擊力）"; } },
    { key: "frostBite", name: "霜咬", icon: 10045, max: 3,
      desc: function (r) { return "對減速敵人多造成 " + (7 * r) + "% 傷害；命中時有 " + (12 * r) + "% 機率附加減速"; } },
    { key: "elementalist", name: "元素共鳴", icon: 10049, max: 3,
      desc: function (r) { return "魔法傷害 +" + (12 * r) + "%，技能範圍 +" + (5 * r) + "%"; },
      onApply: function (p) { p.spellPower *= 1.12; p.areaScale = (p.areaScale || 1) * 1.05; } },
    { key: "swordWave", name: "劍氣波", icon: 10028, max: 3,
      desc: function (r) { return "普通攻擊附加穿透劍氣，造成 " + (28 * r) + "% 攻擊力"; } },
    { key: "swordMastery", name: "劍術精通", icon: 10078, max: 4, weapon: "sword",
      desc: function (r) { return "普攻傷害 +" + (14 * r) + "%，揮砍範圍 +" + (8 * r) + "，可多掃 1 名敵人"; } },
    { key: "bowMastery", name: "箭術精通", icon: 10011, max: 4, weapon: "bow",
      desc: function (r) { return "普攻傷害 +" + (14 * r) + "%，箭矢可多貫穿 " + r + " 名敵人"; } },
    { key: "arrowRain", name: "追魂箭雨", icon: 10051, max: 3,
      desc: function (r) { return "每 " + (5.2 - r * 0.5).toFixed(1) + " 秒在最近的敵群降下 " + (5 + r * 2) + " 支箭"; } },
    { key: "overload", name: "元素超載", icon: 10001, max: 3,
      desc: function (r) { return "每 4 次施法引發元素爆炸，造成 " + (60 * r) + "% 魔法傷害並擊退"; } },
    { key: "shieldRecharge", name: "護盾回充", icon: 90036, max: 3,
      desc: function (r) { return "每 " + (7.5 - r).toFixed(1) + " 秒自動獲得 " + (4 * r) + "% 最大生命護盾"; } },
    { key: "berserk", name: "狂戰之血", icon: 10111, max: 3,
      desc: function (r) { return "生命低於 40% 時，傷害 +" + (10 * r) + "%、攻速 +" + (6 * r) + "%"; } },
    { key: "poisonNova", name: "腐毒新星", icon: 10045, max: 3,
      desc: function (r) { return "每 " + (4.4 - r * 0.4).toFixed(1) + " 秒噴發毒霧，每秒 " + (18 * r) + "% 攻擊力，持續 3.2 秒"; } },
    { key: "galeWheel", name: "旋風輪", icon: 10051, max: 3,
      desc: function (r) { return "每 " + (3.8 - r * 0.3).toFixed(1) + " 秒射出 " + (8 + r * 2) + " 道穿透風刃"; } },
    { key: "earthSpikes", name: "大地尖刺", icon: 10015, max: 3,
      desc: function (r) { return "每 " + (5.6 - r * 0.5).toFixed(1) + " 秒在 " + (2 + r) + " 名敵人腳下爆出尖刺"; } },
    { key: "frostDomain", name: "極寒領域", icon: 10107, max: 2,
      desc: function (r) { return "每 " + (2.4 - r * 0.25).toFixed(1) + " 秒擴散寒氣，範圍 " + (120 + r * 16) + "、造成減速"; } },
    { key: "windStep", name: "疾風步", icon: 10111, max: 3,
      desc: function () { return "移動速度 +6%，閃避 +3%"; },
      onApply: function (p) { p.spd *= 1.06; p.dodge = Math.min(0.5, (p.dodge || 0) + 0.03); } },
    { key: "lastStand", name: "背水一戰", icon: 90036, max: 3,
      desc: function (r) { return "生命低於 45% 時，傷害 +" + (12 * r) + "%、受到傷害 -" + (6 * r) + "%"; } },
    { key: "bladeCyclone", name: "劍刃迴旋", icon: 10028, max: 3,
      desc: function (r) { return "每 " + (3.2 - r * 0.3).toFixed(1) + " 秒向四周射出 " + (6 + r * 2) + " 道穿透劍氣"; } },
    { key: "voidRift", name: "虛空裂隙", icon: 10139, max: 3,
      desc: function (r) { return "每 " + (6.5 - r * 0.7).toFixed(1) + " 秒在敵群撕開裂隙，持續 " + (2.6 + r * 0.3).toFixed(1) + " 秒並拉扯敵人"; } },
    { key: "starBurst", name: "星辰爆裂", icon: 10015, max: 3,
      desc: function (r) { return "每 " + (4.6 - r * 0.45).toFixed(1) + " 秒在最近的敵群落下 " + (2 + r) + " 顆星辰"; } },
    { key: "thunderGod", name: "雷神之怒", icon: 10051, max: 3,
      desc: function (r) { return "每 " + (5.6 - r * 0.55).toFixed(1) + " 秒降下連鎖雷擊，跳躍 " + (4 + r) + " 名敵人並暈眩"; } },
    { key: "lastStand2", name: "不屈意志", icon: 90036, max: 2,
      desc: function (r) { return "生命低於 30% 時，每秒回復 " + (0.5 * r).toFixed(1) + "% 生命"; } }
  ];

  // 升級時可以「新學」的魔法：書本最多 9 格，讓每局 Build 不同
  var NEW_SPELL_IDS = [113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128,
    129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144];

  function newSpellCard(sk) {
    return {
      type: "新魔法",
      name: sk.Name,
      icon: sk.Icon,
      desc: (sk.Desc || "獲得新的主動魔法。") + "（魔法書 " + (G.player.spells.length + 1) + "/9）",
      apply: function (p) {
        if (p.spells.length >= 9) return;
        p.spells.push({
          id: sk.ID,
          index: p.spells.length,
          cd: 0.8,
          cdMax: Math.max(1, num(sk.CD, 6)),
          unlock: 1,
          rank: 1
        });
        buildSkillBar();
      }
    };
  }

  function spellRankCard(slot, sk) {
    var next = Math.min(SPELL_RANK_MAX, (slot.rank || 1) + 1);
    var effect = (sk.Kind === "heal" || sk.Kind === "shield") ? "效果" : "傷害";
    return {
      type: "魔法",
      name: sk.Name,
      icon: sk.Icon,
      desc: "魔法精研 " + next + "/" + SPELL_RANK_MAX + "：" + effect + " +18%、冷卻 -4%、消耗 -3%",
      apply: function () { slot.rank = next; }
    };
  }

  function abilityCard(a, rank) {
    var next = Math.min(a.max, rank + 1);
    return {
      type: "能力",
      key: a.key,
      name: a.name,
      icon: a.icon,
      desc: a.desc(next) + "（" + next + "/" + a.max + "）",
      apply: function (p) {
        p.abilities[a.key] = next;
        if (a.onApply) a.onApply(p, next);
      }
    };
  }

  function buildUpgradeChoices() {
    var p = G.player;
    var magic = [];
    (p.spells || []).forEach(function (slot) {
      if ((slot.rank || 1) >= SPELL_RANK_MAX) return;
      if (p.level < slot.unlock) return;
      var sk = skillById(slot.id);
      if (sk) magic.push(spellRankCard(slot, sk));
    });
    var newSpells = [];
    if (p.spells.length < 9) {
      var owned = {};
      p.spells.forEach(function (s) { owned[s.id] = 1; });
      NEW_SPELL_IDS.forEach(function (id) {
        if (owned[id]) return;
        var sk = skillById(id);
        if (sk) newSpells.push(newSpellCard(sk));
      });
    }
    var abilities = [];
    ABILITY_UPGRADES.forEach(function (a) {
      if (a.weapon && a.weapon !== p.spriteKey) return;
      var rank = (p.abilities && p.abilities[a.key]) || 0;
      if (rank < a.max) abilities.push(abilityCard(a, rank));
    });
    var stats = STAT_UPGRADES.map(function (u) {
      return { type: "屬性", name: u.name, desc: u.desc, icon: u.icon, apply: u.apply };
    });
    var special = magic.concat(abilities).concat(newSpells);
    var picks = [];
    // 第一次升級先給職業專屬精通，讓劍士／弓箭手的 Build 從一開始就不同
    var masteryKey = p.spriteKey === "bow" ? "bowMastery" : "swordMastery";
    if (!(p.abilities && p.abilities[masteryKey] > 0)) {
      var masteryDef = null;
      for (var mi = 0; mi < ABILITY_UPGRADES.length; mi++) {
        if (ABILITY_UPGRADES[mi].key === masteryKey) { masteryDef = ABILITY_UPGRADES[mi]; break; }
      }
      if (masteryDef) {
        picks.push(abilityCard(masteryDef, 0));
        special = special.filter(function (c) { return c.key !== masteryKey; });
      }
    }
    // 至少兩張魔法／能力卡，讓每次升級都能選到新玩法
    var guarantee = Math.min(2, special.length);
    for (var g = 0; g < guarantee; g++) {
      picks.push(special.splice(Math.floor(Math.random() * special.length), 1)[0]);
    }
    var rest = special.concat(stats);
    while (picks.length < 4 && rest.length) {
      picks.push(rest.splice(Math.floor(Math.random() * rest.length), 1)[0]);
    }
    return picks;
  }

  function showUpgrades() {
    if (G.upPending <= 0) return;
    G.paused = true;
    var list = document.getElementById("upgradeList");
    list.innerHTML = "";
    var picks = buildUpgradeChoices();
    for (var i = 0; i < picks.length; i++) {
      (function (u) {
        var d = document.createElement("div");
        d.className = "card upgrade" + (u.type === "魔法" || u.type === "新魔法" ? " t-magic" : (u.type === "能力" ? " t-ability" : " t-stat"));
        d.innerHTML = '<span class="tag"></span><img class="ico" alt=""><div class="name"></div><div class="desc"></div>';
        d.querySelector(".tag").textContent = u.type || "屬性";
        var icoEl = d.querySelector("img.ico");
        if (u.icon && window.ART) {
          icoEl.src = ART.skillIcon(u.icon);
          icoEl.onerror = function () { icoEl.style.display = "none"; };
        } else icoEl.style.display = "none";
        d.querySelector(".name").textContent = u.name;
        d.querySelector(".desc").textContent = u.desc;
        d.addEventListener("click", function () {
          if (window.AUDIO) AUDIO.sfx("click");
          u.apply(G.player);
          G.upPending--;
          if (G.upPending > 0) { showUpgrades(); }
          else { levelUpEl.classList.add("hidden"); G.paused = false; }
        });
        list.appendChild(d);
      })(picks[i]);
    }
    levelUpEl.classList.remove("hidden");
  }

  // ---------------------------------------------------------------- 怪物技能
  function enemyNeedsHeal(e) {
    if (e.hp < e.maxhp * 0.72) return true;
    for (var i = 0; i < G.enemies.length; i++) {
      var a = G.enemies[i];
      if (a === e || a.dying || a.isBoss) continue;
      if (a.hp < a.maxhp * 0.55 && dist2(a, e) < 200 * 200) return true;
    }
    return false;
  }

  function pickEnemySkill(e) {
    var list = e.castSkills || [];
    if (!list.length) return null;
    var heal = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].Kind === "e_heal") { heal = list[i]; break; }
    }
    if (heal && enemyNeedsHeal(e)) return heal;
    var offense = list.filter(function (s) { return s.Kind !== "e_heal"; });
    if (!offense.length) return heal || list[0];
    var sk = offense[(e.castIndex || 0) % offense.length];
    e.castIndex = (e.castIndex || 0) + 1;
    return sk || offense[0];
  }

  function startEnemyCast(e, sk) {
    // 詠唱時間拉長到看得清楚「集氣 → 法陣 → 出手」的完整流程
    var castTime = Math.min(1.7, Math.max(0.7, num(sk.CastTime, 0.55) * 1.35));
    e.casting = { sk: sk, t: castTime, max: castTime };
    e.state = "special";
    e.stateT = castTime + 0.2;
    e.castGlow = 1;
    e.face = G.player.x >= e.x ? 1 : -1;
    var castColor = sk.Color || "#b78bff";
    pushCapped(G.fx, {
      type: "cast", x: e.x, y: e.y - 8, t: castTime, max: castTime,
      color: castColor, r: e.r + 12
    }, MAX_FX);
    // 技能名稱浮在怪物頭上：即使怪物很小、動作很快，也能一眼看出牠正在詠唱什麼
    pushCapped(G.floaters, {
      x: e.x, y: e.y - (e.visH || 64) - 12,
      text: "詠唱 · " + (sk.Name || "技能"), t: castTime + 0.35,
      color: castColor, size: 11
    }, MAX_FLOATERS);
    var el2 = String(sk.Element || e.element || "").toLowerCase();
    if (window.AUDIO) AUDIO.sfx("cast_" + (el2 || "arcane"));
  }

  function executeEnemyCast(e, sk) {
    if (window.AUDIO) AUDIO.sfx("ecast");
    var p = G.player;
    var ang = Math.atan2(p.y - e.y, p.x - e.x);
    var color = sk.Color || "#b78bff";
    var mult = num(sk.Percent, 0.7);
    if (mult > 3) mult /= 100;
    var dmg = e.atk * mult;
    var kind = sk.Kind;

    if (kind === "e_bolt") {
      addBullet(e.x, e.y - 26, ang, num(sk.Speed, 240), dmg, color, 7, { life: 4 });
    } else if (kind === "e_spread") {
      for (var i = -1; i <= 1; i++) {
        addBullet(e.x, e.y - 26, ang + i * 0.16, num(sk.Speed, 220), dmg * 0.8, color, 6, { life: 3.6 });
      }
    } else if (kind === "e_poison") {
      pushCapped(G.zones, {
        x: clamp(p.x + rand(-50, 50), 40, G.worldW - 40),
        y: clamp(p.y + rand(-50, 50), 40, G.worldH - 40),
        r: num(sk.Radius, 62), delay: 0.45, life: 4.2, max: 4.2,
        dps: dmg * 1.5, color: color, tick: 0, slow: 0.25
      }, MAX_ZONES);
    } else if (kind === "e_meteor") {
      pushCapped(G.zones, {
        x: clamp(p.x + rand(-70, 70), 40, G.worldW - 40),
        y: clamp(p.y + rand(-70, 70), 40, G.worldH - 40),
        r: num(sk.Radius, 58), delay: 0.8, life: 2.6, max: 2.6,
        dps: dmg * 2, color: color, meteor: true, tick: 0
      }, MAX_ZONES);
    } else if (kind === "e_heal") {
      // 小怪可以互相治療，但霸主不接受小怪治療，避免整場卡在回血循環
      var healAmt = e.maxhp * (e.isBoss ? 0.035 : 0.18);
      if (!e.isBoss || e.healLock <= 0) {
        e.hp = Math.min(e.maxhp, e.hp + healAmt);
        if (e.isBoss) e.healLock = 8;
        pushCapped(G.floaters, { x: e.x, y: e.y - 40, text: "+" + Math.round(healAmt), t: 0.8, color: "#8fffb0" }, MAX_FLOATERS);
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 12, max: 80, t: 0.4, color: "#8fffb0" });
      }
      for (var hi = 0; hi < G.enemies.length; hi++) {
        var he = G.enemies[hi];
        if (he !== e && !he.dying && !he.isBoss && dist2(he, e) < 190 * 190) {
          he.hp = Math.min(he.maxhp, he.hp + he.maxhp * 0.08);
        }
      }
    } else if (kind === "e_enrage") {
      e.atkBuff = 1.4;
      e.spdMul = 1.35;
      e.atkBuffT = 6;
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 14, max: 90, t: 0.5, color: "#ff6b6b" });
    } else if (kind === "e_charge") {
      e.dash = { ang: ang, t: 0.4, dur: 0.32, hit: false };
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 14, max: 100, t: 0.4, color: color });
    } else if (kind === "e_chain") {
      pushCapped(G.lasers, {
        x: e.x, y: e.y, ang: ang, warn: 0.45, active: 0.14, t: 0,
        len: 700, width: 18, dmg: dmg, color: color, hit: false
      }, 24);
    } else if (kind === "e_curse") {
      p.slowT = Math.max(p.slowT, 3);
      p.slowMul = Math.min(p.slowMul, 0.62);
      pushCapped(G.floaters, { x: p.x, y: p.y - 44, text: "緩速", t: 0.8, color: color }, MAX_FLOATERS);
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 14, max: 90, t: 0.4, color: color });
    } else if (kind === "e_shield") {
      e.shield = Math.max(e.shield, e.maxhp * 0.22);
      e.shieldT = 6;
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 12, max: 70, t: 0.4, color: "#9fd8ff" });
    } else if (kind === "e_nova") {
      var n = 8 + (e.elite ? 3 : 0);
      for (var ni = 0; ni < n; ni++) {
        addBullet(e.x, e.y - 24, (ni / n) * Math.PI * 2, 160, dmg * 0.7, color, 6, { life: 3.2 });
      }
    } else if (kind === "e_drain") {
      damagePlayer(dmg, color);
      e.hp = Math.min(e.maxhp, e.hp + e.maxhp * 0.1);
      G.fx.push({ type: "chain", pts: [{ x: e.x, y: e.y - 14 }, { x: p.x, y: p.y - 18 }], t: 0.25, max: 0.25, color: color });
    } else if (kind === "e_sand") {
      pushCapped(G.zones, {
        x: p.x, y: p.y, r: num(sk.Radius, 90), delay: 0.35, life: 3.5, max: 3.5,
        dps: dmg * 0.4, color: color, tick: 0, slow: 0.45
      }, MAX_ZONES);
    } else if (kind === "e_ice") {
      addBullet(e.x, e.y - 26, ang, 210, dmg, color, 8, { slow: 0.4, life: 3.5 });
    } else if (kind === "e_web") {
      pushCapped(G.zones, {
        x: clamp(p.x + rand(-40, 40), 40, G.worldW - 40),
        y: clamp(p.y + rand(-40, 40), 40, G.worldH - 40),
        r: num(sk.Radius, 100), delay: 0.3, life: 3.8, max: 3.8,
        dps: dmg * 0.3, color: color, tick: 0, slow: 0.35
      }, MAX_ZONES);
    } else if (kind === "e_summon") {
      if (G.enemies.length < MAX_ENEMIES - 6) {
        for (var si = 0; si < 2; si++) {
          var minion = spawnEnemy(e.id, Math.max(1, Math.round((G.level.Difficulty || 1) + 1)), false, "");
          if (!minion) break;
          var sa = Math.random() * Math.PI * 2;
          minion.x = clamp(e.x + Math.cos(sa) * 70, 40, G.worldW - 40);
          minion.y = clamp(e.y + Math.sin(sa) * 70, 40, G.worldH - 40);
        }
      }
    } else if (kind === "e_breath") {
      // 扇形吐息：近距離的錐形傷害，地面會留下短暫的灼燒帶
      var cone = num(sk.Radius, 96);
      var half = 0.55;
      var pd = Math.hypot(p.x - e.x, p.y - e.y);
      var pa = Math.atan2(p.y - e.y, p.x - e.x);
      var diff = Math.atan2(Math.sin(pa - ang), Math.cos(pa - ang));
      if (pd < num(sk.Range, 380) && Math.abs(diff) < half) damagePlayer(dmg, color, e);
      pushCapped(G.fx, {
        type: "flamewave", x: e.x, y: e.y - 20, ang: ang, r: 150,
        t: 0.34, max: 0.34, color: color
      }, MAX_FX);
      for (var bw = 0; bw < 3; bw++) {
        pushCapped(G.fx, {
          type: "spark", x: e.x + Math.cos(ang + rand(-0.35, 0.35)) * (60 + bw * 40),
          y: e.y - 20 + Math.sin(ang + rand(-0.35, 0.35)) * (24 + bw * 16),
          r: 20 + bw * 6, t: 0.3, max: 0.3, color: color
        }, MAX_FX);
      }
    } else if (kind === "e_quake") {
      // 震地：以自身為圓心的衝擊波，靠太近就會被震傷
      var qr = num(sk.Radius, 130);
      if (dist2(e, p) < qr * qr) damagePlayer(dmg, color, e);
      pushCapped(G.shockwaves, {
        x: e.x, y: e.y, r: 18, max: qr + 80, t: 0.55, maxT: 0.55,
        dmg: 0, color: color, hit: true
      }, 24);
      pushCapped(G.fx, { type: "ring", x: e.x, y: e.y, r: 20, max: qr + 80, t: 0.5, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "dust", x: e.x, y: e.y, r: qr * 0.9, t: 0.5, max: 0.5, color: "#d8c39a" }, MAX_FX);
    } else if (kind === "e_laser") {
      // 直線光束：先有預警線，之後才點亮，玩家可以横向閃避
      pushCapped(G.lasers, {
        x: e.x, y: e.y - 18, ang: ang, warn: 0.65, active: 0.22, t: 0,
        len: num(sk.Range, 680), width: num(sk.Width, 24), dmg: dmg, color: color, hit: false
      }, 24);
    } else if (kind === "e_orbit") {
      // 幽能球：慢速追蹤，繞著玩家逼近
      var on = 4 + (e.elite ? 2 : 0);
      for (var oi = 0; oi < on; oi++) {
        addBullet(e.x, e.y - 24, ang + (oi / on) * Math.PI * 2, 90, dmg * 0.55, color, 9,
          { life: 4.6, homing: 1.30 });
      }
      pushCapped(G.fx, { type: "ring", x: e.x, y: e.y - 18, r: 12, max: 90, t: 0.45, color: color }, MAX_FX);
    } else if (kind === "e_bomb") {
      // 拋擲爆彈：先落地預警，延遲後爆炸
      pushCapped(G.zones, {
        x: clamp(p.x + rand(-30, 30), 40, G.worldW - 40),
        y: clamp(p.y + rand(-30, 30), 40, G.worldH - 40),
        r: num(sk.Radius, 84), delay: 0.75, life: 0.4, max: 0.4,
        dps: dmg * 2.4, color: color, meteor: true, tick: 0
      }, MAX_ZONES);
      pushCapped(G.fx, { type: "spark", x: e.x, y: e.y - 30, r: 18, t: 0.28, max: 0.28, color: color }, MAX_FX);
    } else if (kind === "e_storm") {
      // 雷雨：在玩家周圍落下多道小雷擊
      var stn = 3 + (e.elite ? 2 : 0);
      for (var st = 0; st < stn; st++) {
        pushCapped(G.zones, {
          x: clamp(p.x + rand(-120, 120), 40, G.worldW - 40),
          y: clamp(p.y + rand(-120, 120), 40, G.worldH - 40),
          r: num(sk.Radius, 58), delay: 0.35 + st * 0.16, life: 0.3, max: 0.3,
          dps: dmg * 1.4, color: color, meteor: true, lightning: true, tick: 0
        }, MAX_ZONES);
      }
      pushCapped(G.fx, { type: "lightning", x: p.x, y: p.y, r: 20, t: 0.4, max: 0.4, color: color }, MAX_FX);
    }

    // 統一的施法爆發特效：讓小怪技能有明確的起手與元素辨識度
    if (kind !== "e_heal" && kind !== "e_shield" && kind !== "e_enrage") {
      pushCapped(G.fx, {
        type: "spark", x: e.x + Math.cos(ang) * 20, y: e.y - 26 + Math.sin(ang) * 10,
        r: 13, t: 0.24, max: 0.24, color: color
      }, MAX_FX);
      if (kind === "e_nova" || kind === "e_spread") {
        pushCapped(G.fx, { type: "ring", x: e.x, y: e.y - 8, r: e.r, max: e.r * 3.2, t: 0.3, color: color }, MAX_FX);
      }
    }
  }

  function spawnCastRing(e, color, dur) {
    pushCapped(G.fx, {
      type: "cast", x: e.x, y: e.y - 8, t: dur || 0.5, max: dur || 0.5,
      color: color || "#b78bff", r: e.r + 10
    }, MAX_FX);
  }

  function enemyDashStep(e, dt, p) {
    e.dash.t -= dt;
    if (e.dash.t > 0) {
      e.state = "special";
      return;
    }
    var spd = num(e.dash.spd, 520);
    e.x = clamp(e.x + Math.cos(e.dash.ang) * spd * dt, e.r, G.worldW - e.r);
    e.y = clamp(e.y + Math.sin(e.dash.ang) * spd * dt, e.r, G.worldH - e.r);
    e.state = "attack";
    e.stateT = 0.22;
    if (!e.dash.hit && dist2(e, p) < (e.r + p.r + 14) * (e.r + p.r + 14)) {
      e.dash.hit = true;
      damagePlayer(e.atk * 0.85, "#ffb15c", e);
      pushCapped(G.fx, { type: "slash", x: e.x, y: e.y - 10, r: e.r + 22, t: 0.18, color: "#ffd166" }, MAX_FX);
    }
    e.dash.dur -= dt;
    if (e.dash.dur <= 0) {
      e.dash = null;
      e.dashCd = rand(2.8, 5.2);
    }
  }

  function enemySteer(e, dx, dy, d, dt) {
    var nx = dx / (d || 1), ny = dy / (d || 1);
    var spd = e.spd * (e.spdMul || 1) * (e.slowT > 0 ? e.slowMul : 1);
    if (Math.abs(dx) > 4) e.face = dx > 0 ? 1 : -1;
    var ai = e.ai || "chaser";
    var vx = nx * spd, vy = ny * spd;
    var tang = e.strafe || 1;

    if (ai === "zigzag") {
      var wob = Math.sin(e.aiTimer * 4.2 + e.animPhase) * 0.9;
      vx = (nx - ny * wob) * spd;
      vy = (ny + nx * wob) * spd;
    } else if (ai === "circler") {
      var ring = e.preferred || 120;
      var radial = d > ring * 1.15 ? 0.95 : (d < ring * 0.72 ? -0.85 : 0.1);
      vx = (nx * radial - ny * tang * 0.85) * spd;
      vy = (ny * radial + nx * tang * 0.85) * spd;
    } else if (ai === "skirmisher" || ai === "support") {
      var pref = e.preferred || 260;
      var radial2 = d > pref + 45 ? 0.95 : (d < pref - 55 ? -0.95 : 0);
      var tang2 = radial2 === 0 ? 0.8 : 0.28;
      vx = (nx * radial2 - ny * tang * tang2) * spd;
      vy = (ny * radial2 + nx * tang * tang2) * spd;
    } else if (ai === "charger") {
      if (e.windup <= 0 && e.dashCd <= 0 && d < 430 && d > 80 && e.stunT <= 0) {
        e.windup = 0.45;
        e.state = "special";
        e.stateT = 0.5;
        e.dashCd = rand(3.4, 5.6);
        spawnCastRing(e, "#ffb15c", 0.45);
        return { vx: 0, vy: 0, moving: false };
      }
      vx = nx * spd * 0.72;
      vy = ny * spd * 0.72;
    } else if (ai === "brute") {
      vx = nx * spd * 0.82;
      vy = ny * spd * 0.82;
    }
    return { vx: vx, vy: vy, moving: true };
  }

  var ATK_LABELS = {
    slash: "斬擊", claw: "爪擊", combo: "連擊", spin: "旋擊", slam: "重擊",
    shockwave: "震波", pounce: "撲擊", sweep: "掃擊", sting: "刺擊", spit: "吐息"
  };

  function atkLabelFor(style) {
    return ATK_LABELS[style] || "攻擊";
  }

  function enemyMeleeFx(e, ang, phase, style) {
    style = style || e.atkStyle || "slash";
    var color = e.elite ? "#ffd166" : "#ffb15c";
    var hx = e.x + Math.cos(ang) * (e.r + 6);
    var hy = e.y - 8 + Math.sin(ang) * (e.r + 6);
    if (phase === "wind") {
      if (style === "slam" || style === "shockwave") {
        pushCapped(G.fx, { type: "tell", x: hx, y: hy, r: e.r + (style === "shockwave" ? 52 : 30), t: 0.3, max: 0.3, color: "#ff9b6a" }, MAX_FX);
      } else if (style === "spit") {
        pushCapped(G.fx, { type: "spark", x: e.x + Math.cos(ang) * 14, y: e.y - 26, r: 14, t: 0.28, max: 0.28, color: "#c9b3ff" }, MAX_FX);
      } else if (style === "pounce") {
        pushCapped(G.fx, { type: "tell", x: hx, y: hy, r: e.r + 24, t: 0.24, max: 0.24, color: "#ffd166" }, MAX_FX);
        pushCapped(G.fx, { type: "dust", x: e.x, y: e.y + 2, r: e.r * 0.9, t: 0.26, max: 0.26, color: "#d8c39a" }, MAX_FX);
      } else if (style === "sweep") {
        pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 26, t: 0.22, max: 0.22, color: hexA(color, 0.9) }, MAX_FX);
      } else {
        pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 20, t: 0.2, max: 0.2, color: hexA(color, 0.85) }, MAX_FX);
      }
      return;
    }
    if (style === "slam") {
      pushCapped(G.fx, { type: "ring", x: hx, y: hy + 6, r: 10, max: 66, t: 0.3, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "dust", x: hx, y: hy + 8, r: 42, t: 0.35, max: 0.35, color: "#d8c39a" }, MAX_FX);
    } else if (style === "shockwave") {
      pushCapped(G.fx, { type: "ring", x: e.x, y: e.y, r: 16, max: e.r + 96, t: 0.42, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "dust", x: e.x, y: e.y + 4, r: e.r + 52, t: 0.4, max: 0.4, color: "#d8c39a" }, MAX_FX);
      if (window.AUDIO) AUDIO.sfx("quake");
    } else if (style === "pounce") {
      pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 30, t: 0.18, color: "#ffe066" }, MAX_FX);
      pushCapped(G.fx, { type: "spark", x: hx, y: hy, r: 16, t: 0.2, max: 0.2, color: "#ffd166" }, MAX_FX);
    } else if (style === "sweep") {
      for (var sw = -2; sw <= 2; sw++) {
        pushCapped(G.fx, {
          type: "slash", x: hx + Math.cos(ang + sw * 0.32) * 12, y: hy + Math.sin(ang + sw * 0.32) * 8,
          r: e.r + 22, t: 0.18, color: sw === 0 ? "#fff0b8" : color
        }, MAX_FX);
      }
    } else if (style === "spin") {
      pushCapped(G.fx, { type: "ring", x: e.x, y: e.y - 8, r: 20, max: e.r + 58, t: 0.28, color: color }, MAX_FX);
      pushCapped(G.fx, { type: "slash", x: e.x, y: e.y - 8, r: e.r + 34, t: 0.2, color: "#fff0b8" }, MAX_FX);
    } else if (style === "sting") {
      pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 24, t: 0.16, color: "#ffe066" }, MAX_FX);
    } else if (style === "claw") {
      for (var ci = -1; ci <= 1; ci++) {
        pushCapped(G.fx, { type: "slash", x: hx + ci * 7, y: hy + ci * 3, r: e.r + 18, t: 0.18, color: color }, MAX_FX);
      }
    } else if (style === "combo") {
      pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 16, t: 0.15, color: "#ffd166" }, MAX_FX);
    } else if (style === "spit") {
      pushCapped(G.fx, { type: "spark", x: e.x + Math.cos(ang) * 18, y: e.y - 26, r: 20, t: 0.24, max: 0.24, color: "#c9b3ff" }, MAX_FX);
    } else {
      pushCapped(G.fx, { type: "slash", x: hx, y: hy, r: e.r + 20, t: 0.18, color: color }, MAX_FX);
    }
  }

  function enemyAtkReach(e) {
    var style = e.atkStyle || "slash";
    if (style === "spit") return 270;
    if (style === "shockwave") return 74;
    if (style === "pounce") return 72;
    if (style === "sweep") return 62;
    if (style === "slam") return 58;
    if (style === "spin") return 54;
    if (style === "combo") return 50;
    if (style === "claw") return 48;
    if (style === "sting") return 44;
    return 46;
  }

  // 攻擊起手 → 延遲命中，讓玩家看得到動作，也能靠走位躲開
  function startEnemyMelee(e, ang) {
    var style = e.atkStyle || "slash";
    var base = e.atk * (e.atkBuff || 1);
    var reach = enemyAtkReach(e);
    e.face = G.player.x >= e.x ? 1 : -1;
    // 動作長度對齊素材的攻擊幀數，不再固定 0.48 秒把整段動作壓縮掉。
    var atkAnim = (window.ART && ART.monsterAnimDuration) ? ART.monsterAnimDuration(e.mon, "attack") : 0;
    var windDur = Math.max(0.46, Math.min(0.95, (atkAnim || 0.55) * 0.95));
    e.state = "attack";
    e.stateT = style === "combo" ? windDur + 0.16 : windDur;
    // 讓 sprite 的攻擊動畫剛好在起手時間內播完（最後一格＝命中瞬間）
    e._animDur = e.stateT;
    // 依動作風格決定演出方向：斬擊往前衝、撲擊跳起、重擊下沉、施法則後仰
    e.swing = { t: 0, max: e.stateT, style: style, ang: ang };
    enemyMeleeFx(e, ang, "wind", style);
    // 精英／霸主與特殊攻擊顯示招式名，讓小怪不再只有「碰一下」的單調感。
    if (e.isBoss || e.elite || (style !== "slash" && Math.random() < 0.4)) {
      pushCapped(G.floaters, {
        x: e.x, y: e.y - (e.visH || 64) - 8,
        text: atkLabelFor(style), t: 0.55,
        color: e.isBoss ? e.bossColor : (e.elite ? "#ffd166" : "#ffcf9a"),
        size: e.isBoss ? 12 : 10
      }, MAX_FLOATERS);
    }
    if (window.AUDIO) AUDIO.sfx(style === "spit" ? "monster_cast" : (e.elite || e.isBoss ? "monster_attack_big" : "monster_attack"));

    if (style === "spit") {
      G.pendingHits.push({ e: e, t: 0.36, style: "spit", ang: ang, dmg: base * 0.9, range: 0 });
      e.atkCd = 1.9 + rand(0.3, 0.7);
      return;
    }
    if (style === "combo") {
      for (var ci = 0; ci < 3; ci++) {
        G.pendingHits.push({
          e: e, t: 0.16 + ci * 0.13, style: "combo", ang: ang + (ci - 1) * 0.18,
          dmg: base * 0.44, range: reach + 16
        });
      }
      e.atkCd = 1.8 + rand(0.25, 0.6);
      return;
    }
    if (style === "spin") {
      G.pendingHits.push({ e: e, t: 0.3, style: "spin", ang: ang, dmg: base * 1.15, range: reach + 26 });
      e.atkCd = 2.6 + rand(0.4, 0.9);
      return;
    }
    if (style === "shockwave") {
      G.pendingHits.push({ e: e, t: 0.42, style: "shockwave", ang: ang, dmg: base * 1.3, range: reach + 58 });
      e.atkCd = 2.8 + rand(0.5, 0.9);
      return;
    }
    if (style === "pounce") {
      G.pendingHits.push({ e: e, t: 0.3, style: "pounce", ang: ang, dmg: base * 1.2, range: reach + 26 });
      e.atkCd = 2.0 + rand(0.3, 0.7);
      return;
    }
    if (style === "sweep") {
      G.pendingHits.push({ e: e, t: 0.26, style: "sweep", ang: ang, dmg: base * 1.05, range: reach + 30 });
      e.atkCd = 1.9 + rand(0.3, 0.6);
      return;
    }
    var mult = style === "slam" ? 1.3 : (style === "sting" ? 0.95 : (style === "claw" ? 0.9 : 1));
    var delay = style === "slam" ? 0.32 : 0.2;
    G.pendingHits.push({
      e: e, t: delay, style: style, ang: ang,
      dmg: base * mult, range: reach + 18
    });
    e.atkCd = (e.elite ? 0.95 : 1.15) + rand(-0.12, 0.25);
  }

  function updatePendingHits(dt) {
    var p = G.player;
    for (var i = G.pendingHits.length - 1; i >= 0; i--) {
      var h = G.pendingHits[i];
      if (!h.e || h.e.dying || h.e.hp <= 0) { G.pendingHits.splice(i, 1); continue; }
      h.t -= dt;
      if (h.t > 0) continue;
      var e = h.e;
      if (h.style === "spit") {
        var sa = Math.atan2(p.y - e.y, p.x - e.x);
        addBullet(e.x, e.y - 30, sa, 280, h.dmg, "#c9b3ff", 8,
          { life: 3.4, slow: e.elite ? 0.25 : 0, homing: 0.12 });
        e.state = "special";
        e.stateT = 0.22;
      } else {
        var d = Math.hypot(p.x - e.x, p.y - e.y);
        if (d <= h.range) {
          damagePlayer(h.dmg, "#ff7b7b", e);
          if (G.over) { G.pendingHits.splice(i, 1); return; }
        }
      }
      enemyMeleeFx(e, h.ang, "hit", h.style);
      G.pendingHits.splice(i, 1);
    }
  }

  function updateEnemies(dt) {
    var p = G.player;
    for (var i = G.enemies.length - 1; i >= 0; i--) {
      var e = G.enemies[i];
      try {

      // 死亡動畫播完才移除
      if (e.dying) {
        e.dieT -= dt;
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        if (e.dieT <= 0) G.enemies.splice(i, 1);
        continue;
      }

      // 霸主詠唱時定身，讓前搖與集氣條清楚可見
      if (e.isBoss && e.bossCast) {
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        continue;
      }

      // 出生淡入與傳送門殘光
      if (e.spawnFade < 1) e.spawnFade = Math.min(1, e.spawnFade + dt * 3.6);
      if (e.spawnFxT > 0) e.spawnFxT -= dt;

      // 霸主衝撞由 updateBosses() 控制位移；小怪衝鋒在此處理
      if (e.dash) {
        if (!e.isBoss) enemyDashStep(e, dt, p);
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        continue;
      }

      // 狀態計時
      e.aiTimer += dt;
      if (e.dashCd > 0) e.dashCd -= dt;
      if (e.healLock > 0) e.healLock -= dt;
      if (e.slowT > 0) {
        e.slowT -= dt;
        if (e.slowT <= 0) { e.slowT = 0; e.slowMul = 1; }
      }
      if (e.stunT > 0) {
        e.stunT -= dt;
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        if (e.stunT > 0) continue;
      }
      if (e.shieldT > 0) {
        e.shieldT -= dt;
        if (e.shieldT <= 0) { e.shieldT = 0; e.shield = 0; }
      }
      if (e.atkBuffT > 0) {
        e.atkBuffT -= dt;
        if (e.atkBuffT <= 0) { e.atkBuffT = 0; e.atkBuff = 1; e.spdMul = 1; }
      }
      // 燃燒持續傷害
      if (e.burnT > 0) {
        e.burnT -= dt;
        e.hp -= e.burnDps * dt;
        if (Math.random() < dt * 7) {
          pushCapped(G.fx, { type: "spark", x: e.x + rand(-8, 8), y: e.y - 16 + rand(-10, 10), r: 9, t: 0.22, max: 0.22, color: "#ff8a3d" }, MAX_FX);
        }
        if (e.hp <= 0) { killEnemy(e); continue; }
      }
      // 中毒持續傷害
      if (e.venomT > 0) {
        e.venomT -= dt;
        e.hp -= e.venomDps * dt;
        if (Math.random() < dt * 5) {
          pushCapped(G.fx, { type: "spark", x: e.x + rand(-8, 8), y: e.y - 16 + rand(-10, 10), r: 8, t: 0.2, max: 0.2, color: "#8ee36a" }, MAX_FX);
        }
        if (e.hp <= 0) { killEnemy(e); continue; }
      }

      // 正在詠唱技能
      if (e.casting) {
        e.casting.t -= dt;
        if (e.stateT <= 0) { e.state = "special"; e.stateT = 0.3; }
        if (e.casting.t <= 0) {
          var castSk = e.casting.sk;
          e.casting = null;
          executeEnemyCast(e, castSk);
          e.state = "special";
          e.stateT = 0.3;
        }
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        continue;
      }

      var dx = p.x - e.x, dy = p.y - e.y;
      var d = Math.hypot(dx, dy) || 1;

      // 技能判定（近戰距離外也能施放）
      if (!e.isBoss && e.castSkills && e.castSkills.length && e.stunT <= 0) {
        var castRange = 0;
        for (var cs = 0; cs < e.castSkills.length; cs++) {
          castRange = Math.max(castRange, num(e.castSkills[cs].Range, 430));
        }
        if (d < Math.max(260, castRange)) {
          e.castCd -= dt;
          if (e.castCd <= 0) {
            var sk = pickEnemySkill(e);
            if (sk) {
              startEnemyCast(e, sk);
              e.castCd = Math.max(2.2, num(sk.CD, 4.5) + rand(0.6, 2.2));
              e.hitFlash = Math.max(0, e.hitFlash - dt);
              continue;
            }
          }
        }
      }

      // 衝鋒蓄力：停下腳步、亮起警示，之後高速撲向玩家
      if (e.windup > 0) {
        e.windup -= dt;
        if (e.windup <= 0) {
          e.dash = { ang: Math.atan2(dy, dx), t: 0.12, dur: 0.3, hit: false, spd: 540 };
        }
        if (e.stateT <= 0) { e.state = "special"; e.stateT = 0.2; }
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        continue;
      }

      var steer = enemySteer(e, dx, dy, d, dt);
      if (steer.moving) {
        e.x = clamp(e.x + steer.vx * dt, e.r, G.worldW - e.r);
        e.y = clamp(e.y + steer.vy * dt, e.r, G.worldH - e.r);
        if (e.stateT <= 0) e.state = "walk";
        // 走路時踢起地面塵土：配合素材的步行循環，讓「正在走」更明顯
        e.stepT = (e.stepT || 0) - dt;
        if (e.stepT <= 0) {
          e.stepT = Math.max(0.18, 0.46 - (e.spd || 90) / 900);
          if (d < 620) {
            pushCapped(G.fx, {
              type: "dust", x: e.x - (e.face || 1) * 4, y: e.y + 2,
              r: e.r * (0.7 + Math.random() * 0.5), t: 0.3, max: 0.3,
              color: e.isBoss ? "#e8c48a" : "#cfc3a8"
            }, MAX_FX);
            if (Math.random() < 0.22 && window.AUDIO) AUDIO.sfx("step");
          }
        }
      }
      // 地形效果：水域拖慢、熔岩灼燒、虛空侵蝕，讓 15 關地圖不只是換顏色
      e.terrainT = (e.terrainT || 0) - dt;
      if (e.terrainT <= 0) {
        e.terrainT = 0.28;
        var ep = poolAt(e.x, e.y);
        if (ep) {
          if (ep.kind === "water" || ep.kind === "oasis") {
            e.slowT = Math.max(e.slowT || 0, 0.5);
            e.slowMul = Math.min(e.slowMul || 1, 0.72);
          } else if (ep.kind === "lava") {
            e.burnT = Math.max(e.burnT || 0, 1.6);
            e.burnDps = Math.max(e.burnDps || 0, 1.4 + e.maxhp * 0.035);
          } else if (ep.kind === "void") {
            e.venomT = Math.max(e.venomT || 0, 1.6);
            e.venomDps = Math.max(e.venomDps || 0, 1.2 + e.maxhp * 0.03);
          }
        }
      }

      var atkReach = enemyAtkReach(e);
      if (d <= atkReach + p.r) {
        if (e.stateT <= 0) e.state = "idle";
        e.atkCd -= dt;
        if (e.atkCd <= 0) {
          var meleeAng = Math.atan2(dy, dx);
          startEnemyMelee(e, meleeAng);
          if (G.over) return;
        }
      }
      if (e.stateT > 0) {
        e.stateT -= dt;
        if (e.stateT <= 0) { e.stateT = 0; e.state = "idle"; }
      }
      e.hitFlash = Math.max(0, e.hitFlash - dt);
      } catch (err) {
        // 單一怪物狀態異常時隔離，避免整個戰鬥畫面卡死
        e.errCount = (e.errCount || 0) + 1;
        if (window.console && e.errCount <= 3) console.error("enemy update", e.name, err);
        if (e.errCount > 6) {
          G.enemies.splice(i, 1);
          G.bosses = G.bosses.filter(function (b) { return b !== e; });
          if (G.bossActive === e) G.bossActive = null;
        }
      }
    }
  }

  // ---------------------------------------------------------------- 動作展示
  // 只在 ?showcase=1 使用：讓每隻怪物依序播放六段動作，不做戰鬥判定。
  var SHOWCASE_STATES = [
    { state: "idle", dur: 1.5, label: "待機" },
    { state: "walk", dur: 1.8, label: "行走" },
    { state: "attack", dur: 0.62, label: "攻擊" },
    { state: "special", dur: 1.05, label: "施法" },
    { state: "hurt", dur: 0.5, label: "受傷" },
    { state: "die", dur: 1.5, label: "死亡" }
  ];

  function updateShowcase(dt) {
    G.showcaseT = (G.showcaseT || 0) + dt;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      e.spawnFade = 1;
      e.showStateT = (e.showStateT || 0) - dt;
      if (e.showStateT > 0) {
        if (e.state === "attack" || e.state === "special" || e.state === "hurt") {
          e.stateT = Math.max(0, e.stateT - dt);
        }
        if (e.state === "die") e.dieT = Math.max(0.36, (e.dieT || 1.4) - dt);
        continue;
      }
      e.showIdx = ((e.showIdx || 0) + 1) % SHOWCASE_STATES.length;
      var def = SHOWCASE_STATES[e.showIdx];
      e.state = def.state;
      e.stateT = def.state === "walk" ? 0 : def.dur;
      e.showStateT = def.dur;
      e.casting = def.state === "special" ? { sk: { Name: "元素魔法", Color: e.auraColor || "#b78bff" }, t: def.dur, max: def.dur } : null;
      if (def.state === "die") e.dieT = Math.max(1.2, e.dieLen || 1.2);
      else e.dieT = 0;
      pushCapped(G.floaters, {
        x: e.x, y: e.y - (e.visH || 64) - 10,
        text: def.label, t: 0.7, color: "#ffe9a8", size: 11
      }, MAX_FLOATERS);
    }
  }

  // ---------------------------------------------------------------- 地區機制
  function updateGimmick(dt) {
    var g = G.gimmick;
    if (!g || !g.def) return;
    var def = g.def;
    if (!def.Kind) return;
    g.timer -= dt;
    if (g.timer <= 2.6 && !g.warned) {
      g.warned = true;
      toast((def.Name || "地區異變") + " 即將發生！");
    }
    if (g.timer > 0) return;
    g.timer = Math.max(8, num(def.Interval, 20));
    g.warned = false;
    triggerGimmick(def);
  }

  function triggerGimmick(def) {
    var p = G.player;
    var color = def.Color || "#9fd8ff";
    var kind = def.Kind;
    var pw = 0.8 + num(G.level.Difficulty, 1) * 0.16;

    function zone(x, y, r, life, dps, slow, meteor) {
      pushCapped(G.zones, {
        x: clamp(x, 40, G.worldW - 40), y: clamp(y, 40, G.worldH - 40),
        r: r, delay: meteor ? 0.8 : 0, life: life, max: life,
        dps: dps, color: color, tick: 0, slow: slow || 0, meteor: !!meteor
      }, MAX_ZONES);
    }

    if (kind === "tide" || kind === "current") {
      for (var i = 0; i < 3; i++) zone(p.x + rand(-150, 150), p.y + rand(-150, 150), 90, 6, 9 * pw, 0.5, false);
      if (kind === "current") {
        p.x = clamp(p.x + rand(-90, 90) * pw, p.r, G.worldW - p.r);
        p.y = clamp(p.y + rand(-90, 90) * pw, p.r, G.worldH - p.r);
      }
    } else if (kind === "sand" || kind === "wind") {
      p.slowT = Math.max(p.slowT, 3);
      p.slowMul = Math.min(p.slowMul, 0.55);
      var wx = rand(-1, 1), wy = rand(-1, 1);
      p.x = clamp(p.x + wx * 120 * pw, p.r, G.worldW - p.r);
      p.y = clamp(p.y + wy * 120 * pw, p.r, G.worldH - p.r);
      if (kind === "sand") for (var s = 0; s < 2; s++) zone(p.x + rand(-90, 90), p.y + rand(-90, 90), 70, 4, 6 * pw, 0.45, false);
    } else if (kind === "spore" || kind === "poison") {
      for (var sp = 0; sp < 4; sp++) zone(p.x + rand(-170, 170), p.y + rand(-170, 170), 68, 5, 12 * pw, 0.2, false);
    } else if (kind === "vine" || kind === "root") {
      for (var v = 0; v < 2; v++) zone(p.x + rand(-80, 80), p.y + rand(-80, 80), 95, 4.5, 6 * pw, 0.3, false);
    } else if (kind === "blizzard" || kind === "ice") {
      p.slowT = Math.max(p.slowT, 2.5);
      p.slowMul = Math.min(p.slowMul, 0.7);
      for (var b = 0; b < 5; b++) zone(p.x + rand(-220, 220), p.y + rand(-220, 220), 54, 3.5, 8 * pw, 0.5, true);
    } else if (kind === "lava" || kind === "rockfall" || kind === "sun") {
      for (var m = 0; m < 6; m++) zone(p.x + rand(-230, 230), p.y + rand(-230, 230), 56, 3.4, 20 * pw, 0, true);
    } else if (kind === "soul") {
      for (var so = 0; so < 3; so++) {
        var sa = Math.random() * Math.PI * 2;
        var sx = clamp(p.x + Math.cos(sa) * 380, 30, G.worldW - 30);
        var sy = clamp(p.y + Math.sin(sa) * 380, 30, G.worldH - 30);
        addBullet(sx, sy, Math.atan2(p.y - sy, p.x - sx), 150, 10 * pw, color, 7,
          { homing: 0.7, life: 6 });
      }
    } else if (kind === "arcane") {
      var aa = Math.random() * Math.PI * 2;
      var ax = clamp(p.x + Math.cos(aa) * 240, 40, G.worldW - 40);
      var ay = clamp(p.y + Math.sin(aa) * 240, 40, G.worldH - 40);
      for (var an = 0; an < 12; an++) {
        addBullet(ax, ay - 20, (an / 12) * Math.PI * 2, 150, 9 * pw, color, 7, { life: 4 });
      }
      G.fx.push({ type: "ring", x: ax, y: ay, r: 16, max: 120, t: 0.4, color: color });
    } else if (kind === "beam") {
      var bx = G.scene && G.scene.arena ? G.scene.arena.x : G.worldW / 2;
      var by = G.scene && G.scene.arena ? G.scene.arena.y : G.worldH / 2;
      pushCapped(G.emitters, {
        kind: "beam", x: bx, y: by,
        t: 0, dur: 2.2, interval: 0.5, acc: 0, ang: Math.atan2(p.y - by, p.x - bx),
        step: 0.5, dmg: 11 * pw, color: color
      }, MAX_EMITTERS);
    } else if (kind === "moon") {
      for (var mo = 0; mo < G.enemies.length; mo++) {
        var me = G.enemies[mo];
        if (!me.dying && dist2(me, p) < 420 * 420) me.hp = Math.min(me.maxhp, me.hp + me.maxhp * 0.04);
      }
      for (var mt = 0; mt < 2; mt++) zone(p.x + rand(-120, 120), p.y + rand(-120, 120), 100, 5, 8 * pw, 0.5, false);
    } else {
      for (var gz = 0; gz < 3; gz++) zone(p.x + rand(-140, 140), p.y + rand(-140, 140), 70, 4, 10 * pw, 0.25, false);
    }
  }

  // ---------------------------------------------------------------- 地圖互動物件
  // 每一關在地圖上散佈可互動的寶箱／神龕／結晶／營火／圖騰。
  // 走到旁邊就會自動觸發，給玩家「在地圖上探索」的理由，而不是只顧著繞圈打怪。
  var INTERACT_TYPES = {
    chest:    { name: "寶箱",     color: "#ffd166", prompt: "開啟寶箱",   sfx: "treasure" },
    shrine:   { name: "祈願神龕", color: "#9fd8ff", prompt: "向神龕祈願", sfx: "shrine" },
    crystal:  { name: "魔力結晶", color: "#b78bff", prompt: "汲取魔力",   sfx: "powerup" },
    campfire: { name: "營火",     color: "#ff8a3d", prompt: "在營火休息", sfx: "campfire" },
    totem:    { name: "戰魂圖騰", color: "#ff9bd2", prompt: "喚醒圖騰",   sfx: "totem" }
  };

  function interactTypeForLevel(lv) {
    var t = String((lv && lv.Terrain) || "").toLowerCase();
    if (/volcano|lava/.test(t)) return "chest";
    if (/desert|sand/.test(t)) return "chest";
    if (/deepforest|forest|jungle/.test(t)) return "campfire";
    if (/graveyard|grave|tomb/.test(t)) return "totem";
    if (/snow|ice/.test(t)) return "crystal";
    if (/cave/.test(t)) return "crystal";
    if (/underwater/.test(t)) return "crystal";
    if (/coast|island/.test(t)) return "shrine";
    var k = String((lv && lv.Gimmick && lv.Gimmick.Kind) || "");
    if (/lava|sun|rockfall|sand/.test(k)) return "chest";
    if (/spore|poison|vine|root/.test(k)) return "campfire";
    if (/soul|moon/.test(k)) return "totem";
    if (/ice|blizzard|wind|arcane/.test(k)) return "crystal";
    return "shrine";
  }

  function safeInteractSpot(x, y) {
    var tries = 0;
    while (tries++ < 14) {
      var pool = poolAt(x, y);
      var bad = pool && (pool.kind === "water" || pool.kind === "lava" || pool.kind === "void" || pool.kind === "oasis");
      if (!bad && x > 70 && x < G.worldW - 70 && y > 90 && y < G.worldH - 70) return { x: x, y: y };
      x = clamp(x + rand(-150, 150), 70, G.worldW - 70);
      y = clamp(y + rand(-130, 130), 90, G.worldH - 90);
    }
    return { x: clamp(x, 70, G.worldW - 70), y: clamp(y, 90, G.worldH - 90) };
  }

  function spawnInteractable(type, x, y) {
    if (!G.interactables) G.interactables = [];
    var def = INTERACT_TYPES[type] || INTERACT_TYPES.chest;
    var pos = safeInteractSpot(x, y);
    var it = {
      type: type, def: def, x: pos.x, y: pos.y,
      r: 26, t: rand(0, 8), used: false, fade: 0, near: false
    };
    G.interactables.push(it);
    pushCapped(G.fx, { type: "ring", x: it.x, y: it.y - 4, r: 10, max: 58, t: 0.55, color: def.color }, MAX_FX);
    return it;
  }

  function buildInteractables(lv) {
    G.interactables = [];
    var main = interactTypeForLevel(lv || G.level);
    var types = [main, "chest", "shrine", main === "crystal" ? "campfire" : "crystal"];
    for (var i = 0; i < 4; i++) {
      var a = (i / 4) * Math.PI * 2 + rand(-0.38, 0.38);
      var rad = rand(210, 430);
      spawnInteractable(types[i % types.length], G.player.x + Math.cos(a) * rad, G.player.y + Math.sin(a) * rad);
    }
    G.interactSpawnT = rand(18, 28);
  }

  function activateInteractable(it) {
    if (it.used) return;
    var p = G.player;
    var def = it.def;
    it.used = true;
    it.fade = 0;
    var col = def.color;
    pushCapped(G.fx, { type: "ring", x: it.x, y: it.y - 8, r: 14, max: 140, t: 0.6, color: col }, MAX_FX);
    pushCapped(G.fx, { type: "spark", x: it.x, y: it.y - 18, r: 34, t: 0.42, max: 0.42, color: col }, MAX_FX);
    pushCapped(G.fx, { type: "flash", x: it.x, y: it.y, t: 0.24, max: 0.24, color: col }, MAX_FX);

    var msg = "";
    if (it.type === "chest") {
      var val = Math.max(6, p.nextExp * 0.3);
      for (var oi = 0; oi < 10; oi++) {
        G.orbs.push({ x: it.x + rand(-22, 22), y: it.y + rand(-18, 18), v: val / 10, r: 6 });
      }
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.12);
      p.mp = Math.min(p.maxmp, p.mp + p.maxmp * 0.3);
      p.ult = Math.min(p.ultMax, p.ult + 20);
      msg = "寶箱開啟：經驗、生命與終極充能！";
    } else if (it.type === "shrine") {
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.4);
      p.shield = Math.max(p.shield, p.maxhp * 0.2);
      p.shieldT = Math.max(p.shieldT || 0, 8);
      for (var s = 0; s < p.spells.length; s++) p.spells[s].cd = 0;
      msg = "神龕回應：生命大幅回復、護盾展開、魔法冷卻歸零！";
    } else if (it.type === "crystal") {
      p.spellPower *= 1.07;
      p.maxmp *= 1.06;
      p.mp = p.maxmp;
      p.mpRegen *= 1.06;
      msg = "魔力結晶：魔法傷害 +7%、最大魔力 +6%！";
    } else if (it.type === "campfire") {
      p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.28);
      p.mp = Math.min(p.maxmp, p.mp + p.maxmp * 0.4);
      p.hpRegen += 0.45;
      p.regenT = 6;
      p.regen = p.maxhp * 0.02;
      msg = "營火休息：生命與魔力回復，生命回復 +0.45／秒！";
    } else if (it.type === "totem") {
      var hit = 0;
      for (var i = G.enemies.length - 1; i >= 0; i--) {
        var e = G.enemies[i];
        if (e.dying) continue;
        if (dist2(e, it) < 460 * 460) {
          dealDamage(e, p.atk * 2.4, { noCrit: true });
          e.stunT = Math.max(e.stunT || 0, 0.7);
          hit++;
        }
      }
      pushCapped(G.shockwaves, { x: it.x, y: it.y, r: 20, max: 470, t: 0.5, maxT: 0.5, dmg: 0, color: col, hit: true }, 20);
      pushCapped(G.fx, { type: "lightning", x: it.x, y: it.y - 10, r: 80, t: 0.5, max: 0.5, color: col }, MAX_FX);
      msg = "戰魂圖騰：震懾 " + hit + " 名敵人！";
    }

    pushCapped(G.floaters, { x: it.x, y: it.y - 78, text: def.name + "！", t: 1.1, color: col, size: 14 }, MAX_FLOATERS);
    toast(msg);
    if (window.AUDIO) {
      if (def.sfx) AUDIO.sfx(def.sfx);
      AUDIO.sfx("levelup2");
    }
  }

  function updateInteractables(dt) {
    if (!G.interactables) G.interactables = [];
    var p = G.player;
    for (var i = G.interactables.length - 1; i >= 0; i--) {
      var it = G.interactables[i];
      it.t += dt;
      if (it.used) {
        it.fade += dt;
        if (it.fade > 0.9) G.interactables.splice(i, 1);
        continue;
      }
      var d = Math.hypot(it.x - p.x, it.y - p.y);
      it.near = d < 150;
      if (d < p.r + it.r) activateInteractable(it);
    }
    // 戰鬥中定期補充新的互動物件，讓地圖一直有東西可以追
    var active = 0;
    for (var ai = 0; ai < G.interactables.length; ai++) if (!G.interactables[ai].used) active++;
    if (active < 3 && G.roundActive) {
      G.interactSpawnT = num(G.interactSpawnT, 20) - dt;
      if (G.interactSpawnT <= 0) {
        G.interactSpawnT = rand(17, 28);
        var main = interactTypeForLevel(G.level);
        var pool = ["chest", "shrine", "crystal", "campfire", "totem", main];
        var a = Math.random() * Math.PI * 2;
        var rad = rand(280, 470);
        spawnInteractable(pool[Math.floor(Math.random() * pool.length)],
          p.x + Math.cos(a) * rad, p.y + Math.sin(a) * rad);
        pushCapped(G.floaters, { x: p.x, y: p.y - 62, text: "附近出現了互動物件！", t: 1.2, color: "#ffe9a8", size: 12 }, MAX_FLOATERS);
        if (window.AUDIO) AUDIO.sfx("portal");
      }
    }
  }

  function drawInteractable(it, sx, sy) {
    if (!it || !it.def) return;
    var t = G.time + it.t;
    var col = it.def.color;
    var pulse = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.save();
    if (it.used) ctx.globalAlpha = Math.max(0, 1 - it.fade / 0.9);
    // 地面光暈與提示圈
    var glow = ctx.createRadialGradient(sx, sy - 4, 2, sx, sy - 4, 56);
    glow.addColorStop(0, hexA(col, 0.34 + pulse * 0.15));
    glow.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.ellipse(sx, sy - 2, 54, 26, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = hexA(col, 0.45 + pulse * 0.3);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(sx, sy - 2, 28 + pulse * 6, 12 + pulse * 3, 0, 0, Math.PI * 2); ctx.stroke();

    if (it.type === "shrine" || it.type === "crystal") {
      if (window.ART && ART.drawProp) {
        ART.drawProp(ctx, {
          type: "landmark",
          kind: it.type === "shrine" ? "shrine" : "crystal",
          tint: col, scale: 0.72, flip: false
        }, sx, sy);
      }
    } else if (it.type === "chest") {
      ctx.translate(sx, sy);
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.beginPath(); ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#6b3f1f";
      ctx.fillRect(-19, -20, 38, 21);
      ctx.fillStyle = "#8e5a2e";
      ctx.fillRect(-19, -20, 38, 7);
      ctx.fillStyle = "#c9a227";
      ctx.fillRect(-19, -21, 38, 3);
      ctx.fillRect(-3, -21, 6, 22);
      ctx.fillStyle = "#ffe066";
      ctx.fillRect(-4, -13, 8, 6);
      ctx.fillStyle = "rgba(255,240,180,0.28)";
      ctx.fillRect(-19, -20, 38, 3);
      ctx.strokeStyle = "#3d2411";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-19, -20, 38, 21);
      ctx.restore();
      ctx.save();
      if (it.used) ctx.globalAlpha = Math.max(0, 1 - it.fade / 0.9);
    } else if (it.type === "campfire") {
      ctx.translate(sx, sy);
      ctx.strokeStyle = "#6b4a2a";
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(-15, -2); ctx.lineTo(13, -12); ctx.moveTo(-13, -12); ctx.lineTo(15, -2); ctx.stroke();
      var fh = 30 + pulse * 10;
      var fg = ctx.createRadialGradient(0, -8, 2, 0, -8, fh);
      fg.addColorStop(0, "rgba(255,246,200,0.95)");
      fg.addColorStop(0.45, "rgba(255,150,50,0.85)");
      fg.addColorStop(1, "rgba(255,80,20,0)");
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.moveTo(0, -fh - 8);
      ctx.quadraticCurveTo(18, -18, 0, -4);
      ctx.quadraticCurveTo(-18, -18, 0, -fh - 8);
      ctx.fill();
      ctx.restore();
      ctx.save();
      if (it.used) ctx.globalAlpha = Math.max(0, 1 - it.fade / 0.9);
    } else if (it.type === "totem") {
      ctx.translate(sx, sy);
      ctx.fillStyle = "#5d5570";
      ctx.beginPath(); ctx.ellipse(0, -2, 24, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#7b7294";
      ctx.fillRect(-17, -14, 34, 13);
      ctx.fillStyle = "#6a6285";
      ctx.fillRect(-12, -27, 24, 14);
      ctx.fillStyle = "#8a80a8";
      ctx.fillRect(-8, -39, 16, 13);
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(0, -33, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = hexA(col, 0.7);
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-18, -52); ctx.lineTo(0, -42); ctx.lineTo(18, -52); ctx.stroke();
      ctx.restore();
      ctx.save();
      if (it.used) ctx.globalAlpha = Math.max(0, 1 - it.fade / 0.9);
    }

    // 名稱與互動提示
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.72)";
    ctx.fillStyle = col;
    ctx.strokeText(it.def.name, sx, sy - 74);
    ctx.fillText(it.def.name, sx, sy - 74);
    if (it.near && !it.used) {
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#fff6d8";
      var bob = Math.sin(t * 5) * 2;
      ctx.strokeText(it.def.prompt, sx, sy - 58 + bob);
      ctx.fillText(it.def.prompt, sx, sy - 58 + bob);
    }
    ctx.restore();
  }

  function countAliveEnemies() {
    var alive = 0, bossAlive = 0, bossDying = 0;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (e.dying) { if (e.isBoss) bossDying++; continue; }
      if (e.isBoss) bossAlive++; else alive++;
    }
    return { alive: alive, bossAlive: bossAlive, bossDying: bossDying };
  }

  function roundEnemyPool(rd) {
    var poolKey = G.roundIndex + "|" + (G.levelName || "");
    if (G._poolKey === poolKey && G._pool) return G._pool;
    var ids = [];
    var seen = {};
    function add(id) {
      id = num(id, 0);
      if (!id || seen[id]) return;
      seen[id] = 1;
      ids.push(id);
    }
    (rd.EnemyIDs || []).forEach(add);
    (rd.ExtraDisturbEnemyIDs || []).forEach(add);
    // 從整關怪物池再抽一些不同種類，讓同一波不會永遠只有那幾種怪
    (G.level.MonsterIDs || []).forEach(function (art) {
      add(enemyIdByArt(art));
    });
    G._poolKey = poolKey;
    G._pool = ids;
    return ids;
  }

  function updateWaves(dt) {
    if (G.over) return;
    var p = G.player;
    var rd = (G.level.RoundInfos || [])[G.roundIndex];
    if (!rd) return;

    // 等待殘存怪物被清光後再進下一波
    if (!G.roundActive) {
      if (G.roundWait) {
        var waitState = countAliveEnemies();
        if (!G.spawnQueue.length && waitState.alive === 0 && waitState.bossAlive === 0) {
          G.roundWait = false;
          nextRound();
        }
      }
      return;
    }

    var bosses = rd.BossInfos || [];
    var infinite = num(rd.Duration, 0) < 0;
    var difficulty = num(G.level.Difficulty, 1);
    var bossRound = bosses.length > 0;
    // 霸主還活著時才持續補小怪；霸主倒下後停止增援，讓玩家把殘兵清完。
    var liveBossNow = false;
    for (var lb = 0; lb < G.bosses.length; lb++) {
      if (G.bosses[lb] && !G.bosses[lb].dying) { liveBossNow = true; break; }
    }

    // 場上同時存活上限：避免一次把整波倒出來，讓戰鬥節奏保持連續。
    // 上限提高後，清掉一批就會立刻補上，畫面不會空掉。
    var fieldMax = bossRound
      ? Math.min(MAX_ENEMIES - 2, 26 + Math.floor(difficulty * 1.5))
      : Math.min(MAX_ENEMIES - 2, 30 + Math.floor(difficulty * 2.4));

    // 先處理這一波原有的生成佇列（場上還有空間才繼續出）
    var fieldNow = countAliveEnemies();
    var fieldUsed = fieldNow.alive + fieldNow.bossAlive;

    // 擊殺增援：每殺一隻就排一位，這裡立刻補進場，清場後不會出現空窗。
    if (G.reinforcePending > 0 && fieldUsed < fieldMax) {
      var rinPool = roundEnemyPool(rd);
      while (G.reinforcePending > 0 && fieldUsed < fieldMax && rinPool.length) {
        var rinId = rinPool[Math.floor(Math.random() * rinPool.length)];
        var rinElite = difficulty >= 5 && Math.random() < 0.02 + difficulty * 0.003;
        if (!spawnEnemy(rinId, num(rd.Level, 1), false, "", null, rinElite)) break;
        G.reinforcePending--;
        fieldUsed++;
      }
      if (G.reinforcePending > 0 && fieldUsed >= fieldMax) G.reinforcePending = 0;
    }
    if (G.spawnQueue.length && fieldUsed < fieldMax) {
      G.spawnTimer -= dt;
      if (G.spawnTimer <= 0) {
        G.spawnTimer = Math.max(0.12, 0.26 - difficulty * 0.008);
        var batch = 1 + Math.floor(difficulty / 6);
        for (var bi = 0; bi < batch && G.spawnQueue.length && fieldUsed < fieldMax; bi++) {
          var s = G.spawnQueue[0];
          var spawned = spawnEnemy(s.enemyId, s.level, false, "", null, !!s.elite);
          if (!spawned) break;
          G.spawnQueue.shift();
          fieldUsed++;
        }
      }
    }

    // 普通波在時間結束前會持續補充；霸主波只在霸主存活時補怪。
    // 怪物死掉就立刻從本關怪物池補位，不會清空後站著等下一波。
    var canTrickle = bossRound ? liveBossNow : (G.roundTimer > 0.25);

    if (canTrickle) {
      var state = countAliveEnemies();
      var targetAlive = bossRound
        ? Math.min(fieldMax - 6, 11 + Math.floor(difficulty * 1.4) + loopCount * 2)
        : Math.min(fieldMax - 2, 19 + Math.floor(difficulty * 2.1) + loopCount * 3);
      var supply = state.alive + G.spawnQueue.length;
      if (supply < targetAlive) {
        G.trickleT -= dt;
        if (G.trickleT <= 0) {
          var pool = roundEnemyPool(rd);
          var spawnN = Math.min(targetAlive - supply, 1 + Math.floor(Math.random() * 2) + (difficulty >= 8 ? 1 : 0));
          for (var ti = 0; ti < spawnN; ti++) {
            if (!pool.length) break;
            var tid = pool[Math.floor(Math.random() * pool.length)];
            var isElite = difficulty >= 4 && Math.random() < 0.035 + difficulty * 0.004;
            var tlv = num(rd.Level, 1) + (Math.random() < 0.18 ? 1 : 0);
            if (!spawnEnemy(tid, tlv, false, "", null, isElite)) break;
          }
          G.trickleT = Math.max(0.14, (bossRound ? 1.15 : 0.55) - difficulty * 0.025) * rand(0.72, 1.1);
        }
      } else {
        G.trickleT = Math.max(G.trickleT, 0.25);
      }

      // 怪群來襲：每隔一段時間在玩家四周一次衝出一小群，讓畫面有明顯的節奏起伏
      G.packT = num(G.packT, 9) - dt;
      if (G.packT <= 0) {
        var packPool = roundEnemyPool(rd);
        var packSize = Math.min(fieldMax - supply, 3 + Math.floor(difficulty / 3) + Math.floor(Math.random() * 3));
        if (packPool.length && packSize > 0) {
          var baseAng = Math.random() * Math.PI * 2;
          var packId = packPool[Math.floor(Math.random() * packPool.length)];
          for (var pi = 0; pi < packSize; pi++) {
            var pa2 = baseAng + (pi / packSize) * Math.PI * 2 * 0.7;
            var pr2 = rand(240, 360);
            var pe = spawnEnemy(packId, num(rd.Level, 1), false, "", null, false);
            if (!pe) break;
            pe.x = clamp(p.x + Math.cos(pa2) * pr2, 40, G.worldW - 40);
            pe.y = clamp(p.y + Math.sin(pa2) * pr2, 40, G.worldH - 40);
            pushCapped(G.fx, { type: "portal", x: pe.x, y: pe.y, r: pe.r + 10, t: 0.55, max: 0.55, color: pe.auraColor || "#b78bff" }, MAX_FX);
          }
          if (window.AUDIO) AUDIO.sfx("portal");
          // 從玩家四周出現時補一句提示，讓「怪物源源不絕」的感覺更明確
          pushCapped(G.floaters, { x: p.x, y: p.y - 60, text: "怪物湧現！", t: 1.0, color: "#ffd166", size: 14 }, MAX_FLOATERS);
        }
        G.packT = rand(8, 14) - Math.min(5, difficulty * 0.32);
      }
    }

    var now = countAliveEnemies();
    if (bossRound) {
      // 霸主波：霸主與殘兵全部清空就進下一關（不會因為一直補兵而卡死）
      if (!G.spawnQueue.length && now.bossAlive === 0 && now.bossDying === 0 && now.alive === 0) {
        G.roundActive = false;
        G.roundWait = false;
        nextRound();
      }
      return;
    }

    if (infinite) return;

    G.roundTimer -= dt;
    if (G.roundTimer <= 0) {
      G.roundTimer = 0;
      G.roundActive = false;
      // 時間到後不再保留未生成的增援，避免殘留佇列造成卡關
      G.spawnQueue.length = 0;
      if (now.alive === 0) nextRound();
      else G.roundWait = true;
    }
  }

  function endGame(victory) {
    if (G.over) return;
    G.over = true;
    G.victory = victory;
    if (window.AUDIO) {
      AUDIO.stopBgm(1500);
      if (AUDIO.stopAmbient) AUDIO.stopAmbient(1200);
      if (victory) AUDIO.sfx("victory");
    }

    var titleEl = document.getElementById("gameOverTitle");
    var statsEl = document.getElementById("gameOverStats");
    var retry = document.getElementById("retryBtn");
    var last = CONFIG.Levels.length - 1;
    var base = "存活 " + formatTime(G.time) + " · 等級 " + G.player.level + " · 擊殺 " + G.kills;

    if (!victory) {
      G.nextAction = "retry";
      titleEl.textContent = "遊戲結束";
      retry.textContent = "再挑戰一次";
      statsEl.textContent = base;
    } else if (selectedLevel < last) {
      G.nextAction = "next";
      var nx = CONFIG.Levels[selectedLevel + 1];
      titleEl.textContent = "「" + G.levelName + "」制霸！";
      retry.textContent = "前進 " + (nx ? nx.Name : "下一關");
      statsEl.textContent = base + " · 下一關：" + (nx ? nx.Name : "");
    } else {
      G.nextAction = "loop";
      titleEl.textContent = "全 " + CONFIG.Levels.length + " 地區制霸！";
      retry.textContent = "進入第 " + (loopCount + 2) + " 周目";
      statsEl.textContent = "第 " + (loopCount + 1) + " 周目完成 · " + base +
        " · 下一輪敵人強度 +" + Math.round((loopCount + 1) * 55) + "%";
    }

    gameOverEl.classList.remove("hidden");
    hud.classList.add("hidden");
  }

  function formatTime(t) {
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  var toastEl = document.getElementById("toast");
  function toast(text) {
    if (!toastEl) return;
    var d = document.createElement("div");
    d.textContent = text;
    toastEl.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 1700);
  }

  var stageIntroTimer = 0;
  function showStageIntro(lv) {
    var el = document.getElementById("stageIntro");
    if (!el) return;
    if (((window.location && window.location.search) || "").indexOf("boss=1") >= 0) return;
    var kick = document.getElementById("siKicker");
    var name = document.getElementById("siName");
    var desc = document.getElementById("siDesc");
    var boss = document.getElementById("siBoss");
    if (kick) kick.textContent = "STAGE " + String(num(lv.Difficulty, 1)).padStart(2, "0");
    if (name) name.textContent = lv.Name || "";
    if (desc) desc.textContent = lv.Desc || "";
    if (boss) {
      boss.textContent = lv.BossTitle
        ? "霸主　" + lv.BossTitle + "　" + (lv.BossNames || []).join("、")
        : "";
      boss.style.color = lv.BossColor || "#ffd76a";
    }
    el.classList.remove("hidden");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    clearTimeout(stageIntroTimer);
    stageIntroTimer = setTimeout(function () { el.classList.add("hidden"); }, 3000);
  }

  var bossIntroTimer = 0;
  function showBossIntro(info, twin) {
    var el = document.getElementById("bossIntro");
    if (!el) return;
    var name = document.getElementById("biName");
    var title = document.getElementById("biTitle");
    var lore = document.getElementById("biLore");
    var kick = document.getElementById("biKicker");
    if (kick) kick.textContent = twin ? "TWIN BOSS" : "BOSS";
    if (name) {
      name.textContent = (info.Name || "霸主") + (twin ? " × 2" : "");
      name.style.color = info.Color || "#ffd76a";
    }
    if (title) title.textContent = info.Title || "";
    if (lore) lore.textContent = info.Mechanic && info.Mechanic.length ? "招式：" + info.Mechanic.map(abilityName).join(" · ") : "";
    el.classList.remove("hidden");
    if (window.AUDIO) AUDIO.sfx("boss");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    clearTimeout(bossIntroTimer);
    bossIntroTimer = setTimeout(function () { el.classList.add("hidden"); }, 3400);
  }

  function abilityName(k) {
    return {
      nova: "環形彈幕", volley: "追蹤齊射", charge: "衝撞", summon: "召喚援軍",
      pool: "腐蝕地面", meteor: "落石", laser: "直線光束", shockwave: "衝擊波",
      heal: "月之治療", teleport: "瞬移", spiral: "螺旋彈幕", rain: "天降彈雨",
      quake: "連續震地", root: "束縛之根", beam: "旋轉光束", frost: "凍結吐息"
    }[k] || k;
  }

  // ---------------------------------------------------------------- render
  function toScreen(x, y) {
    return { x: x - G.cam.x + W / 2, y: y - G.cam.y + H / 2 };
  }

  function drawBackground() {
    ART.drawGround(ctx, G.scene, G.cam, W, H, G.time);
  }

  // 樹木、怪物、角色依 y 排序後由後往前畫，重疊才正確
  function drawEntities() {
    var p = G.player;
    var items = [];
    var i, s;

    if (G.scene && G.scene.props) {
      var props = G.scene.props;
      for (i = 0; i < props.length; i++) {
        var pr = props[i];
        if (pr.x < G.cam.x - W / 2 - 200 || pr.x > G.cam.x + W / 2 + 200) continue;
        if (pr.y < G.cam.y - H / 2 - 320 || pr.y > G.cam.y + H / 2 + 200) continue;
        s = toScreen(pr.x, pr.y);
        items.push({ d: pr.y, kind: 0, o: pr, sx: s.x, sy: s.y });
      }
    }

    for (i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (e.x < G.cam.x - W / 2 - 150 || e.x > G.cam.x + W / 2 + 150) continue;
      if (e.y < G.cam.y - H / 2 - 150 || e.y > G.cam.y + H / 2 + 150) continue;
      s = toScreen(e.x, e.y);
      items.push({ d: e.y, kind: 1, o: e, sx: s.x, sy: s.y });
    }

    if (G.interactables) {
      for (i = 0; i < G.interactables.length; i++) {
        var iv = G.interactables[i];
        if (iv.x < G.cam.x - W / 2 - 120 || iv.x > G.cam.x + W / 2 + 120) continue;
        if (iv.y < G.cam.y - H / 2 - 120 || iv.y > G.cam.y + H / 2 + 120) continue;
        s = toScreen(iv.x, iv.y);
        items.push({ d: iv.y, kind: 3, o: iv, sx: s.x, sy: s.y });
      }
    }

    s = toScreen(p.x, p.y);
    items.push({ d: p.y, kind: 2, o: p, sx: s.x, sy: s.y });

    items.sort(function (a, b) { return a.d - b.d; });

    for (i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.kind === 0) {
        ART.drawProp(ctx, it.o, it.sx, it.sy);
      } else if (it.kind === 1) {
        drawOneEnemy(it.o, it.sx, it.sy);
      } else if (it.kind === 3) {
        drawInteractable(it.o, it.sx, it.sy);
      } else {
        drawOnePlayer(it.o, it.sx, it.sy);
      }
    }
  }

  function drawOnePlayer(p, sx, sy) {
    // 玩家腳下的金色圓環：怪物一多時也能立刻找到自己
    ctx.save();
    ctx.globalAlpha = 0.75 + 0.15 * Math.sin(G.time * 3.2);
    ctx.strokeStyle = p.hp / p.maxhp < 0.3 ? "#ff8a7a" : "#ffe28a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(sx, sy - 2, 27, 11, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ART.drawPlayer(ctx, p, sx, sy, G.time);

    var sc = p.artScale || 1.15;
    var bw = 56, hpr = clamp(p.hp / p.maxhp, 0, 1);
    var by = sy - 104 * sc;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(sx - bw / 2, by, bw, 5);
    ctx.fillStyle = "#6ee7a8";
    ctx.fillRect(sx - bw / 2, by, bw * hpr, 5);

    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(240,246,255,0.95)";
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.lineWidth = 3;
    var label = G.playerName + " Lv." + p.level;
    ctx.strokeText(label, sx, by - 6);
    ctx.fillText(label, sx, by - 6);
  }

  function drawOneEnemy(e, sx, sy) {
    // 怪物尺寸主要由 art.js 依素材高度換算，這裡只保留很小的精英／霸主加成，
    // 避免放大兩次造成巨獸遮住整個畫面。
    var scaleMul = e.isBoss ? 1.0 : (e.elite ? 1.06 : 1);
    if (e.isBoss || e.elite) {
      var auraColor = e.isBoss ? e.bossColor : "#ffd166";
      var aura = e.isBoss
        ? (e.phase === 3 ? 0.65 : (e.phase === 2 ? 0.5 : 0.3)) + 0.2 * Math.sin(G.time * 6)
        : 0.22 + 0.10 * Math.sin(G.time * 3 + e.x * 0.02);
      var ag = ctx.createRadialGradient(sx, sy - 6, 8, sx, sy - 6, e.r * 3.4);
      ag.addColorStop(0, hexA(auraColor, aura * 0.7));
      ag.addColorStop(1, hexA(auraColor, 0));
      ctx.save();
      ctx.fillStyle = ag;
      ctx.beginPath();
      ctx.ellipse(sx, sy - 2, e.r * 3.4, e.r * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (e.shield > 0) {
      ctx.save();
      ctx.strokeStyle = "rgba(159,216,255," + (0.45 + 0.2 * Math.sin(G.time * 6)) + ")";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(sx, sy - (e.visH || 50) * 0.45, e.r * 1.9, (e.visH || 50) * 0.62, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 元素光環：每隻小怪腳下都有對應屬性的微光，讓招式顏色與怪物一致
    if (!e.isBoss && e.auraColor && !e.dying) {
      var au = 0.10 + 0.05 * Math.sin(G.time * 3.6 + e.x * 0.03);
      var ag2 = ctx.createRadialGradient(sx, sy - 4, 2, sx, sy - 4, e.r * 2.6);
      ag2.addColorStop(0, hexA(e.auraColor, au * 1.5));
      ag2.addColorStop(1, hexA(e.auraColor, 0));
      ctx.save();
      ctx.fillStyle = ag2;
      ctx.beginPath();
      ctx.ellipse(sx, sy - 2, e.r * 2.6, e.r * 1.15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    try {
      ART.drawEnemy(ctx, e, sx, sy, G.time, scaleMul);
    } catch (err) {
      // 單一怪物素材異常時退回程序繪製，不讓整個戰鬥卡死
      e.mon = null;
      e.drawError = true;
    }

    // 受緩速影響時加一層冰藍色調
    if (e.slowT > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = "#8fd8ff";
      ctx.beginPath();
      ctx.ellipse(sx, sy - (e.visH || 50) * 0.45, (e.visW || 40) * 0.55, (e.visH || 50) * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (e.stunT > 0) {
      ctx.save();
      ctx.fillStyle = "#ffe066";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✦ ✦", sx, sy - (e.visH || 50) - 16);
      ctx.restore();
    }

    var top = sy - (e.visH || (e.isBoss ? 118 : 68));
    var w = e.isBoss ? 96 : (e.elite ? clamp((e.visW || 46) * 0.9, 40, 74) : clamp((e.visW || 46) * 0.8, 32, 62));
    var hpr = clamp(e.hp / e.maxhp, 0, 1);
    var barY = top - 8;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(sx - w / 2, barY, w, 4);
    ctx.fillStyle = e.elite ? "#ffd166" : (hpr > 0.5 ? "#6ee7a8" : (hpr > 0.22 ? "#ffd166" : "#ff6b6b"));
    ctx.fillRect(sx - w / 2, barY, w * hpr, 4);

    // 詠唱讀條
    if (e.casting) {
      var cp = 1 - clamp(e.casting.t / e.casting.max, 0, 1);
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(sx - w / 2, barY - 7, w, 3);
      ctx.fillStyle = (e.casting.sk && e.casting.sk.Color) || "#b78bff";
      ctx.fillRect(sx - w / 2, barY - 7, w * cp, 3);
    }

    // 霸主技能前搖：血條下方顯示招式名稱與集氣進度
    if (e.bossCast) {
      var bcp = 1 - clamp(e.bossCast.t / e.bossCast.max, 0, 1);
      var bcw = Math.max(w, 110);
      var bcy = barY + 8;
      ctx.fillStyle = "rgba(0,0,0,0.68)";
      ctx.fillRect(sx - bcw / 2, bcy, bcw, 6);
      ctx.fillStyle = e.bossCast.color || e.bossColor;
      ctx.fillRect(sx - bcw / 2, bcy, bcw * bcp, 6);
      ctx.save();
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0,0,0,0.75)";
      ctx.fillStyle = "#fff4d8";
      ctx.strokeText("詠唱 · " + e.bossCast.name, sx, bcy + 20);
      ctx.fillText("詠唱 · " + e.bossCast.name, sx, bcy + 20);
      ctx.restore();
    }

    if (e.isBoss) {
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffd9a8";
      ctx.fillText(e.name + " · " + Math.ceil(hpr * 100) + "%", sx, barY - 6);
    } else if (e.elite) {
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffd166";
      ctx.fillText("精英", sx, barY - 6);
    }

    // 出手時在頭頂標示招式名稱：即使怪物很小、動作很快，也能看出牠正在攻擊
    if (!e.dying && e.state === "attack" && !e.isBoss) {
      var pd = Math.hypot(e.x - G.player.x, e.y - G.player.y);
      if (pd < 400) {
        var labelY = barY - 8 - (e.elite ? 12 : 0);
        ctx.save();
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(0,0,0,0.72)";
        ctx.fillStyle = e.elite ? "#ffe066" : "#ffd9a8";
        var atxt = atkLabelFor(e.atkStyle);
        ctx.strokeText(atxt, sx, labelY);
        ctx.fillText(atxt, sx, labelY);
        ctx.restore();
      }
    }
  }

  function drawZones() {
    for (var i = 0; i < G.zones.length; i++) {
      var z = G.zones[i];
      var s = toScreen(z.x, z.y);
      var warn = z.delay > 0;
      ctx.save();
      ctx.translate(s.x, s.y);
      if (warn) {
        ctx.strokeStyle = z.color;
        ctx.globalAlpha = 0.5 + 0.4 * Math.abs(Math.sin(G.time * 12));
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath(); ctx.arc(0, 0, z.r, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = z.color;
        ctx.beginPath(); ctx.arc(0, 0, z.r, 0, Math.PI * 2); ctx.fill();
      } else {
        var g = ctx.createRadialGradient(0, 0, z.r * 0.15, 0, 0, z.r);
        g.addColorStop(0, hexA(z.color, z.friendly ? 0.5 : 0.4));
        g.addColorStop(0.7, hexA(z.color, z.friendly ? 0.3 : 0.22));
        g.addColorStop(1, hexA(z.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0, 0, z.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = hexA(z.color, z.friendly ? 0.7 : 0.45);
        ctx.lineWidth = z.friendly ? 2.2 : 1.5;
        ctx.beginPath(); ctx.arc(0, 0, z.r * (0.94 + 0.05 * Math.sin(G.time * 4)), 0, Math.PI * 2); ctx.stroke();
        if (z.friendly) {
          ctx.globalAlpha = 0.55;
          ctx.setLineDash([8, 8]);
          ctx.lineDashOffset = -G.time * 18;
          ctx.beginPath(); ctx.arc(0, 0, z.r * 0.72, 0, Math.PI * 2); ctx.stroke();
          ctx.setLineDash([]);
        }
        if (z.kind === "heal") {
          ctx.globalAlpha = 0.65 + 0.25 * Math.sin(G.time * 5);
          ctx.strokeStyle = "#b6ffd0";
          ctx.lineWidth = 3;
          var hpulse = 0.4 + 0.3 * Math.abs(Math.sin(G.time * 2.4));
          ctx.beginPath(); ctx.arc(0, 0, z.r * hpulse, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = "rgba(143,255,176,0.85)";
          for (var hpi = 0; hpi < 4; hpi++) {
            var ha = G.time * 1.5 + hpi * Math.PI / 2;
            var hr = z.r * (0.3 + 0.4 * hpi / 4);
            ctx.fillRect(Math.cos(ha) * hr - 3, Math.sin(ha) * hr * 0.6 - 12, 6, 20);
            ctx.fillRect(Math.cos(ha) * hr - 10, Math.sin(ha) * hr * 0.6 - 5, 20, 6);
          }
        } else if (z.kind === "storm" || z.kind === "rift") {
          ctx.globalAlpha = 0.75;
          ctx.strokeStyle = z.kind === "rift" ? "#d9b8ff" : "#d6fff0";
          ctx.lineWidth = 2;
          for (var za = 0; za < 5; za++) {
            ctx.beginPath();
            for (var zz = 0; zz <= 18; zz++) {
              var zr = z.r * (0.1 + zz / 18 * 0.88);
              var zang = zz * 0.42 + G.time * (z.kind === "rift" ? -5 : 5) + za * Math.PI * 2 / 5;
              var zx = Math.cos(zang) * zr, zy = Math.sin(zang) * zr * 0.78;
              if (zz === 0) ctx.moveTo(zx, zy); else ctx.lineTo(zx, zy);
            }
            ctx.stroke();
          }
          if (z.kind === "rift") {
            var rg = ctx.createRadialGradient(0, 0, 2, 0, 0, z.r * 0.55);
            rg.addColorStop(0, "rgba(10,2,24,0.95)");
            rg.addColorStop(1, hexA(z.color, 0));
            ctx.fillStyle = rg;
            ctx.globalAlpha = 0.8;
            ctx.beginPath(); ctx.arc(0, 0, z.r * 0.55, 0, Math.PI * 2); ctx.fill();
          }
        } else if (z.kind === "bramble") {
          ctx.globalAlpha = 0.55;
          ctx.fillStyle = "#7bd88f";
          ctx.strokeStyle = "rgba(20,50,20,0.7)";
          ctx.lineWidth = 1.5;
          for (var bb = 0; bb < 18; bb++) {
            var ba = bb / 18 * Math.PI * 2 + G.time * 0.25;
            var br = z.r * (0.2 + 0.72 * ((bb * 29) % 10) / 10);
            var bxp = Math.cos(ba) * br, byp = Math.sin(ba) * br * 0.72;
            ctx.beginPath();
            ctx.moveTo(bxp - 4, byp);
            ctx.lineTo(bxp, byp - 10 - (bb % 4) * 3);
            ctx.lineTo(bxp + 4, byp);
            ctx.fill();
            ctx.stroke();
          }
        } else if (z.kind === "lightning") {
          ctx.globalAlpha = 0.5 + 0.35 * Math.abs(Math.sin(G.time * 16));
          ctx.strokeStyle = "#fff3a8";
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(0, 0, z.r * 0.8, 0, Math.PI * 2); ctx.stroke();
        } else if (z.kind === "poison") {
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "#d6ff9a";
          for (var pb = 0; pb < 6; pb++) {
            var pba = pb * 1.7 + G.time * 0.8;
            var pbr = z.r * (0.2 + 0.55 * ((pb * 13) % 10) / 10);
            var pbr2 = 2.5 + (pb % 3) * 1.2;
            ctx.beginPath();
            ctx.arc(Math.cos(pba) * pbr, Math.sin(pba) * pbr * 0.7 - (G.time * 14 + pb * 9) % 20, pbr2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    }
  }

  function drawBullets() {
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      var s = toScreen(b.x, b.y);
      var bv = Math.hypot(b.vx || 0, b.vy || 0) || 1;
      var tx = (b.vx || 0) / bv, ty = (b.vy || 0) / bv;
      ctx.save();
      // 拖尾：讓小怪的技能彈看得出來從哪裡射向哪裡
      var tg = ctx.createLinearGradient(s.x - tx * b.r * 6, s.y - ty * b.r * 6, s.x, s.y);
      tg.addColorStop(0, hexA(b.color, 0));
      tg.addColorStop(1, hexA(b.color, 0.65));
      ctx.strokeStyle = tg;
      ctx.lineWidth = b.r * 1.15;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(s.x - tx * b.r * 6, s.y - ty * b.r * 6);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 16;
      ctx.fillStyle = b.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, b.r, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath(); ctx.arc(s.x - tx * b.r * 0.3, s.y - ty * b.r * 0.3, b.r * 0.42, 0, Math.PI * 2); ctx.fill();
      // 脈動外圈，元素辨識度更高
      ctx.globalAlpha = 0.5 + 0.3 * Math.sin(G.time * 14 + i);
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(s.x, s.y, b.r * 1.7, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  function drawShots() {
    for (var i = 0; i < G.shots.length; i++) {
      var s = G.shots[i];
      var p = toScreen(s.x, s.y);
      var ang = Math.atan2(s.vy, s.vx);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(ang);
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 16;
      ctx.fillStyle = s.color;
      if (s.kind === "wind") {
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(-10, 7);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-10, -7);
        ctx.closePath();
        ctx.fill();
      } else if (s.kind === "ice") {
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.moveTo(s.r * 1.6, 0);
        ctx.lineTo(0, s.r * 0.75);
        ctx.lineTo(-s.r * 1.3, 0);
        ctx.lineTo(0, -s.r * 0.75);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath(); ctx.moveTo(s.r * 0.9, 0); ctx.lineTo(0, -s.r * 0.28); ctx.lineTo(0, s.r * 0.28); ctx.closePath(); ctx.fill();
      } else if (s.kind === "flame") {
        var fscale = 0.8 + 0.4 * Math.sin(G.time * 28 + s.x * 0.1);
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(s.r * 1.7, 0);
        ctx.quadraticCurveTo(s.r * 0.2, s.r * 0.9 * fscale, -s.r * 1.5, 0);
        ctx.quadraticCurveTo(s.r * 0.2, -s.r * 0.9 * fscale, s.r * 1.7, 0);
        ctx.fill();
        ctx.fillStyle = "rgba(255,240,170,0.95)";
        ctx.beginPath(); ctx.arc(s.r * 0.4, 0, s.r * 0.36, 0, Math.PI * 2); ctx.fill();
      } else if (s.kind === "prism") {
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        for (var pj = 0; pj < 8; pj++) {
          var pja = pj / 8 * Math.PI * 2;
          var pjr = pj % 2 === 0 ? s.r * 1.5 : s.r * 0.55;
          var pjx = Math.cos(pja) * pjr, pjy = Math.sin(pja) * pjr;
          if (pj === 0) ctx.moveTo(pjx, pjy); else ctx.lineTo(pjx, pjy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.beginPath(); ctx.arc(0, 0, s.r * 0.35, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.beginPath(); ctx.ellipse(0, 0, s.r * 1.5, s.r * 0.72, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.beginPath(); ctx.arc(s.r * 0.35, 0, s.r * 0.35, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      // 拖尾
      ctx.save();
      ctx.strokeStyle = hexA(s.color, 0.35);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - s.vx * 0.05, p.y - s.vy * 0.05);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawShockwaves() {
    for (var i = 0; i < G.shockwaves.length; i++) {
      var w = G.shockwaves[i];
      var s = toScreen(w.x, w.y);
      ctx.save();
      ctx.strokeStyle = w.color;
      ctx.globalAlpha = clamp(1 - w.r / w.max, 0.1, 0.9);
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(s.x, s.y, w.r, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha *= 0.5;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(s.x, s.y, w.r * 0.82, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  function drawLasers() {
    for (var i = 0; i < G.lasers.length; i++) {
      var l = G.lasers[i];
      var s = toScreen(l.x, l.y);
      var ex = l.x + Math.cos(l.ang) * l.len;
      var ey = l.y + Math.sin(l.ang) * l.len;
      var e = toScreen(ex, ey);
      var active = l.t > l.warn;
      ctx.save();
      ctx.strokeStyle = l.color;
      if (!active) {
        ctx.globalAlpha = 0.35 + 0.3 * Math.abs(Math.sin(G.time * 16));
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 10]);
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
        ctx.setLineDash([]);
      } else {
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 24;
        ctx.lineWidth = l.width;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = Math.max(2, l.width * 0.22);
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(e.x, e.y); ctx.stroke();
      }
      ctx.restore();
    }
  }

  function hexA(hex, a) {
    var h = String(hex || "#ff9b6a").replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.substr(0, 2), 16) || 255;
    var g = parseInt(h.substr(2, 2), 16) || 155;
    var b = parseInt(h.substr(4, 2), 16) || 106;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  function drawOrbs() {
    for (var i = 0; i < G.orbs.length; i++) {
      var o = G.orbs[i];
      var sp = toScreen(o.x, o.y);
      var sx = sp.x, sy = sp.y;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = "#7ce0ff";
      ctx.shadowColor = "#7ce0ff";
      ctx.shadowBlur = 10;
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();
    }
  }

  function drawFx(dt) {
    if (G.fx.length > MAX_FX) G.fx.splice(0, G.fx.length - MAX_FX);
    for (var i = G.fx.length - 1; i >= 0; i--) {
      var f = G.fx[i];
      f.t -= dt;
      if (f.t <= 0) { G.fx.splice(i, 1); continue; }
      var spf = toScreen(f.x, f.y);
      var sx = spf.x, sy = spf.y;
      if (f.type === "flash") {
        var fk = clamp(f.t / (f.max || 0.55), 0, 1);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = fk * 0.55;
        ctx.fillStyle = f.color || "#ffffff";
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      } else if (f.type === "ring") {
        if (!f.dur) f.dur = Math.max(0.2, f.t);
        var k = 1 - f.t / f.dur;
        ctx.beginPath();
        ctx.arc(sx, sy, f.r + (f.max - f.r) * k, 0, Math.PI * 2);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = Math.max(0, f.t / f.dur);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (f.type === "cast") {
        var ck = 1 - clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.save();
        ctx.globalAlpha = 0.5 + 0.35 * Math.sin(G.time * 18);
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sx, sy, (f.r || 20) * (0.7 + ck * 0.5), 0, Math.PI * 2);
        ctx.stroke();
        for (var cs = 0; cs < 6; cs++) {
          var ca = G.time * 2 + cs * Math.PI / 3;
          ctx.beginPath();
          ctx.moveTo(sx + Math.cos(ca) * (f.r || 20) * 0.55, sy + Math.sin(ca) * (f.r || 20) * 0.55);
          ctx.lineTo(sx + Math.cos(ca) * (f.r || 20) * 1.05, sy + Math.sin(ca) * (f.r || 20) * 1.05);
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "beam") {
        var bkt = 1 - clamp(f.t / (f.max || 0.34), 0, 1);
        var bEnd = f.tx !== undefined ? toScreen(f.tx, f.ty) : { x: sx + 200, y: sy };
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.34), 0, 1);
        ctx.strokeStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 24;
        ctx.lineCap = "round";
        ctx.lineWidth = (f.r || 24) * (1.2 - bkt * 0.45);
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(bEnd.x, bEnd.y); ctx.stroke();
        ctx.globalAlpha *= 0.9;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.shadowBlur = 8;
        ctx.lineWidth = Math.max(2, (f.r || 24) * 0.28);
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(bEnd.x, bEnd.y); ctx.stroke();
        ctx.restore();
      } else if (f.type === "chain" && f.pts && f.pts.length > 1) {
        ctx.save();
        ctx.strokeStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3;
        ctx.globalAlpha = clamp(f.t / (f.max || 0.3), 0, 1);
        for (var pi = 1; pi < f.pts.length; pi++) {
          var pa = toScreen(f.pts[pi - 1].x, f.pts[pi - 1].y);
          var pb = toScreen(f.pts[pi].x, f.pts[pi].y);
          var segs = 4;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          for (var sg = 1; sg <= segs; sg++) {
            var tt = sg / segs;
            var jitter = (sg === segs) ? 0 : rand(-7, 7);
            ctx.lineTo(pa.x + (pb.x - pa.x) * tt + jitter, pa.y + (pb.y - pa.y) * tt + jitter);
          }
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "spark") {
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.25), 0, 1);
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 2;
        var sr = f.r || 16;
        for (var sk2 = 0; sk2 < 6; sk2++) {
          var sa = sk2 * Math.PI / 3 + 0.3;
          ctx.beginPath();
          ctx.moveTo(sx + Math.cos(sa) * sr * 0.3, sy + Math.sin(sa) * sr * 0.3);
          ctx.lineTo(sx + Math.cos(sa) * sr, sy + Math.sin(sa) * sr);
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "arrow") {
        var ak = 1 - f.t / (f.max || 0.16);
        var ax = f.x + (f.tx - f.x) * ak;
        var ay = f.y + (f.ty - f.y) * ak;
        var asp = toScreen(ax, ay);
        var ang = Math.atan2(f.ty - f.y, f.tx - f.x);
        ctx.save();
        ctx.translate(asp.x, asp.y);
        ctx.rotate(ang);
        ctx.globalAlpha = clamp(f.t / (f.max || 0.16), 0, 1);
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(0, 0); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(-7, -5);
        ctx.moveTo(0, 0); ctx.lineTo(-7, 5);
        ctx.stroke();
        ctx.restore();
      } else if (f.type === "slash") {
        ctx.beginPath();
        ctx.arc(sx, sy, f.r, -0.6, 0.9);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = Math.max(0, f.t / 0.18);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (f.type === "portal") {
        var pk = 1 - clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.save();
        ctx.translate(sx, sy - 6);
        ctx.globalAlpha = clamp(f.t / (f.max || 0.5), 0, 1) * 0.85;
        ctx.strokeStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2.5;
        ctx.rotate(G.time * 3.2);
        ctx.beginPath(); ctx.ellipse(0, 0, f.r * (0.3 + pk * 0.55), f.r * (0.2 + pk * 0.3), 0, 0, Math.PI * 2); ctx.stroke();
        ctx.rotate(-G.time * 6);
        ctx.beginPath(); ctx.ellipse(0, 0, f.r * (0.2 + pk * 0.35), f.r * (0.16 + pk * 0.22), 0, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = hexA(f.color, 0.18);
        ctx.beginPath(); ctx.ellipse(0, 0, f.r * 0.35, f.r * 0.2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else if (f.type === "death") {
        var dk = 1 - clamp(f.t / (f.max ? 0.45 : 1), 0, 1);
        var dkA = clamp(f.t / 0.45, 0, 1);
        ctx.save();
        ctx.globalAlpha = dkA * 0.55;
        var dg = ctx.createRadialGradient(sx, sy, 2, sx, sy, f.max * (0.4 + dk));
        dg.addColorStop(0, hexA(f.color, 0.9));
        dg.addColorStop(1, hexA(f.color, 0));
        ctx.fillStyle = dg;
        ctx.beginPath(); ctx.arc(sx, sy, f.max * (0.4 + dk), 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = dkA;
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 2;
        for (var dq = 0; dq < 7; dq++) {
          var da = dq / 7 * Math.PI * 2 + G.time;
          var dr = f.r * (0.3 + dk * 1.6);
          ctx.beginPath();
          ctx.moveTo(sx + Math.cos(da) * f.r * 0.2, sy + Math.sin(da) * f.r * 0.2);
          ctx.lineTo(sx + Math.cos(da) * dr, sy + Math.sin(da) * dr);
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "tell") {
        ctx.save();
        ctx.globalAlpha = 0.35 + 0.45 * Math.abs(Math.sin(G.time * 18));
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.arc(sx, sy, f.r * 0.7, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      } else if (f.type === "dust") {
        var duk = 1 - clamp(f.t / (f.max || 0.35), 0, 1);
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.35), 0, 1) * 0.45;
        ctx.fillStyle = f.color;
        ctx.beginPath(); ctx.ellipse(sx, sy + 4, f.r * (0.4 + duk), f.r * 0.28 * (0.5 + duk), 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else if (f.type === "cross") {
        var ck2 = 1 - clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(f.ang || 0);
        ctx.globalAlpha = clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 22;
        ctx.fillStyle = hexA(f.color, 0.3 * (1 - ck2) + 0.15);
        ctx.fillRect(-f.r * (0.4 + ck2 * 0.6), -14, f.r * 2 * (0.4 + ck2 * 0.6), 28);
        ctx.fillRect(-14, -f.r * (0.4 + ck2 * 0.6), 28, f.r * 2 * (0.4 + ck2 * 0.6));
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillRect(-f.r * (0.4 + ck2 * 0.6), -4, f.r * 2 * (0.4 + ck2 * 0.6), 8);
        ctx.fillRect(-4, -f.r * (0.4 + ck2 * 0.6), 8, f.r * 2 * (0.4 + ck2 * 0.6));
        ctx.restore();
      } else if (f.type === "lightning") {
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.4), 0, 1);
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = f.color;
        for (var lb = 0; lb < 3; lb++) {
          var lx = sx + rand(-16, 16);
          ctx.lineWidth = lb === 0 ? 4 : 2;
          ctx.beginPath();
          ctx.moveTo(lx, sy - 320 - rand(0, 40));
          for (var ls = 1; ls <= 7; ls++) {
            ctx.lineTo(lx + rand(-14, 14), sy - 320 + ls * 46);
          }
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "flamewave") {
        var fk = 1 - clamp(f.t / (f.max || 0.32), 0, 1);
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(f.ang || 0);
        ctx.globalAlpha = clamp(f.t / (f.max || 0.32), 0, 1);
        var fg = ctx.createRadialGradient(0, 0, 10, 0, 0, f.r);
        fg.addColorStop(0, hexA(f.color, 0.9));
        fg.addColorStop(1, hexA(f.color, 0));
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, f.r * (0.5 + fk * 0.7), -0.42, 0.42);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (f.type === "vortex") {
        ctx.save();
        ctx.translate(sx, sy);
        ctx.globalAlpha = clamp(f.t / (f.max || 0.8), 0, 1) * 0.8;
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 12;
        for (var vv = 0; vv < 4; vv++) {
          ctx.beginPath();
          for (var va = 0; va <= 22; va++) {
            var vr = f.r * (0.12 + va / 22 * 0.85);
            var vang = va * 0.32 + G.time * 4 + vv * Math.PI / 2;
            var vx = Math.cos(vang) * vr, vy = Math.sin(vang) * vr * 0.7;
            if (va === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
          }
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "void") {
        var vk = 1 - clamp(f.t / (f.max || 0.6), 0, 1);
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.6), 0, 1);
        var vg2 = ctx.createRadialGradient(sx, sy, 4, sx, sy, f.r * (0.4 + vk * 0.7));
        vg2.addColorStop(0, "rgba(8,2,20,0.92)");
        vg2.addColorStop(0.6, hexA(f.color, 0.35));
        vg2.addColorStop(1, hexA(f.color, 0));
        ctx.fillStyle = vg2;
        ctx.beginPath(); ctx.arc(sx, sy, f.r * (0.4 + vk * 0.7), 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha *= 0.8;
        ctx.beginPath(); ctx.arc(sx, sy, f.r * (0.25 + vk * 0.5), 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      } else if (f.type === "spikes") {
        var spk = 1 - clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.5), 0, 1);
        ctx.fillStyle = f.color;
        ctx.strokeStyle = "rgba(20,60,30,0.65)";
        for (var si2 = 0; si2 < 14; si2++) {
          var sa2 = si2 / 14 * Math.PI * 2 + 0.2;
          var srad = f.r * (0.32 + 0.55 * ((si2 * 37) % 10) / 10);
          var shh = 18 + ((si2 * 53) % 20);
          var bx = sx + Math.cos(sa2) * srad;
          var by = sy + Math.sin(sa2) * srad * 0.62;
          ctx.beginPath();
          ctx.moveTo(bx - 5, by);
          ctx.lineTo(bx, by - shh * (0.4 + spk * 0.6));
          ctx.lineTo(bx + 5, by);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      } else if (f.type === "orbit") {
        ctx.save();
        ctx.globalAlpha = clamp(f.t / (f.max || 0.5), 0, 1) * 0.8;
        ctx.fillStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 10;
        for (var oi2 = 0; oi2 < 5; oi2++) {
          var oa2 = G.time * 3.4 + oi2 * Math.PI * 2 / 5;
          ctx.beginPath(); ctx.arc(sx + Math.cos(oa2) * f.r, sy + Math.sin(oa2) * f.r * 0.55 - 6, 4.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    }

    if (G.floaters.length > MAX_FLOATERS) G.floaters.splice(0, G.floaters.length - MAX_FLOATERS);
    for (var j = G.floaters.length - 1; j >= 0; j--) {
      var t = G.floaters[j];
      t.t -= dt;
      t.y -= 34 * dt;
      if (t.t <= 0) { G.floaters.splice(j, 1); continue; }
      var sp2 = toScreen(t.x, t.y);
      var fx = sp2.x, fy = sp2.y;
      ctx.globalAlpha = clamp(t.t / 0.7, 0, 1);
      var fsize = t.size || 13;
      ctx.font = "bold " + fsize + "px sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.strokeText(t.text, fx, fy);
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, fx, fy);
      ctx.globalAlpha = 1;
    }
  }

  function drawVignette() {
    var g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 地區機制即將發動時，畫面邊緣閃爍警示
    var gm = G.gimmick;
    if (gm && gm.def && gm.timer > 0 && gm.timer < 2.6) {
      var pulse = 0.18 + 0.14 * Math.sin(G.time * 14);
      var col = gm.def.Color || "#9fd8ff";
      ctx.save();
      ctx.strokeStyle = hexA(col, pulse);
      ctx.lineWidth = 14;
      ctx.strokeRect(0, 0, W, H);
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- HUD
  function updateHud() {
    var p = G.player;
    document.getElementById("timer").textContent = formatTime(G.time);
    document.getElementById("kills").textContent = String(G.kills);
    document.getElementById("round").textContent = (G.roundIndex + 1) + "/" + (G.level.RoundInfos || []).length;

    var hpPct = clamp(p.hp / p.maxhp, 0, 1) * 100;
    document.getElementById("hpFill").style.width = hpPct + "%";
    document.getElementById("hpText").textContent = Math.ceil(p.hp) + "/" + Math.ceil(p.maxhp);

    var mpPct = clamp(p.mp / p.maxmp, 0, 1) * 100;
    var mpFill = document.getElementById("mpFill");
    if (mpFill) mpFill.style.width = mpPct + "%";
    var mpText = document.getElementById("mpText");
    if (mpText) mpText.textContent = Math.floor(p.mp) + "/" + Math.ceil(p.maxmp);

    var ultPct = clamp((p.ult || 0) / (p.ultMax || 100), 0, 1) * 100;
    var ultFill = document.getElementById("ultFill");
    if (ultFill) ultFill.style.width = ultPct + "%";
    var ultText = document.getElementById("ultText");
    if (ultText) ultText.textContent = ultPct >= 100 ? "R · 就緒！" : Math.floor(ultPct) + "%";
    var ultBar = document.getElementById("ultBar");
    if (ultBar) ultBar.classList.toggle("ready", ultPct >= 100);

    var expPct = clamp(p.exp / p.nextExp, 0, 1) * 100;
    document.getElementById("expFill").style.width = expPct + "%";
    document.getElementById("expText").textContent = p.exp + "/" + p.nextExp;

    var chips = document.querySelectorAll(".skillChip");
    for (var i = 0; i < chips.length; i++) {
      var chip = chips[i];
      var kind = chip.dataset.kind || "atk";
      var sk = skillById(Number(chip.dataset.skillId));
      var cd = 2, cur = 0, locked = false, noMp = false;
      if (kind === "atk") {
        cd = Math.max(0.1, num(sk && sk.CD, 2) * (p.atkCdScale || 1));
        cur = p.atkCd;
      } else if (kind === "special") {
        cd = Math.max(1, num(sk && sk.CD, 10));
        cur = p.specialCd;
      } else {
        var slot = p.spells[Number(chip.dataset.index)];
        if (slot) {
          var rank = Math.max(1, slot.rank || 1);
          cd = Math.max(0.5, slot.cdMax * (p.spellCdScale || 1) * Math.pow(0.96, rank - 1));
          cur = slot.cd;
          locked = p.level < slot.unlock;
          noMp = p.mp < Math.round(spellCost(sk) * Math.pow(0.97, rank - 1));
          var metaEl = chip.querySelector(".meta");
          if (metaEl) {
            metaEl.textContent = "MP " + Math.round(spellCost(sk) * Math.pow(0.97, rank - 1)) +
              " · " + cd.toFixed(1) + "s · R" + rank;
          }
        }
      }
      chip.classList.toggle("locked", locked);
      chip.classList.toggle("nomp", noMp);
      var fill = chip.querySelector(".cd");
      var pct = cd > 0 ? clamp(cur / cd, 0, 1) * 100 : 0;
      fill.style.height = pct + "%";
    }

    // 狀態列：護盾／緩速／地區機制倒數
    var statusEl = document.getElementById("statusInfo");
    if (statusEl) {
      var bits = [];
      if (p.shield > 0) bits.push("護盾 " + Math.ceil(p.shield));
      if (p.slowT > 0) bits.push("緩速 " + p.slowT.toFixed(1) + "s");
      if (p.regenT > 0) bits.push("回復中");
      var gm = G.gimmick;
      if (gm && gm.def && gm.def.Name) bits.push(gm.def.Name + " " + Math.max(0, Math.ceil(gm.timer)) + "s");
      statusEl.textContent = bits.join(" · ");
    }

    // 霸主血條
    var boss = null;
    for (var bi = 0; bi < G.enemies.length; bi++) {
      var be = G.enemies[bi];
      if (be.isBoss && !be.dying && (!boss || be.maxhp > boss.maxhp)) boss = be;
    }
    var bossBar = document.getElementById("bossBar");
    if (bossBar) {
      if (boss) {
        var br = clamp(boss.hp / boss.maxhp, 0, 1);
        bossBar.classList.remove("hidden");
        document.getElementById("bossName").textContent = boss.name;
        document.getElementById("bossTitle").textContent = boss.bossTitle || "";
        document.getElementById("bossFill").style.width = (br * 100) + "%";
        document.getElementById("bossFill").style.background =
          "linear-gradient(90deg," + boss.bossColor + ",#ff5a6e)";
        document.getElementById("bossHp").textContent = Math.ceil(boss.hp) + " / " + Math.ceil(boss.maxhp);
        var phaseEl = document.getElementById("bossPhase");
        phaseEl.textContent = boss.phase === 3 ? "狂亂" : (boss.phase === 2 ? "狂暴" : "第一階段");
        phaseEl.className = "bossPhase" + (boss.phase === 3 ? " enraged frenzy" : (boss.phase === 2 ? " enraged" : ""));
      } else {
        bossBar.classList.add("hidden");
      }
    }
  }

  // ---------------------------------------------------------------- loop
  var lastTs = 0;
  var fatalShown = false;

  function fatalError(err, where) {
    if (window.console && window.console.error) window.console.error("[MOLI]", where, err);
    if (fatalShown) return;
    fatalShown = true;
    try {
      var el = document.getElementById("fatalPanel");
      if (!el) {
        el = document.createElement("div");
        el.id = "fatalPanel";
        el.className = "fatalPanel";
        document.body.appendChild(el);
      }
      var msg = (err && (err.stack || err.message)) || String(err || "未知錯誤");
      el.innerHTML = '<h3>遊戲發生錯誤</h3><p class="sub">戰鬥已暫停，避免畫面卡死。請把下面訊息回報給開發者。</p>' +
        '<pre></pre><div class="actions"><button class="primary" id="fatalReload">重新載入</button>' +
        '<button class="btn" id="fatalMenu">回主選單</button></div>';
      el.querySelector("pre").textContent = "[" + where + "] " + msg;
      var rb = document.getElementById("fatalReload");
      if (rb) rb.addEventListener("click", function () { window.location.reload(); });
      var mb = document.getElementById("fatalMenu");
      if (mb) mb.addEventListener("click", function () {
        el.classList.add("hidden");
        if (G) { G.over = true; G.paused = true; }
        var h = document.getElementById("hud"); if (h) h.classList.add("hidden");
        var m = document.getElementById("menu"); if (m) m.classList.remove("hidden");
      });
      el.classList.remove("hidden");
    } catch (e) {}
    if (G) { G.paused = true; G.over = true; }
  }

  function frame(ts) {
    if (!G) return;
    if (!lastTs) lastTs = ts;
    var dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;

    try {
      // 防隱形暫停：升級佇列還在但升級面板沒顯示時，自動補顯示；佇列清空則恢復戰鬥
      if (G.paused && !G.over && !G.showcase) {
        var lvEl = document.getElementById("levelUp");
        var lvHidden = !lvEl || lvEl.classList.contains("hidden");
        if (lvHidden && G.upPending > 0) {
          try { showUpgrades(); } catch (e) { G.paused = false; }
        } else if (lvHidden && G.upPending <= 0) {
          G.paused = false;
        }
      }
      if (G.showcase) {
        // 美術展示模式：只推進動畫與時間，不跑戰鬥，讓每隻怪物輪播六種動作。
        G.time += dt;
        updateShowcase(dt);
        var showHalfW = W / 2, showHalfH = H / 2;
        G.cam.x = G.worldW > W ? clamp(G.player.x, showHalfW, G.worldW - showHalfW) : G.worldW / 2;
        G.cam.y = G.worldH > H ? clamp(G.player.y, showHalfH, G.worldH - showHalfH) : G.worldH / 2;
      } else if (!G.paused && !G.over) {
        G.time += dt;
        updatePlayer(dt);
        playerAttack(dt);
        updateMagic(dt);
        updateAbilities(dt);
        updateBosses(dt);
        updateEnemies(dt);
        updatePendingHits(dt);
        updateHazards(dt);
        updateGimmick(dt);
        updateInteractables(dt);
        updateWaves(dt);

        // camera lerp（俯視角，鏡頭不超出地圖）
        var halfW = W / 2, halfH = H / 2;
        var tx = G.worldW > W ? clamp(G.player.x, halfW, G.worldW - halfW) : G.worldW / 2;
        var ty = G.worldH > H ? clamp(G.player.y, halfH, G.worldH - halfH) : G.worldH / 2;
        G.cam.x += (tx - G.cam.x) * Math.min(1, dt * 7);
        G.cam.y += (ty - G.cam.y) * Math.min(1, dt * 7);
      }

      drawBackground();
      if (ART.drawArena) ART.drawArena(ctx, G.scene, G.cam, W, H, G.time, !!G.bossActive);
      drawZones();
      drawOrbs();
      drawEntities();
      drawShockwaves();
      drawBullets();
      drawShots();
      drawLasers();
      if (ART.drawForeground) ART.drawForeground(ctx, G.scene, G.cam, W, H, G.time);
      ART.drawAmbient(ctx, G.scene, G.cam, W, H, G.time);
      drawFx(dt);
      ART.drawFog(ctx, G.scene, W, H);
      drawVignette();
      updateHud();
    } catch (err) {
      fatalError(err, "frame");
      return;
    }

    if (!G.over) requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- input
  document.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    keys[k] = true;
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].indexOf(k) >= 0) e.preventDefault();
    // 數字鍵 1~9：手動詠唱魔法
    if (G && !G.paused && !G.over && /^[1-9]$/.test(k)) {
      var idx = Number(k) - 1;
      if (G.player.spells && idx < G.player.spells.length) {
        castSpell(idx, true);
        e.preventDefault();
      }
    }
    // R：終極技能
    if (k === "r" && G && !G.paused && !G.over) {
      castUltimate(true);
      e.preventDefault();
    }
  });
  document.addEventListener("keyup", function (e) { keys[e.key.toLowerCase()] = false; });

  canvas.addEventListener("pointerdown", function (e) {
    pointer.active = true;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  canvas.addEventListener("pointermove", function (e) {
    if (pointer.active) { pointer.x = e.clientX; pointer.y = e.clientY; }
  });
  window.addEventListener("pointerup", function () { pointer.active = false; });
  canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  // ---------------------------------------------------------------- buttons
  // 依關卡選擇 BGM：每 5 關換一次氣氛，霸主波另外切戰鬥曲
  function levelBgm(li) {
    li = num(li, 0);
    if (li >= 10) return "field3";
    if (li >= 5) return "field2";
    return "field1";
  }

  // 依地區機制／地形挑選環境音，讓每一關的「空氣」不同。
  function ambientForLevel(lv) {
    var t = String((lv && lv.Terrain) || "").toLowerCase();
    var k = String((lv && lv.Gimmick && lv.Gimmick.Kind) || "").toLowerCase();
    if (/underwater/.test(t)) return "underwater";
    if (/volcano|lava/.test(t)) return "volcano";
    if (/snow|ice/.test(t)) return "snow";
    if (/desert|sand/.test(t)) return "desert";
    if (/deepforest|forest|jungle/.test(t)) return "forest";
    if (/graveyard|grave|tomb/.test(t)) return "graveyard";
    if (/cave/.test(t)) return "cave";
    if (/coast|island/.test(t)) return "island";
    if (/lava|sun|rockfall/.test(k)) return "volcano";
    if (/blizzard|ice/.test(k)) return "snow";
    if (/sand|wind/.test(k)) return "desert";
    if (/spore|vine|root/.test(k)) return "forest";
    if (/soul|moon/.test(k)) return "graveyard";
    if (/arcane|beam/.test(k)) return "cave";
    return "island";
  }

  // 等原版美術與該關卡的怪物圖載入完成再開場
  function startGame() {
    if (!CONFIG.Players || !CONFIG.Players.length || !CONFIG.Levels || !CONFIG.Levels.length) return;

    var li = clamp(selectedLevel, 0, CONFIG.Levels.length - 1);
    var lv = CONFIG.Levels[li] || {};
    var ids = lv.MonsterIDs || [];
    var note = document.getElementById("loadNote");

    // 先起音樂，不必等怪物圖載完（第一次互動前會先排隊，等手勢解鎖）
    if (window.AUDIO) AUDIO.playBgm(levelBgm(li));

    function go() {
      if (note) note.textContent = "";
      startBtn.disabled = false;
      newGame();
    }

    // 開場先載入「第一波會出現的怪物」的六段動作，確保一開打就看得到
    // 走路、攻擊、施法、受傷、死亡；其餘怪物在背景依動作分批補齊。
    var firstWaveArts = [];
    try {
      var rd0 = (lv.RoundInfos || [])[0];
      ((rd0 && rd0.EnemyIDs) || []).forEach(function (eid) {
        var en = enemyById(num(eid, 0));
        if (en && en.Art && firstWaveArts.indexOf(en.Art) < 0) firstWaveArts.push(en.Art);
      });
    } catch (err) {}
    if (!firstWaveArts.length) firstWaveArts = ids.slice(0, 18);

    function warmRest() {
      if (!window.ART || !ids.length) return;
      ART.loadMonsters(ids, null, ["idle", "walk"])
        .then(function () { return ART.loadMonsters(ids, null, ["attack", "special"]); })
        .then(function () { return ART.loadMonsters(ids, null, ["hurt", "die"]); });
    }

    function beginGame() {
      go();
      warmRest();
    }

    function preloadFirstWave() {
      return ART.loadMonsters(firstWaveArts, function (done, total) {
        if (note) note.textContent = "載入怪物動作 " + done + " / " + total + "…";
      }, ["idle", "walk", "attack", "special", "hurt", "die"]);
    }

    startBtn.disabled = true;
    if (window.ART && !ART.isReady()) {
      if (note) note.textContent = "載入原版美術中…";
      ART.load().then(preloadFirstWave).then(beginGame);
      return;
    }
    if (window.ART) {
      if (note) note.textContent = "載入怪物動作 0 / " + firstWaveArts.length + "…";
      preloadFirstWave().then(beginGame);
      return;
    }
    go();
  }

  startBtn.addEventListener("click", startGame);

  document.getElementById("quitBtn").addEventListener("click", function () {
    if (G) G.over = true;
    if (window.AUDIO) AUDIO.playBgm("menu");
    hud.classList.add("hidden");
    menuEl.classList.remove("hidden");
    gameOverEl.classList.add("hidden");
    levelUpEl.classList.add("hidden");
  });

  document.getElementById("retryBtn").addEventListener("click", function () {
    var action = G ? G.nextAction : "retry";
    gameOverEl.classList.add("hidden");
    if (action === "next") {
      selectedLevel = clamp(selectedLevel + 1, 0, CONFIG.Levels.length - 1);
    } else if (action === "loop") {
      loopCount++;
      selectedLevel = 0;
    }
    startGame();
  });

  document.getElementById("menuBtn").addEventListener("click", function () {
    gameOverEl.classList.add("hidden");
    hud.classList.add("hidden");
    menuEl.classList.remove("hidden");
    if (window.AUDIO) AUDIO.playBgm("menu");
  });

  // ---------------------------------------------------------------- boot
  window.addEventListener("error", function (ev) {
    if (ev && ev.error) fatalError(ev.error, "window");
  });
  window.addEventListener("unhandledrejection", function (ev) {
    if (ev && ev.reason) fatalError(ev.reason, "promise");
  });

  try {
    resize();
  } catch (err) {
    if (window.console) console.error(err);
  }
  // Render the menu from the built-in defaults right away so the character /
  // level cards are never empty while the JSON config is still loading (or if
  // it fails to load at all).
  try {
    buildMenu();
  } catch (err) {
    if (window.console) console.error(err);
  }
  // 先載入原版美術（地圖／角色／怪物／技能圖示）
  if (window.ART) {
    ART.load().then(function () {
      try { buildMenu(); } catch (err) { if (window.console) console.error(err); }
    });
  }

  // 除錯 / 自動測試用：可在 console 讀取目前戰鬥狀態
  window.MOLI = {
    get state() { return G; },
    get config() { return CONFIG; },
    cast: function (i) { return G ? castSpell(i | 0, true) : false; },
    ultimate: function () { return G ? castUltimate(true) : false; },
    gainExp: function (n) { if (G) gainExp(num(n, 0) || 0); },
    levelUp: function () { if (G) levelUp(); },
    version: "2026-10-25-5"
  };

  // 主選單音樂（瀏覽器要求第一次互動後才會真正播放）
  if (window.AUDIO) AUDIO.playBgm("menu");

  loadConfig();
})();
