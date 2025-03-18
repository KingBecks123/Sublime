travelUpgrades = [
    {
        id: 'upgradeNutritionist',
        text: 'Nutritionist',
        description: 'Doubles food points from eating',
        requirement: 'game.nutritionists'
    },
	{
		id: 'upgradeJuicePricePermanance',
		text: 'Juice Price Permanance',
		description: 'Juice price is saved after travelling',
		requirement: 'game.increaseJuicePricePermanance'
	},
	{
		id: 'upgradeCreditScore',
		text: 'Credit Score',
		description: 'Increases max Mega Coins in the bank',
		requirement: 'game.megaCoinsInBankMax > 20'
	},
	{
		id: 'upgradeBigGloves',
		text: 'Big Gloves',
		description: 'Helps you pick up double limes!',
		requirement: 'game.bigGloves'
	},
	{
		id: 'upgradeManuscripts',
		text: 'Manuscripts',
		description: 'Keep 1,000 respect milestone after travelling',
		requirement: 'game.manuscripts'
	},
	{
		id: 'upgradeBetterTraining',
		text: 'Better Training',
		description: 'Increases maximum applicant speed',
		requirement: 'game.betterTraining'
	},
	{
		id: 'upgradeJuiceMarketing',
		text: 'National Juice Marketing',
		description: 'Doubles juice sale price',
		requirement: 'game.nationalJuiceMarketing'
	},
	{
		id: 'upgradeWallet',
		text: 'Wallet',
		description: 'Increases maximum coin storage',
		requirement: 'game.coinsMax > 1e6'
	},
	{
		id: 'upgradeMoreLand',
		text: 'More Land',
		description: 'Increases maximum juicers and peelers',
		requirement: 'game.upgradeMoreStorage'
	},
	{
		id: 'upgradeBenevolence',
		text: 'Benevolence',
		description: 'Increases the amount of respect you get from helping civilians',
		requirement: 'game.unlockBenevolence'
	},
	{
		id: 'upgradeHighTechSurveillance',
		text: 'High Tech Surveillance Camera',
		description: 'Makes sure researchers are working while you&#39re away',
		requirement: 'game.surveillanceCamera2'
	},
	{
		id: 'upgradeChangeResearchersBy10',
		text: 'Bulk Researcher Transfer',
		description: 'Cart researchers around rather than giving them any special attention',
		requirement: 'game.changeResearchersBy10Unlock'
	},
	{
		id: 'upgradeSaveAlphaCoinsUnlock',
		text: 'A Safe On Wheels',
		description: 'Keep alpha coins after travelling',
		requirement: 'game.saveAlphaCoinsUnlock'
	},
	{
		id: 'upgradeRottenActualWisdomUnlock',
		text: 'Rotten (Actual) Wisdom',
		description: 'Lowers the max skill level of Rotten Wisdom from 50 to 25',
		requirement: 'game.rottenActualWisdom'
	}
]

document.getElementById('travel').innerHTML = `            
<div id="travellingArea">
	<div class="basicDiv">
		<p>Travelling</p>
		<p>Leave your items behind in search of a better town</p>
		<p>All purchases with red buttons stay with you after travels</p>
	</div>
	<div class="basicDiv">
		<div id="alphaCoinToMegaCoinDiv">
			<button style="width:300px;"                             onclick="buyMegaCoinsWithAlphaCoins(1)">Transfer Alpha Coins</button>
			<button style="width:300px;" id="transferAlphaCoinsBulk" onclick="buyMegaCoinsWithAlphaCoins(10)">Transfer Alpha Coins x10</button>
			<p>10 Alpha Coins -> 1 Mega Coin In Bank</p>
		</div>
		<button onclick="buyMegaCoins()">Transfer Coins</button>
		<p>10,000 Coins -> 5 Mega Coins in the bank</p>
		<p>Transfer money to a bank account in the next town</p>
		<p>You can only spend this money once you arrive</p>
		<p id="buyMegaCoinsTimes">Transfer times: 0 / 10</p>
		<p id="textForMegaCoinsInBank">0 Mega Coins In Bank</p>
		<button onclick="convertCoinsNow()">Convert Coins</button>
		<p>100,000 Coins -> 1 Mega Coin now</p>
		<p>Get access to mega coins in this town, but takes twice as long every time</p>
		<div class="skillProgress" id="convertCoinsNowProgress">
			<div class="skillBar" id="convertCoinsNowBar"></div>
		</div>
	</div>
	<div class="basicDiv">
		<button onclick="travelToNextVillage()">Travel To Next Village</button>
	</div>
</div>
`

