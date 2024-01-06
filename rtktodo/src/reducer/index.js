import { combineReducers } from "@reduxjs/toolkit";
import { todoSlice } from "./todoReducer";

export const rootReducer = combineReducers({ todo: todoSlice.reducer });
