API_KEY = 'c631f4074106798e9dfdccd9cfe66974';

cloudyday1 = "img/cloudy-day-1.svg";
cloudyday2 = "img/cloudy-day-2.svg";
cloudyday3 = "img/cloudy-day-3.svg";
cloudynight1 = "img/cloudy-night-1.svg";
cloudynight2 = "img/cloudy-night-2.svg";
cloudynight3 = "img/cloudy-night-3.svg";
cloudy = "img/cloudy.svg";
sunny = "img/day.svg";
night = "img/night.svg";
rainy1 = "img/rainy-1.svg";
rainy2 = "img/rainy-2.svg";
rainy3 = "img/rainy-3.svg";
rainy4 = "img/rainy-4.svg";
rainy5 = "img/rainy-5.svg";
rainy6 = "img/rainy-6.svg";
rainy7 = "img/rainy-7.svg";
snowy1 = "img/snowy-1.svg";
snowy2 = "img/snowy-2.svg";
snowy3 = "img/snowy-3.svg";
snowy4 = "img/snowy-4.svg";
snowy5 = "img/snowy-5.svg";
snowy6 = "img/snowy-6.svg";
thunder = "img/thunder.svg";
weather_sagitarius = "img/weather-sagitarius.svg";
weather_sunset = "img/weather-sunset.svg";
weather_sprite = "img/weather-sprite.svg";
weather = "img/weather.svg";

var mymap = null;
var marker = null;




let giorniSettimana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



$(document).ready(function() {
  var searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function () {
  console.log(searchBar.value);
  suggestCity(searchBar.value);
});
});


