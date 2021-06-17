function loadStuff(savegame) {


    if (savegame !== null) {
        Object.assign(gameData, savegame);
        backwardsCompatibility(savegame.versionNumber)
        gameData.versionNumber = 84
        updateValues()
        updateAfterLoad()
    } else {
        update("newInfo", "Save File Empty.")
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
		if(gameData.currentTask == x && gameData.currentTask !== "none")
		{
			gameData.currentTask = "none"
		}
		else
		{
			gameData.currentTask = x
		}
		
		 if (gameData.currentTask == 'eatFood') {
			eat()
		}
	}
	
	
	else {
		startCurrentTask(x)	
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
	
	updateValues()
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


    var elem = document.getElementById(i);
    elem.style.width = eval("gameData." + i) + "%";
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

function basicBuy(x, price) {

    if (gameData.coins >= price) {
        gameData.coins -= price
        eval("gameData." + x + "+= 1")
    }

    updateValues()
}

function addResearchers(id, amount) {

	if (amount > 0 && (researchersAvailable - amount >= 0))
	{
		gameData[id + "Researchers"] += amount
		researchersAvailable -= amount
	}
	else if (amount < 0 && (researchersAvailable - amount <= gameData.researchers) && gameData[id + "Researchers"] > 0)
	{
		gameData[id + "Researchers"]  += amount
		researchersAvailable -= amount
	}

    updateValues()
}

function hireResearcher(id) {
	
    if (id == 'coins') {
		if (gameData[id] >= 5000) {
			gameData[id] -= 5000
			gameData.researchers += 1

		}
    }
	
    else if (id == 'megaCoins') {
		if (gameData[id] >= 1) {
			gameData[id] -= 1
			gameData.researchers += 1

		}
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

//Recurring function for continuing a loading bar.
function basicBarSkill(variable) {
    i = eval("gameData." + variable + "Bar")

    if (i <= 99.5) {
        eval("gameData." + variable + "Bar += 0.5");
        x = variable + "Bar()"
        if (variable != "eat") {
            setTimeout(x, (50 / (gameData.intelligenceSkillLevel / gameData.intelligenceSkillLevelMax + 1)) / gameData.tickspeed)
        } else {
            setTimeout(x, 10 / gameData.tickspeed)
        }
    } else {

        eval("gameData." + variable + "SkillLevel += 1");
        eval("gameData." + variable + " += 2");
    }
    updateValues()
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
    y = eval("gameData." + x + "Bar")
    if (y <= 99 && y != 0) {
        eval(x + "Bar()")
    }
}

function restartBarNoMovement(x) {
    y = eval("gameData." + x + "Bar")
    if (y <= 99 && y != 0) {
        eval(x + "Bar(0)")
    }
}

//Starts a loading bar.
function barStart(i, functionToCall, variable) {
    if (i >= 99.9 || i == 0) {
        eval(variable)
        eval(functionToCall)
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
function barStartGranularSkillBasic(variable) {
    variableBar = variable + "Bar"

    i = eval("gameData." + variableBar)
    if ((i == 100 || i == 0) && (eval("gameData." + variable + "SkillLevel") < eval("gameData." + variable + "SkillLevelMax") && gameData.eat >= eval("gameData." + variable + "SkillLevel")) || variable == "eat") {
        if (variable != "eat") {
            eval("gameData.eat -= gameData." + variable + "SkillLevel")
        }
        eval("gameData." + variableBar + " = 0")
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
  if (valRaw)
  {
	  if(valRaw > 0){
		  
      label = document.getElementById(elem+'Div')
      if (label)
          label.style.display = "block"
	  
	  label = document.getElementById(elem+'P')
      if (label)
          label.style.display = "block"
	  
	  label = document.getElementById(elem)
      if (label)
          label.style.display = "block"
	  
	  label = document.getElementById(elem+'Br')
      if (label)
          label.style.display = "block"
	  }
  }      
  update(elem, val)
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

//Checks if a value is high enough, and shows an element if so.
function checkShow(i, n, txt) {
    if (i >= n) {
        tabs(txt, "block")
    }
}

//Checks if a value is higher than 0, and shows an element if so.
function checkShow(i, txt) {
    if (i >= 1) {
        tabs(txt, "block")
    }

}

//Checks if a value is higher than 0, and shows an element if so. If not, hides the element.
function checkShowNonVariable(i, txt) {
    if (i >= 1) {
        tabs(txt, "block")
    } else {
        tabs(txt, "none")
    }

}

function saveBeforeWipe(id) {
	eval(id + 'Now' + '=' + 'gameData.' + id )
}


function saveAfterWipe(id) {
	eval('gameData.' + id + '=' + id + 'Now')
}

function saveGame() {

    localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))

}

function exportGame() {
    update("exportCode", JSON.stringify(gameData))
}


function importGame() {
    var savegame = JSON.parse(window.prompt("Import Code: "));
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

function autosave() {
    if (gameData.autosave == 1) {
        saveGame()
    }
    setTimeout(autosave, 3000)
}

function resetGame() {
    if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
        Object.assign(gameData, gameDataBase)
        localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
        location.reload();
    }
}