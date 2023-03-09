function gameStart() {
    loadStuff(JSON.parse(localStorage.getItem("mathAdventureSave")))
	
	secondsOffline = Math.floor((Date.now() - gameData.lastSaveTime) / 1000)
	onLoadSkills ()
	onLoadBase ()
	onLoadField ()
	onLoadForest ()
	onLoadCompany ()
	onLoadTasks ()	
	onLoadScience ()
	onLoadTravel ()

    mainGameLoop()
    mainGameLoopSlow()
	
	if (localStorage.getItem("mathAdventureSave") == null) {
		reset()
	}
	
	updateValues()
	
	function mainGameLoop() {
		mainGameLoopForest()
		mainGameLoopInventory()
		setTimeout(mainGameLoop, 50)
	}

	function mainGameLoopSlow() {
		mainGameLoopSlowBase()
		mainGameLoopSlowBrokers()
		mainGameLoopSlowBakery()

		updateMapTileAesthetic()
		saveGame()
		setTimeout(mainGameLoopSlow, 500)
	}
	
	function updateValues() {
		updateValuesSkills ()
		updateValuesForest ()
		updateValuesInventory ()
		updateValuesBase ()
		updateValuesTravel ()
		updateValuesBrokers ()
		updateValuesTasks ()
		updateValuesDelivery ()
		updateValuesField ()
		updateValuesScience ()
		updateValuesBakery ()
		updateValuesCompany ()

		setTimeout(updateValues, 15)
	}
}

function restartBar(x) {
	if (gameData[x + 'Bar'] > 0)
		window[x + 'Bar']()
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
		tryToStartSkill(x, true)
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

function smartBarStart (id, amount) {
	if (gameData[id + "Bar"] == 0)
		runBar(id, amount)
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
	variable = baseVariables[id].id + 'ShowVariable'
	if (gameData[variable])
		gameData[variable] = false
	else
		gameData[variable] = true
}

function upperFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function colorChanger(id, content) {
	document.getElementById(id).style.backgroundColor = content
}

function decreaseValue(id) {
	if (gameData[id] >= 1)
		gameData[id] -= 1
}

function checkShow (x, id, style) {
	if (style == 'visible') {
		if (x) {
			document.getElementById(id).style.visibility = 'visible'
		}
		else
			document.getElementById(id).style.visibility = 'hidden'
	}
	else {
		if (x) {
			if (style == 'inline')
				document.getElementById(id).style.display = 'inline-block'
			else
				document.getElementById(id).style.display = 'block'
		}
		else
			hide(id)
	}
}

function runBar(id, amount) {	
	if (gameData[id + 'Bar'] < 100) {
		gameData[id + 'Bar'] += amount
		setTimeout(runBar, 15 / gameData.tickspeed, id, amount)
	}
	else {
		gameData[id + 'Bar'] = 0
		window[id + 'BarEnd']()
	}
	updateBar(id)
}

function basicToggle(input) {
	x = document.getElementsByClassName(input)

	if (gameData[input + 'Toggle']) {
		color = "#4DFE89"
		display = 'block'
	} else {
		color = "gray"
		display = 'none'
	}
	
	colorChanger(input + "Button", color)
	for (i = 0; i < x.length; i++) {
		x[i].style.display = display
	}
}

function currentTaskAesthetic(x) {
	button = x + "Button"
	if (gameData.currentTask == x || gameData.currentTask2 == x)
		colorChanger(button, "#C67848")
	else
		colorChanger(button, "#DEAD85")
}

function ifMaxDarkGray(x) {
	button = "buyA" + upperFirstChar(x) + "Button"

	if (gameData[x + 's'] == gameData[x + 'sMax'])
		colorChanger(button, "#50514F")
	else
		colorChanger(button, "#DEAD85")
}

function toggleAesthetic(input) {
	if (gameData[input] == 1)
		color = "#4DFE89"
	else
		color = "gray"
	colorChanger(input + "Button", color)
}