import React from "react";
import { Platform, View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { GiftedChat, Input, InputToolbar } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";

import SlackMessage from "app/components/SlackMessage";

export default class App extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#342E37"
    },
    headerTintColor: "#fff",
    title: "Direct Chat"
  };

  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: Platform.OS,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  renderInputToolbar(props){
    // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.
    return (
         <InputToolbar {...props} style={styles.InputToolbar}/>
    )
}

  renderChatIOS() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
        renderInputToolbar={this.renderInputToolbar}
      />
    );
  }
  renderChatAndroid() {
    return (
      <View style={{flex:1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={80} />
      </View>
    );
  }

  render() {
    if (Platform.OS === "android") {
      return this.renderChatAndroid();
    } else {
      return this.renderChatIOS();
    }
  }
}

const styles = StyleSheet.create({
  InputToolbar: {
    backgroundColor:"black",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  }
});
