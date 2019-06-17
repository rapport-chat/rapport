import React from "react";
import { View, Dimensions, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Colors from "app/constants/Colors";

export default class DirectChat extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "Direct Chat"
  };

  componentDidMount() {
    this.timer = setInterval(() => this.updateMessages(), 3000);
  }

  async updateMessages() {
    this.state.messages = [];
    this.getMessages();
  }

  constructor(props) {
    super(props);
    let secondUserId = this.props.navigation.state.params.secondUserId;
    let serverUrl = this.props.navigation.state.params.serverUrl;

    if (secondUserId === "s9CvxX7Ge6") {
      this.state = {
        serverUrl: serverUrl,
        messages: [],
        user: {
          _id: "RdGDEj86Lf",
          name: "Kai Herrmann",
          avatar:
            "https://ui-avatars.com/api/?name=Kai+Herrmann&rounded=true&bold=true&background=F38E5E&color=fff",
          username: "kai"
        },
        secondUser: {
          _id: "s9CvxX7Ge6",
          name: "David Caudill",
          avatar:
            "https://ui-avatars.com/api/?name=David+Caudill&rounded=true&bold=true&background=F38E5E&color=fff",
          username: "david"
        }
      };
    } else {
      this.state = {
        serverUrl: serverUrl,
        messages: [],
        secondUser: {
          _id: "RdGDEj86Lf",
          name: "Kai Herrmann",
          avatar:
            "https://ui-avatars.com/api/?name=Kai+Herrmann&rounded=true&bold=true&background=F38E5E&color=fff",
          username: "kai"
        },
        user: {
          _id: "s9CvxX7Ge6",
          name: "David Caudill",
          avatar:
            "https://ui-avatars.com/api/?name=David+Caudill&rounded=true&bold=true&background=F38E5E&color=fff",
          username: "david"
        }
      };
    }

    this.getMessages();
  }

  async getMessages() {
    this.state.messages = [];
    await fetch(this.state.serverUrl + "/parse/classes/Messages/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        for (let messageObject of responseJson.results) {
          let message = {};
          if (messageObject.sender === "RdGDEj86Lf") {
            message = {
              _id: messageObject.objectId,
              text: messageObject.text,
              createdAt: messageObject.createdAt,
              user: {
                _id: "RdGDEj86Lf",
                name: "Kai Herrmann",
                avatar:
                  "https://ui-avatars.com/api/?name=Kai+Herrmann&rounded=true&bold=true&background=F38E5E&color=fff",
                username: "kai"
              }
            };
          } else {
            message = {
              _id: messageObject.objectId,
              text: messageObject.text,
              createdAt: messageObject.createdAt,
              user: {
                _id: "s9CvxX7Ge6",
                name: "David Caudill",
                avatar:
                  "https://ui-avatars.com/api/?name=David+Caudill&rounded=true&bold=true&background=F38E5E&color=fff",
                username: "david"
              }
            };
          }
          this.setState({ messages: [message, ...this.state.messages] });
        }
      });
  }

  storeMessage = (text, sender) => {
    fetch(this.state.serverUrl + "/parse/classes/Messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "rapportApp"
      },
      body: JSON.stringify({
        sender: sender,
        text: text
      })
    });
  };

  onSend(messages = []) {
    console.log(messages);
    this.storeMessage(messages[0].text, messages[0].user._id);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  isIphoneX() {
    const { width, height } = Dimensions.get("window");
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812 || (height === 896 || width === 896))
    );
  }

  render() {
    return (
      <View style={{ flex: 1, marginBottom: this.isIphoneX() ? 20 : 0 }}>
        <GiftedChat
          messages={this.state.messages}
          textInputProps={{ autoFocus: true }}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
          keyboardShouldPersistTaps="never"
          bottomOffset={this.isIphoneX() ? 20 : 0}
        />
      </View>
    );
  }
}
