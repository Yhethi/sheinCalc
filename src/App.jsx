import { useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import ListItems from "./components/ListItems";
import Wallpaper from "./components/Wallpaper";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import PriceFetcher from "./components/PriceFetcher";

function App() {
  const [charge, setCharge] = useState(false);
  const [saveItems, setSaveItems] = useState([]);
  const [saveBasicItems, setSaveBasicItems] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataModified, setDataModified] = useState(false);
  const [count, setCount] = useState(0);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [sumaTotalBs, setSumaTotalBs] = useState(0);
  const [sumaTotalPesos, setSumaTotalPesos] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [user, setUser] = useState("");
  const [excelExported, setExcelExported] = useState(false);
  const [basic, setBasic] = useState(true);
  const [priceBs, setPriceBs] = useState(0);
  const [pricePesos, setPricePesos] = useState(0);
  const [totalBs, setTotalBs] = useState(0);
  const [totalPesos, setTotalPesos] = useState(0);

  const obtenerData = () => {
    setCharge(false);

    if (basic) {
      const isFully = saveBasicItems.length;
      if (isFully > 0) {
        setRows([]);
        saveBasicItems.forEach((el) => {
          return setRows([
            ...rows,
            createData(
              el.id,
              el.cantidad,
              el.amount,
              el.total,
              el.totalBs,
              el.totalPesos
            ),
          ]);
        });
        setTimeout(() => {
          setCharge(true);
        }, 1);
        setRows(saveBasicItems);
        setSumaTotal(0);
        let doSuma2 = 0;
        let doSumaBs = 0;
        let doSumaPesos = 0;
        let doSumaCantidad = 0;
        // console.log("saveBasicItems: ", saveBasicItems);
        saveBasicItems.forEach((element) => {
          doSuma2 = doSuma2 + element.total;
          doSumaBs = doSumaBs + parseFloat(element.totalBs);
          doSumaPesos = doSumaPesos + parseFloat(element.totalPesos);
          doSumaCantidad = doSumaCantidad + parseFloat(element.cantidad);
        });
        setSumaTotal(parseFloat(doSuma2).toFixed(2));
        setSumaTotalBs(parseFloat(doSumaBs).toFixed(2));
        setSumaTotalPesos(parseInt(doSumaPesos));
        setCantidadTotal(parseInt(doSumaCantidad));
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
        priceBs={priceBs}
        totalBs={totalBs}
        setTotalBs={setTotalBs}
        totalPesos={totalPesos}
        setTotalPesos={setTotalPesos}
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
          sumaTotalBs={sumaTotalBs}
          setSumaTotal={setSumaTotal}
          setSumaTotalBs={setSumaTotalBs}
          user={user}
          setExcelExported={setExcelExported}
          excelExported={excelExported}
          priceBs={priceBs}
          totalPesos={totalPesos}
          setTotalPesos={setTotalPesos}
          sumaTotalPesos={sumaTotalPesos}
          cantidadTotal={cantidadTotal}
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
              sumaTotalBs={sumaTotalBs}
              setSumaTotal={setSumaTotal}
              setSumaTotalBs={setSumaTotalBs}
              user={user}
              setExcelExported={setExcelExported}
              excelExported={excelExported}
              priceBs={priceBs}
              totalPesos={totalPesos}
              setTotalPesos={setTotalPesos}
              sumaTotalPesos={sumaTotalPesos}
              cantidadTotal={cantidadTotal}
            />
          </>
        ))}
      <div className="arrowsTravel go_up zIndexUp" onClick={scrollToTop}>
        <FaArrowCircleUp />
      </div>
      <div className="arrowsTravel go_down zIndexUp" onClick={scrollToBottom}>
        <FaArrowCircleDown />
      </div>
      <PriceFetcher
        sumaTotal={sumaTotal}
        priceBs={priceBs}
        setPriceBs={setPriceBs}
      />
      <div className="footer_text zIndexUp">
        Hecho por Yhethi +584124706698 <p className="v_foot zIndexUp">v1.1</p>
      </div>
    </div>
  );
}

export default App;
