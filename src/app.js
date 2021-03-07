function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days [date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
  }
  
  function formatHours (timestamp) {
      let date = new Date(timestamp);
      let hours = (date.getHours()<10? `0` : ``) + date.getHours();
      let minutes = (date.getMinutes()<10? `0` : ``) + date.getMinutes();
      return `${hours}:${minutes}`;
  }


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
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  
  date.innerHTML = `${day} ${hours}:${minutes}`;
  month.innerHTML =`${date} ${month}, ${year}`;
//

function search(city) {
  let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#descripton").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

//function fahrenheit(event) {
//event.preventDefault();
//let fahrenheitConvert = document.querySelector("#temperature");
//fahrenheitConvert.innerHTML = (19*9)/5+32;
//}

//let fahrenheitTemp = document.querySelector("#fahrenheit-link");
//fahrenheitTemp.addEventListener("click", fahrenheit);

//function celsius(event) {
//event.preventDefault();
//let celciusConvert = document.querySelector("#temperature");
//celciusConvert.innerHTML = 19;
//}

//let celsiusTemp = document.querySelector("#celsius-link");
//celsiusTemp.addEventListener("click", celsius);