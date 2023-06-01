import React, { useEffect, useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import './styles/bio.css';
import axios from './axiosInterceptor';
import Cookies from 'js-cookie';

const BioPage = () => {
  const [bioFields, setBioFields] = useState({
    gender: '',
    age: '',
    contactInfo: '',
    interests1: '',
    interests2: '',
    interests3: '',
  });
  const [status,setstatus] = useState('')
  const [tittle,settittle] = useState('Add you bio to complete profile')
  const [btnstatus,setbtnstatus] = useState("save")
  const [tittleClr,settittleClr] = useState("3px solid   rgb(224, 6, 6)")

  const username = Cookies.get('token');
  useEffect(()=>{
  axios
  .get('http://localhost:3002/bio',{params: {
    username: username
  },})
  .then(response => {if(response.data===true){
    settittle('Your bio is already completed');
    setbtnstatus("Update")
    settittleClr("3px solid  rgb(1, 196, 255)")
  }})
  .catch(error => console.error(error));
})
    const handlesave = () =>{
        console.log( bioFields.gender,
            bioFields.age,
            bioFields.contactInfo,
            bioFields.interests)
    axios
    .post('http://localhost:3002/bio',{
        username:username,
        gender:bioFields.gender,
        age:bioFields.age,
        contact:bioFields.contactInfo,
        interests:bioFields.interests
    })
    .then(response => {setstatus("bio suscessfully saved");})
    .catch(error => console.error(error));
    }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBioFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const calculateProgress = () => {
    const requiredFields = Object.values(bioFields);
    const completedFields = requiredFields.filter((field) => field !== '');
    return (completedFields.length / requiredFields.length) * 100;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bioFields);
  };

  const progress = calculateProgress();

  return (
    <div className="bio-body tittle-bio">
        <div className='tittle-name' style={{ borderBottom: `${tittleClr}` }}>{tittle}</div>

      <div className="data-container">
        <h1 className="bio-heading">Bio</h1>
        <ProgressBar now={progress} label={`${progress}%`} className="custom-progress" />
        <Form onSubmit={handleSubmit}>
          <div className="fields-area">
            <div className="sub-fields-area">
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={bioFields.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    as="select"
                    name="age"
                    value={bioFields.age}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Age</option>
                    {Array.from({ length: 100 }, (_, index) => (
                    <option key={index} value={index + 1}>
                        {index + 1}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>

              <Form.Group controlId="contactInfo">
                <Form.Label>Contact Info</Form.Label>
                <Form.Control
                  type="text"
                  name="contactInfo"
                  value={bioFields.contactInfo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="interests">
  <Form.Label>Interests</Form.Label>
  <Form.Control
    as="textarea"
    rows={4}
    name="interests"
    value={bioFields.interests}
    onChange={handleChange}
    required
    placeholder="Enter three different interests, separated by commas"
  />
</Form.Group>
          <Button  onClick={handlesave} variant="primary" type="submit" style={{ marginTop: '2%' }}>
            {btnstatus}
          </Button>
          <Form.Label style={{color:"green",display:"block"}}>{status}</Form.Label>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BioPage;
