addMainTabs([
	{
		id: 'tasks',
		text: 'Tasks',
		color1: 'FF98DD',
		color2: 'FF4DFF'
	}
]);

addGameVariables({
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
    diseaseControlFinished: true,
    respect: 0,
    simulationTime: false,
    unlockDiseaseAreaSwamp: 0,
    limeDiseaseInfoToggle: 1,
    limeDiseaseControlInfoToggle: 1,
    limeDiseaseLakes: 0,
    limeDiseaseLakesSet: 0,
    diseaseArray: [
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty']
    ],
});

function startSimulation() {
	if (gameData.civiliansPlaced == gameData.civiliansTotal) {
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 5; y++) {
				if (gameData.diseaseArray[x][y] == 'civilian' || gameData.diseaseArray[x][y] == 'dead') {
					for (xSpread = x - 1; xSpread < x + 2; xSpread++) {
						for (ySpread = y - 1; ySpread < y + 2; ySpread++) {
							if ((xSpread < 5 && xSpread >= 0 && ySpread < 5 && ySpread >= 0) && !(x == xSpread && y == ySpread)) {
								if (canPlaceTile (xSpread, ySpread))
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
		if (canPlaceTile (x, y) && gameData.civiliansPlaced < gameData.civiliansTotal) {
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
	}
}

function canPlaceTile (x, y) {
	return (doesTileExist (x, y) && gameData.diseaseArray[x][y] == 'empty')
}

function doesTileExist (x, y) {
	return ((x < 4 || y < gameData.numberOfTiles - 16))
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
			if (doesTileExist (x, y)) {
				setColor('mapTile-' + x + '-' + y, diseaseTileTypes[gameData.diseaseArray[x][y]].color)
				update('mapTile-' + x + '-' + y, diseaseTileTypes[gameData.diseaseArray[x][y]].text)
			}
			else {
				setColor('mapTile-' + x + '-' + y, '#66361F')
				update('mapTile-' + x + '-' + y, '‏‏‎ ‎‏‏‎ ‎‎')
			}
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
	setColor('earnButton', '#BBBBBB')
	setColor('milestonesButton', '#BBBBBB')
	setColor(tabby + 'Button', '#898989')
    document.getElementById(tabby).style.display = 'block'
}

function onLoadTasks () {
	for (y = 3; y >= 0; y--) {
		for (x = 0; x < 5; x++) {
			document.getElementById('diseaseControlTiles').innerHTML += '<button style="width:60px;height:60px;padding:5px;margin:2px" class="mapTile" id="mapTile-' + x + '-' + y + '" onclick="mapTile(' + x + ', ' + y + ')"></button>'
		}
	}
}

function updateValuesTasks () {
	if (gameData.simulationTime)
		setColor('checkResultsButton', '#DEAD85')
	else
		setColor('checkResultsButton', '#50514F')
	
	var x = document.getElementsByClassName('unlockDiseaseAreaSwamp')
	for (i = 0; i < x.length; i++) {
		if (gameData.unlockDiseaseAreaSwamp)
			x[i].style.display = 'block'
		else
			x[i].style.display = 'none'
	}
	
	update('textForRespect', gameData.respect.toLocaleString() + ' Respect')
	update('textForLakes', gameData.limeDiseaseLakes.toLocaleString() + ' Lakes')
    update('numberOfCivilians', 'Number Of Civilians: ' + gameData.civiliansTotal.toLocaleString())

    const milestoneValues = [
      { value: 10, color: '#4DFE89', text: 'Automatically start tasks' },
      { value: 25, color: '#4DFE89', text: 'Automatically start simulation' },
      { value: 50, color: '#4DFE89', text: 'Allow entrance to the Special Shopping District' },
      { value: 100, color: '#4DFE89', text: 'Automatically check simulation' },
      { value: 500, color: '#4DFE89', text: 'Automatically situate a civilian' },
      { value: 1000, color: '#4DFE89', text: 'Unlock scientific research' },
      { value: 10000, color: '#FF999A', text: 'Unlock more mega coin upgrades' }
    ];

    milestoneValues.forEach(({ value, color, text }) => {
      checkRespectMilestone(value, color, text);
    });

    const showHideElements = [
      { condition: gameData.respectMilestone10, element: 'autoStartTaskButton', display: 'inline' },
      { condition: gameData.respectMilestone25, element: 'autoStartSimulationButton', display: 'inline' },
      { condition: gameData.respectMilestone100, element: 'autoCheckSimulationButton', display: 'inline' },
      { condition: gameData.respectMilestone500, element: 'autoPlaceACivilianDiv' },
      { condition: gameData.respectMilestone1000, element: 'scienceButton', display: 'inline' },
      { condition: gameData.respectMilestone50, element: 'patrician' },
      { condition: !gameData.manuscripts, element: 'buyManuscriptsDiv' },
      { condition: gameData.diseaseControlFinished, element: 'startDiseaseTask' },
      { condition: !gameData.diseaseControlFinished, element: 'diseaseControlStart' },
      { condition: !gameData.silkRobe, element: 'buyARobe' },
      { condition: !gameData.unlockDiseaseAreaSwamp, element: 'unlockDiseaseAreaSwamp' },
      { condition: !gameData.lightRobe, element: 'lightRobe' },
	  { condition: !gameData.unlockBenevolence, element: 'unlockBenevolence' },
	  { condition: !gameData.surveillanceCamera2, element: 'surveillanceCamera2' }
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });

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
		
		setColor(number + 'RespectMilestone', whatColor)
	}
	
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