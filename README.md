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
| `Tools/build-web-assets.ps1` | 從專案原本的美術檔產生 `web-assets/art/` |
| `Tools/monster-preview.html` | 怪物美術預覽頁 |
| `Tools/biome-preview.html` | 十個關卡的景色預覽頁 |
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
| 主角 | `Assets/Temp/105400.gif` |
| 哥布林 / 紅帽哥布林 | `Assets/Textures/enemy.gif` |
| 技能圖示 | `Assets/Resources/SkillIcons/*.png` |
| 技能特效 | `Assets/Resources/BattleSkills/*/` |

- 視角是**俯視角**（和 Unity 版一樣），不是斜角。
- 每個關卡都用同一張原版地圖，加上不同色調分級與環境效果做出不同景色：
  森林、海島、樹海、洞窟、沙漠、雪山、火山、靈堂、海底。
- 原版怪物圖只有哥布林一張，其餘怪物（蝙蝠、蜜蜂、老鼠、蜘蛛、史萊姆、喪屍、
  石魔像、樹精、使魔）由 `art.js` 以同風格的像素圖補齊。
- 重新產生素材（換了 `Assets/` 裡的圖之後）：

  ```powershell
  powershell -ExecutionPolicy Bypass -File Tools\build-web-assets.ps1
  ```

- 美術預覽：`Tools/monster-preview.html`（怪物）、`Tools/biome-preview.html`（十關景色）。

## 網頁版除錯參數

| 參數 | 作用 |
| --- | --- |
| `?autostart=1` | 跳過選單直接開始 |
| `?autostart=1&level=2` | 直接指定關卡（0 哥布林森林、1 史萊姆洞窟、2 芙蕾雅島、3 樹海、4 維諾亞洞窟、5 索奇亞沙漠、6 冰封雪山、7 炎之洞窟、8 靈堂、9 海底洞窟） |
| `?autostart=1&player=1` | 直接指定角色（0 劍士、1 弓箭手） |
| `?showcase=1` | 在角色周圍排出全部 14 種怪物（純美術預覽，戰鬥暫停） |


## 場景

請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 疑難排解

| 症狀 | 處理 |
| --- | --- |
| 404「There isn't a GitHub Pages site here」 | 網址拼錯（`theliberal...`），或 Pages 尚未發佈 |
| 角色 / 關卡卡片空白 | 重新整理（Ctrl+F5）。頁面開頭會先用內建設定畫卡片，正常不會空白 |
| 改了程式碼但線上沒變 | 版本號沒改，或 Pages build 還沒完成 / CDN 快取（約 1～10 分鐘） |
