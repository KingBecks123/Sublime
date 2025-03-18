addMainTabs([
	{
		id: 'forest',
		text: 'Forest',
		color1: 'BBBBBB',
		color2: '898989'
	},
]);

addGameVariables({
	forestTree2: 0,
	forestTreeType: 1,
});

document.getElementById('forest').innerHTML = `
		<div class="module-container" style="display:inline-block;position:absolute;">
			<div class="basicDiv" id="treeTypeDiv">
				<button id="forestTree1" style="background-color:lightgray;" onclick="game.forestTreeType = 1">Basic Tree</button>
				<button id="forestTree2" style="background-color:lightgray;" onclick="game.forestTreeType = 2">Golden Lime Tree</button>
			</div>
			<div class="basicDiv">
				<p id="basketsAmount" style="background-color:#bfbfbf;padding: 5px;">1 Basket</p>
				<button onclick="basket()">Empty Baskets</button>
				<button id="basketInfoButton" onclick="toggle('basketInfoToggle')">Info</button>
				<p class="basketInfo">Baskets collect 5 Limes per minute each</p>
				<p class="basketInfo">Baskets collect up to 25 Limes each</p>
				<p class="basketInfo" id="maxBaskets">20 baskets fit under the current tree</p>
				<div id="goldenLimesInfo"><p class="basketInfo">Golden limes slowly rot away once you collect them</p></div>
				<p id="limesInBaskets">0 Limes</p>
				<div class="verticalProgress" id="basketProgress">
					<div class="verticalBar" style="background-color:#4DFE89;" id="basketBar"></div>
				</div>
			</div>
		</div>
        <div class="basicDiv" id="forestWellDiv" style="position:absolute;right:0px;">
            <button id="throwPieCoinsWell" onclick="throwPieCoinsWell()">Throw Pie Coins In The Well</button>
            <button id="enterTheWell" style="background-color:#000000;color:#FFFFFF" onclick="game.endScreen = 1">Enter</button>
            <div class="verticalProgress" id="wellProgress">
                <div class="verticalBar" id="wellBar" style="background-color:#C67848;"></div>
            </div>			
        </div>
`;
