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

document.getElementById('company').innerHTML = `		<div class="basicDiv">
			<button class="specialButton" style="width:250px" onclick="tabEmployees('employeeOne')">John McLime</button>
			<button class="specialButton" id="employeeStatsInfoButton" style="width:80px;" onclick="toggle('employeeStatsInfoToggle')">Stats</button>
			<div id="employeeOne">
				<p class="basicText employeeStatsInfo" id="skillsEmployee" style="text-align: center;">Lime Collector</p>
				<p class="basicText employeeStatsInfo" id="speedEmployee">Speed: 20% Of What I'm Taught</p>
				<p class="basicText" id="currentSpeedEmployee">Current Speed: 0 limes per minute</p>
				<p class="basicText employeeStatsInfo" id="wageEmployee">Wage: 10 Coins Per Minute</p>
				<p class="basicText employeeStatsInfo" id="hungerEmployee">Hunger: 10 Limes Per Second</p>
				<p class="basicText employeeStatsInfo" id="employeeHobby" style="text-align: right">Enjoys Faffing About</p>
				<button class="specialButton" style="width:250px" onclick="teach()">Teach Employee</button>
				<button class="specialButton" id="teachInfoButton" style="width:80px;" onclick="toggle('teachInfoToggle')">Info</button>
				<p class="basicText teachInfo">Click the 'Teach' button to start a timer</p>
				<p class="basicText teachInfo">Collect as many limes as possible before time runs out!</p>
				<p class="basicText teachInfo">Your employee learns from your abilities</p>
				<div class="skillProgress" id="teachProgress">
					<div class="skillBar" id="teachBar"></div>
				</div>
				<p class="basicText" id="workingEmployee" style="background-color:#bfbfbf;">Employee is idle<p>
				<div class="skillProgress" id="workingProgress">
					<div class="skillBar" id="workingBar"></div>
				</div>
				<button class="specialButton" id="payEmployee" style="width:250px" onclick="payEmployee()">Pay Employee Their Wages</button>
				<button class="specialButton" id="motivateEmployeeButton" onkeydown="return event.key != 'Enter';" style="width:250px" onclick="motivateEmployee()">Motivate Employee</button>
			</div>
        </div>
		<div class="basicDiv" id="currencyBroker">
			<button class="specialButton" style="width:250px;">Currency Broker</button>
            <p class="basicText" id="currencyBrokerFee"></p>
            <p class="basicText" id="currencyBrokerSpeed"></p>
            <p class="basicText" id="currencyBrokerTransferAmount"></p>
        </div>
		<div class="basicDiv" id="pieMerchant">
			<button class="specialButton" style="width:250px;display:inline-block;">Pie Merchant</button>            
			<button class="specialButton" id="pieMerchantInfoButton" style="width:80px;" onclick="toggle('pieMerchantInfoToggle')">Info</button>
            <p class="basicText" id="pieMerchantPieCoinPrice"></p>
            <p class="basicText" id="pieMerchantBetaCoinPrice"></p>
            <p class="basicText" id="pieMerchantMaxPay"></p>
            <p class="basicText" id="pieMerchantCharm"></p>
            <p class="basicText pieMerchantInfo">Increases customer acquisition speed</p>
        </div>
`;

document.getElementById('hiringArea').innerHTML = `
            <div style="display:inline-block;width:380px;">
                <div class="basicDiv">
					<div id="hireToggleButtons">
						<button class="specialButton" id="hireEmployeeToggleButton"    onclick="gameData.typeToHireToggle = 'basic'" >Basic Employees</button>
						<button class="specialButton" id="hireBrokerToggleButton"      onclick="gameData.typeToHireToggle = 'broker'" >Currency Brokers</button>
						<button class="specialButton" id="hirePieMerchantToggleButton" onclick="gameData.typeToHireToggle = 'pie'" >Pie Merchant</button>
					</div>
                    <button class="specialButton" id="advertiseButton" onclick="advertise()">Advertise your lime business</button>
					<div id="autoAdvertiseBrokerDiv">
					    <button class="specialButton" id="autoAdvertiseBrokerButton" style="display:inline-block" onclick="toggle('autoAdvertiseBroker')">Auto</button>
						<p class="basicText">Rule:</p>
						<p class="basicText" id="textForAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button class="specialButton" onclick="decreaseValue('autoAdvertiseSpeedValue')" style="width:168px">Decrease</button>
						<button class="specialButton" onclick="gameData.autoAdvertiseSpeedValue += 1" style="width:168px">Increase</button>
					<div id="smarterAdvertisingBrokerRule">
						<p class="basicText" id="textForSmarterAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button class="specialButton" onclick="decreaseValue('autoAdvertiseAmountValue')" style="width:168px">Decrease</button>
						<button class="specialButton" onclick="gameData.autoAdvertiseAmountValue += 1" style="width:168px">Increase</button>
					</div>
					</div>
					<div class="skillProgress" id="advertiseProgress">
                        <div class="skillBar" id="advertiseBar"></div>
                    </div>
                    <p class="basicText" id="advertisePrice">Price: 10 Coins</p>
                    <button id="application" style="display:block;width:300px;margin:auto;background-color:#DEAD85;white-space: pre-wrap;" onclick="employeeTypes[gameData.applicationType].onHire()">Pin applications here</button>
                    <p class="basicText" id="applicationInfo">Click the application to accept</p>
                </div>
                <div id="autoBrokerAdvertiser" class="basicDiv">
                    <button class="specialButton" onclick="buyAdvertisingManager()">Advertising Manager</button>
                    <p class="basicText">Take on a manager to help you advertise for brokers</p>
                    <p class="basicText">Price: 10 Alpha Coins</p>
                </div>
                <div id="smarterAutoBrokerAdvertiser" class="basicDiv">
                    <button class="specialButton" onclick="buy('smarterAdvertisingManagerBroker', 50 , 'alphaCoins')">Smarter Advertising Manager</button>
                    <p class="basicText">Add a new rule for your advertising manager</p>
                    <p class="basicText">Price: 50 Alpha Coins</p>
                </div>
                <div class="basicDiv" id="researchBetterAdvertising">
                    <button class="specialButton" onclick="buy('advertisingLevel1', 200)">Research Better Advertising Methods</button>
                    <p class="basicText">Price: 200 Coins</p>
                </div>
                <div id="advertisingMethods">
                    <div class="basicDiv" id="advertisingLeaflets">
                        <button class="specialButton" onclick="buy('advertisingLevel2', 100)">Hand Out Leaflets</button>
                        <p class="basicText">Doubles advertising speed</p>
                        <p class="basicText">Price: 100 Coins</p>
                    </div>
                    <div class="basicDiv" id="advertisingBillboard">
                        <button class="specialButton" onclick="buy('advertisingLevel3', 500)">Buy A Billboard</button>
                        <p class="basicText">Triples advertising speed</p>
                        <p class="basicText">Price: 500 Coins</p>
                    </div>
                </div>
				<div class="basicDiv" id="offlineEmployee">
					<button class="specialButton" onclick="buy('surveillanceCamera', 1000)">Buy A Surveillance Camera</button>
					<p class="basicText">Make sure employees are working while you're away (offline)</p>
					<p class="basicText">Price: 1,000 Coins</p>
				</div>
            </div>
`;
