function randomizeApplication() {
	if (gameData.typeToHire == 0) {
		if (gameData.firstApplicant == 1) {
			gameData.applicantSpeed = 100
			gameData.applicantPrice = 0
			gameData.applicantWage = 5
			gameData.applicantHunger = 1

			gameData.firstApplicant = 0
		} else {
			gameData.applicantSpeed = (Math.floor(Math.random() * (10 + gameData.betterTraining) + 1) * 100)
			gameData.applicantPrice = Math.floor(Math.random() * 200)
			gameData.applicantWage = Math.floor(Math.random() * 16) + 5
			gameData.applicantHunger = Math.floor(Math.random() * 20) + 1
		}
	} else if (gameData.typeToHire == 1) {
		gameData.currencyApplicantFee = beckyRandomMinMax(gameData.minBrokerApplicantFee, gameData.maxBrokerApplicantFee)
		gameData.currencyApplicantSpeed = beckyRandomMinMax(gameData.minBrokerApplicantSpeed, gameData.maxBrokerApplicantSpeed)
		gameData.currencyApplicantPrice = (Math.floor(Math.random() * 20) + 1) * 10000
		gameData.currencyApplicantTransferAmount = beckyRandomMinMax(gameData.minBrokerApplicantAmount, gameData.maxBrokerApplicantAmount)
	} else if (gameData.typeToHire == 2) {
		gameData.pieApplicantPieCoinPrice = beckyRandomMinMax(5, 20)
		if(gameData.usingBetaCoinWage == 1)
			gameData.pieApplicantBetaCoinPrice = beckyRandomMinMax(200, 1000)
		else
			gameData.pieApplicantBetaCoinPrice = 0

		gameData.pieApplicantMaxPay = beckyRandomMinMax(1, 20)
		gameData.pieApplicantCharm = beckyRandomMinMax(0, 10)
		gameData.pieApplicantPrice = beckyRandomMinMax(1, 20) * 10
	}

	gameData.applicationType = gameData.typeToHire
}

function hireApplicant() {
	if (gameData.applicationType == 0) {
		if (gameData.coins >= gameData.applicantPrice && gameData.applicationReady == 1) {
			gameData.applicationReady = 0
			gameData.employeeWorking = 0
			gameData.workingBar = 0

			gameData.coins -= gameData.applicantPrice

			gameData.employeeHunger = gameData.applicantHunger
			gameData.employeeSpeed = gameData.applicantSpeed
			gameData.employeePrice = gameData.applicantPrice
			gameData.employeeWage = gameData.applicantWage

			gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)

			gameData.employees = 1

			gameData.employeeIsWorking = 0
			gameData.workingBar = 0

			update("speedEmployee", "Speed: " + gameData.employeeSpeed.toLocaleString() + "% of what I'm taught.")
			update("wageEmployee", "Wages: " + gameData.employeeWage.toLocaleString() + " Coins per minute.")
			update("hungerEmployee", "Hunger: " + gameData.employeeHunger.toLocaleString() + " Limes per second.")
		}
	} else if (gameData.applicationType == 1) {
		if (gameData.coins >= gameData.currencyApplicantPrice && gameData.applicationReady == 1) {
			gameData.applicationReady = 0
			gameData.doesHaveCurrencyBroker = 1

			gameData.coins -= gameData.currencyApplicantPrice

			gameData.currencyBrokerFee = gameData.currencyApplicantFee
			gameData.currencyBrokerSpeed = gameData.currencyApplicantSpeed
			gameData.currencyBrokerPrice = gameData.currencyApplicantPrice
			gameData.currencyBrokerTransferAmount = gameData.currencyApplicantTransferAmount

			gameData.coinsToAlphaBar = 0

		}
	} else if (gameData.applicationType == 2) {
		if (gameData.betaCoins >= gameData.pieApplicantPrice && gameData.applicationReady == 1) {
			gameData.applicationReady = 0
			gameData.doesHavePieMerchant = 1
			gameData.betaCoins -= gameData.pieApplicantPrice

			gameData.pieMerchantPieCoinPrice = gameData.pieApplicantPieCoinPrice
			gameData.pieMerchantBetaCoinPrice = gameData.pieApplicantBetaCoinPrice
			gameData.pieMerchantMaxPay = gameData.pieApplicantMaxPay
			gameData.pieMerchantCharm = gameData.pieApplicantCharm



		}
	}
	updateValues()
}

