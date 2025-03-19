document.getElementById('marketMain').innerHTML = `
<div class="module-container" style="display:inline-block;">
    <p class="titleText">Your Stall</p>
    <div class="basicDiv" id="sellYourLimesDiv">
        <button id="sellYourLimesButton" style="background-color:#FCFF4E" onclick="buy('coins', 50, 'limes')">Sell Your Limes</button>
        <p id="sellYourLimesAmount">You Need 50 Limes</p>
        <p id="sellYourLimesReward">You Will Be Rewarded 1 Coin</p>
    </div>
    <div class="basicDiv juiceMarket" id="juiceMarket">
        <button class="roundButton" id="deliveryButton" onclick="pickCurrentTask('delivery')">Sell Juice</button>
        <button class="pinButton" onclick="pin('deliveryButton')">+</button>
        <p id="sellYourJuicePrice">You Need 2 Coins For Delivery</p>
        <p id="sellYourJuiceAmount">You Need 1 Juice</p>
        <p id="sellYourJuiceReward">You Will Be Rewarded 1 Coin</p>
        <button class="wide-button" id="decreaseJuiceSoldButton" onclick="decreaseJuiceSold()">Decrease Juice Sold</button>
        <button class="wide-button" id="increaseJuiceSoldButton" onclick="increaseJuiceSold()">Increase Juice Sold</button>
        <button id="sellMaxJuiceButton" onclick="sellMaxJuice()" style="width:105px;background-color:#BBBBBB">Sell Max Juice</button>
        <br>
        <button id="deliveryToggleStandardButton" style="width:105px;height:40px;" onclick="deliveryToggleStandard()">Standard Delivery</button>
        <button id="deliveryToggleExpressButton" style="width:105px;height:40px;" onclick="deliveryToggleExpress()">Express Delivery</button>
        <button id="deliveryToggleTrainButton" style="width:105px;height:40px;" onclick="deliveryToggleTrain()">Train Delivery</button>
        <br><br>
        <div class="skillProgress" id="deliveryProgress" style="margin:auto;">
            <div class="skillBar" id="deliveryBar"></div>
        </div>
    </div>
</div>
<div class="module-container" style="display:inline-block;position:absolute;">
    <p class="titleText">Other's Stalls</p>
    <div id="nourishment">
        <div class="basicDiv" id="collectingUpgrade">
            <button id="collectingUpgradeButton" onclick="collectingUpgrade()">Nourishment</button>
            <p>Increase auto collect duration</p>
            <p id="textForNourishmentPrice">You Need: 10 Limes</p>
        </div>
    </div>
    <div class="basicDiv" id="buyAForkDiv">
        <button style="background-color:#BBBBBB;" onclick="buyAFork()">Buy A Fork</button>
        <p>Increase eating speed</p>
        <p>Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyShoesDiv">
        <button onclick="buy('shoes', 1)">Buy Shoes</button>
        <p>Double auto collect rate</p>
        <p>Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyAJuicerDiv">
        <button id="buyAJuicerButton"  onclick="bulkableBuyMax('juicers', 1)">Buy A Juicer</button>
        <button id="juicersBulkButton" style="width:80px;" onclick="toggle('juicersBulkToggle')">x10</button>
        <p id="buyAJuicerPrice">Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyABasketDiv">
        <button id="buyABasketButton" onclick="buyABasket()">Buy A Basket</button>
        <button id="basketsBulkButton" style="width:80px;" onclick="toggle('basketsBulkToggle')">x10</button>
        <p>Price: 2 Coins</p>
    </div>
    <div class="basicDiv" id="buySkillToggler">
        <button onclick="buy('multitasking', 5)">Multitasking</button>
        <p>Allow the toggling of skills</p>
        <p>Price: 5 Coins</p>
    </div>
    <div class="basicDiv" id="offlineBasket">
        <button id="buyAScarecrowButton" onclick="buy('basketScarecrow', 10)">Buy A Scarecrow</button>
        <p>Allows your baskets to collect limes while you're away (offline)</p>
        <p>Price: 10 Coins</p>
    </div>
    <div class="basicDiv" id="buyAMapDiv1">
        <button onclick="buy('maps', 20)">Buy A Map Of The Town</button>
        <p>Price: 20 Coins</p>
    </div>
    <div id="marketStore">
        <span id="plebeian"></span>
        <span id="patrician"></span>
    </div>
</div>
`

