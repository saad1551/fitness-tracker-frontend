import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './WorkoutHistoryDetail.css'; // Importing CSS for styling

const WorkoutHistoryDetail = ({ workout, onBack }) => {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Optional for loading state

    useEffect(() => {
        const fetchExercises = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/workouts/${workout._id}`);
                if (response.status === 200) {
                    setExercises(response.data.exercises);
                }
            } catch (error) {
                console.error("Error fetching exercises:", error);
            } finally {
                setIsLoading(false); // Ensure loading state is reset
            }
        };

        fetchExercises();
    }, [workout._id]); // Fetch exercises only when workout ID changes

    const columns = [
        {
            name: 'Exercise Name',
            selector: row => row.name,
            sortable: true, // Added sortable for better usability
        },
        {
            name: 'Sets Completed',
            cell: row => (
                <div>
                    <strong>{row.sets.length}</strong>
                    <details>
                        {row.sets.map((set, index) => (
                            <p key={index}>Set {index + 1}: {set.weight} Kg, {set.reps} reps</p>
                        ))}
                    </details>
                </div>
            ),
        },
        {
            name: 'Image',
            cell: row => (
                <img src={row.image} alt="demonstration" className="exercise-image" />
            ),
        },
    ];

    return (
        <div className="workout-detail-container">
            <h2 className="workout-title">{workout.name}</h2>
            {isLoading ? (
                <p className="loading-message">Loading exercises...</p>
            ) : (
                <DataTable 
                    columns={columns} 
                    data={exercises} 
                    pagination
                    highlightOnHover
                    className="exercise-table" // Added class for styling
                />
            )}
            <button onClick={onBack} className="btn btn-secondary back-button">Back to History</button>
        </div>
    );
};

export default WorkoutHistoryDetail;
