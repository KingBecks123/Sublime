function oldUpdateFixes(){
	
	if (gameData.baskets > gameData.maxBaskets)
	{
		gameData.baskets = gameData.maxBaskets
	}

	if (gameData.isUsingStarterTree == 0)
	{
		gameData.maxBaskets = 20
	}	
	
}