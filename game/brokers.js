addInventoryVariables([
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

function brokerApplicantNew(id, amount, minOrMax, requirement) {
	price = 'brokerApplicant'+ id + 'Price'
	theoreticalMax = gameData['maxBrokerApplicant' + id]
	theoreticalMin = gameData['minBrokerApplicant' + id]
	
	if (requirement == undefined)
		requirement = true

	if (minOrMax == 'min')
		theoreticalMin += amount
	else
		theoreticalMax += amount


	if (gameData.alphaCoins >= gameData[price] && eval(requirement) && theoreticalMax >= theoreticalMin) {
		gameData[minOrMax + 'BrokerApplicant' + id] += amount
		gameData.alphaCoins -= gameData[price]
		gameData[price] += 5
	}
}


function decreaseBasicA2BBrokerRule() {
	if(gameData.basicA2BBrokerRule > 0)
		gameData.basicA2BBrokerRule -= 50
}

function increaseBasicA2BBrokerRule() {
	gameData.basicA2BBrokerRule += 50
}

function increaseBasicA2BBrokerAmount() {
	if(gameData.pieCoins >= gameData.increaseBasicA2BBrokerAmountPrice) {
		gameData.pieCoins -= gameData.increaseBasicA2BBrokerAmountPrice
		gameData.basicA2BBrokerAmount += 1
		gameData.increaseBasicA2BBrokerAmountPrice *= 2
	}
	
}

function coinsToAlphaStart() {
	if(gameData.autoCurrencyConversionBuy)
		pickCurrentTask('coinsToAlphaClick')
	else
		coinsToAlphaClick()
}

function coinsToAlphaClick() {
	price = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount * (gameData.alphaCoinConvertBulkToggle * 9 + 1)
	if (gameData.coins >= price && gameData.coinsToAlphaBar == 0) {
		gameData.alphaCoinConvertBulkToggleSet = gameData.alphaCoinConvertBulkToggle
		gameData.coins -= price
		gameData.coinsToAlphaBar = 0
		coinsToAlphaBar()
	}
}

function coinsToAlphaBar() {
	if (gameData.currencyBrokerSpeed == 1)
		runBar('coinsToAlpha', 1.5)
	else {
		if (gameData.doesHaveCurrencyBroker)
			runBar('coinsToAlpha', 1.5 / gameData.currencyBrokerSpeed)
		else
			runBar('coinsToAlpha', 0.015)
	}
}

function coinsToAlphaBarEnd() {
	if(gameData.alphaCoinConvertBulkToggleSet == 0)
		gameData.alphaCoins += gameData.currencyBrokerTransferAmount
	else
		gameData.alphaCoins += gameData.currencyBrokerTransferAmount * 10
}

function alphaToBetaClick() {
	price = gameData.betaCoinsExchangeRate
	
	if (gameData.textForA2BBrokerAmountToggle)
		price *= gameData.basicA2BBrokerAmount

	if (gameData.alphaCoins >= price && (gameData.alphaToBetaBar == 100 || gameData.alphaToBetaBar == 0)) {
		gameData.alphaCoins -= price
		gameData.alphaToBetaBar = 0
		gameData.a2BBrokerAmountSet = gameData.textForA2BBrokerAmountToggle
		alphaToBetaBar()
	}
}

function alphaToBetaBar() {
	runBar('alphaToBeta', 0.5)
}

function alphaToBetaBarEnd() {
	if(gameData.a2BBrokerAmountSet == 0)
		gameData.betaCoins += 1
	else
		gameData.betaCoins += gameData.basicA2BBrokerAmount
}

function mainGameLoopSlowBrokers () {
	if (gameData.maps > 4) {
		if(beckyRandom(2) == 1 && gameData.betaCoinsExchangeRate < 5000)
			gameData.betaCoinsExchangeRate += 50
		else if (gameData.betaCoinsExchangeRate > 500)
			gameData.betaCoinsExchangeRate -= 50
	}
	
	if (gameData.basicAlphaToBetaBroker && gameData.betaCoinsExchangeRate < gameData.basicA2BBrokerRule)
		alphaToBetaClick()
	
	if (gameData.autoAdvertiseBroker) {
		if (gameData.currencyApplicantSpeed > gameData.autoAdvertiseSpeedValue || (gameData.smarterAdvertisingManagerBroker && gameData.currencyApplicantTransferAmount < gameData.autoAdvertiseAmountValue))
			advertise()
	}
	
	if(gameData.bachelorsDegreeFinance) {
		if(beckyRandom(2) == 1 && gameData.alphaCoinsExchangeRate < 200)
			gameData.alphaCoinsExchangeRate += 1
		else if (gameData.alphaCoinsExchangeRate > 50)
			gameData.alphaCoinsExchangeRate -= 1
	}
}

function updateValuesBrokers() {
	if (gameData.bachelorsDegreeFinance) {
		update("textForBrokerApplicantSpeed", "Currently " + gameData.minBrokerApplicantSpeed.toLocaleString() + " - " + gameData.maxBrokerApplicantSpeed.toLocaleString() + " Seconds")
		update("textForBrokerApplicantAmount", "Currently " + gameData.minBrokerApplicantAmount.toLocaleString() + " - " + gameData.maxBrokerApplicantAmount.toLocaleString() + " Coins")
		update("textForAdvertisingBrokerRule", "Auto advertise if speed is over " + gameData.autoAdvertiseSpeedValue.toLocaleString() + " seconds")
		update("textForSmarterAdvertisingBrokerRule", "And if transfer amount is under " + gameData.autoAdvertiseAmountValue.toLocaleString())
		update("textForBrokerApplicantFee", "Currently " + gameData.minBrokerApplicantFee.toLocaleString() + " - " + gameData.maxBrokerApplicantFee.toLocaleString() + " Coins")
		update("brokerApplicantSpeedPrice", "Price: " + gameData.brokerApplicantSpeedPrice.toLocaleString() + " Alpha Coins")
		update("brokerApplicantFeePrice", "Price: " + gameData.brokerApplicantFeePrice.toLocaleString() + " Alpha Coins")
		update("brokerApplicantAmountPrice", "Price: " + gameData.brokerApplicantAmountPrice.toLocaleString() + " Alpha Coins")

		update("textForA2BBrokerRule", "Converts Alpha Coins to Beta Coins if the conversion rate is below " + gameData.basicA2BBrokerRule.toLocaleString())

		update("textForA2BBrokerAmountToggleButton", "Bulk convert amount: " + gameData.basicA2BBrokerAmount.toLocaleString())
		update("textForA2BBrokerPrice", "Increase for " + gameData.increaseBasicA2BBrokerAmountPrice.toLocaleString() + " Pie Coins")
		
		update("currencyBrokerTransferAmount", "Speed: " + gameData.currencyBrokerSpeed.toLocaleString() + " Seconds.")
		update("currencyBrokerFee", "Transfer Fee: " + gameData.currencyBrokerFee.toLocaleString() + ".")
		update("currencyBrokerSpeed", "Alpha Coins Per Transfer: " + gameData.currencyBrokerTransferAmount.toLocaleString() + ".")
		update("alphaCoinTransactionFee", "Transfer Fee: " + gameData.currencyBrokerFee.toLocaleString() + " Coins Per Alpha Coin")

		alphaCoinTotalPrice = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount

		if (!gameData.alphaCoinConvertBulkToggle) {
			exchangeRate = gameData.alphaCoinsExchangeRate.toLocaleString() + " Coins -> 1 Alpha Coin"
			coinsToAlphaClickButton = gameData.currencyBrokerTransferAmount
		} else {
			exchangeRate = (gameData.alphaCoinsExchangeRate * 10).toLocaleString() + " Coins -> 10 Alpha Coins"
			coinsToAlphaClickButton = gameData.currencyBrokerTransferAmount * 10
			alphaCoinTotalPrice *= 10
		}
		
		update("alphaCoinExhangeRate", "Exchange Rate: " + exchangeRate)
		update("alphaCoinTotalPrice", "Total Price: " + alphaCoinTotalPrice.toLocaleString() + " Coins")
		update("coinsToAlphaClickButton", "Convert Coins to " + coinsToAlphaClickButton.toLocaleString() + " Alpha Coins")


	}

	checkShow(gameData.bachelorsDegreeFinance, 'tradeButton', 'inline')
	checkShow(gameData.bachelorsDegreeFinance, 'alphaCoinToMegaCoinDiv')
	checkShow(gameData.smarterAdvertisingManagerBroker, 'smarterAdvertisingBrokerRule')
	checkShow(gameData.doesHaveCurrencyBroker, 'currencyBroker')
	checkShow(gameData.unlockCurrencyBrokers && !gameData.advertisingManagerBroker, 'autoBrokerAdvertiser')
	checkShow(gameData.unlockCurrencyBrokers, 'hireToggleButtons')
	checkShow(gameData.unlockCurrencyBrokers, 'brokerApplicantUpgrades')
	checkShow(!gameData.unlockCurrencyBrokers, 'unlockCurrencyBrokers')
	checkShow(gameData.advertisingManagerBroker && gameData.typeToHireToggle == 'broker', 'autoAdvertiseBrokerDiv', 'inline')
	checkShow(gameData.advertisingManagerBroker && !gameData.smarterAdvertisingManagerBroker, 'smarterAutoBrokerAdvertiser')
	checkShow(gameData.transferAlphaCoinBags, 'alphaCoinConvertBulkButton', 'inline')
	checkShow(!gameData.transferAlphaCoinBags, 'transferAlphaCoinBagsUnlock')
	checkShow(!gameData.transferAlphaCoinsBulkUnlock, 'transferAlphaCoinsBulkUnlock')
	checkShow(!gameData.saveAlphaCoinsUnlock, 'saveAlphaCoinsUnlock')
	checkShow(gameData.transferAlphaCoinsBulkUnlock, 'transferAlphaCoinsBulk')
	
	if (employeeTypes[gameData.typeToHireToggle].priceType == 'coins')
		text = 'Coins'
	else if (employeeTypes[gameData.typeToHireToggle].priceType == 'betaCoins')
		text = 'Beta Coins'
	
	update("advertisePrice", "Price: " + employeeTypes[gameData.typeToHireToggle].price.toLocaleString() + " " + text)
	
	if (gameData.currentTask == 'coinsToAlphaClick' || gameData.currentTask2 == 'coinsToAlphaClick')
		colorChanger('coinsToAlphaClickButton', '#F8FF01')
	else
		colorChanger('coinsToAlphaClickButton', '#FDFF9A')

	if (gameData.currentTask == 'alphaToBetaClick' || gameData.currentTask2 == 'alphaToBetaClick')
		colorChanger('alphaToBetaClickButton', '#F8FF01')
	else
		colorChanger('alphaToBetaClickButton', '#FDFF9A')
	
	update('betaCoinExhangeRate', 'Exchange Rate: ' + gameData.betaCoinsExchangeRate.toLocaleString() + ' Alpha Coins -> 1 Beta Coin')
	update('betaCoinTotalPrice', 'Total Price: ' + (gameData.betaCoinsExchangeRate * (gameData.textForA2BBrokerAmountToggle * (gameData.basicA2BBrokerAmount - 1) + 1)).toLocaleString() + ' Alpha Coins')
	basicToggle("alphaCoinConvertBulk")
	toggleAesthetic("textForA2BBrokerAmountToggle")


	var x = document.getElementsByClassName("currencyButton")
	if (gameData.autoCurrencyConversionBuy) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px"
			x[i].style['border-radius'] = "12px"
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = '#FDFF9A'
		}
	}
	for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px"
	}
	
	checkShow(gameData.maps > 4, 'earnBetaCoins')

    if (gameData.alphaCoins > 1e5)
        gameData.alphaCoins = 1e5
	
}
