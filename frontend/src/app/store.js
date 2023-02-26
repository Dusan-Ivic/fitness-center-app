import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import centersReducer from "../features/centers/centersSlice";
import trainersReducer from "../features/trainers/trainersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    centers: centersReducer,
    trainers: trainersReducer,
  },
});
