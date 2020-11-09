import { combineReducers, createReducer, createAction } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;
