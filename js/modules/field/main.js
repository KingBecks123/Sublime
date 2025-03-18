function onLoadField() {
  createFieldButtons();
  createFieldPlacementOptions();
  selectedWheatItemAesthetic(game.selectedWheatItem);
  updateFieldTileAesthetic();
}

function createFieldButtons() {
  const fullFieldElement = document.getElementById('fullField');
  let fieldButtonsHTML = '';

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const buttonId = 'fieldTile' + x + '-' + y;
      const imgId = buttonId + 'img';
      fieldButtonsHTML += `<button ondragstart="return false;" id="${buttonId}" onclick="fieldTile(${x}, ${y})"><img style="width:70px;height:70px;" id="${imgId}" src="assets/images/emptyField.png"></button>`;
    }
  }

  fullFieldElement.innerHTML = fieldButtonsHTML;
}

function createFieldPlacementOptions() {
  const fieldPlacementOptionsElement = document.getElementById('fieldPlacementOptions');
  let fieldPlacementOptionsHTML = '';

  for (let i = 0; i < fieldPlacementOptions.length; i++) {
    const option = fieldPlacementOptions[i];
    fieldPlacementOptionsHTML += `<button style="background-color:gray;width:166px" id="${option.id}SelectedWheatItem" onclick="selectedWheatItem('${option.id}')">${option.text}</button>`;
  }

  fieldPlacementOptionsElement.innerHTML = fieldPlacementOptionsHTML;
}

function selectedWheatItem(id) {
	game.selectedWheatItem = id
	selectedWheatItemAesthetic(id)
}

function selectedWheatItemAesthetic(id) {
	setColor('plotSelectedWheatItem', 'gray')
	setColor('seedSelectedWheatItem', 'gray')
	setColor('seedDrillSelectedWheatItem', 'gray')
	setColor('harvesterSelectedWheatItem', 'gray')
	setColor('rotateSelectedWheatItem', 'gray')
	setColor(id + 'SelectedWheatItem', myLime)
}

function managePlot() {
	if (game.wheatFieldArray[game.selectedPlotX][game.selectedPlotY] == 59) {
		if (game.pieCoins >= game.nextPlotPrice) {
			game.pieCoins -= game.nextPlotPrice
			game.nextPlotPrice *= 2
			game.wheatFieldArray[game.selectedPlotX][game.selectedPlotY] = 0
			showPlotManagementDiv = false
		}
	}
	else {
		game.wheatFieldArray[game.selectedPlotX][game.selectedPlotY] = 59
		game.nextPlotPrice /= 2
		game.pieCoins += game.nextPlotPrice
		showPlotManagementDiv = false
	}
	updateFieldTileAesthetic()
}


function fieldTile(x, y) {
	
	var tileType = game.wheatFieldArray[x][y]
	var tile = "fieldTile" + x + "-" + y


	if (game.selectedWheatItem == 'plot') {
		showPlotManagementDiv = true

		game.selectedPlotX = x
		game.selectedPlotY = y

		if(game.wheatFieldArray[x][y] == 59) {
			update("plotDetails", "Price: " + game.nextPlotPrice.toLocaleString() + " Pie Coins")
			update("managePlot", "Purchase")
		}
		else {
			update("plotDetails", "Sell Price: " + (game.nextPlotPrice / 2).toLocaleString() + " Pie Coins")
			update("managePlot", "Sell")
		}
	}
	
	else if(game.wheatFieldArray[x][y] == 50) {
		game.wheat += 1
		emptyWheatTile(x, y)
	}
	
	else if(tileType >= 51 && tileType <= 54) {		
		if(game.selectedWheatItem == 'rotate') {
			if(tileType == 54)
				game.wheatFieldArray[x][y] = 51
			else
				game.wheatFieldArray[x][y] += 1
		}
		else {
			game.seedDrills += 1
			emptyWheatTile(x, y)	
		}
	}
	
	else if (tileType >= 55 && tileType <= 58) {
		if (game.selectedWheatItem == 'rotate') {
			if(tileType == 58)
				game.wheatFieldArray[x][y] = 55
			else
				game.wheatFieldArray[x][y] += 1
			
		}
		else {
			game.wheatHarvesters += 1
			emptyWheatTile(x, y)
		}
	}
	
	else if(game.selectedWheatItem == 'seed')
		setTileType(1, 'wheatSeeds')
	else if (game.selectedWheatItem == 'seedDrill')
		setTileType(51, 'seedDrills')
	else if (game.selectedWheatItem == 'harvester')
		setTileType(55, 'wheatHarvesters')
	
	function emptyWheatTile(x, y) {
		game.wheatFieldArray[x][y] = 0
		document.getElementById(tile + 'img').src = "assets/images/emptyField.png"
	}

	function setTileType(number, cost) {
		if (game.wheatFieldArray[x][y] == 0 && game[cost] > 0) {
			game.wheatFieldArray[x][y] = number
			game[cost] -= 1
		}
	}
	updateFieldTileAesthetic()
}

function updateFieldTileAesthetic() {
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
      var tile = "fieldTile" + x + "-" + y;
      var image = document.getElementById(tile + 'img');
      var tileType = game.wheatFieldArray[x][y];

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
        document.getElementById(tile).style.backgroundColor = myBeige;

      function setImage(id) {
        image.src = 'assets/images/' + id + '.png';
      }

      function setRotation(number) {
        image.style.transform = 'rotate(' + number + 'deg)';
      }
    }
  }
}

function updateValuesField () {
	if (game.wheat)
		setColor('winnowWheat', myBeige)
	else
		setColor('winnowWheat', myGray)

	if (game.wheatSeeds)
		setColor('grindFlour', myBeige)
	else
		setColor('grindFlour', myGray)
	
	checkShow(showPlotManagementDiv, 'plotManagementDiv')
}