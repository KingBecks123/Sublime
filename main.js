function gameStart(){
	var cheatNum = 0;
	gameData.limes += cheatNum * 100000
	gameData.juice += cheatNum * 100000
	gameData.juicers += cheatNum * 100000
	gameData.coins += cheatNum * 100000
	updateValues()
}



function getLimes() {
    gameData.limes += 1
	
	
updateValues()
}

function sellYourLimes() {
	if(gameData.limes >= 100)
	{
		gameData.limes -= 100
		gameData.coins += 1
		divVisibility ("textForCoinsDiv", "visible")
	}
	
updateValues()
}

function buyAJuicer() {
	if(gameData.coins >= 1)
	{
		gameData.coins -= 1
		gameData.juicers += 1
		divVisibility ("inventoryButton", "visible")
	}
	
updateValues()
}

function sellYourJuice() {
	if((gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins > 0 && gameData.juice >= gameData.juiceBulkAmount)
	{
		gameData.coins -= 1
		gameData.juice -= gameData.juiceBulkAmount
		gameData.deliveryBar = 0;
		sellYourJuiceBar()
	}
	
updateValues()
}

function sellYourJuiceBar() {
	if(gameData.deliveryBar <= 99.9)
	{
		if(gameData.deliveryBar <= 99.9)
		{
		gameData.deliveryBar += 0.1;
		setTimeout(sellYourJuiceBar, 10)
		moveDelivery()
		}
	}
	else
	{
	gameData.coins += gameData.juiceBulkAmount
	}
updateValues()
}

function makeJuice() {
	if((gameData.juiceBar >= 99.9 || gameData.juiceBar == 0) && gameData.limes >= 10)
	{
		gameData.limes -= 10
		gameData.juiceBar = 0;
		makeJuiceBar()
	}
	
updateValues()
}

function makeJuiceBar() {
	if(gameData.juiceBar <= 99.9)
	{
		if(gameData.juiceBar <= 99.9)
		{
		gameData.juiceBar += 0.1;
		setTimeout(makeJuiceBar, 10)
		moveJuicer()
		}
	}
	else
	{
	gameData.juice += 1
	}
updateValues()
}

function decreaseJuiceSold() {
	if(gameData.juiceBulkAmount >= 1)
	{
		gameData.juiceBulkAmount -= 1
	}
	
updateValues()
}

function increaseJuiceSold() {
	
		gameData.juiceBulkAmount += 1
	
updateValues()
}
