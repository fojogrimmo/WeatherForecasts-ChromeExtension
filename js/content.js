// http://api.weatherapi.com/v1/current.json?key=163dbad5aa3b4fbfb49164654231608&q=London
// https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3
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

const weatherCodes = {
  rainy: [
    1063, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1246, 1180, 1150, 1153,
    1240, 1243,
  ],
  sunny: [1000],
  cloudy: [1006, 1009, 1030, 1135],
  partlyCloudy: [1003],
  snowy: [
    1066, 1069, 1072, 1114, 1147, 1168, 1171, 1204, 1207, 1210, 1213, 1216,
    1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1117,
  ],
  stormy: [1282, 1279, 1276, 1273],
};

function clearInputField() {
  inputField.addEventListener("focus", () => {
    inputField.value = "";
  });
}

function setWeatherIcon(iconElement, code) {
  if (weatherCodes.rainy.includes(code)) {
    iconElement.src = "/images/rainy.png";
  } else if (weatherCodes.sunny.includes(code)) {
    iconElement.src = "/images/sunny.png";
  } else if (weatherCodes.cloudy.includes(code)) {
    iconElement.src = "/images/cloudy.png";
  } else if (weatherCodes.partlyCloudy.includes(code)) {
    iconElement.src = "/images/partly-cloudy.png";
  } else if (weatherCodes.snowy.includes(code)) {
    iconElement.src = "/images/snowy.png";
  } else if (weatherCodes.stormy.includes(code)) {
    iconElement.src = "/images/stormy.png";
  }
}

function saveDataToLocalStorage(city) {
  localStorage.setItem("userCity", city);
}

function loadDataFromLocalStorage() {
  return localStorage.getItem("userCity");
}

function getDefaultWeather() {
  const defaultUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCity}&days=3`;

  fetch(defaultUrl)
    .then((response) => response.json())
    .then((data) => {
      currentTime.textContent = data.location.localtime.slice(-5);
      // WEEKDAY ---
      const date = new Date(data.location.localtime);
      const weekdayIndex = date.getDay();
      const weekdayName = weekdays[weekdayIndex];
      weekDay.textContent = weekdayName;

      for (let i = 0; i < 3; i++) {
        const index = (weekdayIndex + i) % 7;
        const shortName = weekdays[index].slice(0, 3);
        [todayDayName, tomorrowDayName, afterTomorrowDayName][i].textContent =
          shortName;
      }

      // DATE ---
      const options = { day: "2-digit", month: "short", year: "numeric" };

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

      setWeatherIcon(weatherIcon, data.current.condition.code);
      setWeatherIcon(
        todayForecastIcon,
        data.forecast.forecastday[0].day.condition.code
      );
      setWeatherIcon(
        tomorrowForecastIcon,
        data.forecast.forecastday[1].day.condition.code
      );
      setWeatherIcon(
        afterTomorrowForecastIcon,
        data.forecast.forecastday[2].day.condition.code
      );
    });
}

clearInputField();
getDefaultWeather();

form.onsubmit = function (e) {
  e.preventDefault();
  city = inputField.value.trim();
  saveDataToLocalStorage(city);

  const savedCity = loadDataFromLocalStorage();
  if (savedCity) {
    inputField.value = savedCity;
    getDefaultWeather(savedCity);
  }
  const url = savedCity
    ? `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${savedCity}&days=3`
    : `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

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

      setWeatherIcon(weatherIcon, data.current.condition.code);
      setWeatherIcon(
        todayForecastIcon,
        data.forecast.forecastday[0].day.condition.code
      );
      setWeatherIcon(
        tomorrowForecastIcon,
        data.forecast.forecastday[1].day.condition.code
      );
      setWeatherIcon(
        afterTomorrowForecastIcon,
        data.forecast.forecastday[2].day.condition.code
      );
    });
};
