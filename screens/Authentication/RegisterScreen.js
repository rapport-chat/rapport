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
                  placeholder="Invitation Code"
                  placeholderColor="#c4c3cb"
                  // Save invitiationCode in state when text is changed
                  onChangeText={invitationCode =>
                    this.setState({ invitationCode })
                  }
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="First Name"
                  placeholderColor="#c4c3cb"
                  // Save first name in state when text is changed
                  onChangeText={firstName => this.setState({ firstName })}
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Last Name"
                  placeholderColor="#c4c3cb"
                  // Save last name in state when text is changed
                  onChangeText={lastName => this.setState({ lastName })}
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
                  // Call register function on press
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

  //Register function
  async onRegisterPress() {
    if (!this._validateForm()) {
      return; //Don't continue with login, form is not validated
    }
    let qs = require('qs'); //Require qs node package

    let invCode;
    let url = this.state.serverUrl;

    if(!url.startsWith("http")){
      url = "http://" + url;
    }
    await fetch(url + '/parse/classes/AuthenticationKey/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'rapportApp'
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        invCode = responseJson.results[0].code; //Store invCode
      })

    if (this.state.invitationCode !== invCode) {
      alert("InvitationCode invalid!"); //Can't register with invalid code
      return;
    }

    //Create new user object
    var user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }

    fetch(this.state.serverUrl + '/parse/users?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'rapportApp'
      },
      body: JSON.stringify(user),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.objectId != null) { //Check if there is a response
          this._saveServerUrl(this.state.serverUrl); //Pass serverUrl to saveServerUrl function
          this._saveUserId(responseJson.objectId); //Pass objectId to saveUserId function
          this.props.navigation.navigate("App"); //Redirect App Screens
        }
      }).catch(
        alert("Can't connect to Server! Please check your Configuration!")
      )
  }

  //Store serverUrl in local storage
  _saveServerUrl = async serverUrl => {
    try {
      await AsyncStorage.setItem("serverUrl", serverUrl);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Store userId in local storage
  _saveUserId = async userId => {
    try {
      await AsyncStorage.setItem("userId", userId);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  //Validate input from form
  _validateForm() {
    if (this.state == null) { //If state is empty
      return false;
    }
    //If serverUrl is empty
    if (this.state.serverUrl === "" || this.state.serverUrl === undefined) {
      alert("Please enter a server url!");
      return false;
    }
    //If first name is empty
    if (this.state.firstName === "" || this.state.firstName === undefined) {
      alert("Please enter your first name!");
      return false;
    }
    //If last name is empty
    if (this.state.lastName === "" || this.state.lastName === undefined) {
      alert("Please enter your last name!");
      return false;
    }
    //If username is empty
    if (this.state.username === "" || this.state.username === undefined) {
      alert("Please enter your username!");
      return false;
    }
    //If password is empty
    if (this.state.password === "" || this.state.password === undefined) {
      alert("Please enter your password!");
      return false;
    }

    return true;
  }
}
