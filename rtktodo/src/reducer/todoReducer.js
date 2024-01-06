import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Math.floor(Math.random() * 100000),
            content: action.payload.content,
          },
        ],
      };
    },
    deleteTodo: (state, action) => {
      return { ...state, todos: state.todos.filter((el) => el.id !== action.payload.id) };
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((el) => el.id === action.payload.id);
      todo.content = action.payload.content;
      return state;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;

/*
createSlice에서 reducer 함수 안에서 state를 직접적으로 변경하는 대신, 새로운 state를 반환하는 방식으로 업데이트를 해야 합니다.
여기서 중요한 부분은 addTodo reducer에서 새로운 state를 반환하도록 수정한 것입니다. 
새로운 state는 기존 state를 복사한 후, todos 배열에 새로운 항목을 추가하여 업데이트되었습니다.
*/
