import React, {useState} from 'react'
import pinIcon from '../../assets/pin.png'
import { Text } from '../../components/Text'

export const Navbar = () => {

    const downloadURL = "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/us/app/weather/id1069513131&ved=2ahUKEwjzyI_ZgP2VAxVZzwIHHZg6E0gQFnoECCAQAQ&usg=AOvVaw23Q0okt8s3y18BrV6CAjPh"
    const [showSearch, toggleSearch] = useState(false);
    return (
        <div className='nav-main'>
            <div className='left-nav-content'>
                <img src={pinIcon} alt='Location Icon' id='nav-location-icon' />
                <div id='location-text'>
                    <Text variant='h4' style={{ color: 'white' }}>Polokwane, Bendor, SA</Text>
                    <Text variant='p' style={{ color: 'white' }}>Monday, August 3</Text>
                </div>
            </div>

            <div className='right-nav-content'>
                <div className='search-section'>
                    <img src={'search.png'} alt='Search Icon' id='nav-search-icon' />
                    <input type='text' className='search-bar' placeholder='Search City' />
                </div>
                <a href={downloadURL} target='_blank' rel='noopener noreferrer' id='download-app-btn'>Download App</a>
            </div>
        </div>
    )
}
