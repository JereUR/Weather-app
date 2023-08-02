import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TbTemperatureCelsius } from 'react-icons/tb'

import CityData from './CityData'
import { Colors } from '../static/Colors'

const {
  veryColdTemperature,
  coldTemperature,
  normalTemperature,
  hotTemperature,
  veryHotTemperature
} = Colors

export default function ActualWeather({ city, weatherData, weatherClassName }) {
  const [colortemperature, setColortemperature] = useState('')

  useEffect(() => {
    switch (weatherClassName) {
      case 'very-cold':
        setColortemperature(veryColdTemperature)
        break
      case 'cold':
        setColortemperature(coldTemperature)
        break
      case 'normal':
        setColortemperature(normalTemperature)
        break
      case 'hot':
        setColortemperature(hotTemperature)
        break
      case 'very-hot':
        setColortemperature(veryHotTemperature)
        break
      default:
        setColortemperature('black')
        break
    }
  }, [weatherClassName])

  return (
    <DataContainer>
      <CityContainer>
        <CityData city={city} />
        <IconSection colortemperature={colortemperature}>
          <p>👀 The sky looks like...</p>
          <Icon
            src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
            alt={weatherData.condition}
          />
        </IconSection>
      </CityContainer>
      <WeatherContainer colortemperature={colortemperature}>
        <Temperature className={weatherClassName} color={colortemperature}>
          {weatherData.temperature} <TbTemperatureCelsius size={52} />
        </Temperature>
        <Condition>
          <b>Condition: </b>
          {weatherData.condition}
        </Condition>
      </WeatherContainer>
      <WeatherTime
        className={weatherData.day ? 'day-weather' : 'night-weather'}
      />
    </DataContainer>
  )
}

const CityContainer = styled.div`
  margin: 5px 150px 50px 100px;
  p {
    color: black;
  }
`

const Condition = styled.p`
  font-size: 16px;
  color: black;
`

const DataContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`

const Icon = styled.img`
  width: 120px;
`

const IconSection = styled.div`
  box-shadow: ${({ colortemperature }) =>
    `2px 2px 2px 2px ${colortemperature}`};
  border-radius: 10px;
  padding: 10px 50px;
  margin-top: 70px;
  margin-left: 100px;

  p {
    font-weight: bold;
    font-style: italic;
  }
`

const Temperature = styled.p`
  font-size: 52px;
  font-weight: bold;
  margin-bottom: -20px;
  color: ${({ color }) => color};
`

const WeatherContainer = styled.div`
  padding: 50px;
  box-shadow: ${({ colortemperature }) => `1px 5px 5px ${colortemperature}`};
  border-radius: 50%;
  margin-top: 50px;
  margin-bottom: 50px;
`

const WeatherTime = styled.div`
  flex: 1;
  text-align: center;
  border-radius: 20px;
  max-width: 300px;
  max-height: 200px;
  margin-left: 10%;
  margin-top: 5%;
  border: 1px solid #888;
  box-shadow: 5px 10px 10px #666;
`
