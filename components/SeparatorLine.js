import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class SeparatorLine extends Component {
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
