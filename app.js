// ============================================
// LESSON 12 — Weather Dashboard
// Keep your OpenWeatherMap API key in config.js (never in this file).
// ============================================

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MAX_RECENT = 5;

// DOM elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// STEP 1: Fetch weather data and handle HTTP errors.
async function fetchWeather(city) {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    // fetch() does not reject automatically for HTTP 404/401 responses.
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("City not found. Please check the spelling and try again.");
        }
        if (response.status === 401) {
            throw new Error("API key not valid yet. Check your OpenWeatherMap API key.");
        }
        throw new Error("Failed to fetch weather data. Please try again.");
    }

    return response.json();
}

// STEP 2: Manage loading, error and success states.
async function getWeather(city) {
    if (typeof API_KEY === "undefined" || !API_KEY) {
        showError("Missing API key: copy config.example.js to config.js and add your OpenWeatherMap API key.");
        return;
    }

    showLoading();
    hideError();

    try {
        const data = await fetchWeather(city);
        displayWeather(data);
        saveToHistory(data.name);
    } catch (err) {
        showError(
            err.name === "TypeError"
                ? "Network error — check your connection and try again."
                : err.message
        );
    } finally {
        hideLoading();
    }
}

// STEP 3: Display all weather information.
function displayWeather(data) {
    const currentWeather = data.weather[0];

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
    weatherIcon.alt = currentWeather.description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = currentWeather.description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

// Helpers for the interface.
function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

function hideError() {
    errorBox.classList.add("hidden");
}

// STEP 4: Save and display the five most recent searches.
function loadRecent() {
    try {
        const saved = JSON.parse(localStorage.getItem("recent")) || [];
        return Array.isArray(saved) ? saved : [];
    } catch (err) {
        // localStorage may contain invalid JSON or be unavailable.
        return [];
    }
}

function saveToHistory(city) {
    const normalizedCity = city.trim();
    recent = recent.filter(
        (item) => item.toLowerCase() !== normalizedCity.toLowerCase()
    );
    recent.unshift(normalizedCity);
    recent = recent.slice(0, MAX_RECENT);

    try {
        localStorage.setItem("recent", JSON.stringify(recent));
    } catch (err) {
        // Weather lookup still works if browser storage is disabled/full.
    }

    renderHistory();
}

function renderHistory() {
    historyList.textContent = "";

    recent.forEach((city) => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.className = "history-item";
        button.textContent = city;

        listItem.appendChild(button);
        historyList.appendChild(listItem);
    });
}

let recent = loadRecent();

// STEP 5: Form submission and delegated clicks on recent searches.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

historyList.addEventListener("click", (event) => {
    const button = event.target.closest(".history-item");

    if (button && historyList.contains(button)) {
        getWeather(button.textContent);
    }
});

// Show searches saved from a previous visit.
renderHistory();
