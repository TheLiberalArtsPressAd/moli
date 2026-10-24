using System.Collections.Generic;
using UnityEngine;

namespace Crossgate.Data
{
    [CreateAssetMenu(fileName = "GameDatabase", menuName = "Crossgate/Game Database", order = 0)]
    public class GameDatabase : ScriptableObject
    {
        [Header("成長")]
        public GrowData PlayerGrow = new GrowData()
        {
            HP = 0.06f,
            MP = 0.02f,
            ATK = 0.02f,
            DEF = 0.03f,
            SPD = 0.01f
        };
        public GrowData EnemyGrow = new GrowData()
        {
            HP = 0.045f,
            MP = 0.1f,
            ATK = 0.02f,
            DEF = 0.03f,
            SPD = 0.01f
        };

        [Header("角色")]
        public List<PlayerData> Players = new List<PlayerData>();

        [Header("怪物")]
        public List<EnemyData> Enemies = new List<EnemyData>();

        [Header("技能")]
        public List<SkillData> Skills = new List<SkillData>();

        [Header("關卡")]
        public List<LevelData> Levels = new List<LevelData>();
    }
}
