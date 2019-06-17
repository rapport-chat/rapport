import React from "react";
import Colors from "app/constants/Colors";
import {
  Keyboard,
  Text,
  AsyncStorage,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import styles from "app/screens/Authentication/AuthStyle"; //Import AuthStyles, they can be reused here
import { Button } from "react-native-elements";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "Settings"
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.inputContainer}>
                <Text style={styles.logoText}>Settings</Text>
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.props.navigation.navigate("Nerd")} //Redirect to NerdSettings Screen
                  title="Nerd Settings"
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.props.navigation.navigate("License")} //Redirect to License Screen
                  title="Licenses"
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onLogoutPress()} //Call the logout press function
                  title="Logout"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  //Log the user out and clear the local storage
  onLogoutPress() {
    AsyncStorage.removeItem("userId"); //Remove userId from local storage
    AsyncStorage.removeItem("serverUrl"); //Remove serverUrl from local storage
    this.props.navigation.navigate("Login"); //Redirect to login screen
  }
}
