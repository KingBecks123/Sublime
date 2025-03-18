function decreasePiePrice() {
	decreaseValue('piePrice')
	changePiePrice()
}

function increasePiePrice() {
	game.piePrice += 1
	changePiePrice()
}

function changePiePrice() {
	if (game.currentTask == 'findPieCustomers')
		game.currentTask = 'none'
	if (game.currentTask2 == 'findPieCustomers')
		game.currentTask2 = 'none'
	game.findPieCustomersBar = 0
	game.isThereACustomer = 0
	updateBar("findPieCustomers")
}

function sellPieToCustomer() {
	if (game.isThereACustomer && game.pies > 0) {
		game.isThereACustomer = 0
		game.pies -= 1
		game.pieCoins += game.piePrice
		game.hasSoldPie = 1
		update("customerButton", "")
		update("couldFindCustomer", "Sold!")
	}
}

function winnowWheat() {
	if (game.wheat) {
		game.wheat -= 1
		game.wheatSeeds += 2
	}
}

function grindFlour() {
	if (game.wheatSeeds) {
		game.wheatSeeds -= 1
		game.flour += 1
	}
}

function addPieIngredient(ingredient) {
	if (game[ingredient] > 0) {
		game[ingredient + 'AsPieIngredient'] += 1
		game[ingredient] -= 1
	}
}

function addToPieBucket(ingredient) {
	if (game[ingredient] > 0 && game[ingredient + 'InPieBucket'] < (game.bucketThinSteelPlating * 5 + 20)) {
		game[ingredient + 'InPieBucket'] += 1
		game[ingredient] -= 1
	}
}

function bucketHoleSize(amount, id) {
	if (amount == '1' && game[id + 'BucketHoleSize'] < 20)
		game[id + 'BucketHoleSize'] += 2 - game.upgradeNozzles
	else if (amount == '-1' && game[id + 'BucketHoleSize'] > 0)
		game[id + 'BucketHoleSize'] -= 2 - game.upgradeNozzles
	
	
	if (game[id + 'BucketHoleSize'] < 0)
		game[id + 'BucketHoleSize'] = 0
}

function payPieEmployee() {
	if(game.pieCoins >= game.pieMerchantPieCoinPrice && game.betaCoins >= game.pieMerchantBetaCoinPrice && game.pieEmployeeSalesLeft < game.pieMerchantMaxPay) {
		game.pieCoins -= game.pieMerchantPieCoinPrice
		game.betaCoins -= game.pieMerchantBetaCoinPrice
		game.pieEmployeeSalesLeft += 1
	}
}



function mainGameLoopSlowBakery() {
	
	updateFieldTileAesthetic()
	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			
			var tileTypeIndex = game.wheatFieldArray[x][y]
			var tileType;

			if (tileTypeIndex >= 51 && tileTypeIndex <= 54) {
				tileType = 'Seed Drill'
			}
			else if (tileTypeIndex >= 55 && tileTypeIndex <= 58) {
				tileType = 'Wheat Harvester'
			}

			if(tileTypeIndex >= 1 && tileTypeIndex < 50)
				game.wheatFieldArray[x][y] += 1

            xWhere = x
            yWhere = y

			if (tileTypeIndex == 53 || tileTypeIndex == 55)
				yWhere --
			else if(tileTypeIndex == 54 || tileTypeIndex == 56)
				xWhere ++
			else if(tileTypeIndex == 51 || tileTypeIndex == 57)
				yWhere ++
			else if(tileTypeIndex == 52 || tileTypeIndex == 58)
				xWhere --
			
			if (xWhere >= 0 && xWhere < game.wheatFieldArray.length && 
				yWhere >= 0 && yWhere < game.wheatFieldArray[xWhere].length) {

				var affectedTile = game.wheatFieldArray[xWhere][yWhere];
				
				if (tileType == 'Seed Drill') {
					if (affectedTile == 0 && game.wheatSeeds > 0) {
						game.wheatFieldArray[xWhere][yWhere] = 1
						game.wheatSeeds -= 1
					}
				}

				else if (tileType == 'Wheat Harvester') {

					if (affectedTile == 50) {
						game.wheatFieldArray[xWhere][yWhere] = 0
						game.wheat += 1
					}
				}
			}
		}
	}
	
	if(game.flourAsPieIngredient > 0 && game.juiceAsPieIngredient > 0 && game.pieConveyorBeltOn)
		bakePie()
	
	if(game.wheatSeeds > 30)
		game.wheatSeeds -= 1
	if(game.wheat > 30)
		game.wheat -= 1
	if(game.flour > 30)
		game.flour -= 1
	
	if (game.isThereACustomer) {
		if (game.customerWaitTime < 5)
			update("customerButton", ":)")
		else if (game.customerWaitTime >= 5 && game.customerWaitTime < 10)
			update("customerButton", ":l")
		else if (game.customerWaitTime >= 10 && game.customerWaitTime < 15)
			update("customerButton", ":(")
		else if (game.customerWaitTime == 15) {
			game.isThereACustomer = 0
			game.customerWaitTime = 0
			update("customerButton", "  ")
			update("couldFindCustomer", "The customer left")	
		}
	}
	else
		update("customerButton", "  ")
	
	game.customerWaitTime += 1

}

