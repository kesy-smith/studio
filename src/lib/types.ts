export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface CurrentWeather {
  locationName: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
}

export interface HourlyForecast {
  time: number;
  temperature: number;
  condition: string;
}

export interface DailyForecast {
  date: number;
  minTemp: number;
  maxTemp: number;
  condition: string;
}
