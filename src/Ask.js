import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Header, Avatar, Input, Button } from "react-native-elements";
import { Picker } from "@react-native-community/picker";

class Ask extends Component {
  richText = React.createRef();

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
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={{ margin: 5 }}>
                  <Text
                    style={{
                      padding: 5,
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Ask Question
                  </Text>
                </View>
                <View>
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
                          uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                        }}
                        size="medium"
                      />
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                      <Text>Marry Joe</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                      <Text>00/00/0000</Text>
                    </View>
                  </View>
                </View>
                <View style={{ margin: 5 }}>
                  <Input placeholder="Add question title." multiline={true} />
                </View>
                <View style={{ margin: 5 }}>
                  <Input
                    placeholder="Add more details for your question."
                    multiline={true}
                  />
                </View>
                <View
                  style={{
                    margin: 5,
                    padding: 0,
                    marginHorizontal: 10,
                  }}
                >
                  <Picker
                    selectedValue={"category"}
                    mode={"dropdown"}
                    itemStyle={{ padding: 0, margin: 0, fontSize: 15 }}
                  >
                    <Picker.Item label="Technology" value="java" />
                    <Picker.Item label="Science" value="js" />
                    <Picker.Item label="Math" value="js" />
                    <Picker.Item label="Select Category" value="category" />
                    <Picker.Item label="Artificial Intelligence" value="js" />
                    <Picker.Item label="Programming" value="js" />
                  </Picker>
                  <Button title="Ask" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
export default Ask;
