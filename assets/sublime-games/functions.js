//Save Functions :)

function reset() {
	ableToSave = false
	game = {}
	Object.assign(game, gameBase)
	localStorage.setItem('mathAdventureSave', JSON.stringify(game))
	location.reload()
}

function importGame() {
	var savegame = JSON.parse(atob(prompt("Import Code: ")))
	if (savegame !== null) {
		loadGame(savegame)
		saveGame()
		location.reload()
	}
}

function loadGame(savegame) {
	Object.assign(game, gameBase)
	if (savegame !== null) {
		Object.assign(game, savegame)
		backwardsCompatibility()
		game.versionNumber = 192
	} else
		update("newInfo", "Save File Empty.")
}

function saveGame() {
	if (ableToSave)
		localStorage.setItem('mathAdventureSave', JSON.stringify(game))
}

//Helper Functions :)
function invert(bool) {
	game[bool] = !game[bool];
}

function hide(id) {
	document.getElementById(id).style.display = 'none';
}

function toggle(x) {
	if (game[x] === 0) {
	  game[x] = 1;
	} else {
	  game[x] = 0;
	}
}

function beckyRandom(max) {
	return Math.floor(Math.random() * max) + 1;
}

function beckyRandomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function checkShow(x, id, style) {
	const element = document.getElementById(id);
	if (style === 'visible') {
			element.style.visibility = x ? 'visible' : 'hidden';
	} else {
			element.style.display = x ? (style === 'inline' ? 'inline-block' : 'block') : 'none';
	}
}