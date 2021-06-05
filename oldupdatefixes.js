function oldUpdateFixes(){
	
	if (gameData.baskets > gameData.basketsMax)
	{
		gameData.baskets = gameData.basketsMax
	}

	if (gameData.isUsingStarterTree == 0)
	{
		gameData.basketsMax = 20
	}	
	
	if (gameData.limes < 0)
	{
		gameData.limes = 0
	}	
	
}