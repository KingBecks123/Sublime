function delivery() {
    if (game.deliveryBar == 0 && game.coins >= game.deliveryPrice && game.juice >= game.juiceToSell) {
        game.deliveryType = game.deliveryTypeToggle
        game.juiceBulkAmount = game.juiceToSell
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

    var pricePerJuice = Math.floor(game.juiceBulkAmount * (1 + game.juicePriceCents / 100));

    game.coins += (game.nationalJuiceMarketing + 1) * pricePerJuice;
}

function increaseJuicePrice() {
    if (game.increaseJuicePricex10) {
        for (i = 0; i < 10; i++) {
            if (game.coins >= game.juicePricePrice) {
                increasejuicePriceCents();
                game.juicePricePrice = game.juicePriceCents + 1
            }
        }
    }
    else {
        if (game.coins >= game.juicePricePrice) {
            increasejuicePriceCents();
        }
    }

    function increasejuicePriceCents () {
        game.coins -= game.juicePricePrice
        game.juicePriceCents += 1
    }
}


function decreaseJuiceSold() {
    if (game.juiceToSell >= 1) {
        if (game.juiceToSell > 100)
            game.juiceToSell -= 10
        else
            game.juiceToSell -= 1
    }
}

function increaseJuiceSold() {
    if (game.juiceToSell < 100)
        game.juiceToSell += 1
    else if ((game.juiceToSell < 500 && game.deliveryTypeToggle == 2 && game.fasterTransport > 0) || (game.juiceToSell < 2000 && game.deliveryTypeToggle == 3))
        game.juiceToSell += 10
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
        game.juiceToSell = game.juice
    else
        game.juiceToSell = game.juiceBulkAmountMax
}

function updateValuesDelivery() {
    deliveryButtons.forEach(element => {
        setColor('deliveryToggle' + element + 'Button', "gray")
    });

    var selectedDeliverButton = 0;

    if (game.deliveryTypeToggle == 1)
        selectedDeliverButton = 1;
    else if (game.deliveryTypeToggle == 3)
        selectedDeliverButton = 2;

    setColor('deliveryToggle' + deliveryButtons[selectedDeliverButton] + 'Button', myLime)

    if (game.juiceToSell > 100 && game.deliveryTypeToggle < 2)
        game.juiceToSell = 100

    if (game.juiceToSell > game.juiceBulkAmountMax)
        game.juiceToSell = game.juiceBulkAmountMax

    currentTaskAesthetic('delivery')

    if (game.juiceToSell == 100 && game.deliveryTypeToggle < 2)
        setColor('increaseJuiceSoldButton', "#50514F")
    else
        setColor('increaseJuiceSoldButton', myGray)

    if (game.juiceToSell == 0)
        setColor('decreaseJuiceSoldButton', "#50514F")
    else
        setColor('decreaseJuiceSoldButton', myGray)

    if (game.deliveryTypeToggle == 2 && game.fasterTransport > 0)
        game.juiceBulkAmountMax = 500
    else if (game.deliveryTypeToggle == 3)
        game.juiceBulkAmountMax = 2000
    else
        game.juiceBulkAmountMax = 100

    var standardDeliveryButtonText = 'Standard Delivery'

    if (game.fasterTransport)
        standardDeliveryButtonText = 'Hyper Delivery'

    update('deliveryToggleStandardButton', standardDeliveryButtonText)

    checkShows = [
        {
            check: game.deliveryManager == 0 && game.maps >= 3,
            id: 'buyADeliveryManager',
            display: 'block'
        },
        {
            check: game.trainTransport,
            id: 'deliveryToggleTrainButton',
            display: 'inline'
        },
        {
            check: game.hasSoldPie && !game.trainTransport,
            id: 'trainTransportDiv',
            display: 'block'
        },
        {
            check: game.hasGottenJuice,
            id: 'juiceMarket',
            display: 'block'
        },
        {
            check: game.deliveryManager,
            id: 'sellMaxJuiceButton',
            display: 'inline'
        },
        {
            check: !game.deliveryManager,
            id: 'decreaseJuiceSoldButton',
            display: 'inline'
        },
        {
            check: !game.deliveryManager,
            id: 'increaseJuiceSoldButton',
            display: 'inline'
        },
        {
            check: !game.increaseJuicePricePermanance,
            id: 'increaseJuicePriceButton',
            display: 'block'
        }
    ]

    checkShows.forEach(element => {
        checkShow(element.check, element.id, element.display)
    });

    update('sellYourJuiceAmount', 'You Will Deliver ' + game.juiceToSell.toLocaleString() + ' / ' + game.juiceBulkAmountMax.toLocaleString() + ' Juice')
    update('sellYourJuiceReward', 'You Will Get ' + ((game.nationalJuiceMarketing + 1) * Math.floor(game.juiceToSell * (1 + (game.juicePriceCents / 100)))).toLocaleString() + ' Coins')
    update('sellYourJuicePrice', 'You Need ' + game.deliveryPrice.toLocaleString() + ' Coins For Delivery')
    update('textForJuicePricePrice', 'Price: ' + (game.juicePricePrice + game.increaseJuicePricex10 * (game.juicePricePrice * 9 + 45)).toLocaleString() + ' Coins')
    toggleAesthetic("increaseJuicePricex10")

    if (game.increaseJuicePricePermanance < 1)
        setColor('increaseJuicePriceButton', myBeige)
    else
        setColor('increaseJuicePriceButton', '#FF999A')
}