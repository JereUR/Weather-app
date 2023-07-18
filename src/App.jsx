import { useEffect, useState } from 'react'
import GetUserCity from './helpers/GetUserCity'
import fetchWeatherData from './helpers/GetWeatherData'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCity = await GetUserCity()
        console.log(userCity)
        setCity(userCity.city)

        const weather = await fetchWeatherData({
          latitude: userCity.userLocation.latitude,
          longitude: userCity.userLocation.longitude
        })
        console.log(weather)
        setWeatherData(weather)
      } catch (error) {
        console.log('Error al obtener los datos del clima:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {city ? (
        <p>La ciudad del usuario es: {city}</p>
      ) : (
        <p>Cargando la ubicación del usuario...</p>
      )}

      {weatherData && (
        <div>
          <h2>Datos del clima:</h2>
          <p>Temperatura: {weatherData.temperature}°C</p>
          <p>Condición: {weatherData.condition}</p>
        </div>
      )}
    </div>
  )
}

export default App
