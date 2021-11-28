function updateAfterLoad() {
	calculateOfflineProgress()

	for (let i = 0; i < mainSkills.length; i++) {
		restartBar(mainSkills[i])

		if (gameData[mainSkills[i] + 'SkillLevel'] > gameData[mainSkills[i] + 'SkillLevelMax']) {
			gameData[mainSkills[i] + 'SkillLevel'] = gameData[mainSkills[i] + 'SkillLevelMax']
		}
	}

	restartBar("learnANewSkill")
	restartBar("juicer")
	restartBar("peeler")
	restartBar("advertise")
	restartBar("eat")
	restartBar("teach")
	restartBar("watertight")
	restartBar("surveying")
	restartBar("benevolence")
	restartBar("coinsToAlpha")
	restartBar("convertCoinsNow")
	restartBar("alphaToBeta")
	restartBar("findPieCustomers")
	restartBar("bakePie")
	restartBar("harvestRice")
	


	if (gameData.bellowsBar > 0) {
		bellowsBar()
	}

	moveBar('delivery')
	moveBar('bakePie')
	moveWell()

	if (gameData.workingBar <= 100 && (gameData.workingBar != 0 || gameData.employeeWorking > 0)) {
		workingBar()
	}

	if (gameData.autoCollectingBar !== 0) {
		autoCollectingBar()
	}

	if (gameData.deliveryBar <= 99 && gameData.deliveryBar != 0) {
		deliveryBar()
	}

	updateValues()
}


