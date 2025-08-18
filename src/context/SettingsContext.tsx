
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Unit = 'C' | 'F';
type Language = 'en' | 'fr';

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [unit, setUnit] = useState<Unit>('C');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedUnit = localStorage.getItem('unit') as Unit | null;
    const storedLanguage = localStorage.getItem('language') as Language | null;

    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    if (storedUnit) setUnit(storedUnit);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSetUnit = (newUnit: Unit) => {
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, unit, setUnit: handleSetUnit, language, setLanguage: handleSetLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
