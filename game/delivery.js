Object.assign ( gameDataBase, {
    deliveryType: 0,
    deliveryTypeToggle: 0,
    deliveryPrice: 2,
    juiceBulkAmountToggle: 1,
} )

function delivery() {
    if (gameData.deliveryBar == 0 && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
        gameData.deliveryType = gameData.deliveryTypeToggle
        gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
        gameData.coins -= gameData.deliveryPrice
        gameData.juice -= gameData.juiceBulkAmount
        gameData.deliveryBar = 0
        deliveryBar()
    }
}

function deliveryBar() {	
	if (gameData.deliveryType == 0)
		amount = 0.02
	else if (gameData.deliveryType == 1)
		amount = 0.5
	else
		amount = 1
	
	runBar('delivery', amount)
}

function deliveryBarEnd() {
	gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + gameData.juicePriceCents / 100))
}

function increaseJuicePrice() {
	if (gameData.increaseJuicePricex10) {
		for (i = 0; i < 10; i++) {
			if (gameData.coins >= gameData.juicePricePrice) {
				gameData.coins -= gameData.juicePricePrice
				gameData.juicePriceCents += 1
				gameData.juicePricePrice = gameData.juicePriceCents + 1
			}
		}
	}
	else {
		if (gameData.coins >= gameData.juicePricePrice) {
			gameData.coins -= gameData.juicePricePrice
			gameData.juicePriceCents += 1
		}
	}
}


function decreaseJuiceSold() {
    if (gameData.juiceBulkAmountToggle >= 1) {
        if (gameData.juiceBulkAmountToggle > 100)
            gameData.juiceBulkAmountToggle -= 10
        else
            gameData.juiceBulkAmountToggle -= 1
    }
}

function increaseJuiceSold() {
    if (gameData.juiceBulkAmountToggle < 100)
        gameData.juiceBulkAmountToggle += 1
    else if (gameData.juiceBulkAmountToggle < 500 && gameData.deliveryTypeToggle == 2 && gameData.fasterTransport > 0)
        gameData.juiceBulkAmountToggle += 10
    else if (gameData.juiceBulkAmountToggle < 2000 && gameData.deliveryTypeToggle == 3)
        gameData.juiceBulkAmountToggle += 10
}

function deliveryToggleStandard() {
    if (gameData.fasterTransport == 0) {
        gameData.deliveryTypeToggle = 0
        gameData.deliveryPrice = 2
    } else {
        gameData.deliveryTypeToggle = 2
        gameData.deliveryPrice = 50
    }
}

function deliveryToggleExpress() {
    gameData.deliveryTypeToggle = 1
    gameData.deliveryPrice = 5
}

function deliveryToggleTrain() {
    gameData.deliveryTypeToggle = 3
    gameData.deliveryPrice = 5000
}

function sellMaxJuice() {
    if (gameData.juice < gameData.juiceBulkAmountMax)
        gameData.juiceBulkAmountToggle = gameData.juice
    else
        gameData.juiceBulkAmountToggle = gameData.juiceBulkAmountMax
}

function updateValuesDelivery () {
	if (gameData.deliveryTypeToggle == 0 || gameData.deliveryTypeToggle == 2) {
		colorChanger('deliveryToggleStandardButton', "#4DFE89")
		colorChanger('deliveryToggleExpressButton', "gray")
		colorChanger('deliveryToggleTrainButton', "gray")
	} else if (gameData.deliveryTypeToggle == 1) {
		colorChanger('deliveryToggleStandardButton', "gray")
		colorChanger('deliveryToggleExpressButton', "#4DFE89")
		colorChanger('deliveryToggleTrainButton', "gray")
	} else {
		colorChanger('deliveryToggleStandardButton', "gray")
		colorChanger('deliveryToggleExpressButton', "gray")
		colorChanger('deliveryToggleTrainButton', "#4DFE89")
	}
	
    if (gameData.juiceBulkAmountToggle > 100 && gameData.deliveryTypeToggle < 2)
        gameData.juiceBulkAmountToggle = 100

    if (gameData.juiceBulkAmountToggle > gameData.juiceBulkAmountMax)
        gameData.juiceBulkAmountToggle = gameData.juiceBulkAmountMax
	
	currentTaskAesthetic('delivery')
	
	if (gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2)
		colorChanger('increaseJuiceSoldButton', "#50514F")
	else
		colorChanger('increaseJuiceSoldButton', "#BBBBBB")

	if (gameData.juiceBulkAmountToggle == 0)
		colorChanger('decreaseJuiceSoldButton', "#50514F")
	else
		colorChanger('decreaseJuiceSoldButton', "#BBBBBB")
	
	if (gameData.deliveryTypeToggle == 2 && gameData.fasterTransport > 0)
		gameData.juiceBulkAmountMax = 500
	else if (gameData.deliveryTypeToggle == 3)
		gameData.juiceBulkAmountMax = 2000
	else
		gameData.juiceBulkAmountMax = 100
	
	if (gameData.fasterTransport == 0)
		update('deliveryToggleStandardButton', 'Standard Delivery')
	else
		update('deliveryToggleStandardButton', 'Hyper Delivery')
	
	checkShow(!gameData.increaseJuicePricePermanance, 'increaseJuicePricePermanance')
	checkShow(gameData.increaseJuicePricePermanance, 'upgradeJuicePricePermanance')
	checkShow(gameData.deliveryManager, 'sellMaxJuiceButton', 'inline')
	checkShow(!gameData.deliveryManager, 'decreaseJuiceSoldButton', 'inline')
	checkShow(!gameData.deliveryManager, 'increaseJuiceSoldButton', 'inline')
	checkShow(gameData.deliveryManager == 0 && gameData.maps >= 3, 'buyADeliveryManager')
	checkShow(gameData.trainTransport, 'deliveryToggleTrainButton', 'inline')
	checkShow(gameData.hasSoldPie && !gameData.trainTransport, 'trainTransportDiv')
	
	checkShow(gameData.hasGottenJuice, 'juiceMarket')
	
	update('sellYourJuiceAmount','You Will Deliver ' + gameData.juiceBulkAmountToggle.toLocaleString() + ' / ' + gameData.juiceBulkAmountMax.toLocaleString() + ' Juice' )
	update('sellYourJuiceReward', 'You Will Get ' + ((gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmountToggle * (1 + (gameData.juicePriceCents / 100)))).toLocaleString() + ' Coins')
	update('sellYourJuicePrice', 'You Need ' + gameData.deliveryPrice.toLocaleString() + ' Coins For Delivery')
	update('textForJuicePricePrice', 'Price: ' + (gameData.juicePricePrice + gameData.increaseJuicePricex10 * (gameData.juicePricePrice * 9 + 45)).toLocaleString() + ' Coins')
	toggleAesthetic("increaseJuicePricex10")

	if (gameData.increaseJuicePricePermanance < 1)
		colorChanger('increaseJuicePriceButton', "#DEAD85")
	else
		colorChanger('increaseJuicePriceButton', '#FF999A')
}