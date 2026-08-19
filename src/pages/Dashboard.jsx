import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SearchBar from "../components/SearchBar";
import ReviewForm from "../components/ReviewForm";
import { weatherCodeMap, fetchCityWeather } from "../utils/weather"
import "../App.css"

function Dashboard() {
  const [cities, setCities] = useState([])
  const [previewCity, setPreviewCity] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

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
      
      {previewCity && (() => {
        const conditionInfo = weatherCodeMap[previewCity.weather_code] || {
          label: 'Unknown', icon: '❓', theme: 'cloudy',
        }
        return (
          <div className="modal-backdrop" onClick={() => setPreviewCity(null)}>
            <div
              className={`weather-display theme-${conditionInfo.theme}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{previewCity.city}</h2>
              <div className="icon">{conditionInfo.icon}</div>
              <p>Local Time: {previewCity.localTime}</p>
              <p>Temperature: {previewCity.temperature_2m}°C</p>
              <p>Condition: {conditionInfo.label}</p>
              <p>Humidity: {previewCity.relative_humidity_2m}%</p>
              <p>Wind Speed: {previewCity.wind_speed_10m} km/h</p>
              <button className="add-btn" onClick={handleAddCity}>+ Add to Dashboard</button>
            </div>
          </div>
        )
      })()}

      <div className="cities-container">
        {cities.map((cityData) => {
          const conditionInfo = weatherCodeMap[cityData.weather_code] || {
            label: 'Unknown', icon: '❓', theme: 'cloudy',
          }
          return (
            <div
              key={cityData.city}
              className={`weather-display theme-${conditionInfo.theme}`}
            >
              <button className="remove-btn" onClick={() => handleRemove(cityData.city)}>-</button>
              <h2>
                <Link to={`/city/${cityData.city}`}>{cityData.city}</Link>
              </h2>
              <div className="icon">{conditionInfo.icon}</div>
              <p>Local Time: {cityData.localTime}</p>
              <p>Temperature: {cityData.temperature_2m}°C</p>
              <p>Condition: {conditionInfo.label}</p>
              <p>Humidity: {cityData.relative_humidity_2m}%</p>
              <p>Wind Speed: {cityData.wind_speed_10m} km/h</p>
            </div>
          )
        })}
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

export default Dashboard
