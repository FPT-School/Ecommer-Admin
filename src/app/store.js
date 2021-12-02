import { configureStore } from '@reduxjs/toolkit';
import counter from 'features/counter/counterSlice';
import auth from 'features/authSlice';

export const store = configureStore({
  reducer: {
    counter,
    auth,
  },
});
