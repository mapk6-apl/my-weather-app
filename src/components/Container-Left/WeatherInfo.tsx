import { Text } from '../../components/Text'
import { useState, useEffect } from 'react'
import { getCurrentWeather, getForecast } from '../services/WeatherService'
import { getRecentSearches, addRecentSearch } from '../services/RecentSearches'
import { sendWeatherAlert } from '../services/WeatherAlerts'
import rightArrow from '../../assets/right.png'
import topArrow from '../../assets/top.png'
import lineGraph from '../../assets/line-graph.png'
import humidityIcon from '../../assets/humidity.png'
import windIcon from '../../assets/wind.png'
import meterIcon from '../../assets/meter.png'
import pinIcon from '../../assets/pin.png'

import { familyFromOwmMain, backgroundForFamily } from '../services/WeatherIcons'

interface WeatherProps {
    latitude: number;
    longitude: number;
    locationName: string;
}

export const WeatherInfo: React.FC<WeatherProps> = ({ latitude, longitude, locationName }) => {

    const [temp, setTemp] = useState('18');
    const [condition, setCondition] = useState('Stormy');
    const [description, setDescription] = useState('with partly cloudy');
    const [highTemp, setHighTemp] = useState('29');
    const [lowTemp, setLowTemp] = useState('12');

    const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
    const [dailyForecast, setDailyForecast] = useState<any[]>([]);

    const [humidity, setHumidity] = useState('78%');
    const [wind, setWind] = useState('12 km/h');
    const [pressure, setPressure] = useState('1 kPa');
    const [direction, setDirection] = useState('Northwest');
    const [precipitationChance, setPrecipitationChance] = useState(0);
    const [isDangerous, setIsDangerous] = useState(false);

    const [recentSearches, setRecentSearches] = useState<any[]>([]);
    const [showAllRecent, setShowAllRecent] = useState(false);

    const [isDay, setIsDay] = useState(true);

    const family = familyFromOwmMain(condition);
    const background = backgroundForFamily(family, isDay);

    const [forecastView, setForecastView] = useState<'hourly' | 'daily'>('hourly');

    const loadWeather = async () => {
        const current = await getCurrentWeather(latitude, longitude,);
        if (current) {
            setTemp(`${current.temp}`);
            setCondition(current.condition);
            setDescription(current.description);
            setHumidity(current.humidity);
            setWind(current.wind);
            setPressure(current.pressure);
            setDirection(current.direction);
            setIsDangerous(current.isDangerous);
            setIsDay(current.isDay);

            //saving the search so it shows up in recently searched
            const updatedList = addRecentSearch({
                fullName: locationName,
                latitude,
                longitude,
                temp: current.temp,
                condition: current.condition,
                icon: current.icon
            });
            setRecentSearches(updatedList);

            //if conditions are danegerous, send a browser notification
            sendWeatherAlert(locationName, current);
        }

        const forecast = await getForecast(latitude, longitude);
        setHourlyForecast(forecast.hourly);
        setDailyForecast(forecast.daily);

        if (forecast.daily.length > 0) {
            setHighTemp(`${forecast.daily[0].high}`)
            setLowTemp(`${forecast.daily[0].low}`)
        }

        //open weather doesnt include precipitation

        if (forecast.hourly.length > 0) {
            setPrecipitationChance(forecast.hourly[0].rainChance);
        }
    };

    useEffect(() => {
        loadWeather();
    }, [latitude, longitude]);

    useEffect(() => {
        setRecentSearches(getRecentSearches());
    }, []);

    const otherSearches = recentSearches.filter((search) => search.fullName !== locationName);
    const visibleSearches = showAllRecent ? otherSearches : otherSearches.slice(0, 2);

    return (
        <div className='main-weather-screen'>
            <div className='left-screens'>
                <div className='screen-1' style={{ background: background }}>
                    <div className='screen-1-elements'>
                        <div className='left-elements'>
                            <Text variant='h1' style={{ color: 'white', marginLeft: '-20px' }}>{temp}&#176;</Text>
                            <div id='left-two-texts'>
                                <Text variant='h2' style={{ color: 'white' }} className={'screen-1-text'}>{condition}</Text>
                                <Text variant='h3' style={{ marginTop: '-15px' }} className={'screen-1-text'}>{description}</Text>
                            </div>

                            <div className='high-low'>
                                <div id='high'>
                                    <Text variant='h3' className={'screen-1-text'}>H</Text>
                                    <Text variant='h3' style={{ color: 'white' }} className={'screen-1-text'}>{highTemp}&#176;</Text>
                                </div>
                                <div id='low'>
                                    <Text variant='h3' className={'screen-1-text'}>L</Text>
                                    <Text variant='h3' style={{ color: 'white' }} className={'screen-1-text'}>{lowTemp}&#176;</Text>
                                </div>
                            </div>
                        </div>

                        <div className='message'>
                            <Text variant='span' className={'message-container'}>With real time data and <br></br> advanced technology, <br></br> we provide reliable <br></br>forecasts for any <br></br>location around <br></br>the world.</Text>
                        </div>
                    </div>
                </div>

                <div className='forecast-toggle'>
                    <button className={forecastView === 'hourly' ? 'toggle-btn toggle-active' : 'toggle-btn'} onClick={() => setForecastView('hourly')}>Hourly</button>
                    <button className={forecastView === 'daily' ? 'toggle-btn toggle-active' : 'toggle-btn'} onClick={() => setForecastView('daily')}>Daily</button>
                </div>

                {forecastView === 'hourly' ? (
                    <div className='screen-2'>
                        {hourlyForecast.map((hour, index) => (
                            <div key={index} className={index === 0 ? 'now-hourly-forecast' : 'hourly-forecast'} >
                                <Text variant='p'>{hour.time}</Text>
                                {hour.rainChance > 15 && <Text variant='p' className='rain-chance'>{hour.rainChance}%</Text>}
                                <img src={hour.icon} alt={`${hour.condition} icon`} id='cloudy-img' />
                                <Text variant='p'>{hour.temp}&#176;</Text>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='screen-3'>
                        {dailyForecast.map((day, index) => (
                            <div key={index} className='daily-forecast'>
                                <Text variant='p' style={{ fontSize: '16px' }}>{day.day}</Text>
                                <img src={day.icon} alt={`${day.condition} icon`} id='sunny-img' />
                                {day.rainChance > 15 && <Text variant='p' className='rain-chance'>{day.rainChance}%</Text>}
                                <Text variant='p' style={{ fontSize: '20px' }}>{day.high}&#176;</Text>
                                <Text variant='p' style={{ color: 'darkgray' }}>{day.low}&#176;</Text>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='right-screens'>
                <div className='screen-4'>
                    <div className='screen-4-top-content'>

                        <div id='4-top-left-items'>
                            <Text variant='span'>Live Conditions</Text>
                        </div>

                        <div id='4-top-right-items'>
                            <img src={rightArrow} alt='Right Arrow' id='right-arrow' />
                        </div>

                    </div>

                    <div className='screen-4-mid-content'>
                        <div className='precipitation'>
                            <img src={topArrow} alt='Top Arrow' id='top-arrow' />
                            <Text variant='span'>{precipitationChance}%</Text>
                        </div>

                        <div className='danger-level' style={{ backgroundColor: isDangerous ? undefined : 'rgb(76, 175, 80)' }}>
                            <Text variant='span'>{isDangerous ? 'Dangerous' : 'Normal'}</Text>
                        </div>
                    </div>
                    <div className='screen-4-line-graph'>
                        <img src={lineGraph} alt='Precipitation Graph' id='line-graph' />
                    </div>

                    <hr className='line-divider'></hr>

                    <div className='screen-4-bottom-content'>

                        <div className='humidity'>
                            <div className='humidity-left-items'>
                                <img src={humidityIcon} alt='Humidity Icon' style={{ filter: 'invert(63%)', width: '20px' }} id='humidity-icon' />
                            </div>
                            <div className='humidity-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>{humidity}</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Humidity</Text>
                            </div>
                        </div>

                        <div id='vertical-divider'></div>

                        <div className='wind'>
                            <div className='wind-left-items'>
                                <img src={windIcon} alt='Wind Icon' style={{ width: '20px' }} id='wind-icon' />
                            </div>
                            <div className='wind-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>{wind}</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Wind</Text>
                            </div>
                        </div>

                        <div id='vertical-divider'></div>

                        <div className='pressure'>
                            <div className='pressure-left-items'>
                                <img src={meterIcon} alt='Pressure Icon' style={{ filter: 'invert(63%)', width: '20px' }} id='pressure-icon' />
                            </div>
                            <div className='pressure-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>{pressure}</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Pressure</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='screen-5'>
                    <div className='screen-5-top-content'>
                        <Text variant='span'>Recently Searched</Text>
                        {otherSearches.length > 2 && (
                            <div id='right-5-top-content' onClick={() => setShowAllRecent(!showAllRecent)} style={{ cursor: 'pointer' }}>
                                <Text variant='span'>See All</Text>
                                <img src={rightArrow} alt='Right Arrow' id='right-arrow' />
                            </div>
                        )}
                    </div>

                    {/* allows scrolling internally instead of making the whole page scroll when expanded */}

                    <div className='screen-5-list' style={{ maxHeight: showAllRecent ? '260px' : 'none', overflowY: showAllRecent ? 'auto' : 'visible' }}>
                        {visibleSearches.length === 0 && (
                            <Text variant='span' style={{ color: 'rgb(208, 204, 204)' }}>No other locations searched yet.</Text>
                        )}
                        {visibleSearches.map((search, index) => (
                            <div key={index} className={index === 0 ? 'screen-5-mid-content' : 'screen-5-bottom-content'}>
                                <div id='icon-text'>
                                    <div id='mid-content-icon'>
                                        <img src={search.icon} alt={`${search.condition} icon`} id='mid-partly-cloudy-img' />
                                    </div>
                                    <div id='mid-content-text'>
                                        <Text variant='span'>{search.fullName}</Text>
                                        <Text variant='span' style={{ color: 'rgb(208, 204, 204)' }}>{search.condition}</Text>
                                    </div>
                                </div>

                                <div id='mid-content-temp'>
                                    <Text variant='span' style={{ fontSize: '30px' }}>{search.temp}&#176;</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className='screen-6'>
                    <Text variant='span' style={{ textAlign: 'left' }}>Wind Map</Text>
                    <div className='wind-speed'>
                        <Text variant='span' style={{ textAlign: 'left' }}>{wind}</Text>
                        <Text variant='span' style={{ textAlign: 'left' }}>{direction}</Text>
                    </div>
                    <img src={pinIcon} style={{ filter: 'invert(1)' }} alt='Location Pin Icon' id='location-pin' />
                </div>
            </div>
        </div>
    );
}


//     <div className='now-hourly-forecast'>
//         <Text variant='p'>Now</Text>
//         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//         <Text variant='p'>18&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>2 PM</Text>
//         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//         <Text variant='p'>19&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>3 PM</Text>
//         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//         <Text variant='p'>20&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>4 PM</Text>
//         <Text variant='p' className='rain-chance'>60%</Text>
//         <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
//         <Text variant='p'>20&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>5 PM</Text>
//         <Text variant='p' className='rain-chance'>60%</Text>
//         <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
//         <Text variant='p'>19&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>6 PM</Text>
//         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//         <Text variant='p'>18&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>7 PM</Text>
//         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//         <Text variant='p'>17&#176;</Text>
//     </div>
//     <div className='hourly-forecast'>
//         <Text variant='p'>8 PM</Text>
//         <img src={'night.png'} style={{ filter: 'invert(83%)' }} alt='Night Time Weather Icon' id='night-img' />
//         <Text variant='p'>16&#176;</Text>
//     </div>
// </div>




// <div className='screen-3'>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Sun</Text>
//                         <img src={'sun.png'} alt='Sunny Weather Icon' id='sunny-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>28&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>12&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Mon</Text>
//                         <img src={'partly-cloudy.png'} alt='Partly Cloudy Weather Icon' id='partly-cloudy-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>26&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>11&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Tue</Text>
//                         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>27&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>12&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Wed</Text>
//                         <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
//                         <Text variant='p' className='rain-chance'>60%</Text>
//                         <Text variant='p' style={{ fontSize: '20px' }}>23&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>13&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Thur</Text>
//                         <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>30&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>14&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Fri</Text>
//                         <img src={'partly-cloudy.png'} alt='Parlty Cloudy Weather Icon' id='partly-cloudy-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>23&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>10&#176;</Text>
//                     </div>
//                     <div className='daily-forecast'>
//                         <Text variant='p' style={{ fontSize: '16px' }}>Sat</Text>
//                         <img src={'sun.png'} alt='Sunny Weather Icon' id='sunny-img' />
//                         <Text variant='p' style={{ fontSize: '20px' }}>24&#176;</Text>
//                         <Text variant='p' style={{ color: 'darkgray' }}>9&#176;</Text>
//                     </div>
//                 </div>
//             </div>


{/* <div className='screen-5-mid-content'>
                    <div id='icon-text'>
                        <div id='mid-content-icon'>
                            <img src={'partly-cloudy.png'} alt='Partly Cloudy Icon' id='mid-partly-cloudy-img' />
                        </div>
                        <div id='mid-content-text'>
                            <Text variant='span'>Liverpool, UK</Text>
                            <Text variant='span' style={{ color: 'rgb(208, 204, 204)' }}>Partly Cloudy</Text>
                        </div>
                    </div>

                    <div id='mid-content-temp'>
                        <Text variant='span' style={{ fontSize: '30px' }}>16&#176;</Text>
                    </div>
                </div>

                <div className='screen-5-bottom-content'>
                    <div id='icon-text'>
                        <div id='bottom-content-icon'>
                            <img src={'thunderstorm.png'} alt='Thunderstorm Icon' id='mid-thunderstorm-img' />
                        </div>
                        <div id='bottom-content-text'>
                            <Text variant='span'>Palermo, Italy</Text>
                            <Text variant='span' style={{ color: 'rgb(208, 204, 204)' }}>Rain/Thunder</Text>
                        </div>
                    </div>

                    <div id='bottom-content-temp'>
                        <Text variant='span' style={{ fontSize: '30px' }}>-2&#176;</Text>
                    </div>
                </div>
            </div> */}