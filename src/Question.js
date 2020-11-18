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
  upvoteQuestion,
  downvoteQuestion,
  upvoteAnswer,
  downvoteAnswer,
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

  handleQuestionUpvote = async (questionId) => {
    const questionInfo = { userId: this.props.user.uid, questionId };
    await this.props.upvoteQuestion(questionInfo);
  };

  handleQuestionDownvote = async (questionId) => {
    const questionInfo = {
      userId: this.props.user.uid,
      questionId,
    };
    await this.props.downvoteQuestion(questionInfo);
  };

  handleAnswerUpvote = async (answerId) => {
    const answerInfo = { userId: this.props.user.uid, answerId };
    await this.props.upvoteAnswer(answerInfo);
  };

  handleAnswerDownvote = async (answerId) => {
    const answerInfo = { userId: this.props.user.uid, answerId };
    await this.props.downvoteAnswer(answerInfo);
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
          {this.props.question && this.props.question.downvotedBy ? (
            <QuestionCard
              name={this.props.question.name}
              profileImage={this.props.question.profileImage}
              title={this.props.question.title}
              text={this.props.question.text}
              upvotes={this.props.question.upvotes}
              downvotes={this.props.question.downvotes}
              answers={this.props.question.answers}
              date={this.props.question.date}
              navigation={this.props.navigation}
              upvote={(questionId) => this.handleQuestionUpvote(questionId)}
              downvote={(questionId) => this.handleQuestionDownvote(questionId)}
              upvoted={
                this.props.question.upvotedBy.includes(this.props.user.uid)
                  ? true
                  : false
              }
              downvoted={
                this.props.question.downvotedBy.includes(this.props.user.uid)
                  ? true
                  : false
              }
              id={this.props.question.id}
            />
          ) : null}
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
                upvote={(answerId) => this.handleAnswerUpvote(answerId)}
                downvote={(questionId) => this.handleAnswerDownvote(questionId)}
                date={answer.date}
                key={key}
                upvoted={
                  answer.upvotedBy.includes(this.props.user.uid) ? true : false
                }
                downvoted={
                  answer.downvotedBy.includes(this.props.user.uid)
                    ? true
                    : false
                }
                id={answer.id}
                questionId={answer.questionId}
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
  upvoteQuestion,
  downvoteQuestion,
  upvoteAnswer,
  downvoteAnswer,
};
export default connect(mapState, actionCreators)(Question);
