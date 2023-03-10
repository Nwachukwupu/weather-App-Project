function displayTemperature(response) {
    let temperatureElement = document.querySelector("temperature");
    temperatureElement.innerHTML = response.data.main.temp;
}

let apiKey = "d25df42b10f9cecb0836d249c9158e2b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=NewYork&appid={apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
