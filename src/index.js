import './styles/reset.css';
import './styles/style.css';
import { WeatherWidget } from './components/WeatherWidget';
import { fetchWeatherData, customLocationInput } from './logic/weather';

document.addEventListener('DOMContentLoaded', async () => {
    let weatherInfoObj = await fetchWeatherData();
    WeatherWidget.render(weatherInfoObj);
});

// Custom location 
const locationBtn = document.getElementById('custom-location-btn');
locationBtn.addEventListener('click', customLocationInput);
const locationInput = document.getElementById('custom-location');
locationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        customLocationInput();
    }
})