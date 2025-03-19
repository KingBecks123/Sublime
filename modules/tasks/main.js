function startSimulation() {
	if (game.civiliansPlaced == game.civiliansTotal) {
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 5; y++) {
				if (game.diseaseArray[x][y] == 'civilian' || game.diseaseArray[x][y] == 'dead') {
					for (xSpread = x - 1; xSpread < x + 2; xSpread++) {
						for (ySpread = y - 1; ySpread < y + 2; ySpread++) {
							if ((xSpread < 5 && xSpread >= 0 && ySpread < 5 && ySpread >= 0) && !(x == xSpread && y == ySpread)) {
								if (canPlaceTile (xSpread, ySpread))
									game.diseaseArray[xSpread][ySpread] = 'disease'
								else if (game.diseaseArray[xSpread][ySpread] == 'civilian')
									game.diseaseArray[xSpread][ySpread] = 'dead'
							}
						}
					}
				}
			}
		}
		game.simulationTime = true

		if (game.autoCheckSimulation)
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
	if (game.civiliansPlaced == game.civiliansTotal && game.simulationTime) {
		diseaseControlFailed = false
		for (x = 0; x < 5; x++) {
			for (y = 0; y < 5; y++) {
				if (game.diseaseArray[x][y] == 'dead')
					diseaseControlFailed = true
			}
		}
		countPoints(diseaseControlFailed)
	}
}

function countPoints(diseaseControlFailed) {
	points = game.limeDiseaseLakesSet + 1 + game.respectBillboard

	if (game.benevolenceToggle)
		points += Math.floor((Math.pow(2, game.limeDiseaseLakes - 10)) * game.benevolence)

	if (diseaseControlFailed) 
		points *= -1

	game.respect += points
	game.diseaseControlFinished = true

	for (x = 0; x < 5; x++)
		for (y = 0; y < 5; y++)
			game.diseaseArray[x][y] = 'empty'
		
	game.civiliansPlaced = 0
	game.simulationTime = false
	
	if (game.autoStartTask)
		diseaseControlTask()
	
	updateMapTileAesthetic()
}

function mapTile(x, y) {

	if (!game.diseaseControlFinished) {
		if (canPlaceTile (x, y) && game.civiliansPlaced < game.civiliansTotal) {
			game.diseaseArray[x][y] = 'civilian'
			game.civiliansPlaced += 1
		} else if (game.diseaseArray[x][y] == 'civilian') {
			game.diseaseArray[x][y] = 'empty'
			game.civiliansPlaced -= 1
		}
	}

	if (game.autoStartSimulation)
		startSimulation()

	updateMapTileAesthetic()
}

function diseaseControlTask() {
	if (game.diseaseControlFinished) {
		game.diseaseControlFinished = false
		game.civiliansTotal = beckyRandom(4)

		game.limeDiseaseLakesSet = game.limeDiseaseLakes


		for (limeDiseaseLakesCurrent = 0; limeDiseaseLakesCurrent < game.limeDiseaseLakes; 0) {

			x = beckyRandom(5) - 1
			y = beckyRandom(4) - 1

			if (canPlaceTile(x, y)) {
				game.diseaseArray[x][y] = 'lake'
				limeDiseaseLakesCurrent += 1
			}
		}

		if (game.autoPlaceACivilian && game.numberOfTiles !== game.limeDiseaseLakes) {
			for (i = 0; game.civiliansPlaced < 1; i) {
				x = beckyRandom(5) - 1
				y = beckyRandom(4) - 1

				if (canPlaceTile(x, y)) {
					game.diseaseArray[x][y] = 'civilian'
					game.civiliansPlaced += 1
				}
			}
		}
		
		if (game.autoStartSimulation)
			startSimulation()
		
		updateMapTileAesthetic()
	}
}

function canPlaceTile (x, y) {
	return (doesTileExist (x, y) && game.diseaseArray[x][y] == 'empty')
}

function doesTileExist (x, y) {
	return ((x < 4 || y < game.numberOfTiles - 16))
}

