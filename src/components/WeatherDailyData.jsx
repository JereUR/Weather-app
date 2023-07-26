import React from 'react'
import styled from 'styled-components'

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
  border: 1px solid #000;
  border-radius: 10px;
  margin: 20px 100px;
`

const DailyWeatherData = styled.div`
  margin: 10px 50px;
  text-align: center;
`

const Icon = styled.img``

const Intensity = styled.p``

const MaxTemp = styled.p``

const MinTemp = styled.p``

const TempContainer = styled.div`
  margin: 0 20px;
  text-align: center;
  border-right: 1px solid #000;

  &:first-child {
    padding-right: 40px;
  }

  &:last-child {
    border-right: none;
  }
`

const Precipitation = styled.p``

const PrecipitationDetails = styled.div``

const TemperatureData = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.p``

const TitleData = styled.p``

const TitleDetails = styled.p``

const TitleTemp = styled.p``

const Type = styled.p``

const WeatherDailyContainer = styled.div`
  text-align: center;
  padding: 20px;
`

const WeatherDetails = styled.div`
  text-align: center;
`
