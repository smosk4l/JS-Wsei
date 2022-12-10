"use strict";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

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

  updateBall() {
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.speedY = -this.speedY;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}
export { Ball, canvas, ctx, width, height };
