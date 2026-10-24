# Crossgate Survivors 魔力寶貝幸存者

Unity C# 專案（Unity 2021.3.30f1），另外附一份純 HTML5 網頁版。

## 線上遊玩

**`https://theliberalartspressad.github.io/moli/`**

> 注意網址是 `the**liberal**artspressad`，少一個 `i` 就會變成 404。

- 網頁版就是根目錄的 `index.html` + `game.js`，不需要 Unity WebGL 建置，也不需要任何 Secrets。
- GitHub Pages 設定：`Settings > Pages` → `Deploy from a branch` → `main` / `/ (root)`。
- 只有一份網頁版程式碼（根目錄），沒有 `docs/` 副本，避免兩份不同步造成「卡片空白」。

## 檔案結構

| 路徑 | 用途 |
| --- | --- |
| `index.html` / `game.js` / `style.css` | 網頁版遊戲 |
| `art.js` | 網頁版美術層（俯視角、原版地圖 + 各關卡色調、角色、怪物、場景物件） |
| `web-assets/art/` | 網頁版使用的美術素材（由 `Tools/build-web-assets.ps1` 從 `Assets/` 產生） |
| `web-assets/monsters/` | 405 種原版怪物素材 × 6 種動作（待機／行走／攻擊／施法／受傷／死亡） |
| `Tools/build-web-assets.ps1` | 從專案原本的美術檔產生 `web-assets/art/` |
| `Tools/extract-cg-character.py` | 從原版客戶端 `Graphic*.bin` / `Anime*.bin` 解出角色圖檔（Python 版 CGTool） |
| `Tools/build-character-assets.py` | 產生劍士／弓箭手的 8 方向待機、行走、攻擊 sprite sheet |
| `Tools/build-monster-assets.py` | 掃描怪物素材資料夾，產生 `web-assets/monsters/` 與 `catalog.json`（可續傳，只補缺的動作） |
| `Tools/build-levels.js` | 由怪物圖鑑自動產生 15 個地區關卡與霸主設計（`config/game_config.json`） |
| `Tools/monster-preview.html` | 405 種怪物圖鑑（可切換 6 種動作） |
| `Tools/biome-preview.html` | 十五個關卡的景色預覽頁 |
| `admin.html` / `admin.js` | 網頁版數據後台（讀寫 `config/game_config.json`） |
| `config/game_config.json` | 網頁版與工具共用的設定檔 |
| `Assets/` / `Packages/` / `ProjectSettings/` | Unity 專案 |
| `godot/` | Godot 專案（手動 workflow 才會用到） |
| `Tools/MoliConfigEditor/` | 獨立 EXE 後台（dotnet build） |
| `Tools/serve-web.ps1` | 本機預覽用 |
| `Tools/legacy/` | 舊的一次性修補腳本，保留參考、不參與執行 |

## 本機預覽

```powershell
powershell -ExecutionPolicy Bypass -File Tools\serve-web.ps1
```

然後開 `http://localhost:8080/`，Ctrl+C 結束。直接雙擊 `index.html` 也可以玩（會用內建設定）。

## 修改網頁版之後

1. 改 `index.html` 內的 `?v=YYYYMMDD-n` 版本號（`style.css`、`game.js`、`admin.js` 都要），避免瀏覽器拿到舊快取。
2. `git add -A && git commit -m "..." && git push`
3. 等 GitHub Pages build 完成（約 30～60 秒）。

## 後台編輯系統

- **網頁後台**：`admin.html`（可下載 `game_config.json`，覆蓋後 push）
- **Unity 編輯器後台**：`Tools > Crossgate Survivors > 設定編輯器（後台）`
- **獨立 EXE 後台**：`Tools/MoliConfigEditor/`
- **JSON 設定**：`config/game_config.json`、`Assets/StreamingAssets/Config/`

## 遊戲資源

請自行將魔力寶貝遊戲資源放於專案根目錄 `bin/` 資料夾，本專案不提供資源檔。

> 怪物素材同樣來自《魔力寶貝》，版權屬於原權利人，僅供個人研究與非商業展示使用。

## 網頁版美術

網頁版直接用**專案裡原本的美術檔**，和 Unity 版一致：

