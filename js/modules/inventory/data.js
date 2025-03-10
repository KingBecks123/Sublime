addMainTabs([
	{
		id: 'inventory',
		text: 'Inventory',
		color1: 'BBBBBB',
		color2: '898989'
	},
]);

addInventoryVariables([
	{
		id: 'goldenLimes',
		name: 'Golden Limes',
		color1: 'AEB301',
		color2: 'F8FF01',
	},
	{
		id: 'peeledLimes',
		name: 'Peeled Limes',
		color1: '72B301',
		color2: 'A0FF01',
	},	
	{
		id: 'juice',
		name: 'Juice',
		color1: '00B33D',
		color2: '00FF55',
	},	
]);


addGameVariables({
    juicers: 0,
    juicerBar: 0,
    howMuchJuice: 0,
    knife: 0,
    limeTypeToJuice: 0,
    limeTypeToJuiceToggle: 0,
    limesPerJuice: 10,
    peeledLimesPerJuice: 5,
    peelers: 0,
    peelerBar: 0,
    howManyPeeledLimes: 0,
	hasGottenPeeledLimes: false,
    storageJuicersUnlock: 0,
    storagePeelersUnlock: 0,
    peelersBulkToggle: 0,
    juicersBulkToggle: 0,
});