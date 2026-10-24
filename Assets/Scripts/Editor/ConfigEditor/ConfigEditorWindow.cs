using Crossgate.Data;
using Crossgate.Data.Runtime;
using UnityEditor;
using UnityEngine;

namespace Crossgate.Editor
{
    public class ConfigEditorWindow : EditorWindow
    {
        private GameDatabase _db;
        private int _tab;

        [MenuItem("Tools/Crossgate Survivors/設定編輯器（後台）")]
        public static void ShowWindow()
        {
            GetWindow<ConfigEditorWindow>("Crossgate 設定編輯器").Show();
        }

        private void OnGUI()
        {
            GUILayout.Space(5);
            _db = (GameDatabase)EditorGUILayout.ObjectField("GameDatabase", _db, typeof(GameDatabase), false);
            if (_db == null)
            {
                EditorGUILayout.HelpBox("請先從「從 GameData 匯入到 ScriptableObject」建立 GameDatabase.asset，或直接拖入已有的檔案。", MessageType.Info);
                return;
            }
            GUILayout.Space(5);
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("總覽")) _tab = 0;
            if (GUILayout.Button("角色")) _tab = 1;
            if (GUILayout.Button("怪物")) _tab = 2;
            if (GUILayout.Button("技能")) _tab = 3;
            if (GUILayout.Button("關卡")) _tab = 4;
            if (GUILayout.Button("成長")) _tab = 5;
            GUILayout.EndHorizontal();
            GUILayout.Space(10);
            EditorGUILayout.BeginVertical("box");
            if (_tab == 0) DrawOverview();
            else if (_tab == 1) DrawPlayers();
            else if (_tab == 2) DrawEnemies();
            else if (_tab == 3) DrawSkills();
            else if (_tab == 4) DrawLevels();
            else if (_tab == 5) DrawGrowth();
            EditorGUILayout.EndVertical();
            if (GUI.changed)
            {
                EditorUtility.SetDirty(_db);
            }
        }

        private void DrawOverview()
        {
            GUILayout.Label("總覽", EditorStyles.boldLabel);
            GUILayout.Label($"角色：{_db.Players.Count}  怪物：{_db.Enemies.Count}  技能：{_db.Skills.Count}  關卡：{_db.Levels.Count}");
            GUILayout.Space(10);
            if (GUILayout.Button("套用到遊戲（即時覆寫 GameData）", GUILayout.Height(28)))
            {
                DataAdapter.ApplyToGameData(_db);
                Debug.Log("[Crossgate] 已套用 GameDatabase 到 GameData（執行中也可用）");
            }
            GUILayout.Space(5);
            EditorGUILayout.HelpBox("建議先用「從 GameData 匯入」產生初始設定，再在此編輯並按「套用到遊戲」測試。", MessageType.None);
        }

        private void DrawPlayers()
        {
            GUILayout.Label("角色設定", EditorStyles.boldLabel);
            if (GUILayout.Button("+ 新增角色")) _db.Players.Add(new PlayerData { Name = "新角色" });
            for (int i = 0; i < _db.Players.Count; i++)
            {
                var p = _db.Players[i];
                EditorGUILayout.BeginVertical("box");
                EditorGUILayout.BeginHorizontal();
                p.Name = EditorGUILayout.TextField("名稱", p.Name);
                if (GUILayout.Button("刪除", GUILayout.Width(60))) { _db.Players.RemoveAt(i); break; }
                EditorGUILayout.EndHorizontal();
                p.Serial = (uint)EditorGUILayout.LongField("角色 Serial", p.Serial);
                p.WeaponSerial = (uint)EditorGUILayout.LongField("武器 Serial", p.WeaponSerial);
                p.SkillDesc = EditorGUILayout.TextField("技能說明", p.SkillDesc);
                p.ATKSkill = EditorGUILayout.IntField("普攻技能ID", p.ATKSkill);
                p.SpecialSkill = EditorGUILayout.IntField("必殺技技能ID", p.SpecialSkill);
                p.ATK = EditorGUILayout.FloatField("ATK", p.ATK);
                p.HP = EditorGUILayout.FloatField("HP", p.HP);
                p.MP = EditorGUILayout.FloatField("MP", p.MP);
                p.DEF = EditorGUILayout.FloatField("DEF", p.DEF);
                p.SPD = EditorGUILayout.FloatField("SPD", p.SPD);
                p.Desc = EditorGUILayout.TextField("描述", p.Desc);
                EditorGUILayout.EndVertical();
            }
        }

