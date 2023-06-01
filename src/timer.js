import { useState, useEffect } from 'react';
import './styles/openevent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from './images/clock.png';
import axios from './axiosInterceptor';
function Timecount(props) {
  const targetDate = new Date(props.data.time + ' ' + props.data.DateHeld);
  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const [days, setDays] = useState(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((timeDifference / (1000 * 60 * 60)) % 24));
  const [minutes, setMinutes] = useState(Math.floor((timeDifference / (1000 * 60)) % 60));
  const [remainingSeconds, setRemainingSeconds] = useState(Math.floor((timeDifference / 1000) % 60));

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeDifference = targetDate.getTime() - new Date().getTime();

      if (updatedTimeDifference <= 0) {
        clearInterval(timer);
        console.log("time is zeroL",props.data.EventName)
        axios.delete('http://localhost:3002/delEvents', {data: {EventName: props.data.EventName}})
        .then(response => {console.log("deleted:",response.data)})
        .catch(error => console.error("error"));
        // Optionally, you can perform any action when the timer reaches zero.
      } else {
        // Recalculate days, hours, minutes, and seconds
        const updatedDays = Math.floor(updatedTimeDifference / (1000 * 60 * 60 * 24));
        const updatedHours = Math.floor((updatedTimeDifference / (1000 * 60 * 60)) % 24);
        const updatedMinutes = Math.floor((updatedTimeDifference / (1000 * 60)) % 60);
        const updatedRemainingSeconds = Math.floor((updatedTimeDifference / 1000) % 60);

        // Update the state variables with the new values
        setDays(updatedDays);
        setHours(updatedHours);
        setMinutes(updatedMinutes);
        setRemainingSeconds(updatedRemainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className='font'>
        <img src={Image} alt='.' className='img-fluid'/>
        remaining time
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='timer-div display-6'>
          <div className='box'>
            {`${days}`}
            <div className='label'>days</div>
          </div>
          <div className='box'>
            {`${hours}`}
            <div className='label'>hours</div>
          </div>
          <div className='box'>
            {`${minutes}`}
            <div className='label'>minutes</div>
          </div>
          <div className='box'>
            {`${remainingSeconds}`}
            <div className='label'>seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timecount;
