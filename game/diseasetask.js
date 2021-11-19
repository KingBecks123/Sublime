var diseaseArrayDimensions = 5;

function startSimulation() {

    if (gameData.civiliansPlaced == gameData.civiliansTotal) {

        for (x = 0; x < diseaseArrayDimensions; x++) {

            for (y = 0; y < diseaseArrayDimensions; y++) {

                tileType = (gameData.diseaseArray[x][y])


                if (tileType == 1 || tileType == 3) {
                    for (xSpread = x - 1; xSpread < x + 2; xSpread++) {

                        for (ySpread = y - 1; ySpread < y + 2; ySpread++) {


                            if ((xSpread < diseaseArrayDimensions && xSpread >= 0 && ySpread < diseaseArrayDimensions && ySpread >= 0) && !(x == xSpread && y == ySpread)) {
                                if (gameData.diseaseArray[xSpread][ySpread] == 0) {
                                    gameData.diseaseArray[xSpread][ySpread] = 2

                                } else if (gameData.diseaseArray[xSpread][ySpread] == 1) {
                                    gameData.diseaseArray[xSpread][ySpread] = 3

                                }
                            }

                        }

                    }

                }

            }

        }
		gameData.simulationTime = 1

		if (gameData.autoCheckSimulation)
			checkResults()
		else
		{
			updateMapTileAesthetic()
		}

    }
	

}

function diseaseControlQuit() {


	diseaseControlFailed = 1

	gameData.diseaseControlFinished = 1
	diseaseControlReset("hard")
	
	
	if (gameData.autoStartTask == 1) {
		diseaseControlTask()
	}

	if (gameData.benevolenceToggle)
		gameData.respect -= gameData.limeDiseaseLakes + 1 + benevolenceRespectIncrease
	else
		gameData.respect -= gameData.limeDiseaseLakes + 1
	
	updateMapTileAesthetic()
    updateValues()

}

function checkResults() {

if (gameData.civiliansPlaced == gameData.civiliansTotal && gameData.simulationTime == 1)
	{
		diseaseControlFailed = 0
		for (x = 0; x < diseaseArrayDimensions; x++) {

			for (y = 0; y < diseaseArrayDimensions; y++) {

				if (gameData.diseaseArray[x][y] == 3) {

					diseaseControlFailed = 1

				}

			}

		}
		
		gameData.diseaseControlFinished = 1
		diseaseControlReset("hard")
				 if (gameData.autoStartTask == 1) {
			diseaseControlTask()
		}

		if (diseaseControlFailed == 0) {
			if (gameData.benevolenceToggle)
				gameData.respect += gameData.limeDiseaseLakes + 1 + benevolenceRespectIncrease + gameData.respectBillboard
			else
				gameData.respect += gameData.limeDiseaseLakes + 1 + gameData.respectBillboard
			
		} else {
			if (gameData.benevolenceToggle)
				gameData.respect -= gameData.limeDiseaseLakes + 1 + benevolenceRespectIncrease + gameData.respectBillboard
			else
				gameData.respect -= gameData.limeDiseaseLakes + 1 + gameData.respectBillboard

		}

		updateMapTileAesthetic()
		updateValues()
	}
	

}


//Called when a map tile is clicked.
function mapTile(x, y) {


    whichButton = "mapTile-" + x + "-" + y

    if (gameData.diseaseControlFinished == 0) {
        if (gameData.diseaseArray[x][y] == 0 && gameData.civiliansPlaced < gameData.civiliansTotal) {
            gameData.diseaseArray[x][y] = 1
            gameData.civiliansPlaced += 1
        } else if (gameData.diseaseArray[x][y] == 1) {
            gameData.diseaseArray[x][y] = 0
            gameData.civiliansPlaced -= 1
        }
    }
	 if (gameData.autoStartSimulation)
		startSimulation()
	
	updateMapTileAesthetic()
}