function buyAdvertisingManager() {
	if (gameData.alphaCoins >= 10) {
		gameData.alphaCoins -= 10
		gameData.advertisingManagerBroker = 1
	}
	updateValues()
}

function advertise() {
	if ((gameData.advertiseBar == 100 || gameData.advertiseBar == 0) && gameData.isAdvertising == 0) {
		if ((gameData.coins >= gameData.advertisePrice && gameData.advertisePriceType == 'coins') || (gameData.betaCoins >= gameData.advertisePrice && gameData.advertisePriceType == 'betaCoins')) {
			gameData[gameData.advertisePriceType] -= gameData.advertisePrice
			gameData.typeToHire = gameData.typeToHireToggle
			gameData.advertiseBar = 0
			gameData.isAdvertising = 1
			advertiseBar()
		}
	}
}

function advertiseBar() {
	barMoverAdvanced('advertise', 0.5, 100 / (gameData.advertisingLevel2 * 2 * gameData.advertisingLevel3 + gameData.advertisingLevel2 + 2 * gameData.advertisingLevel3 + 1))
}

function advertiseBarEnd() {
	gameData.applicationReady = 1
	gameData.hasAdvertised = 1
	randomizeApplication()
	gameData.isAdvertising = 0
}

function updateHiringArea() {
	if (gameData.applicationReady == 1) {
		if (gameData.applicationType == 0) {
			update("application",
				"<br>" +
				"Skills: Can Collect Limes." + "<br>" +
				"Speed: " + gameData.applicantSpeed.toLocaleString() + "% Of What I'm Taught." + "<br>" +
				"Price: " + gameData.applicantPrice.toLocaleString() + " Coins." + "<br>" +
				"Wages: " + gameData.applicantWage.toLocaleString() + " Coins Per Minute." + "<br>" +
				"Hunger: " + gameData.applicantHunger.toLocaleString() + " Limes Per Second." + "<br>" +
				"<br>"
			)
			showBasicDiv("applicationInfo")
		} else if (gameData.applicationType == 1) {

			update("application",
				"<br>" +
				"Speed: " + gameData.currencyApplicantSpeed.toLocaleString() + " Seconds." + "<br>" +
				"Transfer Fee: " + gameData.currencyApplicantFee.toLocaleString() + " Coins." + "<br>" +
				"Alpha Coins Per Transfer: " + gameData.currencyApplicantTransferAmount.toLocaleString() + "." + "<br>" +
				"Hire Price: " + gameData.currencyApplicantPrice.toLocaleString() + " Coins." + "<br>" +
				"<br>"
			)

		} else if (gameData.applicationType == 2) {

			update("application",
				"<br>" +
				"Pie Coin Wage: "    + gameData.pieApplicantPieCoinPrice.toLocaleString()   + "<br>" +
				"Beta Coin Wage: "   + gameData.pieApplicantBetaCoinPrice.toLocaleString()  + "<br>" +
				"Charm: "            + gameData.pieApplicantCharm.toLocaleString()          + "<br>" +
				"Max Wage Advances: " + gameData.pieApplicantMaxPay.toLocaleString()         + "<br>" +
				"Hire Price: "       + gameData.pieApplicantPrice.toLocaleString()          + " Beta Coins." + "<br>" +
				"<br>"
			)

		}

	} else {
		update("application", "Pin applications here")
		hide("applicationInfo")
	}
	
	if (gameData.typeToHireToggle == 0)
	{
		gameData.advertisePrice = 10
		gameData.advertisePriceType = 'coins'
	}
	else if (gameData.typeToHireToggle == 1)
	{
		gameData.advertisePrice = 10000
		gameData.advertisePriceType = 'coins'
	}
	else if (gameData.typeToHireToggle == 2)
	{
		gameData.advertisePrice = 10
		gameData.advertisePriceType = 'betaCoins'
	}

}