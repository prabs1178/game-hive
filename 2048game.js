let score = 0;
const grid = [];
const gridElement = document.getElementById("grid");

function createGrid() {
    gridElement.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = "";
        grid.push(tile);
        gridElement.appendChild(tile);
    }
}

function generateTile() {
    const emptyTiles = grid.filter(tile => tile.textContent === "");
    if (emptyTiles.length === 0) return;
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.textContent = Math.random() < 0.9 ? 2 : 4;
    updateTileColor(randomTile);
}

function updateTileColor(tile) {
    const value = parseInt(tile.textContent) || 0;
    tile.style.backgroundColor = `hsl(${Math.log2(value) * 40}, 70%, 50%)`;
}

function startGame() {
    score = 0;
    document.getElementById("score").textContent = "Score: 0";
    grid.length = 0;
    createGrid();
    generateTile();
    generateTile();
}

document.addEventListener("keydown", handleKey);

function handleKey(event) {
    // Movement logic can be implemented here (left, right, up, down)
    // This is a basic version — can be expanded later.
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" ||
        event.key === "ArrowUp" || event.key === "ArrowDown") {
        generateTile(); // Simulate move for now
    }
}


// Add a new box with highlight effect
function addNewBox() {
    const gameContainer = document.querySelector('.game-container');
    const newBox = document.createElement('div');
    newBox.classList.add('box', 'new-box'); // Add box and new-box classes
    newBox.innerText = '2'; // Example value, you can change this dynamically
    gameContainer.appendChild(newBox);
  
    // Remove the 'new-box' class after animation for smooth transition
    setTimeout(() => {
      newBox.classList.remove('new-box');
    }, 300); // Duration of transition
  }
  
  // Call this function to add new boxes to the game grid
  addNewBox(); // Example of adding a box
  addNewBox(); // Another example
  