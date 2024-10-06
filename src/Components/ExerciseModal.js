import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import StartWorkoutModal from './StartWorkoutModal';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { setOngoingExercise, setSetStatus } from '../slices/workoutSlice';



const ExerciseModal = ({ handleClose, exercise }) => {
    const [show, setShow] = useState(true);

    const [showStartWorkoutModal, setShowStartWorkoutModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    // Get workoutOngoing state from Redux store
    const workoutOngoing = useSelector((state) => state.workout.workoutOngoing);

    const ongoingWorkoutId = localStorage.getItem('ongoingWorkoutId');

    const handleStart = async() => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
          if (workoutOngoing) {
            const response = await axios.post(`${backendUrl}/api/workouts/startexercise`, {
              workout_id: ongoingWorkoutId,
              exerciseName: exercise.name,
              image: exercise.gifUrl,
            });

            setIsLoading(false);

            if (response.status === 201) {
              // Dispatch actions to update the Redux state
              localStorage.setItem('ongoingExerciseId', response.data.exercise._id);
              localStorage.setItem('ongoingExerciseName', response.data.exercise.name);
              dispatch(setSetStatus(true));
              dispatch(setOngoingExercise(response.data.exercise));
              toast.success(response.data.message);
              handleClose();
            }
        } else {
            setShowStartWorkoutModal(true);
        }
    };

  return (
    <div>
      {isLoading && <Loader />}
        {showStartWorkoutModal && <StartWorkoutModal exercise={exercise} closeModals={()=>handleClose()} handleClose={() => setShowStartWorkoutModal(false)} />}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{exercise.name.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <img width="200px" height="200px" src={exercise.gifUrl} alt="demonstration" />
            {exercise.instructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStart}>
            Start Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ExerciseModal