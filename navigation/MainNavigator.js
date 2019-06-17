import {
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";

import ChatsScreen from "app/screens/ChatsScreen";
import DirectChatScreen from "app/screens/DirectChatScreen";
import SettingsScreen from "app/screens/Settings/SettingsScreen";
import NerdSettingsScreen from "app/screens/Settings/NerdSettingsScreen";
import LicenseScreen from "app/screens/Settings/LicenseScreen";
import NewGroupScreen from "app/screens/NewGroupScreen";
import LoginScreen from "app/screens/Authentication/LoginScreen";
import RegisterScreen from "app/screens/Authentication/RegisterScreen";
import AuthLoadingScreen from "app/screens/Authentication/AuthLoadingScreen";

const AppStack = createStackNavigator({
  Home: ChatsScreen,
  DirectChat: DirectChatScreen,
  NewGroup: NewGroupScreen,
  Settings: SettingsScreen,
  Nerd: NerdSettingsScreen,
  License: LicenseScreen,
});
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
