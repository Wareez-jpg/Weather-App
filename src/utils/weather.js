export const weatherCodeMap = {
    0: { label: 'Clear sky', icon: '☀️', theme: 'sunny' },
    1: { label: 'Mostly clear', icon: '🌤️', theme: 'sunny' },
    2: { label: 'Partly cloudy', icon: '⛅', theme: 'cloudy' },
    3: { label: 'Overcast', icon: '☁️', theme: 'cloudy' },
    45: { label: 'Fog', icon: '🌫️', theme: 'cloudy' },
    51: { label: 'Light drizzle', icon: '🌦️', theme: 'rainy' },
    53: { label: 'Moderate drizzle', icon: '🌦️', theme: 'rainy' },
    55: { label: 'Dense drizzle', icon: '🌧️', theme: 'rain' },
    61: { label: 'Light rain', icon: '🌦️', theme: 'rainy' },
    63: { label: 'Moderate rain', icon: '🌧️', theme: 'rainy' },
    65: { label: 'Heavy rain', icon: '🌧️', theme: 'rainy' },
    71: { label: 'Light snow', icon: '🌨️', theme: 'snowy' },
    73: { label: 'Moderate snow', icon: '❄️', theme: 'snowy' },
    75: { label: 'Heavy snow', icon: '❄️', theme: 'snowy' },
    82: { label: 'Violent rain showers', icon: '⛈️', theme: 'stormy' },
    95: { label: 'Thunderstorm', icon: '⛈️', theme: 'stormy' },
}

export async function fetchCityWeather(city) {
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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=auto`
    )
    const weatherData =await weatherResponse.json()

    console.log('Raw weather data:', weatherData)
    return {
        ...weatherData.current,
        city: name,
        localTime: new Date(weatherData.current.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
    }

    return { 
        ...weatherData.current,
        city: name,
        localTime: new Date(weatherData.current.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
    }
}