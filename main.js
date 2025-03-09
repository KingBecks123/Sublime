// Colors
orangeRed = "#be4a2f";
lightOrangeRed= "#d77643";
sand = "#ead4aa";
beige = "#e4a672";
lightBrown = "#e4a672";
brown = "#733e39";
darkPurpleBrown = "#3e2731";
maroon = "#a22633";
red = "#e43b44";
orange = "#f77622";
orangeYellow = "#feae34";
yellow = "#fee761";
lime = "#63c74d";
green = "#3e8948";
darkGreen = "#265c42";
darkCyan = "#193c3e";
darkBlue = "#124e89";
blue = "#0099db";
skyBlue = "#2ce8f5";
white = "#ffffff";
veryLightGray = "#c0cbdc";
lightGray ="#8b9bb4";
gray = "#5a6988";
darkGray = "#3a4466";
navy = "#262b44";
deepPurple = "#181425";
pink = "#ff0044";
darkPurple = "#68386c";
purple = "#b55088";
peach = "#f6757a";
darkSand = "#e8b796";
veryLightBrown = "#c28569";

// Game version - Change this to update version number
const GAME_VERSION = "1.0.0";
const VERSION_NOTES = 
`### Aesthetic
- Added a nice background texture
- Prettier buttons. They look 3D! Click em!
- Made progress bars run smoothly
- Added button click SFX
- Switched to a much better font (DepartureMono)
- R e d u c e d   t h e   l e t t e r   s p a c i n g
- Fixed the stats box
- Added more tooltips
- Added titles, market titles
- Created a color palette
- Added a version number and changelog (hopefully you can find it...)
### Backend
- Organized the Assets and folder hierarchy in general
- The limes... they're everywhere...
`;

// Add button click sound to all buttons
document.addEventListener('DOMContentLoaded', function() {
    // Create and preload audio object
    const buttonClickSound = new Audio('assets/sfx/button-click.wav');
    buttonClickSound.volume = 0.5; // Set volume to half
    buttonClickSound.load(); // Preload the audio file
    
    // Create a second audio object as a backup for rapid clicks
    const buttonClickSound2 = new Audio('assets/sfx/button-click.wav');
    buttonClickSound2.volume = 0.5; // Set volume to half
    buttonClickSound2.load(); // Preload the audio file
    
    // Track which sound to use
    let useFirstSound = true;
    
    // Add click event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
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
    });
});
