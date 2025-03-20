//Save Functions :)

function reset() {
	ableToSave = false
	game = {}
	Object.assign(game, gameBase)
	localStorage.setItem('mathAdventureSave', JSON.stringify(game))
	location.reload()
}

function importGame() {
	var savegame = JSON.parse(atob(prompt("Import Code: ")))
	if (savegame !== null) {
		loadGame(savegame)
		saveGame()
		location.reload()
	}
}

function loadGame(savegame) {
	if (savegame !== null) {
        Object.assign(game, gameBase)
		Object.assign(game, savegame)
		backwardsCompatibility()
		game.versionNumber = 192
	} 
    else
        reset()
}

function saveGame() {
	if (ableToSave)
		localStorage.setItem('mathAdventureSave', JSON.stringify(game))
}

//Helper Functions :)
function invert(bool) {
	game[bool] = !game[bool];
}

function hide(id) {
	document.getElementById(id).style.display = 'none';
}

function toggle(x) {
	if (game[x] === 0) {
	  game[x] = 1;
	} else {
	  game[x] = 0;
	}
}

function beckyRandom(max) {
	return Math.floor(Math.random() * max) + 1;
}

function beckyRandomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function checkShow(x, id, style) {
	const element = document.getElementById(id);
    if (element !== null){
        if (style === 'visible') {
			element.style.visibility = x ? 'visible' : 'hidden';
        } else {
                element.style.display = x ? (style === 'inline' ? 'inline-block' : 'block') : 'none';
        }
    }
    else {
        console.log(id + ' is null')
    }
}

function idToName (id) {
    id = id.replace(/([A-Z])/g, ' $1').trim();
    return id.charAt(0).toUpperCase() + id.slice(1);
}

/* ----- Audio Functions :) ----- */

// Sound pools to handle multiple concurrent sounds
const soundPools = {};

function initAudio() {
    for (const soundType in AUDIO_DATA) {
        createSoundPool(soundType);
    }
    
    // Add click sound to all buttons
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            if (game.sfxOn) {
                playSound('BUTTON_CLICK');
            }
        }
    });
}

function createSoundPool(soundType) {
    const soundData = AUDIO_DATA[soundType];
    if (!soundData) return;
    
    soundPools[soundType] = [];
    
    for (let i = 0; i < soundData.poolSize; i++) {
        const sound = new Audio(soundData.path);
        sound.volume = soundData.volume;
        sound.load();
        soundPools[soundType].push({
            audio: sound,
            inUse: false
        });
    }
}

function playSound(soundType) {
    const pool = soundPools[soundType];
    if (!pool) return false;
    
    // First try to find a free sound
    for (let i = 0; i < pool.length; i++) {
        const soundObj = pool[i];
        if (!soundObj.inUse) {
            return playSoundFromPool(soundObj, i);
        }
    }
    
    // If all are in use, find one that's ended or furthest along
    let bestIndex = 0;
    let bestTime = 0;
    
    for (let i = 0; i < pool.length; i++) {
        const audio = pool[i].audio;
        // If any have ended, use them immediately
        if (audio.ended) {
            return playSoundFromPool(pool[i], i);
        }
        
        // Otherwise track the one furthest along
        if (audio.currentTime > bestTime) {
            bestTime = audio.currentTime;
            bestIndex = i;
        }
    }
    
    // Use the best candidate
    return playSoundFromPool(pool[bestIndex]);
}

function playSoundFromPool(soundObj) {
    soundObj.inUse = true;
    soundObj.audio.currentTime = 0;
    
    try {
        soundObj.audio.play()
            .then(() => {
                // Success - mark as free when done
                setTimeout(() => {
                    soundObj.inUse = false;
                }, 50); // Small buffer to prevent immediate reuse
            })
            .catch(error => {
                // Error occurred - mark as free immediately
                soundObj.inUse = false;
                console.warn('Audio playback failed:', error);
            });
        return true;
    } catch (error) {
        // For browsers that don't support promises on audio.play()
        soundObj.inUse = false;
        console.warn('Audio playback failed:', error);
        return false;
    }
}

const hasUpdatedObj = {};
  
function update(id, content) {
  const stringy = id.replace(/[()-]/g, 'uwu');

  if (typeof hasUpdatedObj[stringy] === 'undefined') {
    hasUpdatedObj[stringy] = 'noneOwO';
  }

  if (hasUpdatedObj[stringy] !== content) {
    if (document.getElementById(id) !== null) {
        document.getElementById(id).innerHTML = content;
        hasUpdatedObj[stringy] = content;
    }
  }
}