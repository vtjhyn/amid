import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/user`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.put(`/profile/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: {},
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileDataFromLocalStorage: (state) => {
      state.data = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      const cleanData = {...action.payload};
      delete cleanData.hashedPassword
      state.data = cleanData;
      localStorage.setItem("user", JSON.stringify(cleanData));
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const { setProfileDataFromLocalStorage } = userSlice.actions;
