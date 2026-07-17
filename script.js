const apiKey = "6cf3b8827d6d460992b4b280f8b6e455";

// Replace YOUR_API_KEY with your OpenWeather API Key
// Example:
// const apiKey = "abc123xyz456";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feels-like");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weather-icon");

const weatherInfo = document.querySelector(".weather-info");
const loader = document.getElementById("loader");
const error = document.getElementById("error");

async function getWeather(city) {

    loader.classList.remove("hide");
    weatherInfo.classList.add("hide");
    error.classList.add("hide");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp) + "°C";
        description.innerText = data.weather[0].description;
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " m/s";
        feelsLike.innerText = Math.round(data.main.feels_like) + "°C";
        visibility.innerText = (data.visibility / 1000).toFixed(1) + " km";

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.classList.remove("hide");

    } catch (err) {

        error.innerText = err.message;
        error.classList.remove("hide");

    } finally {

        loader.classList.add("hide");

    }

}

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }

});

// Press Enter
cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});


const locationBtn = document.getElementById("location-btn");

locationBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        cityName.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp) + "°C";
        description.innerText = data.weather[0].description;
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " m/s";
        feelsLike.innerText = Math.round(data.main.feels_like) + "°C";
        visibility.innerText = (data.visibility / 1000).toFixed(1) + " km";

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.classList.remove("hide");

    });

});


const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});