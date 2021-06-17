function advertise() {
    if (gameData.coins >= 10) {
        gameData.coins -= 10
        barStartGranular("advertise")
    }
}

function working() {
    gameData.employeeIsWorking = 1
    barStartGranular("working")

}

function basket() {
    gameData.basketBar = 0;
    gameData.limes += gameData.limesInBaskets;
    gameData.limesInBaskets = 0;
}

function workingBar() {
    if (gameData.workingBar <= 99 && gameData.employeeIsWorking == 1) {
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
    if ((gameData.eatBar >= 100 - (gameData.fork) / 2 || gameData.eatBar == 0) && gameData.eat < 100) {
        if (gameData.foodTypeToggle == 0 && gameData.limes > 0) {
            gameData.limes -= 1
            gameData.foodType = 5
            barStartGranularSkillBasic("eat")
        } else if (gameData.foodTypeToggle == 1 && gameData.rottenLimes > 0) {
            gameData.rottenLimes -= 1
            gameData.foodType = 1
            barStartGranularSkillBasic("eat")
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
        setTimeout(autoCollectingBar, 50)
    }

    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0) {
        getLimes()
    }

}




function learnANewSkill() {
    if (gameData.learnANewSkill <= 2 || (gameData.tomes == 1 && gameData.learnANewSkill <= 3)) {
        barStartGranular("learnANewSkill")
    }
}

function advertiseBar() {
    if (gameData.advertiseBar <= 99) {
        gameData.advertiseBar += 1;
		moveBar("advertise")
        setTimeout(advertiseBar, (200 / (gameData.advertisingLevel2 * 2 * gameData.advertisingLevel3 + gameData.advertisingLevel2 + 2 * gameData.advertisingLevel3 + 1) / gameData.tickspeed))
    } else {
        gameData.applicationReady = 1
        gameData.hasAdvertised = 1
        randomizeApplication()
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

function learnANewSkillBar() {
    if (gameData.learnANewSkillBar < 100) {
        gameData.learnANewSkillBar += 0.1;
        setTimeout(learnANewSkillBar, 10 / gameData.tickspeed)
    } else {
        switch (gameData.learnANewSkill) {
            case -2:
                gameData.learnANewSkill = -1
                update("newInfo", "You unlocked auto collection!")
                break;
            case -1:
                gameData.learnANewSkill = 0
                update("newInfo", "You learned Keen Eye!")
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
        }
    }

}

function sellYourJuice() {
    if ((gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
        gameData.deliveryType = gameData.deliveryTypeToggle
        gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
        gameData.coins -= gameData.deliveryPrice
        gameData.juice -= gameData.juiceBulkAmount
        gameData.deliveryBar = 0;
        sellYourJuiceBar()
    }

}

function sellYourJuiceBar() {


    if (gameData.deliveryBar <= 99.9) {
        if (gameData.deliveryType <= 1) {
            if (gameData.deliveryBar <= 99.9) {
                gameData.deliveryOngoing = 1
                gameData.deliveryBar += 0.1;
			    moveBar("delivery")
                setTimeout(sellYourJuiceBar, (100 / (gameData.deliveryType * 100 + 1)) / gameData.tickspeed)
            }
        } else if (gameData.deliveryType == 2) {
            if (gameData.deliveryBar <= 99.5) {
                gameData.deliveryOngoing = 1
                gameData.deliveryBar += 0.5;
			    moveBar("delivery")
                setTimeout(sellYourJuiceBar, (100 / (gameData.deliveryType * 100 + 1)) / gameData.tickspeed)
            }
        }
    } else {
        gameData.coins += Math.floor(gameData.juiceBulkAmount * (1 + (gameData.juicePriceCents / 100)))
        gameData.deliveryOngoing = 0
    }
}


function makeJuice() {

    if ((gameData.juicerBar >= 99 || gameData.juicerBar == 0)) {
        if (gameData.limeTypeToJuice == 0 && gameData.limes >= gameData.limesPerJuice) {
            gameData.limes -= gameData.limesPerJuice
            gameData.juicerBar = 0
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 0

            juicerBar()
        } else if (gameData.limeTypeToJuice == 1 && gameData.peeledLimes >= gameData.peeledLimesPerJuice) {
            gameData.peeledLimes -= gameData.peeledLimesPerJuice
            gameData.juicerBar = 0
            gameData.howMuchJuice = 1
            gameData.limeTypeToJuiceToggle = 1

            juicerBar()
        }
    }

}


function peelerPeel() {

    if (gameData.peelerBar >= 99 || gameData.peelerBar == 0) {

        if (gameData.limes >= 1) {
            gameData.howManyPeeledLimes = 1
            gameData.limes -= 1
            gameData.peelerBar = 0
            peelerBar()
        }
    }

}


function peelerPeelMax() {

    if (gameData.peelerBar >= 99 || gameData.peelerBar == 0) {
        gameData.howManyPeeledLimes = gameData.limes

        if (gameData.howManyPeeledLimes > gameData.peelers) {
            gameData.howManyPeeledLimes = gameData.peelers
        }


        gameData.limes -= gameData.howManyPeeledLimes

        if (gameData.howManyPeeledLimes > 0) {

            gameData.peelerBar = 0;
            peelerBar()

        }
    }
}


function makeMaxJuice() {

    if ((gameData.juicerBar == 100 || gameData.juicerBar == 0) && gameData.isCurrentlyJuicing == 0) {

        if (gameData.limeTypeToJuice == 0) {
            gameData.howMuchJuice = Math.floor(gameData.limes / gameData.limesPerJuice)
            if (gameData.howMuchJuice > gameData.juicers) {
                gameData.howMuchJuice = gameData.juicers
            }
            gameData.limeTypeToJuiceToggle = 0
            gameData.limes -= gameData.howMuchJuice * gameData.limesPerJuice
        } else {
            gameData.howMuchJuice = Math.floor(gameData.peeledLimes / gameData.peeledLimesPerJuice)
            if (gameData.howMuchJuice > gameData.juicers) {
                gameData.howMuchJuice = gameData.juicers
            }

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
    if (gameData.juicerBar <= 99.5) {
        gameData.juicerBar += 0.5;
		moveBar("juicer")
        var x = (gameData.limeTypeToJuiceToggle * 3 + 1) * gameData.tickspeed
        setTimeout(juicerBar, 50 / x)
    } else {
        gameData.juice += gameData.howMuchJuice;
		gameData.hasGottenJuice = 1
        gameData.isCurrentlyJuicing = 0
    }
}

function peelerBar() {
    if (gameData.peelerBar <= 99.5) {

        gameData.peelerBar += 0.5;
		moveBar("peeler")
        setTimeout(peelerBar, (50 / ((gameData.sharperPeelers + 1) * 2)) / gameData.tickspeed)
    } else {
        gameData.peeledLimes += gameData.howManyPeeledLimes;
    }
}