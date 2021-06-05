
//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0; 

var gameData = {
  limes: 1,
  coins: 0,
  juicers: 0,
  juice: 0,
  juiceBulkAmount: 1,
  deliveryBar: 0,
  juicerBar: 0,
  howMuchJuice: 0,
  exploreLevel: 0,
  achievement1: 0,
  achievement2: 0,
  achievement4: 0,
  limesPerClick: 1,
  knife: 0,
  peeledLimes: 0,
  limeTypeToJuice: 0,
  limeTypeToJuiceToggle: 0,
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
  applicantHunger: 5,
  employeeSpeed: 20,
  employeeHunger: 5,
  employeePrice: 10,
  employeeWage: 10,
  employeeCurrentSpeed: 0,
  employees: 0,
  maxEmployees: 1,
  employeeWorking: 0,
  deliveryType: 0,
  deliveryTypeToggle: 0,
  deliveryPrice: 2,
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
  knifebidextrousSkillLevelMax: 20,
  rottenWisdomSkillLevelMax: 50,
  basketBar: 0,
  baskets: 0,
  limesInBaskets: 0,
  limesPerJuice: 10,
  peeledLimesPerJuice: 5,
  peelers: 0,
  peelerBar: 0,
  howManyPeeledLimes: 0,
  achievement3: 0,
  basketInfoToggle: 1,
  
  basketsMax: 20,
  juicersMax: 1000,
  peelersMax: 5000,
  
  firstApplicant: 1,
  teachInfoToggle: 0,
  employeeStatsInfoToggle: 0,
  
  bulkBuyUnlock: 0,
  bulkBuyJuicersUnlock: 0,
  bulkBuyPeelersUnlock: 0,
  bulkBuyBasketsUnlock: 0,
  
  peelersBulkToggle: 0,
  juicersBulkToggle: 0,
  basketsBulkToggle: 0,
  
  advertisingLevel1: 0,
  advertisingLevel2: 0,
  advertisingLevel3: 0,
 
  isUsingStarterTree: 0,
 
  autosave: 0,
  
  //Should be 0 for normal game, 1 if you want to go faster :)
  difficulty: 0,
  
  //default is 1 :D
  tickspeed: 1,
}

function gameStart(){
	
	gameData.limes += cheatNum * 100000
	gameData.juice += cheatNum * 100000
	gameData.juicers += cheatNum * 200
	gameData.coins += cheatNum * 100000
	gameData.lookAroundNumber += cheatNum * 2
	gameData.maps += cheatNum * 2
	gameData.peeledLimes += cheatNum * 100000
	gameData.exploreLevel += cheatNum * 1
	basketBar()
	updateValues()
	autosave()
}

tab("shop")

function tab(tabby) {
  tabs("options", "none")
  tabs("market", "none")
  tabs("inventory", "none")
  tabs("achievements", "none")
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
