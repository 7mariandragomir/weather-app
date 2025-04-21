export {WeatherWidget}; 

class WeatherWidget {
    static render(weatherObject) {
        const card = document.getElementById('card');
        card.innerHTML = '';

        // CARD HEADER
        const cardHeader = document.createElement('div');
        cardHeader.setAttribute('id', 'header');

        const headerTitle = document.createElement('h3');
        if (weatherObject.address) {
            headerTitle.innerText = weatherObject.address.split(',')[0];
        } else {
            headerTitle.innerText = "Current Weather";
        }

        const headerTime = document.createElement('h3');
        headerTime.innerText = new Date().toLocaleTimeString();

        cardHeader.appendChild(headerTitle);
        cardHeader.appendChild(headerTime);

        // CARD CONTENT
        const cardContent = document.createElement('div');
        cardContent.setAttribute('id', 'content');

        const contentIcon = document.createElement('img');
        contentIcon.setAttribute('id', 'icon');
        
        (async () => {
            const module = await import(`../icons/${weatherObject.conditionsIcon}.svg`);
            if(module) {
                contentIcon.src = module.default;
            }
        })();

        cardContent.appendChild(contentIcon);

        const contentInfo = document.createElement('div');
        contentInfo.setAttribute('id', 'info');

        const infoTemp = document.createElement('h1');
        infoTemp.innerText = `${Math.round(weatherObject.tempCs)}°`;
        contentInfo.appendChild(infoTemp);

        const infoFeelsLike = document.createElement('h2');
        infoFeelsLike.innerText = `Feels like ${Math.round(weatherObject.tempFeelsLikeCs)}°`
        contentInfo.appendChild(infoFeelsLike);


        cardContent.appendChild(contentInfo);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
    }
}


// const weatherObject = {
    //     tempFh: weatherData.currentConditions.temp,
    //     tempFeelsLikeFh: weatherData.currentConditions.feelslike,
    //     tempCs: (weatherData.currentConditions.temp - 32) * 5 / 9,
    //     tempFeelsLikeCs: (weatherData.currentConditions.feelslike - 32) * 5 / 9,
    //     condition: weatherData.currentConditions.conditions,
    //     conditionsIcon: weatherData.currentConditions.icon,
    // }


{/* <div class="card">
    <div id="header">
        <h3>Current Weather</h3>
        <h3>18:55</h3>
    </div>
    <div id="content">
        <div id="icon">

        </div>
        <div id="info">
            <h1>26°</h1>
            <h2>Feels like 25°</h2>
        </div>
    </div>
</div> */}