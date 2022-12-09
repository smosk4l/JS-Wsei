"use strict";

import { Ball, ctx, width, height } from "./ball.js";

const playBtn = document.querySelector(".btn-play");
const highscore = document.querySelector(".highscore");
const menu = document.querySelector(".menu");

const ballsAmount = 100;
console.log(ballsAmount);
const times = [];
const timeDiff = [];

let balls = [];
let playerBall;

let beta = 0;
let gamma = 0;

let isPlaying = true;

function removeBallFromArr() {
  balls = balls.filter((ball) => {
    return (
      Math.hypot(playerBall.x - ball.x, playerBall.y - ball.y) >=
      playerBall.radius + ball.radius
    );
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  isPlaying = true;
  times[0] = Date.now();

  createHoles();
  createPlayerBall();

  loop();
}

function createHoles() {
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
}

function drawAndUpdateHoles() {
  balls.forEach((ball) => {
    ball.drawBall();
    ball.updateBall();
  });
}

function createPlayerBall() {
  const radius = 50;

  playerBall = new Ball(
    random(radius, width - radius),
    random(radius, height - radius),
    gamma,
    beta,
    radius,
    "#fff"
  );
}
window.addEventListener("deviceorientation", setPlayerBallSpeed);

function setPlayerBallSpeed(event) {
  beta = event.beta / 5;
  gamma = event.gamma / 5;
  playerBall.speedX = gamma;
  playerBall.speedY = beta;
}

function loop() {
  clearBackground();
  checkIfGameOver();

  if (!isPlaying) return;

  drawAndUpdateHoles();
  removeBallFromArr();

  playerBall.drawBall();
  playerBall.updateBall("player");
  requestAnimationFrame(loop);
}

function clearBackground() {
  ctx.fillStyle = "bisque";
  ctx.fillRect(0, 0, width, height);
}

function setHighscore(time) {
  const minutes = `${Math.floor(time / 60)}`.padStart(2, 0);
  const seconds = `${Math.floor(time - minutes * 60)}`.padStart(2, 0);
  highscore.textContent = `${minutes}:${seconds}`;
}

function checkIfGameOver() {
  if (balls.length === 0) {
    times[1] = Date.now();
    timeDiff.push((times[1] - times[0]) / 1000);
    setHighscore(Math.min(...timeDiff));
    menu.style.display = "flex";
    isPlaying = false;
    return;
  } else {
    menu.style.display = "none";
    return;
  }
}
playBtn.addEventListener("click", startGame);
