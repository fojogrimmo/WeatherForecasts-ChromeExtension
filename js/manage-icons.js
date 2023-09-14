class WeatherIconManager {
  constructor() {
    this.weatherCodes = {
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
  }

  setWeatherIcon(iconElement, code) {
    if (this.weatherCodes.rainy.includes(code)) {
      iconElement.src = "/images/rainy.png";
    } else if (this.weatherCodes.sunny.includes(code)) {
      iconElement.src = "/images/sunny.png";
    } else if (this.weatherCodes.cloudy.includes(code)) {
      iconElement.src = "/images/cloudy.png";
    } else if (this.weatherCodes.partlyCloudy.includes(code)) {
      iconElement.src = "/images/partly-cloudy.png";
    } else if (this.weatherCodes.snowy.includes(code)) {
      iconElement.src = "/images/snowy.png";
    } else if (this.weatherCodes.stormy.includes(code)) {
      iconElement.src = "/images/stormy.png";
    }
  }
}

export { WeatherIconManager };
