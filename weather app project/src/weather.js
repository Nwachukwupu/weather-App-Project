function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 0) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 0) {
        minutes = `0${minutes}`;
    }
    let seconds = date.getSeconds();
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday", "Sunday"]
    let day = days [date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


    function displayTemperature(response) {
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind");
        let dateElement = document.querySelector("#date");
        let iconElement = document.querySelector("#icon");

        temperatureElement.innerHTML = Math.round(response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed);
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
        iconElement.setAttribute("alt", response.data.weather[0].description);
    }
function search(city) {
        let apiKey = "d25df42b10f9cecb0836d249c9158e2b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    
    }

function handlesubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
    
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 * 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahreheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);