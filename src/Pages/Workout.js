import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

const Workout = ({ workoutId }) => {
    const [workoutName, setWorkoutName] = useState("");

    const [exercises, setExercises] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    
    const columns = [
        {
            name: 'Name',
            selector: row => row.name.toUpperCase(),
        },
        {
            name: 'Sets Completed',
            selector: row => row.sets.length,
        },
        {
            name: 'Image',
            cell: row => <img src={row.image} alt="gif" width="100" height="100" />,
        },
    ];

    useEffect(() => {
        const getWorkoutDetails = async() => {
            const backendUrl = "http://localhost:5000";

            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/workouts/${workoutId}`);
                setIsLoading(false);
                if (response.status === 200) {
                    setWorkoutName(response.data.workout.name);
                    setExercises(response.data.exercises);
                }
            } catch (error) {
                toast.error(error);
                setIsLoading(false);
            }
        }

        getWorkoutDetails();
    }, [workoutId]);

    const handleExerciseClick = () => {

    };

  return (
    
    <div>
        {isLoading && <Loader />}
        <h3>{workoutName}</h3>
        <DataTable columns={columns} data={exercises} 
                            highlightOnHover
                            pointerOnHover // Changes cursor to pointer on hover
                            onRowClicked={handleExerciseClick} // Make rows clickable
            />
    </div>
  )
}

export default Workout