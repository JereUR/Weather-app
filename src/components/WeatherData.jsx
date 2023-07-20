import { useEffect, useState } from 'react'

import fetchWeatherData from '../helpers/GetWeatherData'
import CityData from './CityData'

export default function WeatherData({ latitude, longitude, city }) {
  const [weatherData, setWeatherData] = useState(null)
  const [weatherClassName, setWeatherClassName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData({
          latitude,
          longitude
        })
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
      } catch (error) {
        console.log('Error al obtener los datos del clima:', error)
      }
    }

    fetchData()
  }, [latitude, longitude])

  return (
    <div>
      <CityData city />
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
