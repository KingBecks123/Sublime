//Add stuffToBuy to the market
stuffToBuy.forEach(item => {
    document.getElementById('patrician').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button onclick="${item.function}">${item.name}</button>
            <p>${item.description}</p>
            <p>${item.priceText}</p>
        </div>
    `;
});

//Add plebianStuffToBuy to the market
plebianStuffToBuy.forEach(item => {
    document.getElementById('plebian').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button onclick="${item.function}">${item.name}</button>
            <p>${item.description}</p>
            <p>${item.priceText}</p>
        </div>
    `;
});