import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AiOutlineLogin,AiOutlineUserAdd} from 'react-icons/ai'
import Cookies from 'js-cookie';

function Forme() 
{
// const token = Cookies.get('token');

const navigate = useNavigate()
// const onLoginPress = () => {
//   navigate('/Home')
// }

const [error, setError] = useState("");
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [userType, setUserType] = useState('');

const handleUserTypeChange = (event) => {
  setUserType(event.target.value);
}
const handleChangeusername = event => {
setUsername(event.target.value);
}
const handleChangepassword = event => {
setPassword(event.target.value);
}
const GoToSignup = e => {
  e.preventDefault();
  navigate('/Signup');
  };
const errorfield = document.getElementById("errorfield");
const handleLogin = (e) => {
  e.preventDefault();
  axios.post('https://event-backend-test.vercel.app/login', {
    usertype: userType,
    username: username,
    password: password
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
  .then((response) => {
    if (response.data.status===false){
    setError("Account not found");
    errorfield.style.color = "red";
    }
    else{
      setError("logging in");
      console.log( response.data.token)
      Cookies.set('token', response.data.token, { expires: 6, sameSite: 'strict' });
      axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;
      navigate('/Home');
      errorfield.style.color = "blue";}
})
  .catch((error) => {
    console.log(error);
  });
}
  return (
    <div>
        <div className="sub-container ">
            <h1 style={{color:"white"}}>Login <span className="badge bg-new-2">Portal</span></h1>
            <div>
                <form id = "signup-form">
                    <select className="form-select margin-top" value={userType} onChange={handleUserTypeChange} id="user-type" >
                    <option hidden>Select User Type</option>
                    <option>Admin</option>
                    <option>society president</option>
                    <option>Student</option>
                    </select>
                    <input onChange={handleChangeusername} value={username} type="text"className="form-control margin-top"style={{}} id="id"placeholder="User Name"/>
                    <input onChange={handleChangepassword}type="password" value={password}className="form-control margin-top"id="password"placeholder="Enter password"/>
                    <div><h6 id="errorfield">{error}</h6></div>
                    <a href="#" className="text-decoration-none margin-top"style={{color:"white"}}>Forget Password?</a>
                  </form>
                <form style={{display:'flex',flexDirection:'column'}}>
                  <div className="btn-group-vertical">
                      <button onClick={(e) => { handleLogin(e)}}  type="submit" className="btn btn-info margin-top "> Login<AiOutlineLogin/></button>
                      <button onClick={(e) => { GoToSignup(e)}}  type="submit" className="btn btn-primary margin-top "> Signup<AiOutlineUserAdd/></button>
            
                    </div>
                  </form>
          </div>
      </div>
    </div>
);
}


export default Forme;