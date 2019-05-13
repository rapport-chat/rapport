import Colors from "app/constants/Colors";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  containerView: {
    flex: 1
  },
  loginScreenContainer: {
    flex: 1,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 5,
    textAlign: "center",
    color: Colors.primary
  },
  loginFormView: {
    flex: 1
  },
  inputContainer: {
    marginLeft: 15,
    marginRight: 15
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
  },
  registerText: {
    paddingTop: 5,
    fontSize: 16,
    textAlign: "center"
  }
});
