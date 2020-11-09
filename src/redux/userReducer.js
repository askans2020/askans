import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";

const setUser = createAsyncThunk("user/setUser", async (userId) => {
  let userData = {};
  console.log(1234);
  await db
    .collection("Users")
    .doc(userId)
    .get()
    .then((user) => {
      userData = user.data();
    });

  return userData;
});
const initialState = {
  firstName: "Henok",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeFirstName: (state) => ({ ...state, firstName: "Heni" }),
    changeLastName: (state) => ({ ...state, lastName: "Best" }),
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      console.log("Called");
      state.firstName = "Henokaa";
    },
  },
});

export const { changeFirstName, changeLastName } = userSlice.actions;
export { setUser };
export default userSlice.reducer;
