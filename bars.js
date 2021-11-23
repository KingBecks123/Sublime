function working() {
    gameData.employeeIsWorking = 1
    barStart("working")

}


function basket() {
    gameData.basketBar = 0;
    gameData.limes += gameData.limesInBaskets;
	gameData.goldenLimes += gameData.goldenLimesInBaskets;
    gameData.limesInBaskets = 0;
    gameData.goldenLimesInBaskets = 0;

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

function teach() {
    gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
	setTimeout('barStart("teach")', 1000)
}

function teachBar() {
	barMoverAdvanced('teach', 1, 20)
}

function teachBarEnd() {}

function eat() {
    if ((gameData.eatBar == 100 || gameData.eatBar == 0) && gameData.eat < 100) {
        if (gameData.foodTypeToggle == 0 && gameData.limes > 0) {
            gameData.limes -= 1
            gameData.foodType = 5
			
			if (gameData.eatBar == 100 || gameData.eatBar == 0) {
				gameData.eatBar = 0
				eatBar()
			}
			
			
        } else if (gameData.foodTypeToggle == 1 && gameData.rottenLimes > 0) {
            gameData.rottenLimes -= 1
            gameData.foodType = 1
			
			if (gameData.eatBar == 100 || gameData.eatBar == 0) {
				gameData.eatBar = 0
				eatBar()
			}
		}
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
    if (gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5)) {
        gameData.autoCollectingBar += 0.5;
		moveAutoCollecting()
        setTimeout(autoCollectingBar, 50)
    }

    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0) {
        getLimes()
    }

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
	barMoverAdvanced('currencyBrokerHire', 0.5, 50 * Math.pow(2, (gameData.convertedCoinsSinceTravel + 1)))
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


function intelligenceBar() {
    basicBarSkill("intelligence")
}

function limebidextrousBar() {
    basicBarSkill("limebidextrous")
}

function knifebidextrousBar() {
    basicBarSkill("knifebidextrous")
}

function rottenWisdomBar() {
    basicBarSkill("rottenWisdom")
}

function keenEyeBar() {
    basicBarSkill("keenEye")
}

function ambidextrousBar() {
    basicBarSkill("ambidextrous", "slow")
}

function motivationBar() {
    basicBarSkill("motivation")
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
    if (!gameData.deliveryOngoing && (gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
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
	gameData.deliveryOngoing = 1
	
	if (gameData.deliveryType == 0) 
		barMoverAdvanced('delivery', 0.1, 100)
	
	else if (gameData.deliveryType == 1)
		barMoverAdvanced('delivery', 0.5, 15)
	
	else
		barMoverAdvanced('delivery', 1, 15)

}

function deliveryBarEnd() {
	gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + (gameData.juicePriceCents / 100)))
	gameData.deliveryOngoing = 0
}


function makeJuice() {

    if (gameData.juicerBar >= 99 || gameData.juicerBar == 0) 
	{
        if (gameData.limeTypeToJuice == 0 && gameData.limes >= gameData.limesPerJuice) 
		{
            gameData.limes -= gameData.limesPerJuice
            gameData.juicerBar = 0
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 0

            juicerBar()
        } 
		else if (gameData.limeTypeToJuice == 1 && gameData.peeledLimes >= gameData.peeledLimesPerJuice) 
		{
            gameData.peeledLimes -= gameData.peeledLimesPerJuice
            gameData.juicerBar = 0
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 1

            juicerBar()
        }
    }

}


function peelerPeel() {

    if ((gameData.peelerBar >= 99 || gameData.peelerBar == 0) && gameData.limes >= 1) {
		gameData.howManyPeeledLimes = 1
		gameData.limes -= 1
		gameData.peelerBar = 0
		peelerBar()
    }

}


function peelerPeelMax() {

    if (gameData.peelerBar >= 99 || gameData.peelerBar == 0) 
	{
        gameData.howManyPeeledLimes = gameData.limes

        if (gameData.howManyPeeledLimes > gameData.peelers) 
            gameData.howManyPeeledLimes = gameData.peelers

        gameData.limes -= gameData.howManyPeeledLimes

        if (gameData.howManyPeeledLimes > 0) {

            gameData.peelerBar = 0;
            peelerBar()

        }
    }
}


function makeMaxJuice() {

    if ((gameData.juicerBar >= 100 || gameData.juicerBar == 0) && gameData.isCurrentlyJuicing == 0) {

        if (gameData.limeTypeToJuice == 0)
		{
            gameData.howMuchJuice = Math.floor(gameData.limes / gameData.limesPerJuice)
			
            if (gameData.howMuchJuice > gameData.juicers)
                gameData.howMuchJuice = gameData.juicers
			
            gameData.limeTypeToJuiceToggle = 0
            gameData.limes -= gameData.howMuchJuice * gameData.limesPerJuice
        } 
		else 
		{
            gameData.howMuchJuice = Math.floor(gameData.peeledLimes / gameData.peeledLimesPerJuice)
            if (gameData.howMuchJuice > gameData.juicers)
                gameData.howMuchJuice = gameData.juicers

            gameData.peeledLimes -= gameData.howMuchJuice * gameData.peeledLimesPerJuice
            gameData.limeTypeToJuiceToggle = 1
        }
		
        if (gameData.howMuchJuice > 0) {
            gameData.juicerBar = 0;
			gameData.isCurrentlyJuicing = 1
            juicerBar()
        }
    }
}

function peelerBar() {
	barMoverAdvanced('peeler', 0.5 + gameData.bitterSpeeding * 10, 50 / (gameData.sharperPeelers + 1) * 2)
}

function peelerBarEnd() {
	gameData.juice += gameData.howMuchJuice
	gameData.hasGottenJuice = 1
	gameData.isCurrentlyJuicing = 0
}

function juicerBar() {
	barMoverAdvanced('juicer', 0.5 + gameData.bitterSpeeding * 10, 50 / (gameData.limeTypeToJuiceToggle * 3 + 1))
}

function juicerBarEnd() {
	gameData.juice += gameData.howMuchJuice
	gameData.hasGottenJuice = 1
	gameData.isCurrentlyJuicing = 0
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
	{
        gameData.eatGoldenLimeBar -= 0.5;
		moveBar("eatGoldenLime")
        setTimeout(eatGoldenLimeBar, (gameData.bitterSpeedSkillLevel / gameData.tickspeed))
    } 
	else 
		gameData.bitterSpeeding = 0
}