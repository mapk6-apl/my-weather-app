import React, { useState, useRef, useEffect } from 'react'
import pinIcon from '../../assets/pin.png'
import { Text } from '../../components/Text'
import { searchCities } from '../services/WeatherService'
import { requestNotificationPermission } from '../services/WeatherAlerts'
import searchIcon from '../../assets/search.png'
import {ButtonComponent} from '../../components/ButtonComponent'

export type NavbarProps = {
    setLat: (latitude: number) => void
    setLon: (longitude: number) => void
    locationName: string
    setLocationName: (name: string) => void
    isDark: boolean
    setIsDark: (isDark: boolean) => void
}

export const Navbar: React.FC<NavbarProps> = ({ setLat, setLon, locationName, setLocationName, isDark, setIsDark }) => {

    const downloadURL = "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/us/app/weather/id1069513131&ved=2ahUKEwjzyI_ZgP2VAxVZzwIHHZg6E0gQFnoECCAQAQ&usg=AOvVaw23Q0okt8s3y18BrV6CAjPh"
    const [showSearch, toggleSearch] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]); /* state variable initialized as empty array; allowing any data type inside it (uses TypeScript syntax) */
    const searchInputRef = useRef<HTMLInputElement>(null) /* creates shortcut to input box in browser */
    const searchSectionRef = useRef<HTMLDivElement>(null);

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if (searchSectionRef.current && !searchSectionRef.current.contains(event.target as Node)) {
                setSuggestions([]);
                setSearchQuery('');
                toggleSearch(false)
            }
        };

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setSuggestions([]); /*  */
            return;
        }

        // the delay in time it takes after user stopped typing before hitting network endpoint???
        // async --> function that allows use of await keyword so the code pauses for server responses w/o freezing webpage
        const delayDebounceTime = setTimeout(async () => {
            const cities = await searchCities(searchQuery);
            setSuggestions(cities);
        }, 400);

        return () => clearTimeout(delayDebounceTime); //clean up clock timer if user presses another key
    }, [searchQuery]);

    // what user enters into search bar/input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectLocation = (cityObject: any) => {
        setSearchQuery('');
        setSuggestions([]);
        toggleSearch(false);
        setLocationName(cityObject.fullName);
        setLat(cityObject.latitude);
        setLon(cityObject.longitude);
    }

    return (
        <div className='nav-main'>
            <div className='left-nav-content'>
                <img src={pinIcon} alt='Location Icon' id='nav-location-icon' />
                <div id='location-text'>
                    <Text variant='h4' style={{ color: 'white' }}>{locationName},</Text>
                    <Text variant='p' style={{ color: 'white' }}>{today}</Text>
                </div>
            </div>

            <div className='right-nav-content'>
                <div className='search-section' ref={searchSectionRef}>
                    <img src={searchIcon} alt='Search Icon' id='nav-search-icon' onClick={() => toggleSearch(!showSearch)} />

                    {showSearch && (
                        <div className='search-input-section'>
                            <input ref={searchInputRef} type='text' className='search-bar' placeholder='Search City' value={searchQuery} onChange={handleInputChange} autoFocus />

                            {/* this creates the dropdown with the list of locations suggested */}
                            {suggestions.length > 0 && (
                                <ul className='suggestion-list'>
                                    {suggestions.map((city, index) => (
                                        <li key={index} className='suggestion-item' onClick={() => handleSelectLocation(city)}>{city.fullName}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                </div>
                <ButtonComponent className='theme-toggle-btn' onClick={() => setIsDark(!isDark)} >
                    {isDark ? '☀️' : '🌙'}
                </ButtonComponent>
                <a href={downloadURL} target='_blank' rel='noopener noreferrer' id='download-app-btn'>Download App</a>
            </div>
        </div>
    )
}
/* autoFocus places cursor inside search input automatically */