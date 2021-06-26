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
    achievement1: 0,
    achievement2: 0,
    achievement3: 0,
    achievement4: 0,
    achievement5: 0,
    achievement6: 0,
    achievement7: 0,
    limesPerClick: 1,
    knife: 0,
    peeledLimes: 0,
    limeTypeToJuice: 0,
    limeTypeToJuiceToggle: 0,
    lookAround: 0,
    rottenLimes: 0,
    rottenWisdomBar: 0,
    rottenWisdom: 0,
    learnANewSkillBar: 0,
    learnANewSkill: -2,
    limebidextrousBar: 0,
    limebidextrous: 0,
    intelligenceBar: 0,
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
    knifebidextrous: 0,
    knifebidextrousBar: 0,
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
    intelligenceSkillLevel: 0,
    limebidextrousSkillLevel: 0,
    knifebidextrousSkillLevel: 0,
    rottenWisdomSkillLevel: 0,
    intelligenceSkillLevelMax: 20,
    limebidextrousSkillLevelMax: 50,
    knifebidextrousSkillLevelMax: 20,
    rottenWisdomSkillLevelMax: 50,
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

    ambidextrousBar: 0,
    ambidextrousSkillLevel: 0,
    ambidextrousSkillLevelMax: 100,


    diseaseTileSize: 1,
	
	autoPlaceACivilian: 0,

	increaseJuicePricePermanance: 0,

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

    pin: "none",
    pinUnlock: 0,
	
	hideRottenLimes: 0,
	hideKnife: 0,
	manuscripts: 0,

	collectLimesAtBeginning: 0,



    currentTask: "none",
    currentTask2: "none",


    keenEyeBar: 0,	
    keenEyeSkillLevel: 0,
    keenEyeSkillLevelMax: 20,

    desktopMode: 1,
	
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
	
	buyMegaCoinsTimes: 0,
	buyMegaCoinsTimesMax: 10,
	
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
	isAdvertising: 0,



    isOptionsOpen: 0,

    autosave: 1,

    //Should be 0 for normal game, 1 if you want to go faster :)
    difficulty: 0,

    //default is 1 :D
    tickspeed: 1,
}

var gameData = {}


function gameStart() {

	surveyingBarDoMove = 0
	benevolenceBarDoMove = 0
	watertightBarDoMove = 0


    addAestheticBase()


    Object.assign(gameData, gameDataBase)

    loadGame()
	
    mainGameLoop()
	
    mainGameLoopSlow()

	
    updateValues()
    autosave()
	
	tab("null")
    tabMarket("marketMain")
    tabStore("plebian")
    tabTasks("earn")
    tabScience("research")

}


function tab(tabby) {


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

    }

}

function tabManager(id){
	hide(id)
	colorChanger(id + "Button", "#BBBBBB")
}

function tabMarket(tabby) {
	
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

function tabScience(tabby) {
    tabs("research", "none")
    tabs("researchers", "none")
	
	colorChanger('researchButton', '#BBBBBB')
	colorChanger('researchersButton', '#BBBBBB')		
	
	colorChanger(tabby + "Button", "#898989")
	
    document.getElementById(tabby).style.display = "block"
}