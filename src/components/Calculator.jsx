import React, { useEffect } from "react";
import '../css/calcStyle.css'
import { useState } from 'react'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Calculator = ({setSaveItems, saveItems, count, setCount, setUser, user}) => {
    const [link, setLink] = useState('');
    const [amount, setAmount] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [weight, setWeight] = useState(0.0);
    
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

        
        setSaveItems( 
            [
              ...saveItems,
              { 
                id: count,
                link,
                amount,
                cantidad,
                weight,
                total,
            }
            ]
          );
          setCount(count+1);
          setLink('');
          setAmount(0);
          setCantidad(0);
          setWeight(0);
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
            }}
            value={link}
            required
        />
        </div> 
        <div className="flex_item">
            <p>Monto $</p>
            <input type="number" className="inputs amount_product" name="amount_product" 
            onChange={(e)=>{
                setAmount(e.target.value);
            }}
            value={amount}
        />
        </div>
        <div className="flex_item">
            <p>Cantidad</p>
            <input type="number" className="inputs amount_product" name="amount_product" 
            onChange={(e)=>{
                setCantidad(e.target.value);
            }}
            value={cantidad}
        />
        </div> 
        <button className="add_button" type="submit">Añadir</button>
        </form>
    </div>
  </div>;
};

export default Calculator;
