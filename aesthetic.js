background = "#3C3C3C"; //Background Color


accent0 = "#222222"; //Main Color
accent1 = "#4DFE89"; //Accent Color
accent2 = "gray"; //When buttons are toggled off
accent3 = "#4DFE89"; //When buttons are toggled on
accent4 = "#DEAD85"; //Special Buttons
accent4Dark = "#C67848"; //Special Buttons Dark


grayAccent = "#50514F";
grayAccentLight = "#BBBBBB";
limesRelatedAccent = "#4DFE89";
yellowAccent = "#FCFF4E";

function addAesthetic() {
	var one = document.getElementById('skillsSection1')
	var two = document.getElementById('skillsSection2')
	var skills = document.getElementById('skills')
	
	if (gameData.desktopMode == 0) {
		skills.style.width = '380px'
		one.style.position = 'relative'
		two.style.position = 'relative'
		update("desktopModeButton", "In Mobile Mode")
	} else {
		skills.style.width = '760px'
		one.style.top = '0'
		one.style.position = 'absolute'
		two.style.position = 'absolute'
		two.style.right = '0'
		update("desktopModeButton", "In Desktop Mode")
	}
	
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)


	var x = document.getElementsByClassName(unlockDiseaseAreaSwamp)
	for (i = 0; i < x.length; i++) {
		if (gameData.unlockDiseaseAreaSwamp)
			x[i].style.display = "block";
		else
			x[i].style.display = "none";
	}

	basicToggle("skill", "Info")
	basicToggle("limeDisease", "Info")
	basicToggle("limeDiseaseControl", "Info")
	basicToggle("teach", "Info")
	basicToggle("employeeStats", "Info")
	basicToggle("basket", "Info")
	basicToggle("sellingPie", "Info")
	basicToggle("pieMerchant", "Info")
	basicToggle("juicers", "Bulk")
	basicToggle("peelers", "Bulk")
	basicToggle("baskets", "Bulk")
	basicToggle("alphaCoinConvert", "Bulk")

	toggleAesthetic("autoStartTask")
	toggleAesthetic("autoStartSimulation")
	toggleAesthetic("autoCheckSimulation")
	toggleAesthetic("autoPlaceACivilian")
	toggleAesthetic("benevolenceToggle")
	toggleAesthetic("autoAdvertiseBroker")
	toggleAesthetic("increaseJuicePricex10")
	toggleAesthetic("pieConveyorBeltOn")
	toggleAesthetic("dontToggle")
	toggleAesthetic("textForA2BBrokerAmountToggle")

	currentTaskAesthetic('peelerPeel')
	currentTaskAesthetic('peelerPeelMax')
	currentTaskAesthetic('makeJuice')
	currentTaskAesthetic('makeMaxJuice')
	currentTaskAesthetic('eat')
	currentTaskAesthetic('delivery')
	currentTaskAesthetic('findPieCustomers')

	ifMaxDarkGray("basket")
	ifMaxDarkGray("juicer")
	ifMaxDarkGray("peeler")

	if (gameData.typeToHireToggle == 0) {
		colorChanger('hireEmployeeToggleButton', accent3)
		colorChanger('hireBrokerToggleButton', accent2)
		colorChanger('hirePieMerchantToggleButton', accent2)
	} else if (gameData.typeToHireToggle == 1) {
		colorChanger('hireEmployeeToggleButton', accent2)
		colorChanger('hireBrokerToggleButton', accent3)
		colorChanger('hirePieMerchantToggleButton', accent2)
	} else if (gameData.typeToHireToggle == 2) {
		colorChanger('hireEmployeeToggleButton', accent2)
		colorChanger('hireBrokerToggleButton', accent2)
		colorChanger('hirePieMerchantToggleButton', accent3)
	}
	
	button1 = 'deliveryToggleStandardButton'
	button2 = 'deliveryToggleExpressButton'
	button3 = 'deliveryToggleTrainButton'

	if (gameData.deliveryTypeToggle == 0 || gameData.deliveryTypeToggle == 2) {
		colorChanger(button1, accent3)
		colorChanger(button2, accent2)
		colorChanger(button3, accent2)
	} else if (gameData.deliveryTypeToggle == 1) {
		colorChanger(button1, accent2)
		colorChanger(button2, accent3)
		colorChanger(button3, accent2)
	} else {
		colorChanger(button1, accent2)
		colorChanger(button2, accent2)
		colorChanger(button3, accent3)
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

	var x = document.getElementsByClassName("changeResearchersBy10");
	for (i = 0; i < x.length; i++) {
		if (gameData.changeResearchersBy10Unlock) {
			x[i].style.display = 'inline-block';
		} else {
			x[i].style.display = 'none';
		}

	}

	var x = document.getElementsByClassName("achievement");
	for (i = 0; i < x.length; i++) {
		if (gameData['achievement' + (i + 1)]) {
			x[i].style.backgroundColor = limesRelatedAccent;
		} else {
			x[i].style.backgroundColor = grayAccent;
		}
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px";
	}

	var x = document.getElementsByClassName("specialAchievement");
	for (i = 0; i < x.length; i++) {
		if (gameData['specialAchievement' + (i + 1)]) {
			x[i].style.backgroundColor = limesRelatedAccent;
		} else {
			x[i].style.backgroundColor = grayAccent;
		}
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px";
	}

	if (gameData.diseaseControlFinished) {
		colorChanger('decreaseLakesButton', grayAccentLight)
		colorChanger('increaseLakesButton', grayAccentLight)
	} else {
		colorChanger('decreaseLakesButton', grayAccent)
		colorChanger('increaseLakesButton', grayAccent)
	}

	if (gameData.simulationTime)
		colorChanger('checkResultsButton', accent4)
	else
		colorChanger('checkResultsButton', grayAccent)

	if (gameData.autoCollectingBar == 0 || gameData.autoCollectingBar == (gameData.nourishment + 1) * 100)
		colorChanger("pickUpLimes", limesRelatedAccent)
	else
		colorChanger("pickUpLimes", grayAccent)

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

	function currentTaskAesthetic(x) {
		button = x + "Button"
		if (gameData.currentTask == x || gameData.currentTask2 == x)
			colorChanger(button, accent4Dark)
		else
			colorChanger(button, accent4)
	}

	function currentSkillAesthetic(x) {
		button = x + "Button"
		if (gameData.currentSkill == x)
			colorChanger(button, accent4Dark)
		else
			colorChanger(button, accent4)
	}

	if (gameData.lookAround == 3)
		hide('lookAroundButton')
	else
		tabs('lookAroundButton', "inline-block")

	if (gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2)
		colorChanger('increaseJuiceSoldButton', grayAccent)
	else
		colorChanger('increaseJuiceSoldButton', grayAccentLight)

	if (gameData.juiceBulkAmountToggle == 0)
		colorChanger('decreaseJuiceSoldButton', grayAccent)
	else
		colorChanger('decreaseJuiceSoldButton', grayAccentLight)

	var x = document.getElementsByClassName("skillButton");
	if (gameData.multitasking) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px";
			x[i].style['border-radius'] = "12px";
		}
		for (let i = 0; i < mainSkills.length; i++) {
			currentSkillAesthetic(mainSkills[i])
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = accent4;
		}
	}


	var x = document.getElementsByClassName("currencyButton");
	if (gameData.autoCurrencyConversionBuy) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px";
			x[i].style['border-radius'] = "12px";
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = '#FDFF9A';
		}
	}
	for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px";
	}
}

