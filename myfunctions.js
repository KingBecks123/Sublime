function importGame() {
	var savegame = JSON.parse(atob(prompt("Import Code: ")))
	if (savegame !== null) {
		loadStuff(savegame)
		console.log('loaded')
		saveGame()
		console.log('saved')
		location.reload();
	}
}

function loadStuff(savegame) {
	Object.assign(gameData, gameDataBase)
	if (savegame !== null) {
		Object.assign(gameData, savegame)
		
		gameData.serf = JSON.parse(JSON.stringify(gameDataBase.serf))
		Object.assign(gameData.serf, savegame.serf)
		
		backwardsCompatibility(gameData.versionNumber)
		gameData.versionNumber = 163
		updateAfterLoad()
	} else {
		update("newInfo", "Save File Empty.")
	}
}

function saveGame() {
	localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
}

function preventNegative(id) {
	if (gameData[id] < 0) {
		gameData[id]
	}
}

function setRotation(id, number) {
	document.getElementById(id).style.transform = 'rotate(' + number + 'deg)'
}

function hide(x) {
	tabs(x, "none")
}

function show(x, type) {
	if (type == 'inline')
		tabs(x, "inline-block")
	else
		tabs(x, "block")

}

function pin(x) {
	if (gameData.pin == x && gameData.pin !== "none") {
		gameData.pin = "none"
	} else {
		gameData.pin = x
	}
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

	if (!event.shiftKey && gameData.dontToggle) {

		if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax) {
			if (taskOne == x && taskOne !== "none" && taskTwo !== x) {
				gameData.currentTask = "none"
			} else if (taskOne == "none" && taskTwo !== x) {
				if (!((taskTwo == 'makeJuice' && x == 'makeMaxJuice') || (taskTwo == 'makeMaxJuice' && x == 'makeJuice') || (taskTwo == 'usePeelers' && x == 'useMaxPeelers') || (taskTwo == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask = x
			} else if (taskTwo == x && taskTwo !== "none") {
				gameData.currentTask2 = "none"
			} else if (taskTwo == "none") {
				if (!((taskOne == 'makeJuice' && x == 'makeMaxJuice') || (taskOne == 'makeMaxJuice' && x == 'makeJuice') || (taskOne == 'usePeelers' && x == 'useMaxPeelers') || (taskOne == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask2 = x
			}
		} else {
			if (taskOne == x && taskOne !== "none") {
				gameData.currentTask = "none"
			} else {
				gameData.currentTask = x
			}
		}
	} else {
		startCurrentTask(x)
	}

}

function pickCurrentSkill(x) {
	if (gameData.dontToggle && !event.shiftKey && gameData.multitasking) {
		if (gameData.currentSkill == x && gameData.currentSkill !== "none") {
			gameData.currentSkill = "none"
		} else {
			gameData.currentSkill = x
		}
	} else {
		barStartGranularSkillBasic(x, true)
	}
}

function startCurrentTask(x) {
	if(x !== 'none')
		eval(x + '()')
}

function showOrHideSkill(x) {
	div = x + "Div"

	if (gameData.hideCompletedSkills == 1 && gameData[x + 'SkillLevel'] == gameData[x + 'SkillLevelMax'])
		hide(div)
	else
		show(div)

}

function overMaximum(x) {
	if (gameData[x] > gameData[x + 'Max']) {
		gameData[x] = gameData[x + 'Max']
	}
}

function toggleAesthetic(input) {

	button = input + "Button"

	if (gameData[input] == 1) {
		document.getElementById(button).style.backgroundColor = accent3
	} else {
		document.getElementById(button).style.backgroundColor = accent2
	}

}

function basicToggle(input, type) {
	info = input + type
	button = info + "Button"
	x = document.getElementsByClassName(info);

	if (gameData[info + 'Toggle']) {
		colorChanger(button, accent3)
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "block"
		}
	} else {
		colorChanger(button, accent2)
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none"
		}
	}
}

function moveBar(x) {
    i = x + "Bar"
	if(gameData[i] > 100)
		gameData[i] = 100

    var elem = document.getElementById(i);
    elem.style.width = gameData[i] + "%";
    elem.innerHTML = "  " + Math.ceil(eval("gameData." + i)) + "%";
}

function toggle(x) {
	if (gameData[x] == 0) {
		gameData[x] = 1
	} else {
		gameData[x] = 0
	}
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

function addResearchers(id, amount) {
	if (amount > 0) {
		if (researchersAvailable - amount >= 0) {
			gameData[id + "Researchers"] += amount
			researchersAvailable -= amount
		} else {
			gameData[id + "Researchers"] += researchersAvailable
			researchersAvailable = 0
		}
	} else if (amount < 0 && gameData[id + "Researchers"] > 0) {
		if (researchersAvailable - amount <= gameData.researchers) {
			gameData[id + "Researchers"] += amount
			researchersAvailable -= amount
		} else {
			researchersAvailable += gameData[id + "Researchers"]
			gameData[id + "Researchers"] = 0
		}
	}
}

function hireResearcher() {
	if (gameData.megaCoins >= 1) {
		gameData.megaCoins -= 1
		gameData.researchers += 1
	}
}

function bulkableBuyMax(x, price) {
	max = gameData[x + 'Max']
	if (gameData[x + 'BulkToggle'] == 0) {
		amount = 1
	} else {
		if (gameData.bulkBuyUnlock2) {
			amount = 100
		} else {
			amount = 10
		}
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



function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function update(id, content) {
	document.getElementById(id).innerHTML = content
}

function updateNumber(id) {
	elem = "textFor" + jsUcfirst(id)
	valRaw = gameData[id]

	if (valRaw > 1e9)
		val = valRaw.toExponential(3)
	else
		val = valRaw.toLocaleString()

	if ((gameData[id + 'UnlockedVariable'] && gameData[id + 'ShowVariable']) || id == 'limes') {
		show(elem + 'Div')
		show(elem + 'Br')
		show(elem + 'P')
		show(elem)
	} else {
		hide(elem + 'Div')
		hide(elem + 'Br')
		hide(elem + 'P')
		hide(elem)
	}
	
	update(elem, val)
}


function updateAreaNumbers() {
	for (let i = 0; i < avs.length; i++) {
		for (let j = 0; j < avs[i].v.length; j++) {
			id = avs[i].v[j].id
			elem = "textFor" + avs[i].name + avs[i].v[j].name
			valRaw = gameData[avs[i].area][avs[i].v[j].id]

			if (valRaw > 1e9)
				val = valRaw.toExponential(3)
			else
				val = valRaw.toLocaleString()

			if ((gameData[id + 'UnlockedVariable'] && gameData[id + 'ShowVariable']) || j == 0) {
				show(elem + 'Div')
				show(elem + 'Br')
				show(elem + 'P')
				show(elem)
			} else {
				hide(elem + 'Div')
				hide(elem + 'Br')
				hide(elem + 'P')
				hide(elem)
			}
			
			update(elem, val)
		}
	}

}

function currencyDisplay(id) {
	variable = mainVariables[id] + 'ShowVariable'
	if (gameData[variable])
		gameData[variable] = false
	else
		gameData[variable] = true
}

function jsUcfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function divVisibility(id, display) {
	document.getElementById(id).style.visibility = display;
}

function tabs(id, content) {
	document.getElementById(id).style.display = content;
}

function colorChanger(id, content) {
	document.getElementById(id).style.backgroundColor = content;
}

function colorChangerText(id, content) {
	document.getElementById(id).style.color = content;
}

function checkShow(i, n, txt) {
	if (i >= n) {
		show(txt)
	}
}

function checkHide(i, txt) {
	if (i > 0)
		hide(txt)
}

function checkShow(i, txt) {
	if (i >= 1)
		show(txt)
}

function increaseValue(id) {
	if (gameData[id] < gameData[id + 'Max'] || gameData[id + 'Max'] == null) {
		gameData[id] += 1
	}
}

function decreaseValue(id) {
	if (gameData[id] >= 1) {
		gameData[id] -= 1
	}
}

function checkShowOrHide(i, txt) {
	if (i >= 1) {
		show(txt)
	} else {
		hide(txt)
	}
}

function checkShowSmart(i, txt) {
	if (gameData[i] >= 1) {
		show(txt)
	} else {
		hide(txt)
	}
}

function checkHideOrShow(i, txt) {
	if (i >= 1) {
		hide(txt)
	} else {
		show(txt)
	}
}

function saveBeforeWipe(id) {
	eval(id + 'Now = gameData.' + id)
}

function saveAfterWipe(id) {
	eval('gameData.' + id + '=' + id + 'Now')
}

function exportGame() {
	update("exportCode", btoa(JSON.stringify(gameData)))
}

function resetGame() {
	if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		Object.assign(gameData, gameDataBase)
		localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
		location.reload();
	}
}

function backwardsCompatibility(versionNumber) {
	if (gameData.pin == 'sellYourJuiceButton')
		gameData.pin = 'deliveryButton'
	
	if (gameData.versionNumber < 142)
	{
		gameData.currentTask = 'none'
		gameData.currentTask2 = 'none'
	}
}

function setValue(id, amount) {
	gameData[id] = amount
}