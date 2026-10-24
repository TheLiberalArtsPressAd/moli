extends Control

func _ready() -> void:
	/Back.pressed.connect(func(): get_tree().change_scene_to_file(\"res://scenes/ui/SelectPlayer.tscn\"))
	var levels = ConfigManager.config.get(\"Levels\", [])
	var list = /List
	for i in levels.size():
		var lv = levels[i]
		var btn = Button.new()
		btn.text = str(lv.get(\"Name\", \"關卡\" + str(i))) + \" Lv.\" + str(lv.get(\"Difficulty\",1))
		btn.pressed.connect(func(): _select(i))
		list.add_child(btn)
	if levels.size() == 0:
		var btn = Button.new()
		btn.text = \"測試關卡\"
		btn.pressed.connect(func(): _select(0))
		list.add_child(btn)

func _select(idx: int) -> void:
	GameState.level_index = idx
	get_tree().change_scene_to_file(\"res://scenes/game/Battle.tscn\")
