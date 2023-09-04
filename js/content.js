// http://api.weatherapi.com/v1/current.json?key=163dbad5aa3b4fbfb49164654231608&q=London
// https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3
const apiKey = "163dbad5aa3b4fbfb49164654231608";

const form = document.querySelector(".info-form");
const inputField = document.querySelector(".info-input");
const currentTime = document.querySelector(".weather-time");
const weekDay = document.querySelector(".date-dayname");
const todayDate = document.querySelector(".date-data");
const cityName = document.querySelector("#city-name");
const countryName = document.querySelector("#country-name");
const currentTemperature = document.querySelector("#current-temp");
const weatherStatus = document.querySelector(".weather-status");

const weatherIcon = document.querySelector(".status-icon");

const todayForecastIcon = document.querySelector(".today-i");
const tomorrowForecastIcon = document.querySelector(".tomorrow-i");
const afterTomorrowForecastIcon = document.querySelector(".after-tomorrow-i");

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

const rainyCodes = [1063, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1246];
const sunnyCodes = [1000];
const partlyCloudyCode = [1003];

function clearInputField() {
  inputField.addEventListener("focus", () => {
    inputField.value = " ";
  });
}
clearInputField();

function getDefaultWeather() {
  const defaultCity = "Moscow";
  const defaultUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity}&days=3`;

  fetch(defaultUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // TIME ---
      currentTime.textContent = data.location.localtime.slice(-5);

      // WEEKDAY ---
      const date = new Date(data.location.localtime);
      const weekdayIndex = date.getDay();
      const weekdayName = weekdays[weekdayIndex];
      weekDay.textContent = weekdayName;
      todayDayName.textContent = weekdays[weekdayIndex].slice(0, 3);
      tomorrowDayName.textContent = weekdays[weekdayIndex + 1].slice(0, 3);
      afterTomorrowDayName.textContent = weekdays[weekdayIndex + 2].slice(0, 3);

      // DATE ---
      const options = { day: "2-digit", month: "short", year: "numeric" };

      const formattedDate = date.toLocaleString("en-US", options);
      const parts = formattedDate.split(" ");

      const rearrangedDate = `${parts[1]} ${parts[0]} ${parts[2]}`;
      todayDate.textContent = rearrangedDate.replace(",", "");

      // CITY NAME ---
      cityName.textContent = data.location.name;
      // COUNTRY ---
      countryName.textContent = data.location.country;
      // TEMP ---
      currentTemperature.textContent = data.current.temp_c.toFixed();
      // WEATHER ST ---
      weatherStatus.textContent = data.current.condition.text;

      // FL
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

      const code = data.current.condition.code;
      const forecastTodayCode = data.forecast.forecastday[0].day.condition.code;
      const forecastTomorrowCode =
        data.forecast.forecastday[1].day.condition.code;
      const forecastAfterTomorrowCode =
        data.forecast.forecastday[2].day.condition.code;

      function setWeatherIcon(iconElement, code) {
        if (rainyCodes.includes(code)) {
          iconElement.src = "/images/rainy.png";
        } else if (sunnyCodes.includes(code)) {
          iconElement.src = "/images/sunny.png";
        } else if (partlyCloudyCode.includes(code)) {
          iconElement.src = "/images/partly-cloudy.png";
        }
      }

      setWeatherIcon(weatherIcon, code);
      setWeatherIcon(todayForecastIcon, forecastTodayCode);
      setWeatherIcon(tomorrowForecastIcon, forecastTomorrowCode);
      setWeatherIcon(afterTomorrowForecastIcon, forecastAfterTomorrowCode);
    });
}

getDefaultWeather();

form.onsubmit = function (e) {
  e.preventDefault();
  city = inputField.value.trim();

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      weatherIcon.src = "";

      // TIME ---
      currentTime.textContent = data.location.localtime.slice(-5);

      // WEEKDAY ---
      const date = new Date(data.location.localtime);
      const weekdayIndex = date.getDay();
      const weekdayName = weekdays[weekdayIndex];
      weekDay.textContent = weekdayName;

      // DATE ---
      const options = { day: "2-digit", month: "short", year: "numeric" };

      const formattedDate = date.toLocaleString("en-US", options);
      const parts = formattedDate.split(" ");

      const rearrangedDate = `${parts[1]} ${parts[0]} ${parts[2]}`;
      todayDate.textContent = rearrangedDate.replace(",", "");

      // CITY NAME ---
      cityName.textContent = data.location.name;
      // COUNTRY ---
      countryName.textContent = data.location.country;
      // TEMP ---
      currentTemperature.textContent = data.current.temp_c.toFixed();
      // WEATHER ST ---
      weatherStatus.textContent = data.current.condition.text;

      // FL
      feelsLike.textContent = data.current.feelslike_c.toFixed();

      humidity.textContent = data.current.humidity;
      windSpeed.textContent = data.current.wind_kph;

      //

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
      //
      const code = data.current.condition.code;
      const forecastTodayCode = data.forecast.forecastday[0].day.condition.code;
      const forecastTomorrowCode =
        data.forecast.forecastday[1].day.condition.code;
      const forecastAfterTomorrowCode =
        data.forecast.forecastday[2].day.condition.code;

      function setWeatherIcon(iconElement, code) {
        if (rainyCodes.includes(code)) {
          iconElement.src = "/images/rainy.png";
        } else if (sunnyCodes.includes(code)) {
          iconElement.src = "/images/sunny.png";
        } else if (partlyCloudyCode.includes(code)) {
          iconElement.src = "/images/partly-cloudy.png";
        }
      }

      setWeatherIcon(weatherIcon, code);
      setWeatherIcon(todayForecastIcon, forecastTodayCode);
      setWeatherIcon(tomorrowForecastIcon, forecastTomorrowCode);
      setWeatherIcon(afterTomorrowForecastIcon, forecastAfterTomorrowCode);
    });
};
