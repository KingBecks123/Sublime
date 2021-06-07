function startSimulation() {
	
	if (gameData.civiliansPlaced == gameData.civiliansTotal)
	{
	
		for (x = 0; x < 4; x++) {
			
			for (y = 0; y < 4; y++) {
				
				isACivilianThere = (gameData.diseaseArray[x][y])
				
				
				if ( isACivilianThere == 1 || isACivilianThere == 3)
				{
					for (xSpread = x - 1; xSpread < x + 2; xSpread++) {
						
						for (ySpread = y - 1; ySpread < y + 2; ySpread++) {
							
							
							if ((xSpread < 4 && xSpread >= 0 && ySpread < 4 && ySpread >= 0) && !(x == xSpread && y == ySpread))
							{
								if (gameData.diseaseArray[xSpread][ySpread] == 0)
								{
									gameData.diseaseArray[xSpread][ySpread] = 2
									
								}
								else if (gameData.diseaseArray[xSpread][ySpread] == 1)
								{
									gameData.diseaseArray[xSpread][ySpread] = 3
									
								}
							}
							
						}	
						
					}	
					
				}
				
			}	
			
		}	

	}	
	
	gameData.simulationTime = 1
	
updateValues()

}


function checkResults() {
	
	diseaseControlFailed = 0
	for (x = 0; x < 4; x++) {
		
		for (y = 0; y < 4; y++) {
			
			tileType = (gameData.diseaseArray[x][y])
			
			
			if ( tileType == 3)
			{

				diseaseControlFailed = 1
				
			}
			
		}	
		
	}		
	

	if ( gameData.civiliansPlaced == gameData.civiliansTotal && gameData.simulationTime == 1)
	{
		
		gameData.diseaseControlFinished = 1
		diseaseControlReset("hard")		
		
		
		if ( diseaseControlFailed == 0)
		{
			gameData.respect += (gameData.limeDiseaseLakes + 1)
		}
		else
		{
			gameData.respect -= (gameData.limeDiseaseLakes + 1)
		}
	}
	else
	{
		gameData.diseaseControlFinished = 1
		diseaseControlReset("hard")	
		gameData.respect -= (gameData.limeDiseaseLakes + 1)
	}

	
	
updateValues()

}



function mapTile(x, y) {
	
	
	whichButton = "mapTile-" + x + "-" + y
	isACivilianThere = (gameData.diseaseArray[x][y])
	
	if ( gameData.diseaseControlFinished == 0)
	{
		if (isACivilianThere == 0 && gameData.civiliansPlaced < gameData.civiliansTotal)
		{
			gameData.diseaseArray[x][y] = 1
			gameData.civiliansPlaced += 1
		}
		
		else if (isACivilianThere == 1)
		{
			gameData.diseaseArray[x][y] = 0
			gameData.civiliansPlaced -= 1
		}
	}

updateValues()
}

function diseaseControlTask() {
	
	diseaseControlReset("soft")
	gameData.diseaseControlFinished = 0
	gameData.civiliansTotal = beckyRandom(5)
	gameData.respect -= gameData.skepticismCurrent
	
	
	for (gameData.limeDiseaseLakesCurrent = 0; gameData.limeDiseaseLakesCurrent < gameData.limeDiseaseLakes; gameData.limeDiseaseLakesCurrent) {
	
		x = beckyRandom(4) - 1
		y = beckyRandom(4) - 1
		
		if ( gameData.diseaseArray[x][y] !== 4)
		{
		
			gameData.diseaseArray[x][y] = 4
			gameData.limeDiseaseLakesCurrent += 1
		
		}
		
	}

	
	
	updateValues()
}

function diseaseControlReset(type) {
	
	for (x = 0; x < 4; x++) {
		
		for (y = 0; y < 4; y++) {
			
			if (gameData.diseaseArray[x][y] !== 4 || type == "hard")
			{
				gameData.diseaseArray[x][y] = 0
			}
		}		
	}		
gameData.civiliansPlaced = 0
gameData.simulationTime = 0
updateValues()
}

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
	if(gameData.fasterTransport == 0)
	{
		gameData.deliveryTypeToggle = 0
		gameData.deliveryPrice = 2
	}
	else
	{
		gameData.deliveryTypeToggle = 2
		gameData.deliveryPrice = 50
	}
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
	if(gameData.coins >= gameData.employeeWage && gameData.employeeWorking < gameData.employeeWorkingMax)
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
		
		setTimeout(resetWorkingBar, 1000)

	}
	
