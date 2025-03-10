function tabScience(tabby) {
    hide("research")
    hide("researchers")
	
	setColor('researchButton', '#BBBBBB')
	setColor('researchersButton', '#BBBBBB')
	
	setColor(tabby + "Button", "#898989")
	
    document.getElementById(tabby).style.display = "block"
}

function addResearchers(id, amount) {
	x = id + "Researchers"
	
	if (amount > 0) {
		if (researchersAvailable - amount >= 0)
			gameData[x] += amount
		else
			gameData[x] += researchersAvailable
	} 
	else if (gameData[x] + amount >= 0)
		gameData[x] += amount
	else
		gameData[x] = 0

}

function hireResearcher() {
	if (gameData.megaCoins >= 1) {
		gameData.megaCoins -= 1
		gameData.researchers += 1
	}
}

function onLoadScience () {
	for (let i = 0; i < sciences.length; i++) {
		id = sciences[i].id

		document.getElementById('research').innerHTML += `
		<div class="basicDiv" id="` + id + `Div">
			<button class="specialButton" onclick="barStartScience(` + i + `)">` + sciences[i].buttonText + `</button>
			<p class="basicText" id="` + id + `Researchers" style="color:#00AAFF;background-color:#000000"></p>
			<button class="specialButton"                       style="background-color:#00AAFF;width:30px" onclick="addResearchers('` + id + `', -1)">-</button>
			<button class="specialButton changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('` + id + `', -10)">-10</button>
			<button class="specialButton"                       style="background-color:#00AAFF;width:30px" onclick="addResearchers('` + id + `', 1)">+</button>
			<button class="specialButton changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('` + id + `', 10)">+10</button>
			<div class="scienceInfo">
				<p class="basicText">` + sciences[i].info + `</p>
			</div>
			<div class="skillProgress" id="` + id + `Progress">
				<div class="skillBar" id="` + id + `Bar"></div>
			</div>
			<p class="basicText" id="` + id + `Text"></p>
			<p class="basicText" id="` + id + `Time"></p>
		</div>`


		if (gameData[id + "Bar"] > 0) {

			if (gameData.surveillanceCamera2)
				gameData[id + "Bar"] += Math.floor(secondsOffline * 0.5 * gameData[id + "Researchers"] / sciences[i].equation())

			runScienceBar(i)
		}
	}
}

function barStartScience(i) {
	if (sciences[i].startRequirement && gameData[sciences[i].id + 'Bar'] == 0)
		runScienceBar(i)
}

function runScienceBar (i) {
	id = sciences[i].id

	if (gameData[id + 'Bar'] < 100) {
		gameData[id + 'Bar'] += (0.0075 * gameData[id + 'Researchers']) / sciences[i].equation()
		setTimeout(runScienceBar, 15, i)
	}
	else {
		gameData[sciences[i].id + 'Bar'] = 0
		sciences[i].onBarFilled()
	}

	updateBar(id)
}

function updateScienceData() {
  for (let i = 0; i < sciences.length; i++) {
    const id = sciences[i].id;
    const researchers = gameData[id + "Researchers"];

    update(id + "Researchers", researchers + " Researchers");

    const researchTime = Math.floor((200 * sciences[i].equation()) / researchers);

    let timeToShow;
    if (researchTime === Infinity) {
      timeToShow = 'Infinite Seconds';
    } else if (researchTime <= 200) {
      timeToShow = researchTime.toLocaleString() + ' Seconds';
    } else {
      timeToShow = Math.floor(researchTime / 60).toLocaleString() + ' Minutes';
    }

    update(id + 'Time', 'Estimated Time: ' + timeToShow);
    researchersAvailable -= researchers;
    update(id + "Text", sciences[i].description());
  }
}

function updateValuesScience() {

	researchersAvailable = gameData.researchers

    updateScienceData();

	update("benevolenceRespectIncrease", "Respect increase:  " + (Math.floor((Math.pow(2, gameData.limeDiseaseLakes - 10)) * gameData.benevolence)).toLocaleString())
	update("textForResearchers", researchersAvailable + " Available Researchers")



	var x = document.getElementsByClassName("changeResearchersBy10")
	for (i = 0; i < x.length; i++) {
		if (gameData.changeResearchersBy10Unlock)
			x[i].style.display = 'inline-block'
		else
			x[i].style.display = 'none'
	}
}
