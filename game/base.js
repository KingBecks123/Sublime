mainTabs = [
	{
		id: 'options',
		text: 'Options',
		color1: 'BBBBBB',
		color2: '898989'
	},
	{
		id: 'market',
		text: 'Market',
		color1: 'BBBBBB',
		color2: '898989'
	},
]

baseVariables = [
	{
		id: 'limes',
		name: 'Limes',
		color1: '00B300',
		color2: '00FF01',
	},
	{
		id: 'coins',
		name: 'Coins',
		color1: 'AEB301',
		color2: 'F8FF01',
	},
]


var gameDataBase = {
	coinsMax: 1e6,
    juiceBulkAmount: 1,
    deliveryBar: 0,
    exploreLevel: 0,
    lookAround: 0,
    learnANewSkillBar: 0,
    learnANewSkill: -2,
    teachBar: 0,
    workingBar: 0,
    advertiseBar: 0,
    advertise: 0,
    maps: 0,
    tomes: 0,
    applicationReady: 0,
    aesthetic: 0,
    hasGottenJuice: 0,
    basketBar: 0,
    baskets: 0,
    basketInfoToggle: 1,
    basketsMax: 50,
    juicersMax: 100,
    peelersMax: 500,
    firstApplicant: 1,
    teachInfoToggle: 0,
    sellingPieInfoToggle: 1,
    employeeStatsInfoToggle: 0,
    bulkBuyUnlock: 0,
    bulkBuyUnlock2: 0,
    storageUnlock: 0,
    basketsBulkToggle: 0,
	nationalJuiceMarketing: 0,
	multitasking: 0,
	currentSkill: 'none',
	increaseJuicePricex10: 0,
    versionNumber: 0,
    hideCompletedSkills: 0,
    hideMaxedPurchases: 0,
    fasterTransport: 0,
    sharperPeelers: 0,
    bigGloves: 0,
    villageNumber: 1,
    nutritionists: 0,
    megaCoinsInBank: 0,
    megaCoinsInBankMax: 20,

    hasAdvertised: 0,
    betterTraining: 0,
	upgradeMoreStorage: 0,
    bachelorsDegreeFinance: 0,
    benevolence: 0,
    benevolenceBar: 0,
    benevolenceResearchers: 0,
    unlockBenevolence: 0,
	benevolenceToggle: 1,
    diseaseTileSize: 1,
	autoPlaceACivilian: 0,
	increaseJuicePricePermanance: 0,
	changeResearchersBy10Unlock: 0,
    silkRobe: 0,
    numberOfTiles: 16,
    juiceBulkAmountMax: 100,
    entrepreneurialCertificates: 0,
    juicePricePrice: 1,
    juicePriceCents: 0,
    deliveryManager: 0,
    nourishment: 0,
    fork: 0,
    shoes: 0,
    pin: "none",
    pinUnlock: 0,
	hideKnife: 0,
	manuscripts: 0,
	collectLimesAtBeginning: 0,
    currentTask: "none",
    currentTask2: "none",
	toggleActions: 0,

	creditScore2: 0,
	creditScore3: 0,
	coinsToAlphaBar: 0,
	isCoinsToAlphaBar: 0,
	smarterAdvertisingManagerBroker: 0,
	convertedCoinsSinceTravel: 0,

	lastSaveTime: Date.now(),
	buyMegaCoinsTimes: 0,
	buyMegaCoinsTimesMax: 10,
	changeZoomSize: 100,

	currencyApplicationReady: 0,
	applicationType: 'basic',
	unlockCurrencyBrokers: 0,
	typeToHire: 'basic',
	typeToHireToggle: 'basic',
	doesHaveCurrencyBroker: 0,
	convertCoinsNowBar: 0,
	basketScarecrow: 0,
	surveillanceCamera: 0,
	surveillanceCamera2: 0,
	skillTrainer: 0,
	timePlayed: 0,
	saveAlphaCoinsUnlock: 0,
    isOptionsOpen: 0,
	transferAlphaCoinsBulkUnlock: 0,
	lightRobe: 0,
	rottenActualWisdom: 0,

	goldenLimesInBaskets: 0,
	eatGoldenLimeBar: 100,
	bitterSpeeding: 0,
	forestWell: 0,
	pieCoinsInWell: 0,
	trainTransport: 0,
    tickspeed: 1,
	mainTab: 'null',
	marketTab: 'marketMain',
	endScreen: 0,
	showDonationButton: true,
}

var gameData = {}

ableToSave = true

var loopNumberTimePlayed = 0

function hideDonationButton() {
    if (gameData.showDonationButton)
        gameData.showDonationButton = false

    else
        gameData.showDonationButton = true
}

function getLimesButton() {
	if (gameData.lookAround < 1) {
		gameData.collectLimesAtBeginning += 1
	}

	if (gameData.collectLimesAtBeginning <= messages.length && gameData.lookAround == 0) {
		update("newInfo", messages[gameData.collectLimesAtBeginning - 1])
	}

	getLimes()
}

