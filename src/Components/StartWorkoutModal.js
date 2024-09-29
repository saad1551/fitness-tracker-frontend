import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setWorkoutId, setWorkoutStatus } from '../slices/workoutSlice';


const StartWorkoutModal = ({ handleClose, exercise, closeModals }) => {
    const [show, setShow] = useState(true);

    const [workoutName, setWorkoutName] = useState(""); // State variable for workout name

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    // Handle change for workout name input
    const handleWorkoutNameChange = (e) => {
        setWorkoutName(e.target.value);
    };
    
    const handleStart = async () => {
        const backendUrl = "http://localhost:5000";

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/workouts/startworkout`, { workout_name: workoutName });
            if (response.status === 201) {
                const res = await axios.post(`${backendUrl}/api/workouts/startexercise`, {
                    workout_id: response.data.id,
                    exerciseName: exercise.name,
                    image: exercise.gifUrl,
                });

                setIsLoading(false);

                if (res.status === 201) {
                    toast.success("Workout started successfully");
                    // Dispatch actions to update the Redux state
                    dispatch(setWorkoutId(response.data.id));
                    dispatch(setWorkoutStatus(true));
                }

                closeModals();
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response ? error.response.data.message : "Error starting workout");
        }
    };



  
    return (
      <>
        {isLoading && <Loader />}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Start Workout with {exercise.name} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
                        <label htmlFor="workoutName">Workout Name:</label>
                        <input
                            type="text"
                            id="workoutName"
                            value={workoutName}
                            onChange={handleWorkoutNameChange}
                            placeholder="Enter workout name"
                            style={{ width: '100%', marginTop: '10px' }} // Optional styling
                        />
                    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleStart}>
              Start Workout
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default StartWorkoutModal