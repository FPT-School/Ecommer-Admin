import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import authApi from 'apis/authApi';
import { JODY } from 'config';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

// export const registerAsync = createAsyncThunk(
//   'auth/register',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await authApi.register(payload);
//       console.log(response, 'response');
//       return response;
//     } catch (err) {
//       return rejectWithValue(err.data);
//     }
//   }
// );

// export const logoutAsync = createAsyncThunk('auth/logout', async () => {
//   const response = await authApi.logout();
//   return response;
// });

// export const getProfileAsync = createAsyncThunk(
//   'auth/fetchProfile',
//   async () => {
//     const response = await profileApi.getProfile();
//     return response;
//   }
// );

const initialState = {
  logging: false,
  isLoggedIn: Boolean(localStorage.getItem(JODY)) || false,
  profile: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.logging = true;
    });

    builder.addCase(loginAsync.fulfilled, (state) => {
      state.logging = false;
      state.isLoggedIn = true;
    });

    // builder.addCase(registerAsync.fulfilled, (state, action) => {});

    // builder.addCase(logoutAsync.fulfilled, (state, action) => {
    //   localStorage.removeItem(JODY);
    //   return initialState;
    // });

    builder.addMatcher(
      isAnyOf(
        loginAsync.rejected
        // getProfileAsync.rejected,
        // logoutAsync.rejected
      ),
      (state) => {
        return initialState;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const isLoggedIn = (state) => state.auth.isLoggedIn;
export const profileSelector = (state) => state.auth.profile;
export default authSlice.reducer;
