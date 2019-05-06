import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import ChatsScreen from "app/screens/ChatsScreen";
import SettingsScreen from "app/screens/SettingsScreen";
import DirectChatScreen from "app/screens/DirectChatScreen";

const ChatStack = createStackNavigator({
  Home: ChatsScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

const DirectChat = createStackNavigator({
  DirectChat: DirectChatScreen
});

const MyDrawerNavigatorConfig = { 
  drawerBackgroundColor: "#342E37",
  contentOptions: {
    activeTintColor: "#FFE9FF",
    activeBackgroundColor: "#494A59",
    inactiveTintColor: "#fff"
  },
 };

export default createDrawerNavigator(
  {
    Chats: ChatStack,
    Settings: SettingsStack
  },
  MyDrawerNavigatorConfig
);