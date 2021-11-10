function loadStuff(savegame) {


    if (savegame !== null) {
        Object.assign(gameData, savegame);

        backwardsCompatibility(gameData.versionNumber)
        gameData.versionNumber = 129
        updateValues()
        updateAfterLoad()
    } else {
        update("newInfo", "Save File Empty.")
    }
}

function preventNegative(id){
    if (gameData[id] < 0) {
        gameData[id] 
    }
}

function setRotation(id, number){
	document.getElementById(id).style.transform = 'rotate(' + number + 'deg)'		

}

function timeToShowScience(id){
	
	var researchTime = eval(id + 'ResearchTime')
	var time = id + 'Time'
	
	if (gameData[id + 'Researchers'] == 0)
	{
		update(time, "Estimated Time: Infinite Seconds")
	}
	
	else if (researchTime <= 200)
	{
		update(time, "Estimated Time: " + researchTime.toLocaleString() + " Seconds")
	}
	
	else
	{
		update(time, "Estimated Time: " + Math.floor(researchTime / 60).toLocaleString() + " Minutes")
	}
}

function ifMaxDarkGray(x) {

    addS = "gameData." + x + "s"
    max = "gameData." + x + "sMax"
    capitalised = jsUcfirst(x)
    button = "buyA" + capitalised + "Button"


    if (eval(addS + "==" + max)) {
        colorChanger(button, grayAccent)
    } else {
        colorChanger(button, accent4)
    }

}



function hide(x) {
    tabs(x, "none")
}

function showBasicDiv(x) {
    tabs(x, "block")
}

function pin(x) {
	
	if(gameData.pin == x && gameData.pin !== "none")
	{
		gameData.pin = "none"
	}
	else
	{
		gameData.pin = x
	}
		
		normalizeButtons()
		pinButton()
		
		
		

	updateValues()
}

function normalizeButtons(){
	$( ".juiceMarket" ).prepend( document.getElementById("sellYourJuiceButton") )
	document.getElementById("sellYourJuiceButton").style.width = "120px"
	document.getElementById("sellYourJuiceButton").style.margin = "5px"
	
	$( ".autoCollectingDiv" ).prepend( document.getElementById("autoCollectingButton") )
	document.getElementById("autoCollectingButton").style.width = "150px"
	document.getElementById("autoCollectingButton").style.margin = "5px"

}

function pinButton() {
	if(gameData.pin !== "none")
	{
		$( ".navigateButtons" ).append( document.getElementById(gameData.pin) )
		
		document.getElementById(gameData.pin).style.width = "120px"
		document.getElementById(gameData.pin).style.margin = "0px"
		document.getElementById(gameData.pin).style.padding = "0px";
	}
	
	updateValues()
}



function pickCurrentTask(x) {
	
	if (!event.shiftKey){
		
		if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax)
		{
			if(gameData.currentTask == x && gameData.currentTask !== "none" && gameData.currentTask2 !== x)
			{
				gameData.currentTask = "none"
			}
			

			else if (gameData.currentTask == "none" && gameData.currentTask2 !== x)
			{
				if(!((gameData.currentTask2 == 'makeJuice' && x == 'makeMaxJuice') || (gameData.currentTask2 == 'makeMaxJuice' && x == 'makeJuice') || (gameData.currentTask2 == 'usePeelers' && x == 'useMaxPeelers') || (gameData.currentTask2 == 'useMaxPeelers' && x == 'usePeelers')))
				gameData.currentTask = x
			}
			
			else if(gameData.currentTask2 == x && gameData.currentTask2 !== "none")
			{
				gameData.currentTask2 = "none"
			}

			else if (gameData.currentTask2 == "none")
			{
				if(!((gameData.currentTask == 'makeJuice' && x == 'makeMaxJuice') || (gameData.currentTask == 'makeMaxJuice' && x == 'makeJuice') || (gameData.currentTask == 'usePeelers' && x == 'useMaxPeelers') || (gameData.currentTask == 'useMaxPeelers' && x == 'usePeelers')))
				gameData.currentTask2 = x
			}
		}
		else
		{
			if(gameData.currentTask == x && gameData.currentTask !== "none")
			{
				gameData.currentTask = "none"
			}
			
			else
			{
				gameData.currentTask = x
			}
		}
	}
	
	
	else {
		startCurrentTask(x)	
	}
	
	updateValues()
}




