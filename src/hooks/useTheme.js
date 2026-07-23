import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
  // Detect system preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useLocalStorage('app-theme', getSystemTheme());

  // Apply theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle system preference changes if theme is not explicitly overridden?
  // Let's keep it simple: toggle theme toggles between light and dark explicitly.
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
