import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import colorApi from 'apis/colorApi';

export const getColorAsync = createAsyncThunk(
  'get/colors',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await colorApi.get();
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const getByIdAsync = createAsyncThunk(
  'getById/colors',
  async (id, { rejectWithValue }) => {
    try {
      const response = await colorApi.getById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const createColorAsync = createAsyncThunk(
  'create/colors',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await colorApi.add(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const updateColorAsync = createAsyncThunk(
  'update/colors',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await colorApi.update(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const removeColorAsync = createAsyncThunk(
  'remove/colors',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await colorApi.remove(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const initialState = {
  isLoading: false,
  colorList: [],
};

export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: {
    [getColorAsync.pending]: (state) => {
      state.isLoading = true;
    },

    [getColorAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.colorList = action.payload.results;
    },

    [getColorAsync.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default colorSlice.reducer;
