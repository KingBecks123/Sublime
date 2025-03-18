stuffToBuy.forEach(item => {
    document.getElementById('patrician').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button onclick="${item.function}">${item.name}</button>
            <p class="basicText">${item.description}</p>
            <p class="basicText">${item.priceText}</p>
        </div>
    `;
});