updateValues()
}

function resetWorkingBar() {
		gameData.workingBar = 0		
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


function buyTome() {
	if(gameData.coins >= 10)
	{
		gameData.coins -= 10
		gameData.tomes = 1
	}
updateValues()
}

function buyARobe() {
	if(gameData.coins >= 1000)
	{
		gameData.coins -= 1000
		gameData.silkRobe = 1
		gameData.respect += 50
	}
updateValues()
}

function unlockDiseaseAreaSwamp() {
	if(gameData.coins >= 10000)
	{
		gameData.coins -= 10000
		gameData.unlockDiseaseAreaSwamp = 1
	}
updateValues()
}


function buyEntrepreneurialCertificate() {
	if(gameData.megaCoins >= 10)
	{
		gameData.megaCoins -= 10
		gameData.entrepreneurialCertificates = 1
	}
updateValues()
}

function increaseCreditScore() {
	if(gameData.megaCoins >= 2)
	{
		gameData.megaCoins -= 2
		gameData.megaCoinsInBankMax = 50
	}
updateValues()
}

function buyMegaCoins() {
	if(gameData.coins >= 1000 && gameData.megaCoinsInBank < gameData.megaCoinsInBankMax)
	{
		gameData.coins -= 1000
		gameData.megaCoinsInBank += 1
	}
updateValues()
}

function buyBigGloves() {
	if(gameData.megaCoins >= 5)
	{
		gameData.megaCoins -= 5
		gameData.bigGloves = 1
	}
updateValues()
}

function hireANutritionist() {
	if(gameData.megaCoins >= 5)
	{
		gameData.megaCoins -= 5
		gameData.nutritionists = 1
	}
updateValues()
}

function travelToNextVillage() {
	if(window.prompt("Are you sure? Type 'yes' if you are") == "yes")
	{
		megaCoinsNow = gameData.megaCoinsInBank
		Object.assign(gameData, gameDataBase)
		gameData.megaCoins = megaCoinsNow
		gameData.villageNumber = 2
		saveGame()		
		location.reload();
	}	
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
	else if(gameData.coins >= 2000 && gameData.maps == 2)
	{
		gameData.coins -= 2000
		gameData.maps = 3
	}
	else if(gameData.coins >= 20000 && gameData.maps == 3)
	{
		gameData.coins -= 20000
		gameData.maps = 4
	}
updateValues()
}

function fasterTransport() {
	if(gameData.coins >= 2000)
	{
		gameData.coins -= 2000
		gameData.fasterTransport = 1
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

function storageUnlock() {
	if(gameData.coins >= 200)
	{
		gameData.coins -= 200
		gameData.storageUnlock = 1
	}
updateValues()
}

function storageJuicersUnlock() {
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
		gameData.storageJuicersUnlock = 1
		gameData.juicersMax *= 5
	}
updateValues()
}

function storagePeelersUnlock() {
	if(gameData.coins >= 100)
	{
		gameData.coins -= 100
		gameData.storagePeelersUnlock = 1
		gameData.peelersMax *= 5
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
	if (gameData.juiceBulkAmountToggle < 500)
		{
			gameData.juiceBulkAmountToggle += 1
		}
			updateValues()
}
	
function decreaseLakes() {
	if(gameData.limeDiseaseLakes > 0 && gameData.diseaseControlFinished == 1)
	{
		gameData.limeDiseaseLakes -= 1
	}
	
updateValues()
}

function increaseLakes() {
	if (gameData.limeDiseaseLakes < 16 && gameData.diseaseControlFinished == 1)
		{
			gameData.limeDiseaseLakes += 1
		}
					updateValues()
}
	
function moveBasket() {
	var elem = document.getElementById("basketBar");
	elem.style.height = gameData.basketBar + "%";
	elem.innerHTML = Math.floor(gameData.basketBar)  + "%";
}

