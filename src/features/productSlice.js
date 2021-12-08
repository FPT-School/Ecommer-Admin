import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'apis/productApi';

export const getProductAsync = createAsyncThunk(
  'get/product',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApi.get(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const getProductByIdAsync = createAsyncThunk(
  'get/product-by-id',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  'create/product',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await productApi.add(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'update/product',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await productApi.update(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const removeProductAsync = createAsyncThunk(
  'remove/product',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await productApi.remove(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const initialState = {
  isLoading: false,
  productList: [],
};

export const productSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getProductAsync.pending]: (state) => {
      state.isLoading = true;
    },

    [getProductAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.results;
    },

    [getProductAsync.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
