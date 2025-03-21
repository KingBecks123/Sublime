function getLimesButton() {
    startingMessages()
    getLimes()

    // Direct lore integration for lime collection
    checkForLoreDiscovery()
}

function startingMessages() {
    if (!game.lookAround) {
        game.collectLimesAtBeginning += 1

        if (game.collectLimesAtBeginning <= messages.length) {
            update("newInfo", messages[game.collectLimesAtBeginning - 1])
        }
    }
}

function getLimes() {
    tryToFindSomething = (beckyRandom(game.keenEyeSkillLevelMax) <= game.keenEyeSkillLevel);

    if (tryToFindSomething) {
        foundSomething()
    }
    else if ((game.lookAround < 1 && game.collectLimesAtBeginning < 2) || game.lookAround)
        update("newInfo", "Couldn't find any limes...")
}

function foundSomething() {
    if (!isSkillMaxxed('keenEye'))
        update("newInfo", "You found something!")

    if (Math.random() <= (game.rottenWisdomSkillLevel / game.rottenWisdomSkillLevelMax)) {
        if (Math.random() <= (game.limebidextrousSkillLevel / 50)) {
            addLimes()
        }
        addLimes()
    }
    else
        game.rottenLimes += game.bigGloves + 1
}

function addLimes() {
    game.limes += game.bigGloves + 1
    if (game.teachBar > 0)
        game.employeeCurrentSpeed += ((game.bigGloves + 1) * game.employeeSpeed) / 10
}

function stopActions() {
    game.currentTask = 'none'
    game.currentTask2 = 'none'
}

function resetGame() {
    response = window.prompt("Are you sure? Type 'yes' if you are");

    if (response == 'yes') {
        reset()
    }
    else if (response == 'cheats') {
        document.getElementById('cheats').style.display = 'block'
    }
    else if (response == `'yes'`) {
        update("newInfo", "Invalid response, Epsilon. Fun fact: you can type `cheats` into the Reset Game prompt to enable them. You have achieved exclusive knowledge.")
    }
    else {
        update("newInfo", "Invalid response.")
    }
}

function lookAround() {
    switch (game.lookAround) {
        case 0:
            update("newInfo", "You see a nearby market.")
            game.lookAround = 1
            break
        case 1:
            update("newInfo", "You find a merchant willing to buy limes.")
            game.lookAround = 2
            break
        case 2:
            update("newInfo", "You find a merchant selling various items.")
            game.lookAround = 3
            break
    }
}

function changeZoomSize() {
    if (game.zoom >= 180)
        game.zoom = 100
    else
        game.zoom += 20

    document.body.style.zoom = game.zoom / 100
}

function mainGameLoopSlowBase() {
    game.lastSaveTime = Date.now()
    loopNumberTimePlayed += 1
    if (loopNumberTimePlayed == 2) {
        game.timePlayed += 1
        loopNumberTimePlayed = 0
    }
}

function onLoadBase() {

    for (let i = 0; i < baseVariables.length; i++) {
        id = baseVariables[i].id
        gameBase[baseVariables[i].id] = 0

        variableName = idToName(baseVariables[i].id);

        if (i > 0) {
            document.getElementById('backpackDiv').innerHTML += `
                <button class="wide-button" id="currencyDisplay(${i})" onClick="currencyDisplay(${i})">Show ${variableName}</button>
            `
        }

        gameBase[id + 'ShowVariable'] = true
        gameBase[id + 'UnlockedVariable'] = false

        document.getElementById('backgroundForValues').innerHTML += `
            <div class="stat" id="textFor${id}Div" style="color:#${baseVariables[i].color1};">${variableName} </div>
            <div class="stat" id="textFor${id}"  style="float: right;color:#${baseVariables[i].color1};opacity:0.65;">0</div>
            <p style="background-color:black" id="textFor${id}P"> </p><br  id="textFor${id}Br"/>
        `
    }

    gameBase.limes = 1

    for (let i = 1; i < mainTabs.length; i++) {
        document.getElementById('navigateButtons').innerHTML += `
		    <button id="${mainTabs[i].id}Button" class="navigate-button" onclick="tab('${mainTabs[i].id}')">${mainTabs[i].text}</button>
		`
    }

    document.getElementById('textForbetaCoinsDiv').style.textDecoration = 'underline'
    document.getElementById('textForpieCoinsDiv').style.textDecoration = 'underline'

    const barsToRestart = [
        'juicer',
        'peeler',
        'advertise',
        'eat',
        'coinsToAlpha',
        'convertCoinsNow',
        'alphaToBeta',
        'findPieCustomers',
        'bakePie',
        'delivery',
        'bellows',
        'autoCollecting',
    ];

    barsToRestart.forEach(bar => {
        restartBar(bar);
    });

    game.teachBar = 0


    if (game.workingBar > 0 || game.employeeWorking > 0)
        runBar('working', 0.025)


    normalizeButtons()
    pinButton()

    tab(game.mainTab)
    tabMarket(game.marketTab)
    tabTasks("earn")
    tabScience("research")
    tabOptions("gameOptions")
}