function pickCurrentSkill(x) {
	if (!event.shiftKey && gameData.multitasking){
		if(gameData.currentSkill == x && gameData.currentSkill !== "none")
		{
			gameData.currentSkill = "none"
		}
		else
		{
			gameData.currentSkill = x
		}
	}
	
	
	else {
		barStartGranularSkillBasic(x, true)
	}
	
	updateValues()
}



function startCurrentTask(x) {
		
	if (x == 'eatFood') {
		eat()
	}
	
	else if (x == 'sellYourJuice') {
		sellYourJuice()
	}

	else if (x == 'makeMaxJuice') {
		makeMaxJuice()
	}	

	else if (x == 'makeJuice') {
		makeJuice()
	}	

	else if (x == 'usePeelers') {
		peelerPeel()
	}	
	
	else if (x == 'useMaxPeelers') {
		peelerPeelMax()
	}
	
	else if (x == 'autoCurrencyConversionBuy') {
		coinsToAlphaClick()
	}	
	
	else if (x == 'alphaToBeta') {
		alphaToBetaClick()
	}	
	
	else if (x == 'findPieCustomers') {
		findPieCustomers()
	}	
	
}


function showOrHideSkill(x) {

    level = "gameData." + x + "SkillLevel"
    levelMax = level + "Max"
    div = x + "Div"

    if (gameData.hideCompletedSkills == 1 && eval(level + " == " + levelMax)) {
        tabs(div, "none")
    } else {
        tabs(div, "block")
    }

}


function overMaximum(variable) {


    x = "gameData." + variable
    y = x + "Max"

    if (eval(x) > eval(y)) {
        eval(x + " = " + y)
    }

}


function showOrHideClass(input) {


    variable = "gameData." + input
    classToChange = document.getElementsByClassName(input)




    if (eval(variable + " == 1 ")) {
        for (i = 0; i < classToChange.length; i++) {
            classToChange[i].style.display = "block";
        }
    } else {
        for (i = 0; i < classToChange.length; i++) {
            classToChange[i].style.display = "none";
        }
    }
}


function toggleAesthetic(input) {


    button = input + "Button"

    if (eval("gameData." + input + " == 1")) {
        document.getElementById(button).style.backgroundColor = accent3;

    } else {
        document.getElementById(button).style.backgroundColor = accent2;


    }

}


function basicToggle(input, type) {

    info = input + type
    toggleVar = "gameData." + info + "Toggle"
    button = info + "Button"
    x = document.getElementsByClassName(info);

    if (eval(toggleVar + " == 1")) {
        document.getElementById(button).style.backgroundColor = accent3;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    } else {
        document.getElementById(button).style.backgroundColor = accent2;

        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    }

}

function moveBar(x) {
    i = x + "Bar"
	if(gameData[i] > 100)
		gameData[i] = 100

    var elem = document.getElementById(i);
    elem.style.width = gameData[i] + "%";
    elem.innerHTML = "  " + Math.ceil(eval("gameData." + i)) + "%";
}

function switchValue(x) {

    i = "gameData." + x

    if (eval(i) == 0) {
        eval(i + " = 1")
    } else {
        eval(i + " = 0")
    }

    updateValues()
    updateValues()
}

function universalBuy(id, price, currency) {

    if (gameData[currency] >= price) {
		
        gameData[currency] -= price
        gameData[id] += 1
		
    }

    updateValues()
}

function basicBuy(x, price) {

    if (gameData.coins >= price) {
        gameData.coins -= price
        eval("gameData." + x + "+= 1")
    }

    updateValues()
}

function basicBuyMegaCoins(x, price) {

    if (gameData.megaCoins >= price) {
        gameData.megaCoins -= price
        eval("gameData." + x + "+= 1")
    }

    updateValues()
}

