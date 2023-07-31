import styled from 'styled-components'

import { Colors } from '../static/Colors'
import logo from '../assets/logo.png'
import SearchCities from './SearchCitites'

const { headerColor } = Colors

export default function Header({ setCity, setSearchMode }) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={logo} alt="Logo de la app de clima" />
        <h1>Weather App</h1>
      </LogoContainer>
      <SearchContainer>
        <SearchCities setCity={setCity} setSearchMode={setSearchMode} />
      </SearchContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  background-color: #f2f9f9;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const LogoContainer = styled.div`
  text-align: center;
  margin: 10px 5vw;

  img {
    height: 100px;
  }

  h1 {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    font-style: italic;
    margin-bottom: 0;
    font-size: 26px;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`
