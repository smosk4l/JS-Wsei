"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];

drawCircles();
function drawCircles() {
  while (circles.length < 100) {
    const circle = {
      width: Math.floor(Math.random() * canvas.width),
      height: Math.floor(Math.random() * canvas.height),
      radious: 6,
    };

    let isOverlapping = false;
    for (let i = 0; i < circles.length; i++) {
      const previousCircle = circles[i];
      const distance = Math.hypot(
        circle.width - previousCircle.width,
        circle.height - previousCircle.height
      );

      if (distance < circle.radious + previousCircle.radious) {
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
      circles[i].radious,
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

// function animate() {
//   //    console.log(Date.now())
//   // requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate);
