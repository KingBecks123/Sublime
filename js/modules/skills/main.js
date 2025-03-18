for (let i = 0; i < skills.length; i++) {
	gameDataBase[skills[i].id + 'SkillLevelMax'] = skills[i].maxSkillLevel
	gameDataBase[skills[i].id + 'SkillLevel'] = 0
}


function eat() {
    if (gameData.eatBar == 0 && gameData.eat < 100) {
        if (gameData.foodTypeToggle == 0)
			startEating ('limes', 5)
        else if (gameData.foodTypeToggle == 1)
			startEating ('rottenLimes', 1)
    }
	function startEating (type, amount) {
		if (gameData[type] > 0) {
			gameData[type] -= 1
			gameData.foodNutritionValue = amount
			gameData.eatBar = 0
			eatBar()
		}
	}
}

function eatBar() {
	runBar('eat', 0.75 * (gameData.fork + 1))
}

function eatBarEnd() {
    gameData.eat += gameData.foodNutritionValue * (gameData.nutritionists + 1)
    if (gameData.eat > 100)
        gameData.eat = 100
}

function autoCollecting() {
    if (gameData.autoCollectingBar == 0)
        autoCollectingBar()
}

function collectingUpgrade() {
    if (gameData.limes >= gameData.nourishmentPrice) {
        gameData.limes -= gameData.nourishmentPrice
        gameData.nourishment += 1
        gameData.autoCollectingBar = 0
    }
}

function buyAFork() {
    if (gameData.coins >= 1) {
        gameData.coins -= 1
        gameData.fork = 1
        gameData.eatBar = 0
    }
}

function autoCollectingBar() {
    if (gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5)) {
        gameData.autoCollectingBar += 0.5
        setTimeout(autoCollectingBar, 25)
    }
	else
		gameData.autoCollectingBar = 0
	
    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0)
        getLimes()
}

function learnANewSkill() {
    if (gameData.learnANewSkill - gameData.tomes <= 2)
		smartBarStart('learnANewSkill', 0.5)
}

function learnANewSkillBarEnd() {
	gameData.learnANewSkill += 1
}

function onLoadSkills () {
	if (gameData.learnANewSkillBar > 0)
		runBar('learnANewSkill', 0.5)

	for (let i = 0; i < skills.length; i++) {
		name = skills[i].id 
		gameDataBase[name + 'Bar'] = 0
		gameDataBase[name + 'SkillLevel'] = 0
		
		document.getElementById(name + "Div").innerHTML += '<button class="skillButton" id="' + name + "Button" + '" onclick="pickCurrentSkill(&apos;' + name + '&apos;)">' + skills[i].name  + '</button><div class="skillProgress" id="' + name + 'Progress"><div class="skillBar" id="' + name + 'Bar"></div></div><p id="' + name + 'SkillLevel"></p>'
		
		if (gameData[name + 'Bar'] != 0)
			runSkill(name)
	}
}

function tryToStartSkill(variable, useSkillTrainer) {
	level = variable + 'SkillLevel'
	bar = variable + 'Bar'
	if (gameData[bar] == 0 && gameData[level] < gameData[level + 'Max'] && gameData.eat >= gameData[level]) {
		gameData.eat -= gameData[level]
		
		if (gameData.skillTrainer && useSkillTrainer)
			gameData[bar] = 100
		
		runSkill(variable)
	}
}

function runSkill(variable) {
	speed = 50
	
	if (variable == 'ambidextrous')
		speed *= 10

	
	if (gameData[variable + "Bar"] < 100) {
		gameData[variable + 'Bar'] += (gameData.intelligenceSkillLevel + 10) / speed
		setTimeout(runSkill, 15 / gameData.tickspeed, variable)
	}
	else {
		gameData[variable + 'Bar'] = 0
		gameData[variable + "SkillLevel"] += 1
		gameData[variable] += 2
	}
	updateBar(variable)
}

