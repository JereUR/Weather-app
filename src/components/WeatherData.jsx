import { useEffect, useState } from 'react'

import GetWeatherData from '../helpers/GetWeatherData'
import styled from 'styled-components'
import GetWeatherDailyData from '../helpers/GetWeatherDailyData'
import WeatherDailyData from './WeatherDailyData'
import ActualWeather from './ActualWeather'

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
        <WeatherContainer>
          <WeatherDataContainer>
            <ActualWeather
              city={city}
              weatherData={weatherData}
              weatherClassName={weatherClassName}
            />
            <WeatherDailyData data={weatherDailyData} />
            {searchMode && (
              <Button onClick={() => setSearchMode(false)}>
                Go to own location
              </Button>
            )}
          </WeatherDataContainer>
          <WeatherTime
            className={weatherData.day ? 'day-weather' : 'night-weather'}
          />
        </WeatherContainer>
      )}
    </>
  )
}

const Button = styled.button`
  cursor: pointer;
  padding: 10px 30px;
`

const WeatherContainer = styled.div`
  padding: 50px 0;
  display: flex;
`

const WeatherDataContainer = styled.div`
  flex: 2;
  text-align: center;
  background-color: transparent;
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 10px;
`

const WeatherTime = styled.div`
  flex: 1;
  text-align: center;
  margin: 1vw 10vw 30vw 10vw;
  border-radius: 20px;
  border: 1px solid #888;
  box-shadow: 5px 10px 10px #666;
`
