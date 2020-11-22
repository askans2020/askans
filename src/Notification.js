import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Header, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { getNotifications } from "./redux/notificationsReducer";
class Notification extends Component {
  state = {
    notifications: [],
  };

  handleGetNotifications = async () => {
    const notificationInfo = {
      userId: this.props.user.uid,
    };
    await this.props.getNotifications(notificationInfo);
    this.setState({
      notifications: this.props.notifications,
    });
  };

  componentDidMount = async () => {
    await this.handleGetNotifications();
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
        <ScrollView style={{ flex: 1 }}>
          {this.state.notifications.map((notification, key) => {
            return (
              <View style={styles.notificationRowContainer} key={key}>
                <View style={styles.imageContainer}>
                  <Avatar
                    rounded
                    source={{
                      uri: notification.notifierInfo.profileImage,
                    }}
                    size="medium"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {notification.notifierInfo.name}
                    </Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("Question", {
                          questionId: notification.questionId,
                        })
                      }
                    >
                      {" " + notification.message}
                    </Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

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
const mapState = (state) => {
  return {
    notifications: state.notifications,
    user: state.user,
  };
};
const actionCreators = {
  getNotifications,
};
export default connect(mapState, actionCreators)(Notification);
