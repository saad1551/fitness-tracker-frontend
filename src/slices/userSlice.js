// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the backend URL globally
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Async thunk for logging in the user
export const loginUser = createAsyncThunk('user/login', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${backendUrl}/api/users/login`, formData);
    return response.data.user;  // Return the user data
  } catch (error) {
    return rejectWithValue(error.response.data.message);  // Handle the error
  }
});

// Thunk to get login status on app load
export const fetchLoginStatus = createAsyncThunk('user/fetchLoginStatus', async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${backendUrl}/api/users/loggedin`);
    if (response.data.loggedIn === true) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.error("Error fetching login status:", error);
  }
});

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the loginUser thunk lifecycle
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handling the fetchLoginStatus thunk
      .addCase(fetchLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLoginStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
