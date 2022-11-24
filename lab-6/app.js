"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const circles = [];

drawCircles();
function drawCircles() {
  while (circles.length < 250) {
    const circle = {
      width: Math.floor(Math.random() * canvas.width),
      height: Math.floor(Math.random() * canvas.height),
      radious: 12,
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
  // for (let i = 0; i < circles.length; i++) {
  //   if (i > 0) {
  //     const d = getDistance(
  //       circles[i - 1].width,
  //       circles[i - 1].height,
  //       circles[i].width,
  //       circles[i].height
  //     );
  //     if (d > circles[0].radious / 2) {
  // ctx.beginPath();
  // ctx.arc(
  //   circles[i].width,
  //   circles[i].height,
  //   circles[i].radious,
  //   0,
  //   Math.PI * 2
  // );
  // ctx.fill();
  //     }
  //   }
  // }
}
function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
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
