function updateValuesBase() {
    update('sfxToggleButton', (game.sfxOn ? '♪ On' : '♪ Off'))
    setColor('sfxToggleButton', (game.sfxOn ? myLime : '#898989'));

    update('showDonationButton', 'Donation Button ' + (game.showDonationButton ? 'Shown' : 'Hidden'))

    checkShow(game.showDonationButton, "donationButton")

    for (let i = 0; i < baseVariables.length; i++) {
        id = baseVariables[i].id
        elem = "textFor" + id
        if (game[id] > 1e9)
            val = game[id].toExponential(3)
        else
            val = game[id].toLocaleString()

        doShow = (game[id + 'UnlockedVariable'] && game[id + 'ShowVariable']) || id == 'limes'

        checkShow(doShow, elem + 'Div')
        checkShow(doShow, elem + 'Br')
        checkShow(doShow, elem + 'P')
        checkShow(doShow, elem)

        update(elem, val)
    }

    for (let i = 1; i < baseVariables.length; i++) {
        if (game[baseVariables[i].id] > 0)
            game[baseVariables[i].id + 'UnlockedVariable'] = true

        checkShow(game[baseVariables[i].id + 'UnlockedVariable'], 'currencyDisplay(' + i + ')', 'inline')
    }

    startCurrentTask(game.currentTask)
    startCurrentTask(game.currentTask2)

    toggleAesthetic("toggleActions")

    if (game.coins > game.coinsMax)
        game.coins = game.coinsMax

    overMaximum("baskets")
    overMaximum("juicers")
    overMaximum("peelers")

    function overMaximum(x) {
        if (game[x] > game[x + 'Max'])
            game[x] = game[x + 'Max']
    }

    preventNegative('coins')
    preventNegative('limes')
    preventNegative('respect')

    function preventNegative(id) {
        if (game[id] < 0)
            game[id] = 0
    }

    game.juicePricePrice = game.juicePriceCents + 1
    game.nourishmentPrice = Math.pow(10, game.nourishment);

    update('textForTimePlayed', 'Total Time Played: ' + game.timePlayed.toLocaleString() + ' Seconds')
    update('endStats', 'Total Time Played: ' + game.timePlayed.toLocaleString() + ' Seconds')




    if (game.employeeWorking > 0)
        update('workingEmployee', 'Working time left: ' + game.employeeWorking.toLocaleString() + ' / 10 minutes.')
    else
        update('workingEmployee', 'Employee is idle.')


    var x = document.getElementsByClassName('pinButton')
    if (game.pinUnlock == 1) {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'inline-block'
        }
    }
    else {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'none'
        }
    }


    for (i = 0; i <= 3; i++) {
        checkShow(game.tomes == i, 'tomeDiv' + (i + 1))
    }

    const conditions = [
        {
            condition: game.lookAround > 1,
            elementId: 'sellYourLimesDiv'
        },
        {
            condition: game.lookAround > 2 && !(game.hideMaxedPurchases && game.juicers == game.juicersMax),
            elementId: 'buyAJuicerDiv'
        },
        {
            condition: game.lookAround > 2 && !(game.hideMaxedPurchases && game.baskets == game.basketsMax),
            elementId: 'buyABasketDiv'
        },
        {
            condition: game.tomes > 3,
            elementId: 'goldenBarDiv'
        },
        {
            condition: !game.pinUnlock,
            elementId: 'pinUnlockDiv'
        },
        {
            condition: game.pieBucket && game.pieFlourBucket,
            elementId: 'bucketThinSteelPlating'
        },
        {
            condition: game.maps == 0,
            elementId: 'buyAMapDiv1'
        },
        {
            condition: game.maps == 1,
            elementId: 'buyAMapDiv2'
        },
        {
            condition: game.maps == 2,
            elementId: 'buyAMapDiv3'
        },
        {
            condition: game.maps == 3,
            elementId: 'buyAMapDiv4'
        },
        {
            condition: game.maps == 4,
            elementId: 'buyAMapDiv5'
        },
        {
            condition: game.bulkBuyUnlock,
            elementId: 'basketsBulkButton',
            display: 'inline'
        },

        //Map Unlocks
        {
            condition: game.maps > 0 || game.villageNumber > 1,
            elementId: 'marketMainButtonsDiv',
            display: 'inline'
        },
        {
            condition: game.maps > 0,
            elementId: 'marketStore',
            display: 'block'
        },
        {
            condition: game.maps > 1,
            elementId: 'hiringAreaButton',
            display: 'inline'
        },
        {
            condition: game.maps > 1 && !game.storageUnlock,
            elementId: 'storageUnlockDiv'
        },
        {
            condition: game.maps > 1 && game.storageUnlock && !(game.storageJuicersUnlock && game.storagePeelersUnlock),
            elementId: 'storageDiv'
        },
        {
            condition: game.maps > 1 && !game.bulkBuyUnlock,
            elementId: 'bulkBuyUnlockDiv'
        },
        {
            condition: game.maps > 1 && game.bulkBuyUnlock && !game.bulkBuyUnlock2,
            elementId: 'bulkBuyUnlock2Div'
        },
        {
            condition: game.maps > 2,
            elementId: 'travellingArea'
        },
        {
            condition: game.maps > 2 && !game.fasterTransport,
            elementId: 'fasterTransportDiv'
        },
        {
            condition: game.maps > 2,
            elementId: 'increaseJuicePrice'
        },
        {
            condition: game.maps > 2 || game.villageNumber > 1,
            elementId: 'travelButton',
            display: 'inline'
        },

        {
            condition: game.maps > 3 && !game.respectBillboard,

            elementId: 'respectBillboard'
        },
        {
            condition: game.maps > 3,
            elementId: 'tasksButton'
        },
        {
            condition: game.maps > 3 && !game.autoCurrencyConversionBuy,
            elementId: 'autoCurrencyConversion'
        },

        {
            condition: game.maps > 4 && game.basicAlphaToBetaBroker,
            elementId: 'basicAlphaToBetaBrokerRule'
        },
        {
            condition: game.maps > 4 && !game.basicAlphaToBetaBroker,
            elementId: 'basicAlphaToBetaBroker'
        },
        {
            condition: game.maps > 4,
            elementId: 'buyPie'
        },

        {
            condition: game.lookAround != 3,
            elementId: 'lookAroundButton',
            display: 'inline'
        },
        {
            condition: game.villageNumber > 1 || game.betterTraining || game.increaseJuicePricePermanance,
            elementId: 'megaCoinUpgradesButton'
        },
        {
            condition: !game.forestWell,
            elementId: 'buyAWell'
        },
        {
            condition: game.respectMilestone10000 && !game.rottenActualWisdom,
            elementId: 'rottenActualWisdom'
        },
        {
            condition: !game.storagePeelersUnlock,
            elementId: 'storagePeelersDiv'
        },
        {
            condition: !game.storageJuicersUnlock,
            elementId: 'storageJuicersDiv'
        },
        {
            condition: !game.changeResearchersBy10Unlock,
            elementId: 'changeResearchersBy10Unlock'
        },
        {
            condition: !game.endScreen,
            elementId: 'sublimeMain'
        },
        {
            condition: !game.endScreen,
            elementId: 'sublimeMain'
        },
        {
            condition: game.endScreen,
            elementId: 'endScreen'
        },
        {
            condition: game.lookAround,
            elementId: 'navigateButtons',
            display: 'visible'
        }
    ];

    conditions.forEach(({ condition, elementId, display }) => {
        checkShow(condition, elementId, display);
    });


    updateBar('teach')
    updateBar('working')


    if (game.hideMaxedPurchases)
        update('hideMaxedPurchasesButton', 'Maxed Purchases Hidden')
    else
        update('hideMaxedPurchasesButton', 'Maxed Purchases Shown')

    if (game.bulkBuyUnlock2) {
        update('peelersBulkButton', 'x100')
        update('basketsBulkButton', 'x100')
        update('juicersBulkButton', 'x100')
    }

    if (game.forestWell)
        update('textForlimesDiv', '&#39Limes&#39')
}