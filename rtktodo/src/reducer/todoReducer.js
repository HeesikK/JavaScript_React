import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodo(state, action) {
      console.log(action);
      return state;
    },
  },
});

export const { getTodo } = todoSlice.actions;
