function refreshWeather(response) {
  let temperatureElement = document.querySelector(".weather-app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  getForecast(response.data.city);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[now.getMonth()];

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `${day} ${date} ${month} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  updateBackground(description.toLowerCase());
}

// Update background based on weather condition
function updateBackground(condition) {
  const body = document.body;
  body.className = ""; // clear previous classes

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
  } else if (condition.includes("thunder")) {
    body.classList.add("thunderstorm");
  } else if (condition.includes("wind")) {
    body.classList.add("wind");
  } else {
    body.classList.add("default-background");
  }
}

// Save searched cities to localStorage
function saveCityToLocalStorage(city) {
  let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("searchedCities", JSON.stringify(cities));
    updateSearchHistory();
  }
}

// Update search history buttons
function updateSearchHistory() {
  let cities = JSON.parse(localStorage.getItem("searchedCities")) || [];
  let historyElement = document.querySelector("#search-history");

  if (!historyElement) return;

  let html = "";
  cities.forEach(function (city) {
    html += `<li><button class="history-btn">${city}</button></li>`;
  });

  historyElement.innerHTML = html;

  let buttons = document.querySelectorAll(".history-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      searchCity(button.innerText);
    });
  });
}

// Search city current weather API call with basic error handling
function searchCity(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  

  document.querySelector("#loading-message").style.display ="inline"; 
  document.querySelector("#error-message").innerHTML= "";
  document.querySelector(".search-form-button").disabled = true;
  
  axios.get(apiUrl)
    .then(refreshWeather)
    .catch(() => {
      document.querySelector("#error-message").innerHTML =
      "Sorry, we couldn't find that city. Please try again.";
    })

    .finally(()=> {
      document.querySelector("#loading-message").style.display = "none";
      document.querySelector(".search-form-button").disabled = false;
    });

  saveCityToLocalStorage(city);
  }


// Handle form submit
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  let city = searchInputElement.value.trim();
  if (city) {
    searchCity(city);
  }
}

// Format UNIX timestamp to day string
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Get 5-day forecast API call
function getForecast(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
}

// Display forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-item">
          <div class="day">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
          <div class="temp">
            <span class="weather-forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
            <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

// Init
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

updateSearchHistory();
searchCity("London");




