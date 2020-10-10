import React from "react";
import { View, Text, Button } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login Page</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default Login;
