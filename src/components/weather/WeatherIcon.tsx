import type { FC } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, CloudSun, CloudMoon, Moon } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
  isNight?: boolean;
}

const WeatherIcon: FC<WeatherIconProps> = ({ condition, className = "h-8 w-8", isNight = false }) => {
  const normalizedCondition = condition.toLowerCase();

  switch (true) {
    case normalizedCondition.includes('clear'):
      return isNight ? <Moon className={className} /> : <Sun className={className} />;
    case normalizedCondition.includes('clouds'):
      return isNight ? <CloudMoon className={className} /> : <CloudSun className={className} />;
    case normalizedCondition.includes('rain'):
      return <CloudRain className={className} />;
    case normalizedCondition.includes('drizzle'):
      return <CloudRain className={className} />;
    case normalizedCondition.includes('thunderstorm'):
      return <CloudLightning className={className} />;
    case normalizedCondition.includes('snow'):
      return <CloudSnow className={className} />;
    case normalizedCondition.includes('mist'):
    case normalizedCondition.includes('fog'):
    case normalizedCondition.includes('haze'):
      return <Cloud className={className} />;
    case normalizedCondition.includes('wind'):
      return <Wind className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

export default WeatherIcon;
