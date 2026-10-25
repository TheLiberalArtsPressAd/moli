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
      { ID: 105, Name: "神聖護盾", Kind: "shield", Element: "holy", Icon: 90036, CD: 16, MPCost: 20, Percent: 35, Color: "#ffe9a8" }
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
      spellCdScale: 1, spellCostScale: 1, shieldPower: 1
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
      : (player.spriteKey === "bow" ? [101, 102, 107, 110] : [100, 105, 103, 104]);
    player.spells = magicIds.map(function (id, si) {
      var sk = skillById(id);
      if (!sk || !sk.Kind) return null;
      return {
        id: num(id, 0),
        index: si,
        cd: 1.2 + si * 0.8,
        cdMax: Math.max(1, num(sk.CD, 6)),
        unlock: Math.max(1, num(sk.UnlockLevel, si >= 3 ? 4 : 1))
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
      zones: [],
      lasers: [],
      shockwaves: [],
      emitters: [],
      time: 0,
      kills: 0,
      roundIndex: -1,
      roundTimer: 0,
      roundActive: false,
      spawnQueue: [],
      spawnTimer: 0,
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
    showStageIntro(lv);

    // 預覽用：?showcase=1 會在角色周圍排出該關卡的怪物，方便檢查美術與動作
    if (((window.location && window.location.search) || "").indexOf("showcase") >= 0) {
      G.enemies.length = 0;
      var showIds = (lv.MonsterIDs || []).slice(0, 30);
      var cols = Math.min(6, Math.max(1, Math.ceil(Math.sqrt(showIds.length))));
      for (var si = 0; si < showIds.length; si++) {
        var idx = -1;
        for (var k = 0; k < CONFIG.Enemies.length; k++) {
          if (CONFIG.Enemies[k].Art === showIds[si]) { idx = CONFIG.Enemies[k].ID; break; }
        }
        if (idx < 0) continue;
        var en = spawnEnemy(idx, 1, false, "");
        en.x = G.player.x + ((si % cols) - (cols - 1) / 2) * 150;
        en.y = G.player.y - 140 + Math.floor(si / cols) * 140;
        en.spd = 0;
        en.atk = 0;
      }
      G.paused = true; // 只做美術預覽，不推進戰鬥
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

    // 霸主波保留場上殘留的地面效果會太混亂，一併清掉
    if (G.gimmick && G.gimmick.def) G.gimmick.timer = Math.max(6, num(G.gimmick.timer, 10));

    var ids = rd.EnemyIDs || [];
    var count = Math.max(1, num(rd.SpawnCountPerEnemy, 8));
    ids.forEach(function (id) {
      for (var i = 0; i < count; i++) G.spawnQueue.push({ enemyId: num(id, 0), level: num(rd.Level, 1), elite: false });
    });

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
    toast("第 " + (G.roundIndex + 1) + " 波" + (bosses.length ? " · BOSS 來襲" : "") + (rd.Name ? " · " + rd.Name : ""));
    if (rd.Event) toast(rd.Event);
    if (bosses.length) showBossIntro(bosses[0], bosses.length > 1);
  }

  function spawnEnemy(id, level, isBoss, prefix, bossInfo, elite) {
    bossInfo = bossInfo || {};
    if (!isBoss && G.enemies.length >= MAX_ENEMIES) return null;
    var info = enemyById(id);
    if (!info) info = { ID: id, Name: "怪物" + id, ATK: 2, DEF: 2, SPD: 2, HP: 3 };
    var p = G.player;
    var ang = Math.random() * Math.PI * 2;
    var radius = rand(380, 560);
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

    var maxhp = (24 + num(info.HP, 3) * 18) * hpScale * (isBoss ? 4.2 : 1) * hpMul * eliteHp * (1 + loopCount * 0.55);
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
      spd: (38 + num(info.SPD, 2) * 8) * (isElite ? 0.94 : 1),
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
      castSkills: isBoss ? [] : enemyCastSkills(info, isElite),
      castCd: rand(1.8, 4.2),
      casting: null,
      slowT: 0, slowMul: 1,
      stunT: 0,
      shield: 0, shieldT: 0,
      atkBuffT: 0, atkBuff: 1,
      spdMul: 1,
      castGlow: 0
    };
    G.enemies.push(e);
    if (isBoss) {
      G.bossActive = e;
      G.bosses.push(e);
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
    if (!out.length && num(info && info.Tier, 0) >= 3) {
      var fb = skillById(200);
      if (fb) out.push(fb);
    }
    if (isElite && out.length) {
      var extra = skillById(206) || skillById(200);
      if (extra && out.indexOf(extra) < 0) out.push(extra);
    }
    return out;
  }

  // ---------------------------------------------------------------- combat
  function dealDamage(e, amount, opts) {
    if (!e || e.dying) return 0;
    opts = opts || {};
    var crit = !opts.noCrit && Math.random() < (G.player.crit || 0);
    var dmg = Math.max(1, amount - e.def * 0.55);
    if (crit) dmg *= 1.8;
    if (e.shield > 0) {
      var absorb = Math.min(e.shield, dmg);
      e.shield -= absorb;
      dmg -= absorb;
      G.floaters.push({ x: e.x, y: e.y - e.r - 18, text: "盾 -" + Math.round(absorb), t: 0.6, color: "#9fd8ff" });
      if (dmg <= 0) { e.hitFlash = 0.12; return 0; }
    }
    e.hp -= dmg;
    e.hitFlash = 0.12;
    if (e.hp > 0 && !e.isBoss) {
      var kx = e.x - G.player.x, ky = e.y - G.player.y;
      var kd = Math.hypot(kx, ky) || 1;
      e.x = clamp(e.x + kx / kd * 16, e.r, G.worldW - e.r);
      e.y = clamp(e.y + ky / kd * 16, e.r, G.worldH - e.r);
      e.state = "hurt"; e.stateT = 0.16;
    }
    pushCapped(G.floaters, {
      x: e.x, y: e.y - e.r - 6,
      text: (crit ? "暴擊 " : "") + Math.round(dmg),
      t: 0.7, color: crit ? "#ffd166" : "#ffe082"
    }, MAX_FLOATERS);
    if (e.hp <= 0) killEnemy(e);
    return dmg;
  }

  function killEnemy(e) {
    if (e.dying) return;
    e.dying = true;
    e.dieT = 0.6;
    e.hp = 0;
    e.state = "die";
    G.kills++;
    if (e.isBoss) {
      G.bosses = G.bosses.filter(function (b) { return b !== e; });
      G.bossActive = null;
      for (var bi = 0; bi < G.bosses.length; bi++) {
        if (!G.bosses[bi].dying) { G.bossActive = G.bosses[bi]; break; }
      }
    }
    // 吸血成長：擊殺回復生命
    var p = G.player;
    if (p.lifesteal > 0) {
      var heal = p.maxhp * p.lifesteal;
      p.hp = Math.min(p.maxhp, p.hp + heal);
    }
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
  function damagePlayer(amount, color) {
    var p = G.player;
    if (p.invT > 0 || p.hp <= 0) return;
    p.invT = 0.26;
    var raw = Math.max(1, amount - p.def * 0.35);
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
    G.floaters.push({ x: p.x, y: p.y - 30, text: "-" + Math.round(raw), t: 0.7, color: color || "#ff7b7b" });
    if (p.hp <= 0) { p.hp = 0; endGame(false); }
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
      }
      if (e.phase === 2 && e.phase3At > 0 && ratio <= e.phase3At) {
        e.phase = 3;
        e.auraT = 0;
        e.abilityCd = Math.min(e.abilityCd, 0.8);
        toast(e.name + " 進入狂亂！");
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 360, t: 0.8, color: "#ff5a6e" });
        // 狂亂時立刻清場再放招
        for (var q3 = 0; q3 < 8; q3++) {
          addBullet(e.x, e.y - 40, (q3 / 8) * Math.PI * 2, 220, e.atk * 0.35, e.bossColor, 8);
        }
      }
      e.auraT += dt;

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
      e.castT = e.phase === 3 ? 0.3 : 0.45;
      e.state = "special";
      e.stateT = 0.55;
      castBossAbility(e, kind);
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
      var healAmt = e.maxhp * 0.12;
      e.hp = Math.min(e.maxhp, e.hp + healAmt);
      G.floaters.push({ x: e.x, y: e.y - 70, text: "+" + Math.round(healAmt), t: 0.9, color: "#8fffb0" });
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 24, max: 160, t: 0.5, color: "#8fffb0" });
      // 同時治療附近的霸主／精英
      G.enemies.forEach(function (ally) {
        if (ally === e || ally.dying) return;
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
        if (en.dying) continue;
        if (dist2(en, s) > (en.r + s.r) * (en.r + s.r)) continue;
        dealDamage(en, s.dmg, { noCrit: true });
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
      var target = nearestEnemy(p, 420);
      if (target) {
        p.atkCd = Math.max(0.14, num(atkSkill.CD, 2) * (p.atkCdScale || 1));
        var percent = param(atkSkill, "Percent", 100);
        var count = Math.max(1, param(atkSkill, "Count", 1));
        var dmg = p.atk * percent / 100;
        p.attackT = p.attackDur;
        p.dir = dirFromVector(target.x - p.x, target.y - p.y, p.dir);
        for (var i = 0; i < count; i++) {
          var t = nearestEnemy(p, 460);
          if (!t) break;
          dealDamage(t, dmg);
          if (p.spriteKey === "bow") {
            G.fx.push({ type: "arrow", x: p.x, y: p.y - 24, tx: t.x, ty: t.y - 16,
              t: 0.16, max: 0.16, color: "#ffe08a" });
          } else {
            G.fx.push({ type: "slash", x: t.x, y: t.y, t: 0.18, r: 26,
              color: "#9fe8ff" });
          }
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

  function shouldAutoCast(sk) {
    var p = G.player;
    if (!sk) return false;
    if (sk.Kind === "heal") return p.hp < p.maxhp * 0.9;
    if (sk.Kind === "shield") return p.shield <= 0;
    if (sk.Kind === "drain") return nearestEnemy(p, 470) !== null;
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
    var cost = spellCost(sk);
    if (p.mp < cost) {
      if (manual) toast("魔力不足");
      return false;
    }
    var power = p.atk * num(sk.Percent, 150) / 100 * magicPower(p);
    var color = sk.Color || "#9fd8ff";
    var target = nearestEnemy(p, 620);
    var did = false;

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
      var heal = p.maxhp * num(sk.Percent, 30) / 100;
      p.hp = Math.min(p.maxhp, p.hp + heal);
      p.regenT = 3;
      p.regen = p.maxhp * 0.03;
      pushCapped(G.floaters, { x: p.x, y: p.y - 44, text: "+" + Math.round(heal), t: 0.9, color: "#8fffb0" }, MAX_FLOATERS);
      G.fx.push({ type: "ring", x: p.x, y: p.y - 16, r: 26, max: 170, t: 0.5, color: color });
      did = true;
    } else if (sk.Kind === "shield") {
      var amount = p.maxhp * num(sk.Percent, 35) / 100 * (p.shieldPower || 1);
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
    }

    if (did) {
      p.mp = Math.max(0, p.mp - cost);
      slot.cd = Math.max(0.5, slot.cdMax * (p.spellCdScale || 1));
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

    var len = Math.hypot(mx, my);
    p.moving = len > 0;
    if (len > 0) {
      mx /= len; my /= len;
      p.dir = dirFromVector(mx, my, p.dir);
      var moveSpd = p.spd * (p.slowT > 0 ? p.slowMul : 1);
      p.vx = mx * moveSpd; p.vy = my * moveSpd;
      p.x = clamp(p.x + p.vx * dt, p.r, G.worldW - p.r);
      p.y = clamp(p.y + p.vy * dt, p.r, G.worldH - p.r);
      if (Math.abs(mx) > 0.05) p.face = mx > 0 ? 1 : -1;
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
        gainExp(o.v);
      }
    }
  }

  function gainExp(v) {
    var p = G.player;
    p.exp += v;
    while (p.exp >= p.nextExp) {
      p.exp -= p.nextExp;
      p.level++;
      p.nextExp = Math.round(12 + p.level * 9 + p.level * p.level * 0.6);
      levelUp();
    }
  }

  function levelUp() {
    var p = G.player;
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

  var UPGRADES = [
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
    { name: "聖盾強化", desc: "護盾效果 +30%", icon: 90036, apply: function (p) { p.shieldPower = (p.shieldPower || 1) * 1.3; } }
  ];

  function showUpgrades() {
    if (G.upPending <= 0) return;
    G.paused = true;
    var list = document.getElementById("upgradeList");
    list.innerHTML = "";
    var pool = UPGRADES.slice();
    for (var i = 0; i < 3 && pool.length; i++) {
      var idx = Math.floor(Math.random() * pool.length);
      var up = pool.splice(idx, 1)[0];
      (function (u) {
        var d = document.createElement("div");
        d.className = "card upgrade";
        d.innerHTML = '<img class="ico" alt=""><div class="name"></div><div class="desc"></div>';
        var icoEl = d.querySelector("img.ico");
        if (u.icon && window.ART) {
          icoEl.src = ART.skillIcon(u.icon);
          icoEl.onerror = function () { icoEl.style.display = "none"; };
        } else icoEl.style.display = "none";
        d.querySelector(".name").textContent = u.name;
        d.querySelector(".desc").textContent = u.desc;
        d.addEventListener("click", function () {
          u.apply(G.player);
          G.upPending--;
          if (G.upPending > 0) { showUpgrades(); }
          else { levelUpEl.classList.add("hidden"); G.paused = false; }
        });
        list.appendChild(d);
      })(up);
    }
    levelUpEl.classList.remove("hidden");
  }

  // ---------------------------------------------------------------- 怪物技能
  function pickEnemySkill(e) {
    var list = e.castSkills || [];
    if (!list.length) return null;
    // 血量低時優先治療
    if (e.hp < e.maxhp * 0.7) {
      for (var i = 0; i < list.length; i++) if (list[i].Kind === "e_heal") return list[i];
    }
    for (var s = 0; s < list.length; s++) {
      var sk = list[(e.castIndex || 0) % list.length];
      e.castIndex = (e.castIndex || 0) + 1;
      if (sk) return sk;
    }
    return list[0];
  }

  function startEnemyCast(e, sk) {
    var castTime = Math.max(0.35, num(sk.CastTime, 0.55));
    e.casting = { sk: sk, t: castTime, max: castTime };
    e.state = "special";
    e.stateT = castTime + 0.2;
    pushCapped(G.fx, {
      type: "cast", x: e.x, y: e.y - 8, t: castTime, max: castTime,
      color: sk.Color || "#b78bff", r: e.r + 12
    }, MAX_FX);
  }

  function executeEnemyCast(e, sk) {
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
      var healAmt = e.maxhp * 0.18;
      e.hp = Math.min(e.maxhp, e.hp + healAmt);
      pushCapped(G.floaters, { x: e.x, y: e.y - 40, text: "+" + Math.round(healAmt), t: 0.8, color: "#8fffb0" }, MAX_FLOATERS);
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 12, max: 80, t: 0.4, color: "#8fffb0" });
      for (var hi = 0; hi < G.enemies.length; hi++) {
        var he = G.enemies[hi];
        if (he !== e && !he.dying && dist2(he, e) < 190 * 190) {
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
    }
  }

  function updateEnemies(dt) {
    var p = G.player;
    for (var i = G.enemies.length - 1; i >= 0; i--) {
      var e = G.enemies[i];

      // 死亡動畫播完才移除
      if (e.dying) {
        e.dieT -= dt;
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        if (e.dieT <= 0) G.enemies.splice(i, 1);
        continue;
      }

      // 霸主衝撞由 updateBosses() 控制位移
      if (e.dash) {
        e.hitFlash = Math.max(0, e.hitFlash - dt);
        continue;
      }

      // 狀態計時
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
        var first = e.castSkills[0];
        var castRange = num(first.Range, 430);
        if (d < castRange) {
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

      var moveSpd = e.spd * (e.spdMul || 1) * (e.slowT > 0 ? e.slowMul : 1);
      if (d > e.r + p.r + 2) {
        e.x += dx / d * moveSpd * dt;
        e.y += dy / d * moveSpd * dt;
        if (e.stateT <= 0) e.state = "walk";
      } else {
        if (e.stateT <= 0) e.state = "idle";
        e.atkCd -= dt;
        if (e.atkCd <= 0) {
          e.atkCd = 1.1;
          e.state = "attack";
          e.stateT = 0.45;
          damagePlayer(e.atk * (e.atkBuff || 1), "#ff7b7b");
          if (G.over) return;
        }
      }
      if (e.stateT > 0) {
        e.stateT -= dt;
        if (e.stateT <= 0) { e.stateT = 0; e.state = "idle"; }
      }
      e.hitFlash = Math.max(0, e.hitFlash - dt);
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

  function updateWaves(dt) {
    if (!G.roundActive) return;
    var rd = (G.level.RoundInfos || [])[G.roundIndex];
    if (!rd) return;

    if (G.spawnQueue.length) {
      G.spawnTimer -= dt;
      if (G.spawnTimer <= 0) {
        G.spawnTimer = 0.22;
        var s = G.spawnQueue.shift();
        spawnEnemy(s.enemyId, s.level, false, "", null, !!s.elite);
      }
    }

    var infinite = num(rd.Duration, 0) < 0;
    if (infinite) {
      if (!G.spawnQueue.length && G.enemies.length === 0) {
        G.roundActive = false;
        nextRound();
      }
      return;
    }

    G.roundTimer -= dt;
    if (G.roundTimer <= 0) {
      G.roundActive = false;
      if (G.enemies.length === 0 || !G.spawnQueue.length) nextRound();
      else G.roundWait = true;
    }
    if (G.roundWait && G.enemies.length === 0) {
      G.roundWait = false;
      nextRound();
    }
  }

  function endGame(victory) {
    if (G.over) return;
    G.over = true;
    G.victory = victory;

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

    s = toScreen(p.x, p.y);
    items.push({ d: p.y, kind: 2, o: p, sx: s.x, sy: s.y });

    items.sort(function (a, b) { return a.d - b.d; });

    for (i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.kind === 0) {
        ART.drawProp(ctx, it.o, it.sx, it.sy);
      } else if (it.kind === 1) {
        drawOneEnemy(it.o, it.sx, it.sy);
      } else {
        drawOnePlayer(it.o, it.sx, it.sy);
      }
    }
  }

  function drawOnePlayer(p, sx, sy) {
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
    var scaleMul = e.isBoss ? 1.35 : (e.elite ? 1.18 : 1);
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

    ART.drawEnemy(ctx, e, sx, sy, G.time, scaleMul);

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
      ctx.fillStyle = e.casting.sk.Color || "#b78bff";
      ctx.fillRect(sx - w / 2, barY - 7, w * cp, 3);
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
      }
      ctx.restore();
    }
  }

  function drawBullets() {
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      var s = toScreen(b.x, b.y);
      ctx.save();
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = b.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, b.r, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath(); ctx.arc(s.x - b.vx * 0.004, s.y - b.vy * 0.004, b.r * 0.42, 0, Math.PI * 2); ctx.fill();
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
      if (f.type === "ring") {
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
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
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
          cd = Math.max(0.5, slot.cdMax * (p.spellCdScale || 1));
          cur = slot.cd;
          locked = p.level < slot.unlock;
          noMp = p.mp < spellCost(sk);
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
      if (!G.paused && !G.over) {
        G.time += dt;
        updatePlayer(dt);
        playerAttack(dt);
        updateMagic(dt);
        updateBosses(dt);
        updateEnemies(dt);
        updateHazards(dt);
        updateGimmick(dt);
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
    // 數字鍵 1~4：手動詠唱魔法
    if (G && !G.paused && !G.over && /^[1-9]$/.test(k)) {
      var idx = Number(k) - 1;
      if (G.player.spells && idx < G.player.spells.length) {
        castSpell(idx, true);
        e.preventDefault();
      }
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
  // 等原版美術與該關卡的怪物圖載入完成再開場
  function startGame() {
    if (!CONFIG.Players || !CONFIG.Players.length || !CONFIG.Levels || !CONFIG.Levels.length) return;

    var li = clamp(selectedLevel, 0, CONFIG.Levels.length - 1);
    var lv = CONFIG.Levels[li] || {};
    var ids = lv.MonsterIDs || [];
    var note = document.getElementById("loadNote");

    function go() {
      if (note) note.textContent = "";
      startBtn.disabled = false;
      newGame();
    }

    startBtn.disabled = true;
    if (window.ART && !ART.isReady()) {
      if (note) note.textContent = "載入原版美術中…";
      ART.load().then(function () {
        return ART.loadMonsters(ids, function (done, total) {
          if (note) note.textContent = "載入怪物素材 " + done + " / " + total + "…";
        }, ["idle"]);
      }).then(function () {
        go();
        ART.loadMonsters(ids); // 其餘動作（行走／攻擊／死亡）背景補齊
      });
      return;
    }
    if (window.ART && ids.length) {
      if (note) note.textContent = "載入怪物素材 0 / " + ids.length + "…";
      ART.loadMonsters(ids, function (done, total) {
        if (note) note.textContent = "載入怪物素材 " + done + " / " + total + "…";
      }, ["idle"]).then(function () {
        go();
        ART.loadMonsters(ids);
      });
      return;
    }
    go();
  }

  startBtn.addEventListener("click", startGame);

  document.getElementById("quitBtn").addEventListener("click", function () {
    if (G) G.over = true;
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
    version: "2026-10-25-1"
  };

  loadConfig();
})();
