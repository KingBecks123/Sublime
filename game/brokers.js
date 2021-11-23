function updateBrokers(){
	if (gameData.bachelorsDegreeFinance) {
		
		tabs('tradeButton', 'inline-block')
		showBasicDiv('alphaCoinToMegaCoinDiv')
		showBasicDiv('upgradeBroker')
		
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
			update("alphaCoinExhangeRate", "Exchange Rate: " + gameData.alphaCoinsExchangeRate.toLocaleString() + " Coins -> 1 Alpha Coin")
			update("alphaCoinTotalPrice", "Total Price: " + alphaCoinTotalPrice.toLocaleString() + " Coins")
			update("currencyConvertAlphaCoinsButton", "Convert Coins to " + gameData.currencyBrokerTransferAmount.toLocaleString() + " Alpha Coins")
		} else {
			update("alphaCoinExhangeRate", "Exchange Rate: " + (gameData.alphaCoinsExchangeRate * 10).toLocaleString() + " Coins -> 10 Alpha Coins")
			update("alphaCoinTotalPrice", "Total Price: " + (alphaCoinTotalPrice * 10).toLocaleString() + " Coins")
			update("currencyConvertAlphaCoinsButton", "Convert Coins to " + (gameData.currencyBrokerTransferAmount * 10).toLocaleString() + " Alpha Coins")
		}

	} else {

		hide('tradeButton')
		hide('alphaCoinToMegaCoinDiv')
		hide('upgradeBroker')
	}
	
	checkShowOrHide(gameData.doesHaveCurrencyBroker, "currencyBroker")
	checkShowOrHide(gameData.smarterAdvertisingManagerBroker, 'smarterAdvertisingBrokerRule')
	
	if (gameData.unlockCurrencyBrokers) {
		hide("unlockCurrencyBrokers")
		showBasicDiv("hireToggleButtons")
		showBasicDiv("brokerApplicantUpgrades")
		if (gameData.advertisingManagerBroker)
			hide("autoBrokerAdvertiser")
		else
			showBasicDiv("autoBrokerAdvertiser")
	} else {

		showBasicDiv("unlockCurrencyBrokers")
		hide("hireToggleButtons")
		hide("brokerApplicantUpgrades")
		hide("autoBrokerAdvertiser")
	}
	
	
	if (gameData.advertisingManagerBroker && gameData.typeToHireToggle == 1)
		tabs("autoAdvertiseBrokerDiv", "inline-block")
	else
		hide("autoAdvertiseBrokerDiv")
	
	if (gameData.advertisingManagerBroker && !gameData.smarterAdvertisingManagerBroker)
		showBasicDiv("smarterAutoBrokerAdvertiser")
	else
		hide("smarterAutoBrokerAdvertiser")	
	
	if (gameData.transferAlphaCoinBags)
		tabs("alphaCoinConvertBulkButton", "inline-block")
	checkHide(gameData.transferAlphaCoinBags, "transferAlphaCoinBagsUnlock")
	checkShow(gameData.transferAlphaCoinsBulkUnlock, "transferAlphaCoinsBulk")
	checkHide(gameData.transferAlphaCoinsBulkUnlock, "transferAlphaCoinsBulkUnlock")	
	checkHide(gameData.saveAlphaCoinsUnlock, "saveAlphaCoinsUnlock")
	checkShow(gameData.saveAlphaCoinsUnlock, "upgradeSaveAlphaCoinsUnlock")	
	
	if (gameData.advertisePriceType == 'coins')
		update("advertisePrice", "Price: " + gameData.advertisePrice.toLocaleString() + " Coins")
	else if (gameData.advertisePriceType == 'betaCoins')
		update("advertisePrice", "Price: " + gameData.advertisePrice.toLocaleString() + " Beta Coins")
	
}


function updateBrokerStuffSlow(){
	if (gameData.basicAlphaToBetaBroker && gameData.betaCoinsExchangeRate < gameData.basicA2BBrokerRule)
		alphaToBetaClick()
	
	if (gameData.autoAdvertiseBroker)
	{
		if (gameData.currencyApplicantSpeed > gameData.autoAdvertiseSpeedValue || (gameData.smarterAdvertisingManagerBroker && gameData.currencyApplicantTransferAmount < gameData.autoAdvertiseAmountValue))
		{
			advertise()
		}
	}
	
	if(gameData.bachelorsDegreeFinance)
	{
		if(beckyRandom(2) == 1 && gameData.alphaCoinsExchangeRate < 200)
			gameData.alphaCoinsExchangeRate += 1
		else if (gameData.alphaCoinsExchangeRate > 50)
			gameData.alphaCoinsExchangeRate -= 1
	}

}

