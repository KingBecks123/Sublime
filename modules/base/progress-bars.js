function restartBar(x) {
    if (game[x + 'Bar'] > 0) {
        window[x + 'Bar']();
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

function smartBarStart(id, amount) {
    if (game[id + "Bar"] === 0) {
        runBar(id, amount);
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
