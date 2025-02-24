function gameStart() {
  loadStuff(JSON.parse(localStorage.getItem("mathAdventureSave")));
  secondsOffline = Math.floor((Date.now() - gameData.lastSaveTime) / 1000);
  onLoadSkills();
  onLoadBase();
  onLoadField();
  onLoadForest();
  onLoadCompany();
  onLoadTasks();
  onLoadScience();
  onLoadTravel();

  mainGameLoop();
  mainGameLoopSlow();

  if (gameData.limes === undefined) {
    reset();
  }

  updateValues();

  function mainGameLoop() {
    mainGameLoopForest();
    mainGameLoopInventory();
    setTimeout(mainGameLoop, 50);
  }

  function mainGameLoopSlow() {
    mainGameLoopSlowBase();
    mainGameLoopSlowBrokers();
    mainGameLoopSlowBakery();

    updateMapTileAesthetic();
    saveGame();
    setTimeout(mainGameLoopSlow, 500);
  }

  function updateValues() {
    const updateFunctions = [
      updateValuesSkills,
      updateValuesForest,
      updateValuesInventory,
      updateValuesBase,
      updateValuesTravel,
      updateValuesBrokers,
      updateValuesTasks,
      updateValuesDelivery,
      updateValuesField,
      updateValuesScience,
      updateValuesBakery,
      updateValuesCompany,
    ];

    updateFunctions.forEach(updateFunction => {
      updateFunction();
    });

    setTimeout(updateValues, 15);
  }
}

function restartBar(x) {
  if (gameData[x + 'Bar'] > 0) {
    window[x + 'Bar']();
  }
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

function pin(x) {
  if (gameData.pin === x && gameData.pin !== "none") {
    gameData.pin = "none";
  } else {
    gameData.pin = x;
  }
  normalizeButtons();
  pinButton();
}

function normalizeButtons() {
  const deliveryButton = document.getElementById("deliveryButton");
  $(".juiceMarket").prepend(deliveryButton);
  deliveryButton.style.width = "120px";
  deliveryButton.style.margin = "5px";

  const autoCollectingButton = document.getElementById("autoCollectingButton");
  $(".autoCollectingDiv").prepend(autoCollectingButton);
  autoCollectingButton.style.width = "150px";
  autoCollectingButton.style.margin = "5px";
}

function pinButton() {
  if (gameData.pin !== "none") {
    const pinnedButton = document.getElementById(gameData.pin);
    $(".navigateButtons").append(pinnedButton);

    pinnedButton.style.width = "120px";
    pinnedButton.style.margin = "0px";
    pinnedButton.style.padding = "0px";
  }
}

function pickCurrentTask(x) {
  const taskOne = gameData.currentTask;
  const taskTwo = gameData.currentTask2;

  if (!event.shiftKey && gameData.toggleActions) {
    if (gameData.ambidextrousSkillLevel === gameData.ambidextrousSkillLevelMax) {
      if (taskOne === x && taskOne !== "none" && taskTwo !== x) {
        gameData.currentTask = "none";
      } else if (taskOne === "none" && taskTwo !== x) {
        if (
          !(
            (taskTwo === 'makeJuice' && x === 'makeMaxJuice') ||
            (taskTwo === 'makeMaxJuice' && x === 'makeJuice') ||
            (taskTwo === 'usePeelers' && x === 'useMaxPeelers') ||
            (taskTwo === 'useMaxPeelers' && x === 'usePeelers')
          )
        ) {
          gameData.currentTask = x;
        }
      } else if (taskTwo === x && taskTwo !== "none") {
        gameData.currentTask2 = "none";
      } else if (taskTwo === "none") {
        if (
          !(
            (taskOne === 'makeJuice' && x === 'makeMaxJuice') ||
            (taskOne === 'makeMaxJuice' && x === 'makeJuice') ||
            (taskOne === 'usePeelers' && x === 'useMaxPeelers') ||
            (taskOne === 'useMaxPeelers' && x === 'usePeelers')
          )
        ) {
          gameData.currentTask2 = x;
        }
      }
    } else {
      if (taskOne === x && taskOne !== "none") {
        gameData.currentTask = "none";
      } else {
        gameData.currentTask = x;
      }
    }
  } else {
    startCurrentTask(x);
  }
}

function pickCurrentSkill(x) {
  if (gameData.toggleActions && !event.shiftKey && gameData.multitasking) {
    if (gameData.currentSkill === x && gameData.currentSkill !== "none") {
      gameData.currentSkill = "none";
    } else {
      gameData.currentSkill = x;
    }
  } else {
    tryToStartSkill(x, true);
  }
}

function startCurrentTask(x) {
  if (x !== 'none') {
    eval(x + '()');
  }
}

function updateBar(x) {
  const barId = x + "Bar";
  const elem = document.getElementById(barId);

  if (gameData[barId] > 100) {
    gameData[barId] = 100;
  }

  elem.style.width = gameData[barId] + "%";
  elem.innerHTML = "" + Math.ceil(gameData[barId]) + "%";
}

function toggle(x) {
  if (gameData[x] === 0) {
    gameData[x] = 1;
  } else {
    gameData[x] = 0;
  }
}

function basicBuy(id, price) {
  if (gameData.coins >= price) {
    gameData.coins -= price;
    gameData[id] += 1;
  }
}

function universalBuy(id, price, currency) {
  if (gameData[currency] >= price) {
    gameData[currency] -= price;
    gameData[id] += 1;
  }
}

function bulkableBuyMax(x, price) {
  const max = gameData[x + 'Max'];
  let amount = 1;

  if (gameData[x + 'BulkToggle'] === 1) {
    if (gameData.bulkBuyUnlock2) {
      amount = 100;
    } else {
      amount = 10;
    }
  }

  if (gameData.coins >= price * amount) {
    if (gameData[x] <= max - amount) {
      gameData.coins -= price * amount;
      gameData[x] += amount;
    } else {
      gameData.coins -= price * (max - gameData[x]);
      gameData[x] = max;
    }
  }
}

function beckyRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function beckyRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function smartBarStart(id, amount) {
  if (gameData[id + "Bar"] === 0) {
    runBar(id, amount);
  }
}

const hasUpdatedObj = {};

function update(id, content) {
  const stringy = id.replace(/[()-]/g, 'uwu');

  if (typeof hasUpdatedObj[stringy] === 'undefined') {
    hasUpdatedObj[stringy] = 'noneOwO';
  }

  if (hasUpdatedObj[stringy] !== content) {
    document.getElementById(id).innerHTML = content;
    hasUpdatedObj[stringy] = content;
  }
}

function currencyDisplay(id) {
  const variable = baseVariables[id].id + 'ShowVariable';
  gameData[variable] = !gameData[variable];
}

function upperFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setColor(id, content) {
  document.getElementById(id).style.backgroundColor = content;
}

function decreaseValue(id) {
  if (gameData[id] >= 1) {
    gameData[id] -= 1;
  }
}

function checkShow(x, id, style) {
  const element = document.getElementById(id);
  if (style === 'visible') {
    element.style.visibility = x ? 'visible' : 'hidden';
  } else {
    element.style.display = x ? (style === 'inline' ? 'inline-block' : 'block') : 'none';
  }
}


function runBar(id, amount) {
  const barName = id + 'Bar';

  if (gameData[barName] < 100) {
    gameData[barName] += amount;
    
    // Schedule next tick using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Adjust timing based on tickspeed  
      setTimeout(() => runBar(id, amount), 15 / gameData.tickspeed);
    });
  } else {
    // Bar is full - reset and call completion handler
    gameData[barName] = 0;
    const endHandler = window[id + 'BarEnd'];
    if (typeof endHandler === 'function') {
      endHandler();
    }
  }

  updateBar(id);
}


