import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { userSlice } from "./slice/userSlice";
import absenReducer from './slice/absenSlice'
import { adminSlice } from "./slice/adminSlice";

const reducers = combineReducers({
  auth: authReducer,
  [userSlice.name]: userSlice.reducer,
  [adminSlice.name]: adminSlice.reducer,
  absen: absenReducer
});

export default reducers;
