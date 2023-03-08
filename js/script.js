API_KEY = 'c631f4074106798e9dfdccd9cfe66974';

let search = function () {
    console.log("searching");
    let input = document.getElementById('searchBar').value
    input = input.toLowerCase();    
    if(input == "")
        return;

    let weather = getWeather(input);
    let astronimicInfo = getAstronimicInfo(input);

    let temp = weather.main.temp;
    let tempF = Math.round((temp - 273.15) * 9/5 + 32);
    let tempC = Math.round(temp - 273.15);
    let tempK = Math.round(temp);
    let tempMin = weather.main.temp_min;
    let tempMinF = Math.round((tempMin - 273.15) * 9/5 + 32);
    let tempMinC = Math.round(tempMin - 273.15);
    let tempMinK = Math.round(tempMin);
    let tempMax = weather.main.temp_max;
    let tempMaxF = Math.round((tempMax - 273.15) * 9/5 + 32);
    let tempMaxC = Math.round(tempMax - 273.15);
    let tempMaxK = Math.round(tempMax);
    let humidity = weather.main.humidity;
    let pressure = weather.main.pressure;

    console.log(weather);
    console.log(astronimicInfo);

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


}

let getWeather = function (city) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY;
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    let response = JSON.parse(req.responseText);
    return response;
}

let getAstronimicInfo = function (city) {
    let url = 'https://api.sunrise-sunset.org/json?lat=' + calcLat(city) + '&lng=' + calcLon(city) + '&date=today';
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    let response = JSON.parse(req.responseText);
    return response;
}

let calcLat = function (city) {
    let lat = getWeather(city).lat;
    return lat;
}

let calcLon = function (city) {
    let lon = getWeather(city).lon;
    return lon;  
}
function search() {
    alert('Hai premuto il tasto Invio!');
  }

  $(document).ready(function() {
    $('#myInput').on('keydown', function(event) {
      if (event.keyCode === 13) { 
        search();
      }
    });
  });


