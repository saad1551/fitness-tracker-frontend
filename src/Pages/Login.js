import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';


const initialState = {
    email: '',
    password: ''
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the field in the formData state
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(formData));
            if (loginUser.fulfilled.match(result)) {
                toast.success("Login successful!");
                navigate('/');
            } else {
                toast.error(result.payload);
            }
        } catch (err) {
            toast.error("Login failed.");
        }
    };


  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Logo />
        {isLoading && <Loader />}
        <Form onSubmit={(e) => handleSubmit(e)}>
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
                <Button disabled={isLoading} type="submit">Login</Button>
                </Col>
            </Form.Group>
        </Form>

        <div className="mt-3">
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
                <p>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                </p>
        </div>
    </div>
  )
}

export default Login;