function working() {
    gameData.employeeIsWorking = 1
    barStart("working")

}

function workingBar() {
    if (gameData.workingBar < 100 && gameData.employeeIsWorking == 1) {
        gameData.workingBar += 1;
        setTimeout(workingBar, 600 / gameData.tickspeed)
    } 
	
	else {
        if (gameData.employeeIsWorking == 1) {
            gameData.limes += gameData.employeeCurrentSpeed
            gameData.employeeWorking -= 1
        }

        if (gameData.employeeWorking > 0) {
            working()
        } else {
            gameData.employeeIsWorking = 0
        }
    }
}

function basket() {
    gameData.basketBar = 0
    gameData.limes += gameData.limesInBaskets
	gameData.goldenLimes += gameData.goldenLimesInBaskets
    gameData.limesInBaskets = 0
    gameData.goldenLimesInBaskets = 0

}

function teach() {
    gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
	setTimeout('barStart("teach")', 1000)
}

function teachBar() {
	barMoverAdvanced('teach', 1, 20)
}

function teachBarEnd() {}

function eat() {
    if (canStartBar('eat') && gameData.eat < 100) {
		startEatBar('limes', 5, 0)
		startEatBar('rottenLimes', 1, 1)
    }
}

function startEatBar(id, nutrition, type) {
    if (gameData.foodTypeToggle == type && gameData[id] > 0)
	{
		gameData[id] -= 1
		gameData.foodType = nutrition
		gameData.eatBar = 0
		eatBar()
	}
}

function eatBar() {
	barMoverAdvanced('eat', 0.5 * (gameData.fork + 1), 10)
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
    if (gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5))
        gameData.autoCollectingBar += 0.5;
		moveAutoCollecting()
        setTimeout(autoCollectingBar, 50)
    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0 && gameData.autoCollectingBar < (((gameData.nourishment + 1) * 100) - 0.5)) {
        getLimes()
    }
}

function moveAutoCollecting() {
    var elem = document.getElementById("autoCollectingBar");
	var x = gameData.autoCollectingBar / (gameData.nourishment + 1)
    elem.style.width = x + "%"
    elem.innerHTML =  Math.floor(x) + "%"
}

function convertCoinsNow() {
    if (canStartBar('convertCoinsNow') && gameData.coins >= 1e5) {
        gameData.coins -= 1e5
		gameData.convertedCoinsSinceTravel += 1
		gameData.convertCoinsNowBar = 0
        convertCoinsNowBar()
    }
}

function convertCoinsNowBar() {
	barMoverAdvanced('convertCoinsNow', 0.5, 50 * Math.pow(2, (gameData.convertedCoinsSinceTravel + 1)))
}

function convertCoinsNowBarEnd() {
    gameData.megaCoins += 1
}


function learnANewSkill() {
    if (gameData.learnANewSkill - gameData.tomes <= 2) {
        barStart("learnANewSkill")
    }
}


function currencyBrokerHireBar() {
	barMoverAdvanced('currencyBrokerHire', 0.5, 20)
}

function currencyBrokerHireBarEnd() {
	gameData.currencyApplicationReady = 1
	randomizeApplicationCurrencyBroker()
}

function keenEyeBar() {
    basicBarSkill("keenEye")
}

function rottenWisdomBar() {
    basicBarSkill("rottenWisdom")
}

function limebidextrousBar() {
    basicBarSkill("limebidextrous")
}

function intelligenceBar() {
    basicBarSkill("intelligence")
}

function knifebidextrousBar() {
    basicBarSkill("knifebidextrous")
}

function motivationBar() {
    basicBarSkill("motivation")
}

function ambidextrousBar() {
    basicBarSkill("ambidextrous", "slow")
}

function bitterSpeedBar() {
    basicBarSkill("bitterSpeed")
}

function learnANewSkillBar() {
	barMoverAdvanced('learnANewSkill', 0.2, 15)
}

function learnANewSkillBarEnd() {
	switch (gameData.learnANewSkill) {
		case -2:
			update("newInfo", "You learned Keen Eye!")
			break;
		case -1:
			update("newInfo", "You unlocked auto collection!")
			break;
		case 0:
			update("newInfo", "You Learned Rotten Wisdom!")
			break;
		case 1:
			update("newInfo", "You Learned Limebidextrous!")
			break;
		case 2:
			update("newInfo", "You Learned Intelligence!")
			break;
		case 3:
			update("newInfo", "You Learned Knifebidextrous!")
			break;
		case 4:
			update("newInfo", "You Learned Motivation!")
			break;
		case 5:
			update("newInfo", "You Learned Ambidextrous!")
			break;
		case 6:
			update("newInfo", "You Learned Bitter Speed!")
			break;
    }
	gameData.learnANewSkill += 1
}

function delivery() {
    if (canStartBar('delivery') && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
        gameData.deliveryType = gameData.deliveryTypeToggle
        gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
        gameData.coins -= gameData.deliveryPrice
        gameData.juice -= gameData.juiceBulkAmount
        gameData.deliveryBar = 0;
		gameData.thisTownDeliveries += 1
		
        deliveryBar()
    }

}

function deliveryBar() {	
	if (gameData.deliveryType == 0) 
		barMoverAdvanced('delivery', 0.1, 100)
	else if (gameData.deliveryType == 1)
		barMoverAdvanced('delivery', 0.5, 15)
	else
		barMoverAdvanced('delivery', 1, 15)

}

function deliveryBarEnd() {
	gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + (gameData.juicePriceCents / 100)))
}


