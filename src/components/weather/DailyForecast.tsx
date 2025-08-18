import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DailyForecast as DailyForecastType } from '@/lib/types';
import WeatherIcon from './WeatherIcon';
import { Separator } from '@/components/ui/separator';

interface DailyForecastProps {
  data: DailyForecastType[];
}

const celsiusToFahrenheit = (celsius: number) => Math.round(celsius * (9 / 5) + 32);

const DailyForecast: FC<DailyForecastProps> = ({ data }) => {
  const getDayOfWeek = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    if (date.getDate() === today.getDate()) return 'Today';
    return date.toLocaleDateString([], { weekday: 'long' });
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((day, index) => (
            <div key={day.date}>
              <div className="flex items-center justify-between gap-4 py-2 px-1 transition-colors duration-200 rounded-md hover:bg-muted/50">
                <p className="font-medium w-24">{getDayOfWeek(day.date)}</p>
                <div className="flex items-center gap-2">
                  <WeatherIcon condition={day.condition} className="h-8 w-8 text-accent" />
                  <span className="hidden sm:inline text-muted-foreground">{day.condition}</span>
                </div>
                <p className="font-medium text-right w-24">
                  <span>{celsiusToFahrenheit(day.maxTemp)}°</span>
                  <span className="text-muted-foreground"> / {celsiusToFahrenheit(day.minTemp)}°</span>
                </p>
              </div>
              {index < data.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyForecast;
