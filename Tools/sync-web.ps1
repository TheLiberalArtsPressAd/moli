# Copies the HTML5 game at the repository root into docs/.
#
# GitHub Pages can be configured to publish either the branch root or the /docs
# folder. Keeping both in sync means the same working build is served either
# way. Run this before committing web changes:
#
#   powershell -ExecutionPolicy Bypass -File Tools\sync-web.ps1

$ErrorActionPreference = "Stop"

$root   = Split-Path -Parent $PSScriptRoot
$webOut = Join-Path $root "docs"

$files = @("index.html", "game.js", "style.css", "admin.html", "admin.js")

New-Item -ItemType Directory -Force -Path $webOut | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $webOut "config") | Out-Null

foreach ($f in $files) {
    $src = Join-Path $root $f
    if (-not (Test-Path $src)) { Write-Warning "missing $f, skipped"; continue }
    Copy-Item -Path $src -Destination (Join-Path $webOut $f) -Force
    Write-Host "copied $f -> docs\$f"
}

$cfgSrc = Join-Path $root "config\game_config.json"
if (Test-Path $cfgSrc) {
    Copy-Item -Path $cfgSrc -Destination (Join-Path $webOut "config\game_config.json") -Force
    Write-Host "copied config\game_config.json -> docs\config\game_config.json"
}

# .nojekyll must exist in whatever folder Pages publishes.
$nojekyll = Join-Path $webOut ".nojekyll"
if (-not (Test-Path $nojekyll)) { New-Item -ItemType File -Path $nojekyll | Out-Null }

Write-Host "done."
