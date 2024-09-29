import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const ExerciseModal = ({ handleClose, exercise }) => {
    const [show, setShow] = useState(true);

    const handleShow = () => setShow(true);

  return (
    <div>

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
          <Button variant="primary" onClick={handleClose}>
            Start Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ExerciseModal