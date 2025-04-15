const temparature = document.getElementById("temparature");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.getElementById("weather-img");

const getCity = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();

  if (response.ok) {
    return data.city;
  }
};

const getWeather = async (cityName = "Agartala") => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4bcd1896070a4490bc2162402251504&q=${cityName}`
  );
  const data = await response.json();

  if (response.ok) {
    temparature.innerText = data.current.temp_c + " \u00B0C";
    city.innerText = data.location.name;
    humidity.innerText = data.current.humidity + " %";
    windSpeed.innerText = data.current.wind_kph + " km/h";
    weatherImg.src = data.current.condition.icon;
  }
};

// apiCall();

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value.trim()) {
    getWeather(searchInput.value.trim());
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const cityName = await getCity();
  getWeather(cityName);
});
