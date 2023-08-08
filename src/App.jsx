import { useEffect, useState } from 'react'
import styled from 'styled-components'

import WeatherData from './components/WeatherData'
import GetUserCity from './helpers/GetUserCity'
import Header from './components/Header'
import { Colors } from './static/Colors'
import Loader from './components/Loader'
import Footer from './components/Footer'

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
  }, [searchMode])

  return (
    <Container>
      <Header setCity={setCity} setSearchMode={setSearchMode} />
      {city !== null && (
        <WeatherData
          city={city.city}
          keyCountry={city.key}
          setError={setErrorFetch}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
        />
      )}

      {city === null && errorFetch === null && <Loader />}

      {errorFetch !== null && (
        <CenteredComponent>
          <ErrorContainer>
            <ErrorText>Error: {errorFetch}. Try to reload the page.</ErrorText>
          </ErrorContainer>
        </CenteredComponent>
      )}
      <Footer />
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
