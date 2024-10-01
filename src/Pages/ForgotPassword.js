import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';


const initialState = {
    email: '',
};

const ForgotPassword = () => {
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

        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/users/forgotpassword`, formData);
            setIsLoading(false);
            if (response.status === 200) {
                toast.success(response.data.message);
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
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                Email
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} />
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button disabled={isLoading} type="submit">Send Reset Email</Button>
                </Col>
            </Form.Group>
        </Form>
    </div>
  )
}

export default ForgotPassword;