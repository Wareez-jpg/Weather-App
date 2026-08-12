import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'

const weatherCodeMap = {
  0: { label: 'Clear sky', icon: '☀️', theme: 'sunny' },
  1: { label: 'Mostly clear', icon: '🌤️', theme: 'sunny' },
  2: { label: 'Partly cloudy', icon: '⛅', theme: 'cloudy' },
  3: { label: 'Overcast', icon: '☁️', theme: 'cloudy' },
  45: { label: 'Fog', icon: '🌫️', theme: 'cloudy' },
  61: { label: 'Light rain', icon: '🌦️', theme: 'rainy' },
  63: { label: 'Moderate rain', icon: '🌧️', theme: 'rainy' },
  65: { label: 'Heavy rain', icon: '🌧️', theme: 'rainy' },
  71: { label: 'Light snow', icon: '🌨️', theme: 'snowy' },
  73: { label: 'Moderate snow', icon: '❄️', theme: 'snowy' },
  75: { label: 'Heavy snow', icon: '❄️', theme: 'snowy' },
  95: { label: 'Thunderstorm', icon: '⛈️', theme: 'stormy' },
}

function App() {
  const [cities, setCities] = useState(null)

  async function fetchCityWeather(city) {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoResponse.json()

    if (!geoData.results || geoData.results.length === 0) {
      alert('City not found. Please check the spelling and try again.')
      return null
    }

    const { latitude, longitude, name } = geoData.results[0]

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`
    )
    const weatherData = await weatherResponse.json()

    return { ...weatherData.current, city: name }
  }

  useEffect(() => {
    async function loadDefaultCities() {
      const defaultCityNames = ['Liverpool', 'London', 'New York']
      const results = await Promise.all(
        defaultCityNames.map((city) => fetchCityWeather(city))
      )
      setCities(results.filter((result) => result !== null))
    }

    loadDefaultCities()
  }, [])

  async function handleSearch(city) {
    const result = await fetchCityWeather(city)
    if (result) {
      setCities((prevCities) => [...prevCities, result])
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch}/>
      {weatherData && (
        <div className={`weather-display theme-${weatherCodeMap[weatherData.weather_code].theme}`}>
          <h2>{weatherData.city}</h2>
          <div className="icon">{weatherCodeMap[weatherData.weather_code].icon}</div>
          <p>Temperature: {weatherData.temperature_2m}°C</p>
          <p>Condition: {weatherCodeMap[weatherData.weather_code].label}</p>
          <p>Humidity: {weatherData.relative_humidity_2m}%</p>
          <p>Wind Speed: {weatherData.wind_speed_10m} km/h</p>
        </div>
      )}
    </div>
  )
}

export default App