function searchCity(query) {
  var url = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&appid=${API_KEY}&units=metric&lang=it`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      var cities = data.list.map(city => {
        return {
          name: city.name,
          country: city.sys.country,
          lat: city.coord.lat,
          lon: city.coord.lon
        };
      });

      return cities;
    });
}

function suggestCity(query) {
  searchCity(query).then(cities => {
    // Usa la lista di città per fornire i suggerimenti di ricerca
    var suggestions = cities.map(city => `${city.name}, ${city.country}`);
    console.log(suggestions);
  });
}



async function search() {
  console.log("searching");
  let input = document.getElementById('searchBar').value
  input = input.toLowerCase();
  if (input == "")
    return;

  try {
    let weather = await getNowWeather(input);
    let weatherToday = await getTodayWeather(input);
    let astronimicInfo = await getAstronimicInfo(input);

    let city = weather.name;
    let country = weather.sys.country;
    let temp = weather.main.temp;
    let cod = weather.weather[0].id;
    //calculate min and max temp from 5 days forecast data (weatherToday)
    let minTemp = weatherToday.list[0].main.temp_min;
    let maxTemp = weatherToday.list[0].main.temp_max;
    for (let i = 1; i < weatherToday.list.length; i++) {
      if (weatherToday.list[i].main.temp_min < minTemp)
        minTemp = weatherToday.list[i].main.temp_min;
      if (weatherToday.list[i].main.temp_max > maxTemp)
        maxTemp = weatherToday.list[i].main.temp_max;
    }
    let feelsLike = weather.main.feels_like;
    let weatherDescription = weather.weather[0].description;
    let weatherIcon = weather.weather[0].icon;
    let sunrise = weather.sys.sunrise;
    let sunset = weather.sys.sunset;
    let dayLength = astronimicInfo.results.day_length;
    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    let windSpeed = weather.wind.speed;
    let windDeg = weather.wind.deg;
    let humidity = weather.main.humidity;
    let pressure = weather.main.pressure;
    let visibility = weather.visibility;
    let clouds = weather.clouds.all;
    let timezone = weather.timezone;
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let dayName = giorniSettimana[day];
    let dayNumber = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let time = hour + ":" + minute + ":" + second;
    let dateText = dayName + " " + dayNumber + "/" + month + "/" + year;
    //convert time pm format to 24 hours format
    let sunriseText = convertUnixTime(sunrise);
    let sunsetText = convertUnixTime(sunset);
    let windSpeedText = windSpeed + " m/s";
    let humidityText = humidity + "%";
    let pressureText = pressure + " hPa";
    let visibilityText = visibility + " m";
    let cloudsText = clouds + "%";
    let latText = lat + "°";
    let lonText = lon + "°";
    let tempText = temp + "°C";
    let minTempText = minTemp + "°C";
    let maxTempText = maxTemp + "°C";
    let feelsLikeText = feelsLike + "°C";
    let weatherDescriptionText = weatherDescription;
    let weatherIconText = weatherIcon;
    let cityText = city;
    let countryText = country;

    document.getElementById('cityName').innerHTML = cityText + ", " + countryText;
    document.getElementById('date').innerHTML = dateText;

    document.getElementById('sunrise').innerHTML = sunriseText;
    document.getElementById('sunset').innerHTML = sunsetText;

    document.getElementById('temp').innerHTML = tempText;
    document.getElementById('tempMin').innerHTML = minTempText;
    document.getElementById('tempMax').innerHTML = maxTempText;

    document.getElementById('humidity').innerHTML = humidityText;
    document.getElementById('wind').innerHTML = windSpeedText;
    document.getElementById('pressure').innerHTML = pressureText;
    document.getElementById('clouds').innerHTML = cloudsText;
    document.getElementById('visibility').innerHTML = visibilityText;

    if (mymap == null) {
      initMap(lat, lon);
    }
    else {
      updateMap(lat, lon);
    }

    document.getElementById('lat').innerHTML = latText;
    document.getElementById('lon').innerHTML = lonText;

    changeCard(temp, "card", "icon", cod);

    // Mostra la sezione del meteo solo se la ricerca ha prodotto risultati validi
    const weatherSection = document.querySelector('#containerAll');
    weatherSection.classList.remove('hidden');
    document.querySelector('#appearsText').classList.add('hidden');
  } catch (error) {
    // La ricerca non ha prodotto risultati validi, nasconde la sezione del meteo e mostra un messaggio di errore
    console.error(error);
    document.querySelector('#containerAll').classList.add('hidden');
    document.querySelector('#appearsText').classList.remove('hidden');
  }
}

var getNowWeather = function (city) {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=metric';
  let req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  let response = JSON.parse(req.responseText);
  return response;
}

var getTodayWeather = function (city) {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY + '&units=metric';
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
  let lat = getNowWeather(city).lat;
  return lat;
}

var calcLon = function (city) {
  let lon = getNowWeather(city).lon;
  return lon;
}

$(document).ready(function () {
  $('#searchBar').on('keydown', function (event) {
    if (event.keyCode === 13) {
      search();
    }
  });
});  

function initMap(lat, lng) {
  if (mymap !== null) {
    mymap.remove();
  }

  mymap = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
  }).addTo(mymap);

  marker = L.marker([lat, lng]).addTo(mymap);
}

function updateMap(lat, lng) {
  if (mymap !== null && marker !== null) {
    mymap.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
  }
}

function convertTo24(timeString) {
  var timeParts = timeString.split(/:|\s/);
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var seconds = parseInt(timeParts[2]);
  var ampm = timeParts[3];

  if (ampm === "PM" && hours < 12) {
    hours += 12;
  }
  if (ampm === "AM" && hours === 12) {
    hours = 0;
  }

  var hour24 = hours.toString().padStart(2, '0');
  var minute24 = minutes.toString().padStart(2, '0');
  var second24 = seconds.toString().padStart(2, '0');

  return hour24 + ":" + minute24 + ":" + second24;
}
function convertUnixTime(unixTime) {
  var date = new Date(unixTime * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

function isDayTime(){
  var date = new Date();
  var hour = date.getHours();
  if(hour >= 6 && hour <= 18)
    {
      return true;
    }
  else
    {
      return false;
    }
}

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
    //convert weather code to int
    weather = parseInt(weather);
  switch(weather)
    {
      case weather >= 200 && weather < 300:
        icon.src = thunder;
        break;
      case weather >= 300 && weather < 400:
        icon.src = drizzle;
        break;
      case 500:
        icon.src = rainy2;
        break;
      case 501:
        icon.src = rainy1;
        break;
      case 502:
        icon.src = rainy3;
        break;
      case 503:
        icon.src = rainy3;
        break;
      case 504:
        icon.src = rainy3;
        break;
      case 511:
        icon.src = snowy4;
        break;
      case 520:
        icon.src = rainy4;
        break;
      case 521:
        icon.src = rainy6 ;
        break;
      case 522:
        icon.src = rainy6;
        break;
      case 531:
        icon.src = rainy7;
        break;
      case 600:
        icon.src = snowy4;
        break;
      case 601:
        icon.src = snowy4;
        break;
      case 602:
        icon.src = snowy6;
        break;
      case 611:
        icon.src = snowy4;
        break;
      case 612:
        icon.src = snowy4;
        break;
      case 613:
        icon.src = snowy4;
        break;
      case 615:
        icon.src = snowy5;
        break;
      case 616:
        icon.src = snowy5;
        break;
      case 620:
        icon.src = snowy4;
        break;
      case 621:
        icon.src = snowy4;
        break;
      case 622:
        icon.src = snowy6;
        break;
      case weather >= 700 && weather < 800:
        icon.src = cloudy;
        break;
      case 800:
        icon.src = sunny;
        break;
      case 801:
        icon.src = cloudyday1;
        break;
      case 802:
        icon.src = cloudyday2;
        break;
      case 803:
        icon.src = cloudyday3;
        break;
      case 804:
        icon.src = cloudy;
        break;
      default:
        icon.src = sunny;
        break;
    }
}