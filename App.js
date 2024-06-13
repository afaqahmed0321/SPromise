import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './Navi';
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLaunchScreen from './src/screens/AppLaunchScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 4 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  if (isLoading) {
    // Render loading indicator or splash screen
    return (
      <AppLaunchScreen/>
   
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
          <Auth />
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
backgroundColor:"#fff"
  },
});
