import React, { Component, useState } from "react";
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
import firebase from "../firebaseConfig";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: {
      status: false,
      message: "",
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  };

  signInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) =>
        this.setState({
          email: "",
          password: "",
          error: {
            status: false,
            message: "",
          },
        })
      )
      .catch((err) =>
        this.setState({
          ...this.state,
          error: {
            status: true,
            message: "Check your password or email",
          },
        })
      );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormContainer}>
            {this.state.error.status ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {this.state.error.message}
              </Text>
            ) : null}
            <Input
              placeholder="Email Address"
              leftIcon={<Icon name="envelope" size={24} color="black" />}
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
            />
            <Input
              placeholder="Password"
              leftIcon={<Icon name="key" size={24} color="black" />}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />
            <Button
              title="Sign In"
              style={styles.loginButton}
              onPress={() =>
                this.signInUser(this.state.email, this.state.password)
              }
            />
            <Text style={styles.question}>You don't have an account?</Text>
            <Button
              title="Sign Up Here"
              style={styles.loginButton}
              type="outline"
              onPress={() => this.props.navigation.navigate("Register")}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
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
