addMainTabs([
	{
		id: 'field',
		text: 'Field',
		color1: 'C67848',
		color2: '964D1A'
	}
]);

fieldPlacementOptions = [
	{
		id: 'plot', 
		text: 'Manage Plot'
	},
	{
		id: 'seed', 
		text: 'Seed'
	},	
	{
		id: 'seedDrill', 
		text: 'Seed Drill'
	},	
	{
		id: 'harvester', 
		text: 'Harvester'
	},	
	{
		id: 'rotate', 
		text: 'Rotate'
	},	
]

showPlotManagementDiv = false

addGameVariables({
	wheatField: 0,
	wheat: 0,
	wheatSeeds: 0,
	wheatFieldArray: [
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59]
	],
	mortarAndPestle: 0,
	flour: 0,
	pieOven: 0,
	bakePieBar: 0,
	juiceAsPieIngredient: 0,
	flourAsPieIngredient: 0,
	advancedPieHiring: 0,

	wheatHarvesters: 0,
	seedDrills: 0,
	hasGottenFieldTools: 0,

	selectedWheatItem: 'seed',
	nextPlotPrice: 4,
	sellPlotPrice: 0,
	selectedPlotX: 0,
	selectedPlotY: 0,
});

function onLoadField () {
	for (let y = 0; y < 5; y++) {	
		for (let x = 0; x < 5; x++) {	
			document.getElementById('fullField').innerHTML += '<button ondragstart="return false;" id="fieldTile' + x + '-' + y + '" onclick="fieldTile(' + x + ', ' + y + ')">‎‏‏‎<img style="width:70px;height:70px;" id="fieldTile' + x + '-' + y + 'img" src="assets/emptyField.png"></button>'
		}
	}

	for (let i = 0; i < fieldPlacementOptions.length; i++) {
		document.getElementById('fieldPlacementOptions').innerHTML += '<button class="specialButton" style="background-color:gray;width:168px" id="' + fieldPlacementOptions[i].id + 'SelectedWheatItem" onclick="selectedWheatItem(&#39' + fieldPlacementOptions[i].id + '&#39)">' + fieldPlacementOptions[i].text + '</button>'
	}
	
	
	selectedWheatItemAesthetic(gameData.selectedWheatItem)
	updateFieldTileAesthetic()
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

function managePlot() {
	if (gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] == 59) {
		if (gameData.pieCoins >= gameData.nextPlotPrice) {
			gameData.pieCoins -= gameData.nextPlotPrice
			gameData.nextPlotPrice *= 2
			gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] = 0
			showPlotManagementDiv = false
		}
	}
	else {
		gameData.wheatFieldArray[gameData.selectedPlotX][gameData.selectedPlotY] = 59
		gameData.nextPlotPrice /= 2
		gameData.pieCoins += gameData.nextPlotPrice
		showPlotManagementDiv = false
	}
	updateFieldTileAesthetic()
}


function fieldTile(x, y) {
	
	var tileType = gameData.wheatFieldArray[x][y]
	var tile = "fieldTile" + x + "-" + y


	if (gameData.selectedWheatItem == 'plot') {
		showPlotManagementDiv = true

		gameData.selectedPlotX = x
		gameData.selectedPlotY = y

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
		document.getElementById(tile + 'img').src = "assets/emptyField.png"
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
      var tile = "fieldTile" + x + "-" + y;
      var image = document.getElementById(tile + 'img');
      var tileType = gameData.wheatFieldArray[x][y];

      if (tileType == 0)
        setImage('emptyField');
      else if (tileType >= 1 && tileType < 50)
        setImage('wheatSeed1');
      else if (tileType == 50)
        setImage('wheatSeed6');
      else if (tileType > 50 && tileType <= 54)
        setImage('seedDrill');
      else if (tileType > 54 && tileType <= 58)
        setImage('wheatHarvester');
      else if (tileType == 59)
        setImage('unpurchasedField');

      if (tileType == 51 || tileType == 55)
        setRotation(90);
      else if (tileType == 52 || tileType == 56)
        setRotation(180);
      else if (tileType == 53 || tileType == 57)
        setRotation(270);
      else
        setRotation(0);

      if (tileType == 59)
        document.getElementById(tile).style.backgroundColor = "#66361F";
      else
        document.getElementById(tile).style.backgroundColor = "#DEAD85";

      function setImage(id) {
        image.src = 'assets/' + id + '.png';
      }

      function setRotation(number) {
        image.style.transform = 'rotate(' + number + 'deg)';
      }
    }
  }
}

function updateValuesField () {
	if (gameData.wheat)
		colorChanger('winnowWheat', "#DEAD85")
	else
		colorChanger('winnowWheat', "#BBBBBB")

	if (gameData.wheatSeeds)
		colorChanger('grindFlour', "#DEAD85")
	else
		colorChanger('grindFlour', "#BBBBBB")
	
	checkShow(showPlotManagementDiv, 'plotManagementDiv')
}