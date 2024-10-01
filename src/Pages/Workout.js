import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { useStopwatch } from 'react-timer-hook';
import { useDispatch, useSelector } from 'react-redux';
import { setSetStatus } from '../slices/workoutSlice';
import LogSetModal from '../Components/LogSetModal';
import StartSetModal from '../Components/StartSetModal'; // Import StartSetModal
import Exercises from './Exercises'; // Import Exercises for the modal
import Modal from 'react-bootstrap/Modal'; // Import Modal from Bootstrap
import ExercisesModal from '../Components/ExercisesModal';

const Workout = ({ workoutId }) => {
    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogSetModal, setShowLogSetModal] = useState(false);
    const [showStartSetModal, setShowStartSetModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showStopWorkoutConfirmation, setShowStopWorkoutConfirmation] = useState(false);
    const [componentKey, setComponentKey] = useState(0);
    
    // New state for managing the Exercises modal
    const [showExercisesModal, setShowExercisesModal] = useState(false);

    const setOngoing = useSelector((state) => state.workout.setOngoing);
    const onGoingExercise = useSelector((state) => state.workout.onGoingExercise);
    
    const dispatch = useDispatch();

    // Stopwatch hook
    const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({ autoStart: false });

    // Use effect to load data from localStorage on component mount
    useEffect(() => {
        const storedSetOngoing = localStorage.getItem('setOngoing');
        const storedMinutes = localStorage.getItem('timerMinutes');
        const storedSeconds = localStorage.getItem('timerSeconds');

        if (storedSetOngoing === 'true') {
            dispatch(setSetStatus(true));
            if (storedMinutes || storedSeconds) {
                reset(new Date(Date.now() - (storedMinutes * 60000 + storedSeconds * 1000))); // Adjusting the timer to resume from saved time
                start(); // Auto-start timer if a set was ongoing
            }
        }
    }, [dispatch, reset, start]);

    // Save to localStorage whenever set status or timer changes
    useEffect(() => {
        localStorage.setItem('setOngoing', setOngoing);
        if (setOngoing) {
            localStorage.setItem('timerMinutes', minutes);
            localStorage.setItem('timerSeconds', seconds);
        }
    }, [setOngoing, minutes, seconds]);

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
            omit: true
        },
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

    // Handle clicking on an exercise
    const handleExerciseClick = (exercise) => {
        if (!setOngoing) {
            setSelectedExercise(exercise); // Set the clicked exercise
            setShowStartSetModal(true); // Open StartSetModal
        }
        console.log(exercise);
    };

    const handleStop = () => {
        dispatch(setSetStatus(false));
        setShowLogSetModal(true);
        console.log(`${minutes}: ${seconds}`);
        pause(); // Pause the timer when stopped
        localStorage.removeItem('setOngoing'); // Clear set status in localStorage
        localStorage.removeItem('timerMinutes');
        localStorage.removeItem('timerSeconds');
    };

    // Handle stop workout button click with confirmation
    const handleStopWorkoutClick = () => {
        setShowStopWorkoutConfirmation(true); // Show confirmation dialog
    };

    // Handle the user confirmation to stop the workout
    const confirmStopWorkout = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL; // Replace with your actual backend URL
            const response = await axios.post(`${backendUrl}/api/workouts/stopworkout`, { workout_id: workoutId });

            if (response.status === 200) {
                toast.success('Workout stopped successfully');
                setShowStopWorkoutConfirmation(false);
            }
        } catch (error) {
            toast.error(`Failed to stop workout: ${error.message}`);
        }
    };

    // Handle opening the Exercises modal
    const handleOpenExercisesModal = () => {
        setShowExercisesModal(true);
    };

    // Handle closing the Exercises modal
    const handleCloseExercisesModal = () => {
        setShowExercisesModal(false);
    };

    return (
        <div>
            {isLoading && <Loader />}
            {showLogSetModal && <LogSetModal componentKey={componentKey} setComponentKey={setComponentKey} minutes={minutes} seconds={seconds} />}
            
            {/* Show StartSetModal when a set is not ongoing */}
            {showStartSetModal && selectedExercise && (
                <StartSetModal 
                    exercise={selectedExercise}
                    handleClose={() => setShowStartSetModal(false)} 
                />
            )}

            {setOngoing && 
            <div style={{ textAlign: 'center' }}>
                <h3>{onGoingExercise?.name}</h3>
                <div style={{ fontSize: '100px' }}>
                    <span>{minutes}</span>:<span>{seconds}</span>
                </div>
                <p>{isRunning ? 'Running' : 'Not running'}</p>
                <button onClick={start} disabled={isRunning}>Start</button>
                <button onClick={pause} disabled={!isRunning}>Pause</button>
                <button onClick={handleStop}>Stop</button>
            </div>}
            
            <h3>{workoutName}</h3>
            <DataTable 
                columns={columns} 
                data={exercises} 
                highlightOnHover
                pointerOnHover // Changes cursor to pointer on hover
                onRowClicked={handleExerciseClick} // Make rows clickable
            />

            {/* Button to open the Exercises modal */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handleOpenExercisesModal} className="btn btn-primary">
                    +
                </button>
            </div>

            {/* Modal for selecting exercises */}
            {showExercisesModal && <ExercisesModal handleClose={() => setShowExercisesModal(false)} />}

            {/* Button to stop the workout */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handleStopWorkoutClick} className="btn btn-danger">
                    Stop Workout
                </button>
            </div>

            {/* Confirmation to stop the workout */}
            {showStopWorkoutConfirmation && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Are you sure you want to stop the workout?</p>
                    <button onClick={confirmStopWorkout} className="btn btn-primary">Yes</button>
                    <button onClick={() => setShowStopWorkoutConfirmation(false)} className="btn btn-secondary">No</button>
                </div>
            )}
        </div>
    );
};

export default Workout;
