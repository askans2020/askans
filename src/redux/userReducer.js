import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";

export const setUser = createAsyncThunk("user/setUser", async (userId) => {
  let userData = { firstName: "ssxsx" };
  await db
    .collection("Users")
    .doc(userId)
    .get()
    .then((user) => {
      userData = user.data();
    });

  return userData;
});

const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeFirstName: (state) => ({ ...state, firstName: "Heni" }),
    changeLastName: (state) => ({ ...state, lastName: "Tas" }),
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeFirstName, changeLastName } = userSlice.actions;
export default userSlice.reducer;
