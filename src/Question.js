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
import { connect } from "react-redux";
import {
  getQuestionById,
  answerQuestion,
  getQuestionAnswers,
} from "./redux/questionReducer";

class Question extends Component {
  state = {
    question: {},
    answers: [],
    answer: "",
  };

  handleGetQuestionById = async (questionId) => {
    await this.props.getQuestionById(questionId);
    this.setState({
      ...this.state,
      question: this.props.question,
    });
  };

  handleGetQuestionAnswers = async (questionId) => {
    await this.props.getQuestionAnswers(questionId);
    this.setState({
      ...this.state,
      answers: this.props.answers,
    });
  };
  handleAnswer = async (userId, questionId, answer, language) => {
    if (userId != "" && questionId != "" && answer != "" && language != "") {
      const answerInfo = { userId, questionId, answer, language };
      await this.props.answerQuestion(answerInfo);
      this.setState({
        ...this.state,
        answer: "",
      });
    }
  };
  componentDidMount = async () => {
    const { questionId } = this.props.route.params;
    await this.handleGetQuestionById(questionId);
    await this.handleGetQuestionAnswers(questionId);
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
            {this.props.answers.map((answer, key) => (
              <AnswerCard
                name={answer.name}
                profileImage={answer.profileImage}
                answer={answer.answer}
                upvotes={answer.upvotes}
                downvotes={answer.downvotes}
                date={answer.date}
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
            <TextInput
              style={styles.textInput}
              placeholder="Answer..."
              value={this.state.answer}
              onChangeText={(text) =>
                this.setState({ ...this.state, answer: text })
              }
            />
            <Button
              icon={<Icon name="arrow-circle-up" size={35} color="black" />}
              buttonStyle={{
                backgroundColor: "transparent",
                padding: 5,
                marginRight: 5,
                paddingRight: 5,
                paddingLeft: 10,
              }}
              onPress={() =>
                this.handleAnswer(
                  this.props.user.uid,
                  this.state.question.id,
                  this.state.answer,
                  this.props.user.language
                )
              }
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

const mapState = (state) => {
  return {
    user: state.user,
    question: state.question.question,
    answers: state.question.answers,
  };
};
const actionCreators = {
  getQuestionById,
  answerQuestion,
  getQuestionAnswers,
};
export default connect(mapState, actionCreators)(Question);
