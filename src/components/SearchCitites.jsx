import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import SearchResults from './SearchResults'
import { Colors } from '../static/Colors'

const { headerColor } = Colors

const ACCUWEATHER_API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY

export default function SearchCities() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)

    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=${searchTerm}`
      )

      const citiesData = response.data.map((item) => ({
        city: item.LocalizedName,
        country: item.Country.LocalizedName,
        key: item.Key
      }))

      setSearchResults(citiesData)
    } catch (error) {
      console.error('Error al obtener datos de la API', error)
    }
  }

  const getCountryCode = async (countryName) => {
    console.log(countryName)
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
      console.error('Error al obtener el countryCode', error)
      return null
    }
  }

  const handleResultClick = async (result) => {
    setSearchTerm(`${result.city}, ${result.country}`)
    setSearchResults([])
    setSearchTerm('')

    try {
      const weatherResponse = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${result.key}?apikey=${ACCUWEATHER_API_KEY}`
      )

      const temperature = weatherResponse.data[0].Temperature.Metric.Value

      let countryCode = await getCountryCode(result.country)

      const cityNameWithUnderscore = result.city.replace(/ /g, '_')

      if (countryCode) {
        const worldTimeResponse = await axios.get(
          `https://worldtimeapi.org/api/timezone/${countryCode}/${cityNameWithUnderscore}`
        )

        const localTime = worldTimeResponse.data.datetime

        console.log('Temperatura actual:', temperature)
        console.log('Hora local:', localTime)
      } else {
        console.error('No se pudo obtener el countryCode')
      }
    } catch (error) {
      console.error('Error al obtener los datos', error)
    }
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar ciudad..."
      />
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  color: ${headerColor};
  font-size: 16px;
  outline: none;
  width: 200px;
`
