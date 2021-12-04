import { configureStore } from '@reduxjs/toolkit';
import counter from 'features/counter/counterSlice';
import auth from 'features/authSlice';
import color from 'features/colorSlice';
import category from 'features/categorySlice';
import product from 'features/productSlice';

export const store = configureStore({
  reducer: {
    counter,
    auth,
    color,
    category,
    product,
  },
});
