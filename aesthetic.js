background = "#3C3C3C"
accent2 = "gray"
accent3 = "#4DFE89"
accent4 = "#DEAD85"
grayAccent = "#50514F"
grayAccentLight = "#BBBBBB"
limesRelatedAccent = "#4DFE89"

function addAesthetic() {
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)

	function twoToggleButtons(button1, button2, value) {
		if (value == 1) {
			colorChanger(button1, accent3)
			colorChanger(button2, accent2)
		} else {
			colorChanger(button1, accent2)
			colorChanger(button2, accent3)
		}
	}

	var x = document.getElementsByClassName('unlockDiseaseAreaSwamp')
	for (i = 0; i < x.length; i++) {
		if (gameData.unlockDiseaseAreaSwamp)
			x[i].style.display = "block"
		else
			x[i].style.display = "none"
	}

	basicToggle("skillInfo")
	basicToggle("limeDiseaseInfo")
	basicToggle("limeDiseaseControlInfo")
	basicToggle("teachInfo")
	basicToggle("employeeStatsInfo")
	basicToggle("basketInfo")
	basicToggle("sellingPieInfo")
	basicToggle("pieMerchantInfo")
	basicToggle("juicersBulk")
	basicToggle("peelersBulk")
	basicToggle("basketsBulk")
	basicToggle("alphaCoinConvertBulk")
	
	function basicToggle(input) {
		x = document.getElementsByClassName(input)

		if (gameData[input + 'Toggle']) {
			color = accent3
			display = 'block'
		} else {
			color = accent2
			display = 'none'
		}
		
		colorChanger(input + "Button", color)
		for (i = 0; i < x.length; i++) {
			x[i].style.display = display
		}
	}

	toggleAesthetic("autoStartTask")
	toggleAesthetic("autoStartSimulation")
	toggleAesthetic("autoCheckSimulation")
	toggleAesthetic("autoPlaceACivilian")
	toggleAesthetic("benevolenceToggle")
	toggleAesthetic("autoAdvertiseBroker")
	toggleAesthetic("increaseJuicePricex10")
	toggleAesthetic("pieConveyorBeltOn")
	toggleAesthetic("toggleActions")
	toggleAesthetic("textForA2BBrokerAmountToggle")
	
	function toggleAesthetic(input) {
		if (gameData[input] == 1)
			color = accent3
		else
			color = accent2
		colorChanger(input + "Button", color)
	}

	currentTaskAesthetic('peelerPeel')
	currentTaskAesthetic('peelerPeelMax')
	currentTaskAesthetic('makeJuice')
	currentTaskAesthetic('makeMaxJuice')
	currentTaskAesthetic('eat')
	currentTaskAesthetic('delivery')
	currentTaskAesthetic('findPieCustomers')
	
	function currentTaskAesthetic(x) {
		button = x + "Button"
		if (gameData.currentTask == x || gameData.currentTask2 == x)
			colorChanger(button, "#C67848")
		else
			colorChanger(button, accent4)
	}
	
	ifMaxDarkGray("basket")
	ifMaxDarkGray("juicer")
	ifMaxDarkGray("peeler")
	
	function ifMaxDarkGray(x) {
		button = "buyA" + upperFirstChar(x) + "Button"

		if (gameData[x + 's'] == gameData[x + 'sMax'])
			colorChanger(button, grayAccent)
		else
			colorChanger(button, accent4)
	}

	if (gameData.typeToHireToggle == 0) {
		colorChanger('hireEmployeeToggleButton', accent3)
		colorChanger('hireBrokerToggleButton', accent2)
		colorChanger('hirePieMerchantToggleButton', accent2)
	} else if (gameData.typeToHireToggle == 1) {
		colorChanger('hireEmployeeToggleButton', accent2)
		colorChanger('hireBrokerToggleButton', accent3)
		colorChanger('hirePieMerchantToggleButton', accent2)
	} else {
		colorChanger('hireEmployeeToggleButton', accent2)
		colorChanger('hireBrokerToggleButton', accent2)
		colorChanger('hirePieMerchantToggleButton', accent3)
	}

	if (gameData.deliveryTypeToggle == 0 || gameData.deliveryTypeToggle == 2) {
		colorChanger('deliveryToggleStandardButton', accent3)
		colorChanger('deliveryToggleExpressButton', accent2)
		colorChanger('deliveryToggleTrainButton', accent2)
	} else if (gameData.deliveryTypeToggle == 1) {
		colorChanger('deliveryToggleStandardButton', accent2)
		colorChanger('deliveryToggleExpressButton', accent3)
		colorChanger('deliveryToggleTrainButton', accent2)
	} else {
		colorChanger('deliveryToggleStandardButton', accent2)
		colorChanger('deliveryToggleExpressButton', accent2)
		colorChanger('deliveryToggleTrainButton', accent3)
	}


	if (gameData.wheat)
		colorChanger('winnowWheat', accent4)
	else
		colorChanger('winnowWheat', grayAccentLight)

	if (gameData.wheatSeeds)
		colorChanger('grindFlour', accent4)
	else
		colorChanger('grindFlour', grayAccentLight)


	if (gameData.forestTreeType == 1) {
		colorChanger('forestTree1', accent3)
		colorChanger('forestTree2', accent2)
	} else {
		colorChanger('forestTree2', accent3)
		colorChanger('forestTree1', accent2)
	}

	var x = document.getElementsByClassName("changeResearchersBy10")
	for (i = 0; i < x.length; i++) {
		if (gameData.changeResearchersBy10Unlock)
			x[i].style.display = 'inline-block'
		else
			x[i].style.display = 'none'
	}

	var x = document.getElementsByClassName("achievement")
	for (i = 0; i < x.length; i++) {
		if (gameData['achievement' + (i + 1)])
			x[i].style.backgroundColor = limesRelatedAccent
		else
			x[i].style.backgroundColor = grayAccent
		
		x[i].style.padding = "5px"
		x[i].style['margin'] = "5px"
	}

	var x = document.getElementsByClassName("specialAchievement")
	for (i = 0; i < x.length; i++) {
		if (gameData['specialAchievement' + (i + 1)])
			x[i].style.backgroundColor = limesRelatedAccent
		else
			x[i].style.backgroundColor = grayAccent
			
		x[i].style.padding = "5px"
		x[i].style['margin'] = "5px"
	}

	if (gameData.simulationTime)
		colorChanger('checkResultsButton', accent4)
	else
		colorChanger('checkResultsButton', grayAccent)

	if (gameData.increaseJuicePricePermanance < 1)
		colorChanger('increaseJuicePriceButton', accent4)
	else
		colorChanger('increaseJuicePriceButton', '#FF999A')

	if (gameData.isAutoCollecting)
		colorChanger('autoCollectingButton', grayAccent)
	else
		colorChanger('autoCollectingButton', accent4)

	if (gameData.currentTask == 'coinsToAlphaClick' || gameData.currentTask2 == 'coinsToAlphaClick')
		colorChanger('coinsToAlphaClickButton', '#F8FF01')
	else
		colorChanger('coinsToAlphaClickButton', '#FDFF9A')

	if (gameData.currentTask == 'alphaToBetaClick' || gameData.currentTask2 == 'alphaToBetaClick')
		colorChanger('alphaToBetaClickButton', '#F8FF01')
	else
		colorChanger('alphaToBetaClickButton', '#FDFF9A')

	if (gameData.lookAround == 3)
		hide('lookAroundButton')
	else
		show('lookAroundButton', "inline")

	if (gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2)
		colorChanger('increaseJuiceSoldButton', grayAccent)
	else
		colorChanger('increaseJuiceSoldButton', grayAccentLight)

	if (gameData.juiceBulkAmountToggle == 0)
		colorChanger('decreaseJuiceSoldButton', grayAccent)
	else
		colorChanger('decreaseJuiceSoldButton', grayAccentLight)

	var x = document.getElementsByClassName("skillButton")
	if (gameData.multitasking) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px"
			x[i].style['border-radius'] = "12px"
		}
		for (let i = 0; i < mainSkills.length; i++) {
			button = mainSkills[i] + "Button"
			if (gameData.currentSkill == mainSkills[i])
				colorChanger(button, "#C67848")
			else
				colorChanger(button, accent4)
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = accent4
		}
	}


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
}
