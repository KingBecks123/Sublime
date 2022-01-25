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

function travelToNextVillage() {
    if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		
		if (gameData.increaseJuicePricePermanance == 1)
		    saveBeforeWipe('juicePriceCents')
		
		if (gameData.manuscripts > 0)
			saveBeforeWipe('respectMilestone1000')
		
		if (gameData.saveAlphaCoinsUnlock)
			saveBeforeWipe('alphaCoins')
		
		
		saveBeforeWipe('saveAlphaCoinsUnlock')
        saveBeforeWipe('manuscripts')
        saveBeforeWipe('lightRobe')
        saveBeforeWipe('increaseJuicePricePermanance')

		
        megaCoinsNow = gameData.megaCoinsInBank

		
		saveWipeValues = [
		'surveillanceCamera2', 
		'versionNumber', 
		'nationalJuiceMarketing', 
		'creditScore2', 
		'creditScore3', 
		'coinsMax', 
		'respectMilestone10000', 
		'unlockBenevolence', 
		'nationalTradeCert', 
		'bigGloves', 
		'nutritionists', 
		'megaCoinsInBankMax', 
		'betterTraining', 
		'showBarPercent', 
		'hideCompletedSkills', 
		'hideMaxedPurchases', 
		'researchers', 
		'upgradeMoreStorage', 
		'changeResearchersBy10Unlock', 
		'rottenActualWisdom', 
		'tickspeed',
		'timePlayed'];

		for (let i = 0; i < saveWipeValues.length; i++) {
			saveBeforeWipe(saveWipeValues[i])		
		}

		function saveBeforeWipe(id) {
			eval(id + 'Now = gameData.' + id)
		}



		//Before Travel
			Object.assign(gameData, gameDataBase)
        //After Travel



		saveAfterWipe('saveAlphaCoinsUnlock')
		saveAfterWipe('megaCoins')	

		if (gameData.saveAlphaCoinsUnlock)
			saveAfterWipe('alphaCoins')
		
		
		if (increaseJuicePricePermananceNow) {
			saveAfterWipe('juicePriceCents')
			saveAfterWipe('increaseJuicePricePermanance')
		} 
		
		
        saveAfterWipe('manuscripts')
		if (gameData.manuscripts > 0) {
			saveAfterWipe('respectMilestone1000')
		} 
		
		
		for (let i = 0; i < saveWipeValues.length; i++) {
			saveAfterWipe(saveWipeValues[i])		
		}
		
		function saveAfterWipe(id) {
			eval('gameData.' + id + '=' + id + 'Now')
		}

		gameData.juicersMax = 100 + gameData.upgradeMoreStorage * 500
		gameData.peelersMax = 500 + gameData.upgradeMoreStorage * 2500
		
		if (lightRobeNow)
			gameData.respect += 50
		
		if(rottenActualWisdomNow)
			gameData.rottenWisdomSkillLevelMax = 25


        gameData.villageNumber = 2
        saveGame()
        location.reload()
    }
}

function increaseCreditScore() {
    if (gameData.megaCoins >= 2) {
        gameData.megaCoins -= 2
        gameData.megaCoinsInBankMax += 30
    }
}

function increaseCreditScore2() {
    if (gameData.megaCoins >= 5) {
        gameData.megaCoins -= 5
        gameData.megaCoinsInBankMax += 150
        gameData.creditScore2 = 1
    }
}

function increaseCreditScore3() {
    if (gameData.megaCoins >= 50) {
        gameData.megaCoins -= 50
        gameData.megaCoinsInBankMax += 800
        gameData.creditScore3 = 1
    }
}

function buyABiggerWallet() {
    if (gameData.megaCoins >= 50) {
        gameData.megaCoins -= 50
        gameData.coinsMax += 1e6
    }
}

function buyMegaCoins() {
    if (gameData.coins >= 10000 && gameData.megaCoinsInBank < gameData.megaCoinsInBankMax && gameData.buyMegaCoinsTimes < gameData.buyMegaCoinsTimesMax) {
        gameData.coins -= 10000
        gameData.megaCoinsInBank += 5
		gameData.buyMegaCoinsTimes += 1
    }
}

