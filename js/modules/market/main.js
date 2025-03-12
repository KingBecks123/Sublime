stuffToBuy.forEach(item => {
    document.getElementById('patrician').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button class="specialButton" onclick="${item.function}">${item.name}</button>
            <p class="basicText">${item.description}</p>
            <p class="basicText">${item.priceText}</p>
        </div>
    `;
});