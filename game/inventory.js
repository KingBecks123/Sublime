addMainTabs([
	{
		id: 'inventory',
		text: 'Inventory',
		color1: 'BBBBBB',
		color2: '898989'
	},
]);

addInventoryVariables([
	{
		id: 'goldenLimes',
		name: 'Golden Limes',
		color1: 'AEB301',
		color2: 'F8FF01',
	},
	{
		id: 'peeledLimes',
		name: 'Peeled Limes',
		color1: '72B301',
		color2: 'A0FF01',
	},	
	{
		id: 'juice',
		name: 'Juice',
		color1: '00B33D',
		color2: '00FF55',
	},	
]);


addGameVariables({
    juicers: 0,
    juicerBar: 0,
    howMuchJuice: 0,
    knife: 0,
    limeTypeToJuice: 0,
    limeTypeToJuiceToggle: 0,
    limesPerJuice: 10,
    peeledLimesPerJuice: 5,
    peelers: 0,
    peelerBar: 0,
    howManyPeeledLimes: 0,
	hasGottenPeeledLimes: false,
    storageJuicersUnlock: 0,
    storagePeelersUnlock: 0,
    peelersBulkToggle: 0,
    juicersBulkToggle: 0,
});

function peelerPeel() {
    if (gameData.peelerBar == 0 && gameData.limes > 0) {
		gameData.howManyPeeledLimes = 1
		gameData.limes -= 1
		gameData.peelerBar = 0
		peelerBar()
    }
}


function peelerPeelMax() {
    if (gameData.peelerBar == 0) {
        gameData.howManyPeeledLimes = gameData.limes
        if (gameData.howManyPeeledLimes > gameData.peelers) 
            gameData.howManyPeeledLimes = gameData.peelers
        gameData.limes -= gameData.howManyPeeledLimes
        if (gameData.howManyPeeledLimes > 0) {
            gameData.peelerBar = 0
            peelerBar()
        }
    }
}

function peelerBar() {
	runBar('peeler', (0.3 + gameData.bitterSpeeding * 6) * (gameData.sharperPeelers + 1))
}

function peelerBarEnd() {
	gameData.peeledLimes += gameData.howManyPeeledLimes
}

function makeJuice() {
	if (gameData.limeTypeToJuice == 0)
	   setJuice ('limes')
	
	else if (gameData.limeTypeToJuice == 1)
	   setJuice ('peeledLimes')
	
	function setJuice (id) {
		if (gameData[id] >= gameData[id + 'PerJuice'] && gameData.juicerBar == 0) {
			gameData[id] -= gameData[id + 'PerJuice']
			gameData.howMuchJuice = 1
			gameData.limeTypeToJuiceToggle = gameData.limeTypeToJuice
			juicerBar()
		}
	}
}

function makeMaxJuice() {
    if (gameData.juicerBar == 0) {
        if (gameData.limeTypeToJuice == 0)
            setJuice('limes')
		else
            setJuice('peeledLimes')
		
        if (gameData.howMuchJuice > 0)
            juicerBar()
    }
	
	function setJuice (id) {
        gameData.howMuchJuice = Math.floor(gameData[id] / gameData[id + 'PerJuice'])
			
		if (gameData.howMuchJuice > gameData.juicers)
			gameData.howMuchJuice = gameData.juicers
		gameData.limeTypeToJuiceToggle = gameData.limeTypeToJuice
		
        gameData[id] -= gameData.howMuchJuice * gameData[id + 'PerJuice']
	}
}

function juicerBar() {
	runBar('juicer', (0.15 + gameData.bitterSpeeding * 3) * (gameData.limeTypeToJuiceToggle * 3 + 1))
}

function juicerBarEnd() {
	gameData.juice += gameData.howMuchJuice
	gameData.hasGottenJuice = 1
}

function eatGoldenLime() {
	if (gameData.goldenLimes > 0) {
		gameData.goldenLimes -= 1
		gameData.eatGoldenLimeBar = 100
		gameData.bitterSpeeding = 1
		eatGoldenLimeBar()
	}
}