function buyMegaCoinsWithAlphaCoins(amount) {
	if (amount == 1) {
		if (gameData.alphaCoins >= 10 && gameData.megaCoinsInBank < gameData.megaCoinsInBankMax) {
			gameData.alphaCoins -= 10
			gameData.megaCoinsInBank += 1
		}
	}
	else {
		if (gameData.alphaCoins >= 100 && gameData.megaCoinsInBank + 10 <= gameData.megaCoinsInBankMax) {
			gameData.alphaCoins -= 100
			gameData.megaCoinsInBank += 10
		}
	}
}


function buyBetterTraining() {
    if (gameData.megaCoins >= gameData.betterTraining) {
        gameData.megaCoins -= gameData.betterTraining
        gameData.betterTraining += 1
    }
}

function upgradeMoreStorage() {
    if (gameData.megaCoins >= Math.pow(2, gameData.upgradeMoreStorage) * 50) {
        gameData.megaCoins -= Math.pow(2, gameData.upgradeMoreStorage) * 50
		gameData.juicersMax +=  500
		gameData.peelersMax +=  2500
		gameData.upgradeMoreStorage += 1
    }
}

function rottenActualWisdom() {
    if (gameData.megaCoins >= 50) {
        gameData.megaCoins -= 50
        gameData.rottenActualWisdom += 1
		gameData.rottenWisdomSkillLevelMax = 25
    }
}

function updateValuesTravel () {
	checkShow(gameData.megaCoinsInBankMax > 20, 'upgradeCreditScore')
	checkShow(gameData.megaCoinsInBankMax <= 20, 'increaseCreditScore')
	checkShow(gameData.nutritionists, 'upgradeNutritionist')
	checkShow(!gameData.nutritionists, 'hireANutritionist')
	checkShow(gameData.respectMilestone10000 && !gameData.bachelorsDegreeFinance, 'earnBachelorFinance')
	checkShow(!gameData.respectMilestone10000, 'buyABiggerWallet')
	checkShow(gameData.respectMilestone10000, 'upgradeMoreStorage')
	checkShow(!gameData.bigGloves, 'buyBigGloves')
	checkShow(gameData.bigGloves, 'upgradeBigGloves')
	checkShow(gameData.creditScore2 && !gameData.creditScore3, 'increaseCreditScore3')
	checkShow(gameData.coinsMax > 1e6, 'upgradeWallet')
	checkShow(!gameData.creditScore2 && gameData.respectMilestone10000, 'increaseCreditScore2', 'inline')
	checkShow(gameData.rottenActualWisdom, 'upgradeRottenActualWisdomUnlock')

	update('textForMegaCoinsInBank', gameData.megaCoinsInBank.toLocaleString() + ' / ' + gameData.megaCoinsInBankMax.toLocaleString() + ' Mega Coins In Bank')
	update('buyMegaCoinsTimes', 'Transfer times: ' + gameData.buyMegaCoinsTimes + ' / ' + gameData.buyMegaCoinsTimesMax)

    if (gameData.megaCoinsInBank > gameData.megaCoinsInBankMax)
        gameData.megaCoinsInBank = gameData.megaCoinsInBankMax
	
	checkShow(!gameData.nationalJuiceMarketing, 'juiceMarketing')
	checkShow(gameData.nationalJuiceMarketing, 'upgradeJuiceMarketing')
	
	checkShow(gameData.upgradeMoreStorage, 'upgradeMoreLand')
	checkShow(gameData.betterTraining, 'upgradeBetterTraining')
	update('betterTrainingPrice', 'Price: ' + gameData.betterTraining.toLocaleString() + ' Mega Coins')
	update('textForBetterTraining', 'Current maximum: ' + (gameData.betterTraining + 10).toLocaleString() + '00%')
	update('upgradeMoreStoragePrice', 'Price: ' + (Math.pow(2, gameData.upgradeMoreStorage) * 50).toLocaleString() + ' Mega Coins')

}