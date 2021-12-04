import { configureStore } from '@reduxjs/toolkit';
import counter from 'features/counter/counterSlice';
import auth from 'features/authSlice';
import color from 'features/colorSlice';

export const store = configureStore({
  reducer: {
    counter,
    auth,
    color,
  },
});
