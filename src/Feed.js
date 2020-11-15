import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header, Avatar, Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import HorizontalTopics from "./components/HorizontalTopics";
import QuestionCard from "./components/QuestionCard";
import firebase, { db } from "../firebaseConfig";
import { setUser } from "./redux/userReducer";
import { getCategories } from "./redux/categoriesReducer";
import {
  getQuestionsByLanguage,
  upvoteQuestion,
  downvoteQuestion,
} from "./redux/questionsReducer";
import { connect } from "react-redux";

class Feed extends Component {
  state = {
    questions: [
      {
        id: 1,
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
        upvoted: false,
      },
      {
        id: 2,
        name: "Hiwot Doe",
        date: "MM/DD/YYYY",
        profileImage:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        title: "Post according to an editorial calendar?",
        text:
          "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
        upvotes: 432,
        downvotes: 12,
        answers: 58,
        upvoted: false,
      },
      {
        id: 3,
        name: "Henok Doe",
        date: "MM/DD/YYYY",
        profileImage:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        title: "Post according to an editorial?",
        text:
          "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
        upvotes: 432,
        downvotes: 12,
        answers: 58,
        upvoted: false,
      },
    ],
    topics: [],
  };

  fetchQuestionsByLanguage = async () => {
    const language = this.props.user.language;
    await this.props.getQuestionsByLanguage(language);
    this.setState({
      ...this.state,
      questions: this.props.questions,
    });
  };
  handleUpvote = async (questionId) => {
    const questionInfo = { userId: this.props.user.uid, questionId };
    await this.props.upvoteQuestion(questionInfo);
  };

  handleDownvote = async (questionId) => {
    const questionInfo = {
      userId: this.props.user.uid,
      questionId,
    };

    this.props.downvoteQuestion(questionInfo);
  };

  getCategories = async () => {
    if (this.props.user) {
      await this.props.getCategories(this.props.user.language);
    }
  };

  getUser = async () => {
    let uid = firebase.auth().currentUser.uid;
    await this.props.setUser(uid);
  };

  componentDidMount = async () => {
    await this.getUser();
    await this.getCategories();
    await this.fetchQuestionsByLanguage();
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

        <ScrollView
          style={{ flex: 1, padding: 5, paddingTop: 10, paddingBottom: 60 }}
        >
          {this.props.categories ? (
            <HorizontalTopics topics={this.props.categories.categories} />
          ) : null}

          {this.props.questions.map((question, key) => {
            return (
              <QuestionCard
                name={question.name}
                profileImage={question.profileImage}
                title={question.title}
                text={question.text}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                answers={question.answers}
                date={question.date}
                key={key}
                navigation={this.props.navigation}
                upvote={(questionId) => this.handleUpvote(questionId)}
                downvote={(questionId) => this.handleDownvote(questionId)}
                upvoted={
                  question.upvotedBy.includes(this.props.user.uid)
                    ? true
                    : false
                }
                downvoted={
                  question.downvotedBy.includes(this.props.user.uid)
                    ? true
                    : false
                }
                id={question.id}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    categories: state.categories,
    questions: state.questions.questions,
  };
};
const actionCreators = {
  setUser,
  getCategories,
  getQuestionsByLanguage,
  upvoteQuestion,
  downvoteQuestion,
};

export default connect(mapState, actionCreators)(Feed);
