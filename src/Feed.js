import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header, Avatar, Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import HorizontalTopics from "./components/HorizontalTopics";
import QuestionCard from "./components/QuestionCard";

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
        question:
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
        question:
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
        question:
          "Instagram was designed as an app to create content via a mobile device. As a result, it is only practical to use one of the various scheduling tools available, so that you can post systematically. By the help of using an editorial calendar, you are able to schedule regular posts in advance, to keep your followers engaged.",
        upvotes: 432,
        downvotes: 12,
        answers: 58,
        upvoted: false,
      },
    ],
    topics: [
      "Technology",
      "Science",
      "Math",
      "Artificial Intelligence",
      "Programming",
      "Jocks",
    ],
  };

  handleUpvote = (questionId) => {
    let questions = this.state.questions;

    let newVals = questions.map((q) => {
      if (q.id == questionId) {
        q.upvotes += q.upvoted ? -1 : 1;
        q.upvoted = !q.upvoted;
      }
      return q;
    });

    this.setState({
      questions: newVals,
    });
  };

  handleDownvote = (questionId) => {
    let questions = this.state.questions;

    let newVals = questions.map((q) => {
      if (q.id == questionId) {
        q.downvotes++;
      }
      return q;
    });

    this.setState({
      questions: newVals,
    });
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
          <HorizontalTopics topics={this.state.topics} />

          {this.state.questions.map((question, key) => {
            return (
              <QuestionCard
                name={question.name}
                profileImage={question.profileImage}
                title={question.title}
                question={question.question}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                answers={question.answers}
                date={question.date}
                key={key}
                navigation={this.props.navigation}
                upvote={(questionId) => this.handleUpvote(questionId)}
                downvote={(questionId) => this.handleDownvote(questionId)}
                upvoted={question.upvoted}
                id={question.id}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Feed;
