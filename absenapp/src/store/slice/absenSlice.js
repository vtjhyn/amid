import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getAbsenList = createAsyncThunk(
  "absen/getAbsenList",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/api/absen/${payload}`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAbsen = createAsyncThunk(
  "absen/addAbsen",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/api/absen/${payload.id}`, payload);
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

export const absenSlice = createSlice({
  name: "absen",
  initialState,
  reducers: {
    setAbsenDataFromLocalStorage: (state) => {
      state.data = JSON.parse(localStorage.getItem("absen"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAbsenList.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAbsenList.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAbsenList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      localStorage.setItem("absen", JSON.stringify(state.data));
    });
    builder.addCase(addAbsen.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAbsen.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addAbsen.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const { setAbsenDataFromLocalStorage } = absenSlice.actions;

export default absenSlice.reducer;
