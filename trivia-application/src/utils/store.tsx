import { configureStore } from "@reduxjs/toolkit";
import quizDataSliceReducer from "../slices/quizDataSlice";

export const store = configureStore({
  reducer: {
    data: quizDataSliceReducer,
  },
});