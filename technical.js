
//Should be 0 if ur not cheating, 1 if you want to :)
var cheatNum = 0; 

//Should be 0 for normal game, 1 if you want to go faster :)
var difficulty = 0;

var gameData = {
  limes: 0,
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
  limesPerClick: 1
}

function gameStart(){
	
	gameData.limesPerClick = 1 + difficulty * 10
	
	
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
	gameData.pies += cheatNum * 100000
	gameData.fireLevel += cheatNum * 1
	gameData.exploreLevel += cheatNum * 1
	gameData.tickspeed += difficulty * 100 + cheatNum * 1000 + 1
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

function updateValues() {
    update("textForLimes", gameData.limes + " Limes")
    update("textForSticks", gameData.sticks + " Sticks")
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("inventoryBread", gameData.bread + " Bread")
    update("inventorySugar", gameData.sugar + " Sugar")
    update("textForPies", gameData.pies + " Pies")
    update("juicersAmount", gameData.juicers + " Juicers")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmount + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmount + " Coins")
    update("sellYourPiesPrice", "Sell A Pie For " + gameData.piePrice + " Coins")
	if(gameData.coins >= 1)
	{divVisibility ("textForCoinsDiv", "visible")
	}
	if(gameData.pies >= 1)
	{divVisibility ("textForPies", "visible")
	}
	if(gameData.limes >= 10)
	{divVisibility ("navigateButtons", "visible")
	}
	if(gameData.sugar >= 1 && gameData.limes >= 1 && gameData.bread >= 1 && gameData.fireLevel >= 1)
	{divVisibility ("pieBake", "visible")
	divVisibility ("pieBakeText", "visible")
	}
	if(gameData.fireLevel >= 1)
	{divVisibility ("fire", "visible")
	}
	if(gameData.exploreLevel >= 1)
	{update("newInfo", "You Have Discovered A Nearby Town.")
	divVisibility ("newtownButton", "visible")
	}
	if(gameData.bread >= 1)
	{divVisibility ("inventoryBread", "visible")
	}
	if(gameData.sugar >= 1)
	{divVisibility ("inventorySugar", "visible")
	}
	if(gameData.juicers >= 1)
	{divVisibility ("inventoryButton", "visible")
	}
	if(gameData.sticks >= 2)
	{divVisibility ("stickRub", "visible")
	divVisibility ("textForSticks", "visible")
	divVisibility ("stickButton", "visible")
	}
	if(gameData.juice >= 1)
	{divVisibility ("textForJuice", "visible")
	 divVisibility ("juiceMarket", "visible")
	}
	if(gameData.juicers >= 2)
	{divVisibility ("makeMaxJuice", "visible")
	}
	if(gameData.coins >= 5)
	{ divVisibility ("foodMarket", "visible")
	}
	if(gameData.coins >= 10)
	{ 
    document.getElementById('coinsAchievement').style.backgroundColor = 'lime';
	gameData.achievement1 = 1
	}
	if(gameData.coins >= 100)
	{ 
    document.getElementById('coinsAchievement2').style.backgroundColor = 'lime';
	gameData.achievement2 = 1
	}
	
}