"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];

drawCircles();
function drawCircles() {
  for (let i = 0; i < 100; i++) {
    const circle = {
      width: Math.random() * canvas.width,
      height: Math.random() * canvas.height,
      radious: 12,
    };

    circles.push(circle);
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

// window.addEventListener("deviceorientation", onDeviceMove);

// function onDeviceMove(event) {
//   console.log(event);
// }

// function animate() {
//   //    console.log(Date.now())
//   // requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate);