document.getElementById('plebeian').innerHTML = `
<div id="pinUnlockDiv" class="basicDiv">
    <button id="pinUnlock" onclick="buy('pinUnlock', 50)">Unlock Pinning Actions</button>
    <p>Price: 50 Coins</p>
</div>
<div id="buyKnifeDiv" class="basicDiv">
    <button id="knifeButton" onclick="buy('knife', 10)">Buy A Knife</button>
    <p id="knifeInfo">Price: 10 Coins</p>
</div>
<div id="tomeDiv1" class="basicDiv">
    <button onclick="buy('tomes', 10)">Buy A Tome</button>
    <p>Tomes can teach you new skills!</p>
    <p>Price: 10 Coins</p>
</div>
<div id="buyAPeelerDiv" class="basicDiv">
    <button id="buyAPeelerButton" onclick="bulkableBuyMax('peelers', 2)">Buy A Peeler</button>
    <button id="peelersBulkButton" style="width:80px;" onclick="toggle('peelersBulkToggle')">x10</button>
    <p>The knife isn't gonna 'cut' it</p>
    <p>Price: 2 Coins</p>
</div>
<div id="sharperPeelerDiv" class="basicDiv">
    <button id="sharperPeelerButton" onclick="buy('sharperPeelers', 500)">Sharper Peelers</button>
    <p>Peelers can slice faster!</p>
    <p>Price: 500 Coins</p>
</div>
<span id="map1Unlocks">
    <div id="buyAMapDiv2" class="basicDiv">
        <button onclick="buy('maps', 200)">Buy Another Map</button>
        <p>There must be more to this town...</p>
        <p>Price: 200 Coins</p>
    </div>
    <div class="basicDiv" id="bulkBuyUnlockDiv">
        <button onclick="buy('bulkBuyUnlock', 500)">Bulk Buying</button>
        <p>Pay the entry fee to become a bulk buyer</p>
        <p>Price: 500 Coins</p>
    </div>
    <div class="basicDiv" id="bulkBuyUnlock2Div">
        <button onclick="buy('bulkBuyUnlock2', 500)" >Extreme Bulk Buying</button>
        <p>Normal bulk buying isn't enough!</p>
        <p>Price: 500 Coins</p>
    </div>
    <div class="basicDiv" id="storageUnlockDiv">
        <button onclick="buy('storageUnlock', 200)">Bulk Storage</button>
        <p>Purchase a warehouse for your tools</p>
        <p>Price: 200 Coins</p>
    </div>
    <div id="storageDiv">
        <div class="basicDiv" id="storageJuicersDiv">
            <button onclick="storageJuicersUnlock()">Bulk Juicers Storage</button>
            <p>Store 5x as many juicers</p>
            <p>Price: 100 Coins</p>
        </div>
        <div class="basicDiv" id="storagePeelersDiv">
            <button onclick="storagePeelersUnlock()">Bulk Peelers Storage</button>
            <p>Store 5x as many peelers</p>
            <p>Price: 100 Coins</p>
        </div>
    </div>
</span>
<span id="map2Unlocks">
    <div class="basicDiv" id="buyAMapDiv3">
        <button onclick="buy('maps', 1000)">Buy A Bigger Map</button>
        <p>There must be more *than* this town...</p>
        <p>Price: 1,000 Coins</p>
    </div>
    <div id="increaseJuicePrice" class="basicDiv">
        <button id="increaseJuicePriceButton" onclick="increaseJuicePrice()">Increase Juice Price</button>
        <button id="increaseJuicePricex10Button" style="width:60px;" onclick="toggle('increaseJuicePricex10')">x10</button>
        <p>'Squeeze' more money from your customers</p>
        <p>The more you raise the price, the more it takes to convince the customer to still buy</p>
        <p>+1% Profit</p>
        <p id="textForJuicePricePrice">Price: 1 Coins</p>
    </div>
    <div class="basicDiv" id="fasterTransportDiv">
        <button onclick="buy('fasterTransport', 2000)">Better Transport</button>
        <p>Add a new delivery type</p>
        <p>Price: 2,000 Coins</p>
    </div>
</span>
`

