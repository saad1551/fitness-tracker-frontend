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

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        const backendUrl = "http://localhost:5000";

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
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Logo />
        {isLoading && <Loader />}
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={3}>
                Phone
                </Form.Label>
                <Col sm={9}>
                <Form.Control maxLength={12} minLength={12} type="text" placeholder="XXXX-XXXXXXX" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                Age
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="number" placeholder="Age" name="age" value={formData.age} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                Workout Time
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="time" placeholder="Workout Time" name="workout_time" value={formData.workout_time} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button disabled={isLoading} type="submit">Complete Registraion</Button>
                </Col>
            </Form.Group>
        </Form>
    </div>
  )
}

export default CompleteRegistration;