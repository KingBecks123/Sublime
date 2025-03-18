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
			game[x] += amount
		else
			game[x] += researchersAvailable
	} 
	else if (game[x] + amount >= 0)
		game[x] += amount
	else
		game[x] = 0

}

function hireResearcher() {
	if (game.megaCoins >= 1) {
		game.megaCoins -= 1
		game.researchers += 1
	}
}

function onLoadScience () {
	for (let i = 0; i < sciences.length; i++) {
		id = sciences[i].id

		document.getElementById('research').innerHTML += `
		<div class="basicDiv" id="` + id + `Div">
			<button onclick="barStartScience(` + i + `)">` + sciences[i].buttonText + `</button>
			<p id="` + id + `Researchers" style="color:#00AAFF;background-color:#000000"></p>
			<button                               style="background-color:#00AAFF;width:30px" onclick="addResearchers('` + id + `', -1)">-</button>
			<button class="changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('` + id + `', -10)">-10</button>
			<button                		          style="background-color:#00AAFF;width:30px" onclick="addResearchers('` + id + `', 1)">+</button>
			<button class="changeResearchersBy10" style="background-color:#00AAFF;width:50px" onclick="addResearchers('` + id + `', 10)">+10</button>
			<div class="scienceInfo">
				<p>` + sciences[i].info + `</p>
			</div>
			<div class="skillProgress" id="` + id + `Progress">
				<div class="skillBar" id="` + id + `Bar"></div>
			</div>
			<p id="` + id + `Text"></p>
			<p id="` + id + `Time"></p>
		</div>`


		if (game[id + "Bar"] > 0) {

			if (game.surveillanceCamera2)
				game[id + "Bar"] += Math.floor(secondsOffline * 0.5 * game[id + "Researchers"] / sciences[i].equation())

			runScienceBar(i)
		}
	}
}

function barStartScience(i) {
	if (sciences[i].startRequirement && game[sciences[i].id + 'Bar'] == 0)
		runScienceBar(i)
}

function runScienceBar (i) {
	id = sciences[i].id

	if (game[id + 'Bar'] < 100) {
		game[id + 'Bar'] += (0.0075 * game[id + 'Researchers']) / sciences[i].equation()
		setTimeout(runScienceBar, 15, i)
	}
	else {
		game[sciences[i].id + 'Bar'] = 0
		sciences[i].onBarFilled()
	}

	updateBar(id)
}

function updateScienceData() {
  for (let i = 0; i < sciences.length; i++) {
    const id = sciences[i].id;
    const researchers = game[id + "Researchers"];

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

	researchersAvailable = game.researchers

    updateScienceData();

	update("benevolenceRespectIncrease", "Respect increase:  " + (Math.floor((Math.pow(2, game.limeDiseaseLakes - 10)) * game.benevolence)).toLocaleString())
	update("textForResearchers", researchersAvailable + " Available Researchers")



	var x = document.getElementsByClassName("changeResearchersBy10")
	for (i = 0; i < x.length; i++) {
		if (game.changeResearchersBy10Unlock)
			x[i].style.display = 'inline-block'
		else
			x[i].style.display = 'none'
	}
}
