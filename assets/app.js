let canvas, ctx, w, h;

const ballArray = [];

let ballSpeed = false;

let numBalls = document.querySelector("#numBalls").value;
let playerColor = document.querySelector("#colorChoose").value;
let targetColor = document.querySelector("#targetColor").value;
let ballSpeedFactor = document.querySelector("#ballSpeedFactor").value;
console.log(`Initial setting:
Numbers of balls: ${numBalls}
Player color: ${playerColor}
Target color: ${targetColor}
Speed Factor: ${ballSpeedFactor}`);

let life = 10;

const player = {
  x: 10,
  y: 10,
  width: 10,
  height: 10,
  color: "black",
};

window.onload = function init() {
  // Draw the canvas
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  // Once window load complete, trigger below preparations.
  drawPlayer(player);
  createBallArray(numBalls);
  drawBalls(ballArray);

  // Track player with mouse move
  canvas.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
  });
};

// Draw the player according to control panel info (color)
const drawPlayer = (player) => {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.fillStyle = player.color;
  ctx.fillRect(0, 0, player.width, player.height);
  ctx.restore();
};

// Draw the balls
// a. Create balls array
const getRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow", "pink"];
  let color = colors[this.Math.floor(Math.random() * colors.length)];
  console.log(`Colors picked: ${color}`);
  return color;
};

const createBallArray = (numBalls) => {
  for (let i = 0; i < numBalls; i++) {
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 5 + 30 * this.Math.random(),
      speedX: 0,
      speedY: 0,
      color: getRandomColor(),
    };
    ballArray.push(ball);
  }
  console.log(`Ball array: ${ballArray}`);
  return ballArray;
};

// b. Draw balls
const drawBalls = (ballArray) => {
  ballArray.forEach((ball) => {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(0, 0, ball.radius, 0, 2 * this.Math.PI);
    ctx.fill();
    ctx.restore();
  });
};

// c1. Give balls speed
const giveBallsSpeed = (ballArray) => {
  if (!ballSpeed) {
    ballArray.forEach((ball) => {
      ball.speedX = -5 + 10 * this.Math.random();
      ball.speedY = -5 + 10 * this.Math.random();
    });
  }
};

// c2. Stop balls
const removeBallsSpeed = (ballArray) => {
  if (ballSpeed) {
    ballArray.forEach((ball) => {
      ball.speedX = 0;
      ball.speedY = 0;
    });
  }
};

// d. Move ball function
const moveBalls = (ballArray) => {
  ballArray.forEach((ball) => {
    ball.x += ball.speedX * ballSpeedFactor;
    ball.y += ball.speedY * ballSpeedFactor;
    checkCollisionToWall(ball);
    // checkCollisionToPlayer(ball);
  });
};

// e1. Check collision of balls and walls
const checkCollisionToWall = (ball) => {
  if (ball.x + ball.radius > w) {
    ball.speedX = -ball.speedX;
    ball.x = w - ball.radius;
  }
  if (ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
    ball.x = ball.radius;
  }
  if (ball.y + ball.radius > h) {
    ball.speedY = -ball.speedY;
    ball.y = h - ball.radius;
  }
  if (ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
    ball.y = ball.radius;
  }
};

// e2. Check the collision of player and balls
const circRectOverLap = (x0, y0, w0, h0, cx, cy, r) => {
  let testX = cx;
  let testY = cy;
  if (testX < x0) {
    textX = x0;
  }
  if (testX > x0 + w0) {
    textX = x0 + w0;
  }
  if (testY < y0) {
    textY = y0;
  }
  if (testX > y0 + h0) {
    textY = y0 + h0;
  }
  return (cx - testX) * (cx - testX) + (cy - testY) * (cy - testY) < r * r;
};

const checkCollisionToPlayer = (ball, index) => {
  if (
    circRectOverLap(
      player.x,
      player.y,
      player.width,
      player.height,
      ball.x,
      ball.y,
      ball.radius
    )
  ) {
    if (ball.color !== targetColor) {
      life--;
    }
    ballArray.splice(index, 1);
  }
};

// Main loop
const mainLoop = () => {
  ctx.clearRect(0, 0, w, h);
  drawPlayer(player);
  drawBalls(ballArray);
  moveBalls(ballArray);
  this.requestAnimationFrame(mainLoop);
};

// Start game
const startGame = () => {
  giveBallsSpeed(ballArray);
  ballSpeed = true;
  mainLoop();
};

// Stop game
const stopGame = () => {
  removeBallsSpeed(ballArray);
  ballSpeed = false;
};

// Check win

// Track control panel setting
const setNumbersOfBalls = (numBalls) => {
  numBalls = numBalls;
  console.log(`Numbers of balls: ${numBalls}`);
};

const setPlayerColor = (playerColor) => {
  player.color = playerColor;
  console.log(`Player color: ${playerColor}`);
};

const setTargetColor = (targetColor) => {
  targetColor = targetColor;
  console.log(`Target color: ${targetColor}`);
};

const setBallSpeed = (ballSpeedFactor) => {
  ballSpeedFactor = ballSpeedFactor;
  console.log(`Speed Factor: ${ballSpeedFactor}`);
};

// Reset game
const resetGame = () => {
  ballArray = [];
  ballSpeedX = 0;
  ballSpeedY = 0;
  life = 10;
};
