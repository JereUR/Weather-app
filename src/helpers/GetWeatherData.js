import axios from 'axios'

export default async function GetWeatherData({ key }) {
  const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY
  try {
    const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`

    const weatherData = await axios.get(weatherUrl)

    if (weatherData.data) {
      const weather = weatherData.data[0]
      const weatherDetails = {
        temperature: weather.Temperature.Metric.Value,
        condition: weather.WeatherText,
        precipitation: weather.HasPrecipitation,
        day: weather.IsDayTime,
        weatherIcon: weather.WeatherIcon,
        precipitationType: weather.PrecipitationType
      }

      return weatherDetails
    } else {
      throw new Error('No se encontraron datos climáticos')
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}
