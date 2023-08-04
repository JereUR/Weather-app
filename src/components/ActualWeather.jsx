import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TbTemperatureCelsius } from 'react-icons/tb'

import dayIcon from '../assets/day-icon.png'
import nightIcon from '../assets/night-icon.png'
import Loader from './Loader'
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
      <WeatherContainer colortemperature={colortemperature}>
        <WeatherInfo>
          <CityContainer>
            {city ? (
              <CityName>
                🌍 <span>{city}</span>
              </CityName>
            ) : (
              <Loader />
            )}
            {/* <IconSection colortemperature={colortemperature}>
          <p>👀 The sky looks like...</p>
          <Icon
            src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
            alt={weatherData.condition}
          />
        </IconSection> */}
          </CityContainer>
          <Icon
            src={`./src/assets/weather-icons/${weatherData.weatherIcon}.png`}
            alt={weatherData.condition}
          />
          <Condition>{weatherData.condition}</Condition>
        </WeatherInfo>
        <TemperatureInfo>
          <Temperature className={weatherClassName} color={colortemperature}>
            {weatherData.temperature} <TbTemperatureCelsius size={52} />
          </Temperature>
          <PrecipitationType>
            {weatherData.precipitationType
              ? weatherData.precipitationType
              : 'No Precipitation'}
          </PrecipitationType>
        </TemperatureInfo>
      </WeatherContainer>
      <ImageContainer>
        <Image
          src={weatherData.day ? dayIcon : nightIcon}
          alt={weatherData.day ? 'day-icon' : 'night-icon'}
        />
      </ImageContainer>
    </DataContainer>
  )
}

const CityContainer = styled.div`
  margin-left: -5vw;

  p {
    color: black;
  }
`

const CityName = styled.p`
  font-size: 42px;
  font-weight: bold;

  span {
    color: black;
    font-style: italic;
    text-decoration: underline;
  }
`

const Condition = styled.p`
  font-size: 24px;
  color: black;
  margin-top: 3vw;
  margin-left: 2vw;
`

const DataContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`

const Icon = styled.img`
  height: 90px;
  border-radius: 50%;
  margin-bottom: -50px;
  margin-left: 2vw;
`

const Image = styled.img`
  height: 350px;
`

const ImageContainer = styled.div`
  position: absolute;
  left: 65%;
  margin-top: -2vw;
`

const PrecipitationType = styled.p`
  margin-top: -30px;
  font-size: 24px;
  font-style: italic;
`

const Temperature = styled.p`
  padding: 40px;
  box-shadow: 1px 3px 3px black;
  border-radius: 50%;
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
`

const TemperatureInfo = styled.div`
  margin: auto;
`

const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40vw;
  height: fit-content;
  background-color: ${({ colortemperature }) => `${colortemperature}`};
  margin-left: 7vw;
  padding-bottom: 20px;
  margin-bottom: 50px;
`

const WeatherInfo = styled.div`
  margin: auto;
`

/* 
const WeatherTime = styled.div`
  flex: 1;
  text-align: center;
  border-radius: 20px;
  width: 500px;
  height: 300px;
  margin-left: 15vw;
  margin-top: 20px;
  border: 1px solid #888;
  box-shadow: 5px 10px 10px #666;
`
 */
