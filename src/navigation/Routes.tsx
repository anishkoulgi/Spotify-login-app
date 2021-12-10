import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen, HomeScreen } from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='GetStartedScreen'
        screenOptions={{ header: () => null }}
      >
        <Stack.Screen component={HomeScreen} name='GetStartedScreen' />
        <Stack.Screen component={DashboardScreen} name='DashboardScreen' />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
