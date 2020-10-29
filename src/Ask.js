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
import DropDownPicker from "react-native-dropdown-picker";

class Ask extends Component {
  state = {
    category: "TECHNOLOGY",
  };
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
                  <TextInput
                    style={styles.titleinput}
                    placeholder="Add question title."
                    multiline={true}
                  />
                </View>
                <View style={{ margin: 5, marginTop: 5 }}>
                  <TextInput
                    style={styles.detailinput}
                    placeholder="Add more details for your question."
                    multiline={true}
                  />
                </View>

                <View>
                  <View style={styles.dropdown}>
                    <DropDownPicker
                      style={{}}
                      items={[
                        {
                          label: "TECHNOLOGY",
                          value: "technology",
                        },
                        { label: "ENGLISH", value: "english" },
                        { label: "SCIENCE", value: "science" },
                        { label: "MATH", value: "math" },
                        {
                          label: "ARTIFICIAL INTELLIGENCE",
                          value: "artificial intelligence",
                        },
                      ]}
                      //defaultValue={this.state.any}
                      style={{ backgroundColor: "#fafafa" }}
                      itemStyle={{
                        justifyContent: "flex-start",
                      }}
                      dropDownStyle={{ backgroundColor: "#fafafa" }}
                      onChangeItem={(item) =>
                        this.setState({
                          category: item.value,
                        })
                      }
                    />
                  </View>
                  <Button
                    style={{ marginTop: 20, marginHorizontal: 10 }}
                    title="Ask"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dropdown: {
    zIndex: 100,
    marginTop: 5,
    borderWidth: 0.25,
    minHeight: 50,
    borderRadius: 4,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    borderColor: "gray",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  titleinput: {
    borderWidth: 0.25,
    minHeight: 50,
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    backgroundColor: "white",
    borderColor: "gray",
    marginBottom: 10,
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  detailinput: {
    borderWidth: 0.25,
    minHeight: 150,
    borderRadius: 4,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    borderColor: "gray",
    marginBottom: 10,
    marginHorizontal: 5,
  },
});
export default Ask;
