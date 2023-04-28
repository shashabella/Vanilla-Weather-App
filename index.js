function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 0) {
    hours = `0${hours}`;
  }
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay;
  let days = ["Sun", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
            
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <div class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}</div
                  ><div class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}</div>
                </div>
              </div>
            
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#weather-icon");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celciusTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "5981bb6e099bf047fb0ade85502f44fa";
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputSearchElement = document.querySelector("#inputSearch");
  searchCity(inputSearchElement.value);
}
function showFahrenTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahren.classList.add("active");
  let fahrenTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.add("active");
  fahren.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahren = document.querySelector("#fahren");
fahren.addEventListener("click", showFahrenTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemperature);

searchCity("New York");
