function addAesthetic(){
		
		
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
	
	document.getElementById('sellYourLimesButton').style.backgroundColor = yellowAccent;	
	document.getElementById('sellYourJuiceButton').style.backgroundColor = yellowAccent;	
	
	document.getElementById('backgroundForValues').style.backgroundColor = "#000000";	

	
	document.getElementById('pickUpLimes').style.backgroundColor = limesRelatedAccent;	
	
	document.getElementById('application').style.backgroundColor = accent4;	


	document.getElementById('mainBody').style.backgroundColor = background;	
		
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

	if(	gameData.foodTypeToggle == 1)
	{
		document.getElementById('foodToggleRottenLimesButton').style.backgroundColor = accent3;
		document.getElementById('foodToggleLimesButton').style.backgroundColor = accent2;	
	}
	else
	{
		document.getElementById('foodToggleLimesButton').style.backgroundColor = accent3;
		document.getElementById('foodToggleRottenLimesButton').style.backgroundColor = accent2;
	}		
		
	basicInfoToggle("skill")
	basicInfoToggle("teach")	
	basicInfoToggle("employeeStats")
	basicInfoToggle("basket")



	


	if(gameData.baskets == gameData.maxBaskets)
	{
		document.getElementById('buyABasketButton').style.backgroundColor = grayAccent;
	}
	else{
		document.getElementById('buyABasketButton').style.backgroundColor = accent4;		
	}

	if(gameData.lookAround == 3)
	{
		document.getElementById('lookAroundButton').style.backgroundColor = grayAccent;
	}
	else{
		document.getElementById('lookAroundButton').style.backgroundColor = grayAccentLight;		
	}	
	
	document.getElementById('deliveryProgress').style.backgroundColor = accent0;	
    document.getElementById('deliveryBar').style.backgroundColor = accent3;		
	

	//Basic Div
	  var x = document.getElementsByClassName("basicDiv");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style.padding = "5px 5px 5px 5px";
		x[i].style['margin'] = "10px 5px 10px 5px";
	  }

	//Basic Div Size
	  var x = document.getElementsByClassName("basicDivSize");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.padding = "5px 5px 5px 5px";
		x[i].style['margin'] = "10px 5px 10px 5px";
	  }

	//Basic Text
	  var x = document.getElementsByClassName("basicText");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = grayAccentLight;
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	  
	//Basic Text Size
	  var x = document.getElementsByClassName("basicTextSize");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.padding = "5px";
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }

	//Gray Button
	  var x = document.getElementsByClassName("grayButton");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = grayAccentLight;
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	 
	//Basic Button
	  var x = document.getElementsByClassName("basicButton");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent3;
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	  
	//Basic Button Size
	  var x = document.getElementsByClassName("basicButtonSize");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	  
	//Special Button
	  var x = document.getElementsByClassName("specialButton");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent4;
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	  


		
		
	//Skills
	  
		//Skill Progress
	  var x = document.getElementsByClassName("skillProgress");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
	  
		//Vertical Progress
	  var x = document.getElementsByClassName("verticalProgress");
	  var i;
	  for (i = 0; i < x.length; i++) {
		x[i].style.backgroundColor = accent0;
		x[i].style['margin'] = "5px 5px 5px 5px";
	  }
}