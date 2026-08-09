const API_KEY = "88de1ac9434d7b7cb3bf0dc272400990"

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct"
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather"
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

export const searchCities = async(query: string) => {
  try {
    const URL = `${GEO_URL}?q=${query}&limit=10&appid=${API_KEY}`
    const response = await fetch (URL)

    if (response.ok) {
        const data = await response.json();

        return data.map((item: any) => ({
            fullName: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
            latitude: item.lat,
            longitude: item.lon
        }));
    }
    return [];
  } catch (error) {
    console.warn('City search failed:', error);
    return [];
  }
};

export const getCurrentWeather = async (latitude: number, longitude: number) => {
    try {
        const URL = `${CURRENT_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        const response = await fetch(URL);

        if (response.ok) {
            const weather = await response.json();

            const windSpeed = Math.round(weather.wind.speed * 3.6); //convert m/s to km/h
            const condition = weather.weather[0].main;
            const isDangerous = windSpeed > 40 || condition === 'Thunderstorm';

            let direction = 'North'; //let allows the value to be changed later on; reassigning.
            const degree = weather.wind.deg;
            if (degree > 45 && degree <= 135) direction = 'East';
            else if (degree > 135 && degree <= 225) direction = 'South';
            else if (degree > 225 && degree <= 315) direction = 'West';

            return {
                temp: Math.round(weather.main.temp),
                condition,
                description: `with ${weather.weather[0].description}`,
                icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                humidity: `${weather.main.humidity}%`,
                wind: `${windSpeed} km/h`,
                pressure: `${(weather.main.pressure / 10).toFixed(0)} kPa`,
                precipitationChance: 0,
                direction,
                isDangerous
            };

        }
        return null;
    } catch (error) {
        console.warn('Failed fetching current weather:', error);
        return null;
    }
};

export const getForecast = async (latitude: number, longitude: number) => {
    try {
        const URL = `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        const response = await fetch(URL);

        if (response.ok) {
            const data = await response.json();
            const list = data.list;

            const hourly = list.slice(0, 8).map((item: any, index: number) => ({
                time: index === 0 ? 'Now' : new Date(item.dt * 1000).toLocaleTimeString([], 
                    {hour: 'numeric', hour12: true}),
                    temp: Math.round(item.main.temp),
                    condition: item.weather[0].main,
                    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    rainChance: Math.round((item.pop ?? 0) * 100)
            }));

            const middayEntries = list.filter((item: any) => item.dt_txt.includes('12:00:00'));

            const daily = middayEntries.map((item: any) => ({
                day: new Date(item.dt * 1000).toLocaleDateString([], {weekday: 'short'}),
                high: Math.round(item.main.temp_max),
                low: Math.round(item.main.temp_min),
                condition: item.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                rainChance: Math.round((item.pop ?? 0) * 100)
            }));

            return {hourly, daily};
        }
        return {hourly: [], daily: []};
    } catch (error) {
        console.warn('Failed fetching forecast:', error);
        return {hourly: [], daily: []};
    }
};
