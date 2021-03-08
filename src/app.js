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
}

function showWeather(response) {
  console.log(response);
  celsius = response.data.main.temp;
  document.querySelector("#temperature").innerHTML= Math.round(celsius); 
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#descripton").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
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
  let temperature = document.querySelector("#temperature").innerHTML;
  document.querySelector("#temperature").innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function celsiusConvert(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsius);
  }

let celsius = null;

document.querySelector("#fahrenheit-link").addEventListener("click", fahrenheitConvert);

document.querySelector("#celsius-link").addEventListener("click", celsiusConvert);