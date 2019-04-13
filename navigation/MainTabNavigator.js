import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "app/components/TabBarIcon";
import ChatsScreen from "app/screens/ChatsScreen";
import SettingsScreen from "app/screens/SettingsScreen";
import CustomTabBarLabel from "./CustomTabBarLabel";
import DirectChatScreen from "app/screens/DirectChatScreen";
 
const ChatStack = createStackNavigator({
  Home: ChatsScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: "Chats",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatboxes"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: DirectChatScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({focused}) => <CustomTabBarLabel title="Settings" focused={focused} />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
      style={{ color: "red" }}
    />
  )
};

export default createBottomTabNavigator({
  ChatStack,
  SettingsStack
});
