import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";
const QuestionCard = (props) => {
  const {
    id,
    name,
    date,
    profileImage,
    title,
    text,
    upvotes,
    downvotes,
    answers,
    navigation,
    upvote,
    downvote,
    upvoted,
    downvoted,
    askedBy,
    userId,
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
            onPress={() =>
              userId == askedBy
                ? navigation.navigate("Profile")
                : navigation.navigate("UsersProfile", { userId: askedBy })
            }
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text
            onPress={() =>
              userId == askedBy
                ? navigation.navigate("Profile")
                : navigation.navigate("UsersProfile", { userId: askedBy })
            }
          >
            {name}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text>{date}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ margin: 5, padding: 5 }}
        onPress={() => navigation.navigate("Question", { questionId: id })}
      >
        <Text style={{ fontWeight: "600", marginBottom: 8, fontSize: 18 }}>
          {title}
        </Text>
        <Text>{text}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", padding: 5, alignItems: "center" }}>
        <View style={{ paddingLeft: 5, flexDirection: "row" }}>
          <Icon
            name="thumbs-up"
            type="font-awesome"
            onPress={() => upvote(id)}
            iconStyle={upvoted ? { color: "blue" } : { color: "black" }}
          />
          <Text style={{ paddingTop: 5, paddingLeft: 5 }}>
            {upvotes} upvotes
          </Text>
        </View>
        <View style={{ paddingLeft: 15, flexDirection: "row" }}>
          <Icon
            name="thumbs-down"
            type="font-awesome"
            onPress={() => downvote(id)}
            iconStyle={downvoted ? { color: "blue" } : { color: "black" }}
          />
          <Text style={{ paddingTop: 5, paddingLeft: 5 }}>
            {downvotes} downvotes
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 10,
            flex: 1,
            paddingTop: 5,
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
