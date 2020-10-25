import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./src/Login";
import Register from "./src/Register";
import Feed from "./src/Feed";
import Ask from "./src/Ask";
import Notification from "./src/Notification";
import Profile from "./src/Profile";
import Question from "./src/Question";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Question" component={Question} />
    </Stack.Navigator>
  );
};

//Displays Tabs in the home screen
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = "book";
          } else if (route.name === "Ask") {
            iconName = "keyboard-o";
          } else if (route.name === "Notification") {
            iconName = "bell-o";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          //Changes icon color for selected tab
          color = focused ? "black" : color;
          return <Icon name={iconName} type="font-awesome" color={color} />;
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreens} />
      <Tab.Screen name="Ask" component={Ask} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default App;
