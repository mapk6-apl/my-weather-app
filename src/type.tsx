export interface LocationProps {
    latitude: number;
    longitude: number;
    locationName: string;
}

export interface LocationSetters {
    setLat: (latitude: number) => void;
    setLon: (longitude: number) => void;
    setLocationName: (name: string) => void;
}

export interface NavbarProps extends LocationSetters {
    locationName: string;
}

export interface WeatherInfoProps extends LocationProps{}














// export const GET_WEATHER = "GET_WEATHER";
// export const SET_LOADING = "SET_LOADING";
// export const SET_ERROR = "SET_ERROR";
// export const SET_ALERT = "SET_ALERT";

// export interface Weather {
//     description: string,
//     icon:string,
//     id: number,
//     main: string
// }

// export interface WeatherData{
//     base: string,
//     clouds: {
//         all: number;
//     }
// }
