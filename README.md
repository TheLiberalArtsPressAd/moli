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

## 場景

請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 疑難排解

| 症狀 | 處理 |
| --- | --- |
| 404「There isn't a GitHub Pages site here」 | 網址拼錯（`theliberal...`），或 Pages 尚未發佈 |
| 角色 / 關卡卡片空白 | 重新整理（Ctrl+F5）。頁面開頭會先用內建設定畫卡片，正常不會空白 |
| 改了程式碼但線上沒變 | 版本號沒改，或 Pages build 還沒完成 / CDN 快取（約 1～10 分鐘） |
