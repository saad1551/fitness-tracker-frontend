import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { setOngoingExercise, setSetStatus } from '../slices/workoutSlice';
import { useDispatch } from 'react-redux';

const StartSetModal = ({ exercise, handleClose }) => {

    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(setSetStatus(true));
        dispatch(setOngoingExercise(exercise));
        handleClose();
    };
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Do another set of {exercise.name} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={exercise.image} alt="demonstration" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleStart}>Start Set</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StartSetModal;
