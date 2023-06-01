import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './styles/footer.css'
import { AiOutlineEnvironment ,AiOutlinePhone ,AiOutlineMail ,AiOutlineInstagram, AiFillFacebook} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


const Footer = () => {

  const navigate = useNavigate()

  const handleabout = ()=>{
    navigate('/about')
  }
  return (
    <footer className="bg-dark text-light style">
      <Container>
        <Row>
          <Col md={6}>
            <div className="left-right-divs">
                <h5>Contact Us</h5>
                <p><AiOutlineEnvironment/> Ist ,TChowk ,Rawalpindi ,Pakistan</p>
                <p><AiOutlineMail />Email: contact@ist.com</p>
                <p><AiOutlinePhone/>Phone: +924242141293</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="left-right-divs">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                <div className="icons-btn">
                    <li>
                        <a href="https://www.facebook.com/IST.islamabad/"><AiFillFacebook/></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/ist_islamabad/?hl=en"><AiOutlineInstagram/></a>
                    </li>
                </div>
                <li>
                    <a href="/services">Services</a>
                </li>
                <li>
                    <a href="#" onClick={handleabout}>About</a>
                </li>
                </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-dark">
        &copy; {new Date().getFullYear()} <u>EVENT MANAGEMENT SYSTEM</u>.<ul> All rights reserved.</ul>
      </div>
    </footer>
  );
};

export default Footer;
