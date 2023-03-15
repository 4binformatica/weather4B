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

  let day1date = weather.list[0].dt_txt;
  let day2date = weather.list[8].dt_txt;
  let day3date = weather.list[16].dt_txt;
  let day4date = weather.list[24].dt_txt;
  let day5date = weather.list[32].dt_txt;

  //get the monday, tuesday, wednesday, thursday, friday
  let day1 = giorniSettimana[new Date(day1date).getDay()]
  let day2 = giorniSettimana[new Date(day2date).getDay()]
  let day3 = giorniSettimana[new Date(day3date).getDay()]
  let day4 = giorniSettimana[new Date(day4date).getDay()]
  let day5 = giorniSettimana[new Date(day5date).getDay()]




  console.log(day1date);
  console.log(day2date);
  console.log(day3date);
  console.log(day4date);
  console.log(day5date);

  console.log(day1);
  console.log(day2);
  console.log(day3);
  console.log(day4);
  console.log(day5);



  console.log(weather);
  console.log(astronimicInfo);

  console.log("day1: " + day1);
  console.log("day2: " + day2);
  console.log("day3: " + day3);
  console.log("day4: " + day4);
  console.log("day5: " + day5);


  console.log("temp: " + temp + " tempF: " + tempF + " tempC: " + tempC + " tempK: " + tempK);
  console.log("tempMin: " + tempMin + " tempMinF: " + tempMinF + " tempMinC: " + tempMinC + " tempMinK: " + tempMinK);
  console.log("tempMax: " + tempMax + " tempMaxF: " + tempMaxF + " tempMaxC: " + tempMaxC + " tempMaxK: " + tempMaxK);
  console.log("humidity: " + humidity);
  console.log("pressure: " + pressure);

  let sunrise = astronimicInfo.results.sunrise;
  let sunset = astronimicInfo.results.sunset;
  let dayLength = astronimicInfo.results.day_length;

  console.log("sunrise: " + sunrise);
  console.log("sunset: " + sunset);
  console.log("dayLength: " + dayLength);

  const Temp1 = document.getElementById("Temp1");
  const MaxTemp1 = document.getElementById("MaxTemp1");
  const MinTemp1 = document.getElementById("MinTemp1");
  const Humidity1 = document.getElementById("Humidity1");
  const Wind1 = document.getElementById("Wind1");

  Temp1.innerHTML = tempC + "°C";
  MinTemp1.innerHTML = tempMinC + "°C";
  MaxTemp1.innerHTML = tempMaxC + "°C" + " /";
  Humidity1.innerHTML = "Humidity: " + humidity + "%";
  Wind1.innerHTML = "Wind: " + wind + "m/s";
  
  changeCard(tempC, "day1", "dayicon1", weather.weather[0].id);

  
  



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