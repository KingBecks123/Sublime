addMainTabs([
	{
		id: 'science',
		text: 'Science',
		color1: '9ABBFF',
		color2: '4D88FE'
	},
]);

sciences = [
	{
		id: 'watertight',
		buttonText: 'Watertight Seal',
		info: 'Decreases peeled limes needed to make juice by 1',
		description: function () {
			return "Currently: " + game.peeledLimesPerJuice + " Peeled Limes -> 1 Juice"
		},
		equation: function () {
			return Math.pow(10, 6 - game.peeledLimesPerJuice)
		},
		onBarFilled: function () {
			game.peeledLimesPerJuice -= 1
		},
		startRequirement: function () {
			if (game.peeledLimesPerJuice > 1)
				return true
		},
	},
	{
		id: 'surveying',
		buttonText: 'Surveying',
		info: 'Increase disease tiles by 1',
		description: function () {
			return "Currently: " + game.numberOfTiles + " / 20 Tiles"
		},
		equation: function () {
			return Math.pow(2, game.numberOfTiles - 15)
		},
		onBarFilled: function () {
			game.numberOfTiles += 1
			diseaseControlQuit()
		},
		startRequirement: function () {
			if (game.numberOfTiles < 20)
				return true
		},
	},
	{
		id: 'benevolence',
		buttonText: 'Benevolence',
		info: 'Increase respect change from helping civilians with more lakes',
		description: function () {
			return "Currently: Level " + game.benevolence
		},
		equation: function () {
			return Math.pow(2, game.benevolence * 2)
		},
		onBarFilled: function () {
			game.benevolence += 1
		},
		startRequirement: function () {
			return true
		},
	},
]

addGameVariables({
	watertightBar: 0,
	watertightResearchers: 0,
	surveyingBar: 0,
	surveyingResearchers: 0,
	researchers: 0,
});

document.getElementById('science').innerHTML = `
        <div class="module-container">
			<div class="basicDiv" id="scienceButtonsDiv">
				<button id="researchButton" style="background-color:lightgray;" onclick="tabScience('research')">Research</button>
				<button id="researchersButton" style="background-color:lightgray;" onclick="tabScience('researchers')">Acquire Researchers</button>
			</div>
			<div class="basicDiv">
				<p id="textForResearchers" style="color:#00AAFF;background-color:#000000">0 Researchers</p>
			</div>
			<div id="research"></div>
			<div id="researchers">
                <div class="basicDiv" id="buyManuscriptsDiv" >
                    <button class="travelButton" onclick="buy('manuscripts', 5e5)">Buy Manuscripts</button>
                    <p >Keep 1,000 respect milestone after travelling</p>
                    <p >Price: 500,000 Coins</p>
                </div>	
                <div class="basicDiv">
                    <button class="travelButton" onclick="hireResearcher()">Pay with mega coins</button>
                    <p >Price: 1 Mega Coin</p>
                </div>	
			</div>
        </div>
`;
