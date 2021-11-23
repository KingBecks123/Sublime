function harvestRice(){
	if(gameData.harvestRiceBar == 0 || gameData.harvestRiceBar == 100)
	{
		gameData.harvestRiceBar = 0
		harvestRiceBar()
	}
}

function harvestRiceBar(){
	barMoverAdvanced('harvestRice', 0.5, 15)
}

function harvestRiceBarEnd(){
	gameData.serf.rice += 1
}