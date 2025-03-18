document.getElementById('options').innerHTML = `
        <div class="basicDiv">
            <button class="specialButton" onclick="tabOptions('gameOptions')">Game</button>
            <button class="specialButton" onclick="tabOptions('uiOptions')">UI</button>
            <button class="specialButton" onclick="tabOptions('statsOptions')">Stats</button>
            <button class="specialButton" onclick="tabOptions('contactOptions')"><a href="https://discord.gg/scB7TbaqNS">Discord</a></button>
		</div>
		<div class="basicDiv">
			<p class="basicText">Sublime by Becky</p>
			<p class="basicText">Alpha Version</p>
			<div id="gameOptions">
				<button class="specialButton" onclick="importGame()" style="width:164px">Import Game</button>
				<button class="specialButton" onclick="update('exportCode', btoa(JSON.stringify(gameData)))" style="width:164px">Export Game</button><br>
				<button class="specialButton" onclick="resetGame()" style="background-color:#FF999A;width:342px">Reset Game</button><br>
				<p class="basicText" id="exportCode" style="background-color:#bfbfbf;word-wrap:break-word;-webkit-user-select: all;-ms-user-select: all;user-select: all;width:331px">Export Code</p>
			</div>
			<div id="statsOptions">
				<p class="basicText" id="textForTimePlayed"></p>
			</div>
			<div id="uiOptions">
				<button class="specialButton" style="width:342px" onclick="changeZoomSize()">Change Zoom Size</button><br>
				<button class="specialButton" style="width:342px" id="hideCompletedSkillsButton" onclick="toggle('hideCompletedSkills')">Completed Skills Shown</button><br>
				<button class="specialButton" style="width:342px" id="hideMaxedPurchasesButton" onclick="toggle('hideMaxedPurchases')">Maxed Purchases Shown</button><br>
				<button class="specialButton" style="width:342px" onclick="invert('showDonationButton')" id="showDonationButton"></button>
			</div>
		</div>
`;
