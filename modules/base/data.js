const GAME_VERSION = "1.1.12";
const VERSION_NOTES = 
`19/Mar/2025
    An uncountable number of backend changes (again)
`

mainTabs = [
	{
		id: 'options',
		text: 'Options',
		color1: '898989',
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
		color1: '00FF01',
	},
	{
		id: 'coins',
		color1: 'F8FF01',
	},
]


var gameBase = {
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
	zoom: 120,

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

	sfxOn: 1,
}

var game = {}

ableToSave = true

var loopNumberTimePlayed = 0

document.getElementById('market').innerHTML = `
        <div class="basicDiv" id="marketMainButtonsDiv" style="width:360px">
            <button class="wide-button" id="marketMainButton" onclick="tabMarket('marketMain')">Main Square</button>
            <button class="wide-button" id="hiringAreaButton" onclick="tabMarket('hiringArea')">Hiring Area</button>
            <button class="wide-button" id="travelButton" onclick="tabMarket('travel')">Travel</button>
            <button class="wide-button" id="tradeButton" onclick="tabMarket('trade')">Trade</button>
        </div>
        <div id="marketMain" style="position:absolute;"></div>
        <div id="hiringArea"></div>
        <div id="travel" class="module-container" style="display:none;"></div>
        <div id="trade" class="module-container"></div>
`;

myBeige = "#DEAD85";
myGray = "#BBBBBB";
myLime = "#4DFE89";

const AUDIO_DATA = {
    // Sound definitions with all properties grouped by sound type
    BUTTON_CLICK: {
        path: 'assets/sfx/button-click.wav',
        volume: 0.3,
        poolSize: 5  // Increased from 2 to 5 for better handling of rapid clicks
    },
    
    CASH: {
        path: 'assets/sfx/cash.wav',
        volume: 0.2,
        poolSize: 2
    }
};