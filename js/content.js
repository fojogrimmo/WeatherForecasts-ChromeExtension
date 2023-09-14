import { WeatherIconManager } from "/js/manage-icons.js";

const weatherIconManager = new WeatherIconManager();
const weatherIcon = document.querySelector(".status-icon");

const todayForecastIcon = document.querySelector(".today-i");
const tomorrowForecastIcon = document.querySelector(".tomorrow-i");
const afterTomorrowForecastIcon = document.querySelector(".after-tomorrow-i");

const apiKey = "163dbad5aa3b4fbfb49164654231608";
const defaultCity = "Moscow";

const form = document.querySelector(".info-form");
const inputField = document.querySelector(".info-input");
const currentTime = document.querySelector(".weather-time");
const weekDay = document.querySelector(".date-dayname");
const todayDate = document.querySelector(".date-data");
const cityName = document.querySelector("#city-name");
const countryName = document.querySelector("#country-name");
const currentTemperature = document.querySelector("#current-temp");
const weatherStatus = document.querySelector(".weather-status");

const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");

const todayMaxTemp = document.querySelector("#max-today");
const todayMinTemp = document.querySelector("#min-today");

const tomorrowMaxTemp = document.querySelector("#max-tomorrow");
const tomorrowMinTemp = document.querySelector("#min-tomorrow");

const afterTomorrowMaxTemp = document.querySelector("#max-after-tomorrow");
const afterTomorrowMinTemp = document.querySelector("#min-after-tomorrow");

const todayDayName = document.querySelector("#today-dayname");
const tomorrowDayName = document.querySelector("#tomorrow-dayname");
const afterTomorrowDayName = document.querySelector("#after-tomorrow-dayname");

let city;

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function clearInputField() {
  inputField.addEventListener("focus", () => {
    inputField.value = "";
  });
}

function saveDataToLocalStorage(city) {
  localStorage.setItem("userCity", city);
}

function loadDataFromLocalStorage() {
  return localStorage.getItem("userCity");
}

function updateWeatherInfo(data) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const date = new Date(data.location.localtime);
  const formattedDate = date.toLocaleString("en-US", options);
  const parts = formattedDate.split(" ");
  const rearrangedDate = `${parts[1]} ${parts[0]} ${parts[2]}`;

  todayDate.textContent = rearrangedDate.replace(",", "");
  cityName.textContent = data.location.name;
  countryName.textContent = data.location.country;
  currentTemperature.textContent = data.current.temp_c.toFixed();
  weatherStatus.textContent = data.current.condition.text;
  feelsLike.textContent = data.current.feelslike_c.toFixed();
  humidity.textContent = data.current.humidity;
  windSpeed.textContent = data.current.wind_kph;

  todayMaxTemp.textContent =
    data.forecast.forecastday[0].day.maxtemp_c.toFixed();
  todayMinTemp.textContent =
    data.forecast.forecastday[0].day.mintemp_c.toFixed();
  tomorrowMaxTemp.textContent =
    data.forecast.forecastday[1].day.maxtemp_c.toFixed();
  tomorrowMinTemp.textContent =
    data.forecast.forecastday[1].day.mintemp_c.toFixed();
  afterTomorrowMaxTemp.textContent =
    data.forecast.forecastday[2].day.maxtemp_c.toFixed();
  afterTomorrowMinTemp.textContent =
    data.forecast.forecastday[2].day.mintemp_c.toFixed();
}

function updateTime(data) {
  currentTime.textContent = data.location.localtime.slice(-5);
}

function updateWeekdays(date) {
  const weekdayIndex = date.getDay();
  const weekdayName = weekdays[weekdayIndex];
  weekDay.textContent = weekdayName;

  const shortNames = weekdays
    .map((name, i) => name.slice(0, 3))
    .slice(weekdayIndex, weekdayIndex + 3);
  [todayDayName, tomorrowDayName, afterTomorrowDayName].forEach(
    (element, i) => {
      element.textContent = shortNames[i];
    }
  );
}

function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherIcon.src = "";
      updateTime(data);
      const date = new Date(data.location.localtime);
      updateWeekdays(date);
      updateWeatherInfo(data);
      weatherIconManager.setWeatherIcon(
        weatherIcon,
        data.current.condition.code
      );
      weatherIconManager.setWeatherIcon(
        todayForecastIcon,
        data.forecast.forecastday[0].day.condition.code
      );
      weatherIconManager.setWeatherIcon(
        tomorrowForecastIcon,
        data.forecast.forecastday[1].day.condition.code
      );
      weatherIconManager.setWeatherIcon(
        afterTomorrowForecastIcon,
        data.forecast.forecastday[2].day.condition.code
      );
    });
}

function getDefaultWeather() {
  const savedCity = loadDataFromLocalStorage();
  const city = savedCity || defaultCity;
  saveDataToLocalStorage(city);
  getWeather(city);
}

clearInputField();
getDefaultWeather();

form.onsubmit = function (e) {
  e.preventDefault();
  city = inputField.value.trim();
  saveDataToLocalStorage(city);
  getWeather(city);
};
