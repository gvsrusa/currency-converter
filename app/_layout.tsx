import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Currency Converter',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0',
            },
            headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            title: 'Page Not Found',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0',
            },
            headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}

