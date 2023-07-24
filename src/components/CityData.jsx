import React from 'react'

export default function CityData({ city }) {
  return (
    <>{city ? <p>{city}</p> : <p>Cargando la ubicación del usuario...</p>}</>
  )
}
