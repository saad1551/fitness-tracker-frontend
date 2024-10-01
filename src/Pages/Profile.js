import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Controls whether the form is editable

    useEffect(() => {
        const getUserData = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    }, []);

    // Function to toggle the edit mode
    const handleEditProfile = () => {
        setIsEditing(!isEditing);  // Toggle the editing state
    };

    // Function to handle changes to form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update the key with the new value
        }));
    };

    const handleSaveChanges = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/users/updateprofile`, userData);
            setIsLoading(false);
            if (response.status === 200) {
                toast.success("Successfully updated profile");
            }
        } catch (error) {
            toast.error(error);
            setIsLoading(false);
        }

        setIsEditing(!isEditing);
        console.log('Changes saved');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            {isLoading && <Loader />}
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={userData.name || ''}  // Ensure the input is controlled
                            onChange={handleInputChange}
                            disabled={!isEditing}  // Disable unless editing
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userData.email || ''}  // Ensure the input is controlled
                            onChange={handleInputChange}
                            disabled={!isEditing}  // Disable unless editing
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
                    <Form.Label column sm={2}>
                        Phone
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={userData.phone || ''}  // Ensure the input is controlled
                            onChange={handleInputChange}
                            disabled={!isEditing}  // Disable unless editing
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                    <Form.Label column sm={2}>
                        Age
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Age"
                            name="age"
                            value={userData.age || ''}  // Ensure the input is controlled
                            onChange={handleInputChange}
                            disabled={!isEditing}  // Disable unless editing
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalWorkoutTime">
                    <Form.Label column sm={2}>
                        Workout Time
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="time"
                            placeholder="Workout Time"
                            name="workout_time"
                            value={userData.workout_time || ''}  // Ensure the input is controlled
                            onChange={handleInputChange}
                            disabled={!isEditing}  // Disable unless editing
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 12, offset: 0 }}>
                        <Button
                            type="button"
                            onClick={!isEditing ? handleEditProfile : handleSaveChanges}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Profile;
