import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

function RenderAlert({onDelete,onClose}){
    const [show, setShow] = useState(true);

const handleDelete = () => {
    onDelete();
}
const handleClose = () => {
    setShow(false);
    onClose();}
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default RenderAlert;