function tabOptions(tabby) {
    hide("gameOptions")
    hide("uiOptions")
    hide("statsOptions")
    document.getElementById(tabby).style.display = "block"
}

function tabMarket(tabby) {
    game.marketTab = tabby
    tabManager('marketMain')
    tabManager('hiringArea')
    tabManager('travel')
    hide('trade')
    setColor("tradeButton", "#FDFF9A")
    setColor(tabby + "Button", "#898989")
    document.getElementById(tabby).style.display = "block"
    if (tabby == 'trade')
        setColor(tabby + "Button", "#FCFF4E")


    function tabManager(id) {
        hide(id)
        setColor(id + "Button", "#BBBBBB")
    }
}


function updateValuesBase() {
    update('sfxToggleButton', (game.sfxOn ? '♪ On' : '♪ Off'))
    setColor('sfxToggleButton', (game.sfxOn ? myLime : '#898989'));

    update('showDonationButton', 'Donation Button ' + (game.showDonationButton ? 'Shown' : 'Hidden'))

    checkShow(game.showDonationButton, "donationButton")

    for (let i = 0; i < baseVariables.length; i++) {
        id = baseVariables[i].id
        elem = "textFor" + id
        if (game[id] > 1e9)
            val = game[id].toExponential(3)
        else
            val = game[id].toLocaleString()

        doShow = (game[id + 'UnlockedVariable'] && game[id + 'ShowVariable']) || id == 'limes'

        checkShow(doShow, elem + 'Div')
        checkShow(doShow, elem + 'Br')
        checkShow(doShow, elem + 'P')
        checkShow(doShow, elem)

        update(elem, val)
    }

    for (let i = 1; i < baseVariables.length; i++) {
        if (game[baseVariables[i].id] > 0)
            game[baseVariables[i].id + 'UnlockedVariable'] = true

        checkShow(game[baseVariables[i].id + 'UnlockedVariable'], 'currencyDisplay(' + i + ')', 'inline')
    }

    startCurrentTask(game.currentTask)
    startCurrentTask(game.currentTask2)

    toggleAesthetic("toggleActions")

    if (game.coins > game.coinsMax)
        game.coins = game.coinsMax

    overMaximum("baskets")
    overMaximum("juicers")
    overMaximum("peelers")

    function overMaximum(x) {
        if (game[x] > game[x + 'Max'])
            game[x] = game[x + 'Max']
    }

    preventNegative('coins')
    preventNegative('limes')
    preventNegative('respect')

    function preventNegative(id) {
        if (game[id] < 0)
            game[id] = 0
    }

    game.juicePricePrice = game.juicePriceCents + 1
    game.nourishmentPrice = Math.pow(10, game.nourishment);

    update('textForTimePlayed', 'Total Time Played: ' + game.timePlayed.toLocaleString() + ' Seconds')
    update('endStats', 'Total Time Played: ' + game.timePlayed.toLocaleString() + ' Seconds')




    if (game.employeeWorking > 0)
        update('workingEmployee', 'Working time left: ' + game.employeeWorking.toLocaleString() + ' / 10 minutes.')
    else
        update('workingEmployee', 'Employee is idle.')


    var x = document.getElementsByClassName('pinButton')
    if (game.pinUnlock == 1) {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'inline-block'
        }
    }
    else {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'none'
        }
    }


    for (i = 0; i <= 3; i++) {
        checkShow(game.tomes == i, 'tomeDiv' + (i + 1))
    }

    const conditions = [
        { 
            condition: game.lookAround > 1, 
            elementId: 'sellYourLimesDiv'
        },
        { 
            condition: game.lookAround > 2 && !(game.hideMaxedPurchases && game.juicers == game.juicersMax), 
            elementId: 'buyAJuicerDiv' 
        },
        { 
            condition: game.lookAround > 2 && !(game.hideMaxedPurchases && game.baskets == game.basketsMax), 
            elementId: 'buyABasketDiv' 
        },
        { 
            condition: game.tomes > 3, 
            elementId: 'goldenBarDiv' 
        },
        { 
            condition: !game.pinUnlock, 
            elementId: 'pinUnlockDiv' 
        },
        { 
            condition: game.pieBucket && game.pieFlourBucket, 
            elementId: 'bucketThinSteelPlating' 
        },
        { 
            condition: game.maps == 0, 
            elementId: 'buyAMapDiv1' 
        },
        { 
            condition: game.maps == 1, 
            elementId: 'buyAMapDiv2' 
        },
        { 
            condition: game.maps == 2, 
            elementId: 'buyAMapDiv3' 
        },
        { 
            condition: game.maps == 3, 
            elementId: 'buyAMapDiv4' 
        },
        { 
            condition: game.maps == 4, 
            elementId: 'buyAMapDiv5' 
        },
        { 
            condition: game.bulkBuyUnlock, 
            elementId: 'basketsBulkButton', 
            display: 'inline' 
        },

        //Map Unlocks
        { 
            condition: game.maps > 0 || game.villageNumber > 1, 
            elementId: 'marketMainButtonsDiv', 
            display: 'inline' 
        },
        { 
            condition: game.maps > 0, 
            elementId: 'marketStore', 
            display: 'block' 
        },
        { 
            condition: game.maps > 1, 
            elementId: 'hiringAreaButton', 
            display: 'inline' 
        },
        { 
            condition: game.maps > 1 && !game.storageUnlock, 
            elementId: 'storageUnlockDiv' 
        },
        { 
            condition: game.maps > 1 && game.storageUnlock && !(game.storageJuicersUnlock && game.storagePeelersUnlock), 
            elementId: 'storageDiv' 
        },
        { 
            condition: game.maps > 1 && !game.bulkBuyUnlock, 
            elementId: 'bulkBuyUnlockDiv' 
        },
        { 
            condition: game.maps > 1 && game.bulkBuyUnlock && !game.bulkBuyUnlock2, 
            elementId: 'bulkBuyUnlock2Div' 
        },
        { 
            condition: game.maps > 2, 
            elementId: 'travellingArea' 
        },
        { 
            condition: game.maps > 2 && !game.fasterTransport, 
            elementId: 'fasterTransportDiv' 
        },
        { 
            condition: game.maps > 2, 
            elementId: 'increaseJuicePrice' 
        },
        { 
            condition: game.maps > 2 || game.villageNumber > 1, 
            elementId: 'travelButton', 
            display: 'inline' 
        },

        { 
            condition: game.maps > 3 && !game.respectBillboard, 
            
            elementId: 'respectBillboard' 
        },
        { 
            condition: game.maps > 3, 
            elementId: 'tasksButton' 
        },
        {
            condition: game.maps > 3 && !game.autoCurrencyConversionBuy, 
            elementId: 'autoCurrencyConversion' 
        },

        { 
            condition: game.maps > 4 && game.basicAlphaToBetaBroker, 
            elementId: 'basicAlphaToBetaBrokerRule' 
        },
        { 
            condition: game.maps > 4 && !game.basicAlphaToBetaBroker, 
            elementId: 'basicAlphaToBetaBroker' 
        },
        { 
            condition: game.maps > 4, 
            elementId: 'buyPie' 
        },

        { 
            condition: game.lookAround != 3, 
            elementId: 'lookAroundButton', 
            display: 'inline' 
        },
        { 
            condition: game.villageNumber > 1 || game.betterTraining || game.increaseJuicePricePermanance, 
            elementId: 'megaCoinUpgradesButton' 
        },
        { 
            condition: !game.forestWell, 
            elementId: 'buyAWell' 
        },
        { 
            condition: game.respectMilestone10000 && !game.rottenActualWisdom, 
            elementId: 'rottenActualWisdom' 
        },
        { 
            condition: !game.storagePeelersUnlock, 
            elementId: 'storagePeelersDiv' 
        },
        { 
            condition: !game.storageJuicersUnlock, 
            elementId: 'storageJuicersDiv' 
        },
        { 
            condition: !game.changeResearchersBy10Unlock, 
            elementId: 'changeResearchersBy10Unlock' 
        },
        { 
            condition: !game.endScreen, 
            elementId: 'sublimeMain' 
        },
        { 
            condition: !game.endScreen, 
            elementId: 'sublimeMain' 
        },
        { 
            condition: game.endScreen, 
            elementId: 'endScreen' 
        },
        { 
            condition: game.lookAround, 
            elementId: 'navigateButtons', 
            display: 'visible' 
        }
    ];

    conditions.forEach(({ condition, elementId, display }) => {
        checkShow(condition, elementId, display);
    });


    updateBar('teach')
    updateBar('working')


    if (game.hideMaxedPurchases)
        update('hideMaxedPurchasesButton', 'Maxed Purchases Hidden')
    else
        update('hideMaxedPurchasesButton', 'Maxed Purchases Shown')

    if (game.bulkBuyUnlock2) {
        update('peelersBulkButton', 'x100')
        update('basketsBulkButton', 'x100')
        update('juicersBulkButton', 'x100')
    }

    if (game.forestWell)
        update('textForlimesDiv', '&#39Limes&#39')
}

