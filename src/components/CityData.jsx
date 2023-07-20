import React from 'react'

export default function CityData({ city }) {
  return (
    <>
      {city ? (
        <p>La ciudad del usuario es: {city}</p>
      ) : (
        <p>Cargando la ubicación del usuario...</p>
      )}
    </>
  )
}
