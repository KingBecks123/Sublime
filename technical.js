//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0;

var researchersAvailable;

var gameDataBase = {
    limes: 1,
    coins: 0,
	coinsMax: 1e6,
    juicers: 0,
    juice: 0,
    juiceBulkAmount: 1,
    deliveryBar: 0,
    juicerBar: 0,
    howMuchJuice: 0,
    exploreLevel: 0,
	achievementBar: 0,
    specialAchievement1: 0,
    specialAchievement2: 0,

    thisTownDeliveries: 0,
    limesPerClick: 1,
    knife: 0,
    peeledLimes: 0,
    limeTypeToJuice: 0,
    limeTypeToJuiceToggle: 0,
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
    applicantSpeed: 20,
    applicantPrice: 10,
    applicantWage: 10,
    applicantHunger: 5,
    employeeSpeed: 20,
    employeeHunger: 5,
    employeePrice: 10,
    employeeWage: 10,
    employeeCurrentSpeed: 0,
    employees: 0,
    maxEmployees: 1,
    employeeWorking: 0,
    employeeWorkingMax: 10,
    deliveryType: 0,
    deliveryTypeToggle: 0,
    deliveryPrice: 2,
    deliveryOngoing: 0,
    juiceBulkAmountToggle: 1,
    tomes: 0,

    applicationReady: 0,
    aesthetic: 0,
    foodTypeToggle: 1,

    eat: 0,
    eatBar: 0,

    autoCollectingBar: 0,

    skillInfoToggle: 1,
    hasGottenJuice: 0,
    foodType: 0,
    showBarPercent: 0,

    basketBar: 0,
    baskets: 0,
    limesInBaskets: 0,
    limesPerJuice: 10,
    peeledLimesPerJuice: 5,
    peelers: 0,
    peelerBar: 0,
    howManyPeeledLimes: 0,
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

    advertisingLevel1: 0,
    advertisingLevel2: 0,
    advertisingLevel3: 0,
	
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
    showAchievements: 0,


    megaCoins: 0,
    megaCoinsInBank: 0,
    megaCoinsInBankMax: 20,

    diseaseControlFinished: 1,
    respect: 0,
    simulationTime: 0,
    unlockDiseaseAreaSwamp: 0,
    limeDiseaseInfoToggle: 1,
    limeDiseaseControlInfoToggle: 1,
    limeDiseaseLakes: 0,
    limeDiseaseLakesCurrent: 0,

    hasAdvertised: 0,

    betterTraining: 0,
	
	respectBillboard: 0,

    civiliansPlaced: 0,
    civiliansTotal: 2,
	
    autoStartTask: 0,
    autoCheckSimulation: 0,
    autoStartSimulation: 0,
	upgradeMoreStorage: 0,
	
    bachelorsDegreeFinance: 0,
    benevolence: 0,
    benevolenceBar: 0,
    benevolenceResearchers: 0,
    unlockBenevolence: 0,
	benevolenceToggle: 0,



    diseaseTileSize: 1,
	
	autoPlaceACivilian: 0,

	increaseJuicePricePermanance: 0,
	changeResearchersBy10Unlock: 0,

    silkRobe: 0,

    diseaseArray: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
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
	
	isCurrentlyJuicing: 0,
	isCurrentlyExchangingAlpha: 0,


    pin: "none",
    pinUnlock: 0,
	
	hideKnife: 0,
	manuscripts: 0,

	collectLimesAtBeginning: 0,



    currentTask: "none",
    currentTask2: "none",


	keenEyeSkillLevelMax:         20,
	intelligenceSkillLevelMax:    20,
	limebidextrousSkillLevelMax:  50,
	knifebidextrousSkillLevelMax: 20,
	rottenWisdomSkillLevelMax:    50,
	motivationSkillLevelMax:     100,
	ambidextrousSkillLevelMax:   20,
	bitterSpeedSkillLevelMax:   200,

		
	knifebidextrous: 0,
    limebidextrous: 0,
	
	
    desktopMode: 1,
	shiftClickOption: 1,
	dontToggle: 0,
	
	isAutoCollecting: 0,
	
	watertightBar: 0,
	watertightResearchers: 0,
	surveyingBar: 0,
	surveyingResearchers: 0,
	researchers: 0,

	respectMilestone10: 0,
	respectMilestone25: 0,
	respectMilestone50: 0,
	respectMilestone100: 0,
	respectMilestone500: 0,
	respectMilestone1000: 0,
	respectMilestone10000: 0,

	diseaseTileSymbols: 1,

	alphaCoins: 0,
	alphaCoinsExchangeRate: 100,
	creditScore2: 0,
	creditScore3: 0,
	coinsToAlphaBar: 0,
	isCoinsToAlphaBar: 0,
	currencyBrokerHireBar: 0,
	confirmStorage: 0,
	smarterAdvertisingManagerBroker: 0,
	convertedCoinsSinceTravel: 0,
	transferAlphaCoinBags: 0,
	alphaCoinConvertBulkToggle: 0,
	alphaCoinConvertBulkToggleSet: 0,
	
	lastSaveTime: Date.now(),

	
	buyMegaCoinsTimes: 0,
	buyMegaCoinsTimesMax: 10,
	
	changeZoomSize: 100,
	
	amountCoinsToAlpha: 0,
	amountCoinsToAlphaMax: 10,

	currencyApplicationReady: 0,
	applicationType: 0,
	unlockCurrencyBrokers: 0,
	typeToHire: 0,
	typeToHireToggle: 0,
	doesHaveCurrencyBroker: 0,
	convertCoinsNowBar: 0,

	currencyApplicantFee: 0,
	currencyApplicantSpeed: 0,
	currencyApplicantPrice: 0,
	currencyApplicantTransferAmount: 0,
	
	currencyBrokerFee: 200000,
	currencyBrokerSpeed: 20,
	currencyBrokerPrice: 0,
	currencyBrokerTransferAmount: 1,
	
	minBrokerApplicantSpeed: 20,
	maxBrokerApplicantSpeed: 60,
	brokerApplicantSpeedPrice: 0,

	minBrokerApplicantFee: 5000,
	maxBrokerApplicantFee: 10000,
	brokerApplicantFeePrice: 0,
	autoCurrencyConversionBuy: 0,
	
	minBrokerApplicantAmount: 1,
	maxBrokerApplicantAmount: 10,
	brokerApplicantAmountPrice: 0,
	
	advertisingManagerBroker: 0,
	autoAdvertiseBroker: 0,
	autoAdvertiseSpeedValue: 30,
	autoAdvertiseSpeedValueMax: 60,
	autoAdvertiseAmountValue: 5, 
	advertisePrice: 10,
	advertisePriceType: 'coins',
	isAdvertising: 0,
	basketScarecrow: 0,
	moreVisibleVariables: 0,
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
	
	forestTree2: 0,
	forestTreeType: 1,
	goldenLimes: 0,
	goldenLimesInBaskets: 0,
	eatGoldenLimeBar: 100,
	bitterSpeeding: 0,

	
	//Beta Coins
	betaCoins: 0,
	betaCoinsExchangeRate: 2500,
	betaCoinTransferAmount: 1,
	alphaToBetaBar: 0,
	basicAlphaToBetaBroker: 0,
	basicA2BBrokerRule: 1000,
	basicA2BBrokerAmount: 1,
	increaseBasicA2BBrokerAmountPrice: 2,
	textForA2BBrokerAmountToggle: 0,
	
	//Pie
	pies: 0,
	hasGottenPies: 0,
	piePrice: 1,
	findPieCustomersBar: 0,
	couldFindCustomer: 2,
	isFindingPieCustomers: 0,
	isThereACustomer: 0,
	customerWaitTime: 0,
	hasSoldPie: 0,
	pieConveyorBelt : 0,
	pieConveyorBeltOn: 0,
	isPieBaking: 0,
	
	pieBucket: 0,
	pieFlourBucket: 0,

	juiceInPieBucket: 0,
	flourInPieBucket: 0,
	
	pieBucketNozzle: 0,	
	pieFlourBucketNozzle: 0,
	
	bucketThinSteelPlating: 0,

	juiceBucketHoleSize: 10,
	flourBucketHoleSize: 10,
	
	bellows: 0,
	bellowsBar: 0,
	bellowsCurrentlyBlowing: 0,
	
	upgradeNozzles: 0,
	
	//Pie Employee
	pieEmployee: 0,
	pieEmployeeSalesLeft: 0,
	
	pieApplicantPieCoinPrice: 0,
	pieApplicantBetaCoinPrice: 0,
	pieApplicantMaxPay: 0,
	pieApplicantCharm: 0,

	pieMerchantPieCoinPrice: 5,
	pieMerchantBetaCoinPrice: 0,
	pieMerchantMaxPay: 10,
	pieMerchantCharm: 0,
	
	pieApplicantPrice: 0,
	doesHavePieMerchant: 0,
	usingBetaCoinWage: 0,
	pieMerchantInfoToggle: 0,


	//Wheat
	wheatField: 0,
	wheat: 0,
	wheatSeeds: 0,
    wheatFieldArray: [
        [59, 59, 59, 59, 59],
        [59, 59, 59, 59, 59],
        [59, 59, 59, 59, 59],
        [59, 59, 59, 59, 59],
        [59, 59, 59, 59, 59]
    ],
	wheatFieldXDimension: 1,
	mortarAndPestle: 0,
	flour: 0,
	pieOven: 0,
	bakePieBar: 0,
	juiceAsPieIngredient: 0,
	flourAsPieIngredient: 0,
	pieCoins: 0,
	advancedPieHiring: 0,
	
	wheatHarvesters: 0,
	seedDrills: 0,
	hasGottenFieldTools: 0,
	
	selectedWheatItem: 'seed',
	nextPlotPrice: 4,
	sellPlotPrice: 0,
	selectedPlotX: 0,
	selectedPlotY: 0,

	
	//New People
	forestWell: 0,
	pieCoinsInWell: 0,
	
	trainTransport: 0,
	

    //Should be 0 for normal game, 1 if you want to go faster :)
    difficulty: 0,

    //default is 1 :D
    tickspeed: 1,
	
	mainTab: 'null',
	marketTab: 'marketMain',

	endScreen: 0,
	soulArea: 'start',
	trueLimes: 0,
	
	
	serf: {
		rice: 0
	},

	harvestRiceBar: 0,
	
}

	for (let i = 1; i <= 7; i++) {
		gameDataBase['achievement' + i] = 0
	}
	
	for (let i = 0; i < mainSkills.length; i++) {
		gameDataBase[mainSkills[i] + 'Bar'] = 0
		gameDataBase[mainSkills[i] + 'SkillLevel'] = 0
	}

	for (let i = 0; i < mainVariables.length; i++) {
		gameDataBase[mainVariables[i] + 'ShowVariable'] = true
		gameDataBase[mainVariables[i] + 'UnlockedVariable'] = false
	}
	
	for (let i = 0; i < avs.length; i++) {
		for (let j = 0; j < avs[i].v.length; j++) {
			gameDataBase[avs[i].v[j].id + 'ShowVariable'] = true
			gameDataBase[avs[i].v[j].id + 'UnlockedVariable'] = false
		}
	}


