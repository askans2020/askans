import React, { Component } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Header, Avatar, Input, Button } from "react-native-elements";
class EditProfile extends Component {
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              paddingBottom: 0,
              backgroundColor: "white",
              borderRadius: 4,
              borderColor: "gray",
              borderWidth: 0.25,
            }}
          >
            <View style={{ marginBottom: 5 }}>
              <Avatar
                rounded
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                }}
                size="medium"
              />
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ fontWeight: "bold" }}>John Doe</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextInput
              multiline={true}
              style={{
                borderWidth: 0.25,
                minHeight: 150,
                borderRadius: 4,
                padding: 10,
                fontSize: 15,
                backgroundColor: "white",
                borderColor: "gray",
                marginBottom: 10,
              }}
              placeholder="Update bio..."
            />
            <Button title="Update bio" type="outline" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
