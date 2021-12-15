import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from 'apis/categoryApi';

export const getCategoryAsync = createAsyncThunk(
  'get/category',
  async (params, { rejectWithValue }) => {
    try {
      const response = await categoryApi.get(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
export const getByIdAsync = createAsyncThunk(
  'getById/category',
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  'create/category',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await categoryApi.add(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'update/category',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await categoryApi.update(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const removeCategoryAsync = createAsyncThunk(
  'remove/category',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await categoryApi.remove(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getCategoryAsync.pending]: (state) => {
      state.isLoading = true;
    },

    [getCategoryAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload.results;
    },

    [getCategoryAsync.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default categorySlice.reducer;
