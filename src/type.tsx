export const GET_WEATHER = "GET_WEATHER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_ALERT = "SET_ALERT";

export interface Weather {
    description: string,
    icon:string,
    id: number,
    main: string
}

export interface WeatherData{
    base: string,
    clouds: {
        all: number;
    }
}
