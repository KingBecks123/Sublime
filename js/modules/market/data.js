document.getElementById('marketMain').innerHTML = `
<div style="display:inline-block;width:380px;">
    <p class="titleText">Your Stall</p>
    <div class="basicDiv" id="sellYourLimesDiv">
        <button class="specialButton" id="sellYourLimesButton" style="background-color:#FCFF4E" onclick="buy('coins', 50, 'limes')">Sell Your Limes</button>
        <p class="basicText" id="sellYourLimesAmount">You Need 50 Limes</p>
        <p class="basicText" id="sellYourLimesReward">You Will Be Rewarded 1 Coin</p>
    </div>
    <div class="basicDiv juiceMarket" id="juiceMarket">
        <button class="roundButton" id="deliveryButton" onclick="pickCurrentTask('delivery')">Sell Juice</button>
        <button class="pinButton" onclick="pin('deliveryButton')">+</button>
        <p class="basicText" id="sellYourJuicePrice">You Need 2 Coins For Delivery</p>
        <p class="basicText" id="sellYourJuiceAmount">You Need 1 Juice</p>
        <p class="basicText" id="sellYourJuiceReward">You Will Be Rewarded 1 Coin</p>
        <button class="specialButton" id="decreaseJuiceSoldButton" onclick="decreaseJuiceSold()" style="width:120px;">Decrease Juice Sold</button>
        <button class="specialButton" id="increaseJuiceSoldButton" onclick="increaseJuiceSold()" style="width:120px;">Increase Juice Sold</button>
        <button class="specialButton" id="sellMaxJuiceButton" onclick="sellMaxJuice()" style="width:105px;background-color:#BBBBBB">Sell Max Juice</button>
        <br>
        <button class="specialButton" id="deliveryToggleStandardButton" style="width:105px;" onclick="deliveryToggleStandard()">Standard Delivery</button>
        <button class="specialButton" id="deliveryToggleExpressButton" style="width:105px;" onclick="deliveryToggleExpress()">Express Delivery</button>
        <button class="specialButton" id="deliveryToggleTrainButton" style="width:105px;" onclick="deliveryToggleTrain()">Train Delivery</button>
        <br><br>
        <div class="skillProgress" id="deliveryProgress" style="margin:auto;">
            <div class="skillBar" id="deliveryBar"></div>
        </div>
    </div>
</div>
<div style="display:inline-block;width:380px;position:absolute;">
    <p class="titleText">Other's Stalls</p>
    <div id="nourishment">
        <div class="basicDiv" id="collectingUpgrade">
            <button class="specialButton" id="collectingUpgradeButton" onclick="collectingUpgrade()">Nourishment</button>
            <p class="basicText">Increase auto collect duration</p>
            <p class="basicText" id="textForNourishmentPrice">You Need: 10 Limes</p>
        </div>
    </div>
    <div class="basicDiv" id="buyAForkDiv">
        <button class="specialButton" style="background-color:#BBBBBB;" onclick="buyAFork()">Buy A Fork</button>
        <p class="basicText">Increase eating speed</p>
        <p class="basicText">Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyShoesDiv">
        <button class="specialButton" style="background-color:#DEAD85;" onclick="buy('shoes', 1)">Buy Shoes</button>
        <p class="basicText">Double auto collect rate</p>
        <p class="basicText">Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyAJuicerDiv">
        <button class="specialButton" id="buyAJuicerButton"  onclick="bulkableBuyMax('juicers', 1)">Buy A Juicer</button>
        <button class="specialButton" id="juicersBulkButton" style="width:80px;" onclick="toggle('juicersBulkToggle')">x10</button>
        <p class="basicText" id="buyAJuicerPrice">Price: 1 Coin</p>
    </div>
    <div class="basicDiv" id="buyABasketDiv">
        <button class="specialButton" id="buyABasketButton" onclick="buyABasket()">Buy A Basket</button>
        <button class="specialButton" id="basketsBulkButton" style="width:80px;" onclick="toggle('basketsBulkToggle')">x10</button>
        <p class="basicText">Price: 2 Coins</p>
    </div>
    <div class="basicDiv" id="buySkillToggler">
        <button class="specialButton" onclick="buy('multitasking', 5)">Multitasking</button>
        <p class="basicText">Allow the toggling of skills</p>
        <p class="basicText">Price: 5 Coins</p>
    </div>
    <div class="basicDiv" id="offlineBasket">
        <button class="specialButton" id="buyAScarecrowButton" onclick="buy('basketScarecrow', 10)">Buy A Scarecrow</button>
        <p class="basicText">Allows your baskets to collect limes while you're away (offline)</p>
        <p class="basicText">Price: 10 Coins</p>
    </div>
    <div class="basicDiv" id="buyAMapDiv1">
        <button class="specialButton" style="background-color:#DEAD85" onclick="buy('maps', 20)">Buy A Map Of The Town</button>
        <p class="basicText">Price: 20 Coins</p>
    </div>
    <div id="marketStore">
        <span id="plebeian"></span>
        <span id="patrician"></span>
    </div>
</div>
`

