import { Text } from '../../components/Text'
import darkClouds from '../../assets/dark-clouds.jpg'

export const WeatherInfo = () => {
    return (
        <div className='main-weather-screen'>
            <div className='screen-1'>
                <img src={darkClouds} alt='Dark Clouds Background' id='dark-clouds-bg' />
                <div className='screen-1-elements'>
                    <div className='left-elements'>
                        
                        <Text variant='h1' style={{ color: 'white' }} className={'screen-1-text'}>18&#176;</Text>
                        <Text variant='h2' style={{ color: 'white' }} className={'screen-1-text'}>Stormy</Text>
                        <Text variant='h3' style={{ marginTop: '-15px' }} className={'screen-1-text'}>with partly cloudy</Text>
                        
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

            </div>
            <div className='screen-3'>

            </div>
        </div>
    )
}
