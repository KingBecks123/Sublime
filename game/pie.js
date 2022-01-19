var pieOvenColor = 0
var juiceInPieBucketLeak = 0
var flourInPieBucketLeak = 0

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

function managePlot() {
	if (gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] == 59) {
		if (gameData.pieCoins >= gameData.nextPlotPrice) {
			gameData.pieCoins -= gameData.nextPlotPrice
			gameData.nextPlotPrice *= 2
			gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] = 0
			hide('plotManagementDiv')
		}
	}
	else {
		gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] = 59
		gameData.nextPlotPrice /= 2
		gameData.pieCoins += gameData.nextPlotPrice
		hide('plotManagementDiv')
	}
	updateFieldTileAesthetic()
}


function fieldTile(x, y) {
	
	var tileType = gameData.wheatFieldArray[x][y]
	var tile = "fieldTile" + x + "-" + y

	if (gameData.selectedWheatItem == 'plot') {
		gameData.selectedPlotX = x
		gameData.selectedPlotY = y

		
		show('plotManagementDiv')
		if(gameData.wheatFieldArray[x][y] == 59) {
			update("plotDetails", "Price: " + gameData.nextPlotPrice.toLocaleString() + " Pie Coins")
			update("managePlot", "Purchase")
		}
		else {
			update("plotDetails", "Sell Price: " + (gameData.nextPlotPrice / 2).toLocaleString() + " Pie Coins")
			update("managePlot", "Sell")
		}
	}
	
	else if(gameData.wheatFieldArray[x][y] == 50) {
		gameData.wheat += 1
		emptyWheatTile(x, y)
	}
	
	else if(tileType >= 51 && tileType <= 54) {		
		if(gameData.selectedWheatItem == 'rotate') {
			if(tileType == 54)
				gameData.wheatFieldArray[x][y] = 51
			else
				gameData.wheatFieldArray[x][y] += 1
		}
		else {
			gameData.seedDrills += 1
			emptyWheatTile(x, y)	
		}
	}
	
	else if (tileType >= 55 && tileType <= 58) {
		if (gameData.selectedWheatItem == 'rotate') {
			if(tileType == 58)
				gameData.wheatFieldArray[x][y] = 55
			else
				gameData.wheatFieldArray[x][y] += 1
			
		}
		else {
			gameData.wheatHarvesters += 1
			emptyWheatTile(x, y)
		}
	}
	
	else if(gameData.selectedWheatItem == 'seed')
		setTileType(1, 'wheatSeeds')
	else if (gameData.selectedWheatItem == 'seedDrill')
		setTileType(51, 'seedDrills')
	else if (gameData.selectedWheatItem == 'harvester')
		setTileType(55, 'wheatHarvesters')
	
	function emptyWheatTile(x, y) {
		gameData.wheatFieldArray[x][y] = 0
		document.getElementById(tile + 'img').src = "images/emptyField.png"
	}

	function setTileType(number, cost) {
		if (gameData.wheatFieldArray[x][y] == 0 && gameData[cost] > 0) {
			gameData.wheatFieldArray[x][y] = number
			gameData[cost] -= 1
		}
	}
	updateFieldTileAesthetic()
}

function updateFieldTileAesthetic() {
	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			var tile = "fieldTile" + x + "-" + y
			var image = document.getElementById(tile + 'img')
			var tileType = gameData.wheatFieldArray[x][y]
			
			if (tileType == 0)
				setImage ('emptyField')
			else if (tileType >= 1 && tileType < 50)
				setImage ('wheatSeed1')
			else if (tileType == 50)
				setImage ('wheatSeed6')
			else if (tileType > 50 && tileType <= 54)
				setImage ('seedDrill')
			else if (tileType > 54 && tileType <= 58)
				setImage ('wheatHarvester')
			else if (tileType == 59)
				setImage ('unpurchasedField')				
				
			if(tileType == 51 || tileType == 55)
				setRotation(90)
			else if(tileType == 52 || tileType == 56)
				setRotation(180)
			else if(tileType == 53 || tileType == 57)
				setRotation(270)
			else
				setRotation(0)
			
			if (tileType == 59)
				document.getElementById(tile).style.backgroundColor = "#66361F"
			else
				document.getElementById(tile).style.backgroundColor = "#DEAD85"
			
			
			function setImage (id) {
				image.src = 'images/' + id + '.png'
			}
			
			function setRotation(number) {
				image.style.transform = 'rotate(' + number + 'deg)'
			}
		}
	}
}

function selectedWheatItem(id) {
	gameData.selectedWheatItem = id
	selectedWheatItemAesthetic(id)
}

function selectedWheatItemAesthetic(id) {
	colorChanger('plotSelectedWheatItem', 'gray')
	colorChanger('seedSelectedWheatItem', 'gray')
	colorChanger('seedDrillSelectedWheatItem', 'gray')
	colorChanger('harvesterSelectedWheatItem', 'gray')
	colorChanger('rotateSelectedWheatItem', 'gray')
	colorChanger(id + 'SelectedWheatItem', '#4DFE89')
}


function updatePieStuffSlow() {
	
	updateFieldTileAesthetic()
	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			
			var tileType = gameData.wheatFieldArray[x][y]

			if(tileType >= 1 && tileType < 50)
				gameData.wheatFieldArray[x][y] += 1
			
			if (tileType == 53 || tileType == 55) {
				xWhere = x
				yWhere = y - 1
			}
			else if(tileType == 54 || tileType == 56) {
				xWhere = x + 1
				yWhere = y
			}
			else if(tileType == 51 || tileType == 57) {
				xWhere = x
				yWhere = y + 1
			}
			else if(tileType == 52 || tileType == 58) {
				xWhere = x - 1
				yWhere = y
			}

			
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
}

