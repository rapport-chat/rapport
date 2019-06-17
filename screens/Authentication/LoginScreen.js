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
import Colors from "app/constants/Colors"; //Import  our colors
import styles from "./AuthStyle"; //Import the AuthStyles
import SeparatorLine from "app/components/SeparatorLine"; //Import the SeperatorLine Component
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
        {/*Dismisses keyboard when touching empty space*/}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.inputContainer}>
                <Text style={styles.logoText}>Rapport</Text>
                <TextInput
                  placeholder="https://server-url.com:1337"
                  placeholderColor="#c4c3cb"
                  // Save url in state when text is changed
                  onChangeText={serverUrl => this.setState({ serverUrl })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Username"
                  placeholderColor="#c4c3cb"
                  // Save username in state when text is changed
                  onChangeText={username => this.setState({ username })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  // Save password in state when text is changed
                  onChangeText={password => this.setState({ password })}
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  // Call login function on press
                  onPress={() => this.onLoginPress()}
                  title="Login"
                />
              </View>
              <SeparatorLine />
              {/*Redirect to register when pressed*/}
              <Text onPress={this._showRegister} style={styles.registerText}>
                Don't have an account yet? Register now!
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  //Login function
  onLoginPress() {
    if (!this._validateForm()) {
      return; //Don't continue with login, form is not validated
    }

    let qs = require("qs"); //Require qs node package
    //Create user object
    let user = {
      username: this.state.username,
      password: this.state.password
    };

    //Call sendLoginRequest function
    this._sendLoginRequest(
      this.state.serverUrl + "/parse/login?" + qs.stringify(user)
    );
  }

  //Sends login request to server
  _sendLoginRequest(requestUrl) {
    if (!requestUrl.startsWith("http") && !requestUrl.startsWith("https")) {
      requestUrl = "http://" + requestUrl;
    }
    fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Parse-Application-Id": "rapportApp"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //When request is successful call handleLogin function
        this._handleLoginResponse(responseJson);
      })
      .catch(
      );
  }

  //Handles response from server for the login request
  _handleLoginResponse(responseJson) {
    if (responseJson.objectId != null) {
      this._saveToLocalStorage("serverUrl", this.state.serverUrl); //Save server url to local storage for future use
      this._saveToLocalStorage("userId", responseJson.objectId); //Save User object id to local storage for future use
      this.props.navigation.navigate("App", {userId: responseJson.objectId}); //User is now logged in, redirect to app stack
    } else {
      console.error(responseJson); //Got empty response, log error
    }
  }

  _saveToLocalStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value); //Save userId to local storage
    } catch (error) {
      // Error storing data
      console.error(error.message);
    }
  };

  //Validation for login form. Notifies user if anything is missing.
  _validateForm() {
    if (this.state == null) { //If state is empty
      return false;
    }
    //If serverUrl is empty
    if (this.state.serverUrl === "" || this.state.serverUrl === undefined) {
      alert("Please enter a server url!");
      return false;
    }
    //If username is empty
    if (this.state.username === "" || this.state.username === undefined) {
      alert("Please enter a username!");
      return false;
    }
    //If password is empty
    if (this.state.password === "" || this.state.password === undefined) {
      alert("Please enter a password!");
      return false;
    }

    return true;
  }

  //Opens register screen
  _showRegister = () => {
    this.props.navigation.navigate("Register");
  };
}
