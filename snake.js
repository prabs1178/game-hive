const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');

const boardSize = 20;
let snake = [];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;
let highScore = 0;
let gameInterval;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

function drawSnake() {
  board.querySelectorAll('.cell').forEach(cell => cell.classList.remove('snake', 'snake-head'));
  snake.forEach((segment, index) => {
    const cell = board.children[segment.y * boardSize + segment.x];
    cell.classList.add('snake');
    if (index === 0) cell.classList.add('snake-head');
  });
}

function drawFood() {
  board.querySelectorAll('.cell').forEach(cell => cell.classList.remove('food'));
  const cell = board.children[food.y * boardSize + food.x];
  cell.classList.add('food');
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };

  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  } else {
    drawFood();
  }
}

function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (
    newHead.x < 0 || newHead.x >= boardSize ||
    newHead.y < 0 || newHead.y >= boardSize ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreDisplay.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
    placeFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function endGame() {
  clearInterval(gameInterval);
  alert("Game Over! 🐍");
}

function gameLoop() {
  moveSnake();
}

function startGame() {
  clearInterval(gameInterval);
  createBoard();
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  drawSnake();
  placeFood();
  gameInterval = setInterval(gameLoop, 200);
}

function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

startBtn.addEventListener('click', startGame);
window.addEventListener('keydown', changeDirection);