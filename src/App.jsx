import { useEffect, useState } from 'react'
import './App.css'
import Calculator from './components/Calculator'
import ListItems from './components/ListItems'
import Wallpaper from './components/Wallpaper';

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {
  const [charge, setCharge] = useState(false);
  const [saveItems, setSaveItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataModified, setDataModified] = useState(false);
  const [count, setCount] = useState(0);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [user, setUser] = useState('');
  const [excelExported, setExcelExported] = useState(false);
  
  
    const obtenerData = async () => {
    setCharge(false);
    const isFully = saveItems.length;
    if (isFully>0) {    
      setRows([])
      saveItems.forEach(el => {
        return (setRows([
             ...rows,
             createData(el.id, el.link, el.cantidad, el.amount, el.weight, el.total)
         ]))
     });
      setTimeout(() => {
        setCharge(true);
      }, 1);
      setRows(saveItems);
      setSumaTotal(0);
      let doSuma2 = 0;
      saveItems.forEach(element => {
        doSuma2 = doSuma2 + element.total;
      });
      setSumaTotal(doSuma2);
    } else {
      setCharge(false);
    }
  };

  useEffect(() => {
    setDataModified(false);
    obtenerData();
  }, [saveItems, dataModified]);


  function createData(id, link, cantidad, amount, weight, total) {
    return {id, link, cantidad, amount, weight, total};
  }

const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
};
const scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
};


  return (
    <div className='calc_global'>
      <ReactNotifications/>
      <Wallpaper/>
      <div className="d-flex nombre_project">
        <p>SHEINCALC</p>
      </div>
      <Calculator setSaveItems={setSaveItems} saveItems={saveItems} setCount={setCount} count={count} setUser={setUser} user={user} setExcelExported={setExcelExported} />
      {charge &&
      (<ListItems saveItems={saveItems} 
        setSaveItems={setSaveItems} 
        rows={rows} 
        setDataModified={setDataModified} 
        setRows={setRows} 
        dataModified={dataModified} 
        sumaTotal={sumaTotal} 
        setSumaTotal={setSumaTotal} 
        user={user} 
        setExcelExported={setExcelExported} 
        excelExported={excelExported} 
        />)
      }
      <div className='go_up' onClick={scrollToTop}><FaArrowCircleUp/></div>
      <div className='go_down' onClick={scrollToBottom}><FaArrowCircleDown/></div>
      <div className='footer_text'>Hecho por Yhethi +584124706698</div>
    </div>
  )
}

export default App
