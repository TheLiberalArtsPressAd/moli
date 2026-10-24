using System;
using System.Collections.Generic;
using UnityEngine;

namespace Crossgate.Data
{
    [Serializable]
    public class SkillParams
    {
        public string Key;
        public string Value;
        public string Type = "float"; // int, float, string
    }

    [Serializable]
    public class SkillData
    {
        public int ID;
        public string Name;
        public string Desc;
        public int Icon;
        public bool IsSpecial;
        public bool IsLearnable = true;
        public bool IsAutoSkill;
        public float CD = 10f;
        public float CDReduceRatePerLevel = 0.02f;
        public List<SkillParams> Params = new List<SkillParams>();
        public string AbilityDescTpl;
        public string AbilityLevelUpDescTpl;
        public int MaxLevel = 10;
        public int BelongSkillID;
        public int MPCost;
        public float MPCostPerLevel = 0.2f;
    }

    [Serializable]
    public class PlayerData
    {
        public int Index;
        public uint Serial;
        public uint WeaponSerial;
        public string Name;
        public string Desc;
        public string SkillDesc;
        public int ATKSkill = 0;
        public int SpecialSkill = 15;
        public float ATK = 5;
        public float HP = 4;
        public float MP = 2.6f;
        public float DEF = 4;
        public float SPD = 3;
    }

    [Serializable]
    public class EnemySkillEntry
    {
        public int SkillID;
        public int Level = 1;
    }

    [Serializable]
    public class EnemyData
    {
        public int ID;
        public uint Serial;
        public string Name;
        public string Desc;
        public float ATK = 2.5f;
        public float DEF = 2.5f;
        public float SPD = 2f;
        public float HP = 3.5f;
        public float MP = 5f;
        public List<EnemySkillEntry> Skills = new List<EnemySkillEntry>();
    }

    [Serializable]
    public class GrowData
    {
        public float HP = 0.06f;
        public float MP = 0.02f;
        public float ATK = 0.02f;
        public float DEF = 0.03f;
        public float SPD = 0.01f;
    }

    [Serializable]
    public class BossData
    {
        public int EnemyID;
        public string NamePrefix = "";
        public int Level = 5;
        public List<EnemySkillEntry> Skills = new List<EnemySkillEntry>();
        public int[] Allies;
        public int SpawnPerAlly = 10;
        public float AlliesSpawnInterval = 60f;
        public int AlliesSpawnTimes = 10;
    }

    [Serializable]
    public class RoundData
    {
        public int Level = 1;
        public int[] EnemyIDs;
        public int SpawnCountPerEnemy = 10;
        public float Duration = 60f; // -1 means until all killed/boss defeated
        public List<BossData> BossInfos = new List<BossData>();
        public int[] ExtraDisturbEnemyIDs;
    }

    [Serializable]
    public class NPCData
    {
        public int Type; // 0:Shop,1:Doctor,2:Teacher - matches InteractiveSetting.Type
        public uint Serial;
    }

    [Serializable]
    public class LevelData
    {
        public string Name = "新关卡";
        public int CoverIndex = 0;
        public int Audio = 210;
        public int MapWidth = 50;
        public int MapHeight = 50;
        public int PaletIndex = 0;
        public int Difficulty = 1;
        public List<uint> GroundSerials = new List<uint>();
        public List<uint> DecorationsSerials = new List<uint>();
        public List<uint> UnitSerials = new List<uint>();
        public uint BorderSerial = 10014;
        public List<RoundData> RoundInfos = new List<RoundData>();
        public List<NPCData> NPCInfos = new List<NPCData>();
    }
}
