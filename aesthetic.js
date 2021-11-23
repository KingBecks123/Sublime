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

	if (gameData.desktopMode == 0) {
		document.getElementById('skills').style.width = '380px'
		document.getElementById('skillsSection1').style.position = 'relative'
		document.getElementById('skillsSection2').style.position = 'relative'
		update("desktopModeButton", "In Mobile Mode")
	} else {
		document.getElementById('skillsSection1').style.top = '0'
		document.getElementById('skillsSection1').style.position = 'absolute'
		document.getElementById('skillsSection2').style.position = 'absolute'
		document.getElementById('skillsSection2').style.right = '0'
		document.getElementById('skills').style.width = '760px'
		update("desktopModeButton", "In Desktop Mode")
	}
	
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)

	showOrHideClass("unlockDiseaseAreaSwamp")

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

	currentTaskAesthetic('usePeelers')
	currentTaskAesthetic('useMaxPeelers')
	currentTaskAesthetic('makeJuice')
	currentTaskAesthetic('makeMaxJuice')
	currentTaskAesthetic('eatFood')
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

	if (gameData.isAutoCollecting == 0)
		colorChanger('autoCollectingButton', accent4)
	else
		colorChanger('autoCollectingButton', grayAccent)

	if (gameData.currentTask == 'autoCurrencyConversionBuy' || gameData.currentTask2 == 'autoCurrencyConversionBuy')
		colorChanger('currencyConvertAlphaCoinsButton', '#F8FF01')
	else
		colorChanger('currencyConvertAlphaCoinsButton', '#FDFF9A')

	if (gameData.currentTask == 'alphaToBeta' || gameData.currentTask2 == 'alphaToBeta')
		colorChanger('currencyConvertBetaCoinsButton', '#F8FF01')
	else
		colorChanger('currencyConvertBetaCoinsButton', '#FDFF9A')

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
	for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px";
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
	colorChanger('lookAroundButton', grayAccentLight)
	colorChanger('deliveryProgress', accent0)
	colorChanger('deliveryBar', accent3)
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

	colorChanger('sellYourLimesButton', yellowAccent)
	colorChanger('backgroundForValues', "#000000")
	colorChanger('sellMaxJuiceButton', grayAccentLight)
	colorChanger('pickUpLimes', limesRelatedAccent)
	colorChanger('application', accent4)
	colorChanger('mainBody', background)
	colorChanger('inventoryKnifeLime', accent3)

	selectedWheatItemAesthetic(gameData.selectedWheatItem)

	//Basic Div
	var x = document.getElementsByClassName("basicDiv");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
	}

	//Basic Div Size
	var x = document.getElementsByClassName("basicDivSize");
	for (i = 0; i < x.length; i++) {
		x[i].style.padding = "5px 5px 5px 5px";
		x[i].style['margin'] = "10px 5px 10px 5px";
	}

	//Basic Text
	var x = document.getElementsByClassName("basicText");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = grayAccentLight;
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px";
	}

	//Basic Text Yellow
	var x = document.getElementsByClassName("basicTextYellow");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = '#FDFF9A';
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px";
	}

	//Basic Text Size
	var x = document.getElementsByClassName("basicTextSize");
	for (i = 0; i < x.length; i++) {
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px";
	}

	//Gray Button
	var x = document.getElementsByClassName("grayButton");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = grayAccentLight;
		x[i].style['margin'] = "5px";
	}

	//Basic Button
	var x = document.getElementsByClassName("basicButton");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style['margin'] = "5px";
	}

	//Basic Button Size
	var x = document.getElementsByClassName("basicButtonSize");
	for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px";
	}

	//Basic Button Size Round
	var x = document.getElementsByClassName("basicButtonSizeRound");
	for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px";
		x[i].style['padding'] = "1px 10px 1px 10px";
		x[i].style['border-radius'] = "12px";
	}

	//Special Button
	var x = document.getElementsByClassName("specialButton");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent4;
		x[i].style['margin'] = "5px";
	}


	//Special Button Travel
	var x = document.getElementsByClassName("specialButtonTravel");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = "#FF999A";
		x[i].style['margin'] = "5px";
	}

	//Pin Button
	var x = document.getElementsByClassName("pinButton");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = "#FF999A";
		x[i].style.height = '25px';
		x[i].style['margin'] = "5px";
	}

	//Skills

	//Skill Progress
	var x = document.getElementsByClassName("skillProgress");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style['margin'] = "5px";
	}

	//Vertical Progress
	var x = document.getElementsByClassName("verticalProgress");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style['margin'] = "5px";
	}

	//Field Tile
	var x = document.getElementsByClassName("fieldTile");
	for (i = 0; i < x.length; i++) {
		x[i].style.color = "#964D1A";
		x[i].style.height = '90px';
		x[i].style.width = '90px';
		x[i].style.padding = '0px';
		x[i].style.margin = '0px 0px 0px 0px';
	}



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
