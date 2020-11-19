import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Header, Avatar, Input, Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import { updateProfile } from "./redux/userReducer";

class EditProfile extends Component {
  state = {
    bio: "",
    firstName: "",
    lastName: "",
    gender: "",
    language: "",
    photoURL: "",
  };

  handleUpdateProfile = async (firstName, lastName, gender, language) => {
    if (firstName != "" && lastName != "" && gender != "" && language != "") {
      const userInfo = {
        userId: this.props.user.uid,
        firstName,
        lastName,
        language,
        gender,
      };
      this.props.updateProfile(userInfo);
    }
  };
  handleFillInformation = () => {
    this.setState({
      ...this.props.user,
    });
  };
  componentDidMount = () => {
    this.handleFillInformation();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "AskAns",
            style: {
              color: "#000000",
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
          containerStyle={{ backgroundColor: "#D3D3D3" }}
        />
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                paddingBottom: 0,
              }}
            >
              <View style={{ marginBottom: 5 }}>
                <Avatar
                  rounded
                  source={{
                    uri: this.state.photoURL ? this.state.photoURL : null,
                  }}
                  size="medium"
                />
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <Text>{this.state.firstName + " " + this.state.lastName}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.detailinput}
                multiline={true}
                style={[styles.inputContainer, { minHeight: 150 }]}
                placeholder="Update bio..."
                onChangeText={(text) => {
                  this.setState({
                    ...this.state,
                    bio: text,
                  });
                }}
                value={this.state.bio}
              />
              <Button style={{ marginLeft: 200 }} title="Update bio" />
            </View>

            <View
              style={{
                marginVertical: 10,
              }}
            >
              <TextInput
                style={styles.inputContainer}
                placeholder="First Name"
                onChangeText={(text) => {
                  this.setState({
                    ...this.state,
                    firstName: text,
                  });
                }}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.inputContainer}
                placeholder="Last Name"
                onChangeText={(text) => {
                  this.setState({
                    ...this.state,
                    lastName: text,
                  });
                }}
                value={this.state.lastName}
              />

              <View style={styles.dropdown}>
                <DropDownPicker
                  items={[
                    {
                      label: "AMHARIC",
                      value: "Amharic",
                      hidden: true,
                    },
                    {
                      label: "ENGLISH",
                      value: "English",
                    },
                  ]}
                  defaultValue={this.state.language}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "#fafafa" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) => {
                    this.setState({
                      ...this.state,
                      language: item.value,
                    });
                  }}
                  placeholder="Language"
                />
              </View>
              <View style={[styles.dropdown, { zIndex: 90 }]}>
                <DropDownPicker
                  style={{ marginTop: 50 }}
                  items={[
                    {
                      label: "FEMALE",
                      value: "Female",
                      hidden: true,
                    },
                    {
                      label: "MALE",
                      value: "Male",
                    },
                  ]}
                  defaultValue={this.state.any}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "#fafafa" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) =>
                    this.setState({
                      ...this.state,
                      gender: item.value,
                    })
                  }
                  defaultValue={this.state.gender}
                  placeholder="Gender"
                />
              </View>

              <Button
                style={{ marginTop: 20, marginHorizontal: 10 }}
                title="Update info"
                onPress={() => {
                  this.handleUpdateProfile(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.gender,
                    this.state.language
                  );
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 0.25,
    minHeight: 50,
    borderRadius: 4,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    borderColor: "gray",
    marginBottom: 10,
  },
  dropdown: {
    zIndex: 100,
    marginTop: 15,
    borderWidth: 0.25,
    minHeight: 50,
    borderRadius: 4,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    borderColor: "gray",
    marginBottom: 10,
  },
});
const mapState = (state) => {
  return {
    user: state.user,
  };
};
const actionCreators = { updateProfile };
export default connect(mapState, actionCreators)(EditProfile);
