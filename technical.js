
//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0; 

//Should be 0 for normal game, 1 if you want to go faster :)
var difficulty = 0;

var gameData = {
  limes: 1,
  coins: 0,
  juicers: 0,
  juice: 0,
  juiceBulkAmount: 1,
  deliveryBar: 0,
  juiceBar: 0,
  howMuchJuice: 0,
  tickspeed: 1,
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
  lookAroundNumber: 0,
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
	
	gameData.tickspeed = 1
	gameData.limes += cheatNum * 100000
	gameData.juice += cheatNum * 100000
	gameData.bread += cheatNum * 100000
	gameData.sugar += cheatNum * 100000
	gameData.sticks += cheatNum * 100000
	gameData.juicers += cheatNum * 200
	gameData.coins += cheatNum * 100000
	gameData.pies += cheatNum * 100000
	gameData.peeledLimes += cheatNum * 100000
	gameData.fireLevel += cheatNum * 1
	gameData.exploreLevel += cheatNum * 1
	updateValues()
}

tab("shop")

updateValues()

function exportGame() {
	update("exportCode", JSON.stringify(gameData))
}


function importGame() {
	var savegame = JSON.parse(window.prompt("Import Code: "));
  if (savegame !== null) {
    gameData = savegame
		update("newInfo", "Game Loaded.")
		updateValues()
  }
}

function tab(tab) {
  tabs("options", "none")
  tabs("market", "none")
  tabs("inventory", "none")
  tabs("achievements", "none")
  tabs("theGround", "none")
  tabs("newtown", "none")
  tabs("skills", "none")
  document.getElementById(tab).style.display = "inline-block"
}

function tabMarket(tab) {
  tabs("marketStore", "none")
  tabs("marketMain", "none")
  document.getElementById(tab).style.display = "inline-block"
}

function saveGame() {
  localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
	update("newInfo", "Game Saved.")
}

function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("mathAdventureSave"))
  if (savegame !== null) {
    gameData = savegame
		update("newInfo", "Game Loaded.")
		updateValues()
  }
  else
  {
	  	update("newInfo", "Save File Empty.")
  }
}