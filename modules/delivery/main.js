function delivery() {
    if (game.deliveryBar == 0 && game.coins >= game.deliveryPrice && game.juice >= game.juiceBulkAmountToggle) {
        game.deliveryType = game.deliveryTypeToggle
        game.juiceBulkAmount = game.juiceBulkAmountToggle
        game.coins -= game.deliveryPrice
        game.juice -= game.juiceBulkAmount
        game.deliveryBar = 0
        deliveryBar()
    }
}

function deliveryBar() {	
	if (game.deliveryType == 0)
		amount = 0.02
	else if (game.deliveryType == 1)
		amount = 0.5
	else
		amount = 1
	
	runBar('delivery', amount)
}

function deliveryBarEnd() {
	playSound('CASH');
	
	game.coins += (game.nationalJuiceMarketing + 1) * Math.floor(game.juiceBulkAmount * (1 + game.juicePriceCents / 100))
}

function increaseJuicePrice() {
	if (game.increaseJuicePricex10) {
		for (i = 0; i < 10; i++) {
			if (game.coins >= game.juicePricePrice) {
				game.coins -= game.juicePricePrice
				game.juicePriceCents += 1
				game.juicePricePrice = game.juicePriceCents + 1
			}
		}
	}
	else {
		if (game.coins >= game.juicePricePrice) {
			game.coins -= game.juicePricePrice
			game.juicePriceCents += 1
		}
	}
}


function decreaseJuiceSold() {
    if (game.juiceBulkAmountToggle >= 1) {
        if (game.juiceBulkAmountToggle > 100)
            game.juiceBulkAmountToggle -= 10
        else
            game.juiceBulkAmountToggle -= 1
    }
}

function increaseJuiceSold() {
    if (game.juiceBulkAmountToggle < 100)
        game.juiceBulkAmountToggle += 1
    else if (game.juiceBulkAmountToggle < 500 && game.deliveryTypeToggle == 2 && game.fasterTransport > 0)
        game.juiceBulkAmountToggle += 10
    else if (game.juiceBulkAmountToggle < 2000 && game.deliveryTypeToggle == 3)
        game.juiceBulkAmountToggle += 10
}

function deliveryToggleStandard() {
    if (game.fasterTransport == 0) {
        game.deliveryTypeToggle = 0
        game.deliveryPrice = 2
    } else {
        game.deliveryTypeToggle = 2
        game.deliveryPrice = 50
    }
}

function deliveryToggleExpress() {
    game.deliveryTypeToggle = 1
    game.deliveryPrice = 5
}

function deliveryToggleTrain() {
    game.deliveryTypeToggle = 3
    game.deliveryPrice = 5000
}

function sellMaxJuice() {
    if (game.juice < game.juiceBulkAmountMax)
        game.juiceBulkAmountToggle = game.juice
    else
        game.juiceBulkAmountToggle = game.juiceBulkAmountMax
}

function updateValuesDelivery () {
	if (game.deliveryTypeToggle == 0 || game.deliveryTypeToggle == 2) {
		setColor('deliveryToggleStandardButton', myLime)
		setColor('deliveryToggleExpressButton', "gray")
		setColor('deliveryToggleTrainButton', "gray")
	} else if (game.deliveryTypeToggle == 1) {
		setColor('deliveryToggleStandardButton', "gray")
		setColor('deliveryToggleExpressButton', myLime)
		setColor('deliveryToggleTrainButton', "gray")
	} else {
		setColor('deliveryToggleStandardButton', "gray")
		setColor('deliveryToggleExpressButton', "gray")
		setColor('deliveryToggleTrainButton', myLime)
	}
	
    if (game.juiceBulkAmountToggle > 100 && game.deliveryTypeToggle < 2)
        game.juiceBulkAmountToggle = 100

    if (game.juiceBulkAmountToggle > game.juiceBulkAmountMax)
        game.juiceBulkAmountToggle = game.juiceBulkAmountMax
	
	currentTaskAesthetic('delivery')
	
	if (game.juiceBulkAmountToggle == 100 && game.deliveryTypeToggle < 2)
		setColor('increaseJuiceSoldButton', "#50514F")
	else
		setColor('increaseJuiceSoldButton', "#BBBBBB")

	if (game.juiceBulkAmountToggle == 0)
		setColor('decreaseJuiceSoldButton', "#50514F")
	else
		setColor('decreaseJuiceSoldButton', "#BBBBBB")
	
	if (game.deliveryTypeToggle == 2 && game.fasterTransport > 0)
		game.juiceBulkAmountMax = 500
	else if (game.deliveryTypeToggle == 3)
		game.juiceBulkAmountMax = 2000
	else
		game.juiceBulkAmountMax = 100
	
	if (game.fasterTransport == 0)
		update('deliveryToggleStandardButton', 'Standard Delivery')
	else
		update('deliveryToggleStandardButton', 'Hyper Delivery')
	
	checkShow(!game.increaseJuicePricePermanance, 'increaseJuicePricePermanance')
	checkShow(game.deliveryManager, 'sellMaxJuiceButton', 'inline')
	checkShow(!game.deliveryManager, 'decreaseJuiceSoldButton', 'inline')
	checkShow(!game.deliveryManager, 'increaseJuiceSoldButton', 'inline')
	checkShow(game.deliveryManager == 0 && game.maps >= 3, 'buyADeliveryManager')
	checkShow(game.trainTransport, 'deliveryToggleTrainButton', 'inline')
	checkShow(game.hasSoldPie && !game.trainTransport, 'trainTransportDiv')
	checkShow(game.hasGottenJuice, 'juiceMarket')
	
	update('sellYourJuiceAmount','You Will Deliver ' + game.juiceBulkAmountToggle.toLocaleString() + ' / ' + game.juiceBulkAmountMax.toLocaleString() + ' Juice' )
	update('sellYourJuiceReward', 'You Will Get ' + ((game.nationalJuiceMarketing + 1) * Math.floor(game.juiceBulkAmountToggle * (1 + (game.juicePriceCents / 100)))).toLocaleString() + ' Coins')
	update('sellYourJuicePrice', 'You Need ' + game.deliveryPrice.toLocaleString() + ' Coins For Delivery')
	update('textForJuicePricePrice', 'Price: ' + (game.juicePricePrice + game.increaseJuicePricex10 * (game.juicePricePrice * 9 + 45)).toLocaleString() + ' Coins')
	toggleAesthetic("increaseJuicePricex10")

	if (game.increaseJuicePricePermanance < 1)
		setColor('increaseJuicePriceButton', myBeige)
	else
		setColor('increaseJuicePriceButton', '#FF999A')
}