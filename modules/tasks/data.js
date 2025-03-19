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
    <button id="earnButton" style="background-color:lightgray;" onclick="tabTasks('earn')">Earn Respect</button>
    <button id="milestonesButton" style="background-color:lightgray;" onclick="tabTasks('milestones')">Respect Milestones</button>
</div>
<div class="basicDiv">
    <p id="textForRespect" style="color:#FF00AA;background-color:#000000">0 Respect</p>
</div>
<div id="earn">
    <div class="basicDiv" id="diseaseControl">
        <p>Disease Control</p>
        <div class="unlockDiseaseAreaSwamp">
            <p id="textForLakes">0 Lakes</p>
        </div>
        <div class="limeDiseaseControlInfo">
            <p>Help the citizens quarantine from Lime Disease</p>
            <div class="unlockDiseaseAreaSwamp">
                <p>For every lake used, gain / lose +1 respect</p>
            </div>
        </div>
        <div class="unlockDiseaseAreaSwamp">
            <button class="wide-button light-blue" id="decreaseLakesButton" onclick="changeLakeAmount(-1)">Decrease Lakes</button>
            <button class="wide-button light-blue" id="increaseLakesButton" onclick="changeLakeAmount(1)">Increase Lakes</button>
        </div>
        <button id="startDiseaseTask" onclick="diseaseControlTask()">Start Task</button>
        <button id="autoStartTaskButton" onclick="toggle('autoStartTask')">Auto</button>
        <button id="limeDiseaseControlInfoButton" onclick="toggle('limeDiseaseControlInfoToggle')">Info</button>
    </div>
    <div class="basicDiv" id="diseaseControlStart">
        <div class="limeDiseaseInfo">
            <p>Disease type: Lime Disease</p>
            <p>Goal: Don't let it spread from any civilian to any other</p>
        </div>
        <p id="numberOfCivilians">Number of civilians: 2</p>
        <div id="autoPlaceACivilianDiv">
            <button id="autoPlaceACivilianButton" onclick="toggle('autoPlaceACivilian')">Auto Place A Civilian</button><br>
            <p>Rule: Random empty spot</p>
        </div>
        <button onclick="startSimulation()" style="width:150px">Start Simulation</button>
        <button id="autoStartSimulationButton" onclick="toggle('autoStartSimulation')">Auto</button>
        <button onclick="diseaseControlQuit()">Quit</button>
        <br>
        <button id="checkResultsButton" style="width:150px" onclick="checkResults()">Check Results</button>
        <button id="autoCheckSimulationButton" onclick="toggle('autoCheckSimulation')">Auto</button>
        <button id="limeDiseaseInfoButton" onclick="toggle('limeDiseaseInfoToggle')">Info</button>
    </div>
    <div class="basicDiv" id="diseaseControlMap">
        <div id="diseaseControlTiles" style="position: relative; left: 50%;transform: translate(-50%, 0%);width:320px"></div>
    </div>
    <div class="basicDiv" id="benevolence">
        <button id="benevolenceToggleButton" onclick="benevolenceToggle()">Benevolence</button>
        <p id="benevolenceRespectIncrease">Respect increase: </p>
    </div>
</div>
<div id="milestones">
    <div class="basicDiv">
        <p id="10RespectMilestone"    >10 Respect: ???</p>
        <p id="25RespectMilestone"    >25 Respect: ???</p>
        <p id="50RespectMilestone"    >50 Respect: ???</p>
        <p id="100RespectMilestone"   >100 Respect: ???</p>
        <p id="500RespectMilestone"   >500 Respect: ???</p>
        <p id="1000RespectMilestone"  >1,000 Respect: ???</p>
        <p class="tooltip" id="10000RespectMilestone" >10,000 Respect: ???</p>
    </div>
</div>
`;

const milestoneValues = [
    { value: 10, color: myLime, text: 'Automatically start tasks' },
    { value: 25, color: myLime, text: 'Automatically start simulation' },
    { value: 50, color: myLime, text: 'Allow entrance to the Special Shopping District' },
    { value: 100, color: myLime, text: 'Automatically check simulation' },
    { value: 500, color: myLime, text: 'Automatically situate a civilian' },
    { value: 1000, color: myLime, text: 'Unlock scientific research' },
    { value: 10000, color: '#FF999A', text: 'Unlock more mega coin upgrades' }
];