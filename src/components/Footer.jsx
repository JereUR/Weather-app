import styled from 'styled-components'
import github from '../assets/github-logo.png'
import linkedin from '../assets/linkedin.png'

export default function Footer() {
  return (
    <FooterContainer>
      <LeftFooter>
        <Social>
          <div>
            <a
              href="https://github.com/JereUR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={github} alt="github" />
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/jeremias-dominguez-vega/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={linkedin} alt="linkedin" />
            </a>
          </div>
        </Social>
      </LeftFooter>
      <RightFooter>
        <p>
          Created by <b>Jeremías Dominguez Vega</b>
        </p>
      </RightFooter>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  height: auto;
  z-index: 997;
  margin-top: 10px;
  font-size: 12px;
  max-width: 100%;
  height: auto;
`

const Image = styled.img`
  border-radius: 50%;
  margin: 1rem;
`

const LeftFooter = styled.div`
  display: grid;
`

const RightFooter = styled.div`
  margin-top: auto;
  padding-right: 1rem;
  font-size: 16px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding-right: 0 !important;
    margin-right: -2rem;
  }
`

const Social = styled.div`
  width: max-content;
  float: left;
  display: flex;
  justify-content: end;

  img {
    width: 2vw;
    display: block;
    transition: all 0.5s ease-in-out;

    @media screen and (max-width: 1000px) {
      width: 4vw;
    }

    @media screen and (max-width: 600px) {
      width: 8vw;
    }
  }

  img:hover {
    transform: scale(1.1);
  }
`
