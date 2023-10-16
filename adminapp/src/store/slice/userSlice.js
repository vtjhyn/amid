import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/api/users`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/api/users`, payload);
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
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      localStorage.setItem("user", JSON.stringify(state.data));
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
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
