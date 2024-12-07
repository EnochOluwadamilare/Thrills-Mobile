import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'user-selected-theme';

export function useUserTheme() {
  const [userTheme, setUserTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setUserTheme(savedTheme as 'light' | 'dark');
      }
    })();
  }, []);

  const updateTheme = async (newTheme: 'light' | 'dark') => {
    setUserTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  return { userTheme, updateTheme };
}