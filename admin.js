/* 簡易自動表單編輯器：覆蓋所有設定欄位 */
(function () {
  "use strict";

  var KEY = "moli_cfg_draft_v1";
  var TABS = [
    { id: "growth", label: "全局成長", type: "growth" },
    { id: "players", label: "角色 Players", type: "list", key: "Players", itemLabel: "Player" },
    { id: "enemies", label: "怪物 Enemies", type: "list", key: "Enemies", itemLabel: "Enemy" },
    { id: "skills", label: "技能 Skills", type: "list", key: "Skills", itemLabel: "Skill" },
    { id: "levels", label: "關卡 Levels", type: "list", key: "Levels", itemLabel: "Level" }
  ];

  var LABELS = {
    Name: "名稱", Desc: "描述", SkillDesc: "技能描述", AbilityDescTpl: "能力說明", AbilityLevelUpDescTpl: "升級說明",
    Index: "索引", Serial: "Serial", WeaponSerial: "武器Serial", CoverIndex: "封面索引", Icon: "圖示",
    ATK: "攻擊", DEF: "防禦", HP: "生命", MP: "魔力", SPD: "速度", ATKSkill: "普攻技能ID", SpecialSkill: "特殊技能ID", BelongSkillID: "所屬技能ID",
    CD: "冷卻", CDReduceRatePerLevel: "每級冷卻減少", MaxLevel: "最高等級", MPCost: "魔力消耗", MPCostPerLevel: "每級消耗",
    IsSpecial: "是否特殊", IsLearnable: "可學習", IsAutoSkill: "自動施放",
    Difficulty: "難度", MapWidth: "地圖寬", MapHeight: "地圖高", PaletIndex: "調色板", Audio: "音效", BorderSerial: "邊界Serial",
    GroundSerials: "地板Serials", DecorationsSerials: "裝飾Serials", UnitSerials: "單位Serials", NPCInfos: "NPC列表", RoundInfos: "波次列表",
    PlayerGrow: "玩家成長", EnemyGrow: "怪物成長", Players: "玩家", Enemies: "怪物", Skills: "技能", Levels: "關卡",
    Level: "等級", EnemyIDs: "怪物ID列表", SpawnCountPerEnemy: "每種數量", Duration: "持續秒數(-1無限)", ExtraDisturbEnemyIDs: "額外干擾", BossInfos: "Boss資訊",
    EnemyID: "怪物ID", NamePrefix: "名稱前綴", Allies: "小怪ID", SpawnPerAlly: "每波小怪數", AlliesSpawnInterval: "間隔", AlliesSpawnTimes: "次數", Skills: "技能清單",
    SkillID: "技能ID", Percent: "傷害%", Count: "次數", Range: "範圍", Distance: "距離", Speed: "速度", Through: "穿透", Rate: "頻率", Radius: "半徑", Effect: "效果", Light: "光環類型",
    Magic: "魔法書(技能ID)", Kind: "技能類型", Element: "屬性", UnlockLevel: "解鎖等級", Side: "陣營", CastTime: "詠唱秒數",
    Phase2At: "第二階段血量%", Phase3At: "第三階段血量%", HpMul: "血量倍率", AtkMul: "攻擊倍率",
    Mechanic: "Boss招式", Title: "稱號", Gimmick: "地區機制", EliteCount: "精英數量", Event: "波次事件",
    Interval: "間隔秒數", Color: "顏色", Terrain: "地形", BossNames: "Boss名稱", BossTitle: "Boss稱號",
    BossSubtitle: "Boss副標", BossLore: "Boss背景", BossColor: "Boss顏色", ArenaColor: "競技場顏色", BossAbilities: "Boss招式列表",
    MonsterCount: "怪物數", MonsterIDs: "怪物ID列表", Region: "地區", Type: "類型", Value: "數值", Key: "參數"
  };

  function label(k) { return LABELS[k] || k; }

  var cfg = null;
  var state = { tab: "growth", idx: 0 };

  var nav = document.getElementById("nav");
  var content = document.getElementById("content");
  var addBtn = document.getElementById("addBtn");
  var dupBtn = document.getElementById("dupBtn");
  var delBtn = document.getElementById("delBtn");
  var reloadBtn = document.getElementById("reloadBtn");
  var downloadBtn = document.getElementById("downloadBtn");
  var status = document.getElementById("status");
  var hint = document.getElementById("hint");

  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function isObj(x) { return x && typeof x === "object" && !Array.isArray(x); }

  TABS.forEach(function (t) {
    var b = document.createElement("button");
    b.className = "navItem" + (t.id === state.tab ? " active" : "");
    b.textContent = t.label;
    b.addEventListener("click", function () { state.tab = t.id; state.idx = 0; saveDraft(); render(); });
    nav.appendChild(b);
  });

  function updateNav() {
    var items = nav.querySelectorAll(".navItem");
    TABS.forEach(function (t, i) { items[i].classList.toggle("active", t.id === state.tab); });
  }

  function load() {
    status.textContent = "載入中…";
    var draft = null;
    try { draft = localStorage.getItem(KEY); if (draft) draft = JSON.parse(draft); } catch (e) {}
    if (draft) {
      cfg = draft;
      status.textContent = "已載入草稿（自動儲存）";
      hint.textContent = "變更會自動暫存至 localStorage。下載 JSON 後替換 config/game_config.json 並提交推送即生效。";
      render();
      return;
    }
    fetch("config/game_config.json", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (data) {
      cfg = data;
      status.textContent = "已載入倉庫設定檔";
      hint.textContent = "編輯全部欄位後點「下載 game_config.json」→ 覆蓋 config/game_config.json 後 commit push。也可上傳至後台自訂流程。";
      render();
    }).catch(function () {
      status.textContent = "載入失敗，請確認 config/game_config.json 存在";
    });
  }

  function saveDraft() {
    if (!cfg) return;
    try { localStorage.setItem(KEY, JSON.stringify(cfg)); status.textContent = "已暫存至瀏覽器（自動）"; } catch (e) {}
  }

  reloadBtn.addEventListener("click", function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    load();
  });

  downloadBtn.addEventListener("click", function () {
    if (!cfg) return;
    var blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "game_config.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
  });

  addBtn.addEventListener("click", function () {
    var t = currentTab();
    if (!t || t.type !== "list") return;
    var arr = cfg[t.key] = Array.isArray(cfg[t.key]) ? cfg[t.key] : [];
    arr.push(defaultItem(t.key));
    state.idx = arr.length - 1;
    saveDraft();
    render();
  });

  dupBtn.addEventListener("click", function () {
    var t = currentTab();
    if (!t || t.type !== "list") return;
    var arr = cfg[t.key] || [];
    if (arr.length === 0) return;
    var copy = clone(arr[state.idx]);
    arr.splice(state.idx + 1, 0, copy);
    state.idx++;
    saveDraft();
    render();
  });

  delBtn.addEventListener("click", function () {
    var t = currentTab();
    if (!t || t.type !== "list") return;
    var arr = cfg[t.key] || [];
    if (arr.length <= 1) { alert("至少保留一筆"); return; }
    if (!confirm("確定刪除這筆項目？")) return;
    arr.splice(state.idx, 1);
    if (state.idx >= arr.length) state.idx = arr.length - 1;
    saveDraft();
    render();
  });

  function currentTab() { return TABS.find(function (x) { return x.id === state.tab; }); }

  function defaultItem(key) {
    if (key === "Players") return { Index: 0, Name: "新角色", Desc: "", ATKSkill: 0, SpecialSkill: -1, ATK: 3, HP: 3, MP: 2, DEF: 2, SPD: 3, Magic: [100, 105, 103, 104, 112, 109] };
    if (key === "Enemies") return { ID: 0, Name: "新怪物", Desc: "", ATK: 2, DEF: 2, SPD: 2, HP: 3, MP: 0, Tier: 1, Skills: [{ SkillID: 200, Level: 1 }] };
    if (key === "Skills") return { ID: 0, Name: "新技能", Desc: "", Kind: "", Element: "", Side: "player", IsSpecial: false, IsLearnable: true, IsAutoSkill: true, CD: 2, MaxLevel: 10, MPCost: 0, UnlockLevel: 1, Params: [] };
    if (key === "Levels") return { Name: "新關卡", Difficulty: 1, MapWidth: 40, MapHeight: 40, Gimmick: { Kind: "tide", Name: "潮汐", Interval: 20 }, RoundInfos: [] };
    return {};
  }

  function render() {
    if (!cfg) return;
    updateNav();
    content.innerHTML = "";
    var t = currentTab();
    if (!t) return;

    if (t.type === "growth") renderGrowth(content);
    else renderList(content, t);
    saveDraft();
  }

  function renderGrowth(root) {
    var g = document.createElement("div");
    g.innerHTML = "<h2>玩家與怪物成長</h2><p class=\"sub\">影響升級與怪物數值縮放（HTML5 版遊戲與後續對接使用）</p>";
    root.appendChild(g);

    function box(title, obj, key) {
      var b = document.createElement("div");
      b.className = "groupBox";
      b.innerHTML = "<h3>" + title + "</h3>";
      if (!cfg[key] || typeof cfg[key] !== "object") cfg[key] = {};
      renderFields(b, cfg[key], []);
      root.appendChild(b);
    }
    box("PlayerGrow（每級成長）", cfg.PlayerGrow, "PlayerGrow");
    box("EnemyGrow（等級縮放）", cfg.EnemyGrow, "EnemyGrow");
  }

  function renderList(root, t) {
    root.innerHTML = "";
    var arr = cfg[t.key];
    if (!Array.isArray(arr)) cfg[t.key] = arr = [];

    var wrap = document.createElement("div");
    wrap.style.display = "grid";
    wrap.style.gridTemplateColumns = "320px 1fr";
    wrap.style.gap = "16px";

    var left = document.createElement("div");
    var list = document.createElement("div");
    arr.forEach(function (item, i) {
      var row = document.createElement("div");
      row.className = "listRow" + (i === state.idx ? " active" : "");
      var name = (item && (item.Name || item.ID !== undefined ? (item.Name || (t.itemLabel + " " + item.ID)) : (t.itemLabel + " " + i))) || (t.itemLabel + " " + i);
      row.innerHTML = "<div class=\"title\"></div><div class=\"mini\">#" + i + "</div>";
      row.querySelector(".title").textContent = String(name);
      row.addEventListener("click", function () { state.idx = i; render(); });
      list.appendChild(row);
    });
    left.appendChild(list);
    wrap.appendChild(left);

    var right = document.createElement("div");
    if (arr.length === 0) {
      right.innerHTML = "<p class=\"note\">無項目，點上方「新增」</p>";
    } else {
      var item = arr[state.idx];
      var h = document.createElement("h2");
      h.textContent = t.itemLabel + " #" + state.idx;
      right.appendChild(h);
      var det = document.createElement("div");
      det.className = "groupBox";
      det.innerHTML = "<h3>欄位編輯</h3><div class=\"sub2\">所有欄位均可編輯。陣列項目可增減。變更即自動暫存。</div>";
      if (!item || typeof item !== "object") arr[state.idx] = item = {};
      renderFields(det, item, [t.key, state.idx]);
      right.appendChild(det);
    }
    wrap.appendChild(right);
    root.appendChild(wrap);
  }

  function renderFields(container, obj, path) {
    if (Array.isArray(obj)) {
      obj.forEach(function (val, i) {
        var box = document.createElement("div");
        box.className = "groupBox";
        box.innerHTML = "<h3>" + label(path[path.length - 1] || "陣列") + " [" + i + "]<button class=\"btn\" style=\"padding:4px 10px;font-size:12px\">刪除項目</button></h3>";
        box.querySelector("button").addEventListener("click", function () { obj.splice(i, 1); saveDraft(); render(); });
        if (isObj(val)) renderFields(box, val, path.concat([i]));
        else if (Array.isArray(val)) renderFields(box, val, path.concat([i]));
        else makeField(box, i, val, path.concat([i]));
        container.appendChild(box);
      });
      var add = document.createElement("button");
      add.className = "btn";
      add.textContent = "＋ 新增陣列項目";
      add.addEventListener("click", function () {
        if (obj.length === 0) { obj.push({}); }
        else if (isObj(obj[0])) obj.push(clone(obj[0]));
        else obj.push(obj[0]);
        saveDraft();
        render();
      });
      container.appendChild(add);
      return;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (k) {
      var v = obj[k];
      if (Array.isArray(v)) {
        var box = document.createElement("div");
        box.className = "groupBox";
        box.innerHTML = "<h3>" + label(k) + " <span class=\"pill\">" + v.length + " 項</span></h3>";
        renderFields(box, v, path.concat([k]));
        container.appendChild(box);
      } else if (isObj(v)) {
        var box2 = document.createElement("div");
        box2.className = "groupBox";
        box2.innerHTML = "<h3>" + label(k) + "</h3>";
        renderFields(box2, v, path.concat([k]));
        container.appendChild(box2);
      } else {
        makeField(container, k, v, path.concat([k]));
      }
    });
  }

  function makeField(container, key, value, path) {
    var row = document.createElement("div");
    row.className = "field";
    var lab = document.createElement("label");
    lab.textContent = label(key);
    var input;
    if (typeof value === "boolean") {
      input = document.createElement("input");
      input.type = "checkbox";
      input.checked = !!value;
    } else if (typeof value === "number") {
      input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.value = String(value);
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.value = value === null || value === undefined ? "" : String(value);
    }
    function setVal() {
      var p = cfg;
      for (var i = 0; i < path.length - 1; i++) p = p[path[i]];
      var last = path[path.length - 1];
      if (typeof value === "boolean") p[last] = input.checked;
      else if (typeof value === "number") {
        var n = Number(input.value);
        p[last] = isFinite(n) ? n : 0;
      } else {
        var s = input.value;
        if (s === "true") p[last] = true;
        else if (s === "false") p[last] = false;
        else if (s !== "" && !isNaN(Number(s)) && s.trim() !== "") p[last] = Number(s);
        else p[last] = s;
      }
      saveDraft();
    }
    input.addEventListener("input", setVal);
    input.addEventListener("change", setVal);
    row.appendChild(lab);
    row.appendChild(input);
    container.appendChild(row);
  }

  load();
})();
