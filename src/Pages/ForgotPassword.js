import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import './ForgotPassword.css'; // Add this line to import the updated CSS

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="forgot-password-container">
      <Logo />
      {isLoading && <Loader />}
      <Form className="forgot-password-form" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={12} className="form-label">
            Email
          </Form.Label>
          <Col sm={12}>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-input" 
              required 
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={12} className="d-flex justify-content-center">
            <Button disabled={isLoading} type="submit" className="reset-button">
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ForgotPassword;
