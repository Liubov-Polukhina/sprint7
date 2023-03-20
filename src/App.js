import logo from './logo.svg';
import './App.css';
import React, {useState, Fragment, useEffect} from 'react';
import { useLocalStorage } from './useLocalStorage';
import ReactDOM from 'react-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Input, Card} from 'react-bootstrap'

function App() {

  
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
  const calculoDetalle = (event) => {
    setDatosDetalle ({
      ...datosDetalle, 
      [event.target.name] : event.target.value
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

  return (
    <div>
      {/* <header className='header'>
        <Card style = {{color: "black"}}>
          <Card.Body>
            Card
          </Card.Body>
        
      </header> */}
    <p>¿Qué quieres hacer?</p>
    <input type="checkbox" name='web' onChange={cambioInput} checked={seleccion.web}></input>
    <p>Una página web (500€)</p>
    {seleccion.web && (
        <div>
          <Card style = {{color: "black"}}>
          <Card.Body>
      
            <p>Número de páginas</p>
            <input type="number" name="paginas" min="0" onChange={calculoDetalle} value={datosDetalle.paginas}></input>
            <p>Número de idiomas</p>
            <input type="number" name="idiomas" min="0" onChange={calculoDetalle} value={datosDetalle.idiomas}></input>
        </Card.Body>
        </Card>
        </div>
    )}
    <input type="checkbox" name='consultoria' onChange={cambioInput} checked={seleccion.consultoria}></input>
    <p>Una consultoria SEO (300€)</p>
    <input type="checkbox" name='ads' onChange={cambioInput} checked={seleccion.ads}></input>
    <p>Una campanya de google Ads (200€)</p>
    <p>Precio {precio}€</p>
    </div>
  );
}

export default App;
