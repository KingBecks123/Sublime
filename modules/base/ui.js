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

function changeZoomSize() {
    if (game.zoom >= 180)
        game.zoom = 100
    else
        game.zoom += 20

    document.body.style.zoom = game.zoom / 100
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