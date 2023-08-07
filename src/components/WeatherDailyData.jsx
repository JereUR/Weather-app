import React from 'react'
import styled from 'styled-components'

import { Colors } from '../static/Colors'

const { coldTemperature, veryHotTemperature } = Colors

export default function WeatherDailyData({ data, searchMode, setSearchMode }) {
  let minCelsius = data?.temperatureMin
  let maxCelsius = data?.temperatureMax

  if (data?.unitMin === 'F') {
    minCelsius = Math.floor((data.temperatureMin - 32) * (5 / 9))
  }

  if (data?.unitMax === 'F') {
    maxCelsius = Math.floor((data.temperatureMax - 32) * (5 / 9))
  }

  return (
    <MainContainer>
      <WeatherDailyContainer>
        <TitleContainer>
          <Title>Weather For Tomorrow</Title>
        </TitleContainer>
        <WeatherContainer>
          <TemperatureData>
            <TempContainer>
              <TitleTempMin>Minimum</TitleTempMin>
              <TempValue>{minCelsius}°C</TempValue>
            </TempContainer>
            <TempContainer>
              <TitleTempMax>Maximum</TitleTempMax>
              <TempValue>{maxCelsius}°C</TempValue>
            </TempContainer>
          </TemperatureData>
          <WeatherDetails>
            <TitleDetails>Details</TitleDetails>
            <DailyDetails>
              <DailyWeatherData>
                <TitleData>Day Info</TitleData>
                <Icon
                  src={`./src/assets/weather-icons/${data.day.weatherIcon}.png`}
                />
                <InfoWeather>
                  <Precipitation>
                    <b>Precipitation</b>
                    <br />
                    {data.day.precipitation ? 'Yes' : 'No'}
                  </Precipitation>
                  {data.day.precipitation && (
                    <PrecipitationDetails>
                      <Intensity>
                        <b>Intensity</b>
                        <br />
                        {data.day.precipitationIntensity}
                      </Intensity>
                      <Type>
                        <b>Type</b> <br />
                        {data.day.precipitationType}
                      </Type>
                    </PrecipitationDetails>
                  )}
                </InfoWeather>
              </DailyWeatherData>
              <DailyWeatherData>
                <TitleData>Night Info</TitleData>
                <Icon
                  src={`./src/assets/weather-icons/${data.night.weatherIcon}.png`}
                />
                <InfoWeather>
                  <Precipitation>
                    <b>Precipitation</b>
                    <br />
                    {data.night.precipitation ? 'Yes' : 'No'}
                  </Precipitation>
                  {data.night.precipitation && (
                    <PrecipitationDetails>
                      <Intensity>
                        <b>Intensity</b> <br />
                        {data.night.precipitationIntensity}
                      </Intensity>
                      <Type>
                        <b>Type</b>
                        <br />
                        {data.night.precipitationType}
                      </Type>
                    </PrecipitationDetails>
                  )}
                </InfoWeather>
              </DailyWeatherData>
            </DailyDetails>
          </WeatherDetails>
        </WeatherContainer>
      </WeatherDailyContainer>
      {searchMode && (
        <Button onClick={() => setSearchMode(false)}>
          <span>Go to own location</span>
        </Button>
      )}
    </MainContainer>
  )
}

const Button = styled.button`
  cursor: pointer;
  background-color: #28a745;
  border: none;
  font-size: 20px;
  padding: 10px 30px;
  margin-top: 3vw;
  box-shadow: 2px 2px 0px #999;
  transform: all 1s ease-in-out;

  &:hover {
    transform: translateY(-2px) translateX(2px);
    box-shadow: none;
  }
`

const DailyDetails = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin: 20px 100px;
  box-shadow: 0px 5px 5px #ddd;
`

const DailyWeatherData = styled.div`
  margin: 10px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;

  &:first-child {
    margin-right: 100px;
  }
`

const Icon = styled.img`
  height: 50px;
  width: auto;
  margin: 10px 0;
`

const InfoWeather = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 10px;
  padding: 5px 20px;
  font-size: 18px;
`

const Intensity = styled.p`
  font-size: 16px;
  margin-left: 50px;
  margin-right: 50px;
`

const MainContainer = styled.div``

const Precipitation = styled.p`
  font-size: 16px;
`

const PrecipitationDetails = styled.div`
  display: flex;
  color: #333;
`

const TempContainer = styled.div`
  margin: 0 20px;
  font-size: 26px;
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
  align-items: center;
`

const TempValue = styled.p`
  color: #222;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`

const Title = styled.p`
  font-size: 32px;
  color: #333;
  font-weight: bold;
`

const TitleContainer = styled.div`
  position: relative;
  padding: 20px;
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 15px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    pointer-events: none;
  }
`

const TitleData = styled.p`
  font-size: 22px;
  font-style: italic;
  font-weight: bold;
  text-decoration: underline;
`

const TitleDetails = styled.p`
  font-size: 32px;
  text-shadow: 0px 2px 2px #ccc;
  color: #333;
  font-weight: bold;
`

const TitleTempMax = styled.p`
  font-weight: bold;
  color: ${veryHotTemperature};
`

const TitleTempMin = styled(TitleTempMax)`
  color: ${coldTemperature};
`

const Type = styled.p`
  font-size: 16px;
`

const WeatherContainer = styled.div`
  display: flex;
`

const WeatherDailyContainer = styled.div`
  position: relative;
  text-align: center;
  padding: 20px 10vw;
  background-size: 200% 200%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  width: fit-content;
  margin: 10px auto;
  color: #333;

  @media (max-width: 1450px) {
    padding: 10px 1vw;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0.005)
    );
  }
`

const WeatherDetails = styled.div`
  border-radius: 10px;
  padding: 10px;
`
