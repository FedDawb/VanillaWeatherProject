function refeshWeather(response) {
  let temperatureElement = document.querySelector(".weather-app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  let now = new Date()
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  getForecast(response.data.city);

 
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let day = days[now.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let month = months[now.getMonth()];
  
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;


let humidityElement = document.querySelector("#humidity");
 humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

}



function searchCity(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(refeshWeather);
}

function handleSearchSubmit(event) {
 event.preventDefault();
 let searchInputElement = document.querySelector("#search-form-input");

 searchCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forcastElement = document.querySelector("#forecast");

  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast=day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>


        <img src="${day.condition.icon_url}" class="weather-forecast-icon"
       
        />
        <div class="weather-forecast-temperatures">
         <div class="weather-forecast-temperature"></div>
        <span class="weather-forecast-temperature-max">
      <strong>${Math.round(day.temperature.maximum)}°</strong></span>
    <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
  </div>
</div>
</div>
  </div>
  `;
    }
  });

  forcastElement.innerHTML = forecastHtml;
}




let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
