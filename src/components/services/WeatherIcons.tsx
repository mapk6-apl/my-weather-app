export type ConditionFamily = 'clear' | 'clouds' | 'rain' | 'thunderstorm' | 'snow' | 'fog';

import sunIcon from '../../assets/sun.png'
import nightIcon from '../../assets/night.png'
import partlyCloudyIcon from '../../assets/partly-cloudy.png'
import cloudyIcon from '../../assets/cloudy.png'
import rainyIcon from '../../assets/rainy.png'
import snowIcon from '../../assets/snowflake.png'
import thunderstormIcon from '../../assets/thunderstorm.png'

export const familyFromOwmMain = (main: string): ConditionFamily => {
    if (main === 'Clear') return 'clear';
    if (main === 'Cloud') return 'clouds';
    if (main === 'Rain' || main === 'Drizzle') return 'rain';
    if (main === 'Thunderstorm') return 'thunderstorm';
    if (main === 'Snow') return 'snow';
    if (main === 'Mist' || main === 'Fog' || main === 'Haze') return 'fog';
    return 'clouds';
};

export const familyFromOpenMeteoCode = (code: number): ConditionFamily => {
    if (code === 0 || code === 1) return 'clear';
    if (code === 2 || code === 3) return 'clouds';
    if (code >= 45 && code <= 48) return 'fog';
    if (code >= 51 && code <= 67) return 'rain';
    if (code >= 71 && code <= 86) return 'snow';
    if (code >= 95) return 'thunderstorm';
    return 'clouds';
};

export const iconForFamily = (family: ConditionFamily, isDay: boolean): string => {
    if (family === 'clear') return isDay ? sunIcon : nightIcon;
    if (family === 'clouds') return partlyCloudyIcon;
    if (family === 'fog') return cloudyIcon;
    if (family === 'rain') return rainyIcon;
    if (family === 'snow') return snowIcon;
    if (family === 'thunderstorm') return thunderstormIcon;
    return cloudyIcon;
};
export const backgroundForFamily = (family: ConditionFamily, isDay: boolean): string => {
    if (family === 'clear') {
        return isDay
            ? 'linear-gradient(135deg, #4a90d9, #87ceeb)'
            : 'linear-gradient(135deg, #0f2247, #1b3a6b)';
    }
    if (family === 'rain') return 'linear-gradient(135deg, #3a6073, #16222a)';
    if (family === 'thunderstorm') return 'linear-gradient(135deg, #232526, #0f2027)';
    if (family === 'snow') return 'linear-gradient(135deg, #757f9a, #d7dde8)';
    if (family === 'fog') return 'linear-gradient(135deg, #757f9a, #4b6584)';
    return 'linear-gradient(135deg, #536976, #292e49)';
};