function addResearchers(id, amount) {

	if (amount > 0)
	{
		if (researchersAvailable - amount >= 0)
		{
			gameData[id + "Researchers"] += amount
			researchersAvailable -= amount
		}
		else
		{
			gameData[id + "Researchers"] += researchersAvailable
			researchersAvailable = 0
		}
	}
	else if (amount < 0 && gameData[id + "Researchers"] > 0)
	{
		if (researchersAvailable - amount <= gameData.researchers)
		{
			gameData[id + "Researchers"]  += amount
			researchersAvailable -= amount
		}
		else
		{
			researchersAvailable += gameData[id + "Researchers"]
			gameData[id + "Researchers"]  = 0
		}
	}

    updateValues()
}

function hireResearcher(id) {

	if (gameData[id] >= 1) {
		gameData[id] -= 1
		gameData.researchers += 1

	}


    updateValues()
}

function basicBuyMax(x, price, max) {

    if (gameData.coins >= price && eval("gameData." + x) < max) {
        gameData.coins -= price
        eval("gameData." + x + "+= 1")
    }

    updateValues()
}

function bulkableBuyMax(x, price) {

    max = eval("gameData." + x + "Max")

    if (eval("gameData." + x + "BulkToggle") == 0) {
        if (gameData.coins >= price && eval("gameData." + x) < max) {

            gameData.coins -= price
            eval("gameData." + x + "+= 1")

        }
    } else {
		if (gameData.bulkBuyUnlock2)
		{
			if (gameData.coins >= (price * 100)) {
				if (eval("gameData." + x) <= max - 100) {
					gameData.coins -= price * 100
					eval("gameData." + x + "+= 100")
				} else

				{
					gameData.coins -= price * (max - eval("gameData." + x))
					eval("gameData." + x + " = " + max)
				}

			}
		}
		else
		{
			if (gameData.coins >= (price * 10)) {
				if (eval("gameData." + x) <= max - 10) {
					gameData.coins -= price * 10
					eval("gameData." + x + "+= 10")
				} else

				{
					gameData.coins -= price * (max - eval("gameData." + x))
					eval("gameData." + x + " = " + max)
				}

			}
		}
    }

    updateValues()
}


// returns a random integer from 1 to X	
function beckyRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}

// returns a random integer from X to Y
function beckyRandomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Recurring function for continuing a loading bar.
function basicBarSkill(variable, speed) {
	
	variableBar = variable + "Bar"

    if (gameData[variableBar] <= 99.5) {
		
        gameData[variableBar] += 0.5
				
		if(speed == 'slow')
			setTimeout(variableBar + "()", (1000 / (gameData.intelligenceSkillLevel * 2 / 20 + 1)) / gameData.tickspeed)
		else
			setTimeout(variableBar + "()", (100 / (gameData.intelligenceSkillLevel * 2 / 20 + 1)) / gameData.tickspeed)

		
    } else {
		
		gameData[variable + "SkillLevel"] += 1
		gameData[variable] += 2

    }
    moveBar(variable)
}

function toggle(i) {
    x = "gameData." + i

    if (eval(x) == 0) {
        eval(x + "= 1")
    } else if (eval(x) == 1) {
        eval(x + "= 0")
    }
    updateValues()
}


//sleep.
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function restartBar(x) {
    y = gameData[x + "Bar"]
    if (y < 100 && y != 0) {
        eval(x + "Bar()")
    }
	
}

function restartBarNoMovement(x) {
    y = eval("gameData." + x + "Bar")
    if (y < 100 && y != 0) {
        eval(x + "Bar(0)")
    }
}

//Starts a granular loading bar.
function barStartGranular(variable) {
    variableBar = variable + "Bar"
    i = eval("gameData." + variableBar)
	
    if (i == 100 || i == 0) {
        eval("gameData." + variableBar + " = 0")
        eval(variableBar + "()")
    }
}

//Starts a granular loading bar for basic skills.
function barStartGranularSkillBasic(variable, useSkillTrainer) {
	
    variableBar = variable + "Bar"
    i = gameData[variableBar]
    if ((i == 100 || i == 0) && (gameData[variable + "SkillLevel"] < gameData[variable + "SkillLevelMax"] && gameData.eat >= gameData[variable + "SkillLevel"])) {

		gameData.eat -= gameData[variable + "SkillLevel"]

		if(gameData.skillTrainer == 1 && useSkillTrainer == true)
		{
			gameData[variableBar] = 100
		}
		else
		{
			gameData[variableBar] = 0
		}
		
		eval(variableBar + "()")
    }
	
}

