import axios from 'axios'

export default async function getCountryCode(countryName) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName
      )}?fullText=true`
    )
    console.log(response)

    const countryCode = response.data[0]?.region
    if (countryCode === 'Americas') {
      return 'America'
    } else {
      return countryCode
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}
