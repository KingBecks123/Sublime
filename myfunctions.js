function basicInfoToggle(input){

	info = input + "Info"		
	toggleVar = "gameData." + info + "Toggle"
	button = info + "Button"
	x = document.getElementsByClassName(info);
	
	if(	eval(toggleVar + " == 1"))
	{
		document.getElementById(button).style.backgroundColor = accent3;
		  for (i = 0; i < x.length; i++) {
			x[i].style.display = "block";
			}
	}
	else
	{
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
	elem.innerHTML = "  " + Math.ceil(eval("gameData." + i))  + "%";
}

function switchValue(x) {
	
	i = "gameData." + x
	
	if(eval(i) == 0)
	{
		eval(i + " = 1")
	}
	else
	{
		eval(i + " = 0")
	}

updateValues()
updateValues()
}

function basicBuy(x, price) {
	
	if(gameData.coins >= price)
	{
		gameData.coins -= price
		eval("gameData." + x + "+= 1")
	}
	
updateValues()
}

function basicBuyMax(x, price, max) {
	
	if(gameData.coins >= price && eval("gameData." + x) < max)
	{
		gameData.coins -= price
		eval("gameData." + x + "+= 1")
	}
	
updateValues()
}

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
		if(variable != "eat")
		{
			setTimeout(x, (101 - gameData.intelligence) / gameData.tickspeed)
		}
		else
		{
			setTimeout(x, 10 / gameData.tickspeed)
		}
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

function toggle(i) {
	x = "gameData." + i
	
	if (eval(x) == 0)
	{
		eval(x + "= 1")
	}
	else if (eval(x) == 1)
	{
		eval(x + "= 0")	}
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

function restartBar (x){
	y = eval("gameData." + x + "Bar")
	if(y <= 99 && y != 0)
		{
			eval(x + "Bar()")
		}
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
	if( ( i == 100 || i == 0 ) && ( eval("gameData." + variable + "SkillLevel") < eval("gameData." + variable + "SkillLevelMax") && gameData.eat >= eval("gameData." + variable + "SkillLevel"))|| variable == "eat")
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

//Background Color Changer
function colorChanger(id, content) {
  document.getElementById(id).style.backgroundColor = content;
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

if (gameData.rottenLimes > 10 || gameData.coins > 0 || gameData.limes > 1){

  localStorage.setItem('mathAdventureSave', JSON.stringify(gameData))
	update("newInfo", "Game Saved.")

}
}

function exportGame() {
	update("exportCode", JSON.stringify(gameData))
}


function importGame() {
  var savegame = JSON.parse(window.prompt("Import Code: "));
	loadStuff(savegame)
}

function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("mathAdventureSave"))
	loadStuff(savegame)
}

function loadStuff(savegame){
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