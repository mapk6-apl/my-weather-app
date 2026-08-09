import React, {useState, useEffect} from 'react'
import {ContentContainer} from './ContentContainer'
import {Navbar} from './components/NavBar/Navbar'
import {WeatherInfo} from './components/Container-Left/WeatherInfo'

export const App: React.FC = () => {

  const [latitude, setLatitude] = useState(-23.9045);
  const [longitude, setLongitude] = useState(29.4689);
  const [locationName, setLocationName] = useState('Polokwane, Bendor, SA');

  useEffect(() => {
    if(!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setLocationName('My Location')
      },
      (error) => {
        console.warn('Location permission denied or unavailable:', error);
      }
    );
  }, []);
  
  return (
    <ContentContainer>
        <Navbar setLat={setLatitude} setLon={setLongitude} setLocationName={setLocationName} locationName={locationName} />
        <WeatherInfo latitude={latitude} longitude={longitude} locationName={locationName}/>
    </ContentContainer>

  )
}
