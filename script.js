const apiKey = '08306aeb9fd18f3b7813b49d26e40909';
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const resultDiv = document.getElementById('result');

const cityIds = {
    Kyiv: 703448,
    London: 2643743
};

getWeatherButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    const cityId = cityIds[cityName];

    if (!cityId) {
        resultDiv.innerHTML = 'City not found. Please enter a valid city name.';
        return;
    }

    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                resultDiv.innerHTML = `
                    <h3>${data.city.name}, ${data.city.country}</h3>
                    <p>Temperature: ${data.list[0].main.temp}°C</p>
                    <p>Weather: ${data.list[0].weather[0].description}</p>
                `;
            } else {
                resultDiv.innerHTML = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = 'Network error or invalid API request.';
        });
});
