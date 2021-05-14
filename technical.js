var gameData = {
  limes: 0,
  coins: 0,
  juicers: 0,
  juice: 0,
  juiceBulkAmount: 1,
  deliveryBar: 0,
  juiceBar: 0,
  tickspeed: 1
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
    update("textForCoins", gameData.coins + " Coins")
    update("textForJuice", gameData.juice + " Juice")
    update("juicersAmount", gameData.juicers + " Juicers")
    update("sellYourJuiceAmount", "You Will Deliver " + gameData.juiceBulkAmount + " Juice")
	update("sellYourJuiceReward", "You Will Get " + gameData.juiceBulkAmount + " Coins")
	if(gameData.coins >= 1)
	{divVisibility ("textForCoinsDiv", "visible")
	}
	if(gameData.juicers >= 1)
	{divVisibility ("inventoryButton", "visible")
	}
	if(gameData.juice >= 1)
	{divVisibility ("textForJuice", "visible")
	 divVisibility ("juiceMarket", "visible")
	}

}