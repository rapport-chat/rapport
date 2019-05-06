import React, { Component } from "react";
import {
  Keyboard,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import Colors from "app/constants/Colors";
import { Button } from "react-native-elements";

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#342E37"
    },
    headerTintColor: "#fff",
    title: "Rapport "
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Rapport</Text>
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
                title="Login"
              />
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

const styles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  loginScreenContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.primary
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 45,
    marginTop: 10
  }
});
