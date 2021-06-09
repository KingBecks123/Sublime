function updateAfterLoad(){
		restartBar("learnANewSkill")
		restartBar("autoCollecting")
		restartBar("rottenWisdom")
		restartBar("limebidextrous")
		restartBar("knifebidextrous")
		restartBar("intelligence")
		restartBar("juicer")		
		restartBar("peeler")
		restartBar("advertise")
        restartBar("working")

			if(gameData.deliveryBar <= 99 && gameData.deliveryBar != 0)
		{
			sellYourJuiceBar()
		}

updateValues()
}

function updateValues() {
	
	
	
	
	
	
	addAesthetic()

	if (gameData.coins > 1e6)
	{
		gameData.coins = 1e6
	}

	if (gameData.limes < 0)
	{
		gameData.limes = 0
	}	
	
	if (gameData.respect < 0)
	{
		gameData.respect = 0
	}
	
	if (gameData.employeeWorking > gameData.employeeWorkingMax)
	{
		gameData.employeeWorking = gameData.employeeWorkingMax
	}
	
	overMaximum("baskets")
	overMaximum("juicers")
	overMaximum("peelers")
	overMaximum("intelligenceSkillLevel")
	
    updateNumber("lime")
    updateNumberSpecial("rottenLime", "Rotten Lime")
	
	//updateNumber("textForLimes", gameData.limes + " Limes")
    //update("textForRottenLimes", gameData.rottenLimes + " Rotten Limes")
	
	switch (gameData.showBarPercent) {
	  case 0:
	  update("barPercentButton", "Bar Percent Hidden")

	  var x = document.getElementsByClassName("skillBar");
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color =  "rgba(0, 0, 0, 0)";
	  }
	  var x = document.getElementsByClassName("verticalBar");
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color =  "rgba(0, 0, 0, 0)";
	  }
	  
	
		break;
	  case 1:
	  update("barPercentButton", "Bar Percent Shown")
	  var x = document.getElementsByClassName("skillBar");
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color = accent0;
	  }
	  var x = document.getElementsByClassName("verticalBar");
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color = accent0;
	  }
	  

	}	

	
	gameData.limesInBaskets = Math.floor(gameData.baskets * (gameData.basketBar / 4))
	
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("textForMegaCoinsInBank", gameData.megaCoinsInBank + " / " + gameData.megaCoinsInBankMax + " Mega Coins")
    update("textForMegaCoins", gameData.megaCoins + " Mega Coins")
	
    update("juicersAmount", gameData.juicers + " / " + gameData.juicersMax + " Juicers")
    update("peelersAmount", gameData.peelers + " / " + gameData.peelersMax + " Peelers")

    update("basketsAmount", gameData.baskets + " / " + gameData.basketsMax + " Baskets")
    update("maxBaskets", gameData.basketsMax + " baskets fit under the current tree.")
	
    update("limesInBaskets", gameData.limesInBaskets + " Limes")
	
    update("textForRespect", gameData.respect + " Respect")
    update("textForLakes", gameData.limeDiseaseLakes + " Lakes")
	
    update("currentSpeedEmployee", "Current speed: " + gameData.employeeCurrentSpeed + " limes per minute.")
	
	if(gameData.employeeWorking > 0)
	{
		update("workingEmployee", "Working time left: " + gameData.employeeWorking + " / 10 minutes.")
	}

	else
	{
		update("workingEmployee", "Employee is idle.")		
	}
		if (gameData.applicationReady == 1)
		{
			update("application", 
			"<br>" +
			"Skills: Can Collect Limes." + "<br>" +
			"Speed: " + gameData.applicantSpeed + "% Of What I'm Taught." + "<br>" +
			"Price: " + gameData.applicantPrice + " Coins." + "<br>" +
			"Wages: " + gameData.applicantWage + " Coins Per Minute." + "<br>" +
			"Hunger: " + gameData.applicantHunger + " Limes Per Second." + "<br>" 
			+ "<br>"
				)
		}
		else
		{
			    update("application", "Pin applications here")
		}

	update("textForBetterTraining", "Current increase: " + gameData.betterTraining + "00%")

		
	update("speedEmployee", "Speed: " + gameData.employeeSpeed + "% of what I'm taught.")
	update("wageEmployee", "Wages: " + gameData.employeeWage + " Coins per minute.")
	update("hungerEmployee", "Hunger: " + gameData.employeeHunger + " Limes per second.")

	
    update("textForCurrentEmployees","Current Employees: " + gameData.employees + " / " + gameData.maxEmployees)
    update("textForCurrentEmployees2", "Current Employees: " + gameData.employees + " / " + gameData.maxEmployees)


    update("numberOfCivilians", "Number Of Civilians: " + gameData.civiliansTotal)


    update("textForPeeledLimes", gameData.peeledLimes + " Peeled Limes")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmountToggle + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmountToggle + " Coins")
	update("sellYourJuicePrice", "You Need " + gameData.deliveryPrice + " Coins For Delivery")

	checkShow(gameData.megaCoins, "textForMegaCoins")	
	checkShow(gameData.peeledLimes, "textForPeeledLimes")
	checkShow(gameData.coins, "textForCoinsDiv")
	checkShow(gameData.rottenLimes, "textForRottenLimes")
	checkShow(gameData.coins, "achievementsButton")
	checkShow(gameData.hasGottenJuice, "textForJuice")
	
	checkShowNonVariable(gameData.juicers, "inventoryButton")	
	checkShowNonVariable(gameData.employees, "companyButton")
	checkShowNonVariable(gameData.baskets, "forestButton")
	checkShowNonVariable(gameData.hasGottenJuice, "juiceMarket")

	moveBar("autoCollecting")
	moveBar("juicer")
	moveBar("delivery")
	moveBar("advertise")
	moveBar("teach")
	moveBar("peeler")
	moveBar("working")
	moveBar("eat")	
	moveBasket()	
	
	moveBar("rottenWisdom")
		update("rottenWisdom", gameData.rottenWisdom + "% Chance")
		update("rottenWisdomSkillLevel", gameData.rottenWisdomSkillLevel + " / " + gameData.rottenWisdomSkillLevelMax)
		
	moveBar("limebidextrous")
		update("limebidextrous", gameData.limebidextrous + "% Chance")
		update("limebidextrousSkillLevel", gameData.limebidextrousSkillLevel + " / " + gameData.limebidextrousSkillLevelMax)
		
	moveBar("intelligence")
		update("intelligence", Math.floor((gameData.intelligenceSkillLevel / gameData.intelligenceSkillLevelMax) * 100) + "% Faster")	
		update("intelligenceSkillLevel", gameData.intelligenceSkillLevel + " / " + gameData.intelligenceSkillLevelMax)

	moveBar("knifebidextrous")
		update("knifebidextrous", gameData.knifebidextrous * 2.5 + "% Chance")	
		update("knifebidextrousSkillLevel", gameData.knifebidextrousSkillLevel + " / " + gameData.knifebidextrousSkillLevelMax)

		update("eat", gameData.eat + " / 100")		


	if(gameData.lookAround >= 1)
	{
			divVisibility ("navigateButtons", "visible")
	}

	if(gameData.rottenWisdomSkillLevel == gameData.rottenWisdomSkillLevelMax)
	{
		hide("textForRottenLimes")
		hide("foodToggleRottenLimesButton")
		gameData.foodTypeToggle = 0
	}
	
	if(gameData.limeTypeToJuice == 0)
	{
		update("juicerInfo", gameData.limesPerJuice + " Limes -> 1 Juice")	
	}
	else if(gameData.limeTypeToJuice == 1)
	{
		update("juicerInfo", gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice")	
	}



	if(gameData.entrepreneurialCertificates == 0)
	{
		hide("entrepreneurialCertificates1")
	}
	else if(gameData.entrepreneurialCertificates == 1)
	{
		tabs("entrepreneurialCertificates1", "block")	
	}



	
	
	
	if(gameData.bigGloves == 0)
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
	
	if(gameData.betterTraining > 0)
	{
		showBasicDiv("upgradeBetterTraining")
	}
	else
	{
		hide("upgradeBetterTraining")
	}
	


	if(gameData.diseaseControlFinished == 1)
	{
		hide("diseaseControlStart")
		tabs("startDiseaseTask", "block")
	}
	else
	{
		tabs("diseaseControlStart", "block")
		hide("startDiseaseTask")

	}

	if(gameData.megaCoinsInBankMax > 20)
	{
		hide("increaseCreditScore")
		tabs("upgradeCreditScore", "block")
	}
	else
	{
		tabs("increaseCreditScore", "block")
		hide("upgradeCreditScore")
	}
	
	if(gameData.nutritionists > 0)
	{
		hide("hireANutritionist")
		tabs("upgradeNutritionist", "block")
	}
	else
	{
		tabs("hireANutritionist", "block")
		hide("upgradeNutritionist")
	}
	
	

	if(gameData.villageNumber > 1)
	{
		tabs("peopleButton", "block")
	}
	else
	{
		hide("peopleButton")
	}

	

	if(gameData.fasterTransport == 0)
	{
		update("deliveryToggleStandardButton", "Standard Delivery")
	}
	else
	{
		update("deliveryToggleStandardButton", "Hyper Delivery")
	}	
	

	if(gameData.maps >= 3)
	{
		tabs("travellingArea", "block")		
		
		
		if(gameData.fasterTransport == 0)
		{
			tabs ("fasterTransportDiv", "block")
		}
		else
		{		
			hide("fasterTransportDiv")
		}
		if(gameData.maps < 4)
		{
			tabs ("buyFourthMapDiv", "block")
		}
		else
		{		
			hide("buyFourthMapDiv")
			tabs ("tasksButton", "block")
		}
	}
	else
	{
		hide("buyFourthMapDiv")
		hide("travellingArea")
		hide("fasterTransportDiv")
	}
	
	
	
	
	if(gameData.hideCompletedSkills == 0)
	{
		update("hideCompletedSkillsButton", "Completed Skills Shown")
	}
	else
	{
		update("hideCompletedSkillsButton", "Completed Skills Hidden")
	}
	
	
	
	if(gameData.hideMaxedPurchases == 0)
	{
		update("hideMaxedPurchasesButton", "Maxed Purchases Shown")
	}
	else
	{
		update("hideMaxedPurchasesButton", "Maxed Purchases Hidden")
	}
	
	

	if(gameData.maps >= 2 && gameData.bulkBuyUnlock == 0)
	{
		tabs("bulkBuyUnlockDiv", "block")
		hide("bulkBuyDiv")
	}
	else if(gameData.maps < 2 && gameData.bulkBuyUnlock == 1)
	{
		hide("bulkBuyUnlockDiv")
		hide("bulkBuyDiv")
	}
	else if(gameData.maps >= 2 && gameData.bulkBuyUnlock == 1)
	{
		tabs("bulkBuyDiv", "block")
		hide("bulkBuyUnlockDiv")
		
		if (gameData.bulkBuyBasketsUnlock == 1 && gameData.bulkBuyJuicersUnlock == 1 && gameData.bulkBuyPeelersUnlock == 1)
		{
			hide("bulkBuyDiv")
		}
	}
	else if(gameData.bulkBuyUnlock == 0 && gameData.maps < 2)
	{
		hide("bulkBuyDiv")
		hide("bulkBuyUnlockDiv")			
	}




	if(gameData.maps >= 2 && gameData.storageUnlock == 0)
	{
		tabs("storageUnlockDiv", "block")
		hide("storageDiv")
	}
	else if(gameData.maps < 2)
	{
		hide("storageUnlockDiv")
		hide("storageDiv")
	}
	else if(gameData.maps >= 2 && gameData.storageUnlock == 1)
	{
		tabs("storageDiv", "block")
		hide("storageUnlockDiv")
		
		if(gameData.storageJuicersUnlock == 1 && gameData.storagePeelersUnlock == 1)
		{
			hide("storageDiv")

		}
	}






	if(gameData.advertisingLevel1 == 0)
	{
		hide("advertisingMethods")
		tabs ("researchBetterAdvertising", "block")
	}
	else
	{		
		tabs ("advertisingMethods", "block")
		hide("researchBetterAdvertising")
	}

	if(gameData.advertisingLevel2 == 0)
	{
		tabs ("advertisingLeaflets", "block")
	}
	else
	{		
		hide("advertisingLeaflets")
	}

	if(gameData.advertisingLevel3 == 0)
	{
		tabs ("advertisingBillboard", "block")
	}
	else
	{		
		hide("advertisingBillboard")
	}

	if(gameData.bulkBuyPeelersUnlock == 0)
	{
		hide("peelersBulkButton")
	}
	else
	{
		tabs("peelersBulkButton", "inline-block")
		hide("bulkBuyPeelersDiv")
	}

	if(gameData.bulkBuyJuicersUnlock == 0)
	{
		hide("juicersBulkButton")
	}
	else
	{
		tabs("juicersBulkButton", "inline-block")
		hide("bulkBuyJuicersDiv")
	}

	if(gameData.bulkBuyBasketsUnlock == 0)
	{
		hide("basketsBulkButton")
	}
	else
	{
		tabs("basketsBulkButton", "inline-block")
		hide("bulkBuyBasketsDiv")
	}	
	
	
	
	
	if(gameData.storagePeelersUnlock == 1)
	{
		hide("storagePeelersDiv")
	}

	if(gameData.storageJuicersUnlock == 1)
	{
		hide("storageJuicersDiv")
	}

	
	
	
	
	if(gameData.lookAround >= 2)
	{
			tabs ("sellYourLimesDiv", "block")
	}
	
	if(gameData.lookAround >= 3)
	{
		if ( gameData.hideMaxedPurchases == 1 && gameData.juicers == gameData.juicersMax)
		{
			hide("buyAJuicerDiv")
		}
		else
		{
			showBasicDiv("buyAJuicerDiv")
		}

		if ( gameData.hideMaxedPurchases == 1 && gameData.baskets == gameData.basketsMax)
		{
			hide("buyABasketDiv")
		}
		else
		{
			showBasicDiv("buyABasketDiv")
		}
		
		showBasicDiv("buyAMapDiv")
		
	}
	
	if(gameData.learnANewSkill >= 1)
	{
		showOrHideSkill("rottenWisdom")
	}
	
	if(gameData.learnANewSkill >= 2)
	{
		showOrHideSkill("limebidextrous")
	}
	
	if(gameData.tomes >= 1){
		hide("tomeDiv")
	}
	
	if(gameData.learnANewSkill >= 3)
	{
		showOrHideSkill("intelligence")
		
		if(gameData.tomes == 0)
		{
			document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
			gameData.learnANewSkillBar = 100;
		}
		else if (gameData.tomes == 1)
		{
			document.getElementById('learnANewSkillButton').style.backgroundColor = '#FFBB9A';					
		}
	}
	
	if(gameData.learnANewSkill >= 4)
	{
		showOrHideSkill("knifebidextrous")
		
		gameData.learnANewSkillBar = 100;
		document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
	}
	
	if(gameData.villageNumber > 0)
	{		
		tabs ("marketMainButtonsDiv", "block")
	}
	
	if(gameData.maps >= 1)
	{		
		tabs ("marketMainButtonsDiv", "block")
		tabs ("marketStoreButton", "inline-block")
		hide("buyAMapDiv")
	}
	
	if(gameData.maps >= 2)
	{		tabs ("hiringAreaButton", "inline-block")
			tabs ("marketStoreButton", "inline-block")
			hide("buyAnotherMapDiv")
	}

	if(gameData.maps >= 3 || gameData.villageNumber > 1)
	{		
		tabs ("travelButton", "inline-block")
	}

	if(gameData.peeledLimes >= 1)
	{
		divVisibility ("textForPeeledLimes", "inline-block")
		tabs ("juiceLimesToggleButton", "inline-block")
		tabs ("juicePeeledLimesToggleButton", "inline-block")
	}
	
	if(gameData.maps == 2)
	{  
		showBasicDiv("buyThirdMapDiv")
	}
	else
	{  
		hide("buyThirdMapDiv")
	}
	
	if(gameData.knife >= 1)
	{  
		showBasicDiv("knifeDiv")
		
		if ( gameData.hideMaxedPurchases == 1 && gameData.peelers == gameData.peelersMax)
		{
			hide("buyAPeelerDiv")
		}
		else
		{
			showBasicDiv("buyAPeelerDiv")
		}
		
		showBasicDiv("sharperPeelerDiv")
		hide("buyKnifeDiv")
	}
	
	if(gameData.sharperPeelers >= 1)
	{ 
		hide("sharperPeelerDiv")
	}	
	

	if(gameData.silkRobe >= 1)
	{
		hide("buyARobe")		
	}

	if(gameData.unlockDiseaseAreaSwamp >= 1)
	{
		hide("unlockDiseaseAreaSwamp")		
	}

	if(gameData.juicers >= 2)
	{
		divVisibility ("makeMaxJuiceButton", "visible")
	}
	
	
	
	
	if(gameData.peelers >= 2)
	{
		tabs ("useMaxPeelersButton", "inline-block")
	}
	
	
	
	if(gameData.peelers >= 1)
	{
		showBasicDiv("peelerDiv")
	}

	if(gameData.respect >= 50)
	{
		showBasicDiv("storeTypesButtonsDiv")
	}
	else
	{
		hide("storeTypesButtonsDiv")
	}


	if(gameData.advertisingSpeed >= 6)
	{ 
		hide("researchBetterAdvertising")
        hide("advertisingBillboard")
        hide("advertisingLeaflets")
	}

	if(gameData.coins >= 10)
	{ 
		gameData.achievement1 = 1
	}
	if(gameData.coins >= 100)
	{ 
		gameData.achievement2 = 1
	}
	if(gameData.coins >= 1000)
	{ 
		gameData.achievement3 = 1
	}
	if(gameData.coins >= 10000)
	{ 
		gameData.achievement4 = 1
	}

	moveBar("learnANewSkill")

}
