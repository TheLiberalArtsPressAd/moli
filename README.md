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
| `art.js` | 網頁版美術層（2:1 等角地圖、角色、怪物、場景物件） |
| `Tools/art-gallery.html` | 美術預覽頁，可看所有角色 / 怪物 / 場景圖 |
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

- 網頁版改成 **2:1 等角（斜角）視角**，地磚 64×32，和《魔力寶貝》的呈現方式一致。
- 地圖會依關卡自動產生：`芙蕾雅島` 是海島（草地、沙灘、海、城鎮廣場、道路、房屋），
  `哥布林森林` 是森林空地，`史萊姆洞窟` 是洞窟（石地、岩壁、蘑菇）。
- 所有圖形都由 `art.js` 以程式繪製（原創素材），**不含任何原始遊戲檔案**。
- 想換成自己的素材：在專案根目錄建立 `assets/local/`（已列入 `.gitignore`，不會被推上 GitHub），
  放入 `manifest.json`：

  ```json
  {
    "actors": { "hero_sword": "actors/hero_sword.png", "goblin": "actors/goblin.png" },
    "tiles":  { "grass": "tiles/grass.png" },
    "props":  { "tree": "props/tree.png" }
  }
  ```

  圖片以「底部置中」對齊地面；角色圖建議 96×112（透明背景）。沒有 manifest 時就用內建程式繪製的圖。
- 美術預覽：本機開 `http://localhost:8080/Tools/art-gallery.html`。

## 網頁版除錯參數

| 參數 | 作用 |
| --- | --- |
| `?autostart=1` | 跳過選單直接開始 |
| `?autostart=1&level=2` | 直接指定關卡（0 哥布林森林、1 史萊姆洞窟、2 芙蕾雅島） |
| `?autostart=1&player=1` | 直接指定角色（0 劍士、1 弓箭手） |


## 場景

請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 疑難排解

| 症狀 | 處理 |
| --- | --- |
| 404「There isn't a GitHub Pages site here」 | 網址拼錯（`theliberal...`），或 Pages 尚未發佈 |
| 角色 / 關卡卡片空白 | 重新整理（Ctrl+F5）。頁面開頭會先用內建設定畫卡片，正常不會空白 |
| 改了程式碼但線上沒變 | 版本號沒改，或 Pages build 還沒完成 / CDN 快取（約 1～10 分鐘） |
