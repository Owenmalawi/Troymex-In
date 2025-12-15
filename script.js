let tiles = [];
let paused = false;

function initGame() {
  tiles = [1,2,3,4,5,6,7,8,null];
  shuffleTiles();
  renderBoard();
  document.getElementById("status").textContent =
    "Arrange numbers from 1 to 8";
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (value === null) {
      tile.classList.add("empty");
    } else {
      tile.textContent = value;
      tile.onclick = () => moveTile(index);
    }

    board.appendChild(tile);
  });
}

function moveTile(index) {
  if (paused) return;

  const emptyIndex = tiles.indexOf(null);
  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 3,
    emptyIndex + 3
  ];

  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] =
    [tiles[index], tiles[emptyIndex]];
    renderBoard();
    checkWin();
  }
}

function checkWin() {
  const win = [1,2,3,4,5,6,7,8,null];
  for (let i = 0; i < win.length; i++) {
    if (tiles[i] !== win[i]) return;
  }
  document.getElementById("status").textContent = "🎉 You Win!";
}

function restartGame() {
  paused = false;
  initGame();
}

function togglePause() {
  paused = !paused;
  document.getElementById("status").textContent =
    paused ? "Game Paused" : "Game Resumed";
}

function goBack() {
  alert("Back button pressed");
}

initGame();
