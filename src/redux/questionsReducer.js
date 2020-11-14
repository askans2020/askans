import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase, { db } from "../../firebaseConfig";

const askQuestion = createAsyncThunk(
  "questions/askQuestion",
  async (questionInfo) => {
    const ref = db.collection("Questions").doc();
    const { userId, title, text, category, language } = questionInfo;

    let questionData = {
      id: ref.id,
      askedBy: userId,
      title: title,
      text: text,
      category: category,
      language: language,
      answers: 0,
      upvotes: 0,
      downvotes: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      hasImage: false,
      imageLink: "",
    };
    console.log(questionData);
    await ref.set(questionData);
    questionData.timestamp = new Date(
      firebase.firestore.Timestamp.now().seconds * 1000
    ).toLocaleDateString();
    return questionData;
  }
);

const getQuestionsByLanguage = createAsyncThunk(
  "questions/getQuestionsByLanguage",
  async (language) => {
    const questions = await db
      .collection("Questions")
      .where("language", "==", language)
      .get();
    let asked_questions = [];
    questions.forEach((question) => {
      question = question.data();
      question.timestamp = new Date(
        question.timestamp.toDate()
      ).toLocaleDateString();
      asked_questions.push(question);
    });

    for (let question of asked_questions) {
      let user = await db.collection("Users").doc(question.askedBy).get();
      user = user.data();
      question.name = user.firstName + " " + user.lastName;
      question.profileImage = user.photoURL;
    }
    return asked_questions;
  }
);
const initialState = {
  questions: [],
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: {
    [askQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
      console.log("Question Asked");
      //TODO: Push the new question asked
      return state;
    },
    [getQuestionsByLanguage.fulfilled]: (state, action) => {
      state.questions = action.payload;
      console.log("Question fetched");
      return state;
    },
  },
});

export { askQuestion, getQuestionsByLanguage };
export default questionsSlice.reducer;
