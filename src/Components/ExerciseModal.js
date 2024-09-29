import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import StartWorkoutModal from './StartWorkoutModal';



const ExerciseModal = ({ handleClose, exercise }) => {
    const [show, setShow] = useState(true);

    const [showStartWorkoutModal, setShowStartWorkoutModal] = useState(false);

    const handleStart = (req, res) => {
        if (localStorage.getItem('workoutOngoing') === true) {

        } else {
            setShowStartWorkoutModal(true);
        }
    };

  return (
    <div>
        {showStartWorkoutModal && <StartWorkoutModal handleClose={() => setShowStartWorkoutModal(false)} />}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{exercise.name.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <img width="200px" height="200px" src={exercise.gifUrl} alt="demonstration" />
            {exercise.instructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStart}>
            Start Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ExerciseModal