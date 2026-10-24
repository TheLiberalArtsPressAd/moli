# 從專案原本的美術檔產生網頁版用的素材（web-assets/art/）。
# 來源：Assets/Textures、Assets/Temp、Assets/Resources
# 產出：web-assets/art/*（網頁版直接引用，不重複放在版控以外的地方）
#
# 用法：
#   powershell -ExecutionPolicy Bypass -File Tools\build-web-assets.ps1

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
$outDir = Join-Path $root "web-assets\art"
$uiDir = Join-Path $outDir "ui"
$skillDir = Join-Path $outDir "skills"
$fxDir = Join-Path $outDir "fx"
foreach ($d in @($outDir, $uiDir, $skillDir, $fxDir)) {
  if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

function Load-Image([string]$relative) {
  $p = Join-Path $root $relative
  if (-not (Test-Path $p)) { throw "missing source: $p" }
  $img = [System.Drawing.Image]::FromFile($p)
  $bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
  $g.Dispose()
  $img.Dispose()
  return $bmp
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host ("  {0}  {1}x{2}" -f (Split-Path -Leaf $path), $bmp.Width, $bmp.Height)
}

function Save-Jpg([System.Drawing.Bitmap]$bmp, [string]$path, [int]$quality = 86) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ps = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ps.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$quality)
  $bmp.Save($path, $codec, $ps)
  Write-Host ("  {0}  {1}x{2}" -f (Split-Path -Leaf $path), $bmp.Width, $bmp.Height)
}

function Resize([System.Drawing.Bitmap]$bmp, [int]$w) {
  $h = [int][math]::Round($bmp.Height * $w / $bmp.Width)
  $dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($bmp, 0, 0, $w, $h)
  $g.Dispose()
  return $dst
}

Write-Host "== 主選單 =="
$bg = Load-Image "Assets\Textures\Main_BG.png"
$bg2 = Resize $bg 1920
Save-Jpg $bg2 (Join-Path $outDir "menu_bg.jpg") 88
$bg.Dispose(); $bg2.Dispose()

$logo = Load-Image "Assets\Textures\Main_Logo.png"
$logo2 = Resize $logo 1000
Save-Png $logo2 (Join-Path $outDir "logo.png")
$logo.Dispose(); $logo2.Dispose()

