function gameStart() {
  loadStuff(JSON.parse(localStorage.getItem("mathAdventureSave")));
  secondsOffline = Math.floor((Date.now() - game.lastSaveTime) / 1000);
  onLoadSkills();
  onLoadBase();
  onLoadField();
  onLoadForest();
  onLoadCompany();
  onLoadTasks();
  onLoadScience();
  onLoadTravel();

  initAudio();

  // Update version display
  document.getElementById("versionNumber").textContent = "v" + GAME_VERSION;
  document.getElementById("versionTooltip").textContent = VERSION_NOTES;

  mainGameLoop();
  mainGameLoopSlow();

  if (game.limes === undefined) {
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
  if (game[x + 'Bar'] > 0) {
    window[x + 'Bar']();
  }
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

function pin(x) {
  if (game.pin === x && game.pin !== "none") {
    game.pin = "none";
  } else {
    game.pin = x;
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
  if (game.pin !== "none") {
    const pinnedButton = document.getElementById(game.pin);
    $(".navigateButtons").append(pinnedButton);

    pinnedButton.style.width = "120px";
    pinnedButton.style.margin = "0px";
    pinnedButton.style.padding = "0px";
  }
}

function pickCurrentTask(x) {
  const { currentTask: taskOne, currentTask2: taskTwo } = game;

  if (!event.shiftKey && game.toggleActions) {
    if (game.ambidextrousSkillLevel === game.ambidextrousSkillLevelMax) {
      if (taskOne === x && taskOne !== "none" && taskTwo !== x) {
        game.currentTask = "none";
      } else if (taskOne === "none" && taskTwo !== x) {
        if (!isTaskConflict(taskTwo, x)) {
          game.currentTask = x;
        }
      } else if (taskTwo === x && taskTwo !== "none") {
        game.currentTask2 = "none";
      } else if (taskTwo === "none") {
        if (!isTaskConflict(taskOne, x)) {
          game.currentTask2 = x;
        }
      }
    } else {
      game.currentTask = (taskOne === x && taskOne !== "none") ? "none" : x;
    }
  } else {
    startCurrentTask(x);
  }
}

function isTaskConflict(task, x) {
  return (
    (task === 'makeJuice' && x === 'makeMaxJuice') ||
    (task === 'makeMaxJuice' && x === 'makeJuice') ||
    (task === 'usePeelers' && x === 'useMaxPeelers') ||
    (task === 'useMaxPeelers' && x === 'usePeelers')
  );
}

function pickCurrentSkill(x) {
  if (game.toggleActions && !event.shiftKey && game.multitasking) {
    if (game.currentSkill === x && game.currentSkill !== "none") {
      game.currentSkill = "none";
    } else {
      game.currentSkill = x;
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

  if (game[barId] > 100) {
    game[barId] = 100;
  }

  elem.style.width = game[barId] + "%";
}

function toggle(x) {
  if (game[x] === 0) {
    game[x] = 1;
  } else {
    game[x] = 0;
  }
}

function buy(item, price, currency = 'coins', amount = 1) {
  if (game[currency] >= price) {
    game[currency] -= price;
    game[item] += amount;
    
    if (item === 'maps' && game.maps === 1) {
      discoverSpecificLoreEntry('letters', 'letter-001');
    }
  }
}

function bulkableBuyMax(item, price) {
  const maxAmount = game[item + 'Max'];
  let purchaseAmount = 1;

  if (game[item + 'BulkToggle'] === 1) {
    purchaseAmount = game.bulkBuyUnlock2 ? 100 : 10;
  }

  if (game.coins >= price * purchaseAmount) {
    if (game[item] <= maxAmount - purchaseAmount) {
      game.coins -= price * purchaseAmount;
      game[item] += purchaseAmount;
    } else {
      const availableAmount = maxAmount - game[item];
      game.coins -= price * availableAmount;
      game[item] = maxAmount;
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
  if (game[id + "Bar"] === 0) {
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
  game[variable] = !game[variable];
}

function upperFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setColor(id, content, transparency = 100) {
  document.getElementById(id).style.backgroundColor = content;
  document.getElementById(id).style.opacity = transparency;
}

function decreaseValue(id) {
  if (game[id] >= 1) {
    game[id] -= 1;
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

  if (game[barName] < 100) {
    game[barName] += amount;
    
    // Schedule next tick using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Adjust timing based on tickspeed  
      setTimeout(() => runBar(id, amount), 15 / game.tickspeed);
    });
  } else {
    // Bar is full - reset and call completion handler
    game[barName] = 0;
    const endHandler = window[id + 'BarEnd'];
    if (typeof endHandler === 'function') {
      endHandler();
    }
  }

  updateBar(id);
}


function basicToggle(input) {
  const elements = document.getElementsByClassName(input);
  const toggleValue = game[input + 'Toggle'];
  const color = toggleValue ? myLime : "gray";
  const display = toggleValue ? 'block' : 'none';

  setColor(input + "Button", color);
  Array.from(elements).forEach(element => {
    element.style.display = display;
  });
}

function currentTaskAesthetic(x) {
  const button = x + "Button";
  const color = (game.currentTask === x || game.currentTask2 === x) ? "#C67848" : myBeige;
  setColor(button, color);
}

function ifMaxDarkGray(x) {
  const button = "buyA" + upperFirstChar(x) + "Button";
  const color = (game[x + 's'] === game[x + 'sMax']) ? "#50514F" : myBeige;
  setColor(button, color);
}

function toggleAesthetic(input) {
  const color = game[input] === 1 ? myLime : "gray";
  setColor(input + "Button", color);
}

function addInventoryVariables(variables) {
  baseVariables.push(...variables);
}

function addMainTabs(tabs) {
  mainTabs.push(...tabs);
}

function addGameVariables(variables) {
  Object.assign(gameBase, variables);
}

function tab(tabby) {
    game.mainTab = tabby;
    update("exportCode", "");

    mainTabs.forEach(tab => {
        hide(tab.id);
        setColor(tab.id + 'Button', '#' + tab.color1);
    });

    if (tabby === "options") {
        checkShow(!game.isOptionsOpen, 'options', 'inline');
        if (!game.isOptionsOpen) {
            setColor('optionsButton', "#898989");
        }
        toggle('isOptionsOpen');
    } else if (tabby !== "null") {
        game.isOptionsOpen = 0;
        const selectedTab = document.getElementById(tabby);
        selectedTab.style.display = "inline-block";

        mainTabs.forEach(tab => {
            if (tabby === tab.id) {
                setColor(tabby + "Button", '#' + tab.color2);
            }
        });
    }
}