function brokerApplicant(id, type) {

	if(gameData.alphaCoins >= gameData['brokerApplicant'+ id + 'Price'])
	{
		if(type == 'max')
		{
			if (gameData['maxBrokerApplicant' + id] > gameData['minBrokerApplicant' + id]) {
				
				brokerApplicantPrice(id)


				gameData['maxBrokerApplicant' + id] -= 1
			}
		}
		else if(type == 'maxup')
		{
			brokerApplicantPrice(id)
			gameData['maxBrokerApplicant' + id] += 1
		}
		else if(type == 'minup')
		{
			if (gameData['maxBrokerApplicant' + id] > gameData['minBrokerApplicant' + id]) {
				
				brokerApplicantPrice(id)

				gameData['minBrokerApplicant' + id] += 1
			}
		}
		else if(type == 'max100')
		{
			if (gameData['maxBrokerApplicant' + id] > gameData['minBrokerApplicant' + id] && gameData['maxBrokerApplicant' + id] >  100)
			{
				brokerApplicantPrice(id)
				gameData['maxBrokerApplicant' + id] -= 100
			}
		}
		else if(type == 'min100')
		{
			if (gameData['minBrokerApplicant' + id] > 0) {
				
				brokerApplicantPrice(id)

				gameData['minBrokerApplicant' + id] -= 100
			}
		}
		else
		{
			if (gameData['minBrokerApplicant' + id] > 1) {
				
				brokerApplicantPrice(id)
				
				gameData['minBrokerApplicant' + id] -= 1
			}
		}
	}
    updateValues()
}

function brokerApplicantPrice(id){
	gameData.alphaCoins -= gameData['brokerApplicant'+ id + 'Price']
	gameData['brokerApplicant'+ id + 'Price'] += 5
}

function decreaseBasicA2BBrokerRule(){
	if(gameData.basicA2BBrokerRule > 0)
		gameData.basicA2BBrokerRule -= 50
}

function increaseBasicA2BBrokerRule(){
	gameData.basicA2BBrokerRule += 50
}

function increaseBasicA2BBrokerAmount(){
	if(gameData.pieCoins >= gameData.increaseBasicA2BBrokerAmountPrice)
	{
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
		pickCurrentTask('autoCurrencyConversionBuy')
	else
		coinsToAlphaClick()
}

function coinsToAlphaClick(){
	price = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount * (gameData.alphaCoinConvertBulkToggle * 9 + 1)
	if (gameData.coins >= price && (gameData.coinsToAlphaBar == 100 || gameData.coinsToAlphaBar == 0) && !gameData.isCurrentlyExchangingAlpha) {
		gameData.alphaCoinConvertBulkToggleSet = gameData.alphaCoinConvertBulkToggle
		gameData.coins -= price
		gameData.coinsToAlphaBar = 0
		gameData.isCurrentlyExchangingAlpha = 1
		coinsToAlphaBar()
	}
}

function coinsToAlphaBar() {
	if (gameData.currencyBrokerSpeed == 1)
		barMoverAdvanced('coinsToAlpha', 1.5, 15)
	else
		barMoverAdvanced('coinsToAlpha', 0.5, 5 * gameData.currencyBrokerSpeed * gameData.doesHaveCurrencyBroker + !gameData.doesHaveCurrencyBroker * 100)
}

function coinsToAlphaBarEnd(){
	
	if(gameData.alphaCoinConvertBulkToggleSet == 0)
		gameData.alphaCoins += gameData.currencyBrokerTransferAmount
	else
		gameData.alphaCoins += gameData.currencyBrokerTransferAmount * 10
	
	gameData.isCurrentlyExchangingAlpha = 0
}

function alphaToBetaClick(){
	if(gameData.textForA2BBrokerAmountToggle == 0)
		price = gameData.betaCoinsExchangeRate
	else
		price = gameData.betaCoinsExchangeRate * gameData.basicA2BBrokerAmount

	if (gameData.alphaCoins >= price && (gameData.alphaToBetaBar == 100 || gameData.alphaToBetaBar == 0)) {
		gameData.alphaCoins -= price
		gameData.alphaToBetaBar = 0
		gameData.a2BBrokerAmountSet = gameData.textForA2BBrokerAmountToggle
		alphaToBetaBar()
	}
}

function alphaToBetaBar() {
	barMoverAdvanced('alphaToBeta', 0.5, 15)
}

function alphaToBetaBarEnd() {
	if(gameData.a2BBrokerAmountSet == 0)
		gameData.betaCoins += 1
	else
		gameData.betaCoins += gameData.basicA2BBrokerAmount
}