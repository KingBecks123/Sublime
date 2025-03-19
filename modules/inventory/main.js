function peelerPeel() {
    if (game.peelerBar == 0 && game.limes > 0) {
		game.howManyPeeledLimes = 1
		game.limes -= 1
		game.peelerBar = 0
		peelerBar()
    }
}


function peelerPeelMax() {
    if (game.peelerBar == 0) {
        game.howManyPeeledLimes = game.limes
        if (game.howManyPeeledLimes > game.peelers) 
            game.howManyPeeledLimes = game.peelers
        game.limes -= game.howManyPeeledLimes
        if (game.howManyPeeledLimes > 0) {
            game.peelerBar = 0
            peelerBar()
        }
    }
}

function peelerBar() {
	runBar('peeler', (0.3 + game.bitterSpeeding * 6) * (game.sharperPeelers + 1))
}

function peelerBarEnd() {
	game.peeledLimes += game.howManyPeeledLimes
}

function makeJuice() {
	if (game.limeTypeToJuice == 0)
	   setJuice ('limes')
	
	else if (game.limeTypeToJuice == 1)
	   setJuice ('peeledLimes')
	
	function setJuice (id) {
		if (game[id] >= game[id + 'PerJuice'] && game.juicerBar == 0) {
			game[id] -= game[id + 'PerJuice']
			game.howMuchJuice = 1
			game.limeTypeToJuiceToggle = game.limeTypeToJuice
			juicerBar()
		}
	}
}

function makeMaxJuice() {
    if (game.juicerBar == 0) {
        if (game.limeTypeToJuice == 0)
            setJuice('limes')
		else
            setJuice('peeledLimes')
		
        if (game.howMuchJuice > 0)
            juicerBar()
    }
	
	function setJuice (id) {
        game.howMuchJuice = Math.floor(game[id] / game[id + 'PerJuice'])
			
		if (game.howMuchJuice > game.juicers)
			game.howMuchJuice = game.juicers
		game.limeTypeToJuiceToggle = game.limeTypeToJuice
		
        game[id] -= game.howMuchJuice * game[id + 'PerJuice']
	}
}

function juicerBar() {
	runBar('juicer', (0.15 + game.bitterSpeeding * 3) * (game.limeTypeToJuiceToggle * 3 + 1))
}

function juicerBarEnd() {
	game.juice += game.howMuchJuice
	game.hasGottenJuice = 1
}

function eatGoldenLime() {
	if (game.goldenLimes > 0) {
		game.goldenLimes -= 1
		game.eatGoldenLimeBar = 100
		game.bitterSpeeding = 1
		eatGoldenLimeBar()
	}
}

function eatGoldenLimeBar() {
    if (game.eatGoldenLimeBar > 0) {
        game.eatGoldenLimeBar -= 0.5
		updateBar("eatGoldenLime")
        setTimeout(eatGoldenLimeBar, (game.bitterSpeedSkillLevel / game.tickspeed))
    } 
	else 
		game.bitterSpeeding = 0
}

function peelLime() {
    if (game.limes >= 1) {
        game.limes -= 1
        if (Math.floor((Math.random() * 20) / game.knifebidextrousSkillLevel) == 0) {
            game.peeledLimes += 1
            game.limes -= 1
        }
        game.peeledLimes += 1
    }
}

loopNumberGoldenLimes = 0

function mainGameLoopInventory () {
	loopNumberGoldenLimes += 1	

	if (loopNumberGoldenLimes >= 200) {
        if (game.goldenLimes > 0)
			game.goldenLimes -= 1
		loopNumberGoldenLimes = 0
    }
}

function storageJuicersUnlock() {
	if (game.coins >= 100) {
		game.coins -= 100
		game.storageJuicersUnlock = 1
		game.juicersMax *= 5
	}
}

function storagePeelersUnlock() {
	if (game.coins >= 100) {
		game.coins -= 100
		game.storagePeelersUnlock = 1
		game.peelersMax *= 5
	}
}

function updateValuesInventory () {
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', game.foodTypeToggle)
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', game.limeTypeToJuice)

	function twoToggleButtons(button1, button2, value) {
		if (value == 1) {
			setColor(button1, myLime)
			setColor(button2, "gray")
		} else {
			setColor(button1, "gray")
			setColor(button2, myLime)
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
	
	checkShow(game.deliveryManager, 'sellMaxJuiceButton', 'inline')
	checkShow(!game.knife, 'buyKnifeDiv')
	checkShow(game.knife && game.knifebidextrousSkillLevel == game.knifebidextrousSkillLevelMax && game.maps > 1 && !game.sharperPeelers, 'sharperPeelerDiv')
	checkShow(game.knife && game.knifebidextrousSkillLevel == game.knifebidextrousSkillLevelMax && !(game.hideMaxedPurchases == 1 && game.peelers == game.peelersMax), 'buyAPeelerDiv')
	checkShow(game.knife, 'knifeDiv')
	checkShow(game.bulkBuyUnlock, 'peelersBulkButton', 'inline')
	checkShow(game.bulkBuyUnlock, 'juicersBulkButton', 'inline')
	checkShow(game.hasGottenPeeledLimes, 'juiceLimesToggleButton', 'inline')
	checkShow(game.hasGottenPeeledLimes, 'juicePeeledLimesToggleButton', 'inline')
	checkShow(game.bitterSpeedSkillLevel, 'eatGoldenLimeProgress')
	checkShow(game.bitterSpeedSkillLevel, 'eatGoldenLime')
	checkShow(game.peelers, 'peelerDiv')
	checkShow(game.peelers > 1, 'peelerPeelMaxButton', 'inline')
	checkShow(game.juicers > 1, 'makeMaxJuiceButton', 'visible')
	checkShow(game.juicers, 'inventoryButton')
	
	update('juicersAmount', game.juicers.toLocaleString() + ' / ' + game.juicersMax.toLocaleString() + ' Juicers')
	update('peelersAmount', game.peelers.toLocaleString() + ' / ' + game.peelersMax.toLocaleString() + ' Peelers')


	
	if (game.limeTypeToJuice == 0)
		update('juicerInfo', game.limesPerJuice + ' Limes -> 1 Juice')
	else
		update('juicerInfo', game.peeledLimesPerJuice + ' Peeled Limes -> 1 Juice')

	if (game.peeledLimes >= 1)
		game.hasGottenPeeledLimes = true
	


}