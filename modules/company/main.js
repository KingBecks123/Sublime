function payEmployee() {
    if (game.coins >= game.employeeWage && game.employeeWorking < game.employeeWorkingMax) {
        game.employeeWorking += 1
        game.coins -= game.employeeWage
        smartBarStart('working', 0.025)
    }
}

function workingBarEnd() {
    game.limes += game.employeeCurrentSpeed
    game.employeeWorking -= 1

    if (game.employeeWorking > 0)
        runBar('working', 0.025)
}

function teach() {
    game.employeeCurrentSpeed = -(game.employeeHunger * 60)
    setTimeout(smartBarStart, 1000, 'teach', 0.75)
}

function teachBarEnd() { }

function motivateEmployee() {
    if (game.employeeWorking > 0)
        game.workingBar += game.motivationSkillLevel / 20
}

function onLoadCompany() {
    if (game.surveillanceCamera && secondsOffline > 60 && game.employeeWorking > 0) {
        for (i = 0; i < Math.floor(secondsOffline / 60) && game.employeeWorking > 0; i++) {
            game.employeeWorking -= 1
            game.limes += game.employeeCurrentSpeed
        }
        game.workingBar = 0
    }
}

function randomizeApplication() {
    employeeTypes[game.typeToHire].applicationRandomisation()
    game.applicationType = game.typeToHire
}

function buyAdvertisingManager() {
    if (game.alphaCoins >= 10) {
        game.alphaCoins -= 10
        game.advertisingManagerBroker = 1
    }
}

function advertise() {
    if (game.advertiseBar == 0 && game[employeeTypes[game.typeToHireToggle].priceType] >= employeeTypes[game.typeToHireToggle].price) {
        game[employeeTypes[game.typeToHireToggle].priceType] -= employeeTypes[game.typeToHireToggle].price
        game.typeToHire = game.typeToHireToggle
        game.advertiseBar = 0
        advertiseBar()
    }
}

function advertiseBar() {
    runBar('advertise', (7.5 * (game.advertisingLevel2 * 2 * game.advertisingLevel3 + game.advertisingLevel2 + 2 * game.advertisingLevel3 + 1)) / 100)
}

function advertiseBarEnd() {
    game.applicationReady = 1
    game.hasAdvertised = 1
    randomizeApplication()
}

function updateValuesCompany() {
    employeeTypesNames.forEach(element => {
        setColor('hire' + element + 'ToggleButton', 'gray')
    });

    if (game.typeToHireToggle == 'basic') {
        setColor('hireEmployeeToggleButton', myLime)
    } else if (game.typeToHireToggle == 'broker') {
        setColor('hireBrokerToggleButton', myLime)
    } else {
        setColor('hirePieMerchantToggleButton', myLime)
    }

    if (game.applicationReady)
        employeeTypes[game.applicationType].textFormat()
    else
        update('application', blankApplicationText)

    checkShow(game.applicationReady, 'applicationInfo')
    checkShow(!game.advertisingLevel2, 'advertisingLeaflets')
    checkShow(!game.advertisingLevel3, 'advertisingBillboard')
    checkShow(game.employees, 'companyButton')
    checkShow(game.hasAdvertised && !game.surveillanceCamera, 'offlineEmployee')
    checkShow(game.advertisingLevel1, 'advertisingMethods')
    checkShow(!game.advertisingLevel1 && game.hasAdvertised, 'researchBetterAdvertising')

    update('currentSpeedEmployee', 'Current speed: ' + game.employeeCurrentSpeed.toLocaleString() + ' limes per minute')
    update('speedEmployee', 'Speed: ' + game.employeeSpeed.toLocaleString() + '% Of What I&#39m Taught')

    basicToggle("teachInfo")
    basicToggle("employeeStatsInfo")
    toggleAesthetic("autoAdvertiseBroker")


    if (game.employeeWorking > game.employeeWorkingMax)
        game.employeeWorking = game.employeeWorkingMax

}