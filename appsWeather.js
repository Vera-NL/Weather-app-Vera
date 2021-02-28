let now = new Date();
let h2 = document.querySelector("h2");
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
h2.innerHTML = `${day} ${hours}:${minutes}`;

//

function search(city) {
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature-actual").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function showLocation(position) {
let longitude = position.coords.longitude;
let latitude = position.coords.latitude;
apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUr).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
 navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);

search("Amsterdam");

//function fahrenheit(event) {
//event.preventDefault();
//let fahrenheitConvert = document.querySelector("#temperature-actual");
//fahrenheitConvert.innerHTML = (19*9)/5+32;
//}

//let fahrenheitTemp = document.querySelector("#fahrenheit");
//fahrenheitTemp.addEventListener("click", fahrenheit);

//function celsius(event) {
//event.preventDefault();
//let celciusConvert = document.querySelector("#temperature-actual");
//celciusConvert.innerHTML = 19;
//}

//let celsiusTemp = document.querySelector("#celsius");
//celsiusTemp.addEventListener("click", celsius);