function refeshWeather(response) {
  let temperatureElement = document.querySelector(".weather-app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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


function getForecast(city) {
  
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);

  let forcastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast=day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAZ9JREFUaN7tmdGNgzAMhhmBERiBEVjgJEbICIyQERiBTS4j5JU3RmCDnHNyq1wE1A4Jl0iJ9KtqVdv/R+xA1cYY05Ssos1XgCwBOGtd1x4kPfVNwhUFAI1rkDmRTgVyGwCMiQvjvkRWAGBoYJh/qc8JQAcAqCwAsO9NoBbQ5n1m38+g9ikAeQPgSjtofAJgTgTw0lg6wE5ppyAAmxj72CTWHB0Ae39/wPzvYEcDwKuuHzL+VkyAx81HA0h4ZKYHwNbZ/wvg4KFQcAFEJub/3Mk5ADJDgPcRWzKAVVc6wFQ6gKQA9EUD4H1AFdtCN3465jHEua8KUCzA1/c6gBbQxikI35cgZV8ZMae1ggAgUWuTgQxqIBqZnBhFjLmsFQognYRWI9HI7sRoxo6d1mIDQILOS0i9kosXNxBiPtYKAVBe0o7Yw27MQoT+WIsFYLfPSyiJRrQTY9uoJcSQapEBDoZpIxqZPCNTwOCe1uIAZDO4oQBbwOAK7uBya3EAFs7gHpwipMHl1uIADLi1XcNYGCOYMeRa9W/WClABKkAFiKofRnoGaQBkK9wAAAAASUVORK5CYII=" 
         alt=""
        width="30"
        />
        <div class="weather-forecast-temperatures">
         <div class="weather-forecast-temperature"></div>
        <span class="weather-forecast-temperature-max">
      <strong>18°C</strong></span>
    <span class="weather-forecast-temperature-min">12°C</span>
  </div>
</div>
</div>
  </div>
  `;
  });

  forcastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
getForecast("London");

