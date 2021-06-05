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
	
    update("juicersAmount", gameData.juicers + " Juicers")
    update("peelersAmount", gameData.peelers + " Peelers")

    update("basketsAmount", gameData.baskets + " / " + gameData.basketsMax + " Baskets")
    update("maxBaskets", gameData.basketsMax + " baskets fit under the current tree.")
	
    update("limesInBaskets", gameData.limesInBaskets + " Limes")
	
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

    update("textForPeeledLimes", gameData.peeledLimes + " Peeled Limes")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmountToggle + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmountToggle + " Coins")
	update("sellYourJuicePrice", "You Need " + gameData.deliveryPrice + " Coins For Delivery")
	
	checkShow(gameData.peeledLimes, "textForPeeledLimes")
	checkShow(gameData.coins, "textForCoinsDiv")
	checkShow(gameData.rottenLimes, "textForRottenLimes")
	checkShow(gameData.juicers, "inventoryButton")
	checkShow(gameData.coins, "achievementsButton")
	checkShow(gameData.employees, "companyButton")
	checkShow(gameData.baskets, "forestButton")
	checkShow(gameData.hasGottenJuice, "textForJuice")
	checkShow(gameData.hasGottenJuice, "juiceMarket")


	moveBar("juicer")
	moveBar("peeler")
	moveBar("delivery")
	moveBar("advertise")
	moveBar("teach")
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
	
	if(gameData.bulkBuyPeelersUnlock == 0)
	{
		tabs("peelersBulkButton", "none")
	}
	else
	{
		tabs("peelersBulkButton", "inline-block")
		tabs("bulkBuyPeelersDiv", "none")
	}
	
	if(gameData.autosave == 0)
	{
		update("autosaveButton", "Autosave Is Off")
	}
	else
	{
		update("autosaveButton", "Autosave Is On")
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
		tabs("bulkBuyDiv", "none")
	}
	else if(gameData.maps < 2 && gameData.bulkBuyUnlock == 1)
	{
		tabs("bulkBuyUnlockDiv", "none")
	}
	else if(gameData.maps >= 2 && gameData.bulkBuyUnlock == 1)
	{
		tabs("bulkBuyUnlockDiv", "inline-block")
	}



	if(gameData.bulkBuyUnlock == 0)
	{
		if(gameData.maps >= 2)
			{
				tabs("bulkBuyUnlockDiv", "inline-block")
			}
		else
			{
				tabs("bulkBuyUnlockDiv", "none")			
			}
		tabs("bulkBuyDiv", "none")
	}
	else
	{		
		tabs("bulkBuyUnlockDiv", "none")		
		tabs("bulkBuyDiv", "inline-block")
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

	gameData.limesPerClick = 1 + gameData.difficulty * 5
	
	if(gameData.maps >= 1)
	{		
		tabs ("marketMainButtonsDiv", "inline-block")
		tabs ("buyAMapDiv", "none")
	}
	
	if(gameData.maps >= 2)
	{			tabs ("hiringAreaButton", "inline-block")
			tabs ("marketStoreButton", "inline-block")
			tabs ("buyAnotherMapDiv", "none")
	}
	
	if(gameData.peeledLimes >= 1)
	{divVisibility ("textForPeeledLimes", "inline-block")
	tabs ("juiceLimesToggleButton", "inline-block")
	tabs ("juicePeeledLimesToggleButton", "inline-block")
	}
	if(gameData.knife >= 1)
	{  tabs("knifeDiv", "block")
		tabs("buyAPeelerDiv", "block")
		tabs("buyKnifeDiv", "none")
	}
	if(gameData.exploreLevel >= 1)
	{
	divVisibility ("newtownButton", "visible")
	}

	if(gameData.sticks >= 2)
	{tabs ("stickRub", "block")
	tabs ("textForSticks", "block")
	tabs ("stickButton", "block")
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
	if(gameData.coins >= 1)
	{ divVisibility ("textForCoinsDiv", "visible")
	}
	if(gameData.coins >= 10)
	{ 
		document.getElementById('coinsAchievement').style.backgroundColor = 'lime';
		gameData.achievement1 = 1
	}
	if(gameData.coins >= 100)
	{ 
		document.getElementById('coinsAchievement2').style.backgroundColor = 'lime';
		gameData.achievement2 = 1
	}
	if(gameData.coins >= 1000)
	{ 
		document.getElementById('coinsAchievement3').style.backgroundColor = 'lime';
		gameData.achievement3 = 1
	}
	if(gameData.advertisingSpeed >= 6)
	{ 
		tabs ("researchBetterAdvertising", "none")
                tabs ("advertisingBillboard", "none")
                tabs ("advertisingLeaflets", "none")
	}
	if(gameData.coins >= 10000)
	{ 
		document.getElementById('coinsAchievement4').style.backgroundColor = 'lime';
		gameData.achievement4 = 1
	}

	moveBar("learnANewSkill")

}
