import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user); // Access user state from Redux

  return (
    <div>{isLoggedIn ? <Dashboard /> : <LandingPage />}</div>
  );
}

export default Home;
