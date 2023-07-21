import styled from 'styled-components'

import { Colors } from '../static/Colors'
import logo from '../assets/logo.png'
import SearchCities from './SearchCitites'

const { headerColor } = Colors

export default function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={logo} alt="Logo de la app de clima" />
        <h1>Weather App</h1>
      </LogoContainer>
      <SearchContainer>
        <SearchCities />
      </SearchContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  background-color: ${headerColor};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const LogoContainer = styled.div`
  margin: 10px 30px;

  img {
    height: 100px;
  }

  h1 {
    margin: 0;
    font-size: 26px;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`
