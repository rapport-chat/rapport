import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class SeparatorLine extends Component {
  //Returns a simple line to seperate content
  render() {
    return <View style={styles.SeparatorLine} />;
  }
}

const styles = StyleSheet.create({
  SeparatorLine: {
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "#bbb"
  }
});