function changeLakeAmount(x) {
	if ((game.limeDiseaseLakes < game.numberOfTiles && x == 1) || (game.limeDiseaseLakes > 0 && x == -1))
		game.limeDiseaseLakes += x
}

diseaseTileTypes = {
	empty: {
		color: myBeige,
		text: '‏‏‎ ‎‏‏‎ ‎‎'
	},
	civilian: {
		color: myLime,
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
				setColor('mapTile-' + x + '-' + y, diseaseTileTypes[game.diseaseArray[x][y]].color)
				update('mapTile-' + x + '-' + y, diseaseTileTypes[game.diseaseArray[x][y]].text)
			}
			else {
				setColor('mapTile-' + x + '-' + y, '#66361F')
				update('mapTile-' + x + '-' + y, '‏‏‎ ‎‏‏‎ ‎‎')
			}
		}
	}
}

function benevolenceToggle() {
	if (game.diseaseControlFinished)
		toggle('benevolenceToggle')
}

function buyARobe() {
    if (game.coins >= 1e5) {
        game.coins -= 1e5
        game.silkRobe = 1

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
	if (game.simulationTime)
		setColor('checkResultsButton', myBeige)
	else
		setColor('checkResultsButton', '#50514F')
	
	var x = document.getElementsByClassName('unlockDiseaseAreaSwamp')
	for (i = 0; i < x.length; i++) {
		if (game.unlockDiseaseAreaSwamp)
			x[i].style.display = 'block'
		else
			x[i].style.display = 'none'
	}
	
	update('textForRespect', game.respect.toLocaleString() + ' Respect')
	update('textForLakes', game.limeDiseaseLakes.toLocaleString() + ' Lakes')
    update('numberOfCivilians', 'Number Of Civilians: ' + game.civiliansTotal.toLocaleString())

    const milestoneValues = [
      { value: 10, color: myLime, text: 'Automatically start tasks' },
      { value: 25, color: myLime, text: 'Automatically start simulation' },
      { value: 50, color: myLime, text: 'Allow entrance to the Special Shopping District' },
      { value: 100, color: myLime, text: 'Automatically check simulation' },
      { value: 500, color: myLime, text: 'Automatically situate a civilian' },
      { value: 1000, color: myLime, text: 'Unlock scientific research' },
      { value: 10000, color: '#FF999A', text: 'Unlock more mega coin upgrades' }
    ];

    milestoneValues.forEach(({ value, color, text }) => {
      checkRespectMilestone(value, color, text);
    });

    const showHideElements = [
      { condition: game.respectMilestone10, element: 'autoStartTaskButton', display: 'inline' },
      { condition: game.respectMilestone25, element: 'autoStartSimulationButton', display: 'inline' },
      { condition: game.respectMilestone100, element: 'autoCheckSimulationButton', display: 'inline' },
      { condition: game.respectMilestone500, element: 'autoPlaceACivilianDiv' },
      { condition: game.respectMilestone1000, element: 'scienceButton', display: 'inline' },
      { condition: game.respectMilestone50, element: 'patrician' },
      { condition: !game.manuscripts, element: 'buyManuscriptsDiv' },
      { condition: game.diseaseControlFinished, element: 'startDiseaseTask' },
      { condition: !game.diseaseControlFinished, element: 'diseaseControlStart' },
      { condition: !game.silkRobe, element: 'buyARobe' },
      { condition: !game.unlockDiseaseAreaSwamp, element: 'unlockDiseaseAreaSwamp' },
      { condition: !game.lightRobe, element: 'lightRobe' },
	  { condition: !game.unlockBenevolence, element: 'unlockBenevolence' },
	  { condition: !game.surveillanceCamera2, element: 'surveillanceCamera2' }
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });

	function checkRespectMilestone(number, color, text) {		
		if (game.respect >= number)
			game['respectMilestone' + number] = 1
		if (game['respectMilestone' + number]) {
			
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
	
	if (game.autoStartTask) 
		diseaseControlTask()
	
	if (game.autoStartSimulation)
		startSimulation()
}