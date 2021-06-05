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
	
	colorChanger('sellYourLimesButton', yellowAccent)
	colorChanger('sellYourJuiceButton', yellowAccent)

	colorChanger('backgroundForValues', "#000000")
	
	colorChanger('pickUpLimes', limesRelatedAccent)
	colorChanger('application', accent4)
	
	colorChanger('mainBody', background)
	colorChanger('inventoryKnifeLime', accent3)	

	twoToggleButtons('deliveryToggleExpressButton', 'deliveryToggleStandardButton', gameData.deliveryTypeToggle)	
	twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)	
	twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)		
	
	
	basicToggle("skill", "Info")
	basicToggle("teach", "Info")	
	basicToggle("employeeStats", "Info")
	basicToggle("basket", "Info")
	
	basicToggle("juicers", "Bulk")	
	basicToggle("peelers", "Bulk")
	basicToggle("baskets", "Bulk")	


	if(gameData.baskets == gameData.basketsMax)
	{
		colorChanger('buyABasketButton', grayAccent)	
	}
	else{
		colorChanger('buyABasketButton', accent4)	
	}

	if(gameData.juicers == gameData.juicersMax)
	{
		colorChanger('buyAJuicerButton', grayAccent)	
	}
	else{
		colorChanger('buyAJuicerButton', accent4)		
	}

	if(gameData.peelers == gameData.peelersMax)
	{
		colorChanger('buyAPeelerButton', grayAccent)
	}
	else{
		colorChanger('buyAPeelerButton', accent4)
	}

	if(gameData.lookAround == 3)
	{
		colorChanger('lookAroundButton', grayAccent)
	}
	else{
		colorChanger('lookAroundButton', grayAccentLight)	
	}	

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
	  
	  
	  
	  
	function twoToggleButtons(button1, button2, value){
		if(	value == 1)
		{
			colorChanger(button1, accent3)
			colorChanger(button2, accent2)
		}
		else
		{
			colorChanger(button1, accent2)
			colorChanger(button2, accent3)
		}
	}
	
	
}
