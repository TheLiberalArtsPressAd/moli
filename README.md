# Crossgate Survivors 魔力寶貝幸存者

Unity C# 專案（Unity 2021.3.30f1）

## 線上遊玩（GitHub Pages）
- 網址：`https://thelberalartspressad.github.io/moli/`
- 部署方式：GitHub Actions 自動建置 WebGL 並部署到 GitHub Pages

> 目前 workflow 已加入 `.github/workflows/deploy-pages.yml`。要讓 WebGL 成功建置並跑起來，需要設定 Unity License Secrets（`UNITY_LICENSE`, `UNITY_EMAIL`, `UNITY_PASSWORD`）。若 Secrets 尚未設定，Actions 會失敗但 repo 已就緒。

## 後台編輯系統
- **Unity 編輯器後台**：`Tools > Crossgate Survivors > 設定編輯器（後台）`
- **獨立 EXE 後台（不用開 Unity）**：`Tools/MoliConfigEditor/`（可用 dotnet build 打包成 `MoliConfigEditor.exe`）
- **JSON 設定**：`config/game_config.json`、`Assets/StreamingAssets/Config/`
- **一鍵推送**：獨立編輯器內有「一鍵上傳 GitHub」按鈕（自動 git add/commit/push）

## 遊戲資源
請自行將魔力寶貝遊戲資源放於專案根目錄 `bin/` 資料夾，本專案不提供資源檔。

## 場景
請用 Unity 開啟 `Assets/Scenes/GameScene.unity` 測試。

## 原始說明
詳見原版 README 內容。
