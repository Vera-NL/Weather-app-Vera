function formatDate(timestamp) {
  document.querySelector("#today").innerHTML = `${formatDays(timestamp)} ${formatHours(timestamp)}`;
  }
  
function formatHours (timestamp) {
  let now = new Date(timestamp);
  let hours = (now.getHours()<10? `0` : ``) + now.getHours();
  let minutes = (now.getMinutes()<10? `0` : ``) + now.getMinutes();
  return `${hours}:${minutes}`;
}

function formatDays (timestamp) {
  let now = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days [now.getDay()];
  return `${day}`;
}
  
  let now = new Date();
  let date = now.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "Augustus", "September", "October", "November", "December"]
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  document.querySelector("#month-year").innerHTML = `${date} ${month} ${year}`;
  
//

function showWeather(response) {
  celsius = response.data.main.temp;
  document.querySelector("#temperature").innerHTML= Math.round(celsius); 
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

  let weatherID = response.data.weather[0].id;
  document.querySelector("#current-weather-icon").innerHTML = weatherID;
  
  // https://openweathermap.org/weather-conditions

  if (weatherID >= 200 && weatherID < 300) {
    // thunderstorms
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-bolt fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)";
  } else if (weatherID >= 300 && weatherID < 500) {
    // drizzle
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-cloud-rain fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)";
  } else if (weatherID >= 500 && weatherID < 600) {
    // rain
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-cloud-showers-heavy fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
  } else if (weatherID >= 600 && weatherID < 700) {
    // snow
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-snowflake fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
  } else if (weatherID >= 700 && weatherID < 800) {
    // 'atmosphere'
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-smog fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)";
  } else if (weatherID === 800) {
    // clear
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-sun fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(to top, #f8eec6 0%, #e2f4fa 100%)";
  } else if (weatherID >= 801 && weatherID <= 804) {
    // clouds
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-cloud-sun fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(45deg, #e4efe9 0%, #93a5cf 100%)";
  } 

  let longitude = response.data.coords.lon;
  let latitude = response.data.coords.lat;
  //document.querySelector("#forecast-days").innerHTML = latitude;
  //document.querySelector("#forecast-days").innerHTML = longitude;
  getForecastDays(latitude, longitude);
}

function getForecastDays (latitude, longitude) {
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecastDays);
}

function showForecastDays(response) {
  document.querySelector("#forecast-days").innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    document.querySelector("#forecast-days").innerHTML += 
  `<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
    <div>
        <h3 id="daily-forecast">
          ${formatDays(forecast.dt * 1000)} <img 
          src="https://openweathermap.org/img/wn/${forecast.weather[0].id}@2x.png"
        />
        </h3>
    </div>
    <div class="forecast-days-temperature">
        <strong class="max-temp-days">
          ${Math.round(forecast.temp.max)}
        </strong><span class="degrees">°</span> 
          / <span class="min-temp-days"> ${Math.round(forecast.temp.min)}</span>°  
    </div>
  </div>`
}
}

function showForecastHours(response) {
  document.querySelector("#forecast-hours").innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    document.querySelector("#forecast-hours").innerHTML += 
  `<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
    <h3>
      ${formatHours(forecast.dt * 1000)}
    </h3>
    <img 
      src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    />
    <div class="forecast-hours-temperature">
      <strong class="max-temp-hours">
        ${Math.round(forecast.main.temp_max)}
      </strong><span class="degrees">°</span> 
        / <span class="min-temp-hours">${Math.round(forecast.main.temp_min)}</span>°
    </div>
  </div>`
}
}

//

function search(city) {
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecastHours);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
  let city = document.querySelector("#search-city").value;
  search(city);
}

//

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
 navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

search("Amsterdam");

//

function fahrenheitConvert(event) {
  event.preventDefault();
  document.querySelector("#celsius-link").classList.remove("active");
  document.querySelector("#fahrenheit-link").classList.add("active");
  document.querySelector("#temperature").innerHTML = Math.round((celsius * 9) / 5 + 32);
  document.querySelector(".max-temp-hours").innerHTML = Math.round((celsius * 9) / 5 + 32);
  document.querySelector(".min-temp-hours").innerHTML = Math.round((celsius * 9) / 5 + 32);
  //document.querySelector(".max-temp-days").innerHTML = Math.round((celsius * 9) / 5 + 32);
  //.querySelector(".min-temp-days").innerHTML = Math.round((celsius * 9) / 5 + 32);
}

function celsiusConvert(event) {
  event.preventDefault();
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsius);
  document.querySelector(".max-temp-hours").innerHTML = Math.round(celsius);
  document.querySelector(".min-temp-hours").innerHTML = Math.round(celsius);
  //document.querySelector(".max-temp-days").innerHTML = Math.round(celsius);
  //document.querySelector(".min-temp-days").innerHTML = Math.round(celsius);
  }

let celsius = null;

document.querySelector("#fahrenheit-link").addEventListener("click", fahrenheitConvert);

document.querySelector("#celsius-link").addEventListener("click", celsiusConvert);