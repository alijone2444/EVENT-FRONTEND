import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import './styles/openevent.css'

const LikeDislikeComponent = (props) => {
  const [liked, setLiked] = useState(false);
  const [Disable, setdisable] = useState(false);

  useEffect(()=>{
    axios.post('http://localhost:3002/Event', { eventname: props.data.EventName })
      .then((response) => {
        if (response.data === false) {
          setdisable(true)
        }
        else{
          setdisable(false)
        }
      })
      .catch((error) => console.error(error));
  },[])

  const handleLike = () => {
    axios.post('http://localhost:3002/Event', { data: 'like', eventname: props.data.EventName })
      .then((response) => {
        setdisable(true)
        if (response.data === true) {
          setLiked(!liked);
          console.log('liked');
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Button className='btnhover' disabled={Disable} style={{border:"2px solid grey",fontFamily:"Helvetica",fontSize:"larger"}} variant="light" onClick={handleLike}>
      Intrested<FaThumbsUp   style={{fontSize:"larger",paddingBottom:"4px"}}/>
       </Button>{' '}
    </div>
  );
};

export default LikeDislikeComponent;
