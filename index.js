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
    console.log(response.data);

    let displayTemp = Math.round(response.data.main.temp);
    let displayCity = response.data.name;
    let temp = document.querySelector(".temperature");
    temp.innerHTML = `${displayTemp}`;
    if (inputSearch.value) {
      h1.innerHTML = ` ${displayCity}`;
    } else {
      h1.innerHTML = null;
    }
  }
  axios.get(apiUrl1).then(showTemperature);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

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
    let displayCurrentCloud = response.data.clouds.all;

    let displayCurrentHumidity = response.data.main.humidity;
    let displayCurrentWind = Math.round(response.data.wind.speed);
    let currentButton = document.querySelector(".temperature");
    let currentCityButton = document.querySelector(".city");

    let currentHumidityButton = document.querySelector(".hum");
    let currentWindButton = document.querySelector(".win");
    let currentCloudButton = document.querySelector(".cloud");
    currentCityButton.innerHTML = `${displayCurrentCity}`;
    currentButton.innerHTML = `${displayCurrentTemp}`;
    currentCloudButton = `${displayCurrentCloud}`;

    currentHumidityButton.innerHTML = `${displayCurrentHumidity}`;
    currentWindButton.innerHTML = `${displayCurrentWind}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

let buttonClick = document.querySelector(".currentTemp");
buttonClick.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});
