import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from 'apis/orderApi';

export const getOrderAsync = createAsyncThunk(
  'get/product',
  async (params, { rejectWithValue }) => {
    try {
      const response = await orderApi.get(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);