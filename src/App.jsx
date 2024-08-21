import { useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import ListItems from "./components/ListItems";
import Wallpaper from "./components/Wallpaper";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {
  const [charge, setCharge] = useState(false);
  const [saveItems, setSaveItems] = useState([]);
  const [saveBasicItems, setSaveBasicItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataModified, setDataModified] = useState(false);
  const [count, setCount] = useState(0);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [user, setUser] = useState("");
  const [excelExported, setExcelExported] = useState(false);
  const [basic, setBasic] = useState(true);

  const obtenerData = () => {
    setCharge(false);

    if (basic) {
      const isFully = saveBasicItems.length;
      if (isFully > 0) {
        setRows([]);
        saveBasicItems.forEach((el) => {
          return setRows([
            ...rows,
            createData(el.id, el.cantidad, el.amount, el.total),
          ]);
        });
        setTimeout(() => {
          setCharge(true);
        }, 1);
        setRows(saveBasicItems);
        setSumaTotal(0);
        let doSuma2 = 0;
        saveBasicItems.forEach((element) => {          
          doSuma2 = doSuma2 + element.total;
        });
        setSumaTotal(parseFloat(doSuma2).toFixed(2));
      } else {
        setCharge(false);
      }
    } else {
      const isFully = saveItems.length;
      if (isFully > 0) {
        setRows([]);
        saveItems.forEach((el) => {
          return setRows([
            ...rows,
            createData(
              el.id,
              el.link,
              el.cantidad,
              el.amount,
              el.weight,
              el.total
            ),
          ]);
        });
        setTimeout(() => {
          setCharge(true);
        }, 1);
        setRows(saveItems);
        setSumaTotal(0);
        let doSuma2 = 0;
        saveItems.forEach((element) => {
          doSuma2 = doSuma2 + element.total;
        });
        setSumaTotal(parseFloat(doSuma2).toFixed(2));
      } else {
        setCharge(false);
      }
    }
  };

  useEffect(() => {
    setDataModified(false);
    obtenerData();
  }, [saveItems, saveBasicItems, dataModified, basic]);

  function createData(id, link, cantidad, amount, weight, total) {
    return { id, link, cantidad, amount, weight, total };
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth'
    });
  };

  return (
    <div className="calc_global">
      <ReactNotifications />
      <Wallpaper />
      <div className="d-flex nombre_project">
        <p>SHEINCALC</p>
      </div>
      <Calculator
        setSaveItems={setSaveItems}
        saveItems={saveItems}
        setSaveBasicItems={setSaveBasicItems}
        saveBasicItems={saveBasicItems}
        setCount={setCount}
        count={count}
        setUser={setUser}
        user={user}
        setExcelExported={setExcelExported}
        setBasic={setBasic}
        basic={basic}
      />
      {(charge && !basic && (
        <ListItems
          basic={basic}
          saveItems={saveItems}
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
        />
      )) ||
        (charge && basic && (
          <>
            <ListItems
              basic={basic}
              saveItems={saveItems}
              setSaveItems={setSaveItems}
              saveBasicItems={saveBasicItems}
              setSaveBasicItems={setSaveBasicItems}
              rows={rows}
              setDataModified={setDataModified}
              setRows={setRows}
              dataModified={dataModified}
              sumaTotal={sumaTotal}
              setSumaTotal={setSumaTotal}
              user={user}
              setExcelExported={setExcelExported}
              excelExported={excelExported}
            />
          </>
        ))}
      <div className="go_up zIndexUp" onClick={scrollToTop}>
        <FaArrowCircleUp />
      </div>
      <div className="go_down zIndexUp" onClick={scrollToBottom}>
        <FaArrowCircleDown />
      </div>
      <div className="footer_text zIndexUp">
        Hecho por Yhethi +584124706698 <p className="v_foot zIndexUp">v1.05</p>
      </div>
    </div>
  );
}

export default App;
