const checkBtn = document.querySelector(".search-btn");
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
    .then((data) => updateWeather(data));
}

function updateWeather(data) {
  const cityName = data.name;
  const { temp } = data.main;
  // const icon =

  const weatherHtml = `
  <div class="card">
    <h2 class="city">Weather in ${data.name}</h2>
    <div class="temp">${data}°C</div>
    <img src="" alt="" class="weather-icon" />
    <div class="description">Snow</div>
    <div class="humidity">Humidity: 60%</div>
    <div class="wind">Wind speed: 6.2 km/h</div>
</div>`;

  console.log(temp);
}
