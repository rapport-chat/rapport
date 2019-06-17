import React from "react";
import { View, FlatList, Text, StyleSheet, Linking } from "react-native";
import Colors from "app/constants/Colors"; //Impor our color constants

export default class NerdSettingsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "Licenses"
  };

  constructor(props) {
    super(props);
  }

  _renderItem = ({ item }) => (
    <View style={styles.ItemContainer}>
      <Text style={styles.Name}>{item.name + " - " + item.licenses}</Text>
      <Text style={styles.Link} onPress={() => Linking.openURL(item.licenseUrl)}>{item.licenseUrl}</Text>
    </View>
  );

  _handleLinkPress = link => {
  };

  render() {
    return (
      <View>
        <FlatList
          // style={styles.list}
          keyExtractor={({ key }) => key}
          data={licenses}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Link: {
    color: '#0000EE'
  },
  ItemContainer: {
    padding: 10
  }
});

const licenses = [
  {
    name: "@expo/samples@2.1.1",
    licenses: "MIT",
    parents: "app"
  },
  {
    name: "expo@32.0.6",
    licenses: "MIT",
    repository: "https://github.com/expo/expo",
    licenseUrl: "https://github.com/expo/expo",
    parents: "app"
  },
  {
    name: "react-native-elements@1.1.0",
    licenses: "MIT",
    repository:
      "https://github.com/react-native-training/react-native-elements",
    licenseUrl:
      "https://github.com/react-native-training/react-native-elements/raw/master/LICENSE",
    parents: "app"
  },
  {
    name: "react-native-gifted-chat@0.7.3",
    licenses: "MIT",
    repository: "https://github.com/FaridSafi/react-native-gifted-chat",
    licenseUrl:
      "https://github.com/FaridSafi/react-native-gifted-chat/raw/master/LICENSE",
    parents: "app"
  },
  {
    name: "react-native-vector-icons@4.6.0",
    licenses: "MIT",
    repository: "https://github.com/oblador/react-native-vector-icons",
    licenseUrl:
      "https://github.com/oblador/react-native-vector-icons/raw/master/LICENSE",
    parents: "app"
  },
  {
    name: "react-navigation@3.6.1",
    licenses: "BSD-2-Clause",
    repository: "https://github.com/react-navigation/react-navigation",
    licenseUrl:
      "https://github.com/react-navigation/react-navigation/raw/master/LICENSE",
    parents: "app"
  },
  {
    name: "react@16.5.0",
    licenses: "MIT",
    repository: "https://github.com/facebook/react",
    licenseUrl: "https://github.com/facebook/react/raw/master/LICENSE",
    parents: "app"
  }
];
