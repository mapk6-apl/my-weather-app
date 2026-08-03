import React from 'react'
import {ContentContainer} from './ContentContainer'
import {Navbar} from './components/NavBar/Navbar'
import {WeatherInfo} from './components/Container-Left/WeatherInfo'

export const App = () => {
  return (
    <ContentContainer>
        <Navbar/>
        <WeatherInfo />
    </ContentContainer>

  )
}
