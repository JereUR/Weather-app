import { useEffect, useState } from 'react'
import styled from 'styled-components'

import WeatherData from './components/WeatherData'
import GetUserCity from './helpers/GetUserCity'
import Header from './components/Header'
import { Colors } from './static/Colors'

const { errorText, backgroundError } = Colors

export default function App() {
  const [city, setCity] = useState(null)
  const [errorCity, setErrorCity] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCity = await GetUserCity()
        if (userCity.message) {
          setErrorCity(userCity.message)
        } else {
          setCity(userCity)
        }
      } catch (error) {
        console.log('Error al obtener los datos del clima:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Header />
      {city !== null && errorCity === null && (
        <WeatherData
          city={city.city}
          latitude={city.userLocation.latitude}
          longitude={city.userLocation.longitude}
        />
      )}

      {city === null && errorCity === null && <p>Cargando datos...</p>}

      {errorCity !== null && (
        <CenteredComponent>
          <ErrorContainer>
            <ErrorText>Error: {errorCity}. Try to reload the page.</ErrorText>
          </ErrorContainer>
        </CenteredComponent>
      )}
    </Container>
  )
}

const CenteredComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Container = styled.div``

const ErrorContainer = styled.div`
  background-color: ${backgroundError};
  padding: 10px 30px;
  border: 1px solid ${errorText};
  width: fit-content;
`

const ErrorText = styled.p`
  color: ${errorText};
  font-size: 24px;
  font-weight: 600;
`
