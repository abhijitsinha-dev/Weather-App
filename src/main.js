const temparature = document.getElementById("temparature");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.getElementById("weather-img");
const error = document.getElementById("error");

const getCity = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();

  if (response.ok) {
    return data.city;
  }
};

const getWeather = async (cityName) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_API_KEY
    }&q=${cityName}`
  );
  const data = await response.json();

  if (response.ok) {
    temparature.innerText = data.current.temp_c + " \u00B0C";
    city.innerText = data.location.name;
    humidity.innerText = data.current.humidity + " %";
    windSpeed.innerText = data.current.wind_kph + " km/h";
    weatherImg.src = data.current.condition.icon;
    error.innerText = "";
  } else {
    error.innerText = data.error.message;
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const cityName = searchInput.value.trim();
  searchInput.value = "";
  if (cityName) {
    getWeather(cityName);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const cityName = await getCity();
  getWeather(cityName);
});
