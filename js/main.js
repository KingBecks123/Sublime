// Game version - Change this to update version number
const GAME_VERSION = "1.1.4";
const VERSION_NOTES = 
`15/Mar/2025
    Fixed issue with lore hooks
    Added sfx toggle button with a cool color change
    Fixed issue with wheat harvester and seed drill
`;

// Add button click sound to all buttons
document.addEventListener('DOMContentLoaded', function() {
    // Create and preload audio object
    const buttonClickSound = new Audio('assets/sfx/button-click.wav');
    buttonClickSound.volume = 0.3; // Set volume to half
    buttonClickSound.load(); // Preload the audio file
    
    // Create a second audio object as a backup for rapid clicks
    const buttonClickSound2 = new Audio('assets/sfx/button-click.wav');
    buttonClickSound2.volume = 0.3; // Set volume to half
    buttonClickSound2.load(); // Preload the audio file
    
    // Track which sound to use
    let useFirstSound = true;
    
    // Add click event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
            if (gameData.sfxOn) {
                // Play the sound using alternating audio objects to handle rapid clicks
                if (useFirstSound) {
                    buttonClickSound.currentTime = 0;
                    buttonClickSound.play();
                } else {
                    buttonClickSound2.currentTime = 0;
                    buttonClickSound2.play();
                }
                useFirstSound = !useFirstSound; // Switch for next click
            }
        }
    });
});
