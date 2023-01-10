import React from 'react'
import { Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Footer() {

  const navigate = useNavigate(); 
  const clickHandler = ()=> {
    // alert("click");
    navigate("/pay");
  }
  return (
    <div>
      <Button onClick = {clickHandler}className="btn btn-success">Send Tips</Button>
    </div>
  )
}

export default Footer