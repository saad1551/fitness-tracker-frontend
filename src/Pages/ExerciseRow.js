import React, { useState } from 'react';
import './ExerciseRow.css'; // Import CSS for styling

const ExerciseRow = ({ exercise, onStart  }) => {
  const [showInstructions, setShowInstructions] = useState(false); // State to toggle instructions

//   const exercise = {
//     bodyPart: 'back',
//     equipment: 'cable',
//     gifUrl: 'https://v2.exercisedb.io/image/9f8LeSpmfe4vYu',
//     id: '0007',
//     name: 'alternate lateral pulldown',
//     target: 'lats',
//     secondaryMuscles: ['biceps', 'rhomboids'],
//     instructions: [
//       'Sit on the cable machine with your back straight and feet flat on the ground.',
//       'Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.',
//       'Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.',
//       'Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.',
//       'Repeat for the desired number of repetitions.',
//     ],
//   };

  // Function to capitalize the first letter
  const capitalizeFirstLetter = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const toggleInstructions = () => {
    setShowInstructions(prevState => !prevState);
  };

  return (
    <div className='exercise-container'>
      {/* Left side - Image */}
      <div className='exercise-image-container'>
        <img
          src={exercise.gifUrl}
          alt={capitalizeFirstLetter(exercise.name)}
          className='exercise-image'
        />
      </div>

      {/* Right side - Exercise information */}
      <div className='exercise-info-container'>
        <h3 className='exercise-title'>
          {capitalizeFirstLetter(exercise.name)}
        </h3>
        <p className='exercise-subtitle'>
          {capitalizeFirstLetter(exercise.bodyPart)} |{' '}
          {capitalizeFirstLetter(exercise.equipment)}
        </p>

        {/* Target and secondary muscles */}
        <div className='muscle-info'>
          <p>
            <strong>Target:</strong> {capitalizeFirstLetter(exercise.target)}
          </p>
          <p>
            <strong>Secondary Muscles:</strong>{' '}
            {exercise.secondaryMuscles
              .map(muscle => capitalizeFirstLetter(muscle))
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
        <button onClick={() => onStart(exercise)} className='start-button'>Start Exercise</button>
      </div>
    </div>
  );
};

export default ExerciseRow;
