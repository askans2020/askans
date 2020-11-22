import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Header,
  Icon,
  Avatar,
  Accessory,
  Button,
  ButtonGroup,
} from "react-native-elements";
import QuestionCard from "./components/QuestionCard";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    profile: {},
  };
  handleGetProfile = () => {
    this.setState({
      profile: this.props.user,
    });
  };
  componentDidMount = () => {
    this.handleGetProfile();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          leftComponent={
            <Icon
              name="power-off"
              type="font-awesome"
              onPress={() => firebase.auth().signOut()}
            />
          }
          centerComponent={{
            text: "AskAns",
            style: { color: "#000000", fontWeight: "800", fontSize: 25 },
          }}
          rightComponent={
            <Icon
              name="user-edit"
              type="font-awesome-5"
              onPress={() => this.props.navigation.navigate("EditProfile")}
            />
          }
          containerStyle={{ backgroundColor: "#D3D3D3" }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ margin: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                rounded
                size="large"
                source={{ uri: this.state.profile.photoURL }}
              />
              <Text style={{ marginLeft: 20, fontSize: 22, fontWeight: "500" }}>
                {this.state.profile.firstName +
                  " " +
                  this.state.profile.lastName}
              </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {this.state.profile.bio}
              </Text>
            </View>
          </View>
          <View>
            <ButtonGroup
              selectedIndex={0}
              buttons={["Questions", "Answers"]}
              containerStyle={{}}
            />
          </View>

          <View style={{ padding: 5 }}>
            <QuestionCard
              name="Henok Tasissa"
              profileImage="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              title="Sample question"
              question="What is blah blah?"
              upvotes={14}
              downvotes={12}
              answers={44}
              date={"12/12/1111"}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapState = (state) => {
  return {
    user: state.user,
  };
};
const actionCreators = {};
export default connect(mapState, actionCreators)(Profile);
