import { useEffect, useState } from 'react'

import CityData from './CityData'
import GetWeatherData from '../helpers/GetWeatherData'

export default function WeatherData({ city, keyCountry, setError }) {
  const [weatherData, setWeatherData] = useState(null)
  const [weatherClassName, setWeatherClassName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetWeatherData({ key: keyCountry })
      if (!data.message) {
        let condition = data.condition.replace(/\//g, '')
        condition = condition.replace(' ', '-')
        const weather = {
          temperature: data.temperature,
          condition: condition
        }

        if (weather.temperature < 5) {
          setWeatherClassName('very-cold')
        } else if (weather.temperature >= 5 && weather.temperature < 15) {
          setWeatherClassName('cold')
        } else if (weather.temperature >= 15 && weather.temperature < 23) {
          setWeatherClassName('normal')
        } else if (weather.temperature >= 23 && weather.temperature < 30) {
          setWeatherClassName('hot')
        } else {
          setWeatherClassName('very-hot')
        }
        setWeatherData(weather)
      } else {
        setError(data.message)
      }
    }

    fetchData()
  }, [keyCountry])

  return (
    <div>
      <CityData city={city} />
      {weatherData && (
        <div>
          <h2>Datos del clima:</h2>
          <p className={weatherClassName}>
            Temperatura: {weatherData.temperature}°C
          </p>
          <img
            src={`./src/assets/weather-icons/${weatherData.condition}.png`}
            alt={weatherData.condition}
          />
        </div>
      )}
    </div>
  )
}