function gameStart() {
    loadGame(JSON.parse(localStorage.getItem("mathAdventureSave")));
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

function updateBar(title) {
    const barId = title + "Bar";
    const elem = document.getElementById(barId);

    if (game[barId] > 100) {
        game[barId] = 100;
    }

    elem.style.width = game[barId] + "%";
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

function smartBarStart(id, amount) {
    if (game[id + "Bar"] === 0) {
        runBar(id, amount);
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
    element = document.getElementById(id);

    if (element !== null) {
        element.style.backgroundColor = content;
        element.style.opacity = transparency;
    }
    else {
        console.log('A color couldn\'t be updated because the element "' + id + '" does not exist :(');
    }
}

function decreaseValue(id) {
    if (game[id] >= 1) {
        game[id] -= 1;
    }
}

function runBar(id, amount) {
    barName = id + 'Bar';

    if (game[barName] < 100) {
        if (game[barName] + amount > 100) {
            game[barName] = 100;
        }
        else {
            game[barName] += amount;
        }

        // Schedule next tick using requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            // Adjust timing based on tickspeed  
            setTimeout(() => runBar(id, amount), 15 / game.tickspeed);
        });
    } else {
        // Bar is full - reset and call completion handler
        game[barName] = 0;
        endHandler = window[id + 'BarEnd'];
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

function backwardsCompatibility() {
    if (game.pin == 'sellYourJuiceButton')
        game.pin = 'deliveryButton'
    if (game.versionNumber < 142) {
        game.currentTask = 'none'
        game.currentTask2 = 'none'
    }
    if (game.versionNumber < 187) {
        game.learnANewSkillBar = 0
        for (let i = 0; i < skills.length; i++) {
            game[skills[i].id + 'Bar'] = 0
        }
    }
    if (game.versionNumber < 188) {
        game.typeToHire = 'basic'
        game.typeToHireToggle = 'basic'
    }
    if (game.versionNumber < 189) {
        for (x = 0; x < 5; x++) {
            for (y = 0; y < 4; y++) {
                if (game.diseaseArray[x][y] == 0)
                    game.diseaseArray[x][y] = 'empty'
                if (game.diseaseArray[x][y] == 1)
                    game.diseaseArray[x][y] = 'civilian'
                if (game.diseaseArray[x][y] == 2)
                    game.diseaseArray[x][y] = 'disease'
                if (game.diseaseArray[x][y] == 3)
                    game.diseaseArray[x][y] = 'dead'
                if (game.diseaseArray[x][y] == 4)
                    game.diseaseArray[x][y] = 'lake'
            }
        }
    }
}