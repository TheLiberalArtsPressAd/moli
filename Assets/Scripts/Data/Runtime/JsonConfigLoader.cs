using System;
using System.Collections.Generic;
using System.IO;
using Crossgate.Data;
using Crossgate.Data.Runtime;
using GameData;
using UnityEngine;

namespace Crossgate.Data.Runtime
{
    public class JsonConfigLoader : MonoBehaviour
    {
        public static JsonConfigLoader Instance { get; private set; }
        public string ConfigFileName = "game_config.json";
        public bool LoadOnAwake = true;

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            if (LoadOnAwake)
                Load();
        }

        public void Load()
        {
            string path = Path.Combine(Application.streamingAssetsPath, "Config", ConfigFileName);
            if (!File.Exists(path))
            {
                Debug.Log("[JsonConfigLoader] 找不到設定檔: " + path);
                return;
            }
            string json = File.ReadAllText(path);
            GameDatabase db = JsonUtility.FromJson<GameDatabase>(json);
            if (db == null)
            {
                Debug.LogError("[JsonConfigLoader] JSON 解析失敗");
                return;
            }
            if (DataManager.Instance == null)
            {
                GameObject go = new GameObject("DataManager");
                DataManager dm = go.AddComponent<DataManager>();
                dm.Database = db;
                DontDestroyOnLoad(go);
            }
            else
            {
                DataManager.Instance.Database = db;
            }
            DataAdapter.ApplyToGameData(db);
            Debug.Log("[JsonConfigLoader] 已從 JSON 載入並套用設定: " + path);
        }
    }
}
