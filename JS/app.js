document.addEventListener('DOMContentLoaded',function()
{
    const inputMain=document.querySelector('#city-name');
    const searchBtn=document.querySelector('#city-button');
    const weatherInfo=document.querySelector('#weatherInfo');
    const modeBtn=document.querySelector('#mode-button');
    const body=document.querySelector('body');

    searchBtn.addEventListener('click',function()
    {
        const cityName=inputMain.value;
        // console.log(cityName);

        weatherInfo.innerHTML = '';
        getWeatherInfo(cityName,weatherInfo);
    })

    modeBtn.addEventListener('click',function(){
        body.classList.toggle('mode-change');
    })
    
})

function getWeatherInfo(cityName,weatherInfo)
{
    const promise=fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1cf37b5d25e1987a6850ab3c6b76e2de&units=metric`);

    promise
    .then((response)=>{
        if(!response.ok)
        {
            throw Error('Something went wrong...');
        }
        else
        {
            return response.json();
        }
    })
    .then((data)=>{
        const main=data.main;
        const UIfeels_like=main.feels_like;
        const UIhumidity=main.humidity;
        // weatherInfo.innerText=`${UIfeels_like} and ${UIhumidity}`;
        // console.log(UIfeels_like);
        // console.log(UIhumidity);
        
        //showing dff weather conditions
        const weather=data.weather;
        const currentCondition=weather[0].description;
        // console.log(currentCondition);

        if(UIfeels_like<10)
        {
            const contentToDisplay=`<img src="../IMAGES/snowflake.png" alt="weather-icon" class="weather-img">
                                    <h4 class="weather-h4">Temperature: <span class="weather-span">${UIfeels_like}</span></h4>
                                    <h4 class="weather-h4">Humidity: <span class="weather-span">${UIhumidity}</span></h4>`;
            weatherInfo.innerHTML=contentToDisplay;                        
        }
        else if(currentCondition.includes('smoke'))
        {
            const contentToDisplay=`<img src="../IMAGES/sun.png" alt="weather-icon" class="weather-img">
                                    <h4 class="weather-h4">Temperature: <span class="weather-span">${UIfeels_like}</span></h4>
                                    <h4 class="weather-h4">Humidity: <span class="weather-span">${UIhumidity}</span></h4>`;
            weatherInfo.innerHTML=contentToDisplay;                        
        }
        else if(currentCondition.includes('cloud'))
        {
            const contentToDisplay=`<img src="../IMAGES/cloudy.png" alt="weather-icon" class="weather-img">
                                    <h4 class="weather-h4">Temperature: <span class="weather-span">${UIfeels_like}</span></h4>
                                    <h4 class="weather-h4">Humidity: <span class="weather-span">${UIhumidity}</span></h4>`;
            weatherInfo.innerHTML=contentToDisplay;                        
        }
        else if(currentCondition.includes('rain'))
        {
            const contentToDisplay=`<img src="../IMAGES/thunderstorm.png" alt="weather-icon" class="weather-img">
                                    <h4 class="weather-h4">Temperature: <span class="weather-span">${UIfeels_like}</span></h4>
                                    <h4 class="weather-h4">Humidity: <span class="weather-span">${UIhumidity}</span></h4>`;
            weatherInfo.innerHTML=contentToDisplay;                        
        }
    })
    .catch((error) => {
        showError('Something went wrong...');
      });
};

function showError(error)
{
    const errorDiv=document.createElement('div');
    errorDiv.className='alert alert-danger';

    const first=document.querySelector('.card');
    const second=document.querySelector('.card-heading-portion');

    errorDiv.appendChild(document.createTextNode(error));

    first.insertBefore(errorDiv,second);

    setTimeout(clearError,3000);
}

function clearError()
{
    const error = document.querySelector('.alert.alert-danger');
    if (error) {
        error.remove();
    }
}