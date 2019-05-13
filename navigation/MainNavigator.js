import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import ChatsScreen from "app/screens/ChatsScreen";
import DirectChatScreen from "app/screens/DirectChatScreen";
import SettingsScreen from "app/screens/SettingsScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import AuthLoadingScreen from "../screens/Authentication/AuthLoadingScreen";

const AppStack = createStackNavigator({
  Home: ChatsScreen,
  DirectChat: DirectChatScreen,
  Settings: SettingsScreen
});
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