function updateValuesSkills () {
	basicToggle("skillInfo")

	var x = document.getElementsByClassName("skillButton")
	if (gameData.multitasking) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px"
			x[i].style['border-radius'] = "12px"
		}
		for (let i = 0; i < skills.length; i++) {
			button = skills[i].id  + "Button"
			if (gameData.currentSkill == skills[i].id )
				setColor(button, "#C67848")
			else
				setColor(button, "#DEAD85")
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = "#DEAD85"
		}
	}

	
    var elem = document.getElementById("autoCollectingBar")
	x = gameData.autoCollectingBar / (gameData.nourishment + 1)

    elem.style.width = x + "%"

	currentTaskAesthetic('eat')
	
	if (gameData.autoCollectingBar)
		setColor('autoCollectingButton', "#50514F")
	else
		setColor('autoCollectingButton', "#DEAD85")
	
	if (gameData.hideCompletedSkills == 0)
		update('hideCompletedSkillsButton', 'Completed Skills Shown')
	else
		update('hideCompletedSkillsButton', 'Completed Skills Hidden')
	
	if(gameData.currentSkill !== 'none')
		tryToStartSkill(gameData.currentSkill, false)

    for (let i = 0; i < skills.length; i++) {
        level = skills[i].id  + 'SkillLevel'
        update(level, gameData[level] + ' / ' + gameData[level + 'Max'])
        checkShow(gameData.learnANewSkill >= i && !(gameData.hideCompletedSkills && gameData[level] == gameData[level + 'Max']), skills[i].id + "Div")
    }

    if (gameData.learnANewSkill - 3 == gameData.tomes)
        setColor('learnANewSkillButton', 'darkgray')
    else
        setColor('learnANewSkillButton', '#0081AF')

    const elementsToUpdate = [
      { element: 'rottenWisdom', value: 100 * gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax + '% Chance' },
      { element: 'keenEye', value: gameData.keenEyeSkillLevel * 5 + '% Chance' },
      { element: 'limebidextrous', value: gameData.limebidextrousSkillLevel * 2 + '% Chance' },
      { element: 'intelligence', value: Math.floor(((gameData.intelligenceSkillLevel * 2) / gameData.intelligenceSkillLevelMax) * 100) + '% Faster' },
      { element: 'knifebidextrous', value: gameData.knifebidextrousSkillLevel * 5 + '% Chance' },
      { element: 'eat', value: gameData.eat + ' / 100' },
      { element: 'textForAutomaticallyCollectsLimes', value: 'Automatically clicks 	&#39Collect Limes&#39 at ' + (gameData.shoes * 2 + 2) + '/s' },
      { element: 'textForNourishmentPrice', value: 'You Need: ' + gameData.nourishmentPrice.toLocaleString() + ' Limes' },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });

    const showHideElements = [
      { condition: gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax, element: 'stopActionsButton', display: 'inline' },
      { condition: gameData.learnANewSkill > -2 && !gameData.fork, element: 'buyAForkDiv' },
      { condition: gameData.learnANewSkill > -2, element: 'eatFoodDiv' },
      { condition: gameData.learnANewSkill > -2, element: 'toggleActionsButton', display: 'inline' },
      { condition: gameData.learnANewSkill > -1 && !gameData.shoes, element: 'buyShoesDiv' },
      { condition: gameData.learnANewSkill > -1, element: 'autoCollectingDiv' },
      { condition: gameData.learnANewSkill > -1, element: 'nourishment' },
      { condition: gameData.learnANewSkill > -1, element: 'skillInfoButton', display: 'inline' },
      { condition: gameData.learnANewSkill > 0 && !gameData.multitasking, element: 'buySkillToggler' },
      { condition: gameData.learnANewSkill > 4, element: 'motivateEmployeeButton' },
      { condition: !gameData.skillTrainer, element: 'skillTrainer' },
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });
}