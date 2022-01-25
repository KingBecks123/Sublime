baseVariables = [
	{
		id: 'limes',
		name: 'Limes',
		color1: '00B300',
		color2: '00FF01',
	},
	{
		id: 'rottenLimes',
		name: 'Rotten Limes',
		color1: '00B300',
		color2: '00FF01',
	},	
	{
		id: 'peeledLimes',
		name: 'Peeled Limes',
		color1: '72B301',
		color2: 'A0FF01',
	},	
	{
		id: 'juice',
		name: 'Juice',
		color1: '00B33D',
		color2: '00FF55',
	},	
	{
		id: 'coins',
		name: 'Coins',
		color1: 'AEB301',
		color2: 'F8FF01',
	},	
	{
		id: 'megaCoins',
		name: 'Mega Coins',
		color1: 'B40001',
		color2: 'FE0000',
	},	
	{
		id: 'alphaCoins',
		name: 'Alpha Coins',
		color1: 'B37700',
		color2: 'FFAA01',
	},	
	{
		id: 'betaCoins',
		name: 'Beta Coins',
		color1: 'AEB301',
		color2: 'F8FF01',
	},	
	{
		id: 'pies',
		name: 'Pies',
		color1: '964D1A',
		color2: 'C67848',
	},	
	{
		id: 'pieCoins',
		name: 'Pie Coins',
		color1: '964D1A',
		color2: 'C67848',
	},	
	{
		id: 'goldenLimes',
		name: 'Golden Limes',
		color1: 'AEB301',
		color2: 'F8FF01',
	}
]


var gameDataBase = {
    limes: 1,
    coins: 0,
	coinsMax: 1e6,
    juice: 0,
    juiceBulkAmount: 1,
    deliveryBar: 0,
    exploreLevel: 0,
    lookAround: 0,
    rottenLimes: 0,
    learnANewSkillBar: 0,
    learnANewSkill: -2,
    teachBar: 0,
    workingBar: 0,
    lookAroundNumber: 0,
    advertiseBar: 0,
    advertise: 0,
    maps: 0,
    tomes: 0,
    applicationReady: 0,
    aesthetic: 0,
    hasGottenJuice: 0,
    showBarPercent: 0,
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
    storageJuicersUnlock: 0,
    storagePeelersUnlock: 0,
    peelersBulkToggle: 0,
    juicersBulkToggle: 0,
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
    megaCoins: 0,
    megaCoinsInBank: 0,
    megaCoinsInBankMax: 20,
    diseaseControlFinished: true,
    respect: 0,
    simulationTime: false,
    unlockDiseaseAreaSwamp: 0,
    limeDiseaseInfoToggle: 1,
    limeDiseaseControlInfoToggle: 1,
    limeDiseaseLakes: 0,
    limeDiseaseLakesSet: 0,
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
    diseaseArray: [
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty']
    ],
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
	invertText: 0,
	surveillanceCamera: 0,
	surveillanceCamera2: 0,
	skillTrainer: 0,
	timePlayed: 0,
	saveAlphaCoinsUnlock: 0,
    isOptionsOpen: 0,
	transferAlphaCoinsBulkUnlock: 0,
	lightRobe: 0,
	rottenActualWisdom: 0,

	goldenLimes: 0,
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
	trueLimes: 0,
}



var gameData = {}

ableToSave = true

var loopNumberBasket = 0
var loopNumberGoldenLimes = 0
var loopNumberTimePlayed = 0
var loopNumbercurrentTask = 0


