import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTemperature = (celsius: number, unit: 'C' | 'F') => {
  if (unit === 'F') {
    return `${Math.round(celsius * (9 / 5) + 32)}°F`;
  }
  return `${Math.round(celsius)}°C`;
};
