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

const Workout = ({ workoutId }) => {
    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogSetModal, setShowLogSetModal] = useState(false);
    
    // New state for opening StartSetModal
    const [showStartSetModal, setShowStartSetModal] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

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
        };

        getWorkoutDetails();
    }, [workoutId]);

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

    return (
        <div>
            {isLoading && <Loader />}
            {showLogSetModal && <LogSetModal minutes={minutes} seconds={seconds} />}
            
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
        </div>
    );
};

export default Workout;