function getLimesButton() {
	if (gameData.lookAround < 1)
		gameData.collectLimesAtBeginning += 1
	
	switch (gameData.collectLimesAtBeginning) {
	  case 10:
        update("newInfo", "Maybe you should try looking around!")
		break;
	  case 20:
        update("newInfo", "Seriously you aren't going to find anything.")
		break;
	  case 30:
        update("newInfo", "Do you see the Look Around button?")
		break;
	  case 40:
        update("newInfo", "There doesn't seem to be any limes here.")
		break;
	  case 50:
        update("newInfo", "Is that a lime?")
		break;
	  case 60:
        update("newInfo", "Nope, it's dirt.")
		break;
	  case 70:
        update("newInfo", "I would suggest looking around more.")
		break;
	  case 80:
        update("newInfo", "You aren't getting a secret achievement.")
		break;
	  case 90:
        update("newInfo", "This is literally just a waste of time.")
		break;
	  case 100:
        update("newInfo", "Can you please play the game correctly?")
		break;
	  case 110:
        update("newInfo", "Is that something priceless in the distance?")
		break;
	  case 120:
        update("newInfo", "Nope, it's dirt.")
		break;
	  case 130:
        update("newInfo", "I'm leaving.")
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
	else if ((gameData.lookAround < 1 && gameData.collectLimesAtBeginning < 10) || gameData.lookAround)
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
		gameData.versionNumber = 189
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
		gameData = {}
		Object.assign(gameData, gameDataBase)
		localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
		location.reload()
	}
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
    gameData.lookAroundNumber += 1

    if (gameData.lookAround < 1)
        update("newInfo", "Maybe I should keep looking around...")

    if (gameData.lookAround == 0) {
        if (gameData.lookAroundNumber >= 5) {
            update("newInfo", "You see a nearby market.")
            gameData.lookAround = 1
        }
    } 
	else if (gameData.lookAround == 1) {
        if (gameData.lookAroundNumber >= 10) {
            update("newInfo", "You find a merchant willing to buy limes.")
            gameData.lookAround = 2
        }
    } 
	else if (gameData.lookAround == 2) {
        if (gameData.lookAroundNumber >= 15) {
            update("newInfo", "You find a merchant selling various items.")
            gameData.lookAround = 3
        }
    }
}

function changeZoomSize() {
	if (gameData.changeZoomSize == 150) {
		gameData.changeZoomSize = 100
		document.body.style.zoom = 1.0
	}
	else {
		gameData.changeZoomSize += 10
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
		gameDataBase[baseVariables[i].id + 'ShowVariable'] = true
		gameDataBase[baseVariables[i].id + 'UnlockedVariable'] = false
	}
	for (let i = 0; i < baseVariables.length; i++) {	
		if (i > 0) {
			document.getElementById('backpackDiv').innerHTML += '<button class="specialButton" id="currencyDisplay(' + i + ')" onClick="currencyDisplay(' + i + ')" style="width:167px">Show ' + baseVariables[i].name + '</button>'
		}
	
		var id = upperFirstChar(baseVariables[i].id)
		
		document.getElementById('backgroundForValues').innerHTML += '<div class="stat" id="textFor' + id + 'Div" style="color:#' + baseVariables[i].color2 + '">' + baseVariables[i].name + ' </div><div class="stat ar" id="textFor' + id + '"  style="display:none;color:#' + baseVariables[i].color1 + '">0</div><p id="textFor' + id + 'P"  style="display:none ; "> </p><br  id="textFor' + id + 'Br"   style="display:none ; "/>'
	}

	document.getElementById('textForBetaCoinsDiv').style.textDecoration = 'underline'
	document.getElementById('textForPieCoinsDiv').style.textDecoration = 'underline'
	


	restartBar('juicer')
	restartBar('peeler')
	restartBar('advertise')
	restartBar('eat')
	
	gameData.teachBar = 0


	restartBar('coinsToAlpha')
	restartBar('convertCoinsNow')
	restartBar('alphaToBeta')
	restartBar('findPieCustomers')
	restartBar('bakePie')
	restartBar('harvestRice')
	restartBar('delivery')

	if (gameData.bellowsBar > 0)
		bellowsBar()

	updateBar('delivery')
	updateBar('bakePie')
	moveWell()

	if (gameData.workingBar != 0 || gameData.employeeWorking > 0)
		runBar('working', 0.025)

	if (gameData.autoCollectingBar !== 0)
		autoCollectingBar()
	
	normalizeButtons()
	pinButton()

	tab(gameData.mainTab, true)
    tabMarket(gameData.marketTab)
    tabTasks("earn")
    tabScience("research")
	tabOptions("gameOptions")
}

