import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { COLORS } from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('auto'); // 'light', 'dark', 'auto'
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@theme_mode').then((value) => {
      if (value) setThemeMode(value);
      setLoaded(true);
    });
  }, []);

  const effectiveMode =
    themeMode === 'auto' ? systemScheme || 'light' : themeMode;
  const colors = COLORS[effectiveMode];
  const isDark = effectiveMode === 'dark';

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('@theme_mode', mode);
  };

  const toggleTheme = async () => {
    const newMode = isDark ? 'light' : 'dark';
    await changeTheme(newMode);
  };

  if (!loaded) return null;

  return (
    <ThemeContext.Provider
      value={{ colors, isDark, themeMode, changeTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
