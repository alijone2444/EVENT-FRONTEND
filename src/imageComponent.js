import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style_of_home_page.css';


function Image(props) {
  return (
    <div>
    <img src={props.src} alt={props.alt} className="logo-image img-fluid "/>
    </div>
    );
}

export default Image;