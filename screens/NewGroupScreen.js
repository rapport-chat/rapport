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
          //Call create group function of NewGroupScreen
          onPress={() => params.createGroup()}
          title="Create"
          color="#fff"
        />
      )
    };
  };

  componentDidMount() {
    //Pass createGroup function to the navigation
    this.props.navigation.setParams({ createGroup: this.createGroup });
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [], //Create empty users array
      selectedUserIds: [] //Create empty selectUserIs array
    };
    this.getServerUrl(); //Call function to get serverUrl
  }

  getServerUrl = async () => {
    let url = await AsyncStorage.getItem("serverUrl");
    this.setState({
      serverUrl: url //save url in state
    });
    this.getDirectChats(); //Call function to get direct chats
  };

  //Retrieve direct chats
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
          //Create user object
          let user = {
            username: userObject.username,
            objectId: userObject.objectId,
            firstName: userObject.firstName,
            lastName: userObject.lastName
          };
          //Save user object in state
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
            //Render the individual items for the list
            renderItem={({ item }) => (
              //Use the GroupMemberSelectItem component to display users
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

  //Add or remove a user from the selected Users array
  toggleSelect(id) {
    let array = [...this.state.selectedUserIds]; // make a separate copy of the array
    let index = array.indexOf(id); //Check if user id is already in array
    if (index !== -1) {
      //If id is already in array
      array.splice(index, 1); //remove id from array
      this.setState({ selectedUserIds: array }); //Save new array
    } else {
      //If id isn't in array
      this.setState({ selectedUserIds: [...this.state.selectedUserIds, id] }); //add id to array
    }
  }

  createGroup = () => {
    //group name can't be empty
    if (this.state.groupName === "" || this.state.groupName === undefined) {
      alert("Please enter a Group Name!");
      return;
    }
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
        //Loop over all selected users
        this.state.selectedUserIds.forEach(selectedUserId => {
          //call function to store member relation
          this.storeGroupMemberRelation(responseJson.objectId, selectedUserId);
        });
      });

    //Redirect back to ChatsScreen
    this.props.navigation.navigate("Home");
  };

  //Send request to store relation between group and members
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
