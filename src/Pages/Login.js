import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Logo from '../Components/Logo';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';
import './Login.css'; // Add this line to import the updated CSS

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await dispatch(loginUser(formData));
      setIsLoading(false);
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
    <div className="login-container">
      <Logo />
      {isLoading && <Loader />}
      <Form className="login-form" onSubmit={handleSubmit}>
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
            <Button disabled={isLoading} type="submit" className="login-button">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <div className="login-links">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
        <p>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
