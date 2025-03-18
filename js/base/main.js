function invert(bool) {
	gameData[bool] = !gameData[bool];
}

function getLimesButton() {
	startingMessages()
	getLimes()
	
	// Direct lore integration for lime collection
	checkForLoreDiscovery()
}

function startingMessages(){
	if (gameData.lookAround < 1) {
		gameData.collectLimesAtBeginning += 1
	}

	if (gameData.collectLimesAtBeginning <= messages.length && gameData.lookAround == 0) {
		update("newInfo", messages[gameData.collectLimesAtBeginning - 1])
	}
}

function getLimes() {
	canFindNothing = (gameData.keenEyeSkillLevel != gameData.keenEyeSkillLevelMax);
	tryToFindSomething = (beckyRandom(gameData.keenEyeSkillLevelMax) <= gameData.keenEyeSkillLevel);

	if (tryToFindSomething) {
		foundSomething()
	}
	else if ((gameData.lookAround < 1 && gameData.collectLimesAtBeginning < 2) || gameData.lookAround)
		update("newInfo", "Couldn't find any limes...")
}

function foundSomething(){
	if (canFindNothing)
		update("newInfo", "You found something!")

	if (Math.random() <= (gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax)) {
		if (Math.random() <= (gameData.limebidextrousSkillLevel / 50)) {
			addLimes ()
		}
		addLimes ()
	}
	else
		gameData.rottenLimes += gameData.bigGloves + 1
}

function addLimes () {
	gameData.limes += gameData.bigGloves + 1
	if (gameData.teachBar > 0)
		gameData.employeeCurrentSpeed += ((gameData.bigGloves + 1) * gameData.employeeSpeed) / 10
}

function stopActions() {
	gameData.currentTask = 'none'
	gameData.currentTask2 = 'none'
}

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
		backwardsCompatibility()
		gameData.versionNumber = 192
	} else
		update("newInfo", "Save File Empty.")
}

function saveGame() {
	if (ableToSave)
		localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
}

function resetGame() {
	response = window.prompt("Are you sure? Type 'yes' if you are");

	if (response == 'yes') {
		reset()
	}
	else if (response == 'cheats') {
		document.getElementById('cheats').style.display = 'block'
	}
	else if (response == 'no cheats') {
		document.getElementById('cheats').style.display = 'none'
	}
	else if (response == `'yes'`) {
		update("newInfo", "Invalid response, Epsilon. Fun fact: you can type `cheats` into the Reset Game prompt to enable them. You have achieved exclusive knowledge.")
	}
	else {
		update("newInfo", "Invalid response.")
	}
}

function reset() {
	ableToSave = false
	gameData = {}
	Object.assign(gameData, gameDataBase)
	localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
	location.reload()
}

function backwardsCompatibility() {
	if (gameData.pin == 'sellYourJuiceButton')
		gameData.pin = 'deliveryButton'
	if (gameData.versionNumber < 142) {
		gameData.currentTask = 'none'
		gameData.currentTask2 = 'none'
	}
	if (gameData.versionNumber < 187) {
		gameData.learnANewSkillBar = 0
		for (let i = 0; i < skills.length; i++) {
			gameData[skills[i].id + 'Bar'] = 0
		}
	}
	if (gameData.versionNumber < 188) {
		gameData.typeToHire = 'basic'
		gameData.typeToHireToggle = 'basic'
	}
	if (gameData.versionNumber < 189) {
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 4; y++) {
				if (gameData.diseaseArray[x][y] == 0)
					gameData.diseaseArray[x][y] = 'empty'
				if (gameData.diseaseArray[x][y] == 1)
					gameData.diseaseArray[x][y] = 'civilian'
				if (gameData.diseaseArray[x][y] == 2)
					gameData.diseaseArray[x][y] = 'disease'
				if (gameData.diseaseArray[x][y] == 3)
					gameData.diseaseArray[x][y] = 'dead'
				if (gameData.diseaseArray[x][y] == 4)
					gameData.diseaseArray[x][y] = 'lake'
			}
		}
	}
}

