import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file for styling

const initialState = {
    password: '',
    password2: ''
};

const ResetPassword = () => {
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const { resetToken } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Update the specific field in formData
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        // Validate that the passwords match before sending the request
        if (formData.password !== formData.password2) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/users/resetpassword/${resetToken}`, formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred'); // Handle error gracefully
        } finally {
            setIsLoading(false); // Ensure loading state is reset after request
        }

        // Reset form data after submission
        setFormData(initialState);
    };

    return (
        <div className="reset-password-container d-flex flex-column justify-content-center align-items-center min-vh-100">
            <Logo />
            {isLoading && <Loader />}
            <Form onSubmit={handleSubmit} className="reset-password-form">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        Password
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword2">
                    <Form.Label column sm={3}>
                        Confirm Password
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button disabled={isLoading} type="submit" className="submit-button">
                            Reset Password
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default ResetPassword;
