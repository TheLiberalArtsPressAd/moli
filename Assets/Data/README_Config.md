# Crossgate Survivors 設定編輯系統

## 使用方式

1. 開啟 Unity（版本 2021.3.30f1）
2. 選單：`Tools > Crossgate Survivors > 從 GameData 匯入到 ScriptableObject`
   - 會自動讀取 `Assets/Scripts/GameData/*.cs` 內的所有設定，產生 `Assets/Data/Database/GameDatabase.asset`
3. 選單：`Tools > Crossgate Survivors > 設定編輯器（後台）`
   - 在編輯器視窗中編輯角色、怪物、技能、關卡、成長等
4. 編輯完成後：
   - 方式 A：在編輯器視窗點「套用到遊戲（即時覆寫 GameData）」即可在 Play Mode 使用新設定
   - 方式 B：選單 `Tools > Crossgate Survivors > 套用目前 Database 到 GameData（編輯器測試用）`
5. 測試完成後直接 Build Windows 即可

## 檔案結構

- `Assets/Scripts/Data/Core/` - 資料結構與 GameDatabase
- `Assets/Scripts/Data/Runtime/` - DataManager、DataAdapter、DataBootstrap
- `Assets/Scripts/Editor/ConfigEditor/` - 匯入工具、編輯器視窗

## 備註

- 原始 `Assets/Scripts/GameData/*.cs` 仍保留，未刪除
- 技能實際邏輯仍在 `Assets/Resources/BattleSkills/`，只改動資料來源
- 匯入時會自動轉換 Skill.Params、Enemy.Skills、Boss.Skills 格式
- DataBootstrap 會在遊戲啟動時自動從 Resources 載入並套用（如有放置 GameDatabase）
