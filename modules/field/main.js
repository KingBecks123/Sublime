function onLoadField() {
    createFieldButtons();
    createFieldActionButtons();
    updateFieldActionButtons(game.fieldAction);
    updatePlotAesthetic();
}

function createFieldButtons() {
    field = '';

    game.wheatFieldArray.forEach((row, y) => {
        row.forEach((cell, x) => {
            const buttonId = 'plot' + x + '-' + y;
            const imgId = buttonId + 'img';
            field += `
                <button class="field-plot" ondragstart="return false;" id="${buttonId}" onclick="clickPlot(${x}, ${y})">
                    <img class="field-plot-image" id="${imgId}" src="assets/images/field/emptyField.png">
                </button>
            `;
        });
    });

    update('fullField', field);
}

function createFieldActionButtons() {
    let fieldActionButtons = '';

    for (let i = 0; i < fieldActions.length; i++) {
        const option = fieldActions[i];
        fieldActionButtons += `
            <button class="wide-button" id="${option.id}FieldAction" onclick="selectFieldAction('${option.id}')">${option.text}</button>
        `;
    }

    update('fieldPlacementOptions', fieldActionButtons);
}

function selectFieldAction(id) {
    game.fieldAction = id
    updateFieldActionButtons(id)
}

function updateFieldActionButtons(id) {
    fieldActions.forEach(element => {
        setColor(element.id + 'FieldAction', myGray);
    });

    setColor(id + 'FieldAction', myLime)
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
    updatePlotAesthetic()
}


function clickPlot(x, y) {

    var tileType = game.wheatFieldArray[x][y]
    var tile = "plot" + x + "-" + y


    if (game.fieldAction == 'plot') {
        showPlotManagementDiv = true

        game.selectedPlotX = x
        game.selectedPlotY = y

        if (game.wheatFieldArray[x][y] == 59) {
            update("plotDetails", "Price: " + game.nextPlotPrice.toLocaleString() + " Pie Coins")
            update("managePlot", "Purchase")
        }
        else {
            update("plotDetails", "Sell Price: " + (game.nextPlotPrice / 2).toLocaleString() + " Pie Coins")
            update("managePlot", "Sell")
        }
    }

    else if (game.wheatFieldArray[x][y] == 50) {
        game.wheat += 1
        emptyWheatTile(x, y)
    }

    else if (tileType >= 51 && tileType <= 54) {
        if (game.fieldAction == 'rotate') {
            if (tileType == 54)
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
        if (game.fieldAction == 'rotate') {
            if (tileType == 58)
                game.wheatFieldArray[x][y] = 55
            else
                game.wheatFieldArray[x][y] += 1

        }
        else {
            game.wheatHarvesters += 1
            emptyWheatTile(x, y)
        }
    }

    else if (game.fieldAction == 'seed')
        setTileType(1, 'wheatSeeds')
    else if (game.fieldAction == 'seedDrill')
        setTileType(51, 'seedDrills')
    else if (game.fieldAction == 'harvester')
        setTileType(55, 'wheatHarvesters')

    function emptyWheatTile(x, y) {
        game.wheatFieldArray[x][y] = 0
        document.getElementById(tile + 'img').src = "assets/images/field/emptyField.png"
    }

    function setTileType(number, cost) {
        if (game.wheatFieldArray[x][y] == 0 && game[cost] > 0) {
            game.wheatFieldArray[x][y] = number
            game[cost] -= 1
        }
    }
    updatePlotAesthetic()
}

function updatePlotAesthetic() {
    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
            var tile = "plot" + x + "-" + y;
            var image = document.getElementById(tile + 'img');
            var tileType = game.wheatFieldArray[x][y];
            var rotation;
            var imageID;

            if (tileType == 0)
                imageID = 'emptyField';
            else if (tileType >= 1 && tileType < 50)
                imageID = 'wheatSeed1';
            else if (tileType == 50)
                imageID = 'wheatSeed6';
            else if (tileType > 50 && tileType <= 54)
                imageID = 'seedDrill';
            else if (tileType > 54 && tileType <= 58)
                imageID = 'wheatHarvester';
            else if (tileType == 59)
                imageID = 'unpurchasedField';

            image.src = 'assets/images/field/' + imageID + '.png';

            if (tileType == 51 || tileType == 55)
                rotation = 90;
            else if (tileType == 52 || tileType == 56)
                rotation = 180;
            else if (tileType == 53 || tileType == 57)
                rotation = 270;
            else
                rotation = 0;

            image.style.transform = 'rotate(' + rotation + 'deg)';

            if (tileType == 59)
                document.getElementById(tile).style.backgroundColor = "#66361F";
            else
                document.getElementById(tile).style.backgroundColor = myBeige;
        }
    }
}

function updateValuesField() {
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