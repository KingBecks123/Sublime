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

    alphaCoinTotalPrice = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount

    if (!gameData.alphaCoinConvertBulkToggle) {
        exchangeRate = gameData.alphaCoinsExchangeRate.toLocaleString() + " Coins -> 1 Alpha Coin"
        coinsToAlphaClickButton = gameData.currencyBrokerTransferAmount
    } else {
        exchangeRate = (gameData.alphaCoinsExchangeRate * 10).toLocaleString() + " Coins -> 10 Alpha Coins"
        coinsToAlphaClickButton = gameData.currencyBrokerTransferAmount * 10
        alphaCoinTotalPrice *= 10
    }

	if (employeeTypes[gameData.typeToHireToggle].priceType == 'coins')
		text = 'Coins'
	else if (employeeTypes[gameData.typeToHireToggle].priceType == 'betaCoins')
		text = 'Beta Coins'

	update("advertisePrice", "Price: " + employeeTypes[gameData.typeToHireToggle].price.toLocaleString() + " " + text)

	if (gameData.currentTask == 'coinsToAlphaClick' || gameData.currentTask2 == 'coinsToAlphaClick')
		setColor('coinsToAlphaClickButton', '#F8FF01')
	else
		setColor('coinsToAlphaClickButton', '#FDFF9A')

	if (gameData.currentTask == 'alphaToBetaClick' || gameData.currentTask2 == 'alphaToBetaClick')
		setColor('alphaToBetaClickButton', '#F8FF01')
	else
		setColor('alphaToBetaClickButton', '#FDFF9A')

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
    
    const elementsToUpdate = [
      { element: "textForBrokerApplicantSpeed", value: "Currently " + gameData.minBrokerApplicantSpeed.toLocaleString() + " - " + gameData.maxBrokerApplicantSpeed.toLocaleString() + " Seconds" },
      { element: "textForBrokerApplicantAmount", value: "Currently " + gameData.minBrokerApplicantAmount.toLocaleString() + " - " + gameData.maxBrokerApplicantAmount.toLocaleString() + " Coins" },
      { element: "textForAdvertisingBrokerRule", value: "Auto advertise if speed is over " + gameData.autoAdvertiseSpeedValue.toLocaleString() + " seconds" },
      { element: "textForSmarterAdvertisingBrokerRule", value: "And if transfer amount is under " + gameData.autoAdvertiseAmountValue.toLocaleString() },
      { element: "textForBrokerApplicantFee", value: "Currently " + gameData.minBrokerApplicantFee.toLocaleString() + " - " + gameData.maxBrokerApplicantFee.toLocaleString() + " Coins" },
      { element: "brokerApplicantSpeedPrice", value: "Price: " + gameData.brokerApplicantSpeedPrice.toLocaleString() + " Alpha Coins" },
      { element: "brokerApplicantFeePrice", value: "Price: " + gameData.brokerApplicantFeePrice.toLocaleString() + " Alpha Coins" },
      { element: "brokerApplicantAmountPrice", value: "Price: " + gameData.brokerApplicantAmountPrice.toLocaleString() + " Alpha Coins" },
      { element: "textForA2BBrokerRule", value: "Converts Alpha Coins to Beta Coins if the conversion rate is below " + gameData.basicA2BBrokerRule.toLocaleString() },
      { element: "textForA2BBrokerAmountToggleButton", value: "Bulk convert amount: " + gameData.basicA2BBrokerAmount.toLocaleString() },
      { element: "textForA2BBrokerPrice", value: "Increase for " + gameData.increaseBasicA2BBrokerAmountPrice.toLocaleString() + " Pie Coins" },
      { element: "currencyBrokerTransferAmount", value: "Speed: " + gameData.currencyBrokerSpeed.toLocaleString() + " Seconds." },
      { element: "currencyBrokerFee", value: "Transfer Fee: " + gameData.currencyBrokerFee.toLocaleString() + "." },
      { element: "currencyBrokerSpeed", value: "Alpha Coins Per Transfer: " + gameData.currencyBrokerTransferAmount.toLocaleString() + "." },
      { element: "alphaCoinTransactionFee", value: "Transfer Fee: " + gameData.currencyBrokerFee.toLocaleString() + " Coins Per Alpha Coin" },
      { element: "alphaCoinExhangeRate", value: "Exchange Rate: " + exchangeRate },
      { element: "alphaCoinTotalPrice", value: "Total Price: " + alphaCoinTotalPrice.toLocaleString() + " Coins" },
      { element: "coinsToAlphaClickButton", value: "Convert Coins to " + coinsToAlphaClickButton.toLocaleString() + " Alpha Coins" },
      { element: "betaCoinExhangeRate", value: "Exchange Rate: " + gameData.betaCoinsExchangeRate.toLocaleString() + " Alpha Coins -> 1 Beta Coin" },
      { element: "betaCoinTotalPrice", value: "Total Price: " + (gameData.betaCoinsExchangeRate * (gameData.textForA2BBrokerAmountToggle * (gameData.basicA2BBrokerAmount - 1) + 1)).toLocaleString() + " Alpha Coins" },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });

    const elementsToCheck = [
      { condition: gameData.bachelorsDegreeFinance, element: 'tradeButton', display: 'inline' },
      { condition: gameData.bachelorsDegreeFinance, element: 'alphaCoinToMegaCoinDiv' },
      { condition: gameData.smarterAdvertisingManagerBroker, element: 'smarterAdvertisingBrokerRule' },
      { condition: gameData.doesHaveCurrencyBroker, element: 'currencyBroker' },
      { condition: gameData.unlockCurrencyBrokers && !gameData.advertisingManagerBroker, element: 'autoBrokerAdvertiser' },
      { condition: gameData.unlockCurrencyBrokers, element: 'hireToggleButtons' },
      { condition: gameData.unlockCurrencyBrokers, element: 'brokerApplicantUpgrades' },
      { condition: !gameData.unlockCurrencyBrokers, element: 'unlockCurrencyBrokers' },
      { condition: gameData.advertisingManagerBroker && gameData.typeToHireToggle == 'broker', element: 'autoAdvertiseBrokerDiv', display: 'inline' },
      { condition: gameData.advertisingManagerBroker && !gameData.smarterAdvertisingManagerBroker, element: 'smarterAutoBrokerAdvertiser' },
      { condition: gameData.transferAlphaCoinBags, element: 'alphaCoinConvertBulkButton', display: 'inline' },
      { condition: !gameData.transferAlphaCoinBags, element: 'transferAlphaCoinBagsUnlock' },
      { condition: !gameData.transferAlphaCoinsBulkUnlock, element: 'transferAlphaCoinsBulkUnlock' },
      { condition: !gameData.saveAlphaCoinsUnlock, element: 'saveAlphaCoinsUnlock' },
      { condition: gameData.transferAlphaCoinsBulkUnlock, element: 'transferAlphaCoinsBulk' },
    ];

    elementsToCheck.forEach(({ condition, element, display = 'none' }) => {
      checkShow(condition, element, display);
    });
}
