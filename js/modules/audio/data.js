const AUDIO_DATA = {
    // Sound definitions with all properties grouped by sound type
    BUTTON_CLICK: {
        path: 'assets/sfx/button-click.wav',
        volume: 0.3,
        poolSize: 5  // Increased from 2 to 5 for better handling of rapid clicks
    },
    
    CASH: {
        path: 'assets/sfx/cash.wav',
        volume: 0.2,
        poolSize: 2
    }
}; 