//Replaces an element with new text.
function update(id, content) {
    document.getElementById(id).innerHTML = content;
}

//Replaces a number with new text.
function updateNumber(id) {
  elem = "textFor" + jsUcfirst(id)
  valRaw = gameData[id]
  
  if (valRaw > 1e9)
       val = valRaw.toExponential(3)
  else
       val = valRaw.toLocaleString()
   
	if((valRaw && gameData[id + 'ShowVariable']) || id == 'limes')
	{
		showBasicDiv(elem + 'Div')
		showBasicDiv(elem + 'Br' )
		showBasicDiv(elem + 'P'  )
		showBasicDiv(elem        )
	}
	else
	{
		hide        (elem + 'Div')
		hide        (elem + 'Br' )
		hide        (elem + 'P'  )
		hide        (elem        )
	}
	  
  update(elem, val)
}

function currencyDisplay(id){
	variable = mainVariables[id] + 'ShowVariable'
	if (gameData[variable])
		gameData[variable] = false
	else
		gameData[variable] = true

}

//Capitalises the first letter in a string.
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Hides or shows an element of the html.
function divVisibility(elementid, display) {
    var x = document.getElementById(elementid);
    x.style.visibility = display;
}

//Completely deletes or shows an element of the html.
function tabs(id, content) {
    document.getElementById(id).style.display = content;
}

//Background Color Changer
function colorChanger(id, content) {
    document.getElementById(id).style.backgroundColor = content;
}

//Text Color Changer
function colorChangerText(id, content) {
    document.getElementById(id).style.color = content;
}

//Checks if a value is high enough, and shows an element if so.
function checkShow(i, n, txt) {
    if (i >= n) {
        tabs(txt, "block")
    }
}

//Checks if a value is higher than 0, and hides an element if so.
function checkHide(i, txt) {
    if (i > 0) {
        hide(txt)
    }

}

//Checks if a value is higher than 0, and shows an element if so.
function checkShow(i, txt) {
    if (i >= 1) {
        tabs(txt, "block")
    }

}

function increaseValue(id) {

    if (gameData[id] < gameData[id + 'Max'] || gameData[id + 'Max'] == null) {
        gameData[id] += 1
    }
    updateValues()
}

function decreaseValue(id){
    if (gameData[id] >= 1) {
        gameData[id] -= 1
    }
updateValues()
}

//Checks if a value is higher than 0, and shows an element if so. If not, hides the element.
function checkShowOrHide(i, txt) {
    if (i >= 1) {
        tabs(txt, "block")
    } else {
        tabs(txt, "none")
    }

}

//Checks if a value is higher than 0, and hides an element if so. If not, shows the element.
function checkHideOrShow(i, txt) {
    if (i >= 1) {
        tabs(txt, "none")
    } else {
        tabs(txt, "block")
    }

}

function saveBeforeWipe(id) {
	eval(id + 'Now = gameData.' + id )
}


function saveAfterWipe(id) {
	eval('gameData.' + id + '=' + id + 'Now')
}

function saveGame() {
    localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))

}

function exportGame() {
    update("exportCode", btoa(JSON.stringify(gameData)))
}


function importGame() {
    var savegame =  JSON.parse(atob(prompt("Import Code: ")))
	if(savegame !== null)
	{
		Object.assign(gameData, gameDataBase)
		loadStuff(savegame)
		saveGame()
		location.reload();
	}

}

function loadGame() {
    var savegame = JSON.parse(localStorage.getItem("mathAdventureSave"))
    loadStuff(savegame)
}

function resetTime() {
	gameData.tickspeed = 1
}

function resetGame() {
    if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
        Object.assign(gameData, gameDataBase)
        localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
        location.reload();
    }
}

function backwardsCompatibility(versionNumber) {
    if (versionNumber == undefined || versionNumber < 30) {

        gameData.basketsMax = 50
        gameData.juicersMax = 100
        gameData.peelersMax = 500
        gameData.intelligenceSkillLevelMax = 20
    }
    if (versionNumber < 78) {

		gameData.diseaseArray = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
		diseaseControlQuit()

    }
}

function setValue(id, amount){
	gameData[id] = amount
}