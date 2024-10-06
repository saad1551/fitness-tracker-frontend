import React, { useState } from 'react';
import './ExerciseHistoryRow.css'; // Import CSS for styling

const ExerciseHistoryRow = ({ exercise }) => {
  const [showSetDetails, setShowSetDetails] = useState(false); // State to toggle set details

  // Function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const toggleSetDetails = () => {
    setShowSetDetails((prevState) => !prevState);
  };

  // Function to format time in "mm:ss" format based on conditions
  const formatTimeTaken = (timeTaken) => {
    const [minutes, seconds] = timeTaken.split(':').map(Number);

    if (minutes === 0) {
      return `${seconds} seconds`;
    } else if (seconds === 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} and ${seconds} second${seconds > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className='exercise-history-container'>
      {/* Left side - Image */}
      <div className='exercise-history-image-container'>
        <img
          src={exercise.image}
          alt={capitalizeFirstLetter(exercise.name)}
          className='exercise-history-image'
        />
      </div>

      {/* Right side - Exercise information */}
      <div className='exercise-history-info-container'>
        <h3 className='exercise-history-title'>
          {capitalizeFirstLetter(exercise.name)}
        </h3>

        <p className='exercise-history-subtitle'>
          <strong>Sets Completed:</strong> {exercise.sets.length}
        </p>

        {/* Expandable set details */}
        <div className='set-details-container'>
          <button className='arrow-button' onClick={toggleSetDetails}>
            {showSetDetails ? '▲ View Less' : '▼ View More'}
          </button>

          {showSetDetails && (
            <ul className='set-details-list'>
              {exercise.sets.map((set, index) => (
                <li key={set._id} className='set-details-item'>
                  <p><strong>Set {index + 1}:</strong></p>
                  <p><strong>Weight:</strong> {set.weight} kg</p>
                  <p><strong>Reps:</strong> {set.reps}</p>
                  <p><strong>Time Taken:</strong> {(set.timeTaken)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseHistoryRow;
