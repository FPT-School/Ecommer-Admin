import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imageApi from 'apis/imageApi';

export const postImageAsync = createAsyncThunk(
  'create/image',
  async (data, { rejectWithValue }) => {
    try {
      const response = await imageApi.add(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
