import {useState} from "react";
import { useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';
import './styles/openevent.css'
import Timecount from './timer.js'
import SimpleMap from './mapcomponent.js'
import LikeDislikeComponent from './like_dislike.js';
import Ticket from "./ticketComponent";
function OpenedEvent(){
    const { state } = useLocation();
    const [data, setData] = useState(state?.data || []);

    const [showModal, setShowModal] = useState(false);
    
    const handleOpenModal = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
console.log("empty",data)
    return(
        
        <div className="my-container">
            <div className=" building-div">
                <img src={`data:image/jpeg;base64,${Buffer.from(data.image).toString('base64')}`} alt='.' className='img-fluid '/>
            </div>
            <br/>
            <div>    
                 <LikeDislikeComponent data={data}/>
             </div>
            <div className="name display-6">
                {data.EventName}
            </div>
            <Timecount data={data}/>
            <div className="get-ticket"><button className="btn btn-primary" onClick={handleOpenModal} >Get Tickets</button></div>
            {showModal && <Ticket show={showModal} data={data} handleClose={handleCloseModal}/>}
                                    
            <div className="info-container">
                <div>
                    <h1 className="display-6 header">Orgenizers:</h1>
                    <p className="paragraph">{data.EventOrganizers}</p>
                </div>
            </div>
            
            <div className="info-container">
                <div>
                    <h1 className="display-6 header">Address:</h1>
                    <p className="paragraph">{data.Place}</p>
                    
                    <div className="address-container"><SimpleMap /></div>
                </div>
            </div>
            <div className="info-container">
                <div>
                    <h1 className="display-6 header">Discription:</h1>
                    <p className="paragraph">{data.about}</p>
                </div>
            </div>
        </div>
    )
}
export default OpenedEvent;