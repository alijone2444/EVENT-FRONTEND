import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Ticket = ({ data, show, handleClose }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data.TicketPrice);
  const navigate = useNavigate()

  const handleTicketForm = () =>{
    navigate('/ticketbook')
  }
  const handleTicketCountChange = (event) => {
    const count = parseInt(event.target.value);
    if (isNaN(count)) {
      setTicketCount(0);
      setTotalPrice('Enter amount');
    } else {
      setTicketCount(count);
      setTotalPrice(count * data.TicketPrice);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your ticket booking logic here
    // You can access the selected ticket count using the 'ticketCount' state
    // Close the modal or perform any other necessary actions
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ticket Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ticket-count">
            <Form.Label>Number of Tickets:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              value={ticketCount === 0 ? '' : ticketCount}
              onChange={handleTicketCountChange}
              required
            />
            <h3>
              <Badge variant="primary">{totalPrice}</Badge>
            </h3>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleTicketForm}>
            Book Tickets
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Ticket;
