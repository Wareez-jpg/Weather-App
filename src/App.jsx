import { useState } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)

  async function handleSearch(city) {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoResponse.json()

    if (!geoData.results || geoData.results.length === 0) {
      alert('City not found. Please check the spelling and try again.')
      return
    }

    const { latitude, longitude } = geoData.results[0]

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    )
    const weatherData = await weatherResponse.json()
     
    setWeatherData(weatherData.current)
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch}/>
      {weatherData && (
        <div className="weather-display">
          <p>Temperature: {weatherData.temperature_2m}°C</p>
          <p>Weather code: {weatherData.weather_code}</p>
        </div>
      )}
    </div>
  )
}

export default App