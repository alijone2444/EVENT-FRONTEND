import './App.css';
import './styles/style.css';

import Login from './loginComponent';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import EventsMainPage from './Eventpage';
import Signup from './SignupComponent';
import RequestApprovalScreen from './request_approval';
import RequestsPage from './requests'
import DeleteEvent from './deleteEvent.js'
import ProfileComponent from './profile';
import OpenedEvent from './openEvent.js'
import TicketForm from './ticketmodal.js';
import AboutPage from './about.js'
import Bio from './bio.js'

function App() {
  
  return (
  <Router>
    <div className="App">
      <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/Home' element={<EventsMainPage />}/>
      <Route exact path='/event' element={<OpenedEvent/>}/>
      <Route exact path='/Signup' element={< Signup />}/>
      <Route exact path='/pending' element={< RequestApprovalScreen />}/>
      <Route exact path='/Requests' element={< RequestsPage />}/>
      <Route exact path='/deletepage' element={< DeleteEvent />}/>
      <Route exact path='/prof' element={< ProfileComponent />}/>
      <Route exact path='/ticketbook' element={< TicketForm />}/>
      <Route exact path='/about' element={< AboutPage />}/>
      <Route exact path='/bio' element={< Bio />}/>
    </Routes>
    </div>
</Router>

);}

export default App;
