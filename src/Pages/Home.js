import React from 'react'
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

const Home = () => {
  return (
    <div>{localStorage.getItem('user') ? <Dashboard /> : <LandingPage />}</div>
  )
}

export default Home