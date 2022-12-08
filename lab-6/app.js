"use strict";

const playBtn = document.querySelector(".btn-play");
const highscore = document.querySelector(".highscore");
const menu = document.querySelector(".menu");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const ballsAmount = 1;

const times = [];
const timeDiff = [];

let balls = [];
let playerBall;

let beta = 0;
let gamma = 0;

let isPlaying = true;

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

class Ball {
  constructor(x, y, speedX, speedY, radius, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
  }

  drawBall() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  updateBall(type = "normal") {
    if (type === "normal") {
      if (this.x + this.radius >= width || this.x - this.radius <= 0) {
        this.speedX = -this.speedX;
      }

      if (this.y + this.radius >= height || this.y - this.radius <= 0) {
        this.speedY = -this.speedY;
      }

      this.x += this.speedX;
      this.y += this.speedY;
    } else {
      if (this.x + this.speedX >= width || this.x + this.speedX <= 0) {
        this.speedX = 0;
      }
      if (this.y + this.speedY >= height || this.y + this.speedY <= 0) {
        this.speedY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  removeBallFromArr() {
    balls = balls.filter((ball) => {
      return (
        Math.hypot(playerBall.x - ball.x, playerBall.y - ball.y) >=
        playerBall.radius + ball.radius
      );
    });
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  isPlaying = true;
  times[0] = Date.now();
  while (balls.length < ballsAmount) {
    const radius = random(10, 20);
    const ball = new Ball(
      random(radius, width - radius),
      random(radius, height - radius),
      random(-1, 1),
      random(-1, 1),
      radius,
      `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
    );
    balls.push(ball);
  }

  const radius = 50;
  playerBall = new Ball(
    random(radius, width - radius),
    random(radius, height - radius),
    gamma,
    beta,
    radius,
    "#fff"
  );

  loop();
}

window.addEventListener("deviceorientation", function (event) {
  beta = event.beta / 5;
  gamma = event.gamma / 5;
  playerBall.speedX = gamma;
  playerBall.speedY = beta;
});

function loop() {
  ctx.fillStyle = "bisque";
  ctx.fillRect(0, 0, width, height);

  if (balls.length === 0) {
    isPlaying = false;
    times[1] = Date.now();
    timeDiff.push((times[1] - times[0]) / 1000);
    setHighscore(Math.min(...timeDiff));
  }

  isPlaying ? (menu.style.display = "none") : (menu.style.display = "flex");

  if (!isPlaying) return;

  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].updateBall();
    balls[i].removeBallFromArr();
  }
  playerBall.drawBall();
  playerBall.updateBall("player");

  requestAnimationFrame(loop);
}

function setHighscore(time) {
  const minutes = `${Math.floor(time / 60)}`.padStart(2, 0);
  const seconds = `${Math.floor(time - minutes * 60)}`.padStart(2, 0);
  highscore.textContent = `${minutes}:${seconds}`;
}

playBtn.addEventListener("click", startGame);