stuffToBuy = [
    {
        id: 'buyARobe',
        name: 'Buy A Robe',
        function: `buyARobe()`,
        description: 'Guaranteed to make you look rich! Respect +50',
        priceText: 'Price: 100,000 Coins',
    },
    {
        id: 'lightRobe',
        name: 'Buy A Lightweight Robe',
        function: `buy('lightRobe', 5e3, 'alphaCoins')`,
        description: 'Respect +50 instantly after travelling',
        priceText: 'Price: 5,000 Alpha Coins',
    },
    {
        id: 'increaseJuicePricePermanance',
        name: 'Unlock Permanance',
        function: `buy('increaseJuicePricePermanance', 5e5)`,
        description: 'Make "Increase juice price" stay after travelling!',
        priceText: 'Price: 500,000 Coins',
    },
    {
        id: 'unlockDiseaseAreaSwamp',
        name: 'Unlock Swamp Area',
        function: `buy('unlockDiseaseAreaSwamp', 1e5)`,
        description: 'The civilians in the swamp have lime disease too!',
        priceText: 'Price: 100,000 Coins',
    },
    {
        id: 'tomeDiv2',
        name: 'Buy A Tome',
        function: `buy('tomes', 2e5)`,
        description: 'This tome will save you time on limes, 5 stars',
        priceText: 'Price: 200,000 Coins',
    },
    {
        id: 'unlockBenevolence',
        name: 'Buy a Conscience',
        function: `buy('unlockBenevolence', 5e5)`,
        description: 'Think about those less fortunate than you - unlocks Benevolence',
        priceText: 'Price: 500,000 Coins',
    },
    {
        id: 'surveillanceCamera2',
        name: 'Buy A High Tech Surveillance Camera',
        function: `buy('surveillanceCamera2', 2e5)`,
        description: 'Make sure researchers are working while you&#39re away (offline)',
        priceText: 'Price: 200,000 Coins',
    },
    {
        id: 'buyANewTree',
        name: 'Buy A New Tree',
        function: `buy('forestTree2', 1e6)`,
        description: 'An orchardist recommends this new type of tree',
        priceText: 'Price: 1,000,000 Coins',
    },
    {
        id: 'buyAMapDiv5',
        name: 'Buy An Enormous Map',
        function: `buy('maps', 1e7)`,  
        description: 'These map prices are getting absurd...',
        priceText: 'Price: 10,000,000 Coins',
    }
]

