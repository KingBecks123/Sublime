function updateValues() {
    update("textForLimes", gameData.limes + " Limes")
    update("textForRottenLimes", gameData.rottenLimes + " Rotten Limes")
    update("textForSticks", gameData.sticks + " Sticks")
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("inventoryBread", gameData.bread + " Bread")
    update("inventorySugar", gameData.sugar + " Sugar")
    update("textForPies", gameData.pies + " Pies")
    update("juicersAmount", gameData.juicers + " Juicers")
    update("textForPeeledLimes", gameData.peeledLimes + " Peeled Limes")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmount + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmount + " Coins")
    update("sellYourPiesPrice", "Sell A Pie For " + gameData.piePrice + " Coins")
    update("limebidextrous", gameData.limebidextrous + " / 100")
    update("rottenWisdom", gameData.rottenWisdom + " / 100")
    update("intelligence", gameData.intelligence + " / 100")	

	checkShow(gameData.coins, "textForCoinsDiv")
	checkShow(gameData.rottenLimes, "textForRottenLimes")
	checkShow(gameData.pies, "textForPies")
	checkShow(gameData.fireLevel, "fire")
	checkShow(gameData.bread, "inventoryBread")
	checkShow(gameData.sugar, "inventorySugar")
	checkShow(gameData.juicers, "inventoryButton")
	checkShow(gameData.coins, "achievementsButton")

	if(gameData.peeledLimes >= 1)
	{divVisibility ("textForPeeledLimes", "inline-block")
	tabs ("juiceLimesToggleButton", "inline-block")
	tabs ("juicePeeledLimesToggleButton", "inline-block")
	}
	if(gameData.knife >= 1)
	{  tabs("inventoryKnife", "inline-block")
		tabs("inventoryKnifeLime", "inline-block")
	}
	if(gameData.sugar >= 1 && gameData.limes >= 1 && gameData.bread >= 1 && gameData.fireLevel >= 1)
	{divVisibility ("pieBake", "visible")
	divVisibility ("pieBakeText", "visible")
	}
	if(gameData.exploreLevel >= 1)
	{update("newInfo", "You have discovered a nearby town.")
	divVisibility ("newtownButton", "visible")
	}

	if(gameData.sticks >= 2)
	{tabs ("stickRub", "block")
	tabs ("textForSticks", "block")
	tabs ("stickButton", "block")
	}
	if(gameData.juice >= 1)
	{divVisibility ("textForJuice", "visible")
	 tabs ("juiceMarket", "inline-block")
	}
	if(gameData.juicers >= 2)
	{divVisibility ("makeMaxJuice", "visible")
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