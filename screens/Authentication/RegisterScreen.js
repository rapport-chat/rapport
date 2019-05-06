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
                  placeholder="First Name"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Last Name"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Username"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                />
                <TextInput
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onLoginPress()}
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

  onLoginPress() {}
}
