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

export default async function GetUserCity() {
  try {
    const userLocation = await getUserLocation()

    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      userLocation.latitude + ',' + userLocation.longitude
    )}&key=${apiKey}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    const firstResult = data.results[0]
    const city = firstResult.components.quarter

    return { city, userLocation }
  } catch (error) {
    console.log('Error al obtener la ubicación:', error)
    return error
  }
}
