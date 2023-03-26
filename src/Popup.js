import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';

function Popup(props){
    return (props.trigger) ? (
        <div className = "popup-inner" >
              <Card style = {{color: "black"}}>
                <Card.Body>
                  <p>El numero de las {props.name}: {props.numero}</p>
                </Card.Body>
              </Card>
            </div>
    ) : "";
}

export default Popup