import React, { Component } from "react";
import {
  Keyboard,
  Text,
  Alert,
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
    if (this.state.username === "test" && this.state.password === "test") {
      this.props.navigation.navigate('App');
    }
  }

  _showRegister = () => {
    this.props.navigation.navigate("Register");
  };
}
