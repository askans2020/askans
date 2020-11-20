import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";

const setUser = createAsyncThunk("user/setUser", async (userId) => {
  let userData = {};
  await db
    .collection("Users")
    .doc(userId)
    .get()
    .then((user) => {
      userData = user.data();
    });

  return userData;
});
const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileInfo) => {
    const { userId, firstName, lastName, gender, language } = profileInfo;
    await db.collection("Users").doc(userId).update({
      firstName,
      lastName,
      language,
      gender,
    });
    let user = await db.collection("Users").doc(userId).get();
    user = user.data();
    return user;
  }
);
const updateBio = createAsyncThunk("user/updateBio", async (bioInfo) => {
  const { userId, bio } = bioInfo;
  await db.collection("Users").doc(userId).update({
    bio,
  });
  let user = await db.collection("Users").doc(userId).get();
  user = user.data();
  return user;
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
    [updateProfile.fulfilled]: (state, action) => {
      state = action.payload;
      return state;
    },
    [updateBio.fulfilled]: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeFirstName, changeLastName } = userSlice.actions;
export { setUser, updateProfile, updateBio };
export default userSlice.reducer;
