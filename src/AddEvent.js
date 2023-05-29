import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import './index.css';
import './styles/addevent.css';
import axios from 'axios';
import { Modal, Button, Form, Image } from 'react-bootstrap';

function AddEvent({ onClose, onPostSuccess, settingTrue }) {
  const [error, seterror] = useState('');
  const [show, setShow] = useState(true);
  const [textOrN, setTextOrN] = useState('');
  const [image, setImage] = useState(null);
  const [textN, setTextN] = useState('');
  const [textA, setTextA] = useState('');
  const [textD, setTextD] = useState('');
  const [textDate, setTextDate] = useState('');
  const [textI, settextI] = useState('');
  const [organizer, setOrganizer] = useState([]);
  const [formStyles, setFormStyles] = useState({
    colorName: 'grey',
    AdressColor: 'grey',
    discriptColor: 'grey',
    ImgColor: 'grey'
  });
  const [lengthstatus, setLengthStatus] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [ticketPrice, setTicketPrice] = useState(1);

  useEffect(() => {
    axios
      .get('http://localhost:3002/findorganizers')
      .then(response => {
        setOrganizer(response.data);
        console.log(organizer);
      })
      .catch(error => console.error(error));
  }, []);
  const handleTicketPriceChange = event => {
    setTicketPrice(event.target.value);
  };

  const handleClose = e => {
    setShow(false);
    onClose();
  };

  const handleName = e => {
    setTextN(e.target.value);
    const words = textN.split(' ');
    try {
      if (words.length < 2) {
        setFormStyles(prevState => ({ ...prevState, colorName: 'red' }));
        setLengthStatus(false);
      } else {
        setFormStyles(prevState => ({ ...prevState, colorName: 'green' }));
        setLengthStatus(true);
      }
    } catch {}
  };

  const handleOrganizerName = e => {
    setTextOrN(e.target.value);
    setLengthStatus(true);
  };

  const handleDate = e => {
    setTextDate(e.target.value);
    try {
      if (e.target.value.length !== 0) {
        setFormStyles(prevState => ({ ...prevState, dateColor: 'green' }));
        setLengthStatus(true);
      } else {
        setLengthStatus(false);
      }
    } catch {}
  };

  const handleAdress = e => {
    setTextA(e.target.value);
    const words = textA.split(',');
    try {
      if (words.length < 2) {
        setFormStyles(prevState => ({ ...prevState, AdressColor: 'red' }));
        setLengthStatus(false);
      } else {
        setLengthStatus(true);
        setFormStyles(prevState => ({ ...prevState, AdressColor: 'green' }));
      }
    } catch {}
  };

  const handleDiscription = e => {
    setTextD(e.target.value);
    const words = textD.split(' ');
    try {
      console.log(lengthstatus);
      if (words.length < 10) {
        setFormStyles(prevState => ({ ...prevState, discriptColor: 'red' }));
        setLengthStatus(false);
      } else {
        setFormStyles(prevState => ({ ...prevState, discriptColor: 'green' }));
        setLengthStatus(true);
      }
    } catch {}
  };

  const handleImageChange = e => {
    settextI(e.target.value);
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    if (selectedImage !== undefined) {
      setLengthStatus(true);
    } else {
      setLengthStatus(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      !textN ||
      !textOrN ||
      !textA ||
      !textD ||
      !textDate ||
      !textI ||
      lengthstatus === false
    ) {
      setIsEmpty(true);
      seterror('Fill in the empty fields');
    } else {
      setIsEmpty(false);
    }
  };

  const handleSaveChanges = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', textN);
    formData.append('organizerName', textOrN);
    formData.append('date', textDate);
    formData.append('address', textA);
    formData.append('discription', textD);
    formData.append('ticketsPrice', ticketPrice);
    formData.append('image', image);

    settingTrue();
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };

    axios
      .post('http://localhost:3002/modal', formData, config)
      .then(response => {
        onPostSuccess(response);
      })
      .catch(error => {
        console.log(error);
      });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              onChange={e => handleName(e)}
              style={{ color: formStyles.colorName }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Organizer's Name</Form.Label>
            <Form.Control
              as="select"
              onChange={e => handleOrganizerName(e)}
              style={{ color: formStyles.ORN }}
            >
              <option value="">Select organizer</option>
              {organizer &&
                organizer.map((org, index) => (
                  <option key={index} value={org.EventOrganizers}>
                    {org.EventOrganizers}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Set Date</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={e => handleDate(e)}
              style={{ color: formStyles.dateColor }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event address ( ----,---- )"
              onChange={e => handleAdress(e)}
              style={{ color: formStyles.AdressColor }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter event description (10 - 500)"
              onChange={e => handleDiscription(e)}
              style={{ color: formStyles.discriptColor }}
            />
          </Form.Group>

          <Form.Group controlId="ticket-count">
            <Form.Label>Set Ticket Price:</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={ticketPrice}
              onChange={handleTicketPriceChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select image</Form.Label>
            <Form.Control
              type="file"
              onChange={e => handleImageChange(e)}
              style={{ color: formStyles.ImgColor }}
            />
            <div className="image-container">
              {image && <Image src={URL.createObjectURL(image)} alt="Selected Image" />}
            </div>
            <FaEdit className="edit-icon" />
          </Form.Group>
        </Form>
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={isEmpty}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEvent;
