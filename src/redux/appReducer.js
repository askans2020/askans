import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLanguage: "",
  app: {},
  language: [
    {
      language: "English",
      selectLanguage: "Select Language",
      next: "Next",
      emailAddress: "Email Address",
      password: "Password",
      signIn: "Sign In",
      dontHaveAnAccount: "You don't have an account?",
      signUpHere: "Sign Up Here",
      checkPassOrEmail: "Check your password or email",
      firstName: "First name",
      lastName: "Last name",
      signUp: "Sign Up",
      haveAcnt: "You already have an account?",
      signUpErr: "Make sure you filled all the required fields",
      signInHere: "Sign In Here",
      upvotes: "upvotes",
      downvotes: "downvotes",
      answers: "answers",
      askQuestion: "Ask Question",
      addQuestionTitle: "Add question title.",
      addQuestionDetail: "Add more details for your question.",
      attachImage: "Attach an image",
      removeImage: "Image Attached(Click to remove)",
      selectCategory: "Select Category",
      ask: "Ask",
      ANSWER_QUESTION: "answered your question.",
      UPVOTE_QUESTION: "upvoted your question.",
      DOWNVOTE_QUESTION: "downvoted your question.",
      DOWNVOTE_ANSWER: "downvoted your answer.",
      UPVOTE_ANSWER: "upvoted your answer.",
      updateBio: "Update bio...",
      updateBioButton: "Update bio",
      languageName: "Language",
      MALE: "MALE",
      FEMALE: "FEMALE",
      gender: "Gender",
      updateInfo: "Update info",
      answersTitle: "Answers",
      answerPlaceHolder: "Answer...",
    },
    {
      language: "Amharic",
      selectLanguage: "ቋንቋ ይምረጡ",
      next: "ቀጣይ",
      emailAddress: "የ ኢሜል አድራሻ",
      password: "የይለፍ ቃል",
      signIn: "ግባ",
      dontHaveAnAccount: "መለያ የለዎትም?",
      signUpHere: "እዚህ ይመዝገቡ",
      checkPassOrEmail: "የይለፍ ቃልዎን ወይም ኢሜልዎን ያረጋግጡ",
      firstName: "የመጀመሪያ ስም",
      lastName: "የአያት ሥም",
      signUp: "ይመዝገቡ",
      haveAcnt: "ቀድሞውኑ መለያ አለዎት?",
      signUpErr: "ሁሉንም አስፈላጊ መስኮች እንደሞሉ ያረጋግጡ",
      signInHere: "እዚህ ይግቡ",
      upvotes: "ከፍ",
      downvotes: "ዝቅ",
      answers: "መልሶች",
      askQuestion: "ጥያቄን ይጠይቁ",
      addQuestionTitle: "የጥያቄ ርዕስ ያክሉ።",
      addQuestionDetail: "ለጥያቄዎ ተጨማሪ ዝርዝሮችን ያክሉ።",
      attachImage: "ምስል ያያይዙ",
      removeImage: "ምስል ተያይዙል (ለማስወገድ ጠቅ ያድርጉ)",
      selectCategory: "ምድብ ይምረጡ",
      ask: "ጠይቅ",
      ANSWER_QUESTION: "ለጥያቄህ መልስ ሰጠ ፡፡",
      UPVOTE_QUESTION: "ጥያቄዎን ከፍ አድርገውታል።",
      DOWNVOTE_QUESTION: "ጥያቄዎን ዝቅ አድርገውታል።",
      DOWNVOTE_ANSWER: "መልስዎን ዝቅ አድርገዋል",
      UPVOTE_ANSWER: "መልስዎን ከፍ አድርገዋል",
      updateBio: "የህይወት ታሪክን ያዘምኑ...",
      updateBioButton: "አዘምን",
      languageName: "ቋንቋ",
      MALE: "ወንድ",
      FEMALE: "ሴት",
      gender: "ፆታ",
      updateInfo: "መረጃን ያዘምኑ",
      answersTitle: "መልሶች",
      answerPlaceHolder: "መልስ...",
    },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLanguage: (state, action) => {
      state.language.map((language) => {
        if (language.language == action.payload) {
          state.app = language;
          state.selectedLanguage = language.language;
        }
      });
      return state;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      return state;
    },
  },
});

export const { setAppLanguage, setSelectedLanguage } = appSlice.actions;
export default appSlice.reducer;
