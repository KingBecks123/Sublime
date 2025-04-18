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
		color1: 'F8FF01'
	},
	{
		id: 'peeledLimes',
		color1: 'A0FF01'
	},	
	{
		id: 'juice',
		color1: '00FF55'
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

document.getElementById('inventory').innerHTML = `
        <div class="pin basicDiv" id="goldenBarDiv" style="background-color:#F8FF01;">
            <div class="skillProgress" id="eatGoldenLimeProgress">
				<div class="skillBarColored" style="background-color:#F8FF01" id="eatGoldenLimeBar"></div>
            </div>
            <button id="eatGoldenLime" onclick="eatGoldenLime()" style="background-color:#F8FF01">Eat A Golden Lime</button>
        </div>
        <div class="pin basicDiv" id="useJuicersDiv" style="background-color:#4DFE89;">
            <p style="border-style: solid;border-width: 2px;border-color: #222222" id="juicersAmount">1 Juicers</p>
            <br>	
            <button class="roundButton wide-button" id="makeJuiceButton" onclick="pickCurrentTask('makeJuice')">Use Juicer</button>
            <button class="roundButton wide-button" id="makeMaxJuiceButton" onclick="pickCurrentTask('makeMaxJuice')" style="visibility: hidden;">Max Juicers</button>
            <br>
            <button class="wide-button" id="juiceLimesToggleButton" style="display:none;" onclick="game.limeTypeToJuice = 0">On Limes</button>
            <button class="wide-button" id="juicePeeledLimesToggleButton" style="display:none;" onclick="game.limeTypeToJuice = 1">On Peeled Limes</button>
            <p style="border-style: solid;border-width: 2px;border-color: #222222;background-color:#bfbfbf;padding: 5px;" id="juicerInfo"></p>
            <div class="skillProgress" id="myProgress">
				<div class="skillBar" id="juicerBar"></div>
            </div>
        </div>
        <div class="basicDiv" id="peelerDiv">
            <p id="peelersAmount">1 Peeler</p>
            <button class="roundButton wide-button" id="peelerPeelButton" onclick="pickCurrentTask('peelerPeel')">Use Peeler</button>
            <button class="roundButton wide-button" id="peelerPeelMaxButton" onclick="pickCurrentTask('peelerPeelMax')" style="width:150px">Max Peelers</button>
            <br>
            <div class="skillProgress" id="peelerProgress">
                <div class="skillBar" id="peelerBar"></div>
            </div>
        </div>
        <div class="basicDiv" id="knifeDiv">
            <p id="inventoryKnife">Use Knife:</p>
            <button id="inventoryKnifeLime" onclick="peelLime()">On Limes</button>
        </div>
        <div class="basicDiv" id="backpackDiv">
            <p>Backpack:</p>
        </div>
`;
