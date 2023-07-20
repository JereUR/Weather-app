import styled from 'styled-components'

import { Colors } from '../static/Colors'
import logo from '../assets/logo.png'

const { headerColor } = Colors

export default function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={logo} alt="Logo de la app de clima" />
        <h1>Weather App</h1>
      </LogoContainer>
      <SearchContainer>
        <input type="text" placeholder="Buscar ciudad..." />
        <button>Search</button>
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

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    color: ${headerColor};
    font-size: 16px;
    cursor: pointer;
  }

  input {
    padding: 8px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
    color: ${headerColor};
    font-size: 16px;
    outline: none;
    width: 200px;
  }

  input::placeholder {
    color: ${headerColor};
  }
`
