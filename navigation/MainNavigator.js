import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

import ChatsScreen from "app/screens/ChatsScreen";
import SettingsScreen from "app/screens/SettingsScreen";
import DirectChatScreen from "app/screens/DirectChatScreen";
import AuthScreen from "app/screens/AuthScreen.js";

// const ChatStack = createStackNavigator({
//   Home: ChatsScreen
// });

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// const DirectChat = createStackNavigator({
//   DirectChat: DirectChatScreen
// });

// const AuthStack = createStackNavigator({
//   Auth: AuthScreen
// });

const MyDrawerNavigatorConfig = { 
  drawerBackgroundColor: "#342E37",
  contentOptions: {
    activeTintColor: "#FFE9FF",
    activeBackgroundColor: "#494A59",
    inactiveTintColor: "#fff"
  },
 };

// export default createDrawerNavigator(
//   {
//     Auth: AuthStack,
//     Chats: ChatStack,
//     Settings: SettingsStackx
//   },
//   MyDrawerNavigatorConfig
// );

const AppStack = createStackNavigator({ Home: ChatsScreen, Settings: SettingsScreen });
const AuthStack = createStackNavigator({ SignIn: AuthScreen });

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);