function updatePieStuff() {
	
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
	
	checkShow(gameData.hasGottenPies, 'bakeryButton')


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
		
	checkShow(gameData.pieBucket, 'pieBuckets')
	checkShow(!gameData.pieFlourBucket && gameData.pieBucket, 'buyAPieFlourBucket')
	checkShow(gameData.pieBucket && !gameData.pieBucketNozzle, 'buyAPieBucketNozzle')
	checkShow(gameData.mortarAndPestle, 'grindFlour')
	checkShow(gameData.hasSoldPie && !gameData.wheatField, 'buyWheatField')
	checkShow(gameData.hasSoldPie && !gameData.pieEmployee, 'buyPieEmployee')
	checkShow(gameData.doesHavePieMerchant, 'pieMerchant')
	checkShow(gameData.pieFlourBucket && !gameData.pieFlourBucketNozzle, 'buyAPieFlourBucketNozzle')
	checkShow(gameData.pieBucketNozzle, 'bucketHoleChanger')
	checkShow(gameData.pieBucketNozzle && gameData.pieFlourBucketNozzle && !gameData.upgradeNozzles, 'upgradeNozzles')
	
	checkShow(gameData.pieOven && !gameData.pieConveyorBelt, 'buyAPieConveyorBelt')
	checkShow(gameData.pieOven && !gameData.pieBucket, 'buyAPieBucket')
	checkShow(gameData.pieOven && !gameData.bellows, 'buyBellows')

	checkShow(gameData.bellows, 'bellowsDiv')
	
	checkShow(gameData.wheatField, 'fieldButton')
	checkShow(gameData.wheatField, 'buyWheatSeeds')
	checkShow(gameData.wheatField, 'buyAWheatHarvester')
	checkShow(gameData.wheatField, 'buyASeedDrill')
	checkShow(gameData.wheatField && !gameData.pieOven, 'buyPieOven')
	checkShow(gameData.wheatField && !gameData.mortarAndPestle, 'buyMortarAndPestle')
	
	checkShow(gameData.seedDrills || gameData.wheatHarvesters, 'wheatMachines')

	checkShow(gameData.pieEmployee, 'payPieEmployeeDiv')
	checkShow(gameData.pieEmployee && !gameData.advancedPieHiring, 'advancedPieHiring')
	checkShow(gameData.pieEmployee && gameData.advancedPieHiring, 'hirePieMerchantToggleButton')


	
	if (gameData.wheatField)
		show("fieldTile0-0", "inline")
	
	if (gameData.pieFlourBucket) {
		divVisibility('flourBucketProgress', 'visible')
		divVisibility('addToPieFlourBucket', 'visible')
		if (gameData.pieFlourBucketNozzle) {
			divVisibility("flourMinusNozzle", "visible")
			divVisibility("flourPlusNozzle", "visible")
		}
	}
	
	if (gameData.pieOven)
		show("pieOvenDiv", "inline")
	
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
	
	colorChanger('bakePieBar', 'rgba(345, ' + pieOvenColor + ', 0)')
	
	if(gameData.pieConveyorBelt)
		show("pieConveyorBeltOnButton", "inline")
	
	
	if(gameData.wheatHarvesters || gameData.seedDrills)
		gameData.hasGottenFieldTools = 1
	
	if(gameData.hasGottenFieldTools)
		show('fieldPlacementOptions')

	update("wheatNumber", "Wheat: " + gameData.wheat.toLocaleString() + " / 30")
	update("wheatSeedsNumber", "Seeds: " + gameData.wheatSeeds.toLocaleString() + " / 30")
	update("flourNumber", "Flour: " + gameData.flour.toLocaleString() + " / 30")
	update("wheatHarvesterNumber", "Available Wheat Harvesters: " + gameData.wheatHarvesters.toLocaleString())
	update("seedDrillNumber", "Available Seed Drills: " + gameData.seedDrills.toLocaleString())
	update("currentPieIngredients", "Current Ingredients: " + gameData.juiceAsPieIngredient.toLocaleString() + " Juice + " + gameData.flourAsPieIngredient.toLocaleString() + " Flour")
	update("pieEmployeeSalesLeft", "Employee Sales Left: " + gameData.pieEmployeeSalesLeft.toLocaleString() + " / " + gameData.pieMerchantMaxPay.toLocaleString())
	update("payPieEmployee", "Pay Employee " + gameData.pieMerchantPieCoinPrice.toLocaleString() + " Pie Coins & " + gameData.pieMerchantBetaCoinPrice.toLocaleString() + " Beta Coins" )
	update("pieMerchantPieCoinPrice"     , "Pie Coin Wages: "    + gameData.pieMerchantPieCoinPrice.toLocaleString() + ".")
	update("pieMerchantBetaCoinPrice"    , "Beta Coin Wages: "   + gameData.pieMerchantBetaCoinPrice.toLocaleString() + ".")
	update("pieMerchantMaxPay"           , "Max Wage Advances: " + gameData.pieMerchantMaxPay.toLocaleString() + ".")
	update("pieMerchantCharm"            , "Charm: "             + gameData.pieMerchantCharm.toLocaleString() + ".")
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
