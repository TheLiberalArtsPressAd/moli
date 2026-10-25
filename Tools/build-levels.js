/**
 * 由 web-assets/monsters/catalog.json 產生 15 個地區關卡與 405 隻怪物資料。
 *
 *   node Tools/build-levels.js
 *
 * 會保留 game_config.json 裡的 Players / Skills / PlayerGrow / EnemyGrow，
 * 只重建 Enemies 與 Levels。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.dirname(__dirname);
const CONFIG_PATH = path.join(ROOT, "config", "game_config.json");
const CATALOG_PATH = path.join(ROOT, "web-assets", "monsters", "catalog.json");

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

// 15 個地區的景色（對應 art.js 的 BIOMES）
const REGION_TERRAIN = {
  "芙蕾雅島": "island",
  "索奇亞島": "desert",
  "莎蓮娜島": "deepforest",
  "米內葛爾島": "forest",
  "庫魯克斯島": "snow",
  "德威特島": "forest",
  "傑諾姆島": "cave",
  "弗利德島": "volcano",
  "樂園之卵": "island",
  "辛梅爾": "graveyard",
  "諾斯菲拉特": "cave2",
  "哈那可半島": "coast",
  "逆星": "cave",
  "日耀之域": "desert",
  "水曜之域": "underwater"
};

const REGION_DESC = {
  "芙蕾雅島": "冒險者的起點，草原與海岸交錯的和平島嶼。",
  "索奇亞島": "黃沙滾滾的沙漠島，白天酷熱、夜裡寒風刺骨。",
  "莎蓮娜島": "終年濃霧的樹海，古木與藤蔓遮住了陽光。",
  "米內葛爾島": "潮濕溫暖的密林，蟲鳴與獸吼從不間斷。",
  "庫魯克斯島": "長年積雪的北方群島，冰層下埋著古老遺跡。",
  "德威特島": "幅員最廣的大陸，什麼樣的魔物都能遇見。",
  "傑諾姆島": "矮人開鑿的地下坑道，終日不見天日。",
  "弗利德島": "岩漿奔流的火山島，空氣裡滿是硫磺味。",
  "樂園之卵": "傳說中的樂園入口，景色如夢似幻。",
  "辛梅爾": "亡者聚集的冥界邊境，濃霧中滿是低語。",
  "諾斯菲拉特": "冰雪與黑暗籠罩的荒原，鮮少有人活著離開。",
  "哈那可半島": "海風強勁的半島，斷崖與沙灘一路延伸。",
  "逆星": "星辰逆轉之地，魔力異常濃稠。",
  "日耀之域": "烈日灼燒的赤色大地，沙塵終年不散。",
  "水曜之域": "沉入海底的古老國度，魚群在廢墟間游動。"
};

// ---------------------------------------------------------------- 地區機制
// 每個地區都有專屬的環境事件（Gimmick），由 game.js 的 triggerGimmick() 執行。
// Kind 可用的值：tide/current、sand/wind、spore/poison、vine/root、
// blizzard/ice、lava/rockfall/sun、soul、arcane、beam、moon。
const GIMMICKS = [
  { Kind: "tide", Name: "潮汐湧動", Desc: "海浪週期性沖刷戰場，留下會減速的水窪。", Color: "#6fc3ff" },
  { Kind: "sand", Name: "流沙風暴", Desc: "沙暴降低移動速度，並捲起傷害沙塵。", Color: "#f0c15c" },
  { Kind: "spore", Name: "孢子瘴氣", Desc: "毒孢子在戰場上擴散，持續侵蝕生命。", Color: "#a8d46a" },
  { Kind: "vine", Name: "藤蔓纏繞", Desc: "古木藤蔓從地面竄出，纏住並減速敵人。", Color: "#7bd88f" },
  { Kind: "blizzard", Name: "凍原暴雪", Desc: "暴雪與冰雹覆蓋全場，緩速並造成傷害。", Color: "#a6ecff" },
  { Kind: "wind", Name: "大陸疾風", Desc: "強風推擠走位，並捲起銳利風刃。", Color: "#9fe6c8" },
  { Kind: "rockfall", Name: "坑道落石", Desc: "坑道頂部崩落，落石在場上砸出危險區。", Color: "#c9b3ff" },
  { Kind: "lava", Name: "岩漿噴發", Desc: "火山裂縫噴出岩漿，留下灼熱地面。", Color: "#ff8a5c" },
  { Kind: "arcane", Name: "樂園幻光", Desc: "幻光在場上炸裂成環形彈幕。", Color: "#ffd76a" },
  { Kind: "soul", Name: "亡魂低語", Desc: "亡魂從四周追擊生者，緩慢但難纏。", Color: "#b6a4ff" },
  { Kind: "ice", Name: "永凍寒潮", Desc: "寒潮凍結地面，冰雹不斷落下。", Color: "#8fd8ff" },
  { Kind: "current", Name: "斷崖海流", Desc: "強勁海流推擠走位，並留下水窪。", Color: "#9ff3d6" },
  { Kind: "beam", Name: "逆星射線", Desc: "逆轉的星軌化為掃射光束。", Color: "#ff9bd2" },
  { Kind: "sun", Name: "烈日灼燒", Desc: "烈日降下火雨，灼燒整片赤色大地。", Color: "#ffb15c" },
  { Kind: "moon", Name: "月海潮汐", Desc: "月光治癒魔物，同時掀起潮汐傷害。", Color: "#9fd8ff" }
];

// 各地區怪物會施放的技能（對應 config Skills 的 ID 200–221）
// 第一招為該區代表魔法，第二招為進階魔法，Tier 4 再加上 REGION_EXTRA。
const REGION_SKILLS = [
  [200, 205], // 芙蕾雅島：魔彈、治療術
  [203, 217], // 索奇亞島：火球、沙塵
  [202, 201], // 莎蓮娜島：冰錐、毒霧
  [201, 220], // 米內葛爾島：毒霧、孢子召喚
  [202, 216], // 庫魯克斯島：冰錐、冰霜新星
  [212, 208], // 德威特島：風刃、雷擊
  [210, 209], // 傑諾姆島：骨矛、詛咒
  [203, 215], // 弗利德島：火球、熔岩
  [214, 219], // 樂園之卵：聖光、屏障
  [213, 218], // 辛梅爾：暗影彈、靈魂吸收
  [211, 216], // 諾斯菲拉特：水彈、冰霜新星
  [212, 207], // 哈那可半島：風刃、衝撞
  [209, 208], // 逆星：詛咒、雷擊
  [203, 215], // 日耀之域：火球、熔岩
  [211, 218]  // 水曜之域：水彈、靈魂吸收
];

// Tier 4 大型怪物額外獲得的地區招牌技能
const REGION_EXTRA = [206, 207, 209, 206, 216, 208, 206, 215, 205, 209, 216, 207, 208, 215, 219];

function skillsFor(tier, li) {
  const pool = REGION_SKILLS[li] || REGION_SKILLS[0];
  const picks = [pool[0]];
  if (tier >= 2 && pool[1] != null) picks.push(pool[1]);
  if (tier >= 4) {
    const extra = REGION_EXTRA[li];
    if (extra != null && picks.indexOf(extra) < 0) picks.push(extra);
  }
  return picks.map(function (id) { return { SkillID: id, Level: 1 }; });
}

// ---------------------------------------------------------------- BOSS 設計
// 15 個地區各一隻手寫霸主：專屬稱號、屬性色、招式組合、第二階段血量。
// 招式由 game.js 的 updateBoss() 執行：
//   nova 環形彈幕／volley 追蹤齊射／charge 衝撞／summon 召喚援軍
//   pool 腐蝕地面／meteor 落石警示／laser 直線光束／shockwave 衝擊波
//   heal 自我治療／teleport 瞬移
const BOSS_DESIGN = [
  {
    name: "樹精", boss: "翠冠樹靈王", title: "芙蕾雅的千年守護者",
    color: "#7bd88f", accent: "nature", hp: 1.0, atk: 1.0,
    lore: "芙蕾雅島最深處的古老樹靈，盤根錯節的軀幹裡藏著整座森林的記憶。",
    abilities: ["summon", "pool", "shockwave"], phase2: 0.5
  },
  {
    name: "亞特拉斯巨神", boss: "黃沙暴君", title: "索奇亞的流沙之主",
    color: "#f0c15c", accent: "sand", hp: 1.05, atk: 1.05,
    lore: "以整片沙漠為王座的巨人，每踏一步都讓綠洲退後一哩。",
    abilities: ["shockwave", "charge", "meteor"], phase2: 0.45
  },
  {
    name: "寒冰翼龍", boss: "霧海冰翼", title: "莎蓮娜的凍霧化身",
    color: "#8fd8ff", accent: "ice", hp: 1.0, atk: 1.0,
    lore: "在樹海濃霧中盤旋的冰龍，吐息能讓千年古木瞬間結霜。",
    abilities: ["nova", "volley", "pool"], phase2: 0.5
  },
  {
    name: "死亡樹精", boss: "腐敗之母", title: "米內葛爾的瘴癘之源",
    color: "#a8d46a", accent: "poison", hp: 1.05, atk: 1.0,
    lore: "被瘴氣侵蝕的母樹，根鬚所到之處只剩腐葉與毒沼。",
    abilities: ["pool", "summon", "volley"], phase2: 0.5
  },
  {
    name: "斬首者", boss: "雪原劊子手", title: "庫魯克斯的無情裁決",
    color: "#c9e6ff", accent: "snow", hp: 1.0, atk: 1.12,
    lore: "傳說中處決犯人的亡靈，巨刃落下時連風都會被斬成兩半。",
    abilities: ["charge", "volley", "shockwave"], phase2: 0.4
  },
  {
    name: "烈風翼龍", boss: "暴風之王", title: "德威特的天空霸主",
    color: "#9fe6c8", accent: "wind", hp: 1.05, atk: 1.05,
    lore: "駕馭整片大陸氣流的翼龍，振翅便能掀起撕裂帆船的颶風。",
    abilities: ["shockwave", "volley", "charge"], phase2: 0.5
  },
  {
    name: "血骷髏", boss: "坑道亡靈王", title: "傑諾姆的無光之王",
    color: "#c98bff", accent: "dark", hp: 1.0, atk: 1.05,
    lore: "矮人坑道最深處的骸骨之王，率領著永遠不會安息的礦工。",
    abilities: ["summon", "volley", "pool"], phase2: 0.45
  },
  {
    name: "亞特拉斯巨神", boss: "熔岩泰坦", title: "弗利德的熾熱心臟",
    color: "#ff8a5c", accent: "fire", hp: 1.15, atk: 1.1,
    lore: "沉睡在火山口下的泰坦，岩漿順著祂的裂痕流淌成河。",
    abilities: ["meteor", "shockwave", "pool"], phase2: 0.45
  },
  {
    name: "黃金龍骨", boss: "黃金守門人", title: "樂園之卵的永恆門衛",
    color: "#ffd76a", accent: "gold", hp: 1.1, atk: 1.05,
    lore: "以黃金骸骨守護樂園入口的巨龍，眼神裡映著不屬於人間的光。",
    abilities: ["laser", "summon", "nova"], phase2: 0.5
  },
  {
    name: "冥界死神", boss: "冥界引路人", title: "辛梅爾的黃泉擺渡",
    color: "#b6a4ff", accent: "soul", hp: 1.1, atk: 1.1,
    lore: "手持引魂燈的使者，燈火熄滅時，生者的名字便會被劃去。",
    abilities: ["pool", "summon", "shockwave"], phase2: 0.45
  },
  {
    name: "寒冰翼龍", boss: "永凍之翼", title: "諾斯菲拉特的冰封君王",
    color: "#a6ecff", accent: "ice", hp: 1.15, atk: 1.1,
    lore: "連時間都被凍結的荒原上，祂的每一次吐息都留下新的冰川。",
    abilities: ["nova", "meteor", "volley"], phase2: 0.5
  },
  {
    name: "風獸", boss: "狂風領主", title: "哈那可的斷崖之聲",
    color: "#9ff3d6", accent: "wind", hp: 1.05, atk: 1.1,
    lore: "從斷崖呼嘯而過的海風化身，沒有人見過牠停下腳步。",
    abilities: ["charge", "shockwave", "volley"], phase2: 0.4
  },
  {
    name: "布拉茲", boss: "逆星魔導", title: "逆星的星軌操縱者",
    color: "#ff9bd2", accent: "arcane", hp: 1.1, atk: 1.12,
    lore: "讓星辰倒流的魔導師，在逆轉的星軌間尋找永恆的答案。",
    abilities: ["teleport", "nova", "laser"], phase2: 0.45
  },
  {
    name: "烈風翼龍", boss: "日耀炎翼", title: "日耀之域的灼熱雙翼",
    color: "#ffb15c", accent: "fire", hp: 1.15, atk: 1.15,
    lore: "被烈日灼練成赤金色的翼龍，雙翼展開時天空也為之燃燒。",
    abilities: ["meteor", "laser", "shockwave"], phase2: 0.4
  },
  {
    name: "常娥", boss: "月海雙姬", title: "水曜之域的潮汐主宰",
    color: "#9fd8ff", accent: "moon", hp: 1.2, atk: 1.15,
    lore: "沉沒國度的兩位月之巫女，一人引潮、一人守月，讓整片海底隨她們的心跳呼吸。",
    abilities: ["heal", "nova", "pool"], phase2: 0.5, twin: "姮娥"
  }
];

// 霸主額外追加的招牌招式，讓後期戰鬥有更多變化
const BOSS_EXTRA = ["root", "quake", "frost", "rain", "frost", "spiral", "quake", "rain", "beam", "root", "frost", "spiral", "beam", "rain", "frost"];

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function round1(v) { return Math.round(v * 10) / 10; }

const monsters = catalog.monsters;
const byId = new Map(monsters.map(function (m) { return [m.id, m]; }));

// 用圖片面積當「體型」，決定怪物階級
const sortedByArea = monsters.slice().sort(function (a, b) { return a.w * a.h - b.w * b.h; });
const rankOf = new Map();
sortedByArea.forEach(function (m, i) { rankOf.set(m.id, i / Math.max(1, sortedByArea.length - 1)); });

function tierOf(m) {
  const r = rankOf.get(m.id) || 0;
  return 1 + Math.floor(r * 4.999);
}

// ---------------------------------------------------------------- Enemies
const enemies = [];
const indexOfMon = new Map();
const regionIndex = new Map(catalog.regions.map(function (r, i) { return [r.name, i]; }));

monsters.forEach(function (m, i) {
  const tier = tierOf(m);
  // 以主要出沒地區當強度基準（0..14）
  const idx = Math.max(0, Math.min(14, regionIndex.has(m.regions[0]) ? regionIndex.get(m.regions[0]) : 0));
  const hp = 2.2 + tier * 0.55 + idx * 0.16;
  const atk = 1.8 + tier * 0.42 + idx * 0.09;
  const def = 1.5 + tier * 0.5 + idx * 0.07;
  const spd = 2.0 + tier * 0.3;
  enemies.push({
    ID: i,
    Serial: 200000 + i,
    Name: m.name,
    Desc: (m.regions || []).join("、") + " 出沒",
    ATK: round1(atk),
    DEF: round1(def),
    SPD: round1(spd),
    HP: round1(hp),
    MP: 5,
    Art: m.id,
    Tier: tier,
    Regions: m.regions,
    Skills: skillsFor(tier, idx)
  });
  indexOfMon.set(m.id, i);
});

// ---------------------------------------------------------------- Levels
const levels = [];
const regionOrder = catalog.regions; // 01..15

regionOrder.forEach(function (region, li) {
  const diff = li + 1;
  const list = region.monster_ids.map(function (id) { return byId.get(id); }).filter(Boolean);
  list.sort(function (a, b) { return a.w * a.h - b.w * b.h; });

  // 依體型切成 4 段，每一段是一波；所有怪物都會出場
  const bands = [[], [], [], []];
  list.forEach(function (m, i) {
    const band = Math.min(3, Math.floor(i / Math.max(1, list.length / 4)));
    bands[band].push(m);
  });

  const rounds = [];
  const waveNames = ["先鋒", "主力", "精銳", "親衛"];
  const gimmick = GIMMICKS[li] || GIMMICKS[0];
  const gimmickInfo = {
    Kind: gimmick.Kind,
    Name: gimmick.Name,
    Desc: gimmick.Desc,
    Color: gimmick.Color,
    Interval: Math.max(9, Math.round(22 - li * 0.8))
  };
  // 每波的精英數量：越後面的地區、越後面的波次越多
  const eliteByWave = [0, li >= 2 ? 1 : 0, Math.min(3, 1 + Math.floor(li / 5)), Math.min(3, 1 + Math.floor(li / 4))];
  const waveEvents = [
    "",
    "「" + gimmick.Name + "」開始蠢動……",
    "精英怪混入敵陣！",
    "親衛隊壓境，首領就在前方！"
  ];
  bands.forEach(function (band, bi) {
    if (!band.length) return;
    const ids = band.map(function (m) { return indexOfMon.get(m.id); });
    const spawn = clamp(Math.round((12 + diff * 1.5) / band.length), 1, 8);
    rounds.push({
      Level: diff + bi,
      Name: waveNames[bi],
      EnemyIDs: ids,
      SpawnCountPerEnemy: spawn,
      Duration: 50,
      ExtraDisturbEnemyIDs: ids,
      EliteCount: eliteByWave[bi] || 0,
      Event: waveEvents[bi] || "",
      BossInfos: []
    });
  });

  // 首領：手寫設計的霸主（見 BOSS_DESIGN），找不到就退回體型最大的兩隻
  const design = BOSS_DESIGN[li] || {};
  const monByName = new Map(monsters.map(function (m) { return [m.name, m]; }));
  const bossSpecs = [design.name, design.twin].filter(Boolean)
    .map(function (n) { return monByName.get(n); })
    .filter(Boolean);
  if (!bossSpecs.length) {
    list.slice(-2).reverse().forEach(function (m) { bossSpecs.push(m); });
  }
  const allyBand = bands[3].length ? bands[3] : bands[2].length ? bands[2] : list;
  const bossInfos = bossSpecs.map(function (m, bi) {
    const twin = bi > 0;
    const mechanics = (design.abilities || []).slice();
    if (BOSS_EXTRA[li] && mechanics.indexOf(BOSS_EXTRA[li]) < 0) mechanics.push(BOSS_EXTRA[li]);
    return {
      EnemyID: indexOfMon.get(m.id),
      NamePrefix: region.name + "霸主·",
      Level: diff + 6,
      Name: twin ? (design.boss + "·副") : (design.boss || "霸主"),
      Title: design.title || "",
      Mechanic: mechanics,
      Color: design.color || "#ff9b6a",
      Phase2At: design.phase2 || 0.5,
      Phase3At: Math.round(Math.max(0.18, 0.34 - li * 0.008) * 100) / 100,
      HpMul: Math.round((design.hp || 1) * (twin ? 0.75 : 1) * 100) / 100,
      AtkMul: Math.round((design.atk || 1) * (twin ? 0.85 : 1) * 100) / 100,
      Allies: allyBand.slice(0, 3).map(function (a) { return indexOfMon.get(a.id); }),
      SpawnPerAlly: 2,
      AlliesSpawnInterval: 24,
      AlliesSpawnTimes: 8,
      Skills: []
    };
  });

  rounds.push({
    Level: diff + 6,
    Name: "霸主",
    Duration: -1,
    EnemyIDs: [],
    SpawnCountPerEnemy: 0,
    EliteCount: 0,
    Event: "霸主降臨，擊敗牠就能通過此地！",
    BossInfos: bossInfos
  });

  const bossNames = bossSpecs.map(function (m) { return m.name; });

  levels.push({
    Name: region.name,
    Region: region.key,
    Desc: REGION_DESC[region.name] || "",
    CoverIndex: li,
    Audio: 210,
    Difficulty: diff,
    Terrain: REGION_TERRAIN[region.name] || "forest",
    MapWidth: 46 + li,
    MapHeight: 46 + li,
    MonsterCount: list.length,
    MonsterIDs: list.map(function (m) { return m.id; }),
    BossNames: bossNames,
    BossTitle: design.boss || "",
    BossSubtitle: design.title || "",
    BossLore: design.lore || "",
    BossColor: design.color || "#ff9b6a",
    ArenaColor: design.color || "#ff9b6a",
    BossAbilities: design.abilities || [],
    Gimmick: gimmickInfo,
    RoundInfos: rounds
  });
});

const out = {
  PlayerGrow: config.PlayerGrow,
  EnemyGrow: config.EnemyGrow,
  Players: config.Players,
  Enemies: enemies,
  Skills: config.Skills,
  Levels: levels
};

fs.writeFileSync(CONFIG_PATH, JSON.stringify(out, null, 1), "utf8");

const totalSpawns = levels.reduce(function (sum, lv) {
  return sum + lv.RoundInfos.reduce(function (s, r) { return s + (r.EnemyIDs.length * r.SpawnCountPerEnemy); }, 0);
}, 0);
console.log("levels: " + levels.length + ", enemies: " + enemies.length + ", spawns/run: " + totalSpawns);
console.log("size: " + (fs.statSync(CONFIG_PATH).size / 1024).toFixed(0) + " KB");
levels.forEach(function (lv) {
  console.log("  " + String(lv.Difficulty).padStart(2) + " " + lv.Name +
    "  monsters=" + lv.MonsterCount + "  waves=" + lv.RoundInfos.length +
    "  boss=" + (lv.BossTitle || "—") + " (" + lv.BossNames.join("、") + ")" +
    "  terrain=" + lv.Terrain);
});
