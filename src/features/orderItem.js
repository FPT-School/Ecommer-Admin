import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderItemApi from 'apis/orderItemApi';

export const getOrderAsync = createAsyncThunk(
  'get/orderItemApi',
  async (params, { rejectWithValue }) => {
    try {
      const response = await orderItemApi.get(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const getByIdAsync = createAsyncThunk(
  'getById/orderItemApi',
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderItemApi.getById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const deleteAsync = createAsyncThunk(
  'deleteAsync/orderItemApi',
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderItemApi.remove(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
