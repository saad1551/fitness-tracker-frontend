import React from 'react'
import { FaDumbbell } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div style={{padding: "20px"}}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>Fitness Tracker</h2>
        <FaDumbbell size={70} />
      </Link>
    </div>
  )
}

export default Logo