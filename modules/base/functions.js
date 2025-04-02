function pickCurrentTask(taskToPick) {
    const { currentTask: taskOne, currentTask2: taskTwo } = game;

    if (!event.shiftKey && game.toggleActions) {
        if (isSkillMaxxed('ambidextrous')) {
            if (taskOne === taskToPick && taskOne !== "none" && taskTwo !== taskToPick) {
                game.currentTask = "none";
            }
            else if (taskOne === "none" && taskTwo !== taskToPick) {
                if (!isTaskConflict(taskTwo, taskToPick)) {
                    game.currentTask = taskToPick;
                }
            }
            else if (taskTwo === taskToPick && taskTwo !== "none") {
                game.currentTask2 = "none";
            }
            else if (taskTwo === "none") {
                if (!isTaskConflict(taskOne, taskToPick)) {
                    game.currentTask2 = taskToPick;
                }
            }
        }
        else {
            game.currentTask = (taskOne === taskToPick && taskOne !== "none") ? "none" : taskToPick;
        }
    }
    else {
        startCurrentTask(taskToPick);
    }
}

function isTaskConflict(x, y) {
    return (
        (x === 'makeJuice' && y === 'makeMaxJuice') ||
        (x === 'makeMaxJuice' && y === 'makeJuice') ||
        (x === 'usePeelers' && y === 'useMaxPeelers') ||
        (x === 'useMaxPeelers' && y === 'usePeelers')
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
        if (typeof window[x] === 'function') {
            window[x]();
        }
    }
}

function buy(item, price = 1, currency = 'coins', amount = 1) {
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

function decreaseValue(id) {
    if (game[id] >= 1) {
        game[id] -= 1;
    }
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