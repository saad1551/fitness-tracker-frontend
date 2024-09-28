import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';


const initialState = {
    name: '',
    email: '',
    password: ''
};

const Register = () => {
    const [formData, setFormData] = useState(initialState);

    const [isLoading, setIsLoading] = useState(false);

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
            const response = await axios.post(`${backendUrl}/api/users/register`, formData);
            setIsLoading(false);
            if (response.status === 201) {
                toast.success('We have sent a link to your email. Please click on it to verify your email and activate your account');
            } else if (response.status === 200) {
                toast.success('We have resent a link to your email. Please click on it to verify your email and activate your account');
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
                Name
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                Email
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                Password
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button disabled={isLoading} type="submit">Register</Button>
                </Col>
            </Form.Group>
        </Form>

        <div className="mt-3">
                <p>
                    Already have an account? <Link to="/login">Login here</Link>.
                </p>
                <p>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                </p>
        </div>
    </div>
  )
}

export default Register;