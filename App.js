import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUp';
import DashBoardScreen from './screens/DashBoardScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import CreateNewPass from './screens/CreateNewPass';
import FlashScreen from'./screens/FlashScreen';
import firebase from 'firebase';
import db from "./config";
import { LogBox } from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. "]);
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  FlashScreen: FlashScreen,
  LoginScreen: LoginScreen,
  SignUpScreen: SignUpScreen,
  CreateNewPass: CreateNewPass,
  ForgotPasswordScreen: ForgotPasswordScreen,
  DashBoardScreen: DashBoardScreen,  
}); 

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
 