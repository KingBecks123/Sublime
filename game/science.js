mainSciences = ['watertight', 'surveying', 'benevolence'];
//Uses: Updates time to complete science. Updates number of researchers allocated.

benevolenceEquation = Math.pow(2, gameData.benevolence * 2)
watertightEquation = Math.pow(10, 6 - gameData.peeledLimesPerJuice)
surveyingEquation = Math.pow(2, gameData.numberOfTiles - 15)

function updateScience() {
	if (gameData.respectMilestone1000) {

		update("watertightText", "Currently: " + gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice")
		update("surveyingText", "Currently: " + gameData.numberOfTiles + " / 20 Tiles")
		update("benevolenceText", "Currently: Level " + gameData.benevolence)

		update("textForResearchers", researchersAvailable + " Available Researchers")


		if (gameData.limeDiseaseLakes < 10)
			benevolenceRespectIncrease = 0
		else
			benevolenceRespectIncrease = (Math.pow(2, gameData.limeDiseaseLakes - 10)) * gameData.benevolence

		update("benevolenceRespectIncrease", "Respect increase:  " + benevolenceRespectIncrease.toLocaleString())

		researchersAvailable = gameData.researchers

		checkShowOrHide(gameData.benevolence, "benevolence")
		checkShowOrHide(gameData.unlockBenevolence, "benevolenceDiv")

		//Adds the properties of all sciences.
		for (let i = 0; i < mainSciences.length; i++) {

			//Shows how many researchers are currently working on the science.
			update("textFor" + jsUcfirst(mainSciences[i]) + "Researchers", gameData[mainSciences[i] + "Researchers"] + " Researchers")

			//Shows the estimated time to complete the science by multiplying the time for half a bar by 200.
			eval([mainSciences[i] + 'ResearchTime'] + " = Math.floor(200 * " + [mainSciences[i] + 'Equation'] + "/ gameData[mainSciences[i] + 'Researchers'])")

			//Converts time to seconds or minutes or infinity depending on size.
			timeToShowScience(mainSciences[i])

			//Updates the amount of researchers available.
			researchersAvailable -= gameData[mainSciences[i] + "Researchers"]
		}
	}
	
	if (!gameData.unlockBenevolence && gameData.respectMilestone1000) {
		showBasicDiv("unlockBenevolence")
	} else {
		hide("unlockBenevolence")
	}
	
	checkHide(gameData.surveillanceCamera2, "offlineScience")
	checkShow(gameData.surveillanceCamera2, "upgradeHighTechSurveillance")
}

function watertight() {
    if (gameData.peeledLimesPerJuice > 1) {
		
		
		barStartGranular('watertight')
	}
}

function watertightBar() {
    if (gameData.watertightBar < 100) {
		if (gameData.watertightResearchers > 0)
		{
			if(watertightBarDoMove)
				gameData.watertightBar += 0.5;
			
			watertightBarDoMove = 1
			
			setTimeout(watertightBar, (1e4 * Math.pow(10, 5 - gameData.peeledLimesPerJuice)) / gameData.watertightResearchers)
		}
		
		moveBar("watertight")
        } else {
			gameData.peeledLimesPerJuice -= 1
		}
}

function surveying() {
    if (gameData.numberOfTiles < 20) {

		barStartGranular('surveying')
	}
}




function surveyingBar() {
    if (gameData.surveyingBar < 100) {
		if (gameData.surveyingResearchers > 0)
		{
			if(surveyingBarDoMove)
				gameData.surveyingBar += 0.5;
			
			surveyingBarDoMove = 1
			setTimeout(surveyingBar, (1e3 * Math.pow(2, gameData.numberOfTiles - 15)) / gameData.surveyingResearchers)
		}
		
		moveBar("surveying")
		
        } else {
			gameData.numberOfTiles += 1
			
			diseaseControlQuit()
		}
}

function benevolenceBar() {
	benevolenceEquation = Math.pow(2, gameData.benevolence * 2)
    if (gameData.benevolenceBar < 100) {
		if (gameData.benevolenceResearchers > 0)
		{
			if(benevolenceBarDoMove)
				gameData.benevolenceBar += 0.5;
			
			benevolenceBarDoMove = 1
			setTimeout(benevolenceBar, (1e3 * benevolenceEquation) / gameData.benevolenceResearchers)
		}
		
		moveBar("benevolence")
		
        } else {
			gameData.benevolence += 1
		}
}

function surveillanceCamera2(){
		if(gameData.surveillanceCamera2 && secondsOffline > 60)
	{
		
		for (let i = 0; i < mainSciences.length; i++) {
			
			var barFilled   = gameData[mainSciences[i] + "Bar"]
			var researchers = gameData[mainSciences[i] + "Researchers"]
			
			if (researchers > 0 && barFilled != 0)
			{
				if (mainSciences[i] == 'benevolence')
					x = benevolenceEquation
				if (mainSciences[i] == 'surveying')
					x = surveyingEquation
				if (mainSciences[i] == 'watertight')
					x = watertightEquation

				//0.5 makes it add half a bar.

				amountToAdd = Math.floor(secondsOffline * 0.5 * researchers / x)
				
				if(barFilled + amountToAdd < 100)
				{
					gameData[mainSciences[i] + "Bar"] += amountToAdd
				}
				else
				{
					gameData[mainSciences[i] + "Bar"] = 0
					
					if (mainSciences[i] == 'surveying' && gameData.numberOfTiles < 20)
						gameData.numberOfTiles += 1
					else if (mainSciences[i] == 'watertight' && gameData.peeledLimesPerJuice > 1)
						gameData.peeledLimesPerJuice -= 1
					else
						gameData[mainSciences[i]] += 1

				}
				moveBar(mainSciences[i])
			}
	
		}
	
	}
}

function timeToShowScience(id) {
	var researchTime = eval(id + 'ResearchTime')
	var time = id + 'Time'
	if (gameData[id + 'Researchers'] == 0) {
		update(time, "Estimated Time: Infinite Seconds")
	} else if (researchTime <= 200) {
		update(time, "Estimated Time: " + researchTime.toLocaleString() + " Seconds")
	} else {
		update(time, "Estimated Time: " + Math.floor(researchTime / 60).toLocaleString() + " Minutes")
	}
}

function tabScience(tabby) {
    tabs("research", "none")
    tabs("researchers", "none")
	
	colorChanger('researchButton', '#BBBBBB')
	colorChanger('researchersButton', '#BBBBBB')		
	
	colorChanger(tabby + "Button", "#898989")
	
    document.getElementById(tabby).style.display = "block"
}