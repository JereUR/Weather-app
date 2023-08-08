import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearchLocation } from 'react-icons/fa'

import SearchResults from './SearchResults'
import getCountryCode from '../helpers/GetCountryCode'
import GetUserCity from '../helpers/GetUserCity'
import GetCityLocalTime from '../helpers/GetCityLocalTime'

export default function SearchCities({ setCity, setSearchMode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorTerm, setErrorTerm] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [isSemiFocused, setIsSemiFocused] = useState(false)

  const inputContainerClassName = `input-container ${
    isFocused ? 'input-container-focus' : ''
  }`

  const isLoginClassName = `input-login ${
    isSemiFocused ? 'input-login-semifocus' : ''
  }`

  const handleBlur = () => {
    if (searchTerm !== '') {
      setIsSemiFocused(true)
    }

    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setIsSemiFocused(false)
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    if (searchTerm !== '') {
      setErrorTerm(null)
      setSearchMode(true)

      try {
        const response = await GetUserCity(searchTerm)

        setSearchResults(response)
      } catch (error) {
        console.error('Error al obtener datos de la API', error)
      }

      setSearchTerm('')
    } else {
      setErrorTerm('The field must not be empty.')
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
          onChange={({ target }) => setSearchTerm(target.value)}
          onBlur={handleBlur}
          onKeyDown={handleEnter}
          onFocus={handleFocus}
          className={isLoginClassName}
        />
        <Label>Enter a City...</Label>
        {errorTerm && <ErrorInput>{errorTerm}</ErrorInput>}
      </InputContainer>
      <Button onClick={handleSearch}>
        <FaSearchLocation fontSize={16} /> Search
      </Button>
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
    </SearchContainer>
  )
}

const Button = styled.button`
  cursor: pointer;
  background-color: #28a745;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 30px;
  margin-bottom: 10px;
  margin-right: 4vw;
  box-shadow: 2px 2px 0px #999;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px) translateX(2px);
    box-shadow: none;
  }
`

const ErrorInput = styled.p`
  position: fixed;
  margin-top: 10px;
  color: red;
`

const InputContainer = styled.div`
  position: relative;
  margin-top: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 5px;
  width: 15vw;

  @media (max-width: 850px) {
    width: 90vw;
    margin: 20px auto;
  }
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

  @media (max-width: 1450px) {
    font-size: 18px;
  }

  @media (max-width: 850px) {
    font-size: 16px;
  }
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 850px) {
    display: block;
  }
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

  @media (max-width: 1450px) {
    padding: 20px;
  }

  @media (max-width: 850px) {
    padding: 15px;
  }
`
