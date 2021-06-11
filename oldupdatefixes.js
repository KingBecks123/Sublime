function backwardsCompatibility(versionNumber) {
    if (versionNumber == undefined || versionNumber < 30) {

        gameData.basketsMax = 50
        gameData.juicersMax = 100
        gameData.peelersMax = 500
        gameData.intelligenceSkillLevelMax = 20
    }
}