function diseaseControlTask() {

    if (gameData.diseaseControlFinished == 1) {
		diseaseControlReset("soft")
		gameData.diseaseControlFinished = 0
		gameData.civiliansTotal = beckyRandom(4)
				
		tiles = gameData.numberOfTiles - 16


		for (gameData.limeDiseaseLakesCurrent = 0; gameData.limeDiseaseLakesCurrent < gameData.limeDiseaseLakes; gameData.limeDiseaseLakesCurrent) {

			x = beckyRandom(5) - 1
			y = beckyRandom(5) - 1

			if( ((x < 4 && y < 4) || (x == 4 && y < tiles)) && gameData.diseaseArray[x][y] !== 4)
			{
				gameData.diseaseArray[x][y] = 4
				gameData.limeDiseaseLakesCurrent += 1
			}
		}
		
		if (gameData.autoPlaceACivilian == 1 && gameData.numberOfTiles !== gameData.limeDiseaseLakes)  {
			
			for (i = 0; gameData.civiliansPlaced < 1; i) {

				x = beckyRandom(5) - 1
				y = beckyRandom(5) - 1

				if(( (x < 4 && y < 4) || (x == 4 && y < tiles) ) && gameData.diseaseArray[x][y] == 0)
				{
					gameData.diseaseArray[x][y] = 1
					gameData.civiliansPlaced += 1
				}
				
			}
		}
		
	updateMapTileAesthetic()
    updateValues()

	}



}

function diseaseControlReset(type) {

    for (x = 0; x < 5; x++) {

        for (y = 0; y < 5; y++) {

            if (gameData.diseaseArray[x][y] !== 4 || type == "hard") {
                gameData.diseaseArray[x][y] = 0
            }
        }
    }
    gameData.civiliansPlaced = 0
    gameData.simulationTime = 0
    updateMapTileAesthetic()
}

function changeLakeAmount(x) {

    if (gameData.diseaseControlFinished == 1) {

		if (gameData.limeDiseaseLakes < gameData.numberOfTiles && x == 1) {
			
			gameData.limeDiseaseLakes += x
			
		}
		
		else if (gameData.limeDiseaseLakes > 0 && x == -1) {
			
			gameData.limeDiseaseLakes += x
			
		}
    }

    updateValues()
}

function updateMapTileAesthetic(){
    //Map Tile
    var x = document.getElementsByClassName("mapTile");
    for (i = 0; i < x.length; i++) {

		x[i].style['width'] = "40px";
		x[i].style['height'] = "40px";

        x[i].style.padding = "5px 5px 5px 5px";
		
		
        x[i].style['margin'] = "5px 0px 0px 0px";
		
		
    }

    for (x = 0; x < 5; x++) {
        for (y = 0; y < 5; y++) {

            whichButton = "mapTile-" + x + "-" + y
            tileType = (gameData.diseaseArray[x][y])


            if (tileType == 0) {                                //Blank
                colorChanger(whichButton, accent4)
				if (gameData.diseaseTileSymbols)
					update(whichButton, "‏‏‎ ‎‏‏‎ ‎‎")
            } else if (tileType == 1) {                         //Civillian
                colorChanger(whichButton, limesRelatedAccent)
				if (gameData.diseaseTileSymbols)
					update(whichButton, ":)")

            } else if (tileType == 2) {                         //Disease
                colorChanger(whichButton, "#FF999A")
				if (gameData.diseaseTileSymbols)
					update(whichButton, " +")

            } else if (tileType == 3) {                         //Dead Civillian
                colorChanger(whichButton, "#565656")
				if (gameData.diseaseTileSymbols)
					update(whichButton, ":(")

            } else if (tileType == 4) {                         //Lake
                colorChanger(whichButton, "#4DFFFF")
				if (gameData.diseaseTileSymbols)
					update(whichButton, "_")

            }
			
				if (!gameData.diseaseTileSymbols)
					update(whichButton, "‎‎‎‏‏‎")

        }
    }
}