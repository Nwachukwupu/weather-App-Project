function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday", "Sunday"];
  let day = days [date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
let date = new Date(timestamp*1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

return days [day];
}

 function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = `forecast.map((forecastDay) => formatDay(forecastDay.dt));`  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        ${index}
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}
  function displayTemperature(response) {
      let temperatureElement = document.querySelector("#temperature");
      let cityElement = document.querySelector("#city");
      let descriptionElement = document.querySelector("#description");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let dateElement = document.querySelector("#date");
      let iconElement = document.querySelector("#icon");

      celsiusTemperature = response.data.main.temp;


      temperatureElement.innerHTML = Math.round(response.data.main.temp);
      cityElement.innerHTML = response.data.name;
      descriptionElement.innerHTML = response.data.weather[0].description;
      humidityElement.innerHTML = response.data.main.humidity;
      windElement.innerHTML = Math.round(response.data.wind.speed* 3.6);
      dateElement.innerHTML = formatDate(response.data.dt * 1000);
      iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
      iconElement.setAttribute("alt", response.data.weather[0].description);

      getForecast(response.data.coord);
  }
function search(city) {
      let apiKey = "d25df42b10f9cecb0836d249c9158e2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  
  }

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
  
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");