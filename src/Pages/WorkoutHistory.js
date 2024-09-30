import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import WorkoutHistoryDetail from './WorkoutHistoryDetail'; // Import the detail component

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null); // State to manage selected workout

    useEffect(() => {
        const getWorkoutsData = async () => {
            const backendUrl = "http://localhost:5000";

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
        },
        {
            name: 'Exercises Completed',
            selector: row => row.exercisesCompleted,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleString(), // Format the date properly
        }
    ];

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
                onRowClicked={handleWorkoutClick} // Make rows clickable
            />
        </div>
    );
};

export default WorkoutHistory;
