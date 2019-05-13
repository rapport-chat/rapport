import React, { Component } from "react";
import {
  Keyboard,
  Text,
  AsyncStorage,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import Colors from "app/constants/Colors";
import styles from "./AuthStyle";
import SeparatorLine from "app/components/SeparatorLine";
import { Button } from "react-native-elements";

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    }
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
                  onPress={() => this.onLoginPress()}
                  title="Login"
                />
              </View>
              <SeparatorLine />
              <Text onPress={this._showRegister} style={styles.registerText}>
                Don't have an account yet? Register now!
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() { }

  componentWillUnmount() { }

  onLoginPress() {
    if (!this._validateForm()) {
      return;
    }
    var user = {
      username: this.state.username,
      password: this.state.password
    }

    var qs = require('qs');
    fetch(this.state.serverUrl + '/parse/login?' + qs.stringify(user), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Parse-Application-Id': 'rapportApp'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.objectId != null) {
          this._saveServerUrl(this.state.serverUrl);
          this._saveUserId(responseJson.objectId);
          this.props.navigation.navigate("App");
        }
      }).catch(
        alert("Can't connect to Server! Please check your Configuration!")
      )
  }

  _saveServerUrl = async serverUrl => {
    try {
      await AsyncStorage.setItem("serverUrl", serverUrl);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  _saveUserId = async userId => {
    try {
      await AsyncStorage.setItem("userId", userId);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  _validateForm() {
    if (this.state == null) {
      return false;
    }

    if (this.state.serverUrl === "" || this.state.serverUrl === undefined) {
      alert("Please enter a server url!")
      return false;
    }
    if (this.state.username === "" || this.state.username === undefined) {
      alert("Please enter a username!")
      return false;
    }
    if (this.state.password === "" || this.state.password === undefined) {
      alert("Please enter a password!")
      return false;
    }

    return true;
  }


  _showRegister = () => {
    this.props.navigation.navigate("Register");
  };
}
