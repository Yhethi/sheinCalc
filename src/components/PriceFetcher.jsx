// src/components/PriceFetcher.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceFetcher = ({ sumaTotal, priceBs, setPriceBs }) => {
  const [refreshPrice, setRefreshPrice] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data } = await axios.get("https://shein-calc.vercel.app/api/price");
        // const { data } = await axios.get("http://localhost:5001/api/price");
        console.log(data);
        // const data = 43.8;
        let suma = 0;
        suma = parseFloat(data + 2.3);
        setPriceBs(suma); // Esto debería actualizar el estado con el nuevo valor
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };
    fetchPrice();
  }, [refreshPrice]);

  // setInterval(() => {
  //   setRefreshPrice(!refreshPrice);
  // }, 10000);

  return <></>;
};

export default PriceFetcher;
