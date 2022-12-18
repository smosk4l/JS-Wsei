const checkBtn = document.querySelector(".weather-btn");
const cityInput = document.querySelector(".weather-input");

const apiKey = "1a42eb189c06352349faade92b23e721";

checkBtn.addEventListener("click", checkWeather);
function checkWeather() {
  const city = cityInput.value;
  cityInput.value = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) console.log(data);
    });
}
