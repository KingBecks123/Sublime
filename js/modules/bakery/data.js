addInventoryVariables([
	{
		id: 'pies',
		color1: 'C67848'
	},	
	{
		id: 'pieCoins',
		color1: 'C67848'
	},	
]);

addMainTabs([
	{
		id: 'bakery',
		text: 'Bakery',
		color1: 'BBBBBB',
		color2: '898989'
	}
]);

pieOvenColor = 0
juiceInPieBucketLeak = 0
flourInPieBucketLeak = 0

addGameVariables({
	pieEmployee: 0,
	pieEmployeeSalesLeft: 0,
	
	pieApplicantPieCoinPrice: 0,
	pieApplicantBetaCoinPrice: 0,
	pieApplicantMaxPay: 0,
	pieApplicantCharm: 0,

	pieMerchantPieCoinPrice: 5,
	pieMerchantBetaCoinPrice: 0,
	pieMerchantMaxPay: 10,
	pieMerchantCharm: 0,
	
	pieApplicantPrice: 0,
	doesHavePieMerchant: 0,
	usingBetaCoinWage: 0,
	pieMerchantInfoToggle: 0,
	
	hasGottenPies: 0,
	piePrice: 1,
	findPieCustomersBar: 0,
	couldFindCustomer: 2,
	isThereACustomer: 0,
	customerWaitTime: 0,
	hasSoldPie: 0,
	pieConveyorBelt : 0,
	pieConveyorBeltOn: 0,
	
	pieBucket: 0,
	pieFlourBucket: 0,

	juiceInPieBucket: 0,
	flourInPieBucket: 0,
	
	pieBucketNozzle: 0,	
	pieFlourBucketNozzle: 0,
	
	bucketThinSteelPlating: 0,

	juiceBucketHoleSize: 10,
	flourBucketHoleSize: 10,
	
	bellows: 0,
	bellowsBar: 0,
	bellowsCurrentlyBlowing: 0,
	
	upgradeNozzles: 0,
});

document.getElementById('bakery').innerHTML = `
<div id="bakeryLeft" class="module-container" style="top: 0px; position: absolute;">
	<div class="basicDiv">
		<p style="background-color:#DEAD85;" >Sell Pies</p>
		<p style="background-color:#FF999A;" id="piePrice" >Current Price: 1 Pie Coin</p>
		<button  onclick="decreasePiePrice()" style="width:166px">Decrease Price</button>
		<button  onclick="increasePiePrice()" style="width:166px">Increase Price</button>
		<p class="sellingPieInfo" >The lower the price the faster you find customers</p>
		<p class="sellingPieInfo" >Click on the customer to sell to them before they become unhappy and leave!</p>
		<button class="roundButton" id="findPieCustomersButton" onclick="pickCurrentTask('findPieCustomers')">Start Selling Pie</button>
		<button id="sellingPieInfoButton" style="width:80px;" onclick="toggle('sellingPieInfoToggle')">Info</button>
		<div class="skillProgress" id="findPieCustomersProgress">
			<div class="skillBar" id="findPieCustomersBar"></div>
		</div>
		<p id="couldFindCustomer" >Search for customers</p>
	</div>
	<div class="basicDiv">
		<button id="customerButton" onclick="sellPieToCustomer()" style="width:80px;height:80px;text-align: center; line-height: 80px;font-size:40px;">:)</button>
	</div>
	<div class="basicDiv" id="payPieEmployeeDiv">
		<button id="payPieEmployee" onclick="payPieEmployee()">Pay Employee 5 Pie Coins</button>
		<p id="pieEmployeeSalesLeft" >Employee Sales Left: 0 / 10</p>
	</div>
</div>
<div id="bakeryRight" class="module-container" style="top: 0px; right: 0px; position: absolute;">
	<div class="basicDiv" id="pieOvenDiv">
		<div id="pieBuckets">
			<div class="bucketProgress" id="juiceBucketProgress">
				<div class="smallContainerBar"  style="background-color: #4DFE89;" id="juiceBucketBar"></div>
				<div class="bucketHoleBar" id="juiceHoleBar"></div>
			</div>
			<div class="bucketProgress" id="flourBucketProgress" style="visibility:hidden;">
				<div class="smallContainerBar"  style="background-color: #FFEDCC;" id="flourBucketBar"></div>
				<div class="bucketHoleBar" id="flourHoleBar"></div>
			</div>
			<div  id="bucketHoleChanger">
				<button onclick="bucketHoleSize('-1', 'juice')" style="width:75px;">-</button>
				<button onclick="bucketHoleSize('1', 'juice')"  style="width:75px;">+</button>				
				<button onclick="bucketHoleSize('-1', 'flour')" style="width:75px;visibility:hidden;" id="flourMinusNozzle">-</button>
				<button onclick="bucketHoleSize('1', 'flour')"  style="width:75px;visibility:hidden;" id="flourPlusNozzle" >+</button>
			</div>
			<button onclick="addToPieBucket('juice')" style="width:166px;">Add Juice To Bucket</button>
			<button id="addToPieFlourBucket" onclick="addToPieBucket('flour')" style="width:166px;visibility:hidden;">Add Flour To Bucket</button>
		</div>
		<button onclick="addPieIngredient('juice')" style="width:166px">Add Juice</button>		
		<button onclick="addPieIngredient('flour')" style="width:166px">Add Flour</button>
		<button onclick="bakePie()" style="width:166px">Bake Pie</button>
		<button id="pieConveyorBeltOnButton" onclick="toggle('pieConveyorBeltOn')" style="width:166px">Conveyor Belt</button>
		<p id="currentPieIngredients" >Current Ingredients: 0 Flour + 0 Juice</p>
		<div class="skillProgress" id="bakePieProgress">
			<div class="skillBarColored" id="bakePieBar"></div>
		</div>
		<div id="bellowsDiv">
			<div class="skillProgress" id="bellowsProgress">
				<div class="skillBarColored" style="background-color:#99DEFF" id="bellowsBar"></div>
			</div>
			<button onclick="useBellows()">Use Bellows</button>	
		</div>
	</div>
</div>
`;
