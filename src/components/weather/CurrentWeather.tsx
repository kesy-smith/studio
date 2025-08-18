import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Gauge, Sunrise, Sunset, Wind } from 'lucide-react';
import type { CurrentWeather as CurrentWeatherType } from '@/lib/types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const celsiusToFahrenheit = (celsius: number) => Math.round(celsius * (9 / 5) + 32);

const CurrentWeather: FC<CurrentWeatherProps> = ({ data }) => {
  const now = new Date().getTime() / 1000;
  const isNight = now < data.sunrise || now > data.sunset;

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">{data.locationName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <WeatherIcon condition={data.condition} className="h-20 w-20 text-accent" isNight={isNight} />
            <div>
              <p className="text-6xl font-bold">{celsiusToFahrenheit(data.temperature)}°F</p>
              <p className="text-lg text-muted-foreground">{data.condition}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              <span>Humidity: {data.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              <span>Wind: {data.windSpeed} kph</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-primary" />
              <span>Sunrise: {formatTime(data.sunrise)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-primary" />
              <span>Sunset: {formatTime(data.sunset)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
