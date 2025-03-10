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