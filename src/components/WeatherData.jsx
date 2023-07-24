import { useEffect, useState } from 'react'

import CityData from './CityData'
import GetWeatherData from '../helpers/GetWeatherData'
import styled from 'styled-components'

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
    <WeatherDataContainer>
      <CityData city={city} />
      {weatherData && (
        <>
          <Temperature color={Colors[weatherClassName]}>
            {weatherData.temperature}°C
          </Temperature>
          <Condition
            src={`./src/assets/weather-icons/${weatherData.condition}.png`}
            alt={weatherData.condition}
          />
          <Time>{weatherData.time}</Time>
        </>
      )}
    </WeatherDataContainer>
  )
}

const WeatherDataContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const Temperature = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`

const Condition = styled.img`
  width: 60px;
`

const Time = styled.p`
  font-size: 14px;
  color: #666666;
`