function lookAround() {
	switch (gameData.lookAround) {
		case 0:
			update("newInfo", "You see a nearby market.")
			gameData.lookAround = 1
			break
		case 1:
			update("newInfo", "You find a merchant willing to buy limes.")
			gameData.lookAround = 2
			break
		case 2:
			update("newInfo", "You find a merchant selling various items.")
			gameData.lookAround = 3
			break
	}
}

function changeZoomSize() {
	if (gameData.zoom >= 180) {
		gameData.zoom = 100
		document.body.style.zoom = 1.0
	}
	else {
		gameData.zoom += 20
		document.body.style.zoom = gameData.zoom / 100
	}
}

function mainGameLoopSlowBase () {
	gameData.lastSaveTime = Date.now()
	loopNumberTimePlayed += 1
	if (loopNumberTimePlayed == 2) {
		gameData.timePlayed += 1
		loopNumberTimePlayed = 0
	}
}

function onLoadBase () {

	for (let i = 0; i < baseVariables.length; i++) {
		id = baseVariables[i].id
		gameDataBase[baseVariables[i].id] = 0

		if (i > 0) {
			document.getElementById('backpackDiv').innerHTML += '<button id="currencyDisplay(' + i + ')" onClick="currencyDisplay(' + i + ')" style="width:167px">Show ' + baseVariables[i].name + '</button>'
		}

		gameDataBase[id + 'ShowVariable'] = true
		gameDataBase[id + 'UnlockedVariable'] = false

		document.getElementById('backgroundForValues').innerHTML += '<div class="stat" id="textFor' + id + 'Div" style="color:#' + baseVariables[i].color2 + '">' + baseVariables[i].name + ' </div><div class="stat" id="textFor' + id + '"  style="float: right;color:#' + baseVariables[i].color1 + '">0</div><p id="textFor' + id + 'P"> </p><br  id="textFor' + id + 'Br"/>'
	}

	gameDataBase.limes = 1

	for (let i = 1; i < mainTabs.length; i++) {
		document.getElementById('navigateButtons').innerHTML += '<button id="' + mainTabs[i].id + 'Button" style="width: 120px;margin:0px;" onclick="tab(&#39' + mainTabs[i].id + '&#39)">' + mainTabs[i].text + '</button>'
	}

	document.getElementById('textForbetaCoinsDiv').style.textDecoration = 'underline'
	document.getElementById('textForpieCoinsDiv').style.textDecoration = 'underline'

    const barsToRestart = [
      'juicer',
      'peeler',
      'advertise',
      'eat',
      'coinsToAlpha',
      'convertCoinsNow',
      'alphaToBeta',
      'findPieCustomers',
      'bakePie',
      'delivery',
      'bellows',
      'autoCollecting',
    ];

    barsToRestart.forEach(bar => {
      restartBar(bar);
    });

	gameData.teachBar = 0


	if (gameData.workingBar > 0 || gameData.employeeWorking > 0)
		runBar('working', 0.025)


	normalizeButtons()
	pinButton()

	tab(gameData.mainTab)
    tabMarket(gameData.marketTab)
    tabTasks("earn")
    tabScience("research")
	tabOptions("gameOptions")
}



function tabOptions(tabby) {
    hide("gameOptions")
    hide("uiOptions")
    hide("statsOptions")
    document.getElementById(tabby).style.display = "block"
}

function tabMarket(tabby) {
	gameData.marketTab = tabby
	tabManager('marketMain')
	tabManager('hiringArea')
	tabManager('travel')
	hide('trade')
	setColor("tradeButton", "#FDFF9A")
	setColor(tabby + "Button", "#898989")
	document.getElementById(tabby).style.display = "block"
	if (tabby == 'trade')
		setColor(tabby + "Button", "#FCFF4E")


	function tabManager(id) {
		hide(id)
		setColor(id + "Button", "#BBBBBB")
	}
}


