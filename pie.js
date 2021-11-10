var pieOvenColor = 0
var juiceInPieBucketLeak = 0
var flourInPieBucketLeak = 0

function lookForCustomer(){

	gameData.couldFindCustomer = 1
	gameData.isThereACustomer = 1
	gameData.customerWaitTime = 0
	gameData.isFindingPieCustomers = 0
	update("couldFindCustomer", "Found a customer!")
	update("customerButton", ":)")
	
	if(gameData.pieEmployeeSalesLeft > 0)
	{
		gameData.pieEmployeeSalesLeft -= 1
		sellPieToCustomer()
		
	}


}

function decreasePiePrice() {
	decreaseValue('piePrice')
	changePiePrice()
}

function increasePiePrice() {
	increaseValue('piePrice')
	changePiePrice()
}

function changePiePrice(){
	if(gameData.currentTask = 'findPieCustomers')
		gameData.currentTask = 'none'
	if(gameData.currentTask2 = 'findPieCustomers')
		gameData.currentTask2 = 'none'
	gameData.isFindingPieCustomers = 0
	gameData.findPieCustomersBar = 0
	gameData.isThereACustomer = 0

	moveBar("findPieCustomers")
}

function sellPieToCustomer(){
	if(gameData.isThereACustomer && gameData.pies > 0)
	{
		gameData.isThereACustomer = 0
		gameData.pies -= 1
		gameData.pieCoins += gameData.piePrice
		gameData.hasSoldPie = 1
		update("customerButton", "")
		update("couldFindCustomer", "Sold!")

	}
}

function winnowWheat(){
	if(gameData.wheat)
	{
		gameData.wheat -= 1
		gameData.wheatSeeds += 2
	}
}

function grindFlour(){
	if(gameData.wheatSeeds)
	{
		gameData.wheatSeeds -= 1
		gameData.flour += 1
	}
}

function addPieIngredient(ingredient){
	
	if(gameData[ingredient] > 0)
	{
		gameData[ingredient + 'AsPieIngredient'] += 1
		gameData[ingredient] -= 1
	}
}

function addToPieBucket(ingredient){
	
	if(gameData[ingredient] > 0 && gameData[ingredient + 'InPieBucket'] < 20)
	{
		gameData[ingredient + 'InPieBucket'] += 1
		gameData[ingredient] -= 1
	}
}

function buyAField(){
	if(gameData.pieCoins > 20)
	{
		gameData.pieCoins -= 20
		gameData.wheatFieldXDimension = 2

	}
}

function bucketHoleSize(amount, id){
	
	if (amount == '1' && gameData[id + 'BucketHoleSize'] < 20)
		gameData[id + 'BucketHoleSize'] += 2 - gameData.upgradeNozzles
	else if (amount == '-1' && gameData[id + 'BucketHoleSize'] > 0)
		gameData[id + 'BucketHoleSize'] -= 2 - gameData.upgradeNozzles
	
	
	if (gameData[id + 'BucketHoleSize'] < 0)
		gameData[id + 'BucketHoleSize'] = 0
}

function payPieEmployee(){
	if(gameData.pieCoins > 5 && gameData.pieEmployeeSalesLeft < 10)
	{
		gameData.pieCoins -= 5
		gameData.pieEmployeeSalesLeft += 1
	}
}

