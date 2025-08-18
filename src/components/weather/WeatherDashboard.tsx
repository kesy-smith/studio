
"use client";

import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { WeatherData } from '@/lib/types';
import { CitySearch } from './CitySearch';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { AlertCircle, Download, MapPin, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/lib/translations';
import SettingsPanel from './SettingsPanel';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const mockWeatherData = (locationName: string): WeatherData => {
  const now = new Date();
  return {
    current: {
      locationName: locationName,
      temperature: 18 + Math.random() * 5,
      condition: "Clouds",
      humidity: 60 + Math.random() * 10,
      windSpeed: 5 + Math.random() * 10,
      pressure: 1012,
      sunrise: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0).getTime() / 1000,
      sunset: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0).getTime() / 1000,
    },
    hourly: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(now.getTime() + i * 3600 * 1000).getTime() / 1000,
      temperature: 15 + Math.random() * 7 + Math.sin(i / 6) * 3,
      condition: i > 5 && i < 18 ? "Clear" : "Clouds",
    })),
    daily: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i).getTime() / 1000,
      minTemp: 10 + Math.random() * 3,
      maxTemp: 20 + Math.random() * 5,
      condition: i % 2 === 0 ? "Rain" : "Clouds",
    })),
  };
};

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useSettings();
  const t = translations[language];


  useEffect(() => {
    handleSearch('Bukavu');
  }, []);

  const handleSearch = (city: string) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      if (city.toLowerCase() === 'error') {
        setError(t.cityNotFound);
        setWeatherData(null);
      } else {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        setWeatherData(mockWeatherData(capitalizedCity));
      }
      setIsLoading(false);
    }, 1000);
  };

  const renderSkeletons = () => (
    <div className="space-y-8">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="mb-4 flex justify-between items-center">
        <div>
            <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">MétéoBK</h1>
            <p className="text-muted-foreground">{t.appSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Download className="h-6 w-6" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.downloadTitle}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.downloadDescription}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>{t.downloadAction}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SettingsPanel />
                </SheetContent>
            </Sheet>
        </div>
      </header>

      <div className="space-y-8">
        <CitySearch onSearch={handleSearch} isLoading={isLoading} />
        {isLoading && !weatherData && renderSkeletons()}

        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t.errorTitle}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !weatherData && !error && (
          <div className="text-center py-10">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                      <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.welcomeTitle}</h3>
                  <p className="text-muted-foreground">
                      {t.welcomeMessage}
                  </p>
              </CardContent>
            </Card>
          </div>
        )}

        {weatherData && (
          <div className="animate-in fade-in-50 space-y-8">
            <CurrentWeather data={weatherData.current} />
            <HourlyForecast data={weatherData.hourly} />
            <DailyForecast data={weatherData.daily} />
          </div>
        )}
      </div>
    </div>
  );
}
