import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Header, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import QuestionCard from "./components/QuestionCard";
import AnswerCard from "./components/AnswerCard";
class Question extends Component {
  state = {
    question: {
      name: "John Doe",
      date: "MM/DD/YYYY",
      profileImage:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      title: "Post according to an editorial calendar?",
      text:
        "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
      upvotes: 123,
      downvotes: 10,
      answers: 24,
    },
    answers: [
      {
        name: "John Doe",
        date: "MM/DD/YYYY",
        profileImage:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        answer:
          "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
        upvotes: 123,
        downvotes: 10,
      },
      {
        name: "John Doe",
        date: "MM/DD/YYYY",
        profileImage:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        answer:
          "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
        upvotes: 123,
        downvotes: 10,
      },
    ],
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
        <ScrollView style={{ flex: 1, padding: 5 }}>
          <QuestionCard
            name={this.state.question.name}
            profileImage={this.state.question.profileImage}
            title={this.state.question.title}
            text={this.state.question.text}
            upvotes={this.state.question.upvotes}
            downvotes={this.state.question.downvotes}
            answers={this.state.question.answers}
            date={this.state.question.date}
            navigation={this.props.navigation}
          />
          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Answers:</Text>
          </View>
          <View style={{ padding: 5 }}>
            {this.state.answers.map((answer, key) => (
              <AnswerCard
                name={answer.name}
                profileImage={answer.profileImage}
                answer={answer.answer}
                upvotes={this.state.question.upvotes}
                downvotes={this.state.question.downvotes}
                date={this.state.question.date}
                key={key}
              />
            ))}
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          style={{
            flexDirection: "column",
            alignItems: "center",
            margin: 5,
          }}
          behavior={Platform.OS == "android" ? null : "padding"}
          enabled
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextInput style={styles.textInput} placeholder="Answer..." />
            <Button
              icon={<Icon name="arrow-circle-up" size={35} color="black" />}
              buttonStyle={{
                backgroundColor: "transparent",
                padding: 5,
                marginRight: 5,
                paddingRight: 5,
                paddingLeft: 10,
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 17,
    borderWidth: 0.2,
    padding: 10,
    maxHeight: 100,
    minHeight: 43,
    marginBottom: 3,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 3,
    borderRadius: 5,
    borderColor: "#bdbdbd",
    backgroundColor: "#fafafa",
    paddingTop: 13,
    backgroundColor: "white",
  },
});
export default Question;
