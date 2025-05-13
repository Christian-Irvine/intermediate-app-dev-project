import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizData: [],
};

const quizDataSlice = createSlice({
  name: "quizData",
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload; // ...state.cart is a shallow copy of the state.cart array. Shall copy is used to avoid mutating the state.cart array
    },
  },
});

export const { setQuizData } = quizDataSlice.actions; // .actions is an object that contains the action creator functions

export default quizDataSlice.reducer; // .reducer is a function that contains the reducer functions