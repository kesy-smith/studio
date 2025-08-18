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
import { AlertCircle, MapPin } from 'lucide-react';

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSearch("Current Location"); // In a real app, you'd use coords to get location name
        },
        (err) => {
          setError("Geolocation access denied. Please search for a city manually.");
          setIsLoading(false);
          toast({
            title: "Location Access Denied",
            description: "You can still search for a city to get weather information.",
            variant: "destructive",
          });
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city.");
      setIsLoading(false);
    }
  }, [toast]);

  const handleSearch = (city: string) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      if (city.toLowerCase() === 'error') {
        setError('Could not find weather data for the specified city.');
        setWeatherData(null);
      } else {
        setWeatherData(mockWeatherData(city));
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
    <div className="w-full space-y-8">
      <CitySearch onSearch={handleSearch} isLoading={isLoading} />
      {isLoading && !weatherData && renderSkeletons()}

      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
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
                <h3 className="text-xl font-semibold mb-2">Welcome to MétéoBK</h3>
                <p className="text-muted-foreground">
                    Enable location services or search for a city to get started.
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
  );
}
