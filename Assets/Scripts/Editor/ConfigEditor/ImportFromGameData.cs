using System;
using System.Collections.Generic;
using System.IO;
using Crossgate.Data;
using GameData;
using UnityEditor;
using UnityEngine;

namespace Crossgate.Editor
{
    public class ImportFromGameData : EditorWindow
    {
        private string _savePath = "Assets/Data/Database/GameDatabase.asset";

        [MenuItem("Tools/Crossgate Survivors/從 GameData 匯入到 ScriptableObject")]
        public static void ShowWindow()
        {
            GetWindow<ImportFromGameData>("匯入 GameData").Show();
        }

        private void OnGUI()
        {
            GUILayout.Label("從現有 GameData 靜態資料匯入", EditorStyles.boldLabel);
            GUILayout.Space(5);
            EditorGUILayout.HelpBox("將會讀取 Assets/Scripts/GameData/*.cs 中的靜態清單，產生 GameDatabase.asset 並保留原始資料。", MessageType.Info);
            GUILayout.Space(10);
            _savePath = EditorGUILayout.TextField("儲存路徑", _savePath);
            GUILayout.Space(10);
            if (GUILayout.Button("匯入並儲存", GUILayout.Height(30)))
            {
                Import();
            }
        }

        private void Import()
        {
            GameDatabase db = CreateInstance<GameDatabase>();
            ImportPlayers(db);
            ImportEnemies(db);
            ImportSkills(db);
            ImportLevels(db);
            ImportGrows(db);

            string dir = Path.GetDirectoryName(_savePath);
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);

            AssetDatabase.CreateAsset(db, _savePath);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            EditorUtility.FocusProjectWindow();
            Selection.activeObject = db;
            Debug.Log("[Crossgate] 匯入完成: " + _savePath);
        }

        private void ImportGrows(GameDatabase db)
        {
            db.PlayerGrow = new GrowData
            {
                HP = PlayerSetting.PlayerGrow.HP,
                MP = PlayerSetting.PlayerGrow.MP,
                ATK = PlayerSetting.PlayerGrow.ATK,
                DEF = PlayerSetting.PlayerGrow.DEF,
                SPD = PlayerSetting.PlayerGrow.SPD
            };
            db.EnemyGrow = new GrowData
            {
                HP = EnemySetting.EnemyGrow.HP,
                MP = EnemySetting.EnemyGrow.MP,
                ATK = EnemySetting.EnemyGrow.ATK,
                DEF = EnemySetting.EnemyGrow.DEF,
                SPD = EnemySetting.EnemyGrow.SPD
            };
        }

        private void ImportPlayers(GameDatabase db)
        {
            db.Players.Clear();
            for (int i = 0; i < PlayerSetting.PlayerInfos.Count; i++)
            {
                var p = PlayerSetting.PlayerInfos[i];
                db.Players.Add(new PlayerData
                {
                    Index = i,
                    Serial = p.Serial,
                    WeaponSerial = p.WeaponSerial,
                    Name = p.Name,
                    Desc = p.Desc,
                    SkillDesc = p.Skill,
                    ATKSkill = p.ATKSkill,
                    SpecialSkill = p.SpecialSkill,
                    ATK = p.ATK,
                    HP = p.HP,
                    MP = p.MP,
                    DEF = p.DEF,
                    SPD = p.SPD
                });
            }
        }

        private void ImportEnemies(GameDatabase db)
        {
            db.Enemies.Clear();
            for (int i = 0; i < EnemySetting.EnemyInfos.Count; i++)
            {
                var e = EnemySetting.EnemyInfos[i];
                EnemyData ed = new EnemyData
                {
                    ID = e.ID,
                    Serial = e.Serial,
                    Name = e.Name,
                    Desc = e.Desc,
                    ATK = e.ATK,
                    DEF = e.DEF,
                    SPD = e.SPD,
                    HP = e.HP,
                    MP = e.MP,
                    Skills = new List<EnemySkillEntry>()
                };
                if (e.Skills != null)
                {
                    for (int s = 0; s < e.Skills.Count; s++)
                    {
                        var arr = e.Skills[s];
                        if (arr == null || arr.Length < 2) continue;
                        ed.Skills.Add(new EnemySkillEntry { SkillID = arr[0], Level = arr[1] });
                    }
                }
                db.Enemies.Add(ed);
            }
        }

