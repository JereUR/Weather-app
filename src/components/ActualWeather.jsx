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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const actualizarAnchoPantalla = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', actualizarAnchoPantalla)

    return () => {
      window.removeEventListener('resize', actualizarAnchoPantalla)
    }
  }, [window.innerWidth])

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
      {screenWidth < 850 && (
        <ImageContainer>
          <Image
            src={weatherData.day ? dayIcon : nightIcon}
            alt={weatherData.day ? 'day-icon' : 'night-icon'}
          />
        </ImageContainer>
      )}
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
          </CityContainer>
          <Icon
            src={`../../public/weather-icons/${weatherData.weatherIcon}.png`}
            alt={weatherData.condition}
          />
          <Condition>{weatherData.condition}</Condition>
        </WeatherInfo>
        <TemperatureInfo>
          <Temperature className={weatherClassName} color={colortemperature}>
            {weatherData.temperature} <TbTemperatureCelsius fontSize={52} />
          </Temperature>
          <PrecipitationType>
            {weatherData.precipitationType
              ? weatherData.precipitationType
              : 'No Precipitation'}
          </PrecipitationType>
        </TemperatureInfo>
      </WeatherContainer>
      {screenWidth > 850 && (
        <ImageContainer>
          <Image
            src={weatherData.day ? dayIcon : nightIcon}
            alt={weatherData.day ? 'day-icon' : 'night-icon'}
          />
        </ImageContainer>
      )}
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
  font-size: 38px;
  margin-left: 2vw;
  font-weight: bold;

  @media (max-width: 1450px) {
    margin-left: 5vw;
    font-size: 34px;
  }

  span {
    color: black;
    font-style: italic;
    text-decoration: underline;
  }
`

const Condition = styled.p`
  font-size: 20px;
  color: black;
  margin-top: 3vw;
  margin-left: 2vw;

  @media (max-width: 1450px) {
    font-size: 18px;
  }

  @media (max-width: 1450px) {
    font-size: 16px;
    margin-top: 40px;
  }
`

const DataContainer = styled.div`
  display: flex;
  margin-bottom: 50px;

  @media (max-width: 850px) {
    display: block;
  }
`

const Icon = styled.img`
  height: 90px;
  border-radius: 50%;
  margin-bottom: -50px;
  margin-left: 2vw;

  @media (max-width: 1450px) {
    height: 80px;
  }
`

const Image = styled.img`
  height: 350px;

  @media (max-width: 1450px) {
    height: 300px;
  }

  @media (max-width: 1450px) {
    height: 200px;
  }
`

const ImageContainer = styled.div`
  position: absolute;
  left: 65%;
  margin-top: -2vw;

  @media (max-width: 1450px) {
    position: static;
    margin: auto;
    margin-top: -8vw;
    margin-bottom: 2vw;
  }
`

const PrecipitationType = styled.p`
  margin-top: -30px;
  font-size: 20px;
  font-style: italic;

  @media (max-width: 1450px) {
    font-size: 18px;
    margin-top: -20px;
  }

  @media (max-width: 850px) {
    font-size: 16px;
  }
`

const Temperature = styled.p`
  padding: 40px;
  box-shadow: 1px 3px 3px black;
  border-radius: 50%;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;

  @media (max-width: 1450px) {
    font-size: 2.5rem;
    padding: 30px;
  }

  @media (max-width: 850px) {
    font-size: 2rem;
  }

  svg {
    @media (max-width: 850px) {
      font-size: 2rem;
    }
  }
`

const TemperatureInfo = styled.div`
  margin: auto;

  @media (max-width: 850px) {
    margin-top: 50px;
  }
`

const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40vw;
  height: fit-content;
  background-color: ${({ colortemperature }) => `${colortemperature}`};
  margin-left: 7vw;
  box-shadow: 2px 2px 5px #ddd;
  padding-bottom: 20px;
  margin-bottom: 50px;
  border-radius: 5px;

  @media (max-width: 1450px) {
    margin-left: 10vw;
  }

  @media (max-width: 850px) {
    width: 90vw;
    margin-left: auto;
  }
`

const WeatherInfo = styled.div`
  margin: auto;
`
