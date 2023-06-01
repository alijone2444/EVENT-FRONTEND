import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInterceptor';
import {AiOutlinePlus} from 'react-icons/ai'

function SignupForm() 
{  
const navigate = useNavigate()

const [error, setError] = useState("");
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [Confirmpassword, setConfirmPassword] = useState('');
const [userType, setUserType] = useState('');

const handleEnteredusername = event => {
  setUsername(event.target.value);}

  const handleEnteredpassword = event => {
  setPassword(event.target.value);}  

  const handleEnteredConfirmpassword = event => {
  setConfirmPassword(event.target.value);}

  const handleSignup = (e) => {
    e.preventDefault();
    const errorfield = document.getElementById("errorfield");
    if (password === Confirmpassword && username) {
      axios.post('http://localhost:3002/Signup', {
        userType : userType,
        username: username,
        password: password,
        Confirmpassword: Confirmpassword,
      })
        .then((response) => {
          if (response.data.status==="False"){
          setError("User name already taken");
          errorfield.style.color = "red";
          }
          else{
            setError("sucessfuly created");
            navigate("/pending")
            errorfield.style.color = "blue";}
  })
        .catch((error) => {
          console.log(error);
        });
    } else {
    if (!username || !password || !Confirmpassword) {
      setError("All fields are required");
      errorfield.style.color = "red";
      return;
    }

    if (password !== Confirmpassword) {
      setError("Passwords do not match");
      errorfield.style.color = "red";
      return;
    }

    // Submit the form if there are no errors
    setError("");
    console.log("Form submitted");
    }
  };
  
const handleUserTypeChange = (event) => {
  setUserType(event.target.value);
}
  return (
    <div className="right-div ">
        <div className="sub-container ">
              <h1 style={{color:"white"}}>Signup <span className="badge bg-info">Portal</span></h1>
            <div>
                <form id = "signup-form">
                    <select className="form-select margin-top" value={userType} onChange={handleUserTypeChange} id="user-type" >
                        <option hidden>Select User Type</option>
                        <option>society president</option>
                        <option>Student</option>
                      </select>       
                    <input onChange={handleEnteredusername} value={username} type="text"className="form-control margin-top"id="id"placeholder="User Name"/>
                    <input onChange={handleEnteredpassword}type="password" value={password}className="form-control margin-top"id="password"placeholder="Enter password"/>
                    <input onChange={handleEnteredConfirmpassword} type="password" value={Confirmpassword}className="form-control margin-top"placeholder="confirm password"/>
                    <div><h6 id="errorfield">{error}</h6></div>
                  </form>

                <form style={{display:'flex',flexDirection:'column'}}>
                  <div className="btn-group-vertical">
                       <button onClick={(e) => { handleSignup(e)}} type="submit" className="btn btn-info margin-top "> Create Account<AiOutlinePlus/></button>
            
                    </div>
                </form>
          </div>
      </div>
    </div>
);
}


export default SignupForm;