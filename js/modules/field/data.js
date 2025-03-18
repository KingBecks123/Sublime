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

document.getElementById('field').innerHTML = `
	<div style="width:380px;display:inline-block;position:absolute;">
		<div class="basicDiv">
			<p class="basicText" id="wheatSeedsNumber"></p>
			<p class="basicText" id="wheatNumber"></p>
			<p class="basicText" id="flourNumber"></p>
			<div id="wheatMachines">
				<p class="basicText" id="wheatHarvesterNumber"></p>
				<p class="basicText" id="seedDrillNumber"></p>
			</div>
			<button id="winnowWheat" onclick="buy('wheatSeeds', 1, 'wheat', 2)">Winnow Wheat</button>
			<button id="grindFlour" onclick="buy('flour', 1, 'wheatSeeds', 2)">Grind Seeds Into Flour</button>
		</div>
		<div class="basicDiv" id="plotManagementDiv">
			<p class="basicText" id="plotDetails"></p>
			<button id="managePlot" onclick="managePlot()"></button>
			<button onclick="showPlotManagementDiv = false">Close</button>
		</div>
		<div class="basicDiv" id="fieldPlacementOptions"></div>
	</div>
	<div id="fullField" style="height:460px;width:460px;margin:0px 0px 0px 0px;padding: 0px 0px 0px 0px;display:inline-block;position:absolute;right:0px;top:-5px;"></div>
`;
