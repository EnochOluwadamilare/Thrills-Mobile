// PreCode
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

//Mine
import { Slot, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// PreCode
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserTheme } from '@/hooks/useUserTheme';

// PreCode
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// PreCode
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const systemTheme = useColorScheme();
  const { userTheme } = useUserTheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  //My
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  // PreCode
  // Use user-selected theme if available; otherwise, fall back to system theme
  const theme = userTheme ?? systemTheme;
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  // PreCode
  useEffect(() => {
    async function prepareApp() {
      // Simulate a longer splash screen display time (e.g., 3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }
    // PreCode
    prepareApp();

    // My
    async function checkUser() {
      // Check if the app is opened for the first time
      const firstLaunch = await AsyncStorage.getItem('firstLaunch');
      if (!firstLaunch) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('firstLaunch', 'true');
      }
      // Check if the user is signed in
      const userToken = await AsyncStorage.getItem('userToken');
      setIsSignedIn(!!userToken);

      setIsLoading(false);
    }
  
    checkUser();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    if (!isLoading) {
      if (isFirstLaunch) {
        router.replace('/auth/signup-method');
      } else if (isSignedIn) {
        router.replace('/'); // Home page
      } else {
        router.replace('/auth/signin');
      }
    }
  }, [isLoading, isFirstLaunch, isSignedIn]);

  // My
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // PreCode
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
