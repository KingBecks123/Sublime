// Create entry arrays from the content object
const journalEntries = Object.keys(LORE_CONTENT.journal).map(id => ({
    id: id,
    title: LORE_CONTENT.journal[id].title
}));

const letterEntries = Object.keys(LORE_CONTENT.letters).map(id => ({
    id: id,
    title: LORE_CONTENT.letters[id].title
}));

// ==================== CORE FUNCTIONS ====================

// Initialize lore data in game state
function initLoreData() {
    if (!gameData.loreDiscovered) {
        gameData.loreDiscovered = { journal: {}, letters: {} };
        gameData.totalLoreFound = 0;
    }
}

// Check if any pages have been discovered
function hasDiscoveredAnyPages() {
    initLoreData();
    for (let id in gameData.loreDiscovered.journal) {
        if (gameData.loreDiscovered.journal[id]) return true;
    }
    for (let id in gameData.loreDiscovered.letters) {
        if (gameData.loreDiscovered.letters[id]) return true;
    }
    return false;
}

// Random chance to discover a lore entry (called during lime collection)
function checkForLoreDiscovery() {
    if (Math.random() < 1/512) {
        discoverRandomLoreEntry();
        return true;
    }
    return false;
}

// Discover a random undiscovered lore entry
function discoverRandomLoreEntry() {
    initLoreData();
    
    // Get all undiscovered entries
    const undiscoveredJournals = journalEntries.filter(entry => !gameData.loreDiscovered.journal[entry.id]);
    const undiscoveredLetters = letterEntries.filter(entry => !gameData.loreDiscovered.letters[entry.id]);
    const undiscoveredLore = [...undiscoveredJournals, ...undiscoveredLetters];
    
    if (undiscoveredLore.length === 0) return false;
    
    // Select and mark a random entry as discovered
    const entry = undiscoveredLore[Math.floor(Math.random() * undiscoveredLore.length)];
    const isJournal = undiscoveredJournals.includes(entry);
    
    if (isJournal) {
        gameData.loreDiscovered.journal[entry.id] = true;
    } else {
        gameData.loreDiscovered.letters[entry.id] = true;
    }
    
    gameData.totalLoreFound++;
    update("newInfo", `You discovered a new page: "${entry.title}"`);
    
    showPagesButton();
    return true;
}

// Discover a specific lore entry
function discoverSpecificLoreEntry(category, id) {
    initLoreData();
    
    if (!LORE_CONTENT[category] || !LORE_CONTENT[category][id]) {
        console.error(`Entry not found: ${category}/${id}`);
        return false;
    }
    
    // Check if already discovered
    if (gameData.loreDiscovered[category][id]) return false;
    
    // Mark as discovered
    gameData.loreDiscovered[category][id] = true;
    gameData.totalLoreFound++;
    
    update("newInfo", `You discovered a new page: "${LORE_CONTENT[category][id].title}"`);
    showPagesButton()
    
    return true;
}

// ==================== UI FUNCTIONS ====================

// Create the UI for the lore system
function createLoreUI() {
    if (hasDiscoveredAnyPages()) showPagesButton();
    createLorePanel();
}

// Create and show the Pages button
function showPagesButton() {
    if (document.getElementById("pagesButton")) return;
    
    const container = document.querySelector('#newInfoBox div');
    if (!container) return;
    
    const button = document.createElement("button");
    button.id = "pagesButton";
    button.textContent = "Pages";
    button.style.background = "lightgray";
    button.style.width = "150px";
    button.style.height = "30px";
    button.style.backgroundColor = "#b55088";
    button.onclick = toggleLorePanel;
    
    container.appendChild(document.createElement("br"));
    container.appendChild(button);
}

// Create the lore panel (initially hidden)
function createLorePanel() {
    const panel = document.createElement("div");
    panel.id = "lorePanel";
    panel.className = "basicDiv";
    panel.style.display = "none";
    panel.style.position = "fixed";
    panel.style.top = "100px";
    panel.style.left = "50%";
    panel.style.transform = "translateX(-50%)";
    panel.style.width = "600px";
    panel.style.height = "400px";
    panel.style.backgroundColor = "#222222";
    panel.style.color = "#ffffff";
    panel.style.padding = "10px";
    panel.style.zIndex = "999";
    panel.style.overflowY = "auto";
    panel.style.border = "2px solid #000000";
    
    // Tabs for journal and letters
    const tabs = document.createElement("div");
    tabs.style.display = "flex";
    tabs.style.marginBottom = "10px";
    
    const journalTab = document.createElement("button");
    journalTab.textContent = "Journal Entries";
    journalTab.className = "specialButton loreTab";
    journalTab.style.backgroundColor = "#4DFE89";
    journalTab.onclick = () => showLoreCategory("journal");
    
    const lettersTab = document.createElement("button");
    lettersTab.textContent = "Letters";
    lettersTab.className = "specialButton loreTab";
    lettersTab.style.backgroundColor = "#733e39";
    lettersTab.onclick = () => showLoreCategory("letters");;
    
    tabs.appendChild(journalTab);
    tabs.appendChild(lettersTab);
    panel.appendChild(tabs);
    
    // Content area
    const content = document.createElement("div");
    content.id = "loreContent";
    content.style.backgroundColor = "#3C3C3C";
    content.style.padding = "10px";
    content.style.height = "300px";
    content.style.overflowY = "auto";
    panel.appendChild(content);
    
    document.body.appendChild(panel);
}

