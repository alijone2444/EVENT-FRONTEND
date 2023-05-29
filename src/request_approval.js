import React from 'react';
import myImage from './images/tick.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function RequestApprovalScreen(){
return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <div><img src={myImage} alt='not availabe'className='img-fluid logo-image'style={{width:"10%",height:"40%"}}/>
        <h1>request send sucessfully</h1>
        <h6>wait for the approval of request by admin and come by later </h6>
        </div>  
        
    </div>
    
);}

export default RequestApprovalScreen;