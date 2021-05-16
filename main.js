function randomizeApplication() {
		gameData.applicantSpeed = (Math.floor(Math.random() * 10) * 10)
		gameData.applicantPrice = Math.floor(Math.random() * 100)
		gameData.applicantWage = Math.floor(Math.random() * 9) + 1

updateValues()
}

function deliveryToggleStandard() {
	gameData.deliveryTypeToggle = 0
	gameData.deliveryPrice = 1
updateValues()
}

function deliveryToggleExpress() {
	gameData.deliveryTypeToggle = 1
	gameData.deliveryPrice = 3
updateValues()
}

function payEmployee() {
	if(gameData.coins >= gameData.employeeWageOne)
	{
		gameData.employeeWorkingOne += 1
		gameData.coins -= gameData.employeeWageOne
		working()
	}
	
updateValues()
}

function hireApplicant() {
	if(gameData.coins >= gameData.applicantPrice && gameData.applicationReady == 1)
	{
		gameData.applicationReady = 0
		gameData.coins -= gameData.applicantPrice
		gameData.employees += 1
		
		    gameData.employeeSpeed = gameData.applicantSpeed
			gameData.employeePrice = gameData.applicantPrice
			gameData.employeeWage = gameData.applicantWage

	}
	
updateValues()
}

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

function researchBetterAdvertising() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		tabs ("advertisingMethods", "block")
		tabs ("researchBetterAdvertising", "none")
	}
updateValues()
}

function advertisingBillboard() {
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
		gameData.advertisingSpeed *= 3
		tabs ("advertisingBillboard", "none")
	}
updateValues()
}

function advertisingLeaflets() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		gameData.advertisingSpeed *= 2
		tabs ("advertisingLeaflets", "none")
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
	
		if(Math.floor((Math.random() * 20) / gameData.rottenWisdom) == 0 || difficulty == 1)
		{
			if(Math.floor((Math.random() * 20) / gameData.limebidextrous) == 0)
				{
					gameData.limes += gameData.limesPerClick
					if(gameData.teachBar > 0 && gameData.teachBar < 100)
					{
						gameData.employeeCurrentSpeedOne += (gameData.limesPerClick * gameData.workerSpeed) / 10
					}
				}
			gameData.limes += gameData.limesPerClick
			if(gameData.teachBar > 0 && gameData.teachBar < 100)
			{
				gameData.employeeCurrentSpeedOne += (gameData.limesPerClick * gameData.workerSpeed) / 10
			}
		}
		else
		{
			gameData.rottenLimes += 1
		}		
updateValues()
}

function peelLime() {
	if(gameData.limes >= 1)
	{
		gameData.limes -= 1
			if(Math.floor((Math.random() * 20) / gameData.knifebidextrous) == 0)
				{
					gameData.peeledLimes += 1
					gameData.limes -= 1
				}
			gameData.peeledLimes += 1
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
		tabs ("glovesDiv", "none")
	}
updateValues()
}

function buyTome() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		gameData.tomes = 1
		tabs ("tomeButton", "none")
		tabs ("tomeInfo", "none")
		tabs ("tomePrice", "none")
	}
updateValues()
}

function lookAround() {
	if(gameData.lookAround == 0)
	{
		gameData.lookAroundNumber += 1
		
		if(gameData.lookAroundNumber == 10 || difficulty >= 1)
		{
			update("newInfo", "You see a nearby market.")
			gameData.lookAround = 1
			//document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
	else if(gameData.lookAround == 1)
	{
		if(Math.floor(Math.random() * 10) == 0 || difficulty >= 1)
		{
			update("newInfo", "You find a merchant willing to buy limes.")
			gameData.lookAround = 2
			//document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
	else if(gameData.lookAround == 2)
	{
		if(Math.floor(Math.random() * 10) == 0 || difficulty >= 1)
		{
			update("newInfo", "You find a merchant selling various items.")
			gameData.lookAround = 3
			document.getElementById('lookAroundButton').style.backgroundColor = 'darkGray';
		}
	}
updateValues()
}

function buyAMap() {
	if(gameData.coins >= 20)
	{
		if(gameData.maps == 0)
		{
			gameData.coins -= 20
			gameData.maps = 1
		}
		else if(gameData.maps == 1)
		{
			gameData.coins -= 20
			gameData.maps = 2
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
	gameData.limeTypeToJuice = 0
updateValues()
}

function juicePeeledLimesToggle() {
	gameData.limeTypeToJuice = 1
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
		gameData.coins += 1 + (difficulty * 100)
	}
	
updateValues()
}

function buyAJuicer() {
	if(gameData.coins >= 1)
	{
		gameData.coins -= 1
		gameData.juicers += 1
	}
	
updateValues()
}

function decreaseJuiceSold() {
	if(gameData.juiceBulkAmountToggle >= 1)
	{
		gameData.juiceBulkAmountToggle -= 1
	}
	
updateValues()
}

function increaseJuiceSold() {
	
		gameData.juiceBulkAmountToggle += 1
	
updateValues()
}
