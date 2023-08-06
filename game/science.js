addMainTabs([
	{
		id: 'science',
		text: 'Science',
		color1: '9ABBFF',
		color2: '4D88FE'
	},
]);

sciences = [
	{
		id: 'watertight',
		buttonText: 'Watertight Seal',
		info: 'Decreases peeled limes needed to make juice by 1',
		description: function () {
			return "Currently: " + gameData.peeledLimesPerJuice + " Peeled Limes -> 1 Juice"
		},
		equation: function () {
			return Math.pow(10, 6 - gameData.peeledLimesPerJuice)
		},
		onBarFilled: function () {
			gameData.peeledLimesPerJuice -= 1
		},
		startRequirement: function () {
			if (gameData.peeledLimesPerJuice > 1)
				return true
		},
	},
	{
		id: 'surveying',
		buttonText: 'Surveying',
		info: 'Increase disease tiles by 1',
		description: function () {
			return "Currently: " + gameData.numberOfTiles + " / 20 Tiles"
		},
		equation: function () {
			return Math.pow(2, gameData.numberOfTiles - 15)
		},
		onBarFilled: function () {
			gameData.numberOfTiles += 1
			diseaseControlQuit()
		},
		startRequirement: function () {
			if (gameData.numberOfTiles < 20)
				return true
		},
	},
	{
		id: 'benevolence',
		buttonText: 'Benevolence',
		info: 'Increase respect change from helping civilians with more lakes',
		description: function () {
			return "Currently: Level " + gameData.benevolence
		},
		equation: function () {
			return Math.pow(2, gameData.benevolence * 2)
		},
		onBarFilled: function () {
			gameData.benevolence += 1
		},
		startRequirement: function () {
			return true
		},
	},
]

addGameVariables({
	watertightBar: 0,
	watertightResearchers: 0,
	surveyingBar: 0,
	surveyingResearchers: 0,
	researchers: 0,
});

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

function onLoadScience() {
  const researchDiv = document.getElementById('research');
  let html = '';

  for (let i = 0; i < sciences.length; i++) {
    const id = sciences[i].id;
    const buttonText = sciences[i].buttonText;
    const info = sciences[i].info;

    html += `
      <div class="basicDiv" id="${id}Div">
        <button class="specialButton" onclick="barStartScience(${i})">${buttonText}</button>
        <p class="basicText" id="${id}Researchers" style="color:#00AAFF;background-color:#000000"></p>
        <button class="specialButton" style="background-color:#00AAFF;width:30px" onclick="addResearchers('${id}', -1)">-</button>
        <button class="specialButton changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('${id}', -10)">-10</button>
        <button class="specialButton" style="background-color:#00AAFF;width:30px" onclick="addResearchers('${id}', 1)">+</button>
        <button class="specialButton changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('${id}', 10)">+10</button>
        <div class="scienceInfo">
          <p class="basicText">${info}</p>
        </div>
        <div class="skillProgress" id="${id}Progress">
          <div class="skillBar" id="${id}Bar"></div>
        </div>
        <p class="basicText" id="${id}Text"></p>
        <p class="basicText" id="${id}Time"></p>
      </div>
    `;

    if (gameData[id + "Bar"] > 0) {
      if (gameData.surveillanceCamera2) {
        gameData[id + "Bar"] += Math.floor(secondsOffline * 0.5 * gameData[id + "Researchers"] / sciences[i].equation());
      }
      runScienceBar(i);
    }
  }

  researchDiv.innerHTML = html;
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
