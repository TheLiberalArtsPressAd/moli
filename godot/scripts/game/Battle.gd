extends Node2D

var time: float = 0.0
var player: CharacterBody2D

func _ready() -> void:
	spawn_player()

func _process(delta: float) -> void:
	time += delta
	var m = int(time / 60)
	var s = int(time) % 60
	/HUD/TimeLabel.text = \"%02d:%02d\" % [m,s]
	if player:
		var hp = player.get(\"hp\",100)
		var maxhp = player.get(\"maxhp\",100)
		/HUD/HPBar.value = (hp / maxhp) * 100.0

func spawn_player() -> void:
	player = CharacterBody2D.new()
	var spr = Sprite2D.new()
	player.add_child(spr)
	add_child(player)
	player.position = Vector2(640,360)
	player.set(\"hp\",100)
	player.set(\"maxhp\",100)
	player.set(\"spd\",200)
	set_process(true)
