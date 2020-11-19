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

const upvoteQuestion = createAsyncThunk(
  "question/upvoteQuestion",
  async (questionInfo) => {
    const { userId, questionId } = questionInfo;
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
    return question;
  }
);

const downvoteQuestion = createAsyncThunk(
  "question/downvoteQuesion",
  async (questionInfo) => {
    const { questionId, userId } = questionInfo;

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
    return question;
  }
);

const upvoteAnswer = createAsyncThunk(
  "question/upvoteAnswer",
  async (answerInfo) => {
    const { userId, answerId } = answerInfo;
    let answer = await db.collection("Answers").doc(answerId).get();

    if (answer.data().upvotedBy.includes(userId)) {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayRemove(userId),
        upvotes: firestore.FieldValue.increment(-1),
      });
    } else if (answer.data().downvotedBy.includes(userId)) {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayUnion(userId),
        downvotedBy: firestore.FieldValue.arrayRemove(userId),
        upvotes: firestore.FieldValue.increment(1),
        downvotes: firestore.FieldValue.increment(-1),
      });
    } else {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        upvotedBy: firestore.FieldValue.arrayUnion(userId),
        upvotes: firestore.FieldValue.increment(1),
      });
    }
    answer = await db.collection("Answers").doc(answerId).get();
    answer = answer.data();
    answer.timestamp = new Date(answer.timestamp).toLocaleDateString();
    answer.date = answer.timestamp;
    return answer;
  }
);

const downvoteAnswer = createAsyncThunk(
  "question/upvoteAnswer",
  async (answerInfo) => {
    const { userId, answerId } = answerInfo;
    let answer = await db.collection("Answers").doc(answerId).get();

    if (answer.data().upvotedBy.includes(userId)) {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        upvotes: firestore.FieldValue.increment(-1),
        upvotedBy: firestore.FieldValue.arrayRemove(userId),
        downvotes: firestore.FieldValue.increment(1),
        downvotedBy: firestore.FieldValue.arrayUnion(userId),
      });
    } else if (answer.data().downvotedBy.includes(userId)) {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        downvotes: firestore.FieldValue.increment(-1),
        downvotedBy: firestore.FieldValue.arrayRemove(userId),
      });
    } else {
      const ref = db.collection("Answers").doc(answerId);
      await ref.update({
        downvotes: firestore.FieldValue.increment(1),
        downvotedBy: firestore.FieldValue.arrayUnion(userId),
      });
    }
    answer = await db.collection("Answers").doc(answerId).get();
    answer = answer.data();
    answer.timestamp = new Date(answer.timestamp).toLocaleDateString();
    answer.date = answer.timestamp;
    return answer;
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
    [upvoteQuestion.fulfilled]: (state, action) => {
      state.question.upvotedBy = action.payload.upvotedBy;
      state.question.downvotedBy = action.payload.downvotedBy;
      state.question.upvotes = action.payload.upvotes;
      state.question.downvotes = action.payload.downvotes;
      return state;
    },
    [downvoteQuestion.fulfilled]: (state, action) => {
      state.question.upvotedBy = action.payload.upvotedBy;
      state.question.downvotedBy = action.payload.downvotedBy;
      state.question.upvotes = action.payload.upvotes;
      state.question.downvotes = action.payload.downvotes;
      return state;
    },
    [upvoteAnswer.fulfilled]: (state, action) => {
      state.answers.map((answer) => {
        if (answer.id == action.payload.id) {
          answer.upvotedBy = action.payload.upvotedBy;
          answer.downvotedBy = action.payload.downvotedBy;
          answer.upvotes = action.payload.upvotes;
          answer.downvotes = action.payload.downvotes;
        }
        return answer;
      });
      return state;
    },
    [downvoteAnswer.fulfilled]: (state, action) => {
      state.answers.map((answer) => {
        if (answer.id == action.payload.id) {
          answer.upvotedBy = action.payload.upvotedBy;
          answer.downvotedBy = action.payload.downvotedBy;
          answer.upvotes = action.payload.upvotes;
          answer.downvotes = action.payload.downvotes;
        }
        return answer;
      });
      return state;
    },
  },
});

export {
  getQuestionById,
  answerQuestion,
  getQuestionAnswers,
  upvoteQuestion,
  downvoteQuestion,
  upvoteAnswer,
  downvoteAnswer,
};
export default questionSlicer.reducer;
