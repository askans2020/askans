import React, {Component} from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Header, Avatar } from "react-native-elements";
import {connect} from "react-redux"
import {getNotifications} from "./redux/notificationsReducer"
class Notification extends Component{
  componentDidMount = ()=>{
    this.props.getNotifications(this.props.user.uid)
  }
  render () { return (
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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.notificationRowContainer}>
          <View style={styles.imageContainer}>
            <Avatar
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              size="medium"
            />
          </View>
          <View style={styles.textContainer}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Amy Doe</Text> upvoted your
              question.
            </Text>
          </View>
        </View>
        <View style={styles.notificationRowContainer}>
          <View style={styles.imageContainer}>
            <Avatar
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              size="medium"
            />
          </View>
          <View style={styles.textContainer}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Amy Doe</Text> answered your
              question.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );}
};

const styles = StyleSheet.create({
  notificationRowContainer: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "white",
    borderWidth: 0.25,
    borderColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  imageContainer: {
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
});
const mapState = state=>{
  return{
    notifications: state.notifications,
    user: state.user
  }
}
const actionCreators = {
  getNotifications
}
export default connect(mapState, actionCreators)(Notification);

