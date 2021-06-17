background = "#3C3C3C"; //Background Color


accent0 = "#222222"; //Main Color
accent1 = "#4DFE89"; //Accent Color
accent2 = "gray"; //When buttons are toggled off
accent3 = "#4DFE89"; //When buttons are toggled on
accent4 = "#FFBB9A"; //Special Buttons
accent4Dark = "#FF894C"; //Special Buttons Dark

grayAccent = "#50514F";
grayAccentLight = "#BBBBBB";
limesRelatedAccent = "#4DFE89";
yellowAccent = "#FCFF4E";

function addAesthetic() {

    twoToggleButtons('deliveryToggleExpressButton', 'deliveryToggleStandardButton', gameData.deliveryTypeToggle)
    twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
    twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)

    showOrHideClass("unlockDiseaseAreaSwamp")

    basicToggle("skill", "Info")
    basicToggle("limeDisease", "Info")
    basicToggle("limeDiseaseControl", "Info")
    basicToggle("teach", "Info")
    basicToggle("employeeStats", "Info")
    basicToggle("basket", "Info")


    basicToggle("juicers", "Bulk")
    basicToggle("peelers", "Bulk")
    basicToggle("baskets", "Bulk")

    toggleAesthetic("autoStartTask")
    toggleAesthetic("autoStartSimulation")
    toggleAesthetic("autoCheckSimulation")
    toggleAesthetic("autoPlaceACivilian")



    if (gameData.diseaseControlFinished == 1) {
		
		colorChanger('decreaseLakesButton', grayAccentLight)
		colorChanger('increaseLakesButton', grayAccentLight)
	}
	else
	{
		colorChanger('decreaseLakesButton', grayAccent)
		colorChanger('increaseLakesButton', grayAccent)
	}
	
	if (gameData.simulationTime == 1){
		
		colorChanger('checkResultsButton', accent4)
	}
	else
	{
		colorChanger('checkResultsButton', grayAccent)
	}
	
	


    //Map Tile
    var x = document.getElementsByClassName("mapTile");
    for (i = 0; i < x.length; i++) {
		
		if(gameData.diseaseTileSize == 0) 
		{
			x[i].style['width'] = "20px";
			x[i].style['height'] = "20px";
		}
		else
		{
			x[i].style['width'] = "40px";
			x[i].style['height'] = "40px";
		}
		
        x[i].style.padding = "5px 5px 5px 5px";
		
		
        x[i].style['margin'] = "5px 0px 0px 0px";
		
		
    }

    for (x = 0; x < 5; x++) {
        for (y = 0; y < 5; y++) {

            whichButton = "mapTile-" + x + "-" + y
            tileType = (gameData.diseaseArray[x][y])


            if (tileType == 0) {                                //Blank
                colorChanger(whichButton, accent4)
				if (gameData.diseaseTileSize && gameData.diseaseTileSymbols)
					update(whichButton, "‏‏‎ ‎‏‏‎ ‎‎")
            } else if (tileType == 1) {                         //Civillian
                colorChanger(whichButton, limesRelatedAccent)
				if (gameData.diseaseTileSize && gameData.diseaseTileSymbols)
					update(whichButton, ":)")

            } else if (tileType == 2) {                         //Disease
                colorChanger(whichButton, "#FF999A")
				if (gameData.diseaseTileSize && gameData.diseaseTileSymbols)
					update(whichButton, " +")

            } else if (tileType == 3) {                         //Dead Civillian
                colorChanger(whichButton, "#565656")
				if (gameData.diseaseTileSize && gameData.diseaseTileSymbols)
					update(whichButton, ":(")

            } else if (tileType == 4) {                         //Lake
                colorChanger(whichButton, "#4DFFFF")
				if (gameData.diseaseTileSize && gameData.diseaseTileSymbols)
					update(whichButton, "_")

            }
			
				if (!gameData.diseaseTileSize || !gameData.diseaseTileSymbols)
					update(whichButton, "‎‎‎‏‏‎")

        }
    }

	
	//for (i = 1; i <= 4; i++) {
	//	if (gameData['achievement' + i] == 1) {
	//		achievement = 'coinsAchievement' + i
	//		document.getElementById(achievement).style.backgroundColor = limesRelatedAccent;
	//	}
	//}


    if (gameData.autoCollectingBar == 0 || gameData.autoCollectingBar == (gameData.nourishment + 1) * 100) {
        colorChanger("pickUpLimes", limesRelatedAccent)
    } else {
        colorChanger("pickUpLimes", grayAccent)
    }
	
    if (gameData.increaseJuicePricePermanance < 1) {
        colorChanger('increaseJuicePriceButton', accent4)
    } else {
        colorChanger('increaseJuicePriceButton', '#FF999A')
	}	


    if (gameData.isAutoCollecting == 0) {
        colorChanger('autoCollectingButton', accent4)
    } else {

        colorChanger('autoCollectingButton', grayAccent)
    }	
	
	

    if (gameData.respect >= 50) {
        showBasicDiv("storeTypesButtonsDiv")
    } else {

        hide("storeTypesButtonsDiv")
    }
	

	checkRespectMilestone(10)
	checkRespectMilestone(25)
	checkRespectMilestone(50)
	checkRespectMilestone(100)
	checkRespectMilestone(500)
	checkRespectMilestone(1000)
	checkRespectMilestone(2000)




	function checkRespectMilestone(number){
		
		i = 'respectMilestone' + number


		if (gameData.respect >= number) {
			gameData[i] = 1
		}
		
		if (gameData[i]) {
			colorChanger(number + 'RespectMilestone', limesRelatedAccent)
		} else {

			colorChanger(number + 'RespectMilestone', grayAccentLight)
		}
	}



    ifMaxDarkGray("basket")
    ifMaxDarkGray("juicer")
    ifMaxDarkGray("peeler")

	currentTaskAesthetic('usePeelers')		
	currentTaskAesthetic('useMaxPeelers')	
	
	currentTaskAesthetic('makeJuice')		
	currentTaskAesthetic('makeMaxJuice')
	
	currentTaskAesthetic('eatFood')	


	if (gameData.currentTask == 'sellYourJuice') {
		colorChanger('sellYourJuiceButton', accent4Dark)
	} else {
		colorChanger('sellYourJuiceButton', accent4)
	}
	
	function currentTaskAesthetic(x){
		
		button = x + "Button"
		if (gameData.currentTask == x) {
			colorChanger(button, accent4Dark)
		} else {
			colorChanger(button, accent4)
		}
		
	}


    if (gameData.lookAround == 3) {
        hide('lookAroundButton')
    } else {
        tabs('lookAroundButton', "inline-block")
    }

    if (gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2) {
        colorChanger('increaseJuiceSoldButton', grayAccent)

    } else {
        colorChanger('increaseJuiceSoldButton', grayAccentLight)
    }

    if (gameData.juiceBulkAmountToggle == 0) {
        colorChanger('decreaseJuiceSoldButton', grayAccent)

    } else {
        colorChanger('decreaseJuiceSoldButton', grayAccentLight)
    }


    colorChanger('lookAroundButton', grayAccentLight)
    colorChanger('deliveryProgress', accent0)
    colorChanger('deliveryBar', accent3)


}

