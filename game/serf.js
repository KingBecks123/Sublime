function harvestRice(){
	if((gameData.harvestRiceBar == 0 || gameData.harvestRiceBar == 100) && gameData.serf.health)
	{
		gameData.serf.riceOwed += 1
		gameData.serf.health -= 1
		gameData.harvestRiceBar = 0
		
		if(gameData.serf.health && gameData.serf.riceOwed < 14)
			harvestRiceBar()
	}
}

function harvestRiceBar(){
	barMoverAdvanced('harvestRice', 1, 15)
}

function harvestRiceBarEnd(){
	gameData.serf.rice += 1
}

function giveLordRice(){
	gameData.serf.lordsRice += gameData.serf.rice
	gameData.serf.riceOwed -= gameData.serf.rice
	gameData.serf.rice = 0
}

function eatRice(){
	if(gameData.serf.rice > 0)
	{
		gameData.serf.rice -= 1
		gameData.serf.health += 1
	}
}

function acceptLordsFood(){
	gameData.serf.health += 5
}

function sellRice(){
	if(gameData.serf.rice)
	{
		gameData.serf.coins += 1
		gameData.serf.rice -= 1
	}
}


function updateSerfStuff(){
	gameData.serfHealthBar = gameData.serf.health * 5
	moveBar('serfHealth')

	if(gameData.serf.riceOwed == 14)
	{
		gameData.serf.health -= 5
		gameData.serf.lordsCoins += gameData.serf.coins
		gameData.serf.coins = 0
		
		if(gameData.serf.health < 0)
			gameData.serf.health = 0
		
		gameData.serf.rice = 0
		gameData.serf.riceOwed = 5
	}
	
	if(gameData.serf.riceOwed < 10)
	{
		lordEmotion = 'pleased'
		document.getElementById('riceOwed').style.color = 'black'
	}
	else
	{
		document.getElementById('riceOwed').style.color = '#B40001'
	}
	
	if(gameData.serf.riceOwed == 11)
		lordEmotion = 'displeased'
	if(gameData.serf.riceOwed == 12)
		lordEmotion = 'angry'
	if(gameData.serf.riceOwed == 13)
		lordEmotion = 'furious'	

	
	update('lordEmotion', 'The lord is ' + lordEmotion)
	update('lordsRice', 'Lord&#39;s rice: ' + gameData.serf.lordsRice)
	update('lordsCoins', 'Lord&#39;s coins: ' + gameData.serf.lordsCoins)

	
	if(gameData.serf.health == 0)
		showBasicDiv('acceptLordsFood')
	else
		hide('acceptLordsFood')
	
	if(gameData.serf.health > 2)
		serfHealth = 'healthy'	
	if(gameData.serf.health == 2)
		serfHealth = 'hungry'
	if(gameData.serf.health == 1)
		serfHealth = 'starving'
	if(gameData.serf.health == 0)
		serfHealth = 'dying'


	
	update('serfHealthText', 'You are ' + serfHealth)
	update('riceOwed', 'Rice owed: ' + gameData.serf.riceOwed)
		
	if(gameData.newBakerySerf)
		hide('newBakerySerfDiv')
	else
		checkShowOrHide(gameData.serf.coinsUnlockedVariable, 'newBakerySerfDiv')

}