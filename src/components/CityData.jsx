import React from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import { GrMapLocation } from 'react-icons/gr'

export default function CityData({ city }) {
  return (
    <>
      {city ? (
        <CityName>
          🌍 <span>{city}</span>
        </CityName>
      ) : (
        <Loader />
      )}
    </>
  )
}

const CityName = styled.p`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: -10px;

  span {
    text-decoration: underline;
  }
`
