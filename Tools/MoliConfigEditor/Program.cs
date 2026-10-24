using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace MoliConfigEditor
{
    public class SkillParams
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Type { get; set; } = "float";
    }

    public class SkillData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public int Icon { get; set; }
        public bool IsSpecial { get; set; }
        public bool IsLearnable { set;get; } = true;
        public bool IsAutoSkill { get; set; }
        public float CD { get; set; } = 10f;
        public float CDReduceRatePerLevel { set;get; } = 0.02f;
        public List<SkillParams> Params { get; set; } = new List<SkillParams>();
        public string AbilityDescTpl { set;get; }
        public string AbilityLevelUpDescTpl { set;get; }
        public int MaxLevel { set; get; } = 10;
        class EnemySkillEntry
        {
            public int SkillID { set;get; }
            public int Level { set;get; } = 1;
        }
        public int BelongSkillID { set;get; }
        public int MPCost { set;get; }
        public float MPCostPerLevel { set;get; } = 0.2f;
    }

    public class PlayerData
    {
        public int Index { set;get; }
        public uint Serial { set;get; }
        public uint WeaponSerial { set;get; }
        public string Name { set;get; }
        public string Desc { set;get; }
        public string SkillDesc { set;get; }
        public int ATKSkill { set;get; } = 0;
        public int SpecialSkill { set;get; } = 15;
        public float ATK { set;get; } = 5;
        public float HP { set;get; } = 4;
        public float MP { set;get; } = 2.6f;
        public float DEF { set;get; } = 4;
        public float SPD { set;get; } = 3;
    }

    public class EnemySkillEntry
    {
        public int SkillID { set;get; }
        public int Level { set;get; } = 1;
    }

    public class EnemyData
    {
        public int ID { set;get; }
        public uint Serial { set;get; }
        public string Name { set;get; }
        public string Desc { set;get; }
        public float ATK { set;get; } = 2.5f;
        public float DEF { set;get; } = 2.5f;
        public float SPD { set;get; } = 2f;
        public float HP { set;get; } = 3.5f;
        public float MP { set;get; } = 5f;
        public List<EnemySkillEntry> Skills { set;get; } = new List<EnemySkillEntry>();
    }

    public class GrowData
    {
        public float HP { set;get; } = 0.06f;
        public float MP { set;get; } = 0.02f;
        class BossData
        {
            public int EnemyID { set;get; }
            public string NamePrefix { set;get; } = \"\";
            public int Level { set;get; } = 5;
            public List<EnemySkillEntry> Skills { set;get; } = new List<EnemySkillEntry>();
            public int[] Allies { set;get; }
            public int SpawnPerAlly { set;get; } = 10;
            public float AlliesSpawnInterval { set;get; } = 60f;
            public int AlliesSpawnTimes { set;get; } = 10;
        }
        public float ATK { set;get; } = 0.02f;
        public float DEF { set;get; } = 0.03f;
        public float SPD { set;get; } = 0.01f;
    }

    public class BossData
    {
        public int EnemyID { set;get; }
        public string NamePrefix { set;get; } = \"\";
        public int Level { set;get; } = 5;
        public List<EnemySkillEntry} Skills { set;get; } = new List<EnemySkillEntry>();
        public int[] Allies { set;get; }
        public int SpawnPerAlly { set;get; } = 10;
        public float AlliesSpawnInterval { set;get; } = 60f;
        public int AlliesSpawnTimes { set;get; } = 10;
    }

    public class RoundData
    {
        public int Level { set;get; } = 1;
        public int[] EnemyIDs { set;get; }
        public int SpawnCountPerEnemy { set;get; } = 10;
        public float Duration { set;get; } = 60f;
        public List<BossData> BossInfos { set;get; } = new List<BossData>();
        public int[] ExtraDisturbEnemyIDs { set;get; }
    }

    public class NPCData
    {
        public int Type { set;get; }
        public uint Serial { set;get; }
    }

    public class LevelData
    {
        public string Name { set;get; } = \"新關卡\";
        public int CoverIndex { set;get; } = 0;
        public int Audio { set;get; } = 210;
        public int MapWidth { set;get; } = 50;
        public int MapHeight { set;get; } = 50;
        public int PaletIndex { set;get; } = 0;
        public int Difficulty { set;get; } = 1;
        public List<uint> GroundSerials { set;get; } = new List<uint>();
        public List<uint> DecorationsSerials { set;get; } = new List<uint>();
        public List<uint> UnitSerials { set;get; } = new List<uint>();
        public uint BorderSerial { set;get; } = 10014;
        public List<RoundData> RoundInfos { set;get; } = new List<RoundData>();
        public List<NPCData> NPCInfos { set;get; } = new List<NPCData>();
    }

    public class GameConfig
    {
        public GrowData PlayerGrow { set;get; } = new GrowData();
        public GrowData EnemyGrow { set;get; } = new GrowData();
        public List<PlayerData> Players { set;get; } = new List<PlayerData>();
        public List<EnemyData> Enemies { set;get; } = new List<EnemyData>();
        public List<SkillData> Skills { set;get; } = new List<SkillData>();
        public List<LevelData> Levels { set;get; } = new List<LevelData>();
    }

    public class MainForm : Form
    {
        private TabControl tabs;
        private GameConfig config;
        private string configPath;
        private string repoRoot;

        public MainForm()
        {
            Text = \"Moli 後台編輯器\";
            Width = 1000;
            Height = 700;
            StartPosition = FormStartPosition.CenterScreen;

            repoRoot = GetRepoRoot();
            configPath = Path.Combine(repoRoot, \"config\", \"game_config.json\");

            tabs = new TabControl { Dock = DockStyle.Top, Height = 600 };
            Controls.Add(tabs);

            Button saveBtn = new Button { Text = \"儲存 JSON\", Dock = DockStyle.Left, Width = 100 };
            saveBtn.Click += Save;
            Button pushBtn = new Button { Text = \"一鍵上傳 GitHub\", Dock = DockStyle.Left, Width = 150 };
            pushBtn.Click += PushGit;
            Button reloadBtn = new Button { Text = \"重新載入\", Dock = DockStyle.Left, Width = 100 };
            reloadBtn.Click += (s,e)=>{ LoadConfig(); Refresh(); };

            Panel bottom = new Panel { Dock = DockStyle.Bottom, Height = 40 };
            bottom.Controls.Add(pushBtn);
            bottom.Controls.Add(saveBtn);
            bottom.Controls.Add(reloadBtn);
            Controls.Add(bottom);

            LoadConfig();
            Refresh();
        }

        private string GetRepoRoot()
        {
            string dir = AppDomain.CurrentDomain.BaseDirectory;
            while (dir != null)
            {
                if (Directory.Exists(Path.Combine(dir, \".git\"))) return dir;
                var parent = Directory.GetParent(dir);
                if (parent == null) break;
                dir = parent.FullName;
            }
            return Directory.GetCurrentDirectory();
        }

        private void LoadConfig()
        {
            if (!File.Exists(configPath))
            {
                config = new GameConfig();
                File.WriteAllText(configPath, JsonConvert.SerializeObject(config, Formatting.Indented));
                return;
            }
            string json = File.ReadAllText(configPath);
            config = JsonConvert.DeserializeObject<GameConfig>(json) ?? new GameConfig();
        }

        private void Save(object sender, EventArgs e)
        {
            string json = JsonConvert.SerializeObject(config, Formatting.Indented);
            File.WriteAllText(configPath, json);
            MessageBox.Show(\"已儲存: \" + configPath);
        }

        private void PushGit(object sender, EventArgs e)
        {
            try
            {
                string msg = \"Update config \" + DateTime.Now.ToString(\"yyyy-MM-dd HH:mm:ss\");
                RunGit(\"add config/game_config.json\");
                RunGit(\"commit -m \\\"\" + msg + \"\\\"\");
                string res = RunGit(\"push\");
                MessageBox.Show(\"推送完成\\n\" + res);
            }
            catch (Exception ex)
            {
                MessageBox.Show(\"錯誤: \" + ex.Message);
            }
        }

        private string RunGit(string args)
        {
            Process p = new Process();
            p.StartInfo.FileName = \"git\";
            p.StartInfo.Arguments = args;
            p.StartInfo.WorkingDirectory = repoRoot;
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.CreateNoWindow = true;
            p.Start();
            string outStr = p.StandardOutput.ReadToEnd();
            string errStr = p.StandardError.ReadToEnd();
            p.WaitForExit();
            return outStr + errStr;
        }

        private void Refresh()
        {
            tabs.TabPages.Clear();
            tabs.TabPages.Add(CreateTab(\"成長\", CreateGrowPanel()));
            tabs.TabPages.Add(CreateTab(\"角色\", CreatePlayersPanel()));
            tabs.TabPages.Add(CreateTab(\"怪物\", CreateEnemiesPanel()));
            tabs.TabPages.Add(CreateTab(\"技能\", CreateSkillsPanel()));
            tabs.TabPages.Add(CreateTab(\"關卡\", CreateLevelsPanel()));
        }

        private TabPage CreateTab(string name, Control c) { TabPage t = new TabPage(name); c.Dock = DockStyle.Fill; t.Controls.Add(c); return t; }

        private Panel CreateGrowPanel()
        {
            Panel p = new Panel { AutoScroll = true };
            GroupBox g1 = new GroupBox { Text = \"玩家成長\", Top = 10, Left = 10, Width = 300, Height = 150 };
            AddFloat(g1, \"HP\", 20, ref config.PlayerGrow.HP);
            AddFloat(g1, \"MP\", 45, ref config.PlayerGrow.MP);
            AddFloat(g1, \"ATK\", 70, ref config.PlayerGrow.ATK);
            AddFloat(g1, \"DEF\", 95, ref config.PlayerGrow.DEF);
            AddFloat(g1, \"SPD\", 120, ref config.PlayerGrow.SPD);
            p.Controls.Add(g1);
            GroupBox g2 = new GroupBox { Text = \"怪物成長\", Top = 170, Left = 10, Width = 300, Height = 150 };
            AddFloat(g2, \"HP\", 20, ref config.EnemyGrow.HP);
            AddFloat(g2, \"MP\", 45, ref config.EnemyGrow.MP);
            AddFloat(g2, \"ATK\", 70, ref config.EnemyGrow.ATK);
            AddFloat(g2, \"DEF\", 95, ref config.EnemyGrow.DEF);
            AddFloat(g2, \"SPD\", 120, ref config.EnemyGrow.SPD);
            p.Controls.Add(g2);
            return p;
        }

        private void AddFloat(GroupBox g, string label, int top, ref float val)
        {
            Label l = new Label { Text = label, Left = 10, Top = top, Width = 60 };
            TextBox t = new TextBox { Left = 80, Top = top, Width = 180, Text = val.ToString() };
            t.TextChanged += (s,e)=>{ float.TryParse(t.Text, out val); };
            g.Controls.Add(l); g.Controls.Add(t);
        }

        private Panel CreatePlayersPanel()
        {
            Panel p = new Panel { AutoScroll = true };
            Button add = new Button { Text = \"+ 新增角色\", Top = 10, Left = 10 };
            add.Click += (s,e)=>{ config.Players.Add(new PlayerData { Name = \"新角色\" }); Refresh(); };
            p.Controls.Add(add);
            int y = 50;
            for (int i=0; i<config.Players.Count; i++)
            {
                var pl = config.Players[i];
                GroupBox g = new GroupBox { Text = pl.Name, Top = y, Left = 10, Width = 900, Height = 220 };
                AddText(g, \"名稱\", 20, ref pl.Name);
                AddUint(g, \"Serial\", 45, ref pl.Serial);
                AddUint(g, \"WeaponSerial\", 70, ref pl.WeaponSerial);
                AddText(g, \"技能說明\", 95, ref pl.SkillDesc);
                AddInt(g, \"普攻ID\", 120, ref pl.ATKSkill);
                AddInt(g, \"必殺技ID\", 145, ref pl.SpecialSkill);
                AddFloat(g, \"ATK\", 170, ref pl.ATK);
                AddFloat(g, \"HP\", 195, ref pl.HP);
                Button del = new Button { Text = \"刪除\", Left = 800, Top = 20, Width = 80 };
                int idx = i; del.Click += (s,e)=>{ config.Players.RemoveAt(idx); Refresh(); };
                g.Controls.Add(del);
                p.Controls.Add(g);
                y += 230;
            }
            return p;
        }

        private Panel CreateEnemiesPanel()
        {
            Panel p = new Panel { AutoScroll = true };
            Button add = new Button { Text = \"+ 新增怪物\", Top = 10, Left = 10 };
            add.Click += (s,e)=>{ config.Enemies.Add(new EnemyData { ID = config.Enemies.Count, Name = \"新怪物\", Skills = new List<EnemySkillEntry>() }); Refresh(); };
            p.Controls.Add(add);
            int y = 50;
            for (int i=0; i<config.Enemies.Count; i++)
            {
                var en = config.Enemies[i];
                GroupBox g = new GroupBox { Text = en.Name, Top = y, Left = 10, Width = 900, Height = 200 };
                AddText(g, \"名稱\", 20, ref en.Name);
                AddInt(g, \"ID\", 45, ref en.ID);
                AddUint(g, \"Serial\", 70, ref en.Serial);
                AddFloat(g, \"ATK\", 95, ref en.ATK);
                AddFloat(g, \"HP\", 120, ref en.HP);
                AddFloat(g, \"DEF\", 145, ref en.DEF);
                AddFloat(g, \"SPD\", 170, ref en.SPD);
                Button del = new Button { Text = \"刪除\", Left = 800, Top = 20, Width = 80 };
                int idx = i; del.Click += (s,e)=>{ config.Enemies.RemoveAt(idx); Refresh(); };
                g.Controls.Add(del);
                p.Controls.Add(g);
                y += 210;
            }
            return p;
        }

        private Panel CreateSkillsPanel()
        {
            Panel p = new Panel { AutoScroll = true };
            Button add = new Button { Text = \"+ 新增技能\", Top = 10, Left = 10 };
            add.Click += (s,e)=>{ config.Skills.Add(new SkillData { ID = config.Skills.Count, Name = \"新技能\" }); Refresh(); };
            p.Controls.Add(add);
            int y = 50;
            for (int i=0; i<config.Skills.Count; i++)
            {
                var sk = config.Skills[i];
                GroupBox g = new GroupBox { Text = sk.Name, Top = y, Left = 10, Width = 900, Height = 220 };
                AddText(g, \"名稱\", 20, ref sk.Name);
                AddInt(g, \"ID\", 45, ref sk.ID);
                AddInt(g, \"Icon\", 70, ref sk.Icon);
                AddFloat(g, \"CD\", 95, ref sk.CD);
                AddInt(g, \"MP消耗\", 120, ref sk.MPCost);
                AddInt(g, \"最大等級\", 145, ref sk.MaxLevel);
                Button del = new Button { Text = \"刪除\", Left = 800, Top = 20, Width = 80 };
                int idx = i; del.Click += (s,e)=>{ config.Skills.RemoveAt(idx); Refresh(); };
                g.Controls.Add(del);
                p.Controls.Add(g);
                y += 230;
            }
            return p;
        }

        private Panel CreateLevelsPanel()
        {
            Panel p = new Panel { AutoScroll = true };
            Button add = new Button { Text = \"+ 新增關卡\", Top = 10, Left = 10 };
            add.Click += (s,e)=>{ config.Levels.Add(new LevelData { Name = \"新關卡\" }); Refresh(); };
            p.Controls.Add(add);
            int y = 50;
            for (int i=0; i<config.Levels.Count; i++)
            {
                var lv = config.Levels[i];
                GroupBox g = new GroupBox { Text = lv.Name, Top = y, Left = 10, Width = 900, Height = 150 };
                AddText(g, \"名稱\", 20, ref lv.Name);
                AddInt(g, \"難度\", 45, ref lv.Difficulty);
                AddInt(g, \"地圖寬\", 70, ref lv.MapWidth);
                AddInt(g, \"地圖高\", 95, ref lv.MapHeight);
                Button del = new Button { Text = \"刪除\", Left = 800, Top = 20, Width = 80 };
                int idx = i; del.Click += (s,e)=>{ config.Levels.RemoveAt(idx); Refresh(); };
                g.Controls.Add(del);
                p.Controls.Add(g);
                y += 160;
            }
            return p;
        }

        private void AddText(GroupBox g, string label, int top, ref string val)
        {
            Label l = new Label { Text = label, Left = 10, Top = top, Width = 80 };
            TextBox t = new TextBox { Left = 100, Top = top, Width = 250, Text = val ?? \"\" };
            t.TextChanged += (s,e)=>{ val = t.Text; };
            g.Controls.Add(l); g.Controls.Add(t);
        }

        private void AddInt(GroupBox g, string label, int top, ref int val)
        {
            Label l = new Label { Text = label, Left = 10, Top = top, Width = 80 };
            TextBox t = new TextBox { Left = 100, Top = top, Width = 100, Text = val.ToString() };
            t.TextChanged += (s,e)=>{ int.TryParse(t.Text, out val); };
            g.Controls.Add(l); g.Controls.Add(t);
        }

        private void AddUint(GroupBox g, string label, int top, ref uint val)
        {
            Label l = new Label { Text = label, Left = 10, Top = top, Width = 80 };
            TextBox t = new TextBox { Left = 100, Top = top, Width = 150, Text = val.ToString() };
            t.TextChanged += (s,e)=>{ uint.TryParse(t.Text, out val); };
            g.Controls.Add(l); g.Controls.Add(t);
        }

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}
