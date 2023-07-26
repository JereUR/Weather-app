import { useEffect, useState } from 'react'

import CityData from './CityData'
import GetWeatherData from '../helpers/GetWeatherData'
import styled from 'styled-components'
import { Colors } from '../static/Colors'
import GetWeatherDailyData from '../helpers/GetWeatherDailyData'
import WeatherDailyData from './WeatherDailyData'

export default function WeatherData({ city, keyCountry, setError }) {
  const [weatherData, setWeatherData] = useState(null)
  const [weatherDailyData, setWeatherDailyData] = useState(null)
  const [weatherClassName, setWeatherClassName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetWeatherData({ key: keyCountry })
      if (!data.message) {
        if (data.temperature < 5) {
          setWeatherClassName('very-cold')
        } else if (data.temperature >= 5 && data.temperature < 15) {
          setWeatherClassName('cold')
        } else if (data.temperature >= 15 && data.temperature < 23) {
          setWeatherClassName('normal')
        } else if (data.temperature >= 23 && data.temperature < 30) {
          setWeatherClassName('hot')
        } else {
          setWeatherClassName('very-hot')
        }
        setWeatherData(data)
      } else {
        setError(data.message)
      }
    }

    const fetchDailyData = async () => {
      const data = await GetWeatherDailyData({ key: keyCountry })
      if (!data.message) {
        console.log(data)
        setWeatherDailyData(data)
      } else {
        setError(data.message)
      }
    }

    fetchData()
    fetchDailyData()
  }, [keyCountry])

  return (
    <WeatherContainer>
      <WeatherDataContainer>
        <CityData city={city} />
        {weatherData && (
          <>
            <Temperature className={weatherClassName}>
              {weatherData.temperature}°C
            </Temperature>
            <Icon
              src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
              alt={weatherData.condition}
            />
            <Condition>{weatherData.condition}</Condition>
          </>
        )}
      </WeatherDataContainer>
      <WeatherDailyData data={weatherDailyData} />
    </WeatherContainer>
  )
}

const Condition = styled.p``

const Icon = styled.img`
  width: 60px;
`

const Temperature = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`

const WeatherContainer = styled.div``

const WeatherDataContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`
