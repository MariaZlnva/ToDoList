import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  task: string;
  isDone: boolean;
  date: string;
}
export type TaskType = {
  taskList: ITask[];
  searchTaskList: ITask[];
  isEdit: boolean
}

const initialState: TaskType = {
    taskList: [],
    searchTaskList: [],
    isEdit: false
}
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<ITask>) => {
        state.taskList.unshift(action.payload)
      },
      deleteTask: (state, action: PayloadAction<number>) => {
        state.taskList = state.taskList.filter((_, i) => i !== action.payload)
      },
      statusTask: (state, action: PayloadAction<number>) => {
        state.taskList[action.payload].isDone = !state.taskList[action.payload].isDone
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
      searchTask: (state, action: PayloadAction<string>) => {
        state.searchTaskList = state.taskList.filter(item => item.task.toLowerCase().includes(action.payload))
      },
      resetSearchList: (state) => {
        state.searchTaskList = []
      },
      setIsEdit: (state) => {
        state.isEdit = true
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addTask, deleteTask, statusTask, sortTask, searchTask, resetSearchList, sortTaskDate, setIsEdit } = taskSlice.actions
  export const taskList = (state: RootState) => state.task.taskList
  export const searchTaskList = (state: RootState) => state.task.searchTaskList
  export const isEdit = (state: RootState) => state.task.isEdit

  export default taskSlice.reducer