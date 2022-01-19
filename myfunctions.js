function importGame() {
	var savegame = JSON.parse(atob(prompt("Import Code: ")))
	if (savegame !== null) {
		loadStuff(savegame)
		saveGame()
		location.reload()
	}
}

function loadStuff(savegame) {
	Object.assign(gameData, gameDataBase)
	if (savegame !== null) {
		Object.assign(gameData, savegame)
		backwardsCompatibility(gameData.versionNumber)
		gameData.versionNumber = 180
		updateAfterLoad()
	} else
		update("newInfo", "Save File Empty.")
}

function saveGame() {
	if (ableToSave)
		localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
}

function resetGame() {
	if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		ableToSave = false
		Object.assign(gameData, gameDataBase)
		localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
		location.reload()
	}
}

function backwardsCompatibility(versionNumber) {
	if (gameData.pin == 'sellYourJuiceButton')
		gameData.pin = 'deliveryButton'
	if (gameData.versionNumber < 142) {
		gameData.currentTask = 'none'
		gameData.currentTask2 = 'none'
	}
}

function hide(id) {
	document.getElementById(id).style.display = 'none'
}

function pin(x) {
	if (gameData.pin == x && gameData.pin !== "none") {
		gameData.pin = "none"
	} else
		gameData.pin = x
	normalizeButtons()
	pinButton()
}

function normalizeButtons() {
	var x = document.getElementById("deliveryButton")
	$(".juiceMarket").prepend(x)
	x.style.width = "120px"
	x.style.margin = "5px"

	x = document.getElementById("autoCollectingButton")
	$(".autoCollectingDiv").prepend(x)
	x.style.width = "150px"
	x.style.margin = "5px"
}

function pinButton() {
	if (gameData.pin !== "none") {
		var x = document.getElementById(gameData.pin)
		$(".navigateButtons").append(x)

		x.style.width = "120px"
		x.style.margin = "0px"
		x.style.padding = "0px"
	}
}

function pickCurrentTask(x) {
	taskOne = gameData.currentTask
	taskTwo = gameData.currentTask2

	if (!event.shiftKey && gameData.toggleActions) {

		if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax) {
			if (taskOne == x && taskOne !== "none" && taskTwo !== x)
				gameData.currentTask = "none"
			else if (taskOne == "none" && taskTwo !== x) {
				if (!((taskTwo == 'makeJuice' && x == 'makeMaxJuice') || (taskTwo == 'makeMaxJuice' && x == 'makeJuice') || (taskTwo == 'usePeelers' && x == 'useMaxPeelers') || (taskTwo == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask = x
			} else if (taskTwo == x && taskTwo !== "none")
				gameData.currentTask2 = "none"
			else if (taskTwo == "none") {
				if (!((taskOne == 'makeJuice' && x == 'makeMaxJuice') || (taskOne == 'makeMaxJuice' && x == 'makeJuice') || (taskOne == 'usePeelers' && x == 'useMaxPeelers') || (taskOne == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask2 = x
			}
		} 
		else {
			if (taskOne == x && taskOne !== "none")
				gameData.currentTask = "none"
			else
				gameData.currentTask = x
		}
	} 
	else
		startCurrentTask(x)
}

function pickCurrentSkill(x) {
	if (gameData.toggleActions && !event.shiftKey && gameData.multitasking) {
		if (gameData.currentSkill == x && gameData.currentSkill !== "none")
			gameData.currentSkill = "none"
		else
			gameData.currentSkill = x
	} else
		barStartGranularSkillBasic(x, true)
}

function startCurrentTask(x) {
	if(x !== 'none')
		eval(x + '()')
}

function updateBar(x) {
    i = x + "Bar"
    var elem = document.getElementById(i)
	
	if(gameData[i] > 100)
		gameData[i] = 100

    elem.style.width = gameData[i] + "%"
    elem.innerHTML = "" + Math.ceil(gameData[i]) + "%"
}

function toggle(x) {
	if (gameData[x] == 0)
		gameData[x] = 1
	else
		gameData[x] = 0
}

function basicBuy(id, price) {
	if (gameData.coins >= price) {
		gameData.coins -= price
		gameData[id] += 1
	}
}

function universalBuy(id, price, currency) {
	if (gameData[currency] >= price) {
		gameData[currency] -= price
		gameData[id] += 1
	}
}

function bulkableBuyMax(x, price) {
	max = gameData[x + 'Max']
	if (gameData[x + 'BulkToggle'] == 0)
		amount = 1
	else {
		if (gameData.bulkBuyUnlock2)
			amount = 100
		else
			amount = 10
	}
	if (gameData.coins >= price * amount) {
		if (gameData[x] <= max - amount) {
			gameData.coins -= price * amount
			gameData[x] += amount
		} else {
			gameData.coins -= price * (max - gameData[x])
			gameData[x] = max
		}
	}
}

// returns a random integer from 1 to X
function beckyRandom(max) {
	return Math.floor(Math.random() * max) + 1;
}

// returns a random integer from X to Y
function beckyRandomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function barStart(variable) {
	bar = variable + "Bar"
	if (gameData[bar] == 100 || gameData[bar] == 0) {
		gameData[bar] = 0
		eval(bar + "()")
	}
}

hasUpdatedObj = {}

function update(id, content) {
	stringy = id.replace(/[()-]/g, 'uwu')

	if (typeof hasUpdatedObj[stringy] == undefined)
		hasUpdatedObj[stringy] = 'noneOwO'
	
	if (hasUpdatedObj[stringy] != content) {
		document.getElementById(id).innerHTML = content
		hasUpdatedObj[stringy] = content
	}
}

function currencyDisplay(id) {
	variable = mainVariables[id] + 'ShowVariable'
	if (gameData[variable])
		gameData[variable] = false
	else
		gameData[variable] = true
}

function upperFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function divVisibility(id, display) {
	document.getElementById(id).style.visibility = display;
}

function show(id, x) {
	if (x == 'inline')
		document.getElementById(id).style.display = 'inline-block'
	else
		document.getElementById(id).style.display = 'block'
}

function colorChanger(id, content) {
	document.getElementById(id).style.backgroundColor = content
}

function decreaseValue(id) {
	if (gameData[id] >= 1)
		gameData[id] -= 1
}

function checkShow (x, id, style) {
	if (x) {
		if (style == 'inline')
			document.getElementById(id).style.display = 'inline-block'
		else
			show(id)
	}
	else
		hide(id)
}