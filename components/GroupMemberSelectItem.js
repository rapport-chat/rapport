import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "app/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"; //Import MaterialCommunityIcons

export default class GroupMemberSelectItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      icon: props.icon,
      iconColor: Colors.subtleIcon
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.toggleIcon(); //Change icon of this item
          this.props.toggleSelect(this.props.objectId); //call function that is passed
        }}
        style={styles.itemContainer}
      >
        <Text style={styles.item}>{this.props.name}</Text>
        <MaterialCommunityIcons
          style={styles.selectorIcon}
          size={30}
          name={this.state.icon}
          color={this.state.iconColor}
        />
      </TouchableOpacity>
    );
  }

  //Checks which icon is currently being displayed and changes it
  toggleIcon(){
    if(this.state.icon === 'checkbox-marked-circle-outline'){
      this.setState({icon: 'checkbox-blank-circle-outline', iconColor: Colors.subtleIcon});
    }
    else{
      this.setState({icon: 'checkbox-marked-circle-outline', iconColor: Colors.primary});
    }
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: Colors.subtleIcon,
    borderBottomWidth: 0.5,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5
  },
  item: {
    padding: 15,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  selectorIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center"
  }
});
