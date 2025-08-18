import WeatherDashboard from '@/components/weather/WeatherDashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">MétéoBK</h1>
          <p className="text-muted-foreground">Your Ultimate Weather Companion</p>
        </header>
        <WeatherDashboard />
      </div>
    </main>
  );
}
