extends Node

var config: Dictionary = {}

func _ready() -> void:
	load_config()

func load_config() -> void:
	var paths = [
		\"res://../config/game_config.json\",
		\"../../config/game_config.json\",
		\"user://game_config.json\",
		\"res://data/game_config.json\"
	]
	for p in paths:
		if FileAccess.file_exists(p):
			var f = FileAccess.open(p, FileAccess.READ)
			if f:
				var text = f.get_as_text()
				f.close()
				var parsed = JSON.parse_string(text)
				if typeof(parsed) == TYPE_DICTIONARY:
					config = parsed
					print(\"[ConfigManager] Loaded config from \", p)
					return
	print(\"[ConfigManager] No config found, using defaults\")
