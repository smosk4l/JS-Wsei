"use strict";

import { Ball, ctx, width, height } from "./ball.js";

export default class PlayerBall extends Ball {
  constructor(x, y, speedX, speedY, radius, color) {
    super(x, y, speedX, speedY, radius, color);
  }

  updateBall() {
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
