addInventoryVariables([
	{
		id: 'pies',
		name: 'Pies',
		color1: '964D1A',
		color2: 'C67848',
	},	
	{
		id: 'pieCoins',
		name: 'Pie Coins',
		color1: '964D1A',
		color2: 'C67848',
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
