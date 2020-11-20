import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "firebase";
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
      upvotedBy: [],
      downvotedBy: [],
    };
    await ref.set(questionData);
    questionData.timestamp = new Date(
      firebase.firestore.Timestamp.now().seconds * 1000
    ).toLocaleDateString();
    let user = await db.collection("Users").doc(userId).get();
    user = user.data();
    questionData.name = user.firstName + " " + user.lastName;
    questionData.profileImage = user.photoURL;
    questionData.date = questionData.timestamp;
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
      question.date = question.timestamp;
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

const upvoteQuestion = createAsyncThunk(
  "questions/upvoteQuestion",
  async (questionInfo) => {
    const { userId, questionId, askedBy } = questionInfo;
    let question = await db.collection("Questions").doc(questionId).get();

    if (question.data().upvotedBy.includes(userId)) {
      const ref = db.collection("Questions").doc(questionId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayRemove(userId),
        upvotes: firestore.FieldValue.increment(-1),
      });
    } else if (question.data().downvotedBy.includes(userId)) {
      const ref = db.collection("Questions").doc(questionId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayUnion(userId),
        downvotedBy: firestore.FieldValue.arrayRemove(userId),
        upvotes: firestore.FieldValue.increment(1),
        downvotes: firestore.FieldValue.increment(-1),
      });
    } else {
      const ref = db.collection("Questions").doc(questionId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayUnion(userId),
        upvotes: firestore.FieldValue.increment(1),
      });
    }

    question = await db.collection("Questions").doc(questionId).get();
    question = question.data();
    question.timestamp = new Date(question.timestamp).toLocaleDateString();
    question.date = question.timestamp;

    let notif = await db
      .collection("Notifications")
      .where("notifier", "==", userId)
      .where("questionId", "==", questionId)
      .get();
    let notifList = [];
    notif.forEach((notification) => {
      notifList.push(notification.data());
    });

    for (let notification of notifList) {
      if (notification.type != "ANSWER_QUESTION") {
        await db.collection("Notifications").doc(notification.id).delete();
      }
    }

    if (question.upvotedBy.includes(userId) && userId != askedBy) {
      if (userId != askedBy) {
        const ref = db.collection("Notifications").doc();
        const notificationInfo = {
          id: ref.id,
          notify: askedBy,
          notifier: userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: "UPVOTE_QUESTION",
          questionId: questionId,
          message: "upvoted your question.",
          seen: false,
        };
        await ref.set(notificationInfo);
      }
    }
    return question;
  }
);

const downvoteQuestion = createAsyncThunk(
  "questions/downvoteQuesion",
  async (questionInfo) => {
    const { questionId, userId, askedBy } = questionInfo;

    let question = await db.collection("Questions").doc(questionId).get();
    question = question.data();
    if (
      !question.upvotedBy.includes(userId) &&
      !question.downvotedBy.includes(userId)
    ) {
      let ref = db.collection("Questions").doc(questionId);
      await ref.update({
        downvotes: firestore.FieldValue.increment(1),
        downvotedBy: firestore.FieldValue.arrayUnion(userId),
      });
    } else if (question.upvotedBy.includes(userId)) {
      let ref = db.collection("Questions").doc(questionId);
      await ref.update({
        upvotes: firestore.FieldValue.increment(-1),
        upvotedBy: firestore.FieldValue.arrayRemove(userId),
        downvotes: firestore.FieldValue.increment(1),
        downvotedBy: firestore.FieldValue.arrayUnion(userId),
      });
    } else {
      let ref = db.collection("Questions").doc(questionId);
      await ref.update({
        downvotes: firestore.FieldValue.increment(-1),
        downvotedBy: firestore.FieldValue.arrayRemove(userId),
      });
    }

    question = await db.collection("Questions").doc(questionId).get();
    question = question.data();
    question.timestamp = new Date(question.timestamp).toLocaleDateString();
    question.date = question.timestamp;

    let notif = await db
      .collection("Notifications")
      .where("notifier", "==", userId)
      .where("questionId", "==", questionId)
      .get();
    let notifList = [];
    notif.forEach((notification) => {
      notifList.push(notification.data());
    });

    for (let notification of notifList) {
      if (notification.type != "ANSWER_QUESTION") {
        await db.collection("Notifications").doc(notification.id).delete();
      }
    }

    if (question.downvotedBy.includes(userId) && userId != askedBy) {
      if (userId != askedBy) {
        const ref = db.collection("Notifications").doc();
        const notificationInfo = {
          id: ref.id,
          notify: askedBy,
          notifier: userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          type: "DOWNVOTE_QUESTION",
          questionId: questionId,
          message: "downvoted your question.",
          seen: false,
        };
        await ref.set(notificationInfo);
      }
    }

    return question;
  }
);

const initialState = {
  questions: [],
  question: {},
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: {
    [askQuestion.fulfilled]: (state, action) => {
      state.questions = [action.payload, ...state.questions];
      console.log("Question Asked");
      //TODO: Push the new question asked
      return state;
    },
    [getQuestionsByLanguage.fulfilled]: (state, action) => {
      state.questions = action.payload;
      console.log("Question fetched");
      return state;
    },
    [upvoteQuestion.fulfilled]: (state, action) => {
      state.questions.map((question) => {
        if (question.id == action.payload.id) {
          question.upvotedBy = action.payload.upvotedBy;
          question.downvotedBy = action.payload.downvotedBy;
          question.upvotes = action.payload.upvotes;
          question.downvotes = action.payload.downvotes;
        }
        return question;
      });
      return state;
    },
    [downvoteQuestion.fulfilled]: (state, action) => {
      state.questions.map((question) => {
        if (question.id == action.payload.id) {
          question.upvotes = action.payload.upvotes;
          question.upvotedBy = action.payload.upvotedBy;
          question.downvotes = action.payload.downvotes;
          question.downvotedBy = action.payload.downvotedBy;
        }
        return question;
      });
      return state;
    },
  },
});

export {
  askQuestion,
  getQuestionsByLanguage,
  upvoteQuestion,
  downvoteQuestion,
};
export default questionsSlice.reducer;
