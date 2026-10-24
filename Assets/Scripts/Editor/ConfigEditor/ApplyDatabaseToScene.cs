using Crossgate.Data;
using Crossgate.Data.Runtime;
using UnityEditor;
using UnityEngine;

namespace Crossgate.Editor
{
    public class ApplyDatabaseToScene : EditorWindow
    {
        private GameDatabase _db;

        [MenuItem("Tools/Crossgate Survivors/套用目前 Database 到 GameData（編輯器測試用）")]
        public static void Apply()
        {
            string[] guids = AssetDatabase.FindAssets("t:GameDatabase");
            if (guids.Length == 0)
            {
                EditorUtility.DisplayDialog("找不到 Database", "請先使用「從 GameData 匯入到 ScriptableObject」建立 GameDatabase.asset", "OK");
                return;
            }
            string path = AssetDatabase.GUIDToAssetPath(guids[0]);
            GameDatabase db = AssetDatabase.LoadAssetAtPath<GameDatabase>(path);
            if (db == null)
            {
                EditorUtility.DisplayDialog("載入失敗", path, "OK");
                return;
            }
            DataAdapter.ApplyToGameData(db);
            Debug.Log("[Crossgate] 已套用 " + path + " 到 GameData");
            EditorUtility.DisplayDialog("完成", "已套用到 GameData 靜態資料\n現在可以直接進入 Play Mode 測試", "OK");
        }
    }
}
