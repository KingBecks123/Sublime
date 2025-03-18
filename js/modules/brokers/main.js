function brokerApplicantNew(id, amount, minOrMax, requirement) {
	price = 'brokerApplicant'+ id + 'Price'
	theoreticalMax = game['maxBrokerApplicant' + id]
	theoreticalMin = game['minBrokerApplicant' + id]
	
	if (requirement == undefined)
		requirement = true

	if (minOrMax == 'min')
		theoreticalMin += amount
	else
		theoreticalMax += amount


	if (game.alphaCoins >= game[price] && eval(requirement) && theoreticalMax >= theoreticalMin) {
		game[minOrMax + 'BrokerApplicant' + id] += amount
		game.alphaCoins -= game[price]
		game[price] += 5
	}
}


function decreaseBasicA2BBrokerRule() {
	if(game.basicA2BBrokerRule > 0)
		game.basicA2BBrokerRule -= 50
}

function increaseBasicA2BBrokerRule() {
	game.basicA2BBrokerRule += 50
}

function increaseBasicA2BBrokerAmount() {
	if(game.pieCoins >= game.increaseBasicA2BBrokerAmountPrice) {
		game.pieCoins -= game.increaseBasicA2BBrokerAmountPrice
		game.basicA2BBrokerAmount += 1
		game.increaseBasicA2BBrokerAmountPrice *= 2
	}
	
}

function coinsToAlphaStart() {
	if(game.autoCurrencyConversionBuy)
		pickCurrentTask('coinsToAlphaClick')
	else
		coinsToAlphaClick()
}

function coinsToAlphaClick() {
	price = (game.alphaCoinsExchangeRate + game.currencyBrokerFee) * game.currencyBrokerTransferAmount * (game.alphaCoinConvertBulkToggle * 9 + 1)
	if (game.coins >= price && game.coinsToAlphaBar == 0) {
		game.alphaCoinConvertBulkToggleSet = game.alphaCoinConvertBulkToggle
		game.coins -= price
		game.coinsToAlphaBar = 0
		coinsToAlphaBar()
	}
}

function coinsToAlphaBar() {
	if (game.currencyBrokerSpeed == 1)
		runBar('coinsToAlpha', 1.5)
	else {
		if (game.doesHaveCurrencyBroker)
			runBar('coinsToAlpha', 1.5 / game.currencyBrokerSpeed)
		else
			runBar('coinsToAlpha', 0.015)
	}
}

function coinsToAlphaBarEnd() {
	if(game.alphaCoinConvertBulkToggleSet == 0)
		game.alphaCoins += game.currencyBrokerTransferAmount
	else
		game.alphaCoins += game.currencyBrokerTransferAmount * 10
}

function alphaToBetaClick() {
	price = game.betaCoinsExchangeRate
	
	if (game.textForA2BBrokerAmountToggle)
		price *= game.basicA2BBrokerAmount

	if (game.alphaCoins >= price && (game.alphaToBetaBar == 100 || game.alphaToBetaBar == 0)) {
		game.alphaCoins -= price
		game.alphaToBetaBar = 0
		game.a2BBrokerAmountSet = game.textForA2BBrokerAmountToggle
		alphaToBetaBar()
	}
}

function alphaToBetaBar() {
	runBar('alphaToBeta', 0.5)
}

function alphaToBetaBarEnd() {
	if(game.a2BBrokerAmountSet == 0)
		game.betaCoins += 1
	else
		game.betaCoins += game.basicA2BBrokerAmount
}

