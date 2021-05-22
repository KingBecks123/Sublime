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

function basket() {
		gameData.basketBar = 0;
		gameData.limes += gameData.limesInBaskets;
		gameData.limesInBaskets = 0;
updateValues()
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
		gameData.limes += gameData.employeeCurrentSpeed
		gameData.employeeWorking -= 1
		if(gameData.employeeWorking > 0)
		{
			working()
		}
	}
updateValues()
}

function basketBar() {
	if(gameData.basketBar <= 99)
	{
		gameData.basketBar += 1;
	}
	
setTimeout(basketBar, 600)
moveBasket()
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

function eat() {
	if( ( gameData.eatBar == 100 || gameData.eatBar == 0 ) && gameData.eat < 100 )
	{
		if(gameData.foodTypeToggle == 0 && gameData.limes > 0)
		{
			gameData.limes -= 1
			gameData.foodType = 5
			barStartGranularSkillBasic("eat")
		}
		else if(gameData.foodTypeToggle == 1 && gameData.rottenLimes > 0)
		{
			gameData.rottenLimes -= 1
			gameData.foodType = 1
			barStartGranularSkillBasic("eat")
		}
	}
}

function eatBar() {
	basicBarSkill("eat")
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
		setTimeout(learnANewSkillBar, (5 * (101 - gameData.intelligence)) / tickspeed)
	}
	else
	{
		switch (gameData.learnANewSkill){
		case 0:
			gameData.learnANewSkill = 1
			update("newInfo", "You Learned Rotten Wisdom!")
		break;
		case 1:
			gameData.learnANewSkill = 2
			update("newInfo", "You Learned Limebidextrous!")
		break;
		case 2:
			gameData.learnANewSkill = 3
			update("newInfo", "You Learned Intelligence!")
		break;
		case 3:
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
	
	if((gameData.juicerBar >= 99 || gameData.juicerBar == 0))
	{	
		if(gameData.limeTypeToJuice == 0 && gameData.limes >= 10)
		{
			gameData.limes -= 10
			gameData.juicerBar = 0
			gameData.howMuchJuice = 1
			juicerBar()
		}
		else if(gameData.limeTypeToJuice == 1 && gameData.peeledLimes >= 10)
		{
			gameData.peeledLimes -= 10
			gameData.juicerBar = 0
			gameData.howMuchJuice = 1
			juicerBar()
		}
	}
	
updateValues()
}

function makeMaxJuice() {

	if(gameData.juicerBar >= 99 || gameData.juicerBar == 0)
	{	
		if(gameData.limeTypeToJuice == 0)
		{
			if(gameData.limes >= 10)
			{
				gameData.howMuchJuice = Math.floor(gameData.limes / 10)
				gameData.limes -= gameData.howMuchJuice * 10
			}
		}
		
		else
		{
			if(gameData.peeledLimes >= 10)
			{
				gameData.howMuchJuice = Math.floor(gameData.peeledLimes / 10)
				gameData.peeledLimes -= gameData.howMuchJuice * 10
			}
		}
		
		if(gameData.howMuchJuice > gameData.juicers)
		{
			gameData.howMuchJuice = gameData.juicers
		}
		gameData.juicerBar = 0;
		juicerBar()
	}
updateValues()
}

function juicerBar() {
	if(gameData.juicerBar <= 99)
	{
		gameData.juicerBar += 1;
		var x = (gameData.limeTypeToJuice * 99 + 1) * (tickspeed)
		setTimeout(juicerBar, 100 / x)
	}
	else
	{
		gameData.juice += gameData.howMuchJuice;
		gameData.hasGottenJuice = 1	
	}
updateValues()
}