import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getAdminData = createAsyncThunk(
  "admin/getAdminData",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/user`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/api/admin`, payload);
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

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setProfileDataFromLocalStorage: (state) => {
      state.data = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAdminData.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAdminData.fulfilled, (state, action) => {
      state.isLoading = false;
      const cleanData = {...action.payload};
      delete cleanData.hashedPassword
      state.data = cleanData;
      localStorage.setItem("admin", JSON.stringify(cleanData));
    });
    builder.addCase(addAdmin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const { setProfileDataFromLocalStorage } = adminSlice.actions;
