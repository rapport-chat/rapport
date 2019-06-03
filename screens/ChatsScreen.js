import React from "react";
import {
  SectionList,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  render() {
    var directChats = [
      "Developer",
      "Manager",
      "User",
      "User",
      "User",
      "User",
      "User",
      "User",
      "User",
      "User",
      "User",
      "User"
    ];
    var groupChats = ["Development", "Accounting", "DevOps"];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <SectionList
            sections={[
              {
                title: "Group Chats",
                data: groupChats
              },
              {
                title: "Direct Chats",
                data: directChats
              }
            ]}
            renderItem={({ item }) => (
              <ChatListItem
                onClickFunction={this.openObject.bind(this)}
                item={item}
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

  openObject(){
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
