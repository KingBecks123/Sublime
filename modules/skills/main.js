for (let i = 0; i < skills.length; i++) {
	gameBase[skills[i].id + 'SkillLevelMax'] = skills[i].maxSkillLevel
	gameBase[skills[i].id + 'SkillLevel'] = 0
}


function eat() {
    if (game.eatBar == 0 && game.eat < 100) {
        type = foodTypes[game.foodTypeToggle].id

        if (game[type] > 0) {
            game[type] -= 1
            game.foodNutritionValue = foodTypes[game.foodTypeToggle].nutritionValue
            game.eatBar = 0
            eatBar()
        }
    }
}

function eatBar() {
	runBar('eat', 0.75 * (game.fork + 1))
}

function eatBarEnd() {
    game.eat += game.foodNutritionValue * (game.nutritionists + 1)
    if (game.eat > 100)
        game.eat = 100
}

function autoCollecting() {
    if (game.autoCollectingBar == 0)
        autoCollectingBar()
}

function collectingUpgrade() {
    if (game.limes >= game.nourishmentPrice) {
        game.limes -= game.nourishmentPrice
        game.nourishment += 1
        game.autoCollectingBar = 0
    }
}

function autoCollectingBar() {
    if (game.autoCollectingBar <= (((game.nourishment + 1) * 100) - 0.5)) {
        game.autoCollectingBar += 0.5
        setTimeout(autoCollectingBar, 25)
    }
	else
		game.autoCollectingBar = 0
	
    if (game.autoCollectingBar % (10 / (game.shoes + 1)) == 0)
        getLimes()
}

function learnANewSkill() {
    if (game.learnANewSkill - game.tomes <= 2)
		smartBarStart('learnANewSkill', 0.5)
}

function learnANewSkillBarEnd() {
	game.learnANewSkill += 1
}

function isSkillMaxxed(skillName) {
    return game[skillName + 'SkillLevel'] === game[skillName + 'SkillLevelMax'];
}

function onLoadSkills () {
	if (game.learnANewSkillBar > 0)
		runBar('learnANewSkill', 0.5)

	for (let i = 0; i < skills.length; i++) {
		name = skills[i].id 
		gameBase[name + 'Bar'] = 0
		gameBase[name + 'SkillLevel'] = 0
		
        skillName  = idToName(skills[i].id);

		document.getElementById(name + "Div").innerHTML += '<button class="skillButton" id="' + name + "Button" + '" onclick="pickCurrentSkill(&apos;' + name + '&apos;)">' + skillName  + '</button><div class="skillProgress" id="' + name + 'Progress"><div class="skillBar" id="' + name + 'Bar"></div></div><p id="' + name + 'SkillLevel"></p>'
		
		if (game[name + 'Bar'] != 0)
			runSkill(name)
	}
}

function tryToStartSkill(variable, useSkillTrainer) {
	level = variable + 'SkillLevel'
	bar = variable + 'Bar'
	if (game[bar] == 0 && game[level] < game[level + 'Max'] && game.eat >= game[level]) {
		game.eat -= game[level]
		
		if (game.skillTrainer && useSkillTrainer)
			game[bar] = 100
		
		runSkill(variable)
	}
}

function runSkill(variable) {
	speed = 50
	
	if (variable == 'ambidextrous')
		speed *= 10

	
	if (game[variable + "Bar"] < 100) {
		game[variable + 'Bar'] += (game.intelligenceSkillLevel + 10) / speed
		setTimeout(runSkill, 15 / game.tickspeed, variable)
	}
	else {
		game[variable + 'Bar'] = 0
		game[variable + "SkillLevel"] += 1
		game[variable] += 2
	}
	updateBar(variable)
}

