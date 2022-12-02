"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let balls = [];
let beta = 0;
let gamma = 0;

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
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

while (balls.length < 100) {
  const radius = random(10, 20);
  const ball = new Ball(
    random(radius, width - radius),
    random(radius, height - radius),
    random(-10, 10),
    random(-10, 10),
    radius,
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
  );
  balls.push(ball);
}

const radius = 50;
let playerBall = new Ball(
  random(radius, width - radius),
  random(radius, height - radius),
  gamma,
  beta,
  radius,
  "#fff"
);

window.addEventListener("deviceorientation", function (event) {
  beta = event.beta / 10;
  gamma = event.gamma / 5;
  playerBall.speedX = gamma;
  playerBall.speedY = beta;
});

function loop() {
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].updateBall();
  }
  playerBall.drawBall();
  playerBall.updateBall("player");

  balls = balls.filter((ball) => {
    return (
      Math.hypot(playerBall.x - ball.x, playerBall.y - ball.y) >=
      playerBall.radius + ball.radius
    );
  });
  requestAnimationFrame(loop);
}

loop();
