import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default class ChatListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        //Calls function that is passed to this component
        onPress={() => this.props.onClickFunction(this.props.objectId)}
        style={styles.itemContainer}
      >
        <Text style={styles.item}>{this.props.item}</Text>
        <Text style={styles.subItem}>{this.props.subItem}</Text>
        <Ionicons
          style={styles.arrow}
          size={30}
          name="ios-arrow-forward"
          color={Colors.subtleIcon}
        />
      </TouchableOpacity>
    );
  }
}

const itemHeight = 40;
const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: Colors.subtleIcon,
    borderBottomWidth: 0.5
  },
  item: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 30,
    fontWeight: "bold",
    height: itemHeight
  },
  subItem: {
    fontSize: 14,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.subFont
  },
  arrow: {
    position: "absolute",
    right: 10,
    top: itemHeight / 2 - 2,
    justifyContent: "center"
  }
});