function peelerPeel() {
    if (canStartBar('peeler') && gameData.limes > 0) {
		gameData.howManyPeeledLimes = 1
		peelerStart()
    }
}

function peelerPeelMax() {
    if (canStartBar('peeler'))
	{
        gameData.howManyPeeledLimes = gameData.limes

        if (gameData.howManyPeeledLimes > gameData.peelers) 
            gameData.howManyPeeledLimes = gameData.peelers

        if (gameData.howManyPeeledLimes > 0)
			peelerStart()
    }
}

function peelerStart(){
	gameData.limes -= gameData.howManyPeeledLimes
	gameData.peelerBar = 0;
	peelerBar()
}

function makeJuice() {

    if (canStartBar('juicer')) 
	{
        if (gameData.limeTypeToJuice == 0 && gameData.limes >= gameData.limesPerJuice) 
		{
            gameData.limes -= gameData.limesPerJuice
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 0
            juicerStart()
        } 
		else if (gameData.limeTypeToJuice == 1 && gameData.peeledLimes >= gameData.peeledLimesPerJuice) 
		{
            gameData.peeledLimes -= gameData.peeledLimesPerJuice
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 1
            juicerStart()
        }
    }

}

function juicerStart(){
	gameData.juicerBar = 0
	juicerBar()
}

function makeMaxJuice() {
    if (canStartBar('juicer')) {

        if (gameData.limeTypeToJuice)
			calculateHowMuchJuice('peeledLimes', 1)
		else 
			calculateHowMuchJuice('limes', 0)
		
        if (gameData.howMuchJuice > 0) {
            juicerStart()
        }
    }
}

function calculateHowMuchJuice(id, x){
	gameData.howMuchJuice = Math.floor(gameData[id] / gameData[id + 'PerJuice'])
	if (gameData.howMuchJuice > gameData.juicers)
		gameData.howMuchJuice = gameData.juicers
	gameData[id] -= gameData.howMuchJuice * gameData[id + 'PerJuice']
	gameData.limeTypeToJuiceToggle = x
}

function peelerBar() {
	barMoverAdvanced('peeler', 0.5 + gameData.bitterSpeeding * 10, 50 / ((gameData.sharperPeelers + 1) * 2))
}

function peelerBarEnd() {
	gameData.peeledLimes += gameData.howManyPeeledLimes
}

function juicerBar() {
	barMoverAdvanced('juicer', 0.5 + gameData.bitterSpeeding * 10, 50 / (gameData.limeTypeToJuiceToggle * 3 + 1))
}

function juicerBarEnd() {
	gameData.juice += gameData.howMuchJuice
	gameData.hasGottenJuice = 1
}

function eatGoldenLime(){
	if(gameData.goldenLimes > 0)
	{
		gameData.goldenLimes -= 1
		gameData.eatGoldenLimeBar = 100
		gameData.bitterSpeeding = 1
		eatGoldenLimeBar()
	}
}

function eatGoldenLimeBar(){
	
    if (gameData.eatGoldenLimeBar > 0) 
		barMover('eatGoldenLime', -0.5, gameData.bitterSpeedSkillLevel)
	else 
		gameData.bitterSpeeding = 0
}

function barMover(id, amount, time){
	gameData[id + 'Bar'] += amount
	moveBar(id)
	setTimeout(eval(id + 'Bar'), time / gameData.tickspeed)
}

function barMoverAdvanced(id, amount, time){
	bar = id + 'Bar'
	gameData[id + 'BarRunning'] = true
	
	if (gameData[bar] > 100)
		gameData[bar] = 100
		
	if (gameData[bar] < 100)
		barMover(id, amount, time)
	else {
		window[id + 'BarEnd']()
		gameData[id + 'BarRunning'] = false
	}

}

function restartBar(id) {
	if (!canStartBar(id))
		window[id + 'Bar']()
	else
		gameData[id + 'BarRunning'] = false
}



function barStart(variable) {
	if (canStartBar(variable)) {
		gameData[variable + "Bar"] = 0
		window[variable + "Bar"]()
	}
}

function barStartGranularSkillBasic(x, useSkillTrainer) {
	id = x + "Bar"
	skillLevel = gameData[x + "SkillLevel"]
	if (canStartBar(x) && skillLevel < gameData[x + "SkillLevelMax"] && gameData.eat >= skillLevel) {
		
		gameData.eat -= skillLevel
		
		if (gameData.skillTrainer && useSkillTrainer)
			gameData[id] = 100
		else
			gameData[id] = 0

		window[id]()
	}
}

function canStartBar(id){
    if ((gameData[id + 'Bar'] == 100 || gameData[id + 'Bar'] == 0) && gameData[id + 'BarRunning'] == false)
		return true
}

function moveBar(x) {
    i = x + "Bar"
	if(gameData[i] > 100)
		gameData[i] = 100

    document.getElementById(i).style.width = gameData[i] + "%"
    document.getElementById(i).innerHTML = "  " + Math.ceil(gameData[i]) + "%"
}

function basicBarSkill(variable, speed) {

	variableBar = variable + "Bar"
	gameData[variable + 'BarRunning'] = true
	
	if (gameData[variableBar] < 100) {

		gameData[variableBar] += 0.5

		var value = 100

		if (speed == 'slow')
			value = 1000

		setTimeout(variableBar + "()", (value / (gameData.intelligenceSkillLevel * 2 / 20 + 1)) / gameData.tickspeed)

	} else {
		gameData[variable + 'BarRunning'] = false
		gameData[variable + "SkillLevel"] += 1
		gameData[variable] += 2

	}
	moveBar(variable)
}