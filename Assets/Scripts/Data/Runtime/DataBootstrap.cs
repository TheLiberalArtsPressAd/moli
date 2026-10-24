using UnityEngine;

namespace Crossgate.Data.Runtime
{
    public class DataBootstrap : MonoBehaviour
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void Init()
        {
            if (DataManager.Instance == null)
            {
                GameObject go = new GameObject("DataManager");
                DataManager dm = go.AddComponent<DataManager>();
                // Try to load from Resources
                GameDatabase db = Resources.Load<GameDatabase>("GameDatabase");
                if (db == null)
                {
                    db = Resources.Load<GameDatabase>("Data/GameDatabase");
                }
                dm.Database = db;
                if (db != null)
                {
                    DataAdapter.ApplyToGameData(db);
                }
                Object.DontDestroyOnLoad(go);
            }
            else if (DataManager.Instance.Database != null)
            {
                DataAdapter.ApplyToGameData(DataManager.Instance.Database);
            }
        }
    }
}
