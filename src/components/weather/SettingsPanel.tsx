
'use client';

import { useSettings } from '@/context/SettingsContext';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { translations } from '@/lib/translations';
import { Separator } from '../ui/separator';
import { SheetHeader, SheetTitle } from '../ui/sheet';

export default function SettingsPanel() {
  const { language, setLanguage, unit, setUnit, theme, toggleTheme } = useSettings();
  const t = translations[language];


  return (
    <div className="p-4 space-y-6">
        <SheetHeader>
            <SheetTitle>{t.settingsTitle}</SheetTitle>
        </SheetHeader>
        <Separator />
      <div className="space-y-2">
        <Label>{t.language}</Label>
        <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'fr')}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t.temperatureUnit}</Label>
        <RadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as 'C' | 'F')}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="celsius" />
            <Label htmlFor="celsius">Celsius (°C)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="F" id="fahrenheit" />
            <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between">
        <Label>{t.darkMode}</Label>
        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      </div>
    </div>
  );
}
