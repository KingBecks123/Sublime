travelUpgradesToBuy.forEach((upgrade) => {
    document.getElementById('travellingArea').innerHTML += `
      <div id="${upgrade.id}" class="basicDiv">
        <button class="travelButton" onclick="buy('${upgrade.id}', ${upgrade.price.amount}, '${upgrade.price.currency}')">${upgrade.text}</button>
        <p>${upgrade.description}</p>
        <p id="${upgrade.id}Price">${upgrade.price.text}</p>
      </div>
`;});  

function onLoadTravel() {
  const megaCoinUpgradesElement = document.getElementById('megaCoinUpgrades');
  travelUpgrades.forEach((upgrade) => {
    const upgradeElement = document.createElement('div');
    upgradeElement.className = 'basicDiv';
    upgradeElement.id = upgrade.id;
    upgradeElement.innerHTML = `
      <p style="background-color:#FF999A;">${upgrade.text}</p>
      <p>${upgrade.description}</p>
    `;
    megaCoinUpgradesElement.appendChild(upgradeElement);
  });
}

addInventoryVariables([
	{
		id: 'megaCoins',
		color1: 'FE0000'
	},	
]);

addMainTabs([
	{
		id: 'megaCoinUpgrades',
		text: 'Upgrades',
		color1: 'FF999A',
		color2: 'FF4D4D'
	},
]);

function convertCoinsNow() {
    if (game.coins >= 1e5 && (game.convertCoinsNowBar == 0 || game.convertCoinsNowBar == 100)) {
        game.coins -= 1e5
		game.convertedCoinsSinceTravel += 1
		game.convertCoinsNowBar = 0
        convertCoinsNowBar()
    }
}


function convertCoinsNowBar() {
	runBar('convertCoinsNow', 0.075 / Math.pow(2, game.convertedCoinsSinceTravel))
}

function convertCoinsNowBarEnd() {
    game.megaCoins += 1
}

function travelToNextVillage() {
    if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		
		if (game.increaseJuicePricePermanance == 1)
		    saveBeforeWipe('juicePriceCents')
		
		if (game.manuscripts > 0)
			saveBeforeWipe('respectMilestone1000')
		
		if (game.saveAlphaCoinsUnlock)
			saveBeforeWipe('alphaCoins')
		
		
		saveBeforeWipe('saveAlphaCoinsUnlock')
        saveBeforeWipe('manuscripts')
        saveBeforeWipe('lightRobe')
        saveBeforeWipe('increaseJuicePricePermanance')

		
        megaCoinsNow = game.megaCoinsInBank

		
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
			eval(id + 'Now = game.' + id)
		}



		//Before Travel
			Object.assign(game, gameBase)
        //After Travel



		saveAfterWipe('saveAlphaCoinsUnlock')
		saveAfterWipe('megaCoins')	

		if (game.saveAlphaCoinsUnlock)
			saveAfterWipe('alphaCoins')
		
		
		if (increaseJuicePricePermananceNow) {
			saveAfterWipe('juicePriceCents')
			saveAfterWipe('increaseJuicePricePermanance')
		} 
		
		
        saveAfterWipe('manuscripts')
		if (game.manuscripts > 0) {
			saveAfterWipe('respectMilestone1000')
		} 
		
		
		for (let i = 0; i < saveWipeValues.length; i++) {
			saveAfterWipe(saveWipeValues[i])		
		}
		
		function saveAfterWipe(id) {
			eval('game.' + id + '=' + id + 'Now')
		}

		game.juicersMax = 100 + game.upgradeMoreStorage * 500
		game.peelersMax = 500 + game.upgradeMoreStorage * 2500
		
		if (lightRobeNow)
			game.respect += 50
		
		if(rottenActualWisdomNow)
			game.rottenWisdomSkillLevelMax = 25


        game.villageNumber = 2
        saveGame()
        location.reload()
    }
}

function increaseCreditScore() {
    if (game.megaCoins >= 2) {
        game.megaCoins -= 2
        game.megaCoinsInBankMax += 30
    }
}

function increaseCreditScore2() {
    if (game.megaCoins >= 5) {
        game.megaCoins -= 5
        game.megaCoinsInBankMax += 150
        game.creditScore2 = 1
    }
}

