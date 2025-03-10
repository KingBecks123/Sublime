addMainTabs([
	{
		id: 'field',
		text: 'Field',
		color1: 'C67848',
		color2: '964D1A'
	}
]);

fieldPlacementOptions = [
	{
		id: 'plot', 
		text: 'Manage Plot'
	},
	{
		id: 'seed', 
		text: 'Seed'
	},	
	{
		id: 'seedDrill', 
		text: 'Seed Drill'
	},	
	{
		id: 'harvester', 
		text: 'Harvester'
	},	
	{
		id: 'rotate', 
		text: 'Rotate'
	},	
]

showPlotManagementDiv = false

addGameVariables({
	wheatField: 0,
	wheat: 0,
	wheatSeeds: 0,
	wheatFieldArray: [
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59],
		[59, 59, 59, 59, 59]
	],
	mortarAndPestle: 0,
	flour: 0,
	pieOven: 0,
	bakePieBar: 0,
	juiceAsPieIngredient: 0,
	flourAsPieIngredient: 0,
	advancedPieHiring: 0,

	wheatHarvesters: 0,
	seedDrills: 0,
	hasGottenFieldTools: 0,

	selectedWheatItem: 'seed',
	nextPlotPrice: 4,
	sellPlotPrice: 0,
	selectedPlotX: 0,
	selectedPlotY: 0,
});

