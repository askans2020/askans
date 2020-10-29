import React, { Component } from "react";
import { View, Text, ScrollView, TextInput, Stylesheet } from "react-native";
import { Header, Avatar, Input, Button } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker";
//import Icon from "react-native-vector-icons/Feather";

//import RNPickerSelect from "react-native-picker-select";
class EditProfile extends Component {
  state = {
    gender: "female",
    language: "amharic",
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
            <Button style={{ marginLeft: 200 }} title="Update bio" />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <TextInput
              style={{
                borderWidth: 0.25,
                minHeight: 50,
                borderRadius: 4,
                padding: 10,
                fontSize: 15,
                backgroundColor: "white",
                borderColor: "gray",
                marginBottom: 10,
              }}
              placeholder="First Name"
            />
            <TextInput
              style={{
                borderWidth: 0.25,
                minHeight: 50,
                borderRadius: 4,
                padding: 10,
                fontSize: 15,
                backgroundColor: "white",
                borderColor: "gray",
                marginBottom: 10,
              }}
              placeholder=" Last Name"
            />

            <View
              style={{
                marginTop: 15,
                borderWidth: 0.25,
                minHeight: 50,
                borderRadius: 4,
                padding: 10,
                fontSize: 15,
                backgroundColor: "white",
                borderColor: "gray",
                marginBottom: 10,
              }}
            >
              <DropDownPicker
                items={[
                  {
                    label: "AMHARIC",
                    value: "amharic",
                    hidden: true,
                  },
                  {
                    label: "ENGLISH",
                    value: "english",
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
                    language: item.value,
                  })
                }
              />
            </View>
            <View
              style={{
                marginTop: 15,
                borderWidth: 0.25,
                minHeight: 50,
                borderRadius: 4,
                padding: 10,
                fontSize: 15,
                backgroundColor: "white",
                borderColor: "gray",
                marginBottom: 10,
              }}
            >
              <DropDownPicker
                style={{ marginTop: 50 }}
                items={[
                  {
                    label: "FEMAL",
                    value: "female",
                    hidden: true,
                  },
                  {
                    label: "MALE",
                    value: "male",
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
                    gender: item.value,
                  })
                }
              />
            </View>

            <Button style={{ marginTop: 40 }} title="Update info" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfile;
