function advertise() {
    if ((gameData.advertiseBar == 100 || gameData.advertiseBar == 0) && (gameData.coins >= gameData.advertisePrice) && gameData.isAdvertising == 0) {
        gameData.coins -= gameData.advertisePrice
		gameData.typeToHire = gameData.typeToHireToggle
        gameData.advertiseBar = 0
		gameData.isAdvertising = 1
        advertiseBar()
    }
}

function advertiseBar() {
    if (gameData.advertiseBar < 100) {
        gameData.advertiseBar += 0.5;
		moveBar("advertise")
        setTimeout(advertiseBar, (100 / (gameData.advertisingLevel2 * 2 * gameData.advertisingLevel3 + gameData.advertisingLevel2 + 2 * gameData.advertisingLevel3 + 1) / gameData.tickspeed))
    } else {
        gameData.applicationReady = 1
        gameData.hasAdvertised = 1
        randomizeApplication()
		gameData.isAdvertising = 0

    }
    
}

function useBellows() {
	if(gameData.bellowsBar < 0.5)
	{	
		gameData.bellowsBar = 100
		bellowsBar()
	}

	gameData.bellowsBar = 100
	gameData.bellowsCurrentlyBlowing = 1

}

function bellowsBar() {
    if (gameData.bellowsBar > 0) {
        gameData.bellowsBar -= 0.5;
		moveBar("bellows")
        setTimeout(bellowsBar, 100)
    } else {
		gameData.bellowsCurrentlyBlowing = 0
    }
}

function bakePie() {
    if ((gameData.bakePieBar == 100 || gameData.bakePieBar == 0) && gameData.juiceAsPieIngredient > 0 && gameData.flourAsPieIngredient > 0 && !gameData.isPieBaking) {
        gameData.bakePieBar = 0
		gameData.isPieBaking = 1
        bakePieBar()
    }
}

function bakePieBar() {
    if (gameData.bakePieBar < 100) {
        gameData.bakePieBar += 0.5;
		moveBar("bakePie")
        setTimeout(bakePieBar, 100 / (gameData.bellowsCurrentlyBlowing + 1))
    } else {
		gameData.pies += 1
		gameData.juiceAsPieIngredient = 0
		gameData.flourAsPieIngredient = 0
		gameData.isPieBaking = 0
    }
}

function findPieCustomers() {
    if ((gameData.findPieCustomersBar == 100 || gameData.findPieCustomersBar == 0) && !gameData.isFindingPieCustomers) {
        gameData.findPieCustomersBar = 0
		gameData.isFindingPieCustomers = 1			
		update("couldFindCustomer", "Waiting for customers...")		
        findPieCustomersBar()
    }
}

function findPieCustomersBar() {
    if (gameData.findPieCustomersBar < 100) {
		
		if(findPieCustomersBarDoMove)
			gameData.findPieCustomersBar += 0.5;
		
		findPieCustomersBarDoMove = 1
		moveBar("findPieCustomers")
		setTimeout(findPieCustomersBar, (Math.pow(2, gameData.piePrice) + 10) / gameData.tickspeed)
		
    } else {
        lookForCustomer()
    }
    
}

function searchForACurrencyBroker() {
    if (gameData.alphaCoins >= 10) {
        gameData.alphaCoins -= 10
        barStartGranular("currencyBrokerHire")
    }
}

function working() {
    gameData.employeeIsWorking = 1
    barStartGranular("working")

}

function coinsToAlphaStart() {
	
	if(!gameData.autoCurrencyConversionBuy){
		price = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount
		if (gameData.coins >= price && (gameData.coinsToAlphaBar == 100 || gameData.coinsToAlphaBar == 0)) {
			gameData.coins -= price
			gameData.coinsToAlphaBar = 0
			coinsToAlphaBar()
		}
	}
	else
	{
		pickCurrentTask('autoCurrencyConversionBuy')
	}

}

function coinsToAlphaClick(){
	price = (gameData.alphaCoinsExchangeRate + gameData.currencyBrokerFee) * gameData.currencyBrokerTransferAmount
	if (gameData.coins >= price && (gameData.coinsToAlphaBar == 100 || gameData.coinsToAlphaBar == 0) && gameData.isCurrentlyExchangingAlpha == 0) {
		gameData.coins -= price
		gameData.coinsToAlphaBar = 0
		gameData.isCurrentlyExchangingAlpha = 1
		coinsToAlphaBar()
	}
}