function updateValues() {
	
	startCurrentTask(gameData.currentTask)	
	startCurrentTask(gameData.currentTask2)	
	
	if(gameData.currentSkill !== 'none')
		barStartGranularSkillBasic(gameData.currentSkill, false)
	
	addAesthetic()
	fixOverMaxedVariables()

	gameData.juicePricePrice = gameData.juicePriceCents + 1
	gameData.nourishmentPrice = Math.pow(10, gameData.nourishment);

	if (!gameData.showBarPercent) {
		update("barPercentButton", "Bar Percent Hidden")

		var x = document.getElementsByClassName("skillBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = "rgba(0, 0, 0, 0)";
		}
		var x = document.getElementsByClassName("verticalBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = "rgba(0, 0, 0, 0)";
		}
		var x = document.getElementsByClassName("skillBarColored");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = "rgba(0, 0, 0, 0)";
		}
		var x = document.getElementsByClassName("smallContainerBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = "rgba(0, 0, 0, 0)";
		}
	} else {
		update("barPercentButton", "Bar Percent Shown")
		var x = document.getElementsByClassName("skillBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = accent0;
		}
		var x = document.getElementsByClassName("verticalBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = accent0;
		}
		var x = document.getElementsByClassName("skillBarColored");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = accent0;
		}
		var x = document.getElementsByClassName("smallContainerBar");
		for (i = 0; i < x.length; i++) {
			x[i].style.color = accent0;
		}
	}

	gameData.juiceSellReward = (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmountToggle * (1 + (gameData.juicePriceCents / 100)))
	gameData.limesInBaskets = Math.floor(gameData.baskets * (gameData.basketBar / 4))

	for (let i = 0; i < mainVariables.length; i++) {
		updateNumber(mainVariables[i])
	}
	
	updateAreaNumbers()

	if (gameData.coins > 0) {
		gameData.showAchievements = 1
	}

	if (gameData.showAchievements) {
		show('achievementsButton', 'inline')
	}

	for (let i = 1; i < mainVariables.length; i++) {
		if (gameData[mainVariables[i]] > 0)
			gameData[mainVariables[i] + 'UnlockedVariable'] = true

		if (gameData[mainVariables[i] + 'UnlockedVariable'])
			show('currencyDisplay(' + i + ')', 'inline')
		else
			hide('currencyDisplay(' + i + ')')
	}
	
	for (let i = 0; i < avs.length; i++) {
		for (let j = 0; j < avs[i].v.length; j++) {
			if(gameData[avs[i].area][avs[i].v[j].id])
				gameData[avs[i].area][avs[i].v[j].id + 'UnlockedVariable'] = true
		}
	}

	updateScience()

	if (gameData.nationalJuiceMarketing) {
		hide('juiceMarketing')
		show('upgradeJuiceMarketing')
	} else {
		hide('upgradeJuiceMarketing')
		show('juiceMarketing')
	}
	
	juicePricePrice = gameData.juicePricePrice + gameData.increaseJuicePricex10 * (gameData.juicePricePrice * 9 + 45)
	
	updateObj = [
		 "textForMegaCoinsInBank"            , gameData.megaCoinsInBank.toLocaleString() + " / " + gameData.megaCoinsInBankMax.toLocaleString() + " Mega Coins In Bank"
		,"textForRespect"                    , gameData.respect.toLocaleString() + " Respect"
		,"textForTimePlayed"                 , "Total Time Played: " + gameData.timePlayed.toLocaleString() + " Seconds"
		,"textForLakes"                      , gameData.limeDiseaseLakes.toLocaleString() + " Lakes"
		,"currentSpeedEmployee"              , "Current speed: " + gameData.employeeCurrentSpeed.toLocaleString() + " limes per minute."
		,"speedEmployee"                     , "Speed: " + gameData.employeeSpeed.toLocaleString() + "% Of What I'm Taught."
		,"textForJuicePricePrice"            , "Price: " + juicePricePrice.toLocaleString() + " Coins"
		,"textForNourishmentPrice"           , "You Need: " + gameData.nourishmentPrice.toLocaleString() + " Limes"
		,"juicersAmount"                     , gameData.juicers.toLocaleString() + " / " + gameData.juicersMax.toLocaleString() + " Juicers"
		,"peelersAmount"                     , gameData.peelers.toLocaleString() + " / " + gameData.peelersMax.toLocaleString() + " Peelers"
		,"basketsAmount"                     , gameData.baskets.toLocaleString() + " / " + gameData.basketsMax.toLocaleString() + " Baskets"
		,"maxBaskets"                        , gameData.basketsMax.toLocaleString() + " baskets fit under the current tree."
		,"buyMegaCoinsTimes"                 , "Transfer times: " + gameData.buyMegaCoinsTimes + " / " + gameData.buyMegaCoinsTimesMax
		,"textForAutomaticallyCollectsLimes" , "Automatically collects limes at " + (gameData.shoes + 1) + "/s"
		,"textForBetterTraining"             , "Current maximum: " + (gameData.betterTraining + 10).toLocaleString() + "00%"
		,"textForCoinsMax"                   , "Current maximum: " + gameData.coinsMax.toLocaleString() + " Coins"
		,"textForCurrentEmployees"           , "Current Employees: " + gameData.employees.toLocaleString() + " / " + gameData.maxEmployees.toLocaleString()
		,"numberOfCivilians"                 , "Number Of Civilians: " + gameData.civiliansTotal.toLocaleString()
		,"betterTrainingPrice"               , "Price: " + gameData.betterTraining.toLocaleString() + " Mega Coins"
		,"sellYourJuiceAmount"               , "You Will Deliver " + gameData.juiceBulkAmountToggle.toLocaleString() + " / " + gameData.juiceBulkAmountMax.toLocaleString() + " Juice"
		,"sellYourJuiceReward"               , "You Will Get " + gameData.juiceSellReward.toLocaleString() + " Coins"
		,"sellYourJuicePrice"                , "You Need " + gameData.deliveryPrice.toLocaleString() + " Coins For Delivery"
		,"upgradeMoreStoragePrice"           , "Price: " + upgradeMoreStoragePrice.toLocaleString() + " Mega Coins"
		,"betaCoinExhangeRate"               , "Exchange Rate: " + gameData.betaCoinsExchangeRate.toLocaleString() + " Alpha Coins -> 1 Beta Coin"
		,"betaCoinTotalPrice"                , "Total Price: " + (gameData.betaCoinsExchangeRate * (gameData.textForA2BBrokerAmountToggle * (gameData.basicA2BBrokerAmount - 1) + 1)).toLocaleString() + " Alpha Coins"
 		,"piePrice"                          , "Current Price: " + gameData.piePrice.toLocaleString() + " Pie Coins"
 
	]
	
	for (i = 0; i < updateObj.length / 2; i++) {
		update(updateObj[i * 2], updateObj[i * 2 + 1])
	}
	
	checkShowOrHideObj = [
	 'juicers'               , 'inventoryButton'
	,'employees'             , 'companyButton'
	,'baskets'               , 'forestButton'
	,'hasGottenJuice'        , 'juiceMarket'
	,'upgradeMoreStorage'    , 'upgradeMoreLand'
	,'betterTraining'        , 'upgradeBetterTraining'
	,'forestWell'            , 'forestWellDiv'
	,'bitterSpeedSkillLevel' , 'eatGoldenLimeProgress'
	,'bitterSpeedSkillLevel' , 'eatGoldenLime'
	]
	
	for (i = 0; i < checkShowOrHideObj.length / 2; i++) {
		checkShowSmart(checkShowOrHideObj[i * 2], checkShowOrHideObj[i * 2 + 1])
	}
	


	upgradeMoreStoragePrice = Math.pow(2, gameData.upgradeMoreStorage) * 50


	if (gameData.forestTreeType == 1)
		update("limesInBaskets", gameData.limesInBaskets.toLocaleString() + " Limes")
	else
		update("limesInBaskets", gameData.limesInBaskets.toLocaleString() + " Limes + " + gameData.goldenLimesInBaskets.toLocaleString() + " Golden Limes")


	updateBrokers()


	if (gameData.villageNumber > 1 || gameData.betterTraining > 0 || gameData.increaseJuicePricePermanance == 1)
		show("megaCoinUpgradesButton")
	else
		hide("megaCoinUpgradesButton")




	if (gameData.employeeWorking > 0) {
		update("workingEmployee", "Working time left: " + gameData.employeeWorking.toLocaleString() + " / 10 minutes.")
	} else {
		update("workingEmployee", "Employee is idle.")
	}
	if (gameData.applicationReady == 1) {
		update("application",
			"<br>" +
			"Skills: Can Collect Limes." + "<br>" +
			"Speed: " + gameData.applicantSpeed.toLocaleString() + "% Of What I'm Taught." + "<br>" +
			"Price: " + gameData.applicantPrice.toLocaleString() + " Coins." + "<br>" +
			"Wages: " + gameData.applicantWage.toLocaleString() + " Coins Per Minute." + "<br>" +
			"Hunger: " + gameData.applicantHunger.toLocaleString() + " Limes Per Second." + "<br>" +
			"<br>"
		)


		show("applicationInfo")
	} else {
		update("application", "Pin applications here")
		hide("applicationInfo")
	}

	updateHiringArea()

	checkHideOrShow(gameData.forestWell, "buyAWell")


	moveBar("teach")
	moveBar("working")
	moveBasket()
	moveAutoCollecting()

	for (let i = 0; i < mainSkills.length; i++) {
		update(mainSkills[i] + "SkillLevel", gameData[mainSkills[i] + "SkillLevel"] + " / " + gameData[mainSkills[i] + "SkillLevelMax"])
	}

	update("rottenWisdom", 100 * gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax + "% Chance")
	update("keenEye", gameData.keenEyeSkillLevel * 5 + "% Chance")
	update("limebidextrous", gameData.limebidextrous + "% Chance")
	update("intelligence", Math.floor(((gameData.intelligenceSkillLevel * 2) / gameData.intelligenceSkillLevelMax) * 100) + "% Faster")
	update("knifebidextrous", gameData.knifebidextrous * 2.5 + "% Chance")



	update("eat", gameData.eat + " / 100")

	if (gameData.lookAround >= 1) {
		divVisibility("navigateButtons", "visible")
	}

	if (gameData.limeTypeToJuice == 0)
		update("juicerInfo", gameData.limesPerJuice + " Limes -> 1 Juice")
	else
		update("juicerInfo", gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice")


	if (gameData.deliveryTypeToggle == 2 && gameData.fasterTransport > 0)
		gameData.juiceBulkAmountMax = 500
	else if (gameData.deliveryTypeToggle == 3)
		gameData.juiceBulkAmountMax = 2000
	else
		gameData.juiceBulkAmountMax = 100

	if (gameData.pinUnlock == 1) {
		hide("pinUnlockDiv")
		var x = document.getElementsByClassName("pinButton");
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "inline-block";
		}

	} else
		show("pinUnlockDiv")




	if (gameData.bigGloves == 0) {
		show("buyBigGloves")
		hide("upgradeBigGloves")
		gameData.limesPerClick = 1 + gameData.difficulty * 5
	} else {
		hide("buyBigGloves")
		show("upgradeBigGloves")
		gameData.limesPerClick = 2 + gameData.difficulty * 5
	}


	if (gameData.coinsMax > 1e6)
		show("upgradeWallet")
	else
		hide("upgradeWallet")




	checkRespectMilestone(10, 'lime', 'Automatically start tasks', 'autoStartTaskButton')
	checkRespectMilestone(25, 'lime', 'Automatically start simulation', 'autoStartSimulationButton')
	checkRespectMilestone(50, 'lime', 'Allow entrance to the Special Shopping District')
	checkRespectMilestone(100, 'lime', 'Automatically check simulation', 'autoCheckSimulationButton')
	checkRespectMilestone(500, 'lime', 'Automatically situate a civilian', 'autoPlaceACivilianDiv')
	checkRespectMilestone(1000, 'lime', 'Unlock scientific research', 'scienceButton')
	checkRespectMilestone(10000, 'red', 'Unlock more mega coin upgrades')

	function checkRespectMilestone(number, color, text, id) {
		milestone = number + 'RespectMilestone'
		
		if (gameData.respect >= number)
			gameData['respectMilestone' + number] = 1
		if (gameData['respectMilestone' + number]) {
			if (id !== undefined) {
				if (number == 500)
					show(id)
				else
					show(id, "inline")
			}
			
			if(number == 10000)
				update(number + 'RespectMilestone', number.toLocaleString() + ' Respect: ' + text + '<span class="tooltiptext">Yes, you have this unlocked. The red means that it is permanent.</span>')
			else
				update(number + 'RespectMilestone', number.toLocaleString() + ' Respect: ' + text)

			
			
			if (color == 'lime')
				colorChanger(milestone, limesRelatedAccent)
			if (color == 'red')
				colorChanger(milestone, '#FF999A')
		} else {
			if (id !== undefined)
				hide(id)
			colorChanger(milestone, grayAccentLight)
		}
	}

	if (gameData.respect >= 50)
		show("storeTypesButtonsDiv")
	else
		hide("storeTypesButtonsDiv")

	if (gameData.increaseJuicePricePermanance < 1) {
		show("increaseJuicePricePermanance", "inline")
		hide("upgradeJuicePricePermanance")
	} else {
		hide("increaseJuicePricePermanance")
		show("upgradeJuicePricePermanance")
	}

	if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax)
		show("stopActionsButton", "inline")
	else
		hide("stopActionsButton")


	if (gameData.manuscripts) {
		hide("buyManuscriptsDiv")
		show("upgradeManuscripts")
	} else {
		hide("upgradeManuscripts")
		show("buyManuscriptsDiv")
	}

	if (gameData.baskets > 0 && !gameData.basketScarecrow)
		show("offlineBasket")
	else
		hide("offlineBasket")

	if (gameData.creditScore2) {
		hide("increaseCreditScore2")
		if (gameData.creditScore3)
			hide("increaseCreditScore3")
		else
			show("increaseCreditScore3")
	} else {
		show("increaseCreditScore2", "inline")
		hide("increaseCreditScore3")
	}





	if (!gameData.multitasking && gameData.learnANewSkill > 0)
		show("buySkillToggler")
	else
		hide("buySkillToggler")


	if (gameData.pieBucket && gameData.pieFlourBucket)
		show("bucketThinSteelPlating")
	else
		hide("bucketThinSteelPlating")

	update("bucketHeight", "Current heights: " + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Units")

	if (gameData.diseaseControlFinished) {
		hide("diseaseControlStart")
		show("startDiseaseTask")
	} else {
		show("diseaseControlStart")
		hide("startDiseaseTask")

	}

	if (gameData.megaCoinsInBankMax > 20) {
		hide("increaseCreditScore")
		show("upgradeCreditScore")
	} else {
		show("increaseCreditScore")
		hide("upgradeCreditScore")
	}

	if (gameData.nutritionists) {
		hide("hireANutritionist")
		show("upgradeNutritionist")
	} else {
		show("hireANutritionist")
		hide("upgradeNutritionist")
	}

	if (gameData.fasterTransport)
		update("deliveryToggleStandardButton", "Hyper Delivery")
	else
		update("deliveryToggleStandardButton", "Standard Delivery")



	if (gameData.diseaseTileSymbols)
		update("diseaseTileSymbolsButton", "Disease Tiles: Symbols")
	else
		update("diseaseTileSymbolsButton", "Disease Tiles: Blank")

	if (gameData.shiftClickOption) {
		update("shiftClickOption", "Don't Toggle: Shift Click")
		hide("dontToggleButton")
	} else {
		update("shiftClickOption", "Don't Toggle: Button Option")
		if(gameData.learnANewSkill > -2)
			show("dontToggleButton", "inline")
	}

	if (gameData.deliveryManager) {
		show("sellMaxJuiceButton", "inline")
		hide("decreaseJuiceSoldButton")
		hide("increaseJuiceSoldButton")
	} else {
		hide("sellMaxJuiceButton")
		show("decreaseJuiceSoldButton", "inline")
		show("increaseJuiceSoldButton", "inline")
	}

	if (gameData.respectMilestone10000) {
		show('upgradeMoreStorage')
		if (!gameData.bachelorsDegreeFinance)
			show('earnBachelorFinance')
		else
			hide('earnBachelorFinance')
		checkHideOrShow(gameData.rottenActualWisdom, "rottenActualWisdom")
		if (!gameData.creditScore2)
			show('increaseCreditScore2')
	} else {
		hide('upgradeMoreStorage')
		hide('earnBachelorFinance')
		hide('increaseCreditScore2')
		hide('buyABiggerWallet')
	}
	
	if (gameData.villageNumber > 1) {
		show("travelButton", "inline")
	}

	for (i = 1; i <= 5; i++) {
		if (gameData.maps == i - 1)
			show("buyMap" + i + "Div")
		else
			hide("buyMap" + i + "Div")
	}
	
	if (gameData.deliveryManager == 0 && gameData.maps >= 3)
		show("buyADeliveryManager")
	else
		hide("buyADeliveryManager")
	
	if (gameData.autoCurrencyConversionBuy)
		hide("autoCurrencyConversion")
	else if (gameData.maps == 4)
		show("autoCurrencyConversion")
	
	if (gameData.maps >= 1) {
		show("marketMainButtonsDiv", "inline")
		show("marketStoreButton", "inline")
		document.getElementById("marketMainButtonsDiv").style.width = "360px"
	}
	
	if (gameData.maps >= 2) {
		
		if (!gameData.storageUnlock)
			show("storageUnlockDiv")
		
		show("hiringAreaButton", "inline")
		show("marketStoreButton", "inline")
		
		if (gameData.bulkBuyUnlock) {
			hide("bulkBuyUnlockDiv")
			
			if (gameData.bulkBuyUnlock2)
				hide("bulkBuyUnlock2Div")
			else
				show("bulkBuyUnlock2Div")
		} 
		else
			show("bulkBuyUnlockDiv")
	} 
	
	if (gameData.maps >= 3) {
		show("travellingArea")
		show("increaseJuicePrice")
		show("travelButton", "inline")
		
		if (!gameData.fasterTransport)
			hide("fasterTransportDiv")
		else
			show("fasterTransportDiv")
	}

	if (gameData.maps >= 4)
	{
		show("tasksButton")
		show("diseaseTileSymbolsButton", "inline")
		update("specialAchievement2", "Buy a Giant Map after only sending one delivery in that town")

		if (gameData.respectBillboard)
			hide("respectBillboard")
		else
			show("respectBillboard", "inline")
	}
	
	if (gameData.maps >= 5) {
		show('earnBetaCoins')
		show('buyPie')
		if (gameData.basicAlphaToBetaBroker) {
			hide('basicAlphaToBetaBroker')
			show('basicAlphaToBetaBrokerRule')
		} else {
			show('basicAlphaToBetaBroker')
			hide('basicAlphaToBetaBrokerRule')
		}
	}
	
	if (gameData.storageUnlock)
	{
		show("storageDiv")
		hide("storageUnlockDiv")
	}
	
	if (gameData.storageJuicersUnlock && gameData.storagePeelersUnlock)
		hide("storageDiv")
	
	
	
	if (!gameData.fork && gameData.learnANewSkill > -2)
		show('buyAForkDiv')
	else
		hide('buyAForkDiv')


	if (!gameData.shoes && gameData.learnANewSkill > -1)
		show('buyShoesDiv')
	else
		hide('buyShoesDiv')

	if (gameData.hideCompletedSkills == 0)
		update("hideCompletedSkillsButton", "Completed Skills Shown")
	else
		update("hideCompletedSkillsButton", "Completed Skills Hidden")



	if (gameData.hideMaxedPurchases == 0) {
		update("hideMaxedPurchasesButton", "Maxed Purchases Shown")
	} else {
		update("hideMaxedPurchasesButton", "Maxed Purchases Hidden")
	}



	if (gameData.hasAdvertised && !gameData.surveillanceCamera)
		show("offlineEmployee")
	else
		hide("offlineEmployee")


	if (gameData.respectMilestone10000) {
		update("specialAchievement1", "Get a 5x multplier with Buy More Land purchased")
	}



	if (gameData.advertisingLevel1 == 0) {
		hide("advertisingMethods")

		if (gameData.hasAdvertised == 1) {
			show("researchBetterAdvertising")
		} else {
			hide("researchBetterAdvertising")

		}

	} else {
		show("advertisingMethods")
		hide("researchBetterAdvertising")

	}


	if (gameData.bulkBuyUnlock == 0) {
		hide("peelersBulkButton")
		hide("basketsBulkButton")
		hide("juicersBulkButton")
	} else {
		show("peelersBulkButton", "inline")
		show("basketsBulkButton", "inline")
		show("juicersBulkButton", "inline")
	}

	if (gameData.bulkBuyUnlock2) {
		update("peelersBulkButton", "x100")
		update("basketsBulkButton", "x100")
		update("juicersBulkButton", "x100")
	}


	//Check Hide
	checkHide(gameData.advertisingLevel2, "advertisingLeaflets")
	checkHide(gameData.advertisingLevel3, "advertisingBillboard")
	checkHide(gameData.storagePeelersUnlock, "storagePeelersDiv")
	checkHide(gameData.storageJuicersUnlock, "storageJuicersDiv")
	checkHide(gameData.changeResearchersBy10Unlock, "changeResearchersBy10Unlock")
	checkShow(gameData.changeResearchersBy10Unlock, "upgradeChangeResearchersBy10")
	checkShow(gameData.rottenActualWisdom, "upgradeRottenActualWisdomUnlock")

	checkHide(gameData.forestTree2, "buyANewTree")
	checkShow(gameData.forestTree2, "treeTypeDiv")

	updatePieStuff()


	if (gameData.lookAround >= 2) {
		show("sellYourLimesDiv")
	}

	if (gameData.lookAround >= 3) {
		if (gameData.hideMaxedPurchases && gameData.juicers == gameData.juicersMax)
			hide("buyAJuicerDiv")
		else
			show("buyAJuicerDiv")

		if (gameData.hideMaxedPurchases && gameData.baskets == gameData.basketsMax)
			hide("buyABasketDiv")
		else
			show("buyABasketDiv")
	}

	checkHide(gameData.tomes, "tomeDiv")

	for (i = 1; i <= 3; i++) {
		if (gameData.tomes == i)
			show("tomeDiv" + (i + 1))
		else
			hide("tomeDiv" + (i + 1))
	}

	
	if (gameData.tomes > 3)
		show("goldenBarDiv")


	if (gameData.autoCollectingBar == (gameData.nourishment + 1) * 100 || gameData.autoCollectingBar == 0) {
		gameData.isAutoCollecting = 0
	} else {
		gameData.isAutoCollecting = 1
	}

	if (gameData.villageNumber > 1) {
		show("marketMainButtonsDiv", "inline")
	}

	if (gameData.peeledLimes >= 1) {
		show("textForPeeledLimes", "inline")
		show("juiceLimesToggleButton", "inline")
		show("juicePeeledLimesToggleButton", "inline")
	}


	if (gameData.knife >= 1) {
		show("knifeDiv")

		if (gameData.hideMaxedPurchases == 1 && gameData.peelers == gameData.peelersMax) {
			hide("buyAPeelerDiv")
		} else if (gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax) {
			show("buyAPeelerDiv")
		}

		if (gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && gameData.maps > 1) {
			show("sharperPeelerDiv")
		} else {
			hide("sharperPeelerDiv")
		}


		hide("buyKnifeDiv")
	} else {
		hide("buyAPeelerDiv")
		hide("sharperPeelerDiv")
	}


	checkHide(gameData.sharperPeelers, "sharperPeelerDiv")
	checkHide(gameData.silkRobe, "buyARobe")
	checkHide(gameData.unlockDiseaseAreaSwamp, "unlockDiseaseAreaSwamp")



	
	

	if (gameData.juicers >= 2) {
		divVisibility("makeMaxJuiceButton", "visible")
	}




	if (gameData.peelers >= 2) {
		show("peelerPeelMaxButton", "inline")
	}


	checkShow(gameData.peelers, "peelerDiv")
	checkHide(gameData.lightRobe, "lightRobe")
	checkHide(gameData.skillTrainer, "skillTrainer")





	if (gameData.advertisingLevel2 && gameData.advertisingLevel3) {
		hide("researchBetterAdvertising")
		hide("advertisingBillboard")
		hide("advertisingLeaflets")
	}



	for (i = 1; i <= numberOfBasicAchievements; i++) {

		if (gameData.coins >= Math.pow(10, i)) {
			gameData['achievement' + i] = 1
		}
	}

	for (i = 1; i <= numberOfSpecialAchievements; i++) {

		if (gameData['specialAchievement' + i]) {
			show('specialAchievement' + i)
		}

	}


	if (gameData.learnANewSkill - 3 == gameData.tomes) {
		document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
		gameData.learnANewSkillBar = 100;
	} else
		document.getElementById('learnANewSkillButton').style.backgroundColor = '#FFBB9A';




	if (gameData.learnANewSkill >= -1) {
		show("eatFoodDiv")
		showOrHideSkill("keenEye")
	}

	if (gameData.learnANewSkill >= 0) {
		show("autoCollectingDiv")
		show("nourishment")
		show("skillInfoButton", "inline")
	}

	if (gameData.learnANewSkill >= 5)
		show("motivateEmployeeButton")

	if (gameData.forestTreeType == 2)
		show("goldenLimesInfo")
	else
		hide("goldenLimesInfo")


	for (let i = 0; i < mainSkills.length; i++) {
		if (gameData.learnANewSkill >= i) {
			showOrHideSkill(mainSkills[i])
		}
	}
	
	if (!gameData.endScreen) {
		hide('endScreen')
		if (gameData.soulArea == 'start')
		{
			show('sublimeMain')
			hide('wellField')
			hide('soulAreaSerf')
		}
		else if (gameData.soulArea == 'wellField')
		{
			show('wellField')
			hide('sublimeMain')
			hide('soulAreaSerf')
		}
		else
		{
			hide('wellField')
			hide('sublimeMain')
			for (let i = 0; i < avs.length; i++) {
				hide('soulArea' + avs[i].name)
			}
			show('soulArea' + gameData.soulArea)
		}

	} else {
		hide('sublimeMain')
		show('endScreen')
	}

	update("endStats", "Total Time Played: " + gameData.timePlayed.toLocaleString() + " Seconds")

	update("bucketThinSteelPlatingPrice", "Price: " + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Pie Coins")
	
	if(gameData.hasSoldPie)
		checkHideOrShow(gameData.trainTransport, 'trainTransportDiv')

	if(gameData.trainTransport)
		show('deliveryToggleTrainButton', 'inline')
	
	update("trueLimes", "True Limes: " + gameData.trueLimes.toLocaleString())
	
	if(gameData.pieCoinsInWell == 200)
		show('enterTheWell', 'inline')
	else
		hide('enterTheWell')

	if(gameData.forestWell)
		update("textForLimesDiv", "'Limes'")
	
	updateSerfStuff()


}