import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainersService from "./trainersService";

const initialState = {
  trainers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getEmployedTrainers = createAsyncThunk(
  "centers/getEmployedTrainers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      return await trainersService.getEmployedTrainers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployedTrainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployedTrainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trainers = action.payload.data;
      })
      .addCase(getEmployedTrainers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = trainersSlice.actions;
export default trainersSlice.reducer;
