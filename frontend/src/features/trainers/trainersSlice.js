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
  "trainers/getEmployedTrainers",
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

export const registerTrainer = createAsyncThunk(
  "trainers/registerTrainer",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      return await trainersService.registerTrainer(token, userData);
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

export const deleteTrainer = createAsyncThunk(
  "trainers/deleteTrainer",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      return await trainersService.deleteTrainer(id, token);
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
      })
      .addCase(registerTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trainers.push(action.payload.data);
      })
      .addCase(registerTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trainers = state.trainers.filter(
          (trainer) => trainer._id !== action.payload.data._id
        );
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = trainersSlice.actions;
export default trainersSlice.reducer;
