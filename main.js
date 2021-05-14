function pieBake() {
	if(gameData.bread >= 1 && gameData.sugar >= 1 && gameData.juice >= 2)
	{
		gameData.bread -= 1
		gameData.sugar -= 1
		gameData.juice -= 2
		gameData.pies += 1
	}
	
updateValues()
}

function sellOnePie() {
	if(gameData.pies >= 1)
	{
		gameData.pies -= 1
		gameData.coins += gameData.piePrice
		divVisibility ("pieCostumer", "hidden")
	}
updateValues()
}


function decreasePiePrice() {
	if(gameData.piePrice >= 1)
	{
		gameData.piePrice -= 1
	}
	divVisibility ("pieCostumer", "hidden")	
updateValues()
}

function increasePiePrice() {
		gameData.piePrice += 1
	divVisibility ("pieCostumer", "hidden")		
updateValues()
}

function sellPie() {
	divVisibility ("pieSelling", "visible")
	divVisibility ("pieCostumer", "hidden")
	setTimeout(pieSelling, 100 * Math.pow(gameData.piePrice, 2) + Math.floor(Math.random() * 1000))
}

function pieSelling() {

	divVisibility ("pieCostumer", "visible")
	setTimeout(sellPie, 1000)
}

function explore() {
    update("newInfo", "You Have Discovered A Nearby Town.")
	divVisibility ("newtownButton", "visible")
	gameData.exploreLevel = 1
updateValues()
}

function getLimes() {
    gameData.limes += gameData.limesPerClick
updateValues()
}

function rubSticks() {
	if(gameData.sticks >= 2)
	{
		gameData.sticks -= 2
		if(	Math.floor(Math.random() * 20) == 0)
		{
			divVisibility ("fire", "visible")
			gameData.fireLevel = 1
		}

	}
updateValues()
}

function buyGloves() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		divVisibility ("textForSticks", "visible")
		divVisibility ("stickButton", "visible")
		tabs ("glovesButton", "none")
		tabs ("glovesInfo", "none")
	}
updateValues()
}

function buyShoes() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		divVisibility ("exploreButton", "visible")
		tabs ("shoesButton", "none")
		tabs ("shoesInfo", "none")
		
	}
updateValues()
}


function getSticks() {
    gameData.sticks += 1
updateValues()
}

function buyBread() {
	if(gameData.coins >= 3)
	{
		gameData.coins -= 3
		gameData.bread += 1
	}
updateValues()
}

function buySugar() {
	if(gameData.coins >= 2)
	{
		gameData.coins -= 3
		gameData.sugar += 1
	}
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
		setTimeout(sellYourJuiceBar, 1000 / gameData.tickspeed)
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
	if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.limes >= 10)
	{
		gameData.limes -= 10
		gameData.juiceBar = 0
		gameData.howMuchJuice = 1
		makeJuiceBar()
	}
	
updateValues()
}

function makeMaxJuice() {
	if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.limes >= 10)
	{
		gameData.howMuchJuice = Math.floor(gameData.limes / 10)
		if(gameData.howMuchJuice > gameData.juicers)
		{
			gameData.howMuchJuice = gameData.juicers
		}
		
		
		gameData.limes -= gameData.howMuchJuice * 10
		gameData.juiceBar = 0;
		makeJuiceBar()
	}
	
updateValues()
}

function makeJuiceBar(juiceAmount) {
	if(gameData.juiceBar <= 99)
	{
		if(gameData.juiceBar <= 99)
		{
		gameData.juiceBar += 1;
		setTimeout(makeJuiceBar, 1000 / gameData.tickspeed)
		moveJuicer()
		}
	}
	else
	{
	gameData.juice += gameData.howMuchJuice;
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