function tab(tabby, hasJustLoaded) {
	gameData.mainTab = tabby
    update("exportCode", "")

    hide("options")
    hide("market")
    hide("inventory")
    hide("skills")
    hide("megaCoinUpgrades")
    hide("tasks")
    hide("company")
    hide("forest")
    hide("science")
    hide("bakery")
    hide("field")
	
	colorChanger('scienceButton', '#9ABBFF')
	colorChanger('optionsButton', '#BBBBBB')
	colorChanger('marketButton', '#BBBBBB')
	colorChanger('inventoryButton', '#BBBBBB')
	colorChanger('skillsButton', '#BBBBBB')
	colorChanger('megaCoinUpgradesButton', "#FF999A")
	colorChanger('tasksButton', '#FF98DD')
	colorChanger('companyButton', '#BBBBBB')
	colorChanger('forestButton', '#BBBBBB')
	colorChanger('bakeryButton', '#BBBBBB')
	colorChanger('fieldButton', '#C67848')



    if (tabby == "options") {
        if (gameData.isOptionsOpen == 0) {
            document.getElementById('options').style.display = "inline-block"
			colorChanger('optionsButton', "#898989")
        }
		toggle('isOptionsOpen')
    } 
	else if (tabby !== "options" && tabby !== "null") {
        gameData.isOptionsOpen = 0
        document.getElementById(tabby).style.display = "inline-block"
		colorChanger(tabby + "Button", "#898989")
		if(tabby == 'science')
			colorChanger(tabby + "Button", "#4D88FE")
		if(tabby == 'tasks')
			colorChanger(tabby + "Button", "#FF4DFF")
		if(tabby == 'megaCoinUpgrades')
			colorChanger(tabby + "Button", "#FF4D4D")
		if(tabby == 'field')
			colorChanger(tabby + "Button", "#964D1A")
    }

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
	colorChanger("tradeButton", "#FDFF9A")
	colorChanger(tabby + "Button", "#898989")
	document.getElementById(tabby).style.display = "block"
	if (tabby == 'trade')
		colorChanger(tabby + "Button", "#FCFF4E")
	
	
	function tabManager(id) {
		hide(id)
		colorChanger(id + "Button", "#BBBBBB")
	}
}


