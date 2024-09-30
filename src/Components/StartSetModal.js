import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setSetStatus, setOngoingExercise } from '../slices/workoutSlice';
import Loader from './Loader';
import axios from 'axios';

const StartSetModal = ({ handleClose, exercise, workoutId }) => {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    // Get the workout state from Redux
    const workoutOngoing = useSelector((state) => state.workout.workoutOngoing);

    const handleStartSet = async () => {
        if (!workoutOngoing) {
            toast.error("You need to start a workout before starting a set.");
            return;
        }

        const backendUrl = "http://localhost:5000";

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/workouts/startexercise`, {
                workout_id: workoutId,
                exerciseName: exercise.name,
                image: exercise.gifUrl,
            });

            setIsLoading(false);

            if (response.status === 201) {
                toast.success("Set started successfully");
                dispatch(setOngoingExercise(response.data.exercise)); // Set the ongoing exercise in Redux
                dispatch(setSetStatus(true)); // Set the status of the set to ongoing
                handleClose(); // Close the modal
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response ? error.response.data.message : "Error starting set");
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Start Set for {exercise.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <img width="200px" height="200px" src={exercise.gifUrl} alt="exercise demo" />
                    {exercise.instructions.map((instruction, index) => (
                        <p key={index}>{instruction}</p>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleStartSet}>
                        Start Set
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StartSetModal;
