const API_KEY = '844b299e4bc040c76b23f3362057e900';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityName = searchInput.value;
  searchWeather(cityName);
  addToSearchHistory(cityName);
});

function searchWeather(cityName) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => displayCurrentWeather(data));

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => displayForecast(data));
}

function displayCurrentWeather(data) {
  const { main, name, sys, weather, wind } = data;
  const date = new Date().toLocaleDateString();

  currentWeather.innerHTML = `
        <div class="weather-card">
        <h3>${name} (${date})</h3>
        <img src="https://openweathermap.org/img/w/${weather[0].icon}.png" alt="Weather icon">
        <p>Temperature: ${main.temp} °F</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} MPH</p>
        </div>`;
}
