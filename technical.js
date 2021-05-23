
//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0; 

//Should be 0 for normal game, 1 if you want to go faster :)
var difficulty = 1;

//default 1
var tickspeed = 1000

var gameData = {
  limes: 1,
  coins: 0,
  juicers: 0,
  juice: 0,
  juiceBulkAmount: 1,
  deliveryBar: 0,
  juicerBar: 0,
  howMuchJuice: 0,
  bread: 0,
  sugar: 0,
  sticks: 0,
  fireLevel: 0,
  pies: 0,
  newtownStart: "New",
  newtownEnd: "town",
  exploreLevel: 0,
  piePrice: 0,
  achievement1: 0,
  achievement2: 0,
  limesPerClick: 1,
  knife: 0,
  peeledLimes: 0,
  limeTypeToJuice: 0,
  lookAround: 0,
  rottenLimes: 0,
  rottenWisdomBar: 0,
  rottenWisdom: 0,
  learnANewSkillBar: 0,
  learnANewSkill: 0,
  limebidextrousBar: 0,
  limebidextrous: 0,
  intelligence: 0,
  intelligenceBar: 0,
  teachBar: 0,
  workingBar: 0,
  lookAroundNumber: 0,
  advertiseBar: 0,
  advertise: 0,
  maps: 0,
  applicantSpeed: 20,
  applicantPrice: 10,
  applicantWage: 10,
  employeeSpeed: 20,
  employeePrice: 10,
  employeeWage: 10,
  employeeCurrentSpeed: 0,
  employees: 0,
  maxEmployees: 1,
  employeeWorking: 0,
  deliveryType: 0,
  deliveryTypeToggle: 0,
  deliveryPrice: 1,
  deliveryOngoing: 0,
  juiceBulkAmountToggle: 1,
  tomes: 0,
  knifebidextrous: 0,
  knifebidextrousBar: 0,
  applicationReady: 0,
  advertisingSpeed: 1,
  aesthetic: 0,
  foodTypeToggle: 1,
  eat: 0,
  eatBar: 0,
  skillInfoToggle: 1,
  hasGottenJuice: 0,
  foodType: 0,
  showBarPercent: 0,
  intelligenceSkillLevel: 0,
  limebidextrousSkillLevel: 0,
  knifebidextrousSkillLevel: 0,
  rottenWisdomSkillLevel: 0,
  intelligenceSkillLevelMax: 50,
  limebidextrousSkillLevelMax: 50,
  knifebidextrousSkillLevelMax: 50,
  rottenWisdomSkillLevelMax: 50,
  basket: 0,
  basketBar: 0,
  baskets: 0,
  limesInBaskets: 0,
}

function gameStart(){

	gameData.limesPerClick = 1 + difficulty * 1000
	
	
	var start = Math.floor(Math.random() * 7)
	switch (start) {
  case 0:
    gameData.newtownStart = "Old";
    break;
  case 1:
    gameData.newtownStart = "New";
    break;
  case 2:
    gameData.newtownStart = "North";
    break;
  case 3:
    gameData.newtownStart = "South";
    break;
  case 4:
    gameData.newtownStart = "West";
    break;
  case 5:
    gameData.newtownStart = "East";
    break;
  case 6:
    gameData.newtownStart = "Castle";
}
	var start = Math.floor(Math.random() * 3)
	switch (start) {
  case 0:
    gameData.newtownEnd = "town";
    break;
  case 1:
    gameData.newtownEnd = "ville";
    break;
  case 2:
    gameData.newtownEnd = "port";
}
	
	update("newtownButton", gameData.newtownStart + gameData.newtownEnd)
	
	gameData.limes += cheatNum * 100000
	gameData.juice += cheatNum * 100000
	gameData.bread += cheatNum * 100000
	gameData.sugar += cheatNum * 100000
	gameData.sticks += cheatNum * 100000
	gameData.juicers += cheatNum * 200
	gameData.coins += cheatNum * 100000
	gameData.lookAroundNumber += cheatNum * 2
	gameData.maps += cheatNum * 2
	gameData.pies += cheatNum * 100000
	gameData.peeledLimes += cheatNum * 100000
	gameData.fireLevel += cheatNum * 1
	gameData.exploreLevel += cheatNum * 1
	updateValues()
}

tab("shop")

function tab(tabby) {
  tabs("options", "none")
  tabs("market", "none")
  tabs("inventory", "none")
  tabs("achievements", "none")
  tabs("theGround", "none")
  tabs("newtown", "none")
  tabs("skills", "none")
  tabs("company", "none")
  tabs("forest", "none")
  document.getElementById(tabby).style.display = "inline-block"
}


function tabMarket(tab) {
  tabs("marketStore", "none")
  tabs("marketMain", "none")
  tabs("hiringArea", "none")
  document.getElementById(tab).style.display = "block"
}

function tabEmployees(tab) {
  tabs("employeeOne", "none")
  tabs("employeeTwo", "none")
  document.getElementById(tab).style.display = "block"
}