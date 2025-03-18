document.getElementById('options').innerHTML = `
        <div class="basicDiv">
            <button onclick="tabOptions('gameOptions')">Game</button>
            <button onclick="tabOptions('uiOptions')">UI</button>
            <button onclick="tabOptions('statsOptions')">Stats</button>
            <a href="https://discord.gg/scB7TbaqNS" target="_blank" style="float:right;"><button><img src="assets/images/icons8-discord-32.png" alt="Discord" style="width:16px;height:16px;"></button></a>
		</div>
		<div class="basicDiv">
			<p>Sublime by Becky</p>
			<p>Alpha Version</p>
			<div id="gameOptions">
				<button onclick="importGame()" style="width:164px">Import Game</button>
				<button onclick="update('exportCode', btoa(JSON.stringify(game)))" style="width:164px">Export Game</button><br>
				<button onclick="resetGame()" style="background-color:#FF999A;width:342px">Reset Game</button><br>
				<p id="exportCode" style="background-color:#bfbfbf;word-wrap:break-word;-webkit-user-select: all;-ms-user-select: all;user-select: all;width:331px">Export Code</p>
			</div>
			<div id="statsOptions">
				<p id="textForTimePlayed"></p>
			</div>
			<div id="uiOptions">
				<button class="ui-option" onclick="changeZoomSize()">Change Zoom Size</button><br>
				<button class="ui-option" id="hideCompletedSkillsButton" onclick="toggle('hideCompletedSkills')">Completed Skills Shown</button><br>
				<button class="ui-option" id="hideMaxedPurchasesButton" onclick="toggle('hideMaxedPurchases')">Maxed Purchases Shown</button><br>
				<button class="ui-option" onclick="invert('showDonationButton')" id="showDonationButton"></button>
			</div>
		</div>
`;