function mainGameLoopSlowBrokers () {
	if (game.maps > 4) {
		if(beckyRandom(2) == 1 && game.betaCoinsExchangeRate < 5000)
			game.betaCoinsExchangeRate += 50
		else if (game.betaCoinsExchangeRate > 500)
			game.betaCoinsExchangeRate -= 50
	}
	
	if (game.basicAlphaToBetaBroker && game.betaCoinsExchangeRate < game.basicA2BBrokerRule)
		alphaToBetaClick()
	
	if (game.autoAdvertiseBroker) {
		if (game.currencyApplicantSpeed > game.autoAdvertiseSpeedValue || (game.smarterAdvertisingManagerBroker && game.currencyApplicantTransferAmount < game.autoAdvertiseAmountValue))
			advertise()
	}
	
	if(game.bachelorsDegreeFinance) {
		if(beckyRandom(2) == 1 && game.alphaCoinsExchangeRate < 200)
			game.alphaCoinsExchangeRate += 1
		else if (game.alphaCoinsExchangeRate > 50)
			game.alphaCoinsExchangeRate -= 1
	}
}

function updateValuesBrokers() {

    alphaCoinTotalPrice = (game.alphaCoinsExchangeRate + game.currencyBrokerFee) * game.currencyBrokerTransferAmount

    if (!game.alphaCoinConvertBulkToggle) {
        exchangeRate = game.alphaCoinsExchangeRate.toLocaleString() + " Coins -> 1 Alpha Coin"
        coinsToAlphaClickButton = game.currencyBrokerTransferAmount
    } else {
        exchangeRate = (game.alphaCoinsExchangeRate * 10).toLocaleString() + " Coins -> 10 Alpha Coins"
        coinsToAlphaClickButton = game.currencyBrokerTransferAmount * 10
        alphaCoinTotalPrice *= 10
    }

	if (employeeTypes[game.typeToHireToggle].priceType == 'coins')
		text = 'Coins'
	else if (employeeTypes[game.typeToHireToggle].priceType == 'betaCoins')
		text = 'Beta Coins'

	update("advertisePrice", "Price: " + employeeTypes[game.typeToHireToggle].price.toLocaleString() + " " + text)

	if (game.currentTask == 'coinsToAlphaClick' || game.currentTask2 == 'coinsToAlphaClick')
		setColor('coinsToAlphaClickButton', '#F8FF01')
	else
		setColor('coinsToAlphaClickButton', '#FDFF9A')

	if (game.currentTask == 'alphaToBetaClick' || game.currentTask2 == 'alphaToBetaClick')
		setColor('alphaToBetaClickButton', '#F8FF01')
	else
		setColor('alphaToBetaClickButton', '#FDFF9A')

	basicToggle("alphaCoinConvertBulk")
	toggleAesthetic("textForA2BBrokerAmountToggle")


	var x = document.getElementsByClassName("currencyButton")
	if (game.autoCurrencyConversionBuy) {
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

	checkShow(game.maps > 4, 'earnBetaCoins')

    if (game.alphaCoins > 1e5)
        game.alphaCoins = 1e5
    
    const elementsToUpdate = [
      { element: "textForBrokerApplicantSpeed", value: "Currently " + game.minBrokerApplicantSpeed.toLocaleString() + " - " + game.maxBrokerApplicantSpeed.toLocaleString() + " Seconds" },
      { element: "textForBrokerApplicantAmount", value: "Currently " + game.minBrokerApplicantAmount.toLocaleString() + " - " + game.maxBrokerApplicantAmount.toLocaleString() + " Coins" },
      { element: "textForAdvertisingBrokerRule", value: "Auto advertise if speed is over " + game.autoAdvertiseSpeedValue.toLocaleString() + " seconds" },
      { element: "textForSmarterAdvertisingBrokerRule", value: "And if transfer amount is under " + game.autoAdvertiseAmountValue.toLocaleString() },
      { element: "textForBrokerApplicantFee", value: "Currently " + game.minBrokerApplicantFee.toLocaleString() + " - " + game.maxBrokerApplicantFee.toLocaleString() + " Coins" },
      { element: "brokerApplicantSpeedPrice", value: "Price: " + game.brokerApplicantSpeedPrice.toLocaleString() + " Alpha Coins" },
      { element: "brokerApplicantFeePrice", value: "Price: " + game.brokerApplicantFeePrice.toLocaleString() + " Alpha Coins" },
      { element: "brokerApplicantAmountPrice", value: "Price: " + game.brokerApplicantAmountPrice.toLocaleString() + " Alpha Coins" },
      { element: "textForA2BBrokerRule", value: "Converts Alpha Coins to Beta Coins if the conversion rate is below " + game.basicA2BBrokerRule.toLocaleString() },
      { element: "textForA2BBrokerAmountToggleButton", value: "Bulk convert amount: " + game.basicA2BBrokerAmount.toLocaleString() },
      { element: "textForA2BBrokerPrice", value: "Increase for " + game.increaseBasicA2BBrokerAmountPrice.toLocaleString() + " Pie Coins" },
      { element: "currencyBrokerTransferAmount", value: "Speed: " + game.currencyBrokerSpeed.toLocaleString() + " Seconds." },
      { element: "currencyBrokerFee", value: "Transfer Fee: " + game.currencyBrokerFee.toLocaleString() + "." },
      { element: "currencyBrokerSpeed", value: "Alpha Coins Per Transfer: " + game.currencyBrokerTransferAmount.toLocaleString() + "." },
      { element: "alphaCoinTransactionFee", value: "Transfer Fee: " + game.currencyBrokerFee.toLocaleString() + " Coins Per Alpha Coin" },
      { element: "alphaCoinExhangeRate", value: "Exchange Rate: " + exchangeRate },
      { element: "alphaCoinTotalPrice", value: "Total Price: " + alphaCoinTotalPrice.toLocaleString() + " Coins" },
      { element: "coinsToAlphaClickButton", value: "Convert Coins to " + coinsToAlphaClickButton.toLocaleString() + " Alpha Coins" },
      { element: "betaCoinExhangeRate", value: "Exchange Rate: " + game.betaCoinsExchangeRate.toLocaleString() + " Alpha Coins -> 1 Beta Coin" },
      { element: "betaCoinTotalPrice", value: "Total Price: " + (game.betaCoinsExchangeRate * (game.textForA2BBrokerAmountToggle * (game.basicA2BBrokerAmount - 1) + 1)).toLocaleString() + " Alpha Coins" },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });

    const elementsToCheck = [
      { condition: game.bachelorsDegreeFinance, element: 'tradeButton', display: 'inline' },
      { condition: game.bachelorsDegreeFinance, element: 'alphaCoinToMegaCoinDiv' },
      { condition: game.smarterAdvertisingManagerBroker, element: 'smarterAdvertisingBrokerRule' },
      { condition: game.doesHaveCurrencyBroker, element: 'currencyBroker' },
      { condition: game.unlockCurrencyBrokers && !game.advertisingManagerBroker, element: 'autoBrokerAdvertiser' },
      { condition: game.unlockCurrencyBrokers, element: 'hireToggleButtons' },
      { condition: game.unlockCurrencyBrokers, element: 'brokerApplicantUpgrades' },
      { condition: !game.unlockCurrencyBrokers, element: 'unlockCurrencyBrokers' },
      { condition: game.advertisingManagerBroker && game.typeToHireToggle == 'broker', element: 'autoAdvertiseBrokerDiv', display: 'inline' },
      { condition: game.advertisingManagerBroker && !game.smarterAdvertisingManagerBroker, element: 'smarterAutoBrokerAdvertiser' },
      { condition: game.transferAlphaCoinBags, element: 'alphaCoinConvertBulkButton', display: 'inline' },
      { condition: !game.transferAlphaCoinBags, element: 'transferAlphaCoinBagsUnlock' },
      { condition: !game.transferAlphaCoinsBulkUnlock, element: 'transferAlphaCoinsBulkUnlock' },
      { condition: !game.saveAlphaCoinsUnlock, element: 'saveAlphaCoinsUnlock' },
      { condition: game.transferAlphaCoinsBulkUnlock, element: 'transferAlphaCoinsBulk' },
    ];

    elementsToCheck.forEach(({ condition, element, display = 'none' }) => {
      checkShow(condition, element, display);
    });
}
