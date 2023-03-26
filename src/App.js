

import React, {useState, Fragment, useEffect} from 'react';

import ReactDOM from 'react-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Input, Card} from 'react-bootstrap'
import styled from 'styled-components';
import Elemento from "./Boton";
import  Popup from "./Popup";
import './App.css';


  function App(){  
    

  const [seleccion, setSeleccion] = useState(() =>{
    try {
      const item=window.localStorage.getItem('seleccion')
      return  item ? JSON.parse(item) : {web:false, ads:false, consultoria:false}
    }
    catch(error){
      return {web:false, ads:false, consultoria:false}
    }}
    );

  const [precio, setPrecio] = useState(() =>{
    try {
      const item=window.localStorage.getItem('precio')
      return  item ? JSON.parse(item) : 0
    }
    catch(error){
      return 0
    }});

  const [datosDetalle, setDatosDetalle] = useState(() =>{
    try {
      const item=window.localStorage.getItem('datosDetalle')
      return  item ? JSON.parse(item) : {
        paginas:0, 
        idiomas:0
      };
    }
    catch(error){
     return {
      paginas:0, 
      idiomas:0
    };
    }});

  const calculaPrecio = () => {
    let p = 0;
    if (seleccion.web){p=p+500};
    if(seleccion.consultoria) {p=p+300};
    if(seleccion.ads) {p=p+200};
    p = p + (datosDetalle.paginas * datosDetalle.idiomas * 30);
    setPrecio(p);

    try{
      window.localStorage.setItem('precio',  JSON.stringify(precio));
    }catch (error){
        console.error(error);
    }

  }

  const cambioInput = (event) => {

    setSeleccion ({
      ...seleccion, 
      [event.target.name] : event.target.checked
    });
    try{
      window.localStorage.setItem('seleccion',  JSON.stringify(seleccion));
    }catch (error){
        console.error(error);
    }
    
  }
  const calculoDetalle = (name,count) => {
    setDatosDetalle ({
      ...datosDetalle, 
      [name] : count
    });
    try{
      window.localStorage.setItem('datosDetalle',  JSON.stringify(datosDetalle));
    }catch (error){
        console.error(error);
    }
    
  }

  useEffect(()=>{
    calculaPrecio();
  }, [seleccion, datosDetalle])

  const PopupB = styled.button `
  color: black;
  border-radius: 3px;
  margin-right: 3px;
  `
  const [buttonPopuppaginas, setButtonPopuppaginas] = useState(false);
  const [buttonPopupidiomas, setButtonPopupidiomas] = useState(false);


  return (
    <div className='container'>
      {/* <header className='header'>
        <Card style = {{color: "black"}}>
          <Card.Body>
            Card
          </Card.Body>
        
      </header> */}
    <p>¿Qué quieres hacer?</p>
    <div className='p'>
    <input type="checkbox" name='web' onChange={cambioInput} checked={seleccion.web}></input>
    <p className='numero'>Una página web (500€)</p>
    </div>
    {seleccion.web && (
        <div className='card'>
          <Card style = {{color: "black"}}>
          <Card.Body>
          <div className='p'>
            <p>Número de páginas</p>
            <Elemento name = "paginas" value = {datosDetalle.paginas} callback = {calculoDetalle}></Elemento>
            <PopupB onClick={() => setButtonPopuppaginas(true)}>i</PopupB>
            
            </div>

            <div className='p'>
            <p>Número de idiomas</p>
            <Elemento name = "idiomas" value = {datosDetalle.idiomas} callback = {calculoDetalle}></Elemento>
            <PopupB onClick={() => setButtonPopupidiomas(true)}>i</PopupB>
            </div>
            
        </Card.Body>
        </Card>
       
        </div>
    )}
    
    <div className='p'> 
    <input type="checkbox" name='consultoria' onChange={cambioInput} checked={seleccion.consultoria}></input>
    <p className='numero'>Una consultoria SEO (300€)</p>
    </div>
    <div className='p'>
    <input type="checkbox" name='ads' onChange={cambioInput} checked={seleccion.ads}></input>
    <p className='numero'>Una campanya de google Ads (200€)</p>
    </div>
    <p>Precio {precio}€</p>
    <Popup name="paginas" numero={datosDetalle.paginas} trigger ={buttonPopuppaginas} ></Popup>
    <Popup name="idiomas" numero={datosDetalle.idiomas} trigger ={buttonPopupidiomas} ></Popup>
    </div>
  );
    }


export default App;
