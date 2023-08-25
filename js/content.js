// http://api.weatherapi.com/v1/current.json?key=163dbad5aa3b4fbfb49164654231608&q=London
const apiKey = "163dbad5aa3b4fbfb49164654231608";

const form = document.querySelector(".info-form");
const input = document.querySelector(".info-input");
const currentTime = document.querySelector(".weather-time");
const weekDay = document.querySelector(".date-dayname");
const todayDate = document.querySelector(".date-data");
const cityName = document.querySelector("#city-name");
const countryName = document.querySelector("#country-name");
const currentTemperature = document.querySelector("#current-temp");
const weatherStatus = document.querySelector(".weather-status");
const weatherIcon = document.querySelector(".status-icon");
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

function getDefaultWeather() {
  const defaultCity = "Moscow";
  const defaultUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${defaultCity}`;

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
    });
}

getDefaultWeather();

form.onsubmit = function (e) {
  e.preventDefault();
  city = input.value.trim();

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

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
      // console.log(data.location.name);
      // console.log(data.location.country);
      // console.log(data.location.localtime);
      // console.log(data.current.condition.text);
      console.log(typeof data.current.condition.code);
      const code = data.current.condition.code;
      console.log(code);
      function setRainIcon() {
        if (rainyCodes.includes(code)) {
          return (weatherIcon.src = "/images/rainy.png");
        }
      }
      setRainIcon(data);
    });
};
