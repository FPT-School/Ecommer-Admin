import { createAsyncThunk } from '@reduxjs/toolkit';
import analysisApi from 'apis/analysis';

export const getAnalysisOrders = createAsyncThunk(
  'get/analysisApi',
  async (params, { rejectWithValue }) => {
    try {
      const response = await analysisApi.getAllOrders(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const getAnalysisByModal = createAsyncThunk(
  'get/getAnalysisByModal',
  async (modal, { rejectWithValue }) => {
    try {
      const response = await analysisApi.analyticByModal(modal);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
