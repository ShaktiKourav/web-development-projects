// ================= ELEMENTS =================

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const errorMessage =
    document.getElementById("errorMessage");

const loadingMessage =
    document.getElementById("loadingMessage");

const currentWeather =
    document.getElementById("currentWeather");

const cityName =
    document.getElementById("cityName");

const countryName =
    document.getElementById("countryName");

const temperature =
    document.getElementById("temperature");

const weatherDescription =
    document.getElementById("weatherDescription");

const weatherIcon =
    document.getElementById("weatherIcon");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const feelsLike =
    document.getElementById("feelsLike");

const forecastContainer =
    document.getElementById("forecastContainer");


// ================= WEATHER CODES =================

const weatherCodes = {

    0: {
        description: "Clear sky",
        icon: "☀️"
    },

    1: {
        description: "Mainly clear",
        icon: "🌤️"
    },

    2: {
        description: "Partly cloudy",
        icon: "⛅"
    },

    3: {
        description: "Overcast",
        icon: "☁️"
    },

    45: {
        description: "Fog",
        icon: "🌫️"
    },

    48: {
        description: "Depositing rime fog",
        icon: "🌫️"
    },

    51: {
        description: "Light drizzle",
        icon: "🌦️"
    },

    53: {
        description: "Moderate drizzle",
        icon: "🌦️"
    },

    55: {
        description: "Dense drizzle",
        icon: "🌧️"
    },

    61: {
        description: "Slight rain",
        icon: "🌦️"
    },

    63: {
        description: "Moderate rain",
        icon: "🌧️"
    },

    65: {
        description: "Heavy rain",
        icon: "🌧️"
    },

    71: {
        description: "Slight snow",
        icon: "🌨️"
    },

    73: {
        description: "Moderate snow",
        icon: "❄️"
    },

    75: {
        description: "Heavy snow",
        icon: "❄️"
    },

    80: {
        description: "Rain showers",
        icon: "🌦️"
    },

    81: {
        description: "Moderate rain showers",
        icon: "🌧️"
    },

    82: {
        description: "Heavy rain showers",
        icon: "⛈️"
    },

    95: {
        description: "Thunderstorm",
        icon: "⛈️"
    },

    96: {
        description: "Thunderstorm with hail",
        icon: "⛈️"
    },

    99: {
        description: "Thunderstorm with heavy hail",
        icon: "⛈️"
    }
};


// ================= SEARCH CITY =================

async function searchCity(city) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Unable to search for the city."
        );
    }

    const data =
        await response.json();

    if (
        !data.results ||
        data.results.length === 0
    ) {

        throw new Error(
            "City not found. Please enter a valid city name."
        );
    }

    return data.results[0];
}


// ================= GET WEATHER =================

async function getWeather(
    latitude,
    longitude
) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Unable to fetch weather data."
        );
    }

    return await response.json();
}


// ================= GET WEATHER INFO =================

function getWeatherInfo(code) {

    return weatherCodes[code] || {
        description: "Unknown weather",
        icon: "🌡️"
    };
}


// ================= DISPLAY CURRENT WEATHER =================

function displayCurrentWeather(
    location,
    weather
) {

    const current =
        weather.current;

    const info =
        getWeatherInfo(
            current.weather_code
        );


    cityName.textContent =
        location.name;

    countryName.textContent =
        `${location.admin1 || ""}, ${location.country}`;


    temperature.textContent =
        `${Math.round(
            current.temperature_2m
        )}°C`;


    weatherDescription.textContent =
        info.description;


    weatherIcon.textContent =
        info.icon;


    humidity.textContent =
        `${current.relative_humidity_2m}%`;


    windSpeed.textContent =
        `${Math.round(
            current.wind_speed_10m
        )} km/h`;


    feelsLike.textContent =
        `${Math.round(
            current.apparent_temperature
        )}°C`;
}


// ================= DISPLAY FORECAST =================

function displayForecast(weather) {

    forecastContainer.innerHTML = "";


    const daily =
        weather.daily;


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const card =
            document.createElement("article");

        card.className =
            "forecast-card";


        const date =
            new Date(
                daily.time[i]
            );


        const formattedDate =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                }
            );


        const info =
            getWeatherInfo(
                daily.weather_code[i]
            );


        card.innerHTML = `
            <p class="forecast-date">
                ${formattedDate}
            </p>

            <div class="forecast-icon">
                ${info.icon}
            </div>

            <p class="forecast-temp">
                ${Math.round(
                    daily.temperature_2m_max[i]
                )}°C /
                ${Math.round(
                    daily.temperature_2m_min[i]
                )}°C
            </p>

            <p class="forecast-condition">
                ${info.description}
            </p>
        `;


        forecastContainer.appendChild(
            card
        );
    }
}


// ================= SHOW ERROR =================

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.style.display =
        "block";

    currentWeather.style.display =
        "none";

    forecastContainer.innerHTML =
        "";
}


// ================= HIDE ERROR =================

function hideError() {

    errorMessage.style.display =
        "none";
}


// ================= SHOW LOADING =================

function showLoading() {

    loadingMessage.style.display =
        "block";
}


// ================= HIDE LOADING =================

function hideLoading() {

    loadingMessage.style.display =
        "none";
}


// ================= MAIN FUNCTION =================

async function loadWeather() {

    const city =
        cityInput.value.trim();


    // Validation

    if (city === "") {

        showError(
            "Please enter a city name."
        );

        return;
    }


    hideError();

    showLoading();


    try {

        // Step 1:
        // Search city coordinates

        const location =
            await searchCity(city);


        // Step 2:
        // Fetch weather

        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );


        // Step 3:
        // Display current weather

        displayCurrentWeather(
            location,
            weather
        );


        // Step 4:
        // Display forecast

        displayForecast(
            weather
        );


        currentWeather.style.display =
            "block";


    } catch (error) {

        showError(
            error.message
        );

    } finally {

        hideLoading();
    }
}


// ================= SEARCH BUTTON =================

searchBtn.addEventListener(
    "click",
    loadWeather
);


// ================= ENTER KEY =================

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            loadWeather();
        }
    }
);