        private void ImportSkills(GameDatabase db)
        {
            db.Skills.Clear();
            for (int i = 0; i < SkillSetting.SkillInfos.Count; i++)
            {
                var si = SkillSetting.SkillInfos[i];
                SkillData sd = new SkillData
                {
                    ID = si.ID,
                    Name = si.Name,
                    Desc = si.Desc,
                    Icon = si.Icon,
                    IsSpecial = si.IsSpecial,
                    IsLearnable = si.IsLearnable,
                    IsAutoSkill = si.IsAutoSkill,
                    CD = si.CD,
                    CDReduceRatePerLevel = si.CDReduceRatePerLevel,
                    AbilityDescTpl = si.AbilityDescTpl,
                    AbilityLevelUpDescTpl = si.AbilityLevelUpDescTpl,
                    MaxLevel = si.MaxLevel,
                    BelongSkillID = si.BelongSkillID,
                    MPCost = si.MPCost,
                    MPCostPerLevel = si.MPCostPerLevel,
                    Params = new List<SkillParams>()
                };
                if (si.Params != null)
                {
                    foreach (var kv in si.Params)
                    {
                        string type = "float";
                        if (kv.Value is int) type = "int";
                        else if (kv.Value is string) type = "string";
                        sd.Params.Add(new SkillParams { Key = kv.Key, Value = kv.Value.ToString(), Type = type });
                    }
                }
                db.Skills.Add(sd);
            }
        }

        private void ImportLevels(GameDatabase db)
        {
            db.Levels.Clear();
            for (int i = 0; i < LevelSetting.LevelInfos.Count; i++)
            {
                var li = LevelSetting.LevelInfos[i];
                LevelData ld = new LevelData
                {
                    Name = li.Name,
                    CoverIndex = li.CoverIndex,
                    Audio = li.Audio,
                    MapWidth = li.MapWidth,
                    MapHeight = li.MapHeight,
                    PaletIndex = li.PaletIndex,
                    Difficulty = li.Difficulty,
                    GroundSerials = li.GroundSerials != null ? new List<uint>(li.GroundSerials) : new List<uint>(),
                    DecorationsSerials = li.DecorationsSerials != null ? new List<uint>(li.DecorationsSerials) : new List<uint>(),
                    UnitSerials = li.UnitSerials != null ? new List<uint>(li.UnitSerials) : new List<uint>(),
                    BorderSerial = li.BorderSerial,
                    RoundInfos = new List<RoundData>(),
                    NPCInfos = new List<NPCData>()
                };
                if (li.RoundInfos != null)
                {
                    for (int r = 0; r < li.RoundInfos.Count; r++)
                    {
                        var ri = li.RoundInfos[r];
                        RoundData rd = new RoundData
                        {
                            Level = ri.Level,
                            EnemyIDs = ri.EnemyIDs,
                            SpawnCountPerEnemy = ri.SpawnCountPerEnemy,
                            Duration = ri.Duration,
                            ExtraDisturbEnemyIDs = ri.ExtraDisturbEnemyIDs,
                            BossInfos = new List<BossData>()
                        };
                        if (ri.BossInfos != null)
                        {
                            for (int b = 0; b < ri.BossInfos.Count; b++)
                            {
                                var bi = ri.BossInfos[b];
                                BossData bd = new BossData
                                {
                                    EnemyID = bi.EnemyID,
                                    NamePrefix = bi.NamePrefix,
                                    Level = bi.Level,
                                    Allies = bi.Allies,
                                    SpawnPerAlly = bi.SpawnPerAlly,
                                    AlliesSpawnInterval = bi.AlliesSpawnInterval,
                                    AlliesSpawnTimes = bi.AlliesSpawnTimes,
                                    Skills = new List<EnemySkillEntry>()
                                };
                                if (bi.Skills != null)
                                {
                                    for (int s = 0; s < bi.Skills.Count; s++)
                                    {
                                        var arr = bi.Skills[s];
                                        if (arr == null || arr.Length < 2) continue;
                                        bd.Skills.Add(new EnemySkillEntry { SkillID = arr[0], Level = arr[1] });
                                    }
                                }
                                rd.BossInfos.Add(bd);
                            }
                        }
                        ld.RoundInfos.Add(rd);
                    }
                }
                if (li.NPCInfos != null)
                {
                    for (int n = 0; n < li.NPCInfos.Count; n++)
                    {
                        var ni = li.NPCInfos[n];
                        ld.NPCInfos.Add(new NPCData { Type = (int)ni.Type, Serial = ni.Serial });
                    }
                }
                db.Levels.Add(ld);
            }
        }
    }
}