document.getElementById('plebeian').innerHTML = `
<div id="pinUnlockDiv" class="basicDiv">
    <button class="specialButton" id="pinUnlock" onclick="buy('pinUnlock', 50)">Unlock Pinning Actions</button>
    <p class="basicText">Price: 50 Coins</p>
</div>
<div id="buyKnifeDiv" class="basicDiv">
    <button class="specialButton" id="knifeButton" onclick="buy('knife', 10)">Buy A Knife</button>
    <p class="basicText" id="knifeInfo">Price: 10 Coins</p>
</div>
<div id="tomeDiv1" class="basicDiv">
    <button class="specialButton" onclick="buy('tomes', 10)">Buy A Tome</button>
    <p class="basicText">Tomes can teach you new skills!</p>
    <p class="basicText">Price: 10 Coins</p>
</div>
<div id="buyAPeelerDiv" class="basicDiv">
    <button class="specialButton" id="buyAPeelerButton" onclick="bulkableBuyMax('peelers', 2)">Buy A Peeler</button>
    <button class="specialButton" id="peelersBulkButton" style="width:80px;" onclick="toggle('peelersBulkToggle')">x10</button>
    <p class="basicText">The knife isn't gonna 'cut' it</p>
    <p class="basicText">Price: 2 Coins</p>
</div>
<div id="sharperPeelerDiv" class="basicDiv">
    <button class="specialButton" id="sharperPeelerButton" onclick="buy('sharperPeelers', 500)">Sharper Peelers</button>
    <p class="basicText">Peelers can slice faster!</p>
    <p class="basicText">Price: 500 Coins</p>
</div>
<span id="map1Unlocks">
    <div id="buyAMapDiv2" class="basicDiv">
        <button class="specialButton" onclick="buy('maps', 200)">Buy Another Map</button>
        <p class="basicText">There must be more to this town...</p>
        <p class="basicText">Price: 200 Coins</p>
    </div>
    <div class="basicDiv" id="bulkBuyUnlockDiv">
        <button class="specialButton" onclick="buy('bulkBuyUnlock', 500)">Bulk Buying</button>
        <p class="basicText">Pay the entry fee to become a bulk buyer</p>
        <p class="basicText">Price: 500 Coins</p>
    </div>
    <div class="basicDiv" id="bulkBuyUnlock2Div">
        <button class="specialButton" onclick="buy('bulkBuyUnlock2', 500)" >Extreme Bulk Buying</button>
        <p class="basicText">Normal bulk buying isn't enough!</p>
        <p class="basicText">Price: 500 Coins</p>
    </div>
    <div class="basicDiv" id="storageUnlockDiv">
        <button class="specialButton" onclick="buy('storageUnlock', 200)">Bulk Storage</button>
        <p class="basicText">Purchase a warehouse for your tools</p>
        <p class="basicText">Price: 200 Coins</p>
    </div>
    <div id="storageDiv">
        <div class="basicDiv" id="storageJuicersDiv">
            <button class="specialButton" onclick="storageJuicersUnlock()">Bulk Juicers Storage</button>
            <p class="basicText">Store 5x as many juicers</p>
            <p class="basicText">Price: 100 Coins</p>
        </div>
        <div class="basicDiv" id="storagePeelersDiv">
            <button class="specialButton" onclick="storagePeelersUnlock()">Bulk Peelers Storage</button>
            <p class="basicText">Store 5x as many peelers</p>
            <p class="basicText">Price: 100 Coins</p>
        </div>
    </div>
</span>
<span id="map2Unlocks">
    <div class="basicDiv" id="buyAMapDiv3">
        <button class="specialButton" onclick="buy('maps', 1000)">Buy A Bigger Map</button>
        <p class="basicText">There must be more *than* this town...</p>
        <p class="basicText">Price: 1,000 Coins</p>
    </div>
    <div id="increaseJuicePrice" class="basicDiv">
        <button class="specialButton" id="increaseJuicePriceButton" onclick="increaseJuicePrice()">Increase Juice Price</button>
        <button class="specialButton" id="increaseJuicePricex10Button" style="width:60px;" onclick="toggle('increaseJuicePricex10')">x10</button>
        <p class="basicText">'Squeeze' more money from your customers</p>
        <p class="basicText">The more you raise the price, the more it takes to convince the customer to still buy</p>
        <p class="basicText">+1% Profit</p>
        <p class="basicText" id="textForJuicePricePrice">Price: 1 Coins</p>
    </div>
    <div class="basicDiv" id="fasterTransportDiv">
        <button class="specialButton" onclick="buy('fasterTransport', 2000)">Better Transport</button>
        <p class="basicText">Add a new delivery type</p>
        <p class="basicText">Price: 2,000 Coins</p>
    </div>
</span>
<div class="basicDiv" id="buyADeliveryManager">
    <button class="specialButton" onclick="buy('deliveryManager', 500)">Buy A Delivery Manager</button>
    <p class="basicText">Option to deliver maximum juice</p>
    <p class="basicText">Price: 500 Coins</p>
</div>
<div class="basicDiv" id="buyAMapDiv4">
    <button class="specialButton" onclick="buy('maps', 200000)">Buy A Giant Map</button>
    <p class="basicText">Find places only the rich can go</p>
    <p class="basicText">Price: 200,000 Coins</p>
</div>
<div class="basicDiv" id="respectBillboard">
    <button class="specialButton" onclick="buy('respectBillboard', 1e5)">Buy A Respect Billboard</button>
    <p class="basicText">Put your face on a billboard so people know who helped them</p>
    <p class="basicText">Price: 100,000 Coins</p>
</div>
<div class="basicDiv" id="buyPie">
    <button class="specialButton" onclick="buy('pies', 5, 'betaCoins')">Buy Pie</button>
    <p class="basicText">Pie is essential for the patrician diet</p>
    <p class="basicText">Price: 5 Beta Coins</p>
</div>
<div class="basicDiv" id="buyWheatField">
    <button class="specialButton" onclick="buy('wheatField', 10, 'betaCoins')">Buy A Field</button>
    <p class="basicText">A farmer noticed you reselling pie, and thought you'd like to purchase a field</p>
    <p class="basicText">Price: 20 Beta Coins</p>
</div>
<div class="basicDiv" id="buyWheatSeeds">
    <button class="specialButton" onclick="buy('wheatSeeds', 10, 'betaCoins')">Buy A Wheat Seed</button>
    <p class="basicText">Is wheat the new lime?</p>
    <p class="basicText">Price: 10 Beta Coins</p>
</div>
<div class="basicDiv" id="buyMortarAndPestle">
    <button class="specialButton" onclick="buy('mortarAndPestle', 10, 'pieCoins')">Buy A Mortar And Pestle</button>
    <p class="basicText">Can grinding ever be fun?</p>
    <p class="basicText">Price: 10 Pie Coins</p>
</div>
<div class="basicDiv" id="buyPieOven">
    <button class="specialButton" onclick="buy('pieOven', 10, 'pieCoins')">Buy A Pie Oven</button>
    <p class="basicText">One step closer to pie creation</p>
    <p class="basicText">Price: 10 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieConveyorBelt">
    <button class="specialButton" onclick="buy('pieConveyorBelt', 20, 'pieCoins')">Buy A Pie Conveyor Belt</button>
    <p class="basicText">Automatically sends pies into the oven</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieBucket">
    <button class="specialButton" onclick="buy('pieBucket', 20, 'pieCoins')">Buy A Bucket With A Hole</button>
    <p class="basicText">Automatically drips juice into your pie</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieBucketNozzle">
    <button class="specialButton" onclick="buy('pieBucketNozzle', 20, 'pieCoins')">Buy A Nozzle</button>
    <p class="basicText">Adjust the juice dripping rate for optimum performance</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieFlourBucket">
    <button class="specialButton" onclick="buy('pieFlourBucket', 20, 'pieCoins')">Buy Another Bucket With A Hole</button>
    <p class="basicText">Automatically drops flour into your pie</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieFlourBucketNozzle">
    <button class="specialButton" onclick="buy('pieFlourBucketNozzle', 20, 'pieCoins')">Buy Another Nozzle</button>
    <p class="basicText">Adjust the flour dropping rate for optimum performance</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyBellows">
    <button class="specialButton" onclick="buy('bellows', 20, 'pieCoins')">Buy Bellows</button>
    <p class="basicText">Increases oven speed by adding more oxygen</p>
    <p class="basicText">Price: 20 Pie Coins</p>
</div>	
<div class="basicDiv" id="buyPieEmployee">
    <button class="specialButton" onclick="buy('pieEmployee', 50, 'pieCoins')">Hire An Employee</button>
    <p class="basicText">This person will give the pie to the customer, but must be paid.</p>
    <p class="basicText">Hiring Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="upgradeNozzles">
    <button class="specialButton" onclick="buy('upgradeNozzles', 50, 'pieCoins')">Upgrade Nozzles</button>
    <p class="basicText">These new nozzles allow for finer tuning</p>
    <p class="basicText">Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="bucketThinSteelPlating">
    <button class="specialButton" onclick="buy('bucketThinSteelPlating', gameData.bucketThinSteelPlating * 5 + 20, 'pieCoins')">Buy Thin Steel Plating</button>
    <p class="basicText">Perfect for extending the height of your buckets</p>
    <p class="basicText" id="bucketHeight">Current heights: 20 Units</p>
    <p class="basicText" id="bucketThinSteelPlatingPrice">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyASeedDrill">
    <button class="specialButton" onclick="buy('seedDrills', 50, 'pieCoins')">Buy A Seed Drill</button>
    <p class="basicText">This is sow useful!</p>
    <p class="basicText">Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAWheatHarvester">
    <button class="specialButton" onclick="buy('wheatHarvesters', 50, 'pieCoins')">Buy A Wheat Harvester</button>
    <p class="basicText">Does what it says on the label</p>
    <p class="basicText">Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="advancedPieHiring">
    <button class="specialButton" onclick="buy('advancedPieHiring', 50, 'pieCoins')">Unlock Advanced Pie Hiring</button>
    <p class="basicText">Go through pie merchant applications in the Hiring Area</p>
    <p class="basicText">Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAWell">
    <button class="specialButton" onclick="buy('forestWell', 200, 'betaCoins')">Buy A Well</button>
    <p class="basicText">Water is the lifeblood of limes</p>
    <p class="basicText">Price: 200 Beta Coins</p>
</div>
<div class="basicDiv" id="trainTransportDiv">
    <button class="specialButton" onclick="buy('trainTransport', 200, 'pieCoins')">Train Transport</button>
    <p class="basicText">Add a new delivery type</p>
    <p class="basicText">Price: 200 Pie Coins</p>
</div>
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

stuffToBuy.forEach(item => {
    document.getElementById('patrician').innerHTML += `
        <div id="${item.id}" class="basicDiv">
            <button class="specialButton" onclick="${item.function}">${item.name}</button>
            <p class="basicText">${item.description}</p>
            <p class="basicText">${item.priceText}</p>
        </div>
    `;
});