function coinsToAlphaBar() {
	if (gameData.currencyBrokerSpeed == 1)
	{
		if (gameData.coinsToAlphaBar < 100) {

			gameData.coinsToAlphaBar += 1.5;
			if (gameData.coinsToAlphaBar > 100)
				gameData.coinsToAlphaBar = 100

			moveBar("coinsToAlpha")
			setTimeout(coinsToAlphaBar, 15 / gameData.tickspeed)
		} else {
			gameData.alphaCoins += gameData.currencyBrokerTransferAmount
			gameData.isCurrentlyExchangingAlpha = 0
		}
	}
	else
	{
		if (gameData.coinsToAlphaBar <= 99.5) {

			gameData.coinsToAlphaBar += 0.5;
			moveBar("coinsToAlpha")
			if(gameData.doesHaveCurrencyBroker)
				setTimeout(coinsToAlphaBar, 5 * gameData.currencyBrokerSpeed / gameData.tickspeed)
			else
				setTimeout(coinsToAlphaBar, 100 / gameData.tickspeed)
		} else {
			gameData.alphaCoins += gameData.currencyBrokerTransferAmount
			gameData.isCurrentlyExchangingAlpha = 0
		}
	}
}

function alphaToBetaClick(){
	price = gameData.betaCoinsExchangeRate * gameData.betaCoinTransferAmount
	if (gameData.alphaCoins >= price && (gameData.alphaToBetaBar == 100 || gameData.alphaToBetaBar == 0)) {
		gameData.alphaCoins -= price
		gameData.alphaToBetaBar = 0
		alphaToBetaBar()
	}
}

function alphaToBetaBar() {
	if (gameData.alphaToBetaBar <= 99.5) {

		gameData.alphaToBetaBar += 0.5;
		moveBar("alphaToBeta")
		setTimeout(alphaToBetaBar, 15 / gameData.tickspeed)
		
	} else {
		gameData.betaCoins += gameData.betaCoinTransferAmount
		
	}
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
    } else {
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
	
	setTimeout('barStartGranular("teach")', 1000)
    
}

function teachBar() {
    if (gameData.teachBar <= 99) {
        gameData.teachBar += 1;
        setTimeout(teachBar, 20)
    }
}

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
    if (gameData.eatBar < 100) {
        gameData.eatBar += 0.5 * (gameData.fork + 1) ;
        setTimeout(eatBar, 10)
		moveBar("eat")
        } else {
            gameData.eat += gameData.foodType * (gameData.nutritionists + 1)
            if (gameData.eat > 100) {
                gameData.eat = 100
            }
		}
}

function watertight() {
    if (gameData.peeledLimesPerJuice > 1) {
		
		
		barStartGranular('watertight')
	}
}

function watertightBar() {
    if (gameData.watertightBar < 100) {
		if (gameData.watertightResearchers > 0)
		{
			if(watertightBarDoMove)
				gameData.watertightBar += 0.5;
			
			watertightBarDoMove = 1
			
			setTimeout(watertightBar, (1e4 * Math.pow(10, 5 - gameData.peeledLimesPerJuice)) / gameData.watertightResearchers)
		}
		
		moveBar("watertight")
        } else {
			gameData.peeledLimesPerJuice -= 1
		}
}

function surveying() {
    if (gameData.numberOfTiles < 20) {

		barStartGranular('surveying')
	}
}




function surveyingBar() {
    if (gameData.surveyingBar < 100) {
		if (gameData.surveyingResearchers > 0)
		{
			if(surveyingBarDoMove)
				gameData.surveyingBar += 0.5;
			
			surveyingBarDoMove = 1
			setTimeout(surveyingBar, (1e3 * Math.pow(2, gameData.numberOfTiles - 15)) / gameData.surveyingResearchers)
		}
		
		moveBar("surveying")
		
        } else {
			gameData.numberOfTiles += 1
			
			diseaseControlQuit()
		}
}

