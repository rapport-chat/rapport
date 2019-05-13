import React, { Component } from "react";
import {
  Keyboard,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import Colors from "app/constants/Colors";
import { Button } from "react-native-elements";
import styles from "./AuthStyle";
export default class LoginScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff"
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.inputContainer}>
                <Text style={styles.logoText}>Rapport</Text>
                <TextInput
                  placeholder="https://server-url.com:1337"
                  placeholderColor="#c4c3cb"
                  onChangeText={serverUrl => this.setState({ serverUrl })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Invitation Code"
                  placeholderColor="#c4c3cb"
                  onChangeText={invitationCode =>
                    this.setState({ invitationCode })
                  }
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="First Name"
                  placeholderColor="#c4c3cb"
                  onChangeText={firstName => this.setState({ firstName })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Last Name"
                  placeholderColor="#c4c3cb"
                  onChangeText={lastName => this.setState({ lastName })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Username"
                  placeholderColor="#c4c3cb"
                  onChangeText={username => this.setState({ username })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  onChangeText={password => this.setState({ password })}
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onRegisterPress()}
                  title="Register"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onRegisterPress() {
    if (!this._validateForm()) {
      return;
    }
  }

  _validateForm() {
    if (this.state.serverUrl === "" || this.state.serverUrl === undefined) {
      alert("Please enter a server url!");
      return false;
    }
    if (this.state.firstName === "" || this.state.firstName === undefined) {
      alert("Please enter your first name!");
      return false;
    }
    if (this.state.lastName === "" || this.state.lastName === undefined) {
      alert("Please enter your last name!");
      return false;
    }
    if (this.state.username === "" || this.state.username === undefined) {
      alert("Please enter your username!");
      return false;
    }
    if (this.state.password === "" || this.state.password === undefined) {
      alert("Please enter your password!");
      return false;
    }

    return true;
  }
}
