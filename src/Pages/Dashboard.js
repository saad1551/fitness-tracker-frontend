import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutStatus } from '../slices/workoutSlice';
import Profile from './Profile';
import Exercises from './Exercises';
import Workout from './Workout';
import WorkoutHistory from './WorkoutHistory';
import ProgressCharts from './ProgressCharts';
import DashboardLogo from '../Components/DashboardLogo'; // Import the Logo component
import SignOutPage from './SignOutPage';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon
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
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const [dashboardRemountKey, setDashboardRemountKey] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger icon for mobile view */}
      <div className="burger-menu-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Left-side navigation (Tabs) */}
      <div className={`dashboard-tabs ${isSidebarOpen ? 'open' : ''}`}>
        {/* Logo component at the top */}
        <div className="logo-container">
          <DashboardLogo />
        </div>
        
        <Tabs
          activeKey={dashboardKey}
          onSelect={(k) =>{setDashboardKey(k); setSidebarOpen(false) }}
          id="controlled-tab-example"
          className="flex-column"
        >
          <Tab eventKey="home" title="Dashboard" />
          <Tab eventKey="workout_history" title="Workout History" />
          <Tab eventKey="progress_charts" title="Progress Charts" />
          <Tab eventKey="profile" title="Profile" />
          <Tab eventKey="sign_out" title="Sign out" />
        </Tabs>
      </div>

      {/* Right-side content */}
      <div className="dashboard-content" onClick={() => setSidebarOpen(false)}>
        {dashboardKey === 'home' && !workoutOngoing && <Exercises />}
        {dashboardKey === 'home' && workoutOngoing && (
          <Workout dashboardRemountKey={dashboardRemountKey} setDashboardRemountKey={setDashboardRemountKey} workoutId={workoutId} />
        )}
        {dashboardKey === 'workout_history' && <WorkoutHistory />}
        {dashboardKey === 'progress_charts' && <ProgressCharts />}
        {dashboardKey === 'profile' && <Profile />}
        {dashboardKey === 'sign_out' && <SignOutPage handleCancel={() => { setDashboardKey('home'); }} />}
      </div>
    </div>
  );
}

export default Dashboard;
