type APICurrentResponse = {
    name: string;
    main: {
        temp: number;
        humidity: number;
    }
    weather: Array<{
        main: string;
        description: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    }
}

type APIResponseForecast = {
    list: Array<ForecastHoursData>;
}

type ForecastHoursData = {
    main: {
        temp: number;
        // その他のプロパティ
    };
    weather: Array<{
        main: string;
        description: string;
        // その他のプロパティ
    }>;
    pop: number;
    dt_txt: string;
}

type CurrentWeatherData = {
    city: string;
    weatherIcon: string;
    weatherText: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
}

type ForecastWeatherData = {
    time: string;
    weatherIcon: string;
    weatherText: string;
    temperature: string;
    rop: string;
}

// type ElemData = <T>(elem: HTMLElement, data: T) => void;

export {APICurrentResponse, APIResponseForecast, ForecastHoursData, CurrentWeatherData, ForecastWeatherData};