function updateValuesSkills () {
	basicToggle("skillInfo")

	var x = document.getElementsByClassName("skillButton")
	if (game.multitasking) {
		for (i = 0; i < x.length; i++) {
			x[i].style['padding'] = "1px 10px 1px 10px"
			x[i].style['border-radius'] = "12px"
		}
		for (let i = 0; i < skills.length; i++) {
			button = skills[i].id  + "Button"
			if (game.currentSkill == skills[i].id )
				setColor(button, "#C67848")
			else
				setColor(button, myBeige)
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = myBeige
		}
	}

	
    var elem = document.getElementById("autoCollectingBar")
	x = game.autoCollectingBar / (game.nourishment + 1)

    elem.style.width = x + "%"

	currentTaskAesthetic('eat')
	
	if (game.autoCollectingBar)
		setColor('autoCollectingButton', "#50514F")
	else
		setColor('autoCollectingButton', myBeige)
	
	if (game.hideCompletedSkills == 0)
		update('hideCompletedSkillsButton', 'Completed Skills Shown')
	else
		update('hideCompletedSkillsButton', 'Completed Skills Hidden')
	
	if(game.currentSkill !== 'none')
		tryToStartSkill(game.currentSkill, false)

    for (let i = 0; i < skills.length; i++) {
        level = skills[i].id  + 'SkillLevel'
        update(level, game[level] + ' / ' + game[level + 'Max'])
        checkShow(game.learnANewSkill >= i && !(game.hideCompletedSkills && game[level] == game[level + 'Max']), skills[i].id + "Div")
    }

    if (game.learnANewSkill - 3 == game.tomes)
        setColor('learnANewSkillButton', 'darkgray')
    else
        setColor('learnANewSkillButton', '#0081AF')

    const elementsToUpdate = [
      { element: 'rottenWisdom', value: 100 * game.rottenWisdomSkillLevel / game.rottenWisdomSkillLevelMax + '% Chance' },
      { element: 'keenEye', value: game.keenEyeSkillLevel * 5 + '% Chance' },
      { element: 'limebidextrous', value: game.limebidextrousSkillLevel * 2 + '% Chance' },
      { element: 'intelligence', value: Math.floor(((game.intelligenceSkillLevel * 2) / game.intelligenceSkillLevelMax) * 100) + '% Faster' },
      { element: 'knifebidextrous', value: game.knifebidextrousSkillLevel * 5 + '% Chance' },
      { element: 'ambidextrous', value: game.ambidextrousSkillLevel * 5 + '% To Completion' },
      { element: 'eat', value: game.eat + ' / 100' },
      { element: 'textForAutomaticallyCollectsLimes', value: 'Automatically clicks 	&#39Collect Limes&#39 at ' + (game.shoes * 2 + 2) + '/s' },
      { element: 'textForNourishmentPrice', value: 'You Need: ' + game.nourishmentPrice.toLocaleString() + ' Limes' },
    ];

    elementsToUpdate.forEach(({ element, value }) => {
      update(element, value);
    });

    const showHideElements = [
      { condition: isSkillMaxxed('ambidextrous'), element: 'stopActionsButton', display: 'inline' },
      { condition: game.learnANewSkill > -2 && !game.fork, element: 'buyAForkDiv' },
      { condition: game.learnANewSkill > -2, element: 'eatFoodDiv' },
      { condition: game.learnANewSkill > -2, element: 'toggleActionsButton', display: 'inline' },
      { condition: game.learnANewSkill > -1 && !game.shoes, element: 'buyShoesDiv' },
      { condition: game.learnANewSkill > -1, element: 'autoCollectingDiv' },
      { condition: game.learnANewSkill > -1, element: 'nourishment' },
      { condition: game.learnANewSkill > -1, element: 'skillInfoButton', display: 'inline' },
      { condition: game.learnANewSkill > 0 && !game.multitasking, element: 'buySkillToggler' },
      { condition: game.learnANewSkill > 4, element: 'motivateEmployeeButton', display: 'inline'},
      { condition: !game.skillTrainer, element: 'skillTrainer' },
      { condition: false, element: 'bitterSpeed'},
      { condition: false, element: 'motivation'},
    ];

    showHideElements.forEach(({ condition, element, display = 'block' }) => {
      checkShow(condition, element, display);
    });
}