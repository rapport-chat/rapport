import React from 'react';
import { ExpoConfigView } from '@expo/samples'; //Import the ExpoConfigView from the expo package
import Colors from "app/constants/Colors"; //Impor our color constants

export default class NerdSettingsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    title: "Settings"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
