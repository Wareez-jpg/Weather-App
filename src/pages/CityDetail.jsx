import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { weatherCodeMap, fetchCityWeather } from '../utils/weather'
import '../App.css'

function CityDetail() {
    const { cityName } = useParams()
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        async function loadCity() {
            const result = await fetchCityWeather(cityName)
            setWeather(result)
        }
        loadCity()
    }, [cityName])

    if (!weather) {
        return <p>Loading...</p>
    }

    const conditionInfo = weatherCodeMap[weather.weather_code] || {
        label: 'Unknown',
        icon: '❓',
        theme: 'cloudy',
    }

    return (
        <div className="app">
            <Link to="/">← Back to Dashboard</Link>
            <h1>{weather.city}</h1>
            <div className="icon">{conditionInfo.icon}</div>
            <p>Local Time: {weather.localTime}</p>
            <p>Temperature: {weather.temperature_2m}°C</p>
            <p>Condition: {conditionInfo.label}</p>
            <p>Humidity: {weather.relative_humidity_2m}%</p>
            <p>Wind Speed: {weather.wind_speed_10m} km/h</p>
        </div>
    )
}

export default CityDetail