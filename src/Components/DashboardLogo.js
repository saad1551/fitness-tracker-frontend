import React from 'react'
import { FaDumbbell } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const DashboardLogo = () => {
  return (
    <div style={{padding: "20px"}}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{color: "white"}}>Fitness Tracker</h2>
        <FaDumbbell style={{color: "#007bff"}} size={70} />
      </Link>
    </div>
  )
}

export default DashboardLogo