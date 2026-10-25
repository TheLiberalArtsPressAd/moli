/* 自動產生，請勿手改。
 * 來源：config/game_config.json
 * 重新產生：powershell -ExecutionPolicy Bypass -File Tools/build-config-js.ps1
 */
window.MOLI_CONFIG = {
 "PlayerGrow": {
  "HP": 0.08,
  "MP": 0.02,
  "ATK": 0.05,
  "DEF": 0.04,
  "SPD": 0.01
 },
 "EnemyGrow": {
  "HP": 0.03,
  "MP": 0.1,
  "ATK": 0.02,
  "DEF": 0.03,
  "SPD": 0.01
 },
 "Players": [
  {
   "Index": 0,
   "Serial": 105053,
   "WeaponSerial": 0,
   "Name": "劍士",
   "Desc": "一把聖劍披荊斬棘",
   "SkillDesc": "弧月斬",
   "ATKSkill": 0,
   "SpecialSkill": 15,
   "ATK": 5,
   "HP": 4,
   "MP": 2.6,
   "DEF": 4,
   "SPD": 3,
   "Magic": [
    100,
    105,
    103,
    104,
    112,
    109
   ]
  },
  {
   "Index": 1,
   "Serial": 106126,
   "WeaponSerial": 20814,
   "Name": "弓箭手",
   "Desc": "看我亂箭齊發",
   "SkillDesc": "亂射",
   "ATKSkill": 1,
   "SpecialSkill": 2,
   "ATK": 4,
   "HP": 3,
   "MP": 2.6,
   "DEF": 2.8,
   "SPD": 5,
   "Magic": [
    101,
    102,
    107,
    110,
    106,
    111
   ]
  }
 ],
 "Enemies": [
  {
   "ID": 0,
   "Serial": 200000,
   "Name": "丘陵鯊",
   "Desc": "樂園之卵 出沒",
   "ATK": 3.4,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.6,
   "MP": 5,
   "Art": "m001",
   "Tier": 2,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 1,
   "Serial": 200001,
   "Name": "九重葛花妖",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m002",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 2,
   "Serial": 200002,
   "Name": "亞特拉斯巨神",
   "Desc": "索奇亞島、弗利德島、辛梅爾、日耀之域 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m003",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "弗利德島",
    "辛梅爾",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 3,
   "Serial": 200003,
   "Name": "亡靈",
   "Desc": "莎蓮娜島、諾斯菲拉特、水曜之域 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m004",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 4,
   "Serial": 200004,
   "Name": "亭登烏賊",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m005",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 5,
   "Serial": 200005,
   "Name": "亮紫小丑",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m006",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 6,
   "Serial": 200006,
   "Name": "人魔草",
   "Desc": "莎蓮娜島、辛梅爾、日耀之域 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m007",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "辛梅爾",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 7,
   "Serial": 200007,
   "Name": "依格羅斯",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m008",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 8,
   "Serial": 200008,
   "Name": "侯爵花妖",
   "Desc": "莎蓮娜島、德威特島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m009",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 9,
   "Serial": 200009,
   "Name": "修美亞雷",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.8,
   "MP": 5,
   "Art": "m010",
   "Tier": 4,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 10,
   "Serial": 200010,
   "Name": "僵屍格格",
   "Desc": "日耀之域 出沒",
   "ATK": 3.4,
   "DEF": 2.9,
   "SPD": 2.3,
   "HP": 4.8,
   "MP": 5,
   "Art": "m011",
   "Tier": 1,
   "Regions": [
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 11,
   "Serial": 200011,
   "Name": "僵屍王爺",
   "Desc": "日耀之域 出沒",
   "ATK": 4.2,
   "DEF": 3.9,
   "SPD": 2.9,
   "HP": 5.9,
   "MP": 5,
   "Art": "m012",
   "Tier": 3,
   "Regions": [
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 215,
     "Level": 1
    }
   ]
  },
  {
   "ID": 12,
   "Serial": 200012,
   "Name": "兔耳仙人掌",
   "Desc": "索奇亞島、弗利德島 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m013",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 13,
   "Serial": 200013,
   "Name": "兔耳蝙蝠",
   "Desc": "莎蓮娜島、弗利德島 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m014",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 14,
   "Serial": 200014,
   "Name": "八岐大蛇",
   "Desc": "德威特島、辛梅爾 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m015",
   "Tier": 5,
   "Regions": [
    "德威特島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 15,
   "Serial": 200015,
   "Name": "冥界死神",
   "Desc": "辛梅爾、諾斯菲拉特 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m016",
   "Tier": 5,
   "Regions": [
    "辛梅爾",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 16,
   "Serial": 200016,
   "Name": "冬季雲鹿",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m017",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 17,
   "Serial": 200017,
   "Name": "冰冷樹精",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m018",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 18,
   "Serial": 200018,
   "Name": "冰怪",
   "Desc": "莎蓮娜島、德威特島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m019",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 19,
   "Serial": 200019,
   "Name": "冰蜥蝪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m020",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 20,
   "Serial": 200020,
   "Name": "凝紫跑車",
   "Desc": "水曜之域 出沒",
   "ATK": 5.2,
   "DEF": 5,
   "SPD": 3.5,
   "HP": 7.2,
   "MP": 5,
   "Art": "m021",
   "Tier": 5,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 21,
   "Serial": 200021,
   "Name": "凶暴仙人掌",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m022",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 22,
   "Serial": 200022,
   "Name": "刀雞",
   "Desc": "樂園之卵、哈那可半島 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m023",
   "Tier": 3,
   "Regions": [
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 23,
   "Serial": 200023,
   "Name": "利牙",
   "Desc": "辛梅爾、諾斯菲拉特 出沒",
   "ATK": 3.5,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.7,
   "MP": 5,
   "Art": "m024",
   "Tier": 2,
   "Regions": [
    "辛梅爾",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 24,
   "Serial": 200024,
   "Name": "劍鴕烏",
   "Desc": "樂園之卵、哈那可半島 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m025",
   "Tier": 3,
   "Regions": [
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 25,
   "Serial": 200025,
   "Name": "劭瑪",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m026",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 26,
   "Serial": 200026,
   "Name": "北京鴨",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m027",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 27,
   "Serial": 200027,
   "Name": "北極熊",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m028",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 28,
   "Serial": 200028,
   "Name": "半獸人",
   "Desc": "芙蕾雅島、庫魯克斯島、諾斯菲拉特 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m029",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 29,
   "Serial": 200029,
   "Name": "南瓜公主",
   "Desc": "米內葛爾島、德威特島 出沒",
   "ATK": 3.8,
   "DEF": 3.7,
   "SPD": 3.2,
   "HP": 4.9,
   "MP": 5,
   "Art": "m030",
   "Tier": 4,
   "Regions": [
    "米內葛爾島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 30,
   "Serial": 200030,
   "Name": "卡卡特",
   "Desc": "諾斯菲拉特、日耀之域 出沒",
   "ATK": 4.4,
   "DEF": 4.2,
   "SPD": 3.2,
   "HP": 6,
   "MP": 5,
   "Art": "m031",
   "Tier": 4,
   "Regions": [
    "諾斯菲拉特",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 31,
   "Serial": 200031,
   "Name": "卡斯克",
   "Desc": "諾斯菲拉特 出沒",
   "ATK": 4.4,
   "DEF": 4.2,
   "SPD": 3.2,
   "HP": 6,
   "MP": 5,
   "Art": "m032",
   "Tier": 4,
   "Regions": [
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 32,
   "Serial": 200032,
   "Name": "卡爾克",
   "Desc": "日耀之域 出沒",
   "ATK": 4.7,
   "DEF": 4.4,
   "SPD": 3.2,
   "HP": 6.5,
   "MP": 5,
   "Art": "m033",
   "Tier": 4,
   "Regions": [
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 215,
     "Level": 1
    }
   ]
  },
  {
   "ID": 33,
   "Serial": 200033,
   "Name": "印地安仙人掌",
   "Desc": "索奇亞島 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m034",
   "Tier": 4,
   "Regions": [
    "索奇亞島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 34,
   "Serial": 200034,
   "Name": "口袋龍",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m035",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 35,
   "Serial": 200035,
   "Name": "史萊姆",
   "Desc": "芙蕾雅島、哈那可半島 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m036",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 36,
   "Serial": 200036,
   "Name": "吉橘聖誕花妖",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m037",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 37,
   "Serial": 200037,
   "Name": "向日葵小妖",
   "Desc": "哈那可半島 出沒",
   "ATK": 4.5,
   "DEF": 4.3,
   "SPD": 3.2,
   "HP": 6.2,
   "MP": 5,
   "Art": "m038",
   "Tier": 4,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 38,
   "Serial": 200038,
   "Name": "咚咚靴怪",
   "Desc": "樂園之卵、水曜之域 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m039",
   "Tier": 1,
   "Regions": [
    "樂園之卵",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 39,
   "Serial": 200039,
   "Name": "哥布林",
   "Desc": "芙蕾雅島、德威特島 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m040",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 40,
   "Serial": 200040,
   "Name": "喪屍",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m041",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 41,
   "Serial": 200041,
   "Name": "單眼巨人",
   "Desc": "芙蕾雅島、弗利德島、樂園之卵、辛梅爾、水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m042",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島",
    "弗利德島",
    "樂園之卵",
    "辛梅爾",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 42,
   "Serial": 200042,
   "Name": "國王企鵝",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m043",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 43,
   "Serial": 200043,
   "Name": "國產梅花鹿",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m044",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 44,
   "Serial": 200044,
   "Name": "土蜘蛛",
   "Desc": "芙蕾雅島、索奇亞島、德威特島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m045",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 45,
   "Serial": 200045,
   "Name": "地之妖精",
   "Desc": "莎蓮娜島、庫魯克斯島、哈那可半島 出沒",
   "ATK": 2.8,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.6,
   "MP": 5,
   "Art": "m046",
   "Tier": 2,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 46,
   "Serial": 200046,
   "Name": "地底龜",
   "Desc": "德威特島、樂園之卵 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m047",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 47,
   "Serial": 200047,
   "Name": "地獄妖犬",
   "Desc": "莎蓮娜島、庫魯克斯島、諾斯菲拉特 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m048",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 48,
   "Serial": 200048,
   "Name": "地獄獵犬",
   "Desc": "莎蓮娜島、庫魯克斯島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m049",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 49,
   "Serial": 200049,
   "Name": "地獄看門犬",
   "Desc": "芙蕾雅島、莎蓮娜島、庫魯克斯島、德威特島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m050",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "庫魯克斯島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 50,
   "Serial": 200050,
   "Name": "地獄骷髏",
   "Desc": "索奇亞島、諾斯菲拉特、水曜之域 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m051",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "諾斯菲拉特",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 51,
   "Serial": 200051,
   "Name": "地精",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m052",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 52,
   "Serial": 200052,
   "Name": "地龍蜥",
   "Desc": "索奇亞島、莎蓮娜島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m053",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 53,
   "Serial": 200053,
   "Name": "埃及眼鏡蛇",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m054",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 54,
   "Serial": 200054,
   "Name": "堀地蟲",
   "Desc": "米內葛爾島、諾斯菲拉特 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m055",
   "Tier": 3,
   "Regions": [
    "米內葛爾島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 55,
   "Serial": 200055,
   "Name": "墮天使",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m056",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 56,
   "Serial": 200056,
   "Name": "大公雞",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m057",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 57,
   "Serial": 200057,
   "Name": "大刀鴯苗",
   "Desc": "芙蕾雅島、樂園之卵 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m058",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 58,
   "Serial": 200058,
   "Name": "大地瓜鼠",
   "Desc": "德威特島、日耀之域 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m059",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 59,
   "Serial": 200059,
   "Name": "大地翼龍",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m060",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 60,
   "Serial": 200060,
   "Name": "大地鼠",
   "Desc": "索奇亞島、德威特島、日耀之域 出沒",
   "ATK": 2.3,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 2.9,
   "MP": 5,
   "Art": "m061",
   "Tier": 1,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 61,
   "Serial": 200061,
   "Name": "大型半獸人",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m062",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 62,
   "Serial": 200062,
   "Name": "大炸彈",
   "Desc": "莎蓮娜島、庫魯克斯島、德威特島、樂園之卵、日耀之域 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m063",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "德威特島",
    "樂園之卵",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 63,
   "Serial": 200063,
   "Name": "大犬座",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.2,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.7,
   "MP": 5,
   "Art": "m064",
   "Tier": 4,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 64,
   "Serial": 200064,
   "Name": "大蝙蝠",
   "Desc": "芙蕾雅島、索奇亞島、莎蓮娜島、傑諾姆島 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m065",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "莎蓮娜島",
    "傑諾姆島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 65,
   "Serial": 200065,
   "Name": "天馬",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m066",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 66,
   "Serial": 200066,
   "Name": "女帝企鵝",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m067",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 67,
   "Serial": 200067,
   "Name": "妖化布卡",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m068",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 68,
   "Serial": 200068,
   "Name": "妖狐",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m069",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 69,
   "Serial": 200069,
   "Name": "妖花",
   "Desc": "弗利德島、水曜之域 出沒",
   "ATK": 2.9,
   "DEF": 2.5,
   "SPD": 2.3,
   "HP": 3.9,
   "MP": 5,
   "Art": "m070",
   "Tier": 1,
   "Regions": [
    "弗利德島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 70,
   "Serial": 200070,
   "Name": "妖草",
   "Desc": "芙蕾雅島、米內葛爾島、傑諾姆島、日耀之域 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m071",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島",
    "傑諾姆島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 71,
   "Serial": 200071,
   "Name": "姑婆芋小妖",
   "Desc": "庫魯克斯島、哈那可半島 出沒",
   "ATK": 3.8,
   "DEF": 3.8,
   "SPD": 3.2,
   "HP": 5,
   "MP": 5,
   "Art": "m072",
   "Tier": 4,
   "Regions": [
    "庫魯克斯島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 72,
   "Serial": 200072,
   "Name": "姮娥",
   "Desc": "水曜之域 出沒",
   "ATK": 5.2,
   "DEF": 5,
   "SPD": 3.5,
   "HP": 7.2,
   "MP": 5,
   "Art": "m073",
   "Tier": 5,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 73,
   "Serial": 200073,
   "Name": "娥賓",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m074",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 74,
   "Serial": 200074,
   "Name": "寄生布卡",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m075",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 75,
   "Serial": 200075,
   "Name": "寒冰翼龍",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m076",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 76,
   "Serial": 200076,
   "Name": "寶石鼠",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m077",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 77,
   "Serial": 200077,
   "Name": "寶貝炸彈",
   "Desc": "芙蕾雅島、莎蓮娜島、德威特島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m078",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 78,
   "Serial": 200078,
   "Name": "小兔子",
   "Desc": "莎蓮娜島、樂園之卵、哈那可半島 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m079",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 79,
   "Serial": 200079,
   "Name": "小惡魔",
   "Desc": "索奇亞島、德威特島、樂園之卵 出沒",
   "ATK": 2.3,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 2.9,
   "MP": 5,
   "Art": "m080",
   "Tier": 1,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 80,
   "Serial": 200080,
   "Name": "小石像怪",
   "Desc": "芙蕾雅島、庫魯克斯島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m081",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 81,
   "Serial": 200081,
   "Name": "小蝙蝠",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m082",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 82,
   "Serial": 200082,
   "Name": "小鴨子",
   "Desc": "德威特島、樂園之卵 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m083",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 83,
   "Serial": 200083,
   "Name": "山賊",
   "Desc": "索奇亞島、米內葛爾島、德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m084",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "米內葛爾島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 84,
   "Serial": 200084,
   "Name": "山飛甲",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m085",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 85,
   "Serial": 200085,
   "Name": "岩地跑者",
   "Desc": "米內葛爾島 出沒",
   "ATK": 2.9,
   "DEF": 2.7,
   "SPD": 2.6,
   "HP": 3.8,
   "MP": 5,
   "Art": "m086",
   "Tier": 2,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 86,
   "Serial": 200086,
   "Name": "岩怪",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m087",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 87,
   "Serial": 200087,
   "Name": "岩石鯊",
   "Desc": "樂園之卵 出沒",
   "ATK": 3.4,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.6,
   "MP": 5,
   "Art": "m088",
   "Tier": 2,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 88,
   "Serial": 200088,
   "Name": "岩蟲",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m089",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 89,
   "Serial": 200089,
   "Name": "巨人",
   "Desc": "索奇亞島、辛梅爾 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m090",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 90,
   "Serial": 200090,
   "Name": "巨牙",
   "Desc": "米內葛爾島 出沒",
   "ATK": 2.9,
   "DEF": 2.7,
   "SPD": 2.6,
   "HP": 3.8,
   "MP": 5,
   "Art": "m091",
   "Tier": 2,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 91,
   "Serial": 200091,
   "Name": "巨狼",
   "Desc": "芙蕾雅島、索奇亞島、莎蓮娜島、弗利德島、樂園之卵、哈那可半島、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m092",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "莎蓮娜島",
    "弗利德島",
    "樂園之卵",
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 92,
   "Serial": 200092,
   "Name": "巨蝙蝠",
   "Desc": "芙蕾雅島、莎蓮娜島、德威特島、弗利德島、哈那可半島、水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m093",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "德威特島",
    "弗利德島",
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 93,
   "Serial": 200093,
   "Name": "巨角",
   "Desc": "水曜之域 出沒",
   "ATK": 5.2,
   "DEF": 5,
   "SPD": 3.5,
   "HP": 7.2,
   "MP": 5,
   "Art": "m094",
   "Tier": 5,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 94,
   "Serial": 200094,
   "Name": "巫師之鬼",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m095",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 95,
   "Serial": 200095,
   "Name": "巴拉斯",
   "Desc": "諾斯菲拉特、日耀之域 出沒",
   "ATK": 4.8,
   "DEF": 4.7,
   "SPD": 3.5,
   "HP": 6.6,
   "MP": 5,
   "Art": "m096",
   "Tier": 5,
   "Regions": [
    "諾斯菲拉特",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 96,
   "Serial": 200096,
   "Name": "巴特溫",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m097",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 97,
   "Serial": 200097,
   "Name": "布丁史萊姆",
   "Desc": "索奇亞島、米內葛爾島、諾斯菲拉特、水曜之域 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m098",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "米內葛爾島",
    "諾斯菲拉特",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 98,
   "Serial": 200098,
   "Name": "布卡",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m099",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 99,
   "Serial": 200099,
   "Name": "布卡四重奏",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m100",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 100,
   "Serial": 200100,
   "Name": "布拉茲",
   "Desc": "諾斯菲拉特、逆星、日耀之域、水曜之域 出沒",
   "ATK": 4.8,
   "DEF": 4.7,
   "SPD": 3.5,
   "HP": 6.6,
   "MP": 5,
   "Art": "m101",
   "Tier": 5,
   "Regions": [
    "諾斯菲拉特",
    "逆星",
    "日耀之域",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 101,
   "Serial": 200101,
   "Name": "布特拉",
   "Desc": "諾斯菲拉特、逆星、日耀之域 出沒",
   "ATK": 4.8,
   "DEF": 4.7,
   "SPD": 3.5,
   "HP": 6.6,
   "MP": 5,
   "Art": "m102",
   "Tier": 5,
   "Regions": [
    "諾斯菲拉特",
    "逆星",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 102,
   "Serial": 200102,
   "Name": "布雷歐",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m103",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 103,
   "Serial": 200103,
   "Name": "常娥",
   "Desc": "水曜之域 出沒",
   "ATK": 5.2,
   "DEF": 5,
   "SPD": 3.5,
   "HP": 7.2,
   "MP": 5,
   "Art": "m104",
   "Tier": 5,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 104,
   "Serial": 200104,
   "Name": "平安雪鹿",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m105",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 105,
   "Serial": 200105,
   "Name": "幻影",
   "Desc": "索奇亞島、莎蓮娜島、辛梅爾 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m106",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 106,
   "Serial": 200106,
   "Name": "幻歌妖",
   "Desc": "莎蓮娜島、逆星、水曜之域 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m107",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "逆星",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 107,
   "Serial": 200107,
   "Name": "幽石燈",
   "Desc": "德威特島、日耀之域、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m108",
   "Tier": 2,
   "Regions": [
    "德威特島",
    "日耀之域",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 108,
   "Serial": 200108,
   "Name": "幽靈",
   "Desc": "芙蕾雅島、莎蓮娜島、德威特島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m109",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 109,
   "Serial": 200109,
   "Name": "強盾",
   "Desc": "庫魯克斯島、德威特島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m110",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 110,
   "Serial": 200110,
   "Name": "影岩",
   "Desc": "庫魯克斯島、樂園之卵 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m111",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 111,
   "Serial": 200111,
   "Name": "德魯依之鬼",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m112",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 112,
   "Serial": 200112,
   "Name": "怪盜奇德",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m113",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 113,
   "Serial": 200113,
   "Name": "怪盜彼德",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m114",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 114,
   "Serial": 200114,
   "Name": "怪盜里德",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m115",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 115,
   "Serial": 200115,
   "Name": "惡夢鼠",
   "Desc": "米內葛爾島 出沒",
   "ATK": 2.5,
   "DEF": 2.2,
   "SPD": 2.3,
   "HP": 3.2,
   "MP": 5,
   "Art": "m116",
   "Tier": 1,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 116,
   "Serial": 200116,
   "Name": "惡魔",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m117",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 117,
   "Serial": 200117,
   "Name": "惡魔螃蟹",
   "Desc": "芙蕾雅島、索奇亞島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m118",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 118,
   "Serial": 200118,
   "Name": "惡魔貓",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 2.8,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.6,
   "MP": 5,
   "Art": "m119",
   "Tier": 2,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 119,
   "Serial": 200119,
   "Name": "愛絲波波",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m120",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 120,
   "Serial": 200120,
   "Name": "慘白樹精",
   "Desc": "莎蓮娜島、德威特島、弗利德島 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m121",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "德威特島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 121,
   "Serial": 200121,
   "Name": "戴靴怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m122",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 122,
   "Serial": 200122,
   "Name": "托羅帝鳥",
   "Desc": "弗利德島 出沒",
   "ATK": 3.7,
   "DEF": 3.5,
   "SPD": 2.9,
   "HP": 5,
   "MP": 5,
   "Art": "m123",
   "Tier": 3,
   "Regions": [
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 215,
     "Level": 1
    }
   ]
  },
  {
   "ID": 123,
   "Serial": 200123,
   "Name": "拉扎魟怪",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.8,
   "MP": 5,
   "Art": "m124",
   "Tier": 4,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 124,
   "Serial": 200124,
   "Name": "拉賈魟怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.2,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.7,
   "MP": 5,
   "Art": "m125",
   "Tier": 4,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 125,
   "Serial": 200125,
   "Name": "掃把蝙蝠",
   "Desc": "莎蓮娜島、哈那可半島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m126",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 126,
   "Serial": 200126,
   "Name": "改造樹精",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m127",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 127,
   "Serial": 200127,
   "Name": "教皇企鵝",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m128",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 128,
   "Serial": 200128,
   "Name": "斬首者",
   "Desc": "庫魯克斯島、辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.3,
   "SPD": 3.5,
   "HP": 5.6,
   "MP": 5,
   "Art": "m129",
   "Tier": 5,
   "Regions": [
    "庫魯克斯島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 129,
   "Serial": 200129,
   "Name": "旋律影子",
   "Desc": "索奇亞島、莎蓮娜島、辛梅爾 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m130",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 130,
   "Serial": 200130,
   "Name": "星菇",
   "Desc": "米內葛爾島 出沒",
   "ATK": 2.5,
   "DEF": 2.2,
   "SPD": 2.3,
   "HP": 3.2,
   "MP": 5,
   "Art": "m131",
   "Tier": 1,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 131,
   "Serial": 200131,
   "Name": "暗黑僧侶",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m132",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 132,
   "Serial": 200132,
   "Name": "暗黑龍骨",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m133",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 133,
   "Serial": 200133,
   "Name": "木乃伊",
   "Desc": "索奇亞島、莎蓮娜島、德威特島、樂園之卵 出沒",
   "ATK": 2.3,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 2.9,
   "MP": 5,
   "Art": "m134",
   "Tier": 1,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 134,
   "Serial": 200134,
   "Name": "朱紅跑車",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m135",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 135,
   "Serial": 200135,
   "Name": "板龍",
   "Desc": "德威特島、樂園之卵、哈那可半島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m136",
   "Tier": 4,
   "Regions": [
    "德威特島",
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 136,
   "Serial": 200136,
   "Name": "果凍史萊姆",
   "Desc": "芙蕾雅島、莎蓮娜島、庫魯克斯島、德威特島、日耀之域 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m137",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "庫魯克斯島",
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 137,
   "Serial": 200137,
   "Name": "桂紅鴨",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m138",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 138,
   "Serial": 200138,
   "Name": "桃紅小丑",
   "Desc": "日耀之域 出沒",
   "ATK": 3.8,
   "DEF": 3.4,
   "SPD": 2.6,
   "HP": 5.4,
   "MP": 5,
   "Art": "m139",
   "Tier": 2,
   "Regions": [
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 215,
     "Level": 1
    }
   ]
  },
  {
   "ID": 139,
   "Serial": 200139,
   "Name": "桃花雲傘",
   "Desc": "水曜之域 出沒",
   "ATK": 4.3,
   "DEF": 4,
   "SPD": 2.9,
   "HP": 6.1,
   "MP": 5,
   "Art": "m140",
   "Tier": 3,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 140,
   "Serial": 200140,
   "Name": "棉球",
   "Desc": "諾斯菲拉特 出沒",
   "ATK": 4.4,
   "DEF": 4.2,
   "SPD": 3.2,
   "HP": 6,
   "MP": 5,
   "Art": "m141",
   "Tier": 4,
   "Regions": [
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 141,
   "Serial": 200141,
   "Name": "棕猴",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m142",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 142,
   "Serial": 200142,
   "Name": "樹精",
   "Desc": "芙蕾雅島、米內葛爾島、德威特島 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m143",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 143,
   "Serial": 200143,
   "Name": "樹精布卡",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m144",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 144,
   "Serial": 200144,
   "Name": "橘蛙",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m145",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 145,
   "Serial": 200145,
   "Name": "橙月",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m146",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 146,
   "Serial": 200146,
   "Name": "橫艾",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m147",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 147,
   "Serial": 200147,
   "Name": "歐比爾蝙蝠",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m148",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 148,
   "Serial": 200148,
   "Name": "武術仙人掌",
   "Desc": "索奇亞島、逆星 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m149",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 149,
   "Serial": 200149,
   "Name": "武裝骷髏",
   "Desc": "莎蓮娜島、米內葛爾島、諾斯菲拉特 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m150",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 150,
   "Serial": 200150,
   "Name": "死亡樹精",
   "Desc": "莎蓮娜島、米內葛爾島、德威特島、弗利德島、日耀之域 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m151",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島",
    "德威特島",
    "弗利德島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 151,
   "Serial": 200151,
   "Name": "死亡蜂",
   "Desc": "芙蕾雅島、莎蓮娜島、德威特島、諾斯菲拉特、水曜之域 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m152",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "德威特島",
    "諾斯菲拉特",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 152,
   "Serial": 200152,
   "Name": "死灰螳螂",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m153",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 153,
   "Serial": 200153,
   "Name": "死靈",
   "Desc": "莎蓮娜島、德威特島、弗利德島 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m154",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "德威特島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 154,
   "Serial": 200154,
   "Name": "殭屍",
   "Desc": "芙蕾雅島、莎蓮娜島、德威特島 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m155",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 155,
   "Serial": 200155,
   "Name": "殺人蜂",
   "Desc": "芙蕾雅島、米內葛爾島、哈那可半島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m156",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 156,
   "Serial": 200156,
   "Name": "殺人螳螂",
   "Desc": "米內葛爾島、德威特島 出沒",
   "ATK": 3.8,
   "DEF": 3.7,
   "SPD": 3.2,
   "HP": 4.9,
   "MP": 5,
   "Art": "m157",
   "Tier": 4,
   "Regions": [
    "米內葛爾島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 157,
   "Serial": 200157,
   "Name": "殺手蠍",
   "Desc": "索奇亞島、莎蓮娜島、德威特島、哈那可半島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4,
   "MP": 5,
   "Art": "m158",
   "Tier": 3,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "德威特島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 158,
   "Serial": 200158,
   "Name": "殺龍之刃",
   "Desc": "弗利德島、辛梅爾、諾斯菲拉特、逆星 出沒",
   "ATK": 2.9,
   "DEF": 2.5,
   "SPD": 2.3,
   "HP": 3.9,
   "MP": 5,
   "Art": "m159",
   "Tier": 1,
   "Regions": [
    "弗利德島",
    "辛梅爾",
    "諾斯菲拉特",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 159,
   "Serial": 200159,
   "Name": "毒蜥蝪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m160",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 160,
   "Serial": 200160,
   "Name": "比荷",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m161",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 161,
   "Serial": 200161,
   "Name": "水之妖精",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m162",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 162,
   "Serial": 200162,
   "Name": "水晶怪",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m163",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 163,
   "Serial": 200163,
   "Name": "水晶螃蟹",
   "Desc": "芙蕾雅島、莎蓮娜島、傑諾姆島、弗利德島、水曜之域 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m164",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "傑諾姆島",
    "弗利德島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 164,
   "Serial": 200164,
   "Name": "水果蝙蝠",
   "Desc": "芙蕾雅島、庫魯克斯島、德威特島、辛梅爾 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m165",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島",
    "德威特島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 165,
   "Serial": 200165,
   "Name": "水藍菇",
   "Desc": "米內葛爾島、諾斯菲拉特 出沒",
   "ATK": 2.5,
   "DEF": 2.2,
   "SPD": 2.3,
   "HP": 3.2,
   "MP": 5,
   "Art": "m166",
   "Tier": 1,
   "Regions": [
    "米內葛爾島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 166,
   "Serial": 200166,
   "Name": "水藍鳥魔",
   "Desc": "芙蕾雅島、庫魯克斯島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m167",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 167,
   "Serial": 200167,
   "Name": "水藍鼠",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 2.6,
   "DEF": 2.3,
   "SPD": 2.3,
   "HP": 3.4,
   "MP": 5,
   "Art": "m168",
   "Tier": 1,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 168,
   "Serial": 200168,
   "Name": "水蜘蛛",
   "Desc": "索奇亞島、德威特島、諾斯菲拉特、水曜之域 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4,
   "MP": 5,
   "Art": "m169",
   "Tier": 3,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "諾斯菲拉特",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 169,
   "Serial": 200169,
   "Name": "水青小丑",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m170",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 170,
   "Serial": 200170,
   "Name": "水龍蜥",
   "Desc": "芙蕾雅島、索奇亞島、莎蓮娜島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m171",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 171,
   "Serial": 200171,
   "Name": "沙地鯊",
   "Desc": "樂園之卵 出沒",
   "ATK": 3.4,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.6,
   "MP": 5,
   "Art": "m172",
   "Tier": 2,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 172,
   "Serial": 200172,
   "Name": "沼澤樹精",
   "Desc": "米內葛爾島、庫魯克斯島、哈那可半島、水曜之域 出沒",
   "ATK": 4.2,
   "DEF": 4.2,
   "SPD": 3.5,
   "HP": 5.4,
   "MP": 5,
   "Art": "m173",
   "Tier": 5,
   "Regions": [
    "米內葛爾島",
    "庫魯克斯島",
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 173,
   "Serial": 200173,
   "Name": "泰坦巨人",
   "Desc": "辛梅爾、諾斯菲拉特 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m174",
   "Tier": 5,
   "Regions": [
    "辛梅爾",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 174,
   "Serial": 200174,
   "Name": "海倫娜閃蝶",
   "Desc": "哈那可半島、水曜之域 出沒",
   "ATK": 4.5,
   "DEF": 4.3,
   "SPD": 3.2,
   "HP": 6.2,
   "MP": 5,
   "Art": "m175",
   "Tier": 4,
   "Regions": [
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 175,
   "Serial": 200175,
   "Name": "海底龜",
   "Desc": "米內葛爾島、德威特島、弗利德島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m176",
   "Tier": 3,
   "Regions": [
    "米內葛爾島",
    "德威特島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 176,
   "Serial": 200176,
   "Name": "海盜",
   "Desc": "索奇亞島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m177",
   "Tier": 2,
   "Regions": [
    "索奇亞島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 177,
   "Serial": 200177,
   "Name": "海芋小妖",
   "Desc": "芙蕾雅島、哈那可半島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m178",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 178,
   "Serial": 200178,
   "Name": "海蝙蝠",
   "Desc": "庫魯克斯島、樂園之卵、哈那可半島 出沒",
   "ATK": 4.3,
   "DEF": 4.3,
   "SPD": 3.5,
   "HP": 5.6,
   "MP": 5,
   "Art": "m179",
   "Tier": 5,
   "Regions": [
    "庫魯克斯島",
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 179,
   "Serial": 200179,
   "Name": "液態史萊姆",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m180",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 180,
   "Serial": 200180,
   "Name": "漂浮炸彈",
   "Desc": "芙蕾雅島、德威特島、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m181",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "德威特島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 181,
   "Serial": 200181,
   "Name": "潛地龍",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.8,
   "MP": 5,
   "Art": "m182",
   "Tier": 4,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 182,
   "Serial": 200182,
   "Name": "潛盾",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m183",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 183,
   "Serial": 200183,
   "Name": "潛靴怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m184",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 184,
   "Serial": 200184,
   "Name": "澄雨瓢蟲",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m185",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 185,
   "Serial": 200185,
   "Name": "火之妖精",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m186",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 186,
   "Serial": 200186,
   "Name": "火焰之刃",
   "Desc": "莎蓮娜島、逆星 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m187",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 187,
   "Serial": 200187,
   "Name": "火焰哥布林",
   "Desc": "莎蓮娜島、庫魯克斯島 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m188",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 188,
   "Serial": 200188,
   "Name": "火焰啄木鳥",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m189",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 189,
   "Serial": 200189,
   "Name": "火焰鼠",
   "Desc": "索奇亞島、德威特島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4,
   "MP": 5,
   "Art": "m190",
   "Tier": 3,
   "Regions": [
    "索奇亞島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 190,
   "Serial": 200190,
   "Name": "火焰龜",
   "Desc": "米內葛爾島、哈那可半島 出沒",
   "ATK": 2.9,
   "DEF": 2.7,
   "SPD": 2.6,
   "HP": 3.8,
   "MP": 5,
   "Art": "m191",
   "Tier": 2,
   "Regions": [
    "米內葛爾島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 191,
   "Serial": 200191,
   "Name": "火燄咩",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.8,
   "DEF": 3.8,
   "SPD": 3.2,
   "HP": 5,
   "MP": 5,
   "Art": "m192",
   "Tier": 4,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 192,
   "Serial": 200192,
   "Name": "火蜘蛛",
   "Desc": "芙蕾雅島、索奇亞島、德威特島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m193",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 193,
   "Serial": 200193,
   "Name": "火蜥蝪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m194",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 194,
   "Serial": 200194,
   "Name": "火鶴小妖",
   "Desc": "芙蕾雅島、德威特島、哈那可半島 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m195",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島",
    "德威特島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 195,
   "Serial": 200195,
   "Name": "火龍蜥",
   "Desc": "索奇亞島、莎蓮娜島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m196",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 196,
   "Serial": 200196,
   "Name": "灰兔",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m197",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 197,
   "Serial": 200197,
   "Name": "烈風之刃",
   "Desc": "弗利德島、諾斯菲拉特 出沒",
   "ATK": 2.9,
   "DEF": 2.5,
   "SPD": 2.3,
   "HP": 3.9,
   "MP": 5,
   "Art": "m198",
   "Tier": 1,
   "Regions": [
    "弗利德島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    }
   ]
  },
  {
   "ID": 198,
   "Serial": 200198,
   "Name": "烈風哥布林",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m199",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 199,
   "Serial": 200199,
   "Name": "烈風翼龍",
   "Desc": "德威特島、日耀之域 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m200",
   "Tier": 5,
   "Regions": [
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 200,
   "Serial": 200200,
   "Name": "烈風鳥人",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m201",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 201,
   "Serial": 200201,
   "Name": "烏賊怪",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m202",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 202,
   "Serial": 200202,
   "Name": "煙羅",
   "Desc": "庫魯克斯島、德威特島、諾斯菲拉特、日耀之域、水曜之域 出沒",
   "ATK": 3.8,
   "DEF": 3.8,
   "SPD": 3.2,
   "HP": 5,
   "MP": 5,
   "Art": "m203",
   "Tier": 4,
   "Regions": [
    "庫魯克斯島",
    "德威特島",
    "諾斯菲拉特",
    "日耀之域",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 203,
   "Serial": 200203,
   "Name": "煙霧",
   "Desc": "莎蓮娜島、庫魯克斯島、諾斯菲拉特 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m204",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 204,
   "Serial": 200204,
   "Name": "熔岩",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m205",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 205,
   "Serial": 200205,
   "Name": "爆岩",
   "Desc": "莎蓮娜島、庫魯克斯島、德威特島、諾斯菲拉特 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m206",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "德威特島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 206,
   "Serial": 200206,
   "Name": "牙骨",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m207",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 207,
   "Serial": 200207,
   "Name": "狂奔鳥",
   "Desc": "樂園之卵、諾斯菲拉特 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m208",
   "Tier": 3,
   "Regions": [
    "樂園之卵",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 208,
   "Serial": 200208,
   "Name": "狠毒鳥人",
   "Desc": "索奇亞島、德威特島、諾斯菲拉特 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m209",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 209,
   "Serial": 200209,
   "Name": "獅面女神",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m210",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 210,
   "Serial": 200210,
   "Name": "獅鷲獸",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m211",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 211,
   "Serial": 200211,
   "Name": "獨角仙",
   "Desc": "芙蕾雅島、莎蓮娜島、米內葛爾島、庫魯克斯島、諾斯菲拉特 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m212",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "米內葛爾島",
    "庫魯克斯島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 212,
   "Serial": 200212,
   "Name": "獨角獸",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m213",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 213,
   "Serial": 200213,
   "Name": "獵豹蜥蝪",
   "Desc": "莎蓮娜島、米內葛爾島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m214",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 214,
   "Serial": 200214,
   "Name": "玫瑰粉怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m215",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 215,
   "Serial": 200215,
   "Name": "瑪莉花",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m216",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 216,
   "Serial": 200216,
   "Name": "甲蟲",
   "Desc": "莎蓮娜島、米內葛爾島、德威特島、諾斯菲拉特 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m217",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島",
    "德威特島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 217,
   "Serial": 200217,
   "Name": "異型蜂",
   "Desc": "芙蕾雅島、米內葛爾島、德威特島、逆星、日耀之域 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m218",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島",
    "德威特島",
    "逆星",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 218,
   "Serial": 200218,
   "Name": "白羊",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m219",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 219,
   "Serial": 200219,
   "Name": "百步蛇",
   "Desc": "德威特島、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m220",
   "Tier": 2,
   "Regions": [
    "德威特島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 220,
   "Serial": 200220,
   "Name": "百香果公主",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m221",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 221,
   "Serial": 200221,
   "Name": "皇帝企鵝",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m222",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 222,
   "Serial": 200222,
   "Name": "皮皮地雷",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m223",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 223,
   "Serial": 200223,
   "Name": "盜賊",
   "Desc": "芙蕾雅島、索奇亞島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m224",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 224,
   "Serial": 200224,
   "Name": "盾",
   "Desc": "樂園之卵、哈那可半島 出沒",
   "ATK": 3.4,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.6,
   "MP": 5,
   "Art": "m225",
   "Tier": 2,
   "Regions": [
    "樂園之卵",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 225,
   "Serial": 200225,
   "Name": "石像怪",
   "Desc": "諾斯菲拉特 出沒",
   "ATK": 4.4,
   "DEF": 4.2,
   "SPD": 3.2,
   "HP": 6,
   "MP": 5,
   "Art": "m226",
   "Tier": 4,
   "Regions": [
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 226,
   "Serial": 200226,
   "Name": "石怪",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m227",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 227,
   "Serial": 200227,
   "Name": "破壞狂",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 2.8,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.6,
   "MP": 5,
   "Art": "m228",
   "Tier": 2,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 228,
   "Serial": 200228,
   "Name": "硬殼龜",
   "Desc": "諾斯菲拉特 出沒",
   "ATK": 4,
   "DEF": 3.7,
   "SPD": 2.9,
   "HP": 5.5,
   "MP": 5,
   "Art": "m229",
   "Tier": 3,
   "Regions": [
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 229,
   "Serial": 200229,
   "Name": "碎碎地雷",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m230",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 230,
   "Serial": 200230,
   "Name": "碧梟",
   "Desc": "德威特島、水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m231",
   "Tier": 4,
   "Regions": [
    "德威特島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 231,
   "Serial": 200231,
   "Name": "碧狐",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m232",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 232,
   "Serial": 200232,
   "Name": "碧玉瓢蟲",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m233",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 233,
   "Serial": 200233,
   "Name": "神盾",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m234",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 234,
   "Serial": 200234,
   "Name": "稜背龍",
   "Desc": "德威特島、哈那可半島、水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m235",
   "Tier": 4,
   "Regions": [
    "德威特島",
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 235,
   "Serial": 200235,
   "Name": "穴熊",
   "Desc": "芙蕾雅島、庫魯克斯島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m236",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 236,
   "Serial": 200236,
   "Name": "穴龍",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m237",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 237,
   "Serial": 200237,
   "Name": "端紅蝶",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m238",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 238,
   "Serial": 200238,
   "Name": "第七星阿爾多拉",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.8,
   "MP": 5,
   "Art": "m239",
   "Tier": 4,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 239,
   "Serial": 200239,
   "Name": "籃尾龍",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.2,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.7,
   "MP": 5,
   "Art": "m240",
   "Tier": 4,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 240,
   "Serial": 200240,
   "Name": "粉紅菇",
   "Desc": "米內葛爾島、庫魯克斯島、樂園之卵、逆星 出沒",
   "ATK": 2.5,
   "DEF": 2.2,
   "SPD": 2.3,
   "HP": 3.2,
   "MP": 5,
   "Art": "m241",
   "Tier": 1,
   "Regions": [
    "米內葛爾島",
    "庫魯克斯島",
    "樂園之卵",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 241,
   "Serial": 200241,
   "Name": "紅兔",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m242",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 242,
   "Serial": 200242,
   "Name": "紅寶石怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m243",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 243,
   "Serial": 200243,
   "Name": "紅帽哥布林",
   "Desc": "芙蕾雅島、庫魯克斯島、德威特島、諾斯菲拉特 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m244",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "庫魯克斯島",
    "德威特島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 244,
   "Serial": 200244,
   "Name": "紅炎聖誕花妖",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m245",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 245,
   "Serial": 200245,
   "Name": "紅色口臭鬼",
   "Desc": "德威特島、哈那可半島、逆星 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m246",
   "Tier": 4,
   "Regions": [
    "德威特島",
    "哈那可半島",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 246,
   "Serial": 200246,
   "Name": "紅蛙",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m247",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 247,
   "Serial": 200247,
   "Name": "紅蠍",
   "Desc": "索奇亞島、德威特島、哈那可半島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m248",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 248,
   "Serial": 200248,
   "Name": "紅雲瓢蟲",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m249",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 249,
   "Serial": 200249,
   "Name": "紅面番鴨",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m250",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 250,
   "Serial": 200250,
   "Name": "紅鬼",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m251",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 251,
   "Serial": 200251,
   "Name": "紫蛙",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m252",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 252,
   "Serial": 200252,
   "Name": "紫電巫師",
   "Desc": "米內葛爾島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m253",
   "Tier": 3,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 253,
   "Serial": 200253,
   "Name": "紫霞雲傘",
   "Desc": "哈那可半島 出沒",
   "ATK": 4.1,
   "DEF": 3.8,
   "SPD": 2.9,
   "HP": 5.6,
   "MP": 5,
   "Art": "m254",
   "Tier": 3,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 254,
   "Serial": 200254,
   "Name": "紫霧瓢蟲",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m255",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 255,
   "Serial": 200255,
   "Name": "紳士兔",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m256",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 256,
   "Serial": 200256,
   "Name": "絲諾波波",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m257",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 257,
   "Serial": 200257,
   "Name": "絳月",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m258",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 258,
   "Serial": 200258,
   "Name": "絳石燈",
   "Desc": "德威特島、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m259",
   "Tier": 2,
   "Regions": [
    "德威特島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 259,
   "Serial": 200259,
   "Name": "綠南瓜",
   "Desc": "米內葛爾島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m260",
   "Tier": 3,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 260,
   "Serial": 200260,
   "Name": "綠煙",
   "Desc": "德威特島、辛梅爾 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m261",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 261,
   "Serial": 200261,
   "Name": "綠色口臭鬼",
   "Desc": "芙蕾雅島、莎蓮娜島、米內葛爾島、庫魯克斯島、德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m262",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "米內葛爾島",
    "庫魯克斯島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 262,
   "Serial": 200262,
   "Name": "綠頭鴨",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m263",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 263,
   "Serial": 200263,
   "Name": "羅亨魟怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.2,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.7,
   "MP": 5,
   "Art": "m264",
   "Tier": 4,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 264,
   "Serial": 200264,
   "Name": "羅修",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m265",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 265,
   "Serial": 200265,
   "Name": "羅剎",
   "Desc": "莎蓮娜島、逆星 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m266",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 266,
   "Serial": 200266,
   "Name": "羅查",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.2,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.7,
   "MP": 5,
   "Art": "m267",
   "Tier": 4,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 267,
   "Serial": 200267,
   "Name": "羊駝",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m268",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 268,
   "Serial": 200268,
   "Name": "翠玉雲傘",
   "Desc": "水曜之域 出沒",
   "ATK": 4.3,
   "DEF": 4,
   "SPD": 2.9,
   "HP": 6.1,
   "MP": 5,
   "Art": "m269",
   "Tier": 3,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 269,
   "Serial": 200269,
   "Name": "翠石燈",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m270",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 270,
   "Serial": 200270,
   "Name": "翠綠小丑",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m271",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 271,
   "Serial": 200271,
   "Name": "翠綠菇",
   "Desc": "莎蓮娜島、米內葛爾島、庫魯克斯島、逆星、日耀之域、水曜之域 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m272",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島",
    "庫魯克斯島",
    "逆星",
    "日耀之域",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 272,
   "Serial": 200272,
   "Name": "翼龍",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m273",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 273,
   "Serial": 200273,
   "Name": "聖誕波波",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m274",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 274,
   "Serial": 200274,
   "Name": "胖蝙蝠",
   "Desc": "莎蓮娜島、弗利德島 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m275",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 275,
   "Serial": 200275,
   "Name": "腐屍",
   "Desc": "芙蕾雅島、莎蓮娜島 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m276",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 276,
   "Serial": 200276,
   "Name": "致命螳螂",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m277",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 277,
   "Serial": 200277,
   "Name": "舞蹈花妖",
   "Desc": "庫魯克斯島、德威特島、樂園之卵、哈那可半島、日耀之域 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m278",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島",
    "德威特島",
    "樂園之卵",
    "哈那可半島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 278,
   "Serial": 200278,
   "Name": "舞靴怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m279",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 279,
   "Serial": 200279,
   "Name": "葉靈",
   "Desc": "哈那可半島 出沒",
   "ATK": 4.1,
   "DEF": 3.8,
   "SPD": 2.9,
   "HP": 5.6,
   "MP": 5,
   "Art": "m280",
   "Tier": 3,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 280,
   "Serial": 200280,
   "Name": "蒼石燈",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m281",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 281,
   "Serial": 200281,
   "Name": "蔓陀羅草",
   "Desc": "莎蓮娜島、米內葛爾島、諾斯菲拉特 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m282",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 282,
   "Serial": 200282,
   "Name": "蕃茄咩",
   "Desc": "日耀之域 出沒",
   "ATK": 4.7,
   "DEF": 4.4,
   "SPD": 3.2,
   "HP": 6.5,
   "MP": 5,
   "Art": "m283",
   "Tier": 4,
   "Regions": [
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 215,
     "Level": 1
    }
   ]
  },
  {
   "ID": 283,
   "Serial": 200283,
   "Name": "薩普地雷",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m284",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 284,
   "Serial": 200284,
   "Name": "藍天瓢蟲",
   "Desc": "德威特島 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m285",
   "Tier": 1,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 285,
   "Serial": 200285,
   "Name": "藍色口臭鬼",
   "Desc": "索奇亞島、米內葛爾島、德威特島 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m286",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "米內葛爾島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 286,
   "Serial": 200286,
   "Name": "藍蠍",
   "Desc": "索奇亞島、傑諾姆島、水曜之域 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m287",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "傑諾姆島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 287,
   "Serial": 200287,
   "Name": "藍閃蝶",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m288",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 288,
   "Serial": 200288,
   "Name": "藍魔嚇人箱",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m289",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 289,
   "Serial": 200289,
   "Name": "虎人",
   "Desc": "芙蕾雅島、莎蓮娜島、米內葛爾島、德威特島、弗利德島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m290",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "米內葛爾島",
    "德威特島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 290,
   "Serial": 200290,
   "Name": "虎頭蜂",
   "Desc": "庫魯克斯島、樂園之卵、水曜之域 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m291",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島",
    "樂園之卵",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 291,
   "Serial": 200291,
   "Name": "蛋白石怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m292",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 292,
   "Serial": 200292,
   "Name": "蛟龍",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m293",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 293,
   "Serial": 200293,
   "Name": "蜥蝪戰士",
   "Desc": "芙蕾雅島、索奇亞島、莎蓮娜島 出沒",
   "ATK": 3.9,
   "DEF": 4,
   "SPD": 3.5,
   "HP": 5,
   "MP": 5,
   "Art": "m294",
   "Tier": 5,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 294,
   "Serial": 200294,
   "Name": "蜥蝪武士",
   "Desc": "莎蓮娜島、辛梅爾、諾斯菲拉特、哈那可半島 出沒",
   "ATK": 4.1,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.3,
   "MP": 5,
   "Art": "m295",
   "Tier": 5,
   "Regions": [
    "莎蓮娜島",
    "辛梅爾",
    "諾斯菲拉特",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 295,
   "Serial": 200295,
   "Name": "蜥蝪鬥士",
   "Desc": "索奇亞島、莎蓮娜島 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m296",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 296,
   "Serial": 200296,
   "Name": "螳螂",
   "Desc": "索奇亞島、庫魯克斯島、弗利德島 出沒",
   "ATK": 3.6,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.6,
   "MP": 5,
   "Art": "m297",
   "Tier": 4,
   "Regions": [
    "索奇亞島",
    "庫魯克斯島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 297,
   "Serial": 200297,
   "Name": "血腥之刃",
   "Desc": "芙蕾雅島、索奇亞島、莎蓮娜島、弗利德島 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m298",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "莎蓮娜島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 298,
   "Serial": 200298,
   "Name": "血骷髏",
   "Desc": "芙蕾雅島、莎蓮娜島、傑諾姆島 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m299",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "莎蓮娜島",
    "傑諾姆島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 299,
   "Serial": 200299,
   "Name": "西比亞烏賊",
   "Desc": "哈那可半島、水曜之域 出沒",
   "ATK": 4.9,
   "DEF": 4.8,
   "SPD": 3.5,
   "HP": 6.7,
   "MP": 5,
   "Art": "m300",
   "Tier": 5,
   "Regions": [
    "哈那可半島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 300,
   "Serial": 200300,
   "Name": "西留耶爾",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m301",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 301,
   "Serial": 200301,
   "Name": "西羅爾",
   "Desc": "哈那可半島 出沒",
   "ATK": 4.5,
   "DEF": 4.3,
   "SPD": 3.2,
   "HP": 6.2,
   "MP": 5,
   "Art": "m302",
   "Tier": 4,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 302,
   "Serial": 200302,
   "Name": "變種獅鷲獸",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m303",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 303,
   "Serial": 200303,
   "Name": "豬鬼",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m304",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 304,
   "Serial": 200304,
   "Name": "貓人",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 2.8,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.6,
   "MP": 5,
   "Art": "m305",
   "Tier": 2,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 305,
   "Serial": 200305,
   "Name": "貓妖",
   "Desc": "芙蕾雅島、米內葛爾島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m306",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 306,
   "Serial": 200306,
   "Name": "貓臉女神",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m307",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 307,
   "Serial": 200307,
   "Name": "貓隊長",
   "Desc": "德威特島、辛梅爾 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m308",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 308,
   "Serial": 200308,
   "Name": "賽修烏賊",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m309",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 309,
   "Serial": 200309,
   "Name": "赤梟",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m310",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 310,
   "Serial": 200310,
   "Name": "赤熊",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m311",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 311,
   "Serial": 200311,
   "Name": "赤燄",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m312",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 312,
   "Serial": 200312,
   "Name": "赤狐",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m313",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 313,
   "Serial": 200313,
   "Name": "赤猴",
   "Desc": "哈那可半島 出沒",
   "ATK": 3.2,
   "DEF": 2.8,
   "SPD": 2.3,
   "HP": 4.5,
   "MP": 5,
   "Art": "m314",
   "Tier": 1,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 314,
   "Serial": 200314,
   "Name": "赤目螳螂",
   "Desc": "索奇亞島、庫魯克斯島、德威特島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4,
   "MP": 5,
   "Art": "m315",
   "Tier": 3,
   "Regions": [
    "索奇亞島",
    "庫魯克斯島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 315,
   "Serial": 200315,
   "Name": "赤目黑熊",
   "Desc": "莎蓮娜島、辛梅爾 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m316",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 316,
   "Serial": 200316,
   "Name": "走路花妖",
   "Desc": "樂園之卵、逆星 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m317",
   "Tier": 3,
   "Regions": [
    "樂園之卵",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 317,
   "Serial": 200317,
   "Name": "跑步花妖",
   "Desc": "樂園之卵 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m318",
   "Tier": 3,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 318,
   "Serial": 200318,
   "Name": "跳跳地雷",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m319",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 319,
   "Serial": 200319,
   "Name": "迷你石像怪",
   "Desc": "莎蓮娜島、米內葛爾島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m320",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 320,
   "Serial": 200320,
   "Name": "迷你蝙蝠",
   "Desc": "芙蕾雅島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m321",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 321,
   "Serial": 200321,
   "Name": "迷你龍",
   "Desc": "德威特島、日耀之域 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m322",
   "Tier": 2,
   "Regions": [
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 322,
   "Serial": 200322,
   "Name": "連",
   "Desc": "辛梅爾 出沒",
   "ATK": 3,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4.2,
   "MP": 5,
   "Art": "m323",
   "Tier": 1,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    }
   ]
  },
  {
   "ID": 323,
   "Serial": 200323,
   "Name": "進化風之妖精",
   "Desc": "庫魯克斯島、德威特島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m324",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島",
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 324,
   "Serial": 200324,
   "Name": "達哈卡",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m325",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 325,
   "Serial": 200325,
   "Name": "金南瓜",
   "Desc": "米內葛爾島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m326",
   "Tier": 3,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 326,
   "Serial": 200326,
   "Name": "金屬蜥蝪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m327",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 327,
   "Serial": 200327,
   "Name": "金檸雲傘",
   "Desc": "水曜之域 出沒",
   "ATK": 4.3,
   "DEF": 4,
   "SPD": 2.9,
   "HP": 6.1,
   "MP": 5,
   "Art": "m328",
   "Tier": 3,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 328,
   "Serial": 200328,
   "Name": "金葉聖誕花妖",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m329",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 329,
   "Serial": 200329,
   "Name": "金黃跑車",
   "Desc": "水曜之域 出沒",
   "ATK": 5.2,
   "DEF": 5,
   "SPD": 3.5,
   "HP": 7.2,
   "MP": 5,
   "Art": "m330",
   "Tier": 5,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 330,
   "Serial": 200330,
   "Name": "鈴蘭花妖",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m331",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 331,
   "Serial": 200331,
   "Name": "銀怪",
   "Desc": "諾斯菲拉特 出沒",
   "ATK": 4.8,
   "DEF": 4.7,
   "SPD": 3.5,
   "HP": 6.6,
   "MP": 5,
   "Art": "m332",
   "Tier": 5,
   "Regions": [
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 332,
   "Serial": 200332,
   "Name": "銀獅",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m333",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 333,
   "Serial": 200333,
   "Name": "銀白聖誕花妖",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m334",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 334,
   "Serial": 200334,
   "Name": "鋼頭龍",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m335",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 335,
   "Serial": 200335,
   "Name": "鋼鬼",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m336",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 336,
   "Serial": 200336,
   "Name": "鍬型蟲",
   "Desc": "庫魯克斯島、樂園之卵 出沒",
   "ATK": 3.8,
   "DEF": 3.8,
   "SPD": 3.2,
   "HP": 5,
   "MP": 5,
   "Art": "m337",
   "Tier": 4,
   "Regions": [
    "庫魯克斯島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 337,
   "Serial": 200337,
   "Name": "鐮刀魔",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m338",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 338,
   "Serial": 200338,
   "Name": "鐵剪螃蟹",
   "Desc": "索奇亞島、庫魯克斯島、哈那可半島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m339",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "庫魯克斯島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 339,
   "Serial": 200339,
   "Name": "鐵獅",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m340",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 340,
   "Serial": 200340,
   "Name": "鑽石怪",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m341",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 341,
   "Serial": 200341,
   "Name": "闇影",
   "Desc": "索奇亞島、莎蓮娜島、辛梅爾 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m342",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 342,
   "Serial": 200342,
   "Name": "陰影",
   "Desc": "索奇亞島、莎蓮娜島、辛梅爾 出沒",
   "ATK": 4,
   "DEF": 4.1,
   "SPD": 3.5,
   "HP": 5.1,
   "MP": 5,
   "Art": "m343",
   "Tier": 5,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 343,
   "Serial": 200343,
   "Name": "陸行鯊",
   "Desc": "樂園之卵 出沒",
   "ATK": 3.4,
   "DEF": 3.1,
   "SPD": 2.6,
   "HP": 4.6,
   "MP": 5,
   "Art": "m344",
   "Tier": 2,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 344,
   "Serial": 200344,
   "Name": "雛鳥",
   "Desc": "德威特島、樂園之卵 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m345",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 345,
   "Serial": 200345,
   "Name": "雛龍",
   "Desc": "庫魯克斯島、德威特島、弗利德島、樂園之卵 出沒",
   "ATK": 3,
   "DEF": 2.8,
   "SPD": 2.6,
   "HP": 3.9,
   "MP": 5,
   "Art": "m346",
   "Tier": 2,
   "Regions": [
    "庫魯克斯島",
    "德威特島",
    "弗利德島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 346,
   "Serial": 200346,
   "Name": "雨行妖犬",
   "Desc": "樂園之卵 出沒",
   "ATK": 2.9,
   "DEF": 2.6,
   "SPD": 2.3,
   "HP": 4,
   "MP": 5,
   "Art": "m347",
   "Tier": 1,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    }
   ]
  },
  {
   "ID": 347,
   "Serial": 200347,
   "Name": "雪兒波波",
   "Desc": "德威特島、樂園之卵 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m348",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 348,
   "Serial": 200348,
   "Name": "雲狐",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m349",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 349,
   "Serial": 200349,
   "Name": "靈芝小妖",
   "Desc": "芙蕾雅島、水曜之域 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m350",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 350,
   "Serial": 200350,
   "Name": "青梟",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m351",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 351,
   "Serial": 200351,
   "Name": "青煙雲傘",
   "Desc": "水曜之域 出沒",
   "ATK": 4.3,
   "DEF": 4,
   "SPD": 2.9,
   "HP": 6.1,
   "MP": 5,
   "Art": "m352",
   "Tier": 3,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 352,
   "Serial": 200352,
   "Name": "青狐",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m353",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 353,
   "Serial": 200353,
   "Name": "青猴",
   "Desc": "水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3,
   "SPD": 2.3,
   "HP": 5,
   "MP": 5,
   "Art": "m354",
   "Tier": 1,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    }
   ]
  },
  {
   "ID": 354,
   "Serial": 200354,
   "Name": "青石燈",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m355",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 355,
   "Serial": 200355,
   "Name": "青竹絲",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m356",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 356,
   "Serial": 200356,
   "Name": "青蛙",
   "Desc": "哈那可半島 出沒",
   "ATK": 3.6,
   "DEF": 3.3,
   "SPD": 2.6,
   "HP": 5.1,
   "MP": 5,
   "Art": "m357",
   "Tier": 2,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 357,
   "Serial": 200357,
   "Name": "韋伯蝙蝠",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m358",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 358,
   "Serial": 200358,
   "Name": "頑皮炸彈",
   "Desc": "米內葛爾島、德威特島、諾斯菲拉特、逆星 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m359",
   "Tier": 3,
   "Regions": [
    "米內葛爾島",
    "德威特島",
    "諾斯菲拉特",
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 359,
   "Serial": 200359,
   "Name": "顎牙",
   "Desc": "樂園之卵、日耀之域 出沒",
   "ATK": 3.8,
   "DEF": 3.6,
   "SPD": 2.9,
   "HP": 5.1,
   "MP": 5,
   "Art": "m360",
   "Tier": 3,
   "Regions": [
    "樂園之卵",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 360,
   "Serial": 200360,
   "Name": "風之妖精",
   "Desc": "莎蓮娜島、庫魯克斯島、哈那可半島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4.2,
   "MP": 5,
   "Art": "m361",
   "Tier": 3,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 361,
   "Serial": 200361,
   "Name": "風獸",
   "Desc": "哈那可半島 出沒",
   "ATK": 4.9,
   "DEF": 4.8,
   "SPD": 3.5,
   "HP": 6.7,
   "MP": 5,
   "Art": "m362",
   "Tier": 5,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 362,
   "Serial": 200362,
   "Name": "風蜘蛛",
   "Desc": "芙蕾雅島、索奇亞島、樂園之卵、哈那可半島、日耀之域 出沒",
   "ATK": 3.1,
   "DEF": 3,
   "SPD": 2.9,
   "HP": 3.9,
   "MP": 5,
   "Art": "m363",
   "Tier": 3,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "樂園之卵",
    "哈那可半島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 363,
   "Serial": 200363,
   "Name": "風鈴花妖",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m364",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 364,
   "Serial": 200364,
   "Name": "風龍蜥",
   "Desc": "莎蓮娜島、庫魯克斯島 出沒",
   "ATK": 2.8,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.6,
   "MP": 5,
   "Art": "m365",
   "Tier": 2,
   "Regions": [
    "莎蓮娜島",
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    }
   ]
  },
  {
   "ID": 365,
   "Serial": 200365,
   "Name": "飛紅巫師",
   "Desc": "米內葛爾島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m366",
   "Tier": 3,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 366,
   "Serial": 200366,
   "Name": "食屍鬼",
   "Desc": "莎蓮娜島、諾斯菲拉特 出沒",
   "ATK": 2.4,
   "DEF": 2.1,
   "SPD": 2.3,
   "HP": 3.1,
   "MP": 5,
   "Art": "m367",
   "Tier": 1,
   "Regions": [
    "莎蓮娜島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    }
   ]
  },
  {
   "ID": 367,
   "Serial": 200367,
   "Name": "骷髏戰士",
   "Desc": "索奇亞島、莎蓮娜島、德威特島、弗利德島 出沒",
   "ATK": 3.2,
   "DEF": 3.1,
   "SPD": 2.9,
   "HP": 4,
   "MP": 5,
   "Art": "m368",
   "Tier": 3,
   "Regions": [
    "索奇亞島",
    "莎蓮娜島",
    "德威特島",
    "弗利德島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 368,
   "Serial": 200368,
   "Name": "骷髏海盜",
   "Desc": "德威特島、諾斯菲拉特 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m369",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "諾斯菲拉特"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 369,
   "Serial": 200369,
   "Name": "鬧鐘小叮",
   "Desc": "德威特島、哈那可半島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m370",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 370,
   "Serial": 200370,
   "Name": "鬧鐘小滴",
   "Desc": "德威特島、日耀之域 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m371",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "日耀之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 371,
   "Serial": 200371,
   "Name": "鬧鐘小答",
   "Desc": "庫魯克斯島 出沒",
   "ATK": 3.4,
   "DEF": 3.3,
   "SPD": 2.9,
   "HP": 4.5,
   "MP": 5,
   "Art": "m372",
   "Tier": 3,
   "Regions": [
    "庫魯克斯島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 216,
     "Level": 1
    }
   ]
  },
  {
   "ID": 372,
   "Serial": 200372,
   "Name": "鬼石燈",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m373",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 373,
   "Serial": 200373,
   "Name": "鬼靈",
   "Desc": "芙蕾雅島、索奇亞島、米內葛爾島、諾斯菲拉特、日耀之域、水曜之域 出沒",
   "ATK": 2.2,
   "DEF": 2,
   "SPD": 2.3,
   "HP": 2.8,
   "MP": 5,
   "Art": "m374",
   "Tier": 1,
   "Regions": [
    "芙蕾雅島",
    "索奇亞島",
    "米內葛爾島",
    "諾斯菲拉特",
    "日耀之域",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    }
   ]
  },
  {
   "ID": 374,
   "Serial": 200374,
   "Name": "魔女桃兒",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m375",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 375,
   "Serial": 200375,
   "Name": "魔女琮兒",
   "Desc": "哈那可半島 出沒",
   "ATK": 3.6,
   "DEF": 3.3,
   "SPD": 2.6,
   "HP": 5.1,
   "MP": 5,
   "Art": "m376",
   "Tier": 2,
   "Regions": [
    "哈那可半島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 207,
     "Level": 1
    }
   ]
  },
  {
   "ID": 376,
   "Serial": 200376,
   "Name": "魔女紫兒",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m377",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 377,
   "Serial": 200377,
   "Name": "魔女翠兒",
   "Desc": "德威特島 出沒",
   "ATK": 3.1,
   "DEF": 2.9,
   "SPD": 2.6,
   "HP": 4.1,
   "MP": 5,
   "Art": "m378",
   "Tier": 2,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 378,
   "Serial": 200378,
   "Name": "魔女青兒",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m379",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 379,
   "Serial": 200379,
   "Name": "魔法師之鬼",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m380",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 380,
   "Serial": 200380,
   "Name": "魔術機丁",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m381",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 381,
   "Serial": 200381,
   "Name": "魔術機己",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m382",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 382,
   "Serial": 200382,
   "Name": "魔術機戊",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m383",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 383,
   "Serial": 200383,
   "Name": "魔術機甲",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m384",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 384,
   "Serial": 200384,
   "Name": "魟怪",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.3,
   "DEF": 4.1,
   "SPD": 3.2,
   "HP": 5.8,
   "MP": 5,
   "Art": "m385",
   "Tier": 4,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 385,
   "Serial": 200385,
   "Name": "鳥人",
   "Desc": "逆星 出沒",
   "ATK": 4.6,
   "DEF": 4.3,
   "SPD": 3.2,
   "HP": 6.3,
   "MP": 5,
   "Art": "m386",
   "Tier": 4,
   "Regions": [
    "逆星"
   ],
   "Skills": [
    {
     "SkillID": 209,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 386,
   "Serial": 200386,
   "Name": "鴨嘴獸",
   "Desc": "德威特島、樂園之卵 出沒",
   "ATK": 2.7,
   "DEF": 2.4,
   "SPD": 2.3,
   "HP": 3.6,
   "MP": 5,
   "Art": "m387",
   "Tier": 1,
   "Regions": [
    "德威特島",
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    }
   ]
  },
  {
   "ID": 387,
   "Serial": 200387,
   "Name": "鵝黃小丑",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m388",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 388,
   "Serial": 200388,
   "Name": "麒麟",
   "Desc": "辛梅爾 出沒",
   "ATK": 4.7,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.4,
   "MP": 5,
   "Art": "m389",
   "Tier": 5,
   "Regions": [
    "辛梅爾"
   ],
   "Skills": [
    {
     "SkillID": 213,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 389,
   "Serial": 200389,
   "Name": "黃兔",
   "Desc": "德威特島 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m390",
   "Tier": 3,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 390,
   "Serial": 200390,
   "Name": "黃狐",
   "Desc": "水曜之域 出沒",
   "ATK": 4.3,
   "DEF": 4,
   "SPD": 2.9,
   "HP": 6.1,
   "MP": 5,
   "Art": "m391",
   "Tier": 3,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 391,
   "Serial": 200391,
   "Name": "黃色口臭鬼",
   "Desc": "芙蕾雅島、米內葛爾島 出沒",
   "ATK": 3.5,
   "DEF": 3.5,
   "SPD": 3.2,
   "HP": 4.4,
   "MP": 5,
   "Art": "m392",
   "Tier": 4,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    },
    {
     "SkillID": 206,
     "Level": 1
    }
   ]
  },
  {
   "ID": 392,
   "Serial": 200392,
   "Name": "黃色小鴨",
   "Desc": "德威特島 出沒",
   "ATK": 3.9,
   "DEF": 3.9,
   "SPD": 3.2,
   "HP": 5.2,
   "MP": 5,
   "Art": "m393",
   "Tier": 4,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 393,
   "Serial": 200393,
   "Name": "黃蛙",
   "Desc": "水曜之域 出沒",
   "ATK": 3.9,
   "DEF": 3.5,
   "SPD": 2.6,
   "HP": 5.5,
   "MP": 5,
   "Art": "m394",
   "Tier": 2,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    }
   ]
  },
  {
   "ID": 394,
   "Serial": 200394,
   "Name": "黃蜂",
   "Desc": "芙蕾雅島、弗利德島、水曜之域 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m395",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "弗利德島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 395,
   "Serial": 200395,
   "Name": "黃蠍",
   "Desc": "索奇亞島、德威特島、傑諾姆島 出沒",
   "ATK": 2.7,
   "DEF": 2.6,
   "SPD": 2.6,
   "HP": 3.5,
   "MP": 5,
   "Art": "m396",
   "Tier": 2,
   "Regions": [
    "索奇亞島",
    "德威特島",
    "傑諾姆島"
   ],
   "Skills": [
    {
     "SkillID": 203,
     "Level": 1
    },
    {
     "SkillID": 217,
     "Level": 1
    }
   ]
  },
  {
   "ID": 396,
   "Serial": 200396,
   "Name": "黃金樹精",
   "Desc": "德威特島 出沒",
   "ATK": 4.4,
   "DEF": 4.4,
   "SPD": 3.5,
   "HP": 5.8,
   "MP": 5,
   "Art": "m397",
   "Tier": 5,
   "Regions": [
    "德威特島"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 397,
   "Serial": 200397,
   "Name": "黃金螃蟹",
   "Desc": "芙蕾雅島、米內葛爾島 出沒",
   "ATK": 2.6,
   "DEF": 2.5,
   "SPD": 2.6,
   "HP": 3.3,
   "MP": 5,
   "Art": "m398",
   "Tier": 2,
   "Regions": [
    "芙蕾雅島",
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 200,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 398,
   "Serial": 200398,
   "Name": "黃金龍骨",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m399",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  },
  {
   "ID": 399,
   "Serial": 200399,
   "Name": "黃錦雲傘",
   "Desc": "德威特島、水曜之域 出沒",
   "ATK": 3.5,
   "DEF": 3.4,
   "SPD": 2.9,
   "HP": 4.7,
   "MP": 5,
   "Art": "m400",
   "Tier": 3,
   "Regions": [
    "德威特島",
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 212,
     "Level": 1
    },
    {
     "SkillID": 208,
     "Level": 1
    }
   ]
  },
  {
   "ID": 400,
   "Serial": 200400,
   "Name": "黃雲巫師",
   "Desc": "米內葛爾島 出沒",
   "ATK": 3.3,
   "DEF": 3.2,
   "SPD": 2.9,
   "HP": 4.3,
   "MP": 5,
   "Art": "m401",
   "Tier": 3,
   "Regions": [
    "米內葛爾島"
   ],
   "Skills": [
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 220,
     "Level": 1
    }
   ]
  },
  {
   "ID": 401,
   "Serial": 200401,
   "Name": "黑暗鳥人",
   "Desc": "莎蓮娜島 出沒",
   "ATK": 3.7,
   "DEF": 3.6,
   "SPD": 3.2,
   "HP": 4.7,
   "MP": 5,
   "Art": "m402",
   "Tier": 4,
   "Regions": [
    "莎蓮娜島"
   ],
   "Skills": [
    {
     "SkillID": 202,
     "Level": 1
    },
    {
     "SkillID": 201,
     "Level": 1
    },
    {
     "SkillID": 209,
     "Level": 1
    }
   ]
  },
  {
   "ID": 402,
   "Serial": 200402,
   "Name": "黑脈樺斑蝶",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m403",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 403,
   "Serial": 200403,
   "Name": "龍吐珠花妖",
   "Desc": "水曜之域 出沒",
   "ATK": 4.7,
   "DEF": 4.5,
   "SPD": 3.2,
   "HP": 6.6,
   "MP": 5,
   "Art": "m404",
   "Tier": 4,
   "Regions": [
    "水曜之域"
   ],
   "Skills": [
    {
     "SkillID": 211,
     "Level": 1
    },
    {
     "SkillID": 218,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    }
   ]
  },
  {
   "ID": 404,
   "Serial": 200404,
   "Name": "龍骨",
   "Desc": "樂園之卵 出沒",
   "ATK": 4.6,
   "DEF": 4.6,
   "SPD": 3.5,
   "HP": 6.2,
   "MP": 5,
   "Art": "m405",
   "Tier": 5,
   "Regions": [
    "樂園之卵"
   ],
   "Skills": [
    {
     "SkillID": 214,
     "Level": 1
    },
    {
     "SkillID": 219,
     "Level": 1
    },
    {
     "SkillID": 205,
     "Level": 1
    }
   ]
  }
 ],
 "Skills": [
  {
   "ID": 0,
   "Name": "揮砍",
   "Desc": "劍指前方，所向披靡",
   "Icon": 10139,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 1.05,
   "CDReduceRatePerLevel": 0.03,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0.2,
   "BelongSkillID": 0,
   "AbilityDescTpl": "向面前距離{Distance}和{Range}度範圍揮砍{Count}次，對範圍內的敵人造成{Percent}%傷害。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%傷害。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "120",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Distance",
     "Value": "10",
     "Type": "int"
    },
    {
     "Key": "DistancePerLevel",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "90",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "CountPer3Level",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 1,
   "Name": "弓術射擊",
   "Desc": "使用弓箭向遠處目標射擊",
   "Icon": 10100,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 1.15,
   "CDReduceRatePerLevel": 0.03,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0.2,
   "BelongSkillID": 0,
   "AbilityDescTpl": "向目標方向以{Speed}速度發射箭矢，造成{Percent}%傷害，最大距離{Range}。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%傷害，{RangePerLevel}射程。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "120",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Speed",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "SpeedPerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "Through",
     "Value": "0",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 2,
   "Name": "亂射",
   "Desc": "向遠處射出大量箭矢",
   "Icon": 10011,
   "IsSpecial": true,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 10,
   "CDReduceRatePerLevel": 0.05,
   "MaxLevel": 10,
   "MPCost": 10,
   "MPCostPerLevel": 0.2,
   "BelongSkillID": 0,
   "AbilityDescTpl": "發射大量箭矢造成{Range}範圍的{Percent}%傷害，最多{Count}次。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%傷害。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "80",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "CountPer3Level",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Speed",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "SpeedPerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Rate",
     "Value": "1",
     "Type": "float"
    }
   ]
  },
  {
   "ID": 3,
   "Name": "健身達人",
   "Desc": "力量！我渴望力量！",
   "Icon": 10028,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "基礎傷害增加{Percent}%。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%基礎傷害。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 4,
   "Name": "長跑愛好者",
   "Desc": "你猜我跑得多快？",
   "Icon": 10111,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "增加{Percent}%移動速度。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%移動速度。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 5,
   "Name": "護衛",
   "Desc": "我這臉猶如城牆",
   "Icon": 10007,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "增加{Percent}%基礎防禦。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%基礎防禦。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 6,
   "Name": "好學生",
   "Desc": "經驗！寶貴的經驗！",
   "Icon": 90065,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "獲取到的經驗增加{Percent}%。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "0",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "10",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 7,
   "Name": "財迷寶寶",
   "Desc": "地上那些魔石都是我的！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "獲取到的金幣增加{Percent}%。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "0",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "10",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 8,
   "Name": "衝啊",
   "Desc": "看見前面沒！衝！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "怪物專用技能，短時間加快移動速度",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": []
  },
  {
   "ID": 9,
   "Name": "我閃！",
   "Desc": "閃避點滿",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "怪物專用技能，Dash！",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": []
  },
  {
   "ID": 10,
   "Name": "我擋！",
   "Desc": "嘿嘿～防禦我最棒",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "怪物專用技能，防禦！",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": []
  },
  {
   "ID": 11,
   "Name": "力量光環",
   "Desc": "奮起吧！我的兄弟們！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "為周邊怪物增加20%攻擊",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": [
    {
     "Key": "Light",
     "Value": "0",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "1",
     "Type": "float"
    },
    {
     "Key": "RangePerLevel",
     "Value": "0.1",
     "Type": "float"
    }
   ]
  },
  {
   "ID": 12,
   "Name": "防禦光環",
   "Desc": "奮起吧！我的兄弟們！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "為周邊怪物增加20%防禦",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": [
    {
     "Key": "Light",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "1",
     "Type": "float"
    },
    {
     "Key": "RangePerLevel",
     "Value": "0.1",
     "Type": "float"
    }
   ]
  },
  {
   "ID": 13,
   "Name": "速度光環",
   "Desc": "奮起吧！我的兄弟們！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "為周邊怪物增加20%速度",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": [
    {
     "Key": "Light",
     "Value": "2",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "1",
     "Type": "float"
    },
    {
     "Key": "RangePerLevel",
     "Value": "0.1",
     "Type": "float"
    }
   ]
  },
  {
   "ID": 14,
   "Name": "生命光環",
   "Desc": "奮起吧！我的兄弟們！",
   "Icon": 30075,
   "IsSpecial": false,
   "IsLearnable": false,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "為周邊怪物增加20%最大生命",
   "AbilityLevelUpDescTpl": "怪物專用技能",
   "Params": [
    {
     "Key": "Light",
     "Value": "3",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "1",
     "Type": "float"
    },
    {
     "Key": "RangePerLevel",
     "Value": "0.1",
     "Type": "float"
    }
   ]
  },
  {
   "ID": 15,
   "Name": "弧月斬",
   "Desc": "一劍斬月，弧月斬！",
   "Icon": 10078,
   "IsSpecial": true,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 10,
   "CDReduceRatePerLevel": 0.03,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0.2,
   "BelongSkillID": 0,
   "AbilityDescTpl": "向目標方向揮出劍氣，對{Range}範圍內敵人造成{Percent}%傷害。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%傷害。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "80",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Speed",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "SpeedPerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 16,
   "Name": "武力全開",
   "Desc": "暴擊！給我狠狠的暴擊！",
   "Icon": 90035,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "攻擊有{Percent}%機率造成2倍暴擊傷害。",
   "AbilityLevelUpDescTpl": "每級增加{PercentRatePerLevel}%。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "10",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "5",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 17,
   "Name": "飛毛腿",
   "Desc": "你看我跑多快～",
   "Icon": 30040,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "降低躲避CD的{Percent}%時長，並增加閃避點數。",
   "AbilityLevelUpDescTpl": "每級降低{PercentRatePerLevel}%。",
   "Params": [
    {
     "Key": "Percent",
     "Value": "10",
     "Type": "int"
    },
    {
     "Key": "PercentRatePerLevel",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "1",
     "Type": "int"
    },
    {
     "Key": "CountLevel",
     "Value": "5",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 18,
   "Name": "緩速光環",
   "Desc": "在我的地盤這～你就得聽我的",
   "Icon": 90036,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "對進入光環{Range}範圍的敵人造成{Effect}%減速。",
   "AbilityLevelUpDescTpl": "每級增大{RangePerLevel}範圍。",
   "Params": [
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Effect",
     "Value": "10",
     "Type": "int"
    },
    {
     "Key": "EffectPerLevel",
     "Value": "5",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 19,
   "Name": "灼熱光環",
   "Desc": "在火熱地獄中哀嚎吧",
   "Icon": 90035,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "對進入光環{Range}範圍的敵人每秒造成{Effect}%攻擊力傷害。",
   "AbilityLevelUpDescTpl": "每級提高{EffectPerLevel}%傷害。",
   "Params": [
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Effect",
     "Value": "10",
     "Type": "int"
    },
    {
     "Key": "EffectPerLevel",
     "Value": "1",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 20,
   "Name": "拿來吧你",
   "Desc": "我的！都是我的！",
   "Icon": 30076,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": false,
   "CD": 0,
   "CDReduceRatePerLevel": 0,
   "MaxLevel": 20,
   "MPCost": 0,
   "MPCostPerLevel": 0,
   "BelongSkillID": 0,
   "AbilityDescTpl": "拾取範圍擴大{Range}%。",
   "AbilityLevelUpDescTpl": "每級擴大{RangePerLevel}%範圍。",
   "Params": [
    {
     "Key": "Range",
     "Value": "0",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "10",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 21,
   "Name": "迅捷之風",
   "Desc": "大風起兮雲飛揚",
   "Icon": 10112,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 5,
   "CDReduceRatePerLevel": 0.05,
   "MaxLevel": 10,
   "MPCost": 0,
   "MPCostPerLevel": 0.2,
   "BelongSkillID": 0,
   "AbilityDescTpl": "向前方釋放強風，對{Range}距離{Radius}範圍的敵人造成無視防禦的{Percent}%攻擊力傷害。",
   "AbilityLevelUpDescTpl": "每級增加{PercentPerLevel}%傷害。",
   "Params": [
    {
     "Key": "Range",
     "Value": "50",
     "Type": "int"
    },
    {
     "Key": "RangePerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Percent",
     "Value": "20",
     "Type": "int"
    },
    {
     "Key": "PercentPerLevel",
     "Value": "8",
     "Type": "int"
    },
    {
     "Key": "Speed",
     "Value": "20",
     "Type": "int"
    },
    {
     "Key": "SpeedPerLevel",
     "Value": "5",
     "Type": "int"
    },
    {
     "Key": "Radius",
     "Value": "30",
     "Type": "int"
    },
    {
     "Key": "RadiusPerLevel",
     "Value": "2",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 100,
   "Name": "火球術",
   "Desc": "向最近的敵人投擲火球，命中後爆裂造成範圍傷害。",
   "Kind": "fireball",
   "Element": "fire",
   "Icon": 10001,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 5,
   "MPCost": 16,
   "Percent": 210,
   "Color": "#ff8a3d",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "210",
     "Type": "int"
    },
    {
     "Key": "Radius",
     "Value": "78",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 101,
   "Name": "冰霜新星",
   "Desc": "以自身為中心爆發冰霜，傷害並緩速周圍敵人。",
   "Kind": "frost",
   "Element": "ice",
   "Icon": 10045,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 7,
   "MPCost": 20,
   "Percent": 150,
   "Radius": 200,
   "Color": "#8fd8ff",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "150",
     "Type": "int"
    },
    {
     "Key": "Radius",
     "Value": "200",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 102,
   "Name": "雷電鏈",
   "Desc": "雷電在敵人之間連鎖跳躍，最多擊中數名敵人。",
   "Kind": "chain",
   "Element": "thunder",
   "Icon": 10051,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 8,
   "MPCost": 22,
   "Percent": 135,
   "Color": "#ffe066",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "135",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "3",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 103,
   "Name": "治癒之光",
   "Desc": "恢復自身生命，並在短時間內持續回復。",
   "Kind": "heal",
   "Element": "holy",
   "Icon": 90003,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 12,
   "MPCost": 24,
   "Percent": 30,
   "Color": "#8fffb0",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "30",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 104,
   "Name": "烈焰風暴",
   "Desc": "在敵人所在位置降下多顆火隕石，造成大範圍傷害。",
   "Kind": "meteor",
   "Element": "fire",
   "Icon": 10015,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 13,
   "MPCost": 28,
   "Percent": 190,
   "Color": "#ff6b3d",
   "UnlockLevel": 4,
   "Params": [
    {
     "Key": "Percent",
     "Value": "190",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "3",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 105,
   "Name": "神聖護盾",
   "Desc": "展開護盾吸收傷害，持續 9 秒。",
   "Kind": "shield",
   "Element": "holy",
   "Icon": 90036,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 16,
   "MPCost": 20,
   "Percent": 35,
   "Color": "#ffe9a8",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "35",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 106,
   "Name": "劇毒雲霧",
   "Desc": "在敵人腳下留下毒霧，持續傷害並緩速。",
   "Kind": "poison",
   "Element": "poison",
   "Icon": 90015,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 10,
   "MPCost": 20,
   "Percent": 110,
   "Color": "#a8d46a",
   "UnlockLevel": 4,
   "Params": [
    {
     "Key": "Percent",
     "Value": "110",
     "Type": "int"
    },
    {
     "Key": "Radius",
     "Value": "100",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 107,
   "Name": "疾風刃",
   "Desc": "射出貫穿多個敵人的風刃扇。",
   "Kind": "wind",
   "Element": "wind",
   "Icon": 10107,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 6,
   "MPCost": 18,
   "Percent": 130,
   "Color": "#9ff3d6",
   "UnlockLevel": 1,
   "Params": [
    {
     "Key": "Percent",
     "Value": "130",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "5",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 108,
   "Name": "暗影箭",
   "Desc": "凝聚暗影能量射向敵人，造成高額單體傷害。",
   "Kind": "fireball",
   "Element": "dark",
   "Icon": 90021,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 6,
   "MPCost": 20,
   "Percent": 190,
   "Color": "#b78bff",
   "UnlockLevel": 4,
   "Params": [
    {
     "Key": "Percent",
     "Value": "190",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 109,
   "Name": "魔力虹吸",
   "Desc": "吸取敵人生命與魔力，轉化為自身恢復。",
   "Kind": "drain",
   "Element": "dark",
   "Icon": 90035,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 9,
   "MPCost": 14,
   "Percent": 140,
   "Color": "#c98bff",
   "UnlockLevel": 4,
   "Params": [
    {
     "Key": "Percent",
     "Value": "140",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 110,
   "Name": "隕石術",
   "Desc": "在敵人周圍降下大量隕石，覆蓋整片區域。",
   "Kind": "star",
   "Element": "fire",
   "Icon": 10015,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 15,
   "MPCost": 30,
   "Percent": 170,
   "Color": "#ffb15c",
   "UnlockLevel": 4,
   "Params": [
    {
     "Key": "Percent",
     "Value": "170",
     "Type": "int"
    },
    {
     "Key": "Count",
     "Value": "7",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 111,
   "Name": "時光緩流",
   "Desc": "大幅緩速周圍所有敵人，替自己爭取走位空間。",
   "Kind": "time",
   "Element": "arcane",
   "Icon": 10139,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 14,
   "MPCost": 24,
   "Percent": 80,
   "Color": "#9fd8ff",
   "UnlockLevel": 6,
   "Params": [
    {
     "Key": "Percent",
     "Value": "80",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 112,
   "Name": "聖光審判",
   "Desc": "以自身為中心降下聖光，傷害並暈眩周圍敵人。",
   "Kind": "holy",
   "Element": "holy",
   "Icon": 90012,
   "IsSpecial": false,
   "IsLearnable": true,
   "IsAutoSkill": true,
   "CD": 15,
   "MPCost": 30,
   "Percent": 200,
   "Color": "#ffe9a8",
   "UnlockLevel": 6,
   "Params": [
    {
     "Key": "Percent",
     "Value": "200",
     "Type": "int"
    }
   ]
  },
  {
   "ID": 200,
   "Name": "魔彈",
   "Kind": "e_bolt",
   "Side": "enemy",
   "CD": 3.6,
   "Percent": 0.7,
   "Range": 460,
   "Speed": 250,
   "Color": "#b78bff",
   "CastTime": 0.5
  },
  {
   "ID": 201,
   "Name": "毒霧",
   "Kind": "e_poison",
   "Side": "enemy",
   "CD": 6.2,
   "Percent": 0.5,
   "Range": 420,
   "Radius": 62,
   "Color": "#a8d46a",
   "CastTime": 0.6
  },
  {
   "ID": 202,
   "Name": "冰錐",
   "Kind": "e_ice",
   "Side": "enemy",
   "CD": 4.2,
   "Percent": 0.75,
   "Range": 450,
   "Speed": 220,
   "Color": "#8fd8ff",
   "CastTime": 0.45
  },
  {
   "ID": 203,
   "Name": "火球",
   "Kind": "e_bolt",
   "Side": "enemy",
   "CD": 4,
   "Percent": 0.8,
   "Range": 440,
   "Speed": 230,
   "Color": "#ff8a3d",
   "CastTime": 0.5
  },
  {
   "ID": 204,
   "Name": "落石",
   "Kind": "e_meteor",
   "Side": "enemy",
   "CD": 7,
   "Percent": 1,
   "Range": 420,
   "Radius": 58,
   "Color": "#d9a066",
   "CastTime": 0.65
  },
  {
   "ID": 205,
   "Name": "治療術",
   "Kind": "e_heal",
   "Side": "enemy",
   "CD": 9,
   "Range": 400,
   "Color": "#8fffb0",
   "CastTime": 0.6
  },
  {
   "ID": 206,
   "Name": "狂暴",
   "Kind": "e_enrage",
   "Side": "enemy",
   "CD": 12,
   "Range": 330,
   "Color": "#ff6b6b",
   "CastTime": 0.45
  },
  {
   "ID": 207,
   "Name": "衝撞",
   "Kind": "e_charge",
   "Side": "enemy",
   "CD": 6,
   "Percent": 0.9,
   "Range": 350,
   "Color": "#ffb15c",
   "CastTime": 0.35
  },
  {
   "ID": 208,
   "Name": "雷擊",
   "Kind": "e_chain",
   "Side": "enemy",
   "CD": 6.5,
   "Percent": 0.9,
   "Range": 480,
   "Color": "#ffe066",
   "CastTime": 0.55
  },
  {
   "ID": 209,
   "Name": "詛咒",
   "Kind": "e_curse",
   "Side": "enemy",
   "CD": 8,
   "Range": 450,
   "Color": "#b78bff",
   "CastTime": 0.5
  },
  {
   "ID": 210,
   "Name": "骨矛",
   "Kind": "e_bolt",
   "Side": "enemy",
   "CD": 4.4,
   "Percent": 0.85,
   "Range": 470,
   "Speed": 280,
   "Color": "#e8e8e8",
   "CastTime": 0.45
  },
  {
   "ID": 211,
   "Name": "水彈",
   "Kind": "e_ice",
   "Side": "enemy",
   "CD": 4.6,
   "Percent": 0.65,
   "Range": 440,
   "Speed": 200,
   "Color": "#6fc3ff",
   "CastTime": 0.45
  },
  {
   "ID": 212,
   "Name": "風刃",
   "Kind": "e_spread",
   "Side": "enemy",
   "CD": 4.4,
   "Percent": 0.6,
   "Range": 430,
   "Speed": 240,
   "Color": "#9ff3d6",
   "CastTime": 0.4
  },
  {
   "ID": 213,
   "Name": "暗影彈",
   "Kind": "e_bolt",
   "Side": "enemy",
   "CD": 4.2,
   "Percent": 0.8,
   "Range": 450,
   "Speed": 220,
   "Color": "#9b7bff",
   "CastTime": 0.5
  },
  {
   "ID": 214,
   "Name": "聖光",
   "Kind": "e_heal",
   "Side": "enemy",
   "CD": 10,
   "Range": 380,
   "Color": "#ffe9a8",
   "CastTime": 0.6
  },
  {
   "ID": 215,
   "Name": "熔岩",
   "Kind": "e_meteor",
   "Side": "enemy",
   "CD": 7.5,
   "Percent": 1.1,
   "Range": 400,
   "Radius": 62,
   "Color": "#ff8a5c",
   "CastTime": 0.7
  },
  {
   "ID": 216,
   "Name": "冰霜新星",
   "Kind": "e_nova",
   "Side": "enemy",
   "CD": 7,
   "Percent": 0.55,
   "Range": 300,
   "Color": "#a6ecff",
   "CastTime": 0.6
  },
  {
   "ID": 217,
   "Name": "沙塵",
   "Kind": "e_sand",
   "Side": "enemy",
   "CD": 6.5,
   "Percent": 0.5,
   "Range": 430,
   "Radius": 90,
   "Color": "#f0c15c",
   "CastTime": 0.5
  },
  {
   "ID": 218,
   "Name": "靈魂吸收",
   "Kind": "e_drain",
   "Side": "enemy",
   "CD": 7,
   "Percent": 0.8,
   "Range": 420,
   "Color": "#b6a4ff",
   "CastTime": 0.55
  },
  {
   "ID": 219,
   "Name": "屏障",
   "Kind": "e_shield",
   "Side": "enemy",
   "CD": 11,
   "Range": 320,
   "Color": "#9fd8ff",
   "CastTime": 0.45
  },
  {
   "ID": 220,
   "Name": "孢子召喚",
   "Kind": "e_summon",
   "Side": "enemy",
   "CD": 14,
   "Range": 360,
   "Color": "#a8d46a",
   "CastTime": 0.7
  },
  {
   "ID": 221,
   "Name": "蛛網",
   "Kind": "e_web",
   "Side": "enemy",
   "CD": 6.5,
   "Percent": 0.4,
   "Range": 430,
   "Radius": 100,
   "Color": "#c9b3ff",
   "CastTime": 0.5
  },
  {
   "ID": 113,
   "Name": "冰錐術",
   "Desc": "凝出貫穿性的冰錐，命中後碎裂並凍緩敵人。",
   "Kind": "iceshard",
   "Element": "ice",
   "Side": "player",
   "Icon": 10045,
   "CD": 5,
   "MPCost": 14,
   "Percent": 175,
   "Color": "#9fe8ff",
   "UnlockLevel": 3
  },
  {
   "ID": 114,
   "Name": "烈焰噴射",
   "Desc": "向前方噴出扇形火舌，點燃命中的敵人。",
   "Kind": "flame",
   "Element": "fire",
   "Side": "player",
   "Icon": 10015,
   "CD": 9,
   "MPCost": 22,
   "Percent": 150,
   "Color": "#ff8a3d",
   "UnlockLevel": 5
  },
  {
   "ID": 115,
   "Name": "風暴之眼",
   "Desc": "召喚持續旋轉的風暴，把敵人拉向中心並不斷切割。",
   "Kind": "storm",
   "Element": "wind",
   "Side": "player",
   "Icon": 10107,
   "CD": 12,
   "MPCost": 26,
   "Percent": 160,
   "Color": "#9ff3d6",
   "UnlockLevel": 7
  },
  {
   "ID": 116,
   "Name": "毒爆術",
   "Desc": "引爆劇毒囊胞，造成範圍傷害並留下毒沼。",
   "Kind": "poisonburst",
   "Element": "poison",
   "Side": "player",
   "Icon": 90015,
   "CD": 9,
   "MPCost": 20,
   "Percent": 165,
   "Color": "#a8d46a",
   "UnlockLevel": 4
  },
  {
   "ID": 117,
   "Name": "暗影新星",
   "Desc": "以自身為中心綻放暗影，吞噬周圍光線與生命力。",
   "Kind": "darknova",
   "Element": "dark",
   "Side": "player",
   "Icon": 90021,
   "CD": 11,
   "MPCost": 24,
   "Percent": 185,
   "Color": "#b78bff",
   "UnlockLevel": 6
  },
  {
   "ID": 118,
   "Name": "聖光十字",
   "Desc": "在目標處降下十字聖光，貫穿一直線上的所有敵人。",
   "Kind": "cross",
   "Element": "holy",
   "Side": "player",
   "Icon": 90012,
   "CD": 10,
   "MPCost": 24,
   "Percent": 195,
   "Color": "#ffe9a8",
   "UnlockLevel": 5
  },
  {
   "ID": 119,
   "Name": "雷神之怒",
   "Desc": "召來連續落雷，轟擊目標周圍的大範圍區域。",
   "Kind": "thunderstorm",
   "Element": "thunder",
   "Side": "player",
   "Icon": 10051,
   "CD": 14,
   "MPCost": 30,
   "Percent": 170,
   "Color": "#ffe066",
   "UnlockLevel": 8
  },
  {
   "ID": 120,
   "Name": "時空裂縫",
   "Desc": "撕開一道引力裂縫，把敵人吸向中心並持續撕扯。",
   "Kind": "rift",
   "Element": "arcane",
   "Side": "player",
   "Icon": 10139,
   "CD": 16,
   "MPCost": 32,
   "Percent": 140,
   "Color": "#b78bff",
   "UnlockLevel": 9
  },
  {
   "ID": 121,
   "Name": "流星雨",
   "Desc": "天空落下大量流星，覆蓋極大範圍。",
   "Kind": "meteorrain",
   "Element": "fire",
   "Side": "player",
   "Icon": 10015,
   "CD": 18,
   "MPCost": 36,
   "Percent": 180,
   "Color": "#ffb15c",
   "UnlockLevel": 10
  },
  {
   "ID": 122,
   "Name": "治癒之泉",
   "Desc": "在腳下湧出治癒泉水，持續回復生命。",
   "Kind": "healzone",
   "Element": "holy",
   "Side": "player",
   "Icon": 90003,
   "CD": 14,
   "MPCost": 24,
   "Percent": 12,
   "Color": "#8fffb0",
   "UnlockLevel": 6
  },
  {
   "ID": 123,
   "Name": "荊棘領域",
   "Desc": "讓地面長出荊棘，刺穿並緩速範圍內的敵人。",
   "Kind": "bramble",
   "Element": "nature",
   "Side": "player",
   "Icon": 90036,
   "CD": 12,
   "MPCost": 22,
   "Percent": 120,
   "Color": "#7bd88f",
   "UnlockLevel": 7
  },
  {
   "ID": 124,
   "Name": "元素稜鏡",
   "Desc": "分裂出多道元素稜光，追蹤並貫穿敵人。",
   "Kind": "prism",
   "Element": "arcane",
   "Side": "player",
   "Icon": 10049,
   "CD": 13,
   "MPCost": 28,
   "Percent": 175,
   "Color": "#ffd166",
   "UnlockLevel": 8
  },
  {
   "ID": 222,
   "Name": "火焰吐息",
   "Kind": "e_breath",
   "Side": "enemy",
   "CD": 5.2,
   "Percent": 0.85,
   "Range": 360,
   "Color": "#ff7b3d",
   "CastTime": 0.55,
   "Radius": 96,
   "Desc": "朝前方噴出扇形火焰"
  },
  {
   "ID": 223,
   "Name": "震地",
   "Kind": "e_quake",
   "Side": "enemy",
   "CD": 7,
   "Percent": 1,
   "Range": 260,
   "Color": "#e6c98a",
   "CastTime": 0.7,
   "Radius": 140,
   "Desc": "以自身為中心震出衝擊波"
  },
  {
   "ID": 224,
   "Name": "貫穿光束",
   "Kind": "e_laser",
   "Side": "enemy",
   "CD": 7.4,
   "Percent": 1.1,
   "Range": 660,
   "Color": "#9fe8ff",
   "CastTime": 0.8,
   "Width": 26,
   "Desc": "蓄力後射出直線光束"
  },
  {
   "ID": 225,
   "Name": "幽能球",
   "Kind": "e_orbit",
   "Side": "enemy",
   "CD": 6.6,
   "Percent": 0.6,
   "Range": 520,
   "Color": "#b78bff",
   "CastTime": 0.6,
   "Desc": "放出多顆慢速追蹤球"
  },
  {
   "ID": 226,
   "Name": "投擲爆彈",
   "Kind": "e_bomb",
   "Side": "enemy",
   "CD": 6,
   "Percent": 0.95,
   "Range": 480,
   "Color": "#ffb15c",
   "CastTime": 0.5,
   "Radius": 86,
   "Desc": "拋出延遲爆炸的爆彈"
  },
  {
   "ID": 227,
   "Name": "雷雨",
   "Kind": "e_storm",
   "Side": "enemy",
   "CD": 8.2,
   "Percent": 0.55,
   "Range": 520,
   "Color": "#ffe066",
   "CastTime": 0.75,
   "Radius": 58,
   "Desc": "在玩家周圍連續落雷"
  },
  {
   "ID": 125,
   "Name": "破空聖芒",
   "Kind": "beam",
   "Element": "holy",
   "Icon": 90012,
   "CD": 12,
   "MPCost": 28,
   "Percent": 220,
   "Color": "#ffe9a8",
   "UnlockLevel": 6,
   "Desc": "凝聚聖光射出貫穿直線，擊中所有敵人"
  },
  {
   "ID": 126,
   "Name": "霜華爆裂",
   "Kind": "frostburst",
   "Element": "ice",
   "Icon": 10045,
   "CD": 13,
   "MPCost": 28,
   "Percent": 170,
   "Color": "#9fe8ff",
   "UnlockLevel": 7,
   "Desc": "引爆霜華並在地面留下三片凍結領域"
  },
  {
   "ID": 127,
   "Name": "星界墜落",
   "Kind": "starfall",
   "Element": "arcane",
   "Icon": 10015,
   "CD": 16,
   "MPCost": 34,
   "Percent": 200,
   "Color": "#c9b3ff",
   "UnlockLevel": 9,
   "Desc": "打開星界之門，降下大量隕星"
  },
  {
   "ID": 128,
   "Name": "元素風暴",
   "Kind": "nova",
   "Element": "arcane",
   "Icon": 10049,
   "CD": 14,
   "MPCost": 30,
   "Percent": 150,
   "Color": "#ffd166",
   "UnlockLevel": 8,
   "Desc": "向四周釋放元素彈幕，越靠近傷害越高"
  },
  {
   "ID": 129,
   "Name": "裂地斬",
   "Kind": "earthslash",
   "Element": "earth",
   "Icon": 10028,
   "CD": 8,
   "MPCost": 20,
   "Percent": 200,
   "Color": "#e6c98a",
   "UnlockLevel": 3,
   "Desc": "朝面前揮出裂地劍氣，擊退並暈眩扇形範圍敵人"
  },
  {
   "ID": 130,
   "Name": "追魂箭雨",
   "Kind": "hunt",
   "Element": "wind",
   "Icon": 10107,
   "CD": 9,
   "MPCost": 22,
   "Percent": 150,
   "Color": "#9ff3d6",
   "UnlockLevel": 4,
   "Desc": "鎖定最多八名敵人，射出會追蹤的箭矢"
  },
  {
   "ID": 131,
   "Name": "聖域",
   "Kind": "sanctuary",
   "Element": "holy",
   "Icon": 90003,
   "CD": 14,
   "MPCost": 28,
   "Percent": 12,
   "Color": "#8fffb0",
   "UnlockLevel": 6,
   "Desc": "腳下展開聖域，持續治療自己並灼燒周圍敵人"
  },
  {
   "ID": 132,
   "Name": "天雷鎖",
   "Kind": "thunderchain",
   "Element": "thunder",
   "Icon": 10051,
   "CD": 11,
   "MPCost": 26,
   "Percent": 180,
   "Color": "#ffe066",
   "UnlockLevel": 5,
   "Desc": "雷電在敵群間連鎖七次，並麻痺命中的敵人"
  },
  {
   "ID": 133,
   "Name": "暗影分身",
   "Kind": "shadow",
   "Element": "dark",
   "Icon": 90021,
   "CD": 10,
   "MPCost": 24,
   "Percent": 120,
   "Color": "#b78bff",
   "UnlockLevel": 6,
   "Desc": "召喚六道暗影分身，從四周射出追蹤彈"
  },
  {
   "ID": 134,
   "Name": "炎龍破",
   "Kind": "phoenix",
   "Element": "fire",
   "Icon": 10001,
   "CD": 13,
   "MPCost": 30,
   "Percent": 260,
   "Color": "#ff8a3d",
   "UnlockLevel": 7,
   "Desc": "放出追蹤炎龍，命中後炸開大範圍火海"
  },
  {
   "ID": 135,
   "Name": "冰封絕境",
   "Kind": "icefield",
   "Element": "ice",
   "Icon": 10045,
   "CD": 15,
   "MPCost": 32,
   "Percent": 170,
   "Color": "#9fe8ff",
   "UnlockLevel": 8,
   "Desc": "凍結大範圍地面，造成傷害、緩速與暈眩"
  },
  {
   "ID": 136,
   "Name": "萬劍歸宗",
   "Kind": "swordrain",
   "Element": "holy",
   "Icon": 90012,
   "CD": 16,
   "MPCost": 34,
   "Percent": 150,
   "Color": "#ffe9a8",
   "UnlockLevel": 9,
   "Desc": "十二道聖劍從天而降，斬擊場上隨機敵人"
  },
  {
   "ID": 137,
   "Name": "劍刃風暴",
   "Kind": "bladecyclone",
   "Element": "wind",
   "Icon": 10028,
   "CD": 12,
   "MP": 26,
   "Percent": 190,
   "Color": "#ffe9a8",
   "UnlockLevel": 6,
   "Desc": "以自身為中心甩出十八道旋轉劍氣，近身與遠程同時覆蓋。",
   "IsLearnable": true
  },
  {
   "ID": 138,
   "Name": "黑洞引力",
   "Kind": "blackhole",
   "Element": "dark",
   "Icon": 90021,
   "CD": 18,
   "MP": 36,
   "Percent": 230,
   "Color": "#b78bff",
   "UnlockLevel": 10,
   "Desc": "在敵群中心撕開黑洞，持續拉扯、撕裂並緩速所有敵人。",
   "IsLearnable": true
  },
  {
   "ID": 139,
   "Name": "烈日審判",
   "Kind": "sunburst",
   "Element": "fire",
   "Icon": 10015,
   "CD": 17,
   "MP": 34,
   "Percent": 260,
   "Color": "#ff8a3d",
   "UnlockLevel": 9,
   "Desc": "引爆多層烈日火環，並在周圍落下灼燒地面的小太陽。",
   "IsLearnable": true
  },
  {
   "ID": 140,
   "Name": "龍焰吐息",
   "Kind": "dragonbreath",
   "Element": "fire",
   "Icon": 10001,
   "CD": 14,
   "MP": 30,
   "Percent": 240,
   "Color": "#ff5a2a",
   "UnlockLevel": 8,
   "Desc": "噴出超寬的龍焰錐形吐息，命中敵人並附加長時間燃燒。",
   "IsLearnable": true
  },
  {
   "ID": 141,
   "Name": "極光冰晶",
   "Kind": "aurora",
   "Element": "ice",
   "Icon": 10045,
   "CD": 15,
   "MP": 30,
   "Percent": 200,
   "Color": "#8fe8ff",
   "UnlockLevel": 8,
   "Desc": "沿著前方連續綻放三道極光冰環，凍結並暈眩整排敵人。",
   "IsLearnable": true
  },
  {
   "ID": 142,
   "Name": "雷神之怒",
   "Kind": "thor",
   "Element": "thunder",
   "Icon": 10051,
   "CD": 17,
   "MP": 34,
   "Percent": 190,
   "Color": "#ffe066",
   "UnlockLevel": 10,
   "Desc": "降下超長連鎖雷擊，跳躍十名敵人，最後留下雷暴區。",
   "IsLearnable": true
  },
  {
   "ID": 143,
   "Name": "血月斬",
   "Kind": "bloodmoon",
   "Element": "dark",
   "Icon": 90012,
   "CD": 13,
   "MP": 28,
   "Percent": 210,
   "Color": "#ff5a6e",
   "UnlockLevel": 7,
   "Desc": "以血月之力劃出三百六十度血刃，並將部分傷害轉為生命。",
   "IsLearnable": true
  },
  {
   "ID": 144,
   "Name": "星界裂隙",
   "Kind": "astralrift",
   "Element": "arcane",
   "Icon": 10139,
   "CD": 19,
   "MP": 38,
   "Percent": 250,
   "Color": "#c9b3ff",
   "UnlockLevel": 11,
   "Desc": "先塌縮再引爆的星界裂隙，把敵人吸向中心後一次炸開。",
   "IsLearnable": true
  }
 ],
 "Levels": [
  {
   "Name": "芙蕾雅島",
   "Region": "01_芙蕾雅島",
   "Desc": "冒險者的起點，草原與海岸交錯的和平島嶼。",
   "CoverIndex": 0,
   "Audio": 210,
   "Difficulty": 1,
   "Terrain": "island",
   "MapWidth": 46,
   "MapHeight": 46,
   "MonsterCount": 56,
   "MonsterIDs": [
    "m298",
    "m036",
    "m137",
    "m040",
    "m155",
    "m071",
    "m276",
    "m244",
    "m374",
    "m171",
    "m398",
    "m167",
    "m306",
    "m118",
    "m180",
    "m224",
    "m312",
    "m290",
    "m078",
    "m395",
    "m164",
    "m152",
    "m081",
    "m077",
    "m321",
    "m299",
    "m181",
    "m109",
    "m197",
    "m045",
    "m193",
    "m363",
    "m050",
    "m092",
    "m178",
    "m029",
    "m350",
    "m058",
    "m236",
    "m216",
    "m156",
    "m218",
    "m262",
    "m165",
    "m277",
    "m212",
    "m195",
    "m392",
    "m227",
    "m005",
    "m294",
    "m065",
    "m093",
    "m042",
    "m127",
    "m143"
   ],
   "BossNames": [
    "樹精"
   ],
   "BossTitle": "翠冠樹靈王",
   "BossSubtitle": "芙蕾雅的千年守護者",
   "BossLore": "芙蕾雅島最深處的古老樹靈，盤根錯節的軀幹裡藏著整座森林的記憶。",
   "BossColor": "#7bd88f",
   "ArenaColor": "#7bd88f",
   "BossAbilities": [
    "summon",
    "pool",
    "shockwave"
   ],
   "Gimmick": {
    "Kind": "tide",
    "Name": "潮汐湧動",
    "Desc": "海浪週期性沖刷戰場，留下會減速的水窪。",
    "Color": "#6fc3ff",
    "Interval": 22
   },
   "RoundInfos": [
    {
     "Level": 2,
     "Name": "先鋒",
     "EnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 4,
     "Name": "主力",
     "EnemyIDs": [
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 4,
     "Name": "伏擊",
     "EnemyIDs": [
      196,
      44,
      192,
      362,
      49,
      91,
      177,
      28,
      349,
      57,
      235,
      215
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 6,
     "Name": "精銳",
     "EnemyIDs": [
      261,
      164,
      276,
      211,
      194,
      391,
      226,
      4,
      293,
      64,
      92,
      41
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 6,
     "Name": "獸潮",
     "EnemyIDs": [
      196,
      44,
      192,
      362,
      49,
      91,
      177,
      28,
      349,
      57,
      235,
      215
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 6,
     "Name": "攻城",
     "EnemyIDs": [
      261,
      164,
      276,
      211,
      194,
      391,
      226,
      4,
      293,
      64,
      92,
      41
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 8,
     "Name": "增援部隊",
     "EnemyIDs": [
      261,
      164,
      276,
      211,
      194,
      391,
      226,
      4,
      293,
      64,
      92,
      41
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 8,
     "Name": "親衛",
     "EnemyIDs": [
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 10,
     "Name": "風暴",
     "EnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 10,
     "Name": "領域",
     "EnemyIDs": [
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      297,
      35,
      136,
      39,
      154,
      70,
      275,
      243,
      373,
      170,
      397,
      166,
      305,
      117,
      179,
      223,
      311,
      289,
      77,
      394,
      163,
      151,
      80,
      76,
      320,
      298,
      180,
      108,
      196,
      44
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 8,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 142,
       "NamePrefix": "芙蕾雅島霸主·",
       "Level": 7,
       "Name": "翠冠樹靈王",
       "Title": "芙蕾雅的千年守護者",
       "Mechanic": [
        "summon",
        "pool",
        "shockwave",
        "root"
       ],
       "Color": "#7bd88f",
       "Phase2At": 0.5,
       "Phase3At": 0.34,
       "HpMul": 1.06,
       "AtkMul": 1.03,
       "Allies": [
        261,
        164,
        276
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 23,
       "AlliesSpawnTimes": 9,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "潮汐湧動",
   "ModifierDesc": "海浪週期性沖刷戰場，留下會減速的水窪。",
   "ModifierColor": "#6fc3ff"
  },
  {
   "Name": "索奇亞島",
   "Region": "02_索奇亞島",
   "Desc": "黃沙滾滾的沙漠島，白天酷熱、夜裡寒風刺骨。",
   "CoverIndex": 1,
   "Audio": 210,
   "Difficulty": 2,
   "Terrain": "desert",
   "MapWidth": 47,
   "MapHeight": 47,
   "MonsterCount": 42,
   "MonsterIDs": [
    "m298",
    "m061",
    "m080",
    "m134",
    "m374",
    "m171",
    "m053",
    "m084",
    "m118",
    "m339",
    "m098",
    "m224",
    "m177",
    "m196",
    "m396",
    "m248",
    "m287",
    "m051",
    "m368",
    "m190",
    "m045",
    "m169",
    "m193",
    "m363",
    "m092",
    "m315",
    "m158",
    "m209",
    "m149",
    "m286",
    "m034",
    "m297",
    "m013",
    "m106",
    "m130",
    "m342",
    "m343",
    "m294",
    "m296",
    "m065",
    "m090",
    "m003"
   ],
   "BossNames": [
    "亞特拉斯巨神"
   ],
   "BossTitle": "黃沙暴君",
   "BossSubtitle": "索奇亞的流沙之主",
   "BossLore": "以整片沙漠為王座的巨人，每踏一步都讓綠洲退後一哩。",
   "BossColor": "#f0c15c",
   "ArenaColor": "#f0c15c",
   "BossAbilities": [
    "shockwave",
    "charge",
    "meteor"
   ],
   "Gimmick": {
    "Kind": "sand",
    "Name": "流沙風暴",
    "Desc": "沙暴降低移動速度，並捲起傷害沙塵。",
    "Color": "#f0c15c",
    "Interval": 21
   },
   "RoundInfos": [
    {
     "Level": 3,
     "Name": "先鋒",
     "EnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 5,
     "Name": "主力",
     "EnemyIDs": [
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 5,
     "Name": "伏擊",
     "EnemyIDs": [
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285,
      33,
      296
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 7,
     "Name": "精銳",
     "EnemyIDs": [
      12,
      105,
      129,
      341,
      342,
      293,
      295,
      64,
      89,
      2,
      148,
      91
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 7,
     "Name": "獸潮",
     "EnemyIDs": [
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285,
      33,
      296,
      338
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 7,
     "Name": "攻城",
     "EnemyIDs": [
      12,
      105,
      129,
      341,
      342,
      293,
      295,
      64,
      89,
      2,
      148,
      91
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 9,
     "Name": "增援部隊",
     "EnemyIDs": [
      12,
      105,
      129,
      341,
      342,
      293,
      295,
      64,
      89,
      2,
      148,
      91
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 9,
     "Name": "親衛",
     "EnemyIDs": [
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      12,
      105
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 11,
     "Name": "風暴",
     "EnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 11,
     "Name": "領域",
     "EnemyIDs": [
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      12,
      105
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      297,
      60,
      79,
      133,
      373,
      170,
      52,
      83,
      117,
      338,
      97,
      223,
      176,
      195,
      395,
      247,
      286,
      50,
      367,
      189,
      44,
      168,
      192,
      362,
      91,
      314,
      157,
      208,
      148,
      285
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 10,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 2,
       "NamePrefix": "索奇亞島霸主·",
       "Level": 8,
       "Name": "黃沙暴君",
       "Title": "索奇亞的流沙之主",
       "Mechanic": [
        "shockwave",
        "charge",
        "meteor",
        "quake"
       ],
       "Color": "#f0c15c",
       "Phase2At": 0.45,
       "Phase3At": 0.33,
       "HpMul": 1.12,
       "AtkMul": 1.06,
       "Allies": [
        12,
        105,
        129
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 22,
       "AlliesSpawnTimes": 10,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "流沙風暴",
   "ModifierDesc": "沙暴降低移動速度，並捲起傷害沙塵。",
   "ModifierColor": "#f0c15c"
  },
  {
   "Name": "莎蓮娜島",
   "Region": "03_莎蓮娜島",
   "Desc": "終年濃霧的樹海，古木與藤蔓遮住了陽光。",
   "CoverIndex": 2,
   "Audio": 210,
   "Difficulty": 3,
   "Terrain": "deepforest",
   "MapWidth": 48,
   "MapHeight": 48,
   "MonsterCount": 76,
   "MonsterIDs": [
    "m187",
    "m272",
    "m298",
    "m137",
    "m079",
    "m155",
    "m199",
    "m367",
    "m188",
    "m007",
    "m282",
    "m041",
    "m134",
    "m276",
    "m154",
    "m171",
    "m053",
    "m228",
    "m046",
    "m119",
    "m305",
    "m290",
    "m196",
    "m365",
    "m078",
    "m164",
    "m152",
    "m368",
    "m299",
    "m361",
    "m069",
    "m266",
    "m206",
    "m004",
    "m109",
    "m150",
    "m028",
    "m049",
    "m050",
    "m092",
    "m063",
    "m217",
    "m204",
    "m158",
    "m320",
    "m009",
    "m107",
    "m201",
    "m402",
    "m048",
    "m262",
    "m126",
    "m316",
    "m212",
    "m153",
    "m022",
    "m117",
    "m019",
    "m097",
    "m214",
    "m106",
    "m130",
    "m342",
    "m295",
    "m343",
    "m275",
    "m014",
    "m294",
    "m296",
    "m056",
    "m065",
    "m093",
    "m121",
    "m151",
    "m060",
    "m076"
   ],
   "BossNames": [
    "寒冰翼龍"
   ],
   "BossTitle": "霧海冰翼",
   "BossSubtitle": "莎蓮娜的凍霧化身",
   "BossLore": "在樹海濃霧中盤旋的冰龍，吐息能讓千年古木瞬間結霜。",
   "BossColor": "#8fd8ff",
   "ArenaColor": "#8fd8ff",
   "BossAbilities": [
    "nova",
    "volley",
    "pool"
   ],
   "Gimmick": {
    "Kind": "spore",
    "Name": "孢子瘴氣",
    "Desc": "毒孢子在戰場上擴散，持續侵蝕生命。",
    "Color": "#a8d46a",
    "Interval": 20
   },
   "RoundInfos": [
    {
     "Level": 4,
     "Name": "先鋒",
     "EnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 6,
     "Name": "主力",
     "EnemyIDs": [
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360,
      68
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 6,
     "Name": "伏擊",
     "EnemyIDs": [
      49,
      91,
      62,
      216,
      203,
      157,
      319,
      8,
      106,
      200,
      401,
      47
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 8,
     "Name": "精銳",
     "EnemyIDs": [
      18,
      96,
      213,
      105,
      129,
      341,
      294,
      342,
      274,
      13,
      293,
      295
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 8,
     "Name": "獸潮",
     "EnemyIDs": [
      49,
      91,
      62,
      216,
      203,
      157,
      319,
      8,
      106,
      200,
      401,
      47
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 8,
     "Name": "攻城",
     "EnemyIDs": [
      18,
      96,
      213,
      105,
      129,
      341,
      294,
      342,
      274,
      13,
      293,
      295
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 10,
     "Name": "增援部隊",
     "EnemyIDs": [
      18,
      96,
      213,
      105,
      129,
      341,
      294,
      342,
      274,
      13,
      293,
      295
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 10,
     "Name": "親衛",
     "EnemyIDs": [
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360,
      68
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 12,
     "Name": "風暴",
     "EnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 12,
     "Name": "領域",
     "EnemyIDs": [
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360,
      68
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      297,
      136,
      78,
      154,
      198,
      366,
      187,
      6,
      281,
      40,
      133,
      275,
      153,
      170,
      52,
      227,
      45,
      118,
      304,
      289,
      195,
      364,
      77,
      163,
      151,
      367,
      298,
      360
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 12,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 75,
       "NamePrefix": "莎蓮娜島霸主·",
       "Level": 9,
       "Name": "霧海冰翼",
       "Title": "莎蓮娜的凍霧化身",
       "Mechanic": [
        "nova",
        "volley",
        "pool",
        "frost"
       ],
       "Color": "#8fd8ff",
       "Phase2At": 0.5,
       "Phase3At": 0.32,
       "HpMul": 1.18,
       "AtkMul": 1.09,
       "Allies": [
        18,
        96,
        213
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 21,
       "AlliesSpawnTimes": 11,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "孢子瘴氣",
   "ModifierDesc": "毒孢子在戰場上擴散，持續侵蝕生命。",
   "ModifierColor": "#a8d46a"
  },
  {
   "Name": "米內葛爾島",
   "Region": "04_米內葛爾島",
   "Desc": "潮濕溫暖的密林，蟲鳴與獸吼從不間斷。",
   "CoverIndex": 3,
   "Audio": 210,
   "Difficulty": 4,
   "Terrain": "forest",
   "MapWidth": 49,
   "MapHeight": 49,
   "MonsterCount": 40,
   "MonsterIDs": [
    "m272",
    "m241",
    "m131",
    "m166",
    "m116",
    "m071",
    "m282",
    "m374",
    "m091",
    "m398",
    "m084",
    "m306",
    "m191",
    "m098",
    "m086",
    "m290",
    "m359",
    "m150",
    "m253",
    "m366",
    "m401",
    "m055",
    "m176",
    "m260",
    "m326",
    "m217",
    "m320",
    "m156",
    "m218",
    "m262",
    "m286",
    "m212",
    "m392",
    "m030",
    "m157",
    "m214",
    "m173",
    "m143",
    "m151",
    "m187"
   ],
   "BossNames": [
    "死亡樹精"
   ],
   "BossTitle": "腐敗之母",
   "BossSubtitle": "米內葛爾的瘴癘之源",
   "BossLore": "被瘴氣侵蝕的母樹，根鬚所到之處只剩腐葉與毒沼。",
   "BossColor": "#a8d46a",
   "ArenaColor": "#a8d46a",
   "BossAbilities": [
    "pool",
    "summon",
    "volley"
   ],
   "Gimmick": {
    "Kind": "vine",
    "Name": "藤蔓纏繞",
    "Desc": "古木藤蔓從地面竄出，纏住並減速敵人。",
    "Color": "#7bd88f",
    "Interval": 20
   },
   "RoundInfos": [
    {
     "Level": 5,
     "Name": "先鋒",
     "EnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 7,
     "Name": "主力",
     "EnemyIDs": [
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 7,
     "Name": "伏擊",
     "EnemyIDs": [
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 9,
     "Name": "精銳",
     "EnemyIDs": [
      285,
      211,
      391,
      29,
      156,
      213,
      172,
      142,
      150,
      261,
      149,
      400
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 9,
     "Name": "獸潮",
     "EnemyIDs": [
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261,
      130,
      240
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 9,
     "Name": "攻城",
     "EnemyIDs": [
      285,
      211,
      391,
      29,
      156,
      213,
      172,
      142,
      150,
      261,
      149,
      400
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 11,
     "Name": "增援部隊",
     "EnemyIDs": [
      285,
      211,
      391,
      29,
      156,
      213,
      172,
      142,
      150,
      261,
      149,
      400
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 11,
     "Name": "親衛",
     "EnemyIDs": [
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      285,
      211
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 13,
     "Name": "風暴",
     "EnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 13,
     "Name": "領域",
     "EnemyIDs": [
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      285,
      211
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      130,
      165,
      115,
      70,
      281,
      373,
      90,
      397,
      83,
      305,
      190,
      97,
      85,
      289,
      358,
      149,
      252,
      365,
      400,
      54,
      175,
      259,
      325,
      216,
      319,
      155,
      217,
      261
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 14,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 150,
       "NamePrefix": "米內葛爾島霸主·",
       "Level": 10,
       "Name": "腐敗之母",
       "Title": "米內葛爾的瘴癘之源",
       "Mechanic": [
        "pool",
        "summon",
        "volley",
        "rain"
       ],
       "Color": "#a8d46a",
       "Phase2At": 0.5,
       "Phase3At": 0.32,
       "HpMul": 1.24,
       "AtkMul": 1.12,
       "Allies": [
        285,
        211,
        391
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 20,
       "AlliesSpawnTimes": 12,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "藤蔓纏繞",
   "ModifierDesc": "古木藤蔓從地面竄出，纏住並減速敵人。",
   "ModifierColor": "#7bd88f"
  },
  {
   "Name": "庫魯克斯島",
   "Region": "05_庫魯克斯島",
   "Desc": "長年積雪的北方群島，冰層下埋著古老遺跡。",
   "CoverIndex": 4,
   "Audio": 210,
   "Difficulty": 5,
   "Terrain": "snow",
   "MapWidth": 50,
   "MapHeight": 50,
   "MonsterCount": 50,
   "MonsterIDs": [
    "m272",
    "m241",
    "m137",
    "m188",
    "m168",
    "m244",
    "m189",
    "m035",
    "m237",
    "m346",
    "m167",
    "m339",
    "m046",
    "m365",
    "m110",
    "m183",
    "m234",
    "m081",
    "m291",
    "m324",
    "m361",
    "m087",
    "m111",
    "m205",
    "m206",
    "m242",
    "m049",
    "m050",
    "m372",
    "m062",
    "m336",
    "m063",
    "m029",
    "m304",
    "m204",
    "m315",
    "m236",
    "m278",
    "m048",
    "m262",
    "m072",
    "m165",
    "m192",
    "m297",
    "m212",
    "m337",
    "m203",
    "m179",
    "m173",
    "m129"
   ],
   "BossNames": [
    "斬首者"
   ],
   "BossTitle": "雪原劊子手",
   "BossSubtitle": "庫魯克斯的無情裁決",
   "BossLore": "傳說中處決犯人的亡靈，巨刃落下時連風都會被斬成兩半。",
   "BossColor": "#c9e6ff",
   "ArenaColor": "#c9e6ff",
   "BossAbilities": [
    "charge",
    "volley",
    "shockwave"
   ],
   "Gimmick": {
    "Kind": "blizzard",
    "Name": "凍原暴雪",
    "Desc": "暴雪與冰雹覆蓋全場，緩速並造成傷害。",
    "Color": "#a6ecff",
    "Interval": 19
   },
   "RoundInfos": [
    {
     "Level": 6,
     "Name": "先鋒",
     "EnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 8,
     "Name": "主力",
     "EnemyIDs": [
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 8,
     "Name": "伏擊",
     "EnemyIDs": [
      241,
      48,
      49,
      371,
      61,
      335,
      62,
      28,
      303,
      203,
      314,
      235
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 10,
     "Name": "精銳",
     "EnemyIDs": [
      47,
      261,
      71,
      164,
      191,
      296,
      211,
      336,
      202,
      178,
      172,
      128
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 10,
     "Name": "獸潮",
     "EnemyIDs": [
      241,
      48,
      49,
      371,
      61,
      335,
      62,
      28,
      303,
      203,
      314,
      235
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 10,
     "Name": "攻城",
     "EnemyIDs": [
      47,
      261,
      71,
      164,
      191,
      296,
      211,
      336,
      202,
      178,
      172,
      128
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 12,
     "Name": "增援部隊",
     "EnemyIDs": [
      47,
      261,
      71,
      164,
      191,
      296,
      211,
      336,
      202,
      178,
      172,
      128
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 12,
     "Name": "親衛",
     "EnemyIDs": [
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 14,
     "Name": "風暴",
     "EnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 14,
     "Name": "領域",
     "EnemyIDs": [
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      240,
      136,
      187,
      167,
      243,
      188,
      34,
      236,
      345,
      166,
      338,
      45,
      364,
      109,
      182,
      233,
      80,
      290,
      323,
      360,
      86,
      110,
      204,
      205,
      241,
      48,
      49,
      371,
      61
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 16,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 128,
       "NamePrefix": "庫魯克斯島霸主·",
       "Level": 11,
       "Name": "雪原劊子手",
       "Title": "庫魯克斯的無情裁決",
       "Mechanic": [
        "charge",
        "volley",
        "shockwave",
        "frost"
       ],
       "Color": "#c9e6ff",
       "Phase2At": 0.4,
       "Phase3At": 0.31,
       "HpMul": 1.3,
       "AtkMul": 1.15,
       "Allies": [
        47,
        261,
        71
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 19,
       "AlliesSpawnTimes": 13,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "凍原暴雪",
   "ModifierDesc": "暴雪與冰雹覆蓋全場，緩速並造成傷害。",
   "ModifierColor": "#a6ecff"
  },
  {
   "Name": "德威特島",
   "Region": "06_德威特島",
   "Desc": "幅員最廣的大陸，什麼樣的魔物都能遇見。",
   "CoverIndex": 5,
   "Audio": 210,
   "Difficulty": 6,
   "Terrain": "forest",
   "MapWidth": 51,
   "MapHeight": 51,
   "MonsterCount": 122,
   "MonsterIDs": [
    "m137",
    "m083",
    "m345",
    "m387",
    "m040",
    "m210",
    "m308",
    "m155",
    "m185",
    "m233",
    "m249",
    "m255",
    "m285",
    "m059",
    "m061",
    "m080",
    "m043",
    "m067",
    "m128",
    "m222",
    "m052",
    "m134",
    "m146",
    "m258",
    "m244",
    "m154",
    "m371",
    "m145",
    "m247",
    "m375",
    "m378",
    "m220",
    "m356",
    "m084",
    "m322",
    "m346",
    "m108",
    "m259",
    "m113",
    "m115",
    "m006",
    "m290",
    "m078",
    "m110",
    "m396",
    "m152",
    "m248",
    "m082",
    "m368",
    "m190",
    "m324",
    "m181",
    "m359",
    "m370",
    "m206",
    "m109",
    "m120",
    "m257",
    "m274",
    "m348",
    "m369",
    "m256",
    "m390",
    "m045",
    "m169",
    "m193",
    "m050",
    "m176",
    "m261",
    "m400",
    "m063",
    "m311",
    "m217",
    "m047",
    "m315",
    "m158",
    "m009",
    "m278",
    "m218",
    "m209",
    "m262",
    "m286",
    "m165",
    "m246",
    "m017",
    "m044",
    "m105",
    "m195",
    "m301",
    "m136",
    "m235",
    "m335",
    "m331",
    "m027",
    "m138",
    "m250",
    "m263",
    "m393",
    "m203",
    "m231",
    "m351",
    "m030",
    "m157",
    "m019",
    "m221",
    "m037",
    "m245",
    "m329",
    "m334",
    "m382",
    "m383",
    "m093",
    "m135",
    "m018",
    "m121",
    "m143",
    "m151",
    "m397",
    "m015",
    "m200",
    "m273",
    "m272"
   ],
   "BossNames": [
    "烈風翼龍"
   ],
   "BossTitle": "暴風之王",
   "BossSubtitle": "德威特的天空霸主",
   "BossLore": "駕馭整片大陸氣流的翼龍，振翅便能掀起撕裂帆船的颶風。",
   "BossColor": "#9fe6c8",
   "ArenaColor": "#9fe6c8",
   "BossAbilities": [
    "shockwave",
    "volley",
    "charge"
   ],
   "Gimmick": {
    "Kind": "wind",
    "Name": "大陸疾風",
    "Desc": "強風推擠走位，並捲起銳利風刃。",
    "Color": "#9fe6c8",
    "Interval": 18
   },
   "RoundInfos": [
    {
     "Level": 7,
     "Name": "先鋒",
     "EnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 9,
     "Name": "主力",
     "EnemyIDs": [
      219,
      355,
      83,
      321,
      345,
      107,
      258,
      112,
      114,
      5,
      289,
      77
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 9,
     "Name": "伏擊",
     "EnemyIDs": [
      255,
      389,
      44,
      168,
      192,
      49,
      175,
      260,
      399,
      62,
      310,
      216
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 11,
     "Name": "精銳",
     "EnemyIDs": [
      334,
      330,
      26,
      137,
      249,
      262,
      392,
      202,
      230,
      350,
      29,
      156
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 11,
     "Name": "獸潮",
     "EnemyIDs": [
      255,
      389,
      44,
      168,
      192,
      49,
      175,
      260,
      399,
      62,
      310,
      216
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 11,
     "Name": "攻城",
     "EnemyIDs": [
      334,
      330,
      26,
      137,
      249,
      262,
      392,
      202,
      230,
      350,
      29,
      156
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 13,
     "Name": "增援部隊",
     "EnemyIDs": [
      334,
      330,
      26,
      137,
      249,
      262,
      392,
      202,
      230,
      350,
      29,
      156
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 13,
     "Name": "親衛",
     "EnemyIDs": [
      219,
      355,
      83,
      321,
      345,
      107,
      258,
      112,
      114,
      5,
      289,
      77
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 15,
     "Name": "風暴",
     "EnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 15,
     "Name": "領域",
     "EnemyIDs": [
      219,
      355,
      83,
      321,
      345,
      107,
      258,
      112,
      114,
      5,
      289,
      77
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66,
      127,
      221,
      51,
      133,
      145,
      257,
      243,
      153,
      370,
      144,
      246,
      374
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 18,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 199,
       "NamePrefix": "德威特島霸主·",
       "Level": 12,
       "Name": "暴風之王",
       "Title": "德威特的天空霸主",
       "Mechanic": [
        "shockwave",
        "volley",
        "charge",
        "spiral"
       ],
       "Color": "#9fe6c8",
       "Phase2At": 0.5,
       "Phase3At": 0.3,
       "HpMul": 1.36,
       "AtkMul": 1.18,
       "Allies": [
        334,
        330,
        26
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 18,
       "AlliesSpawnTimes": 14,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "大陸疾風",
   "ModifierDesc": "強風推擠走位，並捲起銳利風刃。",
   "ModifierColor": "#9fe6c8"
  },
  {
   "Name": "傑諾姆島",
   "Region": "07_傑諾姆島",
   "Desc": "矮人開鑿的地下坑道，終日不見天日。",
   "CoverIndex": 6,
   "Audio": 210,
   "Difficulty": 7,
   "Terrain": "cave",
   "MapWidth": 52,
   "MapHeight": 52,
   "MonsterCount": 24,
   "MonsterIDs": [
    "m071",
    "m164",
    "m396",
    "m287",
    "m299",
    "m065",
    "m137",
    "m083",
    "m345",
    "m387",
    "m040",
    "m210",
    "m308",
    "m155",
    "m185",
    "m233",
    "m249",
    "m255",
    "m285",
    "m059",
    "m061",
    "m080",
    "m043",
    "m067"
   ],
   "BossNames": [
    "血骷髏"
   ],
   "BossTitle": "坑道亡靈王",
   "BossSubtitle": "傑諾姆的無光之王",
   "BossLore": "矮人坑道最深處的骸骨之王，率領著永遠不會安息的礦工。",
   "BossColor": "#c98bff",
   "ArenaColor": "#c98bff",
   "BossAbilities": [
    "summon",
    "volley",
    "pool"
   ],
   "Gimmick": {
    "Kind": "rockfall",
    "Name": "坑道落石",
    "Desc": "坑道頂部崩落，落石在場上砸出危險區。",
    "Color": "#c9b3ff",
    "Interval": 17
   },
   "RoundInfos": [
    {
     "Level": 8,
     "Name": "先鋒",
     "EnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 10,
     "Name": "主力",
     "EnemyIDs": [
      395,
      70,
      163,
      286,
      298,
      64,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 10,
     "Name": "伏擊",
     "EnemyIDs": [
      286,
      298,
      70,
      163,
      395,
      64,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 12,
     "Name": "精銳",
     "EnemyIDs": [
      64,
      70,
      163,
      286,
      395,
      298,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 12,
     "Name": "獸潮",
     "EnemyIDs": [
      286,
      298,
      70,
      163,
      395,
      64,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 12,
     "Name": "攻城",
     "EnemyIDs": [
      64,
      70,
      163,
      286,
      395,
      298,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 14,
     "Name": "增援部隊",
     "EnemyIDs": [
      64,
      70,
      163,
      286,
      395,
      298,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 14,
     "Name": "親衛",
     "EnemyIDs": [
      395,
      64,
      70,
      163,
      286,
      298,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 16,
     "Name": "風暴",
     "EnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 16,
     "Name": "領域",
     "EnemyIDs": [
      395,
      64,
      70,
      163,
      286,
      298,
      136,
      82,
      344
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      70,
      163,
      395,
      286,
      298,
      64,
      136,
      82,
      344,
      386,
      39,
      209,
      307,
      154,
      184,
      232,
      248,
      254,
      284,
      58,
      60,
      79,
      42,
      66
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 20,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 298,
       "NamePrefix": "傑諾姆島霸主·",
       "Level": 13,
       "Name": "坑道亡靈王",
       "Title": "傑諾姆的無光之王",
       "Mechanic": [
        "summon",
        "volley",
        "pool",
        "quake"
       ],
       "Color": "#c98bff",
       "Phase2At": 0.45,
       "Phase3At": 0.29,
       "HpMul": 1.42,
       "AtkMul": 1.21,
       "Allies": [
        64
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 17,
       "AlliesSpawnTimes": 15,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "坑道落石",
   "ModifierDesc": "坑道頂部崩落，落石在場上砸出危險區。",
   "ModifierColor": "#c9b3ff"
  },
  {
   "Name": "弗利德島",
   "Region": "08_弗利德島",
   "Desc": "岩漿奔流的火山島，空氣裡滿是硫磺味。",
   "CoverIndex": 7,
   "Audio": 210,
   "Difficulty": 8,
   "Terrain": "volcano",
   "MapWidth": 53,
   "MapHeight": 53,
   "MonsterCount": 24,
   "MonsterIDs": [
    "m198",
    "m159",
    "m298",
    "m070",
    "m154",
    "m346",
    "m290",
    "m395",
    "m164",
    "m368",
    "m123",
    "m092",
    "m176",
    "m297",
    "m013",
    "m275",
    "m014",
    "m093",
    "m121",
    "m042",
    "m151",
    "m003",
    "m071",
    "m396"
   ],
   "BossNames": [
    "亞特拉斯巨神"
   ],
   "BossTitle": "熔岩泰坦",
   "BossSubtitle": "弗利德的熾熱心臟",
   "BossLore": "沉睡在火山口下的泰坦，岩漿順著祂的裂痕流淌成河。",
   "BossColor": "#ff8a5c",
   "ArenaColor": "#ff8a5c",
   "BossAbilities": [
    "meteor",
    "shockwave",
    "pool"
   ],
   "Gimmick": {
    "Kind": "lava",
    "Name": "岩漿噴發",
    "Desc": "火山裂縫噴出岩漿，留下灼熱地面。",
    "Color": "#ff8a5c",
    "Interval": 16
   },
   "RoundInfos": [
    {
     "Level": 9,
     "Name": "先鋒",
     "EnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 11,
     "Name": "主力",
     "EnemyIDs": [
      289,
      394,
      163,
      367,
      122,
      197,
      158,
      297,
      69,
      153
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 11,
     "Name": "伏擊",
     "EnemyIDs": [
      91,
      175,
      296,
      12,
      274,
      13,
      197,
      158,
      297,
      69
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 13,
     "Name": "精銳",
     "EnemyIDs": [
      92,
      120,
      41,
      150,
      2,
      163,
      175,
      297,
      345,
      197
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 3,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 13,
     "Name": "獸潮",
     "EnemyIDs": [
      91,
      175,
      296,
      12,
      274,
      13,
      197,
      158,
      297,
      69
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 13,
     "Name": "攻城",
     "EnemyIDs": [
      92,
      120,
      41,
      150,
      2,
      163,
      175,
      297,
      345,
      197
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 15,
     "Name": "增援部隊",
     "EnemyIDs": [
      92,
      120,
      41,
      150,
      2,
      163,
      175,
      297,
      345,
      197,
      91,
      296
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 15,
     "Name": "親衛",
     "EnemyIDs": [
      289,
      394,
      163,
      367,
      122,
      92,
      120,
      41,
      150,
      2
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 4,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 17,
     "Name": "風暴",
     "EnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 17,
     "Name": "領域",
     "EnemyIDs": [
      289,
      394,
      163,
      367,
      122,
      92,
      120,
      41,
      150,
      2,
      175,
      297
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      297,
      69,
      153,
      345,
      289,
      394,
      163,
      367,
      122,
      91,
      175,
      296,
      12,
      274,
      13,
      92,
      120,
      41,
      150,
      2,
      70,
      395
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 22,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 2,
       "NamePrefix": "弗利德島霸主·",
       "Level": 14,
       "Name": "熔岩泰坦",
       "Title": "弗利德的熾熱心臟",
       "Mechanic": [
        "meteor",
        "shockwave",
        "pool",
        "rain"
       ],
       "Color": "#ff8a5c",
       "Phase2At": 0.45,
       "Phase3At": 0.28,
       "HpMul": 1.48,
       "AtkMul": 1.24,
       "Allies": [
        92,
        120,
        41
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 16,
       "AlliesSpawnTimes": 16,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "岩漿噴發",
   "ModifierDesc": "火山裂縫噴出岩漿，留下灼熱地面。",
   "ModifierColor": "#ff8a5c"
  },
  {
   "Name": "樂園之卵",
   "Region": "09_樂園之卵",
   "Desc": "傳說中的樂園入口，景色如夢似幻。",
   "CoverIndex": 8,
   "Audio": 210,
   "Difficulty": 9,
   "Terrain": "island",
   "MapWidth": 54,
   "MapHeight": 54,
   "MonsterCount": 73,
   "MonsterIDs": [
    "m075",
    "m099",
    "m144",
    "m347",
    "m241",
    "m215",
    "m089",
    "m243",
    "m292",
    "m341",
    "m079",
    "m083",
    "m345",
    "m387",
    "m057",
    "m039",
    "m122",
    "m184",
    "m279",
    "m080",
    "m134",
    "m020",
    "m160",
    "m194",
    "m327",
    "m346",
    "m225",
    "m001",
    "m088",
    "m172",
    "m344",
    "m291",
    "m208",
    "m111",
    "m348",
    "m363",
    "m092",
    "m360",
    "m063",
    "m047",
    "m023",
    "m025",
    "m058",
    "m278",
    "m317",
    "m318",
    "m064",
    "m267",
    "m136",
    "m240",
    "m337",
    "m125",
    "m264",
    "m309",
    "m381",
    "m384",
    "m179",
    "m333",
    "m340",
    "m042",
    "m223",
    "m230",
    "m284",
    "m319",
    "m095",
    "m112",
    "m251",
    "m380",
    "m358",
    "m133",
    "m399",
    "m405",
    "m198"
   ],
   "BossNames": [
    "黃金龍骨"
   ],
   "BossTitle": "黃金守門人",
   "BossSubtitle": "樂園之卵的永恆門衛",
   "BossLore": "以黃金骸骨守護樂園入口的巨龍，眼神裡映著不屬於人間的光。",
   "BossColor": "#ffd76a",
   "ArenaColor": "#ffd76a",
   "BossAbilities": [
    "laser",
    "summon",
    "nova"
   ],
   "Gimmick": {
    "Kind": "arcane",
    "Name": "樂園幻光",
    "Desc": "幻光在場上炸裂成環形彈幕。",
    "Color": "#ffd76a",
    "Interval": 16
   },
   "RoundInfos": [
    {
     "Level": 10,
     "Name": "先鋒",
     "EnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 12,
     "Name": "主力",
     "EnemyIDs": [
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 12,
     "Name": "伏擊",
     "EnemyIDs": [
      91,
      359,
      62,
      46,
      22,
      24,
      57,
      277,
      316,
      317,
      63,
      266
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 14,
     "Name": "精銳",
     "EnemyIDs": [
      380,
      383,
      178,
      332,
      339,
      41,
      222,
      229,
      283,
      318,
      94,
      111
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 14,
     "Name": "獸潮",
     "EnemyIDs": [
      91,
      359,
      62,
      46,
      22,
      24,
      57,
      277,
      316,
      317,
      63,
      266
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 14,
     "Name": "攻城",
     "EnemyIDs": [
      380,
      383,
      178,
      332,
      339,
      41,
      222,
      229,
      283,
      318,
      94,
      111
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 16,
     "Name": "增援部隊",
     "EnemyIDs": [
      380,
      383,
      178,
      332,
      339,
      41,
      222,
      229,
      283,
      318,
      94,
      111
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 16,
     "Name": "親衛",
     "EnemyIDs": [
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 18,
     "Name": "風暴",
     "EnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 18,
     "Name": "領域",
     "EnemyIDs": [
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      74,
      98,
      143,
      346,
      240,
      214,
      88,
      242,
      291,
      340,
      78,
      82,
      344,
      386,
      56,
      38,
      121,
      183,
      278,
      79,
      133,
      19,
      159,
      193,
      326,
      345,
      224,
      0,
      87,
      171
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 24,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 398,
       "NamePrefix": "樂園之卵霸主·",
       "Level": 15,
       "Name": "黃金守門人",
       "Title": "樂園之卵的永恆門衛",
       "Mechanic": [
        "laser",
        "summon",
        "nova",
        "beam"
       ],
       "Color": "#ffd76a",
       "Phase2At": 0.5,
       "Phase3At": 0.28,
       "HpMul": 1.54,
       "AtkMul": 1.27,
       "Allies": [
        380,
        383,
        178
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 15,
       "AlliesSpawnTimes": 17,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "樂園幻光",
   "ModifierDesc": "幻光在場上炸裂成環形彈幕。",
   "ModifierColor": "#ffd76a"
  },
  {
   "Name": "辛梅爾",
   "Region": "10_辛梅爾",
   "Desc": "亡者聚集的冥界邊境，濃霧中滿是低語。",
   "CoverIndex": 9,
   "Audio": 210,
   "Difficulty": 10,
   "Terrain": "graveyard",
   "MapWidth": 55,
   "MapHeight": 55,
   "MonsterCount": 46,
   "MonsterIDs": [
    "m068",
    "m163",
    "m159",
    "m207",
    "m307",
    "m308",
    "m007",
    "m100",
    "m323",
    "m024",
    "m261",
    "m165",
    "m316",
    "m239",
    "m010",
    "m182",
    "m124",
    "m385",
    "m106",
    "m202",
    "m130",
    "m342",
    "m295",
    "m343",
    "m066",
    "m085",
    "m213",
    "m042",
    "m090",
    "m003",
    "m174",
    "m054",
    "m293",
    "m325",
    "m132",
    "m338",
    "m389",
    "m015",
    "m129",
    "m148",
    "m103",
    "m211",
    "m303",
    "m016",
    "m008",
    "m075"
   ],
   "BossNames": [
    "冥界死神"
   ],
   "BossTitle": "冥界引路人",
   "BossSubtitle": "辛梅爾的黃泉擺渡",
   "BossLore": "手持引魂燈的使者，燈火熄滅時，生者的名字便會被劃去。",
   "BossColor": "#b6a4ff",
   "ArenaColor": "#b6a4ff",
   "BossAbilities": [
    "pool",
    "summon",
    "shockwave"
   ],
   "Gimmick": {
    "Kind": "soul",
    "Name": "亡魂低語",
    "Desc": "亡魂從四周追擊生者，緩慢但難纏。",
    "Color": "#b6a4ff",
    "Interval": 15
   },
   "RoundInfos": [
    {
     "Level": 11,
     "Name": "先鋒",
     "EnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 13,
     "Name": "主力",
     "EnemyIDs": [
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 13,
     "Name": "伏擊",
     "EnemyIDs": [
      342,
      65,
      84,
      212,
      41,
      89,
      2,
      173,
      53,
      292,
      324
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 15,
     "Name": "精銳",
     "EnemyIDs": [
      131,
      337,
      388,
      14,
      128,
      147,
      102,
      210,
      302,
      15,
      7,
      315
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 15,
     "Name": "獸潮",
     "EnemyIDs": [
      342,
      65,
      84,
      212,
      41,
      89,
      2,
      173,
      53,
      292,
      324,
      9
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 15,
     "Name": "攻城",
     "EnemyIDs": [
      131,
      337,
      388,
      14,
      128,
      147,
      102,
      210,
      302,
      15,
      7,
      315
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 17,
     "Name": "增援部隊",
     "EnemyIDs": [
      131,
      337,
      388,
      14,
      128,
      147,
      102,
      210,
      302,
      15,
      7,
      315
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 17,
     "Name": "親衛",
     "EnemyIDs": [
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      131
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 19,
     "Name": "風暴",
     "EnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 19,
     "Name": "領域",
     "EnemyIDs": [
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      131
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      67,
      162,
      158,
      206,
      306,
      307,
      6,
      99,
      322,
      23,
      260,
      164,
      315,
      238,
      9,
      181,
      123,
      384,
      105,
      201,
      129,
      341,
      294,
      342,
      65,
      84,
      212,
      41,
      89,
      2
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 26,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 15,
       "NamePrefix": "辛梅爾霸主·",
       "Level": 16,
       "Name": "冥界引路人",
       "Title": "辛梅爾的黃泉擺渡",
       "Mechanic": [
        "pool",
        "summon",
        "shockwave",
        "root"
       ],
       "Color": "#b6a4ff",
       "Phase2At": 0.45,
       "Phase3At": 0.27,
       "HpMul": 1.6,
       "AtkMul": 1.3,
       "Allies": [
        131,
        337,
        388
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 14,
       "AlliesSpawnTimes": 18,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "亡魂低語",
   "ModifierDesc": "亡魂從四周追擊生者，緩慢但難纏。",
   "ModifierColor": "#b6a4ff"
  },
  {
   "Name": "諾斯菲拉特",
   "Region": "11_諾斯菲拉特",
   "Desc": "冰雪與黑暗籠罩的荒原，鮮少有人活著離開。",
   "CoverIndex": 10,
   "Audio": 210,
   "Difficulty": 11,
   "Terrain": "cave2",
   "MapWidth": 56,
   "MapHeight": 56,
   "MonsterCount": 46,
   "MonsterIDs": [
    "m198",
    "m159",
    "m166",
    "m199",
    "m367",
    "m282",
    "m041",
    "m244",
    "m374",
    "m024",
    "m098",
    "m152",
    "m051",
    "m069",
    "m208",
    "m359",
    "m206",
    "m004",
    "m229",
    "m150",
    "m369",
    "m169",
    "m055",
    "m217",
    "m029",
    "m204",
    "m209",
    "m048",
    "m212",
    "m153",
    "m141",
    "m203",
    "m226",
    "m031",
    "m032",
    "m097",
    "m101",
    "m102",
    "m096",
    "m295",
    "m332",
    "m174",
    "m060",
    "m076",
    "m016",
    "m068"
   ],
   "BossNames": [
    "寒冰翼龍"
   ],
   "BossTitle": "永凍之翼",
   "BossSubtitle": "諾斯菲拉特的冰封君王",
   "BossLore": "連時間都被凍結的荒原上，祂的每一次吐息都留下新的冰川。",
   "BossColor": "#a6ecff",
   "ArenaColor": "#a6ecff",
   "BossAbilities": [
    "nova",
    "meteor",
    "volley"
   ],
   "Gimmick": {
    "Kind": "ice",
    "Name": "永凍寒潮",
    "Desc": "寒潮凍結地面，冰雹不斷落下。",
    "Color": "#8fd8ff",
    "Interval": 14
   },
   "RoundInfos": [
    {
     "Level": 12,
     "Name": "先鋒",
     "EnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 14,
     "Name": "主力",
     "EnemyIDs": [
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 14,
     "Name": "伏擊",
     "EnemyIDs": [
      216,
      28,
      203,
      208,
      47,
      211,
      152,
      140,
      202,
      225,
      30
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 16,
     "Name": "精銳",
     "EnemyIDs": [
      31,
      96,
      100,
      101,
      95,
      294,
      331,
      173,
      59,
      75,
      15,
      198
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 16,
     "Name": "獸潮",
     "EnemyIDs": [
      216,
      28,
      203,
      208,
      47,
      211,
      152,
      140,
      202,
      225,
      30,
      197
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 16,
     "Name": "攻城",
     "EnemyIDs": [
      31,
      96,
      100,
      101,
      95,
      294,
      331,
      173,
      59,
      75,
      15,
      198
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 18,
     "Name": "增援部隊",
     "EnemyIDs": [
      31,
      96,
      100,
      101,
      95,
      294,
      331,
      173,
      59,
      75,
      15,
      198
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 18,
     "Name": "親衛",
     "EnemyIDs": [
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      31
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 20,
     "Name": "風暴",
     "EnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 20,
     "Name": "領域",
     "EnemyIDs": [
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      31
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      197,
      158,
      165,
      198,
      366,
      281,
      40,
      243,
      373,
      23,
      97,
      151,
      50,
      68,
      207,
      358,
      205,
      3,
      228,
      149,
      368,
      168,
      54,
      216,
      28,
      203,
      208,
      47,
      211,
      152
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 28,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 75,
       "NamePrefix": "諾斯菲拉特霸主·",
       "Level": 17,
       "Name": "永凍之翼",
       "Title": "諾斯菲拉特的冰封君王",
       "Mechanic": [
        "nova",
        "meteor",
        "volley",
        "frost"
       ],
       "Color": "#a6ecff",
       "Phase2At": 0.5,
       "Phase3At": 0.26,
       "HpMul": 1.66,
       "AtkMul": 1.33,
       "Allies": [
        31,
        96,
        100
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 13,
       "AlliesSpawnTimes": 19,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "永凍寒潮",
   "ModifierDesc": "寒潮凍結地面，冰雹不斷落下。",
   "ModifierColor": "#8fd8ff"
  },
  {
   "Name": "哈那可半島",
   "Region": "12_哈那可半島",
   "Desc": "海風強勁的半島，斷崖與沙灘一路延伸。",
   "CoverIndex": 11,
   "Audio": 210,
   "Difficulty": 12,
   "Terrain": "coast",
   "MapWidth": 57,
   "MapHeight": 57,
   "MonsterCount": 38,
   "MonsterIDs": [
    "m036",
    "m079",
    "m314",
    "m357",
    "m376",
    "m191",
    "m339",
    "m046",
    "m225",
    "m248",
    "m361",
    "m370",
    "m363",
    "m092",
    "m280",
    "m254",
    "m178",
    "m158",
    "m023",
    "m025",
    "m278",
    "m156",
    "m072",
    "m126",
    "m246",
    "m195",
    "m302",
    "m136",
    "m235",
    "m175",
    "m038",
    "m300",
    "m295",
    "m179",
    "m093",
    "m173",
    "m362",
    "m198"
   ],
   "BossNames": [
    "風獸"
   ],
   "BossTitle": "狂風領主",
   "BossSubtitle": "哈那可的斷崖之聲",
   "BossLore": "從斷崖呼嘯而過的海風化身，沒有人見過牠停下腳步。",
   "BossColor": "#9ff3d6",
   "ArenaColor": "#9ff3d6",
   "BossAbilities": [
    "charge",
    "shockwave",
    "volley"
   ],
   "Gimmick": {
    "Kind": "current",
    "Name": "斷崖海流",
    "Desc": "強勁海流推擠走位，並留下水窪。",
    "Color": "#9ff3d6",
    "Interval": 13
   },
   "RoundInfos": [
    {
     "Level": 13,
     "Name": "先鋒",
     "EnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 15,
     "Name": "主力",
     "EnemyIDs": [
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      35,
      78,
      313
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 15,
     "Name": "伏擊",
     "EnemyIDs": [
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      35,
      78,
      313
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 17,
     "Name": "精銳",
     "EnemyIDs": [
      234,
      174,
      37,
      299,
      294,
      178,
      92,
      172,
      361,
      253,
      91,
      362
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 17,
     "Name": "獸潮",
     "EnemyIDs": [
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      91,
      35,
      78
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 17,
     "Name": "攻城",
     "EnemyIDs": [
      234,
      174,
      37,
      299,
      294,
      178,
      92,
      172,
      361,
      253,
      91,
      362
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 19,
     "Name": "增援部隊",
     "EnemyIDs": [
      234,
      174,
      37,
      299,
      294,
      178,
      92,
      172,
      361,
      253,
      91,
      362
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 19,
     "Name": "親衛",
     "EnemyIDs": [
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      234,
      174,
      37
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 21,
     "Name": "風暴",
     "EnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 21,
     "Name": "領域",
     "EnemyIDs": [
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      234,
      174,
      37
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247,
      360,
      369,
      362,
      91,
      279,
      253,
      177,
      157,
      22,
      24,
      277,
      155,
      71,
      125,
      245,
      194,
      301,
      135,
      234,
      174
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 30,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 361,
       "NamePrefix": "哈那可半島霸主·",
       "Level": 18,
       "Name": "狂風領主",
       "Title": "哈那可的斷崖之聲",
       "Mechanic": [
        "charge",
        "shockwave",
        "volley",
        "spiral"
       ],
       "Color": "#9ff3d6",
       "Phase2At": 0.4,
       "Phase3At": 0.25,
       "HpMul": 1.72,
       "AtkMul": 1.36,
       "Allies": [
        234,
        174,
        37
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 12,
       "AlliesSpawnTimes": 20,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "斷崖海流",
   "ModifierDesc": "強勁海流推擠走位，並留下水窪。",
   "ModifierColor": "#9ff3d6"
  },
  {
   "Name": "逆星",
   "Region": "13_逆星",
   "Desc": "星辰逆轉之地，魔力異常濃稠。",
   "CoverIndex": 12,
   "Audio": 210,
   "Difficulty": 13,
   "Terrain": "cave",
   "MapWidth": 58,
   "MapHeight": 58,
   "MonsterCount": 24,
   "MonsterIDs": [
    "m187",
    "m272",
    "m241",
    "m159",
    "m266",
    "m359",
    "m317",
    "m218",
    "m107",
    "m386",
    "m149",
    "m246",
    "m101",
    "m102",
    "m036",
    "m079",
    "m314",
    "m357",
    "m376",
    "m191",
    "m339",
    "m046",
    "m225",
    "m248"
   ],
   "BossNames": [
    "布拉茲"
   ],
   "BossTitle": "逆星魔導",
   "BossSubtitle": "逆星的星軌操縱者",
   "BossLore": "讓星辰倒流的魔導師，在逆轉的星軌間尋找永恆的答案。",
   "BossColor": "#ff9bd2",
   "ArenaColor": "#ff9bd2",
   "BossAbilities": [
    "teleport",
    "nova",
    "laser"
   ],
   "Gimmick": {
    "Kind": "beam",
    "Name": "逆星射線",
    "Desc": "逆轉的星軌化為掃射光束。",
    "Color": "#ff9bd2",
    "Interval": 12
   },
   "RoundInfos": [
    {
     "Level": 14,
     "Name": "先鋒",
     "EnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 16,
     "Name": "主力",
     "EnemyIDs": [
      265,
      358,
      316,
      186,
      271,
      240,
      158,
      217,
      106,
      385,
      148,
      245
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 16,
     "Name": "伏擊",
     "EnemyIDs": [
      217,
      106,
      385,
      148,
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      245
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 18,
     "Name": "精銳",
     "EnemyIDs": [
      245,
      100,
      101,
      106,
      240,
      385,
      358,
      265,
      186,
      271,
      158,
      316
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 18,
     "Name": "獸潮",
     "EnemyIDs": [
      217,
      106,
      385,
      148,
      100,
      186,
      271,
      240,
      158,
      265,
      358,
      316
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 18,
     "Name": "攻城",
     "EnemyIDs": [
      245,
      100,
      101,
      106,
      240,
      385,
      358,
      265,
      186,
      271,
      158,
      316
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 20,
     "Name": "增援部隊",
     "EnemyIDs": [
      245,
      100,
      101,
      106,
      240,
      385,
      358,
      265,
      217,
      148,
      186,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 20,
     "Name": "親衛",
     "EnemyIDs": [
      265,
      358,
      316,
      245,
      100,
      101,
      186,
      271,
      240,
      158,
      217,
      106
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 22,
     "Name": "風暴",
     "EnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 22,
     "Name": "領域",
     "EnemyIDs": [
      265,
      358,
      316,
      245,
      100,
      101,
      106,
      240,
      385,
      186,
      271,
      158
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      186,
      271,
      240,
      158,
      265,
      358,
      316,
      217,
      106,
      385,
      148,
      245,
      100,
      101,
      35,
      78,
      313,
      356,
      375,
      190,
      338,
      45,
      224,
      247
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 32,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 100,
       "NamePrefix": "逆星霸主·",
       "Level": 19,
       "Name": "逆星魔導",
       "Title": "逆星的星軌操縱者",
       "Mechanic": [
        "teleport",
        "nova",
        "laser",
        "beam"
       ],
       "Color": "#ff9bd2",
       "Phase2At": 0.45,
       "Phase3At": 0.24,
       "HpMul": 1.78,
       "AtkMul": 1.39,
       "Allies": [
        245,
        100,
        101
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 11,
       "AlliesSpawnTimes": 21,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "逆星射線",
   "ModifierDesc": "逆轉的星軌化為掃射光束。",
   "ModifierColor": "#ff9bd2"
  },
  {
   "Name": "日耀之域",
   "Region": "14_日耀之域",
   "Desc": "烈日灼燒的赤色大地，沙塵終年不散。",
   "CoverIndex": 13,
   "Audio": 210,
   "Difficulty": 14,
   "Terrain": "desert",
   "MapWidth": 59,
   "MapHeight": 59,
   "MonsterCount": 29,
   "MonsterIDs": [
    "m272",
    "m137",
    "m011",
    "m059",
    "m061",
    "m007",
    "m071",
    "m374",
    "m371",
    "m322",
    "m108",
    "m139",
    "m012",
    "m363",
    "m360",
    "m063",
    "m278",
    "m218",
    "m283",
    "m203",
    "m031",
    "m033",
    "m101",
    "m102",
    "m096",
    "m151",
    "m003",
    "m200",
    "m187"
   ],
   "BossNames": [
    "烈風翼龍"
   ],
   "BossTitle": "日耀炎翼",
   "BossSubtitle": "日耀之域的灼熱雙翼",
   "BossLore": "被烈日灼練成赤金色的翼龍，雙翼展開時天空也為之燃燒。",
   "BossColor": "#ffb15c",
   "ArenaColor": "#ffb15c",
   "BossAbilities": [
    "meteor",
    "laser",
    "shockwave"
   ],
   "Gimmick": {
    "Kind": "sun",
    "Name": "烈日灼燒",
    "Desc": "烈日降下火雨，灼燒整片赤色大地。",
    "Color": "#ffb15c",
    "Interval": 12
   },
   "RoundInfos": [
    {
     "Level": 15,
     "Name": "先鋒",
     "EnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 17,
     "Name": "主力",
     "EnemyIDs": [
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      271,
      136,
      10,
      58,
      60,
      6
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 17,
     "Name": "伏擊",
     "EnemyIDs": [
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      271,
      136,
      10,
      58,
      60,
      6
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 19,
     "Name": "精銳",
     "EnemyIDs": [
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      373,
      282,
      277,
      138,
      370,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 19,
     "Name": "獸潮",
     "EnemyIDs": [
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      6,
      107,
      70,
      271,
      136,
      10
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 19,
     "Name": "攻城",
     "EnemyIDs": [
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      373,
      282,
      277,
      138,
      370,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 21,
     "Name": "增援部隊",
     "EnemyIDs": [
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      373,
      282,
      277,
      138,
      370,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 21,
     "Name": "親衛",
     "EnemyIDs": [
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      32,
      100,
      101,
      95,
      150,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 23,
     "Name": "風暴",
     "EnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 23,
     "Name": "領域",
     "EnemyIDs": [
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      32,
      100,
      101,
      95,
      150,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      136,
      10,
      58,
      60,
      6,
      70,
      373,
      370,
      321,
      107,
      138,
      11,
      362,
      359,
      62,
      277,
      217,
      282,
      202,
      30,
      32,
      100,
      101,
      95,
      150,
      2,
      199,
      186
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 34,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 199,
       "NamePrefix": "日耀之域霸主·",
       "Level": 20,
       "Name": "日耀炎翼",
       "Title": "日耀之域的灼熱雙翼",
       "Mechanic": [
        "meteor",
        "laser",
        "shockwave",
        "rain"
       ],
       "Color": "#ffb15c",
       "Phase2At": 0.4,
       "Phase3At": 0.24,
       "HpMul": 1.84,
       "AtkMul": 1.42,
       "Allies": [
        32,
        100,
        101
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 10,
       "AlliesSpawnTimes": 22,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "烈日灼燒",
   "ModifierDesc": "烈日降下火雨，灼燒整片赤色大地。",
   "ModifierColor": "#ffb15c"
  },
  {
   "Name": "水曜之域",
   "Region": "15_水曜之域",
   "Desc": "沉入海底的古老國度，魚群在廢墟間游動。",
   "CoverIndex": 14,
   "Audio": 210,
   "Difficulty": 15,
   "Terrain": "underwater",
   "MapWidth": 60,
   "MapHeight": 60,
   "MonsterCount": 75,
   "MonsterIDs": [
    "m272",
    "m026",
    "m074",
    "m161",
    "m039",
    "m070",
    "m147",
    "m142",
    "m354",
    "m374",
    "m252",
    "m394",
    "m162",
    "m377",
    "m379",
    "m220",
    "m186",
    "m219",
    "m268",
    "m108",
    "m259",
    "m270",
    "m281",
    "m355",
    "m373",
    "m114",
    "m170",
    "m271",
    "m388",
    "m289",
    "m098",
    "m395",
    "m164",
    "m152",
    "m287",
    "m291",
    "m051",
    "m181",
    "m004",
    "m169",
    "m092",
    "m140",
    "m269",
    "m328",
    "m352",
    "m400",
    "m391",
    "m350",
    "m232",
    "m107",
    "m313",
    "m353",
    "m265",
    "m235",
    "m175",
    "m403",
    "m238",
    "m002",
    "m364",
    "m404",
    "m203",
    "m231",
    "m310",
    "m349",
    "m288",
    "m101",
    "m300",
    "m094",
    "m093",
    "m021",
    "m330",
    "m173",
    "m042",
    "m073",
    "m104"
   ],
   "BossNames": [
    "常娥",
    "姮娥"
   ],
   "BossTitle": "月海雙姬",
   "BossSubtitle": "水曜之域的潮汐主宰",
   "BossLore": "沉沒國度的兩位月之巫女，一人引潮、一人守月，讓整片海底隨她們的心跳呼吸。",
   "BossColor": "#9fd8ff",
   "ArenaColor": "#9fd8ff",
   "BossAbilities": [
    "heal",
    "nova",
    "pool"
   ],
   "Gimmick": {
    "Kind": "moon",
    "Name": "月海潮汐",
    "Desc": "月光治癒魔物，同時掀起潮汐傷害。",
    "Color": "#9fd8ff",
    "Interval": 11
   },
   "RoundInfos": [
    {
     "Level": 16,
     "Name": "先鋒",
     "EnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 7,
     "Duration": 50,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 0,
     "Event": "怪物死掉就會立刻遞補，撐住這段時間。",
     "Mode": "normal"
    },
    {
     "Level": 18,
     "Name": "主力",
     "EnemyIDs": [
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288,
      97,
      271
     ],
     "SpawnCountPerEnemy": 2,
     "ReinforceCount": 9,
     "Duration": 48,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 0,
     "Event": "敵方主力部隊推進，擊殺後仍會持續補位。",
     "Mode": "normal"
    },
    {
     "Level": 18,
     "Name": "伏擊",
     "EnemyIDs": [
      3,
      168,
      91,
      139,
      268,
      327,
      351,
      399,
      390,
      349,
      231,
      106,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 1,
     "Event": "草叢與岩石後傳來騷動——怪物從四周包圍過來！",
     "Mode": "ambush"
    },
    {
     "Level": 20,
     "Name": "精銳",
     "EnemyIDs": [
      1,
      363,
      403,
      202,
      230,
      309,
      348,
      287,
      100,
      299,
      93,
      92,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 12,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 4,
     "Event": "精英怪混入敵陣，身上帶著強化詞綴！",
     "Mode": "elite"
    },
    {
     "Level": 20,
     "Name": "獸潮",
     "EnemyIDs": [
      3,
      168,
      91,
      139,
      268,
      327,
      351,
      399,
      390,
      349,
      231,
      106,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 16,
     "Duration": 45,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 1,
     "Event": "獸潮一波接一波，幾乎沒有喘息的空檔。",
     "Mode": "pack"
    },
    {
     "Level": 20,
     "Name": "攻城",
     "EnemyIDs": [
      1,
      363,
      403,
      202,
      230,
      309,
      348,
      287,
      100,
      299,
      93,
      92,
      271
     ],
     "SpawnCountPerEnemy": 3,
     "ReinforceCount": 14,
     "Duration": 44,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 2,
     "Event": "敵軍從地圖外圍推進，城牆邊不斷湧入增援！",
     "Mode": "siege"
    },
    {
     "Level": 22,
     "Name": "增援部隊",
     "EnemyIDs": [
      1,
      363,
      403,
      202,
      230,
      309,
      348,
      287,
      100,
      299,
      93,
      92,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 18,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 2,
     "Event": "敵方增援部隊抵達，場上怪物會不斷補充！",
     "Mode": "pack"
    },
    {
     "Level": 22,
     "Name": "親衛",
     "EnemyIDs": [
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288,
      97,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 5,
     "Event": "霸主親衛隊壓境，精英群帶著詞綴一同衝鋒！",
     "Mode": "elite"
    },
    {
     "Level": 24,
     "Name": "風暴",
     "EnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 15,
     "Duration": 42,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 2,
     "Event": "天空烏雲密布，落雷會劈碎聚集的敵群！",
     "Mode": "storm"
    },
    {
     "Level": 24,
     "Name": "領域",
     "EnemyIDs": [
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288,
      97,
      271
     ],
     "SpawnCountPerEnemy": 4,
     "ReinforceCount": 16,
     "Duration": 40,
     "ExtraDisturbEnemyIDs": [
      271,
      25,
      73,
      160,
      38,
      69,
      146,
      141,
      353,
      373,
      251,
      393,
      161,
      376,
      378,
      219,
      185,
      218,
      267,
      107,
      258,
      269,
      280,
      354,
      372,
      113,
      169,
      270,
      387,
      288
     ],
     "EliteCount": 2,
     "Event": "這片土地的意志開始反噬——環境現象變得狂暴！",
     "Mode": "hazard"
    },
    {
     "Level": 36,
     "Name": "霸主",
     "Duration": -1,
     "EnemyIDs": [],
     "SpawnCountPerEnemy": 0,
     "EliteCount": 0,
     "Event": "霸主降臨，擊敗牠就能通過此地！",
     "BossInfos": [
      {
       "EnemyID": 103,
       "NamePrefix": "水曜之域霸主·",
       "Level": 21,
       "Name": "月海雙姬",
       "Title": "水曜之域的潮汐主宰",
       "Mechanic": [
        "heal",
        "nova",
        "pool",
        "frost"
       ],
       "Color": "#9fd8ff",
       "Phase2At": 0.5,
       "Phase3At": 0.23,
       "HpMul": 1.9,
       "AtkMul": 1.45,
       "Allies": [
        1,
        363,
        403
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 9,
       "AlliesSpawnTimes": 23,
       "Skills": []
      },
      {
       "EnemyID": 72,
       "NamePrefix": "水曜之域霸主·",
       "Level": 21,
       "Name": "月海雙姬·副",
       "Title": "水曜之域的潮汐主宰",
       "Mechanic": [
        "heal",
        "nova",
        "pool",
        "frost"
       ],
       "Color": "#9fd8ff",
       "Phase2At": 0.5,
       "Phase3At": 0.23,
       "HpMul": 1.9,
       "AtkMul": 1.45,
       "Allies": [
        1,
        363,
        403
       ],
       "SpawnPerAlly": 2,
       "AlliesSpawnInterval": 9,
       "AlliesSpawnTimes": 23,
       "Skills": []
      }
     ],
     "Mode": "boss"
    }
   ],
   "WaveCount": 11,
   "Modifier": "月海潮汐",
   "ModifierDesc": "月光治癒魔物，同時掀起潮汐傷害。",
   "ModifierColor": "#9fd8ff"
  }
 ]
};
