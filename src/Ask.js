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
import { db } from "../firebaseConfig";
import { connect } from "react-redux";
import { askQuestion } from "./redux/questionsReducer";
import { getCategories } from "./redux/categoriesReducer";

class Ask extends Component {
  state = {
    categories: [],
    question: {
      title: "",
      text: "",
      category: "",
    },
    selectedCategory: null,
  };

  handleAsk = async (title, text, category) => {
    if (title != "" && text != "" && category != "") {
      const userId = this.props.user.uid;
      const language = this.props.user.language;
      const questionInfo = {
        userId,
        title,
        text,
        category,
        language,
      };
      await this.props.askQuestion(questionInfo);
      this.setState({
        ...this.state,
        question: {
          title: "",
          text: "",
          category: "",
        },
        selectedCategory: null,
      });
    }
  };

  getCategories = async () => {
    if (this.props.user) {
      await this.props.getCategories(this.props.user.language);
    }

    const categories = this.props.categories;
    let categoryList = [];

    categories.categories.map((category) => {
      let ctgry = {};
      ctgry["label"] = category.name;
      ctgry["value"] = category.name;
      categoryList.push(ctgry);
    });
    this.setState({
      ...this.state,
      categories: categoryList,
    });
  };

  componentDidMount = () => {
    this.getCategories();
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
                          uri: this.props.user.photoURL,
                        }}
                        size="medium"
                      />
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                      <Text>
                        {this.props.user.firstName +
                          " " +
                          this.props.user.lastName}
                      </Text>
                    </View>
                    {/* <View style={{ padding: 10 }}>
                      <Text>00/00/0000</Text>
                    </View> */}
                  </View>
                </View>
                <View style={{ margin: 5 }}>
                  <TextInput
                    style={styles.titleinput}
                    placeholder="Add question title."
                    multiline={true}
                    onChangeText={(text) =>
                      this.setState({
                        ...this.state,
                        question: {
                          ...this.state.question,
                          title: text,
                        },
                      })
                    }
                    value={this.state.question.title}
                  />
                </View>
                <View style={{ margin: 5, marginTop: 5 }}>
                  <TextInput
                    style={styles.detailinput}
                    placeholder="Add more details for your question."
                    multiline={true}
                    onChangeText={(text) =>
                      this.setState({
                        ...this.state,
                        question: {
                          ...this.state.question,
                          text: text,
                        },
                      })
                    }
                    value={this.state.question.text}
                  />
                </View>

                <View>
                  <View style={styles.dropdown}>
                    <DropDownPicker
                      items={this.state.categories}
                      //defaultValue={this.state.any}
                      style={{ backgroundColor: "#fafafa", zIndex: 200 }}
                      itemStyle={{
                        justifyContent: "flex-start",
                      }}
                      dropDownStyle={{ backgroundColor: "#fafafa" }}
                      onChangeItem={(item) => {
                        this.setState({
                          ...this.state,
                          question: {
                            ...this.state.question,
                            category: item.value,
                          },
                          selectedCategory: item.value,
                        });
                      }}
                      defaultValue={this.state.selectedCategory}
                      placeholder="Select Category"
                    />
                  </View>
                  <Button
                    containerStyle={{ marginTop: 20, marginHorizontal: 10 }}
                    title="Ask"
                    onPress={() => {
                      this.handleAsk(
                        this.state.question.title,
                        this.state.question.text,
                        this.state.question.category
                      );
                    }}
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

const mapState = (state) => {
  return {
    categories: state.categories,
    questions: state.questions,
    user: state.user,
  };
};
const actionCreators = {
  askQuestion,
  getCategories,
};
export default connect(mapState, actionCreators)(Ask);
