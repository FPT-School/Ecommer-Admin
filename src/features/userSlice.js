import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'apis/userApi';

export const getUserAsync = createAsyncThunk(
  'user/get',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.get(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'user/get',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.add(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const getUserByIdAsync = createAsyncThunk(
  'user/get-detail',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.getById(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.update(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'user/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.remove(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
