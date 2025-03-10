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
			return "Currently: " + gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice"
		},
		equation: function () {
			return Math.pow(10, 6 - gameData.peeledLimesPerJuice)
		},
		onBarFilled: function () {
			gameData.peeledLimesPerJuice -= 1
		},
		startRequirement: function () {
			if (gameData.peeledLimesPerJuice > 1)
				return true
		},
	},
	{
		id: 'surveying',
		buttonText: 'Surveying',
		info: 'Increase disease tiles by 1',
		description: function () {
			return "Currently: " + gameData.numberOfTiles + " / 20 Tiles"
		},
		equation: function () {
			return Math.pow(2, gameData.numberOfTiles - 15)
		},
		onBarFilled: function () {
			gameData.numberOfTiles += 1
			diseaseControlQuit()
		},
		startRequirement: function () {
			if (gameData.numberOfTiles < 20)
				return true
		},
	},
	{
		id: 'benevolence',
		buttonText: 'Benevolence',
		info: 'Increase respect change from helping civilians with more lakes',
		description: function () {
			return "Currently: Level " + gameData.benevolence
		},
		equation: function () {
			return Math.pow(2, gameData.benevolence * 2)
		},
		onBarFilled: function () {
			gameData.benevolence += 1
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