function addAesthetic() {


    background = "#3C3C3C"; //Background Color


    accent0 = "#222222"; //Main Color
    accent1 = "#4DFE89"; //Accent Color
    accent2 = "gray"; //When buttons are toggled off
    accent3 = "#4DFE89"; //When buttons are toggled on
    accent4 = "#FFBB9A"; //Special Buttons
    grayAccent = "#50514F";
    grayAccentLight = "#BBBBBB";
    limesRelatedAccent = "#4DFE89";
    yellowAccent = "#FCFF4E";

    colorChanger('sellYourLimesButton', yellowAccent)
    colorChanger('sellYourJuiceButton', yellowAccent)

    colorChanger('backgroundForValues', "#000000")

    colorChanger('sellMaxJuiceButton', grayAccentLight)

    colorChanger('pickUpLimes', limesRelatedAccent)
    colorChanger('application', accent4)

    colorChanger('mainBody', background)
    colorChanger('inventoryKnifeLime', accent3)

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




    //Map Tile
    var x = document.getElementsByClassName("mapTile");
    for (i = 0; i < x.length; i++) {
        x[i].style['width'] = "20px";
        x[i].style['height'] = "20px";
        x[i].style['margin'] = "5px 0px 0px 0px";
    }

    for (x = 0; x < 4; x++) {
        for (y = 0; y < 4; y++) {

            whichButton = "mapTile-" + x + "-" + y
            tileType = (gameData.diseaseArray[x][y])


            if (tileType == 0) {
                colorChanger(whichButton, accent4)
            } else if (tileType == 1) {
                colorChanger(whichButton, limesRelatedAccent)
            } else if (tileType == 2) {
                colorChanger(whichButton, "#FF999A")
            } else if (tileType == 3) {
                colorChanger(whichButton, "#565656")
            } else if (tileType == 4) {
                colorChanger(whichButton, "#4DFFFF")
            }
        }
    }




    if (gameData.achievement1 == 1) {
        document.getElementById('coinsAchievement').style.backgroundColor = limesRelatedAccent;
    }
    if (gameData.achievement2 == 1) {
        document.getElementById('coinsAchievement2').style.backgroundColor = limesRelatedAccent;
    }
    if (gameData.achievement3 == 1) {
        document.getElementById('coinsAchievement3').style.backgroundColor = limesRelatedAccent;
    }
    if (gameData.achievement4 == 1) {
        document.getElementById('coinsAchievement4').style.backgroundColor = limesRelatedAccent;
    }



    if (gameData.autoCollectingBar == 0 || gameData.autoCollectingBar == (gameData.nourishment + 1) * 100) {
        colorChanger("pickUpLimes", limesRelatedAccent)
    } else {
        colorChanger("pickUpLimes", grayAccent)
    }



    if (gameData.respect >= 50) {
        colorChanger('50RespectMilestone', limesRelatedAccent)
        showBasicDiv("storeTypesButtonsDiv")
    } else {

        colorChanger('50RespectMilestone', grayAccentLight)
        hide("storeTypesButtonsDiv")
    }


    if (gameData.respect >= 1000) {
        colorChanger('1000RespectMilestone', limesRelatedAccent)
    } else {
        colorChanger('1000RespectMilestone', grayAccentLight)
    }



    ifMaxDarkGray("basket")
    ifMaxDarkGray("juicer")
    ifMaxDarkGray("peeler")


    if (gameData.lookAround == 3) {
        hide('lookAroundButton')
    } else {
        tabs('lookAroundButton', "inline-block")
    }

    if (gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2) {
        colorChanger('decreaseJuiceSoldButton', grayAccent)
        colorChanger('increaseJuiceSoldButton', grayAccent)

    } else {
        colorChanger('decreaseJuiceSoldButton', grayAccentLight)
        colorChanger('increaseJuiceSoldButton', grayAccentLight)
    }




    colorChanger('lookAroundButton', grayAccentLight)
    colorChanger('deliveryProgress', accent0)
    colorChanger('deliveryBar', accent3)


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




    function twoToggleButtons(button1, button2, value) {
        if (value == 1) {
            colorChanger(button1, accent3)
            colorChanger(button2, accent2)
        } else {
            colorChanger(button1, accent2)
            colorChanger(button2, accent3)
        }
    }


}