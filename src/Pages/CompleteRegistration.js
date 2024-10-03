import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import './CompleteRegistration.css';

const initialState = {
    phone: '',
    age: '',
    workout_time: ''
};

const CompleteRegistration = () => {
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate('/');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the field in the formData state
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/users/completeregistration`, formData);
            setIsLoading(false);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.message);
        }

        setFormData(initialState);
    };

    return (
        <div className="registration-container">
            <Logo />
            {isLoading && <Loader />}
            <Form onSubmit={(e) => handleSubmit(e)} className="registration-form">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
                    <Form.Label column sm={3} className="form-label">
                        Phone
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            maxLength={12}
                            minLength={12}
                            type="text"
                            placeholder="XXXX-XXXXXXX"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange(e)}
                            className="form-input"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                    <Form.Label column sm={3} className="form-label">
                        Age
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            placeholder="Age"
                            name="age"
                            value={formData.age}
                            onChange={(e) => handleChange(e)}
                            className="form-input"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalWorkoutTime">
                    <Form.Label column sm={3} className="form-label">
                        Workout Time
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="time"
                            name="workout_time"
                            value={formData.workout_time}
                            onChange={(e) => handleChange(e)}
                            className="form-input"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }} className="text-right">
                        <Button disabled={isLoading} type="submit" className="submit-button">
                            Complete Registration
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default CompleteRegistration;
