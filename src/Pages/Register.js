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
import './Register.css'; // Add this line to import the updated CSS

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    <div className="register-container">
      <Logo />
      {isLoading && <Loader />}
      <Form className="register-form" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={12} className="form-label">
            Name
          </Form.Label>
          <Col sm={12}>
            <Form.Control 
              type="text" 
              placeholder="Enter your name" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              className="form-input"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={12} className="form-label">
            Email
          </Form.Label>
          <Col sm={12}>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              className="form-input"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={12} className="form-label">
            Password
          </Form.Label>
          <Col sm={12}>
            <Form.Control 
              type="password" 
              placeholder="Enter your password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
              className="form-input"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={12} className="d-flex justify-content-center">
            <Button disabled={isLoading} type="submit" className="register-button">
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <div className="register-links">
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
        <p>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
