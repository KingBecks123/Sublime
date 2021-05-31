function updateAfterLoad(){

		restartBar("learnANewSkill")
		restartBar("rottenWisdom")
		restartBar("limebidextrous")
		restartBar("knifebidextrous")
		restartBar("intelligence")
		restartBar("juicer")		
		restartBar("peeler")
		restartBar("advertise")

		basketBar()

			if(gameData.deliveryBar <= 99 && gameData.deliveryBar != 0)
		{
			sellYourJuiceBar()
		}

updateValues()
}

function updateValues() {
	
	addAesthetic()
	
    updateNumber("lime")
    updateNumberSpecial("rottenLime", "Rotten Lime")
	
	//updateNumber("textForLimes", gameData.limes + " Limes")
    //update("textForRottenLimes", gameData.rottenLimes + " Rotten Limes")
	
	switch (gameData.showBarPercent) {
	  case 0:
	  update("barPercentButton", "Bar Percent Hidden")

	  var x = document.getElementsByClassName("skillBar");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color =  "rgba(0, 0, 0, 0)";
	  }
	  var x = document.getElementsByClassName("verticalBar");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color =  "rgba(0, 0, 0, 0)";
	  }
	  
	
		break;
	  case 1:
	  update("barPercentButton", "Bar Percent Shown")
	  var x = document.getElementsByClassName("skillBar");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color = accent0;
	  }
	  var x = document.getElementsByClassName("verticalBar");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style.padding = "0px 0px 0px 0px";
		x[i].style.color = accent0;
	  }
	  

	}	
	
	gameData.limesInBaskets = Math.floor(gameData.baskets * (gameData.basketBar / 20))
	
    update("textForSticks", gameData.sticks + " Sticks")
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("textForPies", gameData.pies + " Pies")
	
    update("juicersAmount", gameData.juicers + " Juicers")
    update("peelersAmount", gameData.peelers + " Peelers")

    update("basketsAmount", gameData.baskets + " / " + gameData.maxBaskets + " Baskets")
    update("maxBaskets", gameData.maxBaskets + " baskets fit under the current tree.")
	
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
		update("intelligence", gameData.intelligence + "% Faster")	
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
			tabs("rottenWisdomDiv", "block")
	}
	
	if(gameData.learnANewSkill >= 2)
	{
			tabs("limebidextrousDiv", "block")
	}
	
	if(gameData.tomes >= 1){
		tabs ("tomeDiv", "none")
	}
	
	if(gameData.learnANewSkill >= 3)
	{
		tabs("intelligenceDiv", "block")
		
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
			tabs("knifebidextrousDiv", "block")
			gameData.learnANewSkillBar = 100;
			document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
	}


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
	if(gameData.coins >= 100)
	{ 
		document.getElementById('coinsAchievement3').style.backgroundColor = 'lime';
		gameData.achievement3 = 1
	}

	moveBar("learnANewSkill")

}