// Toggle panel visibility
function toggleLorePanel() {
    const panel = document.getElementById("lorePanel");
    if (panel.style.display === "none") {
        panel.style.display = "block";
        showLoreCategory("journal");
    } else {
        panel.style.display = "none";
    }
}

// Show lore entries by category
function showLoreCategory(category) {
    initLoreData();
    
    // Highlight the active tab
    const tabs = document.getElementsByClassName("loreTab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.backgroundColor = "#DEAD85";
    }
    tabs[category === "journal" ? 0 : 1].style.backgroundColor = "#C67848";
    
    // Set up content area
    const contentArea = document.getElementById("loreContent");
    contentArea.innerHTML = "";
    
    // Show discovered entries
    const entries = category === "journal" ? journalEntries : letterEntries;
    const discovered = gameData.loreDiscovered[category];
    let foundAny = false;
    
    entries.forEach(entry => {
        if (discovered[entry.id]) {
            foundAny = true;
            
            const element = document.createElement("div");
            element.className = "loreEntry";
            element.style.marginBottom = "10px";
            element.style.cursor = "pointer";
            element.style.padding = "5px";
            element.style.backgroundColor = "#222222";
            
            const entryTitle = document.createElement("p");
            entryTitle.textContent = entry.title;
            entryTitle.style.margin = "0 0 5px 0";
            entryTitle.style.color = "#222222";
            
            element.appendChild(entryTitle);
            element.onclick = () => loadLoreContent(category, entry.id);
            
            contentArea.appendChild(element);
        }
    });
    
    if (!foundAny) {
        const noEntries = document.createElement("p");
        noEntries.textContent = `No ${category} entries discovered yet.`;
        noEntries.style.color = "#c0cbdc";
        contentArea.appendChild(noEntries);
    }
}

// Load and display lore content
function loadLoreContent(category, id) {
    const contentArea = document.getElementById("loreContent");
    contentArea.innerHTML = "";
    
    // Back button
    const backBtn = document.createElement("button");
    backBtn.textContent = "← Back";
    backBtn.className = "specialButton";
    backBtn.style.marginBottom = "10px";
    backBtn.style.backgroundColor = "#733e39";
    backBtn.onclick = () => showLoreCategory(category);
    contentArea.appendChild(backBtn);
    
    // Content container
    const textContainer = document.createElement("div");
    textContainer.style.backgroundColor = "#B55088";
    textContainer.style.padding = "10px";
    textContainer.style.color = "#222222";
    textContainer.style.whiteSpace = "pre-wrap";
    textContainer.style.textAlign = "left";
    
    // Get content from LORE_CONTENT
    textContainer.textContent = LORE_CONTENT[category]?.[id]?.content || 
                               `Content not found for ${category}/${id}`;
    
    contentArea.appendChild(textContainer);
}

// ==================== HOOKS AND INTEGRATION ====================

// Hook into map purchases to auto-discover first journal entry
function hookMapPurchase() {
    const originalBuy = window.basicBuy;
    window.basicBuy = function(id, price) {
        originalBuy(id, price);
        if (id === 'maps' && gameData.maps === 1) {
            discoverSpecificLoreEntry('journal', 'mother-tree');
        }
    };
}

// Hook into lime collection to check for lore discovery
function hookLimeCollection() {
    // Manual collection
    const originalCollect = window.getLimesButton;
    window.getLimesButton = function() {
        originalCollect();
        checkForLoreDiscovery();
    };
    
    // Auto collection
    if (window.autoCollectingBar) {
        const originalAuto = window.autoCollectingBar;
        window.autoCollectingBar = function() {
            originalAuto();
            if (gameData.autoCollectingBar % 20 === 0) {
                checkForLoreDiscovery();
            }
        };
    }
}

// Make lore persist through travels
function hookTravel() {
    const originalTravel = window.travelToNextVillage;
    if (originalTravel) {
        window.travelToNextVillage = function() {
            // Save lore data before travel
            const loreData = {
                loreDiscovered: gameData.loreDiscovered,
                totalLoreFound: gameData.totalLoreFound
            };
            
            originalTravel();
            
            // Restore lore data after travel
            gameData.loreDiscovered = loreData.loreDiscovered;
            gameData.totalLoreFound = loreData.totalLoreFound;
            
            if (hasDiscoveredAnyPages()) showPagesButton();
        };
    }
}

// Add CSS for lore system
function addLoreStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .loreEntry:hover {
            background-color: #686868 !important;
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZATION ====================

// Initialize the lore system
function initLoreSystem() {
    initLoreData();
    createLoreUI();
    hookLimeCollection();
    hookMapPurchase();
    hookTravel();
    addLoreStyles();
    
    // Auto-discover first journal if map already purchased
    if (gameData.maps >= 1 && !gameData.loreDiscovered.journal["mother-tree"]) {
        discoverSpecificLoreEntry('journal', 'mother-tree');
    }
}

// Start the lore system when the game loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initLoreSystem, 100);
}); 