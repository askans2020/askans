import React from "react";
import { View, Text, Button } from "react-native";

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>Register Page</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Register;
