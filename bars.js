function limebidextrous() {
	if(gameData.limebidextrous < 100)
		{
	barStartGranular(gameData.limebidextrousBar, "limebidextrousBar()", "gameData.limebidextrousBar = 0")
		}
}

function rottenWisdom() {
	if(gameData.rottenWisdom < 100)
		{
	barStartGranular(gameData.rottenWisdomBar, "rottenWisdomBar()", "gameData.rottenWisdomBar = 0")
		}
}

function intelligence() {
	if(gameData.intelligence < 100)
		{
	barStartGranular(gameData.intelligenceBar, "intelligenceBar()", "gameData.intelligenceBar = 0")
		}
}

function learnANewSkill() {
	if(gameData.learnANewSkill <= 2)
		{
			barStartGranular(gameData.learnANewSkillBar, "learnANewSkillBar()", "gameData.learnANewSkillBar = 0")
		}
}

function intelligenceBar() {
	if(gameData.intelligenceBar <= 99)
	{
		gameData.intelligenceBar += 1;
		setTimeout(intelligenceBar, (100 - gameData.intelligence) / gameData.tickspeed)
		moveIntelligence()
	}
	else
	{
	gameData.intelligence += 1
	}
updateValues()
}

function limebidextrousBar() {
	if(gameData.limebidextrousBar <= 99)
	{
		gameData.limebidextrousBar += 1;
		setTimeout(limebidextrousBar, (100 - gameData.intelligence) / gameData.tickspeed)
		moveLimebidextrous()
	}
	else
	{
	gameData.limebidextrous += 1
	}
updateValues()
}

function rottenWisdomBar() {
	if(gameData.rottenWisdomBar <= 99)
	{
		gameData.rottenWisdomBar += 1;
		setTimeout(rottenWisdomBar, (100 - gameData.intelligence) / gameData.tickspeed)
		moveRottenWisdom()
	}
	else
	{
	gameData.rottenWisdom += 1
	}
updateValues()
}

function learnANewSkillBar() {
	if(gameData.learnANewSkillBar <= 99)
	{
		gameData.learnANewSkillBar += 1;
		setTimeout(learnANewSkillBar, (100 - gameData.intelligence) / gameData.tickspeed)
		moveLearnANewSkill()
	}
	else
	{
		if(gameData.learnANewSkill == 0)
		{
			gameData.learnANewSkill = 1
			tabs("rottenWisdomDiv", "block")
			update("newInfo", "You Learned Rotten Wisdom!")
		}
		else if(gameData.learnANewSkill == 1)
		{
			gameData.learnANewSkill = 2
			tabs("limebidextrousDiv", "block")
			update("newInfo", "You Learned Limebidextrous!")
		}
		else if(gameData.learnANewSkill == 2)
		{
			gameData.learnANewSkill = 3
			tabs("intelligenceDiv", "block")
			update("newInfo", "You Learned Intelligence!")
			document.getElementById('learnANewSkillButton').style.backgroundColor = 'darkgray';
		}
			
	}
updateValues()
}

function sellYourJuice() {
	if((gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins > 0 && gameData.juice >= gameData.juiceBulkAmount)
	{
		gameData.coins -= 1
		gameData.juice -= gameData.juiceBulkAmount
		gameData.deliveryBar = 0;
		sellYourJuiceBar()
	}
	
updateValues()
}

function sellYourJuiceBar() {
	if(gameData.deliveryBar <= 99.9)
	{
		if(gameData.deliveryBar <= 99.9)
		{
		gameData.deliveryBar += 0.1;
		setTimeout(sellYourJuiceBar, 100 / gameData.tickspeed)
		moveDelivery()
		}
	}
	else
	{
	gameData.coins += gameData.juiceBulkAmount
	}
updateValues()
}


function makeJuice() {
	if(gameData.limeTypeToJuice == 0)
	{
	if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.limes >= 10)
	{
		gameData.limes -= 10
		gameData.juiceBar = 0
		gameData.howMuchJuice = 1
		makeJuiceBar()
	}
	}
	else
	{
	if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.peeledLimes >= 10)
	{
		gameData.peeledLimes -= 10
		gameData.juiceBar = 0
		gameData.howMuchJuice = 1
		makeJuiceBar()
	}
	}
	
updateValues()
}

function makeMaxJuice() {
	
	if(gameData.limeTypeToJuice == 0)
	{
		if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.limes >= 10)
		{
			gameData.howMuchJuice = Math.floor(gameData.limes / 10)
			if(gameData.howMuchJuice > gameData.juicers)
			{
				gameData.howMuchJuice = gameData.juicers
			}
			
			
			gameData.limes -= gameData.howMuchJuice * 10
			gameData.juiceBar = 0;
			makeJuiceBar()
		}
	}
	
	else
	{
		if((gameData.juiceBar >= 99 || gameData.juiceBar == 0) && gameData.peeledLimes >= 10)
		{
			gameData.howMuchJuice = Math.floor(gameData.peeledLimes / 10)
			if(gameData.howMuchJuice > gameData.juicers)
			{
				gameData.howMuchJuice = gameData.juicers
			}
			gameData.peeledLimes -= gameData.howMuchJuice * 10
			gameData.juiceBar = 0;
			makeJuiceBar()
		}
	}
	
updateValues()
}

function makeJuiceBar(juiceAmount) {
	if(gameData.juiceBar <= 99)
	{
		if(gameData.juiceBar <= 99)
		{
		gameData.juiceBar += 1;
		var x = (gameData.limeTypeToJuice * 99 + 1) * (gameData.tickspeed)
		setTimeout(makeJuiceBar, 1000 / x)
		moveJuicer()
		}
	}
	else
	{
	gameData.juice += gameData.howMuchJuice;
	}
updateValues()
}