function benevolenceBar() {
    if (gameData.benevolenceBar < 100) {
		if (gameData.benevolenceResearchers > 0)
		{
			if(benevolenceBarDoMove)
				gameData.benevolenceBar += 0.5;
			
			benevolenceBarDoMove = 1
			setTimeout(benevolenceBar, (1e3 * benevolenceEquation) / gameData.benevolenceResearchers)
		}
		
		moveBar("benevolence")
		
        } else {
			gameData.benevolence += 1
		}
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
    if (gameData.convertCoinsNowBar < 100) {
        gameData.convertCoinsNowBar += 0.5;
		moveBar("convertCoinsNow")
        setTimeout(convertCoinsNowBar, 50 * Math.pow(2, (gameData.convertedCoinsSinceTravel + 1)))
    }
	else
	{
        gameData.megaCoins += 1
	}
		


}


function learnANewSkill() {
    if (gameData.learnANewSkill - gameData.tomes <= 2) {
        barStartGranular("learnANewSkill")
    }
}


function currencyBrokerHireBar() {
    if (gameData.currencyBrokerHireBar < 100) {
        gameData.currencyBrokerHireBar += 0.5;
		moveBar("currencyBrokerHire")
        setTimeout(currencyBrokerHireBar, (20 / gameData.tickspeed))
    } else {
		gameData.currencyApplicationReady = 1
        randomizeApplicationCurrencyBroker()
    }
    
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
    if (gameData.learnANewSkillBar < 100) {
        gameData.learnANewSkillBar += 0.1;
		moveBar("learnANewSkill")
        setTimeout(learnANewSkillBar, 10 / gameData.tickspeed)
    } else {
		
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
            case 6:
                gameData.learnANewSkill = 7
                update("newInfo", "You Learned Bitter Speed!")
        }
    }

}

function sellYourJuice() {
    if (!gameData.deliveryOngoing && (gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
        gameData.deliveryType = gameData.deliveryTypeToggle
        gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
        gameData.coins -= gameData.deliveryPrice
        gameData.juice -= gameData.juiceBulkAmount
        gameData.deliveryBar = 0;
		gameData.thisTownDeliveries += 1
		
        sellYourJuiceBar()
    }

}

function sellYourJuiceBar() {


    if (gameData.deliveryBar <= 99.9) 
	{
        if (gameData.deliveryType == 0) 
		{
			gameData.deliveryOngoing = 1
			gameData.deliveryBar += 0.1;
			setTimeout(sellYourJuiceBar, 100 / gameData.tickspeed)
        } 
		else if (gameData.deliveryType == 1 && gameData.deliveryBar <= 99.5)
		{
			gameData.deliveryOngoing = 1
			gameData.deliveryBar += 0.5;
			setTimeout(sellYourJuiceBar, 15 / gameData.tickspeed)
        }
		else if (gameData.deliveryBar < 100)
		{
			gameData.deliveryOngoing = 1
			gameData.deliveryBar += 1;
			setTimeout(sellYourJuiceBar, 15 / gameData.tickspeed)
        }
		
		moveBar("delivery")

    } 
	
	else {
        gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + (gameData.juicePriceCents / 100)))
        gameData.deliveryOngoing = 0
    }
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

function juicerBar() {
    if (gameData.juicerBar < 100) 
	{
        gameData.juicerBar += 0.5 + gameData.bitterSpeeding * 10;
		moveBar("juicer")
        setTimeout(juicerBar, 50 / ((gameData.limeTypeToJuiceToggle * 3 + 1) * gameData.tickspeed))
    } 
	else 
	{
        gameData.juice += gameData.howMuchJuice;
		gameData.hasGottenJuice = 1
        gameData.isCurrentlyJuicing = 0
    }
}

function peelerBar() {
    if (gameData.peelerBar < 100) 
	{
        gameData.peelerBar += 0.5 + gameData.bitterSpeeding * 10
		moveBar("peeler")
        setTimeout(peelerBar, (50 / ((gameData.sharperPeelers + 1) * 2)) / gameData.tickspeed)
    } 
	else 
		gameData.peeledLimes += gameData.howManyPeeledLimes;
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