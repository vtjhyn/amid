import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getAllAbsen = createAsyncThunk(
  "absen/getAbsenList",
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/api/absen`);
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
    builder.addCase(getAllAbsen.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAllAbsen.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllAbsen.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      localStorage.setItem("absen", JSON.stringify(state.data));
    });
  },
});

export const { setAbsenDataFromLocalStorage } = absenSlice.actions;

export default absenSlice.reducer;
