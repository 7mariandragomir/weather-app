export { fetchWeatherData };
import { location } from './logic/location';

async function fetchWeatherData() {
    try {
        const pos = await location.fetchLocation();
        console.log(pos);
    
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

        console.log(weatherObject);
        
        return weatherObject;
    } catch(error) {
        console.error(error);
    }
}