
import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

// components
import PrimaryButton from './components/PrimaryButton'
import CitySelect from './components/CitySelect'
import ListElement from './components/ListElement'

// dependencies
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Particles from 'react-particles-js'

// images
import Background from './images/pollution.jpg'


// STYLES --------------------------------

// global styles
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  p{
    padding: 5px;
  }
`

// main app wrapper style
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: url(${Background});
  background-position: center;
  height: 100vh;
  background-size: cover;
`

// input section wrapper style
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  height: 60px;
  button{
    padding: 16px;
  }

  @media (max-width: 450px) {
    flex-direction: column;
    .detailButton{
      margin-top: 20px;
    }
  }
`

//  APP --------------------------------

const App = () => {

  // initial states
  const [city, setCity] = useState('')
  const [cityDetails, setCityDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [isclicked, setisclicked] = useState(false)

  // useEffect Hook to set city state
  useEffect(() => {
    const input = document.getElementById('country-select')
    setCity(input.value)
  }, [city])

  // set city details
  const showCityDetails = async () => {
    setLoading(true)
    const response = await fetch(`https://api.openaq.org/v1/measurements?country=PL&parameter=pm10&city=${city}&order_by=date&sort=desc&limit=1`)
    const data = await response.json()
    setCityDetails(data.results)
    setisclicked(true)
    setTimeout(() => {
      setLoading(false)

    }, 500)
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Particles
          style={{
            position: 'absolute'
          }}
          params={{
            "particles": {
              "number": {
                "value": 160,
                "density": {
                  "enable": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "speed": 4,
                  "size_min": 0.3
                }
              },
              "line_linked": {
                "enable": false
              },
              "move": {
                "random": true,
                "speed": .4,
                "direction": "top",
                "out_mode": "out"
              }
            },
            "interactivity": {
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                },
                "onclick": {
                  "enable": false,
                  "mode": "repulse"
                }
              },
              "modes": {
                "bubble": {
                  "distance": 250,
                  "duration": 2,
                  "size": 0,
                  "opacity": 0
                },
                "repulse": {
                  "distance": 400,
                  "duration": 4
                }
              }
            }
          }} />
        <InputWrapper>
          <CitySelect labelTxt='Wybierz miasto' func={setCity} />
          <PrimaryButton func={city ? showCityDetails : null} buttonTxt='sprawdź aktualny pomiar' />
        </InputWrapper>
        {loading ? <CircularProgress style={{ margin: '50px auto', }} size='100px' /> : <ListElement cityDetails={cityDetails} isclicked={isclicked} />}
      </AppWrapper>
    </React.Fragment>
  )
}

export default App