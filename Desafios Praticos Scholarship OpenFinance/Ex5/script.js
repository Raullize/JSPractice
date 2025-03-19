// Snake Game for Node.js
const readline = require('readline');

// Terminal configuration to capture keystrokes
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Terminal colors
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m"
};

// Game settings
const width = 40;
const height = 20;
const initialSpeed = 200; // Milliseconds between each movement

// Visual representation characters - using double blocks to maintain proportion
const graphics = {
  snake: {
    head: '██',
    body: '██', 
    tail: '██'  
  },
  food: '●●',
  empty: '  ',
  border: {
    horizontal: '══',
    vertical: '║',
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝'
  }
};

// Game states
let snake = [{ x: 5, y: 5 }]; // Start position
let direction = 'right';
let food = generateFood();
let score = 0;
let gameOver = false;
let gameInterval;

// Generates food at a random position that doesn't collide with the snake
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (width/2)),
      y: Math.floor(Math.random() * height)
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

// Draws the game on the console
function draw() {
  console.clear();
  console.log(`${colors.bright}${colors.yellow}Score: ${score}${colors.reset}`);
  
  // Creates the game board
  let gameBoard = Array(height).fill().map(() => Array(width/2).fill(graphics.empty));
  
  // Adds the food
  gameBoard[food.y][food.x] = `${colors.red}${graphics.food}${colors.reset}`;
  
  // Adds the snake
  snake.forEach((segment, index) => {
    // Checks if the position is within the field limits
    if (segment.y >= 0 && segment.y < height && segment.x >= 0 && segment.x < width/2) {
      if (index === 0) {
        // Snake head
        gameBoard[segment.y][segment.x] = `${colors.bright}${colors.green}${graphics.snake.head}${colors.reset}`;
      } else {
        // Snake body
        const bodyColor = index % 2 === 0 ? colors.green : colors.cyan;
        gameBoard[segment.y][segment.x] = `${bodyColor}${graphics.snake.body}${colors.reset}`;
      }
    }
  });
  
  // Draws the borders and content
  const horizontalBorder = `${graphics.border.horizontal.repeat(width/2)}`;
  console.log(`${colors.yellow}${graphics.border.topLeft}${horizontalBorder}${graphics.border.topRight}${colors.reset}`);
  gameBoard.forEach(row => {
    console.log(`${colors.yellow}${graphics.border.vertical}${colors.reset}${row.join('')}${colors.yellow}${graphics.border.vertical}${colors.reset}`);
  });
  console.log(`${colors.yellow}${graphics.border.bottomLeft}${horizontalBorder}${graphics.border.bottomRight}${colors.reset}`);
  
  if (gameOver) {
    console.log(`${colors.bright}${colors.red}Game Over!${colors.reset} Press R to restart or Q to quit.`);
  } else {
    console.log(`Use ${colors.bright}W/A/S/D${colors.reset} or arrow keys to move. ${colors.bright}Q${colors.reset} to quit.`);
  }
}

// Updates the game state
function update() {
  if (gameOver) return;
  
  // Creates the new head based on the current direction
  const head = {...snake[0]};
  
  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }
  
  // Checks collision with walls
  if (head.x < 0 || head.x >= width/2 || head.y < 0 || head.y >= height) {
    gameOver = true;
    return;
  }
  
  // Checks collision with its own body
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    return;
  }
  
  // Adds the new head
  snake.unshift(head);
  
  // Checks if it ate the food
  if (head.x === food.x && head.y === food.y) {
    // Increases the score and generates new food
    score += 10;
    food = generateFood();
    
    // Increases speed every 50 points
    if (score % 50 === 0) {
      clearInterval(gameInterval);
      const newSpeed = Math.max(initialSpeed - (score / 10), 50); // Limits minimum speed
      gameInterval = setInterval(gameLoop, newSpeed);
    }
  } else {
    // If it didn't eat, removes the last segment
    snake.pop();
  }
}

// Main game loop
function gameLoop() {
  update();
  draw();
}

// Starts the game
function startGame() {
  // Starts with a snake of size 3 for better visualization
  snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ];
  direction = 'right';
  food = generateFood();
  score = 0;
  gameOver = false;
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, initialSpeed);
  draw();
}

// Captures keyboard input
process.stdin.on('keypress', (str, key) => {
  // Exit game with Q or Ctrl+C
  if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    process.exit();
  }
  
  // Restart game
  if (gameOver && key.name === 'r') {
    startGame();
    return;
  }
  
  // Direction controls
  if (!gameOver) {
    switch (key.name) {
      case 'w':
      case 'up':
        if (direction !== 'down') direction = 'up';
        break;
      case 'a':
      case 'left':
        if (direction !== 'right') direction = 'left';
        break;
      case 's':
      case 'down':
        if (direction !== 'up') direction = 'down';
        break;
      case 'd':
      case 'right':
        if (direction !== 'left') direction = 'right';
        break;
    }
  }
});

console.log(`${colors.bright}${colors.green}Snake Game starting...${colors.reset}`);
console.log(`Use ${colors.bright}W/A/S/D${colors.reset} or arrow keys to move. ${colors.bright}Q${colors.reset} to quit.`);
setTimeout(startGame, 1000); // Starts the game after 1 second 