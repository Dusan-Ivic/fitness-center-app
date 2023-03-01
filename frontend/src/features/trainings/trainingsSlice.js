import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainingsService from "./trainingsService";

const initialState = {
  trainings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCreatedTrainings = createAsyncThunk(
  "trainings/getCreatedTrainings",
  async (id, thunkAPI) => {
    try {
      return await trainingsService.getCreatedTrainings(id);
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

export const trainingsSlice = createSlice({
  name: "trainings",
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
      .addCase(getCreatedTrainings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCreatedTrainings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trainings = action.payload.data;
      })
      .addCase(getCreatedTrainings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = trainingsSlice.actions;
export default trainingsSlice.reducer;
