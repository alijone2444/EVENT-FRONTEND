import './styles/prof.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from './images/nophoto.png'
function ProfileComponent(){
    return(
        <div>
            <div className='first-hundredvh'>
                <div className="col left-cont">
                    <div className='username'>
                        <h1 style={{color:"rgb(193, 211, 34)"}}>Raja Uzair</h1>
                    <div>
                        <ButtonGroup className="flex-wrap">
                            <Button variant="btn btn-trans">Bio </Button>
                            <Button variant="btn btn-trans">Photos</Button>
                            <Button variant="btn btn-trans">Contacts</Button>
                        </ButtonGroup>
                    <div className='name-2 '>
                        <h1 className='text display-5'>HEY , I'm</h1>
                        <h1 className='text2 display-1'>raja uzair</h1>
                    </div>
                    <div className='text3 display-6'>
                        <h4>actor / performer / musician</h4>
                    </div>

                    </div>
                    </div>
                </div>
                <div className="right-cont">
                    <img src={Image}alt='.' className='img-fluid'/>
                </div>
            </div>
        </div>
)}
export default ProfileComponent;
