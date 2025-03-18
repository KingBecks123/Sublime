//Save Functions :)

function reset() {
	ableToSave = false
	game = {}
	Object.assign(game, gameBase)
	localStorage.setItem('mathAdventureSave', JSON.stringify(game))
	location.reload()
}