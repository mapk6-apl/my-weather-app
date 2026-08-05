import React, { useState, useRef, useEffect } from 'react'
import pinIcon from '../../assets/pin.png'
import { Text } from '../../components/Text'

// export type SearchbarProps = {
//     ref: React.RefObject<HTMLInputElement | null>
//     onSearch: () => void
// }

export const Navbar = () => {

    const downloadURL = "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/us/app/weather/id1069513131&ved=2ahUKEwjzyI_ZgP2VAxVZzwIHHZg6E0gQFnoECCAQAQ&usg=AOvVaw23Q0okt8s3y18BrV6CAjPh"
    const [showSearch, toggleSearch] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]); /* state variable initialized as empty array; allowing any data type inside it (uses TypeScript syntax) */
    const [currentLocation, setCurrentLocation] = useState('Polokwane, Bendor, SA');
    const searchInputRef = useRef<HTMLInputElement>(null) /* creates shortcut to input box in browser */

    const API_KEY = "88de1ac9434d7b7cb3bf0dc272400990"

    useEffect(() => {
        if (searchQuery.length < 2) {
            setSuggestions([]); /*  */
            return;
        }

        // the delay in time it takes after user stopped typing before hitting network endpoint???
        // async --> function that allows use of await keyword so the code pauses for server responses w/o freezing webpage
        const delayDebounceTime = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://openweathermap.org{searchQuery}&limit=5&appid=${API_KEY}` // URL/web address used to send an asynchronous request to OpenWeather API servers (to handle city name searches)
                );
                
                if (!response.ok) throw new Error('Network query fault');

                const data = await response.json(); //extracts raw data from server and converts it into a usable JS object/array

                /* this takes the raw data array returned by OpenWeather API, cleans it up using .map() and creates a new simple list */

                const formattedCities = data.map((item: any) => ({
                    fullName: `${item.name}${item.state ? `, ${item.state}` : " "}, ${item.country}`,
                    latitude: item.lat,
                    longitude: item.lon
                }));

                setSuggestions(formattedCities);
            } catch (error) {
                console.error("Failed fetching live locations:", error);
            }
        }, 400);

        return () => clearTimeout(delayDebounceTime); //clean up clock timer if user presses another key
    }, [searchQuery]);

    // what user enters into search bar/input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectLocation = (cityObject: any) => {
        setCurrentLocation(cityObject.fullName);
        setSearchQuery('');
        setSuggestions([]);
        toggleSearch(false);
    }


    return (
        <div className='nav-main'>
            <div className='left-nav-content'>
                <img src={pinIcon} alt='Location Icon' id='nav-location-icon' />
                <div id='location-text'>
                    <Text variant='h4' style={{ color: 'white' }}>{currentLocation}</Text>
                    <Text variant='p' style={{ color: 'white' }}>Monday, August 3</Text>
                </div>
            </div>

            <div className='right-nav-content'>
                <div className='search-section'>
                    <img src={'search.png'} alt='Search Icon' id='nav-search-icon' onClick={() => toggleSearch(!showSearch)} />

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
                <a href={downloadURL} target='_blank' rel='noopener noreferrer' id='download-app-btn'>Download App</a>
            </div>
        </div>
    )
}
/* autoFocus places cursor inside search input automatically */