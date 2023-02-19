import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import centersService from "./centersService";

const initialState = {
  centers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOwnedCenters = createAsyncThunk(
  "centers/getOwnedCenters",
  async (id, thunkAPI) => {
    try {
      return await centersService.getOwnedCenters(id);
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

export const centersSlice = createSlice({
  name: "centers",
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
      .addCase(getOwnedCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOwnedCenters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.centers = action.payload.data;
      })
      .addCase(getOwnedCenters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = centersSlice.actions;
export default centersSlice.reducer;
