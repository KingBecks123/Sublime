addMainTabs([
	{
		id: 'tasks',
		text: 'Tasks',
		color1: 'FF98DD',
		color2: 'FF4DFF'
	}
]);

addGameVariables({
	respectMilestone10: 0,
	respectMilestone25: 0,
	respectMilestone50: 0,
	respectMilestone100: 0,
	respectMilestone500: 0,
	respectMilestone1000: 0,
	respectMilestone10000: 0,
	respectBillboard: 0,
    civiliansPlaced: 0,
    civiliansTotal: 2,
    autoStartTask: 0,
    autoCheckSimulation: 0,
    autoStartSimulation: 0,
    diseaseControlFinished: true,
    respect: 0,
    simulationTime: false,
    unlockDiseaseAreaSwamp: 0,
    limeDiseaseInfoToggle: 1,
    limeDiseaseControlInfoToggle: 1,
    limeDiseaseLakes: 0,
    limeDiseaseLakesSet: 0,
    diseaseArray: [
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty']
    ],
});

document.getElementById('tasks').innerHTML = `
<div class="basicDiv" id="tasksButtonsDiv">
    <button class="specialButton" id="earnButton" style="background-color:lightgray;" onclick="tabTasks('earn')">Earn Respect</button>
    <button class="specialButton" id="milestonesButton" style="background-color:lightgray;" onclick="tabTasks('milestones')">Respect Milestones</button>
</div>
<div class="basicDiv">
    <p class="basicText" id="textForRespect" style="color:#FF00AA;background-color:#000000">0 Respect</p>
</div>
<div id="earn">
    <div class="basicDiv" id="diseaseControl">
        <p class="basicText">Disease Control</p>
        <div class="unlockDiseaseAreaSwamp">
            <p class="basicText" id="textForLakes">0 Lakes</p>
        </div>
        <div class="limeDiseaseControlInfo">
            <p class="basicText">Help the citizens quarantine from Lime Disease</p>
            <div class="unlockDiseaseAreaSwamp">
                <p class="basicText">For every lake used, gain / lose +1 respect</p>
            </div>
        </div>
        <div class="unlockDiseaseAreaSwamp">
            <button class="specialButton" id="decreaseLakesButton" onclick="changeLakeAmount(-1)" style="width:120px;background:#99FFFF;">Decrease Lakes</button>
            <button class="specialButton" id="increaseLakesButton" onclick="changeLakeAmount(1)" style="width:120px;background:#99FFFF;">Increase Lakes</button>
        </div>
        <button class="specialButton" id="startDiseaseTask" onclick="diseaseControlTask()">Start Task</button>
        <button class="specialButton" id="autoStartTaskButton" onclick="toggle('autoStartTask')">Auto</button>
        <button class="specialButton" id="limeDiseaseControlInfoButton" onclick="toggle('limeDiseaseControlInfoToggle')">Info</button>
    </div>
    <div class="basicDiv" id="diseaseControlStart">
        <div class="limeDiseaseInfo">
            <p class="basicText">Disease type: Lime Disease</p>
            <p class="basicText">Goal: Don't let it spread from any civilian to any other</p>
        </div>
        <p class="basicText" id="numberOfCivilians">Number of civilians: 2</p>
        <div id="autoPlaceACivilianDiv">
            <button class="specialButton" id="autoPlaceACivilianButton" onclick="toggle('autoPlaceACivilian')">Auto Place A Civilian</button><br>
            <p class="basicText">Rule: Random empty spot</p>
        </div>
        <button class="specialButton" onclick="startSimulation()" style="width:150px">Start Simulation</button>
        <button class="specialButton" id="autoStartSimulationButton" onclick="toggle('autoStartSimulation')">Auto</button>
        <button class="specialButton" onclick="diseaseControlQuit()">Quit</button>
        <br>
        <button class="specialButton" id="checkResultsButton" style="width:150px" onclick="checkResults()">Check Results</button>
        <button class="specialButton" id="autoCheckSimulationButton" onclick="toggle('autoCheckSimulation')">Auto</button>
        <button class="specialButton" id="limeDiseaseInfoButton" onclick="toggle('limeDiseaseInfoToggle')">Info</button>
    </div>
    <div class="basicDiv" id="diseaseControlMap">
        <div id="diseaseControlTiles" style="position: relative; left: 50%;transform: translate(-50%, 0%);width:320px"></div>
    </div>
    <div class="basicDiv" id="benevolence">
        <button class="specialButton" id="benevolenceToggleButton" onclick="benevolenceToggle()">Benevolence</button>
        <p class="basicText" id="benevolenceRespectIncrease">Respect increase: </p>
    </div>
</div>
<div id="milestones">
    <div class="basicDiv">
        <p class="basicText" id="10RespectMilestone"    >10 Respect: ???</p>
        <p class="basicText" id="25RespectMilestone"    >25 Respect: ???</p>
        <p class="basicText" id="50RespectMilestone"    >50 Respect: ???</p>
        <p class="basicText" id="100RespectMilestone"   >100 Respect: ???</p>
        <p class="basicText" id="500RespectMilestone"   >500 Respect: ???</p>
        <p class="basicText" id="1000RespectMilestone"  >1,000 Respect: ???</p>
        <p class="basicText tooltip" id="10000RespectMilestone" >10,000 Respect: ???</p>
    </div>
</div>
`;