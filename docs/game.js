/* Crossgate Survivors - HTML5 web version
 * Reads docs/config/game_config.json (same schema as Unity/Godot data).
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
      { ID: 2, Name: "亂射", CD: 10, IsSpecial: true, Params: [{ Key: "Percent", Value: "80", Type: "int" }, { Key: "Count", Value: "1", Type: "int" }] }
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
          CONFIG = normalizeConfig(data);
          finish(true, p);
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
      Players: Array.isArray(data.Players) ? data.Players : FALLBACK.Players,
      Enemies: Array.isArray(data.Enemies) ? data.Enemies : FALLBACK.Enemies,
      Skills: Array.isArray(data.Skills) ? data.Skills : FALLBACK.Skills,
      Levels: Array.isArray(data.Levels) ? data.Levels : FALLBACK.Levels
    };
    if (!out.Players.length) out.Players = FALLBACK.Players;
    if (!out.Enemies.length) out.Enemies = FALLBACK.Enemies;
    if (!out.Skills.length) out.Skills = FALLBACK.Skills;
    if (!out.Levels.length) out.Levels = FALLBACK.Levels;
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
  }

  // ---------------------------------------------------------------- menu
  var selectedPlayer = 0;
  var selectedLevel = 0;
  var menuEl = document.getElementById("menu");
  var playerListEl = document.getElementById("playerList");
  var levelListEl = document.getElementById("levelList");
  var startBtn = document.getElementById("startBtn");

  function statLine(p) {
    return "ATK " + num(p.ATK, 0).toFixed(1) + " · DEF " + num(p.DEF, 0).toFixed(1) +
      " · HP " + num(p.HP, 0).toFixed(1) + " · SPD " + num(p.SPD, 0).toFixed(1);
  }

  function buildMenu() {
    if (!playerListEl || !levelListEl) return;
    playerListEl.innerHTML = "";
    levelListEl.innerHTML = "";

    CONFIG.Players.forEach(function (p, i) {
      var d = document.createElement("div");
      d.className = "card" + (i === selectedPlayer ? " selected" : "");
      d.innerHTML = '<div class="name"></div><div class="desc"></div><div class="stats"></div>';
      d.querySelector(".name").textContent = p.Name || ("角色 " + i);
      d.querySelector(".desc").textContent = p.Desc || "";
      d.querySelector(".stats").textContent = statLine(p);
      d.addEventListener("click", function () { selectedPlayer = i; buildMenu(); });
      playerListEl.appendChild(d);
    });

    CONFIG.Levels.forEach(function (lv, i) {
      var d = document.createElement("div");
      d.className = "card" + (i === selectedLevel ? " selected" : "");
      d.innerHTML = '<div class="name"></div><div class="desc"></div><div class="stats"></div>';
      d.querySelector(".name").textContent = lv.Name || ("關卡 " + (i + 1));
      var rounds = (lv.RoundInfos || []).length;
      d.querySelector(".desc").textContent = "難度 Lv." + num(lv.Difficulty, 1) + " · " + rounds + " 波攻勢";
      d.querySelector(".stats").textContent = "地圖 " + num(lv.MapWidth, 50) + "×" + num(lv.MapHeight, 50);
      d.addEventListener("click", function () { selectedLevel = i; buildMenu(); });
      levelListEl.appendChild(d);
    });

    startBtn.disabled = !(CONFIG.Players.length && CONFIG.Levels.length);
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
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);

  function newGame() {
    var pi = clamp(selectedPlayer, 0, CONFIG.Players.length - 1);
    var li = clamp(selectedLevel, 0, CONFIG.Levels.length - 1);
    var pInfo = CONFIG.Players[pi];
    var lv = CONFIG.Levels[li];
    var grow = CONFIG.PlayerGrow;

    var worldW = Math.max(20, num(lv.MapWidth, 50)) * TILE;
    var worldH = Math.max(20, num(lv.MapHeight, 50)) * TILE;

    var player = {
      x: worldW / 2,
      y: worldH / 2,
      r: 15,
      face: 1,
      hp: 0, maxhp: 0,
      atk: 0, def: 0, spd: 0,
      level: 1, exp: 0, nextExp: 12,
      atkSkillId: num(pInfo.ATKSkill, 0),
      specialSkillId: num(pInfo.SpecialSkill, -1),
      atkCd: 0, specialCd: 0,
      magnet: 95,
      hitFlash: 0
    };

    player.maxhp = 70 + num(pInfo.HP, 3) * 22;
    player.atk = 7 + num(pInfo.ATK, 4) * 5;
    player.def = num(pInfo.DEF, 3) * 2.2;
    player.spd = 105 + num(pInfo.SPD, 3) * 7;
    player.hp = player.maxhp;

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
      time: 0,
      kills: 0,
      roundIndex: -1,
      roundTimer: 0,
      roundActive: false,
      spawnQueue: [],
      spawnTimer: 0,
      bossActive: null,
      paused: false,
      over: false,
      victory: false,
      playerInfo: pInfo,
      level: lv,
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
    document.getElementById("levelName").textContent = G.levelName;
    buildSkillBar();
    nextRound();
    lastTs = 0;
    requestAnimationFrame(frame);
  }

  function buildSkillBar() {
    var bar = document.getElementById("skillBar");
    if (!bar) return;
    bar.innerHTML = "";
    var ids = [G.player.atkSkillId];
    if (G.player.specialSkillId >= 0) ids.push(G.player.specialSkillId);
    ids.forEach(function (id) {
      var sk = skillById(id) || { Name: "技能" + id, CD: 2 };
      var chip = document.createElement("div");
      chip.className = "skillChip";
      chip.innerHTML = '<b></b><span></span><i class="cd"></i>';
      chip.querySelector("b").textContent = sk.Name || ("技能" + id);
      chip.querySelector("span").textContent = "CD " + num(sk.CD, 2).toFixed(0) + "s";
      chip.dataset.skillId = String(id);
      bar.appendChild(chip);
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

    var ids = rd.EnemyIDs || [];
    var count = Math.max(1, num(rd.SpawnCountPerEnemy, 8));
    ids.forEach(function (id) {
      for (var i = 0; i < count; i++) G.spawnQueue.push({ enemyId: num(id, 0), level: num(rd.Level, 1) });
    });

    var bosses = rd.BossInfos || [];
    bosses.forEach(function (b) {
      spawnEnemy(num(b.EnemyID, 0), num(b.Level, 1), true, b.NamePrefix || "");
      var allies = b.Allies || [];
      var per = Math.max(1, num(b.SpawnPerAlly, 8));
      allies.forEach(function (aid) {
        for (var i = 0; i < per; i++) G.spawnQueue.push({ enemyId: num(aid, 0), level: num(rd.Level, 1) });
      });
    });

    G.spawnTimer = 0;
    toast("第 " + (G.roundIndex + 1) + " 波" + (bosses.length ? " · BOSS 來襲" : ""));
  }

  function spawnEnemy(id, level, isBoss, prefix) {
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

    var maxhp = (24 + num(info.HP, 3) * 18) * hpScale * (isBoss ? 14 : 1);
    var e = {
      x: x, y: y, r: isBoss ? 26 : 13,
      id: num(info.ID, id),
      name: (prefix || "") + (info.Name || "怪物"),
      hp: maxhp, maxhp: maxhp,
      atk: (5 + num(info.ATK, 2) * 3) * atkScale * (isBoss ? 1.7 : 1),
      def: num(info.DEF, 2) * 1.8 * (isBoss ? 1.5 : 1),
      spd: 38 + num(info.SPD, 2) * 8,
      isBoss: !!isBoss,
      atkCd: rand(0.4, 1.4),
      hitFlash: 0,
      exp: (6 + lv * 2) * (isBoss ? 12 : 1)
    };
    G.enemies.push(e);
    if (isBoss) G.bossActive = e;
    return e;
  }

  // ---------------------------------------------------------------- combat
  function dealDamage(e, amount) {
    var dmg = Math.max(1, amount - e.def * 0.55);
    e.hp -= dmg;
    e.hitFlash = 0.12;
    G.floaters.push({ x: e.x, y: e.y - e.r - 6, text: Math.round(dmg), t: 0.7, color: "#ffe082" });
    if (e.hp <= 0) killEnemy(e);
  }

  function killEnemy(e) {
    var i = G.enemies.indexOf(e);
    if (i >= 0) G.enemies.splice(i, 1);
    G.kills++;
    if (e.isBoss && G.bossActive === e) G.bossActive = null;
    G.orbs.push({ x: e.x, y: e.y, v: e.exp, r: 5 });
    for (var k = 0; k < (e.isBoss ? 10 : 1); k++) {
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: e.r, max: e.r * 3, t: 0.35, color: "#ff9b6a" });
    }
  }

  function playerAttack(dt) {
    var p = G.player;
    var atkSkill = skillById(p.atkSkillId) || { CD: 2, Params: [] };
    p.atkCd -= dt;
    if (p.atkCd <= 0) {
      var target = nearestEnemy(p, 420);
      if (target) {
        p.atkCd = Math.max(0.18, num(atkSkill.CD, 2));
        var percent = param(atkSkill, "Percent", 100);
        var count = Math.max(1, param(atkSkill, "Count", 1));
        var dmg = p.atk * percent / 100;
        for (var i = 0; i < count; i++) {
          var t = nearestEnemy(p, 460);
          if (!t) break;
          dealDamage(t, dmg);
          G.fx.push({ type: "slash", x: t.x, y: t.y, t: 0.18, r: 26, color: "#9fe8ff" });
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

  function nearestEnemy(from, maxDist) {
    var best = null, bestD = maxDist * maxDist;
    for (var i = 0; i < G.enemies.length; i++) {
      var d = dist2(G.enemies[i], from);
      if (d < bestD) { bestD = d; best = G.enemies[i]; }
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
    if (len > 0) {
      mx /= len; my /= len;
      p.x = clamp(p.x + mx * p.spd * dt, p.r, G.worldW - p.r);
      p.y = clamp(p.y + my * p.spd * dt, p.r, G.worldH - p.r);
      if (Math.abs(mx) > 0.05) p.face = mx > 0 ? 1 : -1;
    }

    p.hitFlash = Math.max(0, p.hitFlash - dt);

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
    p.atk += Math.max(0.8, p.atk * G.grow.ATK * 1.6);
    p.def += Math.max(0.3, p.def * G.grow.DEF);
    p.spd += Math.max(0.5, p.spd * G.grow.SPD);
    p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.2);
    G.upPending++;
    showUpgrades();
  }

  var UPGRADES = [
    { name: "力量", desc: "攻擊力 +12%", apply: function (p) { p.atk *= 1.12; } },
    { name: "體魄", desc: "最大生命 +15%", apply: function (p) { p.maxhp *= 1.15; p.hp += p.maxhp * 0.1; } },
    { name: "守護", desc: "防禦 +20%", apply: function (p) { p.def *= 1.2; } },
    { name: "疾風", desc: "移動速度 +10%", apply: function (p) { p.spd *= 1.1; } },
    { name: "吸血", desc: "擊殺回復 3% 生命", apply: function (p) { p.lifesteal = (p.lifesteal || 0) + 0.03; } },
    { name: "磁力", desc: "拾取範圍 +25%", apply: function (p) { p.magnet *= 1.25; } },
    { name: "暴擊", desc: "暴擊率 +8%", apply: function (p) { p.crit = (p.crit || 0) + 0.08; } },
    { name: "急速", desc: "技能冷卻 -8%", apply: function (p) { p.atkCdScale = (p.atkCdScale || 1) * 0.92; } }
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
        d.className = "card";
        d.innerHTML = '<div class="name"></div><div class="desc"></div>';
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

  function updateEnemies(dt) {
    var p = G.player;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      var dx = p.x - e.x, dy = p.y - e.y;
      var d = Math.hypot(dx, dy) || 1;
      if (d > e.r + p.r + 2) {
        e.x += dx / d * e.spd * dt;
        e.y += dy / d * e.spd * dt;
      } else {
        e.atkCd -= dt;
        if (e.atkCd <= 0) {
          e.atkCd = 1.1;
          var raw = Math.max(1, e.atk - p.def * 0.5);
          p.hp -= raw;
          p.hitFlash = 0.15;
          G.floaters.push({ x: p.x, y: p.y - 30, text: "-" + Math.round(raw), t: 0.7, color: "#ff7b7b" });
          if (p.hp <= 0) { p.hp = 0; endGame(false); return; }
        }
      }
      e.hitFlash = Math.max(0, e.hitFlash - dt);
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
        spawnEnemy(s.enemyId, s.level, false, "");
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
    document.getElementById("gameOverTitle").textContent = victory ? "通關！" : "遊戲結束";
    document.getElementById("gameOverStats").textContent =
      "存活 " + formatTime(G.time) + " · 等級 " + G.player.level + " · 擊殺 " + G.kills;
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

  // ---------------------------------------------------------------- render
  function drawBackground() {
    var cam = G.cam;
    var ox = cam.x - W / 2, oy = cam.y - H / 2;
    ctx.fillStyle = "#12161f";
    ctx.fillRect(0, 0, W, H);

    var x0 = Math.floor(ox / TILE) - 1, x1 = Math.ceil((ox + W) / TILE) + 1;
    var y0 = Math.floor(oy / TILE) - 1, y1 = Math.ceil((oy + H) / TILE) + 1;
    for (var gx = x0; gx <= x1; gx++) {
      for (var gy = y0; gy <= y1; gy++) {
        if ((gx + gy) % 2 === 0) continue;
        var sx = gx * TILE - ox, sy = gy * TILE - oy;
        if (gx * TILE < 0 || gy * TILE < 0 || gx * TILE > G.worldW || gy * TILE > G.worldH) continue;
        ctx.fillStyle = "#161b26";
        ctx.fillRect(sx, sy, TILE, TILE);
      }
    }

    ctx.strokeStyle = "rgba(90,120,170,0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(-ox, -oy, G.worldW, G.worldH);
  }

  function drawPlayer() {
    var p = G.player;
    var sx = p.x - G.cam.x + W / 2;
    var sy = p.y - G.cam.y + H / 2;

    ctx.beginPath();
    ctx.arc(sx, sy + 6, p.r * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sx, sy, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.hitFlash > 0 ? "#ffffff" : "#5ad1ff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0c2a3a";
    ctx.stroke();

    // weapon indicator
    ctx.beginPath();
    ctx.moveTo(sx + p.face * (p.r - 2), sy - 4);
    ctx.lineTo(sx + p.face * (p.r + 12), sy);
    ctx.lineTo(sx + p.face * (p.r - 2), sy + 4);
    ctx.closePath();
    ctx.fillStyle = "#ffe08a";
    ctx.fill();

    // hp ring
    ctx.beginPath();
    ctx.arc(sx, sy, p.r + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (p.hp / p.maxhp));
    ctx.strokeStyle = "#ff6b6b";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(230,240,255,0.85)";
    ctx.fillText(G.playerName + " Lv." + p.level, sx, sy - p.r - 12);
  }

  function drawEnemies() {
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      var sx = e.x - G.cam.x + W / 2;
      var sy = e.y - G.cam.y + H / 2;
      if (sx < -80 || sy < -80 || sx > W + 80 || sy > H + 80) continue;

      ctx.beginPath();
      ctx.ellipse(sx, sy + e.r * 0.7, e.r * 0.9, e.r * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, e.r, 0, Math.PI * 2);
      var hue = (e.id * 47) % 360;
      ctx.fillStyle = e.hitFlash > 0 ? "#ffffff" : (e.isBoss ? "#ff8a4c" : "hsl(" + hue + ",45%,52%)");
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = e.isBoss ? "#ffd9a8" : "rgba(0,0,0,0.4)";
      ctx.stroke();

      var w = e.r * 2.2, hpr = clamp(e.hp / e.maxhp, 0, 1);
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(sx - w / 2, sy - e.r - 11, w, 4);
      ctx.fillStyle = hpr > 0.5 ? "#6ee7a8" : (hpr > 0.22 ? "#ffd166" : "#ff6b6b");
      ctx.fillRect(sx - w / 2, sy - e.r - 11, w * hpr, 4);

      if (e.isBoss) {
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffd9a8";
        ctx.fillText(e.name + " Lv." + Math.round(e.hp) + "/" + Math.round(e.maxhp), sx, sy - e.r - 18);
      }
    }
  }

  function drawOrbs() {
    for (var i = 0; i < G.orbs.length; i++) {
      var o = G.orbs[i];
      var sx = o.x - G.cam.x + W / 2, sy = o.y - G.cam.y + H / 2;
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
    for (var i = G.fx.length - 1; i >= 0; i--) {
      var f = G.fx[i];
      f.t -= dt;
      if (f.t <= 0) { G.fx.splice(i, 1); continue; }
      var sx = f.x - G.cam.x + W / 2, sy = f.y - G.cam.y + H / 2;
      if (f.type === "ring") {
        var k = 1 - f.t / 0.45;
        ctx.beginPath();
        ctx.arc(sx, sy, f.r + (f.max - f.r) * k, 0, Math.PI * 2);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = Math.max(0, f.t / 0.45);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
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

    for (var j = G.floaters.length - 1; j >= 0; j--) {
      var t = G.floaters[j];
      t.t -= dt;
      t.y -= 34 * dt;
      if (t.t <= 0) { G.floaters.splice(j, 1); continue; }
      var fx = t.x - G.cam.x + W / 2, fy = t.y - G.cam.y + H / 2;
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

    var expPct = clamp(p.exp / p.nextExp, 0, 1) * 100;
    document.getElementById("expFill").style.width = expPct + "%";
    document.getElementById("expText").textContent = p.exp + "/" + p.nextExp;

    var chips = document.querySelectorAll(".skillChip");
    for (var i = 0; i < chips.length; i++) {
      var id = Number(chips[i].dataset.skillId);
      var sk = skillById(id);
      var cd = num(sk && sk.CD, 2);
      var cur = (id === p.atkSkillId) ? p.atkCd : p.specialCd;
      var fill = chips[i].querySelector(".cd");
      var pct = cd > 0 ? clamp(cur / cd, 0, 1) * 100 : 0;
      fill.style.height = pct + "%";
    }
  }

  // ---------------------------------------------------------------- loop
  var lastTs = 0;

  function frame(ts) {
    if (!G) return;
    if (!lastTs) lastTs = ts;
    var dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;

    if (!G.paused && !G.over) {
      G.time += dt;
      updatePlayer(dt);
      playerAttack(dt);
      updateEnemies(dt);
      updateWaves(dt);

      // camera lerp
      var tx = clamp(G.player.x, W / 2, Math.max(W / 2, G.worldW - W / 2));
      var ty = clamp(G.player.y, H / 2, Math.max(H / 2, G.worldH - H / 2));
      G.cam.x += (tx - G.cam.x) * Math.min(1, dt * 7);
      G.cam.y += (ty - G.cam.y) * Math.min(1, dt * 7);
    }

    drawBackground();
    drawOrbs();
    drawEnemies();
    drawPlayer();
    drawFx(dt);
    drawVignette();
    updateHud();

    if (!G.over) requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- input
  document.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    keys[k] = true;
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].indexOf(k) >= 0) e.preventDefault();
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
  startBtn.addEventListener("click", function () {
    if (!configLoaded) return;
    newGame();
  });

  document.getElementById("quitBtn").addEventListener("click", function () {
    if (G) G.over = true;
    hud.classList.add("hidden");
    menuEl.classList.remove("hidden");
    gameOverEl.classList.add("hidden");
    levelUpEl.classList.add("hidden");
  });

  document.getElementById("retryBtn").addEventListener("click", function () {
    gameOverEl.classList.add("hidden");
    newGame();
  });

  document.getElementById("menuBtn").addEventListener("click", function () {
    gameOverEl.classList.add("hidden");
    hud.classList.add("hidden");
    menuEl.classList.remove("hidden");
  });

  // ---------------------------------------------------------------- boot
  resize();
  loadConfig();
})();
