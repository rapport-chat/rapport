import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ChatsScreen from "../screens/ChatsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomTabBarLabel from "./CustomTabBarLabel";
import Colors from 'app/constants/Colors';
 
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
  Settings: SettingsScreen
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
