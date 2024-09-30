import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Exercises from './Exercises';
import Workout from './Workout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutStatus } from '../slices/workoutSlice';

function Dashboard() {
  const dispatch = useDispatch();
  
  // Accessing workout status and ID from Redux store
  const workoutOngoing = useSelector((state) => state.workout.workoutOngoing);
  const workoutId = localStorage.getItem('ongoingWorkoutId');
  
  useEffect(() => {
    // Fetch workout status from the server
    dispatch(fetchWorkoutStatus());
  }, [dispatch]); // This runs only once on component mount

  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        {!workoutOngoing ? <Exercises /> : <Workout workoutId={workoutId} />}
      </Tab>
      <Tab eventKey="workout_history" title="Workout History">
        Tab content for Workout History
      </Tab>
      <Tab eventKey="progress_charts" title="Progress Charts">
        Tab content for Progress Charts
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Profile />
      </Tab>
      <Tab eventKey="sign_out" title="Sign out">
        <Link to="/signout" style={{ textDecoration: 'none', color: 'inherit' }}>
            Signout
        </Link>
      </Tab>

    </Tabs>
  );
}

export default Dashboard;