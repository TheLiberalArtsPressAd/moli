using System.Collections.Generic;
using System.Linq;
using Crossgate.Data;
using UnityEngine;

namespace Crossgate.Data.Runtime
{
    public class DataManager : MonoBehaviour
    {
        public static DataManager Instance { get; private set; }
        public GameDatabase Database;
        private bool _initialized;

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            _initialized = Database != null;
        }

        public PlayerData GetPlayer(int index)
        {
            if (Database == null || Database.Players.Count == 0) return null;
            if (index < 0) index = 0;
            if (index >= Database.Players.Count) index = Database.Players.Count - 1;
            return Database.Players[index];
        }

        public EnemyData GetEnemy(int id)
        {
            if (Database == null) return null;
            return Database.Enemies.FirstOrDefault(e => e.ID == id);
        }

        public SkillData GetSkill(int id)
        {
            if (Database == null) return null;
            return Database.Skills.FirstOrDefault(s => s.ID == id);
        }

        public LevelData GetLevel(int index)
        {
            if (Database == null || Database.Levels.Count == 0) return null;
            if (index < 0) index = 0;
            if (index >= Database.Levels.Count) index = Database.Levels.Count - 1;
            return Database.Levels[index];
        }
    }
}