function updateValuesBase () {
	if (gameData.showBarPercent) {
		theColor = "#222222"
		update('barPercentButton', 'Bar Percent Shown')
	}
	else {
		theColor = 'rgba(0, 0, 0, 0)'
		update('barPercentButton', 'Bar Percent Hidden')
	}
	
	barTypes = ['skillBar', 'verticalBar', 'skillBarColored', 'smallContainerBar']
	
	for (j = 0; j < barTypes.length; j++) {
		var x = document.getElementsByClassName(barTypes[j])
		for (i = 0; i < x.length; i++) {
			x[i].style.color = theColor
		}
	}

	for (let i = 0; i < baseVariables.length; i++) {
		id = baseVariables[i].id
		elem = "textFor" + upperFirstChar(id)

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

	update('textForCoinsMax', 'Current maximum: ' + gameData.coinsMax.toLocaleString() + ' Coins')



	if (gameData.employeeWorking > 0)
		update('workingEmployee', 'Working time left: ' + gameData.employeeWorking.toLocaleString() + ' / 10 minutes.')
	else
		update('workingEmployee', 'Employee is idle.')
	
	if (gameData.pinUnlock == 1) {
		var x = document.getElementsByClassName('pinButton')
		for (i = 0; i < x.length; i++) {
			x[i].style.display = 'inline-block'
		}
	}

	for (i = 1; i <= 3; i++) {
		checkShow(gameData.tomes == i, 'tomeDiv' + (i + 1))
	}

	
	checkShow(gameData.lookAround > 1, 'sellYourLimesDiv')
	checkShow(gameData.lookAround >= 3 && !(gameData.hideMaxedPurchases == 1 && gameData.juicers == gameData.juicersMax), 'buyAJuicerDiv')
	checkShow(gameData.lookAround >= 3 && !(gameData.hideMaxedPurchases == 1 && gameData.baskets == gameData.basketsMax), 'buyABasketDiv')
	checkShow(!gameData.tomes, 'tomeDiv')
	checkShow(gameData.tomes > 3, 'goldenBarDiv')
	checkShow(!gameData.pinUnlock, 'pinUnlockDiv')
	checkShow(gameData.pieBucket && gameData.pieFlourBucket, 'bucketThinSteelPlating')
	checkShow(gameData.maps == 0, 'buyAMapDiv1')
	checkShow(gameData.maps == 1, 'buyAMapDiv2')
	checkShow(gameData.maps == 2, 'buyAMapDiv3')
	checkShow(gameData.maps == 3, 'buyAMapDiv4')
	checkShow(gameData.maps == 4, 'buyAMapDiv5')
	checkShow(gameData.hasAdvertised && !gameData.surveillanceCamera, 'offlineEmployee')
	checkShow(gameData.advertisingLevel1, 'advertisingMethods')
	checkShow(!gameData.advertisingLevel1 && gameData.hasAdvertised, 'researchBetterAdvertising')
	checkShow(gameData.bulkBuyUnlock, 'basketsBulkButton', 'inline')
	checkShow(gameData.maps > 0 || gameData.villageNumber > 1, 'marketMainButtonsDiv', 'inline')
	checkShow(gameData.maps > 0, 'marketStore', 'inline')
	checkShow(gameData.maps > 1, 'hiringAreaButton', 'inline')
	checkShow(gameData.maps > 1 && !gameData.storageUnlock, 'storageUnlockDiv')
	checkShow(gameData.maps > 1 && gameData.storageUnlock && !(gameData.storageJuicersUnlock && gameData.storagePeelersUnlock), 'storageDiv')
	checkShow(gameData.maps > 1 && !gameData.bulkBuyUnlock, 'bulkBuyUnlockDiv')
	checkShow(gameData.maps > 1 && gameData.bulkBuyUnlock && !gameData.bulkBuyUnlock2, 'bulkBuyUnlock2Div')
	checkShow(gameData.maps > 2, 'travellingArea')
	checkShow(gameData.maps > 2 && !gameData.fasterTransport, 'fasterTransportDiv')
	checkShow(gameData.maps > 2, 'increaseJuicePrice')
	checkShow(gameData.maps > 2 || gameData.villageNumber > 1, 'travelButton', 'inline')
	checkShow(gameData.maps > 3 && !gameData.respectBillboard, 'respectBillboard', 'inline')
	checkShow(gameData.maps > 3, 'tasksButton')
	checkShow(gameData.maps > 3 && !gameData.autoCurrencyConversionBuy, 'autoCurrencyConversion')
	checkShow(gameData.maps > 4 && gameData.basicAlphaToBetaBroker, 'basicAlphaToBetaBrokerRule')
	checkShow(gameData.maps > 4 && !gameData.basicAlphaToBetaBroker, 'basicAlphaToBetaBroker')
	checkShow(gameData.maps > 4, 'buyPie')
	checkShow(gameData.lookAround != 3, 'lookAroundButton', 'inline')

	checkShow(gameData.villageNumber > 1 || gameData.betterTraining || gameData.increaseJuicePricePermanance, 'megaCoinUpgradesButton')
	checkShow(!gameData.forestWell, 'buyAWell')
	checkShow(gameData.respectMilestone10000 && !gameData.rottenActualWisdom, 'rottenActualWisdom')
	checkShow(!gameData.storagePeelersUnlock, 'storagePeelersDiv')
	checkShow(!gameData.storageJuicersUnlock, 'storageJuicersDiv')
	checkShow(!gameData.changeResearchersBy10Unlock, 'changeResearchersBy10Unlock')
	checkShow(gameData.changeResearchersBy10Unlock, 'upgradeChangeResearchersBy10')


	checkShow(!gameData.endScreen, 'sublimeMain')
	checkShow(gameData.endScreen, 'endScreen')
	checkShow(gameData.lookAround, 'navigateButtons', 'visible')



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
		update('textForLimesDiv', '&#39Limes&#39')
}