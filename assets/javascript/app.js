const API_KEY = '844b299e4bc040c76b23f3362057e900';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

function loadSearchHistory() {
  // added function to load search history
  const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // added variable to store search history

  savedHistory.forEach((cityName) => {
    // added for each loop to search history
    addToSearchHistory(cityName); // added function to add to search history
  });
}

function saveSearchHistory(cityName) {
  // added function to save search history
  const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // added variable to store search history

  if (!savedHistory.includes(cityName)) {
    savedHistory.push(cityName);
    localStorage.setItem('searchHistory', JSON.stringify(savedHistory));
  }
}

// Load search history from local storage
loadSearchHistory(); // added function to load search history

searchForm.addEventListener('submit', (event) => {
  // added event listener to search form
  event.preventDefault(); // added prevent default
  const cityName = searchInput.value;
  searchWeather(cityName);
  if (!Array.from(searchHistory.children).some((item) => item.textContent === cityName)) {
    addToSearchHistory(cityName);
    saveSearchHistory(cityName);
  }
});

function searchWeather(cityName) {
  // added function to search weather
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`; // added variable to store current weather url
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`; // added variable to store forecast url
  fetch(currentWeatherUrl) // added fetch to current weather url
    .then((response) => response.json())
    .then((data) => displayCurrentWeather(data));

  fetch(forecastUrl) // added fetch to forecast url
    .then((response) => response.json())
    .then((data) => displayForecast(data));
}

function displayCurrentWeather(data) {
  // added function to display current weather
  const { main, name, sys, weather, wind } = data; // added variables to store data
  const date = new Date().toLocaleDateString(); // added variable to store date

  // added innerHTML to display current weather
  currentWeather.innerHTML = ` 
        <div class="weather-card">
        <h3>${name} (${date})</h3>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather icon">
        <p>Temperature: ${main.temp} °F</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} mph</p>
        </div>`;
}

function displayForecast(data) {
  // added function to display forecast
  forecast.innerHTML = '';
  // added for loop to display forecast
  for (let i = 0; i < data.list.length; i += 8) {
    const { dt_txt, main, weather, wind } = data.list[i];
    const date = new Date(data.list[i].dt_txt).toLocaleDateString();

    const forecastCard = `
        <div class="weather-card">
        <h3>${date}</h3>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather icon">
        <p>Temperature: ${main.temp} °F</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} mph</p>
        </div>`;
    forecast.innerHTML += forecastCard;
  }
}

function addToSearchHistory(cityName) {
  // added function to add to search history
  const listItem = document.createElement('li');
  listItem.textContent = cityName;
  listItem.addEventListener('click', () => {
    // added event listener to list item
    searchWeather(cityName); // added function to search weather
  });
  searchHistory.appendChild(listItem); // added list item to search history
}
