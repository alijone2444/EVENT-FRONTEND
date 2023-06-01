import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './styles/popup.css';
import { useEffect } from 'react';
import axios from './axiosInterceptor';

function BannerPopup() {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data , setData] = useState([])

  const handleClose = () => {
    localStorage.setItem('isLoggedIn', 'false');
    console.log(localStorage.getItem('isLoggedIn'))
    setShowModal(false);
  };
  useEffect(() => {
        console.log("runned")
        axios.get('http://localhost:3002/Home')
        .then(response => {setData(response.data);setIsLoading(false);})
        .catch(error => console.error(error));
},[]);
// Assuming 'data' is the array of dates
const currentDate = new Date();
let closestDate = null;
let closestDateDifference = Infinity;
let event_name = "";

for (let i = 0; i < data.length; i++) {
const obj = data[i];
const eventDate = new Date(obj.DateHeld);

// Calculate the difference in milliseconds between current date and event date
const difference = Math.abs(eventDate - currentDate);

if (difference < closestDateDifference) {
    closestDateDifference = difference;
    closestDate = eventDate;
    event_name = obj.EventName
    ;
}
}


console.log("The closest date is:", closestDate);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Wait for 2 seconds


    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='modal-body'>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{borderRight:"5px solid grey"}}>
          <Modal.Title className='tittle'>Upnext( {event_name})</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{borderRight:"5px solid grey"}}>
        {isLoading ? (
        <p>Loading...</p>
      ) : (<div className='data'>
        <p>Next event on : {closestDate.toLocaleString().split(",")[0]}</p>
        <p>time : {closestDate.toLocaleString().split(",")[1]}</p>
        </div>
      )}
        </Modal.Body>
        <Modal.Footer style={{borderRight:"5x solid grey",display:"flex",justifyContent:"center"}}>
          <Button variant="secondary" onClick={handleClose}style={{background:"purple"}} >Notify me</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BannerPopup;