function eatGoldenLimeBar() {
    if (gameData.eatGoldenLimeBar > 0) {
        gameData.eatGoldenLimeBar -= 0.5
		updateBar("eatGoldenLime")
        setTimeout(eatGoldenLimeBar, (gameData.bitterSpeedSkillLevel / gameData.tickspeed))
    } 
	else 
		gameData.bitterSpeeding = 0
}

function peelLime() {
    if (gameData.limes >= 1) {
        gameData.limes -= 1
        if (Math.floor((Math.random() * 20) / gameData.knifebidextrousSkillLevel) == 0) {
            gameData.peeledLimes += 1
            gameData.limes -= 1
        }
        gameData.peeledLimes += 1
    }
}

loopNumberGoldenLimes = 0

function mainGameLoopInventory () {
	loopNumberGoldenLimes += 1	

	if (loopNumberGoldenLimes >= 200) {
        if (gameData.goldenLimes > 0)
			gameData.goldenLimes -= 1
		loopNumberGoldenLimes = 0
    }
}

function storageJuicersUnlock() {
	if (gameData.coins >= 100) {
		gameData.coins -= 100
		gameData.storageJuicersUnlock = 1
		gameData.juicersMax *= 5
	}
}

function storagePeelersUnlock() {
	if (gameData.coins >= 100) {
		gameData.coins -= 100
		gameData.storagePeelersUnlock = 1
		gameData.peelersMax *= 5
	}
}

function updateValuesInventory () {
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)

	function twoToggleButtons(button1, button2, value) {
		if (value == 1) {
			setColor(button1, "#4DFE89")
			setColor(button2, "gray")
		} else {
			setColor(button1, "gray")
			setColor(button2, "#4DFE89")
		}
	}
	
	basicToggle("peelersBulk")
	basicToggle("juicersBulk")

	currentTaskAesthetic('peelerPeel')
	currentTaskAesthetic('peelerPeelMax')
	currentTaskAesthetic('makeJuice')
	currentTaskAesthetic('makeMaxJuice')
	ifMaxDarkGray("juicer")
	ifMaxDarkGray("peeler")
	
	checkShow(gameData.deliveryManager, 'sellMaxJuiceButton', 'inline')
	checkShow(!gameData.knife, 'buyKnifeDiv')
	checkShow(gameData.knife && gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && gameData.maps > 1 && !gameData.sharperPeelers, 'sharperPeelerDiv')
	checkShow(gameData.knife && gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && !(gameData.hideMaxedPurchases == 1 && gameData.peelers == gameData.peelersMax), 'buyAPeelerDiv')
	checkShow(gameData.knife, 'knifeDiv')
	checkShow(gameData.bulkBuyUnlock, 'peelersBulkButton', 'inline')
	checkShow(gameData.bulkBuyUnlock, 'juicersBulkButton', 'inline')
	checkShow(gameData.hasGottenPeeledLimes, 'juiceLimesToggleButton', 'inline')
	checkShow(gameData.hasGottenPeeledLimes, 'juicePeeledLimesToggleButton', 'inline')
	checkShow(gameData.bitterSpeedSkillLevel, 'eatGoldenLimeProgress')
	checkShow(gameData.bitterSpeedSkillLevel, 'eatGoldenLime')
	checkShow(gameData.peelers, 'peelerDiv')
	checkShow(gameData.peelers > 1, 'peelerPeelMaxButton', 'inline')
	checkShow(gameData.juicers > 1, 'makeMaxJuiceButton', 'visible')
	checkShow(gameData.juicers, 'inventoryButton')
	
	update('juicersAmount', gameData.juicers.toLocaleString() + ' / ' + gameData.juicersMax.toLocaleString() + ' Juicers')
	update('peelersAmount', gameData.peelers.toLocaleString() + ' / ' + gameData.peelersMax.toLocaleString() + ' Peelers')


	
	if (gameData.limeTypeToJuice == 0)
		update('juicerInfo', gameData.limesPerJuice + ' Limes -> 1 Juice')
	else
		update('juicerInfo', gameData.peeledLimesPerJuice + ' Peeled Limes -> 1 Juice')

	if (gameData.peeledLimes >= 1)
		gameData.hasGottenPeeledLimes = true
	


}