import axios from 'axios'

export default async function GetWeatherDailyData({ key }) {
  const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY
  try {
    const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${apiKey}`

    const forecastData = await axios.get(forecastUrl)

    if (forecastData.data) {
      const weatherDaily = forecastData.data.DailyForecasts[0]
      const weatherDailyDetails = {
        day: {
          precipitation: weatherDaily.Day.HasPrecipitation,
          precipitationIntensity: weatherDaily.Day?.PrecipitationIntensity,
          precipitationType: weatherDaily.Day?.PrecipitationType,
          weatherIcon: weatherDaily.Day.Icon
        },
        night: {
          precipitation: weatherDaily.Night.HasPrecipitation,
          precipitationIntensity: weatherDaily.Night?.PrecipitationIntensity,
          precipitationType: weatherDaily.Night?.PrecipitationType,
          weatherIcon: weatherDaily.Night.Icon
        },
        temperatureMin: weatherDaily.Temperature.Minimum.Value,
        unitMin: weatherDaily.Temperature.Minimum.Unit,
        temperatureMax: weatherDaily.Temperature.Maximum.Value,
        unitMax: weatherDaily.Temperature.Maximum.Unit
      }

      return weatherDailyDetails
    } else {
      throw new Error('No se encontraron datos climáticos')
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}