function useBellows() {
	if (game.bellowsBar < 0.5) {	
		game.bellowsBar = 100
		bellowsBar()
	}
	game.bellowsBar = 100
	game.bellowsCurrentlyBlowing = 1
}

function bellowsBar() {
    if (game.bellowsBar > 0) {
        game.bellowsBar -= 0.1
		updateBar("bellows")
        setTimeout(bellowsBar, 15)
    } else
		game.bellowsCurrentlyBlowing = 0
}

function bakePie() {
    if (game.bakePieBar == 0 && game.juiceAsPieIngredient > 0 && game.flourAsPieIngredient > 0)
        bakePieBar()
}

function bakePieBar() {
    if (game.bakePieBar < 100) {
        game.bakePieBar += 0.1 * (game.bellowsCurrentlyBlowing + 1)
        setTimeout(bakePieBar, 15)
    } else {
		game.bakePieBar = 0
		game.pies += 1
		game.juiceAsPieIngredient = 0
		game.flourAsPieIngredient = 0
    }
	updateBar("bakePie")
}

function findPieCustomers() {
    if (game.findPieCustomersBar == 0) {		
		update("couldFindCustomer", "Waiting for customers...")		
        findPieCustomersBar()
    }
}

function findPieCustomersBar() {
    if (game.findPieCustomersBar < 100) {
		game.findPieCustomersBar += 7.5 / (Math.pow(2 - game.pieMerchantCharm / 20, game.piePrice) + 10)		
		setTimeout(findPieCustomersBar, 15 / game.tickspeed)
		
    } else {
		game.couldFindCustomer = 1
		game.isThereACustomer = 1
		game.customerWaitTime = 0
		update("couldFindCustomer", "Found a customer!")
		update("customerButton", ":)")
		
		if (game.pieEmployeeSalesLeft > 0) {
			game.pieEmployeeSalesLeft -= 1
			sellPieToCustomer()
		}
		game.findPieCustomersBar = 0
    }
	updateBar("findPieCustomers")
}

