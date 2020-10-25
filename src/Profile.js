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

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
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
            <Text style={{ fontSize: 16 }}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
