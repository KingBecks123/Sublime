function updateAfterLoad(){
		restartBar("learnANewSkill")
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

	if(gameData.limeDiseaseLakes == 0)
	{
		gameData.skepticismCurrent = 0
	}
	else
	{
		gameData.skepticismCurrent = gameData.skepticismTotalSwamp
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
    update("textForSkepticism", gameData.skepticismCurrent + " Skepticism")
	
    update("currentSpeedEmployee", "Current speed: " + gameData.employeeCurrentSpeed + " limes per minute.")
	
	if(gameData.employeeWorking > 0)
	{
		update("workingEmployee", "Working time left: " + gameData.employeeWorking + " minutes.")
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
		update("intelligence", (gameData.intelligenceSkillLevel / gameData.intelligenceSkillLevelMax) * 100 + "% Faster")	
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
		tabs("textForRottenLimes", "none")
		tabs("foodToggleRottenLimesButton", "none")
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
		tabs("entrepreneurialCertificates1", "none")
	}
	else if(gameData.entrepreneurialCertificates == 1)
	{
		tabs("entrepreneurialCertificates1", "block")	
	}
	
	
	if(gameData.bigGloves == 0)
	{
		tabs("buyBigGloves", "block")
		tabs("upgradeBigGloves", "none")
		gameData.limesPerClick = 1 + gameData.difficulty * 5
	}
	else
	{
		tabs("buyBigGloves", "none")
		tabs("upgradeBigGloves", "block")
		gameData.limesPerClick = 2 + gameData.difficulty * 5
	}
	


	if(gameData.diseaseControlFinished == 1)
	{
		tabs("diseaseControlStart", "none")
		tabs("startDiseaseTask", "block")
	}
	else
	{
		tabs("diseaseControlStart", "block")
		tabs("startDiseaseTask", "none")

	}

	if(gameData.megaCoinsInBankMax > 20)
	{
		tabs("increaseCreditScore", "none")
		tabs("upgradeCreditScore", "block")
	}
	else
	{
		tabs("increaseCreditScore", "block")
		tabs("upgradeCreditScore", "none")
	}
	
	if(gameData.nutritionists > 0)
	{
		tabs("hireANutritionist", "none")
		tabs("upgradeNutritionist", "block")
	}
	else
	{
		tabs("hireANutritionist", "block")
		tabs("upgradeNutritionist", "none")
	}
	
	

	if(gameData.villageNumber > 1)
	{
		tabs("peopleButton", "block")
	}
	else
	{
		tabs("peopleButton", "none")
	}

	
	
	if(gameData.autosave == 0)
	{
		update("autosaveButton", "Autosave Is Off")
	}
	else
	{
		update("autosaveButton", "Autosave Is On")
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
			tabs ("fasterTransportDiv", "none")
		}
		if(gameData.maps < 4)
		{
			tabs ("buyFourthMapDiv", "block")
		}
		else
		{		
			tabs ("buyFourthMapDiv", "none")
			tabs ("tasksButton", "block")
		}


	}
	else
	{
		tabs("travellingArea", "none")
		tabs("fasterDeliveryDiv", "none")
	}
	
	
	
	
	if(gameData.hideCompletedSkills == 0)
	{
		update("hideCompletedSkillsButton", "Completed Skills Shown")
	}
	else
	{
		update("hideCompletedSkillsButton", "Completed Skills Hidden")
	}

	if(gameData.maps >= 2 && gameData.bulkBuyUnlock == 0)
	{
		tabs("bulkBuyUnlockDiv", "inline-block")
	}
	else if(gameData.maps < 2 && gameData.bulkBuyUnlock == 1)
	{
		tabs("bulkBuyUnlockDiv", "none")
		tabs("bulkBuyDiv", "none")
	}
	else if(gameData.maps >= 2 && gameData.bulkBuyUnlock == 1)
	{
		tabs("bulkBuyDiv", "inline-block")
		tabs("bulkBuyUnlockDiv", "none")
		
		if (gameData.bulkBuyBasketsUnlock == 1 && gameData.bulkBuyJuicersUnlock == 1 && gameData.bulkBuyPeelersUnlock == 1)
		{
			tabs("bulkBuyDiv", "none")
		}
	}
	else if(gameData.bulkBuyUnlock == 0 && gameData.maps < 2)
	{
		tabs("bulkBuyUnlockDiv", "none")			
	}




	if(gameData.maps >= 2 && gameData.storageUnlock == 0)
	{
		tabs("storageUnlockDiv", "inline-block")
		tabs("storageDiv", "none")
	}
	else if(gameData.maps < 2)
	{
		tabs("storageUnlockDiv", "none")
		tabs("storageDiv", "none")
	}
	else if(gameData.maps >= 2 && gameData.storageUnlock == 1)
	{
		tabs("storageDiv", "inline-block")
		tabs("storageUnlockDiv", "none")
		
		if(gameData.storageJuicersUnlock == 1 && gameData.storagePeelersUnlock == 1)
		{
			tabs("storageDiv", "none")

		}
	}






	if(gameData.advertisingLevel1 == 0)
	{
		tabs ("advertisingMethods", "none")
		tabs ("researchBetterAdvertising", "block")
	}
	else
	{		
		tabs ("advertisingMethods", "block")
		tabs ("researchBetterAdvertising", "none")
	}

	if(gameData.advertisingLevel2 == 0)
	{
		tabs ("advertisingLeaflets", "block")
	}
	else
	{		
		tabs ("advertisingLeaflets", "none")
	}

	if(gameData.advertisingLevel3 == 0)
	{
		tabs ("advertisingBillboard", "block")
	}
	else
	{		
		tabs ("advertisingBillboard", "none")
	}

	if(gameData.bulkBuyPeelersUnlock == 0)
	{
		tabs("peelersBulkButton", "none")
	}
	else
	{
		tabs("peelersBulkButton", "inline-block")
		tabs("bulkBuyPeelersDiv", "none")
	}

	if(gameData.bulkBuyJuicersUnlock == 0)
	{
		tabs("juicersBulkButton", "none")
	}
	else
	{
		tabs("juicersBulkButton", "inline-block")
		tabs("bulkBuyJuicersDiv", "none")
	}

	if(gameData.bulkBuyBasketsUnlock == 0)
	{
		tabs("basketsBulkButton", "none")
	}
	else
	{
		tabs("basketsBulkButton", "inline-block")
		tabs("bulkBuyBasketsDiv", "none")
	}	
	
	
	
	
	if(gameData.storagePeelersUnlock == 1)
	{
		tabs("storagePeelersDiv", "none")
	}

	if(gameData.storageJuicersUnlock == 1)
	{
		tabs("storageJuicersDiv", "none")
	}

	
	
	
	
	if(gameData.lookAround >= 2)
	{
			tabs ("sellYourLimesDiv", "block")
	}
	
	if(gameData.lookAround >= 3)
	{
			tabs ("buyAJuicerDiv", "block")

			tabs ("buyAMapDiv", "block")

			tabs ("buyABasketDiv", "block")
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
		tabs ("tomeDiv", "none")
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
		tabs ("marketMainButtonsDiv", "inline-block")
	}
	
	if(gameData.maps >= 1)
	{		
		tabs ("marketMainButtonsDiv", "inline-block")
		tabs ("marketStoreButton", "inline-block")
		tabs ("buyAMapDiv", "none")
	}
	
	if(gameData.maps >= 2)
	{		tabs ("hiringAreaButton", "inline-block")
			tabs ("marketStoreButton", "inline-block")
			tabs ("buyAnotherMapDiv", "none")
	}

	if(gameData.maps >= 3 || gameData.villageNumber > 0)
	{		
		tabs ("travelButton", "inline-block")
	}

	if(gameData.peeledLimes >= 1)
	{divVisibility ("textForPeeledLimes", "inline-block")
	tabs ("juiceLimesToggleButton", "inline-block")
	tabs ("juicePeeledLimesToggleButton", "inline-block")
	}
	
	if(gameData.maps == 2)
	{  
		tabs("buyThirdMapDiv", "inline-block")
	}
	else
	{  
		tabs("buyThirdMapDiv", "none")
	}
	
	if(gameData.knife >= 1)
	{  tabs("knifeDiv", "block")
		tabs("buyAPeelerDiv", "block")
		tabs("sharperPeelerDiv", "block")
		tabs("buyKnifeDiv", "none")
	}
	
	if(gameData.sharperPeelers >= 1)
	{ 
		tabs("sharperPeelerDiv", "none")
	}	
	
	
	if(gameData.exploreLevel >= 1)
	{
	divVisibility ("newtownButton", "visible")
	}

	if(gameData.silkRobe >= 1)
	{
		tabs("buyARobe", "none")		
	}

	if(gameData.unlockDiseaseAreaSwamp >= 1)
	{
		tabs("unlockDiseaseAreaSwamp", "none")		
	}

	if(gameData.juicers >= 2)
	{divVisibility ("makeMaxJuiceButton", "visible")
	}
	if(gameData.peelers >= 2)
	{tabs ("useMaxPeelersButton", "inline-block")
	}
	if(gameData.peelers >= 1)
	{
		tabs ("peelerDiv", "block")
	}

	if(gameData.respect >= 50)
	{
		tabs ("storeTypesButtonsDiv", "block")
	}
	else
	{
		tabs ("storeTypesButtonsDiv", "none")
	}


	if(gameData.advertisingSpeed >= 6)
	{ 
		tabs ("researchBetterAdvertising", "none")
                tabs ("advertisingBillboard", "none")
                tabs ("advertisingLeaflets", "none")
	}


	moveBar("learnANewSkill")

}
