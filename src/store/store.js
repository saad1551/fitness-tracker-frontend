// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import workoutReducer from '../slices/workoutSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer
  }
});

export default store;
