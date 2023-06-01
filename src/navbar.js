import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './styles/style_of_home_page.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { IoLogOutSharp } from 'react-icons/io5';
import Image from './images/nophoto.png';
import Cookies from 'js-cookie';
import { FaCamera } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import axios from './axiosInterceptor';
import { Buffer } from 'buffer';

function NavbarComponent(props) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/checkphoto').then(response=>{
      if (response.data.success===true){
        setImage(response.data.data.image)
      }
    }).catch(error=>{console.log(error)})
   
  }, []); 

  const HandleRequestBtn = e => {
    e.preventDefault();
    navigate('/Requests');
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/prof');
  };

  const handleSetImage = async (e) => {
    const selectedImage = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedImage);
  
    try {
      const response = await axios.post('http://localhost:3002/photosave', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data === false) {
        console.log('Already image present');
        setImage(null); // Reset the image state to null
      } else {
        setImage(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" style={{ background: 'transparent'}}>
      <Container style={{ margin: 0, maxWidth: '100%' }}>
        <div>
          <Navbar.Brand className="gradient-heading-topic">
            <span style={{ position: 'relative', marginRight: '5%' }}>
              <label type="file" className="add-img">
                <FaCamera />
                <input id="image-upload" type="file" onChange={e => handleSetImage(e)} style={{ display: 'none' }} />
              </label>
              <img
                src={image ? `data:image/jpeg;base64,${Buffer.from(image).toString('base64')}` : Image}
                className="profile-img"
                alt="."
              />
            </span>
            Event Bux
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              <label className="btn  btn-outline-2 btn-sm User-btn" htmlFor="btnradio2" onClick={handleProfile}>
                <FaUser className="icon-size" />
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
              </label>
            </Nav.Link>
            {props.data && <Nav.Link>
              <label className="btn  btn-outline-2 btn-sm Envelope-btn" htmlFor="btnradio2" onClick={HandleRequestBtn}>
                <FaEnvelope className="icon-size" />
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
              </label>
            </Nav.Link>}

            <Nav.Link>
              <label  className="btn  btn-outline-2 btn-sm logout-btn" htmlFor="btnradio1" onClick={handleLogout}>
                <IoLogOutSharp className="icon-size" />
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
              </label>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
