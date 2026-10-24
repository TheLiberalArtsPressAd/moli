using System;
using System.Collections.Generic;
using Crossgate.Data;
using GameData;

namespace Crossgate.Data.Runtime
{
    public static class DataAdapter
    {
        public static PlayerSetting.PlayerInfo ToPlayerInfo(PlayerData pd)
        {
            if (pd == null) return null;
            return new PlayerSetting.PlayerInfo
            {
                Serial = pd.Serial,
                WeaponSerial = pd.WeaponSerial,
                Name = pd.Name,
                Desc = pd.Desc,
                Skill = pd.SkillDesc,
                ATKSkill = pd.ATKSkill,
                SpecialSkill = pd.SpecialSkill,
                ATK = pd.ATK,
                HP = pd.HP,
                MP = pd.MP,
                DEF = pd.DEF,
                SPD = pd.SPD
            };
        }

        public static List<PlayerSetting.PlayerInfo> ToPlayerInfoList(List<PlayerData> list)
        {
            List<PlayerSetting.PlayerInfo> result = new List<PlayerSetting.PlayerInfo>();
            if (list == null) return result;
            for (int i = 0; i < list.Count; i++) result.Add(ToPlayerInfo(list[i]));
            return result;
        }

        public static EnemySetting.EnemyInfo ToEnemyInfo(EnemyData ed)
        {
            if (ed == null) return null;
            EnemySetting.EnemyInfo ei = new EnemySetting.EnemyInfo
            {
                ID = ed.ID,
                Serial = ed.Serial,
                Name = ed.Name,
                Desc = ed.Desc,
                ATK = ed.ATK,
                DEF = ed.DEF,
                SPD = ed.SPD,
                HP = ed.HP,
                MP = ed.MP,
                Skills = new List<int[]>()
            };
            if (ed.Skills != null)
            {
                for (int i = 0; i < ed.Skills.Count; i++)
                {
                    var s = ed.Skills[i];
                    ei.Skills.Add(new int[] { s.SkillID, s.Level });
                }
            }
            return ei;
        }

        public static List<EnemySetting.EnemyInfo> ToEnemyInfoList(List<EnemyData> list)
        {
            List<EnemySetting.EnemyInfo> result = new List<EnemySetting.EnemyInfo>();
            if (list == null) return result;
            for (int i = 0; i < list.Count; i++) result.Add(ToEnemyInfo(list[i]));
            return result;
        }

        public static SkillSetting.SkillInfo ToSkillInfo(SkillData sd)
        {
            if (sd == null) return null;
            SkillSetting.SkillInfo si = new SkillSetting.SkillInfo
            {
                ID = sd.ID,
                Name = sd.Name,
                Desc = sd.Desc,
                Icon = sd.Icon,
                IsSpecial = sd.IsSpecial,
                IsLearnable = sd.IsLearnable,
                IsAutoSkill = sd.IsAutoSkill,
                CD = sd.CD,
                CDReduceRatePerLevel = sd.CDReduceRatePerLevel,
                AbilityDescTpl = sd.AbilityDescTpl,
                AbilityLevelUpDescTpl = sd.AbilityLevelUpDescTpl,
                MaxLevel = sd.MaxLevel,
                BelongSkillID = sd.BelongSkillID,
                MPCost = sd.MPCost,
                MPCostPerLevel = sd.MPCostPerLevel,
                Params = new Dictionary<string, object>()
            };
            if (sd.Params != null)
            {
                for (int i = 0; i < sd.Params.Count; i++)
                {
                    var p = sd.Params[i];
                    object val = p.Value;
                    if (string.Equals(p.Type, "int", StringComparison.OrdinalIgnoreCase))
                    {
                        int iv; if (int.TryParse(p.Value, out iv)) val = iv;
                    }
                    else if (string.Equals(p.Type, "float", StringComparison.OrdinalIgnoreCase))
                    {
                        float fv; if (float.TryParse(p.Value, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out fv)) val = fv;
                        else if (float.TryParse(p.Value, out fv)) val = fv;
                    }
                    si.Params[p.Key] = val;
                }
            }
            return si;
        }

        public static List<SkillSetting.SkillInfo> ToSkillInfoList(List<SkillData> list)
        {
            List<SkillSetting.SkillInfo> result = new List<SkillSetting.SkillInfo>();
            if (list == null) return result;
            for (int i = 0; i < list.Count; i++) result.Add(ToSkillInfo(list[i]));
            return result;
        }

