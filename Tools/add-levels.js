// 一次性工具：把新的關卡插進 config/game_config.json（保留原本排版）
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "config", "game_config.json");
let raw = fs.readFileSync(file, "utf8");

function round(level, enemies, count) {
  return {
    Level: level,
    EnemyIDs: enemies,
    SpawnCountPerEnemy: count,
    Duration: 60,
    ExtraDisturbEnemyIDs: enemies.slice(),
    BossInfos: []
  };
}

function bossRound(level, bossId, prefix, allies, skillId) {
  return {
    Level: level,
    Duration: -1,
    EnemyIDs: [],
    SpawnCountPerEnemy: 0,
    BossInfos: [{
      EnemyID: bossId,
      NamePrefix: prefix,
      Level: level,
      Allies: allies,
      SpawnPerAlly: 9,
      AlliesSpawnInterval: 45,
      AlliesSpawnTimes: 12,
      Skills: [{ SkillID: skillId, Level: 1 }]
    }]
  };
}

const levels = [
  {
    Name: "樹海",
    CoverIndex: 3,
    Audio: 210,
    Difficulty: 4,
    MapWidth: 66,
    MapHeight: 66,
    Terrain: "deepforest",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356, 5357],
    DecorationsSerials: [11087, 11088, 11098],
    UnitSerials: [10015, 10016, 10017],
    NPCInfos: [],
    RoundInfos: [
      round(1, [3, 4], 10),
      round(3, [5, 7], 12),
      round(5, [0, 2], 14),
      bossRound(12, 2, "樹海霸主·", [3, 5, 0], 6)
    ]
  },
  {
    Name: "維諾亞洞窟",
    CoverIndex: 4,
    Audio: 210,
    Difficulty: 5,
    MapWidth: 64,
    MapHeight: 64,
    Terrain: "cave",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356, 5357],
    DecorationsSerials: [11087, 11088],
    UnitSerials: [10015, 10016],
    NPCInfos: [],
    RoundInfos: [
      round(1, [6, 7], 12),
      round(3, [12, 13], 14),
      round(6, [8, 9], 12),
      bossRound(14, 9, "洞窟守衛·", [12, 13, 6], 8)
    ]
  },
  {
    Name: "索奇亞沙漠",
    CoverIndex: 5,
    Audio: 210,
    Difficulty: 6,
    MapWidth: 70,
    MapHeight: 70,
    Terrain: "desert",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356],
    DecorationsSerials: [11087],
    UnitSerials: [10015, 10016, 10017],
    NPCInfos: [],
    RoundInfos: [
      round(2, [7, 6], 12),
      round(4, [4, 5], 14),
      round(7, [0, 1], 15),
      bossRound(16, 10, "沙漠魔獸·", [7, 4, 1], 10)
    ]
  },
  {
    Name: "冰封雪山",
    CoverIndex: 6,
    Audio: 210,
    Difficulty: 7,
    MapWidth: 68,
    MapHeight: 68,
    Terrain: "snow",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356],
    DecorationsSerials: [11087, 11098],
    UnitSerials: [10015, 10016],
    NPCInfos: [],
    RoundInfos: [
      round(2, [5, 4], 14),
      round(4, [13, 12], 16),
      round(8, [2, 8], 14),
      bossRound(18, 9, "雪山巨像·", [13, 5, 2], 12)
    ]
  },
  {
    Name: "炎之洞窟",
    CoverIndex: 7,
    Audio: 210,
    Difficulty: 8,
    MapWidth: 66,
    MapHeight: 66,
    Terrain: "volcano",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356],
    DecorationsSerials: [11087],
    UnitSerials: [10015, 10016, 10017],
    NPCInfos: [],
    RoundInfos: [
      round(3, [6, 3], 14),
      round(5, [1, 0], 16),
      round(9, [10, 11], 14),
      bossRound(20, 3, "炎獄魔君·", [6, 1, 10], 14)
    ]
  },
  {
    Name: "靈堂",
    CoverIndex: 8,
    Audio: 210,
    Difficulty: 9,
    MapWidth: 64,
    MapHeight: 64,
    Terrain: "graveyard",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356],
    DecorationsSerials: [11087, 11099],
    UnitSerials: [10015, 10016],
    NPCInfos: [],
    RoundInfos: [
      round(3, [8, 11], 15),
      round(6, [12, 13, 11], 14),
      round(10, [9, 8], 14),
      bossRound(22, 8, "亡靈領主·", [8, 11, 12], 16)
    ]
  },
  {
    Name: "海底洞窟",
    CoverIndex: 9,
    Audio: 210,
    Difficulty: 10,
    MapWidth: 72,
    MapHeight: 72,
    Terrain: "underwater",
    PaletIndex: 0,
    BorderSerial: 10014,
    GroundSerials: [5355, 5356],
    DecorationsSerials: [11087, 11100],
    UnitSerials: [10015, 10016, 10017],
    NPCInfos: [],
    RoundInfos: [
      round(4, [5, 13], 15),
      round(7, [4, 12], 16),
      round(11, [10, 9], 14),
      bossRound(25, 10, "深海霸主·", [5, 13, 10], 18)
    ]
  }
];

const block = levels.map(function (lv) {
  return JSON.stringify(lv, null, 2).split("\n").map(function (line) {
    return "    " + line;
  }).join("\n");
}).join(",\n");

const marker = "\n  ]\n}";
const idx = raw.lastIndexOf(marker);
if (idx < 0) throw new Error("cannot find Levels array end");

raw = raw.slice(0, idx) + ",\n" + block + raw.slice(idx);
JSON.parse(raw); // 驗證

fs.writeFileSync(file, raw, "utf8");
console.log("levels now:", JSON.parse(raw).Levels.length);
