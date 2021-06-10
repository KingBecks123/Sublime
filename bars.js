function advertise() {
	if(gameData.coins >= 10)
                {
		gameData.coins -= 10
		barStartGranular("advertise")
		}
}

function working() {
	gameData.employeeIsWorking = 1
	barStartGranular("working")

}

function basket() {
		gameData.basketBar = 0;
		gameData.limes += gameData.limesInBaskets;
		gameData.limesInBaskets = 0;
updateValues()
}

function workingBar() {
	if(gameData.workingBar <= 99 && gameData.employeeIsWorking == 1)
	{
		gameData.workingBar += 1;
		setTimeout(workingBar, 600 / gameData.tickspeed)
	}
	else
	{
		if (gameData.employeeIsWorking == 1)
		{
			gameData.limes += gameData.employeeCurrentSpeed
			gameData.employeeWorking -= 1
		}
		
		if(gameData.employeeWorking > 0)
		{
			working()
		}
		else
		{
			gameData.employeeIsWorking = 0
		}
	}
updateValues()
}

function basketBar() {
	if(gameData.basketBar < 100)
	{
		gameData.basketBar += 0.2;
	}
	
setTimeout(basketBar, 1200)
updateValues()
}

function teach() {
	gameData.employeeCurrentSpeed = - (gameData.employeeHunger * 60)
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



function autoCollecting() {
	if( gameData.autoCollectingBar == (gameData.nourishment + 1) * 100 || gameData.autoCollectingBar == 0 )
	{
		gameData.autoCollectingBar = 0
		autoCollectingBar()
	}
}

function autoCollectingBar() {
	if(gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5))
	{
		gameData.autoCollectingBar += 0.5;
		setTimeout(autoCollectingBar, 50)
	}
	
	if(gameData.autoCollectingBar % 10  == 0)
	{
		getLimes()
	}
	
updateValues()
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
		setTimeout(advertiseBar, (200 / gameData.advertisingSpeed) / gameData.tickspeed)
	}
	else
	{
		gameData.applicationReady = 1
		gameData.hasAdvertised = 1
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
	if(gameData.learnANewSkillBar < 100)
	{
		gameData.learnANewSkillBar += 0.1;
		setTimeout(learnANewSkillBar, 10 / gameData.tickspeed)
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
		if(gameData.deliveryType <= 1)
		{
			if(gameData.deliveryBar <= 99.9)
			{
				gameData.deliveryOngoing = 1
				gameData.deliveryBar += 0.1;
				setTimeout(sellYourJuiceBar, (100 / (gameData.deliveryType * 100 + 1)) / gameData.tickspeed)
			}
		}
		else if(gameData.deliveryType == 2)
		{
			if(gameData.deliveryBar <= 99.5)
			{
				gameData.deliveryOngoing = 1
				gameData.deliveryBar += 0.5;
				setTimeout(sellYourJuiceBar, (100 / (gameData.deliveryType * 100 + 1)) / gameData.tickspeed)
			}
		}
	}
	else
	{
	gameData.coins += Math.floor(gameData.juiceBulkAmount * (1 + (gameData.juicePriceCents / 100)))
	gameData.deliveryOngoing = 0
	}
updateValues()
}


function makeJuice() {
	
	if((gameData.juicerBar >= 99 || gameData.juicerBar == 0))
	{	
		if(gameData.limeTypeToJuice == 0 && gameData.limes >= gameData.limesPerJuice)
		{
			gameData.limes -= gameData.limesPerJuice
			gameData.juicerBar = 0
			gameData.howMuchJuice = 1
			gameData.limeTypeToJuiceToggle = 0
			
			juicerBar()
		}
		else if(gameData.limeTypeToJuice == 1 && gameData.peeledLimes >= gameData.peeledLimesPerJuice)
		{
			gameData.peeledLimes -= gameData.peeledLimesPerJuice
			gameData.juicerBar = 0
			gameData.howMuchJuice = 1
			gameData.limeTypeToJuiceToggle = 1
			
			juicerBar()
		}
	}
	
updateValues()
}


function peelerPeel() {

	if(gameData.peelerBar >= 99 || gameData.peelerBar == 0)
	{		

		if(gameData.limes >= 1)
		{
			gameData.howManyPeeledLimes = 1
			gameData.limes -= 1
			gameData.peelerBar = 0
			peelerBar()
		}
	}
	
updateValues()
}


function peelerPeelMax() {

	if(gameData.peelerBar >= 99 || gameData.peelerBar == 0)
	{	
		gameData.howManyPeeledLimes = gameData.limes
		
		if(gameData.howManyPeeledLimes > gameData.peelers)
		{
			gameData.howManyPeeledLimes = gameData.peelers
		}

		
		gameData.limes -= gameData.howManyPeeledLimes
		
		if (gameData.howManyPeeledLimes > 0)
		{
		
		gameData.peelerBar = 0;
		peelerBar()
		
		}
	}
updateValues()
}


function makeMaxJuice() {

	if(gameData.juicerBar >= 99 || gameData.juicerBar == 0)
	{	
		if(gameData.limeTypeToJuice == 0)
		{
			gameData.howMuchJuice = Math.floor(gameData.limes / gameData.limesPerJuice)
			if(gameData.howMuchJuice > gameData.juicers)
			{
				gameData.howMuchJuice = gameData.juicers
			}
			gameData.limeTypeToJuiceToggle = 0
			gameData.limes -= gameData.howMuchJuice * gameData.limesPerJuice
		}
		
		else
		{
			gameData.howMuchJuice = Math.floor(gameData.peeledLimes / gameData.peeledLimesPerJuice)
			if(gameData.howMuchJuice > gameData.juicers)
			{
				gameData.howMuchJuice = gameData.juicers
			}
			gameData.peeledLimes -= gameData.howMuchJuice * gameData.peeledLimesPerJuice
			gameData.limeTypeToJuiceToggle = 1
		}
		if (gameData.howMuchJuice > 0)
		{
			gameData.juicerBar = 0;
			juicerBar()
		}
	}
updateValues()
}

function juicerBar() {
	if(gameData.juicerBar <= 99)
	{
		gameData.juicerBar += 1;
		var x = (gameData.limeTypeToJuiceToggle * 99 + 1) * (gameData.tickspeed)
		setTimeout(juicerBar, 100 / x)
	}
	else
	{
		gameData.juice += gameData.howMuchJuice;
		gameData.hasGottenJuice = 1	
	}
updateValues()
}

function peelerBar() {
	if(gameData.peelerBar <= 99)
	{	

		gameData.peelerBar += 1;
		setTimeout(peelerBar, (100 / ((gameData.sharperPeelers + 1) * 2)) / gameData.tickspeed)
	}
	else
	{
		gameData.peeledLimes += gameData.howManyPeeledLimes;
	}
updateValues()
}
