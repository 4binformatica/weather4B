API_KEY = 'c631f4074106798e9dfdccd9cfe66974';

thunder = "fa-solid fa-cloud-bolt";
rain = "fa-solid fa-cloud-rain";
snow = "fa-solid fa-cloud-snow";
clouds = "fa-solid fa-cloud";
sun = "fa-solid fa-sun";
moon = "fa-solid fa-moon";

let giorniSettimana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


var search = function () {
  console.log("searching");
  let input = document.getElementById('searchBar').value
  input = input.toLowerCase();
  if (input == "")
    return;

  let weather = getWeather(input);
  let astronimicInfo = getAstronimicInfo(input);


  let daydate = [];
  daydate[0] = weather.list[0].dt_txt;
  daydate[1] = weather.list[8].dt_txt;
  daydate[2] = weather.list[16].dt_txt;
  daydate[3] = weather.list[24].dt_txt;
  daydate[4] = weather.list[32].dt_txt;

  let day = [];
  day[0] = giorniSettimana[new Date(daydate[0]).getDay()];
  day[1] = giorniSettimana[new Date(daydate[1]).getDay()];
  day[2] = giorniSettimana[new Date(daydate[2]).getDay()];
  day[3] = giorniSettimana[new Date(daydate[3]).getDay()];
  day[4] = giorniSettimana[new Date(daydate[4]).getDay()];

  let dayTemp = [];
  dayTemp[0] = weather.list[0].main.temp;
  dayTemp[1] = weather.list[8].main.temp;
  dayTemp[2] = weather.list[16].main.temp;
  dayTemp[3] = weather.list[24].main.temp;
  dayTemp[4] = weather.list[32].main.temp;

  let dayTempMin = [];
  dayTempMin[0] = weather.list[0].main.temp_min;
  dayTempMin[1] = weather.list[8].main.temp_min;
  dayTempMin[2] = weather.list[16].main.temp_min;
  dayTempMin[3] = weather.list[24].main.temp_min;
  dayTempMin[4] = weather.list[32].main.temp_min;

  let dayTempMax = [];
  dayTempMax[0] = weather.list[0].main.temp_max;
  dayTempMax[1] = weather.list[8].main.temp_max;
  dayTempMax[2] = weather.list[16].main.temp_max;
  dayTempMax[3] = weather.list[24].main.temp_max;
  dayTempMax[4] = weather.list[32].main.temp_max;

  let dayHumidity = [];
  dayHumidity[0] = weather.list[0].main.humidity;
  dayHumidity[1] = weather.list[8].main.humidity;
  dayHumidity[2] = weather.list[16].main.humidity;
  dayHumidity[3] = weather.list[24].main.humidity;
  dayHumidity[4] = weather.list[32].main.humidity;

  let dayWind = [];
  dayWind[0] = weather.list[0].wind.speed;
  dayWind[1] = weather.list[8].wind.speed;
  dayWind[2] = weather.list[16].wind.speed;
  dayWind[3] = weather.list[24].wind.speed;
  dayWind[4] = weather.list[32].wind.speed;

  let dayWeatherId = [];
  dayWeatherId[0] = weather.list[0].weather[0].id;
  dayWeatherId[1] = weather.list[8].weather[0].id;
  dayWeatherId[2] = weather.list[16].weather[0].id;
  dayWeatherId[3] = weather.list[24].weather[0].id;
  dayWeatherId[4] = weather.list[32].weather[0].id;

  let sunrise = astronimicInfo.results.sunrise;
  let sunset = astronimicInfo.results.sunset;
  let dayLength = astronimicInfo.results.day_length;


  const Temp1 = document.getElementById("Temp1");
  const MaxTemp1 = document.getElementById("MaxTemp1");
  const MinTemp1 = document.getElementById("MinTemp1");
  const Humidity1 = document.getElementById("Humidity1");
  const Wind1 = document.getElementById("Wind1");

  Temp1.innerHTML = Math.round(dayTemp[0] - 273.15) + "°C";
  MaxTemp1.innerHTML = Math.round(dayTempMax[0] - 273.15) + "°C";
  MinTemp1.innerHTML = Math.round(dayTempMin[0] - 273.15) + "°C";
  Humidity1.innerHTML = "Humidity: " + dayHumidity[0] + "%";
  Wind1.innerHTML = "Wind: " + dayWind[0] + "m/s";
  
  changeCardIcon(Math.round(dayTemp[0] - 273.15), "day1", "dayicon1", dayWeatherId[0]);

  
  



}

