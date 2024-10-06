import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { useStopwatch } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { setOngoingExercise, setSetStatus } from '../slices/workoutSlice';
import LogSetModal from '../Components/LogSetModal';
import StartSetModal from '../Components/StartSetModal';
import ExercisesModal from '../Components/ExercisesModal';
import { setWorkoutStatus } from '../slices/workoutSlice';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import './Workout.css'; // Make sure the path is correct based on your folder structure


const Workout = ({ workoutId, dashboardKey, setDashboardKey }) => {

    const setOngoing = useSelector((state) => state.workout.setOngoing);
    const onGoingExercise = useSelector((state) => state.workout.onGoingExercise);

    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogSetModal, setShowLogSetModal] = useState(false);
    const [showStartSetModal, setShowStartSetModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(onGoingExercise);
    const [showStopWorkoutConfirmation, setShowStopWorkoutConfirmation] = useState(false);
    const [componentKey, setComponentKey] = useState(0);
    const [showExercisesModal, setShowExercisesModal] = useState(false);
    



    const dispatch = useDispatch();

    // Stopwatch hook
    const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({ autoStart: false });

    useEffect(() => {
        const getWorkoutDetails = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/workouts/${workoutId}`);
                setIsLoading(false);
                if (response.status === 200) {
                    setWorkoutName(response.data.workout.name);
                    setExercises(response.data.exercises);
                }
            } catch (error) {
                toast.error(error.message);
                setIsLoading(false);
            }
        };

        getWorkoutDetails();
    }, [workoutId, componentKey]);

    useEffect(() => {
        setSelectedExercise(onGoingExercise);
    }, [onGoingExercise]);

    // Called when an exercise is clicked
    const handleExerciseClick = (exercise) => {
        if (!setOngoing) {
            setSelectedExercise(exercise); // Set the selected exercise
            reset(); // Reset timer when starting a new set
            setShowStartSetModal(true); // Show the start modal after selecting an exercise
        } else {
            toast.warning("You already have an ongoing set. Please complete it before starting another.");
        }
    };

    // Called when stopping the current set
    const handleStop = () => {
        dispatch(setSetStatus(false));
        setShowLogSetModal(true);
        pause();
        reset(); // Reset the timer when stopping a set
    };

    const handleStopWorkoutClick = () => {
        setShowStopWorkoutConfirmation(true);
    };

    const confirmStopWorkout = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/api/workouts/stopworkout`, { workout_id: workoutId });

            if (response.status === 200) {
                toast.success('Workout stopped successfully');
                setShowStopWorkoutConfirmation(false);
                const newDashboardKey = dashboardKey + 1;
                setDashboardKey(newDashboardKey);
                dispatch(setWorkoutStatus(false));
            }
        } catch (error) {
            toast.error(`Failed to stop workout: ${error.message}`);
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            omit: true
        },
        {
            name: 'Exercise',
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

    return (
        <Container className="my-4">
            {isLoading && <Loader />}
            {showLogSetModal && (
                <LogSetModal
                    componentKey={componentKey}
                    setComponentKey={setComponentKey}
                    minutes={minutes}
                    seconds={seconds}
                    resetTimer={reset}  // Pass reset function to reset the timer after a set is logged
                    handleSetLogged={() => {
                        setShowLogSetModal(false);
                        dispatch(setSetStatus(false));  // Reset the setOngoing status when the set is logged
                        setSelectedExercise(null);  // Clear the selected exercise after logging the set
                    }}
                    exercise={selectedExercise}
                />
            )}
            {showStartSetModal && selectedExercise && (
                <StartSetModal
                    exercise={selectedExercise}
                    handleClose={() => setShowStartSetModal(false)}
                />
            )}
            
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="text-center">
                    <h3 className="text-primary">{workoutName}</h3>
                    {setOngoing && 
                        <div className="timer">
                            <h4>Current Exercise: {onGoingExercise?.name}</h4>
                            <div className="timer-display">
                                <span className="timer-minutes">{String(minutes).padStart(2, '0')}</span>:<span className="timer-seconds">{String(seconds).padStart(2, '0')}</span>
                            </div>
                            <p>{isRunning ? 'Running' : 'Not running'}</p>
                            <Button variant="success" onClick={start} disabled={isRunning}>Start</Button>
                            <Button variant="danger" onClick={handleStop}>Stop</Button>
                        </div>
                    }
                    <DataTable 
                        columns={columns} 
                        data={exercises} 
                        highlightOnHover
                        pointerOnHover
                        onRowClicked={handleExerciseClick}
                        className="mt-4"
                    />
                    <Button variant="primary" className="mt-3" onClick={() => setShowExercisesModal(true)}>Add Exercise</Button>
                    <Button variant="danger" className="mt-3" onClick={handleStopWorkoutClick}>Stop Workout</Button>
                </Col>
            </Row>

            {/* Confirmation to stop the workout */}
            <Modal show={showStopWorkoutConfirmation} onHide={() => setShowStopWorkoutConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Stop Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to stop the workout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStopWorkoutConfirmation(false)}>No</Button>
                    <Button variant="primary" onClick={confirmStopWorkout}>Yes</Button>
                </Modal.Footer>
            </Modal>

            {showExercisesModal && <ExercisesModal handleClose={() => setShowExercisesModal(false)} />}
        </Container>
    );
};

export default Workout;
