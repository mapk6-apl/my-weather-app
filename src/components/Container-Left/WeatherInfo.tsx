import { Text } from '../../components/Text'
import darkClouds from '../../assets/dark-clouds.jpg'
import React, { useState } from 'react'

export const WeatherInfo = () => {

    return (
        <div className='main-weather-screen'>
            <div className='left-screens'>
                <div className='screen-1'>
                    <img src={darkClouds} alt='Dark Clouds Background' id='dark-clouds-bg' />
                    <div className='screen-1-elements'>
                        <div className='left-elements'>
                                <Text variant='h1' style={{ color: 'white', marginLeft: '-20px'}}>18&#176;</Text>
                            <div id='left-two-texts'>
                                <Text variant='h2' style={{ color: 'white' }} className={'screen-1-text'}>Stormy</Text>
                                <Text variant='h3' style={{ marginTop: '-15px' }} className={'screen-1-text'}>with partly cloudy</Text>
                            </div>

                            <div className='high-low'>
                                <div id='high'>
                                    <Text variant='h3' className={'screen-1-text'}>H</Text>
                                    <Text variant='h3' style={{ color: 'white' }} className={'screen-1-text'}>29&#176;</Text>
                                </div>
                                <div id='low'>
                                    <Text variant='h3' className={'screen-1-text'}>L</Text>
                                    <Text variant='h3' style={{ color: 'white' }} className={'screen-1-text'}>12&#176;</Text>
                                </div>
                            </div>
                        </div>

                        <div className='message'>
                            <Text variant='span' className={'message-container'}>With real time data and <br></br> advanced technology, <br></br> we provide reliable <br></br>forecasts for any <br></br>location around <br></br>the world.</Text>
                        </div>
                    </div>
                </div>
                <div className='screen-2'>
                    <div className='now-hourly-forecast'>
                        <Text variant='p'>Now</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p'>18&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>2 PM</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p'>19&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>3 PM</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p'>20&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>4 PM</Text>
                        <Text variant='p' className='rain-chance'>60%</Text>
                        <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
                        <Text variant='p'>20&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>5 PM</Text>
                        <Text variant='p' className='rain-chance'>60%</Text>
                        <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
                        <Text variant='p'>19&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>6 PM</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p'>18&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>7 PM</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p'>17&#176;</Text>
                    </div>
                    <div className='hourly-forecast'>
                        <Text variant='p'>8 PM</Text>
                        <img src={'night.png'} style={{ filter: 'invert(83%)' }} alt='Night Time Weather Icon' id='night-img' />
                        <Text variant='p'>16&#176;</Text>
                    </div>
                </div>
                <div className='screen-3'>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Sun</Text>
                        <img src={'sun.png'} alt='Sunny Weather Icon' id='sunny-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>28&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>12&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Mon</Text>
                        <img src={'partly-cloudy.png'} alt='Partly Cloudy Weather Icon' id='partly-cloudy-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>26&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>11&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Tue</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>27&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>12&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Wed</Text>
                        <img src={'rainy.png'} alt='Rainy Weather Icon' id='rainy-img' />
                        <Text variant='p' className='rain-chance'>60%</Text>
                        <Text variant='p' style={{ fontSize: '20px' }}>23&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>13&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Thur</Text>
                        <img src={'cloudy.png'} alt='Cloudy Weather Icon' id='cloudy-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>30&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>14&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Fri</Text>
                        <img src={'partly-cloudy.png'} alt='Parlty Cloudy Weather Icon' id='partly-cloudy-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>23&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>10&#176;</Text>
                    </div>
                    <div className='hourly-forecast-2'>
                        <Text variant='p' style={{ fontSize: '16px' }}>Sat</Text>
                        <img src={'sun.png'} alt='Sunny Weather Icon' id='sunny-img' />
                        <Text variant='p' style={{ fontSize: '20px' }}>24&#176;</Text>
                        <Text variant='p' style={{ color: 'darkgray' }}>9&#176;</Text>
                    </div>
                </div>
            </div>

            <div className='right-screens'>
                <div className='screen-4'>
                    <div className='screen-4-top-content'>

                        <div id='4-top-left-items'>
                            <Text variant='span'>Live Conditions</Text>
                        </div>

                        <div id='4-top-right-items'>
                            <img src={'right.png'} alt='Right Arrow' id='right-arrow' />
                        </div>

                    </div>

                    <div className='screen-4-mid-content'>
                        <div className='precipitation'>
                            <img src={'top.png'} alt='Top Arrow' id='top-arrow' />
                            <Text variant='span'>23.8%</Text>
                        </div>

                        <div className='danger-level'>
                            <Text variant='span'>Dangerous</Text>
                        </div>
                    </div>
                    <div className='screen-4-line-graph'>
                        <img src={'line-graph.png'} alt='Precipitation Graph' id='line-graph' />
                    </div>

                    <hr className='line-divider'></hr>

                    <div className='screen-4-bottom-content'>

                        <div className='humidity'>
                            <div className='humidity-left-items'>
                                <img src={'humidity.png'} alt='Humidity Icon' style={{ filter: 'invert(63%)', width: '20px' }} id='humidity-icon' />
                            </div>
                            <div className='humidity-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>78%</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Humidity</Text>
                            </div>
                        </div>

                        <div id='vertical-divider'></div>

                        <div className='wind'>
                            <div className='wind-left-items'>
                                <img src={'wind.png'} alt='Wind Icon' style={{ width: '20px' }} id='wind-icon' />
                            </div>
                            <div className='wind-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>12 km/h</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Wind</Text>
                            </div>
                        </div>

                        <div id='vertical-divider'></div>

                        <div className='pressure'>
                            <div className='pressure-left-items'>
                                <img src={'meter.png'} alt='Pressure Icon' style={{ filter: 'invert(63%)', width: '20px' }} id='pressure-icon' />
                            </div>
                            <div className='pressure-right-items'>
                                <Text variant='span' style={{ fontSize: '14px' }}>1 kPa</Text>
                                <Text variant='span' style={{ color: 'rgb(208, 204, 204)', fontSize: '12px' }}>Pressure</Text>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='screen-5'>
                    <div className='screen-5-top-content'>
                        <Text variant='span'>Recently Searched</Text>
                        <div id='right-5-top-content'>
                            <Text variant='span'>See All</Text>
                            <img src={'right.png'} alt='Right Arrow' id='right-arrow' />
                        </div>
                    </div>

                    <div className='screen-5-mid-content'>
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
                </div>
                <div className='screen-6'>
                    <Text variant='span' style={{ textAlign: 'left' }}>Wind Map</Text>
                    <div className='wind-speed'>
                        <Text variant='span' style={{ textAlign: 'left' }}>12 km/h</Text>
                        <Text variant='span' style={{ textAlign: 'left' }}>Northwest</Text>
                    </div>
                    <img src={'pin.png'} style={{ filter: 'invert(1)' }} alt='Location Pin Icon' id='location-pin' />
                </div>
            </div>
        </div>
    )
}
