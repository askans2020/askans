import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginFormContainer}>
          <Input
            placeholder="Email Address"
            leftIcon={<Icon name="envelope" size={24} color="black" />}
          />
          <Input
            placeholder="Password"
            leftIcon={<Icon name="key" size={24} color="black" />}
            secureTextEntry={true}
          />
          <Button
            title="Sign In"
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
          />
          <Text style={styles.question}>You don't have an account?</Text>
          <Button
            title="Sign Up Here"
            style={styles.loginButton}
            type="outline"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EEEEEE",
  },
  loginButton: {
    padding: 10,
  },
  loginFormContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  question: {
    textAlign: "center",
    margin: 10,
  },
});
export default Login;
