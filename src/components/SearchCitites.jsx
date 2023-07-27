import React, { useState } from 'react'
import styled from 'styled-components'

import SearchResults from './SearchResults'
import { Colors } from '../static/Colors'
import getCountryCode from '../helpers/GetCountryCode'
import GetUserCity from '../helpers/GetUserCity'
import GetWeatherData from '../helpers/GetWeatherData'
import GetCityLocalTime from '../helpers/GetCityLocalTime'

const { headerColor } = Colors

export default function SearchCities({ setCity, setSearchMode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    setSearchMode(true)

    try {
      const response = await GetUserCity(searchTerm)

      setSearchResults(response)
    } catch (error) {
      console.error('Error al obtener datos de la API', error)
    }
  }

  const handleResultClick = async (result) => {
    setSearchTerm(`${result.city}, ${result.country}`)
    setSearchResults([])
    setSearchTerm('')
    setCity(result)

    try {
      let countryCode = await getCountryCode(result.country)

      const cityNameWithUnderscore = result.city.replace(/ /g, '_')

      if (countryCode) {
        const localTime = await GetCityLocalTime({
          countryCode,
          cityNameWithUnderscore
        })

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
