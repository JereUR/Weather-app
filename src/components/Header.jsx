import styled from 'styled-components'

import { Colors } from '../static/Colors'
import logo from '../assets/logo.png'
import SearchCities from './SearchCitites'

const { headerColor } = Colors

export default function Header({ setCity, setSearchMode }) {
  return (
    <HeaderContainer>
      <LogoContainer onClick={() => setSearchMode(false)}>
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
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;

  @media (max-width: 850px) {
    display: block;
  }
`

const LogoContainer = styled.div`
  text-align: center;
  margin: 10px 5vw;

  &:hover {
    cursor: pointer;
  }

  img {
    height: 100px;
  }

  h1 {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    font-style: italic;
    margin-bottom: 0;
    font-size: 32px;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`
