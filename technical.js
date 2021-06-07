
//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0; 

var gameDataBase = {
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
  employeeWorkingMax: 10,
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
  intelligenceSkillLevelMax: 20,
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
  
  basketsMax: 50,
  juicersMax: 100,
  peelersMax: 500,
  
  firstApplicant: 1,
  teachInfoToggle: 0,
  employeeStatsInfoToggle: 0,
  
  bulkBuyUnlock: 0,
  bulkBuyJuicersUnlock: 0,
  bulkBuyPeelersUnlock: 0,
  bulkBuyBasketsUnlock: 0,

  storageUnlock: 0,  
  storageJuicersUnlock: 0,
  storagePeelersUnlock: 0,
  
  peelersBulkToggle: 0,
  juicersBulkToggle: 0,
  basketsBulkToggle: 0,
  
  advertisingLevel1: 0,
  advertisingLevel2: 0,
  advertisingLevel3: 0,
 
  versionNumber: 0,
  
  hideCompletedSkills: 0,
  hideMaxedPurchases: 0,
  fasterTransport: 0,
  
  sharperPeelers: 0,
  bigGloves: 0, 
  villageNumber: 1,
  nutritionists: 0,
 
  megaCoins: 0,
  megaCoinsInBank: 0,
  megaCoinsInBankMax: 20,
 
  diseaseControlFinished: 1,
  respect: 0,
  simulationTime: 0,
  unlockDiseaseAreaSwamp: 0,
  limeDiseaseInfoToggle: 1,
  limeDiseaseControlInfoToggle: 1,
  limeDiseaseLakes: 0,
  limeDiseaseLakesCurrent: 0,
  
  civiliansPlaced: 0,
  civiliansTotal: 2, 
  
  silkRobe: 0, 
  
  diseaseArray: [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
],
  
  
  entrepreneurialCertificates: 0,
 
  autosave: 0,
  
  //Should be 0 for normal game, 1 if you want to go faster :)
  difficulty: 0,
  
  //default is 1 :D
  tickspeed: 1,
}

var gameData = {}


function gameStart(){
	
	Object.assign(gameData, gameDataBase)
	
	loadGame()
	
	basketBar()
	updateValues()
	autosave()
	
	tabStore("plebian")
	tabTasks("earn")
}

tab("shop")

function tab(tabby) {
  tabs("options", "none")
  tabs("market", "none")
  tabs("inventory", "none")
  tabs("achievements", "none")
  tabs("skills", "none")
  tabs("megaCoinUpgrades", "none")
  tabs("tasks", "none")
  tabs("company", "none")
  tabs("forest", "none")

  document.getElementById(tabby).style.display = "inline-block"
}


function tabMarket(tab) {
  tabs("marketStore", "none")
  tabs("marketMain", "none")
  tabs("hiringArea", "none")
  tabs("travel", "none")
  document.getElementById(tab).style.display = "block"
}

function tabTasks(tab) {
  tabs("earn", "none")
  tabs("milestones", "none")
  document.getElementById(tab).style.display = "block"
}

function tabStore(tab) {
  tabs("plebian", "none")
  tabs("patrician", "none")
  document.getElementById(tab).style.display = "block"
}