foreach ($pair in @(@("Main_Sword.png", "hero_sword.png"), @("Main_Bow.png", "hero_bow.png"))) {
  $im = Load-Image ("Assets\Textures\" + $pair[0])
  $im2 = Resize $im 720
  Save-Png $im2 (Join-Path $outDir $pair[1])
  $im.Dispose(); $im2.Dispose()
}

Write-Host "== 關卡封面 =="
$cover = Load-Image "Assets\Textures\LevelCover.png"
for ($i = 0; $i -lt 2; $i++) {
  $rect = New-Object System.Drawing.Rectangle(($i * 410), 0, 410, 200)
  $dst = New-Object System.Drawing.Bitmap(410, 200, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.DrawImage($cover, (New-Object System.Drawing.Rectangle(0, 0, 410, 200)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  Save-Jpg $dst (Join-Path $outDir ("cover_" + $i + ".jpg")) 90
  $dst.Dispose()
}
$cover.Dispose()

Write-Host "== 原始地圖（去掉「角色選擇 / 關卡選擇」字樣） =="
$map = Load-Image "Assets\Temp\位图.png"
# 用下方的乾淨草地覆蓋兩個字樣區塊
$patch1 = New-Object System.Drawing.Rectangle(900, 260, 260, 100)
$dest1 = New-Object System.Drawing.Rectangle(900, 145, 260, 100)
$patch2 = New-Object System.Drawing.Rectangle(905, 1000, 260, 100)
$dest2 = New-Object System.Drawing.Rectangle(905, 890, 260, 100)
$g = [System.Drawing.Graphics]::FromImage($map)
$g.DrawImage($map, $dest1, $patch1, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawImage($map, $dest2, $patch2, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
# 稍微提亮（原本是選單用的暗色底圖）
$bright = New-Object System.Drawing.Bitmap($map.Width, $map.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g2 = [System.Drawing.Graphics]::FromImage($bright)
$cm = New-Object System.Drawing.Imaging.ColorMatrix
$cm.Matrix00 = 1.18; $cm.Matrix11 = 1.18; $cm.Matrix22 = 1.18; $cm.Matrix33 = 1; $cm.Matrix44 = 1
$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm)
$rectAll = New-Object System.Drawing.Rectangle(0, 0, $map.Width, $map.Height)
$g2.DrawImage($map, $rectAll, 0, 0, $map.Width, $map.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
$g2.Dispose()
Save-Jpg $bright (Join-Path $outDir "map_forest.jpg") 88
$map.Dispose(); $bright.Dispose()

Write-Host "== 場景物件 / 角色 / 怪物 =="
$tree = Load-Image "Assets\Temp\7813.png"
Save-Png $tree (Join-Path $outDir "tree.png")
$tree.Dispose()

$portrait = Load-Image "Assets\Temp\331310531.png"
Save-Png $portrait (Join-Path $outDir "portrait.png")
$portrait.Dispose()

Copy-Item (Join-Path $root "Assets\Temp\105400.gif") (Join-Path $outDir "player.gif") -Force
Copy-Item (Join-Path $root "Assets\Textures\enemy.gif") (Join-Path $outDir "goblin.gif") -Force
Copy-Item (Join-Path $root "Assets\Temp\26312.gif") (Join-Path $outDir "bird.gif") -Force
Write-Host "  player.gif / goblin.gif / bird.gif"

Write-Host "== UI =="
$sel = Load-Image "Assets\Textures\LevelSelector.png"
for ($i = 0; $i -lt 2; $i++) {
  $rect = New-Object System.Drawing.Rectangle(($i * 450), 0, 450, 360)
  $dst = New-Object System.Drawing.Bitmap(450, 360, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gg = [System.Drawing.Graphics]::FromImage($dst)
  $gg.DrawImage($sel, (New-Object System.Drawing.Rectangle(0, 0, 450, 360)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $gg.Dispose()
  Save-Png $dst (Join-Path $uiDir ("card_" + $i + ".png"))
  $dst.Dispose()
}
$sel.Dispose()

$user = Load-Image "Assets\Textures\userSelector.png"
for ($i = 0; $i -lt 2; $i++) {
  $rect = New-Object System.Drawing.Rectangle(($i * 370), 0, 370, 440)
  $dst = New-Object System.Drawing.Bitmap(370, 440, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gg = [System.Drawing.Graphics]::FromImage($dst)
  $gg.DrawImage($user, (New-Object System.Drawing.Rectangle(0, 0, 370, 440)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $gg.Dispose()
  Save-Png $dst (Join-Path $uiDir ("user_" + $i + ".png"))
  $dst.Dispose()
}
$user.Dispose()

foreach ($name in @("bottle_hp.png", "bottle_mp.png", "coin.png", "exp.png", "HealthBar.png", "border_shadow.png", "circle_light.png")) {
  $im = Load-Image ("Assets\Textures\" + $name)
  $target = Join-Path $uiDir ($name.ToLower())
  Save-Png $im $target
  $im.Dispose()
}

Write-Host "== 技能圖示（照設定檔的 Icon 編號） =="
$cfg = Get-Content (Join-Path $root "config\game_config.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$icons = @{}
foreach ($s in $cfg.Skills) { if ($s.Icon) { $icons[[int]$s.Icon] = $true } }
$copied = 0
foreach ($icon in $icons.Keys) {
  $src = Join-Path $root ("Assets\Resources\SkillIcons\" + $icon + ".png")
  if (Test-Path $src) {
    $im = Load-Image ("Assets\Resources\SkillIcons\" + $icon + ".png")
    $im2 = Resize $im 128
    Save-Png $im2 (Join-Path $skillDir ($icon.ToString() + ".png"))
    $im.Dispose(); $im2.Dispose()
    $copied++
  }
}
Write-Host "  $copied 個技能圖示"

Write-Host "== 技能特效 =="
foreach ($pair in @(@("s0\blade.png", "blade.png"), @("s0\arrow.png", "arrow.png"), @("s18\circle.png", "circle.png"))) {
  $im = Load-Image ("Assets\Resources\BattleSkills\" + $pair[0])
  $w = [math]::Min($im.Width, 256)
  $im2 = Resize $im $w
  Save-Png $im2 (Join-Path $fxDir $pair[1])
  $im.Dispose(); $im2.Dispose()
}

Write-Host ""
Write-Host "完成，輸出於 web-assets\art"
