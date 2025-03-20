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
			if (game.firstApplicant) {
				game.applicantSpeed = 50
				game.applicantPrice = 0
				game.applicantWage = 20
				game.applicantHunger = 1
				game.applicantHobby = 'Interning At Lime Inc.'
				game.firstApplicant = 0
			} else {
				game.applicantSpeed = (Math.floor(Math.random() * (10 + game.betterTraining) + 1) * 100)
				game.applicantPrice = Math.floor(Math.random() * 200)
				game.applicantWage = (Math.floor(Math.random() * 20) + 1) * 5
				game.applicantHunger = Math.floor(Math.random() * 20) + 1
				game.applicantHobby = employeeHobbies[Math.floor(Math.random() * employeeHobbies.length)]
			}
		},
		onHire: function () {
			if (game.coins >= game.applicantPrice && game.applicationReady == 1) {
				game.applicationReady = 0
				game.employeeWorking = 0
				game.workingBar = 0
				game.coins -= game.applicantPrice
				game.employeeHunger = game.applicantHunger
				game.employeeSpeed = game.applicantSpeed
				game.employeePrice = game.applicantPrice
				game.employeeWage = game.applicantWage
				game.employeeHobby = game.applicantHobby
				game.employeeCurrentSpeed = -(game.employeeHunger * 60)
				game.employees = 1
				game.isEmployeeWorking = false
				game.workingBar = 0
				update('speedEmployee', 'Speed: ' + game.employeeSpeed.toLocaleString() + '% of what I&#39m taught')
				update('wageEmployee', 'Wages: ' + game.employeeWage.toLocaleString() + ' Coins per minute')
				update('hungerEmployee', 'Hunger: ' + game.employeeHunger.toLocaleString() + ' Limes per second')
				update('employeeHobby', 'Hobby: ' + game.employeeHobby)
			}
		},
		price: 20,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Lime Collector' + '<br>' +
				'<br>' +
				'Speed: ' + game.applicantSpeed.toLocaleString() + '% Of What I&#39m Taught<br>' +
				'Onboarding Price: ' + game.applicantPrice.toLocaleString() + ' Coins<br>' +
				'Wages: ' + game.applicantWage.toLocaleString() + ' Coins Per Minute<br>' +
				'Hunger: ' + game.applicantHunger.toLocaleString() + ' Limes Per Second<br>' +
				'<br>' +
				'Hobby: ' + game.applicantHobby + '<br>' +
				'<br>'
			)
		}
	},
	broker : {
		applicationRandomisation: function () {
			game.currencyApplicantFee = beckyRandomMinMax(game.minBrokerApplicantFee, game.maxBrokerApplicantFee)
			game.currencyApplicantSpeed = beckyRandomMinMax(game.minBrokerApplicantSpeed, game.maxBrokerApplicantSpeed)
			game.currencyApplicantPrice = (Math.floor(Math.random() * 20) + 1) * 10000
			game.currencyApplicantTransferAmount = beckyRandomMinMax(game.minBrokerApplicantAmount, game.maxBrokerApplicantAmount)
		},
		onHire: function () {
			if (game.coins >= game.currencyApplicantPrice && game.applicationReady == 1) {
				game.applicationReady = 0
				game.doesHaveCurrencyBroker = 1
				game.coins -= game.currencyApplicantPrice
				game.currencyBrokerFee = game.currencyApplicantFee
				game.currencyBrokerSpeed = game.currencyApplicantSpeed
				game.currencyBrokerPrice = game.currencyApplicantPrice
				game.currencyBrokerTransferAmount = game.currencyApplicantTransferAmount
				game.coinsToAlphaBar = 0
			}
		},
		price: 10000,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Speed: ' + game.currencyApplicantSpeed.toLocaleString() + ' Seconds.' + '<br>' +
				'Transfer Fee: ' + game.currencyApplicantFee.toLocaleString() + ' Coins.' + '<br>' +
				'Alpha Coins Per Transfer: ' + game.currencyApplicantTransferAmount.toLocaleString() + '.' + '<br>' +
				'Hire Price: ' + game.currencyApplicantPrice.toLocaleString() + ' Coins.' + '<br>' +
				'<br>'
			)
		}		
	},
	pie : {
		applicationRandomisation: function () {
			game.pieApplicantPieCoinPrice = beckyRandomMinMax(5, 20)
			if(game.usingBetaCoinWage == 1)
				game.pieApplicantBetaCoinPrice = beckyRandomMinMax(200, 1000)
			else
				game.pieApplicantBetaCoinPrice = 0
			game.pieApplicantMaxPay = beckyRandomMinMax(1, 20)
			game.pieApplicantCharm = beckyRandomMinMax(0, 10)
			game.pieApplicantPrice = beckyRandomMinMax(1, 20) * 10
		},
		onHire: function () {
			if (game.betaCoins >= game.pieApplicantPrice && game.applicationReady == 1) {
				game.applicationReady = 0
				game.doesHavePieMerchant = 1
				game.betaCoins -= game.pieApplicantPrice
				game.pieMerchantPieCoinPrice = game.pieApplicantPieCoinPrice
				game.pieMerchantBetaCoinPrice = game.pieApplicantBetaCoinPrice
				game.pieMerchantMaxPay = game.pieApplicantMaxPay
				game.pieMerchantCharm = game.pieApplicantCharm
			}
		},
		price: 10,
		priceType: 'betaCoins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Pie Coin Wage: '    + game.pieApplicantPieCoinPrice.toLocaleString()   + '<br>' +
				'Beta Coin Wage: '   + game.pieApplicantBetaCoinPrice.toLocaleString()  + '<br>' +
				'Charm: '            + game.pieApplicantCharm.toLocaleString()          + '<br>' +
				'Max Wage Advances: ' + game.pieApplicantMaxPay.toLocaleString()         + '<br>' +
				'Hire Price: '       + game.pieApplicantPrice.toLocaleString()          + ' Beta Coins.' + '<br>' +
				'<br>'
			)
		}	
	}	
}

