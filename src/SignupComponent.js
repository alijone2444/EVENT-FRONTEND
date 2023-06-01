import React from 'react';
import Image from './imageComponent';
import SignupScreen from './form_signup';
import myImage from './images/ist_logo.png';
import App from './animation';
function Signup(props) {
  return (
    <div className='container1' >
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