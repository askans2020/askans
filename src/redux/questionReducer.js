import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "firebase";
import firebase, { db } from "../../firebaseConfig";

const getQuestionById = createAsyncThunk(
  "question/getQuestionById",
  async (questionId) => {
    let question = await db.collection("Questions").doc(questionId).get();
    question = question.data();
    question.timestamp = new Date(
      question.timestamp.toDate()
    ).toLocaleDateString();
    question.date = question.timestamp;
    let user = await db.collection("Users").doc(question.askedBy).get();
    user = user.data();
    question.name = user.firstName + " " + user.lastName;
    question.profileImage = user.photoURL;
    return question;
  }
);
const answerQuestion = createAsyncThunk(
  "question/answerQuestion",
  async (answerParam) => {
    const { questionId, userId, answer, language } = answerParam;
    const ref = db.collection("Answers").doc();
    const answerData = {
      id: ref.id,
      questionId: questionId,
      answeredBy: userId,
      answer: answer,
      upvotes: 0,
      downvotes: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      language: language,
      upvotedBy: [],
      downvotedBy: [],
      hasImage: false,
      imageLink: "",
    };
    await ref.set(answerData);
    await db
      .collection("Questions")
      .doc(questionId)
      .update({
        answers: firebase.firestore.FieldValue.increment(1),
      });
    let answerInfo = await ref.get();
    answerInfo = answerInfo.data();
    answerInfo.timestamp = new Date(
      answerInfo.timestamp.toDate()
    ).toLocaleDateString();
    answerInfo.date = answerInfo.timestamp;
    let user = await db.collection("Users").doc(answerInfo.answeredBy).get();
    user = user.data();
    answerInfo.name = user.firstName + " " + user.lastName;
    answerInfo.profileImage = user.photoURL;
    return answerInfo;
  }
);

const getQuestionAnswers = createAsyncThunk(
  "question/getQuestionAnswers",
  async (questionId) => {
    let answers = await db
      .collection("Answers")
      .where("questionId", "==", questionId)
      .get();
    let answersData = [];
    answers.forEach((answer) => {
      answer = answer.data();
      answer.timestamp = new Date(
        answer.timestamp.toDate()
      ).toLocaleDateString();
      answer.date = answer.timestamp;
      answersData.push(answer);
    });

    for (let answer of answersData) {
      let user = await db.collection("Users").doc(answer.answeredBy).get();
      user = user.data();
      answer.name = user.firstName + " " + user.lastName;
      answer.profileImage = user.photoURL;
    }

    return answersData;
  }
);
const initialState = {
  question: {},
  answers: [],
};
const questionSlicer = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: {
    [getQuestionById.fulfilled]: (state, action) => {
      state.question = action.payload;
      return state;
    },
    [answerQuestion.fulfilled]: (state, action) => {
      state.answers.push(action.payload);
      state.question.answers += 1;
      return state;
    },
    [getQuestionAnswers.fulfilled]: (state, action) => {
      state.answers = action.payload;
      return state;
    },
  },
});

export { getQuestionById, answerQuestion, getQuestionAnswers };
export default questionSlicer.reducer;