document.getElementById('company').innerHTML = `		<div class="basicDiv">
			<button style="width:250px" onclick="tabEmployees('employeeOne')">John McLime</button>
			<button id="employeeStatsInfoButton" style="width:80px;" onclick="toggle('employeeStatsInfoToggle')">Stats</button>
			<div id="employeeOne">
				<p class="employeeStatsInfo" id="skillsEmployee" style="text-align: center;">Lime Collector</p>
				<p class="employeeStatsInfo" id="speedEmployee">Speed: 20% Of What I'm Taught</p>
				<p id="currentSpeedEmployee">Current Speed: 0 limes per minute</p>
				<p class="employeeStatsInfo" id="wageEmployee">Wage: 10 Coins Per Minute</p>
				<p class="employeeStatsInfo" id="hungerEmployee">Hunger: 10 Limes Per Second</p>
				<p class="employeeStatsInfo" id="employeeHobby" style="text-align: right">Enjoys Faffing About</p>
				<button style="width:250px" onclick="teach()">Teach Employee</button>
				<button id="teachInfoButton" style="width:80px;" onclick="toggle('teachInfoToggle')">Info</button>
				<p class="teachInfo">Click the 'Teach' button to start a timer</p>
				<p class="teachInfo">Collect as many limes as possible before time runs out!</p>
				<p class="teachInfo">Your employee learns from your abilities</p>
				<div class="skillProgress" id="teachProgress">
					<div class="skillBar" id="teachBar"></div>
				</div>
				<p id="workingEmployee">Employee is idle<p>
				<div class="skillProgress" id="workingProgress">
					<div class="skillBar" id="workingBar"></div>
				</div>
				<button id="payEmployee" style="width:250px" onclick="payEmployee()">Pay Employee Their Wages</button>
				<button id="motivateEmployeeButton" onkeydown="return event.key != 'Enter';" style="width:250px" onclick="motivateEmployee()">Motivate Employee</button>
			</div>
        </div>
		<div class="basicDiv" id="currencyBroker">
			<button style="width:250px;">Currency Broker</button>
            <p id="currencyBrokerFee"></p>
            <p id="currencyBrokerSpeed"></p>
            <p id="currencyBrokerTransferAmount"></p>
        </div>
		<div class="basicDiv" id="pieMerchant">
			<button style="width:250px;display:inline-block;">Pie Merchant</button>            
			<button id="pieMerchantInfoButton" style="width:80px;" onclick="toggle('pieMerchantInfoToggle')">Info</button>
            <p id="pieMerchantPieCoinPrice"></p>
            <p id="pieMerchantBetaCoinPrice"></p>
            <p id="pieMerchantMaxPay"></p>
            <p id="pieMerchantCharm"></p>
            <p class="pieMerchantInfo">Increases customer acquisition speed</p>
        </div>
`;

