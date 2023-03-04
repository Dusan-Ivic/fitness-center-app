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

export const createTraining = createAsyncThunk(
  "trainings/createTraining",
  async (trainingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      return await trainingsService.createTraining(trainingData, token);
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

export const updateTraining = createAsyncThunk(
  "trainings/updateTraining",
  async (trainingData, thunkAPI) => {
    try {
      const id = trainingData.id;
      const token = thunkAPI.getState().users.token;
      return await trainingsService.updateTraining(id, trainingData, token);
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

export const deleteTraining = createAsyncThunk(
  "trainings/deleteTraining",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.token;
      return await trainingsService.deleteTraining(id, token);
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
      })
      .addCase(createTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trainings.push(action.payload.data);
      })
      .addCase(createTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trainings = state.trainings.map((training) => {
          if (training._id === action.payload.data._id) {
            return action.payload.data;
          }
          return training;
        });
      })
      .addCase(updateTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.trainings = state.trainings.filter(
          (training) => training._id !== action.payload.data._id
        );
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = trainingsSlice.actions;
export default trainingsSlice.reducer;
