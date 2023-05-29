import React from 'react';
import './index.css';
import Image from './imageComponent';
import SignupScreen from './form_signup';
import myImage from './images/ist_logo.png';
import App from './animation';
function Signup(props) {
  return (
    <div className='container1' style={{display: 'flex',borderTop:"20px solid blue",borderBottom:"20px solid blue",borderImage: 'linear-gradient(to right, #1c92d2,white,#1c92d2)',borderImageSlice:1,justifyContent: 'center', height: '100vh', backgroundImage: "linear-gradient( to left,#1c92d2,#f2fcfe,white )"
}}>
     <div >
        <App/>
    </div>
   
        <div className='left-container'>
            <Image src={myImage} alt="My Image"className="logo-image img-fluid"/>
        </div>
        <div className='right-container'>
        <SignupScreen/>   
        </div>
    </div>
    );
}

export default Signup;