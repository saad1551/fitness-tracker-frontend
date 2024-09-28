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
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the field in the formData state
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        const backendUrl = "http://localhost:5000";

        if (formData.password !== formData.password2) {
            alert("Passwords don't match");
            setFormData(initialState);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/users/resetpassword/${resetToken}`, formData);
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
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                Password
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                Confirm Password
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="password" placeholder="Password" name="password2" value={formData.password2} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button disabled={isLoading} type="submit">Reset Password</Button>
                </Col>
            </Form.Group>
        </Form>
    </div>
  )
}

export default ResetPassword;