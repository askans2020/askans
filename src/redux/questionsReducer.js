import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase, { db } from "../../firebaseConfig";

const askQuestion = createAsyncThunk(
  "questions/askQuestion",
  async (questionInfo) => {
    const ref = db.collection("Questions").doc();
    const { userId, title, description, category, language } = questionInfo;

    let questionData = {
      id: ref.id,
      askedBy: userId,
      title: title,
      description: description,
      category: category,
      language: language,
      answersCount: 0,
      upvoteCount: 0,
      downvoteCount: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await ref.set(questionData);
  }
);

const getQuestionsByLanguage = createAsyncThunk(
  "questions/getQuestionsByLanguage",
  async (language) => {
    const questions = [];
    await db
      .collection("Questions")
      .where("language", "==", language)
      .get()
      .then((data) => {
        data.forEach((question) => {
          question = question.data();
          questions.push(question);
        });
      });
    return questions;
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
