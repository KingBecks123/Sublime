function buyABasket() {
    game.basketBar -= game.basketBar / (game.baskets + 1)
    bulkableBuyMax('baskets', 2)
}

function throwPieCoinsWell() {
	if (game.pieCoinsInWell + game.pieCoins <= 200) {
		game.pieCoinsInWell += game.pieCoins
		game.pieCoins = 0
	}
	else {
		game.pieCoinsInWell = 200
		game.pieCoins -= (200 - game.pieCoinsInWell)
	}
}

function basket() {
    game.basketBar = 0
    game.limes += limesInBaskets
	game.goldenLimes += game.goldenLimesInBaskets
    limesInBaskets = 0
    game.goldenLimesInBaskets = 0
}

loopNumberBasket = 0

function mainGameLoopForest () {
	loopNumberBasket += 1	
	
	if (game.basketBar < 100 && loopNumberBasket >= 24) {
        game.basketBar += 0.2;
		loopNumberBasket = 0
		
		if (beckyRandom(100) == 1 && game.forestTreeType == 2)
			game.goldenLimesInBaskets += 1
    }
}

function onLoadForest () {
	if (game.basketScarecrow) {
		if (game.basketBar + Math.floor(secondsOffline / 3) < 100)
			game.basketBar += Math.floor(secondsOffline / 3)
		else
			game.basketBar = 100
	}
}

limesInBaskets = 0;

function updateValuesForest () {
	basicToggle("basketInfo")
	limesInBaskets = Math.floor(game.baskets * (game.basketBar / 4))
	update('basketsAmount', game.baskets.toLocaleString() + ' / ' + game.basketsMax.toLocaleString() + ' Baskets')
	update('maxBaskets', game.basketsMax.toLocaleString() + ' baskets fit under the current tree.')
	
	if (game.forestTreeType == 1)
		update('limesInBaskets', limesInBaskets.toLocaleString() + ' Limes')
	else
		update('limesInBaskets', limesInBaskets.toLocaleString() + ' Limes + ' + game.goldenLimesInBaskets.toLocaleString() + ' Golden Limes')

    var elem = document.getElementById("basketBar")
    elem.style.height = game.basketBar + "%"

	ifMaxDarkGray("basket")

	checkShow(game.baskets && !game.basketScarecrow, 'offlineBasket')
	checkShow(game.pieCoinsInWell == 200, 'enterTheWell', 'inline')
	checkShow(game.forestWell, 'forestWellDiv', 'inline')
	checkShow(!game.forestTree2, 'buyANewTree')
	checkShow(game.forestTree2, 'treeTypeDiv')
	checkShow(game.baskets, 'forestButton')
	checkShow(game.forestTreeType == 2, 'goldenLimesInfo')

	wellWidth = "";

	if (game.forestWell)
		wellWidth = '760px'
	else
		wellWidth = '380px'

	document.getElementById('forest').style.width = wellWidth

	

	basicToggle("basketsBulk")
	
	if (game.forestTreeType == 1) {
		setColor('forestTree1', myLime)
		setColor('forestTree2', "gray")
	} else {
		setColor('forestTree2', myLime)
		setColor('forestTree1', "gray")
	}

    var elem = document.getElementById("wellBar")
    elem.style.height = (game.pieCoinsInWell / 2) + "%"
}

