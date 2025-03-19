skills = [
	{
		id: 'keenEye',
		name: 'Keen Eye',
		maxSkillLevel: 20,
		description: [
            'Increase the chance of actually finding something when collecting limes'
        ]
	},
	{
		id: 'rottenWisdom',
		name: 'Rotten Wisdom',
		maxSkillLevel: 50,
		description: [
            'Increase the chance of finding limes rather than rotten limes'
        ]
	},	
	{
		id: 'limebidextrous',
		name: 'Limebidextrous',
		maxSkillLevel: 50,
		description: [
            'Increase the chance of picking up double limes'
        ]
	},	
	{
		id: 'intelligence',
		name: 'Intelligence',
		maxSkillLevel: 20,
		description: [
            'Increase skilling speed'
        ]
	},	
	{
		id: 'knifebidextrous',
		name: 'Knifebidextrous',
		maxSkillLevel: 20,
		description: [
            'Chance to peel 2 limes rather than 1: +5%',
            'Unlock something special for completing this!'
        ]
	},	
	{
		id: 'motivation',
		name: 'Motivation',
		maxSkillLevel: 100,
		description: [
            'Make your employees as passionate about limes as you are',
            'Increases the amount that motivation affects employees'
        ]
	},	
	{
		id: 'ambidextrous',
		name: 'Ambidextrous',
		maxSkillLevel: 20,
		description: [
			'Yes, I made a skill without a lime pun',
			'Reach level 20 to be able to toggle two actions at once'
		]
	},	
	{
		id: 'bitterSpeed',
		name: 'Bitter Speed',
		maxSkillLevel: 200,
		description: [
			'The bitterness of the golden limes increases your abilities!',
			'Specifically lime peeling and juicing.',
			'Every level increases that effect\'s length.'
		],
	},
]

addInventoryVariables([
    {
      id: 'rottenLimes',
      name: 'Rotten Limes',
      color1: '00FF01'
    }
  ]);
  
  addMainTabs([
      {
          id: 'skills',
          text: 'Skills',
          color1: 'BBBBBB',
          color2: '898989'
      },
  ]);
  
  addGameVariables({
      foodTypeToggle: 1,
      eat: 0,
      eatBar: 0,
      autoCollectingBar: 0,
      skillInfoToggle: 1,
      nourishmentPrice: 1,
      foodNutritionValue: 1,
  });

document.getElementById('skills').innerHTML = `
		<div class="module-container" id="skillsSection1" style="top:0;position:absolute">
			<div class="basicDiv" id="eatFoodDiv">
				<button class="roundButton tooltip" id="eatButton" onclick="pickCurrentTask('eat')">   Eat Food   
				</button>
				<button id="foodToggleLimesButton" onclick="game.foodTypeToggle = 0">Limes</button>
				<button id="foodToggleRottenLimesButton" onclick="game.foodTypeToggle = 1">Rotten Limes</button>
				<div class="skillInfo">You use 1 food point per skill level</div>
				<div class="skillProgress" id="eatProgress">
					<div class="skillBar" id="eatBar"></div>
				</div>
				<p id="eat"></p>
			</div>
			<div class="basicDiv autoCollectingDiv" id="autoCollectingDiv">
				<button id="autoCollectingButton" onclick="autoCollecting()">Auto Collect</button>
				<button class="pinButton" onclick="pin('autoCollectingButton')">+</button>
				<div class="skillInfo">Collect limes without the pesky clicking</div>
				<div class="skillInfo" id="textForAutomaticallyCollectsLimes" ></div>
				<div class="skillProgress" id="autoCollectingProgress">
					<div class="skillBar" id="autoCollectingBar"></div>
				</div>
			</div>
			<div class="basicDiv">
				<button id="learnANewSkillButton" onclick="learnANewSkill()">Learn A New Skill</button>
				<button id="skillInfoButton" onclick="toggle('skillInfoToggle')">Info</button>
				<div class="skillProgress" id="learnANewSkillProgress">
					<div class="skillBar" id="learnANewSkillBar"></div>
				</div>
			</div>
		</div>
		<div id="skillsSection2" class="module-container" style="right:0;position:absolute"></div>
`;

skills.forEach(skill => {
	document.getElementById('skillsSection2').innerHTML += `
        <div class="basicDiv" id="${skill.id}Div"></div>
    `;

    skill.description.forEach(desc => {
        document.getElementById(skill.id + 'Div').innerHTML += `
            <p class=skillInfo>${desc}</p>
        `;
    });
    document.getElementById(skill.id + 'Div').innerHTML += `
        <p class=skillInfo id="${skill.id}"></p>
    `;
});
