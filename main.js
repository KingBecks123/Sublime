function randomizeApplication() {
	if(gameData.firstApplicant == 1)
	{
		gameData.applicantSpeed = 100
		gameData.applicantPrice = 0
		gameData.applicantWage = 5
		gameData.applicantHunger = 1
		
		gameData.firstApplicant = 0
	}
	else
	{
		gameData.applicantSpeed = (Math.floor(Math.random() * 10 + 1) * 100)
		gameData.applicantPrice = Math.floor(Math.random() * 200)
		gameData.applicantWage = Math.floor(Math.random() * 16) + 5
		gameData.applicantHunger = Math.floor(Math.random() * 20) + 1
	}


updateValues()
}

function deliveryToggleStandard() {
	gameData.deliveryTypeToggle = 0
	gameData.deliveryPrice = 2
updateValues()
}

function deliveryToggleExpress() {
	gameData.deliveryTypeToggle = 1
	gameData.deliveryPrice = 5
updateValues()
}

function foodToggleLimes() {
	gameData.foodTypeToggle = 0
updateValues()
}

function foodToggleRottenLimes() {
	gameData.foodTypeToggle = 1
updateValues()
}


function payEmployee() {
	if(gameData.coins >= gameData.employeeWage)
	{
		gameData.employeeWorking += 1
		gameData.coins -= gameData.employeeWage
		working()
	}
	
updateValues()
}

function hireApplicant() {
	if(gameData.coins >= gameData.applicantPrice && gameData.applicationReady == 1)
	{
		gameData.applicationReady = 0
		gameData.employeeWorking = 0
		gameData.workingBar = 0		
		
		gameData.coins -= gameData.applicantPrice

		gameData.employeeHunger = gameData.applicantHunger
		gameData.employeeSpeed = gameData.applicantSpeed
		gameData.employeePrice = gameData.applicantPrice
		gameData.employeeWage = gameData.applicantWage
		
		gameData.employeeCurrentSpeed = - (gameData.employeeHunger * 60)		
		
		gameData.employees = 1

	}
	
updateValues()
}


function researchBetterAdvertising() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		gameData.advertisingLevel1 = 1
	}
updateValues()
}

function advertisingLeaflets() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		gameData.advertisingLevel2 = 1		
		
		gameData.advertisingSpeed *= 2
	}
updateValues()
}

function advertisingBillboard() {
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
		gameData.advertisingLevel3 = 1
		
		gameData.advertisingSpeed *= 3
	}
updateValues()
}



function getLimes() {
	
		if(Math.random() <= (gameData.rottenWisdom / 100))
		{
			if(Math.random() <= (gameData.limebidextrous / 100))
				{
					gameData.limes += gameData.limesPerClick
					if(gameData.teachBar > 0 && gameData.teachBar < 100)
					{
						gameData.employeeCurrentSpeed += (gameData.limesPerClick * gameData.employeeSpeed) / 10
					}
				}
			gameData.limes += gameData.limesPerClick
			if(gameData.teachBar > 0 && gameData.teachBar < 100)
			{
				gameData.employeeCurrentSpeed += (gameData.limesPerClick * gameData.employeeSpeed) / 10
			}
		}
		else
		{
			gameData.rottenLimes += gameData.limesPerClick
		}		
updateValues()
}

function peelLime() {
	if(gameData.limes >= 1)
	{
		gameData.limes -= 1
			if(Math.floor((Math.random() * 40) / gameData.knifebidextrous) == 0)
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
	}
updateValues()
}

function lookAround() {
	
	gameData.lookAroundNumber += 1	
	
	if(gameData.lookAround == 0)
	{
		if(gameData.lookAroundNumber == 10 || gameData.difficulty >= 1)
		{
			update("newInfo", "You see a nearby market.")
			gameData.lookAround = 1

		}
	}
	else if(gameData.lookAround == 1)
	{
		if(gameData.lookAroundNumber == 20 || gameData.difficulty >= 1)
		{
			update("newInfo", "You find a merchant willing to buy limes.")
			gameData.lookAround = 2

		}
	}
	else if(gameData.lookAround == 2)
	{
		if(gameData.lookAroundNumber == 30 || gameData.difficulty >= 1)
		{
			update("newInfo", "You find a merchant selling various items.")
			gameData.lookAround = 3
		}
	}
updateValues()
}

function buyAMap() {
	if(gameData.coins >= 20 && gameData.maps == 0)
	{
		gameData.coins -= 20
		gameData.maps = 1
	}
	else if(gameData.coins >= 200 && gameData.maps == 1)
	{
		gameData.coins -= 200
		gameData.maps = 2
	}
updateValues()
}

function bulkBuyUnlock() {
	if(gameData.coins >= 1000)
	{
		gameData.coins -= 1000
		gameData.bulkBuyUnlock = 1
	}
updateValues()
}

function bulkBuyJuicersUnlock() {
	if(gameData.coins >= 200)
	{
		gameData.coins -= 200
		gameData.bulkBuyJuicersUnlock = 1
	}
updateValues()
}

function bulkBuyPeelersUnlock() {
	if(gameData.coins >= 200)
	{
		gameData.coins -= 200
		gameData.bulkBuyPeelersUnlock = 1
	}
updateValues()
}

function bulkBuyBasketsUnlock() {
	if(gameData.coins >= 200)
	{
		gameData.coins -= 200
		gameData.bulkBuyBasketsUnlock = 1
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

function juiceLimesToggle() {
	gameData.limeTypeToJuice = 0
updateValues()
}

function juicePeeledLimesToggle() {
	gameData.limeTypeToJuice = 1
updateValues()
}

function sellYourLimes() {
	if(gameData.limes >= 50)
	{
		gameData.limes -= 50
		gameData.coins += 1
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
	if (gameData.juiceBulkAmountToggle < 1000)
		{
			gameData.juiceBulkAmountToggle += 1
			updateValues()
		}
}
	
function moveBasket() {
	var elem = document.getElementById("basketBar");
	elem.style.height = gameData.basketBar + "%";
	elem.innerHTML = Math.floor(gameData.basketBar)  + "%";
}

