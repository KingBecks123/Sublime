function decreasePiePrice() {
	decreaseValue('piePrice')
	changePiePrice()
}

function increasePiePrice() {
	gameData.piePrice += 1
	changePiePrice()
}

function changePiePrice() {
	if (gameData.currentTask == 'findPieCustomers')
		gameData.currentTask = 'none'
	if (gameData.currentTask2 == 'findPieCustomers')
		gameData.currentTask2 = 'none'
	gameData.findPieCustomersBar = 0
	gameData.isThereACustomer = 0
	updateBar("findPieCustomers")
}

function sellPieToCustomer() {
	if (gameData.isThereACustomer && gameData.pies > 0) {
		gameData.isThereACustomer = 0
		gameData.pies -= 1
		gameData.pieCoins += gameData.piePrice
		gameData.hasSoldPie = 1
		update("customerButton", "")
		update("couldFindCustomer", "Sold!")
	}
}

function winnowWheat() {
	if (gameData.wheat) {
		gameData.wheat -= 1
		gameData.wheatSeeds += 2
	}
}

function grindFlour() {
	if (gameData.wheatSeeds) {
		gameData.wheatSeeds -= 1
		gameData.flour += 1
	}
}

function addPieIngredient(ingredient) {
	if (gameData[ingredient] > 0) {
		gameData[ingredient + 'AsPieIngredient'] += 1
		gameData[ingredient] -= 1
	}
}

function addToPieBucket(ingredient) {
	if (gameData[ingredient] > 0 && gameData[ingredient + 'InPieBucket'] < (gameData.bucketThinSteelPlating * 5 + 20)) {
		gameData[ingredient + 'InPieBucket'] += 1
		gameData[ingredient] -= 1
	}
}

function bucketHoleSize(amount, id) {
	if (amount == '1' && gameData[id + 'BucketHoleSize'] < 20)
		gameData[id + 'BucketHoleSize'] += 2 - gameData.upgradeNozzles
	else if (amount == '-1' && gameData[id + 'BucketHoleSize'] > 0)
		gameData[id + 'BucketHoleSize'] -= 2 - gameData.upgradeNozzles
	
	
	if (gameData[id + 'BucketHoleSize'] < 0)
		gameData[id + 'BucketHoleSize'] = 0
}

function payPieEmployee() {
	if(gameData.pieCoins >= gameData.pieMerchantPieCoinPrice && gameData.betaCoins >= gameData.pieMerchantBetaCoinPrice && gameData.pieEmployeeSalesLeft < gameData.pieMerchantMaxPay) {
		gameData.pieCoins -= gameData.pieMerchantPieCoinPrice
		gameData.betaCoins -= gameData.pieMerchantBetaCoinPrice
		gameData.pieEmployeeSalesLeft += 1
	}
}



