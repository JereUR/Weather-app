import { useEffect, useState } from 'react'
import { TbTemperatureCelsius } from 'react-icons/tb'

import CityData from './CityData'
import GetWeatherData from '../helpers/GetWeatherData'
import styled from 'styled-components'
import { Colors } from '../static/Colors'
import GetWeatherDailyData from '../helpers/GetWeatherDailyData'
import WeatherDailyData from './WeatherDailyData'

export default function WeatherData({
  city,
  keyCountry,
  setError,
  searchMode,
  setSearchMode
}) {
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
        setWeatherDailyData(data)
      } else {
        setError(data.message)
      }
    }

    fetchData()
    fetchDailyData()
  }, [keyCountry, city])

  return (
    <>
      {weatherData && (
        <WeatherContainer
          className={weatherData.day ? 'day-weather' : 'night-weather'}
        >
          <WeatherDataContainer>
            <CityData city={city} />
            <Temperature className={weatherClassName}>
              {weatherData.temperature} <TbTemperatureCelsius size={52} />
            </Temperature>
            <Icon
              src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
              alt={weatherData.condition}
            />
            <Condition>
              <b>Condition: </b>
              {weatherData.condition}
            </Condition>
          </WeatherDataContainer>
          <WeatherDailyData data={weatherDailyData} />
          {searchMode && (
            <Button onClick={() => setSearchMode(false)}>
              Go to own location
            </Button>
          )}
        </WeatherContainer>
      )}
    </>
  )
}

const Button = styled.button`
  cursor: pointer;
  padding: 10px 30px;
`

const Condition = styled.p`
  font-size: 20px;
  margin: 0;
  color: #ddd;
`

const Icon = styled.img`
  width: 150px;
  margin: 20px 0;
`

const Temperature = styled.p`
  font-size: 48px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`

const WeatherContainer = styled.div`
  padding: 50px 0;
`

const WeatherDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 10px;
`
