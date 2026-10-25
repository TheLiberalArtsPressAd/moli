# 由 config/game_config.json 產生 config/game_config.js
#
# 目的：直接雙擊 index.html（file:// 協定）時瀏覽器會封鎖 fetch，
# 有了這支 JS 仍能載入完整的角色 / 怪物 / 技能 / 關卡設定。
#
# 用法（在專案根目錄）：
#   powershell -ExecutionPolicy Bypass -File Tools/build-config-js.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root "config\game_config.json"
$dst  = Join-Path $root "config\game_config.js"

if (-not (Test-Path $src)) { throw "找不到 $src" }

$json = [System.IO.File]::ReadAllText($src)
$header = @(
  "/* 自動產生，請勿手改。",
  " * 來源：config/game_config.json",
  " * 重新產生：powershell -ExecutionPolicy Bypass -File Tools/build-config-js.ps1",
  " */"
) -join "`r`n"
$out = $header + "`r`nwindow.MOLI_CONFIG = " + $json + ";`r`n"

[System.IO.File]::WriteAllText($dst, $out, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("已產生 {0}（{1:N0} bytes）" -f $dst, (Get-Item $dst).Length)
