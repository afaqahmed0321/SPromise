import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Auth from './Navi'; // Your navigation component
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLaunchScreen from './src/screens/AppLaunchScreen'; // Your splash screen
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withIAPContext } from 'react-native-iap';  // Import withIAPContext

function App() {
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [token, setToken] = useState(null);          // Token state

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // Delay for splash screen
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } else {
        setIsLoading(false); // No token, stop loading
      }
    } catch (error) {
      console.error('Failed to load token from AsyncStorage', error);
      setIsLoading(false);  // Stop loading in case of error
    }
  };

  useEffect(() => {
    loadToken(); // Load token on component mount
  }, []);

  if (isLoading) {
    // While loading, show the splash screen
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

// Wrap the App component with withIAPContext HOC
export default withIAPContext(App);
