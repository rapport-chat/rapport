import React from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from "react-native"; 
import ChatListItem from "app/components/ChatListItem"; //Import ChatListItem Component
import { SafeAreaView } from "react-navigation"; //Import SafeAreaView from ReactNavigation package
import { Ionicons } from "@expo/vector-icons"; //Import Ionicons from vector-icons package
import Colors from "app/constants/Colors"; //Import color constants

export default class DirectChatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: Colors.primary //Set background color for header to our primary color
      },
      headerTintColor: "#fff", //Change font color for the header
      title: "Chats", //Title of the Screen
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate("NewGroup")} //When pressed navigate to the new group screen
          name="ios-add-circle"
          size={30}
          color="#4F8EF7"
          style={{ color: "#fff", marginRight: 15 }}
        />
      ),
      headerLeft: (
        <Ionicons
          onPress={() => navigation.navigate("Settings")} //When pressed navigate to the settings screen
          name="ios-settings"
          size={30}
          color="#4F8EF7"
          style={{ color: "#fff", marginLeft: 15 }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.users = []; //Create empty users array
    this.groups = []; //Create empty groups array
    this.state = {
      users: [],
      groups: []
    };
    //Retrieve users and groups whenever the ChatScreen is opened
    //For example after creating a group, the list should be reloaded
    this.props.navigation.addListener("willFocus", payload => { 
      this.users = [];
      this.groups = [];
      this.getData();
    });
  }

  //Retrieve all data for this screen
  getData(){
    //Make sure our state is empty
    this.state = {
      users: [],
      groups: []
    };
    this.getServerUrl();
  }

  //Retrieve server url from local storage
  getServerUrl = async () => {
    let url = await AsyncStorage.getItem("serverUrl");
    //Save url in the state
    this.setState({
      serverUrl: url
    });
    this.getDirectChats();
    this.getGroupChats();
  };

  //Get all users to list them
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
          //Create user object with all the important data
          let user = {
            objectId: userObject.objectId,
            displayName: userObject.firstName + " " + userObject.lastName
          };
          //Store the created user object
          this.users = [...this.users, user]; 
          this.setState({ users: [...this.state.users, user] });
        }
      });
  }

  //Get all groups to list them 
  async getGroupChats() {
    await fetch(this.state.serverUrl + "/parse/classes/Group/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        for (let groupObject of responseJson.results) {
          //Create group object with all the important data
          let group = {
            objectId: groupObject.objectId,
            displayName: groupObject.name
          };
          //Store the created group object
          this.groups = [...this.groups, group];
          this.setState({ groups: [...this.state.groups, group] });
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <SectionList
            sections={[
              {
                title: "Group Chats", //Title of the section
                data: this.groups //Data for the list
              },
              {
                title: "Direct Chats", //Title of the section
                data: this.users //Data for the list
              }
            ]}
            //Render the individual items for the list
            renderItem={({ item }) => (
              //Use the ChatListItem component to display users and groups
              <ChatListItem
                objectId={item.objectId}
                onClickFunction={this.openObject.bind(this)} //Pass the openObject function to the component
                item={item.displayName}
                subItem="+382 9232322: Hey, how are you? 👋"
              />
            )}
            //Render the list headers
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>
    );
  }

  //Opens either the chat or group that is clicked
  openObject() {
    this.props.navigation.navigate("DirectChat");
  }
}

//StyleSheet for this Screen
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,  
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#dedede"
  }
});
