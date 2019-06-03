import React from "react";
import {
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Colors from "app/constants/Colors";
import GroupMemberSelectItem from "app/components/GroupMemberSelectItem";

export default class NewGroupScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: "#fff",
      title: "New Group",
      headerRight: (
        <Button
          onPress={() => params.createGroup()}
          title="Create"
          color="#fff"
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ createGroup: this.createGroup });
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUserIds: []
    };
    this.getServerUrl();
  }

  getServerUrl = async () => {
    let url = await AsyncStorage.getItem("serverUrl");
    this.setState({
      serverUrl: url
    });
    this.getDirectChats();
  };

  async getDirectChats() {
    await fetch(this.state.serverUrl + "/parse/users/", {
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
                toggleSelect={this.toggleSelect.bind(this)}
                name={item.firstName + " " + item.lastName}
                objectId={item.objectId}
                icon="checkbox-blank-circle-outline"
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }

  toggleSelect(id) {
    let array = [...this.state.selectedUserIds]; // make a separate copy of the array
    let index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedUserIds: array });
    } else {
      this.setState({ selectedUserIds: [...this.state.selectedUserIds, id] });
    }
  }

  createGroup = () => {
    if (this.state.groupName === "" || this.state.groupName === undefined) {
      alert("Please enter a Group Name!");
      return;
    }
    this.state.selectedUserIds.forEach(selectedUserId => {});
    fetch(this.state.serverUrl + "/parse/classes/Group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      },
      body: JSON.stringify({
        name: this.state.groupName
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.state.selectedUserIds.forEach(selectedUserId => {
          this.storeGroupMemberRelation(responseJson.objectId, selectedUserId);
        });
      });
    this.props.navigation.navigate("Home");
  };

  storeGroupMemberRelation(groupId, userId) {
    fetch(this.state.serverUrl + "/parse/classes/GroupMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      },
      body: JSON.stringify({
        groupId: groupId,
        userId: userId
      })
    });
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