function fieldTile(x, y) {
	
	var tileType = gameData.wheatFieldArray[x][y]
	var tile = "fieldTile" + x + "-" + y

	if(gameData.wheatFieldArray[x][y] == 50)
	{
		gameData.wheat += 1
		emptyWheatTile(x, y)
	}
	
	else if(tileType >= 51 && tileType <= 54)
	{		
		if(gameData.selectedWheatItem == 'rotate')
		{
			if(tileType == 54)
				gameData.wheatFieldArray[x][y] = 51
			else
				gameData.wheatFieldArray[x][y] += 1
			
		}
		else
		{
			gameData.seedDrills += 1
			emptyWheatTile(x, y)	
		}
	}
	
	else if(tileType >= 55 && tileType <= 58)
	{
		if(gameData.selectedWheatItem == 'rotate')
		{
			if(tileType == 58)
				gameData.wheatFieldArray[x][y] = 55
			else
				gameData.wheatFieldArray[x][y] += 1
			
		}
		else
		{
			gameData.wheatHarvesters += 1
			emptyWheatTile(x, y)
		}
	}
	
	else if(gameData.selectedWheatItem == 'seed')
	{
		setTileType(1, 'wheatSeeds')
	}
	else if (gameData.selectedWheatItem == 'seedDrill')
	{
		setTileType(51, 'seedDrills')
	}
	else if (gameData.selectedWheatItem == 'harvester')
	{
		setTileType(55, 'wheatHarvesters')
	}
	
	function emptyWheatTile(x, y){
		gameData.wheatFieldArray[x][y] = 0
		document.getElementById(tile + 'img').src = "images/emptyField.png"
	}

	function setTileType(number, cost){
		if(gameData.wheatFieldArray[x][y] == 0 && gameData[cost] > 0)
		{
			gameData.wheatFieldArray[x][y] = number
			gameData[cost] -= 1
		}
	}
	
	updateFieldTileAesthetic()
}

function updateFieldTileAesthetic(){
	
			
	for (var x = 0; x < gameData.wheatFieldXDimension; x++) {
		for (var y = 0; y < gameData.wheatFieldXDimension; y++) {
			
			var tile = "fieldTile" + x + "-" + y
			var image = tile + 'img'
			var tileType = gameData.wheatFieldArray[x][y]

			if(gameData.wheatFieldArray[x][y] >= 1 && gameData.wheatFieldArray[x][y] < 50)
			{
				document.getElementById(image).src = "images/wheatSeed1.png"
			}
			
			else if(gameData.wheatFieldArray[x][y] == 50)
				document.getElementById(image).src = "images/wheatSeed6.png"
			
			else if(tileType > 50 && tileType <= 54)
				document.getElementById(image).src = "images/seedDrill.png"

			else if(tileType > 54 && tileType <= 58)
				document.getElementById(image).src = "images/wheatHarvester.png"
				
			if(tileType == 51 || tileType == 55)
				setRotation(image, 90)
			else if(tileType == 52 || tileType == 56)
				setRotation(image, 180)
			else if(tileType == 53 || tileType == 57)
				setRotation(image, 270)
			else
				setRotation(image, 0)
			
		}
	}
}

function selectedWheatItem(id){
	gameData.selectedWheatItem = id
	selectedWheatItemAesthetic(id)
}

function selectedWheatItemAesthetic(id){
	document.getElementById('seedSelectedWheatItem').style.backgroundColor = 'gray'
	document.getElementById('seedDrillSelectedWheatItem').style.backgroundColor = 'gray'
	document.getElementById('harvesterSelectedWheatItem').style.backgroundColor = 'gray'
	document.getElementById('rotateSelectedWheatItem').style.backgroundColor = 'gray'
	document.getElementById(id + 'SelectedWheatItem').style.backgroundColor = '#4DFE89'
}


