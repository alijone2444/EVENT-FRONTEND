import React,{useState,useEffect} from 'react';
import { Buffer } from 'buffer';
import './index.css';
import './styles/style_of_home_page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyImage from './images/event_container_background.jpg'
import { ButtonGroup} from 'react-bootstrap';
import NavbarComponent from './navbar';
import AddEvent from './AddEvent.js';
import {AiOutlineEdit,AiOutlineSchedule} from 'react-icons/ai';
import Nav from 'react-bootstrap/Nav';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import App from './homeanimation';
import Footer from './footer.js'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import BannerPopup from './time_popup';

function EventsMainPage() {
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [userType, setusertype] = useState(false);
    const months = {"01":"Jan","02":"Feb","03":"Mar","04":"April","05":"May","06":"June","07":"July","08":"Aug","09":"Sept","10":"Oct","11":"Nov","12":"Dec"}
    const [upnext,setupnext]=useState('')

    useEffect(() => {
        axios.get('http://localhost:3002/UserCheck')
            .then(response => {setusertype(response.data);})
            .catch(error => console.error(error));
        }
    ,[]);
    useEffect(() => {
        if(!IsLoading){
            console.log("runned")
        axios.get('http://localhost:3002/Home')
            .then(response => {setData(response.data);setIsLoading(false);})
            .catch(error => console.error(error));
        }
    },[IsLoading]);
    
    const handleAddEvent = () => {
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const handlePostSuccess = (newEvent) => {
       setIsLoading(false);
    };
    const handlesettingtrue = (e)=>{
      setIsLoading(true)
    }
    async function handleDelete(){
        const username = Cookies.get('token');
        axios.delete('http://localhost:3002/delEventsUserTypeCheck', { data: { token: username } })
          .then(response => {
            console.log("result", response.data);
                if (response.data === true) {
                  navigate('/deletepage', { state: { data: data ,type:true} });
                } else {
                  navigate('/deletepage', { state: { data: response.data ,type:false} });
                }
        })
          .catch(error => {
            console.error(error);
          });
    }
    const handleOpenEvent =(item)=>{
        console.log("data sending",item)
        navigate('/Event', { state: { data: item ,type:true} })
    
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log(localStorage.getItem('isLoggedIn'))
    return (
    <div className='body'>
        <App/>
        {isLoggedIn && <BannerPopup/>}
        <NavbarComponent data={userType}/>
        <div className="container empty-white ">
            <div className="row ">
                <div className="col ">
                    <img src={MyImage} alt='.' className='img-fluid img-height '/>
                </div>
            </div>
            <div className="row " >
                <div className="col">
                    <div className='container center-events-buttons-div'>            
                    
                    <div className="row TwoBtnGroup" >
                        <div className='col'style={{textAlign:"left"}}>
                        <h3><span  className='gradient-heading-2'>Events</span><span className="badge bg-new">upcomming</span></h3>
                        </div>
                        <div className='col'>
                            <Nav variant="tabs" defaultActiveKey="/home" style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                <Nav.Item>
                                {userType && <ButtonGroup className='length-group-btn'>
                                        <button className='btn btn-new btn-sm 'onClick={(e)=>{handleAddEvent(e)}}>add< AiOutlineSchedule className='icon-size'/></button>
                                        {showModal && <AddEvent onPostSuccess={handlePostSuccess} settingTrue={handlesettingtrue} onClose={handleCloseModal} />}
                                    
                                      
                                        <button className='btn btn-new btn-sm'onClick={handleDelete}>edit/delete<AiOutlineEdit className='icon-size'/></button>
                                        
                                    </ButtonGroup>}
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                    <div  className="image-buttons-group">   
                        {data.map((item)=>
                        <div key={item.EventName}> 
                        <button className="image-button" onClick={()=>handleOpenEvent(item)}>
                            <div className='like-dislike'>
                            <div className='intrested'>
                                Intrested
                                <h6 style={{ paddingLeft: "5px"}}>
                                    {item.likes ? item.likes : "0"}
                                </h6>
                                </div>
                            </div>
                            <img src={`data:image/jpeg;base64,${Buffer.from(item.image).toString('base64')}`} alt='.' className='img-fluid image-style'/>
                            
                            <div className='inline'>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"10px",height:"20%"}}>
                                    <div style={{display:"grid", gridTemplateRows:" repeat(3, 1fr)"}}>
                                        <div>
                                            
                                        {months[item.DateHeld.split("-")[0]]}
                                        </div>
                                        <div>
                                            <b>{item.DateHeld.split("-")[1]}</b>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="button-text-bottom">
                                    <div>
                                        <b>{item.EventName}</b>
                                    </div>
                                    <div>
                                    <p className='truncate'>{item.about}</p>
                                    </div>
                                </div>
                            </div>
                            </button>
                        </div>
                    
                        )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
        <div style={{zIndex:"1",marginTop:"5%"}}>
            <Footer/>
        </div>
    </div>
    );
}

export default EventsMainPage;