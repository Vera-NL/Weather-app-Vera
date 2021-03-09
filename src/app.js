  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  let date = now.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "Augustus", "September", "October", "November", "December"]
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  
  let today = document.querySelector("#today");
  let monthYear = document.querySelector("#month-year");
  today.innerHTML = `${day} ${hours}:${minutes} `;
  monthYear.innerHTML = `${date} ${month} ${year}`;

//

function search(city) {
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  console.log(response);
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
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-snowman fa-7x"></i>`;
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
    document.querySelector("#app").style.backgroundImage = "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)";
  } else if (weatherID >= 801 && weatherID <= 804) {
    // clouds
    document.querySelector("#current-weather-icon").innerHTML = `<i class="fas fa-cloud-sun fa-7x"></i>`;
    document.querySelector("#current-weather-icon").style.color = "#0d8eca";
    document.querySelector("#app").style.backgroundImage = "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)";
  } 
}

function showForecast(response) {
  console.log(response);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function showLocation(position) {
let longitude = position.coords.longitude;
let latitude = position.coords.latitude;
let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
}

function celsiusConvert(event) {
  event.preventDefault();
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsius);
  }

let celsius = null;

document.querySelector("#fahrenheit-link").addEventListener("click", fahrenheitConvert);

document.querySelector("#celsius-link").addEventListener("click", celsiusConvert);