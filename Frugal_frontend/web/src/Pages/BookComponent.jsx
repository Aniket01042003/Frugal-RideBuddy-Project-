import React from 'react';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingComponent = () => {
    return (
        <div className="container mt-5">
            <Row className="align-items-center">
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Pickup location" aria-label="Pickup location" />
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <i className="fas fa-arrow-right"></i>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Drop Location" aria-label="Drop Location" />
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <InputGroup>
                        <FormControl placeholder="1" aria-label="Number of Passengers" style={{ width: '50px' }} />
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Button variant="dark">Book</Button>
                </Col>
            </Row>
        </div>
    );
};

export default BookingComponent;