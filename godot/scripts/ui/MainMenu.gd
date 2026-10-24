extends Control

func _ready() -> void:
	/StartBtn.pressed.connect(_on_start)
	/ConfigBtn.pressed.connect(_on_config)

func _on_start() -> void:
	get_tree().change_scene_to_file(\"res://scenes/ui/SelectPlayer.tscn\")

func _on_config() -> void:
	OS.shell_open(\"https://github.com/TheLiberalArtsPressAd/moli\")
