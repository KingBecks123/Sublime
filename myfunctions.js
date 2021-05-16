
//Recurring function for continuing a loading bar.
function basicBarSkill(variable) {
	i = eval("gameData." + variable + "Bar")
	
	if(i <= 99)
	{
		eval("gameData." + variable + "Bar += 1");
		x = variable + "Bar()"
		setTimeout(x, (2 * (21 - gameData.intelligence)) / tickspeed)
	}
	else
	{
		eval("gameData." + variable + " += 1");
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
	if( ( i == 100 || i == 0 ) && ( eval("gameData." + variable) < 20 ) )
	{
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

//Checks if a value is higher than 1, and shows an element if so.
function checkShow(i, txt)
{
	if(i >= 1)
	{tabs (txt, "block")
	}
}