function updatePieStuffSlow(){
	
	updateFieldTileAesthetic()
	for (var x = 0; x < gameData.wheatFieldXDimension; x++) {
		for (var y = 0; y < gameData.wheatFieldXDimension; y++) {
			
			var tileType = gameData.wheatFieldArray[x][y]

			if(tileType >= 1 && tileType < 50)
			{
				gameData.wheatFieldArray[x][y] += 1
			}	
			
			if(gameData.wheatSeeds > 0)
			{
				if(tileType == 51 && gameData.wheatFieldArray[x][y + 1] == 0)
				{
					gameData.wheatFieldArray[x][y + 1] = 1
					gameData.wheatSeeds -= 1
				}	
				else if(tileType == 52 && x > 0)
				{
					//Don't move this or it'll check an undefined number :(
					if(gameData.wheatFieldArray[x - 1][y] == 0)
					{
						gameData.wheatFieldArray[x - 1][y] = 1
						gameData.wheatSeeds -= 1
					}
				}
				else if(tileType == 53 && y > 0)
				{
					//Don't move this or it'll check an undefined number :(
					if(gameData.wheatFieldArray[x][y - 1] == 0)
					{
						gameData.wheatFieldArray[x][y - 1] = 1
						gameData.wheatSeeds -= 1
					}
				}	
				else if(tileType == 54 && gameData.wheatFieldArray[x + 1][y] == 0)
				{
					gameData.wheatFieldArray[x + 1][y] = 1
					gameData.wheatSeeds -= 1
				}	
			}



			if(tileType == 55 && y > 0)
			{
				//Don't move this or it'll check an undefined number :(
				if(gameData.wheatFieldArray[x][y - 1] == 50)
				{
					gameData.wheatFieldArray[x][y - 1] = 0
					gameData.wheat += 1
				}
			}	
			else if(tileType == 56 && gameData.wheatFieldArray[x + 1][y] == 50)
			{
				gameData.wheatFieldArray[x + 1][y] = 0
				gameData.wheat += 1
			}	
			else if(tileType == 57 && gameData.wheatFieldArray[x][y + 1] == 50)
			{
				gameData.wheatFieldArray[x][y + 1] = 0
				gameData.wheat += 1
			}	
			else if(tileType == 58 && x > 0)
			{
				//Don't move this or it'll check an undefined number :(
				if(gameData.wheatFieldArray[x - 1][y] == 50)
				{
					gameData.wheatFieldArray[x - 1][y] = 0
					gameData.wheat += 1
				}
			}

			
		}
	}
	
	if(gameData.flourAsPieIngredient > 0 && gameData.juiceAsPieIngredient > 0 && gameData.pieConveyorBeltOn)
		bakePie()
	
	if(gameData.wheatSeeds > 30)
		gameData.wheatSeeds -= 1
	if(gameData.wheat > 30)
		gameData.wheat -= 1
	if(gameData.flour > 30)
		gameData.flour -= 1
}

