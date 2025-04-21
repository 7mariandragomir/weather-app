export { fetchWeatherData, fetchCustomWeatherData, customLocationInput };
import { location } from "./location";
import { WeatherWidget } from "../components/WeatherWidget";

async function fetchWeatherData() {
    try {
        const pos = await location.fetchLocation();
    
        const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${pos.coords.latitude},${pos.coords.longitude}?key=DNAB2EVQYZ2P9TMYXP3VEJDCD`;
        const response = await fetch(requestURL);
        const weatherData = await response.json();

        const weatherObject = {
            tempFh: weatherData.currentConditions.temp,
            tempFeelsLikeFh: weatherData.currentConditions.feelslike,
            tempCs: (weatherData.currentConditions.temp - 32) * 5 / 9,
            tempFeelsLikeCs: (weatherData.currentConditions.feelslike - 32) * 5 / 9,
            condition: weatherData.currentConditions.conditions,
            conditionsIcon: weatherData.currentConditions.icon,
        }
        
        return weatherObject;
    } catch(error) {
        console.error(error);
    }
}

async function fetchCustomWeatherData(customLocation) {
    try {
        const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${customLocation}?key=DNAB2EVQYZ2P9TMYXP3VEJDCD`;
        const response = await fetch(requestURL);
        const weatherData = await response.json();

        const weatherObject = {
            tempFh: weatherData.currentConditions.temp,
            tempFeelsLikeFh: weatherData.currentConditions.feelslike,
            tempCs: (weatherData.currentConditions.temp - 32) * 5 / 9,
            tempFeelsLikeCs: (weatherData.currentConditions.feelslike - 32) * 5 / 9,
            condition: weatherData.currentConditions.conditions,
            conditionsIcon: weatherData.currentConditions.icon,
            address: weatherData.resolvedAddress,
        }

        return weatherObject;
    } catch(error) {
        console.error(error);
    }
}

async function customLocationInput() {
    const locationInput = document.getElementById('custom-location');

    if (locationInput.value == null || locationInput.value.trim() == '') {
        alert('Custom location cannot be blank.')
    } else {
        let weatherInfoObj = await fetchCustomWeatherData(locationInput.value);
        WeatherWidget.render(weatherInfoObj);
    }
};