"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface CitySearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function CitySearch({ onSearch, isLoading }: CitySearchProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Card className="mb-8 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="flex-grow text-base"
            disabled={isLoading}
            aria-label="Search for a city"
          />
          <Button type="submit" disabled={isLoading || !city.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
