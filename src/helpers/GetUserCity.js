import axios from 'axios'

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          resolve(data)
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error)
          reject(error)
        }
      )
    } else {
      const error = 'Geolocalización no es soportada por el navegador'
      console.log(error)
      reject(error)
    }
  })
}

export default async function GetUserCity(searchTerm = null) {
  const ACCUWEATHER_API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY
  let url

  if (searchTerm === null) {
    const userLocation = await getUserLocation()
    url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${ACCUWEATHER_API_KEY}&q=${userLocation.latitude},${userLocation.longitude}`

    try {
      const response = await axios.get(url)
      console.log(response)

      const cityData = {
        city: response.data.LocalizedName,
        country: response.data.Country.LocalizedName,
        key: response.data.Key
      }

      return cityData
    } catch (error) {
      return {
        message: error.message
      }
    }
  } else {
    url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=${searchTerm}`

    try {
      const response = await axios.get(url)

      const citiesData = response.data.map((item) => ({
        city: item.LocalizedName,
        country: item.Country.LocalizedName,
        key: item.Key
      }))

      return citiesData
    } catch (error) {
      return {
        message: error.message
      }
    }
  }
}
