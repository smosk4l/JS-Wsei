const apiKey = "1a42eb189c06352349faade92b23e721";
const city = "Cracow";

console.log(
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
);
