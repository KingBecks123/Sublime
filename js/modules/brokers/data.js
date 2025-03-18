addInventoryVariables([
	{
		id: 'alphaCoins',
		color1: 'FFAA01'
	},	
	{
		id: 'betaCoins',
		color1: 'F8FF01'
	},	
]);

addGameVariables({
	betaCoinsExchangeRate: 2500,
	betaCoinTransferAmount: 1,
	alphaToBetaBar: 0,
	basicAlphaToBetaBroker: 0,
	basicA2BBrokerRule: 1000,
	basicA2BBrokerAmount: 1,
	increaseBasicA2BBrokerAmountPrice: 2,
	textForA2BBrokerAmountToggle: 0,
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
	transferAlphaCoinBags: 0,
	alphaCoinConvertBulkToggle: 0,
	alphaCoinConvertBulkToggleSet: 0,
	alphaCoinsExchangeRate: 100,
	amountCoinsToAlpha: 0,
	amountCoinsToAlphaMax: 10,
});

document.getElementById('trade').innerHTML = `
            <div class="basicDiv" id="earnAlphaCoins">
                <button class="currencyButton" id="coinsToAlphaClickButton" style="display:inline-block;background-color:#FDFF9A" onclick="coinsToAlphaStart()">Convert Coins to Alpha Coins</button>
                <button id="alphaCoinConvertBulkButton" style="width:40px" onclick="toggle('alphaCoinConvertBulkToggle')">x10</button>
				<div class="skillProgress" id="coinsToAlphaProgress">
					<div class="skillBar" id="coinsToAlphaBar"></div>
				</div>
                <p id="alphaCoinExhangeRate" >Exchange Rate: 100 Coins -> 1 Alpha Coin</p>
                <p id="alphaCoinTransactionFee" >Transfer Fee: 1,000 Coins</p>
                <p id="alphaCoinTotalPrice" >Total Price: 1,100 Coins</p>
            </div>
			<div id="unlockCurrencyBrokers" class="basicDiv">
				<button onclick="buy('unlockCurrencyBrokers', 5 , 'alphaCoins')">Unlock currency brokers</button>
				<p>This fee seems a little unfair!</p>
				<p>Unlock the ability to hire currency brokers in the Hiring Area</p>
				<p>Price: 5 Alpha Coins</p>
			</div>
			<div id="brokerApplicantUpgrades">
				<div class="basicDiv">
					<p style="background-color:#FDFF9A">Applicant Speed</p>
					<button onclick="brokerApplicantNew('Speed', -1, 'min', 'gameData.minBrokerApplicantSpeed > 1')" style="width:166px">Decrease Minimum</button>
					<button onclick="brokerApplicantNew('Speed', -1, 'max')" style="width:166px">Decrease Maximum</button>
					<p id="textForBrokerApplicantSpeed">Currently 20 - 100 Seconds</p>
					<p id="brokerApplicantSpeedPrice">Price: 1 Alpha Coins</p>
				</div>
				<div class="basicDiv">
					<p style="background-color:#FDFF9A">Applicant Fee</p>
					<button onclick="brokerApplicantNew('Fee', -100, 'min', 'gameData.minBrokerApplicantFee > 0')" style="width:166px">Decrease Minimum</button>
					<button onclick="brokerApplicantNew('Fee', -100, 'max')" style="width:166px">Decrease Maximum</button>
					<p id="textForBrokerApplicantFee">Currently 10,000 - 200,000 Coins</p>
					<p id="brokerApplicantFeePrice">Price: 1 Alpha Coins</p>
				</div>
				<div class="basicDiv">
					<p style="background-color:#FDFF9A">Applicant Alpha Coin Transfer Amount</p>
					<button onclick="brokerApplicantNew('Amount', 1, 'min')" style="width:166px">Increase Minimum</button>
					<button onclick="brokerApplicantNew('Amount', 1, 'max')" style="width:166px">Increase Maximum</button>
					<p id="textForBrokerApplicantAmount">Currently 1 - 5 Alpha Coins</p>
					<p id="brokerApplicantAmountPrice">Price: 1 Alpha Coins</p>
				</div>
                <div id="autoCurrencyConversion" class="basicDiv">
                    <button onclick="buy('autoCurrencyConversionBuy', 10, 'alphaCoins')">Auto Converter</button>
                    <p>Make currency conversion a toggleable task</p>
                    <p>Price: 10 Alpha Coins</p>
                </div>
                <div id="tomeDiv3" class="basicDiv">
                    <button onclick="buy('tomes', 50, 'alphaCoins')">Buy A Tome</button>
                    <p>Tomes can teach you new skills!</p>
                    <p>Price: 50 Alpha Coins</p>
                </div>
                <div id="tomeDiv4" class="basicDiv">
                    <button onclick="buy('tomes', 100, 'alphaCoins')">Buy A Golden Tome</button>
                    <p>The orchardist says those limes are useful for something...</p>
                    <p>Price: 100 Alpha Coins</p>
                </div>
                <div id="skillTrainer" class="basicDiv">
                    <button onclick="buy('skillTrainer', 50, 'alphaCoins')">Hire A Trainer</button>
                    <p>This trainer will help you to instantly complete a skill's level</p>
                    <p>Price: 50 Alpha Coins</p>
                </div>
                <div id="changeResearchersBy10Unlock" class="basicDiv">
                    <button class="travelButton" onclick="buy('changeResearchersBy10Unlock', 100, 'alphaCoins')">Unlock Bulk Researcher Transfer</button>
                    <p>Cart researchers around rather than giving them any special attention</p>
                    <p>Price: 100 Alpha Coins</p>
                </div>		
                <div id="saveAlphaCoinsUnlock" class="basicDiv">
                    <button class="travelButton" onclick="buy('saveAlphaCoinsUnlock', 1000, 'alphaCoins')">Buy A Safe On Wheels</button>
                    <p>Bring your alpha coins with you during your travels without pesky plebeians stealing them</p>
                    <p>Price: 1,000 Alpha Coins</p>
                </div>				
                <div id="transferAlphaCoinsBulkUnlock" class="basicDiv">
                    <button onclick="buy('transferAlphaCoinsBulkUnlock', 1000, 'alphaCoins')">Buy Alpha Coin Rolls</button>
                    <p>Unlocks bulk alpha coin -> mega coin transfer</p>
                    <p>Price: 1,000 Alpha Coins</p>
                </div>	
                <div id="transferAlphaCoinBagsUnlock" class="basicDiv">
                    <button onclick="buy('transferAlphaCoinBags', 10000, 'alphaCoins')">Buy Alpha Coin Bags</button>
                    <p>These bags help you convert more coins at a time</p>
                    <p>Price: 10,000 Alpha Coins</p>
                </div>
			</div>
            <div class="basicDiv" id="earnBetaCoins">
				<div id="basicAlphaToBetaBrokerRule" style="display:none">
					<p id="textForA2BBrokerRule">Converts Alpha Coins to Beta Coins if the conversion rate is below 1,000</p>
					<button onclick="decreaseBasicA2BBrokerRule()" style="width:166px">Decrease</button>
					<button onclick="increaseBasicA2BBrokerRule()" style="width:166px">Increase</button>
                    <button id="textForA2BBrokerAmountToggleButton" style="width:250px" onclick="toggle('textForA2BBrokerAmountToggle')"></button>
					<button id="textForA2BBrokerPrice" style="width:250px" onclick="increaseBasicA2BBrokerAmount()">Increase for 2 Pie Coins</button>
				</div>
                <button class="currencyButton" id="alphaToBetaClickButton" style="display:block;background-color:#FDFF9A" onclick="pickCurrentTask('alphaToBetaClick')">Convert Alpha Coins to Beta Coins</button>
				<div class="skillProgress" id="alphaToBetaProgress">
					<div class="skillBar" id="alphaToBetaBar"></div>
				</div>
                <p id="betaCoinExhangeRate" >Exchange Rate: 100 Alpha Coins -> 1 Beta Coin</p>
                <p id="betaCoinTotalPrice" >Total Price: 100 Coins</p>
            </div>
			<div id="basicAlphaToBetaBroker" class="basicDiv">
				<button onclick="buy('basicAlphaToBetaBroker', 20, 'betaCoins')">Hire Basic Alpha Coin -> Beta Coin Broker</button>
				<p>Hire someone to convert for you</p>
				<p>Price: 20 Beta Coins</p>
			</div>
`;