function updateValuesBase () {
	if (gameData.sfxOn) {
		update('sfxToggleButton', '♪ On')
		sfxToggleButton.style.backgroundColor = '#4DFE89'
	} else {
		update('sfxToggleButton', '♪ Off')
		sfxToggleButton.style.backgroundColor = '#898989'
	}

	if (gameData.showDonationButton) {
        update('showDonationButton', 'Donation Button Shown')
    }
    else {
        update('showDonationButton', 'Donation Button Hidden')
    }

    checkShow(gameData.showDonationButton, "donationButton")

	for (let i = 0; i < baseVariables.length; i++) {
		id = baseVariables[i].id
		elem = "textFor" + id
		if (gameData[id] > 1e9)
			val = gameData[id].toExponential(3)
		else
			val = gameData[id].toLocaleString()

		doShow = (gameData[id + 'UnlockedVariable'] && gameData[id + 'ShowVariable']) || id == 'limes'

		checkShow(doShow, elem + 'Div')
		checkShow(doShow, elem + 'Br')
		checkShow(doShow, elem + 'P')
		checkShow(doShow, elem)

		update(elem, val)
	}

	for (let i = 1; i < baseVariables.length; i++) {
		if (gameData[baseVariables[i].id] > 0)
			gameData[baseVariables[i].id + 'UnlockedVariable'] = true

		checkShow(gameData[baseVariables[i].id + 'UnlockedVariable'], 'currencyDisplay(' + i + ')', 'inline')
	}

	startCurrentTask(gameData.currentTask)
	startCurrentTask(gameData.currentTask2)

	toggleAesthetic("toggleActions")

    if (gameData.coins > gameData.coinsMax)
        gameData.coins = gameData.coinsMax

    overMaximum("baskets")
    overMaximum("juicers")
    overMaximum("peelers")

	function overMaximum(x) {
		if (gameData[x] > gameData[x + 'Max'])
			gameData[x] = gameData[x + 'Max']
	}

	preventNegative('coins')
	preventNegative('limes')
	preventNegative('respect')

	function preventNegative(id) {
		if (gameData[id] < 0)
			gameData[id] = 0
	}

	gameData.juicePricePrice = gameData.juicePriceCents + 1
	gameData.nourishmentPrice = Math.pow(10, gameData.nourishment);

	update('textForTimePlayed', 'Total Time Played: ' + gameData.timePlayed.toLocaleString() + ' Seconds')
	update('endStats', 'Total Time Played: ' + gameData.timePlayed.toLocaleString() + ' Seconds')




	if (gameData.employeeWorking > 0)
		update('workingEmployee', 'Working time left: ' + gameData.employeeWorking.toLocaleString() + ' / 10 minutes.')
	else
		update('workingEmployee', 'Employee is idle.')


	var x = document.getElementsByClassName('pinButton')
	if (gameData.pinUnlock == 1) {
		for (i = 0; i < x.length; i++) {
			x[i].style.display = 'inline-block'
		}
	}
	else {
		for (i = 0; i < x.length; i++) {
			x[i].style.display = 'none'
		}
	}


	for (i = 0; i <= 3; i++) {
		checkShow(gameData.tomes == i, 'tomeDiv' + (i + 1))
	}

    const conditions = [
      { condition: gameData.lookAround > 1, elementId: 'sellYourLimesDiv' },
      { condition: gameData.lookAround > 2 && !(gameData.hideMaxedPurchases && gameData.juicers == gameData.juicersMax), elementId: 'buyAJuicerDiv' },
      { condition: gameData.lookAround > 2 && !(gameData.hideMaxedPurchases && gameData.baskets == gameData.basketsMax), elementId: 'buyABasketDiv' },
      { condition: gameData.tomes > 3, elementId: 'goldenBarDiv' },
      { condition: !gameData.pinUnlock, elementId: 'pinUnlockDiv' },
      { condition: gameData.pieBucket && gameData.pieFlourBucket, elementId: 'bucketThinSteelPlating' },
      { condition: gameData.maps == 0, elementId: 'buyAMapDiv1' },
      { condition: gameData.maps == 1, elementId: 'buyAMapDiv2' },
      { condition: gameData.maps == 2, elementId: 'buyAMapDiv3' },
      { condition: gameData.maps == 3, elementId: 'buyAMapDiv4' },
      { condition: gameData.maps == 4, elementId: 'buyAMapDiv5' },
      { condition: gameData.bulkBuyUnlock, elementId: 'basketsBulkButton', display: 'inline' },

	//Map Unlocks
      { condition: gameData.maps > 0 || gameData.villageNumber > 1, elementId: 'marketMainButtonsDiv', display: 'inline' },
      { condition: gameData.maps > 0, elementId: 'marketStore', display: 'block' },

      { condition: gameData.maps > 1, elementId: 'hiringAreaButton', display: 'inline' },
      { condition: gameData.maps > 1 && !gameData.storageUnlock, elementId: 'storageUnlockDiv' },
      { condition: gameData.maps > 1 && gameData.storageUnlock && !(gameData.storageJuicersUnlock && gameData.storagePeelersUnlock), elementId: 'storageDiv' },
      { condition: gameData.maps > 1 && !gameData.bulkBuyUnlock, elementId: 'bulkBuyUnlockDiv' },
      { condition: gameData.maps > 1 && gameData.bulkBuyUnlock && !gameData.bulkBuyUnlock2, elementId: 'bulkBuyUnlock2Div' },

      { condition: gameData.maps > 2, elementId: 'travellingArea' },
      { condition: gameData.maps > 2 && !gameData.fasterTransport, elementId: 'fasterTransportDiv' },
      { condition: gameData.maps > 2, elementId: 'increaseJuicePrice' },
      { condition: gameData.maps > 2 || gameData.villageNumber > 1, elementId: 'travelButton', display: 'inline' },

      { condition: gameData.maps > 3 && !gameData.respectBillboard, elementId: 'respectBillboard'},
      { condition: gameData.maps > 3, elementId: 'tasksButton' },
      { condition: gameData.maps > 3 && !gameData.autoCurrencyConversionBuy, elementId: 'autoCurrencyConversion' },

      { condition: gameData.maps > 4 && gameData.basicAlphaToBetaBroker, elementId: 'basicAlphaToBetaBrokerRule' },
      { condition: gameData.maps > 4 && !gameData.basicAlphaToBetaBroker, elementId: 'basicAlphaToBetaBroker' },
      { condition: gameData.maps > 4, elementId: 'buyPie' },

      { condition: gameData.lookAround != 3, elementId: 'lookAroundButton', display: 'inline' },
      { condition: gameData.villageNumber > 1 || gameData.betterTraining || gameData.increaseJuicePricePermanance, elementId: 'megaCoinUpgradesButton' },
      { condition: !gameData.forestWell, elementId: 'buyAWell' },
      { condition: gameData.respectMilestone10000 && !gameData.rottenActualWisdom, elementId: 'rottenActualWisdom' },
      { condition: !gameData.storagePeelersUnlock, elementId: 'storagePeelersDiv' },
      { condition: !gameData.storageJuicersUnlock, elementId: 'storageJuicersDiv' },
      { condition: !gameData.changeResearchersBy10Unlock, elementId: 'changeResearchersBy10Unlock' },
      { condition: !gameData.endScreen, elementId: 'sublimeMain'},
      { condition: !gameData.endScreen, elementId: 'sublimeMain'},
      { condition: gameData.endScreen, elementId: 'endScreen'},
      { condition: gameData.lookAround, elementId: 'navigateButtons', display: 'visible'}
    ];

    conditions.forEach(({ condition, elementId, display }) => {
      checkShow(condition, elementId, display);
    });


	updateBar('teach')
	updateBar('working')


	if (gameData.hideMaxedPurchases)
		update('hideMaxedPurchasesButton', 'Maxed Purchases Hidden')
	else
		update('hideMaxedPurchasesButton', 'Maxed Purchases Shown')

	if (gameData.bulkBuyUnlock2) {
		update('peelersBulkButton', 'x100')
		update('basketsBulkButton', 'x100')
		update('juicersBulkButton', 'x100')
	}

	if (gameData.forestWell)
		update('textForlimesDiv', '&#39Limes&#39')
}
