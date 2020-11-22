import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import categoriesReducer from "./categoriesReducer";
import questionsReducer from "./questionsReducer";
import questionReducer from "./questionReducer";
import notificationsReducer from "./notificationsReducer"
const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  questions: questionsReducer,
  question: questionReducer,
  notifications: notificationsReducer
});

export default rootReducer;
