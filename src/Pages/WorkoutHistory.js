import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);

    useEffect(() => {
        const getWorkoutsData = async() => {
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
    });

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
            selector: row => row.date.toLocaleString(),
        }
    ];

    const handleWorkoutClick = () => {

    }
  return (
    <div>
            Workout History
            <DataTable columns={columns} data={workoutHistory} pagination
                    highlightOnHover
                    pointerOnHover // Changes cursor to pointer on hover
                    onRowClicked={handleWorkoutClick} // Make rows clickable
            />
    </div>
  )
}

export default WorkoutHistory