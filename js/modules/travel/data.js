travelUpgrades = [
    {
        id: 'upgradeNutritionist',
        text: 'Nutritionist',
        description: 'Doubles food points from eating',
        requirement: 'gameData.nutritionists'
    },
	{
		id: 'upgradeJuicePricePermanance',
		text: 'Juice Price Permanance',
		description: 'Juice price is saved after travelling',
		requirement: 'gameData.increaseJuicePricePermanance'
	},
	{
		id: 'upgradeCreditScore',
		text: 'Credit Score',
		description: 'Increases max Mega Coins in the bank',
		requirement: 'gameData.megaCoinsInBankMax > 20'
	},
	{
		id: 'upgradeBigGloves',
		text: 'Big Gloves',
		description: 'Helps you pick up double limes!',
		requirement: 'gameData.bigGloves'
	},
	{
		id: 'upgradeManuscripts',
		text: 'Manuscripts',
		description: 'Keep 1,000 respect milestone after travelling',
		requirement: 'gameData.manuscripts'
	},
	{
		id: 'upgradeBetterTraining',
		text: 'Better Training',
		description: 'Increases maximum applicant speed',
		requirement: 'gameData.betterTraining'
	},
	{
		id: 'upgradeJuiceMarketing',
		text: 'National Juice Marketing',
		description: 'Doubles juice sale price',
		requirement: 'gameData.nationalJuiceMarketing'
	},
	{
		id: 'upgradeWallet',
		text: 'Wallet',
		description: 'Increases maximum coin storage',
		requirement: 'gameData.coinsMax > 1e6'
	},
	{
		id: 'upgradeMoreLand',
		text: 'More Land',
		description: 'Increases maximum juicers and peelers',
		requirement: 'gameData.upgradeMoreStorage'
	},
	{
		id: 'upgradeBenevolence',
		text: 'Benevolence',
		description: 'Increases the amount of respect you get from helping civilians',
		requirement: 'gameData.unlockBenevolence'
	},
	{
		id: 'upgradeHighTechSurveillance',
		text: 'High Tech Surveillance Camera',
		description: 'Makes sure researchers are working while you&#39re away',
		requirement: 'gameData.surveillanceCamera2'
	},
	{
		id: 'upgradeChangeResearchersBy10',
		text: 'Bulk Researcher Transfer',
		description: 'Cart researchers around rather than giving them any special attention',
		requirement: 'gameData.changeResearchersBy10Unlock'
	},
	{
		id: 'upgradeSaveAlphaCoinsUnlock',
		text: 'A Safe On Wheels',
		description: 'Keep alpha coins after travelling',
		requirement: 'gameData.saveAlphaCoinsUnlock'
	},
	{
		id: 'upgradeRottenActualWisdomUnlock',
		text: 'Rotten (Actual) Wisdom',
		description: 'Lowers the max skill level of Rotten Wisdom from 50 to 25',
		requirement: 'gameData.rottenActualWisdom'
	}
]

