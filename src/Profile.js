import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Header,
  Icon,
  Avatar,
  Accessory,
  Button,
  ButtonGroup,
} from "react-native-elements";

const Profile = ({ navigation, upvotes, downvotes, answers }) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        backgroundColor: "white",
        borderWidth: 0.25,
        borderColor: "gray",
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Header
        leftComponent={<Icon name="power-off" type="font-awesome" />}
        centerComponent={{
          text: "AskAns",
          style: { color: "#000000", fontWeight: "800", fontSize: 25 },
        }}
        rightComponent={
          <Icon
            name="user-edit"
            type="font-awesome-5"
            onPress={() => navigation.navigate("EditProfile")}
          />
        }
        containerStyle={{ backgroundColor: "#D3D3D3" }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              icon={{ name: "home" }}
              rounded
              size="large"
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
              }}
            >
              <Accessory />
            </Avatar>
            <Text style={{ marginLeft: 20, fontSize: 22, fontWeight: "500" }}>
              Hiwot Doe
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>
              lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna nibh.
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

        <View style={{ marginTop: 50, margin: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              icon={{ name: "home" }}
              rounded
              size="large"
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
              }}
            >
              <Accessory iconStyle={{ size: "" }} />
            </Avatar>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "500" }}>
                Hiwot
              </Text>
              <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "500" }}>
                About Hiwot
              </Text>
            </View>
            <View>
              <Text>MM/DD/YYYY</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>Question title...</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>
              lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna nibh.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              alignItems: "center",
            }}
          >
            <View style={{ paddingLeft: 5, flexDirection: "row" }}>
              <Icon name="thumbs-up" type="font-awesome" />
              <Text style={{ paddingTop: 5, paddingLeft: 5, fontSize: 16 }}>
                {upvotes} upvotes
              </Text>
            </View>
            <View style={{ paddingLeft: 40, flexDirection: "row" }}>
              <Icon name="thumbs-down" type="font-awesome" />
              <Text style={{ paddingTop: 5, paddingLeft: 5, fontSize: 16 }}>
                {downvotes} downvotes
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 15,
                flex: 1,
                paddingTop: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {answers} Answers
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
