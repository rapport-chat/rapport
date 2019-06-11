import React from "react";
import {
  SectionList,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from "react-native";
import ChatListItem from "app/components/ChatListItem";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Colors from "app/constants/Colors";

export default class DirectChatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: "#fff",
      title: "Chats",
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate("NewGroup")}
          name="ios-add-circle"
          size={30}
          color="#4F8EF7"
          style={{ color: "#fff", marginRight: 15 }}
        />
      ),
      headerLeft: (
        <Ionicons
          onPress={() => alert("This is a button!")}
          name="ios-person"
          size={30}
          color="#4F8EF7"
          style={{ color: "#fff", marginLeft: 15 }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.users = [];
    this.groups = [];
    this.state = {
      users: [],
      groups: [],
    };
    this.props.navigation.addListener("willFocus", payload => {
      this.users = [];
      this.groups = [];
      this.getData();
    });
  }

  getData() {
    this.state = {
      users: [],
      groups: [],
    };
    this.getServerUrl();
  }

  getServerUrl = async () => {
    let url = await AsyncStorage.getItem("serverUrl");
    this.setState({
      serverUrl: url
    });
    this.getDirectChats();
    this.getGroupChats();
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
            objectId: userObject.objectId,
            displayName: userObject.firstName + " " + userObject.lastName
          };
          this.users = [...this.users, user];
          this.setState({ users: [...this.state.users, user] });
        }
      });
  }

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
          let group = {
            objectId: groupObject.objectId,
            displayName: groupObject.name
          };
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
                title: "Group Chats",
                data: this.groups
              },
              {
                title: "Direct Chats",
                data: this.users
              }
            ]}
            renderItem={({ item }) => (
              <ChatListItem
                objectId={item.objectId}
                onClickFunction={this.openObject.bind(this)}
                item={item.displayName}
                subItem="+382 9232322: Hey, how are you? 👋"
              />
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>
    );
    
  }

  openObject() {
    this.props.navigation.navigate("DirectChat");
  }
}

const itemHeight = 40;

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