function twoToggleButtons(button1, button2, value) {
	if (value == 1) {
		colorChanger(button1, accent3)
		colorChanger(button2, accent2)
	} else {
		colorChanger(button1, accent2)
		colorChanger(button2, accent3)
	}
}

function addAestheticBase(){

    colorChanger('sellYourLimesButton', yellowAccent)

    colorChanger('backgroundForValues', "#000000")

    colorChanger('sellMaxJuiceButton', grayAccentLight)

    colorChanger('pickUpLimes', limesRelatedAccent)
    colorChanger('application', accent4)

    colorChanger('mainBody', background)
    colorChanger('inventoryKnifeLime', accent3)
	
    //Basic Div
    var x = document.getElementsByClassName("basicDiv");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = accent0;
        x[i].style.padding = "5px 5px 5px 5px";
        x[i].style['margin'] = "10px 5px 10px 5px";

    }

    //Basic Div Size
    var x = document.getElementsByClassName("basicDivSize");
    for (i = 0; i < x.length; i++) {
        x[i].style.padding = "5px 5px 5px 5px";
        x[i].style['margin'] = "10px 5px 10px 5px";
    }

    //Basic Text
    var x = document.getElementsByClassName("basicText");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = grayAccentLight;
        x[i].style.padding = "5px";
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Basic Text Size
    var x = document.getElementsByClassName("basicTextSize");
    for (i = 0; i < x.length; i++) {
        x[i].style.padding = "5px";
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Gray Button
    var x = document.getElementsByClassName("grayButton");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = grayAccentLight;
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Basic Button
    var x = document.getElementsByClassName("basicButton");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = accent3;
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Basic Button Size
    var x = document.getElementsByClassName("basicButtonSize");
    for (i = 0; i < x.length; i++) {
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Basic Button Size Round
    var x = document.getElementsByClassName("basicButtonSizeRound");
    for (i = 0; i < x.length; i++) {
        x[i].style['margin'] = "5px";
        x[i].style['padding'] = "1px 10px 1px 10px";
        x[i].style['border-radius'] = "12px";


    }

    //Special Button
    var x = document.getElementsByClassName("specialButton");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = accent4;
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Special Button Travel
    var x = document.getElementsByClassName("specialButtonTravel");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#FF999A";
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Pin Button
    var x = document.getElementsByClassName("pinButton");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#FF999A";
        x[i].style.height = '25px';
        x[i].style['margin'] = "5px";
    }


    //Skills

    //Skill Progress
    var x = document.getElementsByClassName("skillProgress");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = accent0;
        x[i].style['margin'] = "5px 5px 5px 5px";
    }

    //Vertical Progress
    var x = document.getElementsByClassName("verticalProgress");
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = accent0;
        x[i].style['margin'] = "5px 5px 5px 5px";
    }	
	
}