import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function WeatherDailyData({ data }) {
  const dataLocal = {
    day: {
      precipitation: false,
      precipitationIntensity: undefined,
      precipitationType: undefined,
      weatherIcon: 6
    },
    night: {
      precipitation: true,
      precipitationIntensity: 'Light',
      precipitationType: 'Rain',
      weatherIcon: 18
    },
    temperatureMax: 57,
    temperatureMin: 51,
    unitMax: 'F',
    unitMin: 'F'
  }
  let minCelsius = dataLocal.temperatureMin
  let maxCelsius = dataLocal.temperatureMax

  if (dataLocal.unitMin === 'F') {
    minCelsius = Math.floor((dataLocal.temperatureMin - 32) * (5 / 9))
  }

  if (dataLocal.unitMax === 'F') {
    maxCelsius = Math.floor((dataLocal.temperatureMax - 32) * (5 / 9))
  }

  return (
    <WeatherDailyContainer>
      <Title>Weather For Tomorrow</Title>
      <TemperatureData>
        <TempContainer>
          <TitleTemp>Minimum</TitleTemp>
          <MinTemp>{minCelsius}°C</MinTemp>
        </TempContainer>
        <TempContainer>
          <TitleTemp>Maximum</TitleTemp>
          <MaxTemp>{maxCelsius}°C</MaxTemp>
        </TempContainer>
      </TemperatureData>
      <WeatherDetails>
        <TitleDetails>Details</TitleDetails>
        <DailyDetails>
          <DailyWeatherData>
            <TitleData>Day Info</TitleData>
            <Icon
              src={`./src/assets/weather-icons/${dataLocal.day.weatherIcon}.png`}
            />
            <Precipitation>
              Precipitation: {dataLocal.day.precipitation ? 'Yes' : 'No'}
            </Precipitation>
            {dataLocal.day.precipitation && (
              <PrecipitationDetails>
                <Intensity>
                  Intensity: {dataLocal.day.precipitationIntensity}
                </Intensity>
                <Type>Type: {dataLocal.day.precipitationType}</Type>
              </PrecipitationDetails>
            )}
          </DailyWeatherData>
          <DailyWeatherData>
            <TitleData>Night Info</TitleData>
            <Icon
              src={`./src/assets/weather-icons/${dataLocal.night.weatherIcon}.png`}
            />
            <Precipitation>
              Precipitation: {dataLocal.night.precipitation ? 'Yes' : 'No'}
            </Precipitation>
            {dataLocal.night.precipitation && (
              <PrecipitationDetails>
                <Intensity>
                  Intensity: {dataLocal.night.precipitationIntensity}
                </Intensity>
                <Type>Type: {dataLocal.night.precipitationType}</Type>
              </PrecipitationDetails>
            )}
          </DailyWeatherData>
        </DailyDetails>
      </WeatherDetails>
    </WeatherDailyContainer>
  )
}

const DailyDetails = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin: 20px 100px;
`

const DailyWeatherData = styled.div`
  margin: 10px 50px;
  text-align: center;
`

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 0;
`

const Intensity = styled.p`
  color: #006994;
  font-weight: bold;
`

const MaxTemp = styled.p`
  font-size: 24px;
  color: #222;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`

const MinTemp = styled.p`
  font-size: 24px;
  color: #222;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`

const Precipitation = styled.p`
  color: #006994;
`

const PrecipitationDetails = styled.div`
  color: #333;
`

const TempContainer = styled.div`
  margin: 0 20px;
  text-align: center;
  border-right: 1px solid #333;
  padding-right: 20px;

  &:first-child {
    padding-right: 40px;
  }

  &:last-child {
    border-right: none;
  }
`

const TemperatureData = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Title = styled.p`
  font-size: 28px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`

const TitleData = styled.p`
  font-size: 20px;
  color: #006994;
`

const TitleDetails = styled.p`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`

const TitleTemp = styled.p`
  font-size: 20px;
  color: #333;
`

const Type = styled.p`
  color: #006994;
  font-weight: bold;
`

const WeatherDailyContainer = styled.div`
  text-align: center;
  padding: 25px;
  background-color: transparent;
  background-size: 200% 200%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: fit-content;
  margin: 20px auto;
  color: #333;
`

const WeatherDetails = styled.div`
  text-align: center;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px;
`
