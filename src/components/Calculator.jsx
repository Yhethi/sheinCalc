import React, { useEffect } from "react";
import '../css/calcStyle.css'
import { useState } from 'react'
import { Store } from "react-notifications-component";

const Calculator = ({setSaveItems, saveItems, count, setCount, setUser, user, setExcelExported}) => {
    const [link, setLink] = useState('');
    const [amount, setAmount] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [weight, setWeight] = useState(0.0);
    const [nombreProducto, setNombreProducto] = useState('');

    const notificationSuccess = () => Store.addNotification({
        title: "Producto Añadido",
        message: "",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeIn"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });

    const notificationDanger = () => Store.addNotification({
        title: "COLOCA LOS DATOS CORRECTOS",
        message: "",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeIn"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });

    const notificationAlert = () => Store.addNotification({
        title: "COLOCA UN LINK DE SHEIN",
        message: "",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeIn"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });

    const notificationAlertZero = () => Store.addNotification({
        title: "COLOCA EL MONTO Y CANTIDAD CORRECTA",
        message: "",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeIn"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });

    function dividirCadena(cadenaADividir, separador) {
        var arrayDeCadenas = cadenaADividir.split(separador);
        return arrayDeCadenas;
    }

    const addItem = (e)=>{
        e.preventDefault();
        
        let add=0;
        let valor = amount;
        valor = parseFloat(valor);
        if (amount >= 0 && amount <=10) {
            add = valor+1;
        }else if (amount >= 10.01 && amount <= 19.9){
            add = valor+2;
        }else if (amount >= 20 && amount <= 29.9){
            add = valor+3;
        }else if (amount >= 30){
            add = valor+5;
        }
        let total = add;
        add=0;
        total = total+(total*0.25);
        total = total*cantidad;
        total = parseFloat(total.toFixed(2));        
        
        let cadenaDividida = new Array;
        
        if (((link.includes('https:') || link.includes('http:')) && link.includes('shein')) && amount > 0 && cantidad > 0) {
            
            if (link.includes('https:')) {
                cadenaDividida = dividirCadena(link, 'https:');
                cadenaDividida[1] = 'https:'+cadenaDividida[1];
            }else if (link.includes('http:')) {
                cadenaDividida = dividirCadena(link, 'http:');
                cadenaDividida[1] = 'http:'+cadenaDividida[1];
            }
            setSaveItems( 
                [
                  ...saveItems,
                  { 
                    id: count,
                    name: nombreProducto,
                    link: cadenaDividida[1],
                    amount,
                    cantidad,
                    weight,
                    total,
                }
                ]
              );
              notificationSuccess();
              setCount(count+1);
              setLink('');
              setAmount(0);
              setCantidad(0);
              setWeight(0);
              setNombreProducto('');
        }else if (((link.includes('https:') || link.includes('http:')) && link.includes('shein')) && amount === 0 || cantidad === 0){
            notificationAlertZero();
        }else if (link.includes('https:') || link.includes('http:') && amount === 0){
            notificationAlert();
        }else{
            notificationAlert();
            notificationDanger();
        }
    }

    const colocarValoresLink = ()=>{
                let tomarUrl = new Array;
                
                    if (link.includes('https:')) {
                        tomarUrl = dividirCadena(link, 'https:');
                        tomarUrl[1] = 'https:'+tomarUrl[1];
                    }else if (link.includes('http:')) {
                        tomarUrl = dividirCadena(link, 'http:');
                        tomarUrl[1] = 'http:'+tomarUrl[1];
                    }
                    console.log(tomarUrl, link);
                    if (tomarUrl !== undefined) {
                        setLink(tomarUrl[1]);
                    }
                    let tomarNombre = new Array;
                    let formatearNombre = new Array;
                    if (link.includes('https:')) {
                        tomarNombre = dividirCadena(link, 'https:');
                         formatearNombre = dividirCadena(tomarNombre[0], 'He descubierto los artículos más increíbles en SHEIN.com, ¡ve y echa un vistazo!');
                    }else if (link.includes('http:')) {
                        tomarNombre = dividirCadena(link, 'http:');
                         formatearNombre = dividirCadena(tomarNombre[0], 'He descubierto los artículos más increíbles en SHEIN.com, ¡ve y echa un vistazo!');
                    }else{
                        tomarNombre[0] = "Nombre no identificado";
                    }
                    if (tomarNombre[0].length === 0) {
                        tomarNombre[0] = "Nombre no identificado";
                    }

                    if (tomarNombre[0] === "Nombre no identificado") {
                        setNombreProducto(tomarNombre[0]);       
                    }else{
                        setNombreProducto(formatearNombre[0]);       
                    }
    }

  return <div className="calculator">
    <div className="cardCalculator">
         <div className="flex_item_center">
            <h2>Coloca los datos de tus productos</h2>
        </div> 
        <form action="#" onSubmit={addItem}>
        <div className="flex_item">
            <p>Tu Nombre</p>
            <input type="text" className="inputs input_user" name="input_user" 
            onChange={(e)=>{
                setUser(e.target.value);
                setExcelExported(false);
            }}
            value={user}
            required
        />
        </div> 
        <div className="flex_item">
            <p>Link</p>
            <input type="text" className="inputs link_product" name="link_product" 
            onChange={(e)=>{
                if (e.target.value.length > 0) {
                    setCantidad(1);
                }
                setLink(e.target.value);
                setExcelExported(false);
            }}
            onKeyUp={(e)=>{
                if ((link.includes('https:') || link.includes('http:')) && link.includes('shein')) {
                }else{
                    setTimeout(() => {
                        setLink('')
                    }, 10);
                }
            }}
            onBlur={colocarValoresLink}
            onClick={(e)=>{
                setLink('');
            }}
            onPaste={()=>{
                if ((link.includes('https:') || link.includes('http:')) && link.includes('shein')) {
                    setTimeout(() => {
                        document.getElementById('name_product').focus();
                    }, 100);
                }
               
            }}
            value={link}
            required
        />
        </div>
        <div className="flex_item">
            <p>Nombre Producto</p>
            <input type="text" id="name_product" className="inputs name_product" name="name_product" value={nombreProducto} readOnly/>
        </div> 
        <div className="flex_item">
            <p>Monto $</p>
            <input type="number" className="inputs amount_product" name="amount_product" 
            onChange={(e)=>{
                setAmount(e.target.value);
                setExcelExported(false);
            }}
            onBlur={(e)=>{
                if (amount.length === 0) {
                    setAmount(0);
                }
            }
            }
            value={amount}
        />
        </div>
        <div className="flex_item">
            <p>Cantidad</p>
            <input type="number" className="inputs cantidad_product" name="cantidad_product" 
            onChange={(e)=>{
                setCantidad(e.target.value);
                setExcelExported(false);
            }}
            onBlur={(e)=>{
                if (cantidad.length === 0) {
                    setCantidad(0);
                }
            }
            }
            value={cantidad}
        />
        </div> 
        <button className="add_button" type="submit">Añadir</button>
        </form>
    </div>
  </div>;
};

export default Calculator;
