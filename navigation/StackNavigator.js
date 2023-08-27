import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

import PosterProfile from '../screens/PosterProfile';
import UserScreen from '../screens/UserScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CustomizeScreen from '../screens/Customize';
import FlashScreen from '../screens/FlashScreen';
import ChatDetailScreen from'../screens/ChatDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="PosterProfile"
        component={PosterProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomizeScreen"
        component={CustomizeScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigator;
