import { useLocation } from 'react-router-dom';
import React,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/requests.css'
import axios from 'axios';
import RenderAlert from './alert';
import Cookies from 'js-cookie';
import EventsEditModal from './editModal.js';
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai';


function DeleteEvent(props){
    const { state } = useLocation();
    const [data, setData] = useState(state?.data || []);
    const [type,settype] = useState(state?.type || '');
    const [selectedItems, setSelectedItems] = useState([]);
    const [showAlert,setshowAlert] = useState(false);
    const [showEdit,setshowEdit] = useState(false);
    const [IsLoading,setIsLoading] = useState(false)
  
  const handleCheckboxChange = (event, items, index) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, { items, index }]);
    
    } else {
      setSelectedItems(selectedItems.filter(item => item.index !== index));
    }
  };
  const handleDelete = () => {
    if (selectedItems.length !== 0){
      setshowAlert(true)
  }    
  }
  const deletecontinue = () =>{
    console.log("delete continue")
    if (type===true){
    selectedItems.forEach(item => {
      axios.delete('http://localhost:3002/delEvents', {data: {EventName: item.items.EventName}})
        .then(response => {setData(response.data);console.log("res:",response.data)})
        .catch(error => console.error("error"));
    });}
    else{
      const username = Cookies.get('token');
      selectedItems.forEach(item => {
        axios.delete('http://localhost:3002/delEventsstd', {data: {EventName: item.items.EventName,token:username}})
          .then(response => {setData(response.data);console.log("res:",response.data)})
          .catch(error => console.error("error"));
      });}    
    setshowAlert(false)
  }
  const handleEdit = () =>{
    if (selectedItems.length ===1){
    setshowEdit(true)}
  }

  const handleClose = () => {setshowAlert(false);};

    return(
        <div>
    <div className='col'>
          <div className='heading row'>
            <div className='set-heading-div'>
              <h1 style={{fontWeight:'lighter',paddingRight:"20px",paddingLeft:"20px"}}>Events</h1>      
            </div>
          </div>    
          <div className='setting-buttons'>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-new-2" onClick={handleDelete}>delete<AiOutlineDelete/></button>
                {showAlert && <RenderAlert onDelete={deletecontinue} onClose={handleClose}/>}
                <button type="button" class="btn btn-new-2" onClick={handleEdit}>&nbsp;&nbsp;edit<AiOutlineEdit/>&nbsp;&nbsp;</button>
                {showEdit && <EventsEditModal selectedItems={selectedItems} onPostSuccess={()=>{setIsLoading(false);}}onhide={() => {setshowEdit(false);console.log(selectedItems)}}settingtrue={()=>{setIsLoading(true);}}/>}
            </div>
          </div>
          
          <div className='table-parent row'>
          <table className='table table-bordered'>
            <thead className='table-heading'>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>select</th>
                
              </tr>
            </thead>
               
            <tbody>
             {data.map((items,index)=>(
                <tr key={index}>
                  <td>{items.EventName}</td>
                  <td>{items.DateHeld}</td>
                  <td><input type='checkbox' onChange={event => handleCheckboxChange(event, items, index)}></input></td>
                </tr>
             ))}
            </tbody>

          </table>
        
        </div>
      </div>
        </div>    
    )
}
export default DeleteEvent;