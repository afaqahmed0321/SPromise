import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Auth from './Navi';
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLaunchScreen from './src/screens/AppLaunchScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // Delay for 4 seconds if token is present
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } else {
        // If no token is present, immediately navigate to Auth component
        setIsLoading(false);
      }
    } catch (e) {
      console.error('Failed to load token from AsyncStorage', e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  if (isLoading) {
    // Render loading indicator or splash screen
    return (
      <RecoilRoot>
        <AppLaunchScreen />
      </RecoilRoot>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
          <Auth />
      </RecoilRoot>
    </GestureHandlerRootView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});