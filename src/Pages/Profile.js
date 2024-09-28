import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import Logo from '../Components/Logo'

const Profile = () => {
  return (
<div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Form >
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={3}>
                Name
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Name" name="name" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                Email
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="email" placeholder="Email" name="email" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
                <Form.Label column sm={3}>
                Phone
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="text" placeholder="Phone" name="phone" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                <Form.Label column sm={3}>
                Age
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="number" placeholder="Age" name="age" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                <Form.Label column sm={3}>
                Weight
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="number" placeholder="Weight" name="weight" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
                <Form.Label column sm={3}>
                Workout Time
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="time" placeholder="Workout Time" name="workout_time" />
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