function updateAfterLoad() {
	calculateOfflineProgress()

	for (let i = 0; i < mainSkills.length; i++) {
		restartBar(mainSkills[i])
		
		if(gameData[mainSkills[i] + 'SkillLevel'] > gameData[mainSkills[i] + 'SkillLevelMax'])
		{
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

    if (gameData.bellowsBar > 0) {
        bellowsBar()
    }


	moveBar('delivery')
	moveBar('bakePie')


    if (gameData.workingBar <= 100 && (gameData.workingBar != 0 || gameData.employeeWorking > 0)) {
        workingBar()
    }

    if (gameData.autoCollectingBar !== 0) {
        autoCollectingBar()
    }

    if (gameData.deliveryBar <= 99 && gameData.deliveryBar != 0) {
        sellYourJuiceBar()
    }
	

	
	
    updateValues()
}


function updateValues() {



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
	}
	
	else{
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

	
	var x = document.getElementsByClassName("skillBar");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
	}
	
	var x = document.getElementsByClassName("skillBarColored");
	for (i = 0; i < x.length; i++) {
		x[i].style.padding = "0px 0px 0px 0px";
	}
	
	var x = document.getElementsByClassName("verticalBar");
	for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
	}

    gameData.juiceSellReward = (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmountToggle * (1 + (gameData.juicePriceCents / 100)))


    gameData.limesInBaskets = Math.floor(gameData.baskets * (gameData.basketBar / 4))
	
	for (let i = 0; i < mainVariables.length; i++) {
		updateNumber(mainVariables[i])
	}
	
	if (gameData.coins > 0){
		gameData.showAchievements = 1
	}
	
	if (gameData.showAchievements){
		tabs('achievementsButton', 'inline-block')
	}
	
	for (let i = 1; i < mainVariables.length; i++) {
		if (gameData[mainVariables[i]] > 0)
			gameData[mainVariables[i] + 'UnlockedVariable'] = true
		
		if (gameData[mainVariables[i] + 'UnlockedVariable'])
			showBasicDiv('currencyDisplay(' + i + ')')
		else
			hide('currencyDisplay(' + i + ')')
		
	}
	
	//All Science Updates.
	if (gameData.respectMilestone1000) {
		
		benevolenceEquation = Math.pow(2, gameData.benevolence * 2)
		watertightEquation = Math.pow(10, 6 - gameData.peeledLimesPerJuice)
		surveyingEquation = Math.pow(2, gameData.numberOfTiles - 15)
			
		update("watertightText",  "Currently: "       + gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice")
		update("surveyingText",   "Currently: "       + gameData.numberOfTiles       + " / 20 Tiles"             )
		update("benevolenceText", "Currently: Level " + gameData.benevolence                                     )

		update("textForResearchers", researchersAvailable + " Available Researchers")
				
		
		if (gameData.limeDiseaseLakes < 10)
			benevolenceRespectIncrease = 0
		else 
			benevolenceRespectIncrease = (Math.pow(2, gameData.limeDiseaseLakes - 10)) * gameData.benevolence
		
		update("benevolenceRespectIncrease", "Respect increase:  " + benevolenceRespectIncrease.toLocaleString())
		
		researchersAvailable = gameData.researchers
		
		checkShowOrHide(gameData.benevolence, "benevolence")
		checkShowOrHide(gameData.unlockBenevolence, "benevolenceDiv")


		
		//Adds the properties of all sciences.
		for (let i = 0; i < mainSciences.length; i++) {
			
			//Shows how many researchers are currently working on the science.
			update("textFor" + jsUcfirst(mainSciences[i]) + "Researchers", gameData[mainSciences[i] + "Researchers"] + " Researchers")

			//Shows the estimated time to complete the science by multiplying the time for half a bar by 200.
			eval([mainSciences[i] + 'ResearchTime'] + " = Math.floor(200 * " + [mainSciences[i] + 'Equation'] + "/ gameData[mainSciences[i] + 'Researchers'])")
			
			//Converts time to seconds or minutes or infinity depending on size.
			timeToShowScience(mainSciences[i])
			
			//Updates the amount of researchers available.
			researchersAvailable -= gameData[mainSciences[i] + "Researchers"]

		}	
		
	}
	
	if (gameData.typeToHireToggle)
	{
		gameData.advertisePrice = 10000
	}
	else
	{
		gameData.advertisePrice = 10
	}
	
	if (gameData.nationalJuiceMarketing)
	{
		hide('juiceMarketing')
		showBasicDiv('upgradeJuiceMarketing')
	}
	else
	{
		hide('upgradeJuiceMarketing')
		showBasicDiv('juiceMarketing')
	}
	
	if (!gameData.unlockBenevolence && gameData.respectMilestone1000)
	{
		showBasicDiv("unlockBenevolence")	
	}
	else
	{
		hide("unlockBenevolence")
	}
	
	upgradeMoreStoragePrice = Math.pow(2, gameData.upgradeMoreStorage) * 50
	
    update("textForMegaCoinsInBank", gameData.megaCoinsInBank.toLocaleString() + " / " + gameData.megaCoinsInBankMax.toLocaleString() + " Mega Coins In Bank")

	if(gameData.forestTreeType == 1)
		update("limesInBaskets", gameData.limesInBaskets.toLocaleString() + " Limes")
	else
		update("limesInBaskets", gameData.limesInBaskets.toLocaleString() + " Limes + " + gameData.goldenLimesInBaskets.toLocaleString() + " Golden Limes")


    update("textForRespect", gameData.respect.toLocaleString() + " Respect")
	
    update("textForTimePlayed", "Total Time Played: " + gameData.timePlayed.toLocaleString() + " Seconds")



    update("textForLakes", gameData.limeDiseaseLakes.toLocaleString() + " Lakes")

    update("currentSpeedEmployee", "Current speed: " + gameData.employeeCurrentSpeed.toLocaleString() + " limes per minute.")
    update("speedEmployee", "Speed: " + gameData.employeeSpeed.toLocaleString() + "% Of What I'm Taught.")


    update("textForJuicePricePrice", "Price: " + gameData.juicePricePrice.toLocaleString() + " Coins")

    update("textForNourishmentPrice", "You Need: " + gameData.nourishmentPrice.toLocaleString() + " Limes")


	update("juicersAmount", gameData.juicers.toLocaleString() + " / " + gameData.juicersMax.toLocaleString() + " Juicers")
	update("peelersAmount", gameData.peelers.toLocaleString() + " / " + gameData.peelersMax.toLocaleString() + " Peelers")


	update("basketsAmount", gameData.baskets.toLocaleString() + " / " + gameData.basketsMax.toLocaleString() + " Baskets")
	update("maxBaskets", gameData.basketsMax.toLocaleString() + " baskets fit under the current tree.")



	update("advertisePrice", "Price: " + gameData.advertisePrice.toLocaleString() + " Coins")



	if(gameData.bachelorsDegreeFinance){
		update("textForBrokerApplicantSpeed", "Currently " + gameData.minBrokerApplicantSpeed.toLocaleString() + " - " + gameData.maxBrokerApplicantSpeed.toLocaleString() + " Seconds")
		update("textForBrokerApplicantAmount", "Currently " + gameData.minBrokerApplicantAmount.toLocaleString() + " - " + gameData.maxBrokerApplicantAmount.toLocaleString() + " Coins")
		update("textForAdvertisingBrokerRule", "Auto advertise if speed is over " + gameData.autoAdvertiseSpeedValue.toLocaleString() + " seconds")
		update("textForSmarterAdvertisingBrokerRule", "And if transfer amount is under " + gameData.autoAdvertiseAmountValue.toLocaleString())
		update("textForBrokerApplicantFee", "Currently " + gameData.minBrokerApplicantFee.toLocaleString() + " - " + gameData.maxBrokerApplicantFee.toLocaleString() + " Coins")
		update("brokerApplicantSpeedPrice", "Price: " + gameData.brokerApplicantSpeedPrice.toLocaleString() + " Alpha Coins")
		update("brokerApplicantFeePrice", "Price: " + gameData.brokerApplicantFeePrice.toLocaleString() + " Alpha Coins")
		update("brokerApplicantAmountPrice", "Price: " + gameData.brokerApplicantAmountPrice.toLocaleString() + " Alpha Coins")
	}
	
	
	
	
	if (gameData.villageNumber > 1 || gameData.betterTraining > 0 || gameData.increaseJuicePricePermanance == 1)
        tabs("megaCoinUpgradesButton", "block")
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


        showBasicDiv("applicationInfo")
    } else {
        update("application", "Pin applications here")
        hide("applicationInfo")
    }
	
	
    if (gameData.applicationReady == 1) {
		
		if(gameData.applicationType == 0)
		{
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
		}
		else{

			update("application",
				"<br>" +
				"Speed: " + gameData.currencyApplicantSpeed.toLocaleString() + " Seconds." + "<br>" +
				"Transfer Fee: " + gameData.currencyApplicantFee.toLocaleString() + " Coins." + "<br>" +
				"Alpha Coins Per Transfer: " + gameData.currencyApplicantTransferAmount.toLocaleString() + "." + "<br>" +
				"Hire Price: " + gameData.currencyApplicantPrice.toLocaleString() + " Coins." + "<br>" +
		



				"<br>"
			)

		}
		
		
		
		
    } else {
        update("application", "Pin applications here")
        hide("applicationInfo")
    }
	
	if (gameData.bachelorsDegreeFinance){
		update("currencyBrokerTransferAmount"   , "Speed: "                    + gameData.currencyBrokerSpeed.toLocaleString()          + " Seconds.")
		update("currencyBrokerFee"              , "Transfer Fee: "             + gameData.currencyBrokerFee.toLocaleString()            + ".")
		update("currencyBrokerSpeed"            , "Alpha Coins Per Transfer: " + gameData.currencyBrokerTransferAmount.toLocaleString() + ".")
		update("alphaCoinExhangeRate"           , "Exchange Rate: "            + gameData.alphaCoinsExchangeRate.toLocaleString()       + " Coins -> 1 Alpha Coin")
		update("currencyConvertAlphaCoinsButton", "Convert Coins to "          + gameData.currencyBrokerTransferAmount.toLocaleString() + " Alpha Coins")
		update("alphaCoinTransactionFee"        , "Transfer Fee: "             + gameData.currencyBrokerFee.toLocaleString()            + " Coins Per Alpha Coin")
		update("alphaCoinTotalPrice"            , "Total Price: "              + alphaCoinTotalPrice.toLocaleString()                   + " Coins")

		alphaCoinTotalPrice = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount

	}
	
	if (gameData.maps > 4){
		update("betaCoinExhangeRate", "Exchange Rate: " + gameData.betaCoinsExchangeRate.toLocaleString() + " Alpha Coins -> 1 Beta Coin")
		betaCoinTotalPrice = gameData.betaCoinsExchangeRate * gameData.betaCoinTransferAmount
		update("betaCoinTotalPrice", "Total Price: " + betaCoinTotalPrice.toLocaleString() + " Alpha Coins")
		update("piePrice", "Current Price: " + gameData.piePrice.toLocaleString() + " Pie Coins")
		
		showBasicDiv('earnBetaCoins')
		showBasicDiv('buyPie')

	}	
	
	update("buyMegaCoinsTimes"                , "Transfer times: "                 + gameData.buyMegaCoinsTimes + " / " + gameData.buyMegaCoinsTimesMax)
    update("textForAutomaticallyCollectsLimes", "Automatically collects limes at " + (gameData.shoes + 1) + "/s")
    update("textForBetterTraining"            , "Current maximum: "                + (gameData.betterTraining + 10).toLocaleString() + "00%")
    update("textForCoinsMax"                  , "Current maximum: "                + gameData.coinsMax.toLocaleString() + " Coins")
    update("textForCurrentEmployees"          , "Current Employees: "              + gameData.employees.toLocaleString() + " / " + gameData.maxEmployees.toLocaleString())
    update("numberOfCivilians"                , "Number Of Civilians: "            + gameData.civiliansTotal.toLocaleString())
    update("betterTrainingPrice"              , "Price: "                          + gameData.betterTraining.toLocaleString() + " Mega Coins")
	update("sellYourJuiceAmount"              , "You Will Deliver "                + gameData.juiceBulkAmountToggle.toLocaleString() + " / " + gameData.juiceBulkAmountMax.toLocaleString() + " Juice")
	update("sellYourJuiceReward"              , "You Will Get "                    + gameData.juiceSellReward.toLocaleString() + " Coins")
	update("sellYourJuicePrice"               , "You Need "                        + gameData.deliveryPrice.toLocaleString() + " Coins For Delivery")
    update("upgradeMoreStoragePrice"          , "Price: "                          + upgradeMoreStoragePrice.toLocaleString() + " Mega Coins")



    checkShowOrHide(gameData.juicers       , "inventoryButton")
    checkShowOrHide(gameData.employees     , "companyButton")
    checkShowOrHide(gameData.baskets       , "forestButton")
    checkShowOrHide(gameData.hasGottenJuice, "juiceMarket")



    moveBar("teach")
    moveBar("working")
    moveBasket()
    moveAutoCollecting()
	
	for (let i = 0; i < mainSkills.length; i++) {
		update(mainSkills[i] + "SkillLevel", gameData[mainSkills[i] + "SkillLevel"] + " / " + gameData[mainSkills[i] + "SkillLevelMax"])
	}
	
	update("rottenWisdom"   , 100 * gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax + "% Chance")
	update("keenEye"        , gameData.keenEyeSkillLevel * 5 + "% Chance")
	update("limebidextrous" , gameData.limebidextrous + "% Chance")
	update("intelligence"   , Math.floor(((gameData.intelligenceSkillLevel * 2)/ gameData.intelligenceSkillLevelMax) * 100) + "% Faster")
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
    else
        gameData.juiceBulkAmountMax = 100
	
    if (gameData.pinUnlock == 1) {
        hide("pinUnlockDiv")
		var x = document.getElementsByClassName("pinButton");
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "inline-block";
		}

    } 
	else
        showBasicDiv("pinUnlockDiv")
	



    if (gameData.bigGloves == 0) 
	{
        tabs("buyBigGloves", "block")
        hide("upgradeBigGloves")
        gameData.limesPerClick = 1 + gameData.difficulty * 5
    } 
	else 
	{
        hide("buyBigGloves")
        tabs("upgradeBigGloves", "block")
        gameData.limesPerClick = 2 + gameData.difficulty * 5
    }

	checkShowOrHide(gameData.betterTraining, 'upgradeBetterTraining')
	checkShowOrHide(gameData.smarterAdvertisingManagerBroker, 'smarterAdvertisingBrokerRule')


    if (gameData.coinsMax > 1e6) 
        showBasicDiv("upgradeWallet")
	else
        hide("upgradeWallet")
	
	
	
	
    if (gameData.advertisingManagerBroker && !gameData.smarterAdvertisingManagerBroker)
        showBasicDiv("smarterAutoBrokerAdvertiser")
    else
        hide("smarterAutoBrokerAdvertiser")
	
	

	//Respect Milstones
		checkRespectMilestone(10,    'lime',  'Automatically start tasks'                       ,'autoStartTaskButton'      )
		checkRespectMilestone(25,    'lime',  'Automatically start simulation'                  ,'autoStartSimulationButton')
		checkRespectMilestone(50,    'lime',  'Allow entrance to the Special Shopping District'                             )
		checkRespectMilestone(100,   'lime',  'Automatically check simulation'                  ,'autoCheckSimulationButton')
		checkRespectMilestone(500,   'lime',  'Automatically situate a civilian'                ,'autoPlaceACivilianDiv'    )
		checkRespectMilestone(1000,  'lime',  'Unlock scientific research'                      ,'scienceButton'            )
		checkRespectMilestone(10000, 'red' ,  'Unlock more mega coin upgrades'                                              )



		function checkRespectMilestone(number, color, text, id){
			
			i = 'respectMilestone' + number
			
			if (gameData.respect >= number)
				gameData[i] = 1

			
			if (gameData[i]) {
				if(id !== undefined)
				{
					if(number == 500)
						tabs(id, "block")
					else
						tabs(id, "inline-block")
				}
	
				update(number + 'RespectMilestone', number.toLocaleString() + ' Respect: ' + text)
				
				if(color == 'lime')
					colorChanger(number + 'RespectMilestone', limesRelatedAccent)
				if(color == 'red')
					colorChanger(number + 'RespectMilestone', '#FF999A')
				
				
			} 
			else 
			{
				if(id !== undefined)
					hide(id)
				
				colorChanger(number + 'RespectMilestone', grayAccentLight)
			}
			
		}
	//Respect Milstones End
	
    if (gameData.respect >= 50)
        showBasicDiv("storeTypesButtonsDiv")
    else
        hide("storeTypesButtonsDiv")
	
    if (gameData.increaseJuicePricePermanance < 1) {
        tabs("increaseJuicePricePermanance", "inline-block")
		hide("upgradeJuicePricePermanance")
    } else {
        hide("increaseJuicePricePermanance")
		showBasicDiv("upgradeJuicePricePermanance")
	}
	
	if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax) 
		tabs("stopActionsButton", "inline-block")
    else
        hide("stopActionsButton")
	

    if (gameData.manuscripts) 
	{
        hide("buyManuscriptsDiv")
        showBasicDiv("upgradeManuscripts")
    } 
	else 
	{
        hide("upgradeManuscripts")
        showBasicDiv("buyManuscriptsDiv")
	}
	
	
	checkShowOrHide(gameData.doesHaveCurrencyBroker, "currencyBroker")

	
    if (gameData.baskets > 0 && !gameData.basketScarecrow)
        showBasicDiv("offlineBasket")
    else
        hide("offlineBasket")
	
	
	
	if (gameData.creditScore2) {
        hide("increaseCreditScore2")
		if (!gameData.creditScore3)
			showBasicDiv("increaseCreditScore3")
		else
			hide("increaseCreditScore3")


    } 
	else 
	{
        tabs("increaseCreditScore2", "inline-block")
        hide("increaseCreditScore3")
	}
	
	
	if (gameData.advertisingManagerBroker && gameData.typeToHireToggle)
        tabs("autoAdvertiseBrokerDiv", "inline-block")
    else
        hide("autoAdvertiseBrokerDiv")
	
	

	if (gameData.unlockCurrencyBrokers) {
        hide("unlockCurrencyBrokers")
        showBasicDiv("hireToggleButtons")
        showBasicDiv("brokerApplicantUpgrades")
		if (gameData.advertisingManagerBroker)
			hide("autoBrokerAdvertiser")
		else
			showBasicDiv("autoBrokerAdvertiser")

		
    } else {
		
        showBasicDiv("unlockCurrencyBrokers")
        hide("hireToggleButtons")
        hide("brokerApplicantUpgrades")
        hide("autoBrokerAdvertiser")


	}
	
    if (!gameData.multitasking && gameData.learnANewSkill > 0)
        showBasicDiv("buySkillToggler")
	else
        hide("buySkillToggler")
	
    if (gameData.autoCurrencyConversionBuy)
        hide("autoCurrencyConversion")
    else if (gameData.maps == 4)
        showBasicDiv("autoCurrencyConversion")
    
	
    if (gameData.maps !== 4)
        hide("buyMapDiv5")
	
	
	

    if (gameData.diseaseControlFinished == 1) {
        hide("diseaseControlStart")
        tabs("startDiseaseTask", "block")
    } else {
        tabs("diseaseControlStart", "block")
        hide("startDiseaseTask")

    }

    if (gameData.megaCoinsInBankMax > 20) {
        hide("increaseCreditScore")
        tabs("upgradeCreditScore", "block")
    } else {
        tabs("increaseCreditScore", "block")
        hide("upgradeCreditScore")
    }

    if (gameData.nutritionists > 0) {
        hide("hireANutritionist")
        tabs("upgradeNutritionist", "block")
    } else {
        tabs("hireANutritionist", "block")
        hide("upgradeNutritionist")
    }


    if (gameData.fasterTransport == 0)
        update("deliveryToggleStandardButton", "Standard Delivery")
    else
        update("deliveryToggleStandardButton", "Hyper Delivery")
	
	
	if (gameData.diseaseTileSymbols == 0)
        update("diseaseTileSymbolsButton", "Disease Tiles: Blank")
    else
        update("diseaseTileSymbolsButton", "Disease Tiles: Symbols")



    if (gameData.deliveryManager == 0) {
        hide("sellMaxJuiceButton")
        tabs("decreaseJuiceSoldButton", "inline-block")
        tabs("increaseJuiceSoldButton", "inline-block")
    } else {
        tabs("sellMaxJuiceButton", "inline-block")
        hide("decreaseJuiceSoldButton")
        hide("increaseJuiceSoldButton")

    }



    if (gameData.deliveryManager == 0 && gameData.maps >= 3)
        showBasicDiv("buyADeliveryManager")
    else
        hide("buyADeliveryManager")


    if (gameData.maps >= 3) {
		
        tabs("travellingArea", "block")
        showBasicDiv("increaseJuicePrice")

        if (gameData.fasterTransport == 0)
            tabs("fasterTransportDiv", "block")
        else
            hide("fasterTransportDiv")

        if (gameData.maps < 4)
            tabs("buyFourthMapDiv", "block")
		else {
            hide("buyFourthMapDiv")
            tabs("tasksButton", "block")
        }
		
		
		
		
    } 
	else 
	{
        hide("buyFourthMapDiv")
        hide("travellingArea")
        hide("fasterTransportDiv")
    }
	
	
    if (gameData.respectMilestone10000) {
		
        showBasicDiv('upgradeMoreStorage')
		
		if (!gameData.bachelorsDegreeFinance)
			showBasicDiv('earnBachelorFinance')
		else
			hide('earnBachelorFinance')

		checkHideOrShow(gameData.rottenActualWisdom, "rottenActualWisdom")

		
		if (!gameData.creditScore2)
			showBasicDiv('increaseCreditScore2')

    } else {
		
		hide('upgradeMoreStorage')
        hide('earnBachelorFinance')
        hide('increaseCreditScore2')
        hide('buyABiggerWallet')


    }	
	
	if (gameData.maps < 4)
		hide("diseaseTileSymbolsButton")
	else
	{
		tabs("diseaseTileSymbolsButton", "inline-block")
		
		if(gameData.respectBillboard == 0)
			tabs("respectBillboard", "inline-block")
		else
			hide("respectBillboard")

		
	}
	
	
	if (gameData.bachelorsDegreeFinance) {
	
		tabs('tradeButton', 'inline-block')
		showBasicDiv('alphaCoinToMegaCoinDiv')
		showBasicDiv('upgradeBroker')

    } 
	else 
	{
		
		hide('tradeButton')
		hide('alphaCoinToMegaCoinDiv')
		hide('upgradeBroker')


    }	
	
	

    if (gameData.fork == 0 && gameData.learnANewSkill > -2)
        showBasicDiv('buyAForkDiv')
    else
        hide('buyAForkDiv')

	
    if (gameData.shoes == 0 && gameData.learnANewSkill > -1)
        showBasicDiv('buyShoesDiv')
    else
        hide('buyShoesDiv')

	
    if (gameData.upgradeMoreStorage > 0)
        showBasicDiv('upgradeMoreLand')
    else
        hide('upgradeMoreLand')

	


    if (gameData.hideCompletedSkills == 0)
        update("hideCompletedSkillsButton", "Completed Skills Shown")
    else
        update("hideCompletedSkillsButton", "Completed Skills Hidden")
	
	
    if (gameData.confirmStorage)
        update("confirmStorageButton", "Do Confirm x5 Storage")
    else
        update("confirmStorageButton", "Don't Confirm x5 Storage")
  
  
    if (gameData.villageNumber > 1) {
		tabs('confirmStorageButton', 'inline-block')
    } else {
		hide('confirmStorageButton')
    }	
	
	

	tabs('skillsSection1', 'inline-block')
	tabs('skillsSection2', 'inline-block')




    if (gameData.hideMaxedPurchases == 0) {
        update("hideMaxedPurchasesButton", "Maxed Purchases Shown")
    } else {
        update("hideMaxedPurchasesButton", "Maxed Purchases Hidden")
    }



    if (gameData.maps >= 2 && gameData.bulkBuyUnlock == 0) {
        tabs("bulkBuyUnlockDiv", "block")
    } else if (gameData.maps < 2 && gameData.bulkBuyUnlock == 1) {
        hide("bulkBuyUnlockDiv")
    } else if (gameData.maps >= 2 && gameData.bulkBuyUnlock == 1) {
        hide("bulkBuyUnlockDiv")
		
		if (gameData.bulkBuyUnlock2)
		{
			hide("bulkBuyUnlock2Div")
		}
		else
		{
			showBasicDiv("bulkBuyUnlock2Div")
		}


    } else if (gameData.bulkBuyUnlock == 0 && gameData.maps < 2) {
        hide("bulkBuyUnlockDiv")
    }




    if (gameData.maps >= 2 && gameData.storageUnlock == 0) {
        tabs("storageUnlockDiv", "block")
        hide("storageDiv")
    } else if (gameData.maps < 2) {
        hide("storageUnlockDiv")
        hide("storageDiv")
    } else if (gameData.maps >= 2 && gameData.storageUnlock == 1) {
        tabs("storageDiv", "block")
        hide("storageUnlockDiv")

        if (gameData.storageJuicersUnlock == 1 && gameData.storagePeelersUnlock == 1) {
            hide("storageDiv")
        }
    }



	if (gameData.hasAdvertised && !gameData.surveillanceCamera)
		showBasicDiv("offlineEmployee")
	else 
		hide("offlineEmployee")
	
	
	if (gameData.respectMilestone10000) {
		update("specialAchievement1", "Get a 5x multplier with Buy More Land purchased")
	} 
	if (gameData.maps > 3) {
		update("specialAchievement2", "Buy a Giant Map after only sending one delivery in that town")
	} 


    if (gameData.advertisingLevel1 == 0) {
        hide("advertisingMethods")

        if (gameData.hasAdvertised == 1) {
            showBasicDiv("researchBetterAdvertising")
        } else {
            hide("researchBetterAdvertising")

        }

    } else {
        tabs("advertisingMethods", "block")
        hide("researchBetterAdvertising")

    }
	



    if (gameData.bulkBuyUnlock == 0) {
        hide("peelersBulkButton")
		hide("basketsBulkButton")
		hide("juicersBulkButton")
    } else {
        tabs("peelersBulkButton", "inline-block")
        tabs("basketsBulkButton", "inline-block")
        tabs("juicersBulkButton", "inline-block")
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
	checkHide(gameData.saveAlphaCoinsUnlock, "saveAlphaCoinsUnlock")
	checkShow(gameData.saveAlphaCoinsUnlock, "upgradeSaveAlphaCoinsUnlock")
	
	checkHide(gameData.surveillanceCamera2, "offlineScience")
	checkShow(gameData.surveillanceCamera2, "upgradeHighTechSurveillance")

	checkHide(gameData.forestTree2, "buyANewTree")
	checkShow(gameData.forestTree2, "treeTypeDiv")


	
	updatePieStuff()
		

    if (gameData.lookAround >= 2) {
        tabs("sellYourLimesDiv", "block")
    }

    if (gameData.lookAround >= 3) {
        if (gameData.hideMaxedPurchases == 1 && gameData.juicers == gameData.juicersMax) {
            hide("buyAJuicerDiv")
        } else {
            showBasicDiv("buyAJuicerDiv")
        }

        if (gameData.hideMaxedPurchases == 1 && gameData.baskets == gameData.basketsMax) {
            hide("buyABasketDiv")
        } else {
            showBasicDiv("buyABasketDiv")
        }

        showBasicDiv("buyAMapDiv")

    }

	checkHide(gameData.tomes, "tomeDiv")

    if (gameData.tomes == 1) 
        showBasicDiv("tomeDiv2")
	else
		hide("tomeDiv2")



    if (gameData.tomes == 2)
        showBasicDiv("tomeDiv3")
	else
		hide("tomeDiv3")
	
    if (gameData.tomes == 3)
        showBasicDiv("tomeDiv4")
	else
		hide("tomeDiv4")
	
	
    if (gameData.autoCollectingBar == (gameData.nourishment + 1) * 100 || gameData.autoCollectingBar == 0) {
		gameData.isAutoCollecting = 0
    }
	else{
		gameData.isAutoCollecting = 1
    }
	
    if (gameData.villageNumber > 1) {
        tabs("marketMainButtonsDiv", "inline-block")
    }

    if (gameData.maps >= 1) {
        tabs("marketMainButtonsDiv", "inline-block")
        tabs("marketStoreButton", "inline-block")
		document.getElementById("marketMainButtonsDiv").style.width = "360px"
        hide("buyAMapDiv")
    }

    if (gameData.maps >= 2) {
        tabs("hiringAreaButton", "inline-block")
        tabs("marketStoreButton", "inline-block")
        hide("buyAnotherMapDiv")
    }
	
    if (gameData.maps == 2) {
        showBasicDiv("buyThirdMapDiv")
    } else {
        hide("buyThirdMapDiv")
    }

    if (gameData.maps >= 3 || gameData.villageNumber > 1) {
        tabs("travelButton", "inline-block")
    }
	

    if (gameData.peeledLimes >= 1) {
        divVisibility("textForPeeledLimes", "inline-block")
        tabs("juiceLimesToggleButton", "inline-block")
        tabs("juicePeeledLimesToggleButton", "inline-block")
    }


    if (gameData.knife >= 1) {
        showBasicDiv("knifeDiv")

        if (gameData.hideMaxedPurchases == 1 && gameData.peelers == gameData.peelersMax) {
            hide("buyAPeelerDiv")
        } else if (gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax) {
            showBasicDiv("buyAPeelerDiv")
        }

        if (gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && gameData.maps > 1) {
            showBasicDiv("sharperPeelerDiv")
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
        tabs("useMaxPeelersButton", "inline-block")
    }


	checkShow(gameData.peelers, "peelerDiv")
	checkShow(gameData.transferAlphaCoinsBulkUnlock, "transferAlphaCoinsBulk")
	checkHide(gameData.transferAlphaCoinsBulkUnlock, "transferAlphaCoinsBulkUnlock")
	checkHide(gameData.lightRobe, "lightRobe")
	checkHide(gameData.skillTrainer, "skillTrainer")
	checkShow(gameData.bitterSpeedSkillLevel, "eatGoldenLimeProgress")
	checkShow(gameData.bitterSpeedSkillLevel, "eatGoldenLime")




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
	
	
    if (gameData.learnANewSkill - 3 == gameData.tomes) {
        document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
		gameData.learnANewSkillBar = 100;
	}
	else
        document.getElementById('learnANewSkillButton').style.backgroundColor = '#FFBB9A';
	
	
	
		
	if (gameData.learnANewSkill >= -1) {	
		showBasicDiv("eatFoodDiv")
		showOrHideSkill("keenEye")
    }

    if (gameData.learnANewSkill >= 0) {	
		showBasicDiv("autoCollectingDiv")
		showBasicDiv("nourishment")
		tabs("skillInfoButton", "inline-block")
    }
	
    if (gameData.learnANewSkill >= 5)
		showBasicDiv("motivateEmployeeButton")
	
    if (gameData.forestTreeType == 2)
		showBasicDiv("goldenLimesInfo")
	else
		hide("goldenLimesInfo")
	
	
	for (let i = 0; i < mainSkills.length; i++) {
		if (gameData.learnANewSkill >= i) {
			showOrHideSkill(mainSkills[i])
		}
	}

}