        private void DrawEnemies()
        {
            GUILayout.Label("怪物設定", EditorStyles.boldLabel);
            if (GUILayout.Button("+ 新增怪物")) _db.Enemies.Add(new EnemyData { ID = _db.Enemies.Count, Name = "新怪物", Skills = new System.Collections.Generic.List<EnemySkillEntry>() });
            for (int i = 0; i < _db.Enemies.Count; i++)
            {
                var e = _db.Enemies[i];
                EditorGUILayout.BeginVertical("box");
                EditorGUILayout.BeginHorizontal();
                e.Name = EditorGUILayout.TextField("名稱", e.Name);
                if (GUILayout.Button("刪除", GUILayout.Width(60))) { _db.Enemies.RemoveAt(i); break; }
                EditorGUILayout.EndHorizontal();
                e.ID = EditorGUILayout.IntField("ID", e.ID);
                e.Serial = (uint)EditorGUILayout.LongField("Serial", e.Serial);
                e.ATK = EditorGUILayout.FloatField("ATK", e.ATK);
                e.HP = EditorGUILayout.FloatField("HP", e.HP);
                e.MP = EditorGUILayout.FloatField("MP", e.MP);
                e.DEF = EditorGUILayout.FloatField("DEF", e.DEF);
                e.SPD = EditorGUILayout.FloatField("SPD", e.SPD);
                e.Desc = EditorGUILayout.TextField("描述", e.Desc);
                GUILayout.Label("技能（SkillID, Level）", EditorStyles.miniBoldLabel);
                if (GUILayout.Button("+ 新增技能")) e.Skills.Add(new EnemySkillEntry { SkillID = 0, Level = 1 });
                for (int s = 0; s < e.Skills.Count; s++)
                {
                    EditorGUILayout.BeginHorizontal();
                    e.Skills[s].SkillID = EditorGUILayout.IntField(e.Skills[s].SkillID, GUILayout.Width(80));
                    e.Skills[s].Level = EditorGUILayout.IntField(e.Skills[s].Level, GUILayout.Width(80));
                    if (GUILayout.Button("X", GUILayout.Width(20))) { e.Skills.RemoveAt(s); break; }
                    EditorGUILayout.EndHorizontal();
                }
                EditorGUILayout.EndVertical();
            }
        }

