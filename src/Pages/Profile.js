import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import Logo from '../Components/Logo'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const getUserData = async() => {
            const backendUrl = "http://localhost:5000";

            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/users/getuserprofile`);
                setIsLoading(false);
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                setIsLoading(false);
                toast.error(error.response.data.message);
            }
        };

        getUserData();
    }, [])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        {isLoading && <Loader />}
        <Form >
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Name" name="name" value={userData.name} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" placeholder="Email" name="email" value={userData.email} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
                <Form.Label column sm={2}>
                Phone
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Phone" name="phone" value={userData.phone} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                <Form.Label column sm={2}>
                Age
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="number" placeholder="Age" name="age" value={userData.age} />
                </Col>
            </Form.Group>

            {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalWeight">
                <Form.Label column sm={2}>
                Weight
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="number" placeholder="Weight" name="weight" value={userData.weight} />
                </Col>
            </Form.Group> */}

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalWorkoutTime">
                <Form.Label column sm={2}>
                Workout Time
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="time" placeholder="Workout Time" name="workout_time" value={userData.workout_time} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 4, offset: 1 }}>
                <Button type="button">Edit Profile</Button>
                </Col>
                <Col sm={{ span: 6, offset: 1 }}>
                <Button type="button">Change Password</Button>
                </Col>
            </Form.Group>
        </Form>
    </div>
  )
}

export default Profile