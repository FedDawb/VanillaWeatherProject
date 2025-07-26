// --- Globals and API Key ---
const apiKey = "o0a2463t2b18434d0f0333a9a4a174f1";

// Store the full forecast data to switch between days
let fullForecastData = [];
// Store the current unit ('metric' for Celsius, 'imperial' for Fahrenheit)
let currentUnit = 'metric';

// --- DOM Element Selectors ---
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-form-input");
const cityElement = document.querySelector("#city");
const timeElement = document.querySelector("#time");
const descriptionElement = document.querySelector("#description");
const humidityElement = document.querySelector("#humidity");
const windSpeedElement = document.querySelector("#wind-speed");
const temperatureElement = document.querySelector("#temperature");
const iconElement = document.querySelector("#icon");
const forecastContainer = document.querySelector("#forecast");
const unitToggle = document.querySelector("#unit-toggle-checkbox");
const weatherContainer = document.querySelector("#weather-container");
const searchHistoryContainer = document.querySelector("#search-history");

// --- Event Listeners ---
searchForm.addEventListener("submit", handleSearchSubmit);
unitToggle.addEventListener("change", handleUnitToggle);

// --- Core Functions ---

function handleSearchSubmit(event) {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        addToSearchHistory(city);
    }
    searchInput.value = "";
}

function handleUnitToggle() {
    currentUnit = unitToggle.checked ? 'imperial' : 'metric';
    const lastCity = cityElement.textContent;
    if (lastCity && lastCity !== "Loading...") {
        fetchWeather(lastCity);
    }
}

function fetchWeather(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${currentUnit}`;
    axios.get(apiUrl)
        .then(response => {
            if (response.data && response.data.daily) {
                fullForecastData = response.data.daily;
                displayMainWeatherData(fullForecastData[0], response.data.city);
                displayForecast();
            } else {
                throw new Error("Invalid data structure from API.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            cityElement.textContent = "City not found";
        });
}

function displayMainWeatherData(dayData, cityName) {
    const windUnit = currentUnit === 'metric' ? 'km/h' : 'mph';
    const tempUnit = currentUnit === 'metric' ? '°C' : '°F';

    cityElement.textContent = cityName;
    timeElement.textContent = formatDate(dayData.time);
    descriptionElement.textContent = dayData.condition.description;
    humidityElement.textContent = `${dayData.temperature.humidity}%`;
    windSpeedElement.textContent = `${Math.round(dayData.wind.speed)} ${windUnit}`;
    temperatureElement.textContent = Math.round(dayData.temperature.day);
    document.querySelector(".weather-app-unit").textContent = tempUnit;
    iconElement.innerHTML = `<img src="${dayData.condition.icon_url}" alt="${dayData.condition.description}" class="w-20 h-20">`;
}

function displayForecast() {
    forecastContainer.innerHTML = ""; 

    fullForecastData.slice(0, 5).forEach((day, index) => {
        const forecastDayElement = document.createElement("div");
        forecastDayElement.className = "forecast-day p-4 rounded-lg flex flex-col items-center cursor-pointer";
        
        forecastDayElement.dataset.dayIndex = index;

        const maxTemp = Math.round(day.temperature.maximum);
        const minTemp = Math.round(day.temperature.minimum);

        forecastDayElement.innerHTML = `
            <div class="font-semibold">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" alt="${day.condition.description}" class="w-16 h-16 my-2">
            <div><strong>${maxTemp}°</strong> ${minTemp}°</div>
        `;

        forecastDayElement.addEventListener("click", () => {
            document.querySelectorAll('.forecast-day').forEach(el => el.classList.remove('active'));
            forecastDayElement.classList.add('active');
            displayMainWeatherData(fullForecastData[index], cityElement.textContent);
        });

        forecastContainer.appendChild(forecastDayElement);
    });
    
    const firstDay = forecastContainer.querySelector('.forecast-day');
    if(firstDay) {
        firstDay.classList.add('active');
    }
}


// --- Helper Functions ---

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    return `${day} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
}

function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], { weekday: 'short' });
}

function addToSearchHistory(city) {
    const existingCities = Array.from(searchHistoryContainer.querySelectorAll('button')).map(btn => btn.textContent.toLowerCase());
    if (existingCities.includes(city.toLowerCase())) {
        return;
    }

    const historyItem = document.createElement('li');
    const historyButton = document.createElement('button');
    historyButton.className = "history-button px-3 py-1 rounded-full text-sm capitalize";
    historyButton.textContent = city;
    historyButton.onclick = () => fetchWeather(city);
    historyItem.appendChild(historyButton);
    searchHistoryContainer.prepend(historyItem);

    if (searchHistoryContainer.children.length > 5) {
        searchHistoryContainer.lastChild.remove();
    }
}


// --- Initial Load ---
fetchWeather("London");




