import React from "react";
import {
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Colors from "app/constants/Colors";
import GroupMemberSelectItem from "app/components/GroupMemberSelectItem";

export default class DirectChatsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "New Group",
    headerRight: (
      <Button
        onPress={() => alert("Created Groups")}
        title="Create"
        color="#fff"
      />
    )
  };

  constructor(props) {
    super(props);
    state = {
      users: []
    };
    this.getDirectChats();
  }

  async getDirectChats() {
    await fetch("http://192.168.8.161:1337/parse/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        for (let userObject of responseJson.results) {
          let user = {
            username: userObject.username,
            objectId: userObject.objectId,
            firstName: userObject.firstName,
            lastName: userObject.lastName
          };
          this.setState({ users: [...this.state.users, user] });
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            placeholder="Group Name"
            placeholderColor="#c4c3cb"
            placeholderStyle={styles.textInputPlaceholder}
            onChangeText={groupName => this.setState({ groupName })}
            style={styles.textInput}
          />
          <FlatList
            data={this.state.users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <GroupMemberSelectItem
                name={item.firstName + " " + item.lastName}
                id={item.objectId}
                icon="checkbox-blank-circle-outline"
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }

  toggleSelect(id) {
    console.log(this.refs.icon + id);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    height: 50,
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa"
  }
});
