export default async function fetchWeatherData({ latitude, longitude }) {
  const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY
  try {
    const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`

    const locationResponse = await fetch(locationUrl)
    const locationData = await locationResponse.json()

    console.log(locationData)

    if (locationData.Key) {
      const locationKey = locationData.Key

      const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`

      const weatherResponse = await fetch(weatherUrl)
      const weatherData = await weatherResponse.json()

      console.log(weatherData)

      if (weatherData && weatherData.length > 0) {
        const weather = weatherData[0]
        const weatherDetails = {
          temperature: weather.Temperature.Metric.Value,
          condition: weather.WeatherText
        }

        return weatherDetails
      } else {
        throw new Error('No se encontraron datos climáticos')
      }
    } else {
      throw new Error('No se encontró la ubicación')
    }
  } catch (error) {
    console.log('Error al obtener datos climáticos:', error)
    throw error
  }
}
