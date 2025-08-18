import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { HourlyForecast as HourlyForecastType } from '@/lib/types';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  data: HourlyForecastType[];
}

const celsiusToFahrenheit = (celsius: number) => Math.round(celsius * (9 / 5) + 32);

const HourlyForecast: FC<HourlyForecastProps> = ({ data }) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {data.map((hour) => {
                const hourTime = new Date(hour.time * 1000);
                const isNight = hourTime.getHours() > 19 || hourTime.getHours() < 6;
                return (
                    <div
                        key={hour.time}
                        className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background/50 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        style={{ minWidth: '100px' }}
                    >
                        <p className="text-sm font-medium">
                        {hourTime.toLocaleTimeString([], { hour: '2-digit', hour12: false })}
                        </p>
                        <WeatherIcon condition={hour.condition} className="h-8 w-8 text-accent" isNight={isNight} />
                        <p className="text-lg font-bold">{celsiusToFahrenheit(hour.temperature)}°F</p>
                    </div>
                );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