function basicToggle(input) {
  const elements = document.getElementsByClassName(input);
  const toggleValue = gameData[input + 'Toggle'];
  const color = toggleValue ? "#4DFE89" : "gray";
  const display = toggleValue ? 'block' : 'none';

  setColor(input + "Button", color);
  Array.from(elements).forEach(element => {
    element.style.display = display;
  });
}

function currentTaskAesthetic(x) {
  const button = x + "Button";
  const color = (gameData.currentTask === x || gameData.currentTask2 === x) ? "#C67848" : "#DEAD85";
  setColor(button, color);
}

function ifMaxDarkGray(x) {
  const button = "buyA" + upperFirstChar(x) + "Button";
  const color = (gameData[x + 's'] === gameData[x + 'sMax']) ? "#50514F" : "#DEAD85";
  setColor(button, color);
}

function toggleAesthetic(input) {
  const color = gameData[input] === 1 ? "#4DFE89" : "gray";
  setColor(input + "Button", color);
}

function addInventoryVariables(variables) {
  baseVariables.push(...variables);
}

function addMainTabs(tabs) {
  mainTabs.push(...tabs);
}

function addGameVariables(variables) {
  Object.assign(gameDataBase, variables);
}

function tab(tabby) {
	gameData.mainTab = tabby
    update("exportCode", "")

	for (let i = 0; i < mainTabs.length; i++) {
		hide(mainTabs[i].id)
		setColor(mainTabs[i].id + 'Button', '#' + mainTabs[i].color1)
	}


    if (tabby == "options") {
		checkShow(!gameData.isOptionsOpen, 'options', 'inline')
        if (!gameData.isOptionsOpen)
			setColor('optionsButton', "#898989")

		toggle('isOptionsOpen')
    }

	else if (tabby !== "null") {
        gameData.isOptionsOpen = 0
        document.getElementById(tabby).style.display = "inline-block"


		for (let i = 0; i < mainTabs.length; i++) {
			if(tabby == mainTabs[i].id)
				setColor(tabby + "Button", '#' + mainTabs[i].color2)
		}
    }

}