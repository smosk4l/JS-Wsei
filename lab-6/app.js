"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  draw(mouse.x, mouse.y, 12);
});

function draw(x, y, radius) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// drawCircles();
function drawCircles() {
  while (circles.length < 100) {
    const circle = {
      width: Math.floor(Math.random() * canvas.width),
      height: Math.floor(Math.random() * canvas.height),
      radius: 6,
    };

    let isOverlapping = false;
    for (let i = 0; i < circles.length; i++) {
      const previousCircle = circles[i];
      const distance = Math.hypot(
        circle.width - previousCircle.width,
        circle.height - previousCircle.height
      );

      if (distance < circle.radius + previousCircle.radius) {
        isOverlapping = true;
        break;
      }
    }

    if (!isOverlapping) {
      circles.push(circle);
    }
  }

  for (let i = 0; i < circles.length; i++) {
    ctx.beginPath();
    ctx.arc(
      circles[i].width,
      circles[i].height,
      circles[i].radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
window.addEventListener("deviceorientation", onDeviceMove);

function onDeviceMove(event) {
  console.log(event);
}

// requestAnimationFrame(animate);