function getLimes() {
	if (beckyRandom(gameData.keenEyeSkillLevelMax) <= gameData.keenEyeSkillLevel) {
		if (gameData.keenEyeSkillLevel != gameData.keenEyeSkillLevelMax)
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
	else if ((gameData.lookAround < 1 && gameData.collectLimesAtBeginning < 2) || gameData.lookAround)
		update("newInfo", "Couldn't find any limes...")

	function addLimes () {
		gameData.limes += gameData.bigGloves + 1
		if (gameData.teachBar > 0)
			gameData.employeeCurrentSpeed += ((gameData.bigGloves + 1) * gameData.employeeSpeed) / 10
	}
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
	if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		reset()
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
    if (gameData.lookAround < 1)
        update("newInfo", "Maybe I should keep looking around...")

    if (gameData.lookAround == 0) {
            update("newInfo", "You see a nearby market.")
            gameData.lookAround = 1
    }
	else if (gameData.lookAround == 1) {
            update("newInfo", "You find a merchant willing to buy limes.")
            gameData.lookAround = 2
    }
	else if (gameData.lookAround == 2) {
            update("newInfo", "You find a merchant selling various items.")
            gameData.lookAround = 3
    }
}

function changeZoomSize() {
	if (gameData.changeZoomSize >= 180) {
		gameData.changeZoomSize = 100
		document.body.style.zoom = 1.0
	}
	else {
		gameData.changeZoomSize += 20
		document.body.style.zoom = gameData.changeZoomSize / 100
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
			document.getElementById('backpackDiv').innerHTML += '<button class="specialButton" id="currencyDisplay(' + i + ')" onClick="currencyDisplay(' + i + ')" style="width:167px">Show ' + baseVariables[i].name + '</button>'
		}

		gameDataBase[id + 'ShowVariable'] = true
		gameDataBase[id + 'UnlockedVariable'] = false

		document.getElementById('backgroundForValues').innerHTML += '<div class="stat" id="textFor' + id + 'Div" style="color:#' + baseVariables[i].color2 + '">' + baseVariables[i].name + ' </div><div class="stat" id="textFor' + id + '"  style="float: right;color:#' + baseVariables[i].color1 + '">0</div><p id="textFor' + id + 'P"> </p><br  id="textFor' + id + 'Br"/>'
	}

	gameDataBase.limes = 1

	for (let i = 1; i < mainTabs.length; i++) {
		document.getElementById('navigateButtons').innerHTML += '<button id="' + mainTabs[i].id + 'Button" style="width: 120px" onclick="tab(&#39' + mainTabs[i].id + '&#39)">' + mainTabs[i].text + '</button>'
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
	theColor = 'rgba(0, 0, 0, 0)'

    if (gameData.showDonationButton) {
        update('showDonationButton', 'Donation Button Shown')
    }
    else {
        update('showDonationButton', 'Donation Button Hidden')
    }

    checkShow(gameData.showDonationButton, "donationButton")

	barTypes = ['skillBar', 'verticalBar', 'skillBarColored', 'smallContainerBar']

	for (j = 0; j < barTypes.length; j++) {
		var x = document.getElementsByClassName(barTypes[j])
		for (i = 0; i < x.length; i++) {
			x[i].style.color = theColor
		}
	}

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
      { condition: gameData.lookAround >= 3 && !(gameData.hideMaxedPurchases == 1 && gameData.juicers == gameData.juicersMax), elementId: 'buyAJuicerDiv' },
      { condition: gameData.lookAround >= 3 && !(gameData.hideMaxedPurchases == 1 && gameData.baskets == gameData.basketsMax), elementId: 'buyABasketDiv' },
      { condition: gameData.tomes > 3, elementId: 'goldenBarDiv' },
      { condition: !gameData.pinUnlock, elementId: 'pinUnlockDiv' },
      { condition: gameData.pieBucket && gameData.pieFlourBucket, elementId: 'bucketThinSteelPlating' },
      { condition: gameData.maps == 0, elementId: 'buyAMapDiv1' },
      { condition: gameData.maps == 1, elementId: 'buyAMapDiv2' },
      { condition: gameData.maps == 2, elementId: 'buyAMapDiv3' },
      { condition: gameData.maps == 3, elementId: 'buyAMapDiv4' },
      { condition: gameData.maps == 4, elementId: 'buyAMapDiv5' },
      { condition: gameData.hasAdvertised && !gameData.surveillanceCamera, elementId: 'offlineEmployee' },
      { condition: gameData.advertisingLevel1, elementId: 'advertisingMethods' },
      { condition: !gameData.advertisingLevel1 && gameData.hasAdvertised, elementId: 'researchBetterAdvertising' },
      { condition: gameData.bulkBuyUnlock, elementId: 'basketsBulkButton', display: 'inline' },
      { condition: gameData.maps > 0 || gameData.villageNumber > 1, elementId: 'marketMainButtonsDiv', display: 'inline' },
      { condition: gameData.maps > 0, elementId: 'marketStore', display: 'inline' },
      { condition: gameData.maps > 1, elementId: 'hiringAreaButton', display: 'inline' },
      { condition: gameData.maps > 1 && !gameData.storageUnlock, elementId: 'storageUnlockDiv' },
      { condition: gameData.maps > 1 && gameData.storageUnlock && !(gameData.storageJuicersUnlock && gameData.storagePeelersUnlock), elementId: 'storageDiv' },
      { condition: gameData.maps > 1 && !gameData.bulkBuyUnlock, elementId: 'bulkBuyUnlockDiv' },
      { condition: gameData.maps > 1 && gameData.bulkBuyUnlock && !gameData.bulkBuyUnlock2, elementId: 'bulkBuyUnlock2Div' },
      { condition: gameData.maps > 2, elementId: 'travellingArea' },
      { condition: gameData.maps > 2 && !gameData.fasterTransport, elementId: 'fasterTransportDiv' },
      { condition: gameData.maps > 2, elementId: 'increaseJuicePrice' },
      { condition: gameData.maps > 2 || gameData.villageNumber > 1, elementId: 'travelButton', display: 'inline' },
      { condition: gameData.maps > 3 && !gameData.respectBillboard, elementId: 'respectBillboard', display: 'inline' },
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
