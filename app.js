// OpenWeatherMap API Key (replace with your own API key)
const apiKey = '306faf28a863c5fbc5919cfa3f412479';

// Function to fetch and display weather information
async function getWeather() {
  const location = document.getElementById('location').value;
  const weatherInfo = document.getElementById('weather-info');
  const locationName = document.getElementById('location-name');
  const weatherDescription = document.getElementById('weather-description');
  const temperature = document.getElementById('temperature');
  const weatherIcon = document.getElementById('weather-icon');

  if (location === '') {
    alert('Please enter a location.');
    return;
  }

  // Clear previous weather data
  weatherInfo.style.display = 'none';
  locationName.textContent = '';
  weatherDescription.textContent = '';
  temperature.textContent = '';
  weatherIcon.innerHTML = '';

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      alert('Location not found!');
      return;
    }

    // Update the UI with weather data
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `${data.main.temp}°C`;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`;
    
    // Show the weather info
    weatherInfo.style.display = 'block';
  } catch (error) {
    alert('Error fetching weather data.');
  }
}



