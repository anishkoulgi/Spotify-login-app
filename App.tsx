import AppLoading from 'expo-app-loading';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { Routes } from './src/navigation';

export default function App() {
  const [isLoaded] = useFonts({
    'Circular-std': require('./assets/CircularStd-Book.otf'),
    'Circular-std-bold': require('./assets/CircularStd-Bold.otf'),
    'Circular-std-light': require('./assets/CircularStd-Light.otf'),
    'Circular-std-medium': require('./assets/CircularStd-Medium.otf'),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <Routes />
      <StatusBar backgroundColor='white' barStyle='dark-content' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'Circular-std',
  },
});
