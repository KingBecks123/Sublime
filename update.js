function updateAfterLoad(){


			if(gameData.juiceBar <= 99 && gameData.juiceBar != 0)
		{
			makeJuiceBar()
		}
			if(gameData.deliveryBar <= 99 && gameData.deliveryBar != 0)
		{
			sellYourJuiceBar()
		}
updateValues()
}

function updateValues() {
	
	addAesthetic()
	
    update("textForLimes", gameData.limes + " Limes")
    update("textForRottenLimes", gameData.rottenLimes + " Rotten Limes")
    update("textForSticks", gameData.sticks + " Sticks")
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("inventoryBread", gameData.bread + " Bread")
    update("inventorySugar", gameData.sugar + " Sugar")
    update("textForPies", gameData.pies + " Pies")
    update("juicersAmount", gameData.juicers + " Juicers")
	
	switch (gameData.aesthetic) {
	  case 0:
		update("aestheticButton", "Aesthetic: Classic")
		
		background = "#222328"; //Background Color
		accent0 = "#454851"; //Main Color
		accent1 = "lightgreen"; //Accent Color
		accent2 = "gray"; //When buttons are toggled off
		accent3 = "lightgreen"; //When buttons are toggled on
		grayAccent = "#454851";
		grayAccentLight = "lightgray";
		
		break;
	  case 1:
		update("aestheticButton", "Aesthetic: Modern")

		background = "lightgray"; //Background Color	
		accent0 = "#222831"; //Main Color
		accent1 = "#393e46"; //Accent Color
		accent2 = "#eeeeee"; //When buttons are toggled off
		accent3 = "#00adb5"; //When buttons are toggled on
		grayAccent = "#768091";
		grayAccentLight = "#eeeeee";
		
	}
	
    update("currentSpeedEmployee", "Current speed: " + gameData.employeeCurrentSpeed + " limes per minute.")
	
	if(gameData.employeeWorking >= 0)
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
			
			"Skills: Can Collect Limes." + "<br>" +
			"Speed: " + gameData.applicantSpeed + "% Of What I'm Taught." + "<br>" +
			"Price: " + gameData.applicantPrice + " Coins." + "<br>" +
			"Wages: " + gameData.applicantWage + " Coins Per Minute." + "<br>" 
				)
		}
		else
		{
			    update("application", "Pin applications here")
		}
		
	    update("speedEmployee", "Speed: " + gameData.employeeSpeed + "% Of What I'm Taught.")
	    update("wageEmployee", "Wages: " + gameData.employeeWage + " Coins Per Minute.")
	
    update("textForCurrentEmployees","Current Employees: " + gameData.employees + " / " + gameData.maxEmployees)
    update("textForCurrentEmployees2", "Current Employees: " + gameData.employees + " / " + gameData.maxEmployees)

    update("textForPeeledLimes", gameData.peeledLimes + " Peeled Limes")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmountToggle + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmountToggle + " Coins")
	update("sellYourJuicePrice", "You Need " + gameData.deliveryPrice + " Coins For Delivery")
    update("sellYourPiesPrice", "Sell A Pie For " + gameData.piePrice + " Coins")
	
	checkShow(gameData.peeledLimes, "textForPeeledLimes")
	checkShow(gameData.coins, "textForCoinsDiv")
	checkShow(gameData.rottenLimes, "textForRottenLimes")
	checkShow(gameData.pies, "textForPies")
	checkShow(gameData.fireLevel, "fire")
	checkShow(gameData.bread, "inventoryBread")
	checkShow(gameData.sugar, "inventorySugar")
	checkShow(gameData.juicers, "inventoryButton")
	checkShow(gameData.coins, "achievementsButton")
	checkShow(gameData.employees, "companyButton")

	moveJuicer()
	moveDelivery()
	moveLearnANewSkill()
	
	moveRottenWisdom()
		update("rottenWisdom", gameData.rottenWisdom + " / 20")
	moveLimebidextrous()
		update("limebidextrous", gameData.limebidextrous + " / 20")
	moveIntelligence()
		update("intelligence", gameData.intelligence + " / 20")	
	moveKnifebidextrous()
		update("knifebidextrous", gameData.knifebidextrous + " / 20")	
	moveEat()
		update("eat", gameData.eat + " / 20")		
		
		
	moveAdvertise()
	moveTeach()

	if(gameData.lookAround >= 1)
	{
			divVisibility ("navigateButtons", "visible")
	}
	
	if(gameData.lookAround >= 2)
	{
			tabs ("sellYourLimesDiv", "block")
	}
	
	if(gameData.lookAround >= 3)
	{
			tabs ("buyAJuicerDiv", "block")

			tabs ("buyAMapDiv", "block")

			document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
	}
	
	if(gameData.learnANewSkill >= 1)
	{
			tabs("rottenWisdomDiv", "block")
	}
	
	if(gameData.learnANewSkill >= 2)
	{
			tabs("limebidextrousDiv", "block")
	}
	
	if(gameData.learnANewSkill >= 3)
	{
		tabs("intelligenceDiv", "block")
		
				if(gameData.tomes == 0)
				{
					document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
					gameData.learnANewSkillBar = 100;
					moveLearnANewSkill()
				}
				else if (gameData.tomes == 1)
				{
					document.getElementById('learnANewSkillButton').style.backgroundColor = '#f29191';					
				}
	}
	
	if(gameData.learnANewSkill >= 4)
	{
			tabs("knifebidextrousDiv", "block")
			gameData.learnANewSkillBar = 100;
			moveLearnANewSkill()
			document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
	}


	if(gameData.maps >= 1)
	{		tabs ("marketMainButton", "inline-block")
			tabs ("marketStoreButton", "inline-block")
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
	{  tabs("inventoryKnife", "block")
		tabs("inventoryKnifeLime", "block")
	}
	if(gameData.sugar >= 1 && gameData.limes >= 1 && gameData.bread >= 1 && gameData.fireLevel >= 1)
	{divVisibility ("pieBake", "visible")
	divVisibility ("pieBakeText", "visible")
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
	if(gameData.hasGottenJuice >= 1)
	{tabs ("textForJuice", "block")
	 tabs ("juiceMarket", "block")
	}
	if(gameData.juicers >= 1)
	{divVisibility ("inventoryButton", "visible")
	}
	if(gameData.juicers >= 2)
	{divVisibility ("makeMaxJuiceButton", "visible")
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
	
}