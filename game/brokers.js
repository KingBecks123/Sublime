function updateBrokers() {
	if (gameData.bachelorsDegreeFinance) {
		
		show('tradeButton', 'inline')
		show('alphaCoinToMegaCoinDiv')
		
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


	} else {
		hide('tradeButton')
		hide('alphaCoinToMegaCoinDiv')
	}

	
	checkShow(gameData.smarterAdvertisingManagerBroker, 'smarterAdvertisingBrokerRule')
	checkShow(gameData.doesHaveCurrencyBroker, 'currencyBroker')

	
	if (gameData.unlockCurrencyBrokers) {
		hide("unlockCurrencyBrokers")
		show("hireToggleButtons")
		show("brokerApplicantUpgrades")
		if (gameData.advertisingManagerBroker)
			hide("autoBrokerAdvertiser")
		else
			show("autoBrokerAdvertiser")
	} else {
		show("unlockCurrencyBrokers")
		hide("hireToggleButtons")
		hide("brokerApplicantUpgrades")
		hide("autoBrokerAdvertiser")
	}
	
	
	if (gameData.advertisingManagerBroker && gameData.typeToHireToggle == 1)
		show("autoAdvertiseBrokerDiv", "inline")
	else
		hide("autoAdvertiseBrokerDiv")
	
	if (gameData.advertisingManagerBroker && !gameData.smarterAdvertisingManagerBroker)
		show("smarterAutoBrokerAdvertiser")
	else
		hide("smarterAutoBrokerAdvertiser")	
	
	if (gameData.transferAlphaCoinBags)
		show("alphaCoinConvertBulkButton", "inline")

	
	checkShow(!gameData.transferAlphaCoinBags, 'transferAlphaCoinBagsUnlock')
	checkShow(!gameData.transferAlphaCoinsBulkUnlock, 'transferAlphaCoinsBulkUnlock')
	checkShow(!gameData.saveAlphaCoinsUnlock, 'saveAlphaCoinsUnlock')

	
	checkShow(gameData.transferAlphaCoinsBulkUnlock, 'transferAlphaCoinsBulk')
	checkShow(gameData.saveAlphaCoinsUnlock, 'upgradeSaveAlphaCoinsUnlock')

	
	if (gameData.advertisePriceType == 'coins')
		update("advertisePrice", "Price: " + gameData.advertisePrice.toLocaleString() + " Coins")
	else if (gameData.advertisePriceType == 'betaCoins')
		update("advertisePrice", "Price: " + gameData.advertisePrice.toLocaleString() + " Beta Coins")
	
}


function updateBrokerStuffSlow() {
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

function searchForACurrencyBroker() {
    if (gameData.alphaCoins >= 10) {
        gameData.alphaCoins -= 10
        barStart("currencyBrokerHire")
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