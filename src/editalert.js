import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

function RenderEditAlert({onEdit,onClose}){
    const [show, setShow] = useState(true);

const handleedit = () => {
    onEdit();
}
const handleClose = () => {
    setShow(false);
    onClose();}
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit this event ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleedit}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default RenderEditAlert;