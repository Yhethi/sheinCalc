import { useEffect, useState } from 'react'
import './App.css'
import Calculator from './components/Calculator'
import ListItems from './components/ListItems'
import Wallpaper from './components/Wallpaper';

function App() {
  const [charge, setCharge] = useState(false);
  const [saveItems, setSaveItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataModified, setDataModified] = useState(false);
  const [count, setCount] = useState(0);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [user, setUser] = useState('');
  
  
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





  return (
    <div className='calc_global'>
      <Wallpaper/>
      <div className="d-flex">
        <p>SHEINCALC</p>
      </div>
      <Calculator setSaveItems={setSaveItems} saveItems={saveItems} setCount={setCount} count={count} setUser={setUser} user={user} />
      {charge &&
        (<ListItems saveItems={saveItems} setSaveItems={setSaveItems} rows={rows} setDataModified={setDataModified} setRows={setRows} dataModified={dataModified} sumaTotal={sumaTotal} setSumaTotal={setSumaTotal} user={user} />)
      }
    </div>
  )
}

export default App
