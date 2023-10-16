import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { userSlice } from "./slice/userSlice";
import absenReducer from './slice/absenSlice'

const reducers = combineReducers({
  auth: authReducer,
  [userSlice.name]: userSlice.reducer,
  absen: absenReducer
});

export default reducers;