        private void DrawSkills()
        {
            GUILayout.Label("技能設定", EditorStyles.boldLabel);
            if (GUILayout.Button("+ 新增技能")) _db.Skills.Add(new SkillData { ID = _db.Skills.Count, Name = "新技能", MaxLevel = 10, Params = new System.Collections.Generic.List<SkillParams>() });
            for (int i = 0; i < _db.Skills.Count; i++)
            {
                var sk = _db.Skills[i];
                EditorGUILayout.BeginVertical("box");
                EditorGUILayout.BeginHorizontal();
                sk.Name = EditorGUILayout.TextField("名稱", sk.Name);
                if (GUILayout.Button("刪除", GUILayout.Width(60))) { _db.Skills.RemoveAt(i); break; }
                EditorGUILayout.EndHorizontal();
                sk.ID = EditorGUILayout.IntField("ID", sk.ID);
                sk.Icon = EditorGUILayout.IntField("Icon", sk.Icon);
                sk.Desc = EditorGUILayout.TextField("簡介", sk.Desc);
                sk.CD = EditorGUILayout.FloatField("CD", sk.CD);
                sk.CDReduceRatePerLevel = EditorGUILayout.FloatField("CD降低/級", sk.CDReduceRatePerLevel);
                sk.MPCost = EditorGUILayout.IntField("MP消耗", sk.MPCost);
                sk.MPCostPerLevel = EditorGUILayout.FloatField("MP消耗增加/級", sk.MPCostPerLevel);
                sk.MaxLevel = EditorGUILayout.IntField("最大等級", sk.MaxLevel);
                sk.IsAutoSkill = EditorGUILayout.Toggle("自動釋放", sk.IsAutoSkill);
                sk.IsSpecial = EditorGUILayout.Toggle("得意技", sk.IsSpecial);
                sk.IsLearnable = EditorGUILayout.Toggle("可學習", sk.IsLearnable);
                sk.BelongSkillID = EditorGUILayout.IntField("所屬技能ID", sk.BelongSkillID);
                sk.AbilityDescTpl = EditorGUILayout.TextField("能力說明模板", sk.AbilityDescTpl);
                sk.AbilityLevelUpDescTpl = EditorGUILayout.TextField("升級說明模板", sk.AbilityLevelUpDescTpl);
                GUILayout.Label("參數（Key, Value, Type:int/float/string）", EditorStyles.miniBoldLabel);
                if (GUILayout.Button("+ 新增參數")) sk.Params.Add(new SkillParams { Key = "Param", Value = "0", Type = "float" });
                for (int p = 0; p < sk.Params.Count; p++)
                {
                    EditorGUILayout.BeginHorizontal();
                    sk.Params[p].Key = EditorGUILayout.TextField(sk.Params[p].Key, GUILayout.Width(100));
                    sk.Params[p].Value = EditorGUILayout.TextField(sk.Params[p].Value, GUILayout.Width(80));
                    sk.Params[p].Type = EditorGUILayout.TextField(sk.Params[p].Type, GUILayout.Width(70));
                    if (GUILayout.Button("X", GUILayout.Width(20))) { sk.Params.RemoveAt(p); break; }
                    EditorGUILayout.EndHorizontal();
                }
                EditorGUILayout.EndVertical();
            }
        }

        private void DrawLevels()
        {
            GUILayout.Label("關卡設定", EditorStyles.boldLabel);
            if (GUILayout.Button("+ 新增關卡")) _db.Levels.Add(new LevelData { Name = "新關卡", RoundInfos = new System.Collections.Generic.List<RoundData>() });
            for (int i = 0; i < _db.Levels.Count; i++)
            {
                var lv = _db.Levels[i];
                EditorGUILayout.BeginVertical("box");
                EditorGUILayout.BeginHorizontal();
                lv.Name = EditorGUILayout.TextField("關卡名稱", lv.Name);
                if (GUILayout.Button("刪除", GUILayout.Width(60))) { _db.Levels.RemoveAt(i); break; }
                EditorGUILayout.EndHorizontal();
                lv.Difficulty = EditorGUILayout.IntField("難度", lv.Difficulty);
                lv.Audio = EditorGUILayout.IntField("BGM", lv.Audio);
                lv.PaletIndex = EditorGUILayout.IntField("調色盤", lv.PaletIndex);
                lv.MapWidth = EditorGUILayout.IntField("地圖寬", lv.MapWidth);
                lv.MapHeight = EditorGUILayout.IntField("地圖高", lv.MapHeight);
                lv.BorderSerial = (uint)EditorGUILayout.LongField("邊界 Serial", lv.BorderSerial);
                GUILayout.Label("波次（Round）", EditorStyles.miniBoldLabel);
                if (GUILayout.Button("+ 新增波次")) lv.RoundInfos.Add(new RoundData { Level = lv.RoundInfos.Count + 1, BossInfos = new System.Collections.Generic.List<BossData>() });
                for (int r = 0; r < lv.RoundInfos.Count; r++)
                {
                    var rd = lv.RoundInfos[r];
                    EditorGUILayout.BeginVertical("box");
                    EditorGUILayout.BeginHorizontal();
                    GUILayout.Label($"Round {r}", EditorStyles.boldLabel);
                    if (GUILayout.Button("刪除", GUILayout.Width(60))) { lv.RoundInfos.RemoveAt(r); break; }
                    EditorGUILayout.EndHorizontal();
                    rd.Level = EditorGUILayout.IntField("怪物等級", rd.Level);
                    rd.SpawnCountPerEnemy = EditorGUILayout.IntField("每種怪物數量", rd.SpawnCountPerEnemy);
                    rd.Duration = EditorGUILayout.FloatField("持續時間(-1為殺光/BOSS)", rd.Duration);
                    // EnemyIDs 簡易編輯
                    string eids = rd.EnemyIDs == null ? "" : string.Join(",", System.Array.ConvertAll(rd.EnemyIDs, x => x.ToString()));
                    string neids = EditorGUILayout.TextField("EnemyIDs(逗號分隔)", eids);
                    if (neids != eids) rd.EnemyIDs = ParseInts(neids);
                    string exids = rd.ExtraDisturbEnemyIDs == null ? "" : string.Join(",", System.Array.ConvertAll(rd.ExtraDisturbEnemyIDs, x => x.ToString()));
                    string nexids = EditorGUILayout.TextField("ExtraDisturb(逗號分隔)", exids);
                    if (nexids != exids) rd.ExtraDisturbEnemyIDs = ParseInts(nexids);
                    GUILayout.Label("BOSS", EditorStyles.miniBoldLabel);
                    if (GUILayout.Button("+ 新增BOSS")) rd.BossInfos.Add(new BossData { Skills = new System.Collections.Generic.List<EnemySkillEntry>() });
                    for (int b = 0; b < rd.BossInfos.Count; b++)
                    {
                        var bd = rd.BossInfos[b];
                        EditorGUILayout.BeginHorizontal();
                        bd.EnemyID = EditorGUILayout.IntField("EnemyID", bd.EnemyID, GUILayout.Width(120));
                        bd.Level = EditorGUILayout.IntField("Level", bd.Level, GUILayout.Width(80));
                        bd.NamePrefix = EditorGUILayout.TextField("名稱前綴", bd.NamePrefix);
                        if (GUILayout.Button("X", GUILayout.Width(20))) { rd.BossInfos.RemoveAt(b); break; }
                        EditorGUILayout.EndHorizontal();
                    }
                    EditorGUILayout.EndVertical();
                }
                EditorGUILayout.EndVertical();
            }
        }

