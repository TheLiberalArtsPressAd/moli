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
      " · HP " + num(p.HP, 0).toFixed(1) + " · SPD " + num(p.SPD, 0).toFixed(1);
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
      d.querySelector(".desc").textContent = p.Desc || "";
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
      invT: 0
    };

    player.maxhp = (100 + num(pInfo.HP, 3) * 26) * (1 + loopCount * 0.28);
    player.atk = (7 + num(pInfo.ATK, 4) * 5) * (1 + loopCount * 0.24);
    player.def = num(pInfo.DEF, 3) * 2.2 * (1 + loopCount * 0.2);
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
      bullets: [],
      zones: [],
      lasers: [],
      shockwaves: [],
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
    var ids = [G.player.atkSkillId];
    if (G.player.specialSkillId >= 0) ids.push(G.player.specialSkillId);
    ids.forEach(function (id) {
      var sk = skillById(id) || { Name: "技能" + id, CD: 2 };
      var chip = document.createElement("div");
      chip.className = "skillChip";
      chip.innerHTML = '<img class="ico" alt=""><b></b><span></span><i class="cd"></i>';
      var ico = chip.querySelector("img.ico");
      if (sk.Icon) ico.src = ART.skillIcon(sk.Icon);
      else ico.style.display = "none";
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
    G.bosses = [];
    G.bullets.length = 0;
    G.zones.length = 0;
    G.lasers.length = 0;
    G.shockwaves.length = 0;

    var ids = rd.EnemyIDs || [];
    var count = Math.max(1, num(rd.SpawnCountPerEnemy, 8));
    ids.forEach(function (id) {
      for (var i = 0; i < count; i++) G.spawnQueue.push({ enemyId: num(id, 0), level: num(rd.Level, 1) });
    });

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
    toast("第 " + (G.roundIndex + 1) + " 波" + (bosses.length ? " · BOSS 來襲" : ""));
    if (bosses.length) showBossIntro(bosses[0], bosses.length > 1);
  }

  function spawnEnemy(id, level, isBoss, prefix, bossInfo) {
    bossInfo = bossInfo || {};
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

    var maxhp = (24 + num(info.HP, 3) * 18) * hpScale * (isBoss ? 4.2 : 1) * hpMul * (1 + loopCount * 0.55);
    var shownName = (isBoss && bossInfo.Name) ? bossInfo.Name : (info.Name || "怪物");
    var e = {
      x: x, y: y, r: isBoss ? 26 : 13,
      id: num(info.ID, id),
      mon: info.Art || null,
      name: (prefix || "") + shownName,
      monName: info.Name || shownName,
      hp: maxhp, maxhp: maxhp,
      atk: (4 + num(info.ATK, 2) * 2.4) * atkScale * (isBoss ? 1.7 : 1) * atkMul * (1 + loopCount * 0.4),
      def: num(info.DEF, 2) * 1.8 * (isBoss ? 1.5 : 1),
      spd: 38 + num(info.SPD, 2) * 8,
      isBoss: !!isBoss,
      atkCd: rand(0.4, 1.4),
      hitFlash: 0,
      state: "idle",
      stateT: 0,
      dying: false,
      dieT: 0,
      exp: (6 + lv * 2) * (isBoss ? 12 : 1),
      bossTitle: bossInfo.Title || "",
      bossColor: bossInfo.Color || "#ff9b6a",
      abilities: (bossInfo.Mechanic || []).slice(),
      phase2At: num(bossInfo.Phase2At, 0.5),
      phase: 1,
      abilityCd: rand(2.4, 3.6),
      abilityIndex: 0,
      castT: 0,
      dash: null,
      auraT: 0
    };
    G.enemies.push(e);
    if (isBoss) {
      G.bossActive = e;
      G.bosses.push(e);
    }
    return e;
  }

  // ---------------------------------------------------------------- combat
  function dealDamage(e, amount) {
    if (e.dying) return;
    var dmg = Math.max(1, amount - e.def * 0.55);
    e.hp -= dmg;
    e.hitFlash = 0.12;
    if (e.hp > 0 && !e.isBoss) {
      var kx = e.x - G.player.x, ky = e.y - G.player.y;
      var kd = Math.hypot(kx, ky) || 1;
      e.x = clamp(e.x + kx / kd * 16, e.r, G.worldW - e.r);
      e.y = clamp(e.y + ky / kd * 16, e.r, G.worldH - e.r);
      e.state = "hurt"; e.stateT = 0.16;
    }
    G.floaters.push({ x: e.x, y: e.y - e.r - 6, text: Math.round(dmg), t: 0.7, color: "#ffe082" });
    if (e.hp <= 0) killEnemy(e);
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
    G.orbs.push({ x: e.x, y: e.y, v: e.exp, r: 5 });
    for (var k = 0; k < (e.isBoss ? 10 : 1); k++) {
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: e.r, max: e.r * 3, t: 0.35, color: "#ff9b6a" });
    }
  }

  // ---------------------------------------------------------------- boss / hazard
  function damagePlayer(amount, color) {
    var p = G.player;
    if (p.invT > 0 || p.hp <= 0) return;
    p.invT = 0.26;
    var raw = Math.max(1, amount - p.def * 0.35);
    p.hp -= raw;
    p.hitFlash = 0.15;
    G.floaters.push({ x: p.x, y: p.y - 30, text: "-" + Math.round(raw), t: 0.7, color: color || "#ff7b7b" });
    if (p.hp <= 0) { p.hp = 0; endGame(false); }
  }

  function addBullet(x, y, ang, speed, dmg, color, r) {
    G.bullets.push({
      x: x, y: y,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      r: r || 8, dmg: dmg, color: color || "#ffb15c",
      t: 5.2
    });
  }

  function updateBosses(dt) {
    var p = G.player;
    for (var i = 0; i < G.enemies.length; i++) {
      var e = G.enemies[i];
      if (!e.isBoss || e.dying) continue;

      // 第二階段：血量過半後狂暴
      var ratio = e.hp / e.maxhp;
      if (e.phase === 1 && ratio <= e.phase2At) {
        e.phase = 2;
        e.auraT = 0;
        toast(e.name + " 進入狂暴！");
        G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 260, t: 0.6, color: e.bossColor });
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

      e.abilityCd -= dt * (e.phase === 2 ? 1.45 : 1);
      if (e.abilityCd > 0) continue;

      var list = e.abilities.length ? e.abilities : ["volley"];
      var kind = list[e.abilityIndex % list.length];
      e.abilityIndex++;
      e.abilityCd = Math.max(2.0, 4.8 - num(G.level.Difficulty, 1) * 0.09);
      e.castT = 0.45;
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

    if (kind === "nova") {
      var n = 10 + phase * 4;
      for (var i = 0; i < n; i++) {
        addBullet(e.x, e.y - 40, ang + (i / n) * Math.PI * 2, 170, dmg * 0.42, color, 9);
      }
    } else if (kind === "volley") {
      var vn = 3 + phase * 2;
      for (var j = 0; j < vn; j++) {
        var off = (j - (vn - 1) / 2) * 0.19;
        addBullet(e.x, e.y - 40, ang + off, 245, dmg * 0.46, color, 7);
      }
    } else if (kind === "charge") {
      e.dash = { ang: ang, t: 0.55, dur: 0.42, hit: false };
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 20, max: 150, t: 0.5, color: color });
    } else if (kind === "summon") {
      var allies = [];
      for (var m = 0; m < G.level.MonsterIDs.length; m++) {
        var mid = G.level.MonsterIDs[m];
        for (var q = 0; q < CONFIG.Enemies.length; q++) {
          if (CONFIG.Enemies[q].Art === mid) { allies.push(CONFIG.Enemies[q].ID); break; }
        }
      }
      var sn = 3 + phase;
      for (var s = 0; s < sn && allies.length; s++) {
        var pickId = allies[Math.floor(Math.random() * allies.length)];
        var spawned = spawnEnemy(pickId, num(e.bossTitle ? G.level.Difficulty + 4 : 1, 1), false, "");
        var a2 = Math.random() * Math.PI * 2;
        spawned.x = clamp(e.x + Math.cos(a2) * 90, 40, G.worldW - 40);
        spawned.y = clamp(e.y + Math.sin(a2) * 90, 40, G.worldH - 40);
      }
    } else if (kind === "pool") {
      var pn = 2 + phase;
      for (var pz = 0; pz < pn; pz++) {
        G.zones.push({
          x: clamp(p.x + rand(-110, 110), 40, G.worldW - 40),
          y: clamp(p.y + rand(-110, 110), 40, G.worldH - 40),
          r: 62 + phase * 8, delay: 0, life: 5.5, max: 5.5,
          dps: dmg * 0.34, color: color, tick: 0
        });
      }
    } else if (kind === "meteor") {
      var mn = 4 + phase * 2;
      for (var mt = 0; mt < mn; mt++) {
        G.zones.push({
          x: clamp(p.x + rand(-170, 170), 40, G.worldW - 40),
          y: clamp(p.y + rand(-170, 170), 40, G.worldH - 40),
          r: 58, delay: 0.85, life: 3.6, max: 3.6,
          dps: dmg * 0.55, color: color, tick: 0, meteor: true
        });
      }
    } else if (kind === "laser") {
      G.lasers.push({
        x: e.x, y: e.y, ang: ang, warn: 0.8, active: 0.32, t: 0,
        len: 1100, width: 34, dmg: dmg * 0.8, color: color, hit: false
      });
    } else if (kind === "shockwave") {
      G.shockwaves.push({
        x: e.x, y: e.y, r: 24, max: 430 + phase * 70, t: 0,
        dmg: dmg * 0.5, color: color, hit: false
      });
    } else if (kind === "heal") {
      e.hp = Math.min(e.maxhp, e.hp + e.maxhp * 0.12);
      G.floaters.push({ x: e.x, y: e.y - 70, text: "+" + Math.round(e.maxhp * 0.12), t: 0.9, color: "#8fffb0" });
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 24, max: 160, t: 0.5, color: "#8fffb0" });
    } else if (kind === "teleport") {
      var da = Math.random() * Math.PI * 2;
      e.x = clamp(p.x + Math.cos(da) * 260, e.r, G.worldW - e.r);
      e.y = clamp(p.y + Math.sin(da) * 260, e.r, G.worldH - e.r);
      G.fx.push({ type: "ring", x: e.x, y: e.y, r: 16, max: 120, t: 0.4, color: color });
      var tn = 8 + phase * 2;
      for (var ti = 0; ti < tn; ti++) {
        addBullet(e.x, e.y - 30, (ti / tn) * Math.PI * 2, 190, dmg * 0.4, color, 8);
      }
    }
  }

  function updateHazards(dt) {
    var p = G.player;
    var i;

    // 彈幕
    for (i = G.bullets.length - 1; i >= 0; i--) {
      var b = G.bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.t -= dt;
      if (b.t <= 0 || b.x < 0 || b.y < 0 || b.x > G.worldW || b.y > G.worldH) {
        G.bullets.splice(i, 1);
        continue;
      }
      if (dist2(b, p) < (b.r + p.r) * (b.r + p.r)) {
        damagePlayer(b.dmg, b.color);
        G.fx.push({ type: "ring", x: b.x, y: b.y, r: b.r, max: b.r * 2.5, t: 0.25, color: b.color });
        G.bullets.splice(i, 1);
      }
    }

    // 地面持續傷害
    for (i = G.zones.length - 1; i >= 0; i--) {
      var z = G.zones[i];
      if (z.delay > 0) { z.delay -= dt; continue; }
      z.life -= dt;
      if (z.life <= 0) { G.zones.splice(i, 1); continue; }
      z.tick -= dt;
      if (dist2(z, p) < z.r * z.r && z.tick <= 0) {
        z.tick = 0.5;
        damagePlayer(z.dps * 0.5, z.color);
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
          }
        }
      }
    }

    // 衝擊波
    for (i = G.shockwaves.length - 1; i >= 0; i--) {
      var sw = G.shockwaves[i];
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
      p.vx = mx * p.spd; p.vy = my * p.spd;
      p.x = clamp(p.x + p.vx * dt, p.r, G.worldW - p.r);
      p.y = clamp(p.y + p.vy * dt, p.r, G.worldH - p.r);
      if (Math.abs(mx) > 0.05) p.face = mx > 0 ? 1 : -1;
    } else {
      p.vx = 0; p.vy = 0;
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
    p.atk += Math.max(0.8, p.atk * G.grow.ATK * 1.6);
    p.def += Math.max(0.3, p.def * G.grow.DEF);
    p.spd += Math.max(0.5, p.spd * G.grow.SPD);
    p.hp = Math.min(p.maxhp, p.hp + p.maxhp * 0.2);
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
    { name: "急速", desc: "技能冷卻 -8%", icon: 10139, apply: function (p) { p.atkCdScale = (p.atkCdScale || 1) * 0.92; } }
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
        if (u.icon) d.querySelector("img.ico").src = ART.skillIcon(u.icon);
        else d.querySelector("img.ico").style.display = "none";
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

      var dx = p.x - e.x, dy = p.y - e.y;
      var d = Math.hypot(dx, dy) || 1;
      if (d > e.r + p.r + 2) {
        e.x += dx / d * e.spd * dt;
        e.y += dy / d * e.spd * dt;
        if (e.stateT <= 0) e.state = "walk";
      } else {
        if (e.stateT <= 0) e.state = "idle";
        e.atkCd -= dt;
        if (e.atkCd <= 0) {
          e.atkCd = 1.1;
          e.state = "attack";
          e.stateT = 0.45;
          damagePlayer(e.atk, "#ff7b7b");
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
      heal: "月之治療", teleport: "瞬移"
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
    var scaleMul = e.isBoss ? 1.35 : 1;
    if (e.isBoss) {
      var aura = e.phase === 2 ? 0.5 + 0.28 * Math.sin(G.time * 6) : 0.3;
      var ag = ctx.createRadialGradient(sx, sy - 6, 8, sx, sy - 6, e.r * 3.4);
      ag.addColorStop(0, hexA(e.bossColor, aura * 0.7));
      ag.addColorStop(1, hexA(e.bossColor, 0));
      ctx.save();
      ctx.fillStyle = ag;
      ctx.beginPath();
      ctx.ellipse(sx, sy - 2, e.r * 3.4, e.r * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ART.drawEnemy(ctx, e, sx, sy, G.time, scaleMul);

    var top = sy - (e.visH || (e.isBoss ? 118 : 68));
    var w = e.isBoss ? 96 : clamp((e.visW || 46) * 0.8, 32, 62);
    var hpr = clamp(e.hp / e.maxhp, 0, 1);
    var barY = top - 8;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(sx - w / 2, barY, w, 4);
    ctx.fillStyle = hpr > 0.5 ? "#6ee7a8" : (hpr > 0.22 ? "#ffd166" : "#ff6b6b");
    ctx.fillRect(sx - w / 2, barY, w * hpr, 4);

    if (e.isBoss) {
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffd9a8";
      ctx.fillText(e.name + " · " + Math.ceil(hpr * 100) + "%", sx, barY - 6);
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
        g.addColorStop(0, hexA(z.color, 0.4));
        g.addColorStop(0.7, hexA(z.color, 0.22));
        g.addColorStop(1, hexA(z.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0, 0, z.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = hexA(z.color, 0.45);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, 0, z.r * (0.94 + 0.05 * Math.sin(G.time * 4)), 0, Math.PI * 2); ctx.stroke();
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
    for (var i = G.fx.length - 1; i >= 0; i--) {
      var f = G.fx[i];
      f.t -= dt;
      if (f.t <= 0) { G.fx.splice(i, 1); continue; }
      var spf = toScreen(f.x, f.y);
      var sx = spf.x, sy = spf.y;
      if (f.type === "ring") {
        var k = 1 - f.t / 0.45;
        ctx.beginPath();
        ctx.arc(sx, sy, f.r + (f.max - f.r) * k, 0, Math.PI * 2);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = Math.max(0, f.t / 0.45);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
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
        document.getElementById("bossPhase").textContent = boss.phase === 2 ? "狂暴" : "第一階段";
        document.getElementById("bossPhase").className = "bossPhase" + (boss.phase === 2 ? " enraged" : "");
      } else {
        bossBar.classList.add("hidden");
      }
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
      updateBosses(dt);
      updateEnemies(dt);
      updateHazards(dt);
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
    drawLasers();
    ART.drawAmbient(ctx, G.scene, G.cam, W, H, G.time);
    drawFx(dt);
    ART.drawFog(ctx, G.scene, W, H);
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
    version: "2026-10-24-2"
  };

  loadConfig();
})();