function updatePieStuff(){
	
	var elem = document.getElementById("juiceBucketBar")
    elem.style.height = gameData.juiceInPieBucket * 5 + "%"
    elem.innerHTML = Math.floor(gameData.juiceInPieBucket * 2.5) + "%"
	
	var elem = document.getElementById("flourBucketBar")
    elem.style.height = gameData.flourInPieBucket * 5 + "%"
    elem.innerHTML = Math.floor(gameData.flourInPieBucket * 2.5) + "%"
	
	var elem = document.getElementById("juiceHoleBar")
    elem.style.width = gameData.juiceBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (gameData.juiceBucketHoleSize * 2.5) + "%"	

	var elem = document.getElementById("flourHoleBar")
    elem.style.width = gameData.flourBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (gameData.flourBucketHoleSize * 2.5) + "%"	




	if(gameData.pies > 0)
		gameData.hasGottenPies = 1
	
	checkShowOrHide(gameData.hasGottenPies, "bakeryButton")

	
	
	if (juiceInPieBucketLeak > 100 / gameData.juiceBucketHoleSize)
	{
		if(gameData.juiceInPieBucket > 0)
			{
			gameData.juiceInPieBucket -= 1
			gameData.juiceAsPieIngredient += 1
		}
		
		juiceInPieBucketLeak = 0
	}
	juiceInPieBucketLeak += 1

	if (flourInPieBucketLeak > 400 / gameData.flourBucketHoleSize)
	{
		if(gameData.flourInPieBucket > 0)
			{
			gameData.flourInPieBucket -= 1
			gameData.flourAsPieIngredient += 1
		}
		
		flourInPieBucketLeak = 0
	}
	flourInPieBucketLeak += 1
	
	
	
	
	
	
	checkShow(gameData.pieBucket, "pieBuckets")
	
	if(gameData.pieFlourBucket)
	{
		divVisibility('flourBucketProgress', 'visible')
		divVisibility('addToPieFlourBucket', 'visible')
		hide("buyAPieFlourBucket")
		
		if(gameData.pieFlourBucketNozzle)
		{
			hide("buyAPieFlourBucketNozzle")
			divVisibility("flourMinusNozzle", "visible")
			divVisibility("flourPlusNozzle", "visible")

		}
		else
			showBasicDiv("buyAPieFlourBucketNozzle")
	}
	else
	{
		
		if(gameData.pieBucket)
			showBasicDiv("buyAPieFlourBucket")
		else
			hide("buyAPieFlourBucket")
		
		

	}


	
	
	if(!gameData.pieBucketNozzle)
		checkShow(gameData.pieBucket, "buyAPieBucketNozzle")
	else
	{
		hide("buyAPieBucketNozzle")
		showBasicDiv("bucketHoleChanger")
		
		if(gameData.pieFlourBucketNozzle && !gameData.upgradeNozzles)
			showBasicDiv("upgradeNozzles")
		else
			hide("upgradeNozzles")


	}

	if(gameData.pieOven)
	{
		hide("buyPieOven")
		
		tabs("pieOvenDiv", "inline-block")
		
		if(!gameData.pieBucket)
			showBasicDiv("buyAPieBucket")
		else
			hide("buyAPieBucket")
		
		if(!gameData.bellows)
			showBasicDiv("buyBellows")
		else
		{
			hide("buyBellows")
			showBasicDiv("bellowsDiv")
		}
	}
	
	if(gameData.bakePieBar !== 100)
	{
		if(beckyRandom(2) == 1)
			pieOvenColor += 10
		else
			pieOvenColor -= 10
		
		if(pieOvenColor > 200)
			pieOvenColor = 200
	
		if(pieOvenColor < 0)
			pieOvenColor = 0
		
	}
	
	document.getElementById('bakePieBar').style.backgroundColor = 'rgba(345, ' + pieOvenColor + ', 66)'
	document.getElementById('bellowsBar').style.backgroundColor = '#99DEFF'

	
	if(!gameData.pieConveyorBelt)
		checkShow(gameData.pieOven, "buyAPieConveyorBelt")
	else
	{
		hide("buyAPieConveyorBelt")
		tabs("pieConveyorBeltOnButton", "inline-block")
	}
	
	
	
	if(gameData.wheatField)
	{
		
		tabs("fieldTile0-0", "inline-block")
		showBasicDiv("fieldButton")
		showBasicDiv("buyWheatSeeds")
		showBasicDiv("buyANewField")
		hide("buyWheatField")
		
		
		if(!gameData.pieOven)
			showBasicDiv("buyPieOven")
		
		if(!gameData.mortarAndPestle)
			showBasicDiv("buyMortarAndPestle")
		else
			hide("buyMortarAndPestle")
		

		showBasicDiv("buyAWheatHarvester")
		showBasicDiv("buyASeedDrill")
		
		if(gameData.seedDrills || gameData.wheatHarvesters)
			showBasicDiv("wheatMachines")


	}
	else
		checkShow(gameData.hasSoldPie, "buyWheatField")
	
	
	
	if(gameData.mortarAndPestle)
		showBasicDiv("grindFlour")
	else
		hide("grindFlour")
	
	if(gameData.pieEmployee)
		hide("buyPieEmployee")
	else
	{
		checkShow(gameData.hasSoldPie, "buyPieEmployee")
		hide("payPieEmployeeDiv")
	}
	
	if(gameData.wheatHarvesters || gameData.seedDrills)
		gameData.hasGottenFieldTools = 1
	
	if(gameData.hasGottenFieldTools)
		showBasicDiv('fieldPlacementOptions')


	
	if(gameData.wheatFieldXDimension == 2)
	{
        tabs("fieldTile1-0", "inline-block")
        tabs("fieldTile0-1", "inline-block")
        tabs("fieldTile1-1", "inline-block")
	}
	
	
	update("wheatNumber", "Wheat: " + gameData.wheat.toLocaleString() + " / 30")
	update("wheatSeedsNumber", "Seeds: " + gameData.wheatSeeds.toLocaleString() + " / 30")
	update("flourNumber", "Flour: " + gameData.flour.toLocaleString() + " / 30")
	
	update("wheatHarvesterNumber", "Available Wheat Harvesters: " + gameData.wheatHarvesters.toLocaleString())
	update("seedDrillNumber", "Available Seed Drills: " + gameData.seedDrills.toLocaleString())

	update("currentPieIngredients", "Current Ingredients: " + gameData.juiceAsPieIngredient.toLocaleString() + " Juice + " + gameData.flourAsPieIngredient.toLocaleString() + " Flour")
	update("pieEmployeeSalesLeft", "Employee Sales Left: " + gameData.pieEmployeeSalesLeft.toLocaleString() + " / 10")

	
	document.getElementById('fullField').style.width = gameData.wheatFieldXDimension * 90 + 10 + 'px'

}