        private void DrawGrowth()
        {
            GUILayout.Label("成長參數", EditorStyles.boldLabel);
            EditorGUILayout.BeginVertical("box");
            GUILayout.Label("玩家成長（每級增加倍率）", EditorStyles.miniBoldLabel);
            _db.PlayerGrow.HP = EditorGUILayout.FloatField("HP", _db.PlayerGrow.HP);
            _db.PlayerGrow.MP = EditorGUILayout.FloatField("MP", _db.PlayerGrow.MP);
            _db.PlayerGrow.ATK = EditorGUILayout.FloatField("ATK", _db.PlayerGrow.ATK);
            _db.PlayerGrow.DEF = EditorGUILayout.FloatField("DEF", _db.PlayerGrow.DEF);
            _db.PlayerGrow.SPD = EditorGUILayout.FloatField("SPD", _db.PlayerGrow.SPD);
            EditorGUILayout.EndVertical();
            EditorGUILayout.BeginVertical("box");
            GUILayout.Label("怪物成長（每級增加倍率）", EditorStyles.miniBoldLabel);
            _db.EnemyGrow.HP = EditorGUILayout.FloatField("HP", _db.EnemyGrow.HP);
            _db.EnemyGrow.MP = EditorGUILayout.FloatField("MP", _db.EnemyGrow.MP);
            _db.EnemyGrow.ATK = EditorGUILayout.FloatField("ATK", _db.EnemyGrow.ATK);
            _db.EnemyGrow.DEF = EditorGUILayout.FloatField("DEF", _db.EnemyGrow.DEF);
            _db.EnemyGrow.SPD = EditorGUILayout.FloatField("SPD", _db.EnemyGrow.SPD);
            EditorGUILayout.EndVertical();
        }

        private int[] ParseInts(string s)
        {
            if (string.IsNullOrEmpty(s)) return null;
            string[] parts = s.Split(new char[] { ',', ' ', ';' }, System.StringSplitOptions.RemoveEmptyEntries);
            int[] arr = new int[parts.Length];
            for (int i = 0; i < parts.Length; i++)
            {
                int v; if (int.TryParse(parts[i].Trim(), out v)) arr[i] = v; else arr[i] = 0;
            }
            return arr;
        }
    }
}
