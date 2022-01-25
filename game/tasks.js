Object.assign ( gameDataBase, {
	respectMilestone10: 0,
	respectMilestone25: 0,
	respectMilestone50: 0,
	respectMilestone100: 0,
	respectMilestone500: 0,
	respectMilestone1000: 0,
	respectMilestone10000: 0,
	respectBillboard: 0,
    civiliansPlaced: 0,
    civiliansTotal: 2,
    autoStartTask: 0,
    autoCheckSimulation: 0,
    autoStartSimulation: 0,
} )

function startSimulation() {
	if (gameData.civiliansPlaced == gameData.civiliansTotal) {
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 5; y++) {
				if (gameData.diseaseArray[x][y] == 'civilian' || gameData.diseaseArray[x][y] == 'dead') {
					for (xSpread = x - 1; xSpread < x + 2; xSpread++) {
						for (ySpread = y - 1; ySpread < y + 2; ySpread++) {
							if ((xSpread < 5 && xSpread >= 0 && ySpread < 5 && ySpread >= 0) && !(x == xSpread && y == ySpread)) {
								if (gameData.diseaseArray[xSpread][ySpread] == 'empty')
									gameData.diseaseArray[xSpread][ySpread] = 'disease'
								else if (gameData.diseaseArray[xSpread][ySpread] == 'civilian')
									gameData.diseaseArray[xSpread][ySpread] = 'dead'
							}
						}
					}
				}
			}
		}
		gameData.simulationTime = true

		if (gameData.autoCheckSimulation)
			checkResults()
		else
			updateMapTileAesthetic()
	}
}

function diseaseControlQuit() {
	diseaseControlFailed = true
	countPoints(1)
}

function checkResults() {
	if (gameData.civiliansPlaced == gameData.civiliansTotal && gameData.simulationTime) {
		diseaseControlFailed = false
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 5; y++) {
				if (gameData.diseaseArray[x][y] == 'dead')
					diseaseControlFailed = true
			}
		}
		countPoints(diseaseControlFailed)
	}
}

function countPoints(diseaseControlFailed) {
	points = gameData.limeDiseaseLakesSet + 1 + gameData.respectBillboard

	if (gameData.benevolenceToggle)
		points += Math.floor((Math.pow(2, gameData.limeDiseaseLakes - 10)) * gameData.benevolence)

	if (diseaseControlFailed) 
		points *= -1

	gameData.respect += points
	gameData.diseaseControlFinished = true

	for (x = 0; x < 5; x++)
		for (y = 0; y < 5; y++)
			gameData.diseaseArray[x][y] = 'empty'
		
	gameData.civiliansPlaced = 0
	gameData.simulationTime = false
	
	if (gameData.autoStartTask)
		diseaseControlTask()
	
	updateMapTileAesthetic()
}

function mapTile(x, y) {

	if (!gameData.diseaseControlFinished) {
		if (gameData.diseaseArray[x][y] == 'empty' && gameData.civiliansPlaced < gameData.civiliansTotal) {
			gameData.diseaseArray[x][y] = 'civilian'
			gameData.civiliansPlaced += 1
		} else if (gameData.diseaseArray[x][y] == 'civilian') {
			gameData.diseaseArray[x][y] = 'empty'
			gameData.civiliansPlaced -= 1
		}
	}

	if (gameData.autoStartSimulation)
		startSimulation()

	updateMapTileAesthetic()
}

function diseaseControlTask() {
	if (gameData.diseaseControlFinished) {
		gameData.diseaseControlFinished = false
		gameData.civiliansTotal = beckyRandom(4)

		gameData.limeDiseaseLakesSet = gameData.limeDiseaseLakes


		for (limeDiseaseLakesCurrent = 0; limeDiseaseLakesCurrent < gameData.limeDiseaseLakes; 0) {

			x = beckyRandom(5) - 1
			y = beckyRandom(4) - 1

			if (canPlaceTile(x, y)) {
				gameData.diseaseArray[x][y] = 'lake'
				limeDiseaseLakesCurrent += 1
			}
		}

		if (gameData.autoPlaceACivilian && gameData.numberOfTiles !== gameData.limeDiseaseLakes) {
			for (i = 0; gameData.civiliansPlaced < 1; i) {
				x = beckyRandom(5) - 1
				y = beckyRandom(4) - 1

				if (canPlaceTile(x, y)) {
					gameData.diseaseArray[x][y] = 'civilian'
					gameData.civiliansPlaced += 1
				}
			}
		}
		
		if (gameData.autoStartSimulation)
			startSimulation()
		
		updateMapTileAesthetic()
		
		function canPlaceTile (x, y) {
			return ((x < 4 || y < gameData.numberOfTiles - 16) && gameData.diseaseArray[x][y] == 'empty')
		}
	}
}

function changeLakeAmount(x) {
	if ((gameData.limeDiseaseLakes < gameData.numberOfTiles && x == 1) || (gameData.limeDiseaseLakes > 0 && x == -1))
		gameData.limeDiseaseLakes += x
}

diseaseTileTypes = {
	empty: {
		color: '#DEAD85',
		text: '‏‏‎ ‎‏‏‎ ‎‎'
	},
	civilian: {
		color: '#4DFE89',
		text: '‏‏‎:)'
	},
	disease: {
		color: '#FF999A',
		text: '‏‏‎ +'
	},
	dead: {
		color: '#565656',
		text: '‏‏‎:('
	},
	lake: {
		color: '#4DFFFF',
		text: '‏‏‎_‎‎'
	},	
}