document.getElementById('hiringArea').innerHTML = `
            <div class="module-container" style="display:inline-block;">
                <div class="basicDiv">
					<div id="hireToggleButtons">
						<button class="wide-button" id="hireEmployeeToggleButton"    onclick="game.typeToHireToggle = 'basic'" >Basic Employee</button>
						<button class="wide-button" id="hireBrokerToggleButton"      onclick="game.typeToHireToggle = 'broker'" >Currency Broker</button>
						<button class="wide-button" id="hirePieMerchantToggleButton" onclick="game.typeToHireToggle = 'pie'" >Pie Merchant</button>
					</div>
                    <button id="advertiseButton" onclick="advertise()">Advertise your lime business</button>
					<div id="autoAdvertiseBrokerDiv">
					    <button id="autoAdvertiseBrokerButton" style="display:inline-block" onclick="toggle('autoAdvertiseBroker')">Auto</button>
						<p>Rule:</p>
						<p id="textForAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button onclick="decreaseValue('autoAdvertiseSpeedValue')" style="width:166px">Decrease</button>
						<button onclick="game.autoAdvertiseSpeedValue += 1" style="width:166px">Increase</button>
					<div id="smarterAdvertisingBrokerRule">
						<p id="textForSmarterAdvertisingBrokerRule">Auto advertise unless speed is under 30 seconds</p>
						<button onclick="decreaseValue('autoAdvertiseAmountValue')" style="width:166px">Decrease</button>
						<button onclick="game.autoAdvertiseAmountValue += 1" style="width:166px">Increase</button>
					</div>
					</div>
					<div class="skillProgress" id="advertiseProgress">
                        <div class="skillBar" id="advertiseBar"></div>
                    </div>
                    <p id="advertisePrice">Price: 10 Coins</p>
                    <button id="application" style="display:block;width:300px;margin:auto;white-space: pre-wrap;" onclick="employeeTypes[game.applicationType].onHire()">Pin applications here</button>
                    <p id="applicationInfo">Click the application to accept</p>
                </div>
                <div id="autoBrokerAdvertiser" class="basicDiv">
                    <button onclick="buyAdvertisingManager()">Advertising Manager</button>
                    <p>Take on a manager to help you advertise for brokers</p>
                    <p>Price: 10 Alpha Coins</p>
                </div>
                <div id="smarterAutoBrokerAdvertiser" class="basicDiv">
                    <button onclick="buy('smarterAdvertisingManagerBroker', 50 , 'alphaCoins')">Smarter Advertising Manager</button>
                    <p>Add a new rule for your advertising manager</p>
                    <p>Price: 50 Alpha Coins</p>
                </div>
                <div class="basicDiv" id="researchBetterAdvertising">
                    <button onclick="buy('advertisingLevel1', 200)">Research Better Advertising Methods</button>
                    <p>Price: 200 Coins</p>
                </div>
                <div id="advertisingMethods">
                    <div class="basicDiv" id="advertisingLeaflets">
                        <button onclick="buy('advertisingLevel2', 100)">Hand Out Leaflets</button>
                        <p>Doubles advertising speed</p>
                        <p>Price: 100 Coins</p>
                    </div>
                    <div class="basicDiv" id="advertisingBillboard">
                        <button onclick="buy('advertisingLevel3', 500)">Buy A Billboard</button>
                        <p>Triples advertising speed</p>
                        <p>Price: 500 Coins</p>
                    </div>
                </div>
				<div class="basicDiv" id="offlineEmployee">
					<button onclick="buy('surveillanceCamera', 1000)">Buy A Surveillance Camera</button>
					<p>Make sure employees are working while you're away (offline)</p>
					<p>Price: 1,000 Coins</p>
				</div>
            </div>
`;

const blankApplicationText = `
Potential Employees, Pin Applications Here!
 ---
You, yes YOU, will have the chance to work in the town-renowned Lime Inc.!

With BENEFITS! Only to name A FEW:

- Get PAID*

APPLY NOW!

`;

const employeeTypesNames = [
    'Employee',
    'Broker',
    'PieMerchant'
]