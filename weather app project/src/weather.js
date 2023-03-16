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

        temperatureElement.innerHTML = Math.round(response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = Math.round(response.data.wind.speed);
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
    }

    let apiKey = "d25df42b10f9cecb0836d249c9158e2b";
    let city = "owerri";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayTemperature);
