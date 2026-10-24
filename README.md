# Crossgate Survivors 魔力寶貝幸存者

Unity C# 專案（Unity 2021.3.30f1），另外附一份純 HTML5 網頁版（`index.html` + `game.js`）。

## 線上遊玩（GitHub Pages）
- 網址：`https://thelberalartspressad.github.io/moli/`
- 網頁版直接由分支內容提供，**不需要** Unity WebGL 建置，也不需要任何 Secrets。
- GitHub Pages 可以設定成「分支根目錄」或「分支 `/docs`」兩種來源，本專案兩邊都放同一份檔案以免設錯就壞掉。

### 修改網頁版後
```powershell
powershell -ExecutionPolicy Bypass -File Tools\sync-web.ps1
```
會把根目錄的 `index.html` / `game.js` / `style.css` / `admin.html` / `admin.js` / `config/game_config.json`
複製到 `docs/`，兩份必須一致。

## 後台編輯系統
- **Unity 編輯器後台**：`Tools > Crossgate Survivors > 設定編輯器（後台）`
- **獨立 EXE 後台（不用開 Unity）**：`Tools/MoliConfigEditor/`（可用 dotnet build 打包成 `MoliConfigEditor.exe`）
- **JSON 設定**：`config/game_config.json`、`Assets/StreamingAssets/Config/`
- **一鍵推送**：獨立編輯器內有「一鍵上傳 GitHub」按鈕（自動 git add/commit/push）

## 遊戲資源
請自行將魔力寶貝遊戲資源放於專案根目錄 `bin/` 資料夾，本專案不提供資源檔。

## 場景
請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 疑難排解

| 症狀 | 原因 / 處理 |
| --- | --- |
| 網址打開是 404「There isn't a GitHub Pages site here」 | Pages 沒有發佈。到 repo `Settings > Pages` 確認 Source 是 `Deploy from a branch` + `main` / `/ (root)`（或 `/docs`），並按 Save 後等 1～2 分鐘。 |
| 可以開頁面，但角色 / 關卡卡片是空的、開始鈕不能按 | 載入到舊版 `game.js`。頁面已在開頭用內建設定先把卡片畫出來；若仍是空的請強制重新整理（Ctrl+F5），或確認 `docs/` 與根目錄版本一致。 |
| 改了 `game.js` 但線上沒變化 | `index.html` 內有 `?v=YYYYMMDD-n` 版本參數，改版時請一併改號；GitHub Pages CDN 約需 1～10 分鐘。 |

## 原始說明
詳見原版 README 內容。
