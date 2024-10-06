import React, { useState } from 'react';
import './ExerciseRow.css'; // Import CSS for styling

const ExerciseRow = ({ exercise, onStart }) => {
  const [showInstructions, setShowInstructions] = useState(false); // State to toggle instructions

  // Function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const toggleInstructions = () => {
    setShowInstructions((prevState) => !prevState);
  };

  return (
    <div className='exercise-container'>
      {/* Left side - Image */}
      <div className='exercise-image-container'>
        <img
          src={exercise.gifUrl}
          alt={capitalizeFirstLetter(exercise.name)}
          className='exercise-image'
          style={{width: "200px", height: "200px"}}
        />
      </div>

      {/* Right side - Exercise information */}
      <div className='exercise-info-container'>
        <h3 className='exercise-title'>
          {capitalizeFirstLetter(exercise.name)}
        </h3>
        <p className='exercise-subtitle'>
          <span className="tag">{capitalizeFirstLetter(exercise.bodyPart)}</span> {' '}
          <span className="tag">{capitalizeFirstLetter(exercise.equipment)}</span>
        </p>

        {/* Target and secondary muscles */}
        <div className='muscle-info'>
          <p>
            <strong>Target:</strong> <span className="tag">{capitalizeFirstLetter(exercise.target)}</span>
          </p>
          <p>
            <strong>Secondary Muscles:</strong>{' '}
            {exercise.secondaryMuscles
              .map((muscle) => capitalizeFirstLetter(muscle))
              .join(', ')}
          </p>
        </div>

        {/* Instructions - Initially hidden */}
        <div className='instructions-container'>
          <button className='arrow-button' onClick={toggleInstructions}>
            {showInstructions ? '▲' : '▼'}
          </button>
          <ul
            className={`instructions-list ${showInstructions ? 'visible' : ''}`}
          >
            {exercise.instructions.map((step, index) => (
              <li key={index}>{capitalizeFirstLetter(step)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action button - Start Exercise */}
      <div className='action-container'>
        <button onClick={() => onStart(exercise)} className='start-button'>
          Start Exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseRow;
