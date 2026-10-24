extends Control

func _ready() -> void:
	/Back.pressed.connect(func(): get_tree().change_scene_to_file(\"res://scenes/ui/MainMenu.tscn\"))
	var players = ConfigManager.config.get(\"Players\", [])
	var list = /List
	for p in players:
		var btn = Button.new()
		btn.text = str(p.get(\"Name\", \"未知\")) + \"\\nATK:\" + str(p.get(\"ATK\",\"\")) + \" HP:\" + str(p.get(\"HP\",\"\"))
		btn.custom_minimum_size = Vector2(200,80)
		btn.pressed.connect(func(): _select(players.find(p)))
		list.add_child(btn)
	if players.size() == 0:
		var btn = Button.new()
		btn.text = \"預設劍士\"
		btn.pressed.connect(func(): _select(0))
		list.add_child(btn)

func _select(idx: int) -> void:
	GameState.player_index = idx
	get_tree().change_scene_to_file(\"res://scenes/ui/SelectLevel.tscn\")
