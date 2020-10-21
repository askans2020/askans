import React from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";

const QuestionCard = (props) => {
  const {
    name,
    date,
    profileImage,
    title,
    question,
    upvotes,
    downvotes,
    answers,
  } = props;

  return (
    <View
      style={{
        margin: 5,
        backgroundColor: "white",
        borderWidth: 0.25,
        borderColor: "gray",
        padding: 5,
        borderRadius: 5,
      }}
    >
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
              uri: profileImage,
            }}
            size="medium"
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>{name}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text>{date}</Text>
        </View>
      </View>
      <View style={{ margin: 5, padding: 5 }}>
        <Text style={{ fontWeight: "600", marginBottom: 8, fontSize: 18 }}>
          {title}
        </Text>
        <Text>{question}</Text>
      </View>
      <View style={{ flexDirection: "row", padding: 5, alignItems: "center" }}>
        <View style={{ paddingLeft: 5, flexDirection: "row" }}>
          <Icon name="thumbs-up" type="font-awesome" />
          <Text style={{ paddingTop: 5, paddingLeft: 5 }}>
            {upvotes} upvotes
          </Text>
        </View>
        <View style={{ paddingLeft: 15, flexDirection: "row" }}>
          <Icon name="thumbs-down" type="font-awesome" />
          <Text style={{ paddingTop: 5, paddingLeft: 5 }}>
            {downvotes} downvotes
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 15,
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {answers} Answers
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuestionCard;
