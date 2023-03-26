import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
const Boton = styled.button `
background: orange;
border-radius: 3px;
color: white;
margin-right: 3px;
`
const Input = styled.div `
border-radius: 2px;
border: black;
width: 70px;
`



function Elemento (props) {
    const [count, setCount] = React.useState(props.value)

    function add (){
        setCount(count + 1)
    }
    
    function subtract (){
        setCount(count - 1) 
     }

     useEffect(()=>{
        props.callback(props.name,count);
        }, [count])

    return (
    <div className="botones">
     <Boton onClick={subtract}>-</Boton>
     <Input>{count}</Input> 
     <Boton onClick={add}>+</Boton>
     </div>
    )
}

{/* <Boton onClick={() => setCount(count +1)}>+</Boton>
            <Boton onClick={() => setCount(count -1)}>-</Boton> */}


export default Elemento