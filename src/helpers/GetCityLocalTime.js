import axios from 'axios'

export default async function GetCityLocalTime({
  countryCode,
  cityNameWithUnderscore
}) {
  try {
    const worldTimeResponse = await axios.get(
      `https://worldtimeapi.org/api/timezone/${countryCode}/${cityNameWithUnderscore}`
    )

    return worldTimeResponse.data.datetime
  } catch (error) {
    return {
      message: error.message
    }
  }
}
