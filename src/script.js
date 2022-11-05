import "./style.css";
const cityInput = document.querySelector(`.city-input`);
const cityShow = document.querySelector(`.city-name`);
const tempShow = document.querySelector(`.temp`);
const feelsTempShow = document.querySelector(`.feelsTemp`);
const humidity = document.querySelector(`.humidity`);
const form = document.querySelector(`.form`);
const weatherTab = document.querySelector(`.weather-tab`);
const weatherBig = document.querySelector(`.left-side`);
const weatherType = document.querySelector(`.weather-type`);
const convertWeatherData = function (data) {
  const {
    clouds: clouds,
    wind: { speed: speed },
    name: cityName,
    main: { temp: temperature, feels_like: feelsLike, humidity: humidity },
  } = data;
  let weather = data.weather[0].description;
  console.log(weather);
  return { cityName, temperature, feelsLike, humidity, weather, speed, clouds };
};

const getWeatherData = async function (city) {
  const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=28fe7b5f9a78838c639143fc517e4343`;
  const response = await fetch(weatherLink);
  if (!response.ok) {
    throw new Error(`City ${city} not found`);
  }
  const data = convertWeatherData(await response.json());
  cityShow.textContent = `${data.cityName}`;
  tempShow.textContent = `${data.temperature.toFixed(0)}°`;
  weatherType.textContent = `${
    data.weather.charAt(0).toUpperCase() + data.weather.slice(1)
  }`;
  feelsTempShow.textContent = `Feels like temperature: ${data.feelsLike.toFixed(
    0
  )}°`;
  humidity.innerHTML = `Humidity: ${data.humidity}%`;
  cityInput.value = ``;
  weatherTab.style.display = `flex`;
  weatherBig.style.display = `flex`;

  return data;
};
form.addEventListener(`submit`, function (e) {
  const city = cityInput.value;
  e.preventDefault();
  getWeatherData(city);
});
const weatherLink1 = `https://api.openweathermap.org/data/2.5/weather?q=Szczecin&units=metric&appid=28fe7b5f9a78838c639143fc517e4343`;
const response1 = fetch(weatherLink1)
  .then((res) => res.json())
  .then((res) => console.log(res));
console.log(response1);
