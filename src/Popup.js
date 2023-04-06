import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
// import Card from 'react-bootstrap/Card';
import { Pop, Overlay} from "./styled";

function Popup(props){
    return (props.trigger) ? (
        <>
            <Overlay>
              <Pop>
              <p>El numero de las {props.name}: {props.numero}</p>
              </Pop>
              </Overlay>
            </>
    ) : "";
}

export default Popup
