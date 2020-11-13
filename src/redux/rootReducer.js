import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import categoriesReducer from "./categoriesReducer";
import questionsReducer from "./questionsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  questions: questionsReducer,
});

export default rootReducer;
