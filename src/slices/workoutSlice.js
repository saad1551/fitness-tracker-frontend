// slices/workoutSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  workoutOngoing: false,
  setOngoing: false,
  onGoingExercise: null,
  workoutId: null, // Add workoutId to the initial state
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkoutStatus: (state, action) => {
      state.workoutOngoing = action.payload;
    },
    clearWorkoutStatus: (state) => {
      state.workoutOngoing = false;
      state.workoutId = null; // Clear the workout ID when status is cleared
    },
    setWorkoutId: (state, action) => {
      state.workoutId = action.payload; // Set the workout ID
    },
    clearWorkoutId: (state) => {
      state.workoutId = null; // Clear the workout ID
    },
    setSetStatus: (state, action) => {
        state.setOngoing = action.payload;
    },
    setOngoingExercise: (state, action) => {
        state.onGoingExercise = action.payload;
    }
  },
});

export const { setWorkoutStatus, clearWorkoutStatus, setWorkoutId, clearWorkoutId, setSetStatus, setOngoingExercise } = workoutSlice.actions;

// Thunk to get workout status
export const fetchWorkoutStatus = () => async (dispatch) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  try {
    const response = await axios.get(`${backendUrl}/api/workouts/workoutstatus`);
    if (response.status === 200) {
      dispatch(setWorkoutStatus(response.data.workoutOngoing));
      // Optionally, you can set the workout ID here if it's included in the response
      // Example: if response.data.workoutId is available
      if (response.data.workoutId) {
        dispatch(setWorkoutId(response.data.workoutId));
      }
    }
  } catch (error) {
    console.error("Error fetching workout status:", error);
  }
};

export default workoutSlice.reducer;
