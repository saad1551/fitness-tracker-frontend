import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Exercises from '../Pages/Exercises'; // Import the Exercises page (or the relevant component)
import Button from 'react-bootstrap/Button';

const ExercisesModal = ({ handleClose }) => {
    const [show, setShow] = useState(true);
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Select Exercises</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="table-responsive">
                    <Exercises modalClose={handleClose} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExercisesModal;
