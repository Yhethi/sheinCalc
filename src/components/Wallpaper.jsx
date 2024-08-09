import React, { useEffect, useState } from "react";
import '../css/wall.css'
import shein1 from "../assets/wall/shein1.jpg";
import shein2 from "../assets/wall/shein2.jpg";
import shein3 from "../assets/wall/shein3.jpg";

const Wallpaper = () => {

    const [image, setImage] = useState('');

    const changeImg = ()=>{
        setTimeout(() => {
            setImage(shein2);
            setTimeout(() => {
                setImage(shein3);
            }, 5000);
        }, 5000);
    }

useEffect(() => {
    setImage(shein1);
    changeImg();
    setInterval(() => {
        setImage(shein1);
        changeImg();
    }, 15000);
}, []);




  return <div className="imagenFondo">
    <img src={image} alt={image} />
  </div>;
};

export default Wallpaper;
