// Format timestamp for display
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Format UNIX timestamp to day abbreviation
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Display 5-day forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="day">
          <div class="forecast-date">${formatDay(forecastDay.time)}</div>
          <img src="${forecastDay.condition.icon_url}" alt="" width="42" />
          <div class="forecast-temp">
            <span class="forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
            <span class="forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
          </div>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

// Get forecast from coordinates
function getForecast(coordinates) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f"; // Your API key
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Update body background based on weather condition
function updateBackground(condition) {
  const body = document.body;
  body.className = ""; // clear previous classes

  condition = condition.toLowerCase();

  if (condition.includes("sun") || condition.includes("clear")) {
    body.classList.add("sunny");
  } else if (
    condition.includes("cloud") ||
    condition.includes("overcast") ||
    condition.includes("fog") ||
    condition.includes("mist")
  ) {
    body.classList.add("cloudy");
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("shower")
  ) {
    body.classList.add("rainy");
  } else if (
    condition.includes("snow") ||
    condition.includes("sleet") ||
    condition.includes("ice")
  ) {
    body.classList.add("snowy");
  } else if (condition.includes("wind") || condition.includes("breeze")) {
    body.classList.add("wind");
  } else if (condition.includes("thunder")) {
    body.classList.add("rainy"); // fallback for thunderstorm
  } else {
    body.classList.add("cloudy"); // default fallback
  }
}

// Refresh weather display with API response data
function refreshWeather(response) {
  let data = response.data;

  // Update city, temperature, icon, description
  document.querySelector("#city").innerHTML = data.city;
  document.querySelector(".weather-app-temperature").innerHTML = Math.round(data.temperature.current);
  document.querySelector("#icon").innerHTML = `<img src="${data.condition.icon_url}" class="weather-app-icon" alt="${data.condition.description}" />`;
  document.querySelector("#description").innerHTML = data.condition.description;
  document.querySelector("#humidity").innerHTML = `${data.temperature.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${data.wind.speed} km/h`;
  document.querySelector("#time").innerHTML = formatDate(data.time * 1000);

  updateBackground(data.condition.description);

  getForecast(data.coordinates);
  saveCityToLocalStorage(data.city);
  updateSearchHistory();
}

// Search city and get current weather
function searchCity(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl)
    .then(refreshWeather)
    .catch(() => alert("City not found, please try again."));
}

// Save searched city in localStorage (avoid duplicates)
function saveCityToLocalStorage(city) {
  let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("searchedCities", JSON.stringify(cities));
  }
}

// Update search history display
function updateSearchHistory() {
  let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  let historyElement = document.querySelector("#search-history");

  if (!historyElement) return;

  // Clear existing
  historyElement.innerHTML = "";

  // Create buttons horizontally
  cities.forEach(function(city) {
    let button = document.createElement("button");
    button.classList.add("history-btn");
    button.textContent = city;
    button.addEventListener("click", function() {
      searchCity(city);
    });
    historyElement.appendChild(button);
  });
}

// Handle search form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value.trim();
  if (city) {
    searchCity(city);
    document.querySelector("#search-form-input").value = ""; // clear input
  }
}

// Attach event listener for form submit
document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);

// Load search history on page load
updateSearchHistory();

// Default city to load initially
searchCity("London");



