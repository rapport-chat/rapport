import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "app/constants/Colors";

export default function MyTabBarLabel(props) {
  return (
    <Text
      style={[
        styles.tabBarLabel,
        props.focused ? styles.tabBarLabelActive : {}
      ]}
    >
      {props.title}
    </Text>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center"
  },
  tabBarLabelActive: {
    color: Colors.primary
  }
});
