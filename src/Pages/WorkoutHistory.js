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

    function formatTime(timeString) {
        // Split the time and the period (am/pm)
        const [time, period] = timeString.split(' ');

        // Extract the hour and minutes, ignoring the seconds
        const [hour, minute] = time.split(':');

        // Return the formatted time (hh:mm am/pm)
        return `${hour}:${minute} ${period}`;
    }

    useEffect(() => {
        const getWorkoutsData = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            try {
                const response = await axios.get(`${backendUrl}/api/workouts/workouthistory`);
                if (response.status === 200) {
                    setWorkoutHistory(response.data);
                } else {
                    toast.error("No workout history found.");
                }
            } catch (error) {
                toast.error("Failed to fetch workout history: " + error.message);
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
            cell: row => <span className="table-cell">{row.name}</span>,
            minWidth: '150px', // Ensure responsiveness
        },
        {
            name: 'Exercises Completed',
            selector: row => row.exercisesCompleted,
            sortable: true,
            wrap: true,
            cell: row => <span className="table-cell">{row.exercisesCompleted}</span>,
            minWidth: '150px',
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
            wrap: true,
            cell: row => <span className="table-cell">{new Date(row.date).toLocaleDateString()}</span>,
            minWidth: '150px',
        },
        {
            name: 'Time',
            cell: row => <span className="table-cell">{`${formatTime(row.beginning_time)} - ${formatTime(row.ending_time)}`}</span>,
            minWidth: '200px',
        },
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
        <div className="workout-history-container">
            <h2>Workout History</h2>
            {workoutHistory.length > 0 ? (
                <div className="data-table-wrapper">
                    <DataTable 
                        columns={columns} 
                        data={workoutHistory} 
                        pagination
                        highlightOnHover
                        pointerOnHover
                        responsive
                        onRowClicked={handleWorkoutClick} // Make rows clickable
                        className="data-table"
                        noDataComponent={<p>No workout history available.</p>} // Custom no data message
                    />
                </div>
            ) : (
                <p className="no-data-message">Loading workout history...</p>
            )}
        </div>
    );
};

export default WorkoutHistory;