var getWeather = function (city) {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY;
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  let response = JSON.parse(req.responseText);
  return response;
}

var getAstronimicInfo = function (city) {
  let url = 'https://api.sunrise-sunset.org/json?lat=' + calcLat(city) + '&lng=' + calcLon(city) + '&date=today';
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  let response = JSON.parse(req.responseText);
  return response;
}

var calcLat = function (city) {
  let lat = getWeather(city).lat;
  return lat;
}

var calcLon = function (city) {
  let lon = getWeather(city).lon;
  return lon;
}

$(document).ready(function () {
  $('#searchBar').on('keydown', function (event) {
    if (event.keyCode === 13) {
      search();
    }
  });
});  

var changeCard = function (temp, cardday, iconid, weather) {
  const day = document.getElementById(cardday);
  const icon = document.getElementById(iconid);
  if(temp > 25)
    {
      day.className = "card hot";
    }
  else if(temp > 15)
    {
      day.className = "card warm";
    }
  else if(temp > -5)
    {
      day.className = "card cold";
    }

    weather = weather.toString();
    console.log(weather);
  switch(weather)
    {
      case "200":
        icon.className = thunder;
        break;
      case "201":
        icon.className = thunder;
        break;
      case "202":
        icon.className = thunder;
        break;
      case "210":
        icon.className = thunder;
        break;
      case "211":
        icon.className = thunder;
        break;
      case "212":
        icon.className = thunder;
        break;
      case "221":
        icon.className = thunder;
        break;
      case "230":
        icon.className = thunder;
        break;
      case "231":
        icon.className = thunder;
        break;
      case "232":
        icon.className = thunder;
        break;
      case "300":
        icon.className = drizzle;
        break;
      case "301":
        icon.className = drizzle;
        break;
      case "302":
        icon.className = drizzle;
        break;
      case "310":
        icon.className = drizzle;
        break;
      case "311":
        icon.className = drizzle;
        break;
      case "312":
        icon.className = drizzle;
        break;
      case "313":
        icon.className = drizzle;
        break;
      case "314":
        icon.className = drizzle;
        break;
      case "321":
        icon.className = drizzle;
        break;
      case "500":
        icon.className = rain;
        break;
      case "501":
        icon.className = rain;
        break;
      case "502":
        icon.className = rain;
        break;
      case "503":
        icon.className = rain;
        break;
      case "504":
        icon.className = rain;
        break;
      case "511":
        icon.className = rain;
        break;
      case "520":
        icon.className = rain;
        break;
      case "521":
        icon.className = rain;
        break;
      case "522":
        icon.className = rain;
        break;
      case "531":
        icon.className = rain;
        break;
      case "600":
        icon.className = snow;
        break;
      case "601":
        icon.className = snow;
        break;
      case "602":
        icon.className = snow;
        break;
      case "611":
        icon.className = snow;
        break;
      case "612":
        icon.className = snow;
        break;
      case "613":
        icon.className = snow;
        break;
      case "615":
        icon.className = snow;
        break;
      case "616":
        icon.className = snow;
        break;
      case "620":
        icon.className = snow;
        break;
      case "621":
        icon.className = snow;
        break;
      case "622":
        icon.className = snow;
        break;
      case "701":
        icon.className = mist;
        break;
      case "711":
        icon.className = mist;
        break;
      case "721":
        icon.className = mist;
        break;
      case "731":
        icon.className = mist;
        break;
      case "741":
        icon.className = mist;
        break;
      case "751":
        icon.className = mist;
        break;
      case "761":
        icon.className = mist;
        break;
      case "762":
        icon.className = mist;
        break;
      case "771":
        icon.className = mist;
        break;
      case "781":
        icon.className = mist;
        break;
      case "800":
        icon.className = clear;
        break;
      case "801":
        console.log("test");
        icon.className = clouds;
        break;
      case "802":
        icon.className = clouds;
        break;
      case "803":
        icon.className = clouds;
        break;
      case "804":
        icon.className = clouds;
        break;
      default:
        icon.className = clear;
        break;
        
    }
    


}