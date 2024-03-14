import { configureStore } from "@reduxjs/toolkit";
import todolist from "./todo.js";

const store = configureStore({
  reducer: {
    todos: todolist,
  },
});

export default store;
