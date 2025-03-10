function payEmployee() {
    if (gameData.coins >= gameData.employeeWage && gameData.employeeWorking < gameData.employeeWorkingMax) {
        gameData.employeeWorking += 1
        gameData.coins -= gameData.employeeWage
		smartBarStart('working', 0.025)
    }
}

function workingBarEnd() {
	gameData.limes += gameData.employeeCurrentSpeed
	gameData.employeeWorking -= 1
	
	if (gameData.employeeWorking > 0)
		runBar('working', 0.025)
}

function teach() {
    gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
	setTimeout(smartBarStart, 1000, 'teach', 0.75)
}

function teachBarEnd() {}

function motivateEmployee() {
	if (gameData.employeeWorking > 0)
	    gameData.workingBar += gameData.motivationSkillLevel / 20
}

function onLoadCompany () {
	if (gameData.surveillanceCamera && secondsOffline > 60 && gameData.employeeWorking > 0) {
		for (i = 0; i < Math.floor(secondsOffline / 60) && gameData.employeeWorking > 0; i++) {
			gameData.employeeWorking -= 1
			gameData.limes += gameData.employeeCurrentSpeed
		}
		gameData.workingBar = 0
	}
}

function randomizeApplication() {
	employeeTypes[gameData.typeToHire].applicationRandomisation()
	gameData.applicationType = gameData.typeToHire
}

function buyAdvertisingManager() {
	if (gameData.alphaCoins >= 10) {
		gameData.alphaCoins -= 10
		gameData.advertisingManagerBroker = 1
	}
}

function advertise() {
	if (gameData.advertiseBar == 0 && gameData[employeeTypes[gameData.typeToHireToggle].priceType] >= employeeTypes[gameData.typeToHireToggle].price) {
		gameData[employeeTypes[gameData.typeToHireToggle].priceType] -= employeeTypes[gameData.typeToHireToggle].price
		gameData.typeToHire = gameData.typeToHireToggle
		gameData.advertiseBar = 0
		advertiseBar()
	}
}

function advertiseBar() {
	runBar('advertise', (7.5 * (gameData.advertisingLevel2 * 2 * gameData.advertisingLevel3 + gameData.advertisingLevel2 + 2 * gameData.advertisingLevel3 + 1)) / 100)
}

function advertiseBarEnd() {
	gameData.applicationReady = 1
	gameData.hasAdvertised = 1
	randomizeApplication()
}

function updateValuesCompany () {
	if (gameData.typeToHireToggle == 'basic') {
		setColor('hireEmployeeToggleButton', '#4DFE89')
		setColor('hireBrokerToggleButton', 'gray')
		setColor('hirePieMerchantToggleButton', 'gray')
	} else if (gameData.typeToHireToggle == 'broker') {
		setColor('hireEmployeeToggleButton', 'gray')
		setColor('hireBrokerToggleButton', '#4DFE89')
		setColor('hirePieMerchantToggleButton', 'gray')
	} else if (gameData.typeToHireToggle == 'pie') {
		setColor('hireEmployeeToggleButton', 'gray')
		setColor('hireBrokerToggleButton', 'gray')
		setColor('hirePieMerchantToggleButton', '#4DFE89')
	}
	
	if (gameData.applicationReady)
		employeeTypes[gameData.applicationType].textFormat()
	else
		update('application', `Potential Employees, Pin Applications Here!
							   ---
You, yes YOU, will have the chance to work in the town-renowned Lime Inc.!
							   With BENEFITS! Only to name A FEW:
							   - Get PAID*

							   APPLY NOW!
			`)
	
	checkShow(gameData.applicationReady, 'applicationInfo')
	checkShow(!gameData.advertisingLevel2, 'advertisingLeaflets')
	checkShow(!gameData.advertisingLevel3, 'advertisingBillboard')
	checkShow(gameData.employees, 'companyButton')
	
	update('currentSpeedEmployee', 'Current speed: ' + gameData.employeeCurrentSpeed.toLocaleString() + ' limes per minute')
	update('speedEmployee', 'Speed: ' + gameData.employeeSpeed.toLocaleString() + '% Of What I&#39m Taught')
	
	basicToggle("teachInfo")
	basicToggle("employeeStatsInfo")
	toggleAesthetic("autoAdvertiseBroker")


    if (gameData.employeeWorking > gameData.employeeWorkingMax)
        gameData.employeeWorking = gameData.employeeWorkingMax
	


}