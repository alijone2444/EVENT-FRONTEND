import './styles/prof.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from './images/nophoto.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from './axiosInterceptor';
import { Buffer } from 'buffer';


function ProfileComponent() {
  const navigate = useNavigate();
  const handleBio = () => {
    navigate('/bio');
  };
  const [username, setusername] = useState('');
  const [img, setimg] = useState([]);
  const [intrest , setintrest] = useState('')
  useEffect(() => {
    axios
      .post('http://localhost:3002/profile')
      .then((response) => {
        setusername(response.data.username);
        setimg(response.data.image);
        setintrest(response.data.interest)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="first-hundredvh">
        <div className="col left-cont">
          <div className="username">
            <h1 style={{ color: 'rgb(193, 211, 34)' }}>{username}</h1>
            <div>
              <ButtonGroup className="flex-wrap">
                <Button variant="btn btn-trans" onClick={handleBio}>
                  Bio
                </Button>
                <Button variant="btn btn-trans">Photos</Button>
                <Button variant="btn btn-trans">Contacts</Button>
              </ButtonGroup>
              <div className="name-2">
                <div className="text display-5 waviy">
                  <span>H</span>
                  <span>E</span>
                  <span>Y</span>
                  <span>,</span>
                  <span>I</span>
                  <span>'</span>
                  <span>m</span>
                </div>
                <div className='text2 'style={{display:"flex",flexDirection:"row"}}>
                    <div className=" display-1 word1">{username.split(" ")[0]}</div>
                    <div className="display-1 word2">{" " + username.split(" ")[1]}</div>
                
                </div>
                
              </div>
              <div className="text3 display-6">
                <div className='hobies'>{intrest.split(',')[0]} / {intrest.split(',')[1]} / {intrest.split(',')[2]}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-cont">
          <img
            src={`data:image/jpeg;base64,${Buffer.from(img).toString(
              'base64'
            )}`}
            alt="."
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