function mainGameLoopSlowBakery() {
	
	updateFieldTileAesthetic()
	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			
			var tileType = gameData.wheatFieldArray[x][y]

			if(tileType >= 1 && tileType < 50)
				gameData.wheatFieldArray[x][y] += 1

            xWhere = x
            yWhere = y

			if (tileType == 53 || tileType == 55)
				yWhere --
			else if(tileType == 54 || tileType == 56)
				xWhere ++
			else if(tileType == 51 || tileType == 57)
				yWhere ++
			else if(tileType == 52 || tileType == 58)
				xWhere --

			
			if (tileType >= 51 && tileType <= 54) {
				if (gameData.wheatFieldArray[xWhere][yWhere] == 0 && gameData.wheatSeeds > 0) {
					gameData.wheatFieldArray[xWhere][yWhere] = 1
					gameData.wheatSeeds -= 1
				}
			}
			
			if (tileType >= 55 && tileType <= 58) {
				if (gameData.wheatFieldArray[xWhere][yWhere] == 50) {
					gameData.wheatFieldArray[xWhere][yWhere] = 0
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
	
	if (gameData.isThereACustomer) {
		if (gameData.customerWaitTime < 5)
			update("customerButton", ":)")
		else if (gameData.customerWaitTime >= 5 && gameData.customerWaitTime < 10)
			update("customerButton", ":l")
		else if (gameData.customerWaitTime >= 10 && gameData.customerWaitTime < 15)
			update("customerButton", ":(")
		else if (gameData.customerWaitTime == 15) {
			gameData.isThereACustomer = 0
			gameData.customerWaitTime = 0
			update("customerButton", "  ")
			update("couldFindCustomer", "The customer left")	
		}
	}
	else
		update("customerButton", "  ")
	
	gameData.customerWaitTime += 1

}

function useBellows() {
	if (gameData.bellowsBar < 0.5) {	
		gameData.bellowsBar = 100
		bellowsBar()
	}
	gameData.bellowsBar = 100
	gameData.bellowsCurrentlyBlowing = 1
}

function bellowsBar() {
    if (gameData.bellowsBar > 0) {
        gameData.bellowsBar -= 0.1
		updateBar("bellows")
        setTimeout(bellowsBar, 15)
    } else
		gameData.bellowsCurrentlyBlowing = 0
}

function bakePie() {
    if (gameData.bakePieBar == 0 && gameData.juiceAsPieIngredient > 0 && gameData.flourAsPieIngredient > 0)
        bakePieBar()
}

function bakePieBar() {
    if (gameData.bakePieBar < 100) {
        gameData.bakePieBar += 0.1 * (gameData.bellowsCurrentlyBlowing + 1)
        setTimeout(bakePieBar, 15)
    } else {
		gameData.bakePieBar = 0
		gameData.pies += 1
		gameData.juiceAsPieIngredient = 0
		gameData.flourAsPieIngredient = 0
    }
	updateBar("bakePie")
}

function findPieCustomers() {
    if (gameData.findPieCustomersBar == 0) {		
		update("couldFindCustomer", "Waiting for customers...")		
        findPieCustomersBar()
    }
}

function findPieCustomersBar() {
    if (gameData.findPieCustomersBar < 100) {
		gameData.findPieCustomersBar += 7.5 / (Math.pow(2 - gameData.pieMerchantCharm / 20, gameData.piePrice) + 10)		
		setTimeout(findPieCustomersBar, 15 / gameData.tickspeed)
		
    } else {
		gameData.couldFindCustomer = 1
		gameData.isThereACustomer = 1
		gameData.customerWaitTime = 0
		update("couldFindCustomer", "Found a customer!")
		update("customerButton", ":)")
		
		if (gameData.pieEmployeeSalesLeft > 0) {
			gameData.pieEmployeeSalesLeft -= 1
			sellPieToCustomer()
		}
		gameData.findPieCustomersBar = 0
    }
	updateBar("findPieCustomers")
}

function updateValuesBakery() {
	
	height = gameData.bucketThinSteelPlating * 5 + 20
	
	var elem = document.getElementById("juiceBucketBar")
    elem.style.height = Math.floor((gameData.juiceInPieBucket * 100) / height)  + "%"
    elem.innerHTML = Math.floor((gameData.juiceInPieBucket * 100) / height) + "%"
	
	var elem = document.getElementById("flourBucketBar")
    elem.style.height = Math.floor((gameData.flourInPieBucket * 100) / height)  + "%"
    elem.innerHTML = Math.floor((gameData.flourInPieBucket * 100) / height) + "%"
	
	var elem = document.getElementById("juiceHoleBar")
    elem.style.width = gameData.juiceBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (gameData.juiceBucketHoleSize * 2.5) + "%"	

	var elem = document.getElementById("flourHoleBar")
    elem.style.width = gameData.flourBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (gameData.flourBucketHoleSize * 2.5) + "%"	

	if(gameData.pies > 0)
		gameData.hasGottenPies = 1


	if (juiceInPieBucketLeak > 100 / gameData.juiceBucketHoleSize) {
		if (gameData.juiceInPieBucket > 0) {
			gameData.juiceInPieBucket -= 1
			gameData.juiceAsPieIngredient += 1
		}
		juiceInPieBucketLeak = 0
	}
	juiceInPieBucketLeak += 1

	if (flourInPieBucketLeak > 400 / gameData.flourBucketHoleSize) {
		if (gameData.flourInPieBucket > 0) {
			gameData.flourInPieBucket -= 1
			gameData.flourAsPieIngredient += 1
		}
		
		flourInPieBucketLeak = 0
	}
	flourInPieBucketLeak += 1
	
	if(gameData.bakePieBar !== 100) {
		if(beckyRandom(2) == 1)
			pieOvenColor += 10
		else
			pieOvenColor -= 10
		
		if(pieOvenColor > 255)
			pieOvenColor = 200
	
		if(pieOvenColor < 0)
			pieOvenColor = 0
	}
	
	setColor('bakePieBar', 'rgba(345, ' + pieOvenColor + ', 0)')
	

	
	if(gameData.wheatHarvesters || gameData.seedDrills)
		gameData.hasGottenFieldTools = 1

	basicToggle("sellingPieInfo")
	basicToggle("pieMerchantInfo")
	toggleAesthetic("pieConveyorBeltOn")
	currentTaskAesthetic('findPieCustomers')


    const showHideElements = [
      { condition: gameData.hasGottenPies, element: 'bakeryButton' },
      { condition: gameData.pieBucket, element: 'pieBuckets' },
      { condition: !gameData.pieFlourBucket && gameData.pieBucket, element: 'buyAPieFlourBucket' },
      { condition: gameData.pieBucket && !gameData.pieBucketNozzle, element: 'buyAPieBucketNozzle' },
      { condition: gameData.mortarAndPestle, element: 'grindFlour', display: 'inline' },
      { condition: gameData.hasSoldPie && !gameData.wheatField, element: 'buyWheatField' },
      { condition: gameData.hasSoldPie && !gameData.pieEmployee, element: 'buyPieEmployee' },
      { condition: gameData.doesHavePieMerchant, element: 'pieMerchant' },
      { condition: gameData.pieFlourBucket && !gameData.pieFlourBucketNozzle, element: 'buyAPieFlourBucketNozzle' },
      { condition: gameData.pieBucketNozzle, element: 'bucketHoleChanger' },
      { condition: gameData.pieBucketNozzle && gameData.pieFlourBucketNozzle && !gameData.upgradeNozzles, element: 'upgradeNozzles' },
      { condition: gameData.pieOven && !gameData.pieConveyorBelt, element: 'buyAPieConveyorBelt' },
      { condition: gameData.pieOven && !gameData.pieBucket, element: 'buyAPieBucket' },
      { condition: gameData.pieOven && !gameData.bellows, element: 'buyBellows' },
      { condition: gameData.bellows, element: 'bellowsDiv' },
      { condition: gameData.wheatField, element: 'fieldButton' },
      { condition: gameData.wheatField, element: 'buyWheatSeeds' },
      { condition: gameData.wheatField, element: 'buyAWheatHarvester' },
      { condition: gameData.wheatField, element: 'buyASeedDrill' },
      { condition: gameData.wheatField && !gameData.pieOven, element: 'buyPieOven' },
      { condition: gameData.wheatField && !gameData.mortarAndPestle, element: 'buyMortarAndPestle' },
      { condition: gameData.seedDrills || gameData.wheatHarvesters, element: 'wheatMachines' },
      { condition: gameData.pieEmployee, element: 'payPieEmployeeDiv' },
      { condition: gameData.pieEmployee && !gameData.advancedPieHiring, element: 'advancedPieHiring' },
      { condition: gameData.pieEmployee && gameData.advancedPieHiring, element: 'hirePieMerchantToggleButton' },
      { condition: gameData.pieFlourBucket, element: 'flourBucketProgress', display: 'visible' },
      { condition: gameData.pieFlourBucket, element: 'addToPieFlourBucket', display: 'visible' },
      { condition: gameData.pieFlourBucketNozzle, element: 'flourMinusNozzle', display: 'visible' },
      { condition: gameData.pieFlourBucketNozzle, element: 'flourPlusNozzle', display: 'visible' },
      { condition: gameData.pieOven, element: 'pieOvenDiv', display: 'inline' },
      { condition: gameData.hasGottenFieldTools, element: 'fieldPlacementOptions' },
      { condition: gameData.pieConveyorBelt, element: 'pieConveyorBeltOnButton', display: 'inline' },
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });

    const elementsToUpdate = [
      { element: "wheatNumber", value: "Wheat: " + gameData.wheat.toLocaleString() + " / 30" },
      { element: "wheatSeedsNumber", value: "Seeds: " + gameData.wheatSeeds.toLocaleString() + " / 30" },
      { element: "flourNumber", value: "Flour: " + gameData.flour.toLocaleString() + " / 30" },
      { element: "wheatHarvesterNumber", value: "Available Wheat Harvesters: " + gameData.wheatHarvesters.toLocaleString() },
      { element: "seedDrillNumber", value: "Available Seed Drills: " + gameData.seedDrills.toLocaleString() },
      { element: "currentPieIngredients", value: "Current Ingredients: " + gameData.juiceAsPieIngredient.toLocaleString() + " Juice + " + gameData.flourAsPieIngredient.toLocaleString() + " Flour" },
      { element: "pieEmployeeSalesLeft", value: "Employee Sales Left: " + gameData.pieEmployeeSalesLeft.toLocaleString() + " / " + gameData.pieMerchantMaxPay.toLocaleString() },
      { element: "payPieEmployee", value: "Pay Employee " + gameData.pieMerchantPieCoinPrice.toLocaleString() + " Pie Coins & " + gameData.pieMerchantBetaCoinPrice.toLocaleString() + " Beta Coins" },
      { element: "pieMerchantPieCoinPrice", value: "Pie Coin Wages: " + gameData.pieMerchantPieCoinPrice.toLocaleString() + "." },
      { element: "pieMerchantBetaCoinPrice", value: "Beta Coin Wages: " + gameData.pieMerchantBetaCoinPrice.toLocaleString() + "." },
      { element: "pieMerchantMaxPay", value: "Max Wage Advances: " + gameData.pieMerchantMaxPay.toLocaleString() + "." },
      { element: "pieMerchantCharm", value: "Charm: " + gameData.pieMerchantCharm.toLocaleString() + "." },
      { element: "piePrice", value: "Current Price: " + gameData.piePrice.toLocaleString() + " Pie Coins" },
      { element: "bucketHeight", value: "Current heights: " + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Units" },
      { element: "bucketThinSteelPlatingPrice", value: "Price: " + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Pie Coins" },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });
}