import React from 'react';
import './index.css';
import Image from './imageComponent';
import Forme from './formLogin.js';
import myImage from './images/ist_logo.png';
import App from './animation';
function Login(props) {
  return (
    <div className='container1'>
    <div >
        <App/>
    </div>
        <div className='left-container'>
            <Image src={myImage} alt="My Image"/>
        </div>
        <div className='right-container'>
        <Forme/>   
        </div>
        
    </div>
    );
}

export default Login;