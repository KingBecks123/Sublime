
// returns a random integer from 1 to X	
function beckyRandom(max){
	return Math.floor(Math.random() * max) + 1;
}

//Recurring function for continuing a loading bar.
function basicBarSkill(variable) {
	i = eval("gameData." + variable + "Bar")
	
	if(i <= 99)
	{
		eval("gameData." + variable + "Bar += 1");
		x = variable + "Bar()"
		setTimeout(x, (2 * (101 - gameData.intelligence)) / tickspeed)
	}
	else
	{
		if(variable != "eat")
		{
			eval("gameData." + variable + "SkillLevel += 1");
			eval("gameData." + variable + " += 2");
		}
		else{
			gameData.eat += gameData.foodType
			if(gameData.eat > 100)
			{gameData.eat = 100}
		
		}
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

//Starts a loading bar.
function barStart(i, functionToCall, variable)
{
	if(i >= 99.9 || i == 0 )
	{
		eval(variable)
		eval(functionToCall)
	}
updateValues()
}

//Starts a granular loading bar.
function barStartGranular(variable)
{
	variableBar = variable + "Bar"
	i = eval("gameData." + variableBar)
	if(i == 100 || i == 0)
	{
		eval("gameData." + variableBar + " = 0")
		eval(variableBar+"()")
	}
updateValues()
}

//Starts a granular loading bar for basic skills.
function barStartGranularSkillBasic(variable)
{
	variableBar = variable + "Bar"
	
	i = eval("gameData." + variableBar)
	if( ( i == 100 || i == 0 ) && ( eval("gameData." + variable + "SkillLevel") < eval("gameData." + variable + "SkillLevelMax") || variable == "eat") && (gameData.eat >= eval("gameData." + variable)))
	{
		if(variable != "eat"){
			eval("gameData.eat -= gameData." + variable + "SkillLevel")		
		}
		eval("gameData." + variableBar + " = 0")
		eval(variableBar+"()")
	}
updateValues()
}

//Starts a granular loading bar for skills.
function barStartGranularSkill(variable, n)
{
	variableBar = variable + "Bar"
	
	i = eval("gameData." + variableBar)
	if( ( i == 100 || i == 0 ) && ( eval("gameData." + variable) < n ) )
	{
		eval("gameData." + variableBar + " = 0")
		eval(variableBar+"()")
	}
updateValues()
}

//Replaces an element with new text.
function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

//Replaces a number with new text.
function updateNumber(id) {
  Id = jsUcfirst(id) 
  x = "textFor" + Id + "s"
  if(eval("gameData." + id + "s") == 1)
  {
	y = eval("gameData." + id + "s") + " " + Id
  }
  else
  {
	y = eval("gameData." + id + "s") + " " + Id + "s"
  }
  update(x, y)
}

//Replaces a number with new text.
function updateNumberSpecial(id, textToShow) {
  Id = jsUcfirst(id) 
  x = "textFor" + Id + "s"
  if(eval("gameData." + id + "s") == 1)
  {
	y = eval("gameData." + id + "s") + " " + textToShow
  }
  else
  {
	y = eval("gameData." + id + "s") + " " + textToShow + "s"
  }
  update(x, y)
}

//Capitalises the first letter in a string.
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Hides or shows an element of the html.
function divVisibility (elementid, display){
  var x = document.getElementById(elementid);
    x.style.visibility = display;
}

//Completely deletes or shows an element of the html.
function tabs(id, content) {
  document.getElementById(id).style.display = content;
}

//Checks if a value is high enough, and shows an element if so.
function checkShow(i, n, txt)
{
	if(i >= n)
	{tabs (txt, "block")
	}
}

//Checks if a value is higher than 0, and shows an element if so.
function checkShow(i, txt)
{
	if(i >= 1)
	{tabs (txt, "block")
	}
}

function saveGame() {
  localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
	update("newInfo", "Game Saved.")
}

function exportGame() {
	update("exportCode", JSON.stringify(gameData))
}


function importGame() {
  var savegame = JSON.parse(window.prompt("Import Code: "));
  if (savegame !== null) {
		Object.assign(gameData, savegame);
		update("newInfo", "Game Loaded.")
		updateValues()
		updateAfterLoad()
  }
  else
  {
	  	update("newInfo", "Save File Empty.")
  }
}

function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("mathAdventureSave"))
  if (savegame !== null) {
		Object.assign(gameData, savegame);
		update("newInfo", "Game Loaded.")
		updateValues()
		updateAfterLoad()
  }
  else
  {
	  	update("newInfo", "Save File Empty.")
  }
}