document.getElementById('travel').innerHTML = `            
<div id="travellingArea">
	<div class="basicDiv">
		<p class="basicText">Travelling</p>
		<p class="basicText">Leave your items behind in search of a better town</p>
		<p class="basicText">All purchases with red buttons stay with you after travels</p>
	</div>
	<div class="basicDiv">
		<div id="alphaCoinToMegaCoinDiv">
			<button style="width:300px;"                             onclick="buyMegaCoinsWithAlphaCoins(1)">Transfer Alpha Coins</button>
			<button style="width:300px;" id="transferAlphaCoinsBulk" onclick="buyMegaCoinsWithAlphaCoins(10)">Transfer Alpha Coins x10</button>
			<p class="basicText">10 Alpha Coins -> 1 Mega Coin In Bank</p>
		</div>
		<button onclick="buyMegaCoins()">Transfer Coins</button>
		<p class="basicText">10,000 Coins -> 5 Mega Coins in the bank</p>
		<p class="basicText">Transfer money to a bank account in the next town</p>
		<p class="basicText">You can only spend this money once you arrive</p>
		<p class="basicText" id="buyMegaCoinsTimes">Transfer times: 0 / 10</p>
		<p class="basicText" id="textForMegaCoinsInBank">0 Mega Coins In Bank</p>
		<button onclick="convertCoinsNow()">Convert Coins</button>
		<p class="basicText">100,000 Coins -> 1 Mega Coin now</p>
		<p class="basicText">Get access to mega coins in this town, but takes twice as long every time</p>
		<div class="skillProgress" id="convertCoinsNowProgress">
			<div class="skillBar" id="convertCoinsNowBar"></div>
		</div>
	</div>
	<div class="basicDiv">
		<button onclick="travelToNextVillage()">Travel To Next Village</button>
	</div>
</div>
<div class="basicDiv" id="buyBigGloves">
	<button class="travelButton" onclick="buy('bigGloves', 5, 'megaCoins')">Buy Big Gloves</button>
	<p class="basicText">Helps you pick up double limes!</p>
	<p class="basicText">Price: 5 Mega Coins</p>
</div>
<div class="basicDiv" id="hireANutritionist">
	<button class="travelButton" onclick="buy('nutritionists', 5, 'megaCoins')">Hire A Nutritionist</button>
	<p class="basicText">Get double the nutrition from eating</p>
	<p class="basicText">Price: 5 Mega Coins</p>
</div>
<div class="basicDiv" id="increaseCreditScore">
	<button class="travelButton" onclick="increaseCreditScore()">Increase Credit Score</button>
	<p class="basicText">Store up to 50 Mega Coins in your bank account</p>
	<p class="basicText">Price: 2 Mega Coins</p>
</div>
<div class="basicDiv" id="juiceMarketing">
	<button class="travelButton" onclick="buy('nationalJuiceMarketing', 10, 'megaCoins')">National Juice Marketing</button>
	<p class="basicText">Convince the country that juice can be added to anything!</p>
	<p class="basicText">Doubles juice sale price</p>
	<p class="basicText">Price: 10 Mega Coins</p>
</div>
<div class="basicDiv" id="betterTraining">
	<button class="travelButton" onclick="buyBetterTraining()">Search For Specialised Workers</button>
	<p class="basicText">Increases maximum applicant speed by 100%</p>
	<p class="basicText">The search gets more difficult the more you find</p>
	<p class="basicText" id="betterTrainingPrice">Price: 1 Mega Coins</p>
</div>
<div class="basicDiv" id="upgradeMoreStorage">
	<button class="travelButton" onclick="upgradeMoreStorage()">Buy More Land</button>
	<p class="basicText">Increases maximum juicers by 500</p>
	<p class="basicText">Increases maximum peelers by 2,500</p>
	<p class="basicText" id="upgradeMoreStoragePrice"></p>
</div>
<div class="basicDiv" id="earnBachelorFinance">
	<button onclick="buy('bachelorsDegreeFinance', 20, 'megaCoins')">'Earn' A Bachelors Degree In Finance</button>
	<p class="basicText">Access the Currency Exchange market</p>
	<p class="basicText">Price: 20 Mega Coins</p>
</div>
<div class="basicDiv" id="increaseCreditScore2">
	<button class="travelButton" onclick="increaseCreditScore2()">Increase Credit Score</button>
	<p class="basicText">Store up to 200 Mega Coins in your bank account</p>
	<p class="basicText">Price: 5 Mega Coins</p>
</div>
<div class="basicDiv" id="increaseCreditScore3">
	<button class="travelButton" onclick="increaseCreditScore3()">Increase Credit Score</button>
	<p class="basicText">Store up to 1,000 Mega Coins in your bank account</p>
	<p class="basicText">Price: 50 Mega Coins</p>
</div>
<div class="basicDiv" id="buyABiggerWallet">
	<button class="travelButton" onclick="buyABiggerWallet()">Buy A Bigger Wallet</button>
	<p class="basicText">Store up to +1,000,000 coins</p>
	<p class="basicText">Price: 50 Mega Coins</p>
</div>
<div class="basicDiv" id="rottenActualWisdom">
	<button class="travelButton" onclick="rottenActualWisdom()">Rotten (Actual) Wisdom</button>
	<p class="basicText">Lowers the max skill level of Rotten Wisdom from 50 to 25</p>
	<p class="basicText">Price: 50 Mega Coins</p>
</div>
`