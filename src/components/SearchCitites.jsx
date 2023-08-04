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
  const [isFocused, setIsFocused] = useState(false)
  const [isSemiFocused, setIsSemiFocused] = useState(false)

  const inputContainerClassName = `input-container ${
    isFocused ? 'input-container-focus' : ''
  }`

  const isLoginClassName = `input-login ${
    isSemiFocused ? 'input-login-semifocus' : ''
  }`

  const handleFocus = () => {
    setIsFocused(true)
    setIsSemiFocused(false)
  }

  const handleBlur = () => {
    setSearchTerm('')
  }

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
      <InputContainer className={inputContainerClassName}>
        <SearchInput
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={isLoginClassName}
        />
        <Label>Buscar ciudad...</Label>
      </InputContainer>
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
    </SearchContainer>
  )
}

const InputContainer = styled.div`
  position: relative;
  margin-top: 5px;
  margin-right: 5vw;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 5px;
  width: 15vw;
`

const Label = styled.label`
  color: #222;
  font-weight: 500;
  position: absolute;
  top: 0;
  left: 20px;
  padding: 20px 5px 20px 6px;
  right: 20px;
  pointer-events: none;
  font-size: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  transition:
    top 0.3s ease,
    font-size 0.3s ease;
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 25px;
  border: none;
  border: 1px solid #ccc;
  font-size: 24px;
  border-radius: 5px;
  background-color: transparent;
  transition: border 0.3s ease;
  color: #1da1f2;
`
