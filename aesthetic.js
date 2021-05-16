accent0 = "#222831"; //Main Color
accent1 = "#393e46"; //Accent Color
accent2 = "#eeeeee"; //When buttons are toggled off
accent3 = "#00adb5"; //When buttons are toggled on
grayAccent = "#768091";
grayAccentLight = "#eeeeee";

function addAesthetic(){
	
	document.getElementById('inventoryKnifeLime').style.backgroundColor = accent3;	
	
	if(	gameData.limeTypeToJuice == 1)
	{
		document.getElementById('juicePeeledLimesToggleButton').style.backgroundColor = accent3;
		document.getElementById('juiceLimesToggleButton').style.backgroundColor = accent2;
	}
	else
	{
		document.getElementById('juiceLimesToggleButton').style.backgroundColor = accent3;
		document.getElementById('juicePeeledLimesToggleButton').style.backgroundColor = accent2;	
	}
	
	if(	gameData.deliveryTypeToggle == 1)
	{
		document.getElementById('deliveryToggleExpressButton').style.backgroundColor = accent3;
		document.getElementById('deliveryToggleStandardButton').style.backgroundColor = accent2;	
	}
	else
	{
		document.getElementById('deliveryToggleStandardButton').style.backgroundColor = accent3;
		document.getElementById('deliveryToggleExpressButton').style.backgroundColor = accent2;
	}		
	
	document.getElementById('deliveryProgress').style.backgroundColor = accent0;	
    document.getElementById('deliveryBar').style.backgroundColor = accent3;		
	
	
	
	document.getElementById('makeJuiceButton').style.backgroundColor = accent1;	
    document.getElementById('makeMaxJuiceButton').style.backgroundColor = accent1;	
	
	
	//Gray Accents
		document.getElementById('decreaseJuiceSoldButton').style.backgroundColor = grayAccent;	
		document.getElementById('increaseJuiceSoldButton').style.backgroundColor = grayAccent;

	//Basic Div
	  var x = document.getElementsByClassName("basicDiv");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style.padding = "5px";
	  }

	//Basic Text
	  var x = document.getElementsByClassName("basicText");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = grayAccentLight;
	  }
	  

	//Basic Button
	  var x = document.getElementsByClassName("basicButton");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
	  }


		
		
	//Skills
	
		//Skill Bars
	  var x = document.getElementsByClassName("skillBar");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
	  }
	  
		//Skill Progress
	  var x = document.getElementsByClassName("skillProgress");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
	  }
}