function increaseCreditScore3() {
    if (game.megaCoins >= 50) {
        game.megaCoins -= 50
        game.megaCoinsInBankMax += 800
        game.creditScore3 = 1
    }
}

function buyABiggerWallet() {
    if (game.megaCoins >= 50) {
        game.megaCoins -= 50
        game.coinsMax += 1e6
    }
}

function buyMegaCoins() {
    if (game.coins >= 10000 && game.megaCoinsInBank < game.megaCoinsInBankMax && game.buyMegaCoinsTimes < game.buyMegaCoinsTimesMax) {
        game.coins -= 10000
        game.megaCoinsInBank += 5
		game.buyMegaCoinsTimes += 1
    }
}

function buyMegaCoinsWithAlphaCoins(amount) {
	if (amount == 1) {
		if (game.alphaCoins >= 10 && game.megaCoinsInBank < game.megaCoinsInBankMax) {
			game.alphaCoins -= 10
			game.megaCoinsInBank += 1
		}
	}
	else {
		if (game.alphaCoins >= 100 && game.megaCoinsInBank + 10 <= game.megaCoinsInBankMax) {
			game.alphaCoins -= 100
			game.megaCoinsInBank += 10
		}
	}
}


function buyBetterTraining() {
    if (game.megaCoins >= game.betterTraining) {
        game.megaCoins -= game.betterTraining
        game.betterTraining += 1
    }
}

function upgradeMoreStorage() {
    if (game.megaCoins >= Math.pow(2, game.upgradeMoreStorage) * 50) {
        game.megaCoins -= Math.pow(2, game.upgradeMoreStorage) * 50
		game.juicersMax +=  500
		game.peelersMax +=  2500
		game.upgradeMoreStorage += 1
    }
}

function rottenActualWisdom() {
    if (game.megaCoins >= 50) {
        game.megaCoins -= 50
        game.rottenActualWisdom += 1
		game.rottenWisdomSkillLevelMax = 25
    }
}

function updateValuesTravel () {


    if (game.megaCoinsInBank > game.megaCoinsInBankMax)
        game.megaCoinsInBank = game.megaCoinsInBankMax
	
	for (let i = 0; i < travelUpgrades.length; i++) {
		checkShow(eval(travelUpgrades[i].requirement), travelUpgrades[i].id)
	}

    const showHideElementsTravel = [
        { 
          condition: game.megaCoinsInBankMax <= 20, 
          element: 'increaseCreditScore'
        },
        { 
          condition: !game.nutritionists, 
          element: 'hireANutritionist' 
        },
        { 
          condition: game.respectMilestone10000 && !game.bachelorsDegreeFinance, 
          element: 'earnBachelorFinance' 
        },
        { 
          condition: game.respectMilestone10000, 
          element: 'buyABiggerWallet' 
        },
        { 
          condition: game.respectMilestone10000, 
          element: 'upgradeMoreStorage' 
        },
        { 
          condition: !game.bigGloves, 
          element: 'buyBigGloves' 
        },
        { 
          condition: game.creditScore2 && !game.creditScore3, 
          element: 'increaseCreditScore3' 
        },
        { 
          condition: !game.creditScore2 && game.respectMilestone10000, 
          element: 'increaseCreditScore2', 
          display: 'inline' 
        },
        { 
          condition: !game.nationalJuiceMarketing, 
          element: 'juiceMarketing' 
        }
    ];

    showHideElementsTravel.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });

    const updateValues = [
      { elementId: 'textForMegaCoinsInBank', value: game.megaCoinsInBank.toLocaleString() + ' / ' + game.megaCoinsInBankMax.toLocaleString() + ' Mega Coins In Bank' },
      { elementId: 'buyMegaCoinsTimes', value: 'Transfer times: ' + game.buyMegaCoinsTimes + ' / ' + game.buyMegaCoinsTimesMax },
      { elementId: 'betterTrainingPrice', value: 'Price: ' + game.betterTraining.toLocaleString() + ' Mega Coins' },
      { elementId: 'upgradeMoreStoragePrice', value: 'Price: ' + (Math.pow(2, game.upgradeMoreStorage) * 50).toLocaleString() + ' Mega Coins' }
    ];

    updateValues.forEach(({ elementId, value }) => {
      update(elementId, value);
    });
}