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
	
		if(Math.floor((Math.random() * 100) / gameData.rottenWisdom) == 0)
		{
			if(Math.floor((Math.random() * 100) / gameData.limebidextrous) == 0)
			{
			gameData.limes += gameData.limesPerClick
			}
			gameData.limes += gameData.limesPerClick
		}
		else
		{
			gameData.rottenLimes += gameData.limesPerClick
		}
		
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
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
		divVisibility ("textForSticks", "visible")
		divVisibility ("stickButton", "visible")
		tabs ("glovesButton", "none")
		tabs ("glovesInfo", "none")
	}
updateValues()
}

function lookAround() {
	if(gameData.lookAround == 0)
	{
		gameData.lookAroundNumber += 1
		
		if(gameData.lookAroundNumber == 10 || difficulty >= 1)
		{
			divVisibility ("navigateButtons", "visible")
			update("newInfo", "You see a nearby market.")
			gameData.lookAround = 1
			//document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
	else if(gameData.lookAround == 1)
	{
		if(Math.floor(Math.random() * 10) == 0 || difficulty >= 1)
		{
			tabs ("sellYourLimesButton", "block")
			tabs ("sellYourLimesAmount", "block")
			tabs ("sellYourLimesReward", "block")
			update("newInfo", "You find a merchant willing to buy limes.")
			gameData.lookAround = 2
			//document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
	else if(gameData.lookAround == 2)
	{
		if(Math.floor(Math.random() * 10) == 0 || difficulty >= 1)
		{
			tabs ("knifeButton", "block")
			tabs ("knifeInfo", "block")
			tabs ("glovesInfo", "block")
			tabs ("glovesButton", "block")
			tabs ("shoesButton", "block")
			tabs ("shoesInfo", "block")
			tabs ("buyAJuicerButton", "block")
			tabs ("buyAJuicerPrice", "block")
			update("newInfo", "You find a merchant selling various items.")
			gameData.lookAround = 3
			document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
updateValues()
}

function buyShoes() {
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
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

function juiceLimesToggle() {
    document.getElementById('juiceLimesToggleButton').style.backgroundColor = 'lime';
    document.getElementById('juicePeeledLimesToggleButton').style.backgroundColor = 'gray';
	gameData.limeTypeToJuice = 0
updateValues()
}

function juicePeeledLimesToggle() {
    document.getElementById('juicePeeledLimesToggleButton').style.backgroundColor = 'lime';
    document.getElementById('juiceLimesToggleButton').style.backgroundColor = 'gray';
	gameData.limeTypeToJuice = 1
updateValues()
}

function peelLime() {
	if(gameData.limes >= 1)
	{
		gameData.limes -= 1
		gameData.peeledLimes += 1
		tabs ("textForPeeledLimes", "inline-block")
	}
updateValues()
}


function buyKnife() {
	if(gameData.coins >= 2)
	{
		gameData.coins -= 2
		gameData.knife += 1
		tabs ("knifeButton", "none")
		tabs ("knifeInfo", "none")
	}
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
