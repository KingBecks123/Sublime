document.getElementById('marketMain').innerHTML = `
<div style="display:inline-block;width:380px;">
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
        <button id="decreaseJuiceSoldButton" onclick="decreaseJuiceSold()" style="width:120px;">Decrease Juice Sold</button>
        <button id="increaseJuiceSoldButton" onclick="increaseJuiceSold()" style="width:120px;">Increase Juice Sold</button>
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
<div style="display:inline-block;width:380px;position:absolute;">
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
        <button style="background-color:#DEAD85;" onclick="buy('shoes', 1)">Buy Shoes</button>
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
        <button style="background-color:#DEAD85" onclick="buy('maps', 20)">Buy A Map Of The Town</button>
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
<div class="basicDiv" id="buyADeliveryManager">
    <button onclick="buy('deliveryManager', 500)">Buy A Delivery Manager</button>
    <p>Option to deliver maximum juice</p>
    <p>Price: 500 Coins</p>
</div>
<div class="basicDiv" id="buyAMapDiv4">
    <button onclick="buy('maps', 200000)">Buy A Giant Map</button>
    <p>Find places only the rich can go</p>
    <p>Price: 200,000 Coins</p>
</div>
<div class="basicDiv" id="respectBillboard">
    <button onclick="buy('respectBillboard', 1e5)">Buy A Respect Billboard</button>
    <p>Put your face on a billboard so people know who helped them</p>
    <p>Price: 100,000 Coins</p>
</div>
<div class="basicDiv" id="buyPie">
    <button onclick="buy('pies', 5, 'betaCoins')">Buy Pie</button>
    <p>Pie is essential for the patrician diet</p>
    <p>Price: 5 Beta Coins</p>
</div>
<div class="basicDiv" id="buyWheatField">
    <button onclick="buy('wheatField', 10, 'betaCoins')">Buy A Field</button>
    <p>A farmer noticed you reselling pie, and thought you'd like to purchase a field</p>
    <p>Price: 20 Beta Coins</p>
</div>
<div class="basicDiv" id="buyWheatSeeds">
    <button onclick="buy('wheatSeeds', 10, 'betaCoins')">Buy A Wheat Seed</button>
    <p>Is wheat the new lime?</p>
    <p>Price: 10 Beta Coins</p>
</div>
<div class="basicDiv" id="buyMortarAndPestle">
    <button onclick="buy('mortarAndPestle', 10, 'pieCoins')">Buy A Mortar And Pestle</button>
    <p>Can grinding ever be fun?</p>
    <p>Price: 10 Pie Coins</p>
</div>
<div class="basicDiv" id="buyPieOven">
    <button onclick="buy('pieOven', 10, 'pieCoins')">Buy A Pie Oven</button>
    <p>One step closer to pie creation</p>
    <p>Price: 10 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieConveyorBelt">
    <button onclick="buy('pieConveyorBelt', 20, 'pieCoins')">Buy A Pie Conveyor Belt</button>
    <p>Automatically sends pies into the oven</p>
    <p>Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieBucket">
    <button onclick="buy('pieBucket', 20, 'pieCoins')">Buy A Bucket With A Hole</button>
    <p>Automatically drips juice into your pie</p>
    <p>Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieBucketNozzle">
    <button onclick="buy('pieBucketNozzle', 20, 'pieCoins')">Buy A Nozzle</button>
    <p>Adjust the juice dripping rate for optimum performance</p>
    <p>Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieFlourBucket">
    <button onclick="buy('pieFlourBucket', 20, 'pieCoins')">Buy Another Bucket With A Hole</button>
    <p>Automatically drops flour into your pie</p>
    <p>Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAPieFlourBucketNozzle">
    <button onclick="buy('pieFlourBucketNozzle', 20, 'pieCoins')">Buy Another Nozzle</button>
    <p>Adjust the flour dropping rate for optimum performance</p>
    <p>Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyBellows">
    <button onclick="buy('bellows', 20, 'pieCoins')">Buy Bellows</button>
    <p>Increases oven speed by adding more oxygen</p>
    <p>Price: 20 Pie Coins</p>
</div>	
<div class="basicDiv" id="buyPieEmployee">
    <button onclick="buy('pieEmployee', 50, 'pieCoins')">Hire An Employee</button>
    <p>This person will give the pie to the customer, but must be paid.</p>
    <p>Hiring Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="upgradeNozzles">
    <button onclick="buy('upgradeNozzles', 50, 'pieCoins')">Upgrade Nozzles</button>
    <p>These new nozzles allow for finer tuning</p>
    <p>Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="bucketThinSteelPlating">
    <button onclick="buy('bucketThinSteelPlating', gameData.bucketThinSteelPlating * 5 + 20, 'pieCoins')">Buy Thin Steel Plating</button>
    <p>Perfect for extending the height of your buckets</p>
    <p id="bucketHeight">Current heights: 20 Units</p>
    <p id="bucketThinSteelPlatingPrice">Price: 20 Pie Coins</p>
</div>
<div class="basicDiv" id="buyASeedDrill">
    <button onclick="buy('seedDrills', 50, 'pieCoins')">Buy A Seed Drill</button>
    <p>This is sow useful!</p>
    <p>Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAWheatHarvester">
    <button onclick="buy('wheatHarvesters', 50, 'pieCoins')">Buy A Wheat Harvester</button>
    <p>Does what it says on the label</p>
    <p>Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="advancedPieHiring">
    <button onclick="buy('advancedPieHiring', 50, 'pieCoins')">Unlock Advanced Pie Hiring</button>
    <p>Go through pie merchant applications in the Hiring Area</p>
    <p>Price: 50 Pie Coins</p>
</div>
<div class="basicDiv" id="buyAWell">
    <button onclick="buy('forestWell', 200, 'betaCoins')">Buy A Well</button>
    <p>Water is the lifeblood of limes</p>
    <p>Price: 200 Beta Coins</p>
</div>
<div class="basicDiv" id="trainTransportDiv">
    <button onclick="buy('trainTransport', 200, 'pieCoins')">Train Transport</button>
    <p>Add a new delivery type</p>
    <p>Price: 200 Pie Coins</p>
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