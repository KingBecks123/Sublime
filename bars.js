function basket() {
    gameData.basketBar = 0
    gameData.limes += gameData.limesInBaskets
	gameData.goldenLimes += gameData.goldenLimesInBaskets
    gameData.limesInBaskets = 0
    gameData.goldenLimesInBaskets = 0
}

function working() {
    gameData.employeeIsWorking = 1
    barStart("working")
}

function workingBar() {
    if (gameData.workingBar < 100 && gameData.employeeIsWorking) {
        gameData.workingBar += 0.025
        setTimeout(workingBar, 15 / gameData.tickspeed)
    } 
	else {
        if (gameData.employeeIsWorking) {
            gameData.limes += gameData.employeeCurrentSpeed
            gameData.employeeWorking -= 1
        }
        if (gameData.employeeWorking > 0)
            working()
        else
            gameData.employeeIsWorking = 0
    }
}

function teach() {
    gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
	setTimeout('barStart("teach")', 1000)
}

function teachBar() {
	runBar('teach', 0.75)
}

function teachBarEnd() {}

function eat() {
    if (gameData.eatBar == 0 && gameData.eat < 100) {
        if (gameData.foodTypeToggle == 0 && gameData.limes > 0)
			startEating ('limes', 5)
        else if (gameData.foodTypeToggle == 1 && gameData.rottenLimes > 0)
			startEating ('rottenLimes', 1)
    }
	function startEating (type, amount) {
		gameData[type] -= 1
		gameData.foodType = amount
		gameData.eatBar = 0
		eatBar()
	}
}

function eatBar() {
	runBar('eat', 0.75 * (gameData.fork + 1))
}

function eatBarEnd() {
    gameData.eat += gameData.foodType * (gameData.nutritionists + 1)
}

function autoCollecting() {
    if (gameData.autoCollectingBar == (gameData.nourishment + 1) * 100 || gameData.autoCollectingBar == 0) {
        gameData.autoCollectingBar = 0
		gameData.isAutoCollecting = 1
        autoCollectingBar()
    }
}

function autoCollectingBar() {
    if (gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5)) {
        gameData.autoCollectingBar += 0.5;
		moveAutoCollecting()
        setTimeout(autoCollectingBar, 50)
    }
    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0)
        getLimes()
}

function convertCoinsNow() {
    if (gameData.coins >= 1e5 && (gameData.convertCoinsNowBar == 0 || gameData.convertCoinsNowBar == 100)) {
        gameData.coins -= 1e5
		gameData.convertedCoinsSinceTravel += 1
		gameData.convertCoinsNowBar = 0
        convertCoinsNowBar()
    }
}


function convertCoinsNowBar() {
	runBar('convertCoinsNow', 0.075 / Math.pow(2, gameData.convertedCoinsSinceTravel))
}

function convertCoinsNowBarEnd() {
    gameData.megaCoins += 1
}

function learnANewSkill() {
    if (gameData.learnANewSkill - gameData.tomes <= 2)
        barStart("learnANewSkill")
}

function learnANewSkillBar() {
	runBar('learnANewSkill', 0.2)
}

function learnANewSkillBarEnd() {
	switch (gameData.learnANewSkill) {
		case -2:
			gameData.learnANewSkill = -1
			update("newInfo", "You learned Keen Eye!")
			break;
		case -1:
			gameData.learnANewSkill = 0
			update("newInfo", "You unlocked auto collection!")
			break;
		case 0:
			gameData.learnANewSkill = 1
			update("newInfo", "You Learned Rotten Wisdom!")
			break;
		case 1:
			gameData.learnANewSkill = 2
			update("newInfo", "You Learned Limebidextrous!")
			break;
		case 2:
			gameData.learnANewSkill = 3
			update("newInfo", "You Learned Intelligence!")
			break;
		case 3:
			gameData.learnANewSkill = 4
			update("newInfo", "You Learned Knifebidextrous!")
			break;
		case 4:
			gameData.learnANewSkill = 5
			update("newInfo", "You Learned Motivation!")
			break;
		case 5:
			gameData.learnANewSkill = 6
			update("newInfo", "You Learned Ambidextrous!")
			break;
		case 6:
			gameData.learnANewSkill = 7
			update("newInfo", "You Learned Bitter Speed!")
    }
}

function delivery() {
    if (gameData.deliveryBar == 0 && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
        gameData.deliveryType = gameData.deliveryTypeToggle
        gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
        gameData.coins -= gameData.deliveryPrice
        gameData.juice -= gameData.juiceBulkAmount
        gameData.deliveryBar = 0
		gameData.thisTownDeliveries += 1
        deliveryBar()
    }
}

function deliveryBar() {	
	if (gameData.deliveryType == 0)
		amount = 0.02
	else if (gameData.deliveryType == 1)
		amount = 0.5
	else
		amount = 1
	
	runBar('delivery', amount)
}

function deliveryBarEnd() {
	gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + gameData.juicePriceCents / 100))
}

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

function runBar(id, amount) {	
	if (gameData[id + 'Bar'] < 100) {
		gameData[id + 'Bar'] += amount
		setTimeout(window[id + 'Bar'], 15 / gameData.tickspeed)
	}
	else {
		gameData[id + 'Bar'] = 0
		window[id + 'BarEnd']()
	}
	updateBar(id)
}

function barStartGranularSkillBasic(variable, useSkillTrainer) {
	level = variable + 'SkillLevel'
	bar = variable + 'Bar'
	if (gameData[bar] == 0 && gameData[level] < gameData[level + 'Max'] && gameData.eat >= gameData[level]) {
		gameData.eat -= gameData[level]
		if (gameData.skillTrainer && useSkillTrainer)
			gameData[bar] = 100
		else
			gameData[bar] = 0
		
		runSkill(variable)
	}
}

function runSkill(variable) {
	if (variable == 'ambidextrous')
		speed = 500
	else
		speed = 50
	
	if (gameData[variable + "Bar"] < 100) {
		gameData[variable + 'Bar'] += ((3 * gameData.intelligenceSkillLevel + 30) / 8) / speed
		setTimeout(runSkill, 15 / gameData.tickspeed, variable)
	}
	else {
		gameData[variable + 'Bar'] = 0
		gameData[variable + "SkillLevel"] += 1
		gameData[variable] += 2
	}
	updateBar(variable)
}