function updateMapTileAesthetic() {
	for (x = 0; x < 5; x++) {
		for (y = 0; y < 4; y++) {
			colorChanger('mapTile-' + x + '-' + y, diseaseTileTypes[gameData.diseaseArray[x][y]].color)
			update('mapTile-' + x + '-' + y, diseaseTileTypes[gameData.diseaseArray[x][y]].text)
		}
	}
}

function benevolenceToggle() {
	if (gameData.diseaseControlFinished)
		toggle('benevolenceToggle')
}


function buyARobe() {
    if (gameData.coins >= 1e5) {
        gameData.coins -= 1e5
        gameData.silkRobe = 1
        gameData.respect += 50
    }
}


function tabTasks(tabby) {
    hide('earn')
    hide('milestones')
	colorChanger('earnButton', '#BBBBBB')
	colorChanger('milestonesButton', '#BBBBBB')	
	colorChanger(tabby + 'Button', '#898989')
    document.getElementById(tabby).style.display = 'block'
}

function updateValuesTasks () {
	if (gameData.simulationTime)
		colorChanger('checkResultsButton', '#DEAD85')
	else
		colorChanger('checkResultsButton', '#50514F')
	
	var x = document.getElementsByClassName('unlockDiseaseAreaSwamp')
	for (i = 0; i < x.length; i++) {
		if (gameData.unlockDiseaseAreaSwamp)
			x[i].style.display = 'block'
		else
			x[i].style.display = 'none'
	}
	
	update('textForRespect', gameData.respect.toLocaleString() + ' Respect')

	checkRespectMilestone(10, '#4DFE89', 'Automatically start tasks')
	checkRespectMilestone(25, '#4DFE89', 'Automatically start simulation')
	checkRespectMilestone(50, '#4DFE89', 'Allow entrance to the Special Shopping District')
	checkRespectMilestone(100, '#4DFE89', 'Automatically check simulation')
	checkRespectMilestone(500, '#4DFE89', 'Automatically situate a civilian')
	checkRespectMilestone(1000, '#4DFE89', 'Unlock scientific research')
	checkRespectMilestone(10000, '#FF999A', 'Unlock more mega coin upgrades')

	checkShow(gameData.respectMilestone10, 'autoStartTaskButton', 'inline')
	checkShow(gameData.respectMilestone25, 'autoStartSimulationButton', 'inline')
	checkShow(gameData.respectMilestone100, 'autoCheckSimulationButton', 'inline')
	checkShow(gameData.respectMilestone500, 'autoPlaceACivilianDiv')
	checkShow(gameData.respectMilestone1000, 'scienceButton', 'inline')
	checkShow(gameData.numberOfTiles >= 17, 'mapTile-4-0', 'visible')
	checkShow(gameData.numberOfTiles >= 18, 'mapTile-4-1', 'visible')
	checkShow(gameData.numberOfTiles >= 19, 'mapTile-4-2', 'visible')
	checkShow(gameData.numberOfTiles >= 20, 'mapTile-4-3', 'visible')

	function checkRespectMilestone(number, color, text) {		
		if (gameData.respect >= number)
			gameData['respectMilestone' + number] = 1
		if (gameData['respectMilestone' + number]) {
			
			elem = ''
			if(number == 10000)
				elem = '<span class="tooltiptext">Yes, you have this unlocked. The red means that it is permanent.</span>'
			update(number + 'RespectMilestone', number.toLocaleString() + ' Respect: ' + text + elem)

			whatColor = color
		} 
		else
			whatColor = "#BBBBBB"
		
		colorChanger(number + 'RespectMilestone', whatColor)
	}

	checkShow(gameData.respectMilestone50, 'patrician')
	checkShow(gameData.manuscripts, 'upgradeManuscripts')
	checkShow(!gameData.manuscripts, 'buyManuscriptsDiv')
	checkShow(gameData.diseaseControlFinished, 'startDiseaseTask')
	checkShow(!gameData.diseaseControlFinished, 'diseaseControlStart')

	update('textForLakes', gameData.limeDiseaseLakes.toLocaleString() + ' Lakes')
	update('numberOfCivilians', 'Number Of Civilians: ' + gameData.civiliansTotal.toLocaleString())
	checkShow(!gameData.silkRobe, 'buyARobe')
	checkShow(!gameData.unlockDiseaseAreaSwamp, 'unlockDiseaseAreaSwamp')
	checkShow(!gameData.lightRobe, 'lightRobe')
	
	basicToggle("limeDiseaseInfo")
	basicToggle("limeDiseaseControlInfo")
	
	toggleAesthetic("autoStartTask")
	toggleAesthetic("autoStartSimulation")
	toggleAesthetic("autoCheckSimulation")
	toggleAesthetic("autoPlaceACivilian")
	toggleAesthetic("benevolenceToggle")
	
	if (gameData.autoStartTask) 
		diseaseControlTask()
	
	if (gameData.autoStartSimulation)
		startSimulation()
}

function onLoadTasks () {
	for (y = 3; y >= 0; y--) {
		for (x = 0; x < 5; x++) {
			document.getElementById('diseaseControlTiles').innerHTML += '<button style="width:60px;height:60px;padding:5px;margin:2px" class="mapTile" id="mapTile-' + x + '-' + y + '" onclick="mapTile(' + x + ', ' + y + ')"></button>'
		}
	}
}