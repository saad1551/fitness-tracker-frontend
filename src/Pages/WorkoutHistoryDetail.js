import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const WorkoutHistoryDetail = ({ workout, onBack }) => {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Optional for loading state

    useEffect(() => {
        const fetchExercises = async () => {
            const backendUrl = "http://localhost:5000";
            setIsLoading(true);
            console.log(workout._id);
            try {
                const response = await axios.get(`${backendUrl}/api/workouts/${workout._id}`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setExercises(response.data.exercises);
                    console.log(exercises);
                }

            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, [workout._id]); // Fetch exercises only when workout ID changes

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Sets Completed',
            selector: row => row.sets.length,
        },
        {
            name: 'Image',
            cell: row => <img src={row.image} alt="demonstration" style={{ width: '50px' }} />,
        }
    ];

    return (
        <div>
            <h2>{workout.name}</h2>
            {isLoading ? <p>Loading exercises...</p> : (
                <DataTable 
                    columns={columns} 
                    data={exercises} 
                    pagination
                    highlightOnHover
                />
            )}
            <button onClick={onBack} className="btn btn-secondary mt-3">Back to History</button>
        </div>
    );
};

export default WorkoutHistoryDetail;