var gameData = {}



function gameStart() {
	
	addHTML()
		
	surveyingBarDoMove = 0
	benevolenceBarDoMove = 0
	watertightBarDoMove = 0
	findPieCustomersBarDoMove = 0



    Object.assign(gameData, gameDataBase)
	

    loadGame()
	
    mainGameLoop()
	
    mainGameLoopSlow()

	addAestheticBase()
	
    updateValues()
	
	

	tab(gameData.mainTab)
    tabMarket(gameData.marketTab)
    tabStore("plebian")
    tabTasks("earn")
    tabScience("research")
	tabOptions("gameOptions")

}


function tab(tabby) {
	gameData.mainTab = tabby
    update("exportCode", "")

    tabs("options", "none")
    tabs("market", "none")
    tabs("inventory", "none")
    tabs("achievements", "none")
    tabs("skills", "none")
    tabs("megaCoinUpgrades", "none")
    tabs("tasks", "none")
    tabs("company", "none")
    tabs("forest", "none")
    tabs("science", "none")
    tabs("bakery", "none")
    tabs("field", "none")


	
	colorChanger('scienceButton', '#9ABBFF')
	colorChanger('optionsButton', '#BBBBBB')
	colorChanger('marketButton', '#BBBBBB')
	colorChanger('inventoryButton', '#BBBBBB')
	colorChanger('achievementsButton', '#BBBBBB')
	colorChanger('skillsButton', '#BBBBBB')
	colorChanger('megaCoinUpgradesButton', "#FF999A")
	colorChanger('tasksButton', '#FF98DD')
	colorChanger('companyButton', '#BBBBBB')
	colorChanger('forestButton', '#BBBBBB')
	colorChanger('bakeryButton', '#BBBBBB')
	colorChanger('fieldButton', '#C67848')



    if (tabby == "options" && tabby !== "null") {
        if (gameData.isOptionsOpen == 0) {
            gameData.isOptionsOpen = 1
            document.getElementById(tabby).style.display = "inline-block"
			colorChanger(tabby + "Button", "#898989")


        } else if (gameData.isOptionsOpen == 1) {
            gameData.isOptionsOpen = 0
        }


    } else if (tabby !== "options" && tabby !== "null") {

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

function tabManager(id){
	hide(id)
	colorChanger(id + "Button", "#BBBBBB")
}

function tabMarket(tabby) {
	
	gameData.marketTab = tabby

	tabManager('marketStore')	
	tabManager('marketMain')	
	tabManager('hiringArea')	
	tabManager('travel')	

	hide('trade')
	colorChanger("tradeButton", "#FDFF9A")
	
	colorChanger(tabby + "Button", "#898989")
	document.getElementById(tabby).style.display = "block"
		
	if(tabby == 'trade')
		colorChanger(tabby + "Button", "#FCFF4E")
		
}

function tabTasks(tabby) {
    tabs("earn", "none")
    tabs("milestones", "none")
	
	colorChanger('earnButton', '#BBBBBB')
	colorChanger('milestonesButton', '#BBBBBB')	
	
	colorChanger(tabby + "Button", "#898989")
    document.getElementById(tabby).style.display = "block"
}

function tabStore(tabby) {
    tabs("plebian", "none")
    tabs("patrician", "none")
	
	colorChanger('plebianButton', '#BBBBBB')
	colorChanger('patricianButton', '#BBBBBB')
	
    document.getElementById(tabby).style.display = "block"
	colorChanger(tabby + "Button", "#898989")

}

function tabOptions(tabby) {
    tabs("gameOptions", "none")
    tabs("uiOptions", "none")
    tabs("statsOptions", "none")

	
    document.getElementById(tabby).style.display = "block"
}

function fixOverMaxedVariables(){
	if (gameData.knifebidextrousSkillLevel > gameData.knifebidextrousSkillLevelMax) {
        gameData.knifebidextrousSkillLevel = gameData.knifebidextrousSkillLevelMax
    }

    if (gameData.juiceBulkAmountToggle > 100 && gameData.deliveryTypeToggle < 2) {
        gameData.juiceBulkAmountToggle = 100
    }

    if (gameData.juiceBulkAmountToggle > gameData.juiceBulkAmountMax) {
        gameData.juiceBulkAmountToggle = gameData.juiceBulkAmountMax
    }


    if (gameData.coins > gameData.coinsMax) {
        gameData.coins = gameData.coinsMax
    }
	
    if (gameData.alphaCoins > 1e5) {
        gameData.alphaCoins = 1e5
    }
	
    if (gameData.basketBar > 100) {
        gameData.basketBar = 100
    }
	
    if (gameData.eatBar > 100) {
        gameData.eatBar = 100
    }
	
    if (gameData.respect < 0) {
        gameData.respect = 0
    }
	
    if (gameData.workingBar > 100) {
        gameData.workingBar = 100
    }
	
    if (gameData.coinsToAlphaBar > 100) {
        gameData.coinsToAlphaBar = 100
    }
	
    if (gameData.megaCoinsInBank > gameData.megaCoinsInBankMax) {
        gameData.megaCoinsInBank = gameData.megaCoinsInBankMax
    }
	
    if (gameData.deliveryBar > 100) {
        gameData.deliveryBar = 100
    }

    if (gameData.learnANewSkillBar > 100) {
        gameData.learnANewSkillBar = 100
    }

    if (gameData.employeeWorking > gameData.employeeWorkingMax) {
        gameData.employeeWorking = gameData.employeeWorkingMax
    }

    overMaximum("baskets")
    overMaximum("juicers")
    overMaximum("peelers")
    overMaximum("intelligenceSkillLevel")
	
	preventNegative('coins')
	preventNegative('limes')
	preventNegative('respect')
}

function addHTML(){
	
	for (let i = 0; i < mainSkills.length; i++) {
	
		var name = mainSkills[i]
		var div = document.getElementById(name + "Div")
		
		var skillLevel       = document.createElement("p");
		    skillLevel.id    = name + "SkillLevel";
		    skillLevel.classList.add("basicText");
		    div.appendChild(skillLevel);
			
		var skillProgressSpan                = document.createElement("span")
		skillProgressSpan.innerHTML          = '<div class="skillProgress" id="' + name + 'Progress"><div class="skillBar" , id="' + name + 'Bar">0%</div></div>';
		insert(div, skillProgressSpan)
		
		
		var skillButtonSpan                  = document.createElement("span")
		skillButtonSpan.innerHTML            = '<button class="skillButton" id="' + name + "Button" + '" onclick="pickCurrentSkill(&apos;' + name + '&apos;)">' + mainSkillsNames[i] + '</button>';
		insert(div, skillButtonSpan)


	}

	for (let i = 1; i < mainVariables.length; i++) {	
		var showVariableButton                  = document.createElement("span")
		showVariableButton.innerHTML            = '<button class="specialButton" id="currencyDisplay(' + i + ')" onclick="currencyDisplay(' + i + ')"  style="width:167px;">Show ' + mainVariablesNames[i] + '</button>';
		document.getElementById('backpackDiv').append(showVariableButton)
	}
	
	for (let i = 0; i < mainVariables.length; i++) {	
		var id = jsUcfirst(mainVariables[i])
		var stat                  = document.createElement("span")
		stat.innerHTML            = '<div class="stat" id="textFor' + id + 'Div">' + mainVariablesNames[i] + ' </div><div class="stat ar" id="textFor' + id + '"  style="display:none ; ">0</div><p id="textFor' + id + 'P"  style="display:none ; "> </p><br  id="textFor' + id + 'Br"   style="display:none ; "/>';
		document.getElementById('backgroundForValues').append(stat)
	}
	
	for (let i = 0; i < avs.length; i++) {
		
		
		var e = $("<div />", {
			id: "backgroundForValues" + avs[i].area,
			style: "padding:10px;background-color:#FFFFFF;width:100px;display:block;",
		})

		$(document.getElementById('soulArea' + avs[i].name + 'Width')).prepend(e);
		
		e = $("<button />", {
			class: "basicButtonSize",
			style: "width:99%;display:block;",
			onclick: "soulArea(" + i + ")",
			id: 'soulArea' + avs[i].name + 'WellButton'
		})

		$(document.getElementById('wellField')).append(e)
		update('soulArea' + avs[i].name + 'WellButton', avs[i].name)



		for (let j = 0; j < avs[i].v.length; j++) {
			var avsStat = document.createElement("span")
			avsStat.innerHTML = '<div class="stat" id="textFor' + avs[i].v[j].name + 'Div">' + avs[i].v[j].id + ' </div><div class="stat ar" id="textFor' + avs[i].v[j].name + '"  style="display:none ; ">0</div><p id="textFor' + avs[i].v[j].name + 'P"  style="display:none ; "> </p><br  id="textFor' + avs[i].v[j].name + 'Br"   style="display:none ; "/>';
			document.getElementById('backgroundForValues' + avs[i].area).append(avsStat)
		}
	}
	
	document.getElementById('textForBetaCoinsDiv').style.textDecoration = 'underline'
	document.getElementById('textForPieCoinsDiv').style.textDecoration = 'underline'

	function insert(div, thing)
	{
		div.insertBefore(thing, div.firstChild);
	}
	
	for (let y = 0; y < 5; y++) {	
		for (let x = 0; x < 5; x++) {	
			var fieldTile                  = document.createElement("span")
			fieldTile.innerHTML            = '<button ondragstart="return false;" class="fieldTile" id="fieldTile' + x + '-' + y + '" onclick="fieldTile(' + x + ', ' + y + ')">‎‏‏‎<img style="width:70px;height:70px;" id="fieldTile' + x + '-' + y + 'img" src="images/emptyField.png"></button>'
			document.getElementById('fullField').append(fieldTile)
		}
	}
	

	
}