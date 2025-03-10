addMainTabs([
	{
		id: 'company',
		text: 'Lime Inc.',
		color1: 'BBBBBB',
		color2: '898989'
	},
]);

addGameVariables({
    applicantSpeed: 20,
    applicantPrice: 10,
    applicantWage: 10,
    applicantHunger: 5,
	applicantHobby: 'Breaking The Laws Of Code By Somehow Having This Hobby',
    employeeSpeed: 20,
    employeeHunger: 5,
    employeePrice: 10,
    employeeWage: 10,
    employeeCurrentSpeed: 0,
    employeeHobby: 'Breaking The Laws Of Code By Somehow Having This Other Hobby',
    employees: 0,
    maxEmployees: 1,
    employeeWorking: 0,
    employeeWorkingMax: 10,
    advertisingLevel1: 0,
    advertisingLevel2: 0,
    advertisingLevel3: 0,
});

const employeeHobbies = [
	'Water Polo',
	'Street Racing',
	'Emerald Mining',
	'Digging Holes In Backyards',
	'Cat Collecting',
	'Engaging In Tomfoolery',
	'Devloping The Hit Game &#38Sublime&#38',
	'Studying Quantumn Chromodynamics',
	'Plotting, Scheming Etc. ',
	'Reading About Limenomics',
	'Working At A Lemonade Stand',
	'Being A Good Employee',
	'Stealing',
	'Faffing About',
	'Fracking',
	'Why Do You Need To Know My Hobby?',
	'Citrus Cult... ivation',
	'Finding A Hobby',
	'Investing In Citrocurrency',
	'Taxidermy',
	'Influencing',
	'Incremental Games',
	'Unregulated Gambling',
	'Filling Holes In Backyards',
	'Polyamory',
	'Producing Agit-Prop',
	'Exploring Abadoned Nuclear Bases',
	'Treason',
	'Searching For The Dead Sea Scrolls',
	'Mummy Tasting',
	'Burning Fingerprints',
	'Birdwatching',
	'Eavesdropping',
	'Making It Through This Year',
	'Studying Reverse Rabies',
	'Lime Diease',
	'Rational Thought',
	'Drinking Margaritas',
	'Solving Border Disputes',
	'Balkanizing My Garden',
	'Triskaidekaphobia',
	'Time Zone Abolition',
	'Not Panicking',
	'Air Traffic Control',
	'Listening To Myself Breathe',
	'Wandering',
	'Stargazing'
]

