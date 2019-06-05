import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Colors from "app/constants/Colors";
import {
  Keyboard,
  Text,
  AsyncStorage,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import styles from "app/screens/Authentication/AuthStyle";
import SeparatorLine from "app/components/SeparatorLine";
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
                  onPress={() => this.props.navigation.navigate("Nerd")}
                  title="Nerd Settings"
                />


                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onLogoutPress()}
                  title="Logout"
                />
              </View>
              <SeparatorLine />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  onLogoutPress(){
    alert("log out amk");
  }
}
