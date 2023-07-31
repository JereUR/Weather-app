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
  const [shadowColor, setShadowColor] = useState('')

  useEffect(() => {
    switch (weatherClassName) {
      case 'very-cold':
        setShadowColor(`1px 5px 5px ${veryColdTemperature}`)
        break
      case 'cold':
        setShadowColor(`1px 5px 5px ${coldTemperature}`)
        break
      case 'normal':
        setShadowColor(`1px 5px 5px ${normalTemperature}`)
        break
      case 'hot':
        setShadowColor(`1px 5px 5px ${hotTemperature}`)
        break
      case 'very-hot':
        setShadowColor(`1px 5px 5px ${veryHotTemperature}`)
        break
      default:
        setShadowColor('1px 5px 5px black')
        break
    }
  }, [weatherClassName])

  return (
    <DataContainer>
      <CityContainer>
        <CityData city={city} />
        <IconSection>
          <p>👀 The weather looks like...</p>
          <Icon
            src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
            alt={weatherData.condition}
          />
        </IconSection>
      </CityContainer>
      <WeatherContainer shadowColor={shadowColor}>
        <Temperature className={weatherClassName} color={shadowColor}>
          {weatherData.temperature} <TbTemperatureCelsius size={52} />
        </Temperature>
        <Condition>
          <b>Condition: </b>
          {weatherData.condition}
        </Condition>
      </WeatherContainer>
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
`

const Icon = styled.img`
  width: 120px;
`

const IconSection = styled.div`
  margin-top: 70px;
  margin-left: 100px;

  p {
    font-weight: 500;
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
  box-shadow: ${({ shadowColor }) => shadowColor};
  border-radius: 50%;
  margin-top: 50px;
  margin-bottom: 50px;
`
