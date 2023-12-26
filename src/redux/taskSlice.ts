import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChangeTask, ITask, TaskType } from "./types";

const initialState: TaskType = {
  taskList: [],
  isEdit: false,
  isError: false,
  valueInput: "",
  valueTask: "",
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.taskList.unshift(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.taskList = state.taskList.filter((_, i) => i !== action.payload);
    },
    statusTask: (state, action: PayloadAction<number>) => {
      state.taskList[action.payload].isDone =
        !state.taskList[action.payload].isDone;
    },
    sortTask: (state) => {
      state.taskList = [...state.taskList].sort((a, b) => {
        const x = a.task.toLowerCase();
        const y = b.task.toLocaleLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    sortTaskDate: (state) => {
      state.taskList = [...state.taskList].sort((a, b) => {
        const x = a.date;
        const y = b.date;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    setIsEdit: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.taskList[action.payload].isEdit = true;
    },
    changeTask: (state, action: PayloadAction<IChangeTask>) => {
      state.taskList[action.payload.index].task = action.payload.valueTask;
      state.taskList[action.payload.index].isEdit = false;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setIsValueInput: (state, action: PayloadAction<string>) => {
      state.valueInput = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTask,
  deleteTask,
  statusTask,
  sortTask,
  sortTaskDate,
  setIsEdit,
  changeTask,
  setIsError,
  setIsValueInput,
} = taskSlice.actions;
export const taskList = (state: RootState) => state.task.taskList;
export const valueInput = (state: RootState) => state.task.valueInput;
export const isError = (state: RootState) => state.task.isError;

export default taskSlice.reducer;
