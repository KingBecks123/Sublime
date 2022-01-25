skills = [
	{
		id: 'keenEye',
		name: 'Keen Eye',
		maxSkillLevel: 20
	},
	{
		id: 'rottenWisdom',
		name: 'Rotten Wisdom',
		maxSkillLevel: 50
	},	
	{
		id: 'limebidextrous',
		name: 'Limebidextrous',
		maxSkillLevel: 50
	},	
	{
		id: 'intelligence',
		name: 'Intelligence',
		maxSkillLevel: 20
	},	
	{
		id: 'knifebidextrous',
		name: 'Knifebidextrous',
		maxSkillLevel: 20
	},	
	{
		id: 'motivation',
		name: 'Motivation',
		maxSkillLevel: 100
	},	
	{
		id: 'ambidextrous',
		name: 'Ambidextrous',
		maxSkillLevel: 20
	},	
	{
		id: 'bitterSpeed',
		name: 'Bitter Speed',
		maxSkillLevel: 200
	},
]

Object.assign ( gameDataBase, {
    foodTypeToggle: 1,
    eat: 0,
    eatBar: 0,
    autoCollectingBar: 0,
    skillInfoToggle: 1,
	nourishmentPrice: 1,
	foodNutritionValue: 1,
} )

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
        setTimeout(autoCollectingBar, 50)
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
		
		document.getElementById(name + "Div").innerHTML += '<button class="skillButton" id="' + name + "Button" + '" onclick="pickCurrentSkill(&apos;' + name + '&apos;)">' + skills[i].name  + '</button><div class="skillProgress" id="' + name + 'Progress"><div class="skillBar" id="' + name + 'Bar"></div></div><p id="' + name + 'SkillLevel" class="basicText"></p>'
		
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
	speed = 150
	
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
				colorChanger(button, "#C67848")
			else
				colorChanger(button, "#DEAD85")
		}
	} else {
		for (i = 0; i < x.length; i++) {
			x[i].style.backgroundColor = "#DEAD85"
		}
	}

	
    var elem = document.getElementById("autoCollectingBar")
	x = gameData.autoCollectingBar / (gameData.nourishment + 1)

    elem.style.width = x + "%"
    elem.innerHTML = Math.floor(x) + "%"

	update('rottenWisdom', 100 * gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax + '% Chance')
	update('keenEye', gameData.keenEyeSkillLevel * 5 + '% Chance')
	update('limebidextrous', gameData.limebidextrousSkillLevel * 2 + '% Chance')
	update('intelligence', Math.floor(((gameData.intelligenceSkillLevel * 2) / gameData.intelligenceSkillLevelMax) * 100) + '% Faster')
	update('knifebidextrous', gameData.knifebidextrousSkillLevel * 5 + '% Chance')
	update('eat', gameData.eat + ' / 100')
	update('textForAutomaticallyCollectsLimes', 'Automatically collects limes at ' + (gameData.shoes + 1) + '/s')
	update('textForNourishmentPrice', 'You Need: ' + gameData.nourishmentPrice.toLocaleString() + ' Limes')

	currentTaskAesthetic('eat')
	
	if (gameData.autoCollectingBar)
		colorChanger('autoCollectingButton', "#50514F")
	else
		colorChanger('autoCollectingButton', "#DEAD85")
	
	if (gameData.hideCompletedSkills == 0)
		update('hideCompletedSkillsButton', 'Completed Skills Shown')
	else
		update('hideCompletedSkillsButton', 'Completed Skills Hidden')
	
	if(gameData.currentSkill !== 'none')
		tryToStartSkill(gameData.currentSkill, false)
	
	checkShow(gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax, 'stopActionsButton', 'inline')
	checkShow(gameData.learnANewSkill > -2 && !gameData.fork, 'buyAForkDiv')
	checkShow(gameData.learnANewSkill > -2, 'eatFoodDiv')
	checkShow(gameData.learnANewSkill > -2, 'toggleActionsButton', 'inline')
	checkShow(gameData.learnANewSkill > -1 && !gameData.shoes, 'buyShoesDiv')
	checkShow(gameData.learnANewSkill > -1, 'autoCollectingDiv')
	checkShow(gameData.learnANewSkill > -1, 'nourishment')
	checkShow(gameData.learnANewSkill > -1, 'skillInfoButton', 'inline')
	checkShow(gameData.learnANewSkill > 0 && !gameData.multitasking, 'buySkillToggler')
	checkShow(gameData.learnANewSkill > 4, 'motivateEmployeeButton')
	checkShow(!gameData.skillTrainer, 'skillTrainer')


	for (let i = 0; i < skills.length; i++) {
		level = skills[i].id  + 'SkillLevel'
		update(level, gameData[level] + ' / ' + gameData[level + 'Max'])
		checkShow(gameData.learnANewSkill >= i && !(gameData.hideCompletedSkills && gameData[level] == gameData[level + 'Max']), skills[i].id + "Div")
	}
	
	if (gameData.learnANewSkill - 3 == gameData.tomes)
		colorChanger('learnANewSkillButton', 'darkgray')
	else
		colorChanger('learnANewSkillButton', '#FFBB9A')
}