employeeTypes = {
	basic : {
		applicationRandomisation: function () {
			if (gameData.firstApplicant) {
				gameData.applicantSpeed = 50
				gameData.applicantPrice = 0
				gameData.applicantWage = 20
				gameData.applicantHunger = 1
				gameData.applicantHobby = 'Interning At Lime Inc.'
				gameData.firstApplicant = 0
			} else {
				gameData.applicantSpeed = (Math.floor(Math.random() * (10 + gameData.betterTraining) + 1) * 100)
				gameData.applicantPrice = Math.floor(Math.random() * 200)
				gameData.applicantWage = (Math.floor(Math.random() * 20) + 1) * 5
				gameData.applicantHunger = Math.floor(Math.random() * 20) + 1
				gameData.applicantHobby = employeeHobbies[Math.floor(Math.random() * employeeHobbies.length)]
			}
		},
		onHire: function () {
			if (gameData.coins >= gameData.applicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.employeeWorking = 0
				gameData.workingBar = 0
				gameData.coins -= gameData.applicantPrice
				gameData.employeeHunger = gameData.applicantHunger
				gameData.employeeSpeed = gameData.applicantSpeed
				gameData.employeePrice = gameData.applicantPrice
				gameData.employeeWage = gameData.applicantWage
				gameData.employeeHobby = gameData.applicantHobby
				gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
				gameData.employees = 1
				gameData.isEmployeeWorking = false
				gameData.workingBar = 0
				update('speedEmployee', 'Speed: ' + gameData.employeeSpeed.toLocaleString() + '% of what I&#39m taught')
				update('wageEmployee', 'Wages: ' + gameData.employeeWage.toLocaleString() + ' Coins per minute')
				update('hungerEmployee', 'Hunger: ' + gameData.employeeHunger.toLocaleString() + ' Limes per second')
				update('employeeHobby', 'Hobby: ' + gameData.employeeHobby)
			}
		},
		price: 20,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Lime Collector' + '<br>' +
				'<br>' +
				'Speed: ' + gameData.applicantSpeed.toLocaleString() + '% Of What I&#39m Taught<br>' +
				'Onboarding Price: ' + gameData.applicantPrice.toLocaleString() + ' Coins<br>' +
				'Wages: ' + gameData.applicantWage.toLocaleString() + ' Coins Per Minute<br>' +
				'Hunger: ' + gameData.applicantHunger.toLocaleString() + ' Limes Per Second<br>' +
				'<br>' +
				'Hobby: ' + gameData.applicantHobby + '<br>' +
				'<br>'
			)
		}
	},
	broker : {
		applicationRandomisation: function () {
			gameData.currencyApplicantFee = beckyRandomMinMax(gameData.minBrokerApplicantFee, gameData.maxBrokerApplicantFee)
			gameData.currencyApplicantSpeed = beckyRandomMinMax(gameData.minBrokerApplicantSpeed, gameData.maxBrokerApplicantSpeed)
			gameData.currencyApplicantPrice = (Math.floor(Math.random() * 20) + 1) * 10000
			gameData.currencyApplicantTransferAmount = beckyRandomMinMax(gameData.minBrokerApplicantAmount, gameData.maxBrokerApplicantAmount)
		},
		onHire: function () {
			if (gameData.coins >= gameData.currencyApplicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.doesHaveCurrencyBroker = 1
				gameData.coins -= gameData.currencyApplicantPrice
				gameData.currencyBrokerFee = gameData.currencyApplicantFee
				gameData.currencyBrokerSpeed = gameData.currencyApplicantSpeed
				gameData.currencyBrokerPrice = gameData.currencyApplicantPrice
				gameData.currencyBrokerTransferAmount = gameData.currencyApplicantTransferAmount
				gameData.coinsToAlphaBar = 0
			}
		},
		price: 10000,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Speed: ' + gameData.currencyApplicantSpeed.toLocaleString() + ' Seconds.' + '<br>' +
				'Transfer Fee: ' + gameData.currencyApplicantFee.toLocaleString() + ' Coins.' + '<br>' +
				'Alpha Coins Per Transfer: ' + gameData.currencyApplicantTransferAmount.toLocaleString() + '.' + '<br>' +
				'Hire Price: ' + gameData.currencyApplicantPrice.toLocaleString() + ' Coins.' + '<br>' +
				'<br>'
			)
		}		
	},
	pie : {
		applicationRandomisation: function () {
			gameData.pieApplicantPieCoinPrice = beckyRandomMinMax(5, 20)
			if(gameData.usingBetaCoinWage == 1)
				gameData.pieApplicantBetaCoinPrice = beckyRandomMinMax(200, 1000)
			else
				gameData.pieApplicantBetaCoinPrice = 0
			gameData.pieApplicantMaxPay = beckyRandomMinMax(1, 20)
			gameData.pieApplicantCharm = beckyRandomMinMax(0, 10)
			gameData.pieApplicantPrice = beckyRandomMinMax(1, 20) * 10
		},
		onHire: function () {
			if (gameData.betaCoins >= gameData.pieApplicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.doesHavePieMerchant = 1
				gameData.betaCoins -= gameData.pieApplicantPrice
				gameData.pieMerchantPieCoinPrice = gameData.pieApplicantPieCoinPrice
				gameData.pieMerchantBetaCoinPrice = gameData.pieApplicantBetaCoinPrice
				gameData.pieMerchantMaxPay = gameData.pieApplicantMaxPay
				gameData.pieMerchantCharm = gameData.pieApplicantCharm
			}
		},
		price: 10,
		priceType: 'betaCoins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Pie Coin Wage: '    + gameData.pieApplicantPieCoinPrice.toLocaleString()   + '<br>' +
				'Beta Coin Wage: '   + gameData.pieApplicantBetaCoinPrice.toLocaleString()  + '<br>' +
				'Charm: '            + gameData.pieApplicantCharm.toLocaleString()          + '<br>' +
				'Max Wage Advances: ' + gameData.pieApplicantMaxPay.toLocaleString()         + '<br>' +
				'Hire Price: '       + gameData.pieApplicantPrice.toLocaleString()          + ' Beta Coins.' + '<br>' +
				'<br>'
			)
		}	
	}	
}