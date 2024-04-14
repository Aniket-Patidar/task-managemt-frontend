import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/redux/sclice/user';
import taskReducer from './src/redux/sclice/task';

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  }
});