| 遊戲內用途 | 來源 |
| --- | --- |
| 主選單背景 | `Assets/Textures/Main_BG.png` |
| 主選單標題 | `Assets/Textures/Main_Logo.png` |
| 角色立繪 | `Assets/Textures/Main_Sword.png`、`Main_Bow.png` |
| 角色卡 / 關卡卡框 | `Assets/Textures/userSelector.png`、`LevelSelector.png` |
| 關卡封面 | `Assets/Textures/LevelCover.png`（前兩關） |
| 戰場地圖 | `Assets/Temp/位图.png`（已去掉「角色選擇 / 關卡選擇」字樣） |
| 樹木 | `Assets/Temp/7813.png` |
| 主角（劍士） | 原版客戶端角色 105053（西恩）→ `web-assets/art/player_sword_*.png` |
| 主角（弓箭手） | 原版客戶端角色 106126（葛蕾絲）→ `web-assets/art/player_bow_*.png` |
| 哥布林 / 紅帽哥布林 | `Assets/Textures/enemy.gif` |
| 405 種怪物（含待機／行走／攻擊／施法／受傷／死亡動作） | `魔力寶貝怪物素材/<地區>/<怪物>/*.gif` → `web-assets/monsters/` |
| 技能圖示 | `Assets/Resources/SkillIcons/*.png` |
| 技能特效 | `Assets/Resources/BattleSkills/*/` |

- 視角是**俯視角**（和 Unity 版一樣），不是斜角。
- 每個關卡都用同一張原版地圖，加上不同色調分級與環境效果做出不同景色：
  森林、海島、樹海、洞窟、沙漠、雪山、火山、靈堂、海底。
- **怪物全部使用原版素材**：`web-assets/monsters/` 內含 405 種怪物、2,424 段動畫，
  每種都有待機（idle）／行走（walk）／攻擊（attack）／施法（special）／受傷（hurt）／死亡（die），
  戰鬥中會依狀態播放；素材來自 `魔力寶貝怪物素材`，以無損動畫 WebP 轉檔（約 53 MB）。
- **主角也使用原版角色圖**：劍士是西恩（客戶端角色 105053）、弓箭手是葛蕾絲（106126），
  兩者都有 8 方向 × 待機／行走／攻擊，腳底錨點對齊，遊戲中會依移動方向與攻擊狀態切換。
  角色圖直接從客戶端 `Graphic*.bin` / `Anime*.bin` 解出，不是用舊的單張 GIF 改色。
- 重新產生角色素材（需要 `C:\Users\e3479\Downloads\moli\bin`，或設定 `CG_CLIENT_DIR`）：

  ```powershell
  python Tools\build-character-assets.py
  ```
- 重新產生怪物素材（換了素材資料夾之後，已存在的動作會跳過）：

  ```powershell
  python Tools\build-monster-assets.py
  node Tools\build-levels.js
  ```

- 重新產生場景素材（換了 `Assets/` 裡的圖之後）：

  ```powershell
  powershell -ExecutionPolicy Bypass -File Tools\build-web-assets.ps1
  ```

- 美術預覽：`Tools/monster-preview.html`（405 種怪物）、`Tools/biome-preview.html`（十五關景色）。

## 關卡設計（15 個地區）

| # | 地區 | 景色／地標 | 怪物數 | 霸主（原形） |
| --- | --- | --- | --- | --- |
| 1 | 芙蕾雅島 | 海島／石造小神社 | 56 | 翠冠樹靈王（樹精） |
| 2 | 索奇亞島 | 沙漠／斷柱遺跡 | 42 | 黃沙暴君（亞特拉斯巨神） |
| 3 | 莎蓮娜島 | 樹海／發光菇 | 76 | 霧海冰翼（寒冰翼龍） |
| 4 | 米內葛爾島 | 森林／石造小神社 | 39 | 腐敗之母（死亡樹精） |
| 5 | 庫魯克斯島 | 雪山／冰晶群 | 50 | 雪原劊子手（斬首者） |
| 6 | 德威特島 | 森林／石造小神社 | 121 | 暴風之王（烈風翼龍） |
| 7 | 傑諾姆島 | 洞窟／紫水晶 | 6 | 坑道亡靈王（血骷髏） |
| 8 | 弗利德島 | 火山／岩漿裂縫 | 22 | 熔岩泰坦（亞特拉斯巨神） |
| 9 | 樂園之卵 | 海島／石造小神社 | 72 | 黃金守門人（黃金龍骨） |
| 10 | 辛梅爾 | 靈堂／墓碑 | 45 | 冥界引路人（冥界死神） |
| 11 | 諾斯菲拉特 | 冰洞／冰晶群 | 45 | 永凍之翼（寒冰翼龍） |
| 12 | 哈那可半島 | 海岸／斷柱遺跡 | 37 | 狂風領主（風獸） |
| 13 | 逆星 | 洞窟／紫水晶 | 14 | 逆星魔導（布拉茲） |
| 14 | 日耀之域 | 沙漠／斷柱遺跡 | 28 | 日耀炎翼（烈風翼龍） |
| 15 | 水曜之域 | 海底／珊瑚群 | 75 | 月海雙姬（常娥＋姮娥，雙霸主） |

