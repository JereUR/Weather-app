import { useEffect, useState } from 'react'
import styled from 'styled-components'

import WeatherData from './components/WeatherData'
import GetUserCity from './helpers/GetUserCity'
import Header from './components/Header'
import { Colors } from './static/Colors'

const { errorText, backgroundError } = Colors

export default function App() {
  const [city, setCity] = useState(null)
  const [errorFetch, setErrorFetch] = useState(null)
  const [searchMode, setSearchMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const userCity = await GetUserCity()
      if (!userCity.message) {
        if (userCity.message) {
          setError(userCity.message)
        } else {
          setCity(userCity)
        }
      } else {
        return {
          message: userCity.message
        }
      }
    }

    if (!searchMode) {
      fetchData()
    }
  }, [])

  return (
    <Container>
      <Header setCity={setCity} setSearchMode={setSearchMode} />
      {city !== null && (
        <WeatherData
          city={city.city}
          keyCountry={city.key}
          setError={setErrorFetch}
        />
      )}

      {city === null && errorFetch === null && <p>Cargando datos...</p>}

      {errorFetch !== null && (
        <CenteredComponent>
          <ErrorContainer>
            <ErrorText>Error: {errorFetch}. Try to reload the page.</ErrorText>
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
