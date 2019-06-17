import React from "react";
import { View, AsyncStorage } from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //Gets userId from local storage
    const userToken = await AsyncStorage.getItem("userId");
    // If the user is logged in he will be redirected to the App Screens, if not he will need to login
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content here whe currently do not have any
  render() {
    return <View />;
  }
}
