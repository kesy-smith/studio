import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DailyForecast as DailyForecastType } from '@/lib/types';
import WeatherIcon from './WeatherIcon';
import { Separator } from '@/components/ui/separator';
import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/lib/translations';
import { formatTemperature } from '@/lib/utils';

interface DailyForecastProps {
  data: DailyForecastType[];
}

const DailyForecast: FC<DailyForecastProps> = ({ data }) => {
  const { unit, language } = useSettings();
  const t = translations[language];

  const getDayOfWeek = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return t.today;
    }
    return date.toLocaleDateString(language, { weekday: 'long' });
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>{t.dailyForecastTitle}</CardTitle>
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
                  <span>{formatTemperature(day.maxTemp, unit)}</span>
                  <span className="text-muted-foreground"> / {formatTemperature(day.minTemp, unit)}</span>
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