function updateValuesBakery() {
	
	height = game.bucketThinSteelPlating * 5 + 20
	
	var elem = document.getElementById("juiceBucketBar")
    elem.style.height = Math.floor((game.juiceInPieBucket * 100) / height)  + "%"
	
	var elem = document.getElementById("flourBucketBar")
    elem.style.height = Math.floor((game.flourInPieBucket * 100) / height)  + "%"
	
	var elem = document.getElementById("juiceHoleBar")
    elem.style.width = game.juiceBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (game.juiceBucketHoleSize * 2.5) + "%"	

	var elem = document.getElementById("flourHoleBar")
    elem.style.width = game.flourBucketHoleSize * 5 + "%"
	elem.style.right = 50 - (game.flourBucketHoleSize * 2.5) + "%"	

	if(game.pies > 0)
		game.hasGottenPies = 1


	if (juiceInPieBucketLeak > 100 / game.juiceBucketHoleSize) {
		if (game.juiceInPieBucket > 0) {
			game.juiceInPieBucket -= 1
			game.juiceAsPieIngredient += 1
		}
		juiceInPieBucketLeak = 0
	}
	juiceInPieBucketLeak += 1

	if (flourInPieBucketLeak > 400 / game.flourBucketHoleSize) {
		if (game.flourInPieBucket > 0) {
			game.flourInPieBucket -= 1
			game.flourAsPieIngredient += 1
		}
		
		flourInPieBucketLeak = 0
	}
	flourInPieBucketLeak += 1
	
	if(game.bakePieBar !== 100) {
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
	

	
	if(game.wheatHarvesters || game.seedDrills)
		game.hasGottenFieldTools = 1

	basicToggle("sellingPieInfo")
	basicToggle("pieMerchantInfo")
	toggleAesthetic("pieConveyorBeltOn")
	currentTaskAesthetic('findPieCustomers')


    const showHideElements = [
      { condition: game.hasGottenPies, element: 'bakeryButton' },
      { condition: game.pieBucket, element: 'pieBuckets' },
      { condition: !game.pieFlourBucket && game.pieBucket, element: 'buyAPieFlourBucket' },
      { condition: game.pieBucket && !game.pieBucketNozzle, element: 'buyAPieBucketNozzle' },
      { condition: game.mortarAndPestle, element: 'grindFlour', display: 'inline' },
      { condition: game.hasSoldPie && !game.wheatField, element: 'buyWheatField' },
      { condition: game.hasSoldPie && !game.pieEmployee, element: 'buyPieEmployee' },
      { condition: game.doesHavePieMerchant, element: 'pieMerchant' },
      { condition: game.pieFlourBucket && !game.pieFlourBucketNozzle, element: 'buyAPieFlourBucketNozzle' },
      { condition: game.pieBucketNozzle, element: 'bucketHoleChanger' },
      { condition: game.pieBucketNozzle && game.pieFlourBucketNozzle && !game.upgradeNozzles, element: 'upgradeNozzles' },
      { condition: game.pieOven && !game.pieConveyorBelt, element: 'buyAPieConveyorBelt' },
      { condition: game.pieOven && !game.pieBucket, element: 'buyAPieBucket' },
      { condition: game.pieOven && !game.bellows, element: 'buyBellows' },
      { condition: game.bellows, element: 'bellowsDiv' },
      { condition: game.wheatField, element: 'fieldButton' },
      { condition: game.wheatField, element: 'buyWheatSeeds' },
      { condition: game.wheatField, element: 'buyAWheatHarvester' },
      { condition: game.wheatField, element: 'buyASeedDrill' },
      { condition: game.wheatField && !game.pieOven, element: 'buyPieOven' },
      { condition: game.wheatField && !game.mortarAndPestle, element: 'buyMortarAndPestle' },
      { condition: game.seedDrills || game.wheatHarvesters, element: 'wheatMachines' },
      { condition: game.pieEmployee, element: 'payPieEmployeeDiv' },
      { condition: game.pieEmployee && !game.advancedPieHiring, element: 'advancedPieHiring' },
      { condition: game.pieEmployee && game.advancedPieHiring, element: 'hirePieMerchantToggleButton' },
      { condition: game.pieFlourBucket, element: 'flourBucketProgress', display: 'visible' },
      { condition: game.pieFlourBucket, element: 'addToPieFlourBucket', display: 'visible' },
      { condition: game.pieFlourBucketNozzle, element: 'flourMinusNozzle', display: 'visible' },
      { condition: game.pieFlourBucketNozzle, element: 'flourPlusNozzle', display: 'visible' },
      { condition: game.pieOven, element: 'pieOvenDiv', display: 'inline' },
      { condition: game.hasGottenFieldTools, element: 'fieldPlacementOptions' },
      { condition: game.pieConveyorBelt, element: 'pieConveyorBeltOnButton', display: 'inline' },
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });

    const elementsToUpdate = [
      { element: "wheatNumber", value: "Wheat: " + game.wheat.toLocaleString() + " / 30" },
      { element: "wheatSeedsNumber", value: "Seeds: " + game.wheatSeeds.toLocaleString() + " / 30" },
      { element: "flourNumber", value: "Flour: " + game.flour.toLocaleString() + " / 30" },
      { element: "wheatHarvesterNumber", value: "Available Wheat Harvesters: " + game.wheatHarvesters.toLocaleString() },
      { element: "seedDrillNumber", value: "Available Seed Drills: " + game.seedDrills.toLocaleString() },
      { element: "currentPieIngredients", value: "Current Ingredients: " + game.juiceAsPieIngredient.toLocaleString() + " Juice + " + game.flourAsPieIngredient.toLocaleString() + " Flour" },
      { element: "pieEmployeeSalesLeft", value: "Employee Sales Left: " + game.pieEmployeeSalesLeft.toLocaleString() + " / " + game.pieMerchantMaxPay.toLocaleString() },
      { element: "payPieEmployee", value: "Pay Employee " + game.pieMerchantPieCoinPrice.toLocaleString() + " Pie Coins & " + game.pieMerchantBetaCoinPrice.toLocaleString() + " Beta Coins" },
      { element: "pieMerchantPieCoinPrice", value: "Pie Coin Wages: " + game.pieMerchantPieCoinPrice.toLocaleString() + "." },
      { element: "pieMerchantBetaCoinPrice", value: "Beta Coin Wages: " + game.pieMerchantBetaCoinPrice.toLocaleString() + "." },
      { element: "pieMerchantMaxPay", value: "Max Wage Advances: " + game.pieMerchantMaxPay.toLocaleString() + "." },
      { element: "pieMerchantCharm", value: "Charm: " + game.pieMerchantCharm.toLocaleString() + "." },
      { element: "piePrice", value: "Current Price: " + game.piePrice.toLocaleString() + " Pie Coins" },
      { element: "bucketHeight", value: "Current heights: " + (game.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Units" },
      { element: "bucketThinSteelPlatingPrice", value: "Price: " + (game.bucketThinSteelPlating * 5 + 20).toLocaleString() + " Pie Coins" },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });
}