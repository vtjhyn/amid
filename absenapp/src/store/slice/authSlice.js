import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";
import { sessionSet } from "../../utils/session";

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/login`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  isLogin: false,
  isLoading: false,
};

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isLogin = false;
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.data = action.payload;
      sessionSet("token", action.payload.token, 720);
    });
  },
});

export default authSLice.reducer;
