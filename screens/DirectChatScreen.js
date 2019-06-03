import { AppLoading, Asset, Linking } from "expo";
import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Bubble, GiftedChat, SystemMessage } from "react-native-gifted-chat";
import Colors from "app/constants/Colors";

import AccessoryBar from "./giftedChat/AccessoryBar";
import CustomActions from "./giftedChat/CustomActions";
import CustomView from "./giftedChat/CustomView";
import messagesData from "./giftedChat/data/messages";
import earlierMessages from "./giftedChat/data/earlierMessages";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const filterBotMessages = message =>
  !message.system && message.user && message.user._id && message.user._id === 2;
const findStep = step => (_, index) => index === step - 1;

const user = {
  _id: 1,
  name: "Developer"
};

const otherUser = {
  _id: 2,
  name: "React Native",
  avatar: "https://facebook.github.io/react/img/logo_og.png"
};

export default class App extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "Direct Chat"
  };

  state = {
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false
  };

  _isMounted = false;

  async componentWillMount() {
    this._isMounted = true;
    // init with only system messages
    this.setState({
      messages: messagesData.filter(message => message.system),
      appIsReady: true
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier = () => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages
            ),
            loadEarlier: false,
            isLoadingEarlier: false
          };
        });
      }
    }, 1000); // simulating network
  };

  onSend = (messages = []) => {
    const step = this.state.step + 1;
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      return {
        messages: GiftedChat.append(previousState.messages, sentMessages),
        step
      };
    });
    // for demo purpose
    setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000));
  };

  botSend = (step = 0) => {
    const newMessage = messagesData
      .reverse()
      .filter(filterBotMessages)
      .find(findStep(step));
    if (newMessage) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, newMessage)
      }));
    }
  };

  parsePatterns = linkStyle => {
    return [
      {
        pattern: /#(\w+)/,
        style: { ...linkStyle, color: "darkorange" },
        onPress: () => Linking.openURL("http://gifted.chat")
      }
    ];
  };

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: otherUser
        })
      };
    });
  };

  onSendFromUser = (messages = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000)
    }));
    this.onSend(messagesToUpload);
  };

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />;

  renderCustomActions = props => {
    return <CustomActions {...props} onSend={this.onSendFromUser} />;
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#f0f0f0"
          }
        }}
      />
    );
  };

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  };

  renderFooter = props => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={styles.container}
          accessible
          accessibilityLabel="main"
          testID="main"
        >
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            keyboardShouldPersistTaps="never"
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            parsePatterns={this.parsePatterns}
            user={user}
            renderAccessory={this.renderAccessory}
            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderSystemMessage={this.renderSystemMessage}
            renderCustomView={this.renderCustomView}
            renderFooter={this.renderFooter}
          />
        </View>
      </SafeAreaView>
    );
  }
}
