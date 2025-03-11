skills = [
	{
		id: 'keenEye',
		name: 'Keen Eye',
		maxSkillLevel: 20,
		description: `
			<p class="skillInfo">Increase the chance of actually finding something when collecting limes</p>
			<p class="skillInfo" id="keenEye"></p>
		`,
	},
	{
		id: 'rottenWisdom',
		name: 'Rotten Wisdom',
		maxSkillLevel: 50,
		description: `
			<p class="skillInfo">Increase the chance of finding limes rather than rotten limes</p>
			<p class="skillInfo" id="rottenWisdom"></p>
		`,
	},	
	{
		id: 'limebidextrous',
		name: 'Limebidextrous',
		maxSkillLevel: 50,
		description: `
			<p class="skillInfo">Increase the chance of picking up double limes</p>
			<p class="skillInfo" id="limebidextrous"></p>
		`,
	},	
	{
		id: 'intelligence',
		name: 'Intelligence',
		maxSkillLevel: 20,
		description: `
			<p class="skillInfo">Increase skilling speed</p>
			<p class="skillInfo" id="intelligence"></p>
		`,
	},	
	{
		id: 'knifebidextrous',
		name: 'Knifebidextrous',
		maxSkillLevel: 20,
		description: `
			<p class="skillInfo">Chance to peel 2 limes rather than 1: +5%</p>
			<p class="skillInfo">Unlock something special for completing this!</p>
			<p class="skillInfo" id="knifebidextrous"></p>
		`,
	},	
	{
		id: 'motivation',
		name: 'Motivation',
		maxSkillLevel: 100,
		description: `
			<p class="skillInfo">Make your employees as passionate about limes as you are</p>
			<p class="skillInfo">Increases the amount that motivation affects employees</p>
		`,
	},	
	{
		id: 'ambidextrous',
		name: 'Ambidextrous',
		maxSkillLevel: 20,
		description: `
			<p class="skillInfo">Yes, I made a skill without a lime pun</p>
			<p class="skillInfo">Reach level 20 to be able to toggle two actions at once</p>
		`,
	},	
	{
		id: 'bitterSpeed',
		name: 'Bitter Speed',
		maxSkillLevel: 200,
		description: `
			<p class="skillInfo">The bitterness of the golden limes increases your abilities!</p>
			<p class="skillInfo">Specifically lime peeling and juicing.</p>
			<p class="skillInfo">Every level increases that effect's length.</p>
		`,
	},
]

addInventoryVariables([
    {
      id: 'rottenLimes',
      name: 'Rotten Limes',
      color1: '00B300',
      color2: '00FF01',
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
		<div id="skillsSection1" style="width:380px;top:0;position:absolute">
			<div class="basicDiv" id="eatFoodDiv">
				<button class="roundButton tooltip" id="eatButton" onclick="pickCurrentTask('eat')">   Eat Food   
				</button>
				<button class="specialButton" id="foodToggleLimesButton" onclick="gameData.foodTypeToggle = 0">Limes</button>
				<button class="specialButton" id="foodToggleRottenLimesButton" onclick="gameData.foodTypeToggle = 1">Rotten Limes</button>
				<div class="skillInfo">You use 1 food point per skill level</div>
				<div class="skillProgress" id="eatProgress">
					<div class="skillBar" id="eatBar"></div>
				</div>
				<p class="basicText" id="eat"></p>
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
				<button class="specialButton" id="learnANewSkillButton" onclick="learnANewSkill()">Learn A New Skill</button>
				<button class="specialButton" id="skillInfoButton" onclick="toggle('skillInfoToggle')">Info</button>
				<div class="skillProgress" id="learnANewSkillProgress">
					<div class="skillBar" id="learnANewSkillBar"></div>
				</div>
			</div>
		</div>
		<div id="skillsSection2" style="width:380px;right:0;position:absolute"></div>
`;

skills.forEach(skill => {
	document.getElementById('skillsSection2').innerHTML += '<div class="basicDiv" id="' + skill.id + 'Div">' + skill.description + '</div>';
});
