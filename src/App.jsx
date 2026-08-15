import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import ReviewForm from './components/ReviewForm'

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
  const [cities, setCities] = useState([])
  const [previewCity, setPreviewCity] = useState(null)
  const  [showReviewForm, setShowReviewForm] = useState(false)

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

  const[hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('savedCities')

    if (saved) {
      setCities(JSON.parse(saved))
      setHasLoaded(true)
      return
    }

    async function loadDefaultCities() {
      const defaultCityNames = ['London', 'New York', 'Lagos']
      const results = await Promise.all(
        defaultCityNames.map((city) => fetchCityWeather(city))
      )
      setCities(results.filter((result) => result !== null))
      setHasLoaded(true)
    }

    loadDefaultCities()
  }, [])

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('savedCities', JSON.stringify(cities))
    }
  }, [cities, hasLoaded])

  async function handleSearch(city) {
    const result = await fetchCityWeather(city)
    if (result) {
      setPreviewCity(result)
    }
  }

  function handleAddCity() {
    setCities((prevCities) => {
      const alreadyExists = prevCities.some(
        (c) => c.city.toLowerCase() === previewCity.city.toLowerCase()
      )
      if (alreadyExists) {
        alert(`${previewCity.city} is already on your dashboard.`)
        return prevCities
      }
      return [...prevCities, previewCity]
    })
    setPreviewCity(null)
  }

  function handleRemove(cityName) {
    setCities((prevCities) => prevCities.filter((c) => c.city !== cityName))
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      {previewCity && (
        <div className="modal-backdrop" onClick={() => setPreviewCity(null)}>
          <div
            className={`weather-display theme-${weatherCodeMap[previewCity.weather_code].theme}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{previewCity.city}</h2>
            <div className="icon">{weatherCodeMap[previewCity.weather_code].icon}</div>
            <p>Temperature: {previewCity.temperature_2m}°C</p>
            <p>Condition: {weatherCodeMap[previewCity.weather_code].label}</p>
            <p>Humidity: {previewCity.relative_humidity_2m}%</p>
            <p>Wind Speed: {previewCity.wind_speed_10m} km/h</p>
            <button className="add-btn" onClick={handleAddCity}>+ Add to Dashboard</button>
          </div>
        </div>
      )}

      <div className="cities-container">
        {cities.map((cityData) => (
          <div
            key={cityData.city}
            className={`weather-display theme-${weatherCodeMap[cityData.weather_code].theme}`}
          >
            <button className="remove-btn" onClick={() => handleRemove(cityData.city)}>-</button>
            <h2>{cityData.city}</h2>
            <div className="icon">{weatherCodeMap[cityData.weather_code].icon}</div>
            <p>Temperature: {cityData.temperature_2m}°C</p>
            <p>Condition: {weatherCodeMap[cityData.weather_code].label}</p>
            <p>Humidity: {cityData.relative_humidity_2m}%</p>
            <p>Wind Speed: {cityData.wind_speed_10m} km/h</p>
          </div>
        ))}
      </div>

      <footer className="app-footer">
        <button className="review-toggle-btn" onClick={() => setShowReviewForm(true)}>
          Leave a Review
        </button>
      </footer>

      {showReviewForm && (
        <ReviewForm onClose={() => setShowReviewForm(false)} />
      )}
    </div>
  )
}

export default App