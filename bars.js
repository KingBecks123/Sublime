function advertise() {
	if(gameData.coins >= 10)
		gameData.coins -= 10
		{
			barStartGranular("advertise")
		}
}

function working() {
	barStartGranular("working")
}

function workingBar() {
	if(gameData.workingBar <= 99)
	{
		gameData.workingBar += 1;
		setTimeout(workingBar, 600 / tickspeed)
		moveWorking()
	}
	else
	{
		gameData.limes += gameData.employeeCurrentSpeedOne
		gameData.employeeWorkingOne -= 1
		if(gameData.employeeWorkingOne > 0)
		{
			working()
		}
	}
updateValues()
}

function teach() {
	gameData.employeeCurrentSpeedOne = 0
	barStartGranular("teach")
}

function teachBar() {
	if(gameData.teachBar <= 99)
	{
		gameData.teachBar += 1;
		setTimeout(teachBar, 20)
	}
updateValues()
}

function limebidextrous() {
	barStartGranularSkillBasic("limebidextrous")
}

function knifebidextrous() {
	barStartGranularSkillBasic("knifebidextrous")
}

function rottenWisdom() {
	barStartGranularSkillBasic("rottenWisdom")
}

function intelligence() {
	barStartGranularSkillBasic("intelligence")
}

function learnANewSkill() {
	if(gameData.learnANewSkill <= 2 || (gameData.tomes == 1 && gameData.learnANewSkill <= 3))
		{
			barStartGranular("learnANewSkill")
		}
}

function advertiseBar() {
	if(gameData.advertiseBar <= 99)
	{
		gameData.advertiseBar += 1;
		setTimeout(advertiseBar, (200 / gameData.advertisingSpeed) / tickspeed)
	}
	else
	{
		gameData.applicationReady = 1
		randomizeApplication()
	}
updateValues()
}

function intelligenceBar() {
	basicBarSkill("intelligence")
}

function limebidextrousBar() {
	basicBarSkill("limebidextrous")
}

function knifebidextrousBar() {
	basicBarSkill("knifebidextrous")
}

function rottenWisdomBar() {
	basicBarSkill("rottenWisdom")
}

function learnANewSkillBar() {
	if(gameData.learnANewSkillBar <= 99)
	{
		gameData.learnANewSkillBar += 1;
		setTimeout(learnANewSkillBar, (5 * (21 - gameData.intelligence)) / tickspeed)
	}
	else
	{
		if(gameData.learnANewSkill == 0)
		{
			gameData.learnANewSkill = 1
			update("newInfo", "You Learned Rotten Wisdom!")
		}
		else if(gameData.learnANewSkill == 1)
		{
			gameData.learnANewSkill = 2
			update("newInfo", "You Learned Limebidextrous!")
		}
		else if(gameData.learnANewSkill == 2)
		{
			gameData.learnANewSkill = 3
			update("newInfo", "You Learned Intelligence!")
		}
		else if(gameData.learnANewSkill == 3)
		{
			gameData.learnANewSkill = 4
			update("newInfo", "You Learned Knifebidextrous!")
		}
			
	}
updateValues()
}

function sellYourJuice() {
	if((gameData.deliveryBar >= 99.9 || gameData.deliveryBar == 0) && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle)
	{
		gameData.deliveryType = gameData.deliveryTypeToggle
		gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle		
		gameData.coins -= gameData.deliveryPrice
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
		gameData.deliveryOngoing = 1
		gameData.deliveryBar += 0.1;
		setTimeout(sellYourJuiceBar, (100 / (gameData.deliveryType * 100 + 1)) / tickspeed)
		}
	}
	else
	{
	gameData.coins += gameData.juiceBulkAmount
	gameData.deliveryOngoing = 0
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

function makeJuiceBar() {
	if(gameData.juiceBar <= 99)
	{
		if(gameData.juiceBar <= 99)
		{
		gameData.juiceBar += 1;
		var x = (gameData.limeTypeToJuice * 99 + 1) * (tickspeed)
		setTimeout(makeJuiceBar, 100 / x)
		}
	}
	else
	{
	gameData.juice += gameData.howMuchJuice;
	}
updateValues()
}