        public static LevelSetting.LevelInfo ToLevelInfo(LevelData ld)
        {
            if (ld == null) return null;
            LevelSetting.LevelInfo li = new LevelSetting.LevelInfo
            {
                Name = ld.Name,
                CoverIndex = ld.CoverIndex,
                Audio = ld.Audio,
                MapWidth = ld.MapWidth,
                MapHeight = ld.MapHeight,
                PaletIndex = ld.PaletIndex,
                Difficulty = ld.Difficulty,
                GroundSerials = ld.GroundSerials != null ? new List<uint>(ld.GroundSerials) : new List<uint>(),
                DecorationsSerials = ld.DecorationsSerials != null ? new List<uint>(ld.DecorationsSerials) : new List<uint>(),
                UnitSerials = ld.UnitSerials != null ? new List<uint>(ld.UnitSerials) : new List<uint>(),
                BorderSerial = ld.BorderSerial,
                RoundInfos = new List<LevelSetting.RoundInfo>(),
                NPCInfos = new List<GameData.InteractiveSetting.InteractiveInfo>()
            };
            if (ld.RoundInfos != null)
            {
                for (int r = 0; r < ld.RoundInfos.Count; r++)
                {
                    var rd = ld.RoundInfos[r];
                    LevelSetting.RoundInfo ri = new LevelSetting.RoundInfo
                    {
                        Level = rd.Level,
                        EnemyIDs = rd.EnemyIDs,
                        SpawnCountPerEnemy = rd.SpawnCountPerEnemy,
                        Duration = rd.Duration,
                        ExtraDisturbEnemyIDs = rd.ExtraDisturbEnemyIDs,
                        BossInfos = new List<LevelSetting.BossInfo>()
                    };
                    if (rd.BossInfos != null)
                    {
                        for (int b = 0; b < rd.BossInfos.Count; b++)
                        {
                            var bd = rd.BossInfos[b];
                            LevelSetting.BossInfo bi = new LevelSetting.BossInfo
                            {
                                EnemyID = bd.EnemyID,
                                NamePrefix = bd.NamePrefix,
                                Level = bd.Level,
                                Allies = bd.Allies,
                                SpawnPerAlly = bd.SpawnPerAlly,
                                AlliesSpawnInterval = bd.AlliesSpawnInterval,
                                AlliesSpawnTimes = bd.AlliesSpawnTimes,
                                Skills = new List<int[]>()
                            };
                            if (bd.Skills != null)
                            {
                                for (int s = 0; s < bd.Skills.Count; s++)
                                {
                                    var se = bd.Skills[s];
                                    bi.Skills.Add(new int[] { se.SkillID, se.Level });
                                }
                            }
                            ri.BossInfos.Add(bi);
                        }
                    }
                    li.RoundInfos.Add(ri);
                }
            }
            if (ld.NPCInfos != null)
            {
                for (int n = 0; n < ld.NPCInfos.Count; n++)
                {
                    var nd = ld.NPCInfos[n];
                    li.NPCInfos.Add(new GameData.InteractiveSetting.InteractiveInfo
                    {
                        Type = (GameData.InteractiveSetting.Type)nd.Type,
                        Serial = nd.Serial
                    });
                }
            }
            return li;
        }

        public static List<LevelSetting.LevelInfo> ToLevelInfoList(List<LevelData> list)
        {
            List<LevelSetting.LevelInfo> result = new List<LevelSetting.LevelInfo>();
            if (list == null) return result;
            for (int i = 0; i < list.Count; i++) result.Add(ToLevelInfo(list[i]));
            return result;
        }

        public static void ApplyToGameData(GameDatabase db)
        {
            if (db == null) return;
            PlayerSetting.PlayerGrow.HP = db.PlayerGrow.HP;
            PlayerSetting.PlayerGrow.MP = db.PlayerGrow.MP;
            PlayerSetting.PlayerGrow.ATK = db.PlayerGrow.ATK;
            PlayerSetting.PlayerGrow.DEF = db.PlayerGrow.DEF;
            PlayerSetting.PlayerGrow.SPD = db.PlayerGrow.SPD;

            EnemySetting.EnemyGrow.HP = db.EnemyGrow.HP;
            EnemySetting.EnemyGrow.MP = db.EnemyGrow.MP;
            EnemySetting.EnemyGrow.ATK = db.EnemyGrow.ATK;
            EnemySetting.EnemyGrow.DEF = db.EnemyGrow.DEF;
            EnemySetting.EnemyGrow.SPD = db.EnemyGrow.SPD;

            PlayerSetting.PlayerInfos.Clear();
            var plist = ToPlayerInfoList(db.Players);
            for (int i = 0; i < plist.Count; i++) PlayerSetting.PlayerInfos.Add(plist[i]);

            EnemySetting.EnemyInfos.Clear();
            var elist = ToEnemyInfoList(db.Enemies);
            for (int i = 0; i < elist.Count; i++) EnemySetting.EnemyInfos.Add(elist[i]);

            SkillSetting.SkillInfos.Clear();
            var slist = ToSkillInfoList(db.Skills);
            for (int i = 0; i < slist.Count; i++) SkillSetting.SkillInfos.Add(slist[i]);

            LevelSetting.LevelInfos.Clear();
            var llist = ToLevelInfoList(db.Levels);
            for (int i = 0; i < llist.Count; i++) LevelSetting.LevelInfos.Add(llist[i]);
        }
    }
}
