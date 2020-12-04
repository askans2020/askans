import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLanguage: "",
  app: {},
  languages: [
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
      signIn: "ይግቡ",
      dontHaveAnAccount: "አካውንት የለዎትም?",
      signUpHere: "እዚህ ይመዝገቡ",
      checkPassOrEmail: "የይለፍ ቃልዎን ወይም ኢሜልዎን ያረጋግጡ",
      firstName: "የመጀመሪያ ስም",
      lastName: "የአያት ሥም",
      signUp: "ይመዝገቡ",
      haveAcnt: "ከዚህ በፊት አካውንት ነበርዎት?",
      signUpErr: "ሁሉንም አስፈላጊ መስኮች እንደሞሉ ያረጋግጡ",
      signInHere: "እዚህ ይግቡ",
      upvotes: "ከፍ",
      downvotes: "ዝቅ",
      answers: "መልሶች",
      askQuestion: "ጥያቄን ይጠይቁ",
      addQuestionTitle: "የጥያቄ ርዕስ ያክሉ።",
      addQuestionDetail: "ለጥያቄዎ ተጨማሪ ዝርዝሮችን ያክሉ።",
      attachImage: "ምስል ያያይዙ",
      removeImage: "ምስል ተያይዟል (ለማጥፋት ይህንን ይጫኑ)",
      selectCategory: "ምድብ ይምረጡ",
      ask: "ይጠይቁ",
      ANSWER_QUESTION: "ለጥያቄዎ መልስ ሰጥተዋል፡፡",
      UPVOTE_QUESTION: "ጥያቄዎን ከፍ አድርገውታል።",
      DOWNVOTE_QUESTION: "ጥያቄዎን ዝቅ አድርገውታል።",
      DOWNVOTE_ANSWER: "መልስዎን ዝቅ አድርገዋል",
      UPVOTE_ANSWER: "መልስዎን ከፍ አድርገዋል",
      updateBio: "ፅሁፎን ያድሱ...",
      updateBioButton: "ያድሱ",
      languageName: "ቋንቋ",
      MALE: "ወንድ",
      FEMALE: "ሴት",
      gender: "ፆታ",
      updateInfo: "መረጃዎን ያድሱ",
      answersTitle: "መልሶች",
      answerPlaceHolder: "መልስ...",
    },
    {
      language: "Oromiffa",
      selectLanguage: "Afaan filadha",
      next: "Ittanaa",
      emailAddress: "Tessoo imelaa",
      password: "passworda",
      signIn: "seeni",
      dontHaveAnAccount: "galmee hinqabdanii?",
      signUpHere: "asiti galma'aa",
      checkPassOrEmail: "passowrda ykn imelaa keessan sirressaa",
      firstName: "Maqaa keessan",
      lastName: "Maqaa akakayyuu",
      signUp: "galma'aa",
      haveAcnt: "ቀድሞውኑ መለያ አለዎት?",
      signUpErr: "ሁሉንም አስፈላጊ መስኮች እንደሞሉ ያረጋግጡ",
      signInHere: "assi seenaa",
      upvotes: "harka kaasaa",
      downvotes: "hinfilatina",
      answers: "Deebii",
      askQuestion: "Gaaffii Gafadhaa",
      addQuestionTitle: "mataduree Gaaffii dabalaa",
      addQuestionDetail: "Gaaffii keessaan ibsaa",
      attachImage: "Fakkii maxansaa",
      removeImage: "Fakkii kaasaa",
      selectCategory: "Garee filadhaa",
      ask: "Gafadhuu",
      ANSWER_QUESTION: "Deebisi",
      UPVOTE_QUESTION: "Gaaffii Deggerii",
      DOWNVOTE_QUESTION: "Gaaffii kanhindeggeru",
      DOWNVOTE_ANSWER: "Deebii Deggerii",
      UPVOTE_ANSWER: "Deebii kanhindeggeru",
      updateBio: "Wa'ee keessan dabalaa",
      updateBioButton: "Sanduqa Wa'ee keessan dabalu",
      languageName: "Affaan",
      MALE: "Dhiira",
      FEMALE: "Dhalaa",
      gender: "Saala",
      updateInfo: "Odeffanno dabali",
      answersTitle: "Mataduree Deebii",
      answerPlaceHolder: "Iddoo Mataduree",
    },
    {
      language: "Spanish",
      selectLanguage: "Seleccione el idioma",
      next: "Próximo",
      emailAddress: "Dirección de correo electrónico",
      password: "Contraseña",
      signIn: "Registrarse",
      dontHaveAnAccount: "No tienes una cuenta?",
      signUpHere: "Registrate aquí",
      checkPassOrEmail: "Verifique su contraseña o correo electrónico",
      firstName: "Nombre de pila",
      lastName: "Apellido",
      signUp: "Regístrate",
      haveAcnt: "Ya tienes una cuenta?",
      signUpErr: "Asegúrese de completar todos los campos obligatorios",
      signInHere: "Firme aquí",
      upvotes: "votos a favor",
      downvotes: "votos negativos",
      answers: "respuestas",
      askQuestion: "Pregunta",
      addQuestionTitle: "Agregar título de pregunta",
      addQuestionDetail: "Agregue más detalles para su pregunta",
      attachImage: "Adjuntar una imagen",
      removeImage: "Imagen adjunta (haga clic para eliminar)",
      selectCategory: "selecciona una categoría",
      ask: "Pedir",
      ANSWER_QUESTION: "respondió tu pregunta.",
      UPVOTE_QUESTION: "votó a favor de su pregunta.",
      DOWNVOTE_QUESTION: "votó en contra de su pregunta.",
      DOWNVOTE_ANSWER: "votó en contra de su respuesta.",
      UPVOTE_ANSWER: "votó a favor de su respuesta.",
      updateBio: "Actualizar biografía...",
      updateBioButton: "Actualizar biografía",
      languageName: "Idioma",
      MALE: "HOMBRE",
      FEMALE: "HEMBRA",
      gender: "Género",
      updateInfo: "Actualizar información",
      answersTitle: "Respuestas",
      answerPlaceHolder: "Responder...",
    },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLanguage: (state, action) => {
      state.languages.map((language) => {
        if (language.language == action.payload) {
          state.app = language;
          state.selectedLanguage = language.language;
        }
        return language;
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
