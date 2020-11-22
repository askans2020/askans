import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
const getNotifications = createAsyncThunk("notifications/getNotifications", async(notificationInfo)=>{
  console.log(notificationInfo)
})
const initialState = {};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
  },
  extraReducers: {
    },

});
export{
  getNotifications
}
export default notificationsSlice.reducer;