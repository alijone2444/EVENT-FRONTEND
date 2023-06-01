
import axios from './axiosInterceptor';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/requests.css'
import MyImage2 from './images/editedlogo_.png'

function RequestsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/Requests')
    .then(response => {
      setData(response.data);
      })
        .catch(error => {
        console.log(error);
        })
    }, []);
  
  const handleReject = (index) => {
    const newData = [...data];
    const rejectedItem = newData[index];
    axios.delete('http://localhost:3002/Requests',
    {
      data : rejectedItem
    })
    .then(response=>{
      if (response.data ==="True"){
        console.log(response.data)
        newData.splice(index, 1);
        setData(newData);
      }
    })
    .catch(error=>{
      console.log(error)
    });
  }
    const handleAccept = (index) => {
      const newData = [...data];
      const rejectedItem = newData[index];
      axios.post('http://localhost:3002/Requests',
      {
        data : rejectedItem
      })
      .then(response=>{
        if (response.data ==="True"){
          console.log(response.data)
          newData.splice(index, 1);
          setData(newData);
        }
      })
      .catch(error=>{
        console.log(error)
      });
  };

  return (
    <div className='body-2'>
      <div className='col'>
          <div className='heading row'>
            <div style={{display:"flex",flexDirection:"row"}}>
              <a><img src={MyImage2} alt='.'className='img-fluid height'/></a>
              <h3 className='heading-name'>Requests</h3>            
            </div>
          </div>
          <div className='table-parent row'>
          <table className='table table-bordered'>
            <thead className='table-heading'>
              <tr>
                <th>Username</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
               { console.log(data.length)}
                {data.length > 0 &&(console.log("here"),
            <tbody>
             
              {data.map((item,index) => (
                <tr key={item.username}>
                  <td>{item.username}</td>
                  <td>{item.date}</td>
                  <td>
                    <button className='btn btn-success margin' onClick={() => handleAccept(index)}>accept</button>
                    <button className='btn btn-danger margin' onClick={() => handleReject(index)}>reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
)}
          </table>
        
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
