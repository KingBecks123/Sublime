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

document.getElementById('market').innerHTML = `
        <div class="basicDiv" id="marketMainButtonsDiv" style="width:380px">
            <button class="specialButton" style="width:168px" id="marketMainButton" onclick="tabMarket('marketMain')">Main Square</button>
            <button class="specialButton" style="width:168px" id="hiringAreaButton" onclick="tabMarket('hiringArea')">Hiring Area</button>
            <button class="specialButton" style="width:168px" id="travelButton" onclick="tabMarket('travel')">Travel</button>
            <button class="specialButton" style="width:168px" id="tradeButton" onclick="tabMarket('trade')">Trade</button>
        </div>
        <div id="marketMain" style="position:absolute;">
            <div style="display:inline-block;width:380px;">
				<p class="titleText">Your Stall</p>
                <div class="basicDiv" id="sellYourLimesDiv">
                    <button class="specialButton" id="sellYourLimesButton" style="background-color:#FCFF4E" onclick="universalBuy('coins', 50, 'limes')">Sell Your Limes</button>
                    <p class="basicText" id="sellYourLimesAmount">You Need 50 Limes</p>
                    <p class="basicText" id="sellYourLimesReward">You Will Be Rewarded 1 Coin</p>
                </div>
                <div class="basicDiv juiceMarket" id="juiceMarket">
                    <button class="roundButton" id="deliveryButton" onclick="pickCurrentTask('delivery')">Sell Juice</button>
                    <button class="pinButton" onclick="pin('deliveryButton')">+</button>
                    <p class="basicText" id="sellYourJuicePrice">You Need 2 Coins For Delivery</p>
                    <p class="basicText" id="sellYourJuiceAmount">You Need 1 Juice</p>
                    <p class="basicText" id="sellYourJuiceReward">You Will Be Rewarded 1 Coin</p>
                    <button class="specialButton" id="decreaseJuiceSoldButton" onclick="decreaseJuiceSold()" style="width:120px;">Decrease Juice Sold</button>
                    <button class="specialButton" id="increaseJuiceSoldButton" onclick="increaseJuiceSold()" style="width:120px;">Increase Juice Sold</button>
                    <button class="specialButton" id="sellMaxJuiceButton" onclick="sellMaxJuice()" style="width:105px;background-color:#BBBBBB">Sell Max Juice</button>
                    <br>
                    <button class="specialButton" id="deliveryToggleStandardButton" style="width:105px;" onclick="deliveryToggleStandard()">Standard Delivery</button>
                    <button class="specialButton" id="deliveryToggleExpressButton" style="width:105px;" onclick="deliveryToggleExpress()">Express Delivery</button>
                    <button class="specialButton" id="deliveryToggleTrainButton" style="width:105px;" onclick="deliveryToggleTrain()">Train Delivery</button>
                    <br><br>
                    <div class="skillProgress" id="deliveryProgress" style="margin:auto;">
                        <div class="skillBar" id="deliveryBar">0%</div>
                    </div>
                </div>
            </div>
            <div style="display:inline-block;width:380px;position:absolute;">
				<p class="titleText">Other's Stalls</p>
				<div id="nourishment">
					<div class="basicDiv" id="collectingUpgrade">
						<button class="specialButton" id="collectingUpgradeButton" onclick="collectingUpgrade()">Nourishment</button>
						<p class="basicText">Increase auto collect duration</p>
						<p class="basicText" id="textForNourishmentPrice">You Need: 10 Limes</p>
					</div>
                </div>
                <div class="basicDiv" id="buyAForkDiv">
                    <button class="specialButton" style="background-color:#BBBBBB;" onclick="buyAFork()">Buy A Fork</button>
                    <p class="basicText">Increase eating speed</p>
                    <p class="basicText">Price: 1 Coin</p>
                </div>
                <div class="basicDiv" id="buyShoesDiv">
                    <button class="specialButton" style="background-color:#DEAD85;" onclick="buy('shoes', 1)">Buy Shoes</button>
                    <p class="basicText">Double auto collect rate</p>
                    <p class="basicText">Price: 1 Coin</p>
                </div>
                <div class="basicDiv" id="buyAJuicerDiv">
                    <button class="specialButton" id="buyAJuicerButton"  onclick="bulkableBuyMax('juicers', 1)">Buy A Juicer</button>
                    <button class="specialButton" id="juicersBulkButton" style="width:80px;" onclick="toggle('juicersBulkToggle')">x10</button>
                    <p class="basicText" id="buyAJuicerPrice">Price: 1 Coin</p>
                </div>
                <div class="basicDiv" id="buyABasketDiv">
                    <button class="specialButton" id="buyABasketButton" onclick="buyABasket()">Buy A Basket</button>
                    <button class="specialButton" id="basketsBulkButton" style="width:80px;" onclick="toggle('basketsBulkToggle')">x10</button>
                    <p class="basicText">Price: 2 Coins</p>
                </div>
				<div class="basicDiv" id="buySkillToggler">
                    <button class="specialButton" onclick="buy('multitasking', 5)">Multitasking</button>
                    <p class="basicText">Allow the toggling of skills</p>
                    <p class="basicText">Price: 5 Coins</p>
                </div>
                <div class="basicDiv" id="offlineBasket">
                    <button class="specialButton" id="buyAScarecrowButton" onclick="buy('basketScarecrow', 10)">Buy A Scarecrow</button>
                    <p class="basicText">Allows your baskets to collect limes while you're away (offline)</p>
                    <p class="basicText">Price: 10 Coins</p>
                </div>
                <div class="basicDiv" id="buyAMapDiv1">
                    <button class="specialButton" style="background-color:#DEAD85" onclick="buy('maps', 20)">Buy A Map Of The Town</button>
                    <p class="basicText">Price: 20 Coins</p>
                </div>
				<div id="marketStore">
					<div id="plebeian">
						<div class="basicDiv" id="increaseJuicePrice">
							<button class="specialButton" id="increaseJuicePriceButton" onclick="increaseJuicePrice()">Increase Juice Price</button>
							<button class="specialButton" id="increaseJuicePricex10Button" style="width:60px;" onclick="toggle('increaseJuicePricex10')">x10</button>
							<p class="basicText">'Squeeze' more money from your customers</p>
							<p class="basicText">The more you raise the price, the more it takes to convince the customer to still buy</p>
							<p class="basicText">+1% Profit</p>
							<p class="basicText" id="textForJuicePricePrice">Price: 1 Coins</p>
						</div>
						<div class="basicDiv" id="pinUnlockDiv">
							<button class="specialButton" id="pinUnlock" onclick="buy('pinUnlock', 50)">Unlock Pinning Actions</button>
							<p class="basicText">Price: 50 Coins</p>
						</div>
						<div id="buyKnifeDiv" class="basicDiv">
							<button class="specialButton" id="knifeButton" onclick="buy('knife', 10)">Buy A Knife</button>
							<p class="basicText" id="knifeInfo">Price: 10 Coins</p>
						</div>
						<div id="tomeDiv1" class="basicDiv">
							<button class="specialButton" onclick="buy('tomes', 10)">Buy A Tome</button>
							<p class="basicText">Tomes can teach you new skills!</p>
							<p class="basicText">Price: 10 Coins</p>
						</div>
						<div id="buyAPeelerDiv" class="basicDiv">
							<button class="specialButton" id="buyAPeelerButton" onclick="bulkableBuyMax('peelers', 2)">Buy A Peeler</button>
							<button class="specialButton" id="peelersBulkButton" style="width:80px;" onclick="toggle('peelersBulkToggle')">x10</button>
							<p class="basicText">The knife isn't gonna 'cut' it</p>
							<p class="basicText">Price: 2 Coins</p>
						</div>
						<div id="sharperPeelerDiv" class="basicDiv">
							<button class="specialButton" id="sharperPeelerButton" onclick="buy('sharperPeelers', 500)">Sharper Peelers</button>
							<p class="basicText">Peelers can slice faster!</p>
							<p class="basicText">Price: 500 Coins</p>
						</div>
						<div class="basicDiv" id="buyAMapDiv2">
							<button class="specialButton" onclick="buy('maps', 200)">Buy Another Map</button>
							<p class="basicText">There must be more to this town...</p>
							<p class="basicText">Price: 200 Coins</p>
						</div>
						<div class="basicDiv" id="bulkBuyUnlockDiv">
							<button class="specialButton" onclick="buy('bulkBuyUnlock', 500)">Bulk Buying</button>
							<p class="basicText">Pay the entry fee to become a bulk buyer</p>
							<p class="basicText">Price: 500 Coins</p>
						</div>
						<div class="basicDiv" id="bulkBuyUnlock2Div">
							<button class="specialButton" onclick="buy('bulkBuyUnlock2', 500)" >Extreme Bulk Buying</button>
							<p class="basicText">Normal bulk buying isn't enough!</p>
							<p class="basicText">Price: 500 Coins</p>
						</div>
						<div class="basicDiv" id="storageUnlockDiv">
							<button class="specialButton" onclick="buy('storageUnlock', 200)">Bulk Storage</button>
							<p class="basicText">Purchase a warehouse for your tools</p>
							<p class="basicText">Price: 200 Coins</p>
						</div>
						<div id="storageDiv">
							<div class="basicDiv" id="storageJuicersDiv">
								<button class="specialButton" onclick="storageJuicersUnlock()">Bulk Juicers Storage</button>
								<p class="basicText">Store 5x as many juicers</p>
								<p class="basicText">Price: 100 Coins</p>
							</div>
							<div class="basicDiv" id="storagePeelersDiv">
								<button class="specialButton" onclick="storagePeelersUnlock()">Bulk Peelers Storage</button>
								<p class="basicText">Store 5x as many peelers</p>
								<p class="basicText">Price: 100 Coins</p>
							</div>
						</div>
						<div class="basicDiv" id="fasterTransportDiv">
							<button class="specialButton" onclick="buy('fasterTransport', 2000)">Better Transport</button>
							<p class="basicText">Add a new delivery type</p>
							<p class="basicText">Price: 2,000 Coins</p>
						</div>
						<div class="basicDiv" id="buyADeliveryManager">
							<button class="specialButton" onclick="buy('deliveryManager', 500)">Buy A Delivery Manager</button>
							<p class="basicText">Option to deliver maximum juice</p>
							<p class="basicText">Price: 500 Coins</p>
						</div>
						<div class="basicDiv" id="buyAMapDiv3">
							<button class="specialButton" onclick="buy('maps', 1000)">Buy A Bigger Map</button>
							<p class="basicText">There must be more *than* this town...</p>
							<p class="basicText">Price: 1,000 Coins</p>
						</div>
						<div class="basicDiv" id="buyAMapDiv4">
							<button class="specialButton" onclick="buy('maps', 200000)">Buy A Giant Map</button>
							<p class="basicText">Find places only the rich can go</p>
							<p class="basicText">Price: 200,000 Coins</p>
						</div>
						<div class="basicDiv" id="respectBillboard">
							<button class="specialButton" onclick="buy('respectBillboard', 1e5)">Buy A Respect Billboard</button>
							<p class="basicText">Put your face on a billboard so people know who helped them</p>
							<p class="basicText">Price: 100,000 Coins</p>
						</div>
						<div class="basicDiv" id="buyPie">
							<button class="specialButton" onclick="universalBuy('pies', 5, 'betaCoins')">Buy Pie</button>
							<p class="basicText">Pie is essential for the patrician diet</p>
							<p class="basicText">Price: 5 Beta Coins</p>
						</div>
						<div class="basicDiv" id="buyWheatField">
							<button class="specialButton" onclick="universalBuy('wheatField', 10, 'betaCoins')">Buy A Field</button>
							<p class="basicText">A farmer noticed you reselling pie, and thought you'd like to purchase a field</p>
							<p class="basicText">Price: 20 Beta Coins</p>
						</div>
						<div class="basicDiv" id="buyWheatSeeds">
							<button class="specialButton" onclick="universalBuy('wheatSeeds', 10, 'betaCoins')">Buy A Wheat Seed</button>
							<p class="basicText">Is wheat the new lime?</p>
							<p class="basicText">Price: 10 Beta Coins</p>
						</div>
						<div class="basicDiv" id="buyMortarAndPestle">
							<button class="specialButton" onclick="universalBuy('mortarAndPestle', 10, 'pieCoins')">Buy A Mortar And Pestle</button>
							<p class="basicText">Can grinding ever be fun?</p>
							<p class="basicText">Price: 10 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyPieOven">
							<button class="specialButton" onclick="universalBuy('pieOven', 10, 'pieCoins')">Buy A Pie Oven</button>
							<p class="basicText">One step closer to pie creation</p>
							<p class="basicText">Price: 10 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAPieConveyorBelt">
							<button class="specialButton" onclick="universalBuy('pieConveyorBelt', 20, 'pieCoins')">Buy A Pie Conveyor Belt</button>
							<p class="basicText">Automatically sends pies into the oven</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAPieBucket">
							<button class="specialButton" onclick="universalBuy('pieBucket', 20, 'pieCoins')">Buy A Bucket With A Hole</button>
							<p class="basicText">Automatically drips juice into your pie</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAPieBucketNozzle">
							<button class="specialButton" onclick="universalBuy('pieBucketNozzle', 20, 'pieCoins')">Buy A Nozzle</button>
							<p class="basicText">Adjust the juice dripping rate for optimum performance</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAPieFlourBucket">
							<button class="specialButton" onclick="universalBuy('pieFlourBucket', 20, 'pieCoins')">Buy Another Bucket With A Hole</button>
							<p class="basicText">Automatically drops flour into your pie</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAPieFlourBucketNozzle">
							<button class="specialButton" onclick="universalBuy('pieFlourBucketNozzle', 20, 'pieCoins')">Buy Another Nozzle</button>
							<p class="basicText">Adjust the flour dropping rate for optimum performance</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyBellows">
							<button class="specialButton" onclick="universalBuy('bellows', 20, 'pieCoins')">Buy Bellows</button>
							<p class="basicText">Increases oven speed by adding more oxygen</p>
							<p class="basicText">Price: 20 Pie Coins</p>
						</div>	
						<div class="basicDiv" id="buyPieEmployee">
							<button class="specialButton" onclick="universalBuy('pieEmployee', 50, 'pieCoins')">Hire An Employee</button>
							<p class="basicText">This person will give the pie to the customer, but must be paid.</p>
							<p class="basicText">Hiring Price: 50 Pie Coins</p>
						</div>
						<div class="basicDiv" id="upgradeNozzles">
							<button class="specialButton" onclick="universalBuy('upgradeNozzles', 50, 'pieCoins')">Upgrade Nozzles</button>
							<p class="basicText">These new nozzles allow for finer tuning</p>
							<p class="basicText">Price: 50 Pie Coins</p>
						</div>
						<div class="basicDiv" id="bucketThinSteelPlating">
							<button class="specialButton" onclick="universalBuy('bucketThinSteelPlating', gameData.bucketThinSteelPlating * 5 + 20, 'pieCoins')">Buy Thin Steel Plating</button>
							<p class="basicText">Perfect for extending the height of your buckets</p>
							<p class="basicText" id="bucketHeight">Current heights: 20 Units</p>
							<p class="basicText" id="bucketThinSteelPlatingPrice">Price: 20 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyASeedDrill">
							<button class="specialButton" onclick="universalBuy('seedDrills', 50, 'pieCoins')">Buy A Seed Drill</button>
							<p class="basicText">This is sow useful!</p>
							<p class="basicText">Price: 50 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAWheatHarvester">
							<button class="specialButton" onclick="universalBuy('wheatHarvesters', 50, 'pieCoins')">Buy A Wheat Harvester</button>
							<p class="basicText">Does what it says on the label</p>
							<p class="basicText">Price: 50 Pie Coins</p>
						</div>
						<div class="basicDiv" id="advancedPieHiring">
							<button class="specialButton" onclick="universalBuy('advancedPieHiring', 50, 'pieCoins')">Unlock Advanced Pie Hiring</button>
							<p class="basicText">Go through pie merchant applications in the Hiring Area</p>
							<p class="basicText">Price: 50 Pie Coins</p>
						</div>
						<div class="basicDiv" id="buyAWell">
							<button class="specialButton" onclick="universalBuy('forestWell', 200, 'betaCoins')">Buy A Well</button>
							<p class="basicText">Water is the lifeblood of limes</p>
							<p class="basicText">Price: 200 Beta Coins</p>
						</div>
						<div class="basicDiv" id="trainTransportDiv">
							<button class="specialButton" onclick="universalBuy('trainTransport', 200, 'pieCoins')">Train Transport</button>
							<p class="basicText">Add a new delivery type</p>
							<p class="basicText">Price: 200 Pie Coins</p>
						</div>
					</div>
					<div id="patrician">
						<div id="buyARobe" class="basicDiv">
							<button class="specialButton" id="robeButton" onclick="buyARobe()">Buy A Robe</button>
							<p class="basicText">Guaranteed to make you look rich!</p>
							<p class="basicText">Respect +50</p>
							<p class="basicText">Price: 100,000 Coins</p>
						</div>
						<div id="lightRobe" class="basicDiv">
							<button class="specialButton" onclick="universalBuy('lightRobe', 5e3, 'alphaCoins')">Buy A Lightweight Robe</button>
							<p class="basicText">Respect +50 instantly after travelling</p>
							<p class="basicText">Price: 5,000 Alpha Coins</p>
						</div>
						<div id="increaseJuicePricePermanance" class="basicDiv">
							<button class="specialButton" style="background-color:#FF999A;" onclick="buy('increaseJuicePricePermanance', 5e5)">Unlock Permanance</button>
							<p class="basicText">Make 'Increase juice price' stay after travelling!</p>
							<p class="basicText">Price: 500,000 Coins</p>
						</div>
						<div id="unlockDiseaseAreaSwamp" class="basicDiv">
							<button class="specialButton" id="unlockDiseaseAreaSwampButton" onclick="buy('unlockDiseaseAreaSwamp', 1e5)">Unlock Swamp Area</button>
							<p class="basicText">The civilians in the swamp have lime disease too!</p>
							<p class="basicText">Price: 100,000 Coins</p>
						</div>
						<div class="basicDiv" id="tomeDiv2">
							<button class="specialButton" onclick="buy('tomes', 2e5)">Buy A Tome</button>
							<p class="basicText">"This tome will save you time on limes, 5 stars"</p>
							<p class="basicText">Price: 200,000 Coins</p>
						</div>
						<div class="basicDiv" id="unlockBenevolence">
							<button class="specialButtonTravel" onclick="buy('unlockBenevolence', 5e5)">Buy a conscience</button>
							<p class="basicText">Think about those less fortunate than you - unlocks Benevolence</p>
							<p class="basicText">Price: 500,000 Coins</p>
						</div>
						<div class="basicDiv" id="surveillanceCamera2">
							<button class="specialButtonTravel" onclick="buy('surveillanceCamera2', 2e5)">Buy A High Tech Surveillance Camera</button>
							<p class="basicText">Make sure researchers are working while you're away (offline)</p>
							<p class="basicText">Price: 200,000 Coins</p>
						</div>
						<div class="basicDiv" id="buyANewTree">
							<button class="specialButton" onclick="buy('forestTree2', 1e6)">Buy A New Tree</button>
							<p class="basicText">An orchardist recommends this new type of tree</p>
							<p class="basicText">Price: 1,000,000 Coins</p>
						</div>
						<div class="basicDiv" id="buyAMapDiv5">
							<button class="specialButton" onclick="buy('maps', 1e7)">Buy An Enormous Map</button>
							<p class="basicText">These map prices are getting absurd...</p>
							<p class="basicText">Price: 10,000,000 Coins</p>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div id="hiringArea">
            <div style="display:inline-block;width:380px;">
                <div class="basicDiv">
					<div id="hireToggleButtons">
						<button class="specialButton" id="hireEmployeeToggleButton"    onclick="gameData.typeToHireToggle = 'basic'" >Basic Employees</button>
						<button class="specialButton" id="hireBrokerToggleButton"      onclick="gameData.typeToHireToggle = 'broker'" >Currency Brokers</button>
						<button class="specialButton" id="hirePieMerchantToggleButton" onclick="gameData.typeToHireToggle = 'pie'" >Pie Merchant</button>
					</div>
                    <button class="specialButton" id="advertiseButton" onclick="advertise()">Advertise your lime business</button>
					<div id="autoAdvertiseBrokerDiv">
					    <button class="specialButton" id="autoAdvertiseBrokerButton" style="display:inline-block" onclick="toggle('autoAdvertiseBroker')">Auto</button>
						<p class="basicText">Rule:</p>
						<p class="basicText" id="textForAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button class="specialButton" onclick="decreaseValue('autoAdvertiseSpeedValue')" style="width:168px">Decrease</button>
						<button class="specialButton" onclick="gameData.autoAdvertiseSpeedValue += 1" style="width:168px">Increase</button>
					<div id="smarterAdvertisingBrokerRule">
						<p class="basicText" id="textForSmarterAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button class="specialButton" onclick="decreaseValue('autoAdvertiseAmountValue')" style="width:168px">Decrease</button>
						<button class="specialButton" onclick="gameData.autoAdvertiseAmountValue += 1" style="width:168px">Increase</button>
					</div>
					</div>
					<div class="skillProgress" id="advertiseProgress">
                        <div class="skillBar" id="advertiseBar">0%</div>
                    </div>
                    <p class="basicText" id="advertisePrice">Price: 10 Coins</p>
                    <button id="application" style="display:block;width:300px;margin:auto;background-color:#DEAD85;white-space: pre-wrap;" onclick="employeeTypes[gameData.applicationType].onHire()">Pin applications here</button>
                    <p class="basicText" id="applicationInfo">Click the application to accept</p>
                </div>
                <div id="autoBrokerAdvertiser" class="basicDiv">
                    <button class="specialButton" onclick="buyAdvertisingManager()">Advertising Manager</button>
                    <p class="basicText">Take on a manager to help you advertise for brokers</p>
                    <p class="basicText">Price: 10 Alpha Coins</p>
                </div>
                <div id="smarterAutoBrokerAdvertiser" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('smarterAdvertisingManagerBroker', 50 , 'alphaCoins')">Smarter Advertising Manager</button>
                    <p class="basicText">Add a new rule for your advertising manager</p>
                    <p class="basicText">Price: 50 Alpha Coins</p>
                </div>
                <div class="basicDiv" id="researchBetterAdvertising">
                    <button class="specialButton" onclick="buy('advertisingLevel1', 200)">Research Better Advertising Methods</button>
                    <p class="basicText">Price: 200 Coins</p>
                </div>
                <div id="advertisingMethods">
                    <div class="basicDiv" id="advertisingLeaflets">
                        <button class="specialButton" onclick="buy('advertisingLevel2', 100)">Hand Out Leaflets</button>
                        <p class="basicText">Doubles advertising speed</p>
                        <p class="basicText">Price: 100 Coins</p>
                    </div>
                    <div class="basicDiv" id="advertisingBillboard">
                        <button class="specialButton" onclick="buy('advertisingLevel3', 500)">Buy A Billboard</button>
                        <p class="basicText">Triples advertising speed</p>
                        <p class="basicText">Price: 500 Coins</p>
                    </div>
                </div>
				<div class="basicDiv" id="offlineEmployee">
					<button class="specialButton" onclick="buy('surveillanceCamera', 1000)">Buy A Surveillance Camera</button>
					<p class="basicText">Make sure employees are working while you're away (offline)</p>
					<p class="basicText">Price: 1,000 Coins</p>
				</div>
            </div>
        </div>
        <div id="travel" style="display:none;width:380px;">
            <div id="travellingArea">
                <div class="basicDiv">
                    <p class="basicText">Travelling</p>
                    <p class="basicText">Leave your items behind in search of a better town</p>
                    <p class="basicText">All purchases with red buttons stay with you after travels</p>
                </div>
                <div class="basicDiv">
					<div id="alphaCoinToMegaCoinDiv">
						<button class="specialButton" style="width:300px;"                             onclick="buyMegaCoinsWithAlphaCoins(1)">Transfer Alpha Coins</button>
						<button class="specialButton" style="width:300px;" id="transferAlphaCoinsBulk" onclick="buyMegaCoinsWithAlphaCoins(10)">Transfer Alpha Coins x10</button>
						<p class="basicText">10 Alpha Coins -> 1 Mega Coin In Bank</p>
					</div>
                    <button class="specialButton" onclick="buyMegaCoins()">Transfer Coins</button>
                    <p class="basicText">10,000 Coins -> 5 Mega Coins in the bank</p>
                    <p class="basicText">Transfer money to a bank account in the next town</p>
                    <p class="basicText">You can only spend this money once you arrive</p>
                    <p class="basicText" id="buyMegaCoinsTimes">Transfer times: 0 / 10</p>
                    <p class="basicText" id="textForMegaCoinsInBank">0 Mega Coins In Bank</p>
                    <button class="specialButton" onclick="convertCoinsNow()">Convert Coins</button>
                    <p class="basicText">100,000 Coins -> 1 Mega Coin now</p>
			        <p class="basicText">Get access to mega coins in this town, but takes twice as long every time</p>
					<div class="skillProgress" id="convertCoinsNowProgress">
						<div class="skillBar" id="convertCoinsNowBar">0%</div>
					</div>
                </div>
                <div class="basicDiv">
                    <button class="specialButton" onclick="travelToNextVillage()">Travel To Next Village</button>
                </div>
            </div>
            <div class="basicDiv" id="buyBigGloves">
                <button class="specialButtonTravel" onclick="universalBuy('bigGloves', 5, 'megaCoins')">Buy Big Gloves</button>
                <p class="basicText">Helps you pick up double limes!</p>
                <p class="basicText">Price: 5 Mega Coins</p>
            </div>
            <div class="basicDiv" id="hireANutritionist">
                <button class="specialButtonTravel" onclick="universalBuy('nutritionists', 5, 'megaCoins')">Hire A Nutritionist</button>
                <p class="basicText">Get double the nutrition from eating</p>
                <p class="basicText">Price: 5 Mega Coins</p>
            </div>
            <div class="basicDiv" id="increaseCreditScore">
                <button class="specialButtonTravel" onclick="increaseCreditScore()">Increase Credit Score</button>
                <p class="basicText">Store up to 50 Mega Coins in your bank account</p>
                <p class="basicText">Price: 2 Mega Coins</p>
            </div>
            <div class="basicDiv" id="juiceMarketing">
                <button class="specialButtonTravel" onclick="universalBuy('nationalJuiceMarketing', 10, 'megaCoins')">National Juice Marketing</button>
                <p class="basicText">Convince the country that juice can be added to anything!</p>
                <p class="basicText">Doubles juice sale price</p>
                <p class="basicText">Price: 10 Mega Coins</p>
            </div>
            <div class="basicDiv" id="betterTraining">
                <button class="specialButtonTravel" onclick="buyBetterTraining()">Search For Specialised Workers</button>
                <p class="basicText">Increases maximum applicant speed by 100%</p>
                <p class="basicText">The search gets more difficult the more you find</p>
                <p class="basicText" id="betterTrainingPrice">Price: 1 Mega Coins</p>
            </div>
            <div class="basicDiv" id="upgradeMoreStorage">
                <button class="specialButtonTravel" onclick="upgradeMoreStorage()">Buy More Land</button>
                <p class="basicText">Increases maximum juicers by 500</p>
                <p class="basicText">Increases maximum peelers by 2,500</p>
                <p class="basicText" id="upgradeMoreStoragePrice"></p>
            </div>
            <div class="basicDiv" id="earnBachelorFinance">
                <button class="specialButton" onclick="universalBuy('bachelorsDegreeFinance', 20, 'megaCoins')">'Earn' A Bachelors Degree In Finance</button>
                <p class="basicText">Access the Currency Exchange market</p>
                <p class="basicText">Price: 20 Mega Coins</p>
            </div>
            <div class="basicDiv" id="increaseCreditScore2">
                <button class="specialButtonTravel" onclick="increaseCreditScore2()">Increase Credit Score</button>
                <p class="basicText">Store up to 200 Mega Coins in your bank account</p>
                <p class="basicText">Price: 5 Mega Coins</p>
            </div>
            <div class="basicDiv" id="increaseCreditScore3">
                <button class="specialButtonTravel" onclick="increaseCreditScore3()">Increase Credit Score</button>
                <p class="basicText">Store up to 1,000 Mega Coins in your bank account</p>
                <p class="basicText">Price: 50 Mega Coins</p>
            </div>
            <div class="basicDiv" id="buyABiggerWallet">
                <button class="specialButtonTravel" onclick="buyABiggerWallet()">Buy A Bigger Wallet</button>
                <p class="basicText">Store up to +1,000,000 coins</p>
                <p class="basicText">Price: 50 Mega Coins</p>
            </div>
            <div class="basicDiv" id="rottenActualWisdom">
                <button class="specialButtonTravel" onclick="rottenActualWisdom()">Rotten (Actual) Wisdom</button>
                <p class="basicText">Lowers the max skill level of Rotten Wisdom from 50 to 25</p>
                <p class="basicText">Price: 50 Mega Coins</p>
            </div>
        </div>
        <div id="trade" style="width:380px" >
            <div class="basicDiv" id="earnAlphaCoins">
                <button class="currencyButton" id="coinsToAlphaClickButton" style="display:inline-block;background-color:#FDFF9A" onclick="coinsToAlphaStart()">Convert Coins to Alpha Coins</button>
                <button class="specialButton" id="alphaCoinConvertBulkButton" style="width:40px" onclick="toggle('alphaCoinConvertBulkToggle')">x10</button>
				<div class="skillProgress" id="coinsToAlphaProgress">
					<div class="skillBar" id="coinsToAlphaBar">0%</div>
				</div>
                <p class="basicText" id="alphaCoinExhangeRate" >Exchange Rate: 100 Coins -> 1 Alpha Coin</p>
                <p class="basicText" id="alphaCoinTransactionFee" >Transfer Fee: 1,000 Coins</p>
                <p class="basicText" id="alphaCoinTotalPrice" >Total Price: 1,100 Coins</p>
            </div>
			<div id="unlockCurrencyBrokers" class="basicDiv">
				<button class="specialButton" onclick="universalBuy('unlockCurrencyBrokers', 5 , 'alphaCoins')">Unlock currency brokers</button>
				<p class="basicText">This fee seems a little unfair!</p>
				<p class="basicText">Unlock the ability to hire currency brokers in the Hiring Area</p>
				<p class="basicText">Price: 5 Alpha Coins</p>
			</div>
			<div id="brokerApplicantUpgrades">
				<div class="basicDiv">
					<p class="basicText" style="background-color:#FDFF9A">Applicant Speed</p>
					<button class="specialButton" onclick="brokerApplicantNew('Speed', -1, 'min', 'gameData.minBrokerApplicantSpeed > 1')" style="width:168px">Decrease Minimum</button>
					<button class="specialButton" onclick="brokerApplicantNew('Speed', -1, 'max')" style="width:168px">Decrease Maximum</button>
					<p class="basicText" id="textForBrokerApplicantSpeed">Currently 20 - 100 Seconds</p>
					<p class="basicText" id="brokerApplicantSpeedPrice">Price: 1 Alpha Coins</p>
				</div>
				<div class="basicDiv">
					<p class="basicText" style="background-color:#FDFF9A">Applicant Fee</p>
					<button class="specialButton" onclick="brokerApplicantNew('Fee', -100, 'min', 'gameData.minBrokerApplicantFee > 0')" style="width:168px">Decrease Minimum</button>
					<button class="specialButton" onclick="brokerApplicantNew('Fee', -100, 'max')" style="width:168px">Decrease Maximum</button>
					<p class="basicText" id="textForBrokerApplicantFee">Currently 10,000 - 200,000 Coins</p>
					<p class="basicText" id="brokerApplicantFeePrice">Price: 1 Alpha Coins</p>
				</div>
				<div class="basicDiv">
					<p class="basicText" style="background-color:#FDFF9A">Applicant Alpha Coin Transfer Amount</p>
					<button class="specialButton" onclick="brokerApplicantNew('Amount', 1, 'min')" style="width:168px">Increase Minimum</button>
					<button class="specialButton" onclick="brokerApplicantNew('Amount', 1, 'max')" style="width:168px">Increase Maximum</button>
					<p class="basicText" id="textForBrokerApplicantAmount">Currently 1 - 5 Alpha Coins</p>
					<p class="basicText" id="brokerApplicantAmountPrice">Price: 1 Alpha Coins</p>
				</div>
                <div id="autoCurrencyConversion" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('autoCurrencyConversionBuy', 10, 'alphaCoins')">Auto Converter</button>
                    <p class="basicText">Make currency conversion a toggleable task</p>
                    <p class="basicText">Price: 10 Alpha Coins</p>
                </div>
                <div id="tomeDiv3" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('tomes', 50, 'alphaCoins')">Buy A Tome</button>
                    <p class="basicText">Tomes can teach you new skills!</p>
                    <p class="basicText">Price: 50 Alpha Coins</p>
                </div>
                <div id="tomeDiv4" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('tomes', 100, 'alphaCoins')">Buy A Golden Tome</button>
                    <p class="basicText">The orchardist says those limes are useful for something...</p>
                    <p class="basicText">Price: 100 Alpha Coins</p>
                </div>
                <div id="skillTrainer" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('skillTrainer', 50, 'alphaCoins')">Hire A Trainer</button>
                    <p class="basicText">This trainer will help you to instantly complete a skill's level</p>
                    <p class="basicText">Price: 50 Alpha Coins</p>
                </div>
                <div id="changeResearchersBy10Unlock" class="basicDiv">
                    <button class="specialButtonTravel" onclick="universalBuy('changeResearchersBy10Unlock', 100, 'alphaCoins')">Unlock Bulk Researcher Transfer</button>
                    <p class="basicText">Cart researchers around rather than giving them any special attention</p>
                    <p class="basicText">Price: 100 Alpha Coins</p>
                </div>		
                <div id="saveAlphaCoinsUnlock" class="basicDiv">
                    <button class="specialButtonTravel" onclick="universalBuy('saveAlphaCoinsUnlock', 1000, 'alphaCoins')">Buy A Safe On Wheels</button>
                    <p class="basicText">Bring your alpha coins with you during your travels without pesky plebeians stealing them</p>
                    <p class="basicText">Price: 1,000 Alpha Coins</p>
                </div>				
                <div id="transferAlphaCoinsBulkUnlock" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('transferAlphaCoinsBulkUnlock', 1000, 'alphaCoins')">Buy Alpha Coin Rolls</button>
                    <p class="basicText">Unlocks bulk alpha coin -> mega coin transfer</p>
                    <p class="basicText">Price: 1,000 Alpha Coins</p>
                </div>	
                <div id="transferAlphaCoinBagsUnlock" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('transferAlphaCoinBags', 10000, 'alphaCoins')">Buy Alpha Coin Bags</button>
                    <p class="basicText">These bags help you convert more coins at a time</p>
                    <p class="basicText">Price: 10,000 Alpha Coins</p>
                </div>
			</div>
            <div class="basicDiv" id="earnBetaCoins">
				<div id="basicAlphaToBetaBrokerRule" style="display:none">
					<p class="basicText" id="textForA2BBrokerRule">Converts Alpha Coins to Beta Coins if the conversion rate is below 1,000</p>
					<button class="specialButton" onclick="decreaseBasicA2BBrokerRule()" style="width:168px">Decrease</button>
					<button class="specialButton" onclick="increaseBasicA2BBrokerRule()" style="width:168px">Increase</button>
                    <button class="specialButton" id="textForA2BBrokerAmountToggleButton" style="width:250px" onclick="toggle('textForA2BBrokerAmountToggle')"></button>
					<button class="specialButton" id="textForA2BBrokerPrice" style="width:250px" onclick="increaseBasicA2BBrokerAmount()">Increase for 2 Pie Coins</button>
				</div>
                <button class="currencyButton" id="alphaToBetaClickButton" style="display:block;background-color:#FDFF9A" onclick="pickCurrentTask('alphaToBetaClick')">Convert Alpha Coins to Beta Coins</button>
				<div class="skillProgress" id="alphaToBetaProgress">
					<div class="skillBar" id="alphaToBetaBar">0%</div>
				</div>
                <p class="basicText" id="betaCoinExhangeRate" >Exchange Rate: 100 Alpha Coins -> 1 Beta Coin</p>
                <p class="basicText" id="betaCoinTotalPrice" >Total Price: 100 Coins</p>
            </div>
			<div id="basicAlphaToBetaBroker" class="basicDiv">
				<button class="specialButton" onclick="universalBuy('basicAlphaToBetaBroker', 20, 'betaCoins')">Hire Basic Alpha Coin -> Beta Coin Broker</button>
				<p class="basicText">Hire someone to convert for you</p>
				<p class="basicText">Price: 20 Beta Coins</p>
			</div>
        </div>
`;