- 每張地圖中央都有霸主競技場圓環，霸主登場時會亮起；外圈依地區擺放專屬地標
  （神社、遺跡、冰晶、岩漿裂縫、墓碑、珊瑚、發光菇），讓 15 關除了色調之外各有輪廓。
- 每關 5 波：先鋒／主力／精銳／親衛＋霸主。前四波依體型把該地區**所有**怪物分批派出，
  所以每個地區圖鑑裡的怪物都一定會出現。
- 難度隨關卡序號上升（怪物 HP／ATK／DEF 與波次等級都會提高），霸主血量與攻擊另有加成。
- **霸主有專屬招式與第二階段**（血量降到指定比例後狂暴、出招更快）：

| 霸主 | 招式 | 特色 |
| --- | --- | --- |
| 翠冠樹靈王 | 召喚援軍／腐蝕地面／衝擊波 | 叫出森林怪物並在地面留下毒沼 |
| 黃沙暴君 | 衝擊波／衝撞／落石 | 直線衝撞，落石有預警圈 |
| 霧海冰翼 | 環形彈幕／齊射／腐蝕地面 | 冰霜彈幕與凍地 |
| 腐敗之母 | 腐蝕地面／召喚援軍／齊射 | 以毒沼與小怪壓縮走位 |
| 雪原劊子手 | 衝撞／齊射／衝擊波 | 高速突進的近戰壓力 |
| 暴風之王 | 衝擊波／齊射／衝撞 | 大範圍風壓與追蹤彈 |
| 坑道亡靈王 | 召喚援軍／齊射／腐蝕地面 | 亡靈海戰術 |
| 熔岩泰坦 | 落石／衝擊波／腐蝕地面 | 大量落石與岩漿地帶 |
| 黃金守門人 | 直線光束／召喚援軍／環形彈幕 | 光束有預警線，需横向閃避 |
| 冥界引路人 | 腐蝕地面／召喚援軍／衝擊波 | 靈魂沼澤與亡者大軍 |
| 永凍之翼 | 環形彈幕／落石／齊射 | 冰雹與彈幕交錯 |
| 狂風領主 | 衝撞／衝擊波／齊射 | 斷崖上的高速追擊 |
| 逆星魔導 | 瞬移／環形彈幕／直線光束 | 瞬移到玩家身邊後爆發 |
| 日耀炎翼 | 落石／直線光束／衝擊波 | 火焰落石與掃射光束 |
| 月海雙姬 | 治療／環形彈幕／腐蝕地面 | 雙霸主，會互相掩護並自我治療 |

- **破關後可以無限疊加**：打完第 15 關會詢問是否進入下一周目，每多一周目敵人
  HP +55%、ATK +40%，角色起始能力也會提高，週目數會顯示在 HUD 與主選單。

## 網頁版除錯參數

| 參數 | 作用 |
| --- | --- |
| `?autostart=1` | 跳過選單直接開始 |
| `?autostart=1&level=2` | 直接指定關卡（0～14，對應上表的 15 個地區） |
| `?autostart=1&player=1` | 直接指定角色（0 劍士、1 弓箭手） |
| `?autostart=1&level=0&boss=1` | 直接跳到該關卡的霸主波（除錯／驗收用） |
| `?showcase=1` | 在角色周圍排出該關卡最多 30 種怪物（純美術預覽，戰鬥暫停） |


## 場景

請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 疑難排解

| 症狀 | 處理 |
| --- | --- |
| 404「There isn't a GitHub Pages site here」 | 網址拼錯（`theliberal...`），或 Pages 尚未發佈 |
| 角色 / 關卡卡片空白 | 重新整理（Ctrl+F5）。頁面開頭會先用內建設定畫卡片，正常不會空白 |
| 改了程式碼但線上沒變 | 版本號沒改，或 Pages build 還沒完成 / CDN 快取（約 1～10 分鐘） |
