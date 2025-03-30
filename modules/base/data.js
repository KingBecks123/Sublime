const GAME_VERSION = "1.1.12";
const VERSION_NOTES = 
`30/Mar/2025
    Improved the Field
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

sampleSaves.push(...[
    {
        id: 'finished',
        data: `{"loreDiscovered":{"journal":{"scarecrow":true,"mother-tree":true,"burnout":true},"letters":{"letter-001":true}},"totalLoreFound":4,"coinsMax":14000000,"juiceBulkAmount":2000,"deliveryBar":0,"exploreLevel":0,"lookAround":3,"learnANewSkillBar":0,"learnANewSkill":7,"teachBar":0,"workingBar":34.774999999999096,"advertiseBar":0,"advertise":0,"maps":5,"tomes":4,"applicationReady":0,"aesthetic":0,"hasGottenJuice":1,"basketBar":100,"baskets":50,"basketInfoToggle":1,"basketsMax":50,"juicersMax":8000,"peelersMax":40000,"firstApplicant":0,"teachInfoToggle":0,"sellingPieInfoToggle":1,"employeeStatsInfoToggle":0,"bulkBuyUnlock":1,"bulkBuyUnlock2":1,"storageUnlock":1,"basketsBulkToggle":1,"nationalJuiceMarketing":1,"multitasking":1,"currentSkill":"motivation","increaseJuicePricex10":1,"versionNumber":192,"hideCompletedSkills":1,"hideMaxedPurchases":1,"fasterTransport":1,"sharperPeelers":1,"bigGloves":1,"villageNumber":2,"nutritionists":1,"megaCoinsInBank":1000,"megaCoinsInBankMax":1000,"hasAdvertised":1,"betterTraining":10,"upgradeMoreStorage":3,"bachelorsDegreeFinance":1,"benevolence":0,"benevolenceBar":0,"benevolenceResearchers":0,"unlockBenevolence":1,"benevolenceToggle":1,"diseaseTileSize":1,"autoPlaceACivilian":0,"increaseJuicePricePermanance":1,"changeResearchersBy10Unlock":1,"silkRobe":1,"numberOfTiles":16,"juiceBulkAmountMax":2000,"entrepreneurialCertificates":0,"juicePricePrice":15095,"juicePriceCents":15094,"deliveryManager":1,"nourishment":5,"fork":1,"shoes":1,"pin":"none","pinUnlock":1,"hideKnife":0,"manuscripts":1,"collectLimesAtBeginning":0,"currentTask":"none","currentTask2":"none","toggleActions":1,"creditScore2":1,"creditScore3":1,"coinsToAlphaBar":0,"isCoinsToAlphaBar":0,"smarterAdvertisingManagerBroker":1,"convertedCoinsSinceTravel":0,"lastSaveTime":1742006012548,"buyMegaCoinsTimes":0,"buyMegaCoinsTimesMax":10,"zoom":120,"currencyApplicationReady":0,"applicationType":"pie","unlockCurrencyBrokers":1,"typeToHire":"pie","typeToHireToggle":"pie","doesHaveCurrencyBroker":1,"convertCoinsNowBar":0,"basketScarecrow":1,"surveillanceCamera":1,"surveillanceCamera2":1,"skillTrainer":1,"timePlayed":108858,"saveAlphaCoinsUnlock":1,"isOptionsOpen":1,"transferAlphaCoinsBulkUnlock":1,"lightRobe":1,"rottenActualWisdom":1,"goldenLimesInBaskets":7,"eatGoldenLimeBar":0,"bitterSpeeding":0,"forestWell":1,"pieCoinsInWell":200,"trainTransport":1,"tickspeed":1,"mainTab":"options","marketTab":"trade","endScreen":0,"showDonationButton":true,"sfxOn":1,"pieEmployee":1,"pieEmployeeSalesLeft":0,"pieApplicantPieCoinPrice":7,"pieApplicantBetaCoinPrice":0,"pieApplicantMaxPay":19,"pieApplicantCharm":5,"pieMerchantPieCoinPrice":7,"pieMerchantBetaCoinPrice":0,"pieMerchantMaxPay":19,"pieMerchantCharm":5,"pieApplicantPrice":70,"doesHavePieMerchant":1,"usingBetaCoinWage":0,"pieMerchantInfoToggle":0,"hasGottenPies":1,"piePrice":8,"findPieCustomersBar":0,"couldFindCustomer":1,"isThereACustomer":1,"customerWaitTime":12,"hasSoldPie":1,"pieConveyorBelt":1,"pieConveyorBeltOn":1,"pieBucket":1,"pieFlourBucket":1,"juiceInPieBucket":0,"flourInPieBucket":0,"pieBucketNozzle":1,"pieFlourBucketNozzle":1,"bucketThinSteelPlating":0,"juiceBucketHoleSize":1,"flourBucketHoleSize":1,"bellows":1,"bellowsBar":-0.09999999999859566,"bellowsCurrentlyBlowing":0,"upgradeNozzles":1,"betaCoinsExchangeRate":4300,"betaCoinTransferAmount":1,"alphaToBetaBar":0,"basicAlphaToBetaBroker":1,"basicA2BBrokerRule":1500,"basicA2BBrokerAmount":5,"increaseBasicA2BBrokerAmountPrice":32,"textForA2BBrokerAmountToggle":1,"currencyApplicantFee":0,"currencyApplicantSpeed":1,"currencyApplicantPrice":180000,"currencyApplicantTransferAmount":205,"currencyBrokerFee":0,"currencyBrokerSpeed":1,"currencyBrokerPrice":180000,"currencyBrokerTransferAmount":205,"minBrokerApplicantSpeed":1,"maxBrokerApplicantSpeed":1,"brokerApplicantSpeedPrice":390,"minBrokerApplicantFee":0,"maxBrokerApplicantFee":0,"brokerApplicantFeePrice":750,"autoCurrencyConversionBuy":1,"minBrokerApplicantAmount":30,"maxBrokerApplicantAmount":210,"brokerApplicantAmountPrice":1145,"advertisingManagerBroker":1,"autoAdvertiseBroker":1,"autoAdvertiseSpeedValue":30,"autoAdvertiseSpeedValueMax":60,"autoAdvertiseAmountValue":200,"transferAlphaCoinBags":1,"alphaCoinConvertBulkToggle":1,"alphaCoinConvertBulkToggleSet":1,"alphaCoinsExchangeRate":89,"amountCoinsToAlpha":0,"amountCoinsToAlphaMax":10,"applicantSpeed":1200,"applicantPrice":16,"applicantWage":30,"applicantHunger":11,"applicantHobby":"Polyamory","employeeSpeed":1200,"employeeHunger":11,"employeePrice":16,"employeeWage":30,"employeeCurrentSpeed":322860,"employeeHobby":"Polyamory","employees":1,"maxEmployees":1,"employeeWorking":0,"employeeWorkingMax":10,"advertisingLevel1":1,"advertisingLevel2":1,"advertisingLevel3":1,"deliveryType":3,"deliveryTypeToggle":3,"deliveryPrice":5000,"juiceBulkAmountToggle":2000,"wheatField":1,"wheat":6,"wheatSeeds":6,"wheatFieldArray":[[59,51,59,59,59],[59,59,0,0,59],[59,59,59,59,59],[59,59,59,59,59],[59,59,59,59,59]],"mortarAndPestle":1,"flour":3,"pieOven":1,"bakePieBar":0,"juiceAsPieIngredient":0,"flourAsPieIngredient":0,"advancedPieHiring":1,"wheatHarvesters":1,"seedDrills":0,"hasGottenFieldTools":1,"selectedWheatItem":"seedDrill","nextPlotPrice":32,"sellPlotPrice":0,"selectedPlotX":0,"selectedPlotY":1,"forestTree2":1,"forestTreeType":2,"juicers":8000,"juicerBar":0,"howMuchJuice":0,"knife":1,"limeTypeToJuice":1,"limeTypeToJuiceToggle":1,"limesPerJuice":10,"peeledLimesPerJuice":1,"peelers":40000,"peelerBar":0,"howManyPeeledLimes":40000,"hasGottenPeeledLimes":true,"storageJuicersUnlock":1,"storagePeelersUnlock":1,"peelersBulkToggle":1,"juicersBulkToggle":1,"watertightBar":84.68211582055568,"watertightResearchers":133,"surveyingBar":0,"surveyingResearchers":0,"researchers":133,"foodTypeToggle":0,"eat":5,"eatBar":0,"autoCollectingBar":0,"skillInfoToggle":0,"nourishmentPrice":100000,"foodNutritionValue":5,"keenEyeSkillLevelMax":20,"keenEyeSkillLevel":20,"rottenWisdomSkillLevelMax":25,"rottenWisdomSkillLevel":25,"limebidextrousSkillLevelMax":50,"limebidextrousSkillLevel":50,"intelligenceSkillLevelMax":20,"intelligenceSkillLevel":20,"knifebidextrousSkillLevelMax":20,"knifebidextrousSkillLevel":20,"motivationSkillLevelMax":100,"motivationSkillLevel":81,"ambidextrousSkillLevelMax":20,"ambidextrousSkillLevel":20,"bitterSpeedSkillLevelMax":200,"bitterSpeedSkillLevel":51,"respectMilestone10":1,"respectMilestone25":1,"respectMilestone50":1,"respectMilestone100":0,"respectMilestone500":0,"respectMilestone1000":1,"respectMilestone10000":1,"respectBillboard":1,"civiliansPlaced":0,"civiliansTotal":2,"autoStartTask":0,"autoCheckSimulation":0,"autoStartSimulation":0,"diseaseControlFinished":true,"respect":50,"simulationTime":false,"unlockDiseaseAreaSwamp":1,"limeDiseaseInfoToggle":1,"limeDiseaseControlInfoToggle":1,"limeDiseaseLakes":0,"limeDiseaseLakesSet":0,"diseaseArray":[["empty","empty","empty","empty"],["empty","empty","empty","empty"],["empty","empty","empty","empty"],["empty","empty","empty","empty"],["empty","empty","empty","empty"]],"keenEyeBar":0,"rottenWisdomBar":0,"limebidextrousBar":0,"intelligenceBar":0,"knifebidextrousBar":0,"motivationBar":0,"ambidextrousBar":0,"bitterSpeedBar":0,"limes":19224073,"limesShowVariable":true,"limesUnlockedVariable":false,"coins":13999730,"coinsShowVariable":true,"coinsUnlockedVariable":true,"pies":10,"piesShowVariable":true,"piesUnlockedVariable":true,"pieCoins":8,"pieCoinsShowVariable":true,"pieCoinsUnlockedVariable":true,"alphaCoins":100000,"alphaCoinsShowVariable":true,"alphaCoinsUnlockedVariable":true,"betaCoins":352,"betaCoinsShowVariable":true,"betaCoinsUnlockedVariable":true,"goldenLimes":0,"goldenLimesShowVariable":true,"goldenLimesUnlockedVariable":true,"peeledLimes":0,"peeledLimesShowVariable":true,"peeledLimesUnlockedVariable":true,"juice":1913027,"juiceShowVariable":true,"juiceUnlockedVariable":true,"rottenLimes":500,"rottenLimesShowVariable":true,"rottenLimesUnlockedVariable":true,"megaCoins":0,"megaCoinsShowVariable":true,"megaCoinsUnlockedVariable":true,"keenEye":320,"rottenWisdom":622,"limebidextrous":638,"intelligence":320,"changeZoomSize":100,"knifebidextrous":240,"isEmployeeWorking":false,"motivation":418,"ambidextrous":80,"bitterSpeed":304,"a2BBrokerAmountSet":1}`   
    }
]);