plebianStuffToBuy = [ 
    {
        id: 'trainTransportDiv',
        name: 'Train Transport',
        function: `buy('trainTransport', 200, 'pieCoins')`,
        description: 'Add a new delivery type',
        priceText: 'Price: 200 Pie Coins'
    },
    {
        id: 'buyADeliveryManager',
        name: 'Buy A Delivery Manager',
        function: `buy('deliveryManager', 500)`,
        description: 'Option to deliver maximum juice',
        priceText: 'Price: 500 Coins'
    },
    {
        id: 'buyAMapDiv4',
        name: 'Buy A Giant Map',
        function: `buy('maps', 200000)`,
        description: 'Find places only the rich can go',
        priceText: 'Price: 200,000 Coins'
    },
    {
        id: 'respectBillboard',
        name: 'Buy A Respect Billboard',
        function: `buy('respectBillboard', 1e5)`,
        description: 'Put your face on a billboard so people know who helped them',
        priceText: 'Price: 100,000 Coins'
    },
    {
        id: 'buyPie',
        name: 'Buy Pie',
        function: `buy('pies', 5, 'betaCoins')`,
        description: 'Pie is essential for the patrician diet',
        priceText: 'Price: 5 Beta Coins'
    },
    {
        id: 'buyWheatField',
        name: 'Buy A Field',
        function: `buy('wheatField', 20, 'betaCoins')`,
        description: 'A farmer noticed you reselling pie, and thought you\'d like to purchase a field',
        priceText: 'Price: 20 Beta Coins'
    },
    {
        id: 'buyWheatSeeds',
        name: 'Buy A Wheat Seed',
        function: `buy('wheatSeeds', 10, 'betaCoins')`,
        description: 'Is wheat the new lime? No.',
        priceText: 'Price: 10 Beta Coins'
    },
    {
        id: 'buyMortarAndPestle',
        name: 'Buy A Mortar And Pestle',
        function: `buy('mortarAndPestle', 10, 'pieCoins')`,
        description: 'Can grinding ever be fun?',
        priceText: 'Price: 10 Pie Coins'
    },
    {
        id: 'buyPieOven',
        name: 'Buy A Pie Oven',
        function: `buy('pieOven', 10, 'pieCoins')`,
        description: 'One step closer to pie creation',
        priceText: 'Price: 10 Pie Coins'
    },
    {
        id: 'buyAPieConveyorBelt',
        name: 'Buy A Pie Conveyor Belt',
        function: `buy('pieConveyorBelt', 20, 'pieCoins')`,
        description: 'Automatically sends pies into the oven',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyAPieBucket',
        name: 'Buy A Bucket With A Hole',
        function: `buy('pieBucket', 20, 'pieCoins')`,
        description: 'Automatically drips juice into your pie',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyAPieBucketNozzle',
        name: 'Buy A Nozzle',
        function: `buy('pieBucketNozzle', 20, 'pieCoins')`,
        description: 'Adjust the juice dripping rate for optimum performance',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyAPieFlourBucket',
        name: 'Buy Another Bucket With A Hole',
        function: `buy('pieFlourBucket', 20, 'pieCoins')`,
        description: 'Automatically drops flour into your pie',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyAPieFlourBucketNozzle',
        name: 'Buy Another Nozzle',
        function: `buy('pieFlourBucketNozzle', 20, 'pieCoins')`,
        description: 'Adjust the flour dropping rate for optimum performance',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyBellows',
        name: 'Buy Bellows',
        function: `buy('bellows', 20, 'pieCoins')`,
        description: 'Increases oven speed by adding more oxygen',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyPieEmployee',
        name: 'Hire An Employee',
        function: `buy('pieEmployee', 50, 'pieCoins')`,
        description: 'This person will give the pie to the customer, but must be paid.',
        priceText: 'Hiring Price: 50 Pie Coins'
    },
    {
        id: 'upgradeNozzles',
        name: 'Upgrade Nozzles',
        function: `buy('upgradeNozzles', 50, 'pieCoins')`,
        description: 'These new nozzles allow for finer tuning',
        priceText: 'Price: 50 Pie Coins'
    },
    {
        id: 'bucketThinSteelPlating',
        name: 'Buy Thin Steel Plating',
        function: `buy('bucketThinSteelPlating', gameData.bucketThinSteelPlating * 5 + 20, 'pieCoins')`,
        description: 'Perfect for extending the height of your buckets',
        priceText: 'Price: 20 Pie Coins'
    },
    {
        id: 'buyASeedDrill',
        name: 'Buy A Seed Drill',
        function: `buy('seedDrills', 50, 'pieCoins')`,
        description: 'This is sow useful!',
        priceText: 'Price: 50 Pie Coins'
    },
    {
        id: 'buyAWheatHarvester',
        name: 'Buy A Wheat Harvester',
        function: `buy('wheatHarvesters', 50, 'pieCoins')`,
        description: 'Does what it says on the label',
        priceText: 'Price: 50 Pie Coins'
    },
    {
        id: 'advancedPieHiring',
        name: 'Unlock Advanced Pie Hiring',
        function: `buy('advancedPieHiring', 50, 'pieCoins')`,
        description: 'Go through pie merchant applications in the Hiring Area',
        priceText: 'Price: 50 Pie Coins'
    },
    {
        id: 'buyAWell',
        name: 'Buy A Well',
        function: `buy('forestWell', 200, 'betaCoins')`,
        description: 'Water is the lifeblood of limes',
        priceText: 'Price: 200 Beta Coins'
    }
]

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
    document.getElementById('plebeian').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button onclick="${item.function}">${item.name}</button>
            <p>${item.description}</p>
            <p id="${item.id}Price">${item.priceText}</p>
        </div>
    `;
});