const travelUpgradesToBuy = [
    {
        id: "buyBigGloves",
        text: "Big Gloves",
        description: "Helps you pick up double limes!",
        price: {
            currency: "megaCoins",
            amount: 5,
            text: "5 Mega Coins"
        },
        function: "buy('bigGloves', 5, 'megaCoins')"
    },
    {
        id: "hireANutritionist",
        text: "Hire A Nutritionist",
        description: "Get double the nutrition from eating",
        price: {
            currency: "megaCoins",
            amount: 5,
            text: "5 Mega Coins"
        },
        function: "buy('nutritionists', 5, 'megaCoins')"
    },
    {
        id: "increaseCreditScore",
        text: "Increase Credit Score",
        description: "Store up to 50 Mega Coins in your bank account",
        price: {
            currency: "megaCoins",
            amount: 2,
            text: "2 Mega Coins"
        },
        function: "increaseCreditScore()"
    },
    {
        id: "juiceMarketing",
        text: "National Juice Marketing",
        description: "Convince the country that juice can be added to anything!",
        price: {
            currency: "megaCoins",
            amount: 10,
            text: "10 Mega Coins"
        },
        function: "buy('nationalJuiceMarketing', 10, 'megaCoins')"
    },
    {
        id: "betterTraining",
        text: "Search For Specialised Workers",
        description: "Increases maximum applicant speed by 100%",
        price: {
            currency: "megaCoins",
            amount: 1,
            text: "1 Mega Coin"
        },
        function: "buyBetterTraining()"
    },
    {
        id: "upgradeMoreStorage",
        text: "Buy More Land",
        description: "Increases maximum juicers by 500",
        price: {
            currency: "megaCoins",
            amount: 10,
            text: "10 Mega Coins"
        },
        function: "upgradeMoreStorage()"
    },
    {
        id: "earnBachelorFinance",
        text: "'Earn' A Bachelors Degree In Finance",
        description: "Access the Currency Exchange market",
        price: {
            currency: "megaCoins",
            amount: 20,
            text: "20 Mega Coins"
        },
        function: "buy('bachelorsDegreeFinance', 20, 'megaCoins')"
    },
    {
        id: "increaseCreditScore2",
        text: "Increase Credit Score",
        description: "Store up to 200 Mega Coins in your bank account",
        price: {
            currency: "megaCoins",
            amount: 5,
            text: "5 Mega Coins"
        },
        function: "increaseCreditScore2()"
    },
    {
        id: "increaseCreditScore3",
        text: "Increase Credit Score",
        description: "Store up to 1,000 Mega Coins in your bank account",
        price: {
            currency: "megaCoins",
            amount: 50,
            text: "50 Mega Coins"
        },
        function: "increaseCreditScore3()"
    },
    {
        id: "buyABiggerWallet",
        text: "Buy A Bigger Wallet",
        description: "Store up to +1,000,000 coins",
        price: {
            currency: "megaCoins",
            amount: 50,
            text: "50 Mega Coins"
        },
        function: "buyABiggerWallet()"
    },
    {
        id: "rottenActualWisdom",
        text: "Rotten (Actual) Wisdom",
        description: "Lowers the max skill level of Rotten Wisdom from 50 to 25",
        price: {
            currency: "megaCoins",
            amount: 50,
            text: "50 Mega Coins"
        },
        function: "rottenActualWisdom()"
    }
]