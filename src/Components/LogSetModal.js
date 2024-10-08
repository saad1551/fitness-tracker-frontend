import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from './Loader';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSetStatus } from '../slices/workoutSlice';

const LogSetModal = ({ minutes, seconds, componentKey, setComponentKey, resetTimer, pauseTimer, handleSetLogged, handleCancel, exercise }) => {
    const [show, setShow] = useState(true);
    const [weight, setWeight] = useState(''); // Input state for weight (kgs)
    const [reps, setReps] = useState(''); // Input state for reps
    const [isLoading, setIsLoading] = useState(false);


    const exerciseId = exercise._id;
    const exerciseName = exercise.name;

    const dispatch = useDispatch();

    // Handler for weight input change
    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    // Handler for reps input change
    const handleRepsChange = (e) => {
        setReps(e.target.value);
    };

    const handleCancelSet = () => {
        if (window.confirm('Are you sure you do not want to log this set ?')) {
            handleCancel();
            resetTimer();
            pauseTimer();
        }
    }

    // Function to log the set (submit)
    const handleLogSet = async () => {
        if (!weight || !reps) {
            toast.error("Please enter both weight and reps.");
            return;
        }

        resetTimer();

        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/workouts/logset`, {
                exercise_id: exerciseId,
                weight: weight,
                reps: reps,
                timeTaken: `${minutes}:${seconds}`
            });

            setIsLoading(false);
            if (response.status === 201) {
                toast.success("Set logged successfully!");
                dispatch(setSetStatus(false)); // Optionally clear ongoing set state
                setShow(false); // Close modal after logging the set
                const newComponentKey = componentKey + 1;
                setComponentKey(newComponentKey);
            }

            handleSetLogged();
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response ? error.response.data.message : "Error logging set");
        }
        const newComponentKey = componentKey + 1;
        setComponentKey(newComponentKey);
    };

    return (
        <>
            {isLoading && <Loader />}
            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Log Set for {exerciseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="weight">Weight (kgs):</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={handleWeightChange}
                            placeholder="Enter weight in kgs"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <label htmlFor="reps">Reps:</label>
                        <input
                            type="number"
                            id="reps"
                            value={reps}
                            onChange={handleRepsChange}
                            placeholder="Enter number of reps"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={isLoading} variant="danger" onClick={handleCancelSet}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} variant="primary" onClick={handleLogSet}>
                        Log Set
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogSetModal;
