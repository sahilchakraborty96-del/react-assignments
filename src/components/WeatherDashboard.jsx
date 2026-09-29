import { useState, useEffect } from 'react';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Standard free OpenWeather demo key

export default function WeatherDashboard() {
  const [city, setCity] = useState('Kolkata');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for °C, 'imperial' for °F

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('City not found. Please try another city.');
        }
        const data = await response.json();
        if (isMounted) {
          setWeatherData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load weather data');
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [city, unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="assignment-container">
      <div className="weather-wrapper">
        <div className="weather-header-actions">
          <form onSubmit={handleSearch} className="weather-search-form">
            <input
              type="text"
              placeholder="Search any city (e.g. London, Mumbai)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="weather-input"
            />
            <button type="submit" className="btn">Search</button>
          </form>

          <button onClick={toggleUnit} className="btn btn-secondary unit-btn">
            Switch to {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>

        {/* Quick select presets */}
        <div className="preset-cities">
          <span>Quick check:</span>
          {['Kolkata', 'Delhi', 'London', 'Tokyo', 'New York'].map((item) => (
            <button
              key={item}
              className={`preset-btn ${city.toLowerCase() === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => setCity(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Status display */}
        {loading && <div className="weather-status-box">Fetching live weather data...</div>}
        {error && <div className="weather-status-box error-box">{error}</div>}

        {/* Weather card */}
        {!loading && !error && weatherData && (
          <div className="weather-main-card">
            <div className="weather-city-banner">
              <h2>{weatherData.name}, {weatherData.sys?.country}</h2>
              <p className="weather-desc">{weatherData.weather[0]?.description}</p>
            </div>

            <div className="weather-temp-row">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                alt="weather icon"
                className="weather-main-icon"
              />
              <div className="temp-display">
                {Math.round(weatherData.main?.temp)}
                <span>{unit === 'metric' ? '°C' : '°F'}</span>
              </div>
            </div>

            <div className="weather-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Feels Like</span>
                <span className="metric-value">
                  {Math.round(weatherData.main?.feels_like)} {unit === 'metric' ? '°C' : '°F'}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Humidity</span>
                <span className="metric-value">{weatherData.main?.humidity}%</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Wind Speed</span>
                <span className="metric-value">
                  {weatherData.wind?.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Atmospheric Pressure</span>
                <span className="metric-value">{weatherData.main?.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}