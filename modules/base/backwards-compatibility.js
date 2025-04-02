function backwardsCompatibility() {
    if (game.pin == 'sellYourJuiceButton')
        game.pin = 'deliveryButton'
    if (game.versionNumber < 142) {
        game.currentTask = 'none'
        game.currentTask2 = 'none'
    }
    if (game.versionNumber < 187) {
        game.learnANewSkillBar = 0
        for (let i = 0; i < skills.length; i++) {
            game[skills[i].id + 'Bar'] = 0
        }
    }
    if (game.versionNumber < 188) {
        game.typeToHire = 'basic'
        game.typeToHireToggle = 'basic'
    }
    if (game.versionNumber < 189) {
        for (x = 0; x < 5; x++) {
            for (y = 0; y < 4; y++) {
                if (game.diseaseArray[x][y] == 0)
                    game.diseaseArray[x][y] = 'empty'
                if (game.diseaseArray[x][y] == 1)
                    game.diseaseArray[x][y] = 'civilian'
                if (game.diseaseArray[x][y] == 2)
                    game.diseaseArray[x][y] = 'disease'
                if (game.diseaseArray[x][y] == 3)
                    game.diseaseArray[x][y] = 'dead'
                if (game.diseaseArray[x][y] == 4)
                    game.diseaseArray[x][y] = 'lake'
            }
        }
    }
}