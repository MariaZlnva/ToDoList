import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import taskReducer from './taskSlice';
import { TypedUseSelectorHook } from 'react-redux';

 const store = configureStore({
  reducer: {
    task: taskReducer,

  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;