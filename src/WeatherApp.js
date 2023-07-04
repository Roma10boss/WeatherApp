import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const APIKey = 'API key';

  const handleSearch = () => {
    if (city === '') return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
      )
      .then(response => {
        if (response.data.error) {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error ? (
        <div className="not-found">City not found</div>
      ) : weatherData ? (
        <div className="weather-box">
          <img src={getImageUrl(weatherData.current.condition.text)} alt="Weather Icon" />
          <div className="temperature">
            {weatherData.current.temp_c}
            <span>°C</span>
          </div>
          <div className="description">{weatherData.current.condition.text}</div>
          <div className="weather-details">
            <div className="humidity">
              Humidity: <span>{weatherData.current.humidity}%</span>
            </div>
            <div className="wind">
              Wind: <span>{weatherData.current.wind_kph} Km/h</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const getImageUrl = weatherType => {
  switch (weatherType) {
    case 'Clear':
      return 'weather-icons/clear.png';
    case 'Rain':
      return 'weather-icons/rainy.png';
    case 'Snow':
      return 'weather-icons/snowy.png';
    case 'Clouds':
      return 'weather-icons/cloudy.png';
    case 'Haze':
      return 'weather-icons/mist.png';
    case 'error':
      return 'weather-icons/404.png';
    default:
      return '';
  }
};

export default WeatherApp;
