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

  componentDidMount() {}

  componentWillUnmount() {}

  onLoginPress() {
    if(!this._validateForm()){
      return;
    }
    this._saveServerUrl(this.state.serverUrl);
    if (this.state.username === "test" && this.state.password === "test") {
      this.props.navigation.navigate("App");
    }
  }

  _saveServerUrl = async serverUrl => {
    try {
      await AsyncStorage.setItem("serverUrl", serverUrl);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  
  _validateForm() {
    if(this.state.serverUrl === "" || this.state.serverUrl === undefined){
      alert("Please enter a server url!")
      return false;
    }
    if(this.state.username === "" || this.state.username === undefined){
      alert("Please enter a username!")
      return false;
    }
    if(this.state.password === "" || this.state.password === undefined){
      alert("Please enter a password!")
      return false;
    }

    return true;
  }


  _showRegister = () => {
    this.props.navigation.navigate("Register");
  };
}
