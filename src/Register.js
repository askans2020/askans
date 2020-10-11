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
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Register = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.signUpFormContainer}>
          <Input
            placeholder="First name"
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Input
            placeholder="Last name"
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Input
            placeholder="Email"
            leftIcon={<Icon name="envelope" size={24} color="black" />}
          />
          <Input
            placeholder="Password"
            leftIcon={<Icon name="key" size={24} color="black" />}
            secureTextEntry={true}
          />
          <Button
            title="Sign Up"
            style={styles.signUpButton}
            onPress={() => navigation.navigate("Home")}
          />
          <Text style={styles.question}>You already have an account?</Text>
          <Button
            title="Sign In Here"
            style={styles.signUpButton}
            type="outline"
            onPress={() => navigation.navigate("Login")}
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
  signUpButton: {
    padding: 10,
  },
  signUpFormContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  question: {
    textAlign: "center",
    margin: 10,
  },
});
export default Register;
