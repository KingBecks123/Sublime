function getLimesButton() {
    startingMessages()
    getLimes()
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