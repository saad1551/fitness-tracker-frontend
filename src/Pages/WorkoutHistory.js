import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import WorkoutHistoryDetail from './WorkoutHistoryDetail'; // Import the detail component
import { useMediaQuery } from 'react-responsive'; // Import the useMediaQuery hook for responsiveness
import './WorkoutHistory.css';

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null); // State to manage selected workout

    // Media query to detect mobile view
    const isMobileView = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const getWorkoutsData = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            try {
                const response = await axios.get(`${backendUrl}/api/workouts/workouthistory`);
                if (response.status !== 404) {
                    setWorkoutHistory(response.data);
                }
            } catch (error) {
                toast.error(error);
            }
        };

        getWorkoutsData();
    }, []); // Add empty dependency array to avoid continuous calls

    // Columns for the DataTable
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Exercises Completed',
            selector: row => row.exercisesCompleted,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleString(),
            sortable: true,
            wrap: true,
        }
    ].filter(Boolean); // Filters out undefined columns (in this case, "Exercises Completed" on mobile)

    // Handle row click and select workout
    const handleWorkoutClick = (row) => {
        setSelectedWorkout(row); // Set selected workout data to pass as prop
    };

    // If a workout is selected, render WorkoutHistoryDetail
    if (selectedWorkout) {
        return (
            <WorkoutHistoryDetail 
                workout={selectedWorkout} 
                onBack={() => setSelectedWorkout(null)} // Pass a callback to unmount and go back
            />
        );
    }

    // Render the workout history table
    return (
        <div>
            <h2>Workout History</h2>
            <DataTable 
                columns={columns} 
                data={workoutHistory} 
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                onRowClicked={handleWorkoutClick} // Make rows clickable
            />
        </div>
    );
};

export default WorkoutHistory;
