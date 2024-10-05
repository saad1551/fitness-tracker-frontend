import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutStatus } from '../slices/workoutSlice';
import Profile from './Profile';
import Exercises from './Exercises';
import Workout from './Workout';
import WorkoutHistory from './WorkoutHistory';
import ProgressCharts from './ProgressCharts';
import DashboardLogo from '../Components/DashboardLogo'; // Import the Logo component
import './Dashboard.css'; // Import the CSS file for layout

function Dashboard() {
  const dispatch = useDispatch();
  
  // Accessing workout status and ID from Redux store
  const workoutOngoing = useSelector((state) => state.workout.workoutOngoing);
  const workoutId = localStorage.getItem('ongoingWorkoutId');

  useEffect(() => {
    // Fetch workout status from the server
    dispatch(fetchWorkoutStatus());
  }, [dispatch]);

  const [dashboardKey, setDashboardKey] = useState('home');

  return (
    <div className="dashboard-container">
      {/* Left-side navigation (Tabs) */}
      <div className="dashboard-tabs">
        {/* Logo component at the top */}
        <div className="logo-container">
          <DashboardLogo />
        </div>
        
        <Tabs
          activeKey={dashboardKey}
          onSelect={(k) => setDashboardKey(k)}
          id="controlled-tab-example"
          className="flex-column"
        >
          <Tab eventKey="home" title="Dashboard">
            {/* Empty Tab, content will be shown on the right */}
          </Tab>
          <Tab eventKey="workout_history" title="Workout History" />
          <Tab eventKey="progress_charts" title="Progress Charts" />
          <Tab eventKey="profile" title="Profile" />
          <Tab eventKey="sign_out" title="Sign out">
            <Link to="/signout" style={{ textDecoration: 'none', color: 'inherit' }}>
              Signout
            </Link>
          </Tab>
        </Tabs>
      </div>

      {/* Right-side content */}
      <div className="dashboard-content">
        {dashboardKey === 'home' && !workoutOngoing && <Exercises />}
        {dashboardKey === 'home' && workoutOngoing && (
          <Workout dashboardKey={dashboardKey} setDashboardKey={setDashboardKey} workoutId={workoutId} />
        )}
        {dashboardKey === 'workout_history' && <WorkoutHistory />}
        {dashboardKey === 'progress_charts' && <ProgressCharts />}
        {dashboardKey === 'profile' && <Profile />}
      </div>
    </div>
  );
}

export default Dashboard;
