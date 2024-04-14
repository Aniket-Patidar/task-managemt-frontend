import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/redux/sclice/user';

export const store = configureStore({
  reducer: {
    user: userReducer 
  }
});
