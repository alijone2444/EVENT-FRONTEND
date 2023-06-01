import React, { useState ,useEffect} from "react";
import { Modal, Button, Form,Image } from "react-bootstrap";
import axios from 'axios';
import { Buffer } from 'buffer';
import RenderEditAlert from './editalert';
import {FaMapMarkerAlt} from 'react-icons/fa';
function EventsEditModal({selectedItems,onhide,onPostSuccess,settingtrue}){
    
  const [formdata,setFormData] = useState(null)
  const [show,setshow] = useState(true)
  const [eventName,seteventName] = useState('')
  const [organizerName,setorganizerName] = useState('')
  const [date,setdate] = useState('')
  const [place,setplace] = useState('')
  const [discription,setdiscription] = useState('')
  const [image,setImage] = useState(null);
  const [imageBuffer,setimageBuffer ] = useState('')
  const [id,setid ] = useState('')
  const [time,settime] = useState('')
  const [textI,settextI] = useState('')
  const [lengthstatus,setlengthstatus] = useState(false)
  const [error,seterror] = useState('')
  const [showAlert,setshowAlert] = useState(false);
   const [formattedDate,setformattedDate] = useState('')
   const [createdby,setcreatedby] = useState('')
   const [organizer, setOrganizer] = useState([]);
  const [formStyles, setFormStyles] = useState({
    colorName: 'grey',
    ORN: 'grey',
    AdressColor: 'grey',
    discriptColor:'grey',
    ImgColor:'grey'
  });
  useEffect(() => {
    axios
      .get('http://localhost:3002/findorganizers')
      .then(response => {
        setOrganizer(response.data);
        console.log(organizer);
      })
      .catch(error => console.error(error));
  }, []);

      
  useEffect(() => {
    axios.get('http://localhost:3002/getEventdata', { 
      params: { 
        EventName: selectedItems[0].items.EventName 
      }  
    })
    .then(response => {
      setFormData(response.data)
    })
    .catch(error => console.error(error));
  }, [selectedItems]);
if (formdata!==null){ 
  console.log("form:",formdata[0]._id)

}

  //pre filling fields 
  useEffect(() => {
    if (formdata) {
      setid(formdata[0]._id)
      seteventName(formdata[0].EventName);
      setorganizerName(formdata[0].EventOrganizers);
      setdate(formdata[0].DateHeld);
      setplace(formdata[0].Place);
      setdiscription(formdata[0].about);
      setimageBuffer(formdata[0].image)
      settime(formdata[0].time)
      setcreatedby(formdata[0].createBy)

      const dateStr = formdata[0].DateHeld;
      const [month, day, year] = dateStr.split("-");
      setformattedDate(`${year}-${month}-${day}T${formdata[0].time}:00`);

      console.log(`${year}-${month}-${day}T${formdata[0].time}:00`)
    }
  }, [formdata]);
  //pre filling fields left
  const handleDel=()=>{
      console.log("editmodal",selectedItems)
        setshow(false)
        onhide()
      }
      
  const handleImageChange = (e) => {
   // {`data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`}
    settextI(e.target.value)
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      if (selectedImage!==undefined){
        setlengthstatus(true)
      }
      else{
        setlengthstatus(false)
      }
    };
    const handleSubmit = (e)=>{
      e.preventDefault();
      
      if ((!eventName || !organizerName || !place || !date || !discription ) ){
        seterror("fill in the empty fields")
      } else {
        setshowAlert(true)
      }
      }
    
  const handleClose = () => {setshowAlert(false);};
const handleEdit = () =>{
  const formData2 = new FormData();
  formData2.append('id', id);
  formData2.append('eventName', eventName);
  formData2.append('organizerName', organizerName);
  formData2.append('date', formattedDate);
  formData2.append('address', place);
  formData2.append('discription', discription);
  formData2.append('createdby',createdby)
  formData2.append('image', image);
  for (var key of formData2.entries()) {
    console.log(key[0] + ', ' + key[1]);
   }
   settingtrue()
const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}
axios.post("http://localhost:3002/modalEdit", formData2, config)
  .then(response => {
      onPostSuccess(response)
  })
  .catch(error => {
      console.log(error);
  });    handleClose()};


    return(
      <Modal show={show} onHide={handleDel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
            value={eventName}
              type="text"
              name="eventName"
              onChange={(e) => seteventName(e.target.value)}
            />
            <Form.Group>
              <Form.Label>Organizer's Name</Form.Label>
              <Form.Control
                as="select"
                value={organizerName}
                onChange={(e) => setorganizerName(e.target.value)}
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
          </Form.Group>
          <Form.Group>
  <Form.Label>Date & Time</Form.Label>
  <Form.Control
    type="datetime-local"
    name="dateTime"
    value={formattedDate}
    onChange={(e) => setformattedDate(e.target.value)}
  />
</Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <div className="address-input" style={{ position: "relative" }}>
              <Form.Control
                type="text"
                placeholder="Enter event address ( ----,---- )"
                
              name="address"
              value={place}
              onChange={(e) => setplace(e.target.value)}style={{ color: formStyles.AdressColor, paddingRight: "40px" }}
              />
              <button className="location-button" style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }}>
                <FaMapMarkerAlt />
              </button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={discription}
              onChange={(e) => setdiscription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select image</Form.Label>
            <Form.Control type="file" onChange={(e)=>handleImageChange(e)}  style={{color:formStyles.ImgColor}}/>
            <div className='image-container'>
              {image 
              ? <Image src={URL.createObjectURL(image)} alt="Selected Image" />
              : <Image src={`data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`} alt="Default Image" />
                }
            </div>
                  <div style={{color:"red"}}>{error}</div>
          </Form.Group>
          <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} >
            Apply
          </Button>
          {showAlert && <RenderEditAlert  onClose={handleClose} onEdit={handleEdit}/>}
                        
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EventsEditModal;