function twoToggleButtons(button1, button2, value) {
	if (value == 1) {
		colorChanger(button1, accent3)
		colorChanger(button2, accent2)
	} else {
		colorChanger(button1, accent2)
		colorChanger(button2, accent3)
	}
}

function addAestheticBase() {
	selectedWheatItemAesthetic(gameData.selectedWheatItem)
	changeVariablesColorAesthetic()
	updateFieldTileAesthetic()
	normalizeButtons()
	pinButton()
}

function changeVariablesColor() {
	toggle('moreVisibleVariables')
	changeVariablesColorAesthetic()
}

function changeVariablesColorAesthetic() {
	for (let i = 0; i < mainVariables.length; i++) {
		
		if (gameData.moreVisibleVariables) {
			color = "#99DEFF"
			colorDark = "#4DC3FF"
		}
		else
		{
			color = mainVariablesColor[i]
			colorDark = mainVariablesColor2[i]
		}
		
		colorChangerText('textFor' + jsUcfirst(mainVariables[i]) + 'Div', colorDark)
		colorChangerText('textFor' + jsUcfirst(mainVariables[i]), color)
	}
	
	for (let i = 0; i < avs.length; i++) {
		for (let j = 0; j < avs[i].v.length; j++) {
			if (gameData.moreVisibleVariables) {
				color = "#99DEFF"
				colorDark = "#4DC3FF"
			}
			else
			{
				color = avs[i].v[j].mainColor
				colorDark = avs[i].v[j].darkColor
			}

			
			colorChangerText('textFor' + avs[i].v[j].name + 'Div', colorDark)
			colorChangerText('textFor' + avs[i].v[j].name, color)
		}
	}
}
