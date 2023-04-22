let now = new Date();

let li = document.querySelector(".weekday");
let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

li.innerHTML = `${day} ${hour}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let inputSearch = document.querySelector(".form-control");
  let h1 = document.querySelector(".city");

  let apiLastpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let cityName = inputSearch.value;
  let apiKey1 = "5981bb6e099bf047fb0ade85502f44fa";
  let units1 = "metric";
  let apiUrl1 = `${apiLastpoint}q=${cityName}&appid=${apiKey1}&units=${units1}`;
  function showTemperature(response) {
    let displayTemp = Math.round(response.data.main.temp);
    let displayCity = response.data.name;
    let descriptionElement = document.querySelector(".description");
    let showHumidity = document.querySelector(".hum");
    let showWind = document.querySelector(".win");
    let temp = document.querySelector(".temperature");
    let iconElement = document.querySelector(".weather-icon");

    celciusTemperature = response.data.main.temp;

    temp.innerHTML = `${displayTemp}`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    showHumidity.innerHTML = response.data.main.humidity;
    showWind.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    if (inputSearch.value) {
      h1.innerHTML = ` ${displayCity}`;
    } else {
      h1.innerHTML = null;
    }
  }
  axios.get(apiUrl1).then(showTemperature);
}

function showFahrenTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celcius.classList.remove("active");
  fahren.classList.add("active");
  let fahrenTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celcius.classList.add("active");
  fahren.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

let fahren = document.querySelector("#fahren");
fahren.addEventListener("click", showFahrenTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemperature);

function showPosition(position) {
  console.log(position);

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5981bb6e099bf047fb0ade85502f44fa";
  let units = "metric";

  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  function showTemperature(response) {
    console.log(response.data);
    console.log(response.data.main.temp);
    let displayCurrentTemp = Math.round(response.data.main.temp);
    let displayCurrentCity = response.data.name;
    let displayCurrentDescription = response.data.weather[0].description;
    let iconEmoji = document.querySelector(".weather-icon");

    let displayCurrentHumidity = response.data.main.humidity;
    let displayCurrentWind = Math.round(response.data.wind.speed);
    let currentButton = document.querySelector(".temperature");
    let currentCityButton = document.querySelector(".city");
    let currentDescriptionButton = document.querySelector(".description");

    let currentHumidityButton = document.querySelector(".hum");
    let currentWindButton = document.querySelector(".win");

    currentCityButton.innerHTML = `${displayCurrentCity}`;
    currentButton.innerHTML = `${displayCurrentTemp}`;
    currentDescriptionButton.innerHTML = `${displayCurrentDescription}`;
    iconEmoji.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconEmoji.setAttribute("alt", response.data.weather[0].description);

    currentHumidityButton.innerHTML = `${displayCurrentHumidity}`;
    currentWindButton.innerHTML = `${displayCurrentWind}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

let buttonClick = document